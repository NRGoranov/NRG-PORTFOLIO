'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, Palette, RotateCcw, X } from 'lucide-react'
import { useCallback, useEffect, useRef, useState } from 'react'
import {
  AnimatePresence,
  motion,
  useMotionTemplate,
  useScroll,
  useSpring,
  useTransform,
  useMotionValue,
} from 'framer-motion'
import { Button } from '@/components/ui/button'
import { useLightPillarSettings } from '@/components/LightPillarSettings'
import { LIGHT_PILLAR_QUALITY_OPTIONS, type LightPillarQuality } from '@/types/light-pillar'
import { cn } from '@/lib/utils'

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Projects', href: '/projects' },
  { name: 'Clothing', href: '/clothing' },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' },
]

/** Hold full-width bar until scroll passes this (px) — avoids top-edge jitter */
const SCROLL_START = 40
/** Distance (px) over which the nav morphs from full bar → pill after the dead zone */
const SCROLL_RANGE = 140

const SPRING = { stiffness: 260, damping: 36, mass: 0.7 }

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

function isNavActive(pathname: string, href: string) {
  return href === '/' ? pathname === '/' : pathname === href || pathname.startsWith(`${href}/`)
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
        className="h-6 w-6 cursor-pointer appearance-none rounded-full border border-white/20 bg-transparent p-0 [&::-moz-color-swatch]:rounded-full [&::-moz-color-swatch]:border-none [&::-webkit-color-swatch-wrapper]:p-0 [&::-webkit-color-swatch]:rounded-full [&::-webkit-color-swatch]:border-none"
        aria-label={label}
      />
    </label>
  )
}

