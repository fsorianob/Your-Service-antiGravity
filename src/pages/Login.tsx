import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Link, useNavigate } from "react-router-dom"
import { ShieldCheck, Loader2, ArrowLeft, ShieldAlert, User, Briefcase } from "lucide-react"
import { useState } from "react"
import { supabase } from "@/lib/supabase"

type Role = 'admin' | 'client' | 'pro' | null

export default function LoginPage() {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [selectedRole, setSelectedRole] = useState<Role>(null)

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setLoading(true)
        setError(null)

        const formData = new FormData(e.currentTarget)
        const email = formData.get("email") as string
        const password = formData.get("password") as string

        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        })

        if (error) {
            setError(error.message)
            setLoading(false)
        } else {
            // Redirección dinámica basada en la selección
            if (selectedRole === 'admin') navigate("/dashboard/admin")
            else if (selectedRole === 'pro') navigate("/dashboard/pro")
            else navigate("/dashboard/client")
        }
    }

    return (
        <div className="flex-1 flex items-center justify-center p-4 min-h-[80vh]">
            <div className="w-full max-w-md bg-card border border-white/10 rounded-xl p-8 shadow-2xl relative overflow-hidden">
                {/* Cabecera común */}
                <div className="text-center mb-8 flex flex-col items-center animate-in fade-in slide-in-from-top-4 duration-500">
                    <img src="/logoYS_transparent.png" alt="YourService Logo" className="h-16 w-auto object-contain mb-6 drop-shadow-lg" />
                    <h1 className="text-2xl font-bold text-white">Bienvenido de nuevo</h1>
                    <p className="text-muted-foreground mt-2">
                        {selectedRole ? 'Ingresa tus credenciales para continuar' : 'Selecciona tu tipo de cuenta para ingresar'}
                    </p>
                </div>

                {error && (
                    <div className="bg-red-500/10 border border-red-500/20 text-red-500 p-3 rounded-md text-sm mb-4 animate-in slide-in-from-top-2">
                        {error}
                    </div>
                )}

                {/* PASO 1: Selección de Rol */}
                {!selectedRole && (
                    <div className="space-y-4 animate-in fade-in zoom-in-95 duration-300">
                        <Button
                            variant="outline"
                            className="w-full h-auto py-4 flex items-center justify-start gap-4 border-white/10 hover:border-primary/50 hover:bg-primary/5 group"
                            onClick={() => setSelectedRole('client')}
                        >
                            <div className="bg-white/5 p-3 rounded-full group-hover:bg-primary/20 transition-colors">
                                <User className="text-gray-300 group-hover:text-primary transition-colors" size={24} />
                            </div>
                            <div className="text-left">
                                <span className="block text-white font-bold text-lg group-hover:text-primary transition-colors">Soy Cliente</span>
                                <span className="block text-sm text-muted-foreground group-hover:text-gray-300">Quiero contratar servicios</span>
                            </div>
                        </Button>

                        <Button
                            variant="outline"
                            className="w-full h-auto py-4 flex items-center justify-start gap-4 border-white/10 hover:border-primary/50 hover:bg-primary/5 group"
                            onClick={() => setSelectedRole('pro')}
                        >
                            <div className="bg-white/5 p-3 rounded-full group-hover:bg-primary/20 transition-colors">
                                <Briefcase className="text-gray-300 group-hover:text-primary transition-colors" size={24} />
                            </div>
                            <div className="text-left">
                                <span className="block text-white font-bold text-lg group-hover:text-primary transition-colors">Soy Negocio</span>
                                <span className="block text-sm text-muted-foreground group-hover:text-gray-300">Ofrezco servicios profesionales</span>
                            </div>
                        </Button>

                        <Button
                            variant="outline"
                            className="w-full h-auto py-4 flex items-center justify-start gap-4 border-white/10 hover:border-red-500/50 hover:bg-red-500/5 group"
                            onClick={() => setSelectedRole('admin')}
                        >
                            <div className="bg-white/5 p-3 rounded-full group-hover:bg-red-500/20 transition-colors">
                                <ShieldAlert className="text-gray-300 group-hover:text-red-400 transition-colors" size={24} />
                            </div>
                            <div className="text-left">
                                <span className="block text-white font-bold text-lg group-hover:text-red-400 transition-colors">Soy Administrador</span>
                                <span className="block text-sm text-muted-foreground group-hover:text-gray-300">Gestión interna de plataforma</span>
                            </div>
                        </Button>
                    </div>
                )}

                {/* PASO 2: Formulario de Login */}
                {selectedRole && (
                    <form className="space-y-4 animate-in slide-in-from-right-4 duration-300" onSubmit={handleLogin}>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-white">Email</label>
                            <Input name="email" type="email" placeholder="nombre@ejemplo.com" className="bg-background/50 border-white/10 text-white" required />
                        </div>
                        <div className="space-y-2">
                            <div className="flex justify-between">
                                <label className="text-sm font-medium text-white">Contraseña</label>
                                <Link to="/forgot-password" className="text-xs text-primary hover:underline">¿Olvidaste tu contraseña?</Link>
                            </div>
                            <Input name="password" type="password" placeholder="••••••••" className="bg-background/50 border-white/10 text-white" required />
                        </div>

                        <div className="pt-2 flex flex-col gap-3">
                            <Button className="w-full font-bold shadow-lg" variant="gold" size="lg" disabled={loading}>
                                {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Iniciar Sesión"}
                            </Button>
                            <Button
                                type="button"
                                variant="ghost"
                                className="text-muted-foreground hover:text-white"
                                onClick={() => {
                                    setSelectedRole(null)
                                    setError(null)
                                }}
                            >
                                <ArrowLeft className="mr-2 h-4 w-4" /> Volver a selección
                            </Button>
                        </div>
                    </form>
                )}

                {/* Footer común */}
                <div className="mt-8 pt-6 border-t border-white/10 text-center text-sm text-muted-foreground">
                    ¿No tienes cuenta?{" "}
                    <Link to="/register" className="text-primary hover:underline font-bold">
                        Regístrate aquí
                    </Link>
                </div>

                <div className="mt-6 flex items-center justify-center gap-2 text-xs text-muted-foreground/50">
                    <ShieldCheck size={12} /> Tu información está protegida
                </div>
            </div>
        </div>
    )
}
