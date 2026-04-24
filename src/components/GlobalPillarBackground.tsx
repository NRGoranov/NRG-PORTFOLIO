'use client'

import LightPillar from '@/components/LightPillar'
import { useLightPillarSettings } from '@/components/LightPillarSettings'

export function GlobalPillarBackground() {
  const { topColor, bottomColor } = useLightPillarSettings()

  return (
    <div className="pointer-events-none fixed inset-0 -z-10">
      <LightPillar
        topColor={topColor}
        bottomColor={bottomColor}
        intensity={1.0}
        rotationSpeed={0.2}
        glowAmount={0.002}
        pillarWidth={3.5}
        pillarHeight={0.6}
        noiseIntensity={0}
        pillarRotation={18}
        interactive={false}
        mixBlendMode="screen"
        quality="high"
      />
    </div>
  )
}
