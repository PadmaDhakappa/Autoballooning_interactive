import { useState, useEffect } from 'react'
import { Menu, X, Zap } from 'lucide-react'

const navLinks = [
  { label: 'Demo', href: '#demo' },
  { label: 'Inspection', href: '#inspection' },
  { label: 'Features', href: '#features' },
  { label: 'Benefits', href: '#benefits' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-dark-900/95 backdrop-blur-md border-b border-dark-600/60 py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center group">
          <img
            src="/smorx-logo.jpg"
            alt="SmorX.ai"
            className="h-8 w-auto rounded object-contain transition-opacity group-hover:opacity-90"
          />
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map(link => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-gray-400 hover:text-white transition-colors font-medium"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-3">
          <a
            href="#demo"
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-brand-600 hover:bg-brand-500 text-white text-sm font-semibold transition-all duration-200 shadow-lg shadow-brand-900/40 hover:shadow-brand-900/60 hover:-translate-y-px"
          >
            <Zap className="w-3.5 h-3.5" />
            Try Demo
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden p-2 text-gray-400 hover:text-white"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-dark-800 border-t border-dark-600 px-6 py-4 space-y-3 animate-fade-in">
          {navLinks.map(link => (
            <a
              key={link.href}
              href={link.href}
              className="block text-gray-300 hover:text-white text-sm font-medium py-1"
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#demo"
            className="block mt-3 px-4 py-2 rounded-lg bg-brand-600 text-white text-sm font-semibold text-center"
            onClick={() => setMenuOpen(false)}
          >
            Try Demo
          </a>
        </div>
      )}
    </header>
  )
}
