import { useState, useMemo } from 'react'
import {
  CheckCircle2, XCircle, Clock, ChevronUp, ChevronDown,
  Filter, Search, Download, TableProperties
} from 'lucide-react'
import { balloonData } from '../data/balloonData'

const TYPE_FILTER_OPTIONS = ['All', 'Dimensional', 'Geometric', 'Surface']
const STATUS_FILTER_OPTIONS = ['All', 'pass', 'fail', 'pending']

const statusConfig = {
  pass:    { icon: CheckCircle2, label: 'Pass',    cls: 'status-pass' },
  fail:    { icon: XCircle,      label: 'Fail',    cls: 'status-fail' },
  pending: { icon: Clock,        label: 'Pending', cls: 'status-pending' },
}

const typeColors = {
  Dimensional: 'text-blue-400',
  Geometric:   'text-purple-400',
  Surface:     'text-amber-400',
}

function SortIcon({ col, sortCol, dir }) {
  if (sortCol !== col) return <ChevronUp className="w-3 h-3 opacity-25" />
  return dir === 'asc'
    ? <ChevronUp className="w-3 h-3 text-brand-400" />
    : <ChevronDown className="w-3 h-3 text-brand-400" />
}

export default function InspectionTable({ selectedBalloon, setSelectedBalloon }) {
  const [sortCol, setSortCol]     = useState('id')
  const [sortDir, setSortDir]     = useState('asc')
  const [search, setSearch]       = useState('')
  const [typeFilter, setTypeFilter]     = useState('All')
  const [statusFilter, setStatusFilter] = useState('All')

  const handleSort = (col) => {
    if (sortCol === col) setSortDir(d => d === 'asc' ? 'desc' : 'asc')
    else { setSortCol(col); setSortDir('asc') }
  }

  const filtered = useMemo(() => {
    let rows = [...balloonData]
    if (search) {
      const q = search.toLowerCase()
      rows = rows.filter(r =>
        r.feature.toLowerCase().includes(q) ||
        r.nominal.toLowerCase().includes(q) ||
        r.inspectionMethod.toLowerCase().includes(q) ||
        String(r.id).includes(q)
      )
    }
    if (typeFilter !== 'All')   rows = rows.filter(r => r.type === typeFilter)
    if (statusFilter !== 'All') rows = rows.filter(r => r.status === statusFilter)

    rows.sort((a, b) => {
      let va = a[sortCol], vb = b[sortCol]
      if (sortCol === 'id') { va = Number(va); vb = Number(vb) }
      else { va = String(va).toLowerCase(); vb = String(vb).toLowerCase() }
      if (va < vb) return sortDir === 'asc' ? -1 : 1
      if (va > vb) return sortDir === 'asc' ?  1 : -1
      return 0
    })
    return rows
  }, [search, typeFilter, statusFilter, sortCol, sortDir])

  const handleExportCSV = () => {
    const headers = ['Balloon No.','Feature','Nominal','Unit','Tolerance','Type','GDT Symbol','Inspection Method','Status','Notes']
    const rows = balloonData.map(b => [
      b.id, b.feature, b.nominal, b.unit, b.tolerance, b.type,
      b.gdtSymbol || '', b.inspectionMethod, b.status, `"${b.notes}"`
    ])
    const csv = [headers, ...rows].map(r => r.join(',')).join('\n')
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'smorx_inspection_plan.csv'
    a.click()
    URL.revokeObjectURL(url)
  }

  const Th = ({ col, label, className = '' }) => (
    <th
      className={`px-4 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider cursor-pointer hover:text-white select-none whitespace-nowrap ${className}`}
      onClick={() => handleSort(col)}
    >
      <span className="flex items-center gap-1">
        {label}
        <SortIcon col={col} sortCol={sortCol} dir={sortDir} />
      </span>
    </th>
  )

  return (
    <section id="inspection" className="py-20 bg-dark-800">
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-brand-600/30 bg-brand-950/40 text-brand-400 text-xs font-semibold uppercase tracking-wider mb-4">
            Inspection Data
          </div>
          <h2 className="section-heading">Structured Inspection Plan</h2>
          <p className="section-sub">
            Every balloon auto-generates a corresponding inspection record.
            Filter, sort, and export your complete quality plan in one click.
          </p>
        </div>

        {/* Table card */}
        <div className="rounded-2xl border border-dark-600 bg-dark-700 overflow-hidden shadow-2xl">

          {/* Controls bar */}
          <div className="flex flex-wrap items-center gap-3 px-5 py-4 border-b border-dark-600 bg-dark-700/80">
            {/* Search */}
            <div className="relative flex-1 min-w-[180px] max-w-xs">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-500" />
              <input
                type="text"
                placeholder="Search features…"
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full pl-8 pr-3 py-2 rounded-lg bg-dark-800 border border-dark-500 text-sm text-gray-200 placeholder-gray-600 focus:outline-none focus:border-brand-600/60 focus:ring-1 focus:ring-brand-600/20"
              />
            </div>

            {/* Type filter */}
            <div className="flex items-center gap-1.5">
              <Filter className="w-3.5 h-3.5 text-gray-500 shrink-0" />
              <div className="flex gap-1">
                {TYPE_FILTER_OPTIONS.map(opt => (
                  <button
                    key={opt}
                    onClick={() => setTypeFilter(opt)}
                    className={`px-2.5 py-1 rounded-md text-xs font-medium transition-colors ${
                      typeFilter === opt
                        ? 'bg-brand-600 text-white'
                        : 'bg-dark-800 text-gray-400 hover:text-white border border-dark-500'
                    }`}
                  >{opt}</button>
                ))}
              </div>
            </div>

            {/* Status filter */}
            <div className="flex gap-1">
              {STATUS_FILTER_OPTIONS.map(opt => {
                const sc = statusConfig[opt]
                return (
                  <button
                    key={opt}
                    onClick={() => setStatusFilter(opt)}
                    className={`px-2.5 py-1 rounded-md text-xs font-medium capitalize transition-colors ${
                      statusFilter === opt
                        ? opt === 'All'
                          ? 'bg-brand-600 text-white'
                          : opt === 'pass'
                          ? 'bg-emerald-600 text-white'
                          : opt === 'fail'
                          ? 'bg-red-600 text-white'
                          : 'bg-amber-600 text-white'
                        : 'bg-dark-800 text-gray-400 hover:text-white border border-dark-500'
                    }`}
                  >{opt === 'All' ? 'All Status' : sc?.label || opt}</button>
                )
              })}
            </div>

            <div className="ml-auto flex items-center gap-3">
              <span className="text-xs text-gray-500">{filtered.length} / {balloonData.length} rows</span>
              <button
                onClick={handleExportCSV}
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-brand-600/20 hover:bg-brand-600/30 border border-brand-600/30 text-brand-400 text-xs font-semibold transition-colors"
              >
                <Download className="w-3.5 h-3.5" />
                Export CSV
              </button>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-dark-800/80 sticky top-0">
                <tr>
                  <Th col="id"                label="No."             className="w-16" />
                  <Th col="feature"           label="Feature"         className="min-w-[180px]" />
                  <Th col="nominal"           label="Nominal Value"   className="min-w-[120px]" />
                  <Th col="tolerance"         label="Tolerance"       className="min-w-[120px]" />
                  <Th col="type"              label="Type"            className="min-w-[110px]" />
                  <Th col="inspectionMethod"  label="Method"          className="min-w-[120px]" />
                  <Th col="status"            label="Status"          className="min-w-[100px]" />
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    GD&amp;T
                  </th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((row, i) => {
                  const sc = statusConfig[row.status] || statusConfig.pending
                  const StatusIcon = sc.icon
                  const isSelected = selectedBalloon?.id === row.id
                  const typeCls = typeColors[row.type] || 'text-gray-400'

                  return (
                    <tr
                      key={row.id}
                      onClick={() => setSelectedBalloon(prev => prev?.id === row.id ? null : row)}
                      className={`border-b border-dark-600/50 cursor-pointer transition-colors ${
                        isSelected
                          ? 'bg-brand-600/15 border-l-2 border-l-brand-500'
                          : i % 2 === 0
                          ? 'bg-dark-700/30 hover:bg-dark-600/40'
                          : 'hover:bg-dark-600/40'
                      }`}
                    >
                      {/* No. */}
                      <td className="px-4 py-3">
                        <span className={`inline-flex items-center justify-center w-7 h-7 rounded-full text-xs font-bold ${
                          isSelected ? 'bg-brand-600 text-white' : 'bg-dark-600 text-gray-300'
                        }`}>
                          {row.id}
                        </span>
                      </td>

                      {/* Feature */}
                      <td className="px-4 py-3 font-medium text-gray-100 max-w-[200px]">
                        <span className="truncate block">{row.feature}</span>
                      </td>

                      {/* Nominal */}
                      <td className="px-4 py-3 font-mono text-brand-300 font-semibold whitespace-nowrap">
                        {row.nominal}
                        {row.unit && <span className="text-gray-500 ml-1 text-xs">{row.unit}</span>}
                      </td>

                      {/* Tolerance */}
                      <td className="px-4 py-3 font-mono text-gray-300 text-xs whitespace-nowrap">
                        {row.tolerance}
                      </td>

                      {/* Type */}
                      <td className={`px-4 py-3 text-xs font-semibold ${typeCls} whitespace-nowrap`}>
                        {row.type}
                      </td>

                      {/* Method */}
                      <td className="px-4 py-3 text-gray-400 text-xs whitespace-nowrap">
                        {row.inspectionMethod}
                      </td>

                      {/* Status */}
                      <td className="px-4 py-3">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${sc.cls}`}>
                          <StatusIcon className="w-3 h-3" />
                          {sc.label}
                        </span>
                      </td>

                      {/* GD&T */}
                      <td className="px-4 py-3 text-center">
                        {row.gdtSymbol
                          ? <span className="text-brand-300 text-lg">{row.gdtSymbol}</span>
                          : <span className="text-gray-600 text-xs">—</span>
                        }
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>

          {/* Table footer */}
          <div className="flex items-center justify-between px-5 py-3 border-t border-dark-600 bg-dark-800/50">
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <TableProperties className="w-3.5 h-3.5" />
              {balloonData.length} features · {balloonData.filter(b => b.status === 'pass').length} passed ·{' '}
              <span className="text-red-400 font-semibold">{balloonData.filter(b => b.status === 'fail').length} failed</span>
            </div>
            <span className="text-xs text-gray-600">SmorX.ai Auto-Ballooning Engine</span>
          </div>
        </div>
      </div>
    </section>
  )
}
