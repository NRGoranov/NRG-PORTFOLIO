'use client'

import { useState, useMemo } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, Search, X } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { SearchInput } from '@/components/SearchInput'
import { ProjectGallery } from '@/components/ProjectGallery'
import { projects } from '@/data/projects'

export default function ProjectsPage() {
  const [searchInputValue, setSearchInputValue] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const emptyTags = useMemo(() => [] as string[], [])

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-28 pb-0 lg:pt-36 lg:pb-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
        
        <div className="container relative">
          <div className="glass-panel max-w-4xl mx-auto p-8 md:p-12 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight">
                My
                <span className="block bg-gradient-to-r from-primary via-primary/90 to-primary/70 bg-clip-text text-transparent">
                  Portfolio
                </span>
              </h1>
              
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                A comprehensive collection of web development projects showcasing modern technologies, 
                innovative solutions, and exceptional user experiences.
              </p>

              <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
                <span>{projects.length} Projects</span>
                <span>•</span>
                <span>Multiple Technologies</span>
                <span>•</span>
                <span>Production Ready</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Expandable Search */}
      <section className="py-0">
        <div className="container">
          <div className="mt-8 mb-8 flex justify-center lg:mt-12 lg:mb-12">
            <motion.div
              layout
              transition={{ type: 'spring', stiffness: 240, damping: 24 }}
              className="flex items-center gap-3 rounded-full border border-white/10 bg-background/35 px-3 py-3 shadow-2xl backdrop-blur-xl"
            >
              <Button
                type="button"
                size="icon"
                variant="ghost"
                onClick={() => setIsSearchOpen((prev) => !prev)}
                className="relative h-12 w-12 rounded-full"
              >
                <Search className="h-5 w-5" />
                {!isSearchOpen && (
                  <span className="pointer-events-none absolute inset-0 rounded-full border border-primary/40 animate-ping" />
                )}
                <span className="sr-only">Toggle project search</span>
              </Button>

              <AnimatePresence initial={false}>
                {isSearchOpen && (
                  <motion.div
                    key="expanded-search"
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ width: 'min(48rem, calc(100vw - 9rem))', opacity: 1 }}
                    exit={{ width: 0, opacity: 0 }}
                    transition={{ duration: 0.35, ease: 'easeInOut' }}
                    className="overflow-hidden"
                  >
                    <SearchInput
                      onSearch={setSearchQuery}
                      value={searchInputValue}
                      onValueChange={setSearchInputValue}
                      placeholder="Search projects, tags, tech..."
                      className="w-full"
                    />
                  </motion.div>
                )}
              </AnimatePresence>

              <AnimatePresence>
                {isSearchOpen && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                  >
                    <Button
                      type="button"
                      size="icon"
                      variant="ghost"
                      onClick={() => {
                        setIsSearchOpen(false)
                        setSearchInputValue('')
                        setSearchQuery('')
                      }}
                      className="h-12 w-12 rounded-full"
                    >
                      <X className="h-5 w-5" />
                      <span className="sr-only">Close search</span>
                    </Button>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="pt-0 pb-12">
        <div className="container">
          <div className="glass-panel p-6 md:p-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <ProjectGallery
              projects={projects}
              searchQuery={searchQuery}
              selectedTags={emptyTags}
              selectedYear={null}
              sortBy="newest"
              className="max-w-7xl mx-auto"
            />
          </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container">
          <div className="glass-panel p-8 md:p-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Interested in Working Together?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              I'm always excited to take on new challenges and create exceptional digital experiences.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="text-base">
                <Link href="/contact">
                  Get In Touch
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-base">
                <Link href="/">
                  Back to Home
                </Link>
              </Button>
            </div>
          </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}