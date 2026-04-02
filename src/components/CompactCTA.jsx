import React from 'react'
import { motion } from 'framer-motion'

export default function CompactCTA() {
  return (
    <motion.aside
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 rounded-xl overflow-hidden shadow-lg"
    >
      <div className="flex items-center justify-between p-4 sm:p-5">
        {/* Left side - Photos + Text */}
        <div className="flex items-center gap-4">
          {/* Profile photos */}
          <div className="flex -space-x-2 flex-shrink-0">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-cyan-300 border-2 border-gray-800 flex items-center justify-center overflow-hidden">
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
              </svg>
            </div>
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-400 to-pink-300 border-2 border-gray-800 flex items-center justify-center overflow-hidden">
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
              </svg>
            </div>
          </div>
          
          {/* Title */}
          <h3 className="text-white text-base sm:text-lg font-bold leading-tight">
            Ready to Transform Your SaaS?
          </h3>
        </div>
        
        {/* Right side - CTA Button */}
        <a
          href="https://www.saasfactor.co/contact"
          target="_blank"
          rel="noopener noreferrer"
          className="flex-shrink-0 py-2.5 px-5 bg-cyan-200 hover:bg-cyan-300 text-gray-900 font-bold text-sm sm:text-base rounded-lg transition-colors duration-200 whitespace-nowrap"
        >
          LET'S TALK
        </a>
      </div>
    </motion.aside>
  )
}
