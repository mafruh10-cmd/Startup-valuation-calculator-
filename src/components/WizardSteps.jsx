import React from 'react'
import { motion } from 'framer-motion'
import { INDUSTRY_MULTIPLES, STAGES } from '../lib/valuationEngine.js'
import {
  StepHeader, ScoreSlider, NumberInput, SelectField, InfoAlert, FieldLabel,
} from './ui/shared.jsx'

const slideVariants = {
  enter: dir => ({ x: dir > 0 ? 60 : -60, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: dir => ({ x: dir > 0 ? -60 : 60, opacity: 0 }),
}

const transition = { type: 'spring', stiffness: 350, damping: 32 }

export function AnimatedStep({ stepKey, direction, children }) {
  return (
    <motion.div
      key={stepKey}
      custom={direction}
      variants={slideVariants}
      initial="enter"
      animate="center"
      exit="exit"
      transition={transition}
      className="w-full"
    >
      {children}
    </motion.div>
  )
}

// ─── Step 1: The Basics ───────────────────────────────────────────────────────
export function Step1Basics({ data, onChange, errors }) {
  const stageOptions = Object.entries(STAGES).map(([value, { label, description }]) => ({
    value,
    label: `${label} — ${description}`,
  }))

  const industryOptions = Object.entries(INDUSTRY_MULTIPLES).map(([value, { label, multiple }]) => ({
    value,
    label: `${label} (${multiple}× revenue multiple)`,
  }))

  return (
    <div className="space-y-5">
      <StepHeader
        step={1}
        title="The Basics"
        description="Let's start with the essentials. This tells us which valuation methods to apply."
      />

      <div>
        <FieldLabel label="Startup Name" required />
        <input
          type="text"
          value={data.startupName}
          onChange={e => onChange('startupName', e.target.value)}
          placeholder="e.g. Acme AI"
          className={`input-field ${errors.startupName ? 'border-red-400 focus:ring-red-400' : ''}`}
          autoFocus
        />
        {errors.startupName && (
          <p className="text-xs text-red-500 mt-1">{errors.startupName}</p>
        )}
      </div>

      <SelectField
        label="Industry"
        tooltip="Your industry determines the Revenue Multiple applied. AI commands the highest multiples (15×) while E-Commerce typically earns the lowest (3×)."
        value={data.industry}
        onChange={v => onChange('industry', v)}
        options={industryOptions}
        helper="Select the sector that best describes your primary market."
      />
      {errors.industry && <p className="text-xs text-red-500 -mt-3">{errors.industry}</p>}

      <SelectField
        label="Startup Stage"
        tooltip="Stage determines which valuation methods carry the most weight. Pre-seed relies on qualitative scoring; Series A+ uses financial metrics."
        value={data.stage}
        onChange={v => onChange('stage', v)}
        options={stageOptions}
        helper="Choose the stage that best matches your current traction and funding history."
      />
      {errors.stage && <p className="text-xs text-red-500 -mt-3">{errors.stage}</p>}

      {data.stage && (
        <InfoAlert variant="info">
          <strong className="font-semibold">
            {STAGES[data.stage]?.label} weighting:
          </strong>{' '}
          {data.stage === 'preseed' && 'Berkus (65%) + Scorecard (35%). Qualitative factors dominate — no revenue data needed.'}
          {data.stage === 'seed' && 'Berkus (25%) + Scorecard (40%) + Revenue Multiple (35%). A balanced mix with early financials.'}
          {data.stage === 'series_a' && 'VC Method (25%) + Revenue Multiple (30%) + DCF (20%) + qualitative (25%). Financial metrics take the lead.'}
        </InfoAlert>
      )}
    </div>
  )
}

// ─── Step 2: Qualitative ──────────────────────────────────────────────────────
export function Step2Qualitative({ data, onChange }) {
  const sliders = [
    {
      name: 'team',
      label: 'Team',
      tooltip: 'Rate the team\'s experience, completeness, and domain expertise. A founding team with relevant exits and deep domain knowledge scores 9–10.',
      weight: { preseed: 30, seed: 30, series_a: 15 },
    },
    {
      name: 'product',
      label: 'Product',
      tooltip: 'Rate technical defensibility, IP moats, and development stage. A shipped product with patents or unique data assets scores higher.',
      weight: { preseed: 25, seed: 20, series_a: 10 },
    },
    {
      name: 'market',
      label: 'Market Size & Opportunity',
      tooltip: 'Rate total addressable market size and competitive dynamics. TAM > $1B with low existing competition scores 8–10.',
      weight: { preseed: 20, seed: 20, series_a: 15 },
    },
    {
      name: 'sales',
      label: 'Traction & Sales',
      tooltip: 'Rate evidence of product-market fit: LOIs, paying customers, MoM growth, NPS. Even early signals count at pre-seed.',
      weight: { preseed: 15, seed: 20, series_a: 30 },
    },
    {
      name: 'competition',
      label: 'Competitive Position',
      tooltip: 'Rate your defensibility vs. competitors: unique moats, switching costs, brand loyalty. First-mover with network effects scores highest.',
      weight: { preseed: 10, seed: 10, series_a: 30 },
    },
  ]

  const stage = data.stage || 'preseed'

  return (
    <div className="space-y-6">
      <StepHeader
        step={2}
        title="The Scorecard"
        description="Rate your startup on five qualitative dimensions (1 = lowest, 10 = exceptional). These drive both Berkus and Scorecard valuations."
      />

      <InfoAlert variant="info">
        Be honest — overinflated scores skew the valuation. Investors will conduct their own diligence.
      </InfoAlert>

      <div className="space-y-5">
        {sliders.map(s => (
          <div key={s.name} className="rounded-xl p-4 bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800">
            <div className="flex items-center justify-between mb-0.5">
              <div className="flex-1">
                <ScoreSlider
                  label={s.label}
                  tooltip={s.tooltip}
                  name={s.name}
                  value={data[s.name]}
                  onChange={v => onChange(s.name, v)}
                />
              </div>
            </div>
            <p className="text-xs text-gray-400 dark:text-gray-500 mt-2">
              Weight at {STAGES[stage]?.label}: <span className="font-semibold text-brand-500">{s.weight[stage]}%</span>
            </p>
          </div>
        ))}
      </div>

      <div className="rounded-xl p-4 bg-brand-50 dark:bg-brand-500/10 border border-brand-100 dark:border-brand-500/20">
        <p className="text-xs font-semibold text-brand-600 dark:text-brand-400 mb-2">Scorecard Method Preview</p>
        <div className="grid grid-cols-5 gap-2">
          {['Team', 'Product', 'Market', 'Sales', 'Competition'].map((label, i) => {
            const keys = ['team', 'product', 'market', 'sales', 'competition']
            const v = data[keys[i]] || 1
            const pct = ((v - 1) / 9) * 100
            return (
              <div key={label} className="flex flex-col items-center gap-1">
                <div className="w-full h-1.5 rounded-full bg-brand-100 dark:bg-brand-900/50 overflow-hidden">
                  <div className="h-full bg-brand-500 rounded-full transition-all duration-300" style={{ width: `${pct}%` }} />
                </div>
                <span className="text-[10px] text-gray-500 dark:text-gray-400">{label}</span>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

// ─── Step 3: Financials ───────────────────────────────────────────────────────
export function Step3Financial({ data, onChange, errors }) {
  const stage = data.stage || 'preseed'
  const isPreseed = stage === 'preseed'

  return (
    <div className="space-y-5">
      <StepHeader
        step={3}
        title="The Hard Numbers"
        description={isPreseed
          ? "Financial data is optional at pre-seed, but adding it improves confidence."
          : "These numbers directly power the Revenue Multiple and DCF valuations."
        }
      />

      {isPreseed && (
        <InfoAlert variant="warning">
          You're pre-seed — financials are optional. Skip if you have no revenue yet. The Berkus and Scorecard methods don't require them.
        </InfoAlert>
      )}

      <NumberInput
        label="Annual Recurring Revenue (ARR)"
        tooltip="Total annualized revenue from all sources. For pre-revenue startups, enter 0. For monthly revenue, multiply by 12."
        value={data.annualRevenue}
        onChange={v => onChange('annualRevenue', v)}
        prefix="$"
        placeholder="0"
        min={0}
        step={1000}
        helper={isPreseed ? 'Optional for pre-seed stage.' : 'Required for Revenue Multiple and DCF calculations.'}
      />
      {errors.annualRevenue && <p className="text-xs text-red-500 -mt-3">{errors.annualRevenue}</p>}

      <div className="grid grid-cols-2 gap-4">
        <NumberInput
          label="Annual Growth Rate"
          tooltip="Your Year-over-Year (YoY) revenue growth rate. If you're pre-revenue, estimate your first 12-month growth projection. Typical seed-stage range: 50–150%."
          value={data.growthRate}
          onChange={v => onChange('growthRate', v)}
          suffix="%"
          placeholder="0"
          min={0}
          max={1000}
          helper="YoY revenue growth."
        />
        <NumberInput
          label="Gross Margin"
          tooltip="(Revenue − COGS) / Revenue × 100. SaaS typically 70–85%; E-Commerce 20–40%; Marketplaces 60–80%."
          value={data.grossMargin}
          onChange={v => onChange('grossMargin', v)}
          suffix="%"
          placeholder="0"
          min={0}
          max={100}
          helper="Typical SaaS: 70–85%."
        />
      </div>

      {!isPreseed && data.annualRevenue > 0 && data.industry && (
        <div className="rounded-xl p-4 bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900">
          <p className="text-xs font-semibold text-emerald-700 dark:text-emerald-400 mb-1">Revenue Multiple Preview</p>
          <p className="text-sm text-emerald-800 dark:text-emerald-300">
            ${(data.annualRevenue / 1e6).toFixed(2)}M ARR × {INDUSTRY_MULTIPLES[data.industry]?.multiple ?? 4}× ({INDUSTRY_MULTIPLES[data.industry]?.label}) ={' '}
            <strong>${((data.annualRevenue * (INDUSTRY_MULTIPLES[data.industry]?.multiple ?? 4)) / 1e6).toFixed(2)}M</strong>
          </p>
        </div>
      )}

      {isPreseed && (
        <InfoAlert variant="info">
          At pre-seed, the Berkus and Scorecard methods from Step 2 already produce a valuation range. Financial inputs improve accuracy once you have early revenue.
        </InfoAlert>
      )}
    </div>
  )
}

// ─── Step 4: Investment ───────────────────────────────────────────────────────
export function Step4Investment({ data, onChange, errors }) {
  const stage = data.stage || 'preseed'
  const isSeriesA = stage === 'series_a'

  return (
    <div className="space-y-5">
      <StepHeader
        step={4}
        title="Capital & Exit (Optional)"
        description="This step improves the Venture Capital (VC) Method estimate. You can skip it and still receive a valuation using the other methods."
      />

      <NumberInput
        label="Investment Amount Sought"
        tooltip="How much are you raising in this round? This is used to calculate post-money valuation and dilution."
        value={data.investmentAmount}
        onChange={v => onChange('investmentAmount', v)}
        prefix="$"
        placeholder="500,000"
        min={0}
        step={10000}
        helper="The amount you plan to raise in this round."
      />
      {errors.investmentAmount && <p className="text-xs text-red-500 -mt-3">{errors.investmentAmount}</p>}

      <NumberInput
        label="Expected Exit / Acquisition Value"
        tooltip="Your projected company value at exit (IPO or acquisition). For a conservative estimate, use 5–10× your blended valuation. Series A companies typically target $100M–$1B exits."
        value={data.exitValue}
        onChange={v => onChange('exitValue', v)}
        prefix="$"
        placeholder="10,000,000"
        min={0}
        step={100000}
        helper={isSeriesA ? 'Required for VC Method.' : 'Optional — used in VC Method if stage is Series A+.'}
      />

      <div className="grid grid-cols-2 gap-4">
        <NumberInput
          label="Discount Rate"
          tooltip="The return rate VCs expect. Early-stage VCs typically require 30–50% IRR to compensate for risk. Series A+ averages 25–35%."
          value={data.discountRate}
          onChange={v => onChange('discountRate', v)}
          suffix="%"
          placeholder="30"
          min={0}
          max={100}
          helper="Typical VC required return: 25–40%."
        />
        <NumberInput
          label="Years to Exit"
          tooltip="Expected holding period before exit. Typical VC hold is 5–7 years. Shorter periods increase the present value of the exit."
          value={data.years}
          onChange={v => onChange('years', v)}
          suffix="yrs"
          placeholder="5"
          min={1}
          max={15}
          helper="Expected years until exit."
        />
      </div>

      <NumberInput
        label="Investor Dilution"
        tooltip="The ownership percentage investors will receive in this round. Typical seed dilution: 15–25%. Series A: 20–30%."
        value={data.dilution}
        onChange={v => onChange('dilution', v)}
        suffix="%"
        placeholder="20"
        min={0}
        max={100}
        helper="Equity offered to investors in this round."
      />

      {data.investmentAmount > 0 && data.exitValue > 0 && (
        <div className="rounded-xl p-4 bg-brand-50 dark:bg-brand-500/10 border border-brand-100 dark:border-brand-500/20 space-y-2">
          <p className="text-xs font-semibold text-brand-600 dark:text-brand-400">Round Summary</p>
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div>
              <p className="text-gray-500 dark:text-gray-400">Raising</p>
              <p className="font-bold text-gray-900 dark:text-white">
                ${(data.investmentAmount / 1e6).toFixed(2)}M
              </p>
            </div>
            <div>
              <p className="text-gray-500 dark:text-gray-400">Implied Pre-Money</p>
              <p className="font-bold text-gray-900 dark:text-white">
                ${data.dilution > 0
                  ? ((data.investmentAmount / (data.dilution / 100)) - data.investmentAmount).toLocaleString('en-US', { maximumFractionDigits: 0 })
                  : 'N/A'}
              </p>
            </div>
            <div>
              <p className="text-gray-500 dark:text-gray-400">Target Exit</p>
              <p className="font-bold text-gray-900 dark:text-white">
                ${(data.exitValue / 1e6).toFixed(1)}M
              </p>
            </div>
            <div>
              <p className="text-gray-500 dark:text-gray-400">Expected Return</p>
              <p className="font-bold text-emerald-600 dark:text-emerald-400">
                {data.investmentAmount > 0
                  ? `${((data.exitValue * (data.dilution / 100)) / data.investmentAmount).toFixed(1)}×`
                  : 'N/A'}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
