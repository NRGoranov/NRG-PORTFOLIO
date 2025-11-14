'use client'

import dynamic from 'next/dynamic'

const SerpentBackground = dynamic(() => import('./SerpentBackground').then(mod => ({ default: mod.SerpentBackground })), {
  ssr: false,
  loading: () => null,
})

export { SerpentBackground }














