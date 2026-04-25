'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, Palette, RotateCcw, X } from 'lucide-react'
import { useCallback, useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { useLightPillarSettings } from '@/components/LightPillarSettings'
import { cn } from '@/lib/utils'

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Projects', href: '/projects' },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' },
]

function desktopNavLinkClass(isActive: boolean) {
  return cn(
    'relative cursor-pointer rounded-md px-2.5 py-1 text-sm font-medium transition-[color,background-color] duration-200 ease-out',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/45 focus-visible:ring-offset-2 focus-visible:ring-offset-background',
    'after:pointer-events-none after:absolute after:inset-x-2 after:bottom-0.5 after:h-px after:rounded-full after:bg-primary after:transition-[transform,opacity] after:duration-200 after:ease-out after:origin-center',
    isActive
      ? 'text-primary after:scale-x-100 after:opacity-90'
      : 'text-muted-foreground after:scale-x-0 after:opacity-0 hover:bg-foreground/[0.04] hover:text-foreground hover:after:scale-x-100 hover:after:opacity-80',
  )
}

function mobileNavLinkClass(isActive: boolean) {
  return cn(
    'block cursor-pointer rounded-md px-2 py-1.5 text-sm font-medium transition-[color,background-color,transform] duration-200 ease-out',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/45 focus-visible:ring-offset-2 focus-visible:ring-offset-background',
    isActive
      ? 'bg-primary/[0.08] text-primary'
      : 'text-muted-foreground hover:bg-foreground/[0.04] hover:text-foreground active:scale-[0.99]',
  )
}

function ColorControl({
  label,
  value,
  onChange,
}: {
  label: string
  value: string
  onChange: (value: string) => void
}) {
  return (
    <label className="flex items-center gap-2 text-xs text-muted-foreground">
      <span>{label}</span>
      <input
        type="color"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-6 w-8 cursor-pointer rounded border border-white/20 bg-transparent p-0"
        aria-label={label}
      />
    </label>
  )
}

