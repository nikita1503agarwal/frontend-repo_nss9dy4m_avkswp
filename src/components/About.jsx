import React from 'react'
import { motion } from 'framer-motion'

export default function About() {
  return (
    <section id="about" className="relative w-full bg-[#0A0A0C] py-24 text-[#F5F5F2]">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid items-center gap-10 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-2 backdrop-blur-xl" style={{ boxShadow: '0 0 24px rgba(155,92,255,0.12)' }}>
              <img
                src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1600&auto=format&fit=crop"
                alt="Wagner Lima portrait"
                className="h-full w-full rounded-xl object-cover"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-2xl font-semibold md:text-4xl">About Wagner</h2>
            <p className="mt-4 text-white/70">
              Over a decade crafting digital experiences for brands that demand creativity, clarity, and performance.
              I align creative direction with AI precision—building systems that look beautiful and work even better.
            </p>
            <p className="mt-4 text-white/70">
              From websites and identity to video and automation, every deliverable is designed to move audiences and metrics.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
