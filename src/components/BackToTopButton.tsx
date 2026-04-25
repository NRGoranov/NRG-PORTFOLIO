'use client'

import { useEffect, useState } from 'react'
import { ChevronUp } from 'lucide-react'
import { Button } from '@/components/ui/button'

const SHOW_AFTER_SCROLL_Y = 24

export function BackToTopButton() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      setIsVisible(window.scrollY > SHOW_AFTER_SCROLL_Y)
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  const handleBackToTop = () => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    window.scrollTo({
      top: 0,
      behavior: prefersReducedMotion ? 'auto' : 'smooth',
    })
  }

  return (
    <Button
      type="button"
      size="icon"
      variant="ghost"
      aria-label="Back to top"
      onClick={handleBackToTop}
      className={[
        'fixed bottom-6 right-6 z-50 h-11 w-11 rounded-full',
        'border border-white/15 bg-background/60 text-foreground shadow-[0_10px_30px_rgba(0,0,0,0.35)] backdrop-blur-xl',
        'hover:-translate-y-0.5 hover:border-primary/50 hover:bg-primary/15 hover:text-primary',
        'focus-visible:ring-primary/70',
        'transition-all duration-300',
        isVisible
          ? 'pointer-events-auto translate-y-0 scale-100 opacity-100'
          : 'pointer-events-none translate-y-3 scale-95 opacity-0',
      ].join(' ')}
    >
      <ChevronUp className="h-5 w-5 drop-shadow-[0_0_8px_hsl(var(--primary)/0.35)]" />
    </Button>
  )
}
