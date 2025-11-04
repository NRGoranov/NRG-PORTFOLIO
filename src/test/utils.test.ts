import { describe, it, expect } from 'vitest'
import { slugify, formatNumber, getInitials } from '@/lib/utils'

describe('Utils', () => {
  describe('slugify', () => {
    it('should convert text to slug', () => {
      expect(slugify('Hello World')).toBe('hello-world')
      expect(slugify('Next.js & TypeScript')).toBe('nextjs-typescript')
      expect(slugify('Special Characters!@#$%')).toBe('special-characters')
    })
  })

  describe('formatNumber', () => {
    it('should format numbers with commas', () => {
      expect(formatNumber(1000)).toBe('1,000')
      expect(formatNumber(1234567)).toBe('1,234,567')
      expect(formatNumber(42)).toBe('42')
    })
  })

  describe('getInitials', () => {
    it('should return initials from name', () => {
      expect(getInitials('John Doe')).toBe('JD')
      expect(getInitials('Alice')).toBe('A')
      expect(getInitials('Bob Smith Johnson')).toBe('BS')
    })
  })
})












