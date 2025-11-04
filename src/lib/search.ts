import Fuse from 'fuse.js'
import { Project } from '@/types/project'

const fuseOptions = {
  keys: [
    { name: 'title', weight: 0.3 },
    { name: 'shortDescription', weight: 0.2 },
    { name: 'tags', weight: 0.3 },
    { name: 'stack', weight: 0.2 },
  ],
  threshold: 0.3,
  includeScore: true,
}

export function createSearchIndex(projects: Project[]) {
  return new Fuse(projects, fuseOptions)
}

export function searchProjects(
  projects: Project[],
  query: string,
  limit?: number
): Project[] {
  if (!query.trim()) return projects

  const fuse = createSearchIndex(projects)
  const results = fuse.search(query)
  
  const searchResults = results.map(result => result.item)
  
  return limit ? searchResults.slice(0, limit) : searchResults
}

export function filterProjects(
  projects: Project[],
  filters: {
    tags?: string[]
    year?: number
    featured?: boolean
  }
): Project[] {
  return projects.filter(project => {
    if (filters.tags && filters.tags.length > 0) {
      const hasMatchingTag = filters.tags.some(tag => 
        project.tags.some(projectTag => 
          projectTag.toLowerCase().includes(tag.toLowerCase())
        )
      )
      if (!hasMatchingTag) return false
    }

    if (filters.year && project.year !== filters.year) {
      return false
    }

    if (filters.featured !== undefined && project.featured !== filters.featured) {
      return false
    }

    return true
  })
}

export function sortProjects(
  projects: Project[],
  sortBy: 'newest' | 'oldest' | 'alphabetical' | 'stars'
): Project[] {
  const sorted = [...projects]

  switch (sortBy) {
    case 'newest':
      return sorted.sort((a, b) => b.year - a.year)
    case 'oldest':
      return sorted.sort((a, b) => a.year - b.year)
    case 'alphabetical':
      return sorted.sort((a, b) => a.title.localeCompare(b.title))
    case 'stars':
      return sorted.sort((a, b) => (b.metrics?.stars || 0) - (a.metrics?.stars || 0))
    default:
      return sorted
  }
}

export function getAllTags(projects: Project[]): string[] {
  const tagSet = new Set<string>()
  projects.forEach(project => {
    project.tags.forEach(tag => tagSet.add(tag))
  })
  return Array.from(tagSet).sort()
}

export function getAllYears(projects: Project[]): number[] {
  const yearSet = new Set<number>()
  projects.forEach(project => {
    yearSet.add(project.year)
  })
  return Array.from(yearSet).sort((a, b) => b - a)
}












