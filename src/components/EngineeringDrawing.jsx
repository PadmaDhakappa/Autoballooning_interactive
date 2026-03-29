// ─────────────────────────────────────────────────────────────────
//  EngineeringDrawing
//  Renders Balloon Drawing_rotated.pdf directly in the browser via
//  PDF.js (no server-side conversion), then overlays interactive
//  teal balloons at positions auto-detected from the original file.
//
//  PDF page dimensions: 792 × 612 pt  (landscape, rotated 270°)
//  Balloon px/py coordinates are in the 3× render space (2376×1836)
// ─────────────────────────────────────────────────────────────────
import { useEffect, useRef, useState, useCallback } from 'react'
import * as pdfjsLib from 'pdfjs-dist'

// Point the worker at the copy in /public
pdfjsLib.GlobalWorkerOptions.workerSrc = '/pdf.worker.mjs'

// Image space the balloon coordinates were measured in
const COORD_W = 2376
const COORD_H = 1836

// Balloon appearance
const R_NORMAL = 36
const R_ACTIVE  = 44
const TEAL      = '#0d9488'
const TEAL_HOT  = '#0f766e'
const TEAL_RING = '#14b8a6'
const STATUS_DOT = { pass: '#10b981', fail: '#ef4444', pending: '#f59e0b' }

// ── Single balloon SVG element ─────────────────────────────────────
function Balloon({ data, isActive, scaleX, scaleY, onClick }) {
  const { id, px, py, status } = data
  // Map from COORD space → actual canvas pixels
  const cx = px * scaleX
  const cy = py * scaleY
  const r  = (isActive ? R_ACTIVE : R_NORMAL) * Math.min(scaleX, scaleY)
  const dotR = 7 * Math.min(scaleX, scaleY)
  const fs = (id >= 10 ? 20 : 22) * Math.min(scaleX, scaleY)
  const dot = STATUS_DOT[status] || STATUS_DOT.pending

  return (
    <g
      onClick={onClick}
      className={`balloon-node ${isActive ? 'active' : ''}`}
      style={{ cursor: 'pointer' }}
    >
      {isActive && (
        <circle cx={cx} cy={cy} r={r + 9 * Math.min(scaleX, scaleY)}
          fill="none" stroke={TEAL_RING} strokeWidth={3 * Math.min(scaleX, scaleY)} opacity="0.45" />
      )}
      <circle cx={cx} cy={cy} r={r}
        fill={isActive ? TEAL_HOT : TEAL}
        stroke={isActive ? TEAL_RING : '#0f766e'}
        strokeWidth={isActive ? 3 * Math.min(scaleX, scaleY) : 2 * Math.min(scaleX, scaleY)}
      />
      <circle
        cx={cx + r * 0.65} cy={cy - r * 0.65}
        r={dotR}
        fill={dot}
        stroke="white"
        strokeWidth={1.5 * Math.min(scaleX, scaleY)}
      />
      <text
        x={cx} y={cy + fs * 0.35}
        textAnchor="middle"
        fontSize={fs}
        fontWeight="800"
        fill="white"
        fontFamily="'Inter', sans-serif"
        style={{ pointerEvents: 'none', userSelect: 'none' }}
      >
        {id}
      </text>
    </g>
  )
}

// ── Main component ─────────────────────────────────────────────────
export default function EngineeringDrawing({ balloons, selectedId, onBalloonClick, showBalloons }) {
  const canvasRef  = useRef(null)
  const wrapperRef = useRef(null)
  const [canvasSize, setCanvasSize] = useState({ w: 0, h: 0 })
  const [loading, setLoading]       = useState(true)
  const [error, setError]           = useState(null)
  const renderTaskRef = useRef(null)

  // ── Render the PDF page onto the canvas ───────────────────────────
  const renderPDF = useCallback(async (pixelRatio) => {
    if (renderTaskRef.current) {
      renderTaskRef.current.cancel()
      renderTaskRef.current = null
    }

    const canvas  = canvasRef.current
    const wrapper = wrapperRef.current
    if (!canvas || !wrapper) return

    try {
      setLoading(true)
      setError(null)

      const loadingTask = pdfjsLib.getDocument('/balloon-diagram.pdf')
      const pdfDoc = await loadingTask.promise
      const page   = await pdfDoc.getPage(1)

      // Render the PDF exactly as-is — no rotation correction
      const probe    = page.getViewport({ scale: 1 })
      const wrapW    = wrapper.clientWidth || 900
      const scale    = (wrapW * pixelRatio) / probe.width
      const viewport = page.getViewport({ scale })

      canvas.width  = viewport.width
      canvas.height = viewport.height
      // CSS size (device-independent)
      canvas.style.width  = `${viewport.width  / pixelRatio}px`
      canvas.style.height = `${viewport.height / pixelRatio}px`

      setCanvasSize({ w: viewport.width / pixelRatio, h: viewport.height / pixelRatio })

      const ctx = canvas.getContext('2d')
      const renderTask = page.render({ canvasContext: ctx, viewport })
      renderTaskRef.current = renderTask
      await renderTask.promise
      renderTaskRef.current = null
      setLoading(false)
    } catch (err) {
      if (err?.name !== 'RenderingCancelledException') {
        console.error('PDF render error:', err)
        setError('Could not render the drawing. Make sure balloon-drawing.pdf is in the public/ folder.')
        setLoading(false)
      }
    }
  }, [])

  // Initial render + re-render on resize
  useEffect(() => {
    const dpr = window.devicePixelRatio || 1
    renderPDF(dpr)

    const ro = new ResizeObserver(() => renderPDF(dpr))
    if (wrapperRef.current) ro.observe(wrapperRef.current)
    return () => ro.disconnect()
  }, [renderPDF])

  // Scale factors: map COORD space (2376×1836) → actual CSS pixels
  const scaleX = canvasSize.w / COORD_W
  const scaleY = canvasSize.h / COORD_H

  return (
    <div ref={wrapperRef} className="relative w-full bg-slate-100">

      {/* Loading skeleton */}
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-100 z-10 min-h-[400px]">
          <div className="flex flex-col items-center gap-3">
            <div className="w-10 h-10 rounded-full border-2 border-brand-600 border-t-transparent animate-spin" />
            <span className="text-sm text-gray-500">Rendering drawing…</span>
          </div>
        </div>
      )}

      {/* Error state */}
      {error && (
        <div className="flex items-center justify-center bg-slate-100 min-h-[300px] p-8">
          <p className="text-red-400 text-sm text-center">{error}</p>
        </div>
      )}

      {/* PDF canvas */}
      <canvas
        ref={canvasRef}
        className="block w-full"
        style={{ display: error ? 'none' : 'block' }}
      />

      {/* SVG balloon overlay — sized in CSS pixels to match canvas */}
      {showBalloons && canvasSize.w > 0 && (
        <svg
          width={canvasSize.w}
          height={canvasSize.h}
          className="absolute top-0 left-0"
          style={{ pointerEvents: 'none' }}
        >
          <g style={{ pointerEvents: 'all' }}>
            {balloons.map(b => (
              <Balloon
                key={b.id}
                data={b}
                isActive={selectedId === b.id}
                scaleX={scaleX}
                scaleY={scaleY}
                onClick={() => onBalloonClick(b)}
              />
            ))}
          </g>
        </svg>
      )}
    </div>
  )
}
