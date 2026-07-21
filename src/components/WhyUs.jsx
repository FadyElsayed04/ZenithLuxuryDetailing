import React from 'react'
import { useReveal } from '../hooks/useReveal'

const reasons = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" stroke="currentColor" strokeWidth="1.5">
        <path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"/>
      </svg>
    ),
    title: 'Premium Interior & Exterior Detailing',
    description: 'Every surface is restored using advanced techniques and premium products, delivering a refined, like-new finish inside and out with consistent, quality results.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" stroke="currentColor" strokeWidth="1.5">
        <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
        <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
      </svg>
    ),
    title: 'Mobile Service - We Come to You',
    description: 'We come directly to your home, office, or preferred location, providing a seamless, convenient, and fully professional detailing experience tailored to your schedule and convenience with flexible, reliable service.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" stroke="currentColor" strokeWidth="1.5">
        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
      </svg>
    ),
    title: 'Deep Cleaning & Restoration',
    description: 'Stains, odors, and buildup are fully removed using advanced extraction, steam cleaning, and detailing methods, restoring your interior to a clean, refreshed condition with deep, lasting results.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" stroke="currentColor" strokeWidth="1.5">
        <path d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"/>
      </svg>
    ),
    title: 'Paint Decontamination & Hydrophobic Protection',
    description: 'Advanced treatment removes bonded contaminants and applies durable protection for a smooth surface, enhanced gloss, and long-lasting hydrophobic finish.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" stroke="currentColor" strokeWidth="1.5">
        <path d="M13 10V3L4 14h7v7l9-11h-7z"/>
      </svg>
    ),
    title: 'High-Gloss, Long-Lasting Finish',
    description: 'Premium protection enhances depth and shine while helping your vehicle stay cleaner, glossier, and visually refined with a durable, long-lasting glossy finish and enhanced surface clarity and depth.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" stroke="currentColor" strokeWidth="1.5">
        <path d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/>
        <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
      </svg>
    ),
    title: 'Professional-Grade Equipment & Products',
    description: 'We use high-end tools and premium products including extractors, steam machines, and sealants to achieve consistently superior detailing results.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" stroke="currentColor" strokeWidth="1.5">
        <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
        <path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
      </svg>
    ),
    title: 'Precision Detailing',
    description: 'Every detail is carefully refined, from hidden crevices to finishing touches, ensuring a flawless result with consistent attention, precise care, and meticulous execution throughout every surface.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" stroke="currentColor" strokeWidth="1.5">
        <path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
      </svg>
    ),
    title: 'Fast, Flexible Booking',
    description: 'Easily book online and choose a time that fits your schedule, with flexible availability designed to provide a smooth, convenient, and stress-free experience tailored around your time and preferences.',
  },
]

export default function WhyUs() {
  const ref = useReveal()
  return (
    <section id="why" className="py-24 px-6 relative" ref={ref}>
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'linear-gradient(to bottom, transparent, rgba(212,160,23,0.03) 50%, transparent)',
      }} />

      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 reveal">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="w-10 h-px bg-yellow-500" />
            <span className="text-yellow-400/70 text-xs tracking-[0.3em] uppercase">The Zenith Difference</span>
            <div className="w-10 h-px bg-yellow-500" />
          </div>
          <h2 className="section-title">
            <span className="text-white">Why Choose </span>
            <span className="gold-text">Zenith</span>
          </h2>
          <p className="text-white/50 mt-4 max-w-xl mx-auto">
            We do not just clean vehicles. We restore, refine, and protect them to their finest form.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {reasons.map((r, i) => (
            <div
              key={r.title}
              className="card-dark p-7 rounded-sm reveal group cursor-default"
              style={{
                transitionDelay: `${i * 70}ms`,
                transition: 'border-color 0.3s, box-shadow 0.3s',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.boxShadow = '0 0 25px rgba(212,160,23,0.12)'
                e.currentTarget.style.borderColor = 'rgba(212,160,23,0.35)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.boxShadow = ''
                e.currentTarget.style.borderColor = ''
              }}
            >
              <div className="flex items-center justify-center w-12 h-12 rounded-full border border-yellow-500/30 text-yellow-400 mb-5 group-hover:border-yellow-400/70 group-hover:text-yellow-300 group-hover:shadow-[0_0_16px_rgba(212,160,23,0.2)] transition-all duration-300">
                {r.icon}
              </div>
              <h3 className="font-semibold text-sm text-white mb-3 leading-snug group-hover:text-yellow-400 transition-colors duration-300">{r.title}</h3>
              <p className="text-white/45 text-xs leading-loose">{r.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
