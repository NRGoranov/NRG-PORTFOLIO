'use client'

import { useCallback, useEffect, useState } from 'react'
import { Heart } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { isInWishlist, toggleWishlistCheckIn } from '@/lib/clothing-wishlist'

interface WishlistCheckInButtonProps {
  slug: string
  variant?: 'icon' | 'button'
  className?: string
  onToggle?: (checkedIn: boolean) => void
}

export function WishlistCheckInButton({
  slug,
  variant = 'button',
  className,
  onToggle,
}: WishlistCheckInButtonProps) {
  const [checkedIn, setCheckedIn] = useState(false)

  const sync = useCallback(() => {
    setCheckedIn(isInWishlist(slug))
  }, [slug])

  useEffect(() => {
    sync()
    const handler = () => sync()
    window.addEventListener('clothing-wishlist-change', handler)
    window.addEventListener('storage', handler)
    return () => {
      window.removeEventListener('clothing-wishlist-change', handler)
      window.removeEventListener('storage', handler)
    }
  }, [sync])

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    e.preventDefault()
    const next = toggleWishlistCheckIn(slug)
    setCheckedIn(next)
    onToggle?.(next)
  }

  if (variant === 'icon') {
    return (
      <button
        type="button"
        onClick={handleClick}
        className={cn(
          'flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-background/60 backdrop-blur-md transition-all duration-200 hover:scale-105 hover:bg-background/80',
          checkedIn && 'border-primary/40 bg-primary/15',
          className,
        )}
        aria-label={checkedIn ? 'Remove wishlist check-in' : 'Wishlist check-in'}
        aria-pressed={checkedIn}
      >
        <Heart
          className={cn(
            'h-4 w-4 transition-colors',
            checkedIn ? 'fill-primary text-primary' : 'text-muted-foreground',
          )}
        />
      </button>
    )
  }

  return (
    <Button
      type="button"
      variant={checkedIn ? 'default' : 'outline'}
      size="sm"
      onClick={handleClick}
      className={cn(
        'gap-2 border-white/15 bg-background/40 backdrop-blur-sm',
        checkedIn && 'border-primary/30',
        className,
      )}
      aria-pressed={checkedIn}
    >
      <Heart className={cn('h-4 w-4', checkedIn && 'fill-current')} />
      {checkedIn ? 'Checked in' : 'Wishlist check-in'}
    </Button>
  )
}
