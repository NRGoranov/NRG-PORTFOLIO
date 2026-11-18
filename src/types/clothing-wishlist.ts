export type WishlistEntry = {
  id: string
  slug: string
  email: string
  name: string | null
  createdAt: string
  consentAt?: string | null
}

export type WishlistJoinInput = {
  slug: string
  email: string
  name?: string | null
  consentAt?: string | null
}
