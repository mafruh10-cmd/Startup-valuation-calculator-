// ─── Industry Multiples Table (2026) ────────────────────────────────────────
// Admin-editable: update multiples and exit multiples here
export const INDUSTRY_MULTIPLES = {
  saas:        { label: 'SaaS',                 multiple: 8,  exitMultiple: 5,  description: 'Recurring revenue, high retention' },
  ai_saas:     { label: 'AI SaaS',              multiple: 15, exitMultiple: 8,  description: 'High IP value, defensible moats' },
  fintech:     { label: 'Fintech',              multiple: 6,  exitMultiple: 4,  description: 'Regulated, high trust acquisition costs' },
  marketplace: { label: 'Marketplace Software', multiple: 5,  exitMultiple: 4,  description: 'Network-effects premium' },
  ecommerce_sw:{ label: 'E-commerce Software',  multiple: 4,  exitMultiple: 3,  description: 'Lower margins, volume-driven' },
  b2b_software:{ label: 'Other B2B Software',   multiple: 5,  exitMultiple: 3,  description: 'Sector-adjusted baseline' },
}

// ─── Stage Definitions ───────────────────────────────────────────────────────
export const STAGES = {
  preseed:  { label: 'Pre-seed',  description: 'Idea / MVP stage, little or no revenue' },
  seed:     { label: 'Seed',      description: 'Early traction, building product-market fit' },
  series_a: { label: 'Series A+', description: 'Proven model, scaling revenue' },
}

// ─── Auto VC Assumptions by Stage ────────────────────────────────────────────
// Used when founder skips Step 4 or provides no exit data
const AUTO_VC = {
  preseed:  { years: 9,  returnRate: 0.50, dilution: 0.20 },
  seed:     { years: 7,  returnRate: 0.35, dilution: 0.20 },
  series_a: { years: 5,  returnRate: 0.30, dilution: 0.15 },
}

// ─── Blended Method Weights by Stage ─────────────────────────────────────────
// Only methods with a valid (> 0) value are included — weights are renormalized
const BLENDED_WEIGHTS = {
  preseed:  { berkus: 0.40, scorecard: 0.40, arrMultiple: 0.10, vcPerspective: 0.10 },
  seed:     { berkus: 0.20, scorecard: 0.30, arrMultiple: 0.30, vcPerspective: 0.20 },
  series_a: { berkus: 0.10, scorecard: 0.15, arrMultiple: 0.40, vcPerspective: 0.35 },
}

// ─── Berkus Method ───────────────────────────────────────────────────────────
// 5 qualitative factors → max $500K each → max $2.5M total
// Maps: team, product, market, traction, gtm
export function calculateBerkus({ team, product, market, traction, gtm }) {
  const MAX_PER_FACTOR = 500_000
  const factors = [team, product, market, traction, gtm]
  const total = factors.reduce((sum, s) => sum + (Math.min(Math.max(s, 0), 10) / 10) * MAX_PER_FACTOR, 0)
  return Math.min(total, 2_500_000)
}

// ─── Scorecard Method ────────────────────────────────────────────────────────
// Weighted qualitative score × $5M regional baseline
export function calculateScorecard({ team, product, market, traction, gtm, competitiveAdvantage }) {
  const BASELINE = 5_000_000
  const WEIGHTS = {
    team: 0.30, market: 0.25, product: 0.15,
    traction: 0.15, gtm: 0.10, competitiveAdvantage: 0.05,
  }
  const clamp = v => Math.min(Math.max(v, 0), 10)
  const score =
    (clamp(team)                / 10) * WEIGHTS.team +
    (clamp(market)              / 10) * WEIGHTS.market +
    (clamp(product)             / 10) * WEIGHTS.product +
    (clamp(traction)            / 10) * WEIGHTS.traction +
    (clamp(gtm)                 / 10) * WEIGHTS.gtm +
    (clamp(competitiveAdvantage)/ 10) * WEIGHTS.competitiveAdvantage
  return BASELINE * score * 2
}

