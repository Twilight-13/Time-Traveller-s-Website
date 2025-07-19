"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Zap, Sparkles, Cpu } from "lucide-react"

interface VortexTransitionProps {
  date: string
}

export default function VortexTransition({ date }: VortexTransitionProps) {
  const [phase, setPhase] = useState(0)
  const year = new Date(date).getFullYear()

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 800),
      setTimeout(() => setPhase(2), 1800),
      setTimeout(() => setPhase(3), 2800),
      setTimeout(() => setPhase(4), 3600), // Changed from 4200 to 3600
      setTimeout(() => setPhase(5), 4200), // Changed from 4800 to 4200
    ]

    return () => timers.forEach(clearTimeout)
  }, [])

  return (
    <div className="fixed inset-0 bg-black overflow-hidden">
      {/* Vortex Rings */}
      <div className="absolute inset-0 flex items-center justify-center">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute border-3 border-amber-400/50 rounded-full"
            initial={{ scale: 0, opacity: 0, rotate: 0 }}
            animate={{
              scale: [0, 3, 10, 25],
              opacity: [0, 0.9, 0.5, 0],
              rotate: [0, 360, 720, 1080],
            }}
            transition={{
              duration: 4,
              delay: i * 0.08,
              ease: "easeOut",
            }}
            style={{
              width: `${80 + i * 40}px`,
              height: `${80 + i * 40}px`,
              borderWidth: `${3 - i * 0.1}px`,
            }}
          />
        ))}
      </div>

      {/* Time Ripple Effect */}
      <div className="absolute inset-0 flex items-center justify-center">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={`ripple-${i}`}
            className="absolute bg-gradient-to-r from-amber-400/30 via-orange-400/30 to-red-400/30 rounded-full"
            initial={{ scale: 0, opacity: 0 }}
            animate={{
              scale: [0, 20],
              opacity: [0.8, 0],
            }}
            transition={{
              duration: 3,
              delay: i * 0.15,
              repeat: Number.POSITIVE_INFINITY,
            }}
            style={{
              width: "300px",
              height: "300px",
            }}
          />
        ))}
      </div>

      {/* Time Distortion Grid */}
      <svg className="absolute inset-0 w-full h-full opacity-40" viewBox="0 0 100 100" preserveAspectRatio="none">
        <defs>
          <pattern id="timeGrid" width="4" height="4" patternUnits="userSpaceOnUse">
            <path d="M 4 0 L 0 0 0 4" fill="none" stroke="rgba(245, 158, 11, 0.4)" strokeWidth="0.2" />
          </pattern>
        </defs>
        <motion.rect
          width="100"
          height="100"
          fill="url(#timeGrid)"
          animate={{
            skewX: [-15, 15, -15],
            skewY: [-8, 8, -8],
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
        />
      </svg>

      {/* Phase Content */}
      <div className="absolute inset-0 flex items-center justify-center z-10">
        {phase === 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            className="text-center"
          >
            <Zap className="w-24 h-24 text-amber-400 mx-auto mb-8" />
            <h2 className="text-6xl font-bold text-amber-200 mb-6">INITIALIZING</h2>
            <p className="text-amber-300/80 text-2xl">Quantum field stabilization...</p>
          </motion.div>
        )}

        {phase === 1 && (
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -100 }}
            className="text-center"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              className="w-28 h-28 border-4 border-amber-400 border-t-transparent rounded-full mx-auto mb-8"
            />
            <h2 className="text-6xl font-bold text-amber-200 mb-6">TEMPORAL LOCK</h2>
            <p className="text-amber-300/80 text-2xl">Targeting: {year}</p>
          </motion.div>
        )}

        {phase === 2 && (
          <motion.div
            initial={{ opacity: 0, scale: 3 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.3 }}
            className="text-center"
          >
            <motion.div
              animate={{
                scale: [1, 1.8, 1],
                rotate: [0, 360, 720],
              }}
              transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
              className="w-36 h-36 bg-gradient-to-r from-amber-400 via-orange-400 to-red-400 rounded-full mx-auto mb-8 blur-sm"
            />
            <h2 className="text-6xl font-bold text-amber-200 mb-6">VORTEX ACTIVE</h2>
            <p className="text-amber-300/80 text-2xl">Entering temporal stream...</p>
          </motion.div>
        )}

        {phase === 3 && (
          <motion.div
            initial={{ opacity: 0, rotateY: -180 }}
            animate={{ opacity: 1, rotateY: 0 }}
            exit={{ opacity: 0, rotateY: 180 }}
            className="text-center"
          >
            <Cpu className="w-32 h-32 text-white mx-auto mb-8" />
            <h2 className="text-7xl font-bold text-white mb-6">CHRONO JUMP</h2>
            <p className="text-white/80 text-2xl">Reality displacement in progress...</p>
          </motion.div>
        )}

        {phase === 4 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 1 }}
            className="text-center"
          >
            <Sparkles className="w-40 h-40 text-white mx-auto mb-8" />
            <h2 className="text-8xl font-bold text-white mb-6">ARRIVAL</h2>
            <p className="text-white/80 text-3xl">Welcome to {year}</p>
          </motion.div>
        )}

        {phase === 5 && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 0.6 }} // Reduced from 0.8
              className="w-full h-full bg-gradient-to-r from-white via-amber-200 to-white"
            />
            {/* Add completion indicator */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.1 }}
              className="absolute inset-0 bg-transparent"
              onAnimationComplete={() => {
                // This ensures the transition is marked as complete
                console.log("Vortex transition complete")
              }}
            />
          </>
        )}
      </div>

      {/* Particle Stream */}
      <div className="absolute inset-0">
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={`particle-${i}`}
            className="absolute w-3 h-3 bg-amber-400 rounded-full"
            initial={{
              x: window.innerWidth / 2,
              y: window.innerHeight / 2,
              opacity: 0,
            }}
            animate={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              opacity: [0, 1, 0],
              scale: [0, 1.5, 0],
            }}
            transition={{
              duration: 3,
              delay: Math.random() * 3,
              repeat: Number.POSITIVE_INFINITY,
            }}
            style={{
              boxShadow: "0 0 15px rgba(245, 158, 11, 0.8)",
            }}
          />
        ))}
      </div>

      {/* Energy Waves */}
      <div className="absolute inset-0">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={`wave-${i}`}
            className="absolute inset-0 border-2 border-amber-400/20 rounded-full"
            animate={{
              scale: [0, 4],
              opacity: [0.8, 0],
            }}
            transition={{
              duration: 2,
              delay: i * 0.3,
              repeat: Number.POSITIVE_INFINITY,
            }}
          />
        ))}
      </div>
    </div>
  )
}
