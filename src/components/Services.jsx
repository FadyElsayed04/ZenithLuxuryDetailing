import React from 'react'
import { useReveal } from '../hooks/useReveal'

const services = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8" stroke="currentColor" strokeWidth="1.5">
        <path d="M5 3h14M5 21h14M12 3v18M5 12h14"/>
        <path d="M8 7h1m2 0h1m2 0h1M8 17h1m2 0h1m2 0h1"/>
      </svg>
    ),
    title: 'Interior Detailing',
    description: 'Deep interior restoration that removes stains, odors, and buildup while sanitizing all surfaces, refreshing materials, and leaving your cabin clean, refined, and like new.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="12" r="9"/>
        <path d="M12 3c0 0 4 4 4 9s-4 9-4 9M12 3c0 0-4 4-4 9s4 9 4 9M3 12h18"/>
        <path d="M4.5 7.5h15M4.5 16.5h15"/>
      </svg>
    ),
    title: 'Exterior Detailing',
    description: 'Comprehensive exterior treatment removing contamination and buildup, refining paint, enhancing depth and gloss, and delivering a long-lasting hydrophobic finish.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8" stroke="currentColor" strokeWidth="1.5">
        <path d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"/>
      </svg>
    ),
    title: 'Full Detail Packages',
    description: 'Complete vehicle transformation combining comprehensive interior and exterior treatments, delivering unmatched cleanliness, gloss, and a true premium showroom finish.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8" stroke="currentColor" strokeWidth="1.5">
        <path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
      </svg>
    ),
    title: 'Maintenance Plans',
    description: 'Scheduled detailing designed for convenience and flexibility, maintaining interior freshness, exterior gloss, and protection to keep your vehicle polished and always ready to impress.',
  },
]

export default function Services() {
  const ref = useReveal()
  return (
    <section id="services" className="py-24 px-6 relative" ref={ref}>
      {/* Background texture */}
      <div className="absolute inset-0 opacity-5 pointer-events-none"
        style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(212,160,23,0.4) 1px, transparent 0)', backgroundSize: '40px 40px' }} />

      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16 reveal">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="w-10 h-px bg-yellow-500" />
            <span className="text-yellow-400/70 text-xs tracking-[0.3em] uppercase">What We Offer</span>
            <div className="w-10 h-px bg-yellow-500" />
          </div>
          <h2 className="section-title">
            <span className="gold-text">Our Services</span>
          </h2>
          <p className="text-white/50 mt-4 max-w-xl mx-auto">
            We come to you at your home, office, or wherever is convenient. Prefer to drop off? We offer drop-off service too.
          </p>
        </div>

        {/* Service Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((s, i) => (
            <div
              key={s.title}
              className="card-dark p-8 rounded-sm reveal group text-center cursor-default"
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full border border-yellow-500/30 text-yellow-400 mb-6 mx-auto transition-all duration-300 group-hover:border-yellow-400 group-hover:text-yellow-300 group-hover:shadow-[0_0_20px_rgba(212,160,23,0.25)]">
                {s.icon}
              </div>
              <h3 className="font-display font-semibold text-lg text-white mb-4 leading-snug transition-colors duration-300 group-hover:text-yellow-400">
                {s.title}
              </h3>
              <p className="text-white/50 text-sm leading-loose">
                {s.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
