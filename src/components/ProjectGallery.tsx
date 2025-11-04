'use client'

import { useState, useEffect } from 'react'
import { Project } from '@/types/project'
import { ProjectCard } from './ProjectCard'

interface ProjectGalleryProps {
  projects: Project[]
  searchQuery: string
  selectedTags: string[]
  selectedYear: number | null
  sortBy: string
  onProjectsChange: (projects: Project[]) => void
  className?: string
}

export function ProjectGallery({
  projects,
  searchQuery,
  selectedTags,
  selectedYear,
  sortBy,
  onProjectsChange,
  className
}: ProjectGalleryProps) {
  const [filteredProjects, setFilteredProjects] = useState<Project[]>(projects)

  useEffect(() => {
    let filtered = [...projects]

    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(project =>
        project.title.toLowerCase().includes(query) ||
        project.shortDescription.toLowerCase().includes(query) ||
        project.tags.some(tag => tag.toLowerCase().includes(query)) ||
        project.stack.some(tech => tech.toLowerCase().includes(query))
      )
    }

    // Apply tag filter
    if (selectedTags.length > 0) {
      filtered = filtered.filter(project =>
        selectedTags.some(selectedTag =>
          project.tags.some(tag => tag.toLowerCase().includes(selectedTag.toLowerCase()))
        )
      )
    }

    // Apply year filter
    if (selectedYear !== null) {
      filtered = filtered.filter(project => project.year === selectedYear)
    }

    // Apply sorting
    switch (sortBy) {
      case 'newest':
        filtered.sort((a, b) => b.year - a.year)
        break
      case 'oldest':
        filtered.sort((a, b) => a.year - b.year)
        break
      case 'alphabetical':
        filtered.sort((a, b) => a.title.localeCompare(b.title))
        break
      case 'stars':
        filtered.sort((a, b) => (b.metrics?.stars || 0) - (a.metrics?.stars || 0))
        break
    }

    setFilteredProjects(filtered)
    onProjectsChange(filtered)
  }, [projects, searchQuery, selectedTags, selectedYear, sortBy, onProjectsChange])

  if (filteredProjects.length === 0) {
    return (
      <div className={`text-center py-12 ${className}`}>
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-muted-foreground">
            No projects found
          </h3>
          <p className="text-sm text-muted-foreground">
            Try adjusting your search or filters to find what you're looking for.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ${className}`}>
      {filteredProjects.map((project, index) => (
        <ProjectCard
          key={project.slug}
          project={project}
          index={index}
        />
      ))}
    </div>
  )
}












