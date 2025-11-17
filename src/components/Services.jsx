import React from 'react'
import { motion } from 'framer-motion'
import { Globe, Video, Sparkles, Atom, Palette } from 'lucide-react'

const services = [
  {
    title: 'Website Design + Development',
    icon: Globe,
    desc: 'High-performance websites with pixel-perfect craft and premium interactions.',
  },
  {
    title: 'Social Media + Content Strategy',
    icon: Sparkles,
    desc: 'Editorial calendars, content systems, and storytelling built for growth.',
  },
  {
    title: 'Video Editing + Short-Form Excellence',
    icon: Video,
    desc: 'Cinematic edits and social-native formats with rhythm and clarity.',
  },
  {
    title: 'Brand Identity Systems',
    icon: Palette,
    desc: 'Elegant, modern identities with scalable motion and grid logic.',
  },
  {
    title: 'AI Automations (booking bots, workflows, assistants)',
    icon: Atom,
    desc: 'Intelligent automations that connect tools and remove busywork.',
  },
]

export default function Services() {
  return (
    <section id="services" className="relative w-full bg-[#0A0A0C] py-24 text-[#F5F5F2]">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-0 h-40 w-40 -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_center,rgba(155,92,255,0.18),transparent_60%)] blur-2xl" />
      </div>
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-12 text-center">
          <h2 className="text-2xl font-semibold tracking-tight md:text-4xl">Signature Services</h2>
          <p className="mt-3 text-sm text-white/60 md:text-base">Minimal luxury, engineered for impact.</p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map(({ title, icon: Icon, desc }, idx) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.6, delay: idx * 0.05 }}
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl"
              style={{ boxShadow: '0 0 24px rgba(155,92,255,0.16)' }}
            >
              <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/10" />
              <div className="mb-4 flex items-center gap-3">
                <div className="rounded-xl border border-white/10 bg-white/10 p-3 text-[#9B5CFF]">
                  <Icon size={22} strokeWidth={1.5} />
                </div>
                <h3 className="text-lg font-medium">{title}</h3>
              </div>
              <p className="text-sm text-white/70">{desc}</p>
              <div className="mt-6 h-px w-full border-t border-dashed border-white/15" />
              <div className="mt-4 text-[11px] uppercase tracking-wider text-white/50">Premium • Strategy • Execution</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
