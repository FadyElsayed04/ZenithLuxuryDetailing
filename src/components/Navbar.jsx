import React, { useState, useEffect } from 'react'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const isPackagesPage = typeof window !== 'undefined' && window.location.pathname === '/packages'

  const desktopLinks = [
    { label: 'Services', href: '/#services' },
    { label: 'About', href: '/#why' },
    { label: 'Gallery', href: '/#gallery' },
    { label: 'Packages', href: isPackagesPage ? '#packages' : '/packages' },
    { label: 'Add-Ons', href: isPackagesPage ? '#addons' : '/packages#addons' },
    { label: 'Contact', href: '/contact' },
  ]

  const mobileLinks = [
    { label: 'Services', href: '/#services' },
    { label: 'Packages', href: '/packages' },
    { label: 'Add-Ons', href: '/packages#addons' },
    { label: 'Gallery', href: '/gallery' },
    { label: 'Contact', href: '/contact' },
  ]

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'nav-scrolled' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* Logo + Desktop Links grouped left */}
        <div className="flex items-center gap-8">
          <a href="/#hero" className="flex items-center group">
            <img
              src="/logo.png?v=4"
              alt="Zenith Luxury Detailing"
              className="h-14 w-auto"
            />
          </a>

          {/* Desktop Links — hidden on tablet and below */}
          <div className="hidden lg:flex items-center gap-8">
            {desktopLinks.map(link => (
              <a
                key={link.href}
                href={link.href}
                className="text-white/70 hover:text-yellow-400 text-sm tracking-widest uppercase transition-colors duration-200 font-medium"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>

        {/* Book Now — desktop only */}
        <a
          href={isPackagesPage ? '#packages' : '/packages'}
          className="hidden lg:block btn-gold text-xs py-3 px-6"
        >
          Book Now
        </a>

        {/* Hamburger — shown on tablet and phone */}
        <button
          className="lg:hidden text-white/80 hover:text-yellow-400 transition-colors"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <div className="w-6 space-y-1.5">
            <span className={`block h-0.5 bg-current transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`block h-0.5 bg-current transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
            <span className={`block h-0.5 bg-current transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </div>
        </button>
      </div>

      {/* Mobile/Tablet Dropdown Menu */}
      <div className={`lg:hidden transition-all duration-300 overflow-hidden ${menuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'}`}
        style={{ background: 'rgba(8,8,8,0.98)', backdropFilter: 'blur(20px)' }}>
        <div className="px-6 pb-6 pt-2 space-y-4">
          {mobileLinks.map(link => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="block text-white/70 hover:text-yellow-400 text-sm tracking-widest uppercase py-2 border-b border-white/5 transition-colors"
            >
              {link.label}
            </a>
          ))}
          <a
            href="/packages"
            onClick={() => setMenuOpen(false)}
            className="block btn-gold text-center mt-4"
          >
            Book Now
          </a>
        </div>
      </div>
    </nav>
  )
}
