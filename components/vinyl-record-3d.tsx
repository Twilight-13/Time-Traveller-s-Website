"use client"

import { useRef, useEffect } from "react"
import { motion } from "framer-motion"

interface VinylRecord3DProps {
  data?: string[]
}

export default function VinylRecord3D({ data }: VinylRecord3DProps) {
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

      ctx.save()
      ctx.translate(centerX, centerY)
      ctx.rotate(rotation)

      // Vinyl record
      const gradient = ctx.createRadialGradient(0, 0, 50, 0, 0, 150)
      gradient.addColorStop(0, "#1a1a1a")
      gradient.addColorStop(0.7, "#2a2a2a")
      gradient.addColorStop(1, "#0a0a0a")

      ctx.fillStyle = gradient
      ctx.beginPath()
      ctx.arc(0, 0, 150, 0, Math.PI * 2)
      ctx.fill()

      // Grooves
      for (let i = 60; i < 150; i += 8) {
        ctx.strokeStyle = `rgba(100, 100, 100, ${0.3 + Math.sin(rotation + i) * 0.1})`
        ctx.lineWidth = 1
        ctx.beginPath()
        ctx.arc(0, 0, i, 0, Math.PI * 2)
        ctx.stroke()
      }

      // Center label
      ctx.fillStyle = "#8B4513"
      ctx.beginPath()
      ctx.arc(0, 0, 40, 0, Math.PI * 2)
      ctx.fill()

      // Label text
      ctx.fillStyle = "#FFD700"
      ctx.font = "12px serif"
      ctx.textAlign = "center"
      ctx.fillText("VINTAGE", 0, -5)
      ctx.fillText("RECORDS", 0, 10)

      ctx.restore()

      rotation += 0.02
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
      whileHover={{ scale: 1.1, rotateY: 15 }}
      transition={{ duration: 0.3 }}
      className="relative w-full h-96 flex items-center justify-center backdrop-blur-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-white/20 rounded-3xl shadow-2xl"
    >
      <canvas ref={canvasRef} className="w-80 h-80" />

      {/* Floating Music Notes */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-2xl"
            animate={{
              y: [0, -30, 0],
              opacity: [0, 1, 0],
              rotate: [0, 360],
            }}
            transition={{
              duration: 3,
              repeat: Number.POSITIVE_INFINITY,
              delay: i * 0.5,
            }}
            style={{
              left: `${20 + (i % 4) * 20}%`,
              top: `${30 + Math.floor(i / 4) * 40}%`,
            }}
          >
            ♪
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
