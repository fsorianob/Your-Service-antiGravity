import { Activity, Shield, Settings, Check, X, TrendingUp, DollarSign, LogOut, Loader2, UserPlus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"
import { useAuth } from "@/contexts/AuthContext"
import { useState, useEffect, useCallback } from "react"
import { supabase } from "@/lib/supabase"

interface PendingPro {
    id: string
    full_name: string
    email: string
    category: string
}

export default function AdminDashboard() {
    const { user, signOut } = useAuth()
    const navigate = useNavigate()

    const handleLogout = async () => {
        await signOut()
        navigate("/login")
    }

    const fullName = user?.user_metadata?.full_name || "Administrador"
    const firstName = fullName.split(' ')[0]

    // Admin State Settings
    const [metrics, setMetrics] = useState({
        totalUsers: 0,
        activePros: 0,
        completedServices: 0
    })
    const [pendingPros, setPendingPros] = useState<PendingPro[]>([])
    const [loading, setLoading] = useState(true)
    const [inviting, setInviting] = useState(false)

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
            console.error(err)
        } finally {
            setLoading(false)
        }
    }, [])

    useEffect(() => {
        fetchAdminData()
    }, [fetchAdminData])

    const handleApprove = async (id: string) => {
        const { error } = await supabase.from('profiles').update({ verified: true }).eq('id', id)
        if (!error) {
            fetchAdminData()
        }
    }

    const handleInviteAdmin = () => {
        setInviting(true)
        setTimeout(() => {
            alert("Se ha enviado una invitación administrativa interna exitosamente.")
            setInviting(false)
        }, 1200)
    }

    if (loading) {
        return <div className="min-h-screen bg-[#0F0F0F] flex items-center justify-center"><Loader2 className="animate-spin text-primary h-8 w-8" /></div>
    }

    return (
        <div className="min-h-screen bg-[#0F0F0F] text-white flex flex-col md:flex-row">

            {/* Sidebar */}
            <aside className="w-full md:w-64 bg-[#141414] border-r border-white/10 p-6 flex flex-col">
                <div className="mb-10">
                    <div className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Super Admin</div>
                </div>

                <nav className="flex-1 space-y-2">
                    <a href="#" className="flex items-center gap-3 px-4 py-3 rounded-lg bg-primary/10 text-primary font-medium transition-colors">
                        <Activity className="h-5 w-5" /> Resumen
                    </a>
                    <a href="#" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/5 text-gray-400 hover:text-white transition-colors">
                        <Shield className="h-5 w-5" /> Verificaciones <span className="ml-auto bg-primary text-black text-xs font-bold px-2 py-0.5 rounded-full">5</span>
                    </a>
                    <a href="#" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/5 text-gray-400 hover:text-white transition-colors">
                        <DollarSign className="h-5 w-5" /> Ingresos
                    </a>
                    <a href="#" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/5 text-gray-400 hover:text-white transition-colors">
                        <Settings className="h-5 w-5" /> Ajustes
                    </a>
                </nav>

                <div className="mt-auto pt-6 border-t border-white/10">
                    <div className="flex flex-col gap-3 mb-5 px-2">
                        <div className="flex items-center gap-3">
                            <div className="flex items-center gap-2 group cursor-default">
                                <span className="font-bold text-lg tracking-tight">
                                    <span className="text-red-500 group-hover:text-white transition-colors duration-300">Soy</span>
                                    <span className="text-white group-hover:text-red-500 transition-colors duration-300">Admin</span>
                                </span>
                            </div>
                            <div className="h-10 w-10 shrink-0 rounded-full bg-red-500/20 flex items-center justify-center text-red-500 font-bold border border-red-500/30">
                                {firstName.charAt(0).toUpperCase()}
                            </div>
                        </div>
                        <div className="overflow-hidden">
                            <p className="text-sm font-medium text-white truncate">{fullName}</p>
                            <p className="text-xs text-gray-500 truncate">{user?.email}</p>
                        </div>
                    </div>
                    <Button
                        variant="ghost"
                        onClick={handleLogout}
                        className="w-full justify-start text-red-400 hover:text-red-300 hover:bg-red-400/10"
                    >
                        <LogOut className="h-5 w-5 mr-3" /> Cerrar Sesión
                    </Button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-6 md:p-10 animate-in fade-in duration-500 overflow-y-auto">
                <header className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold">Panel de Control</h1>
                        <p className="text-muted-foreground mt-1">Métricas generales de la plataforma y gestión de usuarios.</p>
                    </div>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                    {/* Analytics Widgets */}
                    <div className="bg-[#1A1A1A] p-6 rounded-2xl border border-white/5 flex flex-col gap-2">
                        <div className="text-gray-400 text-sm">Usuarios Totales</div>
                        <div className="text-3xl font-bold">{metrics.totalUsers}</div>
                        <div className="text-green-400 text-xs font-medium flex items-center">
                            <TrendingUp className="h-3 w-3 mr-1" /> Actualizado
                        </div>
                    </div>
                    <div className="bg-[#1A1A1A] p-6 rounded-2xl border border-white/5 flex flex-col gap-2">
                        <div className="text-gray-400 text-sm">Profesionales Activos</div>
                        <div className="text-3xl font-bold">{metrics.activePros}</div>
                        <div className="text-green-400 text-xs font-medium flex items-center">
                            <TrendingUp className="h-3 w-3 mr-1" /> Verificados
                        </div>
                    </div>
                    <div className="bg-[#1A1A1A] p-6 rounded-2xl border border-white/5 flex flex-col gap-2">
                        <div className="text-primary text-sm font-semibold">Ingresos Mensuales</div>
                        <div className="text-3xl font-bold text-primary">$0</div>
                        <div className="text-gray-500 text-xs font-medium flex items-center">
                            Próximamente
                        </div>
                    </div>
                    <div className="bg-[#1A1A1A] p-6 rounded-2xl border border-white/5 flex flex-col gap-2">
                        <div className="text-gray-400 text-sm">Servicios Completados</div>
                        <div className="text-3xl font-bold">{metrics.completedServices}</div>
                        <div className="text-gray-500 text-xs font-medium">Desde el lanzamiento</div>
                    </div>
                </div>

                <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 mb-10">
                    {/* User Verification Queue */}
                    <section className="xl:col-span-2">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-bold flex items-center gap-2">
                                <Shield className="h-5 w-5 text-primary" /> Verificación Pendiente
                            </h2>
                            <span className="bg-primary/20 text-primary text-xs font-bold px-3 py-1 rounded-full">{pendingPros.length} Nuevos</span>
                        </div>

                        {pendingPros.length === 0 ? (
                            <div className="bg-[#1A1A1A] p-8 rounded-2xl border border-white/5 text-center text-gray-500">
                                No hay profesionales pendientes de verificación en este momento.
                            </div>
                        ) : (
                            <div className="flex gap-4 overflow-x-auto pb-4 snap-x">
                                {pendingPros.map((pro) => (
                                    <div key={pro.id} className="min-w-[300px] bg-[#1A1A1A] p-5 rounded-2xl border border-white/5 snap-start flex-shrink-0 flex flex-col justify-between">
                                        <div>
                                            <div className="flex items-center gap-3 mb-4">
                                                <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold border border-primary/30 uppercase">
                                                    {pro.full_name?.charAt(0) || 'P'}
                                                </div>
                                                <div className="overflow-hidden">
                                                    <h3 className="font-bold text-white truncate">{pro.full_name || 'Sin Nombre'}</h3>
                                                    <span className="text-xs text-gray-500 truncate block">{pro.email}</span>
                                                </div>
                                            </div>
                                            <p className="text-sm text-gray-300 mb-6">{pro.category || 'Categoría no definida'}</p>
                                        </div>

                                        <div className="flex gap-2 mt-auto">
                                            <Button variant="gold" size="sm" className="flex-1 font-bold" onClick={() => handleApprove(pro.id)}>
                                                <Check className="h-4 w-4 mr-1" /> Aprobar
                                            </Button>
                                            <Button variant="outline" size="sm" className="flex-1 border-white/10 hover:bg-white/5 hover:text-red-400">
                                                <X className="h-4 w-4 mr-1" /> Rechazar
                                            </Button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </section>

                    {/* Revenue Management */}
                    <section className="bg-gradient-to-b from-[#1A1A1A] to-[#121212] p-6 rounded-2xl border border-white/5">
                        <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                            <DollarSign className="h-5 w-5 text-primary" /> Gestión de Ingresos
                        </h2>

                        <div className="space-y-6">
                            <div>
                                <label className="text-sm text-gray-400 font-medium mb-1 block">Tasa de Comisión (Generales)</label>
                                <div className="flex bg-black/40 rounded-lg border border-white/10 focus-within:border-primary/50 overflow-hidden">
                                    <input type="text" defaultValue="15" className="bg-transparent w-full text-white px-4 py-2 outline-none" />
                                    <div className="bg-white/5 px-4 flex items-center text-gray-400 font-medium">%</div>
                                </div>
                            </div>

                            <div>
                                <label className="text-sm text-gray-400 font-medium mb-1 block">Precio por Lead (Bidding)</label>
                                <div className="flex bg-black/40 rounded-lg border border-white/10 focus-within:border-primary/50 overflow-hidden">
                                    <div className="bg-white/5 px-4 flex items-center text-gray-400 font-medium">$</div>
                                    <input type="text" defaultValue="1500" className="bg-transparent w-full text-white px-4 py-2 outline-none" />
                                </div>
                            </div>

                            <Button variant="outline" className="w-full border-primary/50 text-white hover:bg-primary/20 transition-colors mt-2">
                                Guardar Cambios
                            </Button>
                        </div>
                    </section>
                </div>

                {/* Invite Admin Section */}
                <section className="bg-[#1A1A1A] p-8 rounded-2xl border border-white/5 shadow-xl">
                    <div className="flex flex-col md:flex-row gap-6 md:items-center justify-between">
                        <div>
                            <h2 className="text-xl font-bold flex items-center gap-2 mb-2">
                                <UserPlus className="h-5 w-5 text-primary" /> Invitar Administrador
                            </h2>
                            <p className="text-sm text-gray-400 max-w-lg">
                                Invita a otros miembros de tu equipo para gestionar la plataforma. Recibirán un correo con acceso directo al nivel "Super Admin".
                            </p>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-3 w-full md:max-w-md">
                            <input type="email" placeholder="email@tuequipo.com" className="bg-black/40 border border-white/10 rounded-lg px-4 py-2 w-full outline-none focus:border-primary/50 text-white" />
                            <Button variant="gold" className="font-bold flex-shrink-0" onClick={handleInviteAdmin} disabled={inviting}>
                                {inviting ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : "Enviar Invitación"}
                            </Button>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    )
}
