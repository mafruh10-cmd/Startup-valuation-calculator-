import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  TrendingUp, BarChart2, DollarSign, Layers, Lock,
  CheckCircle, Star, RefreshCw, Download, PlusCircle,
} from 'lucide-react'
import { INDUSTRY_MULTIPLES, STAGES, formatCurrency, formatCurrencyFull } from '../lib/valuationEngine.js'
import { ConfidenceGauge } from './ui/shared.jsx'

// ─── Startup logo with Clearbit + initial fallback ────────────────────────────
function StartupLogo({ domain, name, size = 28 }) {
  const [errored, setErrored] = useState(false)
  const initials = name.slice(0, 2).toUpperCase()
  const colors = ['bg-violet-500', 'bg-blue-500', 'bg-emerald-500', 'bg-amber-500', 'bg-rose-500', 'bg-cyan-500']
  const color = colors[name.charCodeAt(0) % colors.length]

  if (errored) {
    return (
      <div
        className={`${color} rounded-lg flex items-center justify-center text-white font-bold flex-shrink-0`}
        style={{ width: size, height: size, fontSize: size * 0.36 }}
      >
        {initials}
      </div>
    )
  }

  return (
    <img
      src={`https://logo.clearbit.com/${domain}`}
      alt={name}
      width={size}
      height={size}
      onError={() => setErrored(true)}
      className="rounded-lg object-contain flex-shrink-0 bg-white border border-gray-100 dark:border-gray-700"
      style={{ width: size, height: size }}
    />
  )
}

// ─── Method metadata + startup examples ──────────────────────────────────────
const METHOD_META = {
  blended: {
    label: 'Blended Valuation',
    shortLabel: 'Blended',
    icon: Layers,
    color: 'brand',
    description: 'A weighted average of all applicable methods, calibrated to your startup stage. Weights shift from qualitative to quantitative as the company matures.',
    whenUsed: 'Always applied — weights shift from qualitative to quantitative as the company matures.',
    startups: [
      { name: 'Stripe', domain: 'stripe.com', valuation: '$20M pre-money', year: 2012, note: 'Blended across VC method and scorecard by Sequoia & a16z at Series A' },
      { name: 'Airbnb', domain: 'airbnb.com', valuation: '$2.4M post-money', year: 2009, note: 'Sequoia blended Berkus + scorecard for the seed round before any revenue' },
      { name: 'Notion', domain: 'notion.so', valuation: '$10M pre-money', year: 2018, note: 'Seed investors averaged qualitative and early revenue metrics for valuation' },
    ],
  },
  berkus: {
    label: 'Berkus Method',
    shortLabel: 'Berkus',
    icon: Star,
    color: 'purple',
    description: 'Five qualitative factors (Team, Product, Market, Traction, GTM) each worth up to $500K. Max $2.5M.',
    whenUsed: 'Best for pre-seed and seed stages where there is little or no revenue.',
    formula: 'Sum of (score/10 × $500K) for each of 5 factors. Maximum: $2.5M.',
    startups: [
      { name: 'Airbnb', domain: 'airbnb.com', valuation: '~$1.5M', year: 2008, note: 'No revenue; YC priced the round on team quality and idea strength — classic Berkus criteria' },
      { name: 'Dropbox', domain: 'dropbox.com', valuation: '~$1.5M–$2M', year: 2007, note: 'Pre-launch file-sync concept valued entirely on prototype quality and founding team' },
      { name: 'Fitbit', domain: 'fitbit.com', valuation: '~$1M–$2M', year: 2007, note: 'Hardware prototype with no revenue; angels scored team, concept, and working prototype' },
    ],
  },
  scorecard: {
    label: 'Scorecard Method',
    shortLabel: 'Scorecard',
    icon: BarChart2,
    color: 'blue',
    description: 'Applies weighted qualitative scores against a $5M regional baseline to derive a risk-adjusted valuation.',
    whenUsed: 'Most accurate for seed-stage companies with limited financial history.',
    formula: 'Baseline ($5M) × weighted score × 2. Weights: Team 30%, Market 25%, Product 15%, Traction 15%, GTM 10%, Competitive Advantage 5%.',
    startups: [
      { name: 'Uber', domain: 'uber.com', valuation: '~$5.4M pre-money', year: 2010, note: 'Benchmarked against SF marketplace peers; above-average team and market size score' },
      { name: 'Canva', domain: 'canva.com', valuation: '~$3.6M pre-money', year: 2012, note: 'AU regional baseline; strong management score offset smaller local market size' },
      { name: 'Warby Parker', domain: 'warbyparker.com', valuation: '~$2.5M pre-money', year: 2010, note: 'Scored on founding team pedigree (Wharton MBAs) and strategic supplier partnerships' },
    ],
  },
  arrMultiple: {
    label: 'ARR Multiple',
    shortLabel: 'ARR ×',
    icon: DollarSign,
    color: 'amber',
    description: 'Applies an industry-specific revenue multiple to ARR (or annualised MRR). A quick but widely used investor benchmark.',
    whenUsed: 'Applied when the startup has measurable ARR or MRR.',
    formula: 'ARR × Industry Multiple. SaaS: 8×, AI SaaS: 15×, Fintech: 6×, Marketplace: 5×, E-Commerce Software: 4×, Other B2B: 5×.',
    startups: [
      { name: 'Snowflake', domain: 'snowflake.com', valuation: '~$12.4B', year: 2020, note: 'Valued at ~23× forward ARR driven by 174% NRR and over 100% revenue growth' },
      { name: 'Zoom', domain: 'zoom.us', valuation: '~$1B', year: 2017, note: 'SaaS video with clear ARR visibility; valued at ~20× ARR on rapid enterprise adoption' },
      { name: 'HubSpot', domain: 'hubspot.com', valuation: '~$200M', year: 2011, note: 'B2B SaaS valued at ~12–13× ARR by Sequoia as benchmark for the inbound marketing category' },
    ],
  },
  vcPerspective: {
    label: 'VC Perspective',
    shortLabel: 'VC Perspective',
    icon: TrendingUp,
    color: 'emerald',
    description: 'Discounts the projected exit value back to today using the VC\'s required rate of return and expected dilution.',
    whenUsed: 'Always calculated — uses your inputs if provided, otherwise auto-estimated from stage benchmarks.',
    formula: 'PV = Exit Value ÷ (1 + Return Rate)^Years × (1 − Dilution)',
    startups: [
      { name: 'Instagram', domain: 'instagram.com', valuation: '~$25M pre-money', year: 2011, note: 'Benchmark projected a Facebook acquisition exit; acquired for $1B just 12 months later' },
      { name: 'Twitter', domain: 'twitter.com', valuation: '~$20M pre-money', year: 2007, note: 'USV back-calculated from a $1B+ ad revenue exit thesis at a 30%+ IRR target' },
      { name: 'Stripe', domain: 'stripe.com', valuation: '~$20M pre-money', year: 2012, note: 'Sequoia projected $1B+ acquisition; discounted at 40–50% IRR for developer payments category' },
    ],
  },
}

