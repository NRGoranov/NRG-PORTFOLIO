'use client'

import { FormEvent, useEffect, useState } from 'react'
import Link from 'next/link'
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
import { clearSignedUpEmail, getSignedUpEmail, saveSignedUpEmail } from '@/lib/clothing-wishlist-client'
import { WISHLIST_CONSENT_TEXT } from '@/lib/legal'

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
  const [consent, setConsent] = useState(false)
  const [signedUpEmail, setSignedUpEmail] = useState<string | null>(null)
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [feedback, setFeedback] = useState('')

  useEffect(() => {
    if (!open) return
    const saved = getSignedUpEmail(slug)
    setSignedUpEmail(saved)
    setEmail(saved ?? '')
    setConsent(false)
    setStatus(saved ? 'success' : 'idle')
    setFeedback(saved ? `You are checked in as ${saved}. ${successHint}` : '')
  }, [open, slug, successHint])

  const withdraw = async () => {
    if (!signedUpEmail) return
    setStatus('loading')
    setFeedback('')
    try {
      const response = await fetch('/api/clothing/wishlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ intent: 'withdraw', slug, email: signedUpEmail }),
      })
      const result = (await response.json()) as { ok: boolean; message?: string }
      if (!response.ok || !result.ok) {
        throw new Error(result.message || 'Unable to remove that email.')
      }
      clearSignedUpEmail(slug)
      setSignedUpEmail(null)
      setEmail('')
      setConsent(false)
      setStatus('idle')
      setFeedback(result.message || 'If that email was on the list, it has been removed.')
    } catch (error) {
      setStatus('error')
      setFeedback(error instanceof Error ? error.message : 'Something went wrong.')
    }
  }

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault()
    if (!consent) {
      setStatus('error')
      setFeedback('Tick the box if you want email about this piece.')
      return
    }
    setStatus('loading')
    setFeedback('')

    try {
      const response = await fetch('/api/clothing/wishlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ intent: 'join', slug, email, consent: true, website: '' }),
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

        {signedUpEmail && status !== 'idle' ? (
          <div className="space-y-4">
            <p
              role={status === 'error' ? 'alert' : 'status'}
              className={`rounded-xl border px-4 py-3 text-sm ${
                status === 'error'
                  ? 'border-red-400/40 text-red-300'
                  : 'border-primary/25 bg-primary/10 text-foreground'
              }`}
            >
              {feedback || `You are checked in as ${signedUpEmail}.`}
            </p>
            <Button
              type="button"
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
              onClick={() => onOpenChange(false)}
            >
              Done
            </Button>
            <Button
              type="button"
              variant="outline"
              className="w-full border-white/15"
              disabled={status === 'loading'}
              onClick={() => void withdraw()}
            >
              Remove my email
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

            <label className="flex items-start gap-3 text-sm text-muted-foreground">
              <input
                type="checkbox"
                className="mt-1"
                checked={consent}
                onChange={(event) => setConsent(event.target.checked)}
                required
              />
              <span>
                {WISHLIST_CONSENT_TEXT}{" "}
                <Link href="/privacy" className="underline">
                  Privacy notice
                </Link>
                .
              </span>
            </label>

            <Button
              type="submit"
              disabled={status === 'loading' || !consent}
              className="w-full gap-2 bg-primary text-primary-foreground hover:bg-primary/90"
            >
              <Mail className="h-4 w-4" />
              {status === 'loading' ? 'Submitting…' : submitLabel}
            </Button>

            {feedback ? (
              <p role={status === 'error' ? 'alert' : 'status'} className={`text-sm ${status === 'error' ? 'text-red-400' : 'text-muted-foreground'}`}>
                {feedback}
              </p>
            ) : null}
          </form>
        )}
      </DialogContent>
    </Dialog>
  )
}
