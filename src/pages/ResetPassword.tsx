import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useNavigate } from "react-router-dom"
import { ShieldCheck, Loader2 } from "lucide-react"
import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabase"

export default function ResetPasswordPage() {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [success, setSuccess] = useState(false)

    useEffect(() => {
        // En Supabase, al hacer click en el enlace de recuperación,
        // el usuario es automáticamente autenticado temporalmente con su hash en la URL.
        // Si no hay sesión tras el redirect, puede que el enlace sea inválido.
        const checkSession = async () => {
            const { data: { session } } = await supabase.auth.getSession()
            if (!session) {
                // Posiblemente no viene del link correcto o ya expiró
                // setError("El enlace de recuperación no es válido o ha expirado. Por favor, solicita uno nuevo.")
            }
        }
        checkSession()
    }, [])

    const handleUpdatePassword = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setLoading(true)
        setError(null)

        const formData = new FormData(e.currentTarget)
        const newPassword = formData.get("password") as string
        const confirmPassword = formData.get("confirmPassword") as string

        if (newPassword !== confirmPassword) {
            setError("Las contraseñas no coinciden")
            setLoading(false)
            return
        }

        if (newPassword.length < 6) {
            setError("La contraseña debe tener al menos 6 caracteres")
            setLoading(false)
            return
        }

        const { error } = await supabase.auth.updateUser({
            password: newPassword
        })

        if (error) {
            setError(error.message)
            setLoading(false)
        } else {
            setSuccess(true)
            setLoading(false)

            // Cerrar sesión después de cambiar la clave para obligar a loguearse de nuevo con la nueva
            await supabase.auth.signOut()
            setTimeout(() => {
                navigate("/login")
            }, 3000)
        }
    }

    if (success) {
        return (
            <div className="flex-1 flex items-center justify-center p-4 animate-in fade-in duration-500">
                <div className="w-full max-w-md bg-card border border-white/10 rounded-xl p-8 shadow-2xl text-center">
                    <div className="bg-green-500/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                        <ShieldCheck className="h-8 w-8 text-green-500" />
                    </div>
                    <h1 className="text-2xl font-bold text-white mb-4">¡Contraseña Actualizada!</h1>
                    <p className="text-muted-foreground mb-6">
                        Tu contraseña se ha cambiado exitosamente. Serás redirigido al inicio de sesión en unos segundos...
                    </p>
                </div>
            </div>
        )
    }

    return (
        <div className="flex-1 flex items-center justify-center p-4 animate-in fade-in duration-500">
            <div className="w-full max-w-md bg-card border border-white/10 rounded-xl p-8 shadow-2xl">
                <div className="text-center mb-8">
                    <h1 className="text-2xl font-bold text-white">Nueva contraseña</h1>
                    <p className="text-muted-foreground mt-2">Por tu seguridad, elige una contraseña fuerte</p>
                </div>

                {error && (
                    <div className="bg-red-500/10 border border-red-500/20 text-red-500 p-3 rounded-md text-sm mb-4">
                        {error}
                    </div>
                )}

                <form className="space-y-4" onSubmit={handleUpdatePassword}>
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-white">Nueva Contraseña</label>
                        <Input name="password" type="password" placeholder="••••••••" className="bg-background/50 border-white/10 text-white" required minLength={6} />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-white">Confirmar Nueva Contraseña</label>
                        <Input name="confirmPassword" type="password" placeholder="••••••••" className="bg-background/50 border-white/10 text-white" required minLength={6} />
                    </div>

                    <Button className="w-full font-bold mt-4" variant="gold" size="lg" disabled={loading}>
                        {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Guardar contraseña"}
                    </Button>
                </form>
            </div>
        </div>
    )
}
