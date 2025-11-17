import React from 'react'
import { motion } from 'framer-motion'

const testimonials = [
  {
    name: 'Elena S.',
    role: 'Founder, GlamFlow',
    quote: 'Wagner turned our vision into a living brand. Clean, cinematic, and unbelievably effective.',
  },
  {
    name: 'Marcus D.',
    role: 'CEO, BarberFlow',
    quote: 'Precision and taste. Our bookings doubled within a month.',
  },
  {
    name: 'Priya K.',
    role: 'Marketing Lead, Creative Electron',
    quote: 'Editorial visuals that feel premium and perform even better.',
  },
]

export default function Testimonials() {
  return (
    <section id="testimonials" className="relative w-full bg-[#0A0A0C] py-24 text-[#F5F5F2]">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-10 text-center">
          <h2 className="text-2xl font-semibold md:text-4xl">Client Words</h2>
          <p className="mt-3 text-sm text-white/60 md:text-base">Short. Honest. Powerful.</p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {testimonials.map((t, idx) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.6, delay: idx * 0.05 }}
              className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 text-white/90 backdrop-blur-xl"
              style={{ boxShadow: '0 0 24px rgba(155,92,255,0.14)' }}
            >
              <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-[radial-gradient(circle_at_center,rgba(155,92,255,0.15),transparent_60%)] blur-xl" />
              <p className="relative text-base leading-relaxed">“{t.quote}”</p>
              <div className="mt-6 h-px w-full border-t border-dashed border-white/15" />
              <div className="mt-4 text-sm font-medium">{t.name}</div>
              <div className="text-xs text-white/60">{t.role}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
