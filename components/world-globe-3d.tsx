"use client"

import { useRef, useEffect } from "react"
import { motion } from "framer-motion"

interface WorldGlobe3DProps {
  data?: string[]
}

export default function WorldGlobe3D({ data }: WorldGlobe3DProps) {
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
      const radius = 120

      // Globe
      const gradient = ctx.createRadialGradient(centerX - 30, centerY - 30, 0, centerX, centerY, radius)
      gradient.addColorStop(0, "#4A90E2")
      gradient.addColorStop(0.7, "#2E5C8A")
      gradient.addColorStop(1, "#1A3A5C")

      ctx.fillStyle = gradient
      ctx.beginPath()
      ctx.arc(centerX, centerY, radius, 0, Math.PI * 2)
      ctx.fill()

      // Continents (simplified)
      ctx.save()
      ctx.translate(centerX, centerY)
      ctx.rotate(rotation)

      ctx.fillStyle = "#2D5A27"

      // Simple continent shapes
      const continents = [
        { x: -40, y: -20, w: 60, h: 30 },
        { x: 20, y: -40, w: 40, h: 50 },
        { x: -60, y: 20, w: 80, h: 40 },
        { x: 30, y: 30, w: 50, h: 35 },
      ]

      continents.forEach((continent) => {
        ctx.fillRect(continent.x, continent.y, continent.w, continent.h)
      })

      ctx.restore()

      // Event pins
      const pins = [
        { x: centerX - 40, y: centerY - 30 },
        { x: centerX + 50, y: centerY - 20 },
        { x: centerX - 20, y: centerY + 40 },
        { x: centerX + 30, y: centerY + 50 },
      ]

      pins.forEach((pin, i) => {
        const pulse = Math.sin(Date.now() * 0.005 + i) * 0.5 + 0.5
        ctx.fillStyle = `rgba(255, 193, 7, ${0.8 + pulse * 0.2})`
        ctx.beginPath()
        ctx.arc(pin.x, pin.y, 4 + pulse * 2, 0, Math.PI * 2)
        ctx.fill()

        // Pin glow
        ctx.shadowBlur = 10
        ctx.shadowColor = "#FFC107"
        ctx.fill()
        ctx.shadowBlur = 0
      })

      rotation += 0.01
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
      transition={{ duration: 0.3 }}
      className="relative w-full h-96 flex items-center justify-center backdrop-blur-xl bg-gradient-to-br from-green-500/20 to-emerald-500/20 border border-white/20 rounded-3xl shadow-2xl overflow-hidden"
    >
      <canvas ref={canvasRef} className="w-80 h-80" />

      {/* Floating Event Markers */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-4 h-4 bg-amber-400 rounded-full"
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.6, 1, 0.6],
            }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              delay: i * 0.3,
            }}
            style={{
              left: `${20 + (i % 3) * 30}%`,
              top: `${25 + Math.floor(i / 3) * 50}%`,
              boxShadow: "0 0 15px rgba(245, 158, 11, 0.8)",
            }}
          />
        ))}
      </div>
    </motion.div>
  )
}
