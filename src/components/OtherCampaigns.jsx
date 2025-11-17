import React, { useRef } from 'react'
import { motion } from 'framer-motion'

const campaigns = [
  {
    title: 'Aurora Skincare – Spring Drop',
    img: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=1600&auto=format&fit=crop',
  },
  {
    title: 'Circuit Audio – Night Run',
    img: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=1600&auto=format&fit=crop',
  },
  {
    title: 'Nordson – Blue Steel',
    img: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1600&auto=format&fit=crop',
  },
  {
    title: 'Creative Electron – Lab Light',
    img: 'https://images.unsplash.com/photo-1542751110-97427bbecf20?q=80&w=1600&auto=format&fit=crop',
  },
  {
    title: 'GlamFlow – Studio Session',
    img: 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?q=80&w=1600&auto=format&fit=crop',
  },
]

export default function OtherCampaigns() {
  const ref = useRef(null)

  const scrollBy = (offset) => {
    if (!ref.current) return
    ref.current.scrollBy({ left: offset, behavior: 'smooth' })
  }

  return (
    <section id="campaigns" className="relative w-full bg-[#0A0A0C] py-24 text-[#F5F5F2]">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-10 flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-semibold md:text-4xl">Other Campaigns</h2>
            <p className="mt-3 text-sm text-white/60 md:text-base">Selected image campaigns and stills.</p>
          </div>
          <div className="hidden gap-2 md:flex">
            <button
              aria-label="Previous"
              onClick={() => scrollBy(-480)}
              className="rounded-full border border-white/10 bg-white/10 p-2 text-white/80 hover:bg-white/15"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6"></polyline>
              </svg>
            </button>
            <button
              aria-label="Next"
              onClick={() => scrollBy(480)}
              className="rounded-full border border-white/10 bg-white/10 p-2 text-white/80 hover:bg-white/15"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </button>
          </div>
        </div>

        <div
          ref={ref}
          className="no-scrollbar relative -mx-6 flex snap-x snap-mandatory gap-6 overflow-x-auto px-6"
        >
          {campaigns.map((c, idx) => (
            <motion.div
              key={c.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: idx * 0.05 }}
              className="group relative h-[320px] w-[280px] shrink-0 snap-start overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md sm:h-[360px] sm:w-[340px]"
              style={{ boxShadow: '0 0 24px rgba(155,92,255,0.12)' }}
            >
              <img
                src={c.img}
                alt={c.title}
                className="h-full w-full object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06]"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0A0A0C] via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-60" />
              <div className="pointer-events-none absolute bottom-0 left-0 right-0 p-4 text-sm text-white/90 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                {c.title}
              </div>
            </motion.div>
          ))}
        </div>

        {/* mobile controls */}
        <div className="mt-6 flex justify-center gap-3 md:hidden">
          <button
            aria-label="Previous"
            onClick={() => scrollBy(-320)}
            className="rounded-full border border-white/10 bg-white/10 p-2 text-white/80 hover:bg-white/15"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
          </button>
          <button
            aria-label="Next"
            onClick={() => scrollBy(320)}
            className="rounded-full border border-white/10 bg-white/10 p-2 text-white/80 hover:bg-white/15"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </button>
        </div>
      </div>
    </section>
  )
}
