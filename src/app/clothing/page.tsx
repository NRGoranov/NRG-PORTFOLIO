'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowLeft, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ClothingProductCard } from '@/components/clothing/ClothingProductCard'
import { VaultCollectionsSection } from '@/components/clothing/VaultCollectionsSection'
import { developmentClothingItems } from '@/data/clothing'

export default function ClothingPage() {
  return (
    <div className="min-h-screen">
      <section className="relative py-16 lg:py-24">
        <div className="container relative">
          <div className="glass-panel mx-auto max-w-4xl p-8 md:p-12 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-4"
            >
              <div className="flex justify-center">
                <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-background/40 px-3 py-1 text-xs uppercase tracking-wider text-muted-foreground backdrop-blur-sm">
                  <Sparkles className="h-3.5 w-3.5 text-primary" />
                  NRG Apparel
                </span>
              </div>
              <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
                Clothing{' '}
                <span className="bg-gradient-to-r from-primary via-primary/90 to-primary/70 bg-clip-text text-transparent">
                  Lab
                </span>
              </h1>
              <p className="mx-auto max-w-2xl text-muted-foreground">
                Pieces still under construction. No photos yet — only silhouettes and signals.
                Check in to the wishlist when something speaks to you.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="pb-8">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-10 text-center"
          >
            <h2 className="text-2xl font-semibold md:text-3xl">In Development</h2>
            <p className="mx-auto mt-3 max-w-xl text-sm text-muted-foreground md:text-base">
              Not in stock yet. Wishlist check-in is your price of entry — we will reach out when
              the drop is ready.
            </p>
          </motion.div>

          <div className="flex justify-center">
            <div className="grid grid-cols-1 place-items-center gap-8">
              {developmentClothingItems.map((item, index) => (
                <ClothingProductCard key={item.slug} item={item} index={index} />
              ))}
            </div>
          </div>
        </div>
      </section>

      <VaultCollectionsSection />

      <section className="pb-20">
        <div className="container">
          <div className="glass-panel mx-auto max-w-2xl p-6 text-center md:p-8">
            <p className="text-sm text-muted-foreground">
              The zip-up leads the lab. Everything in the vault needs your signal — no drops without
              demand.
            </p>
            <Button asChild variant="outline" className="mt-4 border-white/15 bg-background/30">
              <Link href="/">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to home
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
