"use client"

import { useRef, useEffect } from "react"
import { motion } from "framer-motion"

export default function StarfieldBackground() {
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

    // Create stars with depth
    const stars: Array<{
      x: number
      y: number
      z: number
      size: number
      speed: number
      color: string
      twinkle: number
    }> = []

    for (let i = 0; i < 300; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        z: Math.random() * 1000,
        size: Math.random() * 4 + 1,
        speed: Math.random() * 3 + 1,
        color: `hsl(${Math.random() * 60 + 30}, 70%, ${Math.random() * 40 + 60}%)`, // Warm colors
        twinkle: Math.random() * Math.PI * 2,
      })
    }

    let time = 0

    const animate = () => {
      // Create nebula effect
      const gradient = ctx.createRadialGradient(
        canvas.width / 2,
        canvas.height / 2,
        0,
        canvas.width / 2,
        canvas.height / 2,
        Math.max(canvas.width, canvas.height),
      )
      gradient.addColorStop(0, "rgba(20, 20, 40, 0.8)")
      gradient.addColorStop(0.5, "rgba(40, 20, 60, 0.6)")
      gradient.addColorStop(1, "rgba(0, 0, 0, 1)")

      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Draw stars with 3D effect
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

        // Twinkling effect
        star.twinkle += 0.05
        const twinkleIntensity = Math.sin(star.twinkle) * 0.5 + 0.5

        // Draw star
        ctx.beginPath()
        ctx.arc(x, y, size, 0, Math.PI * 2)
        ctx.fillStyle = star.color
        ctx.globalAlpha = twinkleIntensity * (1000 / star.z) * 0.8
        ctx.shadowBlur = size * 3
        ctx.shadowColor = star.color
        ctx.fill()
        ctx.shadowBlur = 0
        ctx.globalAlpha = 1

        // Draw star trail
        if (star.z < 500) {
          const trailLength = 100
          const trailX = (star.x - canvas.width / 2) * (1000 / (star.z + trailLength)) + canvas.width / 2
          const trailY = (star.y - canvas.height / 2) * (1000 / (star.z + trailLength)) + canvas.height / 2

          ctx.beginPath()
          ctx.moveTo(x, y)
          ctx.lineTo(trailX, trailY)
          ctx.strokeStyle = `${star.color}60`
          ctx.lineWidth = size / 2
          ctx.stroke()
        }
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
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      {/* Nebula Overlay Effects */}
      <div className="absolute inset-0">
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2],
            rotate: [0, 360],
          }}
          transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-purple-500/20 via-blue-500/20 to-cyan-500/20 rounded-full blur-3xl"
        />

        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.15, 0.35, 0.15],
            rotate: [360, 0],
          }}
          transition={{ duration: 25, repeat: Number.POSITIVE_INFINITY, ease: "linear", delay: 5 }}
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-orange-500/20 via-red-500/20 to-pink-500/20 rounded-full blur-3xl"
        />

        <motion.div
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.1, 0.3, 0.1],
            rotate: [0, -360],
          }}
          transition={{ duration: 30, repeat: Number.POSITIVE_INFINITY, ease: "linear", delay: 10 }}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-amber-500/10 via-yellow-500/10 to-orange-500/10 rounded-full blur-3xl"
        />
      </div>
    </div>
  )
}
