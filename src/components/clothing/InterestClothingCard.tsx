'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import type { ClothingItem } from '@/types/clothing'
import { InterestCounter } from '@/components/clothing/InterestCounter'
import { ClothingColorMedia } from '@/components/clothing/ClothingColorMedia'
import { WishlistCheckInButton } from '@/components/clothing/WishlistCheckInButton'

interface InterestClothingCardProps {
  item: ClothingItem
  index?: number
}

export function InterestClothingCard({ item, index = 0 }: InterestClothingCardProps) {
  const router = useRouter()
  const [selectedColorIndex, setSelectedColorIndex] = useState(0)
  const currentColor = item.colors[selectedColorIndex] ?? item.colors[0]
  const goal = item.interestGoal ?? 100

  const handleOpen = () => {
    router.push(`/clothing/${item.slug}`)
  }

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
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
          <ClothingColorMedia
            color={currentColor}
            alt={`${item.name} — ${currentColor.name}`}
            placeholderLabel={item.codename ?? 'ARCHIVED'}
          />

          <div className="absolute left-3 top-3 z-10 flex flex-col gap-1.5">
            <Badge
              variant="outline"
              className="border-white/20 bg-background/50 text-[10px] uppercase tracking-wider backdrop-blur-md"
            >
              Vault piece
            </Badge>
            {item.codename ? (
              <span className="rounded-full border border-white/10 bg-black/40 px-2 py-0.5 font-mono text-[9px] tracking-widest text-muted-foreground backdrop-blur-md">
                {item.codename}
              </span>
            ) : null}
          </div>

          <div className="absolute bottom-0 left-0 right-0 z-10 translate-y-full opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
            <div className="border-t border-white/10 bg-background/80 p-4 backdrop-blur-xl">
              <InterestCounter slug={item.slug} goal={goal} compact />
              <div className="mt-3 flex items-center justify-between gap-2">
                <p className="text-xs text-muted-foreground">Signal interest to unlock production</p>
                <WishlistCheckInButton slug={item.slug} variant="icon" />
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-3 border-t border-white/10 p-4">
          <div className="text-center group-hover:opacity-80">
            <h3 className="text-base font-semibold">{item.name}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{item.teaser}</p>
          </div>

          <InterestCounter slug={item.slug} goal={goal} compact />

          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex gap-1.5">
              {item.colors.slice(0, 4).map((color, colorIndex) => (
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
                    'h-6 w-6 rounded-full border-2 transition-transform duration-200 hover:scale-110',
                    colorIndex === selectedColorIndex ? 'border-primary scale-110' : 'border-white/20',
                  )}
                  style={{
                    background: `linear-gradient(135deg, hsl(${color.hue} 25% 22%), hsl(${color.hue + 20} 20% 12%))`,
                  }}
                />
              ))}
              {item.colors.length > 4 ? (
                <span className="self-center text-[10px] text-muted-foreground">
                  +{item.colors.length - 4}
                </span>
              ) : null}
            </div>
            <Link
              href={`/clothing/${item.slug}`}
              onClick={(e) => e.stopPropagation()}
              className="text-xs text-primary hover:underline"
            >
              View dossier
            </Link>
          </div>
        </div>
      </div>
    </motion.article>
  )
}
