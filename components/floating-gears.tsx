"use client"

import { motion } from "framer-motion"
import { Cog, Settings, Zap } from "lucide-react"

export default function FloatingGears() {
  const gears = [
    { Icon: Cog, size: "w-16 h-16", duration: 20, delay: 0 },
    { Icon: Settings, size: "w-12 h-12", duration: 15, delay: 2 },
    { Icon: Cog, size: "w-20 h-20", duration: 25, delay: 4 },
    { Icon: Zap, size: "w-10 h-10", duration: 12, delay: 1 },
    { Icon: Settings, size: "w-14 h-14", duration: 18, delay: 3 },
    { Icon: Cog, size: "w-8 h-8", duration: 10, delay: 5 },
  ]

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {gears.map((gear, i) => {
        const Icon = gear.Icon
        return (
          <motion.div
            key={i}
            className="absolute opacity-20"
            animate={{
              rotate: 360,
              x: [0, Math.sin(i) * 100, 0],
              y: [0, Math.cos(i) * 50, 0],
            }}
            transition={{
              rotate: { duration: gear.duration, repeat: Number.POSITIVE_INFINITY, ease: "linear" },
              x: { duration: gear.duration * 0.8, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" },
              y: { duration: gear.duration * 0.6, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" },
              delay: gear.delay,
            }}
            style={{
              left: `${10 + (i % 3) * 30}%`,
              top: `${15 + Math.floor(i / 3) * 35}%`,
            }}
          >
            <Icon className={`${gear.size} text-amber-400/30`} />
          </motion.div>
        )
      })}
    </div>
  )
}
