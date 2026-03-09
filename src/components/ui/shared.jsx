import React, { useState, useRef, useEffect } from 'react'
import { Moon, Sun, Info, ChevronRight } from 'lucide-react'

// ─── Dark Mode Toggle ─────────────────────────────────────────────────────────
export function DarkModeToggle({ darkMode, onToggle }) {
  return (
    <button
      onClick={onToggle}
      className="relative flex items-center justify-center w-10 h-10 rounded-xl
                 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700
                 text-gray-600 dark:text-gray-300 transition-all duration-200"
      aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {darkMode ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  )
}

// ─── Progress Bar ─────────────────────────────────────────────────────────────
export function StepProgress({ currentStep, totalSteps, labels }) {
  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-3">
        {Array.from({ length: totalSteps }, (_, i) => {
          const stepNum = i + 1
          const isCompleted = stepNum < currentStep
          const isCurrent   = stepNum === currentStep
          return (
            <React.Fragment key={stepNum}>
              <div className="flex flex-col items-center gap-1.5 min-w-0">
                <div
                  className={`flex items-center justify-center w-8 h-8 rounded-full text-xs font-bold
                    transition-all duration-300
                    ${isCompleted
                      ? 'bg-brand-500 text-white shadow-lg shadow-brand-500/30'
                      : isCurrent
                      ? 'bg-white dark:bg-gray-900 border-2 border-brand-500 text-brand-500 shadow-lg'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-600'
                    }`}
                >
                  {isCompleted ? (
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path d="M2 6L5 9L10 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  ) : stepNum}
                </div>
                {labels && (
                  <span className={`hidden sm:block text-xs font-medium truncate max-w-[72px] text-center
                    ${isCurrent ? 'text-brand-500' : 'text-gray-400 dark:text-gray-600'}`}>
                    {labels[i]}
                  </span>
                )}
              </div>
              {i < totalSteps - 1 && (
                <div className="flex-1 mx-2 h-0.5 mb-5 sm:mb-7">
                  <div className={`h-full rounded-full transition-all duration-500
                    ${stepNum < currentStep ? 'bg-brand-500' : 'bg-gray-200 dark:bg-gray-700'}`} />
                </div>
              )}
            </React.Fragment>
          )
        })}
      </div>
    </div>
  )
}

// ─── Tooltip ──────────────────────────────────────────────────────────────────
export function Tooltip({ content, children }) {
  const [visible, setVisible] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    function handler(e) {
      if (ref.current && !ref.current.contains(e.target)) setVisible(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  return (
    <span ref={ref} className="relative inline-flex">
      <button
        type="button"
        onMouseEnter={() => setVisible(true)}
        onMouseLeave={() => setVisible(false)}
        onFocus={() => setVisible(true)}
        onBlur={() => setVisible(false)}
        className="text-gray-400 hover:text-brand-500 transition-colors"
        aria-label="More information"
      >
        {children || <Info size={14} />}
      </button>
      {visible && (
        <span className="absolute z-50 bottom-full left-1/2 -translate-x-1/2 mb-2
                         w-56 p-2.5 rounded-lg text-xs leading-relaxed
                         bg-gray-900 dark:bg-gray-700 text-gray-100
                         shadow-xl pointer-events-none">
          {content}
          <span className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-900 dark:border-t-gray-700" />
        </span>
      )}
    </span>
  )
}

// ─── Field Label with optional Tooltip ────────────────────────────────────────
export function FieldLabel({ label, tooltip, required }) {
  return (
    <div className="flex items-center gap-1.5 mb-1.5">
      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
        {label}
        {required && <span className="text-brand-500 ml-0.5">*</span>}
      </label>
      {tooltip && <Tooltip content={tooltip} />}
    </div>
  )
}

// ─── Slider with value display ─────────────────────────────────────────────────
export function ScoreSlider({ label, tooltip, value, onChange, name }) {
  const labels = ['', 'Very Weak', 'Weak', 'Below Avg', 'Below Avg', 'Average', 'Above Avg', 'Good', 'Strong', 'Very Strong', 'Exceptional']
  const colors = [
    '',
    'text-red-500', 'text-red-400', 'text-orange-500', 'text-orange-400',
    'text-yellow-500', 'text-yellow-400', 'text-lime-500', 'text-green-500',
    'text-emerald-500', 'text-emerald-600',
  ]

  const pct = ((value - 1) / 9) * 100

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <FieldLabel label={label} tooltip={tooltip} />
        <div className="flex items-center gap-2">
          <span className={`text-xs font-medium ${colors[value]}`}>{labels[value]}</span>
          <span className="text-sm font-bold text-brand-500 tabular-nums w-5 text-right">{value}</span>
        </div>
      </div>
      <div className="relative">
        <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-2 rounded-full overflow-hidden bg-gray-200 dark:bg-gray-700">
          <div
            className="h-full bg-gradient-to-r from-red-400 via-yellow-400 to-emerald-500 transition-all duration-150"
            style={{ width: `${pct}%` }}
          />
        </div>
        <input
          type="range"
          name={name}
          min={1}
          max={10}
          value={value}
          onChange={e => onChange(Number(e.target.value))}
          className="relative w-full h-2 opacity-0 cursor-pointer"
          style={{ zIndex: 1 }}
        />
        {/* Visible thumb */}
        <div
          className="absolute top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-brand-500
                     border-2 border-white dark:border-gray-900 shadow-md pointer-events-none transition-all duration-150"
          style={{ left: `calc(${pct}% - 10px)` }}
        />
      </div>
    </div>
  )
}

// ─── Confidence Gauge ─────────────────────────────────────────────────────────
export function ConfidenceGauge({ score }) {
  const radius = 52
  const stroke = 8
  const normalizedRadius = radius - stroke / 2
  const circumference = normalizedRadius * 2 * Math.PI
  const halfCirc = circumference / 2
  const offset = halfCirc - (score / 100) * halfCirc

  const color =
    score >= 80 ? '#10b981' :
    score >= 60 ? '#f59e0b' :
    score >= 40 ? '#f97316' :
    '#ef4444'

  return (
    <div className="flex flex-col items-center gap-1">
      <div className="relative">
        <svg width={radius * 2} height={radius + stroke} viewBox={`0 0 ${radius * 2} ${radius + stroke}`}>
          {/* Background arc */}
          <path
            d={`M ${stroke / 2},${radius} A ${normalizedRadius},${normalizedRadius} 0 0,1 ${radius * 2 - stroke / 2},${radius}`}
            fill="none"
            stroke="currentColor"
            strokeWidth={stroke}
            className="text-gray-200 dark:text-gray-700"
            strokeLinecap="round"
          />
          {/* Foreground arc */}
          <path
            d={`M ${stroke / 2},${radius} A ${normalizedRadius},${normalizedRadius} 0 0,1 ${radius * 2 - stroke / 2},${radius}`}
            fill="none"
            stroke={color}
            strokeWidth={stroke}
            strokeLinecap="round"
            strokeDasharray={`${halfCirc} ${halfCirc}`}
            strokeDashoffset={offset}
            style={{ transition: 'stroke-dashoffset 0.6s ease, stroke 0.4s ease' }}
          />
        </svg>
        <div className="absolute inset-x-0 bottom-0 flex flex-col items-center">
          <span className="text-2xl font-bold tabular-nums" style={{ color }}>{score}%</span>
        </div>
      </div>
      <p className="text-xs text-gray-500 dark:text-gray-400 font-medium text-center">
        Data Confidence
      </p>
    </div>
  )
}

// ─── Valuation Card ───────────────────────────────────────────────────────────
export function ValuationCard({ label, value, description, highlight, icon: Icon }) {
  return (
    <div className={`rounded-xl p-4 border transition-all ${
      highlight
        ? 'bg-brand-500 border-brand-400 text-white'
        : 'bg-white dark:bg-gray-900 border-gray-100 dark:border-gray-800'
    }`}>
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1 min-w-0">
          <p className={`text-xs font-medium mb-1 ${highlight ? 'text-brand-100' : 'text-gray-500 dark:text-gray-400'}`}>
            {label}
          </p>
          <p className={`text-xl font-bold truncate ${highlight ? 'text-white' : 'text-gray-900 dark:text-white'}`}>
            {value}
          </p>
          {description && (
            <p className={`text-xs mt-1 leading-relaxed ${highlight ? 'text-brand-100' : 'text-gray-500 dark:text-gray-400'}`}>
              {description}
            </p>
          )}
        </div>
        {Icon && (
          <div className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center ${
            highlight ? 'bg-white/20' : 'bg-brand-50 dark:bg-brand-500/10'
          }`}>
            <Icon size={16} className={highlight ? 'text-white' : 'text-brand-500'} />
          </div>
        )}
      </div>
    </div>
  )
}

// ─── Number Input ─────────────────────────────────────────────────────────────
export function NumberInput({ label, tooltip, value, onChange, placeholder, prefix, suffix, min, max, step, helper }) {
  return (
    <div>
      <FieldLabel label={label} tooltip={tooltip} />
      <div className="relative">
        {prefix && (
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-gray-400 pointer-events-none select-none">
            {prefix}
          </span>
        )}
        <input
          type="number"
          value={value === 0 ? '' : value}
          onChange={e => {
            const v = e.target.value
            if (v === '') { onChange(0); return }
            const n = parseFloat(v)
            if (!isNaN(n)) onChange(n)
          }}
          placeholder={placeholder || '0'}
          min={min}
          max={max}
          step={step || 'any'}
          className={`input-field no-spinner ${prefix ? 'pl-7' : ''} ${suffix ? 'pr-10' : ''}`}
        />
        {suffix && (
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-400 pointer-events-none select-none">
            {suffix}
          </span>
        )}
      </div>
      {helper && <p className="helper-text">{helper}</p>}
    </div>
  )
}

// ─── Breadcrumb / Step header ─────────────────────────────────────────────────
export function StepHeader({ step, title, description }) {
  return (
    <div className="mb-6">
      <p className="text-xs font-semibold text-brand-500 uppercase tracking-wider mb-1">
        Step {step}
      </p>
      <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">{title}</h2>
      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{description}</p>
    </div>
  )
}

// ─── Select Field ──────────────────────────────────────────────────────────────
export function SelectField({ label, tooltip, value, onChange, options, helper }) {
  return (
    <div>
      <FieldLabel label={label} tooltip={tooltip} required />
      <div className="relative">
        <select
          value={value}
          onChange={e => onChange(e.target.value)}
          className="input-field appearance-none pr-10 cursor-pointer"
        >
          <option value="">Select an option…</option>
          {options.map(opt => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
        <ChevronRight size={16} className="absolute right-3 top-1/2 -translate-y-1/2 rotate-90 text-gray-400 pointer-events-none" />
      </div>
      {helper && <p className="helper-text">{helper}</p>}
    </div>
  )
}

// ─── Info Alert ───────────────────────────────────────────────────────────────
export function InfoAlert({ children, variant = 'info' }) {
  const styles = {
    info:    'bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-900 text-blue-800 dark:text-blue-300',
    warning: 'bg-amber-50 dark:bg-amber-950/30 border-amber-200 dark:border-amber-900 text-amber-800 dark:text-amber-300',
    success: 'bg-emerald-50 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-900 text-emerald-800 dark:text-emerald-300',
  }
  return (
    <div className={`rounded-xl p-3 border text-sm ${styles[variant]}`}>
      {children}
    </div>
  )
}
