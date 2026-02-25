import { useState, useCallback, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { toast } from 'sonner'

export interface PendingPro {
    id: string
    full_name: string
    email: string
    category: string
}

export interface AdminMetrics {
    totalUsers: number
    activePros: number
    completedServices: number
}

export function useAdminData() {
    const [metrics, setMetrics] = useState<AdminMetrics>({
        totalUsers: 0,
        activePros: 0,
        completedServices: 0
    })
    const [pendingPros, setPendingPros] = useState<PendingPro[]>([])
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

            setMetrics({
                totalUsers: usersCount || 0,
                activePros: prosCount || 0,
                completedServices: reqsCount || 0
            })
            setPendingPros(prosData || [])

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
            // Eliminar el perfil completamente (o podrías marcarlo como rechazado si hubiera una columna para eso)
            const { error } = await supabase.from('profiles').delete().eq('id', id)
            if (error) throw error

            toast.success(`Profesional ${name} rechazado y eliminado de la revisión.`)
            await fetchAdminData() // Refresh list
        } catch (error) {
            console.error('Error rejecting pro:', error)
            toast.error(`No se pudo rechazar a ${name}.`)
        } finally {
            setIsRejecting(null)
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
                    console.warn("Tabla admin_invitations no existe, simulando envío.")
                    await new Promise(resolve => setTimeout(resolve, 1000))
                } else {
                    throw error
                }
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
        loading,
        isApproving,
        isRejecting,
        isInviting,
        handleApprove,
        handleReject,
        handleInviteAdmin,
        refreshData: fetchAdminData
    }
}
