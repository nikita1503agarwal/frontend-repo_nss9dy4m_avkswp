import React, { useMemo } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

/*
  Background3D
  - Fixed, page-wide background with parallax "3D" orbs and neon streaks
  - Moves subtly with scroll to create depth
  - Pointer-events disabled so it never blocks interactions
*/
export default function Background3D() {
  const { scrollYProgress } = useScroll()

  // Depth layers mapped from scroll progress
  const xFar = useTransform(scrollYProgress, [0, 1], [0, -120])
  const yFar = useTransform(scrollYProgress, [0, 1], [0, 140])
  const xMid = useTransform(scrollYProgress, [0, 1], [0, -220])
  const yMid = useTransform(scrollYProgress, [0, 1], [0, 260])
  const xNear = useTransform(scrollYProgress, [0, 1], [0, -320])
  const yNear = useTransform(scrollYProgress, [0, 1], [0, 380])
  const rot = useTransform(scrollYProgress, [0, 1], [0, 10])

  // Precompute random seeds for subtle variations (stable across renders)
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

      {/* FAR layer: large, soft orbs */}
      <motion.div style={{ x: xFar, y: yFar, rotate: rot }} className="absolute inset-0 will-change-transform">
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
