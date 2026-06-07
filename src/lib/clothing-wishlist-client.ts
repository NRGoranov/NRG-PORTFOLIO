const STORAGE_KEY = 'nrg-clothing-wishlist-signups'

type SignupMap = Record<string, string>

function readSignups(): SignupMap {
  if (typeof window === 'undefined') return {}
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return {}
    const parsed = JSON.parse(raw) as SignupMap
    return parsed && typeof parsed === 'object' ? parsed : {}
  } catch {
    return {}
  }
}

function writeSignups(signups: SignupMap) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(signups))
  window.dispatchEvent(new CustomEvent('clothing-wishlist-change'))
}

export function getSignedUpEmail(slug: string): string | null {
  return readSignups()[slug] ?? null
}

export function isSignedUp(slug: string): boolean {
  return Boolean(getSignedUpEmail(slug))
}

export function saveSignedUpEmail(slug: string, email: string) {
  const signups = readSignups()
  signups[slug] = email.trim().toLowerCase()
  writeSignups(signups)
}

export function clearSignedUpEmail(slug: string) {
  const signups = readSignups()
  delete signups[slug]
  writeSignups(signups)
}

const ADMIN_SESSION_KEY = 'nrg-clothing-wishlist-admin'

export function setWishlistAdminUnlocked(unlocked: boolean) {
  if (unlocked) {
    sessionStorage.setItem(ADMIN_SESSION_KEY, '1')
  } else {
    sessionStorage.removeItem(ADMIN_SESSION_KEY)
  }
  window.dispatchEvent(new CustomEvent('clothing-wishlist-admin-change'))
}

export function isWishlistAdminUnlocked(): boolean {
  if (typeof window === 'undefined') return false
  return sessionStorage.getItem(ADMIN_SESSION_KEY) === '1'
}
