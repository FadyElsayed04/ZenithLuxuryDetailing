import React, { useState, useRef, useEffect, useCallback } from 'react'
import { useReveal } from '../hooks/useReveal'

const galleryImages = [
  { src: '/gallery/ext1.png?v=2',  category: 'Exterior' },
  { src: '/gallery/int1.png?v=2',  category: 'Interior' },
  { src: '/gallery/ext2.png?v=2',  category: 'Exterior' },
  { src: '/gallery/int2.png?v=2',  category: 'Interior' },
  { src: '/gallery/ext3.png?v=2',  category: 'Exterior' },
  { src: '/gallery/int3.png?v=2',  category: 'Interior' },
  { src: '/gallery/ext4.png?v=2',  category: 'Exterior' },
  { src: '/gallery/int4.png?v=2',  category: 'Interior' },
  { src: '/gallery/ext5.png?v=2',  category: 'Exterior' },
  { src: '/gallery/int5.png?v=2',  category: 'Interior' },
  { src: '/gallery/ext6.png?v=2',  category: 'Exterior' },
  { src: '/gallery/int6.png?v=2',  category: 'Interior' },
]

// Before/After pairs
const beforeAfterPairs = [
  {
    before: '/gallery/ba-exterior-before-v4.webp',
    after:  '/gallery/ba-exterior-after-v4.webp',
    label: 'Exterior Transformation',
  },
  {
    before: '/gallery/ba-wheel-before.webp',
    after:  '/gallery/ba-wheel-after.webp',
    label: 'Wheel Detail',
  },
  {
    before: '/gallery/ba-carpet-before.webp',
    after:  '/gallery/ba-carpet-after.webp',
    label: 'Carpet Restoration',
  },
  {
    before: '/gallery/ba-driverseat-before-v6.webp',
    after:  '/gallery/ba-driverseat-after-v6.webp',
    label: 'Interior Restoration',
  },
]

function BeforeAfterSlider({ before, after, label }) {
  const containerRef = useRef(null)
  const [position, setPosition] = useState(50)
  const isDragging = useRef(false)

  // For 16:9 aspect ratio, 25° from vertical: tan(25°) * (9/16) * 100 / 2 ≈ 13.11
  const OFFSET = 13.11
  const topX = position - OFFSET
  const bottomX = position + OFFSET

  const updatePosition = useCallback((clientX) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width))
    setPosition((x / rect.width) * 100)
  }, [])

  const onMouseDown = (e) => { isDragging.current = true; e.preventDefault() }
  const onMouseMove = (e) => { if (isDragging.current) updatePosition(e.clientX) }
  const onMouseUp = () => { isDragging.current = false }
  const onTouchStart = () => { isDragging.current = true }
  const onTouchMove = (e) => { if (isDragging.current) updatePosition(e.touches[0].clientX) }
  const onTouchEnd = () => { isDragging.current = false }

  useEffect(() => {
    window.addEventListener('mouseup', onMouseUp)
    window.addEventListener('mousemove', onMouseMove)
    return () => {
      window.removeEventListener('mouseup', onMouseUp)
      window.removeEventListener('mousemove', onMouseMove)
    }
  }, [onMouseMove])

  return (
    <div className="rounded-sm overflow-hidden relative group">
      <div
        ref={containerRef}
        className="relative select-none cursor-ew-resize overflow-hidden"
        style={{ aspectRatio: '16/9' }}
        onMouseDown={onMouseDown}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        {/* Before image */}
        <img src={before} alt="Before" className="absolute inset-0 w-full h-full object-cover" />

        {/* After image - diagonal clip */}
        <div
          className="absolute inset-0"
          style={{ clipPath: `polygon(0 0, ${topX}% 0, ${bottomX}% 100%, 0 100%)` }}
        >
          <img src={after} alt="After" className="absolute inset-0 w-full h-full object-cover" />
        </div>

        {/* Diagonal divider line via SVG */}
        <svg
          className="absolute inset-0 w-full h-full z-10 pointer-events-none"
          preserveAspectRatio="none"
          viewBox="0 0 100 100"
        >
          <line
            x1={topX} y1="0"
            x2={bottomX} y2="100"
            stroke="#d4a017"
            strokeWidth="0.4"
            style={{ filter: 'drop-shadow(0 0 4px rgba(212,160,23,0.9))' }}
          />
        </svg>

        {/* Handle circle — sits at midpoint of the diagonal */}
        <div
          className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 z-20 w-10 h-10 rounded-full flex items-center justify-center border-2 border-yellow-400"
          style={{ left: `${position}%`, background: '#d4a017', boxShadow: '0 0 20px rgba(212,160,23,0.7)' }}
        >
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-black">
            <path d="M8 5l-5 7 5 7M16 5l5 7-5 7"/>
          </svg>
        </div>

        {/* Labels */}
        <div className="absolute top-4 left-4 z-10 text-xs tracking-widest uppercase font-semibold text-yellow-400 bg-black/60 px-3 py-1 rounded-full">After</div>
        <div className="absolute top-4 right-4 z-10 text-xs tracking-widest uppercase font-semibold text-white/70 bg-black/60 px-3 py-1 rounded-full">Before</div>
      </div>

      <div className="p-4" style={{ background: '#0d0d0d', borderTop: '1px solid rgba(212,160,23,0.15)' }}>
        <p className="text-white/60 text-sm text-center tracking-wide">{label}</p>
      </div>
    </div>
  )
}

