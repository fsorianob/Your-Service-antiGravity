export interface Service {
    name: string;
    price: string;
}

export interface Review {
    user: string;
    rating: number;
    text: string;
}

export interface Professional {
    id: string;
    name: string;
    title: string;
    rating: number;
    reviewsCount: number;
    price: string;
    image: string;
    imageCover?: string;
    verified: boolean;
    description: string;
    availability: string;
    category: string;
    location: string;
    about: string;
    services: Service[];
    reviews: Review[];
}

export const PROFESSIONALS_DATA: Professional[] = [
    {
        id: "1",
        name: "Juan Pérez",
        title: "Gasfíter Certificado SEC",
        rating: 4.9,
        reviewsCount: 124,
        price: "Desde $25.000",
        image: "https://images.unsplash.com/photo-1540569014015-19a7be504e3a?q=80&w=1935&auto=format&fit=crop",
        verified: true,
        description: "Especialista en fugas, destapes y calefont. Atención inmediata en Providencia y Ñuñoa.",
        availability: "Hoy",
        category: "Gasfitería",
        location: "Providencia, RM",
        about: "Soy Juan, gasfíter con más de 10 años de experiencia. Certificado por la SEC para instalaciones de gas y agua potable. Me especializo en emergencias y reparaciones rápidas con garantía de satisfacción.",
        services: [
            { name: "Destape de Cañerías", price: "$35.000" },
            { name: "Instalación de Grifería", price: "$25.000" },
            { name: "Mantención de Calefont", price: "$45.000" }
        ],
        reviews: [
            { user: "Ana M.", rating: 5, text: "Excelente servicio, llegó a la hora y solucionó el problema rapidísimo." },
            { user: "Carlos D.", rating: 5, text: "Muy profesional y limpio. Recomendado." }
        ]
    },
    {
        id: "2",
        name: "Servicios H&M",
        title: "Expertos en Gasfitería",
        rating: 4.7,
        reviewsCount: 89,
        price: "Desde $20.000",
        image: "https://images.unsplash.com/photo-1581578731117-104f2a41272c?q=80&w=2070&auto=format&fit=crop",
        imageCover: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?q=80&w=2070&auto=format&fit=crop",
        verified: true,
        description: "Instalaciones sanitarias completas. Garantía de 3 meses en todos los trabajos.",
        availability: "Mañana",
        category: "Gasfitería",
        location: "Santiago Centro, RM",
        about: "Empresa familiar dedicada a la gasfitería integral. Atendemos comunidades y particulares.",
        services: [
            { name: "Instalación Sanitaria", price: "$40.000" },
            { name: "Fugas de Gas", price: "$50.000" }
        ],
        reviews: [
            { user: "Pedro S.", rating: 4, text: "Buen trabajo, aunque se demoraron un poco en llegar." }
        ]
    },
    {
        id: "3",
        name: "Carlos Ruiz",
        title: "Gasfíter a Domicilio",
        rating: 4.5,
        reviewsCount: 45,
        price: "Cotizar",
        image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=2069&auto=format&fit=crop",
        verified: false,
        description: "Reparaciones menores y mantención preventiva. Calidad y buen precio.",
        availability: "Hoy",
        category: "Gasfitería",
        location: "Ñuñoa, RM",
        about: "Trabajo independiente, precios justos y buena disposición.",
        services: [
            { name: "Reparación de Llaves", price: "$15.000" }
        ],
        reviews: []
    },
    {
        id: "4",
        name: "María González",
        title: "Clean Expert - Limpieza Profunda",
        rating: 5.0,
        reviewsCount: 210,
        price: "Depuis $30.000",
        image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1961&auto=format&fit=crop",
        verified: true,
        description: "Limpieza profunda de casas y departamentos. Especialista en mudanzas y post-construcción.",
        availability: "Mañana",
        category: "Limpieza",
        location: "Las Condes, RM",
        about: "Ofrezco servicios de limpieza detallada con productos ecológicos. Mi objetivo es dejar tu hogar impecable y libre de alérgenos.",
        services: [
            { name: "Limpieza General", price: "$30.000" },
            { name: "Limpieza Post-Mudanza", price: "$60.000" },
            { name: "Limpieza de Alfombras", price: "$25.000" }
        ],
        reviews: [
            { user: "Lucía P.", rating: 5, text: "Increíble trabajo, mi departamento quedó como nuevo." },
            { user: "Roberto F.", rating: 5, text: "Muy puntual y detallista. Usa buenos productos." }
        ]
    }
]
