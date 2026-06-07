import { createClient, type SupabaseClient } from '@supabase/supabase-js'

let adminClient: SupabaseClient | null = null

export function getSupabaseUrl(): string | undefined {
  return process.env.NEXT_PUBLIC_SUPABASE_URL ?? process.env.SUPABASE_URL
}

export function getSupabaseServerKey(): string | undefined {
  return process.env.SUPABASE_SECRET_KEY ?? process.env.SUPABASE_SERVICE_ROLE_KEY
}

export function isSupabaseConfigured(): boolean {
  return Boolean(getSupabaseUrl() && getSupabaseServerKey())
}

/** Server-only client for API routes (wishlist, admin). Uses the secret / service role key. */
export function getSupabaseAdmin(): SupabaseClient | null {
  const url = getSupabaseUrl()
  const serverKey = getSupabaseServerKey()

  if (!url || !serverKey) return null

  if (!adminClient) {
    adminClient = createClient(url, serverKey, {
      auth: { persistSession: false, autoRefreshToken: false },
    })
  }

  return adminClient
}

export function isSupabasePublicConfigured(): boolean {
  const key =
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ??
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  return Boolean(getSupabaseUrl() && key)
}
