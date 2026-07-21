import React, { useEffect } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Services from './components/Services'
import WhyUs from './components/WhyUs'
import Gallery from './components/Gallery'
import ServiceArea from './components/ServiceArea'
import Booking from './components/Booking'
import Footer from './components/Footer'
import FloatingCTA from './components/FloatingCTA'

export default function App() {
  useEffect(() => {
    const hash = window.location.hash
    if (!hash) return
    const id = hash.replace('#', '')
    let attempts = 0
    const tryScroll = () => {
      const el = document.getElementById(id)
      if (el) {
        const top = el.getBoundingClientRect().top + window.scrollY - 80
        window.scrollTo({ top, behavior: 'smooth' })
      } else if (attempts++ < 15) {
        setTimeout(tryScroll, 100)
      }
    }
    setTimeout(tryScroll, 200)
  }, [])

  return (
    <div className="relative" style={{ background: '#080808' }}>
      <Navbar />
      <Hero />

      {/* Gold divider */}
      <div className="divider-gold" />

      <Services />
      <div className="divider-gold" />

      <WhyUs />
      <div className="divider-gold" />

      <div className="hidden md:block">
        <Gallery />
      </div>

      <ServiceArea />
      
      <Booking />
      <div className="divider-gold" />

      <Footer />
      <FloatingCTA />
    </div>
  )
}
