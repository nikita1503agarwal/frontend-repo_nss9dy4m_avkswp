import React, { useEffect, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Spline from '@splinetool/react-spline'

const Button = ({ children, variant = 'primary', href = '#', onClick }) => {
  const base = 'inline-flex items-center justify-center rounded-full px-6 py-3 text-sm md:text-base transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-0';
  const styles = {
    primary:
      'bg-[#9B5CFF] text-white shadow-[0_0_20px_rgba(155,92,255,0.4)] hover:shadow-[0_0_30px_rgba(155,92,255,0.7)]',
    ghost:
      'bg-white/10 backdrop-blur-md text-[#F5F5F2] border border-white/20 hover:bg-white/15',
  };
  return (
    <a href={href} onClick={onClick} className={`${base} ${styles[variant]}`}>
      {children}
    </a>
  );
};

export default function Hero() {
  const sectionRef = useRef(null)
  const inView = useInView(sectionRef, { margin: '-20% 0px -60% 0px' })

  useEffect(() => {
    // Calmer background motion while Hero is primary
    if (inView) {
      window.dispatchEvent(new CustomEvent('bg3d:intensity', { detail: 0.35 }))
    }
  }, [inView])

  return (
    <section ref={sectionRef} id="home" className="relative min-h-[92vh] w-full overflow-hidden bg-[#0A0A0C]">
      {/* Spline 3D background */}
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/4cHQr84zOGAHOehh/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>

      {/* Soft gradient and bokeh overlays (don't block Spline interaction) */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-32 -left-16 h-96 w-96 rounded-full bg-[radial-gradient(circle_at_center,rgba(155,92,255,0.35),transparent_60%)] blur-2xl" />
        <div className="absolute -bottom-10 -right-10 h-[28rem] w-[28rem] rounded-full bg-[radial-gradient(circle_at_center,rgba(255,120,200,0.22),transparent_60%)] blur-2xl" />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto flex max-w-6xl flex-col items-center px-6 pt-28 text-center md:pt-36">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0, ease: 'easeOut' }}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[11px] uppercase tracking-[0.2em] text-[#F5F5F2]/70 backdrop-blur-md"
        >
          Creative Marketing Director • AI Specialist
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 1.1 }}
          className="max-w-4xl bg-clip-text text-3xl font-semibold leading-[1.05] text-[#F5F5F2] md:text-6xl"
          style={{ letterSpacing: '-0.02em' }}
        >
          Creative Direction. AI Precision. Exceptional Results.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 1.1 }}
          className="mt-5 max-w-2xl text-sm leading-relaxed text-[#F5F5F2]/70 md:text-lg"
        >
          Websites, videos, social media, and automations crafted with purpose.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 1.1 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <Button href="#contact">Book a Free Call</Button>
          <Button href="#portfolio" variant="ghost">View Portfolio</Button>
        </motion.div>

        {/* Floating UI elements */}
        <div className="pointer-events-none relative mt-16 grid w-full grid-cols-2 gap-4 md:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 0.9, y: 0 }}
              transition={{ delay: 0.4 + i * 0.08, duration: 0.8 }}
              className="h-28 rounded-2xl border border-white/10 bg-white/10 backdrop-blur-xl"
              style={{ boxShadow: '0 0 24px rgba(155,92,255,0.18)' }}
            >
              <div className="h-full w-full rounded-2xl bg-[linear-gradient(135deg,rgba(255,255,255,0.06),rgba(255,255,255,0.01))]" />
            </motion.div>
          ))}
        </div>
      </div>

      {/* subtle bottom gradient to transition into next section */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-[#0A0A0C]" />
    </section>
  )
}
