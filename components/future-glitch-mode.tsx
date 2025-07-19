"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { ArrowLeft, AlertTriangle, Cpu, Wifi } from "lucide-react"
import { Button } from "@/components/ui/button"

interface FutureGlitchModeProps {
  date: string
  onExit: () => void
}

export default function FutureGlitchMode({ date, onExit }: FutureGlitchModeProps) {
  const [glitchText, setGlitchText] = useState("FUTURE DETECTED")
  const [isGlitching, setIsGlitching] = useState(false)
  const year = new Date(date).getFullYear()

  useEffect(() => {
    const glitchInterval = setInterval(() => {
      setIsGlitching(true)
      const glitchTexts = [
        "F̴U̷T̸U̴R̷E̸ ̵D̶E̷T̸E̴C̷T̸E̷D̵",
        "ŤĮMƏ ÐĮŞTØRŤĮØŇ",
        "ⱧØⱠØ₲Ɽ₳₥ ₳₵₮łVɆ",
        "QUANTUM BREACH",
        "TEMPORAL ANOMALY",
      ]
      setGlitchText(glitchTexts[Math.floor(Math.random() * glitchTexts.length)])

      setTimeout(() => setIsGlitching(false), 200)
    }, 2000)

    return () => clearInterval(glitchInterval)
  }, [])

  const futureData = {
    predictions: [
      "Neural interfaces merge consciousness with quantum networks",
      "Time travel becomes commercially available for the wealthy elite",
      "AI entities achieve sentience and demand digital rights",
      "Humans upload memories to crystalline storage matrices",
      "Reality itself becomes programmable through quantum manipulation",
    ],
    warnings: [
      "TEMPORAL PARADOX DETECTED",
      "CAUSALITY LOOP IMMINENT",
      "TIMELINE INTEGRITY: 23%",
      "QUANTUM ENTANGLEMENT UNSTABLE",
      "REALITY ANCHOR FAILING",
    ],
    glitches: [
      "ERROR_404_TIMELINE_NOT_FOUND",
      "MEMORY_LEAK_IN_SPACETIME",
      "UNDEFINED_BEHAVIOR_IN_REALITY",
      "STACK_OVERFLOW_IN_CONSCIOUSNESS",
      "NULL_POINTER_TO_EXISTENCE",
    ],
  }

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Glitch Background */}
      <div className="absolute inset-0">
        <motion.div
          animate={{
            backgroundPosition: ["0% 0%", "100% 100%"],
            filter: isGlitching ? "hue-rotate(180deg) invert(1)" : "hue-rotate(0deg) invert(0)",
          }}
          transition={{ duration: 0.1 }}
          className="absolute inset-0 bg-gradient-to-br from-red-900/20 via-purple-900/20 to-green-900/20"
          style={{
            backgroundImage: `
              repeating-linear-gradient(
                90deg,
                transparent,
                transparent 2px,
                rgba(255,0,0,0.1) 2px,
                rgba(255,0,0,0.1) 4px
              ),
              repeating-linear-gradient(
                0deg,
                transparent,
                transparent 2px,
                rgba(0,255,0,0.1) 2px,
                rgba(0,255,0,0.1) 4px
              )
            `,
          }}
        />
      </div>

      {/* Holographic Grid */}
      <div className="absolute inset-0">
        <svg className="w-full h-full opacity-30" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <pattern id="hologram" width="5" height="5" patternUnits="userSpaceOnUse">
              <path d="M 5 0 L 0 0 0 5" fill="none" stroke="#00ff00" strokeWidth="0.2" />
            </pattern>
          </defs>
          <motion.rect
            width="100"
            height="100"
            fill="url(#hologram)"
            animate={{
              opacity: [0.3, 0.7, 0.3],
              skewX: isGlitching ? Math.random() * 10 - 5 : 0,
            }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          />
        </svg>
      </div>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 p-8 flex items-center justify-between"
      >
        <Button
          onClick={onExit}
          variant="ghost"
          className="text-green-400 hover:text-green-300 hover:bg-green-400/10 backdrop-blur-sm border border-green-400/30 glitch-button"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          ESCAPE TIMELINE
        </Button>

        <motion.div
          animate={{
            textShadow: isGlitching ? "0 0 10px #ff0000, 0 0 20px #00ff00, 0 0 30px #0000ff" : "0 0 10px #00ff00",
          }}
          className="text-center"
        >
          <h1 className="text-6xl md:text-8xl font-bold text-green-400 font-mono glitch-text">{year}</h1>
          <motion.p
            animate={{ opacity: isGlitching ? [1, 0, 1] : 1 }}
            transition={{ duration: 0.1 }}
            className="text-red-400 text-xl mt-2 font-mono"
          >
            {glitchText}
          </motion.p>
        </motion.div>

        <div className="w-32" />
      </motion.div>

      {/* Glitch Panels */}
      <div className="relative z-10 p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {/* Future Predictions */}
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="backdrop-blur-xl bg-green-500/10 border border-green-400/30 rounded-2xl p-6 shadow-2xl relative overflow-hidden"
          >
            <div className="flex items-center gap-4 mb-6">
              <Cpu className="w-8 h-8 text-green-400" />
              <h3 className="text-xl font-bold text-green-400 font-mono">FUTURE.PREDICTIONS</h3>
            </div>
            <div className="space-y-4">
              {futureData.predictions.map((prediction, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  className="p-3 bg-black/30 border border-green-400/20 rounded-lg"
                >
                  <p className="text-green-300 text-sm font-mono">{prediction}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* System Warnings */}
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="backdrop-blur-xl bg-red-500/10 border border-red-400/30 rounded-2xl p-6 shadow-2xl relative overflow-hidden"
          >
            <div className="flex items-center gap-4 mb-6">
              <AlertTriangle className="w-8 h-8 text-red-400" />
              <h3 className="text-xl font-bold text-red-400 font-mono">SYSTEM.WARNINGS</h3>
            </div>
            <div className="space-y-4">
              {futureData.warnings.map((warning, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.7 + index * 0.1 }}
                  className="p-3 bg-red-900/20 border border-red-400/30 rounded-lg"
                >
                  <p className="text-red-300 text-sm font-mono">{warning}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Error Logs */}
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.9 }}
            className="backdrop-blur-xl bg-purple-500/10 border border-purple-400/30 rounded-2xl p-6 shadow-2xl relative overflow-hidden"
          >
            <div className="flex items-center gap-4 mb-6">
              <Wifi className="w-8 h-8 text-purple-400" />
              <h3 className="text-xl font-bold text-purple-400 font-mono">ERROR.LOGS</h3>
            </div>
            <div className="space-y-4">
              {futureData.glitches.map((glitch, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, rotateX: -90 }}
                  animate={{ opacity: 1, rotateX: 0 }}
                  transition={{ delay: 0.9 + index * 0.1 }}
                  className="p-3 bg-purple-900/20 border border-purple-400/20 rounded-lg"
                >
                  <p className="text-purple-300 text-sm font-mono">{glitch}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Floating Holograms */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-8 h-8 border border-cyan-400/50 rounded-full"
            animate={{
              x: [0, Math.random() * 200 - 100],
              y: [0, Math.random() * 200 - 100],
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
              rotate: [0, 360],
            }}
            transition={{
              duration: Math.random() * 4 + 2,
              repeat: Number.POSITIVE_INFINITY,
              delay: Math.random() * 2,
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              boxShadow: "0 0 20px rgba(6, 182, 212, 0.5)",
            }}
          />
        ))}
      </div>

      {/* Glitch Overlay */}
      {isGlitching && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 0.1 }}
          className="absolute inset-0 bg-gradient-to-r from-red-500/20 via-green-500/20 to-blue-500/20 mix-blend-difference"
        />
      )}
    </div>
  )
}
