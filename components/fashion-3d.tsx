"use client"

import { motion } from "framer-motion"
import { Shirt, Crown, Watch } from "lucide-react"

interface Fashion3DProps {
  data?: string[]
}

export default function Fashion3D({ data }: Fashion3DProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.05, rotateY: 10 }}
      transition={{ duration: 0.3 }}
      className="relative w-full h-96 flex items-center justify-center backdrop-blur-xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-white/20 rounded-3xl shadow-2xl overflow-hidden"
    >
      {/* 3D Mannequin Silhouette */}
      <div className="relative">
        <motion.div
          animate={{
            rotateY: [0, 360],
          }}
          transition={{
            duration: 10,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
          className="w-32 h-64 relative"
        >
          {/* Mannequin Body */}
          <div className="absolute inset-0 bg-gradient-to-b from-gray-300/30 to-gray-600/30 rounded-full backdrop-blur-sm border border-white/20" />

          {/* Fashion Accessories */}
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            className="absolute top-4 left-1/2 transform -translate-x-1/2"
          >
            <Crown className="w-8 h-8 text-amber-400" />
          </motion.div>

          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
            className="absolute top-16 left-1/2 transform -translate-x-1/2"
          >
            <Shirt className="w-12 h-12 text-cyan-400" />
          </motion.div>

          <motion.div
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            className="absolute bottom-16 right-2"
          >
            <Watch className="w-6 h-6 text-orange-400" />
          </motion.div>
        </motion.div>
      </div>

      {/* Floating Fashion Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {["👗", "👔", "👠", "👑", "💍", "🎩"].map((emoji, i) => (
          <motion.div
            key={i}
            className="absolute text-3xl"
            animate={{
              y: [0, -20, 0],
              x: [0, Math.sin(i) * 20, 0],
              opacity: [0.5, 1, 0.5],
              rotate: [0, 360],
            }}
            transition={{
              duration: 4 + i,
              repeat: Number.POSITIVE_INFINITY,
              delay: i * 0.5,
            }}
            style={{
              left: `${10 + (i % 3) * 30}%`,
              top: `${20 + Math.floor(i / 3) * 40}%`,
            }}
          >
            {emoji}
          </motion.div>
        ))}
      </div>

      {/* Spotlight Effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-cyan-400/10 rounded-3xl" />
    </motion.div>
  )
}
