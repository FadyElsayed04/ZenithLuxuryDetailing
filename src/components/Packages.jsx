import React, { useState } from 'react'
import { useReveal } from '../hooks/useReveal'

const Check = () => (
  <svg className="w-4 h-4 text-yellow-400 flex-shrink-0 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
  </svg>
)

// ─── Full Detail ──────────────────────────────────────────────
const silverIncludes = [
  'Interior fully refreshed and dust-free',
  'Crevices, vents, and tight areas cleared',
  'Dash, console, panels, and trim restored to a refined finish',
  'Seats restored to a smooth, natural finish',
  'Carpets and upholstery restored to a clean, uniform look',
  'Floor mats fully cleaned and refreshed',
  'Interior finished with a clean, fresh scent',
  'All glass polished crystal-clear and streak-free',
  'Door jambs cleaned for a neat finish',
  'Wheels, barrels, and lug areas restored',
  'Tires dressed to a satin-black finish',
  'Exterior safely washed and stripped of road film, bugs, tar, and contaminants',
  'Paint left smooth with a clean, glossy finish',
  'Wheel wells cleaned for a uniform look',
  'Body dried to a spotless finish',
]

const goldExtras = [
  'Interior restored to a higher level with enhanced detailing',
  'Dash, console, panels, and trim treated for a deeper finish with added protection and durability',
  'Seats deeply restored for a softer, refined finish',
  'Carpets and upholstery fully restored with stains removed and deep extraction treatment',
  'Floor mats extracted and steam treated',
  'Interior fully sanitized with steam',
  'Advanced stain and salt removal combined with deep extraction',
  'Wheels and tires fully decontaminated for a deeper, refined finish',
  'Paint fully decontaminated for a smooth, glass-like surface',
  'Hydrophobic glass coating applied for improved visibility',
  'Exhaust tips restored and polished',
  'Water spots and mineral buildup removed',
  'High-gloss, hydrophobic sealant applied (up to 8 months protection)',
]

const maintenanceIncludes = [
  'Interior refreshed and dust-free across all surfaces',
  'Vents, seams, and tight areas cleared of buildup',
  'Seats and carpets maintained to a clean, even finish',
  'Floor mats cleaned and refreshed',
  'All glass left crystal-clear and streak-free',
  'Exterior safely washed to maintain a clean, glossy finish',
  'Wheels, tires, and wheel wells refreshed',
  'Tires dressed to a clean satin-black finish',
  'Paint left smooth with a streak-free gloss',
  'Door jambs cleaned for a neat finish',
]

const platinumExtras = [
  'Interior and exterior surfaces protected for longer-lasting results',
  'Leather and fabric surfaces nourished and protected for a richer finish with resistance against spills and staining',
  'Engine bay refreshed to a clean, refined appearance',
  'Exterior trim, plastics, and bumpers restored with ceramic protection',
]

// ─── Interior Only ────────────────────────────────────────────
const interiorSilver = [
  'Interior fully refreshed and dust-free',
  'Crevices, vents, and tight areas cleared',
  'Dash, console, panels, and trim restored to a refined finish',
  'Seats restored to a smooth, natural finish',
  'Carpets and upholstery restored to a clean, uniform look',
  'Floor mats fully cleaned and refreshed',
  'Interior finished with a clean, fresh scent',
  'All glass polished crystal-clear and streak-free',
  'Door jambs cleaned for a neat finish',

]

const interiorGoldExtras = [
  'Interior restored to a higher level with enhanced detailing',
  'Dash, console, panels, and trim treated for a deeper finish with added protection and durability',
  'Seats deeply restored for a softer, refined finish',
  'Carpets and upholstery fully restored with stains removed and deep extraction treatment',
  'Floor mats extracted and steam treated',
  'Interior fully sanitized with steam',
  'Advanced stain and salt removal combined with deep extraction',
]

