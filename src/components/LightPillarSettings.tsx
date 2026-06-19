'use client'

import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import {
  DEFAULT_LIGHT_PILLAR_QUALITY,
  type LightPillarQuality,
} from '@/types/light-pillar'

type LightPillarSettingsValue = {
  topColor: string
  bottomColor: string
  backgroundQuality: LightPillarQuality
  setTopColor: (value: string) => void
  setBottomColor: (value: string) => void
  setBackgroundQuality: (value: LightPillarQuality) => void
  resetColors: () => void
}

const STORAGE_KEY = 'nrg.light-pillar.settings'
const LEGACY_COLORS_KEY = 'nrg.light-pillar.colors'
const DEFAULT_TOP_COLOR = '#f73bde'
const DEFAULT_BOTTOM_COLOR = '#1d4ed8'

function isLightPillarQuality(value: unknown): value is LightPillarQuality {
  return value === 'low' || value === 'medium' || value === 'high'
}

const LightPillarSettingsContext = createContext<LightPillarSettingsValue | null>(null)

export function LightPillarSettingsProvider({ children }: { children: React.ReactNode }) {
  const [topColor, setTopColor] = useState(DEFAULT_TOP_COLOR)
  const [bottomColor, setBottomColor] = useState(DEFAULT_BOTTOM_COLOR)
  const [backgroundQuality, setBackgroundQuality] = useState<LightPillarQuality>(
    DEFAULT_LIGHT_PILLAR_QUALITY,
  )

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) {
        const parsed = JSON.parse(raw) as {
          topColor?: string
          bottomColor?: string
          backgroundQuality?: string
        }
        if (parsed.topColor) setTopColor(parsed.topColor)
        if (parsed.bottomColor) setBottomColor(parsed.bottomColor)
        if (isLightPillarQuality(parsed.backgroundQuality)) {
          setBackgroundQuality(parsed.backgroundQuality)
        }
        return
      }

      const legacy = localStorage.getItem(LEGACY_COLORS_KEY)
      if (!legacy) return
      const parsed = JSON.parse(legacy) as { topColor?: string; bottomColor?: string }
      if (parsed.topColor) setTopColor(parsed.topColor)
      if (parsed.bottomColor) setBottomColor(parsed.bottomColor)
    } catch {
      // Ignore invalid storage payloads and fall back to defaults.
    }
  }, [])

  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ topColor, bottomColor, backgroundQuality }),
    )
  }, [topColor, bottomColor, backgroundQuality])

  const value = useMemo(
    () => ({
      topColor,
      bottomColor,
      backgroundQuality,
      setTopColor,
      setBottomColor,
      setBackgroundQuality,
      resetColors: () => {
        setTopColor(DEFAULT_TOP_COLOR)
        setBottomColor(DEFAULT_BOTTOM_COLOR)
      },
    }),
    [topColor, bottomColor, backgroundQuality],
  )

  return (
    <LightPillarSettingsContext.Provider value={value}>
      {children}
    </LightPillarSettingsContext.Provider>
  )
}

export function useLightPillarSettings() {
  const context = useContext(LightPillarSettingsContext)
  if (!context) {
    throw new Error('useLightPillarSettings must be used within LightPillarSettingsProvider')
  }
  return context
}
