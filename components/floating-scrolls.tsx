"use client"

import { motion } from "framer-motion"
import { Scroll, FileText, BookOpen } from "lucide-react"

interface FloatingScrollsProps {
  data?: string[]
}

export default function FloatingScrolls({ data }: FloatingScrollsProps) {
  const scrollIcons = [Scroll, FileText, BookOpen]

  return (
    <motion.div
      whileHover={{ scale: 1.05, rotateX: 10 }}
      transition={{ duration: 0.5 }}
      className="relative w-full h-96 flex items-center justify-center backdrop-blur-2xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 border-2 border-white/20 rounded-3xl shadow-2xl overflow-hidden"
    >
      {/* Main Scroll Display */}
      <div className="relative">
        {[...Array(5)].map((_, i) => {
          const Icon = scrollIcons[i % scrollIcons.length]
          return (
            <motion.div
              key={i}
              className="absolute backdrop-blur-sm bg-amber-100/20 border border-amber-400/40 rounded-2xl p-6 shadow-xl"
              animate={{
                y: [0, -20, 0],
                x: [0, Math.sin(i) * 30, 0],
                rotateZ: [0, 5, -5, 0],
              }}
              transition={{
                duration: 6 + i * 2,
                repeat: Number.POSITIVE_INFINITY,
                delay: i * 0.8,
              }}
              style={{
                left: `${-100 + i * 50}px`,
                top: `${-50 + (i % 2) * 100}px`,
                width: "200px",
                height: "120px",
              }}
            >
              <Icon className="w-8 h-8 text-amber-400 mb-3" />
              <div className="space-y-2">
                {[...Array(3)].map((_, lineIndex) => (
                  <div
                    key={lineIndex}
                    className="h-2 bg-amber-300/40 rounded"
                    style={{ width: `${60 + Math.random() * 40}%` }}
                  />
                ))}
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* Floating Text Fragments */}
      <div className="absolute inset-0 pointer-events-none">
        {["BREAKING", "EXTRA", "NEWS", "HERALD", "TIMES"].map((text, i) => (
          <motion.div
            key={text}
            className="absolute text-2xl font-bold text-indigo-300/60"
            animate={{
              y: [0, -40, 0],
              opacity: [0.3, 0.8, 0.3],
              rotate: [0, 360],
            }}
            transition={{
              duration: 8 + i,
              repeat: Number.POSITIVE_INFINITY,
              delay: i * 1.5,
            }}
            style={{
              left: `${20 + (i % 3) * 30}%`,
              top: `${30 + Math.floor(i / 3) * 40}%`,
            }}
          >
            {text}
          </motion.div>
        ))}
      </div>

      {/* Ink Splatter Effect */}
      <div className="absolute inset-0">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-4 h-4 bg-indigo-400/30 rounded-full"
            animate={{
              scale: [0, 1.5, 0],
              opacity: [0, 0.6, 0],
            }}
            transition={{
              duration: 3,
              repeat: Number.POSITIVE_INFINITY,
              delay: i * 0.5,
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
