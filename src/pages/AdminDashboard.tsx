import { Activity, Shield, Settings, Check, X, TrendingUp, DollarSign, LogOut, Loader2, UserPlus, Users, Search, AlertTriangle, KeyRound } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"
import { useAuth } from "@/contexts/AuthContext"
import { useAdminData } from "@/hooks/useAdminData"
import type { PendingPro } from "@/hooks/useAdminData"
import { useState, useEffect } from "react"
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
        verifySuperAdminPin
    } = useAdminData()

    const [inviteEmail, setInviteEmail] = useState("")

    // Navigation State
    const [activeTab, setActiveTab] = useState<"overview" | "crm">("overview")

    // CRM States
    const [searchTerm, setSearchTerm] = useState("")
    const [roleFilter, setRoleFilter] = useState("all")

    // Super Admin Modal States
    const [isPinModalOpen, setIsPinModalOpen] = useState(false)
    const [pinInput, setPinInput] = useState("")
    const [userToDelete, setUserToDelete] = useState<PendingPro | null>(null)

    // Config State
    const [localSettings, setLocalSettings] = useState({ generalCommissionRate: 15, pricePerLead: 2000 })

    // Sync external settings on load
    useEffect(() => {
        if (!loading) setLocalSettings(settings)
    }, [settings, loading])

    const onSaveConfig = async () => {
        await handleSaveSettings(localSettings)
    }

    const onInviteSubmit = async () => {
        const success = await handleInviteAdmin(inviteEmail, user?.id)
        if (success) {
            setInviteEmail("")
        }
    }

    // Modal Handlers
    const requestUserDeletion = (user: PendingPro) => { // Changed parameter name to user for clarity
        setUserToDelete(user)
        setPinInput("")
        setIsPinModalOpen(true)
    }

    const confirmDeletion = async () => {
        if (!verifySuperAdminPin(pinInput)) {
            toast.error("SUPERclave incorrecta. Operación denegada.")
            return
        }

        if (userToDelete) {
            await handleReject(userToDelete.id, userToDelete.full_name) // handleReject is used for both pending pros and general users for deletion
        }
        setIsPinModalOpen(false)
        setUserToDelete(null)
    }

    // CRM Filters
    const filteredUsers = allUsers.filter(u => {
        const matchesSearch = (u.full_name?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
            (u.email?.toLowerCase() || "").includes(searchTerm.toLowerCase())
        const matchesRole = roleFilter === "all" || u.role === roleFilter
        return matchesSearch && matchesRole
    })

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
                    <button
                        onClick={() => setActiveTab("overview")}
                        className={"w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors " + (activeTab === 'overview' ? 'bg-primary/10 text-primary' : 'hover:bg-white/5 text-gray-400 hover:text-white')}
                    >
                        <Activity className="h-5 w-5" /> Resumen
                    </button>
                    <button
                        onClick={() => setActiveTab("crm")}
                        className={"w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors " + (activeTab === 'crm' ? 'bg-primary/10 text-primary' : 'hover:bg-white/5 text-gray-400 hover:text-white')}
                    >
                        <Users className="h-5 w-5" /> CRM Usuarios
                    </button>
                    <a href="#" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/5 text-gray-400 hover:text-white transition-colors">
                        <Shield className="h-5 w-5" /> Validaciones KYC <span className="ml-auto bg-primary text-black text-xs font-bold px-2 py-0.5 rounded-full">{pendingPros.length}</span>
                    </a>
                    <a href="#" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/5 text-gray-400 hover:text-white transition-colors">
                        <Settings className="h-5 w-5" /> Ajustes Globales
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
                        <h1 className="text-3xl font-bold">{activeTab === 'overview' ? 'Panel de Control' : 'Directorio Maestro CRM'}</h1>
                        <p className="text-muted-foreground mt-1">
                            {activeTab === 'overview' ? 'Métricas generales de la plataforma y gestión directiva.' : 'Búsqueda, auditoría y control de todos los perfiles de la base de datos.'}
                        </p>
                    </div>
                </header>

                {activeTab === 'overview' && (
                    <>
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
                                                value={localSettings.generalCommissionRate}
                                                onChange={(e) => setLocalSettings({ ...localSettings, generalCommissionRate: Number(e.target.value) })}
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
                                                value={localSettings.pricePerLead}
                                                onChange={(e) => setLocalSettings({ ...localSettings, pricePerLead: Number(e.target.value) })}
                                                className="bg-transparent w-full text-white px-4 py-2 outline-none"
                                            />
                                        </div>
                                    </div>

                                    <Button onClick={onSaveConfig} variant="outline" className="w-full border-primary/50 text-white hover:bg-primary/20 transition-colors mt-2">
                                        Guardar Cambios
                                    </Button>
                                </div>
                            </section>
                        </div>

                        {/* Recent Activity (New Features Section) */}
                        <section className="mb-10">
                            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                                <Activity className="h-5 w-5 text-primary" /> Actividad Reciente de Usuarios
                            </h2>
                            <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 overflow-hidden shadow-lg">
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left text-sm whitespace-nowrap">
                                        <thead className="bg-black/40 border-b border-white/10 text-gray-400">
                                            <tr>
                                                <th className="px-6 py-4 font-medium">Usuario</th>
                                                <th className="px-6 py-4 font-medium">Identificador</th>
                                                <th className="px-6 py-4 font-medium">Fecha de Registro</th>
                                                <th className="px-6 py-4 font-medium text-right">Rol</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-white/5">
                                            {recentUsers.length > 0 ? recentUsers.map(u => (
                                                <tr key={u.id} className="hover:bg-white/5 transition-colors">
                                                    <td className="px-6 py-4 flex items-center gap-3">
                                                        <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold border border-primary/30 uppercase text-xs">
                                                            {u.full_name?.charAt(0) || 'U'}
                                                        </div>
                                                        <span className="font-medium text-white">{u.full_name || 'Sin Nombre'}</span>
                                                    </td>
                                                    <td className="px-6 py-4 text-gray-400 font-mono text-xs">{u.id.substring(0, 8)}...</td>
                                                    <td className="px-6 py-4 text-gray-400">
                                                        {new Intl.DateTimeFormat('es-CL', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' }).format(new Date(u.created_at))}
                                                    </td>
                                                    <td className="px-6 py-4 text-right">
                                                        <span className={"px-2 py-1 rounded text-xs font-bold " + (
                                                            u.role === 'admin' ? 'bg-red-500/20 text-red-400' :
                                                                u.role === 'professional' ? 'bg-primary/20 text-primary' :
                                                                    'bg-blue-500/20 text-blue-400'
                                                        )}>          {u.role.toUpperCase()}
                                                        </span>
                                                    </td>
                                                </tr>
                                            )) : (
                                                <tr>
                                                    <td colSpan={4} className="px-6 py-8 text-center text-gray-500">No hay actividad reciente</td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </section>

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
                    </>
                )}

                {activeTab === 'crm' && (
                    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        {/* Search and Filters */}
                        <div className="flex flex-col sm:flex-row gap-4">
                            <div className="relative flex-1">
                                <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-500" />
                                <input
                                    type="text"
                                    placeholder="Buscar por nombre o correo electrónico..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white outline-none focus:border-primary/50 transition-colors shadow-inner"
                                />
                            </div>
                            <select
                                value={roleFilter}
                                onChange={(e) => setRoleFilter(e.target.value)}
                                className="bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white outline-none focus:border-primary/50 appearance-none min-w-[150px]"
                            >
                                <option value="all" className="bg-[#141414]">Todos los Roles</option>
                                <option value="client" className="bg-[#141414]">Clientes</option>
                                <option value="professional" className="bg-[#141414]">Profesionales</option>
                                <option value="admin" className="bg-[#141414]">Administradores</option>
                            </select>
                        </div>

                        {/* Users Table */}
                        <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 overflow-hidden shadow-2xl">
                            <div className="overflow-x-auto">
                                <table className="w-full text-left text-sm whitespace-nowrap">
                                    <thead className="bg-black/40 border-b border-white/10 text-gray-400">
                                        <tr>
                                            <th className="px-6 py-4 font-semibold">Usuario</th>
                                            <th className="px-6 py-4 font-semibold">Rol</th>
                                            <th className="px-6 py-4 font-semibold">Fecha Registro</th>
                                            <th className="px-6 py-4 font-semibold text-right">Acciones Peligrosas</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-white/5">
                                        {filteredUsers.length > 0 ? filteredUsers.map(user => (
                                            <tr key={user.id} className="hover:bg-white/5 transition-colors group">
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-3">
                                                        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold border border-primary/20 uppercase text-sm shrink-0">
                                                            {user.full_name?.charAt(0) || 'U'}
                                                        </div>
                                                        <div>
                                                            <div className="font-bold text-white tracking-tight">{user.full_name || 'Sin Nombre'}</div>
                                                            <div className="text-gray-500 text-xs">{user.email}</div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className={"px-2.5 py-1 rounded text-xs font-bold uppercase tracking-wider " + (
                                                        user.role === 'admin' ? 'bg-red-500/20 text-red-500 border border-red-500/30' :
                                                            user.role === 'professional' ? 'bg-primary/20 text-primary border border-primary/30' :
                                                                'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                                                    )}>
                                                        {user.role || 'client'}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 text-gray-400">
                                                    {user.created_at ? new Intl.DateTimeFormat('es-CL', { day: '2-digit', month: 'long', year: 'numeric' }).format(new Date(user.created_at)) : 'N/A'}
                                                </td>
                                                <td className="px-6 py-4 text-right">
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={() => requestUserDeletion(user)}
                                                        className="text-gray-500 hover:text-red-400 hover:bg-red-500/10 opacity-0 group-hover:opacity-100 transition-all font-medium"
                                                        disabled={user.role === 'admin'}
                                                    >
                                                        {user.role === 'admin' ? 'Protegido' : 'Suspender/Eliminar'}
                                                    </Button>
                                                </td>
                                            </tr>
                                        )) : (
                                            <tr>
                                                <td colSpan={4} className="px-6 py-12 text-center text-gray-500">
                                                    <div className="flex flex-col items-center justify-center">
                                                        <Search className="h-10 w-10 text-gray-600 mb-3 opacity-50" />
                                                        <p>No se encontraron usuarios coincidiendo con la búsqueda.</p>
                                                    </div>
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                )}
            </main>

            {/* SUPERclave Modal */}
            {isPinModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setIsPinModalOpen(false)}></div>
                    <div className="relative bg-[#141414] border border-red-500/30 rounded-2xl w-full max-w-sm p-8 shadow-2xl shadow-red-500/20 animate-in zoom-in-95 duration-200">
                        <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-red-500/20 p-4 rounded-full border border-red-500/50 backdrop-blur-md">
                            <AlertTriangle className="h-8 w-8 text-red-500" />
                        </div>

                        <div className="text-center mt-6 mb-6">
                            <h3 className="text-xl font-bold text-white mb-2">Acción Destructiva</h3>
                            <p className="text-sm text-gray-400">Estás a punto de eliminar definitivamente al usuario <span className="text-white font-bold">{userToDelete?.full_name}</span>. Ingresa tu SUPERclave para autorizar.</p>
                        </div>

                        <div className="space-y-4">
                            <div className="relative">
                                <KeyRound className="absolute left-3 top-3 h-5 w-5 text-gray-500" />
                                <input
                                    type="password"
                                    placeholder="PIN de Seguridad Maestro"
                                    value={pinInput}
                                    onChange={(e) => setPinInput(e.target.value)}
                                    className="w-full pl-10 pr-4 py-3 bg-black/50 border border-white/10 focus:border-red-500/50 rounded-xl text-center text-xl tracking-widest text-white outline-none transition-colors"
                                    autoFocus
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') confirmDeletion()
                                    }}
                                />
                            </div>

                            <div className="flex gap-3 pt-2">
                                <Button variant="outline" className="flex-1 border-white/10 hover:bg-white/5" onClick={() => setIsPinModalOpen(false)}>
                                    Cancelar
                                </Button>
                                <Button variant="destructive" className="flex-1 bg-red-600 hover:bg-red-700 text-white font-bold" onClick={confirmDeletion} disabled={isRejecting !== null || !pinInput}>
                                    {isRejecting ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Ejecutar'}
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