const colorMap = {
  brand:   { bg: 'bg-brand-50 dark:bg-brand-500/10',    text: 'text-brand-600 dark:text-brand-400',    icon: 'bg-brand-100 dark:bg-brand-500/20',    border: 'border-brand-200 dark:border-brand-500/40',   activeBg: 'bg-brand-500',   activeText: 'text-white' },
  purple:  { bg: 'bg-purple-50 dark:bg-purple-500/10',  text: 'text-purple-600 dark:text-purple-400',  icon: 'bg-purple-100 dark:bg-purple-500/20',  border: 'border-purple-200 dark:border-purple-500/40', activeBg: 'bg-purple-500',  activeText: 'text-white' },
  blue:    { bg: 'bg-blue-50 dark:bg-blue-500/10',      text: 'text-blue-600 dark:text-blue-400',      icon: 'bg-blue-100 dark:bg-blue-500/20',      border: 'border-blue-200 dark:border-blue-500/40',     activeBg: 'bg-blue-500',    activeText: 'text-white' },
  emerald: { bg: 'bg-emerald-50 dark:bg-emerald-500/10',text: 'text-emerald-600 dark:text-emerald-400',icon: 'bg-emerald-100 dark:bg-emerald-500/20',border: 'border-emerald-200 dark:border-emerald-500/40',activeBg: 'bg-emerald-500', activeText: 'text-white' },
  amber:   { bg: 'bg-amber-50 dark:bg-amber-500/10',    text: 'text-amber-600 dark:text-amber-400',    icon: 'bg-amber-100 dark:bg-amber-500/20',    border: 'border-amber-200 dark:border-amber-500/40',   activeBg: 'bg-amber-500',   activeText: 'text-white' },
  rose:    { bg: 'bg-rose-50 dark:bg-rose-500/10',      text: 'text-rose-600 dark:text-rose-400',      icon: 'bg-rose-100 dark:bg-rose-500/20',      border: 'border-rose-200 dark:border-rose-500/40',     activeBg: 'bg-rose-500',    activeText: 'text-white' },
}

