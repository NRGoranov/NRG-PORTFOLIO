'use client'

import { FormEvent, useEffect, useState } from 'react'
import { Heart, Mail } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { getClothingItem } from '@/data/clothing'
import { CLOTHING_INTEREST_GOAL } from '@/lib/clothing/constants'
import { getSignedUpEmail, saveSignedUpEmail } from '@/lib/clothing-wishlist-client'

interface WishlistJoinDialogProps {
  slug: string
  open: boolean
  onOpenChange: (open: boolean) => void
  onJoined?: () => void
}

export function WishlistJoinDialog({ slug, open, onOpenChange, onJoined }: WishlistJoinDialogProps) {
  const item = getClothingItem(slug)
  const itemName = item?.name ?? 'Zip-Up'
  const isInterestGated = item?.status === 'interest-gated'
  const interestGoal = item?.interestGoal ?? CLOTHING_INTEREST_GOAL
  const dialogTitle = isInterestGated ? 'Signal interest' : 'Wishlist check-in'
  const dialogDescription = isInterestGated
    ? `Add your signal for ${itemName}. At ${interestGoal} signals we review whether to put it into production.`
    : `Leave your email for the ${itemName}. We will notify you when updates and the drop are ready.`
  const submitLabel = isInterestGated ? 'Send signal' : 'Join wishlist'
  const successHint = isInterestGated
    ? 'Your interest is logged. We will email you if this piece moves toward production.'
    : 'We will email you when the drop is ready.'

  const [email, setEmail] = useState('')
  const [signedUpEmail, setSignedUpEmail] = useState<string | null>(null)
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [feedback, setFeedback] = useState('')

  useEffect(() => {
    if (!open) return
    const saved = getSignedUpEmail(slug)
    setSignedUpEmail(saved)
    setEmail(saved ?? '')
    setStatus(saved ? 'success' : 'idle')
    setFeedback(saved ? `You are checked in as ${saved}. ${successHint}` : '')
  }, [open, slug, successHint])

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault()
    setStatus('loading')
    setFeedback('')

    try {
      const response = await fetch('/api/clothing/wishlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slug, email, website: '' }),
      })
      const result = (await response.json()) as { ok: boolean; message?: string }
      if (!response.ok || !result.ok) {
        throw new Error(result.message || 'Unable to join wishlist.')
      }

      const normalized = email.trim().toLowerCase()
      saveSignedUpEmail(slug, normalized)
      setSignedUpEmail(normalized)
      setStatus('success')
      setFeedback(result.message || 'You are on the wishlist.')
      onJoined?.()
    } catch (error) {
      setStatus('error')
      setFeedback(error instanceof Error ? error.message : 'Something went wrong.')
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="border-white/15 bg-background/95 backdrop-blur-xl sm:max-w-md"
        onClick={(e) => e.stopPropagation()}
      >
        <DialogHeader>
          <div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-full border border-primary/30 bg-primary/15 sm:mx-0">
            <Heart className="h-4 w-4 fill-primary text-primary" />
          </div>
          <DialogTitle>{dialogTitle}</DialogTitle>
          <DialogDescription>{dialogDescription}</DialogDescription>
        </DialogHeader>

        {status === 'success' && signedUpEmail ? (
          <div className="space-y-4">
            <p className="rounded-xl border border-primary/25 bg-primary/10 px-4 py-3 text-sm text-foreground">
              {feedback || `You are checked in as ${signedUpEmail}.`}
            </p>
            <Button
              type="button"
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
              onClick={() => onOpenChange(false)}
            >
              Done
            </Button>
          </div>
        ) : (
          <form onSubmit={onSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="wishlist-dialog-email">Email</Label>
              <Input
                id="wishlist-dialog-email"
                type="email"
                required
                autoFocus
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@email.com"
                className="border-white/15 bg-background/40"
              />
            </div>

            <input tabIndex={-1} autoComplete="off" className="hidden" name="website" readOnly />

            <Button
              type="submit"
              disabled={status === 'loading'}
              className="w-full gap-2 bg-primary text-primary-foreground hover:bg-primary/90"
            >
              <Mail className="h-4 w-4" />
              {status === 'loading' ? 'Submitting…' : submitLabel}
            </Button>

            {feedback && status === 'error' ? <p className="text-sm text-red-400">{feedback}</p> : null}
          </form>
        )}
      </DialogContent>
    </Dialog>
  )
}
