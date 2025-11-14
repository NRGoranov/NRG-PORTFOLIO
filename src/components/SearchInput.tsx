'use client'

import { useState, useEffect } from 'react'
import { Search, X } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { debounce } from '@/lib/utils'

interface SearchInputProps {
  onSearch: (query: string) => void
  placeholder?: string
  className?: string
}

export function SearchInput({ 
  onSearch, 
  placeholder = "Search projects...", 
  className 
}: SearchInputProps) {
  const [query, setQuery] = useState('')

  const debouncedSearch = debounce((searchQuery: string) => {
    onSearch(searchQuery)
  }, 300)

  useEffect(() => {
    debouncedSearch(query)
  }, [query, debouncedSearch])

  const handleClear = () => {
    setQuery('')
    onSearch('')
  }

  return (
    <div className={`relative ${className}`}>
      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      <Input
        type="text"
        placeholder={placeholder}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="pl-10 pr-10"
      />
      {query && (
        <Button
          variant="ghost"
          size="icon"
          onClick={handleClear}
          className="absolute right-1 top-1/2 h-8 w-8 -translate-y-1/2 hover:bg-muted"
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Clear search</span>
        </Button>
      )}
    </div>
  )
}















