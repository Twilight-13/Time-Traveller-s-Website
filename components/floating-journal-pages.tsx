"use client"

import { motion } from "framer-motion"
import { FileText, Clock, Zap } from "lucide-react"

export default function FloatingJournalPages() {
  const pages = [
    { icon: FileText, text: "Entry #2847", delay: 0 },
    { icon: Clock, text: "Temporal Log", delay: 1 },
    { icon: Zap, text: "Quantum Notes", delay: 2 },
  ]

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {pages.map((page, index) => {
        const Icon = page.icon
        return (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 100, rotateX: -90 }}
            animate={{
              opacity: [0, 0.8, 0],
              y: [-100, -200, -300],
              rotateX: [-90, 0, 90],
              rotateY: [0, 180, 360],
            }}
            transition={{
              duration: 8,
              repeat: Number.POSITIVE_INFINITY,
              delay: page.delay * 2,
              ease: "easeInOut",
            }}
            className="absolute"
            style={{
              left: `${20 + index * 30}%`,
              top: "80%",
            }}
          >
            <div className="backdrop-blur-sm bg-white/10 border border-cyan-400/30 rounded-lg p-4 shadow-2xl">
              <div className="flex items-center gap-3 text-cyan-300">
                <Icon className="w-6 h-6" />
                <span className="text-sm font-mono">{page.text}</span>
              </div>
              <div className="mt-2 space-y-1">
                {[...Array(3)].map((_, i) => (
                  <div
                    key={i}
                    className="h-1 bg-gradient-to-r from-cyan-400/50 to-transparent rounded"
                    style={{ width: `${Math.random() * 60 + 40}%` }}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        )
      })}

      {/* Floating gears */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={`gear-${i}`}
          animate={{
            rotate: 360,
            x: [0, Math.sin(i) * 50],
            y: [0, Math.cos(i) * 30],
          }}
          transition={{
            rotate: { duration: 10 + i * 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" },
            x: { duration: 6 + i, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" },
            y: { duration: 8 + i, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" },
          }}
          className="absolute w-16 h-16 border-2 border-cyan-400/30 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            clipPath: "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)",
          }}
        />
      ))}
    </div>
  )
}
