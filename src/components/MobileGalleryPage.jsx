import React, { useEffect } from 'react'
import Navbar from './Navbar'
import Gallery from './Gallery'
import Footer from './Footer'
import FloatingCTA from './FloatingCTA'

export default function MobileGalleryPage() {
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
        <Gallery />
        <div className="divider-gold" />
        <Footer />
      </div>
      <FloatingCTA />
    </div>
  )
}
