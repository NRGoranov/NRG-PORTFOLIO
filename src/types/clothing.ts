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
  /** Internal archive label shown on mystery placeholders */
  codename?: string
  /** Group for interest-gated pieces from the Diplomna archive */
  collection?: ClothingCollectionId
  /** Interest signals required before production is considered */
  interestGoal?: number
}

export interface ClothingCollection {
  id: ClothingCollectionId
  title: string
  subtitle: string
}
