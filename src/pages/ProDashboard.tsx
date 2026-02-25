import { LayoutDashboard, Inbox, DollarSign, Settings, Star, AlertCircle, ArrowRight, Wallet, LogOut, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "@/contexts/AuthContext"

export default function ProDashboard() {
    const { user, signOut } = useAuth()
    const navigate = useNavigate()

    const handleLogout = async () => {
        await signOut()
        navigate("/login")
    }

    // Extract first name for a friendlier greeting
    const fullName = user?.user_metadata?.full_name || "Profesional"
    const firstName = fullName.split(' ')[0]

    return (
        <div className="min-h-screen bg-[#0F0F0F] text-white flex flex-col md:flex-row">

            {/* Sidebar */}
            <aside className="w-full md:w-64 bg-[#141414] border-r border-white/10 p-6 flex flex-col">
                <div className="mb-10">
                    <div className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Pro Panel</div>
                </div>

                <nav className="flex-1 space-y-2">
                    <Link to="/dashboard/pro" className="flex items-center gap-3 px-4 py-3 rounded-lg bg-primary/10 text-primary font-medium transition-colors">
                        <LayoutDashboard className="h-5 w-5" /> Resumen
                    </Link>
                    <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/5 text-gray-400 hover:text-white transition-colors">
                        <Inbox className="h-5 w-5" /> Oportunidades <span className="ml-auto bg-primary text-black text-xs font-bold px-2 py-0.5 rounded-full">3</span>
                    </button>
                    <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/5 text-gray-400 hover:text-white transition-colors">
                        <DollarSign className="h-5 w-5" /> Finanzas
                    </button>
                    <Link to="/pro/profile" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/5 text-gray-400 hover:text-white transition-colors">
                        <Settings className="h-5 w-5" /> Mi Perfil Público
                    </Link>
                </nav>

                <div className="mt-auto pt-6 border-t border-white/10">
                    <div className="flex flex-col gap-3 mb-5 px-2">
                        <div className="flex items-center gap-3">
                            <div className="flex items-center gap-2 group cursor-default">
                                <span className="font-bold text-lg tracking-tight">
                                    <span className="text-primary group-hover:text-white transition-colors duration-300">Soy</span>
                                    <span className="text-white group-hover:text-primary transition-colors duration-300">Negocio</span>
                                </span>
                            </div>
                            <div className="h-10 w-10 shrink-0 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold border border-primary/30">
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
                        <h1 className="text-3xl font-bold">¡Hola, <span className="text-primary">{firstName}</span>!</h1>
                        <p className="text-muted-foreground mt-1">Aquí tienes el resumen de tu rendimiento.</p>
                    </div>
                    <Button variant="outline" className="border-primary text-primary hover:bg-primary/20">
                        <Wallet className="h-4 w-4 mr-2" /> Recargar Saldo
                    </Button>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                    {/* Earnings Card */}
                    <div className="bg-[#1A1A1A] p-6 rounded-2xl border border-white/5 shadow-lg flex flex-col justify-between">
                        <div className="flex items-center gap-2 text-muted-foreground mb-4">
                            <DollarSign className="h-5 w-5 text-primary" /> Ganancias del Mes
                        </div>
                        <div className="text-4xl font-bold text-white mb-2">$850.000</div>
                        <div className="text-sm text-green-400 flex items-center gap-1">
                            <TrendingUp className="h-4 w-4" /> +12% vs mes anterior
                        </div>
                    </div>

                    {/* Performance Metrics */}
                    <div className="bg-[#1A1A1A] p-6 rounded-2xl border border-white/5 shadow-lg flex flex-col justify-between">
                        <div className="flex items-center gap-2 text-muted-foreground mb-4">
                            <Star className="h-5 w-5 text-primary" /> Calificación Promedio
                        </div>
                        <div className="text-4xl font-bold text-white mb-2 flex items-baseline gap-2">
                            4.9 <span className="text-lg text-primary">★</span>
                        </div>
                        <div className="text-sm text-gray-400">
                            Basado en 42 reseñas
                        </div>
                    </div>

                    {/* Weekly Budget */}
                    <div className="bg-[#1A1A1A] p-6 rounded-2xl border border-white/5 shadow-lg flex flex-col justify-between">
                        <div className="flex items-center gap-2 text-muted-foreground mb-4">
                            <AlertCircle className="h-5 w-5 text-primary" /> Presupuesto Semanal
                        </div>
                        <div className="mb-2 flex justify-between items-end">
                            <span className="text-2xl font-bold text-white">$15.000</span>
                            <span className="text-sm text-gray-400">/ $30.000 limit</span>
                        </div>
                        <Progress value={50} className="h-2 bg-black/50" />
                        <div className="text-xs text-gray-500 mt-3 text-right">Te queda el 50%</div>
                    </div>
                </div>

                {/* Bidding Inbox */}
                <section>
                    <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                        Buzón de Oportunidades <span className="bg-primary/20 text-primary text-sm px-3 py-1 rounded-full">Nuevas</span>
                    </h2>
                    <div className="flex flex-col gap-4">
                        {[
                            { client: "María Gonzáles", service: "Mantención de Calefón", location: "Providencia", time: "Hace 10 min", price: "$25.000" },
                            { client: "Roberto Silva", service: "Armado de Muebles", location: "Las Condes", time: "Hace 45 min", price: "$40.000" },
                            { client: "Familia Pérez", service: "Limpieza Post-Construcción", location: "Santiago Centro", time: "Hace 2 horas", price: "$85.000" },
                        ].map((lead, i) => (
                            <div key={i} className="bg-[#1A1A1A] p-5 rounded-2xl border border-white/5 hover:border-primary/50 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-4">
                                <div>
                                    <div className="flex items-center gap-3 mb-1">
                                        <h3 className="font-bold text-lg text-white">{lead.service}</h3>
                                        <span className="text-xs text-gray-500 flex items-center gap-1"><AlertCircle className="h-3 w-3" /> {lead.time}</span>
                                    </div>
                                    <p className="text-sm text-gray-400">{lead.client} • {lead.location}</p>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="text-right hidden md:block">
                                        <div className="text-xs text-muted-foreground">Presupuesto est.</div>
                                        <div className="font-bold text-white">{lead.price}</div>
                                    </div>
                                    <Button variant="gold" className="w-full md:w-auto font-bold">
                                        Enviar Cotización <ArrowRight className="ml-2 h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

            </main>
        </div>
    )
}
