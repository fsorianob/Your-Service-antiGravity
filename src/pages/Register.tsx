import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Link, useNavigate } from "react-router-dom"
import { CheckCircle, Loader2, Mail, ArrowLeft, User, Briefcase } from "lucide-react"
import { useState } from "react"
import { supabase } from "@/lib/supabase"

type Role = 'admin' | 'client' | 'professional' | null

export default function RegisterPage() {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [success, setSuccess] = useState(false)
    const [selectedRole, setSelectedRole] = useState<Role>(null)

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
                    role: selectedRole || 'client'
                }
            }
        })

        if (error) {
            setError(error.message)
            setLoading(false)
        } else {
            // Check if session was created immediately (email confirmation disabled)
            if (data.session) {
                if (selectedRole === 'admin') navigate("/dashboard/admin")
                else if (selectedRole === 'professional') navigate("/dashboard/pro")
                else navigate("/dashboard/client")
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
        <div className="flex-1 flex items-center justify-center p-4 min-h-[80vh]">
            <div className="w-full max-w-md bg-card border border-white/10 rounded-xl p-8 shadow-2xl relative overflow-hidden">
                <div className="text-center mb-8 flex flex-col items-center animate-in fade-in slide-in-from-top-4 duration-500">
                    <img src="/logoYS_transparent.png" alt="YourService Logo" className="h-16 w-auto object-contain mb-6 drop-shadow-lg" />
                    <h1 className="text-2xl font-bold text-white">Crea tu cuenta</h1>
                    <p className="text-muted-foreground mt-2">
                        {selectedRole ? 'Completa tus datos para continuar' : 'Selecciona el tipo de cuenta que deseas crear'}
                    </p>
                </div>

                {error && (
                    <div className="bg-red-500/10 border border-red-500/20 text-red-500 p-3 rounded-md text-sm mb-4 animate-in slide-in-from-top-2">
                        {error}
                    </div>
                )}

                {!selectedRole && (
                    <div className="space-y-4 animate-in fade-in zoom-in-95 duration-300">
                        <Button
                            variant="outline"
                            className="w-full h-auto py-4 flex items-center justify-start gap-4 border-white/10 hover:border-primary/50 hover:bg-primary/5 group rounded-2xl"
                            onClick={() => setSelectedRole('client')}
                        >
                            <div className="bg-white/5 p-3 rounded-full group-hover:bg-primary/20 transition-colors">
                                <User className="text-gray-300 group-hover:text-primary transition-colors" size={24} />
                            </div>
                            <div className="text-left">
                                <span className="block text-white font-bold text-lg group-hover:text-primary transition-colors">Quiero ser Cliente</span>
                                <span className="block text-sm text-muted-foreground group-hover:text-gray-300">Crear perfil para contratar Servicios.</span>
                            </div>
                        </Button>

                        <Button
                            variant="outline"
                            className="w-full h-auto py-4 flex items-center justify-start gap-4 border-white/10 hover:border-primary/50 hover:bg-primary/5 group rounded-2xl"
                            onClick={() => setSelectedRole('professional')}
                        >
                            <div className="bg-white/5 p-3 rounded-full group-hover:bg-primary/20 transition-colors">
                                <Briefcase className="text-gray-300 group-hover:text-primary transition-colors" size={24} />
                            </div>
                            <div className="text-left">
                                <span className="block text-white font-bold text-lg group-hover:text-primary transition-colors">Quiero ser Negocio</span>
                                <span className="block text-sm text-muted-foreground group-hover:text-gray-300">Crear perfil para publicar mis Servicios.</span>
                            </div>
                        </Button>
                    </div>
                )}

                {selectedRole && (
                    <form className="space-y-4 animate-in slide-in-from-right-4 duration-300" onSubmit={handleRegister}>
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

                        <div className="pt-2 flex flex-col gap-3">
                            <Button className="w-full font-bold shadow-lg" variant="gold" size="lg" disabled={loading}>
                                {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Crear Cuenta"}
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
