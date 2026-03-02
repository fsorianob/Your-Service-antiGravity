import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Star, MapPin, ShieldCheck, Clock, Loader2, Calendar, AlertCircle } from "lucide-react"
// import { PROFESSIONALS_DATA } from "@/lib/data" // Removed mock data
import { useParams, useNavigate } from "react-router-dom"
import { ShareButton } from "@/components/profile-actions"
import { useEffect, useState } from "react"
import { supabase, type Profile } from "@/lib/supabase"
import { useAuth } from "@/contexts/AuthContext"

export default function ProfessionalProfile() {
    const { id } = useParams()
    const navigate = useNavigate()
    const { user } = useAuth()

    // Modal states
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isSubmitted, setIsSubmitted] = useState(false)
    const [submitError, setSubmitError] = useState<string | null>(null)

    const [pro, setPro] = useState<Profile | null>(null)
    const [loading, setLoading] = useState(true)

    // Using 'any' for joined tables for quick implementation, strictly should define extended types
    const [services, setServices] = useState<any[]>([])
    const [reviews, setReviews] = useState<any[]>([])

    useEffect(() => {
        const fetchProDetails = async () => {
            if (!id) return;
            setLoading(true)

            // Fetch Profile
            const { data: profileData, error: profileError } = await supabase
                .from('profiles')
                .select('*')
                .eq('id', id)
                .single()

            if (profileError) {
                console.error("Error fetching profile:", profileError)
            } else {
                setPro(profileData)
            }

            // Fetch Services
            const { data: servicesData } = await supabase
                .from('services')
                .select('*')
                .eq('professional_id', id)

            if (servicesData) setServices(servicesData)

            // Fetch Reviews
            const { data: reviewsData } = await supabase
                .from('reviews')
                .select('*, profiles:client_id(full_name)')
                .eq('professional_id', id)

            if (reviewsData) setReviews(reviewsData)

            setLoading(false)
        }

        fetchProDetails()
    }, [id])

    const handleBookingClick = () => {
        if (!user) {
            navigate("/login")
            return
        }
        setIsModalOpen(true)
    }

    const handleSubmitBooking = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!user || !pro) return

        setIsSubmitting(true)
        setSubmitError(null)

        const form = e.target as HTMLFormElement
        const formData = new FormData(form)

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
            setSubmitError("Hubo un error al guardar. Inténtalo de nuevo.")
            setIsSubmitting(false)
        } else {
            setIsSubmitted(true)
            setIsSubmitting(false)
        }
    }

    if (loading) {
        return <div className="min-h-screen flex items-center justify-center text-white"><Loader2 className="animate-spin mr-2" /> Cargando perfil...</div>
    }

    if (!pro) {
        return <div className="min-h-screen flex items-center justify-center text-white">Profesional no encontrado</div>
    }

    return (
        <div className="flex-1 pb-20 animate-in fade-in duration-500">
            {/* Cover Image */}
            <div className="h-64 md:h-80 w-full relative overflow-hidden">
                <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('${pro.image_cover_url || 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?q=80&w=2070&auto=format&fit=crop'}')` }} />
                <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
            </div>

            <div className="container mx-auto px-4 md:px-6 relative -mt-20 z-10">
                <div className="flex flex-col md:flex-row gap-8">
                    {/* Profile Sidebar/Header Info */}
                    <div className="w-full md:w-1/3 lg:w-1/4">
                        <div className="bg-card border border-white/10 rounded-xl p-6 shadow-xl relative overflow-hidden">
                            <div className="w-32 h-32 rounded-full border-4 border-background shadow-lg overflow-hidden mx-auto md:mx-0 mb-4 bg-cover bg-center" style={{ backgroundImage: `url('${pro.avatar_url || 'https://via.placeholder.com/150'}')` }} />

                            <div className="text-center md:text-left">
                                <h1 className="text-2xl font-bold text-white mb-1">{pro.full_name}</h1>
                                <p className="text-primary font-medium mb-3">{pro.title}</p>

                                <div className="flex items-center justify-center md:justify-start gap-2 mb-4">
                                    {pro.verified && (
                                        <span className="bg-primary/20 text-primary text-xs font-bold px-2 py-1 rounded flex items-center gap-1">
                                            <ShieldCheck size={12} /> VERIFICADO
                                        </span>
                                    )}
                                    <span className="bg-white/5 text-white text-xs font-bold px-2 py-1 rounded flex items-center gap-1">
                                        <Star size={12} className="fill-primary text-primary" /> {pro.rating}
                                    </span>
                                </div>

                                <div className="flex flex-col gap-2 text-sm text-muted-foreground border-t border-white/10 pt-4 mt-2">
                                    <div className="flex items-center justify-center md:justify-start gap-2">
                                        <MapPin size={14} className="text-primary" /> {pro.location}
                                    </div>
                                    <div className="flex items-center justify-center md:justify-start gap-2">
                                        <Clock size={14} className="text-primary" /> Disponible: {pro.availability}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="flex-1 space-y-8 mt-4 md:mt-12">
                        {/* About */}
                        <section>
                            <h2 className="text-xl font-bold text-white mb-4">Sobre mí</h2>
                            <p className="text-muted-foreground leading-relaxed">
                                {pro.about || pro.description}
                            </p>
                        </section>

                        {/* Services */}
                        <section>
                            <h2 className="text-xl font-bold text-white mb-4">Servicios y Precios</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {services.length > 0 ? services.map((service, index) => (
                                    <Card key={index} className="bg-[#141414] border-white/5 hover:border-primary/20 transition-colors">
                                        <CardContent className="p-4 flex justify-between items-center">
                                            <span className="text-white font-medium">{service.name}</span>
                                            <span className="text-primary font-bold">{service.price}</span>
                                        </CardContent>
                                    </Card>
                                )) : <p className="text-muted-foreground">No hay servicios registrados.</p>}
                            </div>
                        </section>

                        {/* Reviews */}
                        <section>
                            <h2 className="text-xl font-bold text-white mb-4">Opiniones de Clientes <span className="text-muted-foreground text-sm font-normal">({pro.reviews_count})</span></h2>
                            <div className="space-y-4">
                                {reviews.length > 0 ? reviews.map((review, index) => (
                                    <div key={index} className="bg-card/50 rounded-lg p-4 border border-white/5">
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="font-bold text-white">{review.profiles?.full_name || 'Usuario'}</span>
                                            <div className="flex text-primary">
                                                {[...Array(5)].map((_, i) => (
                                                    <Star key={i} size={12} className={i < review.rating ? "fill-primary" : "text-muted"} />
                                                ))}
                                            </div>
                                        </div>
                                        <p className="text-sm text-muted-foreground italic">"{review.comment}"</p>
                                    </div>
                                )) : <p className="text-muted-foreground">Aún no hay opiniones.</p>}
                            </div>
                        </section>
                    </div>
                </div>
            </div>

            {/* Fixed Bottom CTA Bar for Mobile/Desktop */}
            <div className="fixed bottom-0 left-0 right-0 bg-background/95 backdrop-blur border-t border-white/10 p-4 z-50">
                <div className="container mx-auto flex items-center justify-between gap-4">
                    <div className="hidden md:block">
                        <p className="text-sm text-muted-foreground">Precio estimado</p>
                        <p className="text-xl font-bold text-white">{pro.price_range}</p>
                    </div>
                    <div className="flex gap-2 w-full md:w-auto">
                        <ShareButton />
                        <Button
                            onClick={handleBookingClick}
                            variant="gold"
                            size="lg"
                            className="flex-[4] md:w-64 w-full font-bold text-black h-full"
                        >
                            Solicitar Cotización
                        </Button>
                    </div>
                </div>
            </div>

            {/* Modal de Reserva */}
            {isModalOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in duration-200">
                    <div className="bg-[#141414] border border-white/10 rounded-xl w-full max-w-lg max-h-[90vh] overflow-y-auto relative shadow-2xl">
                        {/* Botón de cierre */}
                        <button
                            onClick={() => { setIsModalOpen(false); setIsSubmitted(false); setSubmitError(null); }}
                            className="absolute top-4 right-4 text-muted-foreground hover:text-white"
                        >
                            ✕
                        </button>

                        <div className="p-6">
                            <h2 className="text-2xl font-bold text-white mb-2">Solicitar Cotización</h2>
                            <p className="text-sm text-muted-foreground mb-6">Contacta a {pro.full_name}</p>

                            {isSubmitted ? (
                                <div className="text-center py-8 space-y-4 animate-in zoom-in duration-500">
                                    <div className="w-16 h-16 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <ShieldCheck size={32} />
                                    </div>
                                    <h3 className="text-xl font-bold text-white">¡Solicitud Enviada!</h3>
                                    <p className="text-muted-foreground">Tu solicitud ha sido enviada con éxito. El profesional te contactará pronto.</p>
                                    <Button
                                        variant="gold"
                                        className="mt-6 w-full text-black font-bold h-12"
                                        onClick={() => { setIsModalOpen(false); setIsSubmitted(false); }}
                                    >
                                        Cerrar
                                    </Button>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmitBooking} className="space-y-5">
                                    {submitError && (
                                        <div className="bg-red-500/10 text-red-500 p-3 rounded-lg flex items-center gap-2 text-sm">
                                            <AlertCircle size={16} /> {submitError}
                                        </div>
                                    )}

                                    <div className="space-y-3">
                                        <label className="text-sm font-semibold text-white">1. ¿Qué necesitas?</label>
                                        <textarea
                                            name="description"
                                            className="w-full h-24 bg-background border border-white/10 rounded-lg p-3 text-white placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                                            placeholder="Describe tu problema o proyecto en detalle..."
                                            required
                                        />
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <label className="text-sm font-semibold text-white">Fecha sugerida</label>
                                            <div className="relative">
                                                <Calendar className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                                                <input name="date" type="date" className="w-full h-10 pl-9 rounded-md bg-background border border-white/10 text-white focus:outline-none focus:ring-1 focus:ring-primary" required />
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-semibold text-white">Horario</label>
                                            <div className="relative">
                                                <Clock className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                                                <select name="timeSlot" className="w-full h-10 pl-9 rounded-md bg-background border border-white/10 text-white focus:outline-none focus:ring-1 focus:ring-primary" defaultValue="Tarde (12pm - 5pm)">
                                                    <option value="Mañana (8am - 12pm)">Mañana (8am - 12pm)</option>
                                                    <option value="Tarde (12pm - 5pm)">Tarde (12pm - 5pm)</option>
                                                    <option value="Noche (5pm - 8pm)">Noche (5pm - 8pm)</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-3 pt-2">
                                        <label className="text-sm font-semibold text-white">2. Tus datos de contacto</label>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <input name="contactName" defaultValue={user?.user_metadata?.full_name || ''} placeholder="Tu nombre" className="w-full h-10 px-3 rounded-md bg-background border border-white/10 text-white focus:outline-none focus:ring-1 focus:ring-primary" required />
                                            <input name="contactPhone" type="tel" placeholder="+56 9 1234 5678" className="w-full h-10 px-3 rounded-md bg-background border border-white/10 text-white focus:outline-none focus:ring-1 focus:ring-primary" required />
                                        </div>
                                        <div className="relative">
                                            <MapPin className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                                            <input name="address" placeholder="Dirección para la visita" className="w-full h-10 pl-9 rounded-md bg-background border border-white/10 text-white focus:outline-none focus:ring-1 focus:ring-primary" required />
                                        </div>
                                    </div>

                                    <Button type="submit" variant="gold" className="w-full h-12 text-lg font-bold text-black mt-2" disabled={isSubmitting}>
                                        {isSubmitting ? <Loader2 className="animate-spin mr-2" /> : "Confirmar Solicitud"}
                                    </Button>
                                </form>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
