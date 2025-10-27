'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Sparkles } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { SearchInput } from '@/components/SearchInput'
import { FilterBar } from '@/components/FilterBar'
import { ProjectGallery } from '@/components/ProjectGallery'
import { projects } from '@/data/projects'
import { getAllTags, getAllYears } from '@/lib/search'
import { Project } from '@/types/project'

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [selectedYear, setSelectedYear] = useState<number | null>(null)
  const [sortBy, setSortBy] = useState('newest')
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([])
  const [featuredProjects, setFeaturedProjects] = useState<Project[]>([])

  const allTags = getAllTags(projects)
  const allYears = getAllYears(projects)

  useEffect(() => {
    setFeaturedProjects(projects.filter(project => project.featured))
  }, [])

  const handleClearFilters = () => {
    setSearchQuery('')
    setSelectedTags([])
    setSelectedYear(null)
    setSortBy('newest')
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground mb-4">
                <Sparkles className="h-4 w-4" />
                <span>Building the web, one project at a time</span>
              </div>
              
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight">
                Modern Web
                <span className="block bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                  Development
                </span>
              </h1>
              
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                I build blazing-fast, accessible web experiences with Next.js, TypeScript, 
                and cutting-edge technologies. Each project is a step forward in web development.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="text-base">
                  <Link href="/projects">
                    Browse Projects
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="text-base">
                  <Link href="/about">
                    Learn More
                  </Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-20 bg-muted/30">
        <div className="container">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Featured Projects
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                A selection of my most impactful work, showcasing modern web development practices.
              </p>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {featuredProjects.map((project, index) => (
              <motion.div
                key={project.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -4 }}
                className="group"
              >
                <div className="relative overflow-hidden rounded-2xl border bg-card/50 backdrop-blur-sm transition-all duration-300 hover:shadow-xl hover:shadow-primary/5">
                  <div className="aspect-[4/3] relative overflow-hidden">
                    <img
                      src={project.coverImage}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="text-white font-semibold text-lg mb-1">
                        {project.title}
                      </h3>
                      <p className="text-white/90 text-sm line-clamp-2">
                        {project.shortDescription}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <div className="text-center mt-12">
            <Button asChild size="lg">
              <Link href="/projects">
                View All Projects
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* All Projects Preview */}
      <section className="py-20">
        <div className="container">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                All Projects
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Explore my complete portfolio of web development projects.
              </p>
            </motion.div>
          </div>

          {/* Search and Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="mb-12 space-y-6"
          >
            <SearchInput
              onSearch={setSearchQuery}
              placeholder="Search projects..."
              className="max-w-md mx-auto"
            />
            
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
              className="max-w-4xl mx-auto"
            />
          </motion.div>

          {/* Projects Grid */}
          <ProjectGallery
            projects={projects}
            searchQuery={searchQuery}
            selectedTags={selectedTags}
            selectedYear={selectedYear}
            sortBy={sortBy}
            onProjectsChange={setFilteredProjects}
            className="max-w-6xl mx-auto"
          />
        </div>
      </section>
    </div>
  )
}



