import React from 'react'
import Hero from './components/Hero'
import Services from './components/Services'
import Portfolio from './components/Portfolio'
import Testimonials from './components/Testimonials'
import About from './components/About'
import Contact from './components/Contact'
import OtherCampaigns from './components/OtherCampaigns'

export default function App() {
  return (
    <div className="min-h-screen w-full scroll-smooth bg-[#0A0A0C] font-[Manrope] text-[#F5F5F2]">
      {/* Top nav */}
      <header className="fixed inset-x-0 top-0 z-50 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <a href="#home" className="text-sm font-medium text-white/80 hover:text-white">Wagner Lima</a>
          <nav className="hidden gap-6 text-white/70 md:flex">
            <a href="#services" className="hover:text-white">Services</a>
            <a href="#portfolio" className="hover:text-white">Portfolio</a>
            <a href="#campaigns" className="hover:text-white">Campaigns</a>
            <a href="#testimonials" className="hover:text-white">Words</a>
            <a href="#about" className="hover:text-white">About</a>
            <a href="#contact" className="rounded-full bg-white/10 px-4 py-2 hover:bg-white/15">Contact</a>
          </nav>
        </div>
        <div className="pointer-events-none h-px w-full bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      </header>

      <main>
        <Hero />
        <Services />
        <Portfolio />
        <OtherCampaigns />
        <Testimonials />
        <About />
        <Contact />
      </main>

      <footer className="border-t border-white/10 bg-[#0A0A0C] py-10 text-center text-xs text-white/50">
        © {new Date().getFullYear()} Wagner Lima • Creative Marketing Director & AI Specialist
      </footer>
    </div>
  )
}
