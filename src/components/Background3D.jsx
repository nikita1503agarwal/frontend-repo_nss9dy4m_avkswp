import React, { useEffect, useMemo, useState } from 'react'
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion'
import Spline from '@splinetool/react-spline'

/*
  Background3D
  - Fixed, page-wide background with parallax "3D" orbs, neon streaks, and optional Spline far layer
  - Scroll + mouse parallax with section-aware intensity (calmer on Hero, stronger on Portfolio)
  - Pointer-events disabled so it never blocks interactions
*/
export default function Background3D() {
  const { scrollYProgress } = useScroll()

  // Global intensity can be nudged by sections via CustomEvent('bg3d:intensity', { detail: number })
  const [intensity, setIntensity] = useState(0.5) // baseline calm
  useEffect(() => {
    const handler = (e) => {
      const val = typeof e.detail === 'number' ? e.detail : 0.5
      setIntensity(val)
    }
    window.addEventListener('bg3d:intensity', handler)
    return () => window.removeEventListener('bg3d:intensity', handler)
  }, [])

  // Smooth intensity changes
  const intensityMv = useSpring(intensity, { stiffness: 120, damping: 20, mass: 0.4 })

  // Mouse parallax (normalized around center)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  useEffect(() => {
    const onMove = (e) => {
      const cx = window.innerWidth / 2
      const cy = window.innerHeight / 2
      const nx = (e.clientX - cx) / cx // -1..1
      const ny = (e.clientY - cy) / cy // -1..1
      mouseX.set(nx)
      mouseY.set(ny)
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    return () => window.removeEventListener('pointermove', onMove)
  }, [mouseX, mouseY])

  // Scroll parallax baselines (will be scaled by intensity)
  const xFarBase = useTransform(scrollYProgress, [0, 1], [0, -120])
  const yFarBase = useTransform(scrollYProgress, [0, 1], [0, 140])
  const xMidBase = useTransform(scrollYProgress, [0, 1], [0, -220])
  const yMidBase = useTransform(scrollYProgress, [0, 1], [0, 260])
  const xNearBase = useTransform(scrollYProgress, [0, 1], [0, -320])
  const yNearBase = useTransform(scrollYProgress, [0, 1], [0, 380])
  const rotBase = useTransform(scrollYProgress, [0, 1], [0, 10])

  // Mouse contributions per layer (scaled by intensity)
  const mFarX = useTransform([mouseX, intensityMv], ([mx, k]) => mx * -20 * k)
  const mFarY = useTransform([mouseY, intensityMv], ([my, k]) => my * -20 * k)
  const mMidX = useTransform([mouseX, intensityMv], ([mx, k]) => mx * -40 * k)
  const mMidY = useTransform([mouseY, intensityMv], ([my, k]) => my * -40 * k)
  const mNearX = useTransform([mouseX, intensityMv], ([mx, k]) => mx * -70 * k)
  const mNearY = useTransform([mouseY, intensityMv], ([my, k]) => my * -70 * k)

  // Combine scroll baseline with mouse offsets and intensity scaling for scroll
  const xFar = useTransform([xFarBase, intensityMv, mFarX], ([s, k, m]) => s * (0.6 + 0.8 * k) + m)
  const yFar = useTransform([yFarBase, intensityMv, mFarY], ([s, k, m]) => s * (0.6 + 0.8 * k) + m)
  const xMid = useTransform([xMidBase, intensityMv, mMidX], ([s, k, m]) => s * (0.6 + 0.8 * k) + m)
  const yMid = useTransform([yMidBase, intensityMv, mMidY], ([s, k, m]) => s * (0.6 + 0.8 * k) + m)
  const xNear = useTransform([xNearBase, intensityMv, mNearX], ([s, k, m]) => s * (0.6 + 0.8 * k) + m)
  const yNear = useTransform([yNearBase, intensityMv, mNearY], ([s, k, m]) => s * (0.6 + 0.8 * k) + m)
  const rot = useTransform([rotBase, intensityMv], ([r, k]) => r * (0.5 + 0.5 * k))

  // Precompute seeds for orbs
  const seeds = useMemo(() => (
    [
      { x: '10%', y: '12%', size: 520, opacity: 0.25 },
      { x: '78%', y: '18%', size: 440, opacity: 0.2 },
      { x: '85%', y: '72%', size: 560, opacity: 0.22 },
      { x: '18%', y: '70%', size: 460, opacity: 0.18 },
      { x: '48%', y: '50%', size: 620, opacity: 0.16 },
    ]
  ), [])

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-[#0A0A0C] [perspective:1200px]">
      {/* Subtle vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.04),transparent_60%)]" />

      {/* FAR layer: optional Spline scene + soft orbs */}
      <motion.div style={{ x: xFar, y: yFar, rotate: rot }} className="absolute inset-0 will-change-transform">
        {/* Low-opacity Spline in the distance */}
        <div className="absolute inset-0 opacity-[0.12]">
          <Spline scene="https://prod.spline.design/4cHQr84zOGAHOehh/scene.splinecode" style={{ width: '100%', height: '100%' }} />
        </div>
        {seeds.slice(0,2).map((s, i) => (
          <div
            key={`far-${i}`}
            className="absolute rounded-full blur-3xl"
            style={{
              left: s.x,
              top: s.y,
              width: s.size,
              height: s.size,
              background:
                'radial-gradient(circle at 30% 30%, rgba(155,92,255,0.35), rgba(20,20,24,0) 60%)',
              opacity: s.opacity,
              boxShadow: '0 0 120px rgba(155,92,255,0.20)'
            }}
          />
        ))}
      </motion.div>

      {/* MID layer: neon orbs with glass glows */}
      <motion.div style={{ x: xMid, y: yMid, rotate: rot }} className="absolute inset-0 will-change-transform">
        {seeds.slice(2,4).map((s, i) => (
          <div key={`mid-${i}`} className="absolute">
            <div
              className="rounded-full"
              style={{
                position: 'absolute',
                left: s.x,
                top: s.y,
                width: s.size * 0.9,
                height: s.size * 0.9,
                background:
                  'radial-gradient(circle at 60% 40%, rgba(255,120,200,0.28), rgba(20,20,24,0) 62%)',
                filter: 'blur(18px)',
                opacity: 0.9,
                boxShadow: '0 0 140px rgba(255,120,200,0.28)'
              }}
            />
            {/* inner glass ring */}
            <div
              className="rounded-full"
              style={{
                position: 'absolute',
                left: `calc(${s.x} + 40px)`,
                top: `calc(${s.y} + 40px)`,
                width: s.size * 0.55,
                height: s.size * 0.55,
                border: '1px solid rgba(255,255,255,0.08)',
                background:
                  'linear-gradient(135deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02))',
                boxShadow: 'inset 0 0 24px rgba(255,255,255,0.06), 0 0 50px rgba(155,92,255,0.25)',
                backdropFilter: 'blur(6px)'
              }}
            />
          </div>
        ))}
      </motion.div>

      {/* NEAR layer: thin neon streaks drifting */}
      <motion.svg
        style={{ x: xNear, y: yNear, rotate: rot }}
        className="absolute inset-0 will-change-transform"
        width="100%"
        height="100%"
        viewBox="0 0 1200 800"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <linearGradient id="glow" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#9B5CFF" stopOpacity="0.0" />
            <stop offset="40%" stopColor="#9B5CFF" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#9B5CFF" stopOpacity="0.0" />
          </linearGradient>
          <filter id="softGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        {Array.from({ length: 8 }).map((_, i) => (
          <g key={i} filter="url(#softGlow)">
            <motion.line
              x1={-200}
              y1={100 + i * 80}
              x2={1400}
              y2={100 + i * 80}
              stroke="url(#glow)"
              strokeWidth={1.6}
              initial={{ opacity: 0.15 }}
              animate={{ opacity: [0.15, 0.5, 0.15] }}
              transition={{ duration: 6 + i, repeat: Infinity, ease: 'easeInOut' }}
            />
          </g>
        ))}
      </motion.svg>

      {/* Bottom gradient to unify sections against background */}
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-[#0A0A0C]" />
    </div>
  )
}
