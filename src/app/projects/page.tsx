'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
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

  const handleClearFilters = () => {
    setSearchQuery('')
    setSelectedTags([])
    setSelectedYear(null)
    setSortBy('newest')
  }

  return (
    <div className="py-20">
      <div className="container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            All Projects
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Explore my complete portfolio of web development projects. 
            Filter by technology, year, or search for specific projects.
          </p>
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
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

        {/* Results Summary */}
        {filteredProjects.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="mt-12 text-center"
          >
            <p className="text-sm text-muted-foreground">
              Showing {filteredProjects.length} of {projects.length} projects
            </p>
          </motion.div>
        )}
      </div>
    </div>
  )
}



