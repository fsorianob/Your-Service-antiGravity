import { Search, MapPin, ShieldCheck, Clock, ArrowRight, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { CardContent } from "@/components/ui/card"
import { Link, useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"

export default function Home() {
    const navigate = useNavigate();
    const [bgIndex, setBgIndex] = useState(0);

    const heroImages = [
        '/hero_rubro_domestico.png',
        '/hero_rubro_digital.png',
        '/hero_rubro_personal.png',
        '/hero_rubro_desarrollo.png',
        '/hero_rubro_asesoria.png',
        '/hero_rubro_ventas.png'
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setBgIndex((prev) => (prev + 1) % heroImages.length);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const q = formData.get("q");
        navigate(`/search?q=${q}`);
    };

    return (
        <div className="flex-1">
            {/* Hero Section */}
            <section className="relative pt-4 pb-20 md:pt-8 md:pb-32 overflow-hidden">
                <div className="absolute inset-0 z-0 bg-black">
                    {/* Lighter gradient overlays for better image visibility */}
                    <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-background/60 to-background z-10" />
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.5)_100%)] z-10 pointer-events-none" />

                    {/* Fading Background Cascade */}
                    {heroImages.map((src, index) => (
                        <div
                            key={src}
                            className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ease-in-out ${index === bgIndex ? "opacity-[0.85] scale-105" : "opacity-0 scale-100"
                                }`}
                            style={{ backgroundImage: `url('${src}')`, transitionProperty: 'opacity, transform', transitionDuration: '1.5s, 10s' }}
                        />
                    ))}
                </div>

                <div className="container relative z-20 mx-auto px-4 md:px-6">
                    <div className="flex flex-col items-center space-y-8 max-w-7xl mx-auto w-full">
                        {/* Huge Central Logo - Shifted Upwards */}
                        <div className="w-full max-w-sm md:max-w-md lg:max-w-xl mb-4 -mt-6 md:-mt-12 animate-in fade-in zoom-in duration-700">
                            <img src="/logoYS_transparent.png" alt="YourService Logo" className="w-full h-auto object-contain drop-shadow-2xl" />
                        </div>

                        <h1 className="text-2xl md:text-3xl lg:text-5xl font-light tracking-wide text-gray-200 leading-[1.6] drop-shadow-xl mx-auto w-full max-w-5xl text-center space-y-3 mt-4 animate-in slide-in-from-bottom duration-1000">
                            <span className="block">
                                ¿Buscas el <strong className="text-primary font-bold">Servicio</strong> de algún <span className="italic text-white">especialista</span> cerca de tu ubicación
                            </span>
                            <span className="block">
                                para dar solución a alguna <span className="italic text-white">necesidad o requerimiento?</span>
                            </span>
                            <span className="block mt-6">
                                <strong className="text-primary text-3xl md:text-5xl lg:text-7xl tracking-widest uppercase relative before:content-[''] before:absolute before:-bottom-2 before:left-1/2 before:-translate-x-1/2 before:w-24 before:h-1 before:bg-primary/50">
                                    ¡Aquí lo encuentras!
                                </strong>
                            </span>
                        </h1>

                        <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-4 w-full max-w-lg p-2 bg-card/60 backdrop-blur-md border border-white/10 rounded-xl shadow-2xl">
                            <div className="relative flex-1">
                                <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                                <Input
                                    type="text"
                                    name="q"
                                    placeholder="¿Qué servicio necesitas?"
                                    className="pl-10 h-12 bg-transparent border-none focus-visible:ring-0 text-white placeholder:text-muted-foreground/70"
                                />
                            </div>
                            <div className="relative w-full sm:w-[140px] border-t sm:border-t-0 sm:border-l border-white/10">
                                <MapPin className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                                <Input
                                    type="text"
                                    placeholder="Santiago"
                                    className="pl-10 h-12 bg-transparent border-none focus-visible:ring-0 text-white placeholder:text-muted-foreground/70"
                                    defaultValue="Santiago"
                                />
                            </div>
                            <Button type="submit" size="lg" variant="gold" className="h-12 w-full sm:w-auto px-8 font-bold text-black border border-transparent hover:border-white/20">
                                Buscar
                            </Button>
                        </form>

                        {/* Inclusive Professional Call To Action */}
                        <div className="mt-12 p-6 bg-primary/5 border border-primary/20 rounded-2xl max-w-2xl mx-auto backdrop-blur-sm shadow-xl">
                            <h3 className="text-xl font-bold text-white mb-2">¿No ves tu rubro aquí? No importa.</h3>
                            <p className="text-muted-foreground text-sm md:text-base mb-4 leading-relaxed">
                                Desde jardinería hasta asesoría legal, robótica o clases de guitarra. Si ofreces un trabajo excepcional, <strong className="text-white">Your Service</strong> es el escenario diseñado para impulsar tus servicios como Especialista.
                            </p>
                            <Button asChild variant="outline" className="border-primary/50 text-white hover:bg-primary/20">
                                <Link to="/join-pro">Suma tu servicio hoy <ArrowRight className="ml-2 h-4 w-4" /></Link>
                            </Button>
                        </div>



                    </div>
                </div>
            </section>

            {/* Categories Bento Grid */}
            <section className="py-20 bg-background">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="flex justify-between items-end mb-10">
                        <div>
                            <h2 className="text-3xl font-bold text-white mb-2">Categorías Populares</h2>
                            <p className="text-muted-foreground">Encuentra expertos en las áreas más solicitadas</p>
                        </div>
                        <Button variant="ghost" className="text-primary hover:text-primary/80" asChild>
                            <Link to="/search">Ver todas las categorías <ArrowRight className="ml-2 h-4 w-4" /></Link>
                        </Button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-[200px]">
                        {/* Card Grande: Gasfitería */}
                        <Link to="/search?category=Gasfitería" className="col-span-1 md:col-span-2 row-span-2 relative overflow-hidden group border-white/5 bg-[#1F1F1F] hover:border-primary/50 transition-colors cursor-pointer rounded-xl block">
                            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1581244277943-fe4a9c777189?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-40 group-hover:scale-105 transition-transform duration-500" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                            <CardContent className="absolute bottom-0 left-0 p-6">
                                <h3 className="text-2xl font-bold text-white mb-2">Gasfitería</h3>
                                <p className="text-muted-foreground line-clamp-2">Reparación de fugas, instalación de grifería y destape de cañerías urgentes.</p>
                            </CardContent>
                        </Link>

                        {/* Card Mediana: Electricidad */}
                        <Link to="/search?category=Electricidad" className="col-span-1 row-span-2 md:row-span-1 relative overflow-hidden group border-white/5 bg-[#1F1F1F] hover:border-primary/50 transition-colors cursor-pointer rounded-xl block">
                            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=2069&auto=format&fit=crop')] bg-cover bg-center opacity-40 group-hover:scale-105 transition-transform duration-500" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                            <CardContent className="absolute bottom-0 left-0 p-6">
                                <h3 className="text-xl font-bold text-white">Electricidad</h3>
                                <p className="text-sm text-muted-foreground">Instalaciones y mantención certificada.</p>
                            </CardContent>
                        </Link>

                        {/* Card Pequeña: Limpieza */}
                        <Link to="/search?category=Limpieza" className="col-span-1 relative overflow-hidden group border-white/5 bg-[#1F1F1F] hover:border-primary/50 transition-colors cursor-pointer rounded-xl block">
                            <div className="absolute inset-0 bg-gradient-to-br from-card to-background opacity-80" />
                            <CardContent className="relative z-10 p-6 flex flex-col justify-end h-full">
                                <h3 className="text-xl font-bold text-white">Limpieza</h3>
                                <p className="text-xs text-muted-foreground mt-1">Hogar y oficinas.</p>
                            </CardContent>
                        </Link>

                        {/* Card Pequeña: Mudanzas */}
                        <Link to="/search?category=Mudanzas" className="col-span-1 relative overflow-hidden group border-white/5 bg-[#1F1F1F] hover:border-primary/50 transition-colors cursor-pointer rounded-xl block">
                            <div className="absolute inset-0 bg-gradient-to-br from-card to-background opacity-80" />
                            <CardContent className="relative z-10 p-6 flex flex-col justify-end h-full">
                                <h3 className="text-xl font-bold text-white">Mudanzas</h3>
                                <p className="text-xs text-muted-foreground mt-1">Fletes seguros.</p>
                            </CardContent>
                        </Link>

                        <Link to="/search?category=Jardinería" className="col-span-1 relative overflow-hidden group border-white/5 bg-[#1F1F1F] hover:border-primary/50 transition-colors cursor-pointer rounded-xl block">
                            <div className="absolute inset-0 bg-gradient-to-br from-card to-background opacity-80" />
                            <CardContent className="relative z-10 p-6 flex flex-col justify-end h-full">
                                <h3 className="text-xl font-bold text-white">Jardinería</h3>
                                <p className="text-xs text-muted-foreground mt-1">Mantención de áreas verdes.</p>
                            </CardContent>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Features / Trust Section */}
            <section id="how-it-works" className="py-20 border-t border-white/5 bg-[#141414]">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="text-center max-w-2xl mx-auto mb-16">
                        <h2 className="text-3xl font-bold tracking-tight text-white mb-4">¿Por qué elegir <span className="text-[#fbd38d]">Your</span><span className="text-white">Service</span>?</h2>
                        <p className="text-muted-foreground">Tu seguridad y satisfacción son nuestra prioridad número uno.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="flex flex-col items-center text-center p-6 space-y-4">
                            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-2">
                                <ShieldCheck size={28} />
                            </div>
                            <h3 className="text-xl font-bold text-white">Profesionales Verificados</h3>
                            <p className="text-sm text-muted-foreground">Revisamos antecedentes y certificaciones de cada experto.</p>
                        </div>
                        <div className="flex flex-col items-center text-center p-6 space-y-4">
                            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-2">
                                <Star size={28} />
                            </div>
                            <h3 className="text-xl font-bold text-white">Calidad Garantizada</h3>
                            <p className="text-sm text-muted-foreground">Si no quedas satisfecho, trabajaremos hasta solucionarlo.</p>
                        </div>
                        <div className="flex flex-col items-center text-center p-6 space-y-4">
                            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-2">
                                <Clock size={28} />
                            </div>
                            <h3 className="text-xl font-bold text-white">Respuesta Rápida</h3>
                            <p className="text-sm text-muted-foreground">Cotizaciones en minutos y disponibilidad inmediata.</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
