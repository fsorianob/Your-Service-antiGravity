import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Star, MapPin, ShieldCheck, Clock, Loader2 } from "lucide-react"
// import { PROFESSIONALS_DATA } from "@/lib/data" // Removed mock data
import { useParams, Link } from "react-router-dom"
import { ShareButton } from "@/components/profile-actions"
import { useEffect, useState } from "react"
import { supabase, type Profile } from "@/lib/supabase"

export default function ProfessionalProfile() {
    const { id } = useParams()
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
                        <Link to={`/book/${pro.id}`} className="flex-[4] md:w-64">
                            <Button variant="gold" size="lg" className="w-full font-bold text-black h-full">
                                Solicitar Cotización
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
