import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
// import { PROFESSIONALS_DATA } from "@/lib/data" // Removed mock
import { CheckCircle, Calendar, Clock, MapPin, Loader2, AlertCircle } from "lucide-react"
import { useState, useEffect } from "react"
import { Link, useParams, useNavigate } from "react-router-dom"
import { supabase, type Profile } from "@/lib/supabase"
import { useAuth } from "@/contexts/AuthContext"

export default function BookPage() {
    const { proId } = useParams()
    const { user } = useAuth()
    const navigate = useNavigate()

    const [pro, setPro] = useState<Profile | null>(null)
    const [loadingPro, setLoadingPro] = useState(true)

    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isSubmitted, setIsSubmitted] = useState(false)
    const [error, setError] = useState<string | null>(null)

    // Fetch Professional Data
    useEffect(() => {
        const fetchPro = async () => {
            if (!proId) return
            setLoadingPro(true)
            const { data, error } = await supabase
                .from('profiles')
                .select('*')
                .eq('id', proId)
                .single()

            if (error) {
                console.error("Error fetching pro:", error)
            } else {
                setPro(data)
            }
            setLoadingPro(false)
        }
        fetchPro()
    }, [proId])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!user) {
            // Store return url? For now just redirect
            navigate("/login")
            return
        }

        if (!pro) return

        setIsSubmitting(true)
        setError(null)

        const form = e.target as HTMLFormElement
        const formData = new FormData(form)

        // Extract form data
        const description = formData.get("description") as string
        const date = formData.get("date") as string
        const timeSlot = formData.get("timeSlot") as string
        const address = formData.get("address") as string
        const contactPhone = formData.get("contactPhone") as string

        const { error: insertError } = await supabase
            .from('requests')
            .insert({
                client_id: user.id,
                professional_id: pro.id,
                status: 'pending',
                description,
                date,
                time_slot: timeSlot,
                address,
                contact_phone: contactPhone
            })

        if (insertError) {
            console.error("Error submitting request:", insertError)
            setError("Hubo un error al enviar tu solicitud. Inténtalo nuevamente.")
            setIsSubmitting(false)
        } else {
            setIsSubmitted(true)
            setIsSubmitting(false)
        }
    }

    if (loadingPro) {
        return <div className="flex-1 flex items-center justify-center text-white"><Loader2 className="animate-spin mr-2" /> Cargando...</div>
    }

    if (!pro) {
        return <div className="flex-1 flex items-center justify-center text-white">Profesional no encontrado</div>
    }

    if (isSubmitted) {
        return (
            <div className="flex-1 flex flex-col items-center justify-center p-4 animate-in zoom-in duration-500">
                <div className="bg-card w-full max-w-md p-8 rounded-xl border border-white/10 text-center space-y-6">
                    <div className="w-20 h-20 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mx-auto">
                        <CheckCircle size={48} />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-white mb-2">¡Solicitud Enviada!</h1>
                        <p className="text-muted-foreground">
                            Hemos enviado tu solicitud a <strong>{pro.full_name}</strong>. Te contactará brevemente con una cotización.
                        </p>
                    </div>
                    <Button asChild variant="gold" className="w-full">
                        <Link to="/">Volver al Inicio</Link>
                    </Button>
                </div>
            </div>
        )
    }

    return (
        <div className="flex-1 container mx-auto px-4 md:px-6 py-12 animate-in fade-in duration-500">
            <div className="max-w-2xl mx-auto">
                <Link to={`/professionals/${pro.id}`} className="text-sm text-muted-foreground hover:text-white mb-6 block">
                    &larr; Volver al perfil
                </Link>

                <div className="bg-[#141414] border border-white/5 rounded-xl overflow-hidden shadow-2xl">
                    <div className="p-6 border-b border-white/5 bg-card/50">
                        <h1 className="text-2xl font-bold text-white">Solicitar Cotización</h1>
                        <div className="flex items-center gap-3 mt-4">
                            <div className="h-12 w-12 rounded-full bg-cover bg-center" style={{ backgroundImage: `url('${pro.avatar_url || 'https://via.placeholder.com/150'}')` }} />
                            <div>
                                <p className="font-bold text-white text-lg">{pro.full_name}</p>
                                <p className="text-primary text-sm">{pro.title}</p>
                            </div>
                        </div>
                    </div>

                    <div className="p-6 md:p-8">
                        {error && (
                            <div className="bg-red-500/10 text-red-500 p-3 rounded mb-4 flex items-center gap-2 text-sm">
                                <AlertCircle size={16} /> {error}
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-4">
                                <h3 className="font-semibold text-white">1. ¿Qué necesitas?</h3>
                                <textarea
                                    name="description"
                                    className="w-full h-32 bg-card border border-white/10 rounded-lg p-3 text-white placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                                    placeholder="Describe tu problema o proyecto en detalle..."
                                    required
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-sm text-muted-foreground">Fecha preferida</label>
                                    <div className="relative">
                                        <Calendar className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                                        <Input name="date" type="date" className="pl-9 bg-card border-white/10 text-white" required />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm text-muted-foreground">Horario</label>
                                    <div className="relative">
                                        <Clock className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                                        <select name="timeSlot" className="w-full h-9 rounded-md border border-white/10 bg-card px-3 py-1 text-sm shadow-sm transition-colors pl-9 text-white focus:outline-none focus:ring-1 focus:ring-primary">
                                            <option value="Mañana (8am - 12pm)">Mañana (8am - 12pm)</option>
                                            <option value="Tarde (12pm - 5pm)">Tarde (12pm - 5pm)</option>
                                            <option value="Noche (5pm - 8pm)">Noche (5pm - 8pm)</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <h3 className="font-semibold text-white">2. Tus datos de contacto</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <Input name="contactName" defaultValue={user?.user_metadata.full_name} placeholder="Tu nombre completo" className="bg-card border-white/10 text-white" required />
                                    <Input name="contactPhone" placeholder="+56 9 1234 5678" type="tel" className="bg-card border-white/10 text-white" required />
                                </div>
                                <div className="relative">
                                    <MapPin className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                                    <Input name="address" placeholder="Dirección (Comuna, Calle)" className="pl-9 bg-card border-white/10 text-white" required />
                                </div>
                            </div>

                            <Button type="submit" size="lg" variant="gold" className="w-full font-bold text-lg h-12" disabled={isSubmitting}>
                                {isSubmitting ? <Loader2 className="animate-spin mr-2" /> : "Enviar Solicitud"}
                            </Button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
