import React from 'react'
import { useReveal } from '../hooks/useReveal'

export default function Contact() {
  const ref = useReveal()
  return (
    <section id="contact" className="py-24 px-6 relative" ref={ref}>
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-14 reveal">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="w-10 h-px bg-yellow-500" />
            <span className="text-yellow-400/70 text-xs tracking-[0.3em] uppercase">Get In Touch</span>
            <div className="w-10 h-px bg-yellow-500" />
          </div>
          <h2 className="section-title">
            <span className="gold-text">Contact Us</span>
          </h2>
          <p className="text-white/50 mt-4 max-w-md mx-auto">
            Have a question, want a custom quote or to setup maintenance details? Reach out - we respond fast.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-12">
          {/* Phone */}
          <a
            href="tel:6479241556"
            className="card-dark p-8 rounded-sm text-center reveal group"
            style={{ transitionDelay: '0ms' }}
          >
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-full border border-yellow-500/30 text-yellow-400 mb-5 group-hover:border-yellow-400/60 transition-all duration-300">
              <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" stroke="currentColor" strokeWidth="1.5">
                <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
              </svg>
            </div>
            <p className="text-white/40 text-xs tracking-widest uppercase mb-2">Phone / Text</p>
            <p className="font-display font-semibold text-lg text-white group-hover:text-yellow-400 transition-colors duration-300">647-924-1556</p>
          </a>

          {/* Instagram */}
          <a
            href="https://www.instagram.com/zenithluxurydetailingg/"
            target="_blank"
            rel="noopener noreferrer"
            className="card-dark p-8 rounded-sm text-center reveal group"
            style={{ transitionDelay: '100ms' }}
          >
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-full border border-yellow-500/30 text-yellow-400 mb-5 group-hover:border-yellow-400/60 transition-all duration-300">
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </div>
            <p className="text-white/40 text-xs tracking-widest uppercase mb-2">Instagram</p>
            <p className="font-display font-semibold text-lg text-white group-hover:text-yellow-400 transition-colors duration-300">@zenithluxurydetailingg</p>
          </a>

          {/* Email */}
          <a
            href="mailto:zenithluxurydetailing@gmail.com"
            className="card-dark p-8 rounded-sm text-center reveal group"
            style={{ transitionDelay: '200ms' }}
          >
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-full border border-yellow-500/30 text-yellow-400 mb-5 group-hover:border-yellow-400/60 transition-all duration-300">
              <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" stroke="currentColor" strokeWidth="1.5">
                <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
              </svg>
            </div>
            <p className="text-white/40 text-xs tracking-widest uppercase mb-2">Email</p>
            <p className="font-semibold text-white group-hover:text-yellow-400 transition-colors duration-300 whitespace-nowrap" style={{ fontSize: 'clamp(0.65rem, 1.4vw, 0.9rem)' }}>zenithluxurydetailing@gmail.com</p>
          </a>
        </div>

      </div>
    </section>
  )
}
