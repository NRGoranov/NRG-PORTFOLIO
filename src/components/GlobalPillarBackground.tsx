'use client'

import LightPillar from '@/components/LightPillar'

export function GlobalPillarBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10">
      <LightPillar
        topColor="#3b82f6"
        bottomColor="#1d4ed8"
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
