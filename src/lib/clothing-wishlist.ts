const STORAGE_KEY = 'nrg-clothing-wishlist'

export function getWishlistSlugs(): string[] {
  if (typeof window === 'undefined') return []
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed.filter((s): s is string => typeof s === 'string') : []
  } catch {
    return []
  }
}

export function isInWishlist(slug: string): boolean {
  return getWishlistSlugs().includes(slug)
}

export function toggleWishlistCheckIn(slug: string): boolean {
  const current = getWishlistSlugs()
  const exists = current.includes(slug)
  const next = exists ? current.filter((s) => s !== slug) : [...current, slug]
  localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
  window.dispatchEvent(new CustomEvent('clothing-wishlist-change', { detail: next }))
  return !exists
}
