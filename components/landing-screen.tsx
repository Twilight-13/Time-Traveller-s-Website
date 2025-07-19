"use client"

import type React from "react"

import { useState, useRef } from "react"
import { motion } from "framer-motion"
import { Calendar, Zap, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import ThreeBackground from "@/components/three-background"
import FloatingJournalPages from "@/components/floating-journal-pages"

interface LandingScreenProps {
  onDateSubmit: (date: string) => void
}

export default function LandingScreen({ onDateSubmit }: LandingScreenProps) {
  const [date, setDate] = useState("")
  const [isInitiating, setIsInitiating] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!date) return

    setIsInitiating(true)

    // Play ambient sound effect
    if (audioRef.current) {
      audioRef.current.play().catch(() => {})
    }

    await new Promise((resolve) => setTimeout(resolve, 2000))
    onDateSubmit(date)
  }

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* 3D Background */}
      <ThreeBackground />
      <FloatingJournalPages />

      {/* Ambient Audio */}
      <audio ref={audioRef} loop>
        <source src="/ambient-space.mp3" type="audio/mpeg" />
      </audio>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 100, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 2, ease: "easeOut" }}
          className="text-center max-w-4xl mx-auto"
        >
          {/* Title */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 2 }}
            className="mb-12"
          >
            <h1 className="text-8xl md:text-9xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent tracking-wider">
              CHRONO
            </h1>
            <h2 className="text-4xl md:text-6xl font-light text-white/80 tracking-[0.3em] mb-4">JOURNAL</h2>
            <div className="w-32 h-1 bg-gradient-to-r from-cyan-400 to-purple-400 mx-auto rounded-full" />
          </motion.div>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2, duration: 1 }}
            className="text-xl md:text-2xl text-cyan-200/80 mb-16 font-light tracking-wide"
          >
            Navigate the streams of time • Witness the echoes of existence
          </motion.p>

          {/* Date Input Portal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 2.5, duration: 1 }}
            className="relative"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-3xl blur-xl" />
            <div className="relative backdrop-blur-xl bg-black/30 border border-cyan-400/30 rounded-3xl p-12 shadow-2xl">
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Date Input */}
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 to-purple-400/20 rounded-2xl blur-sm group-hover:blur-md transition-all duration-300" />
                  <div className="relative flex items-center">
                    <Calendar className="absolute left-6 text-cyan-400 w-8 h-8 z-10" />
                    <Input
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="w-full h-20 pl-20 pr-8 text-2xl bg-black/50 border-2 border-cyan-400/50 text-white placeholder-cyan-300/50 focus:border-cyan-400 focus:ring-4 focus:ring-cyan-400/20 rounded-2xl backdrop-blur-sm font-mono tracking-wider"
                      style={{
                        boxShadow: "inset 0 0 30px rgba(6, 182, 212, 0.1), 0 0 50px rgba(6, 182, 212, 0.2)",
                      }}
                      required
                    />
                  </div>
                </div>

                {/* Initiate Button */}
                <Button
                  type="submit"
                  disabled={!date || isInitiating}
                  className="w-full h-20 text-2xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 hover:from-purple-700 hover:via-pink-700 hover:to-red-700 border-0 rounded-2xl transition-all duration-500 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden group"
                  style={{
                    boxShadow: "0 0 40px rgba(168, 85, 247, 0.4), 0 0 80px rgba(236, 72, 153, 0.2)",
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 to-purple-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  {isInitiating ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                      className="flex items-center gap-4"
                    >
                      <Zap className="w-8 h-8" />
                      <span className="tracking-wider">INITIATING JUMP...</span>
                    </motion.div>
                  ) : (
                    <span className="flex items-center gap-4 tracking-wider">
                      <Sparkles className="w-8 h-8" />
                      INITIATE CHRONO JUMP
                      <Sparkles className="w-8 h-8" />
                    </span>
                  )}
                </Button>
              </form>
            </div>
          </motion.div>

          {/* Floating Particles */}
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-cyan-400 rounded-full"
                animate={{
                  x: [0, Math.random() * 200 - 100],
                  y: [0, Math.random() * 200 - 100],
                  opacity: [0, 1, 0],
                  scale: [0, 1, 0],
                }}
                transition={{
                  duration: Math.random() * 4 + 2,
                  repeat: Number.POSITIVE_INFINITY,
                  delay: Math.random() * 2,
                }}
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  boxShadow: "0 0 20px rgba(6, 182, 212, 0.8)",
                }}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
