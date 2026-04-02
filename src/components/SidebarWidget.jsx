import React, { useState } from 'react'
import { motion } from 'framer-motion'

export default function SidebarWidget() {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleEmailSubmit = async (e) => {
    e.preventDefault()
    if (!email || !name) return
    
    setIsLoading(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    setIsLoading(false)
    setIsSubmitted(true)
  }

  return (
    <aside className="space-y-6">
      {/* Email Capture Widget */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm overflow-hidden"
      >
        <div className="bg-gradient-to-r from-brand-500 to-brand-600 p-4">
          <h3 className="text-white font-bold text-lg flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            Get Your Free Valuation Report
          </h3>
          <p className="text-brand-100 text-sm mt-1">
            Download a PDF with detailed analysis
          </p>
        </div>
        
        <div className="p-5">
          {!isSubmitted ? (
            <form onSubmit={handleEmailSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                  Your Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="John Doe"
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="john@startup.com"
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all"
                  required
                />
              </div>
              
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 rounded-xl bg-brand-500 hover:bg-brand-600 active:bg-brand-700 text-white font-semibold text-sm transition-all duration-200 shadow-lg shadow-brand-500/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Sending...
                  </>
                ) : (
                  <>
                    Send Me The Report
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path d="M3 7h8M8 4l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </>
                )}
              </button>
              
              <p className="text-xs text-gray-500 dark:text-gray-500 text-center">
                No spam. Unsubscribe anytime.
              </p>
            </form>
          ) : (
            <div className="text-center py-4">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                <svg className="w-8 h-8 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                You're on the list!
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Check your inbox for the valuation guide.
              </p>
            </div>
          )}
        </div>
      </motion.div>

      {/* Schedule a Call Widget */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm overflow-hidden"
      >
        <div className="p-5">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
              <svg className="w-6 h-6 text-purple-600 dark:text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <h3 className="text-gray-900 dark:text-white font-bold text-lg">
                Schedule a Free Call
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                15-min valuation review
              </p>
            </div>
          </div>
          
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
            Talk to a SaaS valuation expert. Get personalized insights on your startup's worth and actionable steps to increase your valuation.
          </p>
          
          <ul className="space-y-2 mb-5">
            {[
              'Personalized valuation analysis',
              'Stage-specific recommendations',
              'Investor-ready presentation tips',
              'Free follow-up resources'
            ].map((item, idx) => (
              <li key={idx} className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                <svg className="w-4 h-4 text-green-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                {item}
              </li>
            ))}
          </ul>
          
          <a
            href="https://calendly.com/saasfactor/valuation-call"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-3 rounded-xl bg-purple-500 hover:bg-purple-600 active:bg-purple-700 text-white font-semibold text-sm transition-all duration-200 shadow-lg shadow-purple-500/20 flex items-center justify-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Book Your Free Slot
          </a>
        </div>
      </motion.div>

      {/* Quick Stats Widget */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-5 text-white"
      >
        <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
          <svg className="w-5 h-5 text-brand-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
          2026 Market Data
        </h3>
        
        <div className="space-y-4">
          <div>
            <div className="text-3xl font-bold text-brand-400">$390B</div>
            <div className="text-sm text-gray-400">Global SaaS Market Size</div>
          </div>
          
          <div className="border-t border-gray-700 pt-4">
            <div className="text-3xl font-bold text-brand-400">4.5x</div>
            <div className="text-sm text-gray-400">Median ARR Multiple</div>
          </div>
          
          <div className="border-t border-gray-700 pt-4">
            <div className="text-3xl font-bold text-brand-400">15x</div>
            <div className="text-sm text-gray-400">AI SaaS Premium Multiple</div>
          </div>
        </div>
      </motion.div>

      {/* Trust Badges */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-5"
      >
        <p className="text-xs text-gray-500 dark:text-gray-500 text-center mb-4 uppercase tracking-wide font-medium">
          Trusted by founders at
        </p>
        <div className="grid grid-cols-3 gap-4 opacity-60">
          {['Y Combinator', 'Techstars', '500 Startups'].map((name, idx) => (
            <div key={idx} className="text-center">
              <div className="text-xs font-semibold text-gray-600 dark:text-gray-400">{name}</div>
            </div>
          ))}
        </div>
      </motion.div>
    </aside>
  )
}
