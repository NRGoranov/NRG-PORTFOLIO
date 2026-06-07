'use client'

import { cn } from '@/lib/utils'

interface MysteriousPlaceholderProps {
  hue?: number
  variant?: 'default' | 'hover'
  className?: string
  label?: string
}

export function MysteriousPlaceholder({
  hue = 220,
  variant = 'default',
  className,
  label = 'CLASSIFIED',
}: MysteriousPlaceholderProps) {
  const isHover = variant === 'hover'

  return (
    <div
      className={cn(
        'relative flex h-full w-full items-center justify-center overflow-hidden',
        className,
      )}
      style={{
        background: isHover
          ? `radial-gradient(ellipse at 30% 20%, hsl(${hue} 40% 18% / 0.9), hsl(${hue + 20} 30% 8% / 1) 70%)`
          : `radial-gradient(ellipse at 70% 80%, hsl(${hue} 35% 14% / 0.95), hsl(${hue + 15} 25% 6% / 1) 65%)`,
      }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage: `
            linear-gradient(hsl(var(--foreground) / 0.04) 1px, transparent 1px),
            linear-gradient(90deg, hsl(var(--foreground) / 0.04) 1px, transparent 1px)
          `,
          backgroundSize: '24px 24px',
        }}
      />
      <div
        aria-hidden
        className={cn(
          'pointer-events-none absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-background/30',
          isHover && 'from-primary/20 via-transparent to-background/40',
        )}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-[55%] w-[42%] -translate-x-1/2 -translate-y-[45%] rounded-[2rem] border border-white/10 bg-gradient-to-b from-white/[0.06] to-white/[0.02] shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-[28%] h-px w-[38%] -translate-x-1/2 bg-gradient-to-r from-transparent via-white/25 to-transparent"
      />
      <div className="relative z-10 flex flex-col items-center gap-3 text-center">
        <span className="font-mono text-[10px] uppercase tracking-[0.35em] text-muted-foreground/80">
          {label}
        </span>
        <span
          className={cn(
            'text-5xl font-bold tracking-widest text-foreground/20',
            isHover && 'text-primary/30',
          )}
        >
          ???
        </span>
        {isHover ? (
          <span className="max-w-[140px] text-xs text-muted-foreground/90">
            Reveal pending
          </span>
        ) : null}
      </div>
      <div
        aria-hidden
        className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-primary/10 blur-3xl"
      />
    </div>
  )
}
