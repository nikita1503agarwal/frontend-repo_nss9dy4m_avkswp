import React, { useState } from 'react'
import { motion } from 'framer-motion'

export default function Contact() {
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => { setLoading(false); setSent(true) }, 1200)
  }

  return (
    <section id="contact" className="relative w-full bg-[#0A0A0C] py-24 text-[#F5F5F2]">
      <div className="mx-auto max-w-3xl px-6 text-center">
        <h2 className="text-2xl font-semibold md:text-4xl">Tell me about your project.</h2>
        <p className="mt-3 text-sm text-white/60 md:text-base">I reply within 24 hours.</p>

        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7 }}
          className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-4 rounded-2xl border border-white/10 bg-white/5 p-6 text-left backdrop-blur-xl"
          style={{ boxShadow: '0 0 24px rgba(155,92,255,0.12)' }}
        >
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <input required placeholder="Your name" className="rounded-xl border border-white/10 bg-white/10 px-4 py-3 text-sm text-white placeholder-white/50 outline-none focus:border-white/30" />
            <input type="email" required placeholder="Email" className="rounded-xl border border-white/10 bg-white/10 px-4 py-3 text-sm text-white placeholder-white/50 outline-none focus:border-white/30" />
          </div>
          <input placeholder="Company / Brand (optional)" className="rounded-xl border border-white/10 bg-white/10 px-4 py-3 text-sm text-white placeholder-white/50 outline-none focus:border-white/30" />
          <textarea required rows="5" placeholder="Project goals, timeline, and budget"
            className="rounded-xl border border-white/10 bg-white/10 px-4 py-3 text-sm text-white placeholder-white/50 outline-none focus:border-white/30" />

          <button
            type="submit"
            disabled={loading || sent}
            className="group relative mt-2 inline-flex items-center justify-center overflow-hidden rounded-full bg-[#9B5CFF] px-6 py-3 text-white transition-transform duration-300 disabled:opacity-70"
          >
            <span className="relative z-10">{sent ? 'Message Sent' : loading ? 'Sending…' : 'Send Message'}</span>
            <span className="absolute inset-0 -z-0">
              <span className="absolute inset-0 animate-[pulse_2.2s_ease-in-out_infinite] bg-[radial-gradient(120px_80px_at_center,rgba(255,255,255,0.22),transparent_60%)]" />
            </span>
          </button>
        </motion.form>
      </div>
    </section>
  )
}