export function Header() {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const headerRef = useRef<HTMLElement>(null)
  const [allowCursorSheen, setAllowCursorSheen] = useState(false)
  const { topColor, bottomColor, setTopColor, setBottomColor, resetColors } = useLightPillarSettings()

  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)')
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)')
    const sync = () => setAllowCursorSheen(fine.matches && !motion.matches)
    sync()
    fine.addEventListener('change', sync)
    motion.addEventListener('change', sync)
    return () => {
      fine.removeEventListener('change', sync)
      motion.removeEventListener('change', sync)
    }
  }, [])

  const updateHeaderGlow = useCallback((clientX: number, clientY: number) => {
    const el = headerRef.current
    if (!el) return
    const r = el.getBoundingClientRect()
    const x = ((clientX - r.left) / r.width) * 100
    const y = ((clientY - r.top) / r.height) * 100
    el.style.setProperty('--nav-glow-x', `${x}%`)
    el.style.setProperty('--nav-glow-y', `${y}%`)
  }, [])

  const onHeaderPointerMove = (e: React.PointerEvent<HTMLElement>) => {
    if (!allowCursorSheen || e.pointerType === 'touch') return
    updateHeaderGlow(e.clientX, e.clientY)
  }

  const onHeaderPointerEnter = (e: React.PointerEvent<HTMLElement>) => {
    if (!allowCursorSheen || e.pointerType === 'touch') return
    updateHeaderGlow(e.clientX, e.clientY)
  }

  return (
    <div className="sticky top-0 z-50 w-full px-3 pt-2.5 sm:px-4 sm:pt-3">
      <div className="pointer-events-none fixed left-12 top-3 z-[60] hidden md:block xl:left-14">
        <div className="pointer-events-auto rounded-xl border border-white/10 bg-background/45 px-3 py-1.5 shadow-sm backdrop-blur-xl supports-[backdrop-filter]:bg-background/35">
          <Link
            href="/"
            className="group/logo flex cursor-pointer items-center gap-1.5 rounded-md transition-[background-color,transform] duration-200 hover:bg-foreground/[0.04] active:scale-[0.99]"
          >
            <div className="flex h-7 w-7 items-center justify-center rounded-md bg-primary transition-transform duration-200 ease-out group-hover/logo:scale-[1.04]">
              <span className="text-xs font-bold text-primary-foreground">NRG</span>
            </div>
            <span className="text-base font-bold transition-colors duration-200 group-hover/logo:text-foreground">
              Portfolio
            </span>
          </Link>
        </div>
      </div>

      <div className="pointer-events-none fixed right-12 top-3 z-[60] hidden md:block xl:right-14">
        <div className="pointer-events-auto flex items-center gap-2 rounded-xl border border-white/10 bg-background/45 px-3 py-1.5 shadow-sm backdrop-blur-xl supports-[backdrop-filter]:bg-background/35">
          <Palette className="h-3.5 w-3.5 text-muted-foreground" />
          <ColorControl label="Top" value={topColor} onChange={setTopColor} />
          <ColorControl label="Bottom" value={bottomColor} onChange={setBottomColor} />
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="h-7 w-7 rounded-md"
            onClick={resetColors}
            aria-label="Reset pillar colors"
          >
            <RotateCcw className="h-3.5 w-3.5" />
          </Button>
        </div>
      </div>

      <header
        ref={headerRef}
        onPointerMove={onHeaderPointerMove}
        onPointerEnter={onHeaderPointerEnter}
        className="group/header relative mx-auto w-full max-w-[60rem] overflow-hidden rounded-xl border border-white/10 bg-background/45 shadow-sm backdrop-blur-xl supports-[backdrop-filter]:bg-background/35"
      >
      {allowCursorSheen ? (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-300 ease-out group-hover/header:opacity-100"
          style={{
            background:
              'radial-gradient(360px circle at var(--nav-glow-x, 50%) var(--nav-glow-y, 35%), hsl(var(--primary) / 0.08), transparent 50%)',
          }}
        />
      ) : null}
      <div className="relative z-[1] container hidden h-11 md:grid md:grid-cols-3 md:items-center">
        <div />
        {/* Desktop Navigation */}
        <nav className="flex items-center justify-self-center gap-3">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={desktopNavLinkClass(pathname === item.href)}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        <div className="justify-self-end" />
      </div>

      {/* Mobile row */}
      <div className="relative z-[1] container flex h-11 items-center justify-between md:hidden">
        <Link
          href="/"
          className="group/logo flex cursor-pointer items-center gap-1.5 rounded-md transition-[background-color,transform] duration-200 hover:bg-foreground/[0.04] active:scale-[0.99]"
        >
          <div className="flex h-7 w-7 items-center justify-center rounded-md bg-primary transition-transform duration-200 ease-out group-hover/logo:scale-[1.04]">
            <span className="text-xs font-bold text-primary-foreground">NRG</span>
          </div>
          <span className="text-base font-bold transition-colors duration-200 group-hover/logo:text-foreground">
            Portfolio
          </span>
        </Link>

        <div className="flex items-center gap-1.5">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="h-8 w-8"
          >
            {mobileMenuOpen ? (
              <X className="h-4 w-4" />
            ) : (
              <Menu className="h-4 w-4" />
            )}
            <span className="sr-only">Toggle menu</span>
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence initial={false}>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="relative z-[1] md:hidden overflow-hidden border-t border-white/10 bg-background/55 backdrop-blur-xl"
          >
            <div className="container py-3">
              <nav className="flex flex-col gap-3">
                {navigation.map((item, index) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.18, delay: index * 0.04 }}
                  >
                    <Link
                      href={item.href}
                      className={mobileNavLinkClass(pathname === item.href)}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  </motion.div>
                ))}
              </nav>
              <div className="mt-1 border-t border-white/10 pt-3">
                <div className="mb-2 flex items-center gap-2 text-xs font-medium text-muted-foreground">
                  <Palette className="h-3.5 w-3.5" />
                  <span>Light Pillar Colors</span>
                </div>
                <div className="flex items-center justify-between gap-2">
                  <ColorControl label="Top" value={topColor} onChange={setTopColor} />
                  <ColorControl label="Bottom" value={bottomColor} onChange={setBottomColor} />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 rounded-md"
                    onClick={resetColors}
                    aria-label="Reset pillar colors"
                  >
                    <RotateCcw className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      </header>
    </div>
  )
}















