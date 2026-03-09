// ─── Industry Multiples Table (2026) ────────────────────────────────────────
export const INDUSTRY_MULTIPLES = {
  saas:       { label: 'SaaS',          multiple: 8,  description: 'Recurring revenue, sticky retention' },
  ai_deeptech:{ label: 'AI / Deep Tech', multiple: 15, description: 'High IP value, defensible moats' },
  fintech:    { label: 'Fintech',        multiple: 6,  description: 'Regulated, high trust acquisition costs' },
  ecommerce:  { label: 'E-Commerce',     multiple: 3,  description: 'Lower margins, volume-driven' },
  healthtech: { label: 'HealthTech',     multiple: 5,  description: 'Long sales cycles, regulatory risk' },
  edtech:     { label: 'EdTech',         multiple: 4,  description: 'Market-size constrained, churn risk' },
  marketplace:{ label: 'Marketplace',    multiple: 5,  description: 'Network-effects premium' },
  cleantech:  { label: 'CleanTech',      multiple: 7,  description: 'Policy tailwinds, capital intensive' },
  other:      { label: 'Other',          multiple: 4,  description: 'Sector-adjusted baseline' },
}

// ─── Stage Definitions ───────────────────────────────────────────────────────
export const STAGES = {
  preseed:  { label: 'Pre-seed', description: 'Idea / MVP stage, little or no revenue' },
  seed:     { label: 'Seed',     description: 'Early traction, building product-market fit' },
  series_a: { label: 'Series A+', description: 'Proven model, scaling revenue' },
}

// ─── Berkus Method ───────────────────────────────────────────────────────────
// Five qualitative factors, each worth up to $500K → max $2.5M
export function calculateBerkus({ team, product, market, sales, competition }) {
  const MAX_PER_FACTOR = 500_000
  const raw = [team, product, market, sales, competition]
  const total = raw.reduce((sum, score) => sum + (score / 10) * MAX_PER_FACTOR, 0)
  return Math.min(total, 2_500_000)
}

// ─── Scorecard Method ────────────────────────────────────────────────────────
// Weighted qualitative score applied to a regional baseline ($5M)
export function calculateScorecard({ team, product, market, sales, competition, other = 5 }) {
  const BASELINE = 5_000_000
  const WEIGHTS = { team: 0.30, market: 0.25, product: 0.15, sales: 0.15, competition: 0.10, other: 0.05 }
  const weightedScore =
    (team / 10)        * WEIGHTS.team +
    (market / 10)      * WEIGHTS.market +
    (product / 10)     * WEIGHTS.product +
    (sales / 10)       * WEIGHTS.sales +
    (competition / 10) * WEIGHTS.competition +
    (other / 10)       * WEIGHTS.other

  // weightedScore is 0–1; multiply by 2 so max score (1.0) yields 2× baseline
  return BASELINE * weightedScore * 2
}

// ─── VC Method ───────────────────────────────────────────────────────────────
// Present value of exit, discounted over holding period, net of dilution
export function calculateVC({ exitValue, discountRate, years, dilution }) {
  if (!exitValue || exitValue <= 0) return 0
  const dr = Math.max(0, discountRate || 30) / 100
  const yrs = Math.max(1, years || 5)
  const pv = exitValue / Math.pow(1 + dr, yrs)
  return pv * (1 - (dilution || 0) / 100)
}

// ─── Revenue Multiple Method ─────────────────────────────────────────────────
export function calculateRevenueMultiple({ annualRevenue, industry }) {
  const multiple = INDUSTRY_MULTIPLES[industry]?.multiple ?? 4
  return (annualRevenue || 0) * multiple
}

// ─── DCF Method ──────────────────────────────────────────────────────────────
// 5-year projection of free cash flow, discounted to present value
export function calculateDCF({ annualRevenue, growthRate, grossMargin, discountRate }) {
  if (!annualRevenue || annualRevenue <= 0) return 0
  const dr = Math.max(0, discountRate || 30) / 100
  const gr = Math.min((growthRate || 0) / 100, 10) // cap at 1000% to prevent infinity
  const margin = Math.min(Math.max((grossMargin || 0) / 100, 0), 1)

  let dcf = 0
  let revenue = annualRevenue
  for (let t = 1; t <= 5; t++) {
    revenue = revenue * (1 + gr)
    const cashFlow = revenue * margin
    dcf += cashFlow / Math.pow(1 + dr, t)
  }
  // Add terminal value (Gordon Growth Model, 3% perpetuity)
  const terminalGrowth = 0.03
  const terminalCashFlow = revenue * margin * (1 + terminalGrowth)
  const terminalValue = terminalCashFlow / (dr - terminalGrowth)
  dcf += terminalValue / Math.pow(1 + dr, 5)
  return Math.max(0, dcf)
}

