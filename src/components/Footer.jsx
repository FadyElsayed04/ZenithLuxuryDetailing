import React from 'react'

export default function Footer() {
  return (
    <footer className="relative pt-16 pb-8 px-6" style={{ borderTop: '1px solid rgba(212,160,23,0.15)' }}>
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center mb-4">
              <img
                src="/logo.png?v=4"
                alt="Zenith Luxury Detailing"
                className="h-20 w-auto"
              />
            </div>
            <p className="text-white/40 text-sm leading-relaxed max-w-xs">
              Premium mobile car detailing serving Mississauga, Milton, and Oakville.
              We come to you - luxury finish, professional results.
            </p>
            <div className="hidden md:flex gap-4 mt-6">
              <a href="https://www.instagram.com/zenithluxurydetailingg/" target="_blank" rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-yellow-400 hover:border-yellow-500/40 transition-all duration-300">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="hidden md:block">
            <h4 className="text-white/60 text-xs tracking-widest uppercase font-semibold mb-5">Quick Links</h4>
            <div className="space-y-3">
              {[
                { label: 'Services', href: '/#services' },
                { label: 'About', href: '/#why' },
                { label: 'Gallery', href: '/#gallery' },
                { label: 'Packages', href: '/packages' },
                { label: 'Add-Ons', href: '/packages#addons' },
                { label: 'Book Now', href: '/packages' },
              ].map(link => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={link.mobileHash ? e => { if (window.innerWidth < 1024) { e.preventDefault(); window.location.hash = link.mobileHash } } : undefined}
                  className="block text-white/40 hover:text-yellow-400 text-sm transition-colors duration-200">
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white/60 text-xs tracking-widest uppercase font-semibold mb-5">Contact</h4>
            <div className="space-y-3">
              <a href="tel:6479241556" className="block text-white/40 hover:text-yellow-400 text-sm transition-colors duration-200">
                647-924-1556
              </a>
              <a href="mailto:zenithluxurydetailing@gmail.com" className="block text-white/40 hover:text-yellow-400 text-sm transition-colors duration-200">
                zenithluxurydetailing@gmail.com
              </a>
              <a href="https://www.instagram.com/zenithluxurydetailingg/" target="_blank" rel="noopener noreferrer"
                className="block text-white/40 hover:text-yellow-400 text-sm transition-colors duration-200">
                @zenithluxurydetailingg
              </a>
              <div className="text-white/30 text-xs mt-4 leading-relaxed">
                Mississauga · Milton · Oakville<br />Ontario, Canada
              </div>
            </div>
          </div>
        </div>

        <div className="divider-gold mb-8" />

        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/25 text-xs">
            © {new Date().getFullYear()} Zenith Luxury Detailing. All rights reserved.
          </p>
          <p className="text-white/20 text-xs">
            Mobile Car Detailing · Mississauga · Milton · Oakville
          </p>
        </div>
      </div>
    </footer>
  )
}
