import React from 'react'
import { useReveal } from '../hooks/useReveal'

const areas = [
  {
    city: 'Mississauga',
    desc: 'Full service coverage across Mississauga – Meadowvale, Square One, Erin Mills, Port Credit, Churchill Meadows & surrounding areas.',
    icon: '🏙️',
  },
  {
    city: 'Milton',
    desc: 'Serving all Milton neighbourhoods including Beaty, Clarke, Coates, Ford, Harrison, Timberlea, Willmott, Cobban & surrounding areas.',
    icon: '🌿',
  },
  {
    city: 'Oakville',
    desc: 'Premium mobile detailing across Oakville – Old Oakville, Glen Abbey, Joshua Creek, Clearview, Bronte, River Oaks & surrounding areas.',
    icon: '⚓',
  },
]

export default function ServiceArea() {
  const ref = useReveal()
  return (
    <section id="area" className="py-20 px-6 relative" ref={ref}>
      <div className="divider-gold mb-16" />
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 reveal">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="w-10 h-px bg-yellow-500" />
            <span className="text-yellow-400/70 text-xs tracking-[0.3em] uppercase">Where We Serve</span>
            <div className="w-10 h-px bg-yellow-500" />
          </div>
          <h2 className="section-title">
            <span className="text-white">Service </span>
            <span className="gold-text">Areas</span>
          </h2>
          <p className="text-white/50 mt-4 max-w-xl mx-auto">
            Fully mobile across Mississauga, Milton, and Oakville. We bring our complete setup to your door.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {areas.map((area, i) => (
            <div
              key={area.city}
              className="card-dark p-8 rounded-sm text-center reveal"
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <div className="text-4xl mb-5">{area.icon}</div>
              <h3 className="font-display font-bold text-2xl gold-text mb-3">{area.city}</h3>
              <p className="text-white/40 text-sm leading-relaxed">{area.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 p-6 rounded-sm text-center reveal" style={{
          background: 'rgba(212,160,23,0.04)',
          border: '1px solid rgba(212,160,23,0.15)'
        }}>
          <p className="text-white/50 text-sm">
            <span className="text-yellow-400/80 font-semibold">Fully Mobile Service</span> - We arrive with our own water supply, power, and professional-grade equipment.
            No access to your utilities required.
          </p>
        </div>
      </div>
      <div className="divider-gold mt-16" />
    </section>
  )
}
