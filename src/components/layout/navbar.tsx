import { Link } from "react-router-dom"
import { Menu, Search, X, User } from "lucide-react"
import { useState } from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useAuth } from "@/contexts/AuthContext"

export function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const { user, signOut } = useAuth()

    return (
        <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
                <Link to="/" className="flex items-center gap-2">
                    <span className="text-xl font-bold tracking-tight text-white">YourService</span>
                </Link>
                <nav className="hidden md:flex gap-6">
                    <Link to="/" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
                        Inicio
                    </Link>
                    {/* Hash link manual handling for React Router if needed, or just link to home */}
                    <a href="/#how-it-works" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
                        Cómo funciona
                    </a>
                    <Link to="/search" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
                        Categorías
                    </Link>
                    <Link to="/join-pro" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
                        ¿Eres profesional?
                    </Link>
                </nav>
                <div className="hidden md:flex gap-4 items-center">
                    <Link to="/join-pro">
                        <Button variant="ghost" className="text-white hover:text-primary hover:bg-transparent">
                            Soy Profesional
                        </Button>
                    </Link>
                    {user ? (
                        <div className="flex items-center gap-4">
                            <span className="text-sm text-white font-medium">Hola, {user.user_metadata.full_name?.split(' ')[0]}</span>
                            <Button variant="outline" size="sm" onClick={() => signOut()} className="border-white/10 text-white hover:bg-white/10">
                                Salir
                            </Button>
                        </div>
                    ) : (
                        <>
                            <Link to="/login">
                                <Button variant="ghost" className="text-white hover:text-white/80 hover:bg-transparent">
                                    Iniciar Sesión
                                </Button>
                            </Link>
                            <Link to="/register">
                                <Button variant="gold" className="font-bold text-black border border-transparent hover:border-white/20">
                                    Regístrate
                                </Button>
                            </Link>
                        </>
                    )}
                </div>

                {/* Mobile Menu Button */}
                <button className="md:hidden text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                    {isMenuOpen ? <X /> : <Menu />}
                </button>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="md:hidden bg-[#141414] border-t border-white/10 p-4 space-y-4 animate-in slide-in-from-top-5">
                    <form onSubmit={(e) => e.preventDefault()} className="relative">
                        <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Buscar servicios..."
                            className="pl-9 bg-card border-white/10 text-white"
                        />
                    </form>
                    <nav className="flex flex-col gap-4">
                        <Link to="/" className="text-sm font-medium text-white hover:text-primary transition-colors" onClick={() => setIsMenuOpen(false)}>
                            Inicio
                        </Link>
                        <Link to="/search" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors" onClick={() => setIsMenuOpen(false)}>
                            Explorar
                        </Link>
                        <Link to="/join-pro" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors" onClick={() => setIsMenuOpen(false)}>
                            Soy Profesional
                        </Link>
                    </nav>
                    <div className="flex flex-col gap-3 pt-4 border-t border-white/10">
                        {user ? (
                            <>
                                <div className="flex items-center gap-2 text-white">
                                    <User size={16} />
                                    <span className="font-medium">{user.user_metadata.full_name}</span>
                                </div>
                                <Button variant="outline" onClick={() => signOut()} className="w-full border-white/10 text-white">
                                    Cerrar Sesión
                                </Button>
                            </>
                        ) : (
                            <>
                                <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                                    <Button variant="outline" className="w-full border-white/10 text-white hover:bg-white/5">
                                        Iniciar Sesión
                                    </Button>
                                </Link>
                                <Link to="/register" onClick={() => setIsMenuOpen(false)}>
                                    <Button variant="gold" className="w-full font-bold">
                                        Regístrate Gratis
                                    </Button>
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            )}
        </header>
    )
}
