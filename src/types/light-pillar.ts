export type LightPillarQuality = 'low' | 'medium' | 'high'

export const DEFAULT_LIGHT_PILLAR_QUALITY: LightPillarQuality = 'high'

export const LIGHT_PILLAR_QUALITY_OPTIONS: {
  value: LightPillarQuality
  label: string
}[] = [
  { value: 'high', label: 'Full' },
  { value: 'medium', label: 'Balanced' },
  { value: 'low', label: 'Lighter' },
]
