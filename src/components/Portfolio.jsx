import React from 'react'
import { motion } from 'framer-motion'

const projects = [
  {
    title: 'GlamFlow – Beauty AI Website',
    img: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?q=80&w=1600&auto=format&fit=crop',
  },
  {
    title: 'BarberFlow – AI Booking Platform',
    img: 'https://images.unsplash.com/photo-1519744792095-2f2205e87b6f?q=80&w=1600&auto=format&fit=crop',
  },
  {
    title: 'Creative Electron – High-End Product Videos',
    img: 'https://images.unsplash.com/photo-1516542076529-1ea3854896e1?q=80&w=1600&auto=format&fit=crop',
  },
  {
    title: 'Nordson – Industrial Visual Storytelling',
    img: 'https://images.unsplash.com/photo-1518773553398-650c184e0bb3?q=80&w=1600&auto=format&fit=crop',
  },
]

export default function Portfolio() {
  return (
    <section id="portfolio" className="relative w-full bg-[#0A0A0C] py-24 text-[#F5F5F2]">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-10 text-center">
          <h2 className="text-2xl font-semibold md:text-4xl">Portfolio</h2>
          <p className="mt-3 text-sm text-white/60 md:text-base">Editorial visuals with dramatic cropping.</p>
        </div>
        {/* masonry-like using CSS columns */}
        <div className="columns-1 gap-5 md:columns-2 lg:columns-3 [column-fill:_balance]">
          {projects.map((p, idx) => (
            <motion.a
              key={p.title}
              href="#contact"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: idx * 0.05 }}
              className="group mb-5 block overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md"
              style={{ boxShadow: '0 0 24px rgba(155,92,255,0.12)' }}
            >
              <div className="relative overflow-hidden">
                <img src={p.img} alt={p.title} className="h-full w-full scale-100 object-cover transition-transform duration-[1600ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06]" />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0A0A0C] via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-60" />
                <div className="pointer-events-none absolute bottom-0 left-0 right-0 p-4 text-sm text-white/90 opacity-0 transition-opacity duration-500 group-hover:opacity-100">{p.title}</div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  )
}
