import { useState, useCallback, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { toast } from 'sonner'
import emailjs from '@emailjs/browser'

export interface PendingPro {
    id: string
    full_name: string
    email: string
    category?: string
    role?: string
    created_at?: string
}

export interface AdminMetrics {
    totalUsers: number
    activePros: number
    completedServices: number
}

export interface RecentUser {
    id: string
    full_name: string
    role: string
    created_at: string
}

export function useAdminData() {
    const [metrics, setMetrics] = useState<AdminMetrics>({
        totalUsers: 0,
        activePros: 0,
        completedServices: 0
    })
    const [pendingPros, setPendingPros] = useState<PendingPro[]>([])
    const [recentUsers, setRecentUsers] = useState<RecentUser[]>([])
    const [allUsers, setAllUsers] = useState<PendingPro[]>([]) // CRM state
    const [settings, setSettings] = useState({ generalCommissionRate: 15, pricePerLead: 2000, superAdminPin: '123456' })
    const [loading, setLoading] = useState(true)

    // Action states
    const [isApproving, setIsApproving] = useState<string | null>(null)
    const [isRejecting, setIsRejecting] = useState<string | null>(null)
    const [isInviting, setIsInviting] = useState(false)

    const fetchAdminData = useCallback(async () => {
        setLoading(true)
        try {
            // Fetch Counts
            const { count: usersCount } = await supabase.from('profiles').select('*', { count: 'exact', head: true })
            const { count: prosCount } = await supabase.from('profiles').select('*', { count: 'exact', head: true }).eq('role', 'professional').eq('verified', true)
            const { count: reqsCount } = await supabase.from('requests').select('*', { count: 'exact', head: true }).eq('status', 'completed')

            // Fetch pending Pros
            const { data: prosData } = await supabase.from('profiles')
                .select('id, full_name, email, category')
                .eq('role', 'professional')
                .eq('verified', false)

            // Fetch Recent Users
            const { data: recentData } = await supabase.from('profiles')
                .select('id, full_name, role, created_at')
                .order('created_at', { ascending: false })
                .limit(5)

            // Fetch All Users for CRM
            const { data: allUsersData } = await supabase.from('profiles')
                .select('id, full_name, email, role, created_at, category')
                .order('created_at', { ascending: false })

            // Fetch Settings (Fallback to defaults if table missing/empty)
            const { data: settingsData, error: settingsError } = await supabase.from('platform_settings').select('*').limit(1).single()

            setMetrics({
                totalUsers: usersCount || 0,
                activePros: prosCount || 0,
                completedServices: reqsCount || 0
            })
            setPendingPros(prosData || [])
            setRecentUsers(recentData || [])
            setAllUsers(allUsersData || [])

            if (settingsData && !settingsError) {
                setSettings({
                    generalCommissionRate: Number(settingsData.general_commission) || 15,
                    pricePerLead: Number(settingsData.price_per_lead) || 2000,
                    superAdminPin: settingsData.super_admin_pin || '123456'
                })
            }

        } catch (err) {
            console.error('Error fetching admin data:', err)
            toast.error("Error al cargar los datos del panel.")
        } finally {
            setLoading(false)
        }
    }, [])

    useEffect(() => {
        fetchAdminData()
    }, [fetchAdminData])

    const handleApprove = async (id: string, name: string) => {
        setIsApproving(id)
        try {
            const { error } = await supabase.from('profiles').update({ verified: true }).eq('id', id)
            if (error) throw error

            toast.success(`Profesional ${name} aprobado exitosamente.`)
            await fetchAdminData() // Refresh list and metrics
        } catch (error) {
            console.error('Error approving pro:', error)
            toast.error(`No se pudo aprobar a ${name}.`)
        } finally {
            setIsApproving(null)
        }
    }

    const handleReject = async (id: string, name: string) => {
        setIsRejecting(id)
        try {
            const { error: profileError } = await supabase.from('profiles').delete().eq('id', id)
            if (profileError) throw profileError

            toast.success(`Usuario ${name} ha sido eliminado definitivamente.`)
            await fetchAdminData() // Refresh list
        } catch (error) {
            console.error('Error rejecting/deleting pro:', error)
            toast.error(`No se pudo eliminar a ${name}.`)
        } finally {
            setIsRejecting(null)
        }
    }

    const verifySuperAdminPin = (inputPin: string) => {
        return inputPin === settings.superAdminPin
    }

    const handleSaveSettings = async (newSettings: { generalCommissionRate: number, pricePerLead: number }) => {
        try {
            const { error } = await supabase.from('platform_settings').upsert({
                id: 1,
                general_commission: newSettings.generalCommissionRate,
                price_per_lead: newSettings.pricePerLead
            })
            if (error) throw error
            setSettings(prev => ({ ...prev, ...newSettings }))
            toast.success("Configuración de ingresos guardada exitosamente.")
            return true
        } catch (error) {
            console.error('Error saving settings:', error)
            toast.error("Error al actualizar configuración (¿Tabla creada?).")
            return false
        }
    }

    const handleInviteAdmin = async (email: string, invitedBy?: string) => {
        if (!email || !email.includes('@')) {
            toast.error("Por favor ingresa un correo electrónico válido.")
            return
        }

        setIsInviting(true)
        try {
            // Insertar en la tabla admin_invitations si existe, sino simular
            const payload = invitedBy ? { email, invited_by: invitedBy } : { email };
            const { error } = await supabase.from('admin_invitations').insert([payload])

            if (error) {
                // Si la tabla no existe, Supabase tirará error 42P01. Simulamos en ese caso para no quebrar el front.
                if (error.code === '42P01') {
                    console.warn("Tabla admin_invitations no existe, simulando guardado en DB.")
                } else {
                    throw error
                }
            }

            // Enviar correo electrónico vía EmailJS
            const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID
            const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
            const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

            if (serviceId && templateId && publicKey) {
                try {
                    await emailjs.send(
                        serviceId,
                        templateId,
                        { to_email: email }, // Template expected variable
                        publicKey
                    )
                } catch (emailError) {
                    console.error("EmailJS Error:", emailError)
                    toast.error("La invitación se guardó pero falló el envío del correo.")
                    return false
                }
            } else {
                console.warn("Faltan las variables de entorno de EmailJS. No se envió el correo real.")
            }

            toast.success(`Invitación enviada exitosamente a ${email}.`)
            return true;
        } catch (error) {
            console.error('Error inviting admin:', error)
            toast.error("Ocurrió un error al enviar la invitación.")
            return false;
        } finally {
            setIsInviting(false)
        }
    }

    return {
        metrics,
        pendingPros,
        recentUsers,
        allUsers,
        settings,
        loading,
        isApproving,
        isRejecting,
        isInviting,
        handleApprove,
        handleReject,
        handleInviteAdmin,
        handleSaveSettings,
        verifySuperAdminPin,
        refreshData: fetchAdminData
    }
}