export default function Gallery() {
  const [activeFilter, setActiveFilter] = useState('All')
  const [lightbox, setLightbox] = useState(null)
  const ref = useReveal([activeFilter])

  const filters = ['All', 'Exterior', 'Interior']
  const filtered = activeFilter === 'All' ? galleryImages : galleryImages.filter(img => img.category === activeFilter)

  return (
    <section id="gallery" className="py-24 px-6 relative" ref={ref}>
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'radial-gradient(ellipse at 50% 50%, rgba(212,160,23,0.03) 0%, transparent 70%)'
      }} />

      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14 reveal">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="w-10 h-px bg-yellow-500" />
            <span className="text-yellow-400/70 text-xs tracking-[0.3em] uppercase">Our Work</span>
            <div className="w-10 h-px bg-yellow-500" />
          </div>
          <h2 className="section-title">
            <span className="gold-text">Gallery</span>
          </h2>
          <p className="text-white/50 mt-4 max-w-xl mx-auto">
            See the Zenith difference. Every detail, perfected.
          </p>
          <div className="mt-4">
            <a
              href="https://www.instagram.com/zenithluxurydetailingg/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-yellow-400/70 hover:text-yellow-400 text-sm transition-colors"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
              @zenithluxurydetailingg
            </a>
          </div>
        </div>

        {/* Before/After Sliders */}
        <div className="mb-14">
          <h3 className="text-center font-display font-semibold text-xl text-white/80 mb-8 reveal">
            Before &amp; After
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {beforeAfterPairs.map((pair, i) => (
              <div key={i} className={`reveal${i === beforeAfterPairs.length - 1 && beforeAfterPairs.length % 2 !== 0 ? ' md:col-span-2' : ''}`} style={{ transitionDelay: `${i * 100}ms` }}>
                <BeforeAfterSlider {...pair} />
              </div>
            ))}
          </div>
        </div>

        <div className="divider-gold mb-14" />

        {/* Grid Gallery */}
        <div className="mb-8">
          <div className="flex justify-center mb-8 reveal">
            <div className="inline-flex gap-2 p-1 rounded-sm" style={{ background: '#0e0e0e', border: '1px solid rgba(212,160,23,0.2)' }}>
              {filters.map(f => (
                <button
                  key={f}
                  onClick={() => setActiveFilter(f)}
                  className={`px-5 py-2 text-xs tracking-widest uppercase font-medium rounded-sm transition-all duration-300 ${
                    activeFilter === f ? 'text-black' : 'text-white/50 hover:text-white/80'
                  }`}
                  style={activeFilter === f ? {
                    background: 'linear-gradient(135deg, #d4a017, #f0c945)',
                    boxShadow: '0 0 15px rgba(212,160,23,0.3)'
                  } : {}}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          <div key={activeFilter} className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {filtered.map((img, i) => (
              <div
                key={img.src}
                className="relative overflow-hidden rounded-sm cursor-pointer reveal group"
                style={{ aspectRatio: '4/5', transitionDelay: `${i * 60}ms` }}
                onClick={() => setLightbox(img)}
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-10 h-10 rounded-full border border-yellow-400 flex items-center justify-center"
                      style={{ background: 'rgba(212,160,23,0.2)' }}>
                      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 text-yellow-400" stroke="currentColor" strokeWidth="2">
                        <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"/>
                      </svg>
                    </div>
                  </div>
                </div>
                <div className="absolute bottom-2 left-2 text-xs px-2 py-0.5 rounded-full text-white/60" style={{ background: 'rgba(0,0,0,0.7)' }}>
                  {img.category}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: 'rgba(0,0,0,0.95)' }}
          onClick={() => setLightbox(null)}
        >
          <div className="max-w-4xl w-full relative" onClick={e => e.stopPropagation()}>
            <img src={lightbox.src} alt={lightbox.alt} className="w-full rounded-sm" style={{ border: '1px solid rgba(212,160,23,0.3)' }} />
            <p className="text-center text-white/50 text-sm mt-3">{lightbox.alt}</p>
            <button
              onClick={() => setLightbox(null)}
              className="absolute -top-4 -right-4 w-10 h-10 rounded-full bg-yellow-500 text-black font-bold text-xl flex items-center justify-center hover:bg-yellow-400 transition-colors"
            >
              ×
            </button>
          </div>
        </div>
      )}
    </section>
  )
}
