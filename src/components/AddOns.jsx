import React from 'react'
import { useReveal } from '../hooks/useReveal'

const addOns = [
  {
    title: 'Leather Conditioning & Protection',
    price: '+$40',
    description: 'Restores leather to a softer, richer finish while adding lasting protection against wear, drying, and cracking over time. Included with Platinum Full Detail.',
    note: 'Only available with Gold Interior or Gold Full Detail.',
    icon: '🪑',
  },
  {
    title: 'Fabric Guard / Upholstery Protection',
    price: '+$40',
    description: 'Applies a protective barrier to fabric surfaces, helping repel spills, resist staining, and maintain a cleaner appearance longer. Included with Platinum Full Detail.',
    note: 'Only available with Gold Interior or Gold Full Detail.',
    icon: '🛡️',
  },
  {
    title: 'Engine Bay Refresh',
    price: '+$60',
    description: 'Engine bay degreased and refreshed to restore a clean, refined appearance while safely removing built-up grime and residue.  Included with Platinum Full Detail.',
    icon: '⚙️',
  },
  {
    title: 'Trim Restoration + Ceramic Protection',
    price: '+$50',
    description: 'Restores faded trim and plastics to a deep, rich finish and locks it in with durable ceramic protection for long-lasting results. Included with Platinum Full Detail.',
    note: 'Only available with an Exterior or Full Detail.',
    icon: '✨',
  },
  {
    title: 'Headlight Restoration',
    price: '+$80',
    description: 'Removes oxidation, haze, and discoloration to restore clarity, improve brightness, and enhance visibility and appearance. Restores a clear, like-new finish.',
    icon: '💡',
  },
  {
    title: 'Pet Hair Removal',
    price: '+$20–$100',
    description: 'Thorough removal of stubborn pet hair from carpets and seats, restoring a cleaner interior finish. Pricing based on severity.',
    note: 'Only available with an Interior or Full Detail.',
    icon: '🐾',
  },
]

export default function AddOns() {
  const ref = useReveal()

  return (
    <section id="addons" className="py-24 px-6 relative" ref={ref}>
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'radial-gradient(ellipse at 50% 0%, rgba(212,160,23,0.04) 0%, transparent 60%)'
      }} />

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-14 reveal">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="w-10 h-px bg-yellow-500" />
            <span className="text-yellow-400/70 text-xs tracking-[0.3em] uppercase">Enhance Your Detail</span>
            <div className="w-10 h-px bg-yellow-500" />
          </div>
          <h2 className="section-title">
            <span className="text-white">Premium </span>
            <span className="gold-text">Add-Ons</span>
          </h2>
          <p className="text-white/50 mt-4 max-w-xl mx-auto">
            Upgrade your detail with any of these premium services. Simply mention your desired add-ons in the notes when booking.
          </p>
        </div>

        {/* Add-On Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {addOns.map((addon, i) => (
            <div
              key={addon.title}
              className="text-left p-6 rounded-sm reveal"
              style={{
                transitionDelay: `${i * 60}ms`,
                background: 'linear-gradient(145deg, #111111, #0d0d0d)',
                border: '1px solid rgba(212,160,23,0.2)',
              }}
            >
              <div className="text-3xl mb-4">{addon.icon}</div>
              <h3 className="font-semibold text-sm leading-snug text-white mb-3">
                {addon.title}
              </h3>
              <p className="text-white/40 text-xs leading-relaxed mb-4">{addon.description}</p>
              {addon.note && (
                <p className="text-yellow-500/50 text-xs leading-relaxed mb-4 italic">{addon.note}</p>
              )}
              <div className="font-display font-bold text-xl text-yellow-400/70">
                {addon.price}
              </div>
            </div>
          ))}
        </div>

        {/* Note */}
        <div className="mt-10 p-5 rounded-sm text-center reveal" style={{
          background: 'rgba(212,160,23,0.04)',
          border: '1px solid rgba(212,160,23,0.15)',
        }}>
          <p className="text-white/40 text-sm">
            <span className="text-yellow-400/70 font-semibold">To add any of these to your booking,</span> mention them in the notes section when scheduling your appointment.
          </p>
        </div>
      </div>
    </section>
  )
}
