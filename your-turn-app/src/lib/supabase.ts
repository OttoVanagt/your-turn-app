import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://demo.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'demo_key'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export interface Subscriber {
  id: string
  email: string
  firstName?: string
  interests: string[]
  consent: boolean
  referralCode?: string
  referredBy?: string
  createdAt: string
}

