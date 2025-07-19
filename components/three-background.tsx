"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"

export default function ThreeBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    // Stars and particles
    const stars: Array<{
      x: number
      y: number
      z: number
      size: number
      speed: number
      color: string
    }> = []

    // Create stars
    for (let i = 0; i < 200; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        z: Math.random() * 1000,
        size: Math.random() * 3 + 1,
        speed: Math.random() * 2 + 0.5,
        color: `hsl(${Math.random() * 60 + 180}, 70%, 70%)`, // Cyan to purple range
      })
    }

    // Animation loop
    const animate = () => {
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      stars.forEach((star) => {
        // Move star towards viewer
        star.z -= star.speed

        // Reset star when it gets too close
        if (star.z <= 0) {
          star.z = 1000
          star.x = Math.random() * canvas.width
          star.y = Math.random() * canvas.height
        }

        // Calculate 3D projection
        const x = (star.x - canvas.width / 2) * (1000 / star.z) + canvas.width / 2
        const y = (star.y - canvas.height / 2) * (1000 / star.z) + canvas.height / 2
        const size = star.size * (1000 / star.z)

        // Draw star
        ctx.beginPath()
        ctx.arc(x, y, size, 0, Math.PI * 2)
        ctx.fillStyle = star.color
        ctx.shadowBlur = size * 2
        ctx.shadowColor = star.color
        ctx.fill()
        ctx.shadowBlur = 0

        // Draw star trail
        const trailLength = 50
        const trailX = (star.x - canvas.width / 2) * (1000 / (star.z + trailLength)) + canvas.width / 2
        const trailY = (star.y - canvas.height / 2) * (1000 / (star.z + trailLength)) + canvas.height / 2

        ctx.beginPath()
        ctx.moveTo(x, y)
        ctx.lineTo(trailX, trailY)
        ctx.strokeStyle = `${star.color}40`
        ctx.lineWidth = size / 2
        ctx.stroke()
      })

      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
    }
  }, [])

  return (
    <div className="absolute inset-0">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ background: "radial-gradient(ellipse at center, #1a1a2e 0%, #000000 100%)" }}
      />

      {/* Additional cosmic elements */}
      <div className="absolute inset-0">
        {/* Nebula effects */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY }}
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-purple-500/20 to-cyan-500/20 rounded-full blur-3xl"
        />

        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, delay: 2 }}
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-pink-500/20 to-purple-500/20 rounded-full blur-3xl"
        />
      </div>
    </div>
  )
}
