import React, { useState, useEffect } from 'react'

export default function FloatingCTA() {
  const [visible, setVisible] = useState(false)
  const bookHref = window.location.pathname === '/packages' ? '#packages' : '/packages'

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      {/* Floating Book Now Button — desktop only */}
      <a
        href={bookHref}
        className={`hidden md:flex fixed bottom-6 right-6 z-40 btn-gold py-4 px-6 rounded-sm shadow-2xl glow-pulse transition-all duration-500 items-center gap-2 text-xs ${
          visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'
        }`}
        style={{ boxShadow: '0 0 30px rgba(212,160,23,0.5), 0 10px 40px rgba(0,0,0,0.6)' }}
      >
        <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4" stroke="currentColor" strokeWidth="2">
          <path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
        </svg>
        Book Now
      </a>

      {/* Sticky Bottom CTA Bar (mobile) */}
      <div className={`fixed bottom-0 left-0 right-0 z-40 md:hidden transition-all duration-500 ${
        visible ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
      }`} style={{
        background: 'rgba(8,8,8,0.97)',
        backdropFilter: 'blur(20px)',
        borderTop: '1px solid rgba(212,160,23,0.3)',
        boxShadow: '0 -4px 30px rgba(212,160,23,0.1)',
        paddingBottom: 'env(safe-area-inset-bottom)',
      }}>
        <div className="flex items-center justify-between px-5 py-3 gap-3">
          <div>
            <p className="text-white/80 text-xs font-semibold">Ready to book?</p>
            <p className="text-white/40 text-xs">Mississauga · Milton · Oakville</p>
          </div>
          <a
            href={bookHref}
            className="btn-gold py-3 px-6 flex-shrink-0 text-xs"
          >
            Book Now
          </a>
        </div>
      </div>
    </>
  )
}
