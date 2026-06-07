import type { ClothingItem } from '@/types/clothing'

export const clothingItems: ClothingItem[] = [
  {
    slug: 'zip-up',
    name: '??? Zip-Up',
    teaser: 'Something is being stitched in the dark.',
    description:
      'Details are still under wraps. A zip-up is in development — cut, fabric, and drop date remain classified. Check in to the wishlist and you will be first to know when it surfaces.',
    status: 'coming-soon',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { id: 'unknown-black', name: 'Unknown', hue: 220 },
      { id: 'unknown-smoke', name: 'Smoke', hue: 240 },
      { id: 'unknown-ash', name: 'Ash', hue: 260 },
    ],
    priceLabel: 'Wishlist check-in',
  },
]

export function getClothingItem(slug: string): ClothingItem | undefined {
  return clothingItems.find((item) => item.slug === slug)
}
