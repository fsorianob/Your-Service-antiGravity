import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Link, useNavigate } from "react-router-dom"
import { ShieldCheck, Loader2 } from "lucide-react"
import { useState } from "react"
import { supabase } from "@/lib/supabase"

export default function LoginPage() {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

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
            navigate("/")
        }
    }

    return (
        <div className="flex-1 flex items-center justify-center p-4 animate-in fade-in duration-500">
            <div className="w-full max-w-md bg-card border border-white/10 rounded-xl p-8 shadow-2xl">
                <div className="text-center mb-8 flex flex-col items-center">
                    <img src="/logoYS.png" alt="YourService Logo" className="h-16 w-auto object-contain mb-6" />
                    <h1 className="text-2xl font-bold text-white">Bienvenido de nuevo</h1>
                    <p className="text-muted-foreground mt-2">Ingresa a tu cuenta para gestionar tus solicitudes</p>
                </div>

                {error && (
                    <div className="bg-red-500/10 border border-red-500/20 text-red-500 p-3 rounded-md text-sm mb-4">
                        {error}
                    </div>
                )}

                <form className="space-y-4" onSubmit={handleLogin}>
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

                    <Button className="w-full font-bold" variant="gold" size="lg" disabled={loading}>
                        {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Iniciar Sesión"}
                    </Button>
                </form>

                <div className="mt-6 pt-6 border-t border-white/10 text-center text-sm text-muted-foreground">
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
