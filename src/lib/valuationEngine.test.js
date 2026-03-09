import { describe, it, expect } from 'vitest'
import {
  calculateBerkus,
  calculateScorecard,
  calculateARRMultiple,
  calculateVCPerspective,
  calculateBlended,
  runValuation,
} from './valuationEngine.js'

describe('calculateBerkus', () => {
  it('returns $0 for all-zero scores', () => {
    expect(calculateBerkus({ team: 0, product: 0, market: 0, traction: 0, gtm: 0 })).toBe(0)
  })

  it('returns $2.5M for perfect scores', () => {
    expect(calculateBerkus({ team: 10, product: 10, market: 10, traction: 10, gtm: 10 })).toBe(2_500_000)
  })

  it('caps at $2.5M even with out-of-range scores', () => {
    expect(calculateBerkus({ team: 10, product: 10, market: 10, traction: 10, gtm: 10 })).toBeLessThanOrEqual(2_500_000)
  })

  it('calculates partial scores correctly', () => {
    // Each factor at 5/10 = 50% of $500K = $250K × 5 = $1.25M
    const result = calculateBerkus({ team: 5, product: 5, market: 5, traction: 5, gtm: 5 })
    expect(result).toBeCloseTo(1_250_000, -2)
  })
})

describe('calculateScorecard', () => {
  it('returns $5M for mid scores (5/10) across all factors', () => {
    // weighted score = 0.5, result = 5M * 0.5 * 2 = 5M
    const result = calculateScorecard({
      team: 5, product: 5, market: 5, traction: 5, gtm: 5, competitiveAdvantage: 5,
    })
    expect(result).toBeCloseTo(5_000_000, -3)
  })

  it('returns $10M for perfect 10/10 scores', () => {
    const result = calculateScorecard({
      team: 10, product: 10, market: 10, traction: 10, gtm: 10, competitiveAdvantage: 10,
    })
    expect(result).toBeCloseTo(10_000_000, -3)
  })

  it('returns $0 for zero scores', () => {
    const result = calculateScorecard({
      team: 0, product: 0, market: 0, traction: 0, gtm: 0, competitiveAdvantage: 0,
    })
    expect(result).toBe(0)
  })
})

describe('calculateARRMultiple', () => {
  it('returns 0 for no revenue', () => {
    const result = calculateARRMultiple({ arr: 0, mrr: 0, industry: 'saas' })
    expect(result.value).toBe(0)
  })

  it('uses ARR directly when provided', () => {
    const result = calculateARRMultiple({ arr: 1_000_000, mrr: 0, industry: 'saas' })
    expect(result.value).toBe(8_000_000) // 1M × 8×
    expect(result.source).toBe('arr')
  })

  it('annualises MRR when ARR is absent', () => {
    const result = calculateARRMultiple({ arr: 0, mrr: 100_000, industry: 'saas' })
    expect(result.value).toBe(9_600_000) // 100K × 12 × 8
    expect(result.source).toBe('mrr_annualised')
  })

  it('prefers ARR over MRR when both provided', () => {
    const result = calculateARRMultiple({ arr: 500_000, mrr: 100_000, industry: 'saas' })
    expect(result.source).toBe('arr')
    expect(result.arrUsed).toBe(500_000)
  })

  it('uses ai_saas multiple of 15×', () => {
    const result = calculateARRMultiple({ arr: 1_000_000, mrr: 0, industry: 'ai_saas' })
    expect(result.value).toBe(15_000_000)
    expect(result.multiple).toBe(15)
  })

  it('uses fintech multiple of 6×', () => {
    const result = calculateARRMultiple({ arr: 1_000_000, mrr: 0, industry: 'fintech' })
    expect(result.value).toBe(6_000_000)
  })

  it('falls back to 5× for unknown industry', () => {
    const result = calculateARRMultiple({ arr: 1_000_000, mrr: 0, industry: 'unknown' })
    expect(result.multiple).toBe(5)
  })
})

describe('calculateVCPerspective', () => {
  it('returns 0 when no exit value and no revenue to estimate from', () => {
    const result = calculateVCPerspective({
      stage: 'preseed', industry: 'saas', arr: 0, mrr: 0,
      berkus: 0, scorecard: 0, autoEstimate: true,
    })
    expect(result.value).toBe(0)
  })

  it('discounts founder-provided exit correctly at 0% return and 0% dilution', () => {
    const result = calculateVCPerspective({
      stage: 'seed', industry: 'saas',
      exitValue: 100_000_000, yearsToExit: 5,
      returnRate: 0, dilution: 0,
      autoEstimate: false,
    })
    expect(result.value).toBeCloseTo(100_000_000, -2)
    expect(result.assumptions.autoEstimated).toBe(false)
  })

  it('applies dilution correctly', () => {
    const result = calculateVCPerspective({
      stage: 'seed', industry: 'saas',
      exitValue: 100_000_000, yearsToExit: 1,
      returnRate: 0, dilution: 50,
      autoEstimate: false,
    })
    expect(result.value).toBeCloseTo(50_000_000, -2)
  })

  it('auto-estimates from ARR when no exit value provided', () => {
    const result = calculateVCPerspective({
      stage: 'seed', industry: 'saas', arr: 1_000_000,
      autoEstimate: true,
    })
    expect(result.value).toBeGreaterThan(0)
    expect(result.assumptions.autoEstimated).toBe(true)
  })

  it('higher return rate reduces value', () => {
    const low = calculateVCPerspective({
      stage: 'series_a', industry: 'saas',
      exitValue: 100_000_000, yearsToExit: 5,
      returnRate: 10, dilution: 0, autoEstimate: false,
    })
    const high = calculateVCPerspective({
      stage: 'series_a', industry: 'saas',
      exitValue: 100_000_000, yearsToExit: 5,
      returnRate: 50, dilution: 0, autoEstimate: false,
    })
    expect(low.value).toBeGreaterThan(high.value)
  })
})

