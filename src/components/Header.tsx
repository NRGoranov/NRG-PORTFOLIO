'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ChevronRight, Menu, Sparkles, X } from 'lucide-react'
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
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
import { BackgroundSettingsPanel } from '@/components/BackgroundSettingsPanel'
import { useLightPillarSettings } from '@/components/LightPillarSettings'
import type { LightPillarQuality } from '@/types/light-pillar'
import { cn } from '@/lib/utils'

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Projects', href: '/projects' },
  { name: 'Clothing', href: '/clothing' },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' },
]

const SCROLL_START = 40
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

function isNavActive(pathname: string, href: string) {
  return href === '/' ? pathname === '/' : pathname === href || pathname.startsWith(`${href}/`)
}

function LogoLink({ onClick }: { onClick?: () => void }) {
  return (
    <Link
      href="/"
      onClick={onClick}
      className="group/logo flex cursor-pointer items-center gap-1.5 rounded-md transition-[background-color,transform] duration-200 hover:bg-foreground/[0.04] active:scale-[0.99]"
    >
      <div className="flex h-7 w-7 items-center justify-center rounded-md bg-primary transition-transform duration-200 ease-out group-hover/logo:scale-[1.04]">
        <span className="text-xs font-bold text-primary-foreground">NRG</span>
      </div>
      <span className="font-display text-base font-bold tracking-tight transition-colors duration-200 group-hover/logo:text-foreground">
        Portfolio
      </span>
    </Link>
  )
}

function BackgroundSettingsTrigger({
  open,
  onOpenChange,
  topColor,
  bottomColor,
  backgroundQuality,
  setTopColor,
  setBottomColor,
  setBackgroundQuality,
  resetColors,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  topColor: string
  bottomColor: string
  backgroundQuality: LightPillarQuality
  setTopColor: (value: string) => void
  setBottomColor: (value: string) => void
  setBackgroundQuality: (value: LightPillarQuality) => void
  resetColors: () => void
}) {
  const triggerRef = useRef<HTMLButtonElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)
  const [mounted, setMounted] = useState(false)
  const [panelPosition, setPanelPosition] = useState({ top: 0, right: 16 })

  useEffect(() => {
    setMounted(true)
  }, [])

  const updatePanelPosition = useCallback(() => {
    const trigger = triggerRef.current
    if (!trigger) return

    const rect = trigger.getBoundingClientRect()
    const panelWidth = 288
    const margin = 16
    const right = Math.min(
      Math.max(margin, window.innerWidth - rect.right),
      window.innerWidth - panelWidth - margin,
    )

    setPanelPosition({
      top: rect.bottom + 8,
      right,
    })
  }, [])

  useLayoutEffect(() => {
    if (!open) return

    updatePanelPosition()
    window.addEventListener('resize', updatePanelPosition)
    window.addEventListener('scroll', updatePanelPosition, true)

    return () => {
      window.removeEventListener('resize', updatePanelPosition)
      window.removeEventListener('scroll', updatePanelPosition, true)
    }
  }, [open, updatePanelPosition])

  useEffect(() => {
    if (!open) return

    const onPointerDown = (event: MouseEvent) => {
      const target = event.target as Node
      if (triggerRef.current?.contains(target) || panelRef.current?.contains(target)) return
      onOpenChange(false)
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onOpenChange(false)
    }

    document.addEventListener('mousedown', onPointerDown)
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('mousedown', onPointerDown)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [open, onOpenChange])

  const overlay = mounted
    ? createPortal(
        <AnimatePresence>
          {open ? (
            <>
              <motion.button
                type="button"
                key="background-settings-backdrop"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.18 }}
                className="fixed inset-0 z-[60] cursor-default bg-background/25 backdrop-blur-[2px]"
                aria-label="Close background settings"
                onClick={() => onOpenChange(false)}
              />
              <motion.div
                key="background-settings-panel"
                ref={panelRef}
                initial={{ opacity: 0, y: -8, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: 0.98 }}
                transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
                style={{ top: panelPosition.top, right: panelPosition.right }}
                className="fixed z-[61] w-72 rounded-2xl border border-white/10 bg-background/95 p-4 shadow-[0_20px_50px_rgba(0,0,0,0.45)] backdrop-blur-xl"
                role="dialog"
                aria-label="Background settings"
              >
                <p className="mb-3 font-display text-sm font-semibold tracking-tight">Background</p>
                <BackgroundSettingsPanel
                  topColor={topColor}
                  bottomColor={bottomColor}
                  backgroundQuality={backgroundQuality}
                  setTopColor={setTopColor}
                  setBottomColor={setBottomColor}
                  setBackgroundQuality={setBackgroundQuality}
                  resetColors={resetColors}
                />
              </motion.div>
            </>
          ) : null}
        </AnimatePresence>,
        document.body,
      )
    : null

  return (
    <>
      <Button
        ref={triggerRef}
        type="button"
        variant="ghost"
        size="sm"
        onClick={() => onOpenChange(!open)}
        aria-expanded={open}
        aria-haspopup="dialog"
        className={cn(
          'h-8 gap-1.5 rounded-full border px-3 text-xs font-medium transition-all duration-200',
          open
            ? 'border-primary/35 bg-primary/10 text-primary'
            : 'border-white/10 bg-background/30 text-muted-foreground hover:border-primary/25 hover:bg-primary/5 hover:text-foreground',
        )}
      >
        <Sparkles className="h-3.5 w-3.5" />
        <span className="hidden lg:inline">Background</span>
      </Button>
      {overlay}
    </>
  )
}

