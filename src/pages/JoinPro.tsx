import { Button } from "@/components/ui/button"
import { TrendingUp, Shield, Users, Loader2 } from "lucide-react"
import { useAuth } from "@/contexts/AuthContext"
import { Link, useNavigate } from "react-router-dom"
import { supabase } from "@/lib/supabase"
import { useState } from "react"

export default function JoinProPage() {
    const { user } = useAuth()
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)

    const handleJoin = async () => {
        if (!user) {
            navigate("/register")
            return
        }

        setLoading(true)
        // Upgrade current user to professional
        const { error } = await supabase
            .from('profiles')
            .update({ role: 'professional' })
            .eq('id', user.id)

        if (error) {
            console.error("Error upgrading user:", error)
            setLoading(false)
        } else {
            // Ideally redirect to a profile edit page, but we'll go home for now or show success
            // Force reload or state update might be needed to reflect role change in UI if we stored role in context
            // But we only store 'user' which has metadata. Metadata won't auto-update without refresh or manual sync.
            // For now, let's just go to their profile (which will look empty)
            navigate(`/professionals/${user.id}`)
        }
    }

    return (
        <div className="flex-1 animate-in fade-in duration-500">
            {/* Hero */}
            <section className="relative py-24 md:py-32 overflow-hidden bg-[#141414]">
                <div className="absolute inset-0 z-0 opacity-30 bg-[url('/fondo-alternativo.png')] bg-cover bg-center bg-no-repeat" />
                <div className="absolute inset-0 z-0 bg-gradient-to-b from-transparent via-[#141414]/50 to-[#141414]" />

                <div className="container relative z-10 mx-auto px-4 md:px-6">
                    <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-12">

                        {/* Left GIF - VideoBarbero */}
                        <div className="hidden lg:block w-64 lg:w-72 shrink-0 transform -rotate-2 hover:rotate-0 hover:-translate-y-2 transition-all duration-500">
                            <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-[0_0_30px_rgba(251,211,141,0.15)] bg-[#1F1F1F]">
                                <img src="/VideoBarberoGIF.gif" alt="Especialista Barbero" className="w-full h-auto object-cover opacity-90 hover:opacity-100 transition-opacity" />
                            </div>
                        </div>

                        {/* Central Text */}
                        <div className="text-center max-w-2xl flex-1">
                            <h1 className="text-[clamp(2.5rem,5vw+1rem,3.75rem)] font-bold text-white mb-6 leading-tight tracking-tight">
                                Haz crecer tus oportunidades como Especialista con <span className="text-[#fbd38d]">Your</span><span className="text-white">Service</span>
                            </h1>
                            <p className="text-lg md:text-xl text-muted-foreground mb-10 leading-relaxed max-w-[60ch] mx-auto">
                                Conectamos a profesionales de calidad con clientes que buscan un servicio excepcional. Únete hoy.
                            </p>

                            <Button size="lg" variant="gold" className="text-lg font-bold px-10 h-14 shadow-[0_0_20px_rgba(251,211,141,0.3)] hover:shadow-[0_0_30px_rgba(251,211,141,0.5)] transition-all duration-300" onClick={handleJoin} disabled={loading}>
                                {loading ? <Loader2 className="animate-spin mr-2" /> : "Empezar Ahora"}
                            </Button>

                            {!user && (
                                <p className="mt-6 text-sm text-muted-foreground">
                                    ¿Ya tienes cuenta? <Link to="/login" className="text-primary font-medium hover:underline">Inicia sesión</Link>
                                </p>
                            )}
                        </div>

                        {/* Right GIF - VideoFontanero */}
                        <div className="hidden lg:block w-64 lg:w-72 shrink-0 transform rotate-2 hover:rotate-0 hover:-translate-y-2 transition-all duration-500">
                            <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-[0_0_30px_rgba(251,211,141,0.15)] bg-[#1F1F1F]">
                                <img src="/VideoFontaneroGIF.gif" alt="Especialista Fontanero" className="w-full h-auto object-cover opacity-90 hover:opacity-100 transition-opacity" />
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* Benefits */}
            <section className="py-20 bg-background">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        <div className="text-center space-y-4">
                            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto text-primary">
                                <TrendingUp size={32} />
                            </div>
                            <h3 className="text-xl font-bold text-white">Más Clientes</h3>
                            <p className="text-muted-foreground">Recibe solicitudes de cotización diariamente de clientes verificados.</p>
                        </div>
                        <div className="text-center space-y-4">
                            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto text-primary">
                                <Shield size={32} />
                            </div>
                            <h3 className="text-xl font-bold text-white">Pagos Seguros</h3>
                            <p className="text-muted-foreground">Garantizamos el pago por tus servicios completados.</p>
                        </div>
                        <div className="text-center space-y-4">
                            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto text-primary">
                                <Users size={32} />
                            </div>
                            <h3 className="text-xl font-bold text-white">Comunidad</h3>
                            <p className="text-muted-foreground">Forma parte de la red de profesionales más prestigiosa de Santiago.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Steps */}
            <section className="py-20 border-t border-white/5 bg-[#141414]">
                <div className="container mx-auto px-4 md:px-6">
                    <h2 className="text-3xl font-bold text-white text-center mb-16">¿Cómo funciona?</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                        <div className="flex gap-4">
                            <div className="w-8 h-8 rounded-full bg-primary text-black font-bold flex items-center justify-center shrink-0">1</div>
                            <div>
                                <h4 className="text-xl font-bold text-white mb-2">Crea tu Perfil</h4>
                                <p className="text-muted-foreground">Sube tus fotos, describe tus servicios y establece tus precios.</p>
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <div className="w-8 h-8 rounded-full bg-primary text-black font-bold flex items-center justify-center shrink-0">2</div>
                            <div>
                                <h4 className="text-xl font-bold text-white mb-2">Verifícate</h4>
                                <p className="text-muted-foreground">Validamos tus antecedentes para dar confianza a los clientes.</p>
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <div className="w-8 h-8 rounded-full bg-primary text-black font-bold flex items-center justify-center shrink-0">3</div>
                            <div>
                                <h4 className="text-xl font-bold text-white mb-2">Recibe Solicitudes</h4>
                                <p className="text-muted-foreground">Te notificaremos cuando alguien necesite tus servicios.</p>
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <div className="w-8 h-8 rounded-full bg-primary text-black font-bold flex items-center justify-center shrink-0">4</div>
                            <div>
                                <h4 className="text-xl font-bold text-white mb-2">¡A Trabajar!</h4>
                                <p className="text-muted-foreground">Realiza el trabajo y recibe tu pago y calificación.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
