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
                <Link to="/" className="flex items-center gap-2 group">
                    <span className="font-bold text-xl tracking-tight">
                        <span className="text-primary group-hover:text-white transition-colors duration-300">Your</span>
                        <span className="text-white group-hover:text-primary transition-colors duration-300">Service</span>
                    </span>
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
                    {user ? (
                        <>
                            <Link to="/dashboard/client">
                                <Button variant="ghost" className="text-white hover:text-primary hover:bg-transparent font-medium">
                                    Mi Panel
                                </Button>
                            </Link>
                            <div className="relative group/user flex items-center gap-4">
                                <button className="flex items-center gap-2 text-sm text-white font-medium hover:text-primary transition-colors">
                                    <User size={16} />
                                    Hola, {user.user_metadata.full_name?.split(' ')[0]}
                                </button>
                                {/* User Dropdown */}
                                <div className="absolute right-0 top-full mt-2 hidden min-w-[200px] flex-col rounded-xl border border-white/10 bg-[#141414] p-2 shadow-xl group-hover/user:flex z-50">
                                    <Link to="/dashboard/client" className="rounded-lg px-3 py-2 text-sm text-gray-300 hover:bg-white/5 hover:text-primary">Mis Servicios (Cliente)</Link>
                                    <Link to="/dashboard/pro" className="rounded-lg px-3 py-2 text-sm text-gray-300 hover:bg-white/5 hover:text-primary">Mi Panel (Profesional)</Link>
                                    <div className="h-[1px] bg-white/10 my-1 mx-2" />
                                    <Link to="/dashboard/admin" className="rounded-lg px-3 py-2 text-xs text-muted-foreground hover:bg-white/5 hover:text-primary">Administración</Link>
                                    <div className="h-[1px] bg-white/10 my-1 mx-2" />
                                    <button onClick={() => signOut()} className="w-full text-left rounded-lg px-3 py-2 text-sm text-red-400 hover:bg-white/5 hover:text-red-300">
                                        Cerrar Sesión
                                    </button>
                                </div>
                            </div>
                        </>
                    ) : (
                        <>
                            <Link to="/join-pro">
                                <Button variant="ghost" className="text-white hover:text-primary hover:bg-transparent">
                                    Soy Profesional
                                </Button>
                            </Link>
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
                        {!user && (
                            <Link to="/join-pro" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors" onClick={() => setIsMenuOpen(false)}>
                                Soy Profesional
                            </Link>
                        )}
                    </nav>
                    <div className="flex flex-col gap-3 pt-4 border-t border-white/10">
                        {user ? (
                            <>
                                <div className="flex items-center gap-2 text-white pb-2">
                                    <User size={16} />
                                    <span className="font-medium">{user.user_metadata.full_name}</span>
                                </div>
                                <Link to="/dashboard/client" onClick={() => setIsMenuOpen(false)}>
                                    <Button variant="ghost" className="w-full justify-start text-white hover:text-primary hover:bg-transparent px-0">
                                        Mi Panel
                                    </Button>
                                </Link>
                                <Button variant="outline" onClick={() => signOut()} className="w-full border-white/10 text-white mt-2 hover:bg-white/5">
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