// ─── Method Detail Panel ──────────────────────────────────────────────────────
function MethodDetailPanel({ methodKey, value, results, inputs, onAddVCAssumptions }) {
  const meta = METHOD_META[methodKey]
  const c = colorMap[meta.color]
  const Icon = meta.icon
  const isApplicable = value > 0

  return (
    <div className={`rounded-2xl p-5 border ${c.bg} ${c.border}`}>
      {/* Header row */}
      <div className="flex items-start gap-3 mb-4">
        <div className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 ${c.icon}`}>
          <Icon size={18} className={c.text} />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-gray-900 dark:text-white text-sm">{meta.label}</h3>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{meta.whenUsed}</p>
        </div>
        <div className="text-right flex-shrink-0">
          <p className={`text-xl font-bold ${isApplicable ? c.text : 'text-gray-300 dark:text-gray-700'}`}>
            {isApplicable ? formatCurrency(value) : 'N/A'}
          </p>
        </div>
      </div>

      <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed mb-3">{meta.description}</p>

      {/* Formula */}
      {meta.formula && (
        <div className="rounded-lg p-2.5 bg-white/70 dark:bg-gray-900/50 border border-white dark:border-gray-700 mb-4">
          <p className="text-xs font-mono text-gray-600 dark:text-gray-300 leading-relaxed">{meta.formula}</p>
        </div>
      )}

      {/* Berkus score breakdown */}
      {methodKey === 'berkus' && isApplicable && (
        <div className="grid grid-cols-5 gap-1.5 text-center mb-4">
          {['Team', 'Product', 'Market', 'Traction', 'GTM'].map((label, i) => {
            const keys = ['team', 'product', 'market', 'traction', 'gtm']
            const score = inputs[keys[i]] || 1
            return (
              <div key={label} className="rounded-lg p-2 bg-white/60 dark:bg-white/5 text-xs">
                <div className="font-bold text-gray-900 dark:text-white">{score}/10</div>
                <div className="text-gray-400 text-[10px]">{label}</div>
                <div className={`${c.text} font-semibold text-[10px]`}>${((score / 10) * 500).toFixed(0)}K</div>
              </div>
            )
          })}
        </div>
      )}

      {/* ARR Multiple calc */}
      {methodKey === 'arrMultiple' && isApplicable && results?.arrDetails && (
        <div className="rounded-lg p-2.5 bg-white/60 dark:bg-white/5 text-xs text-gray-600 dark:text-gray-400 mb-4">
          {formatCurrencyFull(results.arrDetails.arrUsed)}{' '}
          {results.arrDetails.source === 'mrr_annualised' ? '(MRR × 12) ' : ''}ARR ×{' '}
          {results.arrDetails.multiple}× ({INDUSTRY_MULTIPLES[inputs.industry]?.label})
          {' '}= <span className={`font-bold ${c.text}`}>{formatCurrency(value)}</span>
        </div>
      )}

      {/* VC Perspective assumptions */}
      {methodKey === 'vcPerspective' && isApplicable && results?.vcDetails?.assumptions && (() => {
        const a = results.vcDetails.assumptions
        return (
          <div className="rounded-lg p-2.5 bg-white/60 dark:bg-white/5 text-xs text-gray-600 dark:text-gray-400 mb-4 space-y-1.5">
            {a.autoEstimated && (
              <p className="text-amber-600 dark:text-amber-400 font-medium">
                Auto-estimated from stage benchmarks. Add your own assumptions in Step 4 to refine this.
              </p>
            )}
            <div className="grid grid-cols-2 gap-2">
              <div><span className="text-gray-400">Exit Value:</span> <span className="font-semibold">{formatCurrency(a.exitValue)}</span></div>
              <div><span className="text-gray-400">Return Rate:</span> <span className="font-semibold">{(a.returnRate * 100).toFixed(0)}%</span></div>
              <div><span className="text-gray-400">Years:</span> <span className="font-semibold">{a.years}</span></div>
              <div><span className="text-gray-400">Dilution:</span> <span className="font-semibold">{(a.dilution * 100).toFixed(0)}%</span></div>
            </div>
            {a.autoEstimated && onAddVCAssumptions && (
              <button onClick={onAddVCAssumptions} className="btn-secondary text-xs mt-2 w-full">
                <PlusCircle size={12} />
                Edit investor assumptions
              </button>
            )}
          </div>
        )
      })()}

      {/* Real-world startup examples */}
      {meta.startups && (
        <div className="border-t border-current/10 pt-4 space-y-2">
          <p className="text-xs font-semibold text-gray-600 dark:text-gray-400 mb-3">
            Real startups valued by this method
          </p>
          {meta.startups.map(s => (
            <div key={s.name} className="flex items-center gap-3 p-2.5 rounded-xl bg-white/60 dark:bg-white/5 border border-white/80 dark:border-white/5">
              <StartupLogo domain={s.domain} name={s.name} size={30} />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-xs font-semibold text-gray-900 dark:text-white">{s.name}</span>
                  <span className={`text-xs font-semibold ${c.text}`}>{s.valuation}</span>
                  <span className="text-[10px] text-gray-400 dark:text-gray-500">{s.year}</span>
                </div>
                <p className="text-[11px] text-gray-500 dark:text-gray-400 mt-0.5 leading-relaxed">{s.note}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

// ─── Results Preview (blurred background behind the modal) ───────────────────
export function ResultsPreview({ results, inputs }) {
  const { blended, berkus, scorecard, arrMultiple, vcPerspective, confidence } = results
  const stage = inputs.stage || 'preseed'

  const methods = [
    { key: 'blended',       value: blended },
    { key: 'berkus',        value: berkus },
    { key: 'scorecard',     value: scorecard },
    { key: 'arrMultiple',   value: arrMultiple },
    { key: 'vcPerspective', value: vcPerspective },
  ].filter(m => m.value > 0)

  return (
    <div className="space-y-5">
      {/* Hero */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-brand-500 via-brand-600 to-purple-700 p-6 text-white shadow-xl">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(255,255,255,0.15),_transparent_70%)]" />
        <div className="relative z-10">
          <p className="text-brand-200 text-sm font-medium mb-1">
            {inputs.startupName || 'Your Startup'} · {STAGES[stage]?.label}
          </p>
          <div className="flex items-end justify-between gap-4 mt-3">
            <div>
              <p className="text-4xl font-black">{formatCurrency(blended)}</p>
              <p className="text-brand-200 text-xs mt-1">
                Range: {formatCurrency(blended * 0.75)} – {formatCurrency(blended * 1.35)}
              </p>
            </div>
            <ConfidenceGauge score={confidence} />
          </div>
        </div>
      </div>

      {/* Method cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {methods.map(({ key, value }) => {
          const meta = METHOD_META[key]
          const c = colorMap[meta.color]
          const Icon = meta.icon
          return (
            <div key={key} className="rounded-xl p-3.5 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800">
              <div className={`w-7 h-7 rounded-lg flex items-center justify-center mb-2 ${c.icon}`}>
                <Icon size={14} className={c.text} />
              </div>
              <p className="text-[11px] text-gray-500 dark:text-gray-400 font-medium">{meta.shortLabel}</p>
              <p className="text-sm font-bold text-gray-900 dark:text-white">{formatCurrency(value)}</p>
            </div>
          )
        })}
      </div>

      {/* Fake detail panel placeholder */}
      <div className="rounded-2xl p-5 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 space-y-3">
        <div className="h-4 w-2/3 rounded bg-gray-100 dark:bg-gray-800" />
        <div className="h-3 w-full rounded bg-gray-100 dark:bg-gray-800" />
        <div className="h-3 w-5/6 rounded bg-gray-100 dark:bg-gray-800" />
        <div className="h-3 w-4/6 rounded bg-gray-100 dark:bg-gray-800" />
        <div className="mt-4 space-y-2">
          {[1, 2, 3].map(i => (
            <div key={i} className="flex items-center gap-3 p-2.5 rounded-xl bg-gray-50 dark:bg-gray-800">
              <div className="w-8 h-8 rounded-lg bg-gray-200 dark:bg-gray-700 flex-shrink-0" />
              <div className="flex-1 space-y-1.5">
                <div className="h-3 w-1/3 rounded bg-gray-200 dark:bg-gray-700" />
                <div className="h-2.5 w-2/3 rounded bg-gray-200 dark:bg-gray-700" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Inputs summary placeholder */}
      <div className="rounded-xl p-4 bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800">
        <div className="h-3.5 w-1/3 rounded bg-gray-200 dark:bg-gray-700 mb-3" />
        <div className="grid grid-cols-3 gap-3">
          {[...Array(9)].map((_, i) => (
            <div key={i} className="space-y-1">
              <div className="h-2.5 w-full rounded bg-gray-200 dark:bg-gray-700" />
              <div className="h-3 w-2/3 rounded bg-gray-200 dark:bg-gray-700" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ─── Lead Capture Modal (shown as overlay on top of blurred preview) ──────────
export function LeadCaptureModal({ onSubmit, results, inputs }) {
  const [form, setForm] = useState({ name: '', email: '' })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)

  const { blended, confidence } = results
  const startupName = inputs.startupName

  function validate() {
    const e = {}
    if (!form.name.trim()) e.name = 'Please enter your full name.'
    if (!form.email.trim()) e.email = 'Please enter your email address.'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Please enter a valid email address.'
    return e
  }

  async function handleSubmit(ev) {
    ev.preventDefault()
    const e = validate()
    if (Object.keys(e).length) { setErrors(e); return }
    setLoading(true)
    await new Promise(r => setTimeout(r, 900))
    onSubmit(form)
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.94, y: 16 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ type: 'spring', stiffness: 380, damping: 32 }}
      className="w-full max-w-sm bg-white dark:bg-gray-900 rounded-2xl shadow-2xl overflow-hidden"
      onClick={e => e.stopPropagation()}
    >
      {/* Gradient header strip */}
      <div className="bg-gradient-to-br from-brand-500 via-brand-600 to-purple-700 px-6 pt-6 pb-8 text-white text-center relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(255,255,255,0.15),_transparent_70%)]" />
        <div className="relative z-10">
          <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center mx-auto mb-3">
            <TrendingUp size={22} className="text-white" />
          </div>
          <h3 className="text-lg font-bold">Your valuation is ready</h3>
          {blended > 0 && (
            <p className="text-3xl font-black mt-1 tracking-tight">{formatCurrency(blended)}</p>
          )}
          <p className="text-brand-200 text-xs mt-1">
            {confidence}% confidence · {STAGES[inputs.stage]?.label}
          </p>
        </div>
      </div>

      {/* Form body — pulled up to overlap the gradient strip */}
      <div className="px-6 pb-6 -mt-4">
        <div className="bg-white dark:bg-gray-900 rounded-xl pt-4 space-y-4">
          <p className="text-sm text-gray-600 dark:text-gray-400 text-center leading-relaxed">
            Enter your details to unlock {startupName ? <strong>{startupName}'s</strong> : 'your'} full valuation breakdown and investor-ready report.
          </p>

          <form onSubmit={handleSubmit} className="space-y-3" noValidate>
            <div>
              <label className="label">Full Name</label>
              <input
                type="text"
                value={form.name}
                onChange={e => { setForm(f => ({ ...f, name: e.target.value })); setErrors(er => ({ ...er, name: '' })) }}
                placeholder="Jane Smith"
                className={`input-field ${errors.name ? 'border-red-400 focus:ring-red-400' : ''}`}
                autoComplete="name"
                autoFocus
              />
              {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
            </div>

            <div>
              <label className="label">Email Address</label>
              <input
                type="email"
                value={form.email}
                onChange={e => { setForm(f => ({ ...f, email: e.target.value })); setErrors(er => ({ ...er, email: '' })) }}
                placeholder="jane@startup.com"
                className={`input-field ${errors.email ? 'border-red-400 focus:ring-red-400' : ''}`}
                autoComplete="email"
              />
              {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
            </div>

            <button type="submit" disabled={loading} className="btn-primary w-full">
              {loading ? (
                <>
                  <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Unlocking…
                </>
              ) : (
                <>
                  <Download size={15} />
                  Unlock full valuation report
                </>
              )}
            </button>

            <p className="text-xs text-center text-gray-400 dark:text-gray-600">
              No spam. Used only to send your report.
            </p>
          </form>
        </div>
      </div>
    </motion.div>
  )
}

// ─── Full Results Dashboard ───────────────────────────────────────────────────
export function FullResults({ results, inputs, leadData, onReset, onAddVCAssumptions }) {
  const [activeMethod, setActiveMethod] = useState('blended')
  const [showSuccess, setShowSuccess] = useState(true)

  const { blended, berkus, scorecard, arrMultiple, vcPerspective, confidence, vcAutoEstimated } = results
  const stage = inputs.stage || 'preseed'

  // Build the ordered list of method cards to display
  const methodCards = [
    { key: 'blended',       value: blended,       always: true },
    { key: 'berkus',        value: berkus,         always: true },
    { key: 'scorecard',     value: scorecard,      always: true },
    { key: 'arrMultiple',   value: arrMultiple,    always: false },
    { key: 'vcPerspective', value: vcPerspective,  always: true },
  ].filter(m => m.always || m.value > 0)

  return (
    <div className="space-y-6">
      {/* Success banner */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            className="rounded-xl p-4 bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900
                       flex items-start gap-3"
          >
            <CheckCircle size={18} className="text-emerald-600 dark:text-emerald-400 mt-0.5 flex-shrink-0" />
            <div className="flex-1">
              <p className="text-sm font-semibold text-emerald-800 dark:text-emerald-300">
                Thank you, {leadData.name.split(' ')[0]}! Your full report is on its way.
              </p>
              <p className="text-xs text-emerald-700 dark:text-emerald-400 mt-0.5">
                Sent to <strong>{leadData.email}</strong>
              </p>
            </div>
            <button onClick={() => setShowSuccess(false)} className="text-emerald-500 hover:text-emerald-700 transition-colors">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M12 4L4 12M4 4l8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            {inputs.startupName || 'Your Startup'}
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {STAGES[stage]?.label} · {INDUSTRY_MULTIPLES[inputs.industry]?.label} · Full Valuation Report
          </p>
        </div>
        <ConfidenceGauge score={confidence} />
      </div>

      {/* Blended hero */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-brand-500 via-brand-600 to-purple-700 p-5 text-white shadow-xl shadow-brand-500/20">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(255,255,255,0.12),_transparent)]" />
        <div className="relative z-10">
          <p className="text-brand-200 text-xs font-medium mb-0.5">Blended Valuation</p>
          <p className="text-3xl font-black">{formatCurrency(blended)}</p>
          <p className="text-brand-200 text-xs mt-1">
            Conservative: {formatCurrency(blended * 0.7)} · Optimistic: {formatCurrency(blended * 1.4)}
          </p>
        </div>
      </div>

      {/* ── Unified method card grid + detail panel ── */}
      <div>
        <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
          Valuation Methods — select one to explore
        </p>

        {/* Card grid — acts as the navigation */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {methodCards.map(({ key, value }) => {
            const meta = METHOD_META[key]
            const c = colorMap[meta.color]
            const Icon = meta.icon
            const isActive = activeMethod === key
            const isLocked = false

            return (
              <button
                key={key}
                onClick={() => setActiveMethod(key)}
                className={`rounded-xl p-3.5 border text-left transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-brand-500/50
                  ${isActive
                    ? `${c.activeBg} border-transparent shadow-lg`
                    : 'bg-white dark:bg-gray-900 border-gray-100 dark:border-gray-800 hover:border-brand-200 dark:hover:border-brand-700'
                  }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className={`w-7 h-7 rounded-lg flex items-center justify-center
                    ${isActive ? 'bg-white/20' : c.icon}`}>
                    <Icon size={14} className={isActive ? 'text-white' : c.text} />
                  </div>
                  {isLocked && !isActive && (
                    <Lock size={11} className="text-gray-300 dark:text-gray-600" />
                  )}
                </div>
                <p className={`text-[11px] font-medium mb-0.5 ${isActive ? 'text-white/80' : 'text-gray-500 dark:text-gray-400'}`}>
                  {meta.shortLabel}
                </p>
                <p className={`text-sm font-bold ${
                  isActive ? 'text-white' : value > 0 ? 'text-gray-900 dark:text-white' : 'text-gray-400 dark:text-gray-600'
                }`}>
                  {isLocked ? 'Locked' : value > 0 ? formatCurrency(value) : 'N/A'}
                </p>
              </button>
            )
          })}
        </div>

        {/* Detail panel — renders below the grid, animates on switch */}
        <div className="mt-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeMethod}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.22 }}
            >
              <MethodDetailPanel
                methodKey={activeMethod}
                value={methodCards.find(m => m.key === activeMethod)?.value ?? 0}
                results={results}
                inputs={inputs}
                onAddVCAssumptions={onAddVCAssumptions}
              />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Key inputs recap */}
      <div className="rounded-xl p-4 bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800">
        <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Inputs Summary</h3>
        <dl className="grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-2 text-xs">
          {[
            { label: 'Stage',         value: STAGES[stage]?.label },
            { label: 'Industry',      value: INDUSTRY_MULTIPLES[inputs.industry]?.label },
            { label: 'ARR',           value: inputs.arr > 0 ? formatCurrencyFull(inputs.arr) : '—' },
            { label: 'MRR',           value: inputs.mrr > 0 ? formatCurrencyFull(inputs.mrr) : '—' },
            { label: 'Growth Rate',   value: inputs.growthRate > 0 ? `${inputs.growthRate}%` : '—' },
            { label: 'Gross Margin',  value: inputs.grossMargin > 0 ? `${inputs.grossMargin}%` : '—' },
            { label: 'Exit Value',    value: inputs.exitValue > 0 ? formatCurrency(inputs.exitValue) : vcAutoEstimated ? 'Auto-est.' : '—' },
            { label: 'Return Rate',   value: `${inputs.returnRate || 30}%` },
            { label: 'Years to Exit', value: `${inputs.yearsToExit || 5} yrs` },
            { label: 'Dilution',      value: `${inputs.dilution || 20}%` },
          ].map(({ label, value }) => (
            <div key={label}>
              <dt className="text-gray-400 dark:text-gray-500">{label}</dt>
              <dd className="font-medium text-gray-900 dark:text-white mt-0.5">{value}</dd>
            </div>
          ))}
        </dl>
      </div>

      {/* Industry multiples reference */}
      <div>
        <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
          Industry Multiples Reference (2026)
        </h3>
        <div className="overflow-x-auto rounded-xl border border-gray-100 dark:border-gray-800">
          <table className="w-full text-xs">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-800 text-left">
                <th className="px-3 py-2.5 font-semibold text-gray-600 dark:text-gray-400">Sector</th>
                <th className="px-3 py-2.5 font-semibold text-gray-600 dark:text-gray-400 text-right">Multiple</th>
                <th className="px-3 py-2.5 font-semibold text-gray-600 dark:text-gray-400 hidden sm:table-cell">Notes</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(INDUSTRY_MULTIPLES).map(([key, { label, multiple, description }]) => (
                <tr key={key} className={`border-t border-gray-100 dark:border-gray-800 ${
                  inputs.industry === key ? 'bg-brand-50 dark:bg-brand-500/10' : ''
                }`}>
                  <td className="px-3 py-2 font-medium text-gray-900 dark:text-white">
                    <span className="flex items-center gap-1.5">
                      {inputs.industry === key && <span className="w-1.5 h-1.5 rounded-full bg-brand-500 flex-shrink-0" />}
                      {label}
                    </span>
                  </td>
                  <td className="px-3 py-2 font-bold text-gray-900 dark:text-white text-right">{multiple}×</td>
                  <td className="px-3 py-2 text-gray-500 dark:text-gray-400 hidden sm:table-cell">{description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Methodology note */}
      <p className="text-xs text-center text-gray-400 dark:text-gray-500 px-2">
        Your valuation was calculated using the methods supported by the data you provided.
      </p>

      {/* Edit VC assumptions CTA — shown when auto-estimated */}
      {vcAutoEstimated && onAddVCAssumptions && (
        <div className="rounded-xl p-4 border border-dashed border-brand-200 dark:border-brand-700
                        bg-brand-50 dark:bg-brand-500/10 flex items-center justify-between gap-3">
          <div>
            <p className="text-sm font-medium text-brand-700 dark:text-brand-300">Refine the VC Perspective</p>
            <p className="text-xs text-brand-600/70 dark:text-brand-400/70 mt-0.5">
              Your VC estimate used stage benchmarks. Add your own exit assumptions to personalise it.
            </p>
          </div>
          <button onClick={onAddVCAssumptions} className="btn-secondary flex-shrink-0 text-xs px-3 py-2">
            <PlusCircle size={13} />
            Edit assumptions
          </button>
        </div>
      )}

      <button onClick={onReset} className="btn-secondary w-full">
        <RefreshCw size={14} />
        Start a New Valuation
      </button>
    </div>
  )
}
