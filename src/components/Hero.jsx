import { useState, useEffect } from 'react'
import { ArrowRight, UploadCloud, PlayCircle, CheckCircle2 } from 'lucide-react'

const stats = [
  { value: '95%', label: 'Reduction in prep time' },
  { value: '< 2s', label: 'Per drawing processed' },
  { value: '30+', label: 'Balloon types supported' },
  { value: '0.001mm', label: 'Precision resolution' },
]

const badges = [
  'GD&T Extraction',
  'Auto Sequencing',
  'CMM Ready Export',
  'Multi-format Input',
  'Live Inspection Plans',
]

function CountUp({ target, suffix = '' }) {
  const [display, setDisplay] = useState('0')

  useEffect(() => {
    const isNumeric = !isNaN(parseFloat(target))
    if (!isNumeric) { setDisplay(target); return }
    const end = parseFloat(target)
    const duration = 1800
    const step = 30
    const increment = end / (duration / step)
    let current = 0
    const timer = setInterval(() => {
      current += increment
      if (current >= end) { setDisplay(target); clearInterval(timer) }
      else setDisplay(Math.floor(current).toString() + suffix)
    }, step)
    return () => clearInterval(timer)
  }, [target, suffix])

  return <span>{display}</span>
}

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background layers */}
      <div className="absolute inset-0 bg-grid-pattern opacity-100" />
      <div className="absolute inset-0 bg-radial-glow" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-brand-600/5 rounded-full blur-3xl pointer-events-none" />

      {/* Floating decoration circles */}
      <div className="absolute top-28 right-[8%] w-20 h-20 rounded-full border border-brand-600/30 animate-float hidden lg:block" />
      <div className="absolute top-40 right-[12%] w-10 h-10 rounded-full border border-brand-400/20 animate-float hidden lg:block" style={{ animationDelay: '1s' }} />
      <div className="absolute bottom-36 left-[6%] w-14 h-14 rounded-full border border-brand-600/25 animate-float hidden lg:block" style={{ animationDelay: '2s' }} />

      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
        {/* Brand logo */}
        <div className="flex justify-center mb-6 animate-fade-in">
          <img src="/smorx-logo.jpg" alt="SmorX.ai" className="h-12 w-auto rounded-lg" />
        </div>

        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-brand-600/40 bg-brand-950/60 text-brand-400 text-xs font-semibold tracking-wider uppercase mb-8 animate-fade-in">
          <span className="w-1.5 h-1.5 rounded-full bg-brand-400 animate-pulse-slow" />
          Intelligent Quality Engineering Platform
        </div>

        {/* Headline */}
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold leading-[1.08] tracking-tight mb-6 animate-fade-in" style={{ animationDelay: '0.1s' }}>
          Smart Auto Ballooning
          <br />
          <span className="bg-gradient-to-r from-brand-400 via-brand-300 to-teal-200 bg-clip-text text-transparent">
            for Modern Quality
          </span>
          <br />
          Engineering
        </h1>

        {/* Subheading */}
        <p className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed mb-10 animate-fade-in" style={{ animationDelay: '0.2s' }}>
          Transform engineering drawings into fully structured inspection plans in seconds.
          SmorX.ai extracts dimensions, tolerances, and GD&amp;T callouts automatically —
          eliminating manual effort and delivering traceable, audit-ready quality data.
        </p>

        {/* CTA buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14 animate-fade-in" style={{ animationDelay: '0.3s' }}>
          <a
            href="#demo"
            className="flex items-center gap-2 px-7 py-3.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-bold text-base shadow-xl shadow-brand-900/40 hover:shadow-brand-900/60 transition-all duration-200 hover:-translate-y-0.5 group"
          >
            <UploadCloud className="w-5 h-5" />
            Upload Drawing
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
          <a
            href="#demo"
            className="flex items-center gap-2 px-7 py-3.5 rounded-xl border border-dark-500 hover:border-brand-600/60 bg-dark-700/60 hover:bg-dark-700 text-white font-semibold text-base transition-all duration-200 hover:-translate-y-0.5"
          >
            <PlayCircle className="w-5 h-5 text-brand-400" />
            Explore Live Demo
          </a>
        </div>

        {/* Feature badges */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 mb-16 animate-fade-in" style={{ animationDelay: '0.4s' }}>
          {badges.map(badge => (
            <span
              key={badge}
              className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-dark-700/80 border border-dark-500/60 text-xs text-gray-400 font-medium"
            >
              <CheckCircle2 className="w-3 h-3 text-brand-500" />
              {badge}
            </span>
          ))}
        </div>

        {/* Stats bar */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-px rounded-2xl overflow-hidden border border-dark-600 animate-fade-in" style={{ animationDelay: '0.5s' }}>
          {stats.map((s, i) => (
            <div key={i} className="bg-dark-800/80 backdrop-blur px-6 py-5 text-center">
              <div className="text-2xl sm:text-3xl font-extrabold text-brand-400 mb-1">
                {s.value}
              </div>
              <div className="text-xs text-gray-500 font-medium uppercase tracking-wide">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40">
        <span className="text-xs text-gray-500 tracking-widest uppercase">Scroll</span>
        <div className="w-px h-8 bg-gradient-to-b from-gray-500 to-transparent" />
      </div>
    </section>
  )
}
