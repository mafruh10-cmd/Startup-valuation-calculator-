import React, { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { TrendingUp } from 'lucide-react'
import { runValuation } from './lib/valuationEngine.js'
import { DarkModeToggle, StepProgress, ConfidenceGauge } from './components/ui/shared.jsx'
import {
  AnimatedStep,
  Step1Basics,
  Step2Qualitative,
  Step3Financial,
  Step4Investment,
} from './components/WizardSteps.jsx'
import { PartialReport, LeadCapture, FullResults } from './components/Results.jsx'

// ─── Default form state ────────────────────────────────────────────────────────
const DEFAULT_FORM = {
  startupName: '',
  industry: '',
  stage: '',
  team: 5,
  product: 5,
  market: 5,
  sales: 5,
  competition: 5,
  annualRevenue: 0,
  growthRate: 0,
  grossMargin: 0,
  exitValue: 0,
  discountRate: 30,
  years: 5,
  dilution: 20,
  investmentAmount: 0,
}

// ─── Validation per step ──────────────────────────────────────────────────────
function validateStep(step, data) {
  const errors = {}
  if (step === 1) {
    if (!data.startupName.trim()) errors.startupName = 'Please enter your startup name.'
    if (!data.industry) errors.industry = 'Please select an industry.'
    if (!data.stage) errors.stage = 'Please select your startup stage.'
  }
  if (step === 3) {
    if (data.stage !== 'preseed' && data.annualRevenue < 0)
      errors.annualRevenue = 'Revenue cannot be negative.'
    if (data.growthRate < 0 || data.growthRate > 10000)
      errors.growthRate = 'Enter a value between 0 and 10000.'
    if (data.grossMargin < 0 || data.grossMargin > 100)
      errors.grossMargin = 'Enter a value between 0 and 100.'
  }
  if (step === 4) {
    if (data.investmentAmount < 0) errors.investmentAmount = 'Amount cannot be negative.'
  }
  return errors
}

// ─── App ──────────────────────────────────────────────────────────────────────
export default function App() {
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('sv-darkmode') === 'true' ||
        window.matchMedia('(prefers-color-scheme: dark)').matches
    }
    return false
  })

  const [step, setStep]       = useState(1)       // 1–4 wizard, 5 = partial results, 6 = full results
  const [direction, setDir]   = useState(1)
  const [form, setForm]       = useState(DEFAULT_FORM)
  const [errors, setErrors]   = useState({})
  const [results, setResults] = useState(null)
  const [leadData, setLead]   = useState(null)
  const [vcSkippedByUser, setVcSkippedByUser] = useState(false)

  // Persist dark mode
  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode)
    localStorage.setItem('sv-darkmode', darkMode)
  }, [darkMode])

  // Live confidence score (always uses current vcSkippedByUser flag)
  const liveResults = form.stage ? runValuation(form, { skipVC: vcSkippedByUser }) : null

  function handleChange(field, value) {
    setForm(prev => ({ ...prev, [field]: value }))
    setErrors(prev => ({ ...prev, [field]: '' }))
  }

  function goNext() {
    const e = validateStep(step, form)
    if (Object.keys(e).length) { setErrors(e); return }
    setErrors({})
    if (step < 4) {
      setDir(1)
      setStep(s => s + 1)
    } else {
      // Step 4 submitted with data — VC runs if exitValue is present
      const r = runValuation(form, { skipVC: false })
      setVcSkippedByUser(r.vcSkipped)
      setResults(r)
      setDir(1)
      setStep(5)
    }
  }

  function handleSkipStep4() {
    // User explicitly skips Step 4 — VC Method will not run
    setVcSkippedByUser(true)
    const r = runValuation(form, { skipVC: true })
    setResults(r)
    setDir(1)
    setStep(5)
  }

  function handleAddVCAssumptions() {
    // Return to Step 4 without resetting any data
    setDir(-1)
    setStep(4)
  }

  function goBack() {
    setDir(-1)
    setStep(s => s - 1)
    setErrors({})
  }

  function handleLeadSubmit(lead) {
    setLead(lead)
    setStep(6)
  }

  function handleReset() {
    setForm(DEFAULT_FORM)
    setResults(null)
    setLead(null)
    setErrors({})
    setVcSkippedByUser(false)
    setDir(-1)
    setStep(1)
  }

  const STEP_LABELS = ['Basics', 'Scorecard', 'Financials', 'Capital']

  const isWizard = step >= 1 && step <= 4

  return (
    <div className={`min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors duration-300`}>
      {/* ── Top Nav ── */}
      <header className="sticky top-0 z-40 border-b border-gray-100 dark:border-gray-800 bg-white/80 dark:bg-gray-950/80 glass">
        <div className="max-w-2xl mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-brand-500 flex items-center justify-center shadow-sm shadow-brand-500/30">
              <TrendingUp size={16} className="text-white" />
            </div>
            <span className="font-bold text-gray-900 dark:text-white text-sm tracking-tight">
              ValuatorAI
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* Live confidence badge — only visible in wizard */}
            {isWizard && liveResults && (
              <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-gray-100 dark:bg-gray-800 text-xs font-medium text-gray-600 dark:text-gray-400">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                {liveResults.confidence}% complete
              </div>
            )}
            <DarkModeToggle darkMode={darkMode} onToggle={() => setDarkMode(d => !d)} />
          </div>
        </div>
      </header>

      {/* ── Main ── */}
      <main className="max-w-2xl mx-auto px-4 py-8 pb-24">
        {/* Progress bar — wizard only */}
        {isWizard && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <StepProgress currentStep={step} totalSteps={4} labels={STEP_LABELS} />
          </motion.div>
        )}

        {/* Results header */}
        {step >= 5 && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-50 dark:bg-brand-500/10 mb-3">
              <TrendingUp size={12} className="text-brand-500" />
              <span className="text-xs font-semibold text-brand-600 dark:text-brand-400">Valuation Complete</span>
            </div>
          </motion.div>
        )}

        {/* ── Step content ── */}
        <AnimatePresence mode="wait" custom={direction}>
          {/* Wizard steps 1–4 */}
          {isWizard && (
            <AnimatedStep key={`step-${step}`} stepKey={`step-${step}`} direction={direction}>
              <div className="card p-6 sm:p-8">
                {step === 1 && (
                  <Step1Basics data={form} onChange={handleChange} errors={errors} />
                )}
                {step === 2 && (
                  <Step2Qualitative data={form} onChange={handleChange} />
                )}
                {step === 3 && (
                  <Step3Financial data={form} onChange={handleChange} errors={errors} />
                )}
                {step === 4 && (
                  <Step4Investment data={form} onChange={handleChange} errors={errors} />
                )}

                {/* Nav buttons */}
                <div className="mt-8 pt-6 border-t border-gray-100 dark:border-gray-800 space-y-3">
                  <div className="flex items-center justify-between">
                    <button
                      onClick={goBack}
                      disabled={step === 1}
                      className="btn-secondary"
                    >
                      Back
                    </button>
                    <div className="flex items-center gap-3">
                      <span className="text-xs text-gray-400 dark:text-gray-600 hidden sm:block">
                        {step} of 4
                      </span>
                      <button
                        onClick={goNext}
                        className="btn-primary"
                      >
                        {step === 4 ? 'See My Valuation' : 'Continue'}
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                          <path d="M3 7h8M8 4l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </button>
                    </div>
                  </div>
                  {/* Skip option — only on Step 4 */}
                  {step === 4 && (
                    <div className="flex justify-center">
                      <button
                        onClick={handleSkipStep4}
                        className="btn-ghost text-xs"
                      >
                        Skip this step
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Tip card below wizard */}
              {step === 1 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="mt-4 rounded-xl p-4 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800"
                >
                  <p className="text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1.5">How it works</p>
                  <div className="space-y-1.5">
                    {['4-step form — takes under 3 minutes', 'We run 5 industry-standard valuation methods', 'Get a blended estimate calibrated to your stage', 'Unlock a full investor-ready report'].map((t, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                        <span className="w-4 h-4 rounded-full bg-brand-100 dark:bg-brand-500/20 text-brand-500 text-[10px] font-bold flex items-center justify-center flex-shrink-0">{i+1}</span>
                        {t}
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatedStep>
          )}

          {/* Step 5: Partial results + lead capture */}
          {step === 5 && results && (
            <AnimatedStep key="partial" stepKey="partial" direction={direction}>
              <div className="space-y-6">
                <PartialReport results={results} inputs={form} onAddVCAssumptions={handleAddVCAssumptions} />
                <LeadCapture onSubmit={handleLeadSubmit} />
              </div>
            </AnimatedStep>
          )}

          {/* Step 6: Full results */}
          {step === 6 && results && leadData && (
            <AnimatedStep key="full" stepKey="full" direction={direction}>
              <FullResults
                results={results}
                inputs={form}
                leadData={leadData}
                onReset={handleReset}
                onAddVCAssumptions={handleAddVCAssumptions}
              />
            </AnimatedStep>
          )}
        </AnimatePresence>
      </main>

      {/* ── Sticky mobile next button ── */}
      {isWizard && (
        <div className="fixed bottom-0 inset-x-0 sm:hidden border-t border-gray-100 dark:border-gray-800 bg-white/90 dark:bg-gray-950/90 glass px-4 py-3 space-y-2">
          <button onClick={goNext} className="btn-primary w-full">
            {step === 4 ? 'See My Valuation' : 'Continue'}
          </button>
          {step === 4 && (
            <button onClick={handleSkipStep4} className="btn-ghost w-full text-xs">
              Skip this step
            </button>
          )}
        </div>
      )}
    </div>
  )
}
