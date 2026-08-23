import { createClient } from '@supabase/supabase-js'

// Ces valeurs viennent de ton projet Supabase "Livraison Villers Cotteret"
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://sguxxbhbwhrhmqaikjku.supabase.co'
const supabaseAnonKey =
  import.meta.env.VITE_SUPABASE_ANON_KEY ||
  'sb_publishable_Sn8No-0KIeiY6xYjE4YTFA_7jtGZ1Ky'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