// ─── ARR Multiple Method ─────────────────────────────────────────────────────
// Uses ARR directly, or annualises MRR if ARR is absent
export function calculateARRMultiple({ arr = 0, mrr = 0, industry }) {
  const annualRevenue = arr > 0 ? arr : (mrr > 0 ? mrr * 12 : 0)
  if (annualRevenue <= 0) return { value: 0, arrUsed: 0, multiple: 0, source: null }
  const multiple = INDUSTRY_MULTIPLES[industry]?.multiple ?? 5
  return {
    value: annualRevenue * multiple,
    arrUsed: annualRevenue,
    multiple,
    source: arr > 0 ? 'arr' : 'mrr_annualised',
  }
}

// ─── VC Perspective Method ───────────────────────────────────────────────────
// Mode A — founder-provided assumptions
// Mode B — auto-estimated from stage + category benchmarks
export function calculateVCPerspective({
  stage, industry,
  arr = 0, mrr = 0,
  berkus = 0, scorecard = 0,
  exitValue, yearsToExit, returnRate, dilution,
  autoEstimate = false,
}) {
  const forceAuto = autoEstimate || !exitValue || exitValue <= 0
  let assumptions

  if (forceAuto) {
    const base = AUTO_VC[stage] ?? AUTO_VC.seed
    const estimatedExit = _estimateExitValue({ arr, mrr, industry, stage, berkus, scorecard })
    assumptions = {
      exitValue:    estimatedExit,
      years:        base.years,
      returnRate:   base.returnRate,
      dilution:     base.dilution,
      autoEstimated: true,
    }
  } else {
    assumptions = {
      exitValue,
      years:      Math.max(1, yearsToExit ?? 5),
      returnRate: Math.max(0, (returnRate ?? 30)) / 100,
      dilution:   Math.min(Math.max((dilution ?? 20), 0), 100) / 100,
      autoEstimated: false,
    }
  }

  if (!assumptions.exitValue || assumptions.exitValue <= 0) {
    return { value: 0, assumptions }
  }
  const pv    = assumptions.exitValue / Math.pow(1 + assumptions.returnRate, assumptions.years)
  const value = pv * (1 - assumptions.dilution)
  return { value: Math.max(0, value), assumptions }
}

// Estimate exit value when founder provides none
function _estimateExitValue({ arr, mrr, industry, stage, berkus, scorecard }) {
  const annualRevenue = arr > 0 ? arr : (mrr > 0 ? mrr * 12 : 0)
  if (annualRevenue > 0) {
    const exitMultiple = INDUSTRY_MULTIPLES[industry]?.exitMultiple ?? 4
    return annualRevenue * exitMultiple
  }
  // No revenue — use qualitative average × stage growth factor
  const qualAvg = (berkus + scorecard) / 2
  const growthFactors = { preseed: 15, seed: 8, series_a: 4 }
  return qualAvg * (growthFactors[stage] ?? 8)
}

// ─── Blended Valuation ───────────────────────────────────────────────────────
// Averages only the methods that produced a positive value, with stage-aware weights
export function calculateBlended({ stage, berkus, scorecard, arrMultiple, vcPerspective }) {
  const weights = BLENDED_WEIGHTS[stage] ?? BLENDED_WEIGHTS.seed
  const candidates = [
    { key: 'berkus',        value: berkus,        weight: weights.berkus },
    { key: 'scorecard',     value: scorecard,     weight: weights.scorecard },
    { key: 'arrMultiple',   value: arrMultiple,   weight: weights.arrMultiple },
    { key: 'vcPerspective', value: vcPerspective, weight: weights.vcPerspective },
  ]
  const available = candidates.filter(m => m.value > 0)
  if (available.length === 0) return { value: 0, methodsUsed: [] }
  const totalWeight = available.reduce((s, m) => s + m.weight, 0)
  const value = available.reduce((s, m) => s + (m.value * m.weight) / totalWeight, 0)
  return { value, methodsUsed: available.map(m => m.key) }
}

