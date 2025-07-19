"use client"

import { motion } from "framer-motion"
import { Shirt, Crown, Watch, Gem, Palette } from "lucide-react"

interface InteractiveMannequinProps {
  data?: string[]
}

export default function InteractiveMannequin({ data }: InteractiveMannequinProps) {
  const accessories = [
    { Icon: Crown, position: { top: "10%", left: "50%" }, color: "text-yellow-400" },
    { Icon: Shirt, position: { top: "35%", left: "50%" }, color: "text-cyan-400" },
    { Icon: Watch, position: { top: "45%", right: "20%" }, color: "text-orange-400" },
    { Icon: Gem, position: { top: "25%", left: "20%" }, color: "text-pink-400" },
    { Icon: Palette, position: { bottom: "30%", left: "50%" }, color: "text-purple-400" },
  ]

  return (
    <motion.div
      whileHover={{ scale: 1.05, rotateY: 10 }}
      transition={{ duration: 0.5 }}
      className="relative w-full h-96 flex items-center justify-center backdrop-blur-2xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border-2 border-white/20 rounded-3xl shadow-2xl overflow-hidden"
    >
      {/* Mannequin Silhouette */}
      <div className="relative">
        <motion.div
          animate={{
            rotateY: [0, 360],
          }}
          transition={{
            duration: 20,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
          className="w-40 h-80 relative"
        >
          {/* Body */}
          <div className="absolute inset-0 bg-gradient-to-b from-gray-300/40 via-gray-400/40 to-gray-500/40 rounded-full backdrop-blur-sm border-2 border-white/30 shadow-2xl" />

          {/* Fashion Accessories */}
          {accessories.map((accessory, i) => {
            const Icon = accessory.Icon
            return (
              <motion.div
                key={i}
                className="absolute transform -translate-x-1/2 -translate-y-1/2"
                style={accessory.position}
                animate={{
                  scale: [1, 1.2, 1],
                  rotate: [0, 10, -10, 0],
                }}
                transition={{
                  duration: 3 + i,
                  repeat: Number.POSITIVE_INFINITY,
                  delay: i * 0.5,
                }}
                whileHover={{ scale: 1.5, rotate: 360 }}
              >
                <Icon className={`w-8 h-8 ${accessory.color} drop-shadow-lg`} />
              </motion.div>
            )
          })}
        </motion.div>
      </div>

      {/* Floating Fashion Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {["👗", "👔", "👠", "👑", "💍", "🎩", "👜", "🕶️"].map((emoji, i) => (
          <motion.div
            key={i}
            className="absolute text-3xl"
            animate={{
              y: [0, -30, 0],
              x: [0, Math.sin(i) * 40, 0],
              opacity: [0.4, 0.9, 0.4],
              rotate: [0, 360],
              scale: [0.8, 1.3, 0.8],
            }}
            transition={{
              duration: 5 + i * 0.5,
              repeat: Number.POSITIVE_INFINITY,
              delay: i * 0.6,
            }}
            style={{
              left: `${5 + (i % 4) * 25}%`,
              top: `${10 + Math.floor(i / 4) * 30}%`,
            }}
          >
            {emoji}
          </motion.div>
        ))}
      </div>

      {/* Runway Spotlight Effect */}
      <motion.div
        animate={{
          background: [
            "linear-gradient(45deg, transparent 0%, rgba(255,255,255,0.1) 50%, transparent 100%)",
            "linear-gradient(135deg, transparent 0%, rgba(255,255,255,0.1) 50%, transparent 100%)",
            "linear-gradient(225deg, transparent 0%, rgba(255,255,255,0.1) 50%, transparent 100%)",
            "linear-gradient(315deg, transparent 0%, rgba(255,255,255,0.1) 50%, transparent 100%)",
          ],
        }}
        transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY }}
        className="absolute inset-0 rounded-3xl"
      />

      {/* Fashion Particles */}
      <div className="absolute inset-0">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-cyan-400/60 rounded-full"
            animate={{
              x: [0, Math.random() * 200 - 100],
              y: [0, Math.random() * 200 - 100],
              opacity: [0, 1, 0],
              scale: [0, 1.5, 0],
            }}
            transition={{
              duration: Math.random() * 4 + 3,
              repeat: Number.POSITIVE_INFINITY,
              delay: Math.random() * 2,
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>
    </motion.div>
  )
}
