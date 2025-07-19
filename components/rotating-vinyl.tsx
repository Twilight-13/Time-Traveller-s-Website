"use client"

import { useRef, useEffect } from "react"
import { motion } from "framer-motion"

interface RotatingVinylProps {
  data?: string[]
}

export default function RotatingVinyl({ data }: RotatingVinylProps) {
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

      // Vinyl record gradient
      const vinylGradient = ctx.createRadialGradient(0, 0, 30, 0, 0, 180)
      vinylGradient.addColorStop(0, "#1a1a1a")
      vinylGradient.addColorStop(0.3, "#2a2a2a")
      vinylGradient.addColorStop(0.7, "#1a1a1a")
      vinylGradient.addColorStop(1, "#0a0a0a")

      ctx.fillStyle = vinylGradient
      ctx.beginPath()
      ctx.arc(0, 0, 180, 0, Math.PI * 2)
      ctx.fill()

      // Grooves with shimmer effect
      for (let i = 40; i < 180; i += 6) {
        const shimmer = Math.sin(rotation * 3 + i * 0.1) * 0.3 + 0.7
        ctx.strokeStyle = `rgba(100, 100, 100, ${0.4 * shimmer})`
        ctx.lineWidth = 1
        ctx.beginPath()
        ctx.arc(0, 0, i, 0, Math.PI * 2)
        ctx.stroke()
      }

      // Center label
      const labelGradient = ctx.createRadialGradient(0, 0, 0, 0, 0, 50)
      labelGradient.addColorStop(0, "#8B4513")
      labelGradient.addColorStop(0.8, "#654321")
      labelGradient.addColorStop(1, "#3d2817")

      ctx.fillStyle = labelGradient
      ctx.beginPath()
      ctx.arc(0, 0, 50, 0, Math.PI * 2)
      ctx.fill()

      // Label text
      ctx.fillStyle = "#FFD700"
      ctx.font = "bold 14px serif"
      ctx.textAlign = "center"
      ctx.fillText("VINTAGE", 0, -8)
      ctx.fillText("RECORDS", 0, 8)

      // Highlight reflection
      ctx.save()
      ctx.rotate(-rotation * 0.5)
      const highlightGradient = ctx.createLinearGradient(-180, -180, 180, 180)
      highlightGradient.addColorStop(0, "rgba(255, 255, 255, 0)")
      highlightGradient.addColorStop(0.3, "rgba(255, 255, 255, 0.1)")
      highlightGradient.addColorStop(0.7, "rgba(255, 255, 255, 0)")
      ctx.fillStyle = highlightGradient
      ctx.beginPath()
      ctx.arc(0, 0, 180, 0, Math.PI * 2)
      ctx.fill()
      ctx.restore()

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
      transition={{ duration: 0.5 }}
      className="relative w-full h-96 flex items-center justify-center backdrop-blur-2xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 border-2 border-white/20 rounded-3xl shadow-2xl overflow-hidden"
    >
      <canvas ref={canvasRef} className="w-80 h-80" />

      {/* Floating Musical Notes */}
      <div className="absolute inset-0 pointer-events-none">
        {["♪", "♫", "♬", "♩", "♭", "♯"].map((note, i) => (
          <motion.div
            key={i}
            className="absolute text-4xl text-purple-300/60 font-bold"
            animate={{
              y: [0, -50, 0],
              x: [0, Math.sin(i) * 30, 0],
              opacity: [0.3, 0.8, 0.3],
              rotate: [0, 360],
              scale: [0.8, 1.2, 0.8],
            }}
            transition={{
              duration: 4 + i,
              repeat: Number.POSITIVE_INFINITY,
              delay: i * 0.7,
            }}
            style={{
              left: `${15 + (i % 3) * 30}%`,
              top: `${20 + Math.floor(i / 3) * 40}%`,
            }}
          >
            {note}
          </motion.div>
        ))}
      </div>

      {/* Sound Waves */}
      <div className="absolute inset-0">
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute inset-0 border-2 border-purple-400/20 rounded-full"
            animate={{
              scale: [1, 1.5],
              opacity: [0.6, 0],
            }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              delay: i * 0.5,
            }}
          />
        ))}
      </div>
    </motion.div>
  )
}
