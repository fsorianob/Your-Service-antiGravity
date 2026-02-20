import { useParams } from "react-router-dom"

const PAGES_DATA: Record<string, { title: string; content: React.ReactNode }> = {
    about: {
        title: "Sobre Nosotros",
        content: (
            <>
                <p className="mb-4">YourService nace en Santiago con una misión simple: dignificar el trabajo de oficios y brindar seguridad a los hogares chilenos.</p>
                <p className="mb-4">Somos una plataforma que conecta a los mejores profesionales verificar con clientes exigentes que buscan calidad y rapidez.</p>
                <p>Desde 2026, hemos ayudado a más de 10.000 hogares a encontrar soluciones para gasfitería, electricidad, limpieza y más.</p>
            </>
        )
    },
    terms: {
        title: "Términos y Condiciones",
        content: (
            <>
                <p className="mb-4">Bienvenido a YourService. Al usar nuestra plataforma, aceptas estos términos.</p>
                <h3 className="text-lg font-bold text-white mt-6 mb-2">1. Uso del Servicio</h3>
                <p className="mb-4">YourService actúa como intermediario. No somos empleadores directos de los profesionales.</p>
                <h3 className="text-lg font-bold text-white mt-6 mb-2">2. Pagos</h3>
                <p className="mb-4">Los pagos se procesan de forma segura a través de nuestros partners financieros.</p>
            </>
        )
    },
    privacy: {
        title: "Política de Privacidad",
        content: (
            <>
                <p className="mb-4">Tu privacidad es fundamental. Solo compartimos tus datos con el profesional que contratas.</p>
                <p>Utilizamos encriptación de grado militar para proteger toda tu información personal y financiera.</p>
            </>
        )
    },
    cookies: {
        title: "Política de Cookies",
        content: (
            <>
                <p className="mb-4">Usamos cookies para mejorar tu experiencia de navegación y recordar tus preferencias.</p>
            </>
        )
    },
    contact: {
        title: "Contacto",
        content: (
            <>
                <p className="mb-4">¿Tienes dudas? Escríbenos a <a href="mailto:hola@yourservice.cl" className="text-primary hover:underline">hola@yourservice.cl</a></p>
                <p>Nuestra oficina está ubicada en Av. Providencia 1234, Santiago.</p>
            </>
        )
    },
    press: {
        title: "Prensa",
        content: (
            <>
                <p className="mb-4">Descarga nuestro kit de prensa y logotipos aquí.</p>
            </>
        )
    }
}

export default function InfoPage() {
    const { slug } = useParams()
    const page = slug ? PAGES_DATA[slug] : null

    if (!page) {
        return <div className="flex-1 flex items-center justify-center text-white">Página no encontrada</div>
    }

    return (
        <div className="flex-1 container mx-auto px-4 md:px-6 py-12 md:py-20 max-w-3xl animate-in fade-in duration-500">
            <h1 className="text-4xl font-bold text-white mb-8 border-b border-white/10 pb-4">{page.title}</h1>
            <div className="text-muted-foreground leading-relaxed text-lg">
                {page.content}
            </div>
        </div>
    )
}
