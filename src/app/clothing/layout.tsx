import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Clothing',
  description: 'NRG apparel — pieces in development. Check in to the wishlist for early access.',
}

export default function ClothingLayout({ children }: { children: React.ReactNode }) {
  return children
}
