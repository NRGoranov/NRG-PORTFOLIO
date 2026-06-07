'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import type { ClothingItem } from '@/types/clothing'
import { MysteriousPlaceholder } from '@/components/clothing/MysteriousPlaceholder'
import { WishlistCheckInButton } from '@/components/clothing/WishlistCheckInButton'

interface ClothingProductCardProps {
  item: ClothingItem
  index?: number
}

export function ClothingProductCard({ item, index = 0 }: ClothingProductCardProps) {
  const router = useRouter()
  const [selectedColorIndex, setSelectedColorIndex] = useState(0)
  const currentColor = item.colors[selectedColorIndex] ?? item.colors[0]

  const handleOpen = () => {
    router.push(`/clothing/${item.slug}`)
  }

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -4 }}
      className="group w-full max-w-[315px]"
    >
      <div
        role="link"
        tabIndex={0}
        onClick={handleOpen}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            handleOpen()
          }
        }}
        className={cn(
          'relative cursor-pointer overflow-hidden rounded-2xl border border-white/10',
          'bg-background/30 shadow-xl backdrop-blur-xl transition-all duration-300',
          'hover:border-white/20 hover:bg-background/40 hover:shadow-2xl hover:shadow-primary/5',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background',
        )}
      >
        <div className="relative h-[300px] overflow-hidden">
          <div className="absolute inset-0 transition-opacity duration-300 group-hover:opacity-0">
            <MysteriousPlaceholder hue={currentColor?.hue ?? 220} variant="default" />
          </div>
          <div className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <MysteriousPlaceholder hue={(currentColor?.hue ?? 220) + 12} variant="hover" />
          </div>

          <div className="absolute left-3 top-3 z-10">
            <Badge
              variant="outline"
              className="border-white/20 bg-background/50 text-[10px] uppercase tracking-wider backdrop-blur-md"
            >
              {item.status === 'coming-soon' ? 'Coming soon' : 'Available'}
            </Badge>
          </div>

          <div className="absolute bottom-0 left-0 right-0 z-10 translate-y-full opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
            <div className="border-t border-white/10 bg-background/75 p-4 backdrop-blur-xl">
              <div className="mb-3 flex items-start justify-between gap-2">
                <div className="min-w-0 text-left">
                  <h3 className="truncate text-lg font-semibold">{item.name}</h3>
                  <p className="text-sm font-medium text-primary">{item.priceLabel}</p>
                </div>
                <WishlistCheckInButton slug={item.slug} variant="icon" />
              </div>

              <div className="flex justify-center gap-2">
                {item.colors.map((color, colorIndex) => (
                  <button
                    key={color.id}
                    type="button"
                    title={color.name}
                    aria-label={`Color: ${color.name}`}
                    aria-pressed={colorIndex === selectedColorIndex}
                    onClick={(e) => {
                      e.stopPropagation()
                      setSelectedColorIndex(colorIndex)
                    }}
                    className={cn(
                      'h-7 w-7 rounded-full border-2 transition-transform duration-200 hover:scale-110',
                      colorIndex === selectedColorIndex
                        ? 'border-primary scale-110'
                        : 'border-white/20',
                    )}
                    style={{
                      background: `linear-gradient(135deg, hsl(${color.hue} 25% 22%), hsl(${color.hue + 20} 20% 12%))`,
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 p-4 text-center group-hover:opacity-60">
          <h3 className="text-base font-semibold">{item.name}</h3>
          <p className="mt-1 text-sm text-muted-foreground">{item.teaser}</p>
          <Link
            href={`/clothing/${item.slug}`}
            onClick={(e) => e.stopPropagation()}
            className="mt-2 inline-block text-xs text-primary hover:underline"
          >
            View details
          </Link>
        </div>
      </div>
    </motion.article>
  )
}
