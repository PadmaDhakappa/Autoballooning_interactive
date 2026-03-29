import { useState, useRef, useCallback, useEffect } from 'react'
import {
  ZoomIn, ZoomOut, RotateCcw, Eye, EyeOff, Download,
  MousePointer, Info, FileText
} from 'lucide-react'
import { balloonData, partInfo } from '../data/balloonData'
import EngineeringDrawing from './EngineeringDrawing'
import BalloonInfoPanel from './BalloonInfoPanel'

const ZOOM_MIN = 0.5
const ZOOM_MAX = 4
const ZOOM_STEP = 0.25

export default function DrawingSection({ selectedBalloon, setSelectedBalloon }) {
  const [scale, setScale]         = useState(1)
  const [translate, setTranslate] = useState({ x: 0, y: 0 })
  const [showBalloons, setShowBalloons] = useState(true)
  const [isPanning, setIsPanning] = useState(false)
  const [panStart, setPanStart]   = useState({ x: 0, y: 0 })
  const [panOrigin, setPanOrigin] = useState({ x: 0, y: 0 })
  const containerRef = useRef(null)

  // ── Zoom ──────────────────────────────────────────────────────────
  const zoom = useCallback((delta, cx, cy) => {
    setScale(prev => {
      const next = Math.min(ZOOM_MAX, Math.max(ZOOM_MIN, prev + delta))
      const ratio = next / prev
      setTranslate(t => ({
        x: cx - ratio * (cx - t.x),
        y: cy - ratio * (cy - t.y),
      }))
      return next
    })
  }, [])

  const onWheel = useCallback((e) => {
    e.preventDefault()
    const rect = containerRef.current.getBoundingClientRect()
    const cx = e.clientX - rect.left
    const cy = e.clientY - rect.top
    zoom(e.deltaY < 0 ? ZOOM_STEP : -ZOOM_STEP, cx, cy)
  }, [zoom])

  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    el.addEventListener('wheel', onWheel, { passive: false })
    return () => el.removeEventListener('wheel', onWheel)
  }, [onWheel])

  // ── Pan ───────────────────────────────────────────────────────────
  const onMouseDown = (e) => {
    if (e.button !== 0) return
    // Don't start panning if the target is a balloon (has data-balloon attribute)
    if (e.target.closest('[data-balloon]')) return
    setIsPanning(true)
    setPanStart({ x: e.clientX, y: e.clientY })
    setPanOrigin({ ...translate })
  }

  const onMouseMove = (e) => {
    if (!isPanning) return
    setTranslate({
      x: panOrigin.x + (e.clientX - panStart.x),
      y: panOrigin.y + (e.clientY - panStart.y),
    })
  }

  const onMouseUp = () => setIsPanning(false)

  // ── Reset ─────────────────────────────────────────────────────────
  const reset = () => {
    setScale(1)
    setTranslate({ x: 0, y: 0 })
  }

  // ── Export (mock) ─────────────────────────────────────────────────
  const handleExport = () => {
    const blob = new Blob(
      [JSON.stringify(balloonData, null, 2)],
      { type: 'application/json' }
    )
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'smorx_inspection_plan.json'
    a.click()
    URL.revokeObjectURL(url)
  }

  const passCount    = balloonData.filter(b => b.status === 'pass').length
  const failCount    = balloonData.filter(b => b.status === 'fail').length
  const pendingCount = balloonData.filter(b => b.status === 'pending').length

  return (
    <section id="demo" className="py-20 bg-dark-900">
      <div className="max-w-7xl mx-auto px-6">

        {/* Section header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-brand-600/30 bg-brand-950/40 text-brand-400 text-xs font-semibold uppercase tracking-wider mb-4">
            Interactive Demo
          </div>
          <h2 className="section-heading">Live Drawing Inspection</h2>
          <p className="section-sub">
            Click any balloon to instantly view the full dimensional specification,
            tolerance stack, and inspection method for that feature.
          </p>
        </div>

        {/* Status bar */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-8">
          <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-dark-700 border border-dark-600 text-sm">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
            <span className="text-gray-300">{passCount} Pass</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-dark-700 border border-dark-600 text-sm">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500" />
            <span className="text-gray-300">{failCount} Fail</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-dark-700 border border-dark-600 text-sm">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
            <span className="text-gray-300">{pendingCount} Pending</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-dark-700 border border-dark-600 text-sm">
            <span className="w-2.5 h-2.5 rounded-full bg-brand-500" />
            <span className="text-gray-300">{balloonData.length} Total Balloons</span>
          </div>
        </div>

        {/* Drawing + panel layout */}
        <div className="flex gap-5 items-start">

          {/* Drawing card */}
          <div className="flex-1 min-w-0 rounded-2xl border border-dark-600 bg-dark-800 overflow-hidden shadow-2xl">

            {/* Part info strip */}
            <div className="flex items-center gap-4 px-4 py-2 border-b border-dark-600/60 bg-dark-800/40 text-xs overflow-x-auto">
              <div className="flex items-center gap-1.5 shrink-0">
                <FileText className="w-3 h-3 text-brand-500" />
                <span className="text-gray-400">Part:</span>
                <span className="text-white font-semibold">{partInfo.name}</span>
              </div>
              <span className="text-dark-500">|</span>
              <span className="text-gray-400 shrink-0">No: <span className="text-gray-200 font-mono">{partInfo.partNumber}</span></span>
              <span className="text-dark-500">|</span>
              <span className="text-gray-400 shrink-0">Material: <span className="text-gray-200">{partInfo.material}</span></span>
              <span className="text-dark-500">|</span>
              <span className="text-gray-400 shrink-0">Rev: <span className="text-brand-400 font-semibold">{partInfo.revision}</span></span>
              <span className="text-dark-500">|</span>
              <span className="text-gray-400 shrink-0">Scale: <span className="text-gray-200">{partInfo.scale}</span></span>
              <span className="text-dark-500">|</span>
              <span className="text-gray-400 shrink-0">Customer: <span className="text-gray-200">{partInfo.customer}</span></span>
            </div>

            {/* Toolbar */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-dark-600 bg-dark-700/50">
              <div className="flex items-center gap-1.5">
                <ToolBtn icon={ZoomIn}    onClick={() => zoom(ZOOM_STEP, 300, 200)} title="Zoom In" />
                <ToolBtn icon={ZoomOut}   onClick={() => zoom(-ZOOM_STEP, 300, 200)} title="Zoom Out" />
                <ToolBtn icon={RotateCcw} onClick={reset} title="Reset View" />
                <div className="w-px h-5 bg-dark-500 mx-1" />
                <ToolBtn
                  icon={showBalloons ? Eye : EyeOff}
                  onClick={() => setShowBalloons(v => !v)}
                  title={showBalloons ? 'Hide Balloons' : 'Show Balloons'}
                  active={showBalloons}
                />
              </div>

              <div className="flex items-center gap-3">
                <span className="text-xs text-gray-500 font-mono">{Math.round(scale * 100)}%</span>
                <div className="hidden sm:flex items-center gap-1.5 text-xs text-gray-500">
                  <MousePointer className="w-3 h-3" />
                  <span>Drag to pan · Scroll to zoom</span>
                </div>
                <button
                  onClick={handleExport}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-brand-600/20 hover:bg-brand-600/30 border border-brand-600/30 text-brand-400 text-xs font-semibold transition-colors"
                >
                  <Download className="w-3.5 h-3.5" />
                  Export
                </button>
              </div>
            </div>

            {/* Drawing viewport */}
            <div
              ref={containerRef}
              className={`relative overflow-hidden bg-slate-100 drawing-container ${isPanning ? 'cursor-grabbing' : 'cursor-grab'}`}
              style={{ height: '520px' }}
              onMouseDown={onMouseDown}
              onMouseMove={onMouseMove}
              onMouseUp={onMouseUp}
              onMouseLeave={onMouseUp}
            >
              <div
                style={{
                  transform: `translate(${translate.x}px, ${translate.y}px) scale(${scale})`,
                  transformOrigin: '0 0',
                  transition: isPanning ? 'none' : 'transform 0.05s ease-out',
                  width: '100%',
                  height: '100%',
                }}
              >
                <EngineeringDrawing
                  balloons={balloonData}
                  selectedId={selectedBalloon?.id}
                  onBalloonClick={(b) => setSelectedBalloon(prev => prev?.id === b.id ? null : b)}
                  showBalloons={showBalloons}
                />
              </div>

              {/* Hint overlay (first time) */}
              {!selectedBalloon && (
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 px-4 py-2 rounded-full bg-dark-800/90 border border-dark-600 text-xs text-gray-400 pointer-events-none backdrop-blur-sm">
                  <Info className="w-3.5 h-3.5 text-brand-400 shrink-0" />
                  Click any teal balloon number to inspect that feature
                </div>
              )}
            </div>
          </div>

          {/* Info panel */}
          <div
            className={`w-72 xl:w-80 shrink-0 rounded-2xl border border-dark-600 bg-dark-800 p-5 shadow-2xl transition-all duration-300 ${
              selectedBalloon ? 'opacity-100 translate-x-0' : 'opacity-50'
            }`}
            style={{ minHeight: '520px' }}
          >
            {selectedBalloon ? (
              <BalloonInfoPanel
                balloon={selectedBalloon}
                onClose={() => setSelectedBalloon(null)}
              />
            ) : (
              <EmptyPanel />
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

// ── Small toolbar button ───────────────────────────────────────────
function ToolBtn({ icon: Icon, onClick, title, active = false }) {
  return (
    <button
      onClick={onClick}
      title={title}
      className={`p-1.5 rounded-md transition-colors text-sm ${
        active
          ? 'bg-brand-600/30 text-brand-400'
          : 'text-gray-400 hover:text-white hover:bg-dark-600'
      }`}
    >
      <Icon className="w-4 h-4" />
    </button>
  )
}

// ── Empty panel placeholder ────────────────────────────────────────
function EmptyPanel() {
  return (
    <div className="h-full flex flex-col items-center justify-center text-center gap-4 py-12">
      <div className="w-14 h-14 rounded-full bg-brand-950/50 border border-brand-600/20 flex items-center justify-center">
        <MousePointer className="w-6 h-6 text-brand-600" />
      </div>
      <div>
        <p className="text-white font-semibold mb-1">Select a Feature</p>
        <p className="text-sm text-gray-500 leading-relaxed">
          Click any numbered balloon on the drawing to view its full dimensional
          specification and inspection data.
        </p>
      </div>

      {/* Quick-pick list */}
      <div className="w-full mt-2 space-y-1.5">
        {balloonData.filter(b => b.status === 'fail').map(b => (
          <div key={b.id} className="flex items-center gap-2 px-3 py-2 rounded-lg bg-red-500/10 border border-red-500/20 text-xs">
            <span className="w-5 h-5 rounded-full bg-red-500/30 text-red-400 font-bold flex items-center justify-center text-[10px]">{b.id}</span>
            <span className="text-red-400 font-medium truncate">{b.feature}</span>
          </div>
        ))}
        <p className="text-[10px] text-gray-600 pt-1">↑ Features requiring attention</p>
      </div>
    </div>
  )
}
