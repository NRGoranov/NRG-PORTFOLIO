'use client'

import Image from 'next/image'
import { cn } from '@/lib/utils'
import type { ClothingColor } from '@/types/clothing'
import { MysteriousPlaceholder } from '@/components/clothing/MysteriousPlaceholder'

interface ClothingColorMediaProps {
  color: ClothingColor
  alt: string
  className?: string
  showHover?: boolean
  priority?: boolean
  placeholderLabel?: string
}

export function ClothingColorMedia({
  color,
  alt,
  className,
  showHover = true,
  priority = false,
  placeholderLabel,
}: ClothingColorMediaProps) {
  if (!color.imageUrl) {
    return (
      <MysteriousPlaceholder
        hue={color.hue}
        label={placeholderLabel ?? 'CLASSIFIED'}
        className={className}
      />
    )
  }

  return (
    <div className={cn('relative h-full w-full overflow-hidden bg-[#0a0a0a]', className)}>
      <Image
        src={color.imageUrl}
        alt={alt}
        fill
        priority={priority}
        className={cn(
          'object-cover object-center transition-opacity duration-300',
          showHover && color.hoverImageUrl && 'group-hover:opacity-0',
        )}
        sizes="(max-width: 768px) 100vw, 400px"
      />
      {showHover && color.hoverImageUrl ? (
        <Image
          src={color.hoverImageUrl}
          alt=""
          fill
          aria-hidden
          className="object-cover object-center opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          sizes="(max-width: 768px) 100vw, 400px"
        />
      ) : null}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/40 via-transparent to-background/10" />
    </div>
  )
}

export function clothingItemHasImages(colors: ClothingColor[]): boolean {
  return colors.some((color) => Boolean(color.imageUrl))
}
