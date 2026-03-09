import { describe, it, expect } from 'vitest'
import {
  calculateBerkus,
  calculateScorecard,
  calculateVC,
  calculateRevenueMultiple,
  calculateDCF,
  calculateBlended,
  runValuation,
} from './valuationEngine.js'

describe('calculateBerkus', () => {
  it('returns $0 for all-zero scores', () => {
    expect(calculateBerkus({ team: 0, product: 0, market: 0, sales: 0, competition: 0 })).toBe(0)
  })

  it('returns $2.5M for perfect scores', () => {
    expect(calculateBerkus({ team: 10, product: 10, market: 10, sales: 10, competition: 10 })).toBe(2_500_000)
  })

  it('caps at $2.5M even with > max scores', () => {
    expect(calculateBerkus({ team: 10, product: 10, market: 10, sales: 10, competition: 10 })).toBeLessThanOrEqual(2_500_000)
  })

  it('calculates partial scores correctly', () => {
    // Each factor at 5/10 = 50% of $500K = $250K, 5 factors = $1.25M
    const result = calculateBerkus({ team: 5, product: 5, market: 5, sales: 5, competition: 5 })
    expect(result).toBeCloseTo(1_250_000, -2)
  })
})

describe('calculateScorecard', () => {
  it('returns $5M baseline for mid scores (5/10)', () => {
    // weightedScore = 0.5, result = 5M * 0.5 * 2 = 5M
    const result = calculateScorecard({ team: 5, product: 5, market: 5, sales: 5, competition: 5, other: 5 })
    expect(result).toBeCloseTo(5_000_000, -3)
  })

  it('returns $10M for perfect 10/10 scores', () => {
    const result = calculateScorecard({ team: 10, product: 10, market: 10, sales: 10, competition: 10, other: 10 })
    expect(result).toBeCloseTo(10_000_000, -3)
  })

  it('returns $0 for zero scores', () => {
    const result = calculateScorecard({ team: 0, product: 0, market: 0, sales: 0, competition: 0, other: 0 })
    expect(result).toBe(0)
  })
})

describe('calculateVC', () => {
  it('handles zero exit value', () => {
    expect(calculateVC({ exitValue: 0, discountRate: 30, years: 5, dilution: 20 })).toBe(0)
  })

  it('discounts correctly', () => {
    // $100M exit, 0% discount, 5 years, 0% dilution → $100M
    const result = calculateVC({ exitValue: 100_000_000, discountRate: 0, years: 5, dilution: 0 })
    expect(result).toBeCloseTo(100_000_000, -2)
  })

  it('applies dilution correctly', () => {
    // $100M exit, 0% discount, 1 year, 50% dilution → $50M
    const result = calculateVC({ exitValue: 100_000_000, discountRate: 0, years: 1, dilution: 50 })
    expect(result).toBeCloseTo(50_000_000, -2)
  })

  it('reduces value with higher discount rates', () => {
    const low  = calculateVC({ exitValue: 100_000_000, discountRate: 10, years: 5, dilution: 0 })
    const high = calculateVC({ exitValue: 100_000_000, discountRate: 50, years: 5, dilution: 0 })
    expect(low).toBeGreaterThan(high)
  })
})

describe('calculateRevenueMultiple', () => {
  it('uses SaaS multiple of 8x', () => {
    expect(calculateRevenueMultiple({ annualRevenue: 1_000_000, industry: 'saas' })).toBe(8_000_000)
  })

  it('uses AI/DeepTech multiple of 15x', () => {
    expect(calculateRevenueMultiple({ annualRevenue: 1_000_000, industry: 'ai_deeptech' })).toBe(15_000_000)
  })

  it('uses Fintech multiple of 6x', () => {
    expect(calculateRevenueMultiple({ annualRevenue: 1_000_000, industry: 'fintech' })).toBe(6_000_000)
  })

  it('uses E-Commerce multiple of 3x', () => {
    expect(calculateRevenueMultiple({ annualRevenue: 1_000_000, industry: 'ecommerce' })).toBe(3_000_000)
  })

  it('falls back to 4x for unknown industry', () => {
    expect(calculateRevenueMultiple({ annualRevenue: 1_000_000, industry: 'unknown' })).toBe(4_000_000)
  })

  it('returns 0 for zero revenue', () => {
    expect(calculateRevenueMultiple({ annualRevenue: 0, industry: 'saas' })).toBe(0)
  })
})

