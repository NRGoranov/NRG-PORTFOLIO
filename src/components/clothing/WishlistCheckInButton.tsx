'use client'

import { useCallback, useEffect, useState } from 'react'
import { Heart } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { getSignedUpEmail, isSignedUp } from '@/lib/clothing-wishlist-client'
import { WishlistJoinDialog } from '@/components/clothing/WishlistJoinDialog'

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
  const [open, setOpen] = useState(false)

  const sync = useCallback(() => {
    const signedUp = isSignedUp(slug)
    setCheckedIn(signedUp)
    onToggle?.(signedUp)
  }, [slug, onToggle])

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

  useEffect(() => {
    const signedEmail = getSignedUpEmail(slug)
    if (!signedEmail) return

    fetch(`/api/clothing/wishlist?slug=${encodeURIComponent(slug)}&email=${encodeURIComponent(signedEmail)}`)
      .then((res) => res.json())
      .then((result: { ok?: boolean; onList?: boolean }) => {
        if (result.ok && result.onList) {
          setCheckedIn(true)
          onToggle?.(true)
        }
      })
      .catch(() => {})
  }, [slug, onToggle])

  const handleOpen = (e: React.MouseEvent) => {
    e.stopPropagation()
    e.preventDefault()
    setOpen(true)
  }

  return (
    <>
      {variant === 'icon' ? (
        <button
          type="button"
          onClick={handleOpen}
          className={cn(
            'flex h-9 w-9 items-center justify-center rounded-full border backdrop-blur-md transition-all duration-200 hover:scale-105',
            checkedIn
              ? 'border-primary bg-primary text-primary-foreground shadow-md shadow-primary/25 hover:bg-primary/90'
              : 'border-white/15 bg-background/60 text-muted-foreground hover:bg-background/80 hover:text-foreground',
            className,
          )}
          aria-label={checkedIn ? 'View wishlist — checked in' : 'Join wishlist'}
          aria-pressed={checkedIn}
        >
          <Heart className={cn('h-4 w-4', checkedIn ? 'fill-current' : '')} />
        </button>
      ) : (
        <Button
          type="button"
          size="sm"
          variant={checkedIn ? 'default' : 'outline'}
          onClick={handleOpen}
          className={cn(
            'gap-2 backdrop-blur-sm',
            checkedIn
              ? 'border-primary bg-primary text-primary-foreground shadow-md shadow-primary/20 hover:bg-primary/90'
              : 'border-white/15 bg-background/40 text-foreground hover:bg-background/60',
            className,
          )}
          aria-pressed={checkedIn}
        >
          <Heart className={cn('h-4 w-4', checkedIn && 'fill-current')} />
          {checkedIn ? 'Checked in' : 'Wishlist check-in'}
        </Button>
      )}

      <WishlistJoinDialog
        slug={slug}
        open={open}
        onOpenChange={setOpen}
        onJoined={() => {
          setCheckedIn(true)
          onToggle?.(true)
          sync()
        }}
      />
    </>
  )
}
