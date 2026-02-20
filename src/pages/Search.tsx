import { Map, Filter, Star, Clock, CheckCircle, MapPin, X, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
// import { PROFESSIONALS_DATA } from "@/lib/data" // Removed mock data
import { Link, useSearchParams, useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import { supabase, type Profile } from "@/lib/supabase"

export default function SearchPage() {
    const [searchParams] = useSearchParams()
    const navigate = useNavigate()

    const query = searchParams.get("q")?.toLowerCase() || ""
    const categoryParam = searchParams.get("category")

    const [professionals, setProfessionals] = useState<Profile[]>([])
    const [loading, setLoading] = useState(true)

    const [minRating, setMinRating] = useState(0)
    const [availabilityOnly, setAvailabilityOnly] = useState(false)
    const [sortBy, setSortBy] = useState("recommended")

    useEffect(() => {
        const fetchProfessionals = async () => {
            setLoading(true)
            let queryBuilder = supabase
                .from('profiles')
                .select(`
                    *,
                    services (name, price),
                    reviews (rating)
                `)
                .eq('role', 'professional')

            if (categoryParam) {
                queryBuilder = queryBuilder.eq('category', categoryParam)
            }

            // Note: Full text search and complex filtering would ideally use Supabase features or Edge Functions.
            // For now, we'll fetch then filter in client for the text query if simple ILIKE isn't enough, 
            // but let's try to map 'q' to name or description.
            if (query) {
                queryBuilder = queryBuilder.or(`name.ilike.%${query}%,description.ilike.%${query}%,title.ilike.%${query}%`)
            }

            const { data, error } = await queryBuilder

            if (error) {
                console.error('Error fetching professionals:', error)
            } else {
                setProfessionals(data as any[]) // Type assertion needed due to join
            }
            setLoading(false)
        }

        fetchProfessionals()
    }, [query, categoryParam])

    // Client-side filtering for advanced fields not easily handled in the initial simple query
    const filteredList = professionals.filter((pro) => {
        const matchesRating = pro.rating >= minRating
        const matchesAvailability = availabilityOnly ? pro.availability === "Hoy" : true
        return matchesRating && matchesAvailability
    })

    filteredList.sort((a, b) => {
        if (sortBy === "price_asc") {
            // Price parsing logic would need to be robust since price is string in DB
            const getPrice = (p: string | undefined) => {
                if (!p || p === "Cotizar") return 999999;
                return parseInt(p.replace(/[^0-9]/g, "")) || 0
            }
            return getPrice(a.price_range) - getPrice(b.price_range)
        }
        if (sortBy === "rating_desc") {
            return b.rating - a.rating
        }
        return 0
    })

    const clearFilters = () => {
        navigate("/search")
        setMinRating(0)
        setAvailabilityOnly(false)
        setSortBy("recommended")
    }

    return (
        <div className="flex-1 container mx-auto px-4 md:px-6 py-8 animate-in fade-in duration-500">
            {/* Search Header & Filters */}
            <div className="flex flex-col md:flex-row gap-4 mb-8 items-start md:items-center justify-between sticky top-16 z-40 bg-background/95 backdrop-blur py-4 -mx-4 px-4 md:mx-0 md:px-0 border-b border-white/5 md:border-none md:static">
                <div className="w-full md:w-auto flex-1 max-w-2xl">
                    <h1 className="text-2xl font-bold text-white mb-2 md:hidden">
                        {categoryParam ? `Resultados para ${categoryParam}` : "Resultados de búsqueda"}
                    </h1>
                    <p className="text-sm text-muted-foreground mb-4 md:mb-0 md:hidden">
                        {loading ? "Buscando..." : `${filteredList.length} profesionales encontrados`}
                    </p>
                    {/* Mobile Filter Scroll */}
                    <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-hide items-center">
                        <Button
                            variant="outline"
                            size="sm"
                            className="rounded-full border-white/10 bg-card hover:bg-card/80 text-white whitespace-nowrap"
                            onClick={clearFilters}
                        >
                            {categoryParam || query ? <><X className="mr-2 h-4 w-4" /> Limpiar</> : <><Filter className="mr-2 h-4 w-4" /> Filtros</>}
                        </Button>
                        <Button
                            variant={sortBy === "price_asc" ? "gold" : "outline"}
                            size="sm"
                            className={`rounded-full border-white/10  text-white whitespace-nowrap ${sortBy !== "price_asc" ? "bg-card hover:bg-card/80" : "text-black"}`}
                            onClick={() => setSortBy(sortBy === "price_asc" ? "recommended" : "price_asc")}
                        >
                            Precio
                        </Button>
                        <Button
                            variant={minRating === 4.5 ? "gold" : "outline"}
                            size="sm"
                            className={`rounded-full border-white/10 text-white whitespace-nowrap ${minRating !== 4.5 ? "bg-card hover:bg-card/80" : "text-black"}`}
                            onClick={() => setMinRating(minRating === 4.5 ? 0 : 4.5)}
                        >
                            4.5+ Estrellas
                        </Button>
                        <Button
                            variant={availabilityOnly ? "gold" : "outline"}
                            size="sm"
                            className={`rounded-full border-white/10 text-white whitespace-nowrap ${!availabilityOnly ? "bg-card hover:bg-card/80" : "text-black"}`}
                            onClick={() => setAvailabilityOnly(!availabilityOnly)}
                        >
                            Disponibilidad Hoy
                        </Button>
                    </div>
                </div>

                <div className="hidden md:flex items-center gap-2">
                    <span className="text-sm text-muted-foreground mr-2">Ordenar por:</span>
                    <select
                        className="bg-card border border-white/10 rounded-md text-sm p-2 text-white focus:outline-none focus:ring-1 focus:ring-primary"
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                    >
                        <option value="recommended">Recomendados</option>
                        <option value="price_asc">Menor precio</option>
                        <option value="rating_desc">Mejor calificados</option>
                    </select>
                </div>
            </div>

            {/* Results List */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* List Column */}
                <div className="lg:col-span-2 space-y-4">
                    <div className="hidden md:block mb-4">
                        <h1 className="text-2xl font-bold text-white">
                            {categoryParam ? `Expertos en ${categoryParam}` : "Profesionales disponibles"}
                        </h1>
                        <p className="text-muted-foreground">
                            {loading ? "Buscando..." : `${filteredList.length} profesionales encontrados en Santiago.`}
                        </p>
                    </div>

                    {loading ? (
                        <div className="flex items-center justify-center py-20">
                            <Loader2 className="h-8 w-8 animate-spin text-primary" />
                        </div>
                    ) : filteredList.length > 0 ? (
                        filteredList.map((pro) => (
                            <Link to={`/professionals/${pro.id}`} key={pro.id} className="block group">
                                <Card className="border-white/5 bg-[#141414] group-hover:border-primary/50 transition-all duration-300 transform group-hover:-translate-y-1">
                                    <div className="flex flex-col md:flex-row">
                                        {/* Pro Image */}
                                        <div className="w-full md:w-48 h-48 md:h-auto relative shrink-0">
                                            <div className="absolute inset-0 bg-cover bg-center rounded-t-xl md:rounded-l-xl md:rounded-tr-none" style={{ backgroundImage: `url('${pro.avatar_url || 'https://via.placeholder.com/300'}')` }} />
                                            {pro.verified && (
                                                <div className="absolute top-2 left-2 bg-black/60 backdrop-blur text-primary text-[10px] font-bold px-2 py-1 rounded flex items-center gap-1">
                                                    <CheckCircle size={12} /> VERIFICADO
                                                </div>
                                            )}
                                        </div>

                                        {/* Content */}
                                        <CardContent className="flex-1 p-4 md:p-6 flex flex-col justify-between">
                                            <div>
                                                <div className="flex justify-between items-start mb-2">
                                                    <div>
                                                        <h3 className="text-lg font-bold text-white group-hover:text-primary transition-colors">{pro.full_name || pro.email}</h3>
                                                        <p className="text-primary text-sm font-medium">{pro.title}</p>
                                                    </div>
                                                    <div className="flex items-center gap-1 bg-white/5 px-2 py-1 rounded text-white text-xs font-bold">
                                                        <Star size={12} className="fill-primary text-primary" /> {pro.rating}
                                                        <span className="text-muted-foreground font-normal">({pro.reviews_count})</span>
                                                    </div>
                                                </div>

                                                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{pro.description}</p>

                                                <div className="flex flex-wrap gap-2 mb-4">
                                                    <div className="inline-flex items-center text-xs text-muted-foreground bg-white/5 px-2 py-1 rounded">
                                                        <Clock size={12} className="mr-1" /> {pro.availability}
                                                    </div>
                                                    <div className="inline-flex items-center text-xs text-muted-foreground bg-white/5 px-2 py-1 rounded">
                                                        <MapPin size={12} className="mr-1" /> {pro.location}
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="flex items-center justify-between pt-4 border-t border-white/5">
                                                <div>
                                                    <p className="text-xs text-muted-foreground">Precio estimado</p>
                                                    <p className="text-sm font-bold text-white">{pro.price_range}</p>
                                                </div>
                                                <Link to={`/book/${pro.id}`}>
                                                    <Button variant="gold" size="sm" className="px-6 font-bold group-hover:bg-[#B5952F] pointer-events-auto">
                                                        Ver Perfil
                                                    </Button>
                                                </Link>
                                            </div>
                                        </CardContent>
                                    </div>
                                </Card>
                            </Link>
                        ))
                    ) : (
                        <div className="py-12 text-center border border-white/5 rounded-xl bg-card/20">
                            <p className="text-muted-foreground">No se encontraron profesionales con estos criterios.</p>
                            <Button variant="link" className="text-primary mt-2" onClick={clearFilters}>Limpiar filtros</Button>
                        </div>
                    )}
                </div>

                {/* Map Column (Hidden on Mobile, Sticky on Desktop) */}
                <div className="hidden lg:block lg:col-span-1">
                    <div className="sticky top-24 rounded-xl border border-white/10 bg-card h-[calc(100vh-8rem)] overflow-hidden relative">
                        {/* Mock Map */}
                        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=1774&auto=format&fit=crop')] bg-cover bg-center opacity-50 grayscale hover:grayscale-0 transition-all duration-500" />
                        <div className="absolute inset-0 flex items-center justify-center p-6 text-center bg-black/40">
                            <Button variant="secondary" className="shadow-lg font-bold">
                                <Map className="mr-2 h-4 w-4" /> Ver en Mapa
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile Floating Map Button */}
            <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 lg:hidden">
                <Button variant="secondary" className="rounded-full shadow-xl px-6 font-bold border border-white/10">
                    <Map className="mr-2 h-4 w-4" /> Mapa
                </Button>
            </div>
        </div>
    )
}
