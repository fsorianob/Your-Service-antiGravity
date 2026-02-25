import { Activity, Shield, Settings, Check, X, TrendingUp, DollarSign, LogOut, Loader2, UserPlus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"
import { useAuth } from "@/contexts/AuthContext"
import { useAdminData } from "@/hooks/useAdminData"
import { platformConfig } from "@/config/platform"
import { useState } from "react"
import { toast } from "sonner"

export default function AdminDashboard() {
    const { user, signOut } = useAuth()
    const navigate = useNavigate()

    const handleLogout = async () => {
        await signOut()
        navigate("/login")
    }

    const fullName = user?.user_metadata?.full_name || "Administrador"
    const firstName = fullName.split(' ')[0]

    const {
        metrics,
        pendingPros,
        loading,
        isApproving,
        isRejecting,
        isInviting,
        handleApprove,
        handleReject,
        handleInviteAdmin
    } = useAdminData()

    const [inviteEmail, setInviteEmail] = useState("")

    // Config State
    const [config, setConfig] = useState(platformConfig.get())

    const handleSaveConfig = () => {
        platformConfig.set(config)
        toast.success("Configuración de ingresos guardada exitosamente.")
    }

    const onInviteSubmit = async () => {
        const success = await handleInviteAdmin(inviteEmail, user?.id)
        if (success) {
            setInviteEmail("")
        }
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
                    <div className="bg-white/5 backdrop-blur-xl p-6 rounded-2xl border border-white/10 flex flex-col gap-2 shadow-lg shadow-black/20 hover:border-white/20 transition-all duration-300">
                        <div className="text-gray-400 text-sm font-medium">Usuarios Totales</div>
                        <div className="text-4xl font-bold tracking-tight">{metrics.totalUsers}</div>
                        <div className="text-green-400 text-xs font-semibold flex items-center mt-auto pt-2">
                            <TrendingUp className="h-3 w-3 mr-1" /> Actualizado
                        </div>
                    </div>
                    <div className="bg-white/5 backdrop-blur-xl p-6 rounded-2xl border border-white/10 flex flex-col gap-2 shadow-lg shadow-black/20 hover:border-white/20 transition-all duration-300">
                        <div className="text-gray-400 text-sm font-medium">Profesionales Activos</div>
                        <div className="text-4xl font-bold tracking-tight">{metrics.activePros}</div>
                        <div className="text-green-400 text-xs font-semibold flex items-center mt-auto pt-2">
                            <TrendingUp className="h-3 w-3 mr-1" /> Verificados
                        </div>
                    </div>
                    <div className="bg-white/5 backdrop-blur-xl p-6 rounded-2xl border border-primary/20 flex flex-col gap-2 shadow-lg shadow-primary/5 hover:border-primary/40 transition-all duration-300">
                        <div className="text-primary/90 text-sm font-semibold">Ingresos Mensuales</div>
                        <div className="text-4xl font-bold text-primary tracking-tight">$0</div>
                        <div className="text-primary/60 text-xs font-semibold flex items-center mt-auto pt-2">
                            Próximamente
                        </div>
                    </div>
                    <div className="bg-white/5 backdrop-blur-xl p-6 rounded-2xl border border-white/10 flex flex-col gap-2 shadow-lg shadow-black/20 hover:border-white/20 transition-all duration-300">
                        <div className="text-gray-400 text-sm font-medium">Servicios Completados</div>
                        <div className="text-4xl font-bold tracking-tight">{metrics.completedServices}</div>
                        <div className="text-gray-500 text-xs font-semibold mt-auto pt-2">Desde el lanzamiento</div>
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
                            <div className="bg-white/5 backdrop-blur-md p-8 rounded-2xl border border-white/10 text-center text-gray-400 shadow-inner">
                                No hay profesionales pendientes de verificación en este momento.
                            </div>
                        ) : (
                            <div className="flex gap-4 overflow-x-auto pb-4 snap-x hide-scrollbar">
                                {pendingPros.map((pro) => (
                                    <div key={pro.id} className="min-w-[300px] w-80 bg-white/5 backdrop-blur-xl p-5 rounded-2xl border border-white/10 snap-start flex-shrink-0 flex flex-col justify-between shadow-lg hover:border-white/20 transition-all">
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
                                            <p className="text-sm text-gray-300 mb-6 bg-black/20 px-3 py-2 rounded-lg border border-white/5">{pro.category || 'Categoría no definida'}</p>
                                        </div>

                                        <div className="flex gap-2 mt-auto">
                                            <Button
                                                variant="gold"
                                                size="sm"
                                                className="flex-1 font-bold"
                                                onClick={() => handleApprove(pro.id, pro.full_name)}
                                                disabled={isApproving === pro.id || isRejecting === pro.id}
                                            >
                                                {isApproving === pro.id ? <Loader2 className="h-4 w-4 mr-1 animate-spin" /> : <Check className="h-4 w-4 mr-1" />}
                                                Aprobar
                                            </Button>
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                className="flex-1 border-white/10 hover:bg-red-500/20 hover:text-red-400 hover:border-red-500/30 transition-colors"
                                                onClick={() => handleReject(pro.id, pro.full_name)}
                                                disabled={isApproving === pro.id || isRejecting === pro.id}
                                            >
                                                {isRejecting === pro.id ? <Loader2 className="h-4 w-4 mr-1 animate-spin" /> : <X className="h-4 w-4 mr-1" />}
                                                Rechazar
                                            </Button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </section>

                    {/* Revenue Management */}
                    <section className="bg-gradient-to-b from-white/10 to-transparent p-6 rounded-2xl border border-white/10 backdrop-blur-xl shadow-lg">
                        <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                            <DollarSign className="h-5 w-5 text-primary" /> Gestión de Ingresos
                        </h2>

                        <div className="space-y-6">
                            <div>
                                <label className="text-sm text-gray-300 font-medium mb-1 block">Tasa de Comisión (Generales)</label>
                                <div className="flex bg-black/40 rounded-lg border border-white/10 focus-within:border-primary/50 overflow-hidden transition-colors">
                                    <input
                                        type="number"
                                        value={config.generalCommissionRate}
                                        onChange={(e) => setConfig({ ...config, generalCommissionRate: Number(e.target.value) })}
                                        className="bg-transparent w-full text-white px-4 py-2 outline-none"
                                    />
                                    <div className="bg-white/5 px-4 flex items-center text-gray-400 font-medium">%</div>
                                </div>
                            </div>

                            <div>
                                <label className="text-sm text-gray-300 font-medium mb-1 block">Precio por Lead (Bidding)</label>
                                <div className="flex bg-black/40 rounded-lg border border-white/10 focus-within:border-primary/50 overflow-hidden transition-colors">
                                    <div className="bg-white/5 px-4 flex items-center text-gray-400 font-medium">$</div>
                                    <input
                                        type="number"
                                        value={config.pricePerLead}
                                        onChange={(e) => setConfig({ ...config, pricePerLead: Number(e.target.value) })}
                                        className="bg-transparent w-full text-white px-4 py-2 outline-none"
                                    />
                                </div>
                            </div>

                            <Button onClick={handleSaveConfig} variant="outline" className="w-full border-primary/50 text-white hover:bg-primary/20 transition-colors mt-2">
                                Guardar Cambios
                            </Button>
                        </div>
                    </section>
                </div>

                {/* Invite Admin Section */}
                <section className="bg-white/5 backdrop-blur-xl p-8 rounded-2xl border border-white/10 shadow-2xl relative overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                    <div className="flex flex-col md:flex-row gap-6 md:items-center justify-between relative z-10">
                        <div>
                            <h2 className="text-xl font-bold flex items-center gap-2 mb-2">
                                <UserPlus className="h-5 w-5 text-primary" /> Invitar Administrador
                            </h2>
                            <p className="text-sm text-gray-400 max-w-lg">
                                Invita a otros miembros de tu equipo para gestionar la plataforma. Recibirán un correo con acceso directo al nivel "Super Admin".
                            </p>
                        </div>
                        <form onSubmit={(e) => { e.preventDefault(); onInviteSubmit(); }} className="flex flex-col sm:flex-row gap-3 w-full md:max-w-md">
                            <input
                                type="email"
                                placeholder="email@tuequipo.com"
                                value={inviteEmail}
                                onChange={(e) => setInviteEmail(e.target.value)}
                                className="bg-black/60 border border-white/10 rounded-lg px-4 py-2 w-full outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 text-white transition-all shadow-inner"
                                required
                            />
                            <Button type="submit" variant="gold" className="font-bold flex-shrink-0" disabled={isInviting || !inviteEmail}>
                                {isInviting ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : "Enviar Invitación"}
                            </Button>
                        </form>
                    </div>
                </section>
            </main>
        </div>
    )
}
