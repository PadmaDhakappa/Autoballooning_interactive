import {
  Zap, ScanLine, ListOrdered, FileSpreadsheet,
  GitBranch, Layers, RefreshCw, Shield
} from 'lucide-react'

const features = [
  {
    icon: Zap,
    title: 'Instant Balloon Generation',
    desc: 'Upload any engineering drawing and receive a fully ballooned output within seconds. Our engine identifies every measurable feature automatically — no manual markup required.',
  },
  {
    icon: ScanLine,
    title: 'Intelligent Data Extraction',
    desc: 'Automatically reads nominal dimensions, bilateral/unilateral tolerances, GD&T callouts, surface finish requirements, and datum references directly from drawing geometry.',
  },
  {
    icon: ListOrdered,
    title: 'Editable Balloon Sequencing',
    desc: 'Reorder, insert, or remove balloons with a single click. The inspection plan updates in real time, keeping all downstream references and report numbering consistent.',
  },
  {
    icon: FileSpreadsheet,
    title: 'Structured Inspection Plans',
    desc: 'Every balloon auto-populates a quality plan row — nominal value, tolerance, inspection method, and acceptance criteria — ready for CMM programming or FAI reporting.',
  },
  {
    icon: GitBranch,
    title: 'Multi-Stage Inspection Workflow',
    desc: 'Define separate inspection stages (in-process, final, shipping) and assign balloon groups to each stage. Full traceability from drawing to shop floor.',
  },
  {
    icon: Layers,
    title: 'Multi-File & Revision Support',
    desc: 'Process multiple drawing sheets or assembly files in a single session. Revision comparison highlights what changed between Rev A and Rev C automatically.',
  },
  {
    icon: FileSpreadsheet,
    title: 'One-Click Export',
    desc: 'Export inspection plans as Excel, CSV, or PDF. Data maps directly to PPAP, ISIR, or custom templates — compatible with most CMM and MES platforms.',
  },
  {
    icon: Shield,
    title: 'Standards Compliance',
    desc: 'Supports ASME Y14.5, ISO 1101, and ISO 2768 tolerance standards. Flagged deviations are highlighted automatically so your team stays ahead of NCRs.',
  },
]

export default function Features() {
  return (
    <section id="features" className="py-24 bg-dark-900">
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-brand-600/30 bg-brand-950/40 text-brand-400 text-xs font-semibold uppercase tracking-wider mb-4">
            Platform Capabilities
          </div>
          <h2 className="section-heading">Everything Your Team Needs</h2>
          <p className="section-sub">
            A complete auto-ballooning platform engineered for quality engineers who demand
            accuracy, speed, and full traceability at every stage of the inspection lifecycle.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {features.map((f, i) => {
            const Icon = f.icon
            return (
              <div
                key={i}
                className="group feature-card"
                style={{ animationDelay: `${i * 0.05}s` }}
              >
                <div className="w-10 h-10 rounded-xl bg-brand-600/15 border border-brand-600/20 flex items-center justify-center mb-4 group-hover:bg-brand-600/25 transition-colors">
                  <Icon className="w-5 h-5 text-brand-400" />
                </div>
                <h3 className="text-white font-bold text-sm mb-2 leading-snug">{f.title}</h3>
                <p className="text-gray-500 text-xs leading-relaxed">{f.desc}</p>
              </div>
            )
          })}
        </div>

        {/* Bottom CTA stripe */}
        <div className="mt-16 rounded-2xl border border-brand-600/20 bg-gradient-to-r from-brand-950/50 via-dark-800 to-dark-800 p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-white font-bold text-xl mb-1">Ready to eliminate manual ballooning?</h3>
            <p className="text-gray-400 text-sm">
              Join quality teams at leading manufacturers who have cut inspection prep time by over 90%.
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <a
              href="#demo"
              className="px-6 py-3 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-bold text-sm transition-all hover:-translate-y-px shadow-lg shadow-brand-900/40"
            >
              Start Free Demo
            </a>
            <a
              href="#benefits"
              className="px-6 py-3 rounded-xl border border-dark-500 hover:border-dark-400 text-gray-300 hover:text-white font-semibold text-sm transition-all hover:-translate-y-px"
            >
              See ROI →
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
