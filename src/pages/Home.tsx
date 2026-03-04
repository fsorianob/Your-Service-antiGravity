import { Search, MapPin, ArrowRight, Star, UserPlus, Settings, Zap, Inbox, MessageSquare } from "lucide-react"
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

                        <h1 className="text-[clamp(0.875rem,1.5vw+0.5rem,1.5rem)] font-light tracking-wide text-gray-200 leading-tight drop-shadow-xl mx-auto w-full max-w-[75ch] text-center flex flex-col items-center gap-4 mt-4 animate-in slide-in-from-bottom duration-1000">
                            <span className="block w-full">
                                ¿Buscas el <strong className="text-primary font-bold">Servicio</strong> de algún <strong className="text-white font-bold italic">especialista</strong> cerca de tu ubicación
                            </span>
                            <span className="block w-full">
                                para dar solución a alguna <span className="italic text-primary font-medium">necesidad o requerimiento?</span>
                            </span>
                            <span className="block mt-4">
                                <strong className="text-[clamp(1.125rem,2.5vw+0.5rem,2rem)] text-primary font-extrabold tracking-wide uppercase relative before:content-[''] before:absolute before:-bottom-2 before:left-1/2 before:-translate-x-1/2 before:w-16 before:h-[2px] before:bg-primary/50">
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

            {/* Professional How It Works - Bento Grid */}
            <section id="how-it-works" className="py-24 border-t border-white/5 bg-background relative overflow-hidden">
                {/* Optional background glow */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

                <div className="container relative z-10 mx-auto px-4 md:px-6">
                    <div className="text-center w-full max-w-5xl mx-auto mb-16 space-y-6">
                        <h2 className="text-[clamp(1.25rem,2.5vw+0.5rem,2.5rem)] font-bold tracking-tight text-white leading-tight">
                            <span className="block w-full">¿Ofreces un servicio o eres especialista?</span>
                            <span className="block w-full text-primary font-extrabold mt-2">Aquí te ayudamos a impulsar tu negocio</span>
                        </h2>
                        <p className="text-[clamp(1rem,1.5vw+0.5rem,1.125rem)] text-muted-foreground leading-relaxed max-w-[70ch] mx-auto">
                            Nuestra plataforma no es solo un directorio aburrido, sino tu nueva herramienta de trabajo. Está pensada para conectarte directo con clientes de tu zona que ya están buscando activamente lo que tú haces. <strong className="text-white">Aquí tú eres el jefe.</strong>
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                        {/* Card 1: Perfil (Col Span 2 on md+) */}
                        <div className="col-span-1 md:col-span-2 p-8 rounded-3xl bg-card/40 backdrop-blur border border-white/10 hover:border-primary/50 hover:-translate-y-1 transition-all duration-300 shadow-lg relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                                <UserPlus size={64} className="text-primary" />
                            </div>
                            <div className="relative z-10">
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="h-10 w-10 shrink-0 rounded-xl bg-primary/20 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-black group-hover:shadow-[0_0_15px_rgba(251,211,141,0.5)] transition-all duration-300">
                                        <span className="font-bold text-xl">1</span>
                                    </div>
                                    <h3 className="text-[clamp(1.25rem,2vw+0.5rem,1.5rem)] font-bold text-white leading-tight">Arma un perfil que llame la atención</h3>
                                </div>
                                <p className="text-muted-foreground text-sm leading-relaxed max-w-[70ch]">
                                    Completa tu perfil detallando tus habilidades, sube fotos de muy buena calidad de tus últimos trabajos y escribe una biografía donde se note tu toque personal. Deja preconfiguradas las respuestas (Q&A) para ahorrar tiempo al cliente.
                                </p>
                            </div>
                        </div>

                        {/* Card 2: Reglas (Col Span 1) */}
                        <div className="col-span-1 p-8 rounded-3xl bg-card/40 backdrop-blur border border-white/10 hover:border-primary/50 hover:-translate-y-1 transition-all duration-300 shadow-lg relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                                <Settings size={64} className="text-primary" />
                            </div>
                            <div className="relative z-10">
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="h-10 w-10 shrink-0 rounded-xl bg-primary/20 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-black group-hover:shadow-[0_0_15px_rgba(251,211,141,0.5)] transition-all duration-300">
                                        <span className="font-bold text-xl">2</span>
                                    </div>
                                    <h3 className="text-[clamp(1.25rem,2vw+0.5rem,1.5rem)] font-bold text-white leading-tight">Pon tus propias reglas</h3>
                                </div>
                                <p className="text-muted-foreground text-sm leading-relaxed max-w-[70ch]">
                                    Tú tienes el control del volante. Ajusta tus preferencias de viaje, días, horarios y límite de presupuesto semanal. Así cuidas tu bolsillo.
                                </p>
                            </div>
                        </div>

                        {/* Card 3: Oportunidades (Col Span 2 on lg) */}
                        <div className="col-span-1 md:col-span-2 lg:col-span-2 p-8 rounded-3xl bg-card/40 backdrop-blur border border-white/10 hover:border-primary/50 hover:-translate-y-1 transition-all duration-300 shadow-lg relative overflow-hidden group">
                            <div className="relative z-10">
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="h-10 w-10 shrink-0 rounded-xl bg-primary/20 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-black group-hover:shadow-[0_0_15px_rgba(251,211,141,0.5)] transition-all duration-300">
                                        <span className="font-bold text-xl">3</span>
                                    </div>
                                    <h3 className="text-[clamp(1.25rem,2vw+0.5rem,1.5rem)] font-bold text-white leading-tight">Recibe oportunidades de dos maneras</h3>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-4">
                                    <div className="space-y-2">
                                        <h4 className="font-semibold text-white flex items-center gap-2"><Zap size={16} /> Match Instantáneo</h4>
                                        <p className="text-xs text-muted-foreground leading-relaxed">Si un cliente pide justo lo que tú haces, en tu zona y horario, nuestro algoritmo los conecta al momento.</p>
                                    </div>
                                    <div className="space-y-2">
                                        <h4 className="font-semibold text-white flex items-center gap-2"><Inbox size={16} /> Buzón de Oportunidades</h4>
                                        <p className="text-xs text-muted-foreground leading-relaxed">Revisa nuestras solicitudes abiertas y decide si quieres invertir en enviarles una cotización.</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Card 4: Chat (Col Span 1) */}
                        <div className="col-span-1 p-8 rounded-3xl bg-card/40 backdrop-blur border border-white/10 hover:border-primary/50 hover:-translate-y-1 transition-all duration-300 shadow-lg relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                                <MessageSquare size={64} className="text-primary" />
                            </div>
                            <div className="relative z-10">
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="h-10 w-10 shrink-0 rounded-xl bg-primary/20 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-black group-hover:shadow-[0_0_15px_rgba(251,211,141,0.5)] transition-all duration-300">
                                        <span className="font-bold text-xl">4</span>
                                    </div>
                                    <h3 className="text-[clamp(1.25rem,2vw+0.5rem,1.5rem)] font-bold text-white leading-tight">Responde rápido</h3>
                                </div>
                                <p className="text-muted-foreground text-sm leading-relaxed max-w-[70ch]">
                                    El que responde primero suele llevarse el proyecto. Usa nuestro chat integrado y plantillas guardadas para contestar al instante.
                                </p>
                            </div>
                        </div>

                        {/* Card 5: Reseñas (Col Span Full) */}
                        <div className="col-span-1 md:col-span-full p-8 rounded-3xl bg-card/40 backdrop-blur border border-white/10 hover:border-primary/50 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col md:flex-row items-start md:items-center gap-8 group">
                            <div className="hidden sm:flex h-16 w-16 shrink-0 rounded-full bg-primary items-center justify-center text-black group-hover:scale-110 transition-transform">
                                <Star size={32} />
                            </div>
                            <div className="flex-1">
                                <div className="flex items-center gap-4 mb-3">
                                    <div className="h-10 w-10 shrink-0 rounded-xl bg-primary/20 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-black group-hover:shadow-[0_0_15px_rgba(251,211,141,0.5)] transition-all duration-300">
                                        <span className="font-bold text-xl">5</span>
                                    </div>
                                    <h3 className="text-[clamp(1.25rem,2vw+0.5rem,1.5rem)] font-bold text-white leading-tight">Haz tu magia, cobra y hazte de un buen nombre</h3>
                                </div>
                                <p className="text-muted-foreground text-sm leading-relaxed max-w-[70ch]">
                                    Una vez que el cliente te elija, solo queda cuadrar los detalles. Al terminar, la plataforma hace fácil pedir una reseña. Esas estrellas serán un imán para futuros trabajos.
                                </p>
                            </div>
                            <div className="w-full md:w-auto mt-2 md:mt-0 md:pl-6 flex justify-center shrink-0">
                                <Link to="/join-pro">
                                    <Button size="lg" className="w-full md:w-auto h-14 px-8 rounded-xl font-bold text-lg bg-primary hover:bg-primary/90 text-black shadow-[0_0_20px_rgba(251,211,141,0.3)] hover:shadow-[0_0_30px_rgba(251,211,141,0.5)] transition-all duration-300">
                                        Registrar mi Especialidad <ArrowRight className="ml-2 h-5 w-5" />
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
