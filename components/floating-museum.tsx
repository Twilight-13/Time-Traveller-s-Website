"use client"

import { motion } from "framer-motion"
import { LibraryIcon as Museum, Sparkles } from "lucide-react"

export default function FloatingMuseum() {
  return (
    <div className="relative">
      {/* Main Museum Structure */}
      <motion.div
        animate={{
          y: [0, -20, 0],
          rotateY: [0, 5, -5, 0],
        }}
        transition={{
          duration: 6,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
        className="relative"
      >
        {/* Museum Base */}
        <div className="w-64 h-32 backdrop-blur-xl bg-gradient-to-br from-amber-900/30 to-orange-900/20 border-2 border-amber-400/50 rounded-2xl shadow-2xl">
          <div className="flex items-center justify-center h-full">
            <Museum className="w-16 h-16 text-amber-400" />
          </div>
        </div>

        {/* Floating Platforms */}
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-12 h-12 backdrop-blur-sm bg-amber-400/20 border border-amber-400/40 rounded-lg"
            animate={{
              y: [0, -10, 0],
              x: [0, Math.sin(i) * 10, 0],
              rotate: [0, 360],
            }}
            transition={{
              duration: 4 + i,
              repeat: Number.POSITIVE_INFINITY,
              delay: i * 0.5,
            }}
            style={{
              top: `${-20 - i * 15}px`,
              left: `${50 + i * 30}px`,
            }}
          >
            <div className="w-full h-full flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-amber-300" />
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Ambient Glow */}
      <div className="absolute inset-0 bg-gradient-to-r from-amber-600/20 to-orange-600/20 rounded-2xl blur-xl -z-10" />
    </div>
  )
}
