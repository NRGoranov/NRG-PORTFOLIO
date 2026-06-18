'use client'

import { motion } from 'framer-motion'
import { Lock } from 'lucide-react'
import { clothingCandidates, clothingCollections } from '@/data/clothing-candidates'
import { InterestClothingCard } from '@/components/clothing/InterestClothingCard'

export function VaultCollectionsSection() {
  return (
    <section className="border-t border-white/10 py-16 lg:py-24">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mx-auto mb-12 max-w-3xl text-center"
        >
          <div className="mb-4 flex justify-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-background/40 px-3 py-1 text-xs uppercase tracking-wider text-muted-foreground backdrop-blur-sm">
              <Lock className="h-3.5 w-3.5 text-primary" />
              Archive
            </span>
          </div>
          <h2 className="text-2xl font-semibold md:text-3xl">
            Pieces waiting in the{' '}
            <span className="bg-gradient-to-r from-primary via-primary/90 to-primary/70 bg-clip-text text-transparent">
              vault
            </span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm text-muted-foreground md:text-base">
            Recovered from the original NRG apparel study. Preview the archive, pick your colorway,
            and signal interest — if a piece hits{' '}
            <span className="font-mono text-foreground/80">100</span> signals, we decide whether it
            leaves the lab.
          </p>
        </motion.div>

        <div className="space-y-16">
          {clothingCollections.map((collection, collectionIndex) => {
            const items = clothingCandidates.filter((item) => item.collection === collection.id)
            if (items.length === 0) return null

            return (
              <motion.div
                key={collection.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: collectionIndex * 0.05 }}
              >
                <div className="mb-8 text-center md:text-left">
                  <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-primary/80">
                    Collection {String(collectionIndex + 1).padStart(2, '0')}
                  </p>
                  <h3 className="mt-2 text-xl font-semibold md:text-2xl">{collection.title}</h3>
                  <p className="mt-2 max-w-xl text-sm text-muted-foreground">{collection.subtitle}</p>
                </div>

                <div className="grid grid-cols-1 place-items-center gap-8 sm:grid-cols-2 xl:grid-cols-4">
                  {items.map((item, index) => (
                    <InterestClothingCard key={item.slug} item={item} index={index} />
                  ))}
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
