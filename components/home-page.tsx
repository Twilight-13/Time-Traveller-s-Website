"use client"

import type React from "react"

import { useState, useRef } from "react"
import { motion } from "framer-motion"
import { Clock, Sparkles } from "lucide-react"
import StarfieldBackground from "@/components/starfield-background"
import TimePortalCenterpiece from "@/components/time-portal-centerpiece"
import FloatingGears from "@/components/floating-gears"
import VintageClockSelector from "@/components/vintage-clock-selector"

interface HomePageProps {
  onDateSubmit: (date: string) => void
  orbitronFont: string
}

export default function HomePage({ onDateSubmit, orbitronFont }: HomePageProps) {
  const [date, setDate] = useState("")
  const [isActivating, setIsActivating] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!date) return

    setIsActivating(true)

    // Play activation sound
    if (audioRef.current) {
      audioRef.current.play().catch(() => {})
    }

    await new Promise((resolve) => setTimeout(resolve, 3000))
    onDateSubmit(date)
  }

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Immersive 3D Background */}
      <StarfieldBackground />
      <FloatingGears />

      {/* Ambient Audio */}
      <audio ref={audioRef} preload="auto">
        <source src="/sounds/time-machine-activation.mp3" type="audio/mpeg" />
      </audio>

      {/* 3D Time Portal Centerpiece */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <TimePortalCenterpiece isActivating={isActivating} />
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center p-8">
        {/* Cinematic Title */}
        <motion.div
          initial={{ opacity: 0, y: -150, scale: 0.5 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 2.5, ease: "easeOut", delay: 0.5 }}
          className="text-center mb-12"
        >
          <motion.h1
            className="text-8xl md:text-9xl lg:text-[12rem] font-bold mb-6 bg-gradient-to-r from-amber-300 via-orange-400 to-red-500 bg-clip-text text-transparent tracking-wider drop-shadow-2xl"
            animate={{
              textShadow: [
                "0 0 20px rgba(245, 158, 11, 0.5)",
                "0 0 40px rgba(245, 158, 11, 0.8)",
                "0 0 20px rgba(245, 158, 11, 0.5)",
              ],
            }}
            transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
          >
            TIME
          </motion.h1>

          <motion.h2
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 2, delay: 1.5 }}
            className={`${orbitronFont} text-5xl md:text-6xl lg:text-7xl font-light text-amber-200/90 tracking-[0.3em] mb-4`}
          >
            TRAVELER'S
          </motion.h2>

          <motion.h3
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 2, delay: 2 }}
            className="text-4xl md:text-5xl lg:text-6xl font-light text-amber-100/80 tracking-[0.4em] mb-8"
          >
            JOURNAL
          </motion.h3>

          {/* Decorative Elements */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, delay: 2.5 }}
            className="flex items-center justify-center gap-6 mb-8"
          >
            <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-amber-400 to-transparent"></div>
            <Clock className="w-10 h-10 text-amber-400" />
            <div className="w-24 h-0.5 bg-gradient-to-l from-transparent via-amber-400 to-transparent"></div>
          </motion.div>
        </motion.div>

        {/* Poetic Subtitle */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 3, duration: 2 }}
          className="text-center mb-16 max-w-4xl"
        >
          <p className="text-2xl md:text-3xl lg:text-4xl text-amber-200/70 font-light leading-relaxed tracking-wide italic">
            "Enter a date, unlock the past"
          </p>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 4, duration: 2 }}
            className="text-lg md:text-xl text-amber-300/60 mt-4 font-light tracking-wider"
          >
            Step through the corridors of time and witness history unfold before your eyes
          </motion.p>
        </motion.div>

        {/* Vintage Clock Selector */}
        <motion.div
          initial={{ opacity: 0, y: 150, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 4.5, duration: 2, ease: "easeOut" }}
          className="pointer-events-auto w-full max-w-6xl"
        >
          <VintageClockSelector onDateSubmit={onDateSubmit} orbitronFont={orbitronFont} />
        </motion.div>

        {/* Floating Sparkles */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute"
              animate={{
                y: [0, -50, 0],
                x: [0, Math.sin(i) * 30, 0],
                rotate: [0, 360],
                opacity: [0.2, 0.8, 0.2],
                scale: [0.5, 1.2, 0.5],
              }}
              transition={{
                duration: 8 + i * 0.5,
                repeat: Number.POSITIVE_INFINITY,
                delay: i * 0.3,
                ease: "easeInOut",
              }}
              style={{
                left: `${5 + (i % 5) * 20}%`,
                top: `${10 + Math.floor(i / 5) * 25}%`,
              }}
            >
              <Sparkles className="w-4 h-4 md:w-6 md:h-6 text-amber-400/60" />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
