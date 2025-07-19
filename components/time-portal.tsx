"use client"

import { motion } from "framer-motion"

export default function TimePortal() {
  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
      {/* Outer Ring */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        className="absolute w-96 h-96 border-2 border-purple-400/30 rounded-full"
        style={{
          boxShadow: "0 0 50px rgba(168, 85, 247, 0.3)",
        }}
      />

      {/* Middle Ring */}
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 15, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        className="absolute w-72 h-72 border-2 border-cyan-400/40 rounded-full"
        style={{
          boxShadow: "0 0 40px rgba(6, 182, 212, 0.4)",
        }}
      />

      {/* Inner Ring */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        className="absolute w-48 h-48 border-2 border-pink-400/50 rounded-full"
        style={{
          boxShadow: "0 0 30px rgba(236, 72, 153, 0.5)",
        }}
      />

      {/* Center Glow */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        className="absolute w-24 h-24 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full blur-xl"
      />

      {/* Particles */}
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-white rounded-full"
          animate={{
            x: [0, Math.cos((i * 30 * Math.PI) / 180) * 150],
            y: [0, Math.sin((i * 30 * Math.PI) / 180) * 150],
            opacity: [0, 1, 0],
            scale: [0, 1, 0],
          }}
          transition={{
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
            delay: i * 0.1,
            ease: "easeOut",
          }}
          style={{
            boxShadow: "0 0 10px rgba(255, 255, 255, 0.8)",
          }}
        />
      ))}
    </div>
  )
}
