"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"

export default function ParallaxBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    // Create stars
    const stars: Array<{
      x: number
      y: number
      size: number
      opacity: number
      twinkleSpeed: number
    }> = []

    for (let i = 0; i < 200; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 3 + 1,
        opacity: Math.random(),
        twinkleSpeed: Math.random() * 0.02 + 0.01,
      })
    }

    let time = 0

    const animate = () => {
      ctx.fillStyle = "rgba(0, 0, 0, 0.1)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Draw stars
      stars.forEach((star) => {
        star.opacity += Math.sin(time * star.twinkleSpeed) * 0.01
        star.opacity = Math.max(0.1, Math.min(1, star.opacity))

        ctx.beginPath()
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255, 193, 7, ${star.opacity})`
        ctx.shadowBlur = star.size * 2
        ctx.shadowColor = "#FFC107"
        ctx.fill()
        ctx.shadowBlur = 0
      })

      time += 1
      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
    }
  }, [])

  return (
    <div className="absolute inset-0">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900/50 to-amber-900/30" />

      {/* Animated Canvas Stars */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      {/* Ancient Map Overlay */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `
              radial-gradient(circle at 20% 30%, rgba(255, 193, 7, 0.1) 0%, transparent 50%),
              radial-gradient(circle at 80% 70%, rgba(255, 152, 0, 0.1) 0%, transparent 50%),
              linear-gradient(45deg, transparent 40%, rgba(255, 193, 7, 0.05) 50%, transparent 60%)
            `,
          }}
        />
      </div>

      {/* Floating Constellation Lines */}
      <svg className="absolute inset-0 w-full h-full opacity-20" viewBox="0 0 100 100" preserveAspectRatio="none">
        <motion.path
          d="M10,20 L30,40 L50,30 L70,60 L90,50"
          stroke="rgba(255, 193, 7, 0.3)"
          strokeWidth="0.1"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
        />
        <motion.path
          d="M20,80 L40,60 L60,70 L80,40"
          stroke="rgba(255, 152, 0, 0.3)"
          strokeWidth="0.1"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 7, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse", delay: 2 }}
        />
      </svg>
    </div>
  )
}
