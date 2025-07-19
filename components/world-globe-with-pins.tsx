"use client"

import { useRef, useEffect } from "react"
import { motion } from "framer-motion"

interface WorldGlobeWithPinsProps {
  data?: string[]
}

export default function WorldGlobeWithPins({ data }: WorldGlobeWithPinsProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = 400
    canvas.height = 400

    let rotation = 0
    let animationId: number

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const centerX = canvas.width / 2
      const centerY = canvas.height / 2
      const radius = 140

      // Globe with realistic shading
      const globeGradient = ctx.createRadialGradient(centerX - 40, centerY - 40, 0, centerX, centerY, radius)
      globeGradient.addColorStop(0, "#4A90E2")
      globeGradient.addColorStop(0.3, "#357ABD")
      globeGradient.addColorStop(0.7, "#2E5C8A")
      globeGradient.addColorStop(1, "#1A3A5C")

      ctx.fillStyle = globeGradient
      ctx.beginPath()
      ctx.arc(centerX, centerY, radius, 0, Math.PI * 2)
      ctx.fill()

      // Continents with rotation
      ctx.save()
      ctx.translate(centerX, centerY)
      ctx.rotate(rotation)

      ctx.fillStyle = "#2D5A27"
      ctx.shadowBlur = 5
      ctx.shadowColor = "#1A3A1A"

      // Simplified continent shapes
      const continents = [
        { x: -60, y: -30, w: 80, h: 40, r: 10 },
        { x: 30, y: -50, w: 60, h: 70, r: 15 },
        { x: -80, y: 30, w: 100, h: 50, r: 12 },
        { x: 40, y: 40, w: 70, h: 45, r: 8 },
      ]

      continents.forEach((continent) => {
        ctx.beginPath()
        ctx.roundRect(continent.x, continent.y, continent.w, continent.h, continent.r)
        ctx.fill()
      })

      ctx.shadowBlur = 0
      ctx.restore()

      // Event pins with pulsing animation
      const pins = [
        { x: centerX - 50, y: centerY - 40, intensity: Math.sin(Date.now() * 0.003) * 0.5 + 0.5 },
        { x: centerX + 60, y: centerY - 30, intensity: Math.sin(Date.now() * 0.004 + 1) * 0.5 + 0.5 },
        { x: centerX - 30, y: centerY + 50, intensity: Math.sin(Date.now() * 0.005 + 2) * 0.5 + 0.5 },
        { x: centerX + 40, y: centerY + 60, intensity: Math.sin(Date.now() * 0.003 + 3) * 0.5 + 0.5 },
        { x: centerX - 70, y: centerY + 20, intensity: Math.sin(Date.now() * 0.006 + 4) * 0.5 + 0.5 },
      ]

      pins.forEach((pin, i) => {
        const size = 4 + pin.intensity * 4
        const alpha = 0.7 + pin.intensity * 0.3

        // Pin glow
        ctx.shadowBlur = 15
        ctx.shadowColor = "#FFC107"
        ctx.fillStyle = `rgba(255, 193, 7, ${alpha})`
        ctx.beginPath()
        ctx.arc(pin.x, pin.y, size, 0, Math.PI * 2)
        ctx.fill()

        // Pin pulse rings
        for (let ring = 1; ring <= 3; ring++) {
          ctx.strokeStyle = `rgba(255, 193, 7, ${(alpha * 0.3) / ring})`
          ctx.lineWidth = 2
          ctx.beginPath()
          ctx.arc(pin.x, pin.y, size + ring * 8 * pin.intensity, 0, Math.PI * 2)
          ctx.stroke()
        }

        ctx.shadowBlur = 0
      })

      // Globe highlight
      const highlightGradient = ctx.createRadialGradient(centerX - 60, centerY - 60, 0, centerX, centerY, radius)
      highlightGradient.addColorStop(0, "rgba(255, 255, 255, 0.3)")
      highlightGradient.addColorStop(0.3, "rgba(255, 255, 255, 0.1)")
      highlightGradient.addColorStop(1, "rgba(255, 255, 255, 0)")

      ctx.fillStyle = highlightGradient
      ctx.beginPath()
      ctx.arc(centerX, centerY, radius, 0, Math.PI * 2)
      ctx.fill()

      rotation += 0.008
      animationId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId)
      }
    }
  }, [])

  return (
    <motion.div
      whileHover={{ scale: 1.1, rotateX: 10 }}
      transition={{ duration: 0.5 }}
      className="relative w-full h-96 flex items-center justify-center backdrop-blur-2xl bg-gradient-to-br from-green-500/20 to-emerald-500/20 border-2 border-white/20 rounded-3xl shadow-2xl overflow-hidden"
    >
      <canvas ref={canvasRef} className="w-80 h-80" />

      {/* Floating Event Markers */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-6 h-6 bg-amber-400 rounded-full border-2 border-white/50"
            animate={{
              scale: [1, 1.8, 1],
              opacity: [0.6, 1, 0.6],
              boxShadow: [
                "0 0 10px rgba(245, 158, 11, 0.5)",
                "0 0 25px rgba(245, 158, 11, 0.8)",
                "0 0 10px rgba(245, 158, 11, 0.5)",
              ],
            }}
            transition={{
              duration: 3,
              repeat: Number.POSITIVE_INFINITY,
              delay: i * 0.4,
            }}
            style={{
              left: `${15 + (i % 3) * 30}%`,
              top: `${20 + Math.floor(i / 3) * 25}%`,
            }}
          />
        ))}
      </div>

      {/* Connection Lines */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none">
        {[...Array(4)].map((_, i) => (
          <motion.path
            key={i}
            d={`M${20 + i * 80},${100 + i * 50} Q${200},${150} ${300 - i * 60},${200 + i * 40}`}
            stroke="rgba(34, 197, 94, 0.4)"
            strokeWidth="2"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{
              duration: 4,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
              delay: i * 0.8,
            }}
          />
        ))}
      </svg>

      {/* Orbital Rings */}
      <div className="absolute inset-0">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute inset-0 border border-green-400/20 rounded-full"
            animate={{ rotate: 360 }}
            transition={{
              duration: 20 + i * 10,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
            style={{
              margin: `${20 + i * 15}px`,
            }}
          />
        ))}
      </div>
    </motion.div>
  )
}
