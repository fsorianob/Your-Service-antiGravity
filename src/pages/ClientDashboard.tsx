import { Search, Home, Zap, Truck, ShieldCheck, ArrowRight, SunSnow, CalendarCheck, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function ClientDashboard() {
    return (
        <div className="min-h-screen bg-[#0F0F0F] text-white">
            <main className="container mx-auto px-4 py-8 max-w-7xl animate-in fade-in duration-500">

                {/* Header Section */}
                <div className="mb-12 text-center md:text-left">
                    <h1 className="text-3xl md:text-5xl font-bold mb-4">¿En qué podemos <span className="text-primary">ayudarte hoy?</span></h1>
                    <p className="text-muted-foreground text-lg">Encuentra a los mejores profesionales en Santiago para los proyectos de tu hogar.</p>
                </div>

                {/* Omnichannel Search */}
                <div className="bg-[#1A1A1A] rounded-2xl p-4 md:p-6 mb-12 shadow-2xl border border-white/5 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[80px] -mr-32 -mt-32 pointer-events-none"></div>
                    <form className="relative flex flex-col md:flex-row gap-4 z-10">
                        <div className="relative flex-1">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-primary" />
                            <Input
                                placeholder="Ej: 'Instalar lámparas en la cocina' o 'Reparar fuga de agua'..."
                                className="pl-12 h-14 bg-black/40 border-white/10 text-lg rounded-xl focus-visible:ring-primary/50 text-white placeholder:text-gray-500"
                            />
                        </div>
                        <Button variant="gold" className="h-14 px-8 text-lg font-bold rounded-xl whitespace-nowrap hidden md:flex">
                            Buscar Expertos
                        </Button>
                        <Button variant="gold" className="h-14 px-8 text-lg font-bold rounded-xl md:hidden w-full">
                            Buscar
                        </Button>
                    </form>

                    {/* Quick Access Categories */}
                    <div className="flex flex-wrap gap-3 mt-6">
                        <span className="text-sm font-medium text-gray-400 self-center mr-2">Servicios Populares:</span>
                        <Button variant="outline" size="sm" className="bg-black/30 border-white/10 text-white hover:border-primary/50 hover:bg-black/50 hover:text-primary transition-all rounded-full px-4">
                            <Home className="h-4 w-4 mr-2 text-primary" /> Limpieza
                        </Button>
                        <Button variant="outline" size="sm" className="bg-black/30 border-white/10 text-white hover:border-primary/50 hover:bg-black/50 hover:text-primary transition-all rounded-full px-4">
                            <Truck className="h-4 w-4 mr-2 text-primary" /> Mudanzas
                        </Button>
                        <Button variant="outline" size="sm" className="bg-black/30 border-white/10 text-white hover:border-primary/50 hover:bg-black/50 hover:text-primary transition-all rounded-full px-4">
                            <Zap className="h-4 w-4 mr-2 text-primary" /> Electricidad
                        </Button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Cost Planning Widget */}
                    <section className="bg-gradient-to-br from-[#1A1A1A] to-[#121212] rounded-2xl p-6 md:p-8 border border-white/5 shadow-xl">
                        <div className="flex items-center justify-between mb-8">
                            <div>
                                <h2 className="text-2xl font-bold flex items-center gap-2">
                                    <TrendingUp className="h-6 w-6 text-primary" /> Planificación de Costos
                                </h2>
                                <p className="text-muted-foreground mt-1">Estimaciones promedio en Santiago (Región Metropolitana)</p>
                            </div>
                            <div className="hidden sm:block p-3 rounded-xl bg-primary/10">
                                <ShieldCheck className="h-6 w-6 text-primary" />
                            </div>
                        </div>

                        <div className="space-y-4">
                            {[
                                { service: "Visita Técnica Diagnóstico", price: "$15.000 - $25.000" },
                                { service: "Limpieza Profunda (Depto 2 Hab)", price: "$40.000 - $60.000" },
                                { service: "Gasfitería Básica (Fugas)", price: "$25.000 - $45.000" },
                            ].map((item, i) => (
                                <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-black/40 border border-white/5 hover:border-primary/30 transition-colors group cursor-default">
                                    <span className="font-medium text-gray-200 group-hover:text-white transition-colors">{item.service}</span>
                                    <span className="font-bold text-primary">{item.price}</span>
                                </div>
                            ))}
                        </div>

                        <Button variant="link" className="mt-6 text-primary p-0 hover:text-white flex items-center gap-1">
                            Ver guía completa de precios <ArrowRight className="h-4 w-4" />
                        </Button>
                    </section>

                    {/* Seasonal Suggestions Widget */}
                    <section className="bg-gradient-to-bl from-[#1A1A1A] to-[#121212] rounded-2xl p-6 md:p-8 border border-white/5 shadow-xl">
                        <div className="flex items-center justify-between mb-8">
                            <div>
                                <h2 className="text-2xl font-bold flex items-center gap-2">
                                    <CalendarCheck className="h-6 w-6 text-primary" /> Sugerencias de Temporada
                                </h2>
                                <p className="text-muted-foreground mt-1">Servicios recomendados para el clima actual</p>
                            </div>
                            <div className="hidden sm:block p-3 rounded-xl bg-primary/10">
                                <SunSnow className="h-6 w-6 text-primary" />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {[
                                { title: "Mantenimiento Aire Acondicionado", desc: "Optimiza el rendimiento antes del pico de verano.", icon: SunSnow },
                                { title: "Limpieza de Canaletas", desc: "Preparación vital para la temporada de lluvias.", icon: Home },
                            ].map((item, i) => (
                                <div key={i} className="p-5 rounded-xl bg-black/40 border border-white/5 hover:border-primary/30 hover:bg-black/60 transition-all cursor-pointer group flex flex-col h-full">
                                    <item.icon className="h-8 w-8 text-primary mb-3 opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all" />
                                    <h3 className="font-bold text-lg mb-2 text-gray-200 group-hover:text-white">{item.title}</h3>
                                    <p className="text-sm text-gray-400 mt-auto">{item.desc}</p>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>

            </main>
        </div>
    )
}
