"use client"

import { motion } from "framer-motion"
import { Sparkles } from "lucide-react"

export default function ExitSequence() {
  return (
    <div className="fixed inset-0 bg-black overflow-hidden">
      {/* Black Hole Formation */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: [0, 1, 5, 20] }}
          transition={{ duration: 3, ease: "easeIn" }}
          className="w-32 h-32 bg-black rounded-full border-4 border-white"
          style={{
            boxShadow: "0 0 100px rgba(255, 255, 255, 0.8), inset 0 0 50px rgba(255, 255, 255, 0.3)",
          }}
        />
      </div>

      {/* UI Collapse Effect */}
      <motion.div
        initial={{ scale: 1, opacity: 1 }}
        animate={{
          scale: [1, 0.8, 0.5, 0],
          opacity: [1, 0.8, 0.3, 0],
          rotate: [0, 45, 90, 180],
        }}
        transition={{ duration: 2, ease: "easeInOut" }}
        className="absolute inset-0"
      >
        {/* Simulated UI Elements */}
        <div className="absolute top-8 left-8 w-32 h-8 bg-cyan-400/50 rounded" />
        <div className="absolute top-8 right-8 w-24 h-8 bg-purple-400/50 rounded" />
        <div className="absolute bottom-8 left-8 w-40 h-12 bg-pink-400/50 rounded" />
        <div className="absolute bottom-8 right-8 w-36 h-10 bg-green-400/50 rounded" />
      </motion.div>

      {/* Particle Dissolution */}
      <div className="absolute inset-0">
        {[...Array(100)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-white rounded-full"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              opacity: 1,
            }}
            animate={{
              x: window.innerWidth / 2,
              y: window.innerHeight / 2,
              opacity: 0,
              scale: [1, 0.5, 0],
            }}
            transition={{
              duration: 2 + Math.random(),
              delay: Math.random() * 2,
              ease: "easeIn",
            }}
          />
        ))}
      </div>

      {/* Credits */}
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: [0, 1, 1, 0], y: [100, 0, 0, -100] }}
        transition={{ duration: 4, times: [0, 0.3, 0.7, 1] }}
        className="absolute inset-0 flex items-center justify-center"
      >
        <div className="text-center">
          <Sparkles className="w-16 h-16 text-cyan-400 mx-auto mb-4" />
          <h2 className="text-4xl font-bold text-white mb-2">CHRONO JOURNAL</h2>
          <p className="text-cyan-300 text-lg">Time stream disconnected</p>
          <p className="text-white/60 text-sm mt-4">Thank you for traveling with us</p>
        </div>
      </motion.div>

      {/* Final Flash */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0, 0, 1, 0] }}
        transition={{ duration: 4, times: [0, 0.8, 0.9, 0.95, 1] }}
        className="absolute inset-0 bg-white"
      />
    </div>
  )
}