function MobileNavLink({
  item,
  index,
  isActive,
  onNavigate,
}: {
  item: (typeof navigation)[number]
  index: number
  isActive: boolean
  onNavigate: () => void
}) {
  return (
    <Link
      href={item.href}
      onClick={onNavigate}
      className={cn(
        'group flex items-center justify-between rounded-2xl border px-4 py-3.5 transition-all duration-200',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/45 focus-visible:ring-offset-2 focus-visible:ring-offset-background',
        isActive
          ? 'border-primary/25 bg-primary/[0.07] text-primary'
          : 'border-transparent text-foreground/90 hover:border-white/10 hover:bg-white/[0.03]',
      )}
    >
      <span className="flex items-baseline gap-3">
        <span className="font-mono text-[10px] tabular-nums text-muted-foreground/50">
          {String(index + 1).padStart(2, '0')}
        </span>
        <span className="font-display text-xl font-medium tracking-tight">{item.name}</span>
      </span>
      <ChevronRight
        className={cn(
          'h-4 w-4 shrink-0 transition-all duration-200',
          isActive
            ? 'text-primary/80'
            : 'text-muted-foreground/40 group-hover:translate-x-0.5 group-hover:text-muted-foreground',
        )}
      />
    </Link>
  )
}

export function Header() {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [settingsOpen, setSettingsOpen] = useState(false)
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

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileMenuOpen])

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

  const closeMobileMenu = () => setMobileMenuOpen(false)

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

          <BackgroundSettingsTrigger
            open={settingsOpen}
            onOpenChange={setSettingsOpen}
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
          <LogoLink onClick={closeMobileMenu} />

          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-expanded={mobileMenuOpen}
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            className={cn(
              'h-9 w-9 rounded-full border transition-all duration-200',
              mobileMenuOpen
                ? 'border-primary/35 bg-primary/10 text-primary'
                : 'border-white/10 bg-background/30 text-muted-foreground hover:border-primary/25 hover:text-foreground',
            )}
          >
            {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </Button>
        </motion.div>

        <AnimatePresence initial={false}>
          {mobileMenuOpen ? (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              className="relative z-[1] overflow-hidden border-t border-white/10 md:hidden"
            >
              <div className="container space-y-6 py-5">
                <nav className="flex flex-col gap-1.5">
                  {navigation.map((item, index) => (
                    <motion.div
                      key={item.name}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -6 }}
                      transition={{ duration: 0.22, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <MobileNavLink
                        item={item}
                        index={index}
                        isActive={isNavActive(pathname, item.href)}
                        onNavigate={closeMobileMenu}
                      />
                    </motion.div>
                  ))}
                </nav>

                <div className="h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />

                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 4 }}
                  transition={{ duration: 0.24, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                  className="glass-panel rounded-2xl p-4"
                >
                  <div className="mb-3 flex items-center gap-2">
                    <Sparkles className="h-3.5 w-3.5 text-primary" />
                    <p className="font-display text-sm font-semibold tracking-tight">Background</p>
                  </div>
                  <BackgroundSettingsPanel
                    topColor={topColor}
                    bottomColor={bottomColor}
                    backgroundQuality={backgroundQuality}
                    setTopColor={setTopColor}
                    setBottomColor={setBottomColor}
                    setBackgroundQuality={setBackgroundQuality}
                    resetColors={resetColors}
                  />
                </motion.div>
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </motion.header>
    </motion.div>
  )
}
