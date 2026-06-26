import { createClient } from '@supabase/supabase-js'

// Use fallback placeholders during build time if environment variables are not set
const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL || 'https://placeholder-project.supabase.co'
const supabaseAnonKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY || 'placeholder-anon-key'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
