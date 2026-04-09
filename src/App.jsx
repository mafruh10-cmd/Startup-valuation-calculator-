import React, { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { TrendingUp } from 'lucide-react'
import { runValuation } from './lib/valuationEngine.js'
import { StepProgress, ConfidenceGauge } from './components/ui/shared.jsx'
import logo from './assets/logo.png'
import {
  AnimatedStep,
  Step1Basics,
  Step2Qualitative,
  Step3Financial,
  Step4Investment,
} from './components/WizardSteps.jsx'
import { ResultsPreview, LeadCaptureModal, FullResults } from './components/Results.jsx'
import BlogPost from './components/BlogPost.jsx'
import SidebarWidget from './components/SidebarWidget.jsx'
import CompactCTA from './components/CompactCTA.jsx'

// ─── Default form state ────────────────────────────────────────────────────────
const DEFAULT_FORM = {
  startupName: '',
  industry: '',
  stage: '',
  team: 5,
  product: 5,
  market: 5,
  traction: 5,
  gtm: 5,
  competitiveAdvantage: 5,
  arr: 0,
  mrr: 0,
  growthRate: 0,
  grossMargin: 0,
  exitValue: 0,
  yearsToExit: 5,
  returnRate: 30,
  dilution: 20,
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
    if ((data.arr ?? 0) < 0) errors.arr = 'ARR cannot be negative.'
    if ((data.mrr ?? 0) < 0) errors.mrr = 'MRR cannot be negative.'
    if (data.growthRate < 0 || data.growthRate > 10000)
      errors.growthRate = 'Enter a value between 0 and 10000.'
    if (data.grossMargin < 0 || data.grossMargin > 100)
      errors.grossMargin = 'Enter a value between 0 and 100.'
  }
  return errors
}

// ─── App ──────────────────────────────────────────────────────────────────────
export default function App() {
  const [step, setStep]       = useState(1)
  const [direction, setDir]   = useState(1)
  const [form, setForm]       = useState(DEFAULT_FORM)
  const [errors, setErrors]   = useState({})
  const [results, setResults] = useState(null)
  const [leadData, setLead]   = useState(null)
  const [vcSkippedByUser, setVcSkippedByUser] = useState(false)

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
      const r = runValuation(form, { skipVC: false })
      setResults(r)
      setDir(1)
      setStep(leadData ? 6 : 5)
    }
  }

  function handleSkipStep4() {
    setVcSkippedByUser(true)
    const r = runValuation(form, { skipVC: true })
    setResults(r)
    setDir(1)
    setStep(leadData ? 6 : 5)
  }

  function handleAddVCAssumptions() {
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
    <div className="min-h-screen">
      {/* ── Top Nav ── */}
      <header style={{background:'#fff',borderBottom:'1px solid #E0E1E4',height:'60px',position:'sticky',top:0,zIndex:40,display:'flex',alignItems:'center',padding:'0 32px',justifyContent:'space-between'}}>
        <div style={{display:'flex',alignItems:'center',gap:'12px'}}>
          <a href="https://www.saasfactor.co" target="_blank" rel="noopener noreferrer" style={{display:'flex',alignItems:'center'}}>
            <img src={logo} alt="Saasfactor" style={{height:'28px',display:'block'}} />
          </a>
          <span style={{fontSize:'10px',fontWeight:700,letterSpacing:'.10em',textTransform:'uppercase',color:'#1AC8D4',background:'rgba(26,200,212,.10)',padding:'3px 10px',borderRadius:'20px',border:'1px solid rgba(26,200,212,.18)'}}>
            Valuation Tool
          </span>
        </div>
        <span style={{fontSize:'12px',color:'#AAAAAA',letterSpacing:'.04em'}}>saasfactor.co</span>
      </header>

      {/* ── Title Section ── */}
      <section className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 text-center">
            Free SaaS Valuation Calculator | Saasfactor
          </h1>
        </div>
      </section>

      {/* ── Calculator Section (Centered, Full Width) ── */}
      <section className="bg-white py-8">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
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

          {/* Results header — only for full results (step 6) */}
          {step === 6 && (
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

            {/* Step 5: Blurred results preview + lead capture modal */}
            {step === 5 && results && (
              <AnimatedStep key="partial" stepKey="partial" direction={direction}>
                <div
                  className="pointer-events-none select-none"
                  style={{ filter: 'blur(5px)', opacity: 0.6 }}
                  aria-hidden="true"
                >
                  <ResultsPreview results={results} inputs={form} />
                </div>

                <div className="fixed inset-0 z-50 flex items-center justify-center p-4"
                     style={{ backdropFilter: 'blur(12px)', backgroundColor: 'rgba(0,0,0,0.45)' }}>
                  <LeadCaptureModal
                    onSubmit={handleLeadSubmit}
                    results={results}
                    inputs={form}
                  />
                </div>
              </AnimatedStep>
            )}

            {/* Step 6: Full results with CTA below */}
            {step === 6 && results && leadData && (
              <AnimatedStep key="full" stepKey="full" direction={direction}>
                <div className="max-w-4xl mx-auto">
                  {/* Results - Full width */}
                  <FullResults
                    results={results}
                    inputs={form}
                    leadData={leadData}
                    onReset={handleReset}
                    onAddVCAssumptions={handleAddVCAssumptions}
                  />
                  {/* Horizontal CTA - Below results */}
                  <div className="mt-8">
                    <CompactCTA />
                  </div>
                </div>
              </AnimatedStep>
            )}
          </AnimatePresence>

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
      </section>

      {/* ── Blog Content + CTA Widget (Hidden when showing results) ── */}
      {step !== 6 && (
        <section className="border-t border-gray-200 dark:border-gray-800 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
            <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">
              {/* Left spacer */}
              <div className="hidden lg:block lg:col-span-1" />
              
              {/* Blog - Centered */}
              <div className="lg:col-span-7">
                <div className="max-w-2xl mx-auto">
                  <BlogPost />
                </div>
              </div>
              
              {/* CTA Widget - Right side */}
              <div className="lg:col-span-3">
                <div className="lg:sticky lg:top-24">
                  <SidebarWidget />
                </div>
              </div>
              
              {/* Right spacer */}
              <div className="hidden lg:block lg:col-span-1" />
            </div>
          </div>
        </section>
      )}

      {/* ── Footer ── */}
      <footer className="bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <a href="https://www.saasfactor.co" target="_blank" rel="noopener noreferrer">
                <img src={logo} alt="Saasfactor" className="h-6 opacity-80" />
              </a>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                © 2026 Saasfactor. All rights reserved.
              </span>
            </div>
            <div className="flex items-center gap-6 text-sm text-gray-500 dark:text-gray-400">
              <a href="https://saasfactor.co/privacy" className="hover:text-gray-700 dark:hover:text-gray-300 transition-colors">Privacy</a>
              <a href="https://saasfactor.co/terms" className="hover:text-gray-700 dark:hover:text-gray-300 transition-colors">Terms</a>
              <a href="mailto:hello@saasfactor.co" className="hover:text-gray-700 dark:hover:text-gray-300 transition-colors">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
