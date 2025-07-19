"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Calendar, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import StarField from "@/components/star-field"
import TimePortal from "@/components/time-portal"

interface LandingPageProps {
  onDateSubmit: (date: string) => void
}

export default function LandingPage({ onDateSubmit }: LandingPageProps) {
  const [date, setDate] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!date) return

    setIsSubmitting(true)
    await new Promise((resolve) => setTimeout(resolve, 1000)) // Simulate loading
    onDateSubmit(date)
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center p-4">
      <StarField />
      <TimePortal />

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="relative z-10 text-center max-w-2xl mx-auto"
      >
        {/* Main Title */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="mb-8"
        >
          <h1 className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">
            Time Traveler's
          </h1>
          <h2 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-amber-400 via-orange-400 to-red-400 bg-clip-text text-transparent">
            Journal
          </h2>
        </motion.div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="text-xl md:text-2xl text-cyan-200 mb-12 font-light"
        >
          Journey through time and discover the wonders of any era
        </motion.p>

        {/* Date Input Form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="backdrop-blur-md bg-white/10 rounded-2xl p-8 border border-white/20 shadow-2xl"
          style={{
            boxShadow: "0 0 50px rgba(139, 92, 246, 0.3), inset 0 0 50px rgba(255, 255, 255, 0.1)",
          }}
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="relative">
              <Calendar className="absolute left-4 top-1/2 transform -translate-y-1/2 text-cyan-400 w-6 h-6" />
              <Input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="pl-14 h-14 text-lg bg-black/30 border-cyan-400/50 text-white placeholder-cyan-300 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/50 rounded-xl"
                style={{
                  boxShadow: "inset 0 0 20px rgba(6, 182, 212, 0.2)",
                }}
                required
              />
            </div>

            <Button
              type="submit"
              disabled={!date || isSubmitting}
              className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 border-0 rounded-xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
              style={{
                boxShadow: "0 0 30px rgba(168, 85, 247, 0.4)",
              }}
            >
              {isSubmitting ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                  className="flex items-center gap-2"
                >
                  <Sparkles className="w-6 h-6" />
                  Traveling Through Time...
                </motion.div>
              ) : (
                <span className="flex items-center gap-2">
                  <Sparkles className="w-6 h-6" />
                  Begin Your Journey
                </span>
              )}
            </Button>
          </form>
        </motion.div>

        {/* Floating Elements */}
        <motion.div
          animate={{
            y: [0, -20, 0],
            rotate: [0, 5, -5, 0],
          }}
          transition={{
            duration: 4,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
          className="absolute -top-20 -left-20 w-40 h-40 bg-gradient-to-r from-cyan-400/20 to-purple-400/20 rounded-full blur-xl"
        />

        <motion.div
          animate={{
            y: [0, 20, 0],
            rotate: [0, -5, 5, 0],
          }}
          transition={{
            duration: 5,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: 1,
          }}
          className="absolute -bottom-20 -right-20 w-60 h-60 bg-gradient-to-r from-pink-400/20 to-amber-400/20 rounded-full blur-xl"
        />
      </motion.div>
    </div>
  )
}