describe('calculateBlended', () => {
  it('pre-seed result is between berkus and scorecard when others are 0', () => {
    const result = calculateBlended({
      stage: 'preseed', berkus: 1_000_000, scorecard: 3_000_000,
      arrMultiple: 0, vcPerspective: 0,
    })
    expect(result.value).toBeGreaterThanOrEqual(1_000_000)
    expect(result.value).toBeLessThanOrEqual(3_000_000)
  })

  it('excludes methods with value = 0 from the blend', () => {
    const withZero  = calculateBlended({ stage: 'seed', berkus: 1_000_000, scorecard: 3_000_000, arrMultiple: 0, vcPerspective: 0 })
    const withValue = calculateBlended({ stage: 'seed', berkus: 1_000_000, scorecard: 3_000_000, arrMultiple: 5_000_000, vcPerspective: 0 })
    expect(withValue.value).not.toBe(withZero.value)
  })

  it('returns 0 when all methods are 0', () => {
    const result = calculateBlended({ stage: 'seed', berkus: 0, scorecard: 0, arrMultiple: 0, vcPerspective: 0 })
    expect(result.value).toBe(0)
    expect(result.methodsUsed).toHaveLength(0)
  })

  it('series_a blended result is within range of all four methods', () => {
    const result = calculateBlended({
      stage: 'series_a',
      berkus: 2_000_000, scorecard: 4_000_000,
      arrMultiple: 15_000_000, vcPerspective: 20_000_000,
    })
    expect(result.value).toBeGreaterThan(2_000_000)
    expect(result.value).toBeLessThan(20_000_000)
    expect(result.methodsUsed).toHaveLength(4)
  })
})

describe('runValuation', () => {
  it('returns all expected keys', () => {
    const result = runValuation({
      stage: 'series_a', industry: 'saas',
      team: 8, product: 7, market: 9, traction: 6, gtm: 5, competitiveAdvantage: 7,
      arr: 2_000_000, mrr: 0,
      growthRate: 80, grossMargin: 75,
      exitValue: 100_000_000, yearsToExit: 5, returnRate: 30, dilution: 20,
    })

    expect(result).toHaveProperty('berkus')
    expect(result).toHaveProperty('scorecard')
    expect(result).toHaveProperty('arrMultiple')
    expect(result).toHaveProperty('arrDetails')
    expect(result).toHaveProperty('vcPerspective')
    expect(result).toHaveProperty('vcDetails')
    expect(result).toHaveProperty('blended')
    expect(result).toHaveProperty('methodsUsed')
    expect(result).toHaveProperty('confidence')
    expect(result).toHaveProperty('vcAutoEstimated')
  })

  it('series_a with full inputs produces positive values for all methods', () => {
    const result = runValuation({
      stage: 'series_a', industry: 'saas',
      team: 8, product: 7, market: 9, traction: 6, gtm: 5, competitiveAdvantage: 7,
      arr: 2_000_000, mrr: 0,
      growthRate: 80, grossMargin: 75,
      exitValue: 100_000_000, yearsToExit: 5, returnRate: 30, dilution: 20,
    })

    expect(result.berkus).toBeGreaterThan(0)
    expect(result.scorecard).toBeGreaterThan(0)
    expect(result.arrMultiple).toBe(16_000_000) // 2M × 8×
    expect(result.vcPerspective).toBeGreaterThan(0)
    expect(result.blended).toBeGreaterThan(0)
    expect(result.confidence).toBeGreaterThan(0)
    expect(result.confidence).toBeLessThanOrEqual(100)
  })

  it('pre-seed with no revenue still produces berkus/scorecard/vcPerspective values', () => {
    const result = runValuation({
      stage: 'preseed', industry: 'saas',
      team: 7, product: 6, market: 8, traction: 5, gtm: 6, competitiveAdvantage: 5,
    })
    expect(result.berkus).toBeGreaterThan(0)
    expect(result.scorecard).toBeGreaterThan(0)
    expect(result.arrMultiple).toBe(0)
    expect(result.vcAutoEstimated).toBe(true)
  })

  it('skipVC flag forces auto-estimation', () => {
    const result = runValuation({
      stage: 'seed', industry: 'saas',
      team: 7, product: 6, market: 8, traction: 5, gtm: 5, competitiveAdvantage: 5,
      arr: 500_000,
      exitValue: 50_000_000, yearsToExit: 5, returnRate: 30, dilution: 20,
    }, { skipVC: true })
    expect(result.vcAutoEstimated).toBe(true)
  })
})
