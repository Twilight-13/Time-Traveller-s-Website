"use client"

import { motion } from "framer-motion"
import { Lightbulb, Cpu, Zap, Cog, Atom, Rocket } from "lucide-react"

interface InventionShowcaseProps {
  data?: string[]
}

export default function InventionShowcase({ data }: InventionShowcaseProps) {
  const inventionIcons = [Lightbulb, Cpu, Zap, Cog, Atom, Rocket]

  return (
    <motion.div
      whileHover={{ scale: 1.05, rotateY: 5 }}
      transition={{ duration: 0.5 }}
      className="relative w-full h-96 flex items-center justify-center backdrop-blur-2xl bg-gradient-to-br from-orange-500/20 to-red-500/20 border-2 border-white/20 rounded-3xl shadow-2xl overflow-hidden"
    >
      {/* Central Innovation Hub */}
      <div className="relative">
        <motion.div
          animate={{
            rotate: 360,
            scale: [1, 1.1, 1],
          }}
          transition={{
            rotate: { duration: 30, repeat: Number.POSITIVE_INFINITY, ease: "linear" },
            scale: { duration: 4, repeat: Number.POSITIVE_INFINITY },
          }}
          className="w-32 h-32 backdrop-blur-sm bg-gradient-to-br from-orange-400/40 to-red-400/40 border-2 border-orange-400/60 rounded-full shadow-2xl flex items-center justify-center"
        >
          <Lightbulb className="w-16 h-16 text-orange-300" />
        </motion.div>

        {/* Orbiting Inventions */}
        {inventionIcons.map((Icon, i) => (
          <motion.div
            key={i}
            className="absolute w-12 h-12 backdrop-blur-sm bg-gradient-to-br from-orange-300/30 to-red-300/30 border border-orange-400/50 rounded-full shadow-lg flex items-center justify-center"
            animate={{
              rotate: 360,
            }}
            transition={{
              duration: 15 + i * 3,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
            style={{
              transformOrigin: `${80 + i * 20}px center`,
              left: `${-6 - i * 20}px`,
              top: "50%",
              marginTop: "-24px",
            }}
          >
            <Icon className="w-6 h-6 text-orange-400" />
          </motion.div>
        ))}
      </div>

      {/* Innovation Sparks */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-3 h-3 bg-orange-400 rounded-full"
            animate={{
              x: [0, Math.random() * 200 - 100],
              y: [0, Math.random() * 200 - 100],
              opacity: [0, 1, 0],
              scale: [0, 1.5, 0],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Number.POSITIVE_INFINITY,
              delay: Math.random() * 2,
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              boxShadow: "0 0 10px rgba(251, 146, 60, 0.8)",
            }}
          />
        ))}
      </div>

      {/* Blueprint Grid */}
      <div className="absolute inset-0 opacity-20">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `
              linear-gradient(rgba(251, 146, 60, 0.2) 1px, transparent 1px),
              linear-gradient(90deg, rgba(251, 146, 60, 0.2) 1px, transparent 1px)
            `,
            backgroundSize: "20px 20px",
          }}
        />
      </div>

      {/* Energy Pulses */}
      <div className="absolute inset-0">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute inset-0 border-2 border-orange-400/30 rounded-full"
            animate={{
              scale: [1, 2],
              opacity: [0.6, 0],
            }}
            transition={{
              duration: 3,
              repeat: Number.POSITIVE_INFINITY,
              delay: i * 0.6,
            }}
          />
        ))}
      </div>
    </motion.div>
  )
}
