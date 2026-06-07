export type ClothingStatus = 'coming-soon' | 'available'

export interface ClothingColor {
  id: string
  name: string
  /** Hue angle for mysterious placeholder gradient (0–360) */
  hue: number
}

export interface ClothingItem {
  slug: string
  name: string
  teaser: string
  description: string
  status: ClothingStatus
  sizes: string[]
  colors: ClothingColor[]
  /** Shown instead of a numeric price */
  priceLabel: string
}
