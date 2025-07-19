"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Clock, Zap } from "lucide-react"

interface ChronoTransitionProps {
  date: string
}

export default function ChronoTransition({ date }: ChronoTransitionProps) {
  const [phase, setPhase] = useState(0)

  useEffect(() => {
    const timer1 = setTimeout(() => setPhase(1), 500)
    const timer2 = setTimeout(() => setPhase(2), 1500)
    const timer3 = setTimeout(() => setPhase(3), 2500)

    return () => {
      clearTimeout(timer1)
      clearTimeout(timer2)
      clearTimeout(timer3)
    }
  }, [])

  return (
    <div className="fixed inset-0 bg-black overflow-hidden">
      {/* Wormhole Effect */}
      <div className="absolute inset-0 flex items-center justify-center">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute border-2 border-cyan-400/30 rounded-full"
            initial={{ scale: 0, opacity: 0 }}
            animate={{
              scale: [0, 5, 10],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              delay: i * 0.1,
              ease: "easeOut",
            }}
            style={{
              width: `${50 + i * 20}px`,
              height: `${50 + i * 20}px`,
            }}
          />
        ))}
      </div>

      {/* Time Distortion Grid */}
      <div className="absolute inset-0">
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
              <path d="M 10 0 L 0 0 0 10" fill="none" stroke="cyan" strokeWidth="0.5" opacity="0.3" />
            </pattern>
          </defs>
          <motion.rect
            width="100"
            height="100"
            fill="url(#grid)"
            animate={{
              skewX: [-5, 5, -5],
              skewY: [-3, 3, -3],
            }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          />
        </svg>
      </div>

      {/* Clock Hands Spinning */}
      <motion.div
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
        animate={{ scale: [1, 2, 1], opacity: [1, 0.5, 1] }}
        transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
      >
        <div className="relative w-32 h-32">
          <Clock className="w-32 h-32 text-cyan-400" />
          <motion.div
            className="absolute top-1/2 left-1/2 w-1 h-12 bg-cyan-400 origin-bottom"
            style={{ transformOrigin: "50% 100%" }}
            animate={{ rotate: 360 }}
            transition={{ duration: 0.5, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          />
          <motion.div
            className="absolute top-1/2 left-1/2 w-0.5 h-8 bg-purple-400 origin-bottom"
            style={{ transformOrigin: "50% 100%" }}
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          />
        </div>
      </motion.div>

      {/* Rushing Stars */}
      <div className="absolute inset-0">
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-20 bg-gradient-to-b from-cyan-400 to-transparent"
            initial={{
              x: Math.random() * window.innerWidth,
              y: -20,
              opacity: 0,
            }}
            animate={{
              y: window.innerHeight + 20,
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 0.5 + Math.random() * 0.5,
              repeat: Number.POSITIVE_INFINITY,
              delay: Math.random() * 2,
              ease: "linear",
            }}
          />
        ))}
      </div>

      {/* Phase-based Content */}
      <div className="absolute inset-0 flex items-center justify-center">
        {phase === 0 && (
          <motion.div initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} className="text-center">
            <Zap className="w-16 h-16 text-cyan-400 mx-auto mb-4" />
            <h2 className="text-4xl font-bold text-white mb-2">INITIALIZING</h2>
            <p className="text-cyan-300">Quantum field stabilization...</p>
          </motion.div>
        )}

        {phase === 1 && (
          <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} className="text-center">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              className="w-20 h-20 border-4 border-purple-400 border-t-transparent rounded-full mx-auto mb-4"
            />
            <h2 className="text-4xl font-bold text-white mb-2">TEMPORAL LOCK</h2>
            <p className="text-purple-300">Targeting: {new Date(date).getFullYear()}</p>
          </motion.div>
        )}

        {phase === 2 && (
          <motion.div initial={{ opacity: 0, scale: 2 }} animate={{ opacity: 1, scale: 1 }} className="text-center">
            <motion.div
              animate={{
                scale: [1, 1.5, 1],
                rotate: [0, 180, 360],
              }}
              transition={{ duration: 0.5, repeat: Number.POSITIVE_INFINITY }}
              className="w-24 h-24 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full mx-auto mb-4 blur-sm"
            />
            <h2 className="text-4xl font-bold text-white mb-2">CHRONO JUMP</h2>
            <p className="text-pink-300">Entering temporal stream...</p>
          </motion.div>
        )}

        {phase === 3 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <div className="w-32 h-32 bg-white rounded-full mx-auto blur-xl" />
            <h2 className="text-6xl font-bold text-white">ARRIVAL</h2>
          </motion.div>
        )}
      </div>
    </div>
  )
}