// ─── Exterior Only ────────────────────────────────────────────
const exteriorSilver = [
  'Wheels, barrels, and lug areas restored',
  'Tires dressed to a satin-black finish',
  'Exterior safely washed and stripped of road film, bugs, tar, and contaminants',
  'Paint left smooth with a clean, glossy finish',
  'Wheel wells cleaned for a uniform look',
  'Body dried to a spotless finish',
]

const exteriorGoldExtras = [
  'Wheels and tires fully decontaminated for a deeper, refined finish',
  'Paint fully decontaminated for a smooth, glass-like surface',
  'Hydrophobic glass coating applied for improved visibility',
  'Exhaust tips restored and polished',
  'Water spots and mineral buildup removed',
  'High-gloss, hydrophobic sealant applied (up to 8 months protection)',
]

const vehicleTypes = ['Sedan', 'SUV', 'Large SUV / Van / Truck']
const serviceTypeTabs = ['Full Detail', 'Interior Only', 'Exterior Only', 'Maintenance']

export default function Packages() {
  const [selectedVehicle, setSelectedVehicle] = useState(0)
  const [serviceTab, setServiceTab] = useState(0)
  const ref = useReveal([serviceTab, selectedVehicle])

  const silverFullPrices = ['$189', '$249', '$279']
  const goldFullPrices = ['$309', '$379', '$399']
  const platinumPrices = ['$379', '$459', '$489']

  // Interior Only
  const interiorSilverPrices = ['$119', '$149', '$169']
  const interiorGoldPrices = ['$199', '$229', '$249']

  // Exterior Only
  const exteriorSilverPrices = ['$99', '$129', '$139']
  const exteriorGoldPrices = ['$149', '$189', '$199']

  return (
    <section id="packages" className="py-24 px-6 relative" ref={ref}>
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'radial-gradient(ellipse at 50% 50%, rgba(212,160,23,0.04) 0%, transparent 70%)'
      }} />

      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-10 reveal">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="w-10 h-px bg-yellow-500" />
            <span className="text-yellow-400/70 text-xs tracking-[0.3em] uppercase">Pricing</span>
            <div className="w-10 h-px bg-yellow-500" />
          </div>
          <h2 className="section-title">
            <span className="gold-text">Our Packages</span>
          </h2>
          <p className="text-white/50 mt-4 max-w-xl mx-auto">
            Choose the perfect level of care for your vehicle.
          </p>
        </div>

        {/* ─── Service Type Tabs ─────────────────────────────── */}
        <div className="flex flex-col items-center gap-3 mb-10 reveal">
          <div className="inline-flex flex-wrap justify-center p-1 rounded-sm gap-1" style={{ background: '#0a0a0a', border: '1px solid rgba(212,160,23,0.25)' }}>
            {serviceTypeTabs.map((tab, i) => (
              <button
                key={tab}
                onClick={() => setServiceTab(i)}
                className={`relative px-5 py-3 text-xs tracking-widest uppercase font-semibold rounded-sm transition-all duration-300 ${
                  serviceTab === i ? 'text-black' : 'text-white/50 hover:text-white/80'
                }`}
                style={serviceTab === i ? {
                  background: 'linear-gradient(135deg, #d4a017, #f0c945)',
                  boxShadow: '0 0 20px rgba(212,160,23,0.45)',
                } : {}}
              >
                {i === 0 && (
                  <span className="absolute -top-2 left-1/2 -translate-x-1/2 text-[9px] tracking-wider uppercase text-yellow-900 font-bold px-2 py-0.5 rounded-full"
                    style={{ background: '#f0c945', whiteSpace: 'nowrap' }}>
                    Best Value
                  </span>
                )}
                {tab}
              </button>
            ))}
          </div>

          {serviceTab !== 0 && serviceTab !== 3 && (
            <p className="text-yellow-400/60 text-xs tracking-wide">
              💡 <span className="text-white/40">Best value:</span>{' '}
              <button onClick={() => setServiceTab(0)} className="underline text-yellow-400/80 hover:text-yellow-400 transition-colors">
                Full detail packages save more
              </button>
            </p>
          )}
          {serviceTab === 0 && (
            <p className="text-white/30 text-xs tracking-wide">
              Full detail = interior + exterior &rarr; Platinum is our only combined package
            </p>
          )}
          {serviceTab === 3 && (
            <p className="text-white/30 text-xs tracking-wide">
              Available within 30 days of a Silver / Gold detail
            </p>
          )}
        </div>

        {/* ─── Vehicle Selector ──────────────────────────────── */}
        <div className={`flex justify-center mb-12 reveal ${serviceTab === 3 ? 'opacity-0 pointer-events-none h-0 mb-0 overflow-hidden' : ''}`}>
          <div className="inline-flex p-1 rounded-sm" style={{ background: '#0e0e0e', border: '1px solid rgba(212,160,23,0.2)' }}>
            {vehicleTypes.map((type, i) => (
              <button
                key={type}
                onClick={() => setSelectedVehicle(i)}
                className={`px-5 py-2.5 text-xs tracking-widest uppercase font-medium transition-all duration-300 rounded-sm ${
                  selectedVehicle === i ? 'text-black font-semibold' : 'text-white/50 hover:text-white/80'
                }`}
                style={selectedVehicle === i ? {
                  background: 'linear-gradient(135deg, #d4a017, #f0c945)',
                  boxShadow: '0 0 20px rgba(212,160,23,0.4)'
                } : {}}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        {/* ═══════════════════════════════════════════════════════
            TAB: FULL DETAIL
        ═══════════════════════════════════════════════════════ */}
        {serviceTab === 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">

            {/* Silver */}
            <div className="card-dark rounded-sm overflow-hidden reveal" style={{ transitionDelay: '0ms' }}>
              <div className="p-8 border-b border-white/5">
                <span className="text-xs tracking-widest uppercase text-white/40 font-medium">Interior + Exterior</span>
                <h3 className="font-display font-bold text-3xl text-white mt-2 mb-1">Silver</h3>
                <p className="text-white/40 text-sm mb-6">Complete inside-and-out refresh with a professional hand wash and protection boost.</p>
                <div className="flex items-baseline gap-2">
                  <span className="font-display font-bold text-5xl gold-text">{silverFullPrices[selectedVehicle]}</span>
                </div>
                <div className="text-white/40 text-xs mt-2 tracking-wide">{vehicleTypes[selectedVehicle]}</div>
                <a href="https://calendly.com/zenithluxurydetailing/silver-interior-detailing-clone?" target="_blank" rel="noopener noreferrer"
                  className="block btn-outline-gold text-center w-full mt-6">
                  Book Silver
                </a>
              </div>
              <div className="p-8 space-y-3">
                {silverIncludes.map(item => (
                  <div key={item} className="flex items-start gap-3">
                    <Check /><span className="text-white/60 text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Gold - Most Popular */}
            <div className="rounded-sm reveal relative" style={{
              transitionDelay: '100ms',
              background: 'linear-gradient(145deg, #141414, #0f0f0f)',
              border: '1px solid rgba(212,160,23,0.7)',
              boxShadow: '0 0 40px rgba(212,160,23,0.15), 0 20px 60px rgba(0,0,0,0.6)',
            }}>
              <span className="absolute -top-4 left-1/2 -translate-x-1/2 px-5 py-1.5 text-xs tracking-widest uppercase font-bold text-black rounded-full"
                style={{ background: 'linear-gradient(135deg, #d4a017, #f0c945)', boxShadow: '0 0 15px rgba(212,160,23,0.5)', whiteSpace: 'nowrap' }}>
                Most Popular
              </span>
              <div className="p-8 border-b border-white/5">
                <span className="text-xs tracking-widest uppercase text-yellow-400/60 font-medium">Interior + Exterior</span>
                <h3 className="font-display font-bold text-3xl gold-text mt-2 mb-1">Gold</h3>
                <p className="text-white/40 text-sm mb-6">Deep restoration and advanced protection with premium results inside and out.</p>
                <div className="flex items-baseline gap-2">
                  <span className="font-display font-bold text-5xl gold-text">{goldFullPrices[selectedVehicle]}</span>
                </div>
                <div className="text-white/40 text-xs mt-2 tracking-wide">{vehicleTypes[selectedVehicle]}</div>
                <a href="https://calendly.com/zenithluxurydetailing/silver-interior-exterior-detailing-clone?" target="_blank" rel="noopener noreferrer"
                  className="block btn-gold text-center w-full mt-6 glow-pulse">
                  Book Gold
                </a>
              </div>
              <div className="p-8">
                <p className="text-yellow-400/70 text-xs tracking-widest uppercase mb-4 font-semibold">Everything in Silver, plus:</p>
                <div className="space-y-3">
                  {goldExtras.map(item => (
                    <div key={item} className="flex items-start gap-3">
                      <Check /><span className="text-white/70 text-sm">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Platinum */}
            <div className="card-dark rounded-sm overflow-hidden reveal" style={{ transitionDelay: '200ms' }}>
              <div className="p-8 border-b border-white/5">
                <span className="text-xs tracking-widest uppercase text-white/40 font-medium">Interior + Exterior</span>
                <h3 className="font-display font-bold text-3xl text-white mt-2 mb-1">Platinum</h3>
                <p className="text-white/40 text-sm mb-6">Full interior and exterior transformation with premium protection and long-lasting results.</p>
                <div className="flex items-baseline gap-2">
                  <span className="font-display font-bold text-5xl gold-text">{platinumPrices[selectedVehicle]}</span>
                </div>
                <div className="text-white/40 text-xs mt-2 tracking-wide">{vehicleTypes[selectedVehicle]}</div>
                <a href="https://calendly.com/zenithluxurydetailing/gold-interior-exterior-detailing-clone?" target="_blank" rel="noopener noreferrer"
                  className="block btn-outline-gold text-center w-full mt-6">
                  Book Platinum
                </a>
              </div>
              <div className="p-8">
                <p className="text-yellow-400/70 text-xs tracking-widest uppercase mb-4 font-semibold">Everything in Gold, plus:</p>
                <div className="space-y-3">
                  {platinumExtras.map(item => (
                    <div key={item} className="flex items-start gap-3">
                      <Check /><span className="text-white/60 text-sm">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>
        )}

        {/* ═══════════════════════════════════════════════════════
            TAB: INTERIOR ONLY
        ═══════════════════════════════════════════════════════ */}
        {serviceTab === 1 && (
          <div>
            {/* Upsell banner */}
            <div className="mb-8 p-4 rounded-sm flex flex-col sm:flex-row items-center justify-between gap-4 reveal"
              style={{ background: 'rgba(212,160,23,0.06)', border: '1px solid rgba(212,160,23,0.2)' }}>
              <div className="flex items-center gap-3">
                <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 text-yellow-400 flex-shrink-0" stroke="currentColor" strokeWidth="2">
                  <path d="M13 10V3L4 14h7v7l9-11h-7z"/>
                </svg>
                <p className="text-white/60 text-sm">
                  <span className="text-yellow-400 font-semibold">Save more with a Full Detail.</span>{' '}
                  Interior + Exterior together is better value than separate bookings.
                </p>
              </div>
              <button onClick={() => setServiceTab(0)}
                className="btn-gold py-2.5 px-5 text-xs flex-shrink-0 whitespace-nowrap">
                View Full Detail
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
              {/* Interior Silver */}
              <div className="card-dark rounded-sm overflow-hidden reveal" style={{ transitionDelay: '0ms' }}>
                <div className="p-8 border-b border-white/5">
                  <span className="text-xs tracking-widest uppercase text-white/40 font-medium">Interior Only</span>
                  <h3 className="font-display font-bold text-3xl text-white mt-2 mb-1">Silver Interior</h3>
                  <p className="text-white/40 text-sm mb-6">Refined cleaning restoring all surfaces and glass to a crisp, fresh finish.</p>
                  <div className="flex items-baseline gap-2">
                    <span className="font-display font-bold text-5xl gold-text">{interiorSilverPrices[selectedVehicle]}</span>
                  </div>
                  <div className="text-white/40 text-xs mt-2 tracking-wide">{vehicleTypes[selectedVehicle]}</div>
                  <a href="https://calendly.com/zenithluxurydetailing/interior-detailing-silver?" target="_blank" rel="noopener noreferrer"
                    className="block btn-outline-gold text-center w-full mt-6">
                    Book Interior Silver
                  </a>
                </div>
                <div className="p-8 space-y-3">
                  {interiorSilver.map(item => (
                    <div key={item} className="flex items-start gap-3">
                      <Check /><span className="text-white/60 text-sm">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Interior Gold */}
              <div className="rounded-sm overflow-hidden reveal relative" style={{
                transitionDelay: '100ms',
                background: 'linear-gradient(145deg, #141414, #0f0f0f)',
                border: '1px solid rgba(212,160,23,0.6)',
                boxShadow: '0 0 30px rgba(212,160,23,0.12)',
              }}>
                <div className="absolute inset-x-0 top-0 h-0.5" style={{ background: 'linear-gradient(90deg, transparent, #d4a017, transparent)' }} />
                <div className="p-8 border-b border-white/5 mt-1">
                  <span className="text-xs tracking-widest uppercase text-yellow-400/60 font-medium">Interior Only</span>
                  <h3 className="font-display font-bold text-3xl gold-text mt-2 mb-1">Gold Interior</h3>
                  <p className="text-white/40 text-sm mb-6">Deep extraction with advanced stain removal for a fully rejuvenated, premium finish.</p>
                  <div className="flex items-baseline gap-2">
                    <span className="font-display font-bold text-5xl gold-text">{interiorGoldPrices[selectedVehicle]}</span>
                  </div>
                  <div className="text-white/40 text-xs mt-2 tracking-wide">{vehicleTypes[selectedVehicle]}</div>
                  <a href="https://calendly.com/zenithluxurydetailing/interior-detailing-silver-clone?" target="_blank" rel="noopener noreferrer"
                    className="block btn-gold text-center w-full mt-6 glow-pulse">
                    Book Interior Gold
                  </a>
                </div>
                <div className="p-8">
                  <p className="text-yellow-400/70 text-xs tracking-widest uppercase mb-4 font-semibold">Everything in Silver, plus:</p>
                  <div className="space-y-3">
                    {interiorGoldExtras.map(item => (
                      <div key={item} className="flex items-start gap-3">
                        <Check /><span className="text-white/70 text-sm">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ═══════════════════════════════════════════════════════
            TAB: EXTERIOR ONLY
        ═══════════════════════════════════════════════════════ */}
        {serviceTab === 2 && (
          <div>
            {/* Upsell banner */}
            <div className="mb-8 p-4 rounded-sm flex flex-col sm:flex-row items-center justify-between gap-4 reveal"
              style={{ background: 'rgba(212,160,23,0.06)', border: '1px solid rgba(212,160,23,0.2)' }}>
              <div className="flex items-center gap-3">
                <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 text-yellow-400 flex-shrink-0" stroke="currentColor" strokeWidth="2">
                  <path d="M13 10V3L4 14h7v7l9-11h-7z"/>
                </svg>
                <p className="text-white/60 text-sm">
                  <span className="text-yellow-400 font-semibold">Save more with a Full Detail.</span>{' '}
                  Interior + Exterior together is better value than separate bookings.
                </p>
              </div>
              <button onClick={() => setServiceTab(0)}
                className="btn-gold py-2.5 px-5 text-xs flex-shrink-0 whitespace-nowrap">
                View Full Detail
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
              {/* Exterior Silver */}
              <div className="card-dark rounded-sm overflow-hidden reveal" style={{ transitionDelay: '0ms' }}>
                <div className="p-8 border-b border-white/5">
                  <span className="text-xs tracking-widest uppercase text-white/40 font-medium">Exterior Only</span>
                  <h3 className="font-display font-bold text-3xl text-white mt-2 mb-1">Silver Exterior</h3>
                  <p className="text-white/40 text-sm mb-6">Wheels and paint thoroughly cleansed, leaving a smooth, glossy, and spot-free finish.</p>
                  <div className="flex items-baseline gap-2">
                    <span className="font-display font-bold text-5xl gold-text">{exteriorSilverPrices[selectedVehicle]}</span>
                  </div>
                  <div className="text-white/40 text-xs mt-2 tracking-wide">{vehicleTypes[selectedVehicle]}</div>
                  <a href="https://calendly.com/zenithluxurydetailing/interior-detailing-silver-clone-1?" target="_blank" rel="noopener noreferrer"
                    className="block btn-outline-gold text-center w-full mt-6">
                    Book Exterior Silver
                  </a>
                </div>
                <div className="p-8 space-y-3">
                  {exteriorSilver.map(item => (
                    <div key={item} className="flex items-start gap-3">
                      <Check /><span className="text-white/60 text-sm">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Exterior Gold */}
              <div className="rounded-sm overflow-hidden reveal relative" style={{
                transitionDelay: '100ms',
                background: 'linear-gradient(145deg, #141414, #0f0f0f)',
                border: '1px solid rgba(212,160,23,0.6)',
                boxShadow: '0 0 30px rgba(212,160,23,0.12)',
              }}>
                <div className="absolute inset-x-0 top-0 h-0.5" style={{ background: 'linear-gradient(90deg, transparent, #d4a017, transparent)' }} />
                <div className="p-8 border-b border-white/5 mt-1">
                  <span className="text-xs tracking-widest uppercase text-yellow-400/60 font-medium">Exterior Only</span>
                  <h3 className="font-display font-bold text-3xl gold-text mt-2 mb-1">Gold Exterior</h3>
                  <p className="text-white/40 text-sm mb-6">Full decontamination with water spot removal and a deep, high-gloss finish.</p>
                  <div className="flex items-baseline gap-2">
                    <span className="font-display font-bold text-5xl gold-text">{exteriorGoldPrices[selectedVehicle]}</span>
                  </div>
                  <div className="text-white/40 text-xs mt-2 tracking-wide">{vehicleTypes[selectedVehicle]}</div>
                  <a href="https://calendly.com/zenithluxurydetailing/interior-detailing-gold-clone?" target="_blank" rel="noopener noreferrer"
                    className="block btn-gold text-center w-full mt-6 glow-pulse">
                    Book Exterior Gold
                  </a>
                </div>
                <div className="p-8">
                  <p className="text-yellow-400/70 text-xs tracking-widest uppercase mb-4 font-semibold">Everything in Silver, plus:</p>
                  <div className="space-y-3">
                    {exteriorGoldExtras.map(item => (
                      <div key={item} className="flex items-start gap-3">
                        <Check /><span className="text-white/70 text-sm">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ═══════════════════════════════════════════════════════
            TAB: MAINTENANCE
        ═══════════════════════════════════════════════════════ */}
        {serviceTab === 3 && (
          <div className="max-w-2xl mx-auto">
            <div className="rounded-sm overflow-hidden reveal" style={{
              background: 'linear-gradient(145deg, #141414, #0f0f0f)',
              border: '1px solid rgba(212,160,23,0.5)',
              boxShadow: '0 0 40px rgba(212,160,23,0.1)',
            }}>
              <div className="absolute inset-x-0 top-0 h-0.5 relative" style={{ background: 'linear-gradient(90deg, transparent, #d4a017, transparent)' }} />

              <div className="p-8 border-b border-white/5">
                <span className="text-xs tracking-widest uppercase text-yellow-400/60 font-medium">For Returning Clients</span>
                <h3 className="font-display font-bold text-3xl gold-text mt-2 mb-1">Maintenance Detail</h3>
                <p className="text-white/40 text-sm mb-6">Ongoing maintenance designed to preserve a clean, refined, and consistently well-kept appearance between full details.</p>
                <div className="flex items-baseline gap-2">
                  <span className="font-display font-bold text-5xl gold-text">Custom</span>
                </div>
                <div className="text-white/40 text-xs mt-2 tracking-wide">Quoted per visit</div>
                <div className="mt-1 text-yellow-400/60 text-xs">Frequency discounts: weekly · bi-weekly · monthly</div>
                <a href="https://zenithluxurydetailing.com/contact"
                  className="block btn-gold text-center w-full mt-6 glow-pulse">
                  Get a Quote
                </a>
              </div>

              <div className="p-8 grid grid-cols-1 sm:grid-cols-2 gap-8">
                {/* What's included */}
                <div>
                  <p className="text-yellow-400/70 text-xs tracking-widest uppercase mb-4 font-semibold">Tailored Each Visit</p>
                  <div className="space-y-3">
                    {[
                      'Full interior refreshed and dust-free',
                      'Vents, seams, and tight areas cleared',
                      'Seats and carpets left clean and even',
                      'All floor mats cleaned and refreshed',
                      'All glass crystal-clear and streak-free',
                      'Exterior safely washed and refreshed',
                      'Wheels, tires, and wells refreshed',
                      'Tires dressed to a satin-black finish',
                      'Paint left smooth with a fresh gloss',
                      'Door jambs cleaned for a neat finish',
                    ].map(item => (
                      <div key={item} className="flex items-start gap-3">
                        <Check /><span className="text-white/60 text-sm">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Eligibility & details */}
                <div className="space-y-5">
                  <div className="p-4 rounded-sm border border-yellow-500/20" style={{ background: 'rgba(212,160,23,0.05)' }}>
                    <p className="text-yellow-400/70 text-xs font-semibold tracking-wider uppercase mb-2">Eligibility</p>
                    <p className="text-white/50 text-sm leading-relaxed">Available within <span className="text-white/80">30 days</span> of a Silver, Gold, or Platinum detail. Past this window, a refresh may be required.</p>
                  </div>
                  <div className="p-4 rounded-sm border border-yellow-500/20" style={{ background: 'rgba(212,160,23,0.05)' }}>
                    <p className="text-yellow-400/70 text-xs font-semibold tracking-wider uppercase mb-3">Schedule Options</p>
                    <div className="flex gap-2 flex-wrap">
                      {['Weekly', 'Bi-weekly', 'Monthly'].map(opt => (
                        <span key={opt} className="text-xs px-3 py-1 rounded-full text-white/60 border border-white/10">{opt}</span>
                      ))}
                    </div>
                  </div>
                  <div className="p-4 rounded-sm border border-yellow-500/20" style={{ background: 'rgba(212,160,23,0.05)' }}>
                    <p className="text-yellow-400/70 text-xs font-semibold tracking-wider uppercase mb-2">How It Works</p>
                    <p className="text-white/50 text-sm leading-relaxed">Pick what you want cleaned each visit. We tailor every appointment to your priorities.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Important Notes */}
        <div className="mt-10 p-6 rounded-sm reveal" style={{ background: 'rgba(212,160,23,0.04)', border: '1px solid rgba(212,160,23,0.15)' }}>
          <p className="text-yellow-400/70 text-xs tracking-widest uppercase font-semibold mb-4">Important Notes</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {[
              'A $30 deposit is required to book online, deducted from your final payment.',
              'Heavy staining, smoke odor, mold, or excessive dirt may require a surcharge.',
              'Pet hair pricing varies by severity ($20–$100).',
              'Please remove all personal items before your appointment.',
              'Center console will only be serviced if emptied due to personal and sensitive items.',
              'Removal of stubborn stickers may require additional time and a $20 fee.',
            ].map(note => (
              <div key={note} className="flex items-start gap-2 text-sm text-white/40">
                <span className="text-yellow-500/60 mt-0.5 flex-shrink-0">•</span>
                {note}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
