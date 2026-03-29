import { X, CheckCircle2, XCircle, Clock, Ruler, Cog, Info } from 'lucide-react'

const typeColors = {
  Dimensional: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  Geometric:   'bg-purple-500/20 text-purple-400 border-purple-500/30',
  Surface:     'bg-amber-500/20 text-amber-400 border-amber-500/30',
}

const statusConfig = {
  pass:    { icon: CheckCircle2, label: 'PASS',    cls: 'text-emerald-400', badge: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' },
  fail:    { icon: XCircle,      label: 'FAIL',    cls: 'text-red-400',     badge: 'bg-red-500/20 text-red-400 border-red-500/30' },
  pending: { icon: Clock,        label: 'PENDING', cls: 'text-amber-400',   badge: 'bg-amber-500/20 text-amber-400 border-amber-500/30' },
}

function Row({ label, value, mono = false }) {
  return (
    <div className="flex items-start justify-between gap-3 py-2.5 border-b border-dark-600/60 last:border-0">
      <span className="text-xs text-gray-500 uppercase tracking-wide font-medium shrink-0">{label}</span>
      <span className={`text-sm text-right ${mono ? 'font-mono text-brand-300' : 'text-gray-200 font-medium'}`}>
        {value || '—'}
      </span>
    </div>
  )
}

export default function BalloonInfoPanel({ balloon, onClose }) {
  if (!balloon) return null

  const sc = statusConfig[balloon.status] || statusConfig.pending
  const StatusIcon = sc.icon
  const typeCls = typeColors[balloon.type] || 'bg-gray-500/20 text-gray-400 border-gray-500/30'

  return (
    <div className="animate-slide-in flex flex-col h-full">
      {/* Header */}
      <div className="flex items-start justify-between gap-3 mb-5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-brand-600 flex items-center justify-center text-white font-bold text-base shrink-0 shadow-lg shadow-brand-900/50">
            {balloon.id}
          </div>
          <div>
            <h3 className="text-white font-bold text-sm leading-tight">{balloon.feature}</h3>
            <div className="flex items-center gap-2 mt-1">
              <span className={`text-[10px] px-2 py-0.5 rounded-full border font-semibold ${typeCls}`}>
                {balloon.type}
              </span>
              <span className={`flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full border font-semibold ${sc.badge}`}>
                <StatusIcon className="w-3 h-3" />
                {sc.label}
              </span>
            </div>
          </div>
        </div>
        <button
          onClick={onClose}
          className="p-1.5 rounded-lg hover:bg-dark-600 text-gray-500 hover:text-white transition-colors shrink-0"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Main value display */}
      <div className="bg-dark-800 rounded-xl border border-dark-500/60 p-4 mb-4">
        <div className="text-center">
          <div className="text-3xl font-extrabold font-mono text-white mb-1">
            {balloon.nominal}
            {balloon.unit && <span className="text-lg text-gray-400 ml-1 font-semibold">{balloon.unit}</span>}
          </div>
          <div className="text-sm text-brand-400 font-semibold">
            Tol: <span className="text-white font-mono">{balloon.tolerance}</span>
          </div>
          {balloon.gdtSymbol && (
            <div className="mt-2 text-2xl text-brand-300">{balloon.gdtSymbol}</div>
          )}
        </div>
      </div>

      {/* Detail rows */}
      <div className="bg-dark-800/60 rounded-xl border border-dark-600/50 px-4 py-1 mb-4">
        <Row label="Balloon #"          value={`#${balloon.id}`}        mono />
        <Row label="Nominal Value"      value={`${balloon.nominal}${balloon.unit ? ' ' + balloon.unit : ''}`} mono />
        <Row label="Tolerance"          value={balloon.tolerance}        mono />
        <Row label="Feature Type"       value={balloon.type} />
        <Row label="GD&T Symbol"        value={balloon.gdtSymbol} />
        <Row label="Inspection Method"  value={balloon.inspectionMethod} />
      </div>

      {/* Notes */}
      {balloon.notes && (
        <div className="flex gap-2.5 p-3 rounded-xl bg-brand-950/40 border border-brand-800/30">
          <Info className="w-4 h-4 text-brand-500 shrink-0 mt-0.5" />
          <p className="text-xs text-gray-400 leading-relaxed">{balloon.notes}</p>
        </div>
      )}

      {/* Inspection action */}
      <div className="mt-auto pt-4">
        <button className="w-full py-2.5 rounded-xl bg-brand-600/20 hover:bg-brand-600/30 border border-brand-600/30 text-brand-400 text-sm font-semibold transition-colors flex items-center justify-center gap-2">
          <Ruler className="w-4 h-4" />
          Add to Inspection Plan
        </button>
      </div>
    </div>
  )
}
