'use client'

import { FormEvent, useCallback, useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { ArrowLeft, Lock, Users } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { clothingItems, getClothingItem } from '@/data/clothing'
import { isWishlistAdminUnlocked, setWishlistAdminUnlocked } from '@/lib/clothing-wishlist-client'

type WishlistEntryRow = {
  id: string
  email: string
  name: string | null
  createdAt: string
}

export default function ClothingWishlistAdminPage() {
  const searchParams = useSearchParams()
  const itemSlug = searchParams.get('item') || clothingItems[0]?.slug || 'zip-up'
  const item = getClothingItem(itemSlug) ?? clothingItems[0]

  const [count, setCount] = useState(0)
  const [entries, setEntries] = useState<WishlistEntryRow[]>([])
  const [adminUnlocked, setAdminUnlocked] = useState(false)
  const [adminPassword, setAdminPassword] = useState('')
  const [adminError, setAdminError] = useState('')

  const loadAdminList = useCallback(
    async (password: string) => {
      if (!item) return false
      const response = await fetch(`/api/clothing/wishlist?slug=${encodeURIComponent(item.slug)}`, {
        headers: { 'x-clothing-admin': password },
      })
      const result = (await response.json()) as {
        ok: boolean
        entries?: WishlistEntryRow[]
        message?: string
      }
      if (!response.ok || !result.ok || !result.entries) {
        setAdminError(result.message || 'Unable to load subscriber list.')
        return false
      }
      setEntries(result.entries)
      setCount(result.entries.length)
      setAdminUnlocked(true)
      setWishlistAdminUnlocked(true)
      setAdminError('')
      return true
    },
    [item],
  )

  useEffect(() => {
    setAdminUnlocked(isWishlistAdminUnlocked())
  }, [])

  useEffect(() => {
    if (!adminUnlocked || !item) return
    const storedPassword = sessionStorage.getItem('nrg-clothing-admin-pass')
    if (storedPassword) {
      void loadAdminList(storedPassword)
    }
  }, [adminUnlocked, item, loadAdminList])

  const onUnlockAdmin = async (event: FormEvent) => {
    event.preventDefault()
    const ok = await loadAdminList(adminPassword)
    if (ok) {
      sessionStorage.setItem('nrg-clothing-admin-pass', adminPassword)
    }
  }

  const itemTitle = useMemo(() => item?.name ?? 'Zip-Up', [item])

  if (!item) {
    return null
  }

  return (
    <div className="min-h-screen py-12 lg:py-20">
      <div className="container max-w-3xl">
        <Button asChild variant="ghost" size="sm" className="mb-8 text-muted-foreground hover:text-foreground">
          <Link href={`/clothing/${item.slug}`}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to {itemTitle}
          </Link>
        </Button>

        <div className="glass-panel overflow-hidden p-8 md:p-10">
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <div>
              <h1 className="text-2xl font-bold md:text-3xl">Wishlist subscribers</h1>
              <p className="mt-2 text-muted-foreground">
                Admin view for {itemTitle} drop notifications.
              </p>
              <p className="mt-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-background/40 px-3 py-1 text-sm text-muted-foreground">
                <Users className="h-4 w-4 text-primary" />
                {count} {count === 1 ? 'person' : 'people'} on the list
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-background/20 p-5">
              <div className="mb-4 flex items-center gap-2">
                <Lock className="h-4 w-4 text-primary" />
                <h2 className="text-lg font-semibold">Subscriber list</h2>
              </div>

              {!adminUnlocked ? (
                <form onSubmit={onUnlockAdmin} className="flex flex-col gap-3 sm:flex-row">
                  <Input
                    type="password"
                    value={adminPassword}
                    onChange={(e) => setAdminPassword(e.target.value)}
                    placeholder="Admin password"
                    className="border-white/15 bg-background/40"
                  />
                  <Button type="submit" variant="outline" className="border-white/15 bg-background/30">
                    View emails
                  </Button>
                </form>
              ) : (
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="mb-4 text-muted-foreground"
                  onClick={() => {
                    setWishlistAdminUnlocked(false)
                    setAdminUnlocked(false)
                    setEntries([])
                    sessionStorage.removeItem('nrg-clothing-admin-pass')
                  }}
                >
                  Lock list
                </Button>
              )}

              {adminError ? <p className="mt-3 text-sm text-red-400">{adminError}</p> : null}

              {adminUnlocked ? (
                entries.length === 0 ? (
                  <p className="text-sm text-muted-foreground">No emails yet.</p>
                ) : (
                  <ul className="max-h-[28rem] space-y-2 overflow-y-auto pr-1">
                    {entries.map((entry) => (
                      <li
                        key={entry.id}
                        className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-white/10 bg-background/30 px-4 py-3 text-sm"
                      >
                        <div>
                          <p className="font-medium text-foreground">{entry.email}</p>
                          {entry.name ? <p className="text-muted-foreground">{entry.name}</p> : null}
                        </div>
                        <time className="text-xs text-muted-foreground">
                          {new Date(entry.createdAt).toLocaleString()}
                        </time>
                      </li>
                    ))}
                  </ul>
                )
              ) : (
                <p className="text-sm text-muted-foreground">
                  Enter the admin password to view emails for drop notifications.
                </p>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
