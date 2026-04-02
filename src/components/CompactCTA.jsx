import React from 'react'
import { motion } from 'framer-motion'

export default function CompactCTA() {
  return (
    <motion.aside
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-xl overflow-hidden shadow-lg"
    >
      <div className="p-4">
        {/* Profile photos */}
        <div className="flex items-center gap-2 mb-3">
          <div className="flex -space-x-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-cyan-300 border-2 border-gray-800 flex items-center justify-center overflow-hidden">
              <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
              </svg>
            </div>
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-400 to-pink-300 border-2 border-gray-800 flex items-center justify-center overflow-hidden">
              <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
              </svg>
            </div>
          </div>
        </div>
        
        {/* Title */}
        <h3 className="text-white text-base font-bold leading-tight mb-3">
          Ready to Transform Your SaaS?
        </h3>
        
        {/* CTA Button */}
        <a
          href="https://www.saasfactor.co/contact"
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full py-2 px-3 bg-cyan-200 hover:bg-cyan-300 text-gray-900 font-bold text-sm text-center rounded-lg transition-colors duration-200"
        >
          LET'S TALK
        </a>
      </div>
    </motion.aside>
  )
}
