'use client'

import { useCallback, useEffect, useState } from 'react'
import { CLOTHING_INTEREST_GOAL } from '@/lib/clothing/constants'
import { cn } from '@/lib/utils'

interface InterestCounterProps {
  slug: string
  goal?: number
  className?: string
  compact?: boolean
}

export function InterestCounter({
  slug,
  goal = CLOTHING_INTEREST_GOAL,
  className,
  compact = false,
}: InterestCounterProps) {
  const [count, setCount] = useState(0)
  const [loading, setLoading] = useState(true)

  const loadCount = useCallback(async () => {
    try {
      const response = await fetch(`/api/clothing/wishlist?slug=${encodeURIComponent(slug)}`, {
        cache: 'no-store',
      })
      const result = (await response.json()) as { ok?: boolean; count?: number }
      if (result.ok && typeof result.count === 'number') {
        setCount(result.count)
      }
    } catch {
      // Keep last known count on transient errors.
    } finally {
      setLoading(false)
    }
  }, [slug])

  useEffect(() => {
    void loadCount()
    const refresh = () => void loadCount()
    window.addEventListener('clothing-wishlist-change', refresh)
    return () => window.removeEventListener('clothing-wishlist-change', refresh)
  }, [loadCount])

  const progress = Math.min(100, goal > 0 ? (count / goal) * 100 : 0)
  const thresholdMet = count >= goal

  return (
    <div className={cn('space-y-2', className)}>
      <div className="flex items-center justify-between gap-2 text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
        <span>{thresholdMet ? 'Threshold met' : 'Interest signals'}</span>
        <span className="font-mono text-foreground/90">
          {loading ? '—' : count}/{goal}
        </span>
      </div>
      <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
        <div
          className={cn(
            'h-full rounded-full transition-all duration-500',
            thresholdMet ? 'bg-primary shadow-[0_0_12px_hsl(var(--primary)/0.45)]' : 'bg-primary/80',
          )}
          style={{ width: `${progress}%` }}
        />
      </div>
      {!compact ? (
        <p className="text-[11px] leading-relaxed text-muted-foreground">
          {thresholdMet
            ? 'Enough signals received — this piece enters production review.'
            : `${goal - count} more signal${goal - count === 1 ? '' : 's'} and we consider making it real.`}
        </p>
      ) : null}
    </div>
  )
}
