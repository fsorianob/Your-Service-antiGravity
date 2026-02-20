import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Link } from "react-router-dom"
import { ShieldCheck, Loader2, ArrowLeft, MailCheck } from "lucide-react"
import { useState } from "react"
import { supabase } from "@/lib/supabase"

export default function ForgotPasswordPage() {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [success, setSuccess] = useState(false)

    const handleResetPassword = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setLoading(true)
        setError(null)

        const formData = new FormData(e.currentTarget)
        const email = formData.get("email") as string

        const { error } = await supabase.auth.resetPasswordForEmail(email, {
            redirectTo: `${window.location.origin}/reset-password`,
        })

        if (error) {
            setError(error.message)
            setLoading(false)
        } else {
            setSuccess(true)
            setLoading(false)
        }
    }

    if (success) {
        return (
            <div className="flex-1 flex items-center justify-center p-4 animate-in fade-in duration-500">
                <div className="w-full max-w-md bg-card border border-white/10 rounded-xl p-8 shadow-2xl text-center">
                    <div className="bg-primary/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                        <MailCheck className="h-8 w-8 text-primary" />
                    </div>
                    <h1 className="text-2xl font-bold text-white mb-4">Revisa tu correo</h1>
                    <p className="text-muted-foreground mb-6">
                        Te hemos enviado un enlace para que puedas recuperar tu contraseña. Por favor, revisa también tu carpeta de Spam.
                    </p>
                    <Link to="/login">
                        <Button variant="outline" className="w-full border-white/10 text-white">
                            Volver a Iniciar Sesión
                        </Button>
                    </Link>
                </div>
            </div>
        )
    }

    return (
        <div className="flex-1 flex items-center justify-center p-4 animate-in fade-in duration-500">
            <div className="w-full max-w-md bg-card border border-white/10 rounded-xl p-8 shadow-2xl">
                <div className="mb-6">
                    <Link to="/login" className="inline-flex items-center text-sm text-muted-foreground hover:text-white transition-colors">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Volver al inicio de sesión
                    </Link>
                </div>

                <div className="text-center mb-8">
                    <h1 className="text-2xl font-bold text-white">Recupera tu contraseña</h1>
                    <p className="text-muted-foreground mt-2">Ingresa tu correo electrónico asociado a tu cuenta y te enviaremos las instrucciones</p>
                </div>

                {error && (
                    <div className="bg-red-500/10 border border-red-500/20 text-red-500 p-3 rounded-md text-sm mb-4">
                        {error}
                    </div>
                )}

                <form className="space-y-4" onSubmit={handleResetPassword}>
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-white">Email</label>
                        <Input name="email" type="email" placeholder="nombre@ejemplo.com" className="bg-background/50 border-white/10 text-white" required />
                    </div>

                    <Button className="w-full font-bold mt-4" variant="gold" size="lg" disabled={loading}>
                        {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Enviar instrucciones"}
                    </Button>
                </form>

                <div className="mt-6 flex items-center justify-center gap-2 text-xs text-muted-foreground/50">
                    <ShieldCheck size={12} /> Proceso seguro y encriptado
                </div>
            </div>
        </div>
    )
}
