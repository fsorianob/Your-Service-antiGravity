import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
    console.warn('Missing Supabase Environment Variables')
}

export const supabase = createClient(supabaseUrl || '', supabaseAnonKey || '')

// Types based on our Schema
export type Profile = {
    id: string
    email: string
    role: 'client' | 'professional'
    full_name: string
    avatar_url?: string
    phone?: string
    title?: string
    description?: string
    about?: string
    location?: string
    price_range?: string
    image_cover_url?: string
    verified: boolean
    rating: number
    reviews_count: number
    category?: string
    availability?: string
}

export type Service = {
    id: string
    professional_id: string
    name: string
    price: string
}

export type Request = {
    id: string
    client_id: string
    professional_id: string
    status: 'pending' | 'accepted' | 'rejected' | 'completed'
    description: string
    date: string
    time_slot: string
    address: string
    contact_phone: string
}
