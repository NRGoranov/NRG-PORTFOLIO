export type ClothingStatus = 'coming-soon' | 'available' | 'interest-gated'

export type ClothingCollectionId = 'elegance' | 'pump-covers' | 'confidence'

export interface ClothingColor {
  id: string
  name: string
  /** Hue angle for mysterious placeholder gradient (0–360) */
  hue: number
  imageUrl?: string
  hoverImageUrl?: string
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
  /** Optional internal label on mystery placeholders */
  codename?: string
  /** Collection grouping for community-voted pieces */
  collection?: ClothingCollectionId
  /** Interest signals required before production is considered */
  interestGoal?: number
}

export interface ClothingCollection {
  id: ClothingCollectionId
  title: string
  subtitle: string
}
