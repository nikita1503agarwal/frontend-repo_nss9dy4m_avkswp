import React, { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'

const videos = [
  {
    title: 'AI Beauty Launch Film',
    src: 'https://samplelib.com/lib/preview/mp4/sample-5s.mp4',
    poster: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?q=80&w=1600&auto=format&fit=crop',
  },
  {
    title: 'BarberFlow Product Teaser',
    src: 'https://samplelib.com/lib/preview/mp4/sample-10s.mp4',
    poster: 'https://images.unsplash.com/photo-1519744792095-2f2205e87b6f?q=80&w=1600&auto=format&fit=crop',
  },
  {
    title: 'Creative Electron Brand Story',
    src: 'https://samplelib.com/lib/preview/mp4/sample-15s.mp4',
    poster: 'https://images.unsplash.com/photo-1516542076529-1ea3854896e1?q=80&w=1600&auto=format&fit=crop',
  },
  {
    title: 'Nordson Industrial Film',
    src: 'https://samplelib.com/lib/preview/mp4/sample-20s.mp4',
    poster: 'https://images.unsplash.com/photo-1518773553398-650c184e0bb3?q=80&w=1600&auto=format&fit=crop',
  },
]

export default function Portfolio() {
  const [active, setActive] = useState(null)

  // Increase background motion when Portfolio is primary
  const sectionRef = useRef(null)
  const inView = useInView(sectionRef, { margin: '-40% 0px -40% 0px' })
  useEffect(() => {
    if (inView) {
      window.dispatchEvent(new CustomEvent('bg3d:intensity', { detail: 0.9 }))
    }
  }, [inView])

  const handleHoverPlay = (e) => {
    const video = e.currentTarget.querySelector('video')
    if (!video) return
    try {
      video.play()
    } catch (err) {}
  }

  const handleHoverPause = (e) => {
    const video = e.currentTarget.querySelector('video')
    if (!video) return
    video.pause()
    video.currentTime = 0
  }

  return (
    <section ref={sectionRef} id="portfolio" className="relative w-full bg-[#0A0A0C] py-24 text-[#F5F5F2]">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-10 text-center">
          <h2 className="text-2xl font-semibold md:text-4xl">Video Portfolio</h2>
          <p className="mt-3 text-sm text-white/60 md:text-base">Cinematic spots, teasers, and brand stories.</p>
        </div>
        {/* masonry-like using CSS columns */}
        <div className="columns-1 gap-5 md:columns-2 lg:columns-3 [column-fill:_balance]">
          {videos.map((v, idx) => (
            <motion.button
              key={v.title}
              type="button"
              onClick={() => setActive(v)}
              onMouseEnter={handleHoverPlay}
              onMouseLeave={handleHoverPause}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: idx * 0.05 }}
              className="group mb-5 block w-full overflow-hidden rounded-2xl border border-white/10 bg-white/5 text-left backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-[#9B5CFF]/60"
              style={{ boxShadow: '0 0 24px rgba(155,92,255,0.12)' }}
            >
              <div className="relative overflow-hidden">
                <video
                  className="h-full w-full object-cover transition-transform duration-[1600ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
                  muted
                  playsInline
                  preload="metadata"
                  poster={v.poster}
                >
                  <source src={v.src} type="video/mp4" />
                </video>
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0A0A0C] via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-60" />
                <div className="pointer-events-none absolute bottom-0 left-0 right-0 flex items-end justify-between p-4">
                  <span className="text-sm text-white/90 opacity-0 transition-opacity duration-500 group-hover:opacity-100">{v.title}</span>
                  <span className="opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                    {/* play icon */}
                    <svg width="36" height="36" viewBox="0 0 24 24" fill="#F5F5F2" className="drop-shadow-[0_0_12px_rgba(155,92,255,0.6)]">
                      <path d="M8 5v14l11-7z"></path>
                    </svg>
                  </span>
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Lightbox player */}
      <AnimatePresence>
        {active && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
          >
            <motion.div
              className="relative w-full max-w-5xl overflow-hidden rounded-2xl border border-white/10 bg-[#0A0A0C]"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 20, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="aspect-video w-full bg-black">
                <video className="h-full w-full" controls autoPlay playsInline>
                  <source src={active.src} type="video/mp4" />
                </video>
              </div>
              <div className="flex items-center justify-between border-t border-white/10 px-4 py-3">
                <h3 className="text-base font-medium text-white/90">{active.title}</h3>
                <button
                  onClick={() => setActive(null)}
                  className="rounded-md bg-white/10 px-3 py-1.5 text-sm text-white/80 backdrop-blur hover:bg:white/20"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
