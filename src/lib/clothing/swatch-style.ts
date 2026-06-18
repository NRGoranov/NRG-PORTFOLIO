import type { CSSProperties } from 'react'
import type { ClothingColor } from '@/types/clothing'

/** Display colors for named garment swatches (matches product color labels). */
const NAMED_SWATCH_COLORS: Record<string, string> = {
  White: '#f5f5f3',
  Black: '#141414',
  Beige: '#d9cdb8',
  Burgundy: '#6b2d35',
  Grey: '#8a8d94',
  Green: '#3f6b52',
  Navy: '#1c3349',
  Brown: '#5c3d28',
  Unknown: '#2a3040',
  Smoke: '#3d4554',
  Ash: '#5a6270',
}

export function clothingSwatchBackground(color: Pick<ClothingColor, 'name' | 'hue'>): string {
  const named = NAMED_SWATCH_COLORS[color.name]
  if (named) return named

  return `linear-gradient(135deg, hsl(${color.hue} 25% 22%), hsl(${color.hue + 20} 20% 12%))`
}

export function clothingSwatchStyle(color: Pick<ClothingColor, 'name' | 'hue'>): CSSProperties {
  const named = NAMED_SWATCH_COLORS[color.name]
  if (named) {
    return { background: named }
  }

  return { background: clothingSwatchBackground(color) }
}

export function clothingSwatchNeedsLightBorder(colorName: string): boolean {
  return colorName === 'White' || colorName === 'Beige'
}
