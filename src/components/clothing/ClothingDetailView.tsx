'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowLeft, EyeOff } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import type { ClothingItem } from '@/types/clothing'
import { MysteriousPlaceholder } from '@/components/clothing/MysteriousPlaceholder'
import { ClothingColorMedia, clothingItemHasImages } from '@/components/clothing/ClothingColorMedia'
import { InterestCounter } from '@/components/clothing/InterestCounter'
import { WishlistCheckInButton } from '@/components/clothing/WishlistCheckInButton'
import { cn } from '@/lib/utils'
import { clothingSwatchNeedsLightBorder, clothingSwatchStyle } from '@/lib/clothing/swatch-style'

interface ClothingDetailViewProps {
  item: ClothingItem
}

export function ClothingDetailView({ item }: ClothingDetailViewProps) {
  const [selectedColorIndex, setSelectedColorIndex] = useState(0)
  const [selectedSize, setSelectedSize] = useState<string | null>(null)
  const [checkedIn, setCheckedIn] = useState(false)

  const currentColor = item.colors[selectedColorIndex] ?? item.colors[0]
  const isInterestGated = item.status === 'interest-gated'
  const interestGoal = item.interestGoal ?? 100
  const hasImages = clothingItemHasImages(item.colors)

  return (
    <div className="min-h-screen py-12 lg:py-20">
      <div className="container">
        <Button
          asChild
          variant="ghost"
          size="sm"
          className="mb-8 text-muted-foreground hover:text-foreground"
        >
          <Link href="/clothing">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to clothing
          </Link>
        </Button>

        <div className="glass-panel overflow-hidden">
          <div className="grid gap-0 lg:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="relative min-h-[360px] lg:min-h-[520px]"
            >
              <div className="group relative h-full min-h-[360px] lg:min-h-[520px]">
                {hasImages ? (
                  <ClothingColorMedia
                    color={currentColor}
                    alt={`${item.name} — ${currentColor.name}`}
                    priority
                    placeholderLabel="PREVIEW LOCKED"
                  />
                ) : (
                  <>
                    <div className="absolute inset-0 transition-opacity duration-500 group-hover:opacity-0">
                      <MysteriousPlaceholder
                        hue={currentColor?.hue ?? 220}
                        label="PREVIEW LOCKED"
                      />
                    </div>
                    <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                      <MysteriousPlaceholder
                        hue={(currentColor?.hue ?? 220) + 12}
                        variant="hover"
                        label={isInterestGated ? 'SIGNAL?' : 'STILL CLASSIFIED'}
                      />
                    </div>
                  </>
                )}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="flex flex-col justify-center border-t border-white/10 p-8 md:p-10 lg:border-l lg:border-t-0"
            >
              <div className="mb-4 flex flex-wrap items-center gap-2">
                <Badge variant="outline" className="border-white/15 bg-background/40">
                  {isInterestGated
                    ? 'Vote to make'
                    : item.status === 'coming-soon'
                      ? 'Coming soon'
                      : 'Available'}
                </Badge>
                <Badge variant="secondary" className="gap-1 bg-secondary/50">
                  <EyeOff className="h-3 w-3" />
                  {hasImages ? 'Preview' : 'Photos pending'}
                </Badge>
              </div>

              <h1 className="text-3xl font-bold tracking-tight md:text-4xl">{item.name}</h1>
              <p className="mt-2 text-lg font-medium text-primary">{item.priceLabel}</p>
              <p className="mt-4 text-muted-foreground">{item.description}</p>

              <div className="mt-8 space-y-6">
                <div>
                  <p className="mb-3 text-sm font-medium">{hasImages ? 'Color' : 'Color — unrevealed'}</p>
                  <div className="flex flex-wrap gap-2">
                    {item.colors.map((color, index) => (
                      <button
                        key={color.id}
                        type="button"
                        aria-pressed={index === selectedColorIndex}
                        onClick={() => setSelectedColorIndex(index)}
                        className={cn(
                          'flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs transition-all',
                          index === selectedColorIndex
                            ? 'border-primary bg-primary/10 text-foreground'
                            : 'border-white/15 bg-background/30 text-muted-foreground hover:border-white/25',
                        )}
                      >
                        <span
                          className={cn(
                            'h-4 w-4 rounded-full border',
                            clothingSwatchNeedsLightBorder(color.name)
                              ? 'border-white/35'
                              : 'border-white/20',
                          )}
                          style={clothingSwatchStyle(color)}
                        />
                        {color.name}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="mb-3 text-sm font-medium">Size — tentative</p>
                  <div className="flex flex-wrap gap-2">
                    {item.sizes.map((size) => (
                      <button
                        key={size}
                        type="button"
                        aria-pressed={selectedSize === size}
                        onClick={() => setSelectedSize(size)}
                        className={cn(
                          'min-w-[3rem] rounded-xl border px-4 py-2 text-sm font-medium transition-all',
                          selectedSize === size
                            ? 'border-primary bg-primary/10'
                            : 'border-white/15 bg-background/30 text-muted-foreground hover:border-white/25 hover:text-foreground',
                        )}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="rounded-2xl border border-white/10 bg-background/25 p-4 backdrop-blur-sm">
                  {isInterestGated ? (
                    <InterestCounter slug={item.slug} goal={interestGoal} className="mb-4" />
                  ) : null}
                  <p className="text-sm text-muted-foreground">
                    {checkedIn
                      ? isInterestGated
                        ? 'Your signal is logged. We will notify you if this piece enters production.'
                        : 'You are checked in. We will notify you when this piece drops.'
                      : isInterestGated
                        ? `No price yet — signal interest. At ${interestGoal} signals we decide whether to manufacture.`
                        : 'No price yet — wishlist check-in reserves your spot in line.'}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-3">
                    <WishlistCheckInButton
                      slug={item.slug}
                      className="min-w-[160px]"
                      onToggle={setCheckedIn}
                    />
                    <Button asChild variant="outline" className="border-white/15 bg-background/30">
                      <Link href="/contact">Ask about the drop</Link>
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}
