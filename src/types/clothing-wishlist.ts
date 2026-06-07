export type WishlistEntry = {
  id: string
  slug: string
  email: string
  name: string | null
  createdAt: string
}

export type WishlistJoinInput = {
  slug: string
  email: string
  name?: string | null
}