// ─── Confidence Score ────────────────────────────────────────────────────────
export function calculateConfidence(inputs, stage) {
  const fields = {
    startupName:          { weight: 5,  value: !!inputs.startupName?.trim() },
    industry:             { weight: 5,  value: !!inputs.industry },
    stage:                { weight: 5,  value: !!inputs.stage },
    team:                 { weight: 7,  value: (inputs.team ?? 0) > 0 },
    product:              { weight: 6,  value: (inputs.product ?? 0) > 0 },
    market:               { weight: 6,  value: (inputs.market ?? 0) > 0 },
    traction:             { weight: 7,  value: (inputs.traction ?? 0) > 0 },
    gtm:                  { weight: 4,  value: (inputs.gtm ?? 0) > 0 },
    competitiveAdvantage: { weight: 4,  value: (inputs.competitiveAdvantage ?? 0) > 0 },
    revenue: {
      weight: stage === 'preseed' ? 4 : 15,
      value: (inputs.arr ?? 0) > 0 || (inputs.mrr ?? 0) > 0,
    },
    growthRate: {
      weight: stage === 'preseed' ? 2 : 8,
      value: (inputs.growthRate ?? 0) > 0,
    },
    grossMargin: {
      weight: stage === 'preseed' ? 2 : 5,
      value: (inputs.grossMargin ?? 0) > 0,
    },
    exitValue: {
      weight: stage === 'series_a' ? 8 : 3,
      value: (inputs.exitValue ?? 0) > 0,
    },
  }
  let earned = 0, total = 0
  for (const f of Object.values(fields)) {
    total += f.weight
    if (f.value) earned += f.weight
  }
  return Math.round((earned / total) * 100)
}

// ─── Master Runner ───────────────────────────────────────────────────────────
// options.skipVC = true → force auto-estimation for VC Perspective
export function runValuation(inputs, { skipVC = false } = {}) {
  const {
    stage = 'preseed', industry = 'saas',
    team = 5, product = 5, market = 5,
    traction = 5, gtm = 5, competitiveAdvantage = 5,
    arr = 0, mrr = 0, growthRate = 0, grossMargin = 0,
    exitValue = 0, yearsToExit = 5, returnRate = 30, dilution = 20,
  } = inputs

  const qualitative = { team, product, market, traction, gtm, competitiveAdvantage }

  const berkus    = calculateBerkus(qualitative)
  const scorecard = calculateScorecard(qualitative)

  const arrResult   = calculateARRMultiple({ arr, mrr, industry })
  const arrMultiple = arrResult.value

  const autoEstimate = skipVC || !exitValue || exitValue <= 0
  const vcResult     = calculateVCPerspective({
    stage, industry, arr, mrr, berkus, scorecard,
    exitValue, yearsToExit, returnRate, dilution,
    autoEstimate,
  })
  const vcPerspective = vcResult.value

  const blendedResult = calculateBlended({ stage, berkus, scorecard, arrMultiple, vcPerspective })
  const confidence    = calculateConfidence(inputs, stage)

  return {
    berkus,
    scorecard,
    arrMultiple,
    arrDetails: arrResult,
    vcPerspective,
    vcDetails: vcResult,
    blended: blendedResult.value,
    methodsUsed: blendedResult.methodsUsed,
    confidence,
    vcAutoEstimated: vcResult.assumptions.autoEstimated,
  }
}

// ─── Formatting Helpers ──────────────────────────────────────────────────────
export function formatCurrency(value) {
  if (!value || isNaN(value)) return '$0'
  if (value >= 1_000_000_000) return `$${(value / 1_000_000_000).toFixed(2)}B`
  if (value >= 1_000_000)     return `$${(value / 1_000_000).toFixed(2)}M`
  if (value >= 1_000)         return `$${(value / 1_000).toFixed(0)}K`
  return `$${value.toFixed(0)}`
}

export function formatCurrencyFull(value) {
  if (!value || isNaN(value)) return '$0'
  return new Intl.NumberFormat('en-US', {
    style: 'currency', currency: 'USD',
    minimumFractionDigits: 0, maximumFractionDigits: 0,
  }).format(value)
}

export function formatPct(value) {
  return `${(value * 100).toFixed(0)}%`
}
