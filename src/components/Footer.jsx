import { Mail, Linkedin, Twitter, Github, ExternalLink, ArrowUpRight } from 'lucide-react'

const footerLinks = {
  Product: [
    { label: 'Auto Ballooning', href: '#demo' },
    { label: 'Inspection Plans', href: '#inspection' },
    { label: 'Features', href: '#features' },
    { label: 'Integrations', href: '#' },
    { label: 'Changelog', href: '#' },
  ],
  Solutions: [
    { label: 'Aerospace & Defence', href: '#' },
    { label: 'Automotive', href: '#' },
    { label: 'Medical Devices', href: '#' },
    { label: 'General Manufacturing', href: '#' },
    { label: 'Supplier Quality', href: '#' },
  ],
  Resources: [
    { label: 'Documentation', href: '#' },
    { label: 'API Reference', href: '#' },
    { label: 'Blog', href: '#' },
    { label: 'Case Studies', href: '#' },
    { label: 'GD&T Guide', href: '#' },
  ],
  Company: [
    { label: 'About SmorX', href: '#' },
    { label: 'Contact Us', href: '#' },
    { label: 'Privacy Policy', href: '#' },
    { label: 'Terms of Service', href: '#' },
  ],
}

const socials = [
  { icon: Linkedin, href: '#', label: 'LinkedIn' },
  { icon: Twitter,  href: '#', label: 'Twitter / X' },
  { icon: Github,   href: '#', label: 'GitHub' },
  { icon: Mail,     href: '#', label: 'Email' },
]

export default function Footer() {
  return (
    <footer className="bg-dark-950 border-t border-dark-600/60">

      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-6 gap-10">

          {/* Brand column */}
          <div className="md:col-span-2">
            {/* Logo */}
            <div className="mb-4">
              <img src="/smorx-logo.jpg" alt="SmorX.ai" className="h-9 w-auto rounded-lg" />
            </div>

            <p className="text-gray-500 text-sm leading-relaxed mb-5 max-w-xs">
              Intelligent Manufacturing Solutions. We help quality engineering teams
              move faster, measure smarter, and deliver traceable inspection data
              without the manual overhead.
            </p>

            {/* Social icons */}
            <div className="flex items-center gap-2">
              {socials.map(s => {
                const Icon = s.icon
                return (
                  <a
                    key={s.label}
                    href={s.href}
                    title={s.label}
                    className="w-8 h-8 rounded-lg bg-dark-700 border border-dark-600 hover:border-brand-600/50 hover:bg-brand-950 flex items-center justify-center text-gray-400 hover:text-brand-400 transition-all"
                  >
                    <Icon className="w-3.5 h-3.5" />
                  </a>
                )
              })}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([section, links]) => (
            <div key={section}>
              <h4 className="text-white text-xs font-bold uppercase tracking-widest mb-4">{section}</h4>
              <ul className="space-y-2.5">
                {links.map(link => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-gray-500 hover:text-gray-200 text-sm transition-colors flex items-center gap-1 group"
                    >
                      {link.label}
                      {link.href !== '#' && (
                        <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                      )}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-dark-600/40 bg-dark-950">
        <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-gray-600 text-center sm:text-left">
            © {new Date().getFullYear()}{' '}
            <span className="text-gray-400 font-semibold">SmorX.ai</span>
            {' '}— Intelligent Manufacturing Solutions. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <span className="text-xs text-gray-600">Built for the world's quality engineers</span>
            <span className="text-[10px] px-2 py-0.5 rounded bg-brand-950 border border-brand-800/40 text-brand-600 font-mono">
              v1.0
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}
