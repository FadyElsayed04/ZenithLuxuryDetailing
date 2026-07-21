import React, { useEffect } from 'react'
import Navbar from './Navbar'
import Contact from './Contact'
import Footer from './Footer'
import FloatingCTA from './FloatingCTA'

export default function MobileContactPage() {
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
      <div className="pt-20">
        <Contact />
        <div className="flex justify-center pb-16 -mt-4">
          <a
            href="/packages"
            className="btn-gold px-10 py-4 text-sm tracking-widest uppercase font-semibold"
          >
            Book Now
          </a>
        </div>
        <div className="divider-gold" />
        <Footer />
      </div>
      <FloatingCTA />
    </div>
  )
}
