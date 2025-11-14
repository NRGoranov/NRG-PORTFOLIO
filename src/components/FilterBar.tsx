'use client'

import { useState } from 'react'
import { Filter, X } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

interface FilterBarProps {
  tags: string[]
  years: number[]
  selectedTags: string[]
  selectedYear: number | null
  sortBy: string
  onTagsChange: (tags: string[]) => void
  onYearChange: (year: number | null) => void
  onSortChange: (sort: string) => void
  onClear: () => void
  className?: string
}

export function FilterBar({
  tags,
  years,
  selectedTags,
  selectedYear,
  sortBy,
  onTagsChange,
  onYearChange,
  onSortChange,
  onClear,
  className
}: FilterBarProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  const handleTagToggle = (tag: string) => {
    if (selectedTags.includes(tag)) {
      onTagsChange(selectedTags.filter(t => t !== tag))
    } else {
      onTagsChange([...selectedTags, tag])
    }
  }

  const hasActiveFilters = selectedTags.length > 0 || selectedYear !== null

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Filter Toggle */}
      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center gap-2"
        >
          <Filter className="h-4 w-4" />
          Filters
          {hasActiveFilters && (
            <Badge variant="secondary" className="ml-2">
              {selectedTags.length + (selectedYear ? 1 : 0)}
            </Badge>
          )}
        </Button>

        {hasActiveFilters && (
          <Button variant="ghost" size="sm" onClick={onClear}>
            <X className="h-4 w-4 mr-2" />
            Clear All
          </Button>
        )}
      </div>

      {/* Expanded Filters */}
      {isExpanded && (
        <div className="space-y-4 p-4 border rounded-lg bg-muted/30">
          {/* Tags Filter */}
          <div>
            <h4 className="text-sm font-medium mb-2">Technologies & Tags</h4>
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <Badge
                  key={tag}
                  variant={selectedTags.includes(tag) ? "default" : "outline"}
                  className="cursor-pointer hover:bg-primary/10 transition-colors"
                  onClick={() => handleTagToggle(tag)}
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </div>

          {/* Year Filter */}
          <div>
            <h4 className="text-sm font-medium mb-2">Year</h4>
            <Select
              value={selectedYear?.toString() || ""}
              onValueChange={(value) => onYearChange(value ? parseInt(value) : null)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="All years" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All years</SelectItem>
                {years.map((year) => (
                  <SelectItem key={year} value={year.toString()}>
                    {year}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Sort Filter */}
          <div>
            <h4 className="text-sm font-medium mb-2">Sort by</h4>
            <Select value={sortBy} onValueChange={onSortChange}>
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest First</SelectItem>
                <SelectItem value="oldest">Oldest First</SelectItem>
                <SelectItem value="alphabetical">A-Z</SelectItem>
                <SelectItem value="stars">Most Stars</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      )}

      {/* Active Filters Display */}
      {hasActiveFilters && (
        <div className="flex flex-wrap gap-2">
          {selectedTags.map((tag) => (
            <Badge
              key={tag}
              variant="secondary"
              className="cursor-pointer hover:bg-destructive hover:text-destructive-foreground transition-colors"
              onClick={() => handleTagToggle(tag)}
            >
              {tag}
              <X className="h-3 w-3 ml-1" />
            </Badge>
          ))}
          {selectedYear && (
            <Badge
              variant="secondary"
              className="cursor-pointer hover:bg-destructive hover:text-destructive-foreground transition-colors"
              onClick={() => onYearChange(null)}
            >
              {selectedYear}
              <X className="h-3 w-3 ml-1" />
            </Badge>
          )}
        </div>
      )}
    </div>
  )
}















