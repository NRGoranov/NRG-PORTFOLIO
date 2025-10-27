'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

interface SerpentProps {
  delay?: number
  duration?: number
  size?: number
  color?: string
  path?: string
}

function Serpent({ delay = 0, duration = 20, size = 100, color = 'rgba(59, 130, 246, 0.1)', path }: SerpentProps) {
  return (
    <motion.div
      className="absolute inset-0 overflow-hidden pointer-events-none"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay, duration: 2 }}
    >
      <motion.svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 1920 1080"
        preserveAspectRatio="none"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration, delay, ease: "linear", repeat: Infinity }}
      >
        <motion.path
          d={path}
          stroke={color}
          strokeWidth={size}
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration, delay, ease: "linear", repeat: Infinity }}
        />
      </motion.svg>
    </motion.div>
  )
}

export function SerpentBackground() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  // Pre-defined serpentine paths
  const serpentPaths = [
    "M 0,540 Q 480,200 960,540 T 1920,540",
    "M 0,400 Q 320,800 640,400 T 1280,400 Q 1600,100 1920,400",
    "M 0,700 Q 400,300 800,700 T 1600,700 Q 1920,500 1920,700",
    "M 0,300 Q 600,600 1200,300 T 1920,300",
  ]

  const serpents = [
    { delay: 0, duration: 25, size: 80, color: 'rgba(59, 130, 246, 0.08)', path: serpentPaths[0] },
    { delay: 5, duration: 30, size: 60, color: 'rgba(16, 185, 129, 0.06)', path: serpentPaths[1] },
    { delay: 10, duration: 35, size: 40, color: 'rgba(139, 92, 246, 0.05)', path: serpentPaths[2] },
    { delay: 15, duration: 40, size: 30, color: 'rgba(245, 158, 11, 0.04)', path: serpentPaths[3] },
  ]

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {serpents.map((serpent, index) => (
        <Serpent
          key={index}
          delay={serpent.delay}
          duration={serpent.duration}
          size={serpent.size}
          color={serpent.color}
          path={serpent.path}
        />
      ))}
      
      {/* Floating particles */}
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 3 }}
      >
        {Array.from({ length: 15 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-primary/20 rounded-full"
            style={{
              left: `${(i * 6.67) % 100}%`,
              top: `${(i * 7) % 100}%`,
            }}
            animate={{
              y: [0, -100, 0],
              x: [0, (i % 2 === 0 ? 1 : -1) * 30, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 8 + (i % 3),
              delay: i * 0.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </motion.div>

      {/* Gradient orbs */}
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 4 }}
      >
        {Array.from({ length: 3 }).map((_, i) => (
          <motion.div
            key={`orb-${i}`}
            className="absolute w-96 h-96 rounded-full opacity-20 blur-3xl"
            style={{
              background: `radial-gradient(circle, ${
                i === 0 ? 'rgba(59, 130, 246, 0.3)' :
                i === 1 ? 'rgba(16, 185, 129, 0.2)' :
                'rgba(139, 92, 246, 0.2)'
              } 0%, transparent 70%)`,
              left: `${20 + i * 30}%`,
              top: `${30 + i * 20}%`,
            }}
            animate={{
              x: [0, 100, -50, 0],
              y: [0, -50, 100, 0],
              scale: [1, 1.2, 0.8, 1],
            }}
            transition={{
              duration: 20 + i * 5,
              delay: i * 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </motion.div>
    </div>
  )
}
