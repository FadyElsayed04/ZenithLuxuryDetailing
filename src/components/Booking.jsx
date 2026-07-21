import React from 'react'
import { useReveal } from '../hooks/useReveal'

export default function Booking({ bookHref }) {
  const ref = useReveal()
  const href = bookHref ?? '/packages'

  return (
    <section id="booking" className="py-10 md:py-24 px-6 relative" ref={ref}>
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'radial-gradient(ellipse at 50% 50%, rgba(212,160,23,0.05) 0%, transparent 65%)'
      }} />

      <div className="max-w-5xl mx-auto">
        <div className="text-center reveal">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="w-10 h-px bg-yellow-500" />
            <span className="text-yellow-400/70 text-xs tracking-[0.3em] uppercase">Ready to Book?</span>
            <div className="w-10 h-px bg-yellow-500" />
          </div>
          <h2 className="section-title">
            <span className="gold-text">Book Your Detail Now</span>
          </h2>
          <p className="text-white/50 mt-4 max-w-xl mx-auto">
            Select a time that works for you. We'll come to your location fully equipped.
          </p>
          <a
            href={href}
            className="btn-gold glow-pulse inline-block mt-10 px-16 py-5 text-lg tracking-widest uppercase font-bold"
          >
            Book Now
          </a>
        </div>
      </div>
    </section>
  )
}
