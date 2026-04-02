import React from 'react'
import { motion } from 'framer-motion'

export default function BlogPost() {
  return (
    <article className="blog-post">

      {/* Key Takeaways Box */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="bg-brand-50 dark:bg-brand-900/20 border border-brand-200 dark:border-brand-800 rounded-xl p-5 mb-8"
      >
        <h2 className="flex items-center gap-2 text-lg font-bold text-gray-900 dark:text-white mb-4">
          <span className="text-xl">🔑</span> Key Takeaways
        </h2>
        <ul className="space-y-2.5 text-sm text-gray-700 dark:text-gray-300">
          <li className="flex gap-3">
            <span className="text-brand-500 font-bold flex-shrink-0">•</span>
            <span>SaaS valuation is a weighted blend of up to four institutional-grade methods, calibrated by your funding stage — not a single ARR multiple.</span>
          </li>
          <li className="flex gap-3">
            <span className="text-brand-500 font-bold flex-shrink-0">•</span>
            <span>In 2026, private SaaS companies typically trade at 3x–7x ARR; AI SaaS commands up to 15x revenue multiples.</span>
          </li>
          <li className="flex gap-3">
            <span className="text-brand-500 font-bold flex-shrink-0">•</span>
            <span>The Berkus and Scorecard methods work for pre-revenue startups — no ARR required at Pre-Seed.</span>
          </li>
          <li className="flex gap-3">
            <span className="text-brand-500 font-bold flex-shrink-0">•</span>
            <span>ARR growth rate, gross margin, and Net Revenue Retention are the top three levers that move your multiple.</span>
          </li>
          <li className="flex gap-3">
            <span className="text-brand-500 font-bold flex-shrink-0">•</span>
            <span>A 12-month focus on reducing churn and improving expansion revenue can add 1x–2x to your exit multiple.</span>
          </li>
          <li className="flex gap-3">
            <span className="text-brand-500 font-bold flex-shrink-0">•</span>
            <span>Saasfactor's free calculator runs all four methods instantly with a live confidence score and a blended valuation.</span>
          </li>
          <li className="flex gap-3">
            <span className="text-brand-500 font-bold flex-shrink-0">•</span>
            <span>The global SaaS market is projected to hit $390 billion in 2026 — knowing your number is no longer optional.</span>
          </li>
        </ul>
      </motion.div>

      {/* Introduction */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="prose-content"
      >
        <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
          Here's a question I hear from founders almost every week: "What's my SaaS worth?" Most of them don't have an answer. Not a rough one. Not even a range.
        </p>
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
          I've watched founders walk into investor meetings citing a number they pulled from a Twitter thread or a three-year-old blog post. That doesn't work anymore. Not in 2026, when the market has rewired itself around fundamentals — and expects you to know yours.
        </p>
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
          The global SaaS market is projected to hit $390 billion this year, growing at a CAGR of 18.7% through 2030. There's serious capital in this space. But the era of growth-at-any-cost multiples ended in 2022, and it's not coming back. Investors want substance. You need to show up with numbers.
        </p>
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-8">
          That's what the Saasfactor SaaS Valuation Calculator was built for. Not another ARR-times-a-number shortcut. A real, multi-method tool modeled on how investors actually think. Here's everything you need to understand it, use it, and defend it in any room.
        </p>
      </motion.div>

      {/* H2: What Is SaaS Valuation? */}
      <motion.section
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25 }}
        className="mb-10"
      >
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 pb-2 border-b border-gray-200 dark:border-gray-700">
          What Is SaaS Valuation?
        </h2>
        
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
          SaaS valuation is the process of estimating what your software business is worth to an investor, acquirer, or the market — right now. It's not your revenue. It's not your ARR. It's a forward-looking number that blends current financial performance with growth trajectory, market position, and business quality.
        </p>

        <div className="bg-gray-50 dark:bg-gray-800/50 border-l-4 border-brand-500 rounded-r-lg p-4 my-6">
          <p className="text-sm text-gray-700 dark:text-gray-300 italic">
            <strong>Definition:</strong> SaaS business valuation is the systematic estimation of a company's enterprise value using a combination of financial metrics (ARR, growth rate, gross margin) and qualitative signals (team strength, product defensibility, market size). The goal is to arrive at a number that a rational buyer or investor would pay today for ownership of future cash flows.
          </p>
        </div>

        <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
          <strong>Key goal:</strong> estimating company worth based on performance metrics — not feelings, not comparable funding rounds from 2021, and not what your co-founder told you at dinner.
        </p>

        <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
          Valuation is needed in three main situations:
        </p>

        <ul className="space-y-2 text-gray-700 dark:text-gray-300 mb-6 ml-5">
          <li className="list-disc"><strong>Fundraising</strong> — you need a defensible pre-money valuation before you can negotiate a term sheet. "We think we're worth about $10M" is not a strategy.</li>
          <li className="list-disc"><strong>M&A (mergers & acquisitions)</strong> — acquirers back-calculate from your ARR and growth before making any offer. If you don't know the math, they're doing it without you.</li>
          <li className="list-disc"><strong>Internal benchmarking</strong> — smart founders track valuation trajectory like a KPI. It tells you which levers to pull six months before you actually need the number.</li>
        </ul>

        <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
          According to SaaS Capital, the median private B2B SaaS company ARR multiple stabilized in the 4.8x–5.3x range in 2025. That is the market. The question is: where do you sit within it?
        </p>

        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 mt-6">
          Who Can Benefit from a SaaS Valuation?
        </h3>

        <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
          Short answer: anyone with equity in a SaaS business. But different stakeholders use the output differently — so let's be precise.
        </p>

        <ul className="grid sm:grid-cols-2 gap-3 text-sm text-gray-700 dark:text-gray-300 mb-6">
          {[
            'Startup Founders — building toward a funding round or exit and need a number that holds up under investor scrutiny',
            'Investors & Venture Capitalists — benchmarking a target against comparable funded startups before committing to diligence',
            'SaaS Business Owners — understanding their market position before engaging buyers or growth advisors',
            'Financial Analysts — running quick-turn scenario analysis and stress tests ahead of formal due diligence',
            'Buyers & Acquirers — back-of-envelope sanity checks before committing to a full acquisition process',
            'Consultants & Advisors — giving clients a market-calibrated starting point, grounded in 2026 data',
            'CFOs / Finance Leaders — tracking valuation health between funding rounds and modeling fundraising scenarios',
            'Private Equity Firms — screening deal flow against stage-appropriate multiples without burning analyst hours',
            'Board Members — holding management accountable to valuation-building metrics, not just revenue',
            'M&A Specialists — triangulating deal pricing against the four institutional valuation methods',
            'Corporate Strategists — evaluating build-vs-buy decisions by understanding what target acquisitions are worth'
          ].map((item, idx) => (
            <li key={idx} className="flex gap-2 items-start">
              <span className="text-brand-500 mt-0.5">✓</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>

        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
          If you have a stake in a SaaS business, you should know what it's worth. That's not optional in 2026 — it's table stakes.
        </p>
      </motion.section>

      {/* H2: How Does Our SaaS Valuation Calculator Work? */}
      <motion.section
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mb-10"
      >
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 pb-2 border-b border-gray-200 dark:border-gray-700">
          How Does Our SaaS Valuation Calculator Work?
        </h2>

        <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
          The Saasfactor calculator runs four proven valuation methods simultaneously — the same frameworks used by angel investors, VCs, and M&A advisors — and blends them based on which methods are most appropriate for your funding stage. No heavy math on your end. The engine does it.
        </p>

        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 mt-5">Here's what you put in:</h3>
        <ul className="space-y-2 text-gray-700 dark:text-gray-300 mb-5 ml-5">
          <li className="list-disc"><strong>Monthly Recurring Revenue (MRR)</strong> or <strong>Annual Recurring Revenue (ARR)</strong> — ARR takes precedence; MRR is auto-annualized (×12) if no ARR is entered</li>
          <li className="list-disc"><strong>Growth rate</strong> — your year-over-year ARR growth as a percentage</li>
          <li className="list-disc"><strong>Churn rate</strong> — the percentage of customers or revenue lost over a period; low churn signals product stickiness and directly lifts the blended valuation output</li>
          <li className="list-disc"><strong>Profitability (optional)</strong> — investor assumptions including expected exit value, IRR target, years to exit, and dilution; auto-estimated from stage benchmarks if skipped</li>
        </ul>

        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Here's what you get out:</h3>
        <ul className="space-y-2 text-gray-700 dark:text-gray-300 mb-6 ml-5">
          <li className="list-disc">An estimated valuation range — a blended output across all four methods, weighted by stage</li>
          <li className="list-disc">The specific revenue multiple applied to your industry (e.g., AI SaaS at 15x, General SaaS at 8x)</li>
          <li className="list-disc">Individual method breakdowns — each method shown separately with formula transparency</li>
          <li className="list-disc">A live confidence score (0–100%) — updates as you fill in data, tells you how much to trust your result</li>
          <li className="list-disc">Real-world startup examples — Stripe, Airbnb, Snowflake, Canva, and more, with actual historical valuations</li>
        </ul>

        <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
          The four-step wizard takes under five minutes. At Pre-Seed, financials are optional — the Berkus and Scorecard methods don't need them. At Series A, every field you complete materially sharpens the output.
        </p>

        <div className="bg-gray-50 dark:bg-gray-800/50 border-l-4 border-brand-500 rounded-r-lg p-4 my-6">
          <p className="text-sm text-gray-700 dark:text-gray-300 italic">
            "If a company gives me their ARR, gross margin, and EBITDA, I can give them a rough estimate. But you want a specific and accurate multiple. The more KPIs and financial data I have, the more accurate your valuation will be." — Aaron Solganick, SaaS M&A Advisor (via Axial, 2025)
          </p>
        </div>

        <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
          The calculator runs four parallel valuation methods, blends them via stage-weighted averaging, calculates a confidence score from 0–100%, and outputs a full results dashboard. Here's how each method works:
        </p>

        <div className="space-y-4 mt-5">
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4">
            <h4 className="font-semibold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-brand-100 dark:bg-brand-900/30 text-brand-600 dark:text-brand-400 flex items-center justify-center text-sm font-bold">1</span>
              Berkus Method
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Created by angel investor Dave Berkus. Scores five factors — Team, Product, Market, Traction, GTM — at up to $500K each for a max possible valuation of $2.5M. Built for pre-revenue startups. Stage weight: 40% at Pre-Seed.
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4">
            <h4 className="font-semibold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-brand-100 dark:bg-brand-900/30 text-brand-600 dark:text-brand-400 flex items-center justify-center text-sm font-bold">2</span>
              Scorecard Method
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Developed by Bill Payne. Benchmarks your startup against a $5M regional baseline using six weighted qualitative factors. Team carries 30%. Market carries 25%. Ideal for Seed-stage with limited financial history.
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4">
            <h4 className="font-semibold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-brand-100 dark:bg-brand-900/30 text-brand-600 dark:text-brand-400 flex items-center justify-center text-sm font-bold">3</span>
              ARR Multiple Method
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              The investor-standard revenue multiple. Takes ARR × industry-specific multiple (15x for AI SaaS down to 4x for E-Commerce Software). Only runs if you have revenue. Stage weight: 40% at Series A.
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4">
            <h4 className="font-semibold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-brand-100 dark:bg-brand-900/30 text-brand-600 dark:text-brand-400 flex items-center justify-center text-sm font-bold">4</span>
              VC Perspective Method
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Back-calculates present value from a future exit. Formula: PV = Exit Value ÷ (1 + IRR)^Years × (1 − Dilution). Auto-estimates if you skip the investor assumptions step. Always produces a value.
            </p>
          </div>
        </div>
      </motion.section>

      {/* H2: What Factors Influence SaaS Valuation Calculation */}
      <motion.section
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35 }}
        className="mb-10"
      >
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 pb-2 border-b border-gray-200 dark:border-gray-700">
          What Factors Influence SaaS Valuation Calculation
        </h2>

        <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
          The calculator captures these. But understanding why they move the needle is how you actually use the output — and how you build a plan to push your multiple higher.
        </p>

        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Revenue (ARR / MRR)</h3>
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
          Recurring revenue is the foundation of every SaaS valuation. Not because it's the biggest number — but because it's the most predictable. Predictability is what investors actually pay for.
        </p>
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
          <strong>Why ARR takes precedence over MRR:</strong> ARR (Annual Recurring Revenue) captures your committed, contracted revenue over a 12-month period. MRR is the monthly snapshot. When both exist, ARR wins — it strips out monthly noise and signals durability. The calculator auto-annualizes MRR (×12) if you haven't entered ARR, but ARR-first inputs always produce tighter, more credible outputs.
        </p>
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
          <strong>ARR vs MRR — what matters to investors:</strong> ARR is the metric that M&A advisors, growth equity firms, and VCs anchor on. It drives the ARR Multiple Method directly. MRR is useful for tracking momentum month-to-month but is rarely the headline number in a term sheet or acquisition offer.
        </p>

        <div className="flex items-start gap-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 my-5">
          <span className="text-xl">📊</span>
          <p className="text-sm text-gray-700 dark:text-gray-300">
            <strong>Stat:</strong> As of early 2026, private SaaS companies in the lower middle market ($5M–$50M enterprise value) trade at 3x–7x ARR, with a median around 4.5x. That range has held steady since mid-2024 (Livmo, 2026).
          </p>
        </div>

        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 mt-8">Growth Rate</h3>
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
          High growth = higher multiples. This isn't a cliché — it's the core equation. Companies growing above 40% annually consistently land in the 8x–10x ARR range. Companies growing at low-teens with negative margins tend to sit in the 2x–3x zone. The gap is wide and very real.
        </p>
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
          <strong>Benchmarks by stage:</strong> According to SaaS Capital's 2025 survey of over 1,000 private B2B SaaS companies, the median growth rate is 25%. Early-stage startups at Pre-Seed or Seed are expected to show 80%+ growth. Mature SaaS businesses (Series B+) that have scaled past $10M ARR can command premium multiples even at 30–40% growth if margins support it.
        </p>
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
          <strong>The catch in 2026:</strong> growth alone no longer commands a premium. By Q4 2025, median revenue growth among public SaaS companies fell to 12.2%, and investors have repriced growth-at-any-cost accordingly. The market now rewards growth plus efficiency together.
        </p>

        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 mt-8">Churn Rate</h3>
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
          Churn is a valuation killer. A SaaS business losing 15% of its customers annually isn't growing — it's running on a treadmill. And buyers can see it in the cohort data before you finish your pitch.
        </p>
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
          <strong>Impact of customer loss:</strong> High churn compresses multiples at every stage. It signals that your product doesn't deliver enough value to keep customers locked in — and that your growth numbers are papering over a leaky bucket.
        </p>
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
          <strong>Why low churn increases valuation:</strong> NRR (Net Revenue Retention) above 110% consistently unlocks premium conversations with acquirers. It means your existing customers are expanding — which is the highest-quality, lowest-CAC growth possible. Below 95% NRR, buyers start modeling revenue decline into their offers. That's a structural haircut on your multiple.
        </p>

        <div className="flex items-start gap-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 my-5">
          <span className="text-xl">📊</span>
          <p className="text-sm text-gray-700 dark:text-gray-300">
            <strong>Stat:</strong> A 12-month investment in reducing churn and improving expansion revenue can add 1x–2x to your exit multiple. At $5M ARR, that's $5M–$10M in additional exit value (Acquiry, 2026).
          </p>
        </div>

        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 mt-8">Customer Acquisition Cost (CAC) & LTV</h3>
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
          <strong>Efficiency of growth:</strong> CAC and LTV (Lifetime Value) reveal whether your growth engine is economically sustainable. A company growing fast by burning $3 in sales and marketing for every $1 in new ARR is not building a durable business. An investor will see that.
        </p>
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
          <strong>LTV:CAC ratio importance:</strong> A ratio of 3:1 or above is the baseline signal that you have a viable, scalable growth model. Below 2:1, acquirers and investors get nervous about what it actually costs to grow. The calculator uses your ARR, growth rate, and gross margin to indirectly capture this efficiency signal in the blended output.
        </p>
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
          The best SaaS companies — Snowflake at 174% NRR, Zoom at rapid enterprise expansion — get high multiples not just because they grow fast, but because their unit economics prove that every dollar of growth is creating compounding value.
        </p>

        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 mt-8">Profitability & Margins</h3>
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
          <strong>When profits matter vs growth stage:</strong> At Pre-Seed and Seed, investors don't expect profitability — they expect a credible path to it. At Series A and beyond, the Rule of 40 becomes the dominant benchmark.
        </p>
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
          <strong>The Rule of 40:</strong> add your revenue growth rate to your EBITDA margin. Above 40 signals a healthy business. Above 50 commands a premium. A company growing at 30% with a 10% EBITDA margin hits exactly 40 — and that's a business investors take seriously in 2026.
        </p>
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
          Gross margin matters more than it did in 2021. According to 2026 private market transaction data, EBITDA-positive SaaS companies in the $5M–$50M ARR range are commanding a 20%–40% premium over comparable cash-burning businesses. A SaaS business with 80% gross margins is materially more valuable than one with 60% margins at the same ARR — because the higher-margin business generates more cash to fund growth.
        </p>
      </motion.section>

      {/* H2: SaaS Valuation Multiples Explained */}
      <motion.section
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mb-10"
      >
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 pb-2 border-b border-gray-200 dark:border-gray-700">
          SaaS Valuation Multiples Explained
        </h2>

        <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
          A valuation multiple is the ratio between your company's enterprise value and a financial metric — almost always ARR for SaaS. If your company is valued at $8M and has $1M ARR, your multiple is 8x. Simple math. Complex inputs.
        </p>

        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">What multiples are — and aren't:</h3>
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
          A multiple isn't a fixed rule. It's an output of how investors weigh growth, retention, margin, market size, and risk against each other for your specific business at this specific moment.
        </p>

        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Typical SaaS revenue multiples in 2026:</h3>
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
          Private SaaS companies typically trade at 3x–7x ARR, with a median around 4.5x for bootstrapped businesses and 5.3x for equity-backed companies. Public SaaS sits higher — approximately 6–7x EV/Revenue at the median, with top-quartile companies reaching 13–14x. AI SaaS is the outlier, commanding up to 15x revenue multiples on the strength of growth velocity and strategic scarcity.
        </p>

        <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
          The Saasfactor calculator uses these 2026-calibrated industry multiples:
        </p>

        {/* Multiples Table */}
        <div className="overflow-x-auto my-6">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-gray-100 dark:bg-gray-800">
                <th className="text-left p-3 font-semibold text-gray-900 dark:text-white border-b-2 border-gray-300 dark:border-gray-600">Industry</th>
                <th className="text-left p-3 font-semibold text-gray-900 dark:text-white border-b-2 border-gray-300 dark:border-gray-600">Revenue Multiple</th>
                <th className="text-left p-3 font-semibold text-gray-900 dark:text-white border-b-2 border-gray-300 dark:border-gray-600">Exit Multiple</th>
                <th className="text-left p-3 font-semibold text-gray-900 dark:text-white border-b-2 border-gray-300 dark:border-gray-600">Stage Fit</th>
                <th className="text-left p-3 font-semibold text-gray-900 dark:text-white border-b-2 border-gray-300 dark:border-gray-600">Notes</th>
              </tr>
            </thead>
            <tbody className="text-gray-700 dark:text-gray-300">
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <td className="p-3 font-medium">AI SaaS</td>
                <td className="p-3">15x</td>
                <td className="p-3">8x</td>
                <td className="p-3">Any</td>
                <td className="p-3">Highest premium in market</td>
              </tr>
              <tr className="border-b border-gray-200 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/30">
                <td className="p-3 font-medium">SaaS (General)</td>
                <td className="p-3">8x</td>
                <td className="p-3">5x</td>
                <td className="p-3">Seed–Series A</td>
                <td className="p-3">Investor-standard benchmark</td>
              </tr>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <td className="p-3 font-medium">Fintech</td>
                <td className="p-3">6x</td>
                <td className="p-3">4x</td>
                <td className="p-3">Seed+</td>
                <td className="p-3">Regulation = discount</td>
              </tr>
              <tr className="border-b border-gray-200 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/30">
                <td className="p-3 font-medium">Marketplace Software</td>
                <td className="p-3">5x</td>
                <td className="p-3">4x</td>
                <td className="p-3">Series A+</td>
                <td className="p-3">Take-rate scrutinized</td>
              </tr>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <td className="p-3 font-medium">Other B2B Software</td>
                <td className="p-3">5x</td>
                <td className="p-3">3x</td>
                <td className="p-3">Seed+</td>
                <td className="p-3">Enterprise stickiness wins</td>
              </tr>
              <tr className="border-b border-gray-200 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/30">
                <td className="p-3 font-medium">E-Commerce Software</td>
                <td className="p-3">4x</td>
                <td className="p-3">3x</td>
                <td className="p-3">Growth</td>
                <td className="p-3">Margin-sensitive buyers</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Factors influencing your multiple up or down:</h3>
        <ul className="space-y-3 text-gray-700 dark:text-gray-300 mb-6 ml-5">
          <li className="list-disc"><strong>Market conditions</strong> — interest rates, VC risk appetite, IPO pipeline, and dry powder levels all shift the baseline. The SaaS Capital Index stood at approximately 7.0x run-rate ARR in mid-2025 — down from the 18.6x peak of late 2021.</li>
          <li className="list-disc"><strong>Niche and industry</strong> — AI SaaS trades at 15x; general E-Commerce Software at 4x. The sector you're in sets your ceiling before any other factor comes into play.</li>
          <li className="list-disc"><strong>Competitive advantage</strong> — deep switching costs, proprietary data, or network effects justify premium multiples. CrowdStrike trades above 20x on category dominance alone. That's not growth — that's moat, monetized.</li>
          <li className="list-disc"><strong>Customer concentration</strong> — a single client at 40% of ARR compresses multiples by 20–40% regardless of growth rate. Diversified revenue gets rewarded; concentration risk gets punished.</li>
          <li className="list-disc"><strong>Rule of 40 performance</strong> — a 10-point increase in Rule of 40 score corresponds to approximately +2.2x on EV/Revenue in current market data.</li>
        </ul>

        <div className="bg-gray-50 dark:bg-gray-800/50 border-l-4 border-brand-500 rounded-r-lg p-4 my-6">
          <p className="text-sm text-gray-700 dark:text-gray-300 italic">
            "The multiple compression of 2022 was painful for founders who had raised at peak valuations. But the repricing was necessary and healthy. The multiples that have emerged are more durable. AI-native businesses are commanding a genuine premium because they have fundamentally better economics, not just better stories." — Joash Boyton, Acquiry (2026)
          </p>
        </div>

        <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
          The stage-weight table below shows how the calculator blends all four methods at each stage:
        </p>

        {/* Stage Weight Table */}
        <div className="overflow-x-auto my-6">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-gray-100 dark:bg-gray-800">
                <th className="text-left p-3 font-semibold text-gray-900 dark:text-white border-b-2 border-gray-300 dark:border-gray-600">Valuation Method</th>
                <th className="text-center p-3 font-semibold text-gray-900 dark:text-white border-b-2 border-gray-300 dark:border-gray-600">Pre-Seed</th>
                <th className="text-center p-3 font-semibold text-gray-900 dark:text-white border-b-2 border-gray-300 dark:border-gray-600">Seed</th>
                <th className="text-center p-3 font-semibold text-gray-900 dark:text-white border-b-2 border-gray-300 dark:border-gray-600">Series A</th>
              </tr>
            </thead>
            <tbody className="text-gray-700 dark:text-gray-300">
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <td className="p-3 font-medium">Berkus Method</td>
                <td className="p-3 text-center">40%</td>
                <td className="p-3 text-center">20%</td>
                <td className="p-3 text-center">10%</td>
              </tr>
              <tr className="border-b border-gray-200 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/30">
                <td className="p-3 font-medium">Scorecard Method</td>
                <td className="p-3 text-center">40%</td>
                <td className="p-3 text-center">30%</td>
                <td className="p-3 text-center">15%</td>
              </tr>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <td className="p-3 font-medium">ARR Multiple Method</td>
                <td className="p-3 text-center">10%</td>
                <td className="p-3 text-center">30%</td>
                <td className="p-3 text-center">40%</td>
              </tr>
              <tr className="border-b border-gray-200 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/30">
                <td className="p-3 font-medium">VC Perspective Method</td>
                <td className="p-3 text-center">10%</td>
                <td className="p-3 text-center">20%</td>
                <td className="p-3 text-center">35%</td>
              </tr>
            </tbody>
          </table>
        </div>
      </motion.section>

      {/* H2: Interpreting Your Valuation Result */}
      <motion.section
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.45 }}
        className="mb-10"
      >
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 pb-2 border-b border-gray-200 dark:border-gray-700">
          Interpreting Your Valuation Result
        </h2>

        <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
          The calculator gives you a number. Here's what it means — and, critically, what it doesn't.
        </p>

        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">What the estimated valuation means:</h3>
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
          It's the range a rational investor or acquirer might use as a starting anchor given your inputs, stage, and industry. It's calibrated against 2026 private market transaction data and the four institutional methods.
        </p>

        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Why it's a range, not a price:</h3>
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
          Valuation is negotiated, not declared. The blended output gives you a defensible floor for conversations. Two companies with identical ARR can sell for wildly different prices — customer concentration, owner dependency, and buyer competition all move the final number beyond what any model can capture.
        </p>

        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">How to use it:</h3>
        <ul className="space-y-2 text-gray-700 dark:text-gray-300 mb-5 ml-5">
          <li className="list-disc"><strong>Investor discussions</strong> — walk in with a data-backed range instead of a gut number. The method breakdown shows investors you understand how valuation actually works.</li>
          <li className="list-disc"><strong>Strategic planning</strong> — change one input (boost growth rate from 30% to 50%, for example) and watch the output shift. That's how you build a roadmap to a higher multiple.</li>
          <li className="list-disc"><strong>Exit preparation</strong> — identify the specific gap between your current blended valuation and your target exit price. Then work backward to the metrics that close it.</li>
        </ul>

        <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
          The confidence score is your accuracy indicator. A 90%+ score means your inputs are solid — trust the range. A 50% score means the estimate is rough. That's useful to know before you cite the number in a pitch deck.
        </p>

        <div className="flex items-start gap-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 my-5">
          <span className="text-xl">📊</span>
          <p className="text-sm text-gray-700 dark:text-gray-300">
            <strong>Stat:</strong> According to Livmo's 2026 analysis of 100+ lower middle market SaaS transactions, companies with identical financial profiles routinely receive offers that differ by 2x–3x. The variables that drive this gap — customer concentration, owner dependency, strategic buyer competition — don't show up in any multiple table.
          </p>
        </div>
      </motion.section>

      {/* H2: Example SaaS Valuation Scenario */}
      <motion.section
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mb-10"
      >
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 pb-2 border-b border-gray-200 dark:border-gray-700">
          Example SaaS Valuation Scenario
        </h2>

        <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
          Let's run a concrete scenario through the calculator — the kind of company we see at Seed stage regularly.
        </p>

        <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-5 my-6 border border-gray-200 dark:border-gray-700">
          <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3 uppercase tracking-wide">Input</h3>
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="text-gray-500 dark:text-gray-400">Stage</div>
            <div className="text-gray-900 dark:text-white font-medium">Seed</div>
            <div className="text-gray-500 dark:text-gray-400">Industry</div>
            <div className="text-gray-900 dark:text-white font-medium">SaaS</div>
            <div className="text-gray-500 dark:text-gray-400">ARR</div>
            <div className="text-gray-900 dark:text-white font-medium">$1,000,000</div>
            <div className="text-gray-500 dark:text-gray-400">Annual Growth Rate</div>
            <div className="text-gray-900 dark:text-white font-medium">50%</div>
            <div className="text-gray-500 dark:text-gray-400">Gross Margin</div>
            <div className="text-gray-900 dark:text-white font-medium">75%</div>
            <div className="text-gray-500 dark:text-gray-400">Qualitative Avg. Score</div>
            <div className="text-gray-900 dark:text-white font-medium">7 / 10</div>
            <div className="text-gray-500 dark:text-gray-400">ARR Multiple Applied</div>
            <div className="text-gray-900 dark:text-white font-medium">8x (SaaS benchmark)</div>
            <div className="text-gray-500 dark:text-gray-400">Estimated Blended Valuation</div>
            <div className="text-brand-600 dark:text-brand-400 font-bold">~$5.8M – $6.5M</div>
          </div>
        </div>

        <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
          <strong>What the ARR Multiple alone would say:</strong> $1M ARR × 8x = $8M. Clean. But that ignores the Seed-stage weighting entirely.
        </p>
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
          <strong>What the blended calculator actually outputs:</strong> ~$5.8M–$6.5M. At Seed, the ARR Multiple only carries 30% weight. The Scorecard Method (30%) and VC Perspective (20%) bring the blended number down to a more conservative, credible range — one that accounts for the fact that this company has limited financial history.
        </p>
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
          That's the practical difference between a single-method calculator and a stage-aware blended one. The $8M figure would get challenged in any serious investor conversation. The $5.8M–$6.5M range is defensible.
        </p>
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
          For context on what real Seed-stage valuations look like: Canva raised at approximately $3.6M pre-money in 2012, priced largely on the founding team and market size. Uber's first external round priced the company at ~$5.4M pre-money in 2010, benchmarked against comparable SF marketplace startups. These are Scorecard Method outcomes — and they're what informed our $5M regional baseline.
        </p>
      </motion.section>

      {/* H2: Benefits of Using a SaaS Valuation Calculator */}
      <motion.section
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.55 }}
        className="mb-10"
      >
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 pb-2 border-b border-gray-200 dark:border-gray-700">
          Benefits of Using a SaaS Valuation Calculator
        </h2>

        <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
          Why run numbers before talking to an investor? Because showing up with data changes the dynamic entirely — and because "I don't know" is not a negotiating position.
        </p>

        <ul className="space-y-3 text-gray-700 dark:text-gray-300 mb-6 ml-5">
          <li className="list-disc"><strong>Speed</strong> — a calibrated estimate in under five minutes, with zero financial modeling experience required</li>
          <li className="list-disc"><strong>Method transparency</strong> — understand the weight each valuation method carries at your specific stage, not just the output number</li>
          <li className="list-disc"><strong>2026 benchmark clarity</strong> — your multiples are calibrated against current private market transaction data, not 2021 peak-era assumptions</li>
          <li className="list-disc"><strong>Investor readiness</strong> — walk into any room with a defensible, data-backed anchor that can survive scrutiny</li>
          <li className="list-disc"><strong>Scenario modeling</strong> — change a single input — say, NRR from 95% to 115% — and see the valuation impact in real time</li>
          <li className="list-disc"><strong>Education built in</strong> — expandable method cards in the results dashboard explain the formula, applicability, and real-world examples for every method</li>
          <li className="list-disc"><strong>Free and accessible</strong> — no credit card, no sales call, no 48-hour wait for a consultant to call you back</li>
        </ul>

        <div className="flex items-start gap-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 my-5">
          <span className="text-xl">📊</span>
          <p className="text-sm text-gray-700 dark:text-gray-300">
            <strong>Market context:</strong> The global SaaS market is projected to reach $512 billion in 2026 (FE International). Gartner forecasts global software spending will hit $1.43 trillion in 2026 — a 15.2% increase driven by AI-enabled applications. In a market this large, not knowing your valuation is leaving money on the table.
          </p>
        </div>
      </motion.section>

      {/* H2: Limitations of SaaS Valuation Calculators */}
      <motion.section
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="mb-10"
      >
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 pb-2 border-b border-gray-200 dark:border-gray-700">
          Limitations of SaaS Valuation Calculators
        </h2>

        <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
          We built this tool — so we'll be the first to tell you what it can't do. Use it as your calibrated starting point. Don't use it as your final transaction price.
        </p>

        <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
          <strong>It doesn't replace professional valuation.</strong> For any live M&A process or funding round above $5M, bring in an M&A advisor or qualified CFO. The Saasfactor calculator narrows the gap between "I have no idea" and "here's a defensible range" — it doesn't replace the professional who negotiates the final number.
        </p>

        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Things no calculator can fully capture:</h3>
        <ul className="space-y-2 text-gray-700 dark:text-gray-300 mb-6 ml-5">
          <li className="list-disc"><strong>Brand strength and category leadership</strong> — Salesforce and a generic CRM could have identical ARR; the multiple difference is enormous. Qualitative sliders approximate this, but they can't fully price category dominance.</li>
          <li className="list-disc"><strong>Team quality beyond the slider</strong> — a repeat founder with a $500M exit commands a premium that no 1–10 score fully captures.</li>
          <li className="list-disc"><strong>Market trends and timing</strong> — our multiples are calibrated to April 2026 data. Markets move. An AI-adjacent SaaS product that commands 15x today may trade differently in 12 months.</li>
          <li className="list-disc"><strong>Pending legal exposure</strong> — litigation, IP disputes, regulatory risk, and data security issues require a lawyer, not a calculator.</li>
          <li className="list-disc"><strong>Customer concentration risk</strong> — a single client at 40% of ARR compresses multiples by 20–40% regardless of what the model says. This is the silent deal-killer that shows up in due diligence.</li>
        </ul>

        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
          Use the calculator as your directional estimate and your conversational anchor. That's what it was built for — and in that role, it outperforms anything else that's free.
        </p>
      </motion.section>

      {/* H2: How to Increase Your SaaS Valuation */}
      <motion.section
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.65 }}
        className="mb-10"
      >
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 pb-2 border-b border-gray-200 dark:border-gray-700">
          How to Increase Your SaaS Valuation
        </h2>

        <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
          These aren't generic productivity tips. These are the specific levers, backed by 2025–2026 private market data, that move the multiple. Run these in the calculator and watch what happens.
        </p>

        <div className="space-y-6">
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-5">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">1. Improve retention (reduce churn)</h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              NRR above 110% is the single highest-ROI investment before any exit or fundraise. A 12-month focus on reducing churn and improving expansion revenue can add 1x–2x to your exit multiple — $5M–$10M in additional value at $5M ARR. Cut churn before anything else. It's the first thing every serious buyer looks at.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-5">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">2. Increase growth rate sustainably</h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              Companies above 40% annual growth frequently land in the 8x–10x ARR range. But the word "sustainably" matters in 2026 in a way it didn't in 2021. Burning $4 to grow $1 is no longer masked by low interest rates. Show growth that the unit economics can support.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-5">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">3. Optimize pricing strategy</h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              Most SaaS companies are underpriced by 15–30%. A pricing audit — usage-based expansion tiers, annual contract incentives, value-metric-aligned pricing — directly improves both ARR and NRR without adding a single new customer. It's the fastest lever with no additional CAC.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-5">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">4. Improve unit economics</h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              LTV:CAC above 3:1 signals a scalable growth engine. Improve it by reducing CAC (better lead qualification, tighter ICP, shorter sales cycles) or increasing LTV (reduce churn, expand accounts, raise prices). Both paths directly raise your blended valuation output.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-5">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">5. Build a strong competitive moat</h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              Deep product integrations, proprietary data, or network effects translate into premium multiples and lower churn simultaneously. In the current market, buyers pay for durability. A business that would lose 30% of its customers if a competitor dropped price 20% is worth far less than one with structural switching costs — even at identical ARR.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mt-6">
          <span className="text-xl">📊</span>
          <p className="text-sm text-gray-700 dark:text-gray-300">
            <strong>Industry benchmark:</strong> According to Windsor Drake's 2026 SaaS Valuation Report, premium vertical SaaS companies with strong retention and Rule of 40 performance above 50 command 7x–9x ARR. The gap between average and premium SaaS exits has never been wider.
          </p>
        </div>
      </motion.section>

      {/* H2: Why Use Saasfactor's Calculator? */}
      <motion.section
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="mb-10"
      >
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 pb-2 border-b border-gray-200 dark:border-gray-700">
          Why Use Saasfactor's Calculator?
        </h2>

        <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-5">
          There are other valuation tools out there. Most do one thing: multiply your ARR by a fixed number. Here's what makes the Saasfactor calculator different.
        </p>

        <ul className="space-y-2 text-gray-700 dark:text-gray-300 mb-6 ml-5">
          <li className="list-disc"><strong>Fast and simple</strong> — the four-step wizard takes under five minutes with no financial modeling experience required</li>
          <li className="list-disc"><strong>Built for founders</strong> — not financial analysts or M&A bankers. Plain-language explanations at every step</li>
          <li className="list-disc"><strong>Based on real SaaS benchmarks</strong> — industry multiples calibrated to 2026 private market transaction data (AI SaaS at 15x through E-Commerce Software at 4x)</li>
          <li className="list-disc"><strong>Four methods, not one</strong> — Berkus, Scorecard, ARR Multiple, and VC Perspective run simultaneously and blend by stage</li>
          <li className="list-disc"><strong>Stage-aware weighting</strong> — the blend shifts automatically: qualitative methods dominate at Pre-Seed (80%), financial methods dominate at Series A (75%)</li>
          <li className="list-disc"><strong>Live confidence score</strong> — tells you exactly how much to trust your result before you walk into a room</li>
          <li className="list-disc"><strong>Real startup examples</strong> — Stripe at $20M pre-money (2012), Airbnb at $2.4M post-money (2009), Snowflake at $12.4B (2020) — actual historical valuations for context</li>
          <li className="list-disc"><strong>Free and accessible</strong> — no credit card, no demo call, no consulting invoice. Just your number.</li>
        </ul>

        <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-5">
          We built this because too many great founders get lowballed in funding rounds — not because their business is weak, but because they showed up without a defensible number. That's a solvable problem.
        </p>

        <div className="bg-brand-50 dark:bg-brand-900/20 border border-brand-200 dark:border-brand-800 rounded-xl p-5">
          <p className="text-gray-800 dark:text-gray-200 font-medium mb-2">
            👉 Try it: <a href="https://saasfactor.co/saas-valuation-calculator" className="text-brand-600 dark:text-brand-400 hover:underline">saasfactor.co/saas-valuation-calculator</a>
          </p>
        </div>
      </motion.section>

      {/* H2: FAQ Section */}
      <motion.section
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.75 }}
        className="mb-10"
      >
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 pb-2 border-b border-gray-200 dark:border-gray-700">
          FAQ Section
        </h2>

        <div className="space-y-5">
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-5">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">What is a good SaaS valuation multiple?</h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              In 2026, private SaaS companies typically trade at 3x–7x ARR, with a median around 4.5x. High-growth companies (40%+ YoY) with NRR above 110% can reach 8x–10x. AI SaaS commands the highest premiums — up to 15x revenue. Public SaaS sits higher, at approximately 6–7x EV/Revenue at the median.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-5">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">How accurate is this calculator?</h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              It provides a calibrated directional estimate — not a certified appraisal. Accuracy improves with every field you complete, which is the function of the live confidence score. Treat it as a defensible range for investor conversations and scenario planning, not a final transaction price.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-5">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Can early-stage startups use it?</h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              Yes. The Berkus and Scorecard methods don't require any financial data. At Pre-Seed, these two methods together carry 80% of the blended weight. Fill in the six qualitative sliders and you get a solid pre-revenue valuation estimate — the same approach used by Y Combinator and angel investors.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-5">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">What is ARR vs revenue?</h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              ARR (Annual Recurring Revenue) counts only predictable, subscription-based revenue — no one-time fees or professional services. Investors value ARR because it's durable and forecastable. Total revenue includes non-recurring items, which get discounted heavily in SaaS valuations. Always lead with ARR.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-5">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">What is a good ARR multiple for SaaS companies?</h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              It depends on stage, growth, and industry. Public SaaS sits at roughly 6–7x EV/ARR as of 2026. Private bootstrapped companies average 4.8x; equity-backed average 5.3x. AI SaaS with strong NRR can reach 12x–15x. Rule of 40 performance and growth rate are the two biggest determinants.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-5">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">How often should I calculate valuation?</h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              Run it at every major milestone: before a fundraise, after hitting a significant ARR threshold, before any M&A conversation, and at least once a year as an internal health check. Valuations shift fast — a strong growth quarter or a meaningful NRR improvement can meaningfully move your multiple.
            </p>
          </div>
        </div>
      </motion.section>

      {/* H2: Call to Action (CTA) */}
      <motion.section
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="mb-10"
      >
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 pb-2 border-b border-gray-200 dark:border-gray-700">
          Know Your Number Before Someone Else Defines It
        </h2>

        <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
          You've read the methodology. You understand the multiples. You know which metrics move the needle — and which ones drag it down.
        </p>

        <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-5">
          Now run the numbers.
        </p>

        <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
          The Saasfactor SaaS Valuation Calculator takes under five minutes, runs four institutional-grade valuation methods simultaneously, and gives you a blended estimate with a live confidence score — completely free. No credit card. No consultant waiting to upsell you.
        </p>

        <div className="bg-gradient-to-r from-brand-500 to-brand-600 rounded-xl p-6 text-white text-center">
          <p className="text-lg font-semibold mb-3">Know your number before someone else defines it for you.</p>
          <a 
            href="#calculator" 
            className="inline-flex items-center gap-2 px-6 py-3 bg-white text-brand-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors"
          >
            Start Your Free Valuation Now
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 8h10M9 5l4 3-4 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        </div>
      </motion.section>

      {/* Sources */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.85 }}
        className="pt-6 border-t border-gray-200 dark:border-gray-700"
      >
        <p className="text-xs text-gray-500 dark:text-gray-500 leading-relaxed">
          <strong>Sources:</strong> SaaS Capital Index (2025–2026) · Aventis Advisors SaaS Valuation Multiples (Jan 2026) · Windsor Drake SaaS Multiples Report (Feb 2026) · Acquiry Private Transaction Data (2026) · Flippa SaaS Multiples Guide (Feb 2026) · FE International SaaS Valuation Guide (Jan 2026) · Axial SaaS M&A Insights (2026) · Eqvista SaaS Index (Jan 2026) · Livmo Lower Middle Market SaaS Transactions (2026) · Saasfactor.co calculator methodology (2026)
        </p>
      </motion.footer>
    </article>
  )
}