function BackgroundQualityControl({
  value,
  onChange,
  showHint = false,
}: {
  value: LightPillarQuality
  onChange: (value: LightPillarQuality) => void
  showHint?: boolean
}) {
  return (
    <div className="flex flex-col gap-1">
      <label className="flex items-center gap-2 text-xs text-muted-foreground">
        <span>Look</span>
        <select
          value={value}
          onChange={(e) => onChange(e.target.value as LightPillarQuality)}
          className="h-7 cursor-pointer rounded-md border border-white/15 bg-background/50 px-2 text-xs text-foreground outline-none focus-visible:ring-2 focus-visible:ring-ring/45"
          aria-label="Background detail"
        >
          {LIGHT_PILLAR_QUALITY_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </label>
      {showHint ? (
        <p className="max-w-xs text-[10px] leading-snug text-muted-foreground">
          Lighter saves battery. Full is the sharpest look.
        </p>
      ) : null}
    </div>
  )
}

function ColorControls({
  topColor,
  bottomColor,
  backgroundQuality,
  setTopColor,
  setBottomColor,
  setBackgroundQuality,
  resetColors,
  compact = false,
  showQualityHint = false,
}: {
  topColor: string
  bottomColor: string
  backgroundQuality: LightPillarQuality
  setTopColor: (value: string) => void
  setBottomColor: (value: string) => void
  setBackgroundQuality: (value: LightPillarQuality) => void
  resetColors: () => void
  compact?: boolean
  showQualityHint?: boolean
}) {
  return (
    <div className={cn('flex flex-col gap-2', compact ? 'items-start' : 'items-end')}>
      <div
        className={cn(
          'flex items-center gap-2',
          compact ? 'rounded-lg px-2 py-1' : 'rounded-xl px-2.5 py-1',
        )}
      >
        <Palette className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
        <ColorControl label="Top" value={topColor} onChange={setTopColor} />
        <ColorControl label="Bottom" value={bottomColor} onChange={setBottomColor} />
        <BackgroundQualityControl
          value={backgroundQuality}
          onChange={setBackgroundQuality}
          showHint={showQualityHint}
        />
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
      {!showQualityHint ? (
        <p className="hidden text-[10px] leading-snug text-muted-foreground xl:block">
          Lighter saves battery. Full is the sharpest look.
        </p>
      ) : null}
    </div>
  )
}

function LogoLink() {
  return (
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
  )
}

export function Header() {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const headerRef = useRef<HTMLElement>(null)
  const [allowCursorSheen, setAllowCursorSheen] = useState(false)
  const [reduceMotion, setReduceMotion] = useState(false)
  const {
    topColor,
    bottomColor,
    backgroundQuality,
    setTopColor,
    setBottomColor,
    setBackgroundQuality,
    resetColors,
  } = useLightPillarSettings()

  const { scrollY } = useScroll()
  const rawProgress = useTransform(
    scrollY,
    [SCROLL_START, SCROLL_START + SCROLL_RANGE],
    [0, 1],
    { clamp: true },
  )
  const progress = useSpring(rawProgress, reduceMotion ? { stiffness: 1000, damping: 100, mass: 0.1 } : SPRING)

  const wrapPaddingTop = useTransform(progress, [0, 1], [0, 12])
  const wrapPaddingX = useTransform(progress, [0, 1], [0, 16])
  const headerScale = useTransform(progress, [0, 1], [1, 0.94])
  const headerMaxWidth = useTransform(progress, [0, 1], ['100%', '60rem'])
  const menuOpen = useMotionValue(0)

  const borderRadius = useTransform([progress, menuOpen], ([value, menu]) => {
    const p = Number(value)
    const isMenuOpen = Number(menu) > 0.5
    if (isMenuOpen && p > 0.35) return 16
    return p * 9999
  })
  const rowHeight = useTransform(progress, [0, 1], [72, 44])
  const rowPaddingX = useTransform(progress, [0, 1], [40, 20])
  const shadowBlur = useTransform(progress, [0, 1], [0, 16])
  const shadowAlpha = useTransform(progress, [0, 1], [0, 0.12])
  const headerShadow = useMotionTemplate`0 4px ${shadowBlur}px rgba(0, 0, 0, ${shadowAlpha})`

  useEffect(() => {
    menuOpen.set(mobileMenuOpen ? 1 : 0)
  }, [mobileMenuOpen, menuOpen])

  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)')
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)')
    const sync = () => {
      setAllowCursorSheen(fine.matches && !motion.matches)
      setReduceMotion(motion.matches)
    }
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
    <motion.div
      className="sticky top-0 z-50 w-full"
      style={{
        paddingTop: wrapPaddingTop,
        paddingLeft: wrapPaddingX,
        paddingRight: wrapPaddingX,
      }}
    >
      <motion.header
        ref={headerRef}
        onPointerMove={onHeaderPointerMove}
        onPointerEnter={onHeaderPointerEnter}
        className={cn(
          'group/header relative mx-auto w-full border-0 border-b border-b-white/10 bg-background/45 backdrop-blur-xl supports-[backdrop-filter]:bg-background/35',
          mobileMenuOpen ? 'overflow-visible' : 'overflow-hidden',
        )}
        style={{
          maxWidth: headerMaxWidth,
          borderRadius,
          scale: headerScale,
          transformOrigin: 'top center',
          boxShadow: headerShadow,
        }}
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

        {/* Desktop */}
        <motion.div
          className="relative z-[1] hidden md:flex md:items-center md:justify-between md:gap-4"
          style={{ height: rowHeight, paddingLeft: rowPaddingX, paddingRight: rowPaddingX }}
        >
          <LogoLink />

          <nav className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center gap-1 lg:gap-3">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={desktopNavLinkClass(isNavActive(pathname, item.href))}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          <ColorControls
            topColor={topColor}
            bottomColor={bottomColor}
            backgroundQuality={backgroundQuality}
            setTopColor={setTopColor}
            setBottomColor={setBottomColor}
            setBackgroundQuality={setBackgroundQuality}
            resetColors={resetColors}
          />
        </motion.div>

        {/* Mobile */}
        <motion.div
          className="relative z-[1] container flex items-center justify-between md:hidden"
          style={{ height: rowHeight }}
        >
          <LogoLink />

          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="h-8 w-8"
          >
            {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            <span className="sr-only">Toggle menu</span>
          </Button>
        </motion.div>

        <AnimatePresence initial={false}>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: 'easeInOut' }}
              className="relative z-[1] overflow-hidden border-t border-white/10 bg-background/55 backdrop-blur-xl md:hidden"
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
                        className={mobileNavLinkClass(isNavActive(pathname, item.href))}
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
                    <span>Background</span>
                  </div>
                  <ColorControls
                    topColor={topColor}
                    bottomColor={bottomColor}
                    backgroundQuality={backgroundQuality}
                    setTopColor={setTopColor}
                    setBottomColor={setBottomColor}
                    setBackgroundQuality={setBackgroundQuality}
                    resetColors={resetColors}
                    compact
                    showQualityHint
                  />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>
    </motion.div>
  )
}
