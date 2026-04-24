'use client'

import { createContext, useContext, useEffect, useMemo, useState } from 'react'

type LightPillarSettingsValue = {
  topColor: string
  bottomColor: string
  setTopColor: (value: string) => void
  setBottomColor: (value: string) => void
  resetColors: () => void
}

const STORAGE_KEY = 'nrg.light-pillar.colors'
const DEFAULT_TOP_COLOR = '#3b82f6'
const DEFAULT_BOTTOM_COLOR = '#1d4ed8'

const LightPillarSettingsContext = createContext<LightPillarSettingsValue | null>(null)

export function LightPillarSettingsProvider({ children }: { children: React.ReactNode }) {
  const [topColor, setTopColor] = useState(DEFAULT_TOP_COLOR)
  const [bottomColor, setBottomColor] = useState(DEFAULT_BOTTOM_COLOR)

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (!raw) return
      const parsed = JSON.parse(raw) as { topColor?: string; bottomColor?: string }
      if (parsed.topColor) setTopColor(parsed.topColor)
      if (parsed.bottomColor) setBottomColor(parsed.bottomColor)
    } catch {
      // Ignore invalid storage payloads and fall back to defaults.
    }
  }, [])

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ topColor, bottomColor }))
  }, [topColor, bottomColor])

  const value = useMemo(
    () => ({
      topColor,
      bottomColor,
      setTopColor,
      setBottomColor,
      resetColors: () => {
        setTopColor(DEFAULT_TOP_COLOR)
        setBottomColor(DEFAULT_BOTTOM_COLOR)
      },
    }),
    [topColor, bottomColor],
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
