'use client'

import { RotateCcw } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { LIGHT_PILLAR_QUALITY_OPTIONS, type LightPillarQuality } from '@/types/light-pillar'
import { cn } from '@/lib/utils'

type BackgroundSettingsPanelProps = {
  topColor: string
  bottomColor: string
  backgroundQuality: LightPillarQuality
  setTopColor: (value: string) => void
  setBottomColor: (value: string) => void
  setBackgroundQuality: (value: LightPillarQuality) => void
  resetColors: () => void
  showHint?: boolean
  className?: string
}

function ColorSwatch({
  label,
  value,
  onChange,
}: {
  label: string
  value: string
  onChange: (value: string) => void
}) {
  return (
    <label className="group/swatch flex flex-col items-center gap-2">
      <span className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
        {label}
      </span>
      <span className="relative flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-background/40 shadow-inner transition-transform duration-200 group-hover/swatch:scale-105">
        <input
          type="color"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="absolute inset-0 h-full w-full cursor-pointer rounded-full opacity-0"
          aria-label={`${label} background color`}
        />
        <span
          className="h-7 w-7 rounded-full border border-white/20 shadow-sm"
          style={{ backgroundColor: value }}
        />
      </span>
    </label>
  )
}

export function BackgroundSettingsPanel({
  topColor,
  bottomColor,
  backgroundQuality,
  setTopColor,
  setBottomColor,
  setBackgroundQuality,
  resetColors,
  showHint = true,
  className,
}: BackgroundSettingsPanelProps) {
  return (
    <div className={cn('space-y-4', className)}>
      <div
        className="h-1.5 w-full rounded-full border border-white/10"
        style={{
          background: `linear-gradient(90deg, ${topColor}, ${bottomColor})`,
        }}
        aria-hidden
      />

      <div className="flex items-end justify-between gap-3">
        <ColorSwatch label="Top" value={topColor} onChange={setTopColor} />
        <ColorSwatch label="Bottom" value={bottomColor} onChange={setBottomColor} />
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="h-9 w-9 shrink-0 rounded-full border border-white/10 text-muted-foreground hover:border-primary/30 hover:bg-primary/10 hover:text-primary"
          onClick={resetColors}
          aria-label="Reset background colors"
        >
          <RotateCcw className="h-3.5 w-3.5" />
        </Button>
      </div>

      <div className="space-y-2">
        <p className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
          Look
        </p>
        <div
          className="flex rounded-full border border-white/10 bg-background/40 p-1"
          role="radiogroup"
          aria-label="Background detail"
        >
          {LIGHT_PILLAR_QUALITY_OPTIONS.map((option) => {
            const isActive = backgroundQuality === option.value
            return (
              <button
                key={option.value}
                type="button"
                role="radio"
                aria-checked={isActive}
                onClick={() => setBackgroundQuality(option.value)}
                className={cn(
                  'flex-1 rounded-full px-2 py-1.5 text-xs font-medium transition-all duration-200',
                  isActive
                    ? 'bg-primary/15 text-primary shadow-sm'
                    : 'text-muted-foreground hover:text-foreground',
                )}
              >
                {option.label}
              </button>
            )
          })}
        </div>
      </div>

      {showHint ? (
        <p className="text-[11px] leading-relaxed text-muted-foreground">
          Lighter saves battery. Full is the sharpest look.
        </p>
      ) : null}
    </div>
  )
}
