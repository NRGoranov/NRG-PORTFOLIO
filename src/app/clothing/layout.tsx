import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { isClothingPublic } from '@/lib/clothing/visibility'

export const metadata: Metadata = {
  title: 'Clothing',
  description: 'NRG apparel — pieces in development. Check in to the wishlist for early access.',
  robots: { index: false, follow: false },
}

export default function ClothingLayout({ children }: { children: React.ReactNode }) {
  if (!isClothingPublic()) {
    notFound()
  }

  return children
}
