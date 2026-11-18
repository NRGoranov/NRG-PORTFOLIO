import { randomUUID } from 'crypto'
import { promises as fs } from 'fs'
import path from 'path'
import { getSupabaseAdmin, isSupabaseConfigured } from '@/lib/supabase/server'
import type { WishlistEntry, WishlistJoinInput } from '@/types/clothing-wishlist'

const JSON_PATH = path.join(process.cwd(), 'data', 'clothing-wishlist.json')

type WishlistRow = {
  id: string
  slug: string
  email: string
  name: string | null
  created_at: string
  consent_at?: string | null
}

function mapRow(row: WishlistRow): WishlistEntry {
  return {
    id: row.id,
    slug: row.slug,
    email: row.email,
    name: row.name,
    createdAt: row.created_at,
    consentAt: row.consent_at ?? null,
  }
}

function requireStorageInProduction(action: string): never {
  throw new Error(
    `${action} requires Supabase in production. Add NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, and run supabase/wishlist-schema.sql.`,
  )
}

async function readJsonEntries(): Promise<WishlistEntry[]> {
  try {
    const raw = await fs.readFile(JSON_PATH, 'utf8')
    const parsed = JSON.parse(raw) as WishlistEntry[]
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

async function writeJsonEntries(entries: WishlistEntry[]): Promise<void> {
  await fs.mkdir(path.dirname(JSON_PATH), { recursive: true })
  await fs.writeFile(JSON_PATH, `${JSON.stringify(entries, null, 2)}\n`, 'utf8')
}

export async function addWishlistEntry(input: WishlistJoinInput): Promise<WishlistEntry> {
  const email = input.email.trim().toLowerCase()
  const slug = input.slug.trim()
  const name = input.name?.trim() || null

  const supabase = getSupabaseAdmin()
  if (supabase) {
    const { data: existing, error: existingError } = await supabase
      .from('clothing_wishlist_entries')
      .select('*')
      .eq('slug', slug)
      .eq('email', email)
      .maybeSingle()

    if (existingError) throw new Error(existingError.message)
    if (existing) return mapRow(existing as WishlistRow)

    const id = randomUUID()
    const createdAt = new Date().toISOString()
    const consentAt = input.consentAt ?? createdAt
    const row = {
      id,
      slug,
      email,
      name,
      created_at: createdAt,
      consent_at: consentAt,
    }
    let inserted = await supabase.from('clothing_wishlist_entries').insert(row).select('*').single()
    if (inserted.error && /consent_at/i.test(inserted.error.message)) {
      inserted = await supabase
        .from('clothing_wishlist_entries')
        .insert({
          id: row.id,
          slug: row.slug,
          email: row.email,
          name: row.name,
          created_at: row.created_at,
        })
        .select('*')
        .single()
    }
    if (inserted.error) throw new Error(inserted.error.message)
    return mapRow(inserted.data as WishlistRow)
  }

  if (process.env.NODE_ENV !== 'development') {
    requireStorageInProduction('Saving wishlist sign-ups')
  }

  const entries = await readJsonEntries()
  const existing = entries.find((entry) => entry.slug === slug && entry.email === email)
  if (existing) return existing

  const createdAt = new Date().toISOString()
  const entry: WishlistEntry = {
    id: randomUUID(),
    slug,
    email,
    name,
    createdAt,
    consentAt: input.consentAt ?? createdAt,
  }

  entries.unshift(entry)
  await writeJsonEntries(entries)
  return entry
}

export async function listWishlistEntries(slug?: string): Promise<WishlistEntry[]> {
  const supabase = getSupabaseAdmin()
  if (supabase) {
    let query = supabase
      .from('clothing_wishlist_entries')
      .select('*')
      .order('created_at', { ascending: false })

    if (slug) {
      query = query.eq('slug', slug)
    }

    const { data, error } = await query
    if (error) throw new Error(error.message)
    return (data ?? []).map((row) => mapRow(row as WishlistRow))
  }

  if (process.env.NODE_ENV !== 'development') {
    requireStorageInProduction('Loading wishlist sign-ups')
  }

  const entries = await readJsonEntries()
  const filtered = slug ? entries.filter((entry) => entry.slug === slug) : entries
  return filtered.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  )
}

export async function countWishlistEntries(slug: string): Promise<number> {
  const supabase = getSupabaseAdmin()
  if (supabase) {
    const { count, error } = await supabase
      .from('clothing_wishlist_entries')
      .select('id', { count: 'exact', head: true })
      .eq('slug', slug)
    if (error) throw new Error(error.message)
    return count ?? 0
  }

  if (process.env.NODE_ENV !== 'development') {
    requireStorageInProduction('Counting wishlist sign-ups')
  }

  const entries = await readJsonEntries()
  return entries.filter((entry) => entry.slug === slug).length
}

export async function isEmailOnWishlist(slug: string, email: string): Promise<boolean> {
  const normalized = email.trim().toLowerCase()
  const supabase = getSupabaseAdmin()
  if (supabase) {
    const { count, error } = await supabase
      .from('clothing_wishlist_entries')
      .select('id', { count: 'exact', head: true })
      .eq('slug', slug)
      .eq('email', normalized)
    if (error) throw new Error(error.message)
    return (count ?? 0) > 0
  }

  const entries = await listWishlistEntries(slug)
  return entries.some((entry) => entry.email === normalized)
}

export async function removeWishlistEntry(slug: string, email: string): Promise<void> {
  const normalized = email.trim().toLowerCase()
  const supabase = getSupabaseAdmin()
  if (supabase) {
    const { error } = await supabase
      .from('clothing_wishlist_entries')
      .delete()
      .eq('slug', slug)
      .eq('email', normalized)
    if (error) throw new Error(error.message)
    return
  }

  if (process.env.NODE_ENV !== 'development') {
    requireStorageInProduction('Removing a wishlist sign-up')
  }

  const entries = await readJsonEntries()
  await writeJsonEntries(
    entries.filter((entry) => !(entry.slug === slug && entry.email === normalized)),
  )
}

export function verifyClothingAdminPassword(password: string): boolean {
  const expected = process.env.CLOTHING_ADMIN_PASSWORD?.trim()
  if (!expected) return false
  if (password.length !== expected.length) return false
  let mismatch = 0
  for (let i = 0; i < password.length; i += 1) {
    mismatch |= password.charCodeAt(i) ^ expected.charCodeAt(i)
  }
  return mismatch === 0
}

export function getWishlistStorageMode(): 'supabase' | 'local-json' {
  return isSupabaseConfigured() ? 'supabase' : 'local-json'
}