// ─── Blended Valuation ───────────────────────────────────────────────────────
// Weights shift from qualitative → quantitative as stage matures.
// When vcSkipped=true, VC's weight is redistributed proportionally to other methods.
export function calculateBlended({ stage, berkus, scorecard, vc, revenueMultiple, dcf, vcSkipped = false }) {
  switch (stage) {
    case 'preseed':
      return berkus * 0.65 + scorecard * 0.35

    case 'seed':
      return berkus * 0.25 + scorecard * 0.40 + revenueMultiple * 0.35

    case 'series_a': {
      if (vcSkipped || vc === 0) {
        // Redistribute VC's 25% proportionally across remaining methods (total 0.75 → 1.0)
        return (
          berkus          * (0.10 / 0.75) +
          scorecard       * (0.15 / 0.75) +
          revenueMultiple * (0.30 / 0.75) +
          dcf             * (0.20 / 0.75)
        )
      }
      return (
        berkus          * 0.10 +
        scorecard       * 0.15 +
        vc              * 0.25 +
        revenueMultiple * 0.30 +
        dcf             * 0.20
      )
    }

    default:
      return berkus
  }
}

// ─── Confidence Score ────────────────────────────────────────────────────────
// How complete the inputs are; drives the gauge
export function calculateConfidence(inputs, stage) {
  const fields = {
    // Always required
    startupName:   { weight: 5,  value: inputs.startupName?.trim() },
    industry:      { weight: 5,  value: inputs.industry },
    stage:         { weight: 5,  value: inputs.stage },
    team:          { weight: 8,  value: inputs.team > 0 },
    product:       { weight: 8,  value: inputs.product > 0 },
    market:        { weight: 8,  value: inputs.market > 0 },
    // Financial (weighted higher for later stages)
    annualRevenue: {
      weight: stage === 'preseed' ? 5 : 15,
      value: (inputs.annualRevenue || 0) > 0,
    },
    growthRate:    {
      weight: stage === 'preseed' ? 3 : 10,
      value: (inputs.growthRate || 0) > 0,
    },
    grossMargin:   {
      weight: stage === 'preseed' ? 3 : 8,
      value: (inputs.grossMargin || 0) > 0,
    },
    // VC fields
    exitValue: {
      weight: stage === 'series_a' ? 12 : 5,
      value: (inputs.exitValue || 0) > 0,
    },
    investmentAmount: {
      weight: 5,
      value: (inputs.investmentAmount || 0) > 0,
    },
  }

  let earned = 0
  let total = 0
  for (const f of Object.values(fields)) {
    total += f.weight
    if (f.value) earned += f.weight
  }
  return Math.round((earned / total) * 100)
}

// ─── Master Runner ───────────────────────────────────────────────────────────
// options.skipVC = true  → VC Method is intentionally skipped by the user
export function runValuation(inputs, { skipVC = false } = {}) {
  const {
    stage, industry,
    team = 5, product = 5, market = 5, sales = 5, competition = 5,
    annualRevenue = 0, growthRate = 0, grossMargin = 0,
    exitValue = 0, discountRate = 30, years = 5, dilution = 20,
  } = inputs

  const qualitative = { team, product, market, sales, competition }

  const berkus    = calculateBerkus(qualitative)
  const scorecard = calculateScorecard(qualitative)

  // VC requires exit value; also respects the explicit skipVC flag
  const vcApplicable = stage === 'series_a' && !skipVC && exitValue > 0
  const vc = vcApplicable
    ? calculateVC({ exitValue, discountRate, years, dilution })
    : 0

  const revenueMultiple = stage !== 'preseed'
    ? calculateRevenueMultiple({ annualRevenue, industry })
    : 0

  const dcf = stage === 'series_a'
    ? calculateDCF({ annualRevenue, growthRate, grossMargin, discountRate })
    : 0

  const vcSkipped = stage === 'series_a' && (skipVC || exitValue === 0)
  const blended   = calculateBlended({ stage, berkus, scorecard, vc, revenueMultiple, dcf, vcSkipped })
  const confidence = calculateConfidence(inputs, stage)

  return { berkus, scorecard, vc, revenueMultiple, dcf, blended, confidence, vcSkipped }
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
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(value)
}
