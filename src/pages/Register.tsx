import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Link, useNavigate } from "react-router-dom"
import { CheckCircle, Loader2, Mail } from "lucide-react"
import { useState } from "react"
import { supabase } from "@/lib/supabase"

export default function RegisterPage() {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [success, setSuccess] = useState(false)

    const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setLoading(true)
        setError(null)

        const formData = new FormData(e.currentTarget)
        const email = formData.get("email") as string
        const password = formData.get("password") as string
        const firstName = formData.get("firstName") as string
        const lastName = formData.get("lastName") as string
        const fullName = `${firstName} ${lastName}`.trim()

        const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: {
                    full_name: fullName,
                    role: 'client'
                }
            }
        })

        if (error) {
            setError(error.message)
            setLoading(false)
        } else {
            // Check if session was created immediately (email confirmation disabled)
            if (data.session) {
                navigate("/")
            } else {
                // Email confirmation required
                setSuccess(true)
                setLoading(false)
            }
        }
    }

    if (success) {
        return (
            <div className="flex-1 flex items-center justify-center p-4 animate-in fade-in duration-500">
                <div className="w-full max-w-md bg-card border border-white/10 rounded-xl p-8 shadow-2xl text-center">
                    <div className="bg-primary/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Mail className="h-8 w-8 text-primary" />
                    </div>
                    <h1 className="text-2xl font-bold text-white mb-4">¡Verifica tu correo!</h1>
                    <p className="text-muted-foreground mb-6">
                        Hemos enviado un enlace de confirmación a tu correo electrónico. Por favor, revísalo (incluyendo Spam) para activar tu cuenta.
                    </p>
                    <Link to="/login">
                        <Button variant="outline" className="w-full border-white/10 text-white">
                            Ir al Inicio de Sesión
                        </Button>
                    </Link>
                </div>
            </div>
        )
    }

    return (
        <div className="flex-1 flex items-center justify-center p-4 animate-in fade-in duration-500">
            <div className="w-full max-w-md bg-card border border-white/10 rounded-xl p-8 shadow-2xl">
                <div className="text-center mb-8 flex flex-col items-center">
                    <img src="/logoYS_transparent.png" alt="YourService Logo" className="h-16 w-auto object-contain mb-6 drop-shadow-lg" />
                    <h1 className="text-2xl font-bold text-white">Crea tu cuenta</h1>
                    <p className="text-muted-foreground mt-2">Únete a YourService y encuentra a los mejores profesionales</p>
                </div>

                {error && (
                    <div className="bg-red-500/10 border border-red-500/20 text-red-500 p-3 rounded-md text-sm mb-4">
                        {error}
                    </div>
                )}

                <form className="space-y-4" onSubmit={handleRegister}>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-white">Nombre</label>
                            <Input name="firstName" type="text" placeholder="Juan" className="bg-background/50 border-white/10 text-white" required />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-white">Apellido</label>
                            <Input name="lastName" type="text" placeholder="Pérez" className="bg-background/50 border-white/10 text-white" required />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-white">Email</label>
                        <Input name="email" type="email" placeholder="nombre@ejemplo.com" className="bg-background/50 border-white/10 text-white" required />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-white">Contraseña</label>
                        <Input name="password" type="password" placeholder="••••••••" className="bg-background/50 border-white/10 text-white" required />
                    </div>

                    <div className="space-y-3 pt-2">
                        <div className="flex items-start gap-2">
                            <div className="mt-1 bg-primary/20 p-0.5 rounded-full"><CheckCircle size={12} className="text-primary" /></div>
                            <p className="text-xs text-muted-foreground">Acceso a miles de profesionales verificados.</p>
                        </div>
                        <div className="flex items-start gap-2">
                            <div className="mt-1 bg-primary/20 p-0.5 rounded-full"><CheckCircle size={12} className="text-primary" /></div>
                            <p className="text-xs text-muted-foreground">Garantía de satisfacción en tus servicios.</p>
                        </div>
                    </div>

                    <Button className="w-full font-bold mt-4" variant="gold" size="lg" disabled={loading}>
                        {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Crear Cuenta"}
                    </Button>
                </form>

                <div className="mt-6 pt-6 border-t border-white/10 text-center text-sm text-muted-foreground">
                    ¿Ya tienes cuenta?{" "}
                    <Link to="/login" className="text-primary hover:underline font-bold">
                        Inicia Sesión
                    </Link>
                </div>
            </div>
        </div>
    )
}
