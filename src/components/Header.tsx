'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'
import { useEffect, useId, useRef, useState } from 'react'
import { ConsultLink } from '@/components/site/ConsultLink'
import { Button } from '@/components/ui/button'
import { navigation } from '@/lib/site'
import { cn } from '@/lib/utils'

function isNavActive(pathname: string, href: string) {
  return href === '/' ? pathname === '/' : pathname === href || pathname.startsWith(`${href}/`)
}

export function Header() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const menuId = useId()
  const buttonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  useEffect(() => {
    if (!open) return

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false)
        buttonRef.current?.focus()
      }
    }

    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [open])

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur-md">
      <div className="container flex h-16 items-center justify-between gap-3">
        <Link
          href="/"
          className="flex h-11 items-center gap-2 rounded-md pr-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          aria-label="NRG home"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-md bg-primary text-xs font-bold text-primary-foreground">
            NRG
          </span>
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-1 md:flex">
          {navigation.map((item) => {
            const active = isNavActive(pathname, item.href)
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? 'page' : undefined}
                className={cn(
                  'rounded-md px-3 py-2 text-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background',
                  active ? 'text-primary' : 'text-muted-foreground hover:text-foreground',
                )}
              >
                {item.name}
              </Link>
            )
          })}
        </nav>

        <div className="hidden md:block">
          <ConsultLink size="default" />
        </div>

        <Button
          ref={buttonRef}
          type="button"
          variant="outline"
          size="icon"
          className="h-11 w-11 md:hidden"
          aria-expanded={open}
          aria-controls={menuId}
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X className="h-5 w-5" strokeWidth={1.5} /> : <Menu className="h-5 w-5" strokeWidth={1.5} />}
        </Button>
      </div>

      <div className="container pb-3 md:hidden">
        <ConsultLink className="w-full" />
      </div>

      {open ? (
        <nav id={menuId} aria-label="Mobile" className="border-t border-border md:hidden">
          <div className="container flex flex-col py-2">
            {navigation.map((item) => {
              const active = isNavActive(pathname, item.href)
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? 'page' : undefined}
                  className={cn(
                    'flex min-h-12 items-center rounded-md px-2 text-base font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
                    active ? 'text-primary' : 'text-foreground',
                  )}
                >
                  {item.name}
                </Link>
              )
            })}
          </div>
        </nav>
      ) : null}
    </header>
  )
}