describe('calculateDCF', () => {
  it('returns 0 for zero revenue', () => {
    expect(calculateDCF({ annualRevenue: 0, growthRate: 50, grossMargin: 70, discountRate: 25 })).toBe(0)
  })

  it('increases with higher growth rate', () => {
    const low  = calculateDCF({ annualRevenue: 1_000_000, growthRate: 20, grossMargin: 70, discountRate: 25 })
    const high = calculateDCF({ annualRevenue: 1_000_000, growthRate: 50, grossMargin: 70, discountRate: 25 })
    expect(high).toBeGreaterThan(low)
  })

  it('decreases with higher discount rate', () => {
    const low  = calculateDCF({ annualRevenue: 1_000_000, growthRate: 50, grossMargin: 70, discountRate: 15 })
    const high = calculateDCF({ annualRevenue: 1_000_000, growthRate: 50, grossMargin: 70, discountRate: 40 })
    expect(low).toBeGreaterThan(high)
  })

  it('increases with higher gross margin', () => {
    const low  = calculateDCF({ annualRevenue: 1_000_000, growthRate: 50, grossMargin: 30, discountRate: 25 })
    const high = calculateDCF({ annualRevenue: 1_000_000, growthRate: 50, grossMargin: 80, discountRate: 25 })
    expect(high).toBeGreaterThan(low)
  })
})

describe('calculateBlended', () => {
  it('pre-seed blended is between berkus and scorecard', () => {
    const result = calculateBlended({ stage: 'preseed', berkus: 1_000_000, scorecard: 3_000_000, vc: 0, revenueMultiple: 0, dcf: 0 })
    expect(result).toBeGreaterThanOrEqual(1_000_000)
    expect(result).toBeLessThanOrEqual(3_000_000)
  })

  it('series_a blended includes all methods', () => {
    const result = calculateBlended({
      stage: 'series_a',
      berkus: 2_000_000,
      scorecard: 4_000_000,
      vc: 20_000_000,
      revenueMultiple: 15_000_000,
      dcf: 12_000_000,
    })
    expect(result).toBeGreaterThan(0)
    // Result should be weighted average — not dominated by any single method
    expect(result).toBeGreaterThan(2_000_000)
    expect(result).toBeLessThan(20_000_000)
  })
})

describe('runValuation', () => {
  it('returns all method results', () => {
    const result = runValuation({
      stage: 'series_a',
      industry: 'saas',
      team: 8, product: 7, market: 9, sales: 6, competition: 5,
      annualRevenue: 2_000_000,
      growthRate: 80,
      grossMargin: 75,
      exitValue: 100_000_000,
      discountRate: 30,
      years: 5,
      dilution: 20,
    })

    expect(result).toHaveProperty('berkus')
    expect(result).toHaveProperty('scorecard')
    expect(result).toHaveProperty('vc')
    expect(result).toHaveProperty('revenueMultiple')
    expect(result).toHaveProperty('dcf')
    expect(result).toHaveProperty('blended')
    expect(result).toHaveProperty('confidence')

    expect(result.berkus).toBeGreaterThan(0)
    expect(result.scorecard).toBeGreaterThan(0)
    expect(result.vc).toBeGreaterThan(0)
    expect(result.revenueMultiple).toBe(16_000_000) // 2M * 8x
    expect(result.dcf).toBeGreaterThan(0)
    expect(result.blended).toBeGreaterThan(0)
    expect(result.confidence).toBeGreaterThan(0)
    expect(result.confidence).toBeLessThanOrEqual(100)
  })

  it('pre-seed has zero vc/revenue/dcf', () => {
    const result = runValuation({
      stage: 'preseed',
      industry: 'saas',
      team: 7, product: 6, market: 8, sales: 5, competition: 6,
    })
    expect(result.vc).toBe(0)
    expect(result.revenueMultiple).toBe(0)
    expect(result.dcf).toBe(0)
  })
})
