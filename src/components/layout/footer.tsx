import { Link } from "react-router-dom"

export function Footer() {
    return (
        <footer className="w-full border-t border-white/10 bg-background py-12 md:py-16">
            <div className="container mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 px-4 md:px-6">
                <div className="col-span-2 md:col-span-1">
                    <Link to="/" className="flex items-center gap-2 mb-4">
                        <span className="text-xl font-bold tracking-tight text-white">YourService</span>
                    </Link>
                    <p className="text-sm text-muted-foreground">
                        Encuentra al profesional experto para tu hogar en Santiago. Calidad y confianza garantizada.
                    </p>
                </div>
                <div className="flex flex-col gap-2">
                    <h3 className="font-semibold text-white">Servicios</h3>
                    <Link to="/search?category=Gasfitería" className="text-sm text-muted-foreground hover:text-primary">Gasfitería</Link>
                    <Link to="/search?category=Electricidad" className="text-sm text-muted-foreground hover:text-primary">Electricidad</Link>
                    <Link to="/search?category=Limpieza" className="text-sm text-muted-foreground hover:text-primary">Limpieza</Link>
                    <Link to="/search?category=Mudanzas" className="text-sm text-muted-foreground hover:text-primary">Mudanzas</Link>
                </div>
                <div className="flex flex-col gap-2">
                    <h3 className="font-semibold text-white">Empresa</h3>
                    <Link to="/info/about" className="text-sm text-muted-foreground hover:text-primary">Sobre nosotros</Link>
                    <Link to="/join-pro" className="text-sm text-muted-foreground hover:text-primary">Carreras</Link>
                    <Link to="/info/press" className="text-sm text-muted-foreground hover:text-primary">Prensa</Link>
                    <Link to="/help" className="text-sm text-muted-foreground hover:text-primary">Ayuda y Soporte</Link>
                </div>
                <div className="flex flex-col gap-2">
                    <h3 className="font-semibold text-white">Legal</h3>
                    <Link to="/info/terms" className="text-sm text-muted-foreground hover:text-primary">Términos</Link>
                    <Link to="/info/privacy" className="text-sm text-muted-foreground hover:text-primary">Privacidad</Link>
                    <Link to="/info/cookies" className="text-sm text-muted-foreground hover:text-primary">Cookies</Link>
                </div>
            </div>
            <div className="container mx-auto px-4 md:px-6 mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between text-xs text-muted-foreground">
                <p>&copy; 2026 YourService. Todos los derechos reservados.</p>
                <div className="flex gap-4 mt-4 md:mt-0">
                    <Link to="#" className="hover:text-white">Instagram</Link>
                    <Link to="#" className="hover:text-white">Twitter</Link>
                    <Link to="#" className="hover:text-white">LinkedIn</Link>
                </div>
            </div>
        </footer>
    )
}
