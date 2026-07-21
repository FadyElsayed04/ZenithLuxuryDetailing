import React, { useEffect, useRef } from 'react'

export default function Hero() {
  const heroRef = useRef(null)

  useEffect(() => {
    const el = heroRef.current
    if (!el) return
    const onScroll = () => {
      const scrolled = window.scrollY
      el.style.transform = `translateY(${scrolled * 0.4}px)`
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Cinematic Background */}
      <div ref={heroRef} className="absolute inset-0 will-change-transform">
        {/* Dark cinematic gradient overlay */}
        <div className="absolute inset-0 z-10" style={{
          background: 'linear-gradient(to bottom, rgba(8,8,8,0.5) 0%, rgba(8,8,8,0.2) 40%, rgba(8,8,8,0.7) 80%, rgba(8,8,8,1) 100%)'
        }} />
        {/* Car image using Unsplash */}
        <img
          src="https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?w=1920&q=90&auto=format&fit=crop"
          alt="Luxury car detailing"
          className="w-full h-full object-cover"
          style={{ filter: 'brightness(0.45) saturate(0.8)' }}
        />
      </div>

      {/* Cinematic vignette */}
      <div className="absolute inset-0 z-10" style={{
        background: 'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.8) 100%)'
      }} />

      {/* Gold particle line - bottom only, fixed position */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        <div className="absolute bottom-1/4 left-0 right-0 h-px opacity-10" style={{ background: 'linear-gradient(90deg, transparent, #d4a017, transparent)' }} />
      </div>

      {/* Content */}
      <div className="relative z-20 text-center max-w-5xl mx-auto px-6 pb-20 sm:pb-0">
        {/* Logo */}
        <div className="flex justify-center mb-5" style={{ animation: 'fadeUp 0.6s ease-out 0.1s forwards', opacity: 0 }}>
          <img src="/logo.png?v=4" alt="Zenith Luxury Detailing" className="h-24 sm:h-28 w-auto" style={{ mixBlendMode: 'lighten' }} />
        </div>

        {/* Divider line between logo and eyebrow */}
        <div className="flex justify-center mb-5" style={{ animation: 'fadeUp 0.6s ease-out 0.15s forwards', opacity: 0 }}>
          <div className="w-96 h-px opacity-30" style={{ background: 'linear-gradient(90deg, transparent, #d4a017, transparent)' }} />
        </div>

        {/* Eyebrow */}
        <div className="inline-flex items-center gap-3 mb-8" style={{ animation: 'fadeUp 0.6s ease-out 0.2s forwards', opacity: 0 }}>
          <div className="w-12 h-px" style={{ background: '#d4a017' }} />
          <span className="text-yellow-400/80 text-xs tracking-[0.3em] uppercase font-inter font-medium">
            Mississauga · Milton · Oakville
          </span>
          <div className="w-12 h-px" style={{ background: '#d4a017' }} />
        </div>

        {/* Main Headline */}
        <h1
          className="font-display font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-tight mb-6"
          style={{ animation: 'fadeUp 0.8s ease-out 0.4s forwards', opacity: 0 }}
        >
          <span className="block text-white">PREMIUM MOBILE</span>
          <span className="block gold-text mt-2">CAR DETAILING</span>
          <span className="block text-white text-3xl sm:text-4xl md:text-5xl mt-2">IN MISSISSAUGA, MILTON</span>
          <span className="block text-white text-3xl sm:text-4xl md:text-5xl">&amp; OAKVILLE</span>
        </h1>

        {/* Subtext */}
        <p
          className="text-white/60 text-lg md:text-xl font-light tracking-wide mb-12 max-w-2xl mx-auto"
          style={{ animation: 'fadeUp 0.8s ease-out 0.6s forwards', opacity: 0 }}
        >
          Luxury finish. Professional results.{' '}
          <span className="text-yellow-400/80">We come to you.</span>
        </p>

        {/* CTA Buttons */}
        <div
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          style={{ animation: 'fadeUp 0.8s ease-out 0.8s forwards', opacity: 0 }}
        >
          <a
            href="/packages"
            className="btn-gold glow-pulse min-w-[200px] text-center"
          >
            Book Now
          </a>
          <a
            href="/packages"
            className="btn-outline-gold min-w-[200px] text-center"
          >
            View Packages
          </a>
        </div>

      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2">
        <span className="text-white/30 text-xs tracking-widest uppercase">Scroll</span>
        <div className="w-px h-12 overflow-hidden">
          <div className="w-full h-full" style={{
            background: 'linear-gradient(to bottom, #d4a017, transparent)',
            animation: 'float 1.5s ease-in-out infinite'
          }} />
        </div>
      </div>
    </section>
  )
}
