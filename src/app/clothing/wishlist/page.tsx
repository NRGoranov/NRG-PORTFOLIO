import { Suspense } from 'react'
import type { Metadata } from 'next'
import ClothingWishlistPage from './WishlistPageClient'

export const metadata: Metadata = {
  title: 'Wishlist subscribers',
  description: 'Admin view of clothing wishlist sign-ups.',
  robots: { index: false, follow: false },
}

export default function WishlistPage() {
  return (
    <Suspense fallback={<div className="min-h-screen py-20 text-center text-muted-foreground">Loading…</div>}>
      <ClothingWishlistPage />
    </Suspense>
  )
}
