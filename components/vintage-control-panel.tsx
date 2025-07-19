"use client"

import type React from "react"

import { motion } from "framer-motion"
import { Calendar, Zap, Gauge, Clock, Cpu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface VintageControlPanelProps {
  date: string
  setDate: (date: string) => void
  onSubmit: (e: React.FormEvent) => void
  isActivating: boolean
}

export default function VintageControlPanel({ date, setDate, onSubmit, isActivating }: VintageControlPanelProps) {
  return (
    <div className="relative">
      {/* Main Panel with Glassmorphism */}
      <div className="relative backdrop-blur-2xl bg-gradient-to-br from-amber-900/40 via-orange-900/30 to-red-900/40 border-4 border-amber-400/60 rounded-3xl p-12 shadow-2xl">
        {/* Art Deco Corner Decorations */}
        <div className="absolute top-6 left-6 w-12 h-12 border-l-4 border-t-4 border-amber-400/80 rounded-tl-2xl" />
        <div className="absolute top-6 right-6 w-12 h-12 border-r-4 border-t-4 border-amber-400/80 rounded-tr-2xl" />
        <div className="absolute bottom-6 left-6 w-12 h-12 border-l-4 border-b-4 border-amber-400/80 rounded-bl-2xl" />
        <div className="absolute bottom-6 right-6 w-12 h-12 border-r-4 border-b-4 border-amber-400/80 rounded-br-2xl" />

        {/* Panel Title */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center mb-10"
        >
          <h3 className="text-4xl font-bold text-amber-200 mb-4 tracking-wider">TEMPORAL COORDINATES</h3>
          <div className="flex items-center justify-center gap-4">
            <div className="w-16 h-0.5 bg-gradient-to-r from-transparent to-amber-400/60" />
            <Cpu className="w-6 h-6 text-amber-400" />
            <div className="w-16 h-0.5 bg-gradient-to-l from-transparent to-amber-400/60" />
          </div>
        </motion.div>

        <form onSubmit={onSubmit} className="space-y-10">
          {/* Date Input Section */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="relative group"
          >
            <label className="block text-amber-200/90 text-xl font-semibold mb-6 tracking-wide">DESTINATION DATE</label>

            <div className="relative">
              {/* Animated Border Glow */}
              <motion.div
                animate={{
                  boxShadow: [
                    "0 0 20px rgba(245, 158, 11, 0.3)",
                    "0 0 40px rgba(245, 158, 11, 0.6)",
                    "0 0 20px rgba(245, 158, 11, 0.3)",
                  ],
                }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                className="absolute inset-0 bg-gradient-to-r from-amber-400/20 to-orange-400/20 rounded-2xl blur-sm"
              />

              {/* Input Container */}
              <div className="relative flex items-center bg-black/50 border-3 border-amber-400/70 rounded-2xl overflow-hidden shadow-inner">
                <Calendar className="absolute left-8 text-amber-400 w-8 h-8 z-10" />
                <Input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full h-20 pl-24 pr-8 text-2xl bg-transparent border-0 text-amber-100 placeholder-amber-300/50 focus:ring-0 focus:outline-none font-mono tracking-wider"
                  style={{ colorScheme: "dark" }}
                  required
                />

                {/* Status Indicators */}
                <div className="absolute right-6 flex gap-3">
                  {[...Array(4)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="w-3 h-3 bg-amber-400 rounded-full"
                      animate={{
                        opacity: date ? [0.3, 1, 0.3] : 0.3,
                        scale: date ? [1, 1.3, 1] : 1,
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: date ? Number.POSITIVE_INFINITY : 0,
                        delay: i * 0.2,
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Activation Button */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="relative"
          >
            <Button
              type="submit"
              disabled={!date || isActivating}
              className="w-full h-24 text-2xl font-bold bg-gradient-to-r from-amber-600 via-orange-600 to-red-600 hover:from-amber-500 hover:via-orange-500 hover:to-red-500 border-0 rounded-2xl transition-all duration-500 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden group shadow-2xl"
              style={{
                boxShadow: "0 0 50px rgba(245, 158, 11, 0.5), inset 0 0 50px rgba(255, 255, 255, 0.1)",
              }}
            >
              {/* Button Energy Effect */}
              <motion.div
                animate={{
                  background: isActivating
                    ? [
                        "linear-gradient(45deg, rgba(255,255,255,0.1) 0%, rgba(245,158,11,0.3) 50%, rgba(255,255,255,0.1) 100%)",
                        "linear-gradient(45deg, rgba(245,158,11,0.3) 0%, rgba(255,255,255,0.1) 50%, rgba(245,158,11,0.3) 100%)",
                      ]
                    : "transparent",
                }}
                transition={{ duration: 1, repeat: isActivating ? Number.POSITIVE_INFINITY : 0 }}
                className="absolute inset-0"
              />

              {isActivating ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                  className="flex items-center gap-6"
                >
                  <Clock className="w-10 h-10" />
                  <span className="tracking-wider">TEMPORAL FIELD ACTIVE...</span>
                  <Clock className="w-10 h-10" />
                </motion.div>
              ) : (
                <span className="flex items-center gap-6 tracking-wider">
                  <Zap className="w-10 h-10" />
                  INITIATE TIME JUMP
                  <Zap className="w-10 h-10" />
                </span>
              )}
            </Button>

            {/* Button Underglow */}
            <div className="absolute inset-0 bg-gradient-to-r from-amber-600/30 to-orange-600/30 rounded-2xl blur-2xl -z-10" />
          </motion.div>
        </form>

        {/* Vintage Instrument Panel */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.9 }}
          className="flex justify-between mt-12 px-6"
        >
          {[
            { label: "FLUX CAPACITOR", icon: Zap },
            { label: "TEMPORAL CORE", icon: Gauge },
            { label: "CHRONOMETER", icon: Clock },
          ].map((instrument, i) => {
            const Icon = instrument.icon
            return (
              <div key={instrument.label} className="text-center">
                <div className="w-20 h-20 border-3 border-amber-400/60 rounded-full relative mb-3 bg-black/30">
                  <motion.div
                    className="absolute inset-3 bg-gradient-to-br from-amber-400/40 to-orange-400/40 rounded-full"
                    animate={{
                      opacity: isActivating ? [0.3, 0.9, 0.3] : [0.3, 0.6, 0.3],
                      scale: isActivating ? [1, 1.1, 1] : 1,
                    }}
                    transition={{
                      duration: 2 + i * 0.3,
                      repeat: Number.POSITIVE_INFINITY,
                    }}
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Icon className="w-8 h-8 text-amber-300" />
                  </div>
                </div>
                <span className="text-amber-200/80 text-sm tracking-wider font-mono">{instrument.label}</span>
              </div>
            )
          })}
        </motion.div>
      </div>

      {/* Ambient Panel Glow */}
      <motion.div
        animate={{
          opacity: [0.3, 0.6, 0.3],
          scale: [1, 1.02, 1],
        }}
        transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
        className="absolute inset-0 bg-gradient-to-r from-amber-600/20 to-orange-600/20 rounded-3xl blur-3xl -z-10"
      />
    </div>
  )
}
