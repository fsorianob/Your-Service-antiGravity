import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, HelpCircle, FileText, MessageSquare, Phone } from "lucide-react"
import { Link } from "react-router-dom"

export default function HelpPage() {
    return (
        <div className="flex-1 animate-in fade-in duration-500">
            {/* Help Hero */}
            <section className="bg-[#141414] py-16 border-b border-white/5">
                <div className="container mx-auto px-4 text-center max-w-2xl">
                    <h1 className="text-3xl font-bold text-white mb-4">¿En qué podemos ayudarte?</h1>
                    <div className="relative">
                        <Search className="absolute left-3 top-3.5 h-5 w-5 text-muted-foreground" />
                        <Input className="h-12 pl-10 bg-card border-white/10 text-white" placeholder="Buscar en el centro de ayuda..." />
                    </div>
                </div>
            </section>

            {/* Categories */}
            <section className="py-12 container mx-auto px-4 md:px-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Link to="/info/faq" className="bg-card border border-white/10 p-6 rounded-xl hover:border-primary/50 transition-colors group">
                        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary mb-4 group-hover:bg-primary group-hover:text-black transition-colors">
                            <HelpCircle size={24} />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">Preguntas Frecuentes</h3>
                        <p className="text-muted-foreground text-sm">Respuestas a las dudas más comunes sobre YourService.</p>
                    </Link>
                    <Link to="/info/guides" className="bg-card border border-white/10 p-6 rounded-xl hover:border-primary/50 transition-colors group">
                        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary mb-4 group-hover:bg-primary group-hover:text-black transition-colors">
                            <FileText size={24} />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">Guías y Tutoriales</h3>
                        <p className="text-muted-foreground text-sm">Aprende a sacar el máximo provecho a la plataforma.</p>
                    </Link>
                    <a href="mailto:soporte@yourservice.com" className="bg-card border border-white/10 p-6 rounded-xl hover:border-primary/50 transition-colors group">
                        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary mb-4 group-hover:bg-primary group-hover:text-black transition-colors">
                            <MessageSquare size={24} />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">Soporte Técnico</h3>
                        <p className="text-muted-foreground text-sm">Contacta con nuestro equipo si tienes problemas.</p>
                    </a>
                </div>
            </section>

            {/* Contact Strip */}
            <section className="py-12 bg-card/30 border-t border-white/5">
                <div className="container mx-auto px-4 text-center">
                    <p className="text-muted-foreground mb-4">¿No encuentras lo que buscas?</p>
                    <Button variant="outline" className="gap-2 text-white border-white/10 hover:bg-white/5" asChild>
                        <a href="mailto:soporte@yourservice.com">
                            <Phone size={16} /> Contactar Soporte
                        </a>
                    </Button>
                </div>
            </section>
        </div>
    )
}
