import { Clock, Target, TrendingUp, GitMerge, Users, Award } from 'lucide-react'

const benefits = [
  {
    icon: Clock,
    metric: '90%',
    label: 'Faster Prep',
    title: 'Dramatically Reduced Inspection Setup',
    desc: 'What once took a quality engineer hours — cross-referencing drawing callouts, building spreadsheets, assigning methods — is completed automatically in seconds.',
    gradient: 'from-brand-600/20 to-transparent',
    border: 'border-brand-600/20',
    iconBg: 'bg-brand-600/20',
    metricColor: 'text-brand-400',
  },
  {
    icon: Target,
    metric: '0.001mm',
    label: 'Resolution',
    title: 'Higher Measurement Reliability',
    desc: 'Eliminating manual transcription removes the most common source of inspection errors. Every tolerance, datum, and GD&T callout is captured exactly as drawn — consistently, every time.',
    gradient: 'from-purple-600/20 to-transparent',
    border: 'border-purple-600/20',
    iconBg: 'bg-purple-600/20',
    metricColor: 'text-purple-400',
  },
  {
    icon: TrendingUp,
    metric: '100%',
    label: 'Traceability',
    title: 'Standardised Quality Processes',
    desc: 'Consistent balloon numbering, fixed inspection sequences, and exportable plans mean every operator follows the same methodology — whether at your facility or a supplier.',
    gradient: 'from-emerald-600/20 to-transparent',
    border: 'border-emerald-600/20',
    iconBg: 'bg-emerald-600/20',
    metricColor: 'text-emerald-400',
  },
  {
    icon: GitMerge,
    metric: '∞',
    label: 'Integrations',
    title: 'Seamless Digital Workflow',
    desc: 'Export directly to Excel, CSV, CMM programs, or your MES. SmorX fits into existing quality systems rather than replacing them — zero disruption, immediate productivity.',
    gradient: 'from-amber-600/20 to-transparent',
    border: 'border-amber-600/20',
    iconBg: 'bg-amber-600/20',
    metricColor: 'text-amber-400',
  },
]

const testimonialStats = [
  { value: '99.8%', label: 'Extraction Accuracy' },
  { value: '4.9/5', label: 'User Satisfaction' },
]

export default function Benefits() {
  return (
    <section id="benefits" className="py-24 bg-dark-800 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-brand-600/30 bg-brand-950/40 text-brand-400 text-xs font-semibold uppercase tracking-wider mb-4">
            Why SmorX.ai
          </div>
          <h2 className="section-heading">Real Impact on Your Quality Floor</h2>
          <p className="section-sub">
            Designed with manufacturing quality engineers in mind — the results speak for themselves.
          </p>
        </div>

        {/* Benefit cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {benefits.map((b, i) => {
            const Icon = b.icon
            return (
              <div
                key={i}
                className={`relative rounded-2xl border ${b.border} p-7 overflow-hidden group hover:-translate-y-1 transition-all duration-300`}
                style={{ background: `linear-gradient(135deg, ${b.gradient.replace('from-', '').replace(' to-transparent', '')} 0%, transparent 100%)` }}
              >
                {/* Background gradient blob */}
                <div className={`absolute -top-10 -right-10 w-32 h-32 rounded-full blur-2xl opacity-20 bg-gradient-to-br ${b.gradient}`} />

                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-5">
                    <div className={`w-12 h-12 rounded-xl ${b.iconBg} flex items-center justify-center`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="text-right">
                      <div className={`text-3xl font-extrabold ${b.metricColor}`}>{b.metric}</div>
                      <div className="text-xs text-gray-500 font-medium">{b.label}</div>
                    </div>
                  </div>
                  <h3 className="text-white font-bold text-lg mb-2">{b.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{b.desc}</p>
                </div>
              </div>
            )
          })}
        </div>

        {/* Stats bar */}
        <div className="grid grid-cols-2 gap-px rounded-2xl overflow-hidden border border-dark-600">
          {testimonialStats.map((s, i) => (
            <div key={i} className="bg-dark-700/80 backdrop-blur px-6 py-7 text-center">
              <div className="text-3xl font-extrabold text-white mb-1">{s.value}</div>
              <div className="text-xs text-gray-500 font-medium uppercase tracking-wide">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Trust badges */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-6 opacity-50">
          {['ISO 9001 Compatible', 'IATF 16949 Ready', 'AS9100 Supported', 'PPAP / FAI Export', 'ASME Y14.5'].map(badge => (
            <div key={badge} className="flex items-center gap-2 text-xs text-gray-400 font-medium">
              <Award className="w-3.5 h-3.5 text-brand-500" />
              {badge}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
