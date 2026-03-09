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
          {data.stage === 'preseed' && 'Berkus (40%) + Scorecard (40%) + ARR Multiple (10%) + VC Perspective (10%). Qualitative factors dominate.'}
          {data.stage === 'seed' && 'Berkus (20%) + Scorecard (30%) + ARR Multiple (30%) + VC Perspective (20%). A balanced mix with early financials.'}
          {data.stage === 'series_a' && 'ARR Multiple (40%) + VC Perspective (35%) + Scorecard (15%) + Berkus (10%). Financial metrics take the lead.'}
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
      tooltip: 'Rate total addressable market size and growth potential. TAM > $1B with clear expansion path scores 8–10.',
      weight: { preseed: 20, seed: 20, series_a: 15 },
    },
    {
      name: 'traction',
      label: 'Traction',
      tooltip: 'Rate evidence of product-market fit: paying customers, MoM growth, NPS, retention. Even early LOIs or waitlists count at pre-seed.',
      weight: { preseed: 15, seed: 20, series_a: 30 },
    },
    {
      name: 'gtm',
      label: 'Go-to-Market',
      tooltip: 'Rate the clarity and scalability of your distribution strategy: channel partnerships, sales motion, SEO/PLG flywheel.',
      weight: { preseed: 5, seed: 10, series_a: 20 },
    },
    {
      name: 'competitiveAdvantage',
      label: 'Competitive Advantage',
      tooltip: 'Rate your defensibility vs. competitors: proprietary data, switching costs, network effects, brand loyalty.',
      weight: { preseed: 5, seed: 10, series_a: 10 },
    },
  ]

  const stage = data.stage || 'preseed'

  return (
    <div className="space-y-6">
      <StepHeader
        step={2}
        title="The Scorecard"
        description="Rate your startup on six qualitative dimensions (1 = lowest, 10 = exceptional). These drive both Berkus and Scorecard valuations."
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
        <div className="grid grid-cols-6 gap-2">
          {['Team', 'Product', 'Market', 'Traction', 'GTM', 'Adv.'].map((label, i) => {
            const keys = ['team', 'product', 'market', 'traction', 'gtm', 'competitiveAdvantage']
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

  const annualisedRevenue = data.arr > 0 ? data.arr : (data.mrr > 0 ? data.mrr * 12 : 0)

  return (
    <div className="space-y-5">
      <StepHeader
        step={3}
        title="The Hard Numbers"
        description={isPreseed
          ? "Financial data is optional at pre-seed, but adding it improves confidence."
          : "These numbers directly power the ARR Multiple valuation."
        }
      />

      {isPreseed && (
        <InfoAlert variant="warning">
          You're pre-seed — financials are optional. Skip if you have no revenue yet. Berkus and Scorecard methods don't require them.
        </InfoAlert>
      )}

      <div className="grid grid-cols-2 gap-4">
        <div>
          <NumberInput
            label="ARR"
            tooltip="Annual Recurring Revenue — your total annualized subscription/contract revenue. Takes precedence over MRR if both are entered."
            value={data.arr}
            onChange={v => onChange('arr', v)}
            prefix="$"
            placeholder="0"
            min={0}
            step={1000}
            helper="Annual recurring revenue."
          />
          {errors.arr && <p className="text-xs text-red-500 mt-1">{errors.arr}</p>}
        </div>
        <div>
          <NumberInput
            label="MRR"
            tooltip="Monthly Recurring Revenue — used only if ARR is 0. Will be annualised (× 12) for valuation calculations."
            value={data.mrr}
            onChange={v => onChange('mrr', v)}
            prefix="$"
            placeholder="0"
            min={0}
            step={100}
            helper={data.arr > 0 ? 'ARR takes precedence.' : data.mrr > 0 ? `≈ $${((data.mrr * 12) / 1000).toFixed(0)}K annualised` : 'Used if ARR is 0.'}
          />
          {errors.mrr && <p className="text-xs text-red-500 mt-1">{errors.mrr}</p>}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <NumberInput
          label="Annual Growth Rate"
          tooltip="Your Year-over-Year (YoY) revenue growth rate. Typical seed-stage range: 50–150%."
          value={data.growthRate}
          onChange={v => onChange('growthRate', v)}
          suffix="%"
          placeholder="0"
          min={0}
          max={10000}
          helper="YoY revenue growth."
        />
        <NumberInput
          label="Gross Margin"
          tooltip="(Revenue − COGS) / Revenue × 100. SaaS: 70–85%; E-Commerce: 20–40%; Marketplaces: 60–80%."
          value={data.grossMargin}
          onChange={v => onChange('grossMargin', v)}
          suffix="%"
          placeholder="0"
          min={0}
          max={100}
          helper="Typical SaaS: 70–85%."
        />
      </div>

      {annualisedRevenue > 0 && data.industry && (
        <div className="rounded-xl p-4 bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900">
          <p className="text-xs font-semibold text-emerald-700 dark:text-emerald-400 mb-1">ARR Multiple Preview</p>
          <p className="text-sm text-emerald-800 dark:text-emerald-300">
            ${(annualisedRevenue / 1e6).toFixed(2)}M {data.arr > 0 ? 'ARR' : 'MRR × 12'} × {INDUSTRY_MULTIPLES[data.industry]?.multiple ?? 5}× ({INDUSTRY_MULTIPLES[data.industry]?.label}) ={' '}
            <strong>${((annualisedRevenue * (INDUSTRY_MULTIPLES[data.industry]?.multiple ?? 5)) / 1e6).toFixed(2)}M</strong>
          </p>
        </div>
      )}

      {isPreseed && (
        <InfoAlert variant="info">
          At pre-seed, Berkus and Scorecard from Step 2 already produce a valuation. Financial inputs improve accuracy once you have early revenue.
        </InfoAlert>
      )}
    </div>
  )
}

// ─── Step 4: Investment ───────────────────────────────────────────────────────
export function Step4Investment({ data, onChange, errors }) {
  return (
    <div className="space-y-5">
      <StepHeader
        step={4}
        title="Investor Assumptions (Optional)"
        description="These inputs power the VC Perspective method. Skip this step and we'll auto-estimate assumptions from your stage and industry."
      />

      <InfoAlert variant="info">
        If you leave this blank, we'll still calculate a VC Perspective estimate using stage benchmarks — just less personalised.
      </InfoAlert>

      <NumberInput
        label="Expected Exit / Acquisition Value"
        tooltip="Your projected company value at exit (IPO or acquisition). Seed-stage companies typically target $50M–$500M; Series A+ typically $100M–$1B+."
        value={data.exitValue}
        onChange={v => onChange('exitValue', v)}
        prefix="$"
        placeholder="50,000,000"
        min={0}
        step={1000000}
        helper="Expected IPO or acquisition value."
      />

      <div className="grid grid-cols-2 gap-4">
        <NumberInput
          label="VC Required Return"
          tooltip="The annualised return rate VCs expect (IRR). Pre-seed/seed VCs typically require 30–50%; Series A: 25–35%."
          value={data.returnRate}
          onChange={v => onChange('returnRate', v)}
          suffix="%"
          placeholder="30"
          min={0}
          max={100}
          helper="Typical VC required IRR: 25–50%."
        />
        <NumberInput
          label="Years to Exit"
          tooltip="Expected holding period before exit. Typical VC hold is 5–7 years. Shorter periods increase present value."
          value={data.yearsToExit}
          onChange={v => onChange('yearsToExit', v)}
          suffix="yrs"
          placeholder="5"
          min={1}
          max={15}
          helper="Typical range: 5–7 years."
        />
      </div>

      <NumberInput
        label="Investor Dilution"
        tooltip="Equity percentage investors receive in this round. Typical seed: 15–25%. Series A: 20–30%."
        value={data.dilution}
        onChange={v => onChange('dilution', v)}
        suffix="%"
        placeholder="20"
        min={0}
        max={100}
        helper="Equity offered to investors in this round."
      />

      {data.exitValue > 0 && (
        <div className="rounded-xl p-4 bg-brand-50 dark:bg-brand-500/10 border border-brand-100 dark:border-brand-500/20 space-y-2">
          <p className="text-xs font-semibold text-brand-600 dark:text-brand-400">VC Perspective Preview</p>
          <div className="grid grid-cols-3 gap-3 text-xs">
            <div>
              <p className="text-gray-500 dark:text-gray-400">Target Exit</p>
              <p className="font-bold text-gray-900 dark:text-white">
                ${(data.exitValue / 1e6).toFixed(1)}M
              </p>
            </div>
            <div>
              <p className="text-gray-500 dark:text-gray-400">Required Return</p>
              <p className="font-bold text-gray-900 dark:text-white">{data.returnRate || 30}% IRR</p>
            </div>
            <div>
              <p className="text-gray-500 dark:text-gray-400">Dilution</p>
              <p className="font-bold text-gray-900 dark:text-white">{data.dilution || 20}%</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
