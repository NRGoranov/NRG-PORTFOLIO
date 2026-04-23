'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Search, Filter, X } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { SearchInput } from '@/components/SearchInput'
import { FilterBar } from '@/components/FilterBar'
import { ProjectGallery } from '@/components/ProjectGallery'
import { projects } from '@/data/projects'
import { getAllTags, getAllYears } from '@/lib/search'
import { Project } from '@/types/project'

export default function ProjectsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [selectedYear, setSelectedYear] = useState<number | null>(null)
  const [sortBy, setSortBy] = useState('newest')
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([])

  const allTags = getAllTags(projects)
  const allYears = getAllYears(projects)

  useEffect(() => {
    setFilteredProjects(projects)
  }, [])

  const handleClearFilters = () => {
    setSearchQuery('')
    setSelectedTags([])
    setSelectedYear(null)
    setSortBy('newest')
  }

  const hasActiveFilters = searchQuery || selectedTags.length > 0 || selectedYear || sortBy !== 'newest'

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 bg-gradient-to-b from-background via-background/95 to-background">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)]"></div>
        
        <div className="container relative">
          <div className="max-w-4xl mx-auto text-center">
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

      {/* Search and Filters */}
      <section className="py-12 border-b">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
              <div className="flex-1 max-w-md">
                <SearchInput
                  onSearch={setSearchQuery}
                  placeholder="Search projects..."
                  className="w-full"
                />
              </div>
              
              <div className="flex items-center gap-4">
                <FilterBar
                  tags={allTags}
                  years={allYears}
                  selectedTags={selectedTags}
                  selectedYear={selectedYear}
                  sortBy={sortBy}
                  onTagsChange={setSelectedTags}
                  onYearChange={setSelectedYear}
                  onSortChange={setSortBy}
                  onClear={handleClearFilters}
                />
                
                {hasActiveFilters && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleClearFilters}
                    className="flex items-center gap-2"
                  >
                    <X className="h-4 w-4" />
                    Clear
                  </Button>
                )}
              </div>
            </div>

            {/* Active Filters Display */}
            {hasActiveFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="flex flex-wrap gap-2"
              >
                {searchQuery && (
                  <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
                    Search: "{searchQuery}"
                  </span>
                )}
                {selectedTags.map((tag) => (
                  <span key={tag} className="px-3 py-1 bg-secondary text-secondary-foreground rounded-full text-sm">
                    {tag}
                  </span>
                ))}
                {selectedYear && (
                  <span className="px-3 py-1 bg-secondary text-secondary-foreground rounded-full text-sm">
                    {selectedYear}
                  </span>
                )}
                {sortBy !== 'newest' && (
                  <span className="px-3 py-1 bg-secondary text-secondary-foreground rounded-full text-sm">
                    Sort: {sortBy}
                  </span>
                )}
              </motion.div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-12">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <ProjectGallery
              projects={projects}
              searchQuery={searchQuery}
              selectedTags={selectedTags}
              selectedYear={selectedYear}
              sortBy={sortBy}
              onProjectsChange={setFilteredProjects}
              className="max-w-7xl mx-auto"
            />
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-muted/30">
        <div className="container">
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
      </section>
    </div>
  )
}