"use client"

import { useRef, useEffect } from "react"
import { motion } from "framer-motion"

interface TimePortalCenterpieceProps {
  isActivating: boolean
}

export default function TimePortalCenterpiece({ isActivating }: TimePortalCenterpieceProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = 600
    canvas.height = 600

    let animationId: number
    let time = 0

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const centerX = canvas.width / 2
      const centerY = canvas.height / 2

      // Draw multiple rotating rings with different speeds
      for (let ring = 0; ring < 12; ring++) {
        const radius = 40 + ring * 25
        const speed = 0.01 + ring * 0.003
        const rotation = time * speed * (ring % 2 === 0 ? 1 : -1)

        ctx.save()
        ctx.translate(centerX, centerY)
        ctx.rotate(rotation)

        // Ring gradient with warm colors
        const gradient = ctx.createRadialGradient(0, 0, radius - 15, 0, 0, radius + 15)
        const intensity = isActivating ? 1.5 : 1
        gradient.addColorStop(0, `rgba(255, 193, 7, ${(0.8 - ring * 0.06) * intensity})`)
        gradient.addColorStop(0.5, `rgba(255, 152, 0, ${(0.6 - ring * 0.05) * intensity})`)
        gradient.addColorStop(1, `rgba(255, 87, 34, ${(0.3 - ring * 0.03) * intensity})`)

        ctx.strokeStyle = gradient
        ctx.lineWidth = isActivating ? 4 : 2
        ctx.shadowBlur = isActivating ? 30 : 15
        ctx.shadowColor = "#FFC107"

        // Draw ring segments
        const segments = 8 + ring * 2
        for (let segment = 0; segment < segments; segment++) {
          const angle = (segment / segments) * Math.PI * 2
          const startAngle = angle - 0.15
          const endAngle = angle + 0.15

          ctx.beginPath()
          ctx.arc(0, 0, radius, startAngle, endAngle)
          ctx.stroke()
        }

        ctx.restore()
      }

      // Central energy core
      const coreGradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, 80)
      coreGradient.addColorStop(0, `rgba(255, 255, 255, ${isActivating ? 0.9 : 0.6})`)
      coreGradient.addColorStop(0.3, `rgba(255, 193, 7, ${isActivating ? 0.8 : 0.5})`)
      coreGradient.addColorStop(0.7, `rgba(255, 152, 0, ${isActivating ? 0.6 : 0.3})`)
      coreGradient.addColorStop(1, "rgba(255, 87, 34, 0)")

      ctx.fillStyle = coreGradient
      ctx.beginPath()
      ctx.arc(centerX, centerY, 80, 0, Math.PI * 2)
      ctx.fill()

      // Energy particles
      for (let i = 0; i < 20; i++) {
        const particleAngle = (time * 0.02 + i * 0.314) % (Math.PI * 2)
        const particleRadius = 100 + Math.sin(time * 0.05 + i) * 50
        const x = centerX + Math.cos(particleAngle) * particleRadius
        const y = centerY + Math.sin(particleAngle) * particleRadius

        ctx.beginPath()
        ctx.arc(x, y, 3, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255, 193, 7, ${0.8 + Math.sin(time * 0.1 + i) * 0.2})`
        ctx.shadowBlur = 10
        ctx.shadowColor = "#FFC107"
        ctx.fill()
        ctx.shadowBlur = 0
      }

      time += isActivating ? 0.15 : 0.03
      animationId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId)
      }
    }
  }, [isActivating])

  return (
    <motion.div
      animate={{
        scale: isActivating ? [1, 1.3, 1.1] : 1,
        rotate: isActivating ? 360 : 0,
      }}
      transition={{
        scale: { duration: 3, repeat: isActivating ? Number.POSITIVE_INFINITY : 0 },
        rotate: { duration: 8, ease: "linear", repeat: isActivating ? Number.POSITIVE_INFINITY : 0 },
      }}
      className="relative"
    >
      <canvas
        ref={canvasRef}
        className="w-[400px] h-[400px] md:w-[500px] md:h-[500px] lg:w-[600px] lg:h-[600px]"
        style={{
          filter: isActivating ? "brightness(1.8) saturate(1.5) drop-shadow(0 0 50px #FFC107)" : "brightness(1.2)",
          transition: "filter 0.5s ease",
        }}
      />

      {/* Clock Face Overlay */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-40 h-40 md:w-48 md:h-48 border-4 border-amber-400/60 rounded-full backdrop-blur-sm bg-black/30 shadow-2xl">
          <div className="relative w-full h-full">
            {/* Roman Numerals */}
            {["XII", "III", "VI", "IX"].map((numeral, i) => (
              <div
                key={numeral}
                className="absolute text-amber-300 font-bold text-xl md:text-2xl"
                style={{
                  top: i === 0 ? "8%" : i === 2 ? "82%" : "42%",
                  left: i === 1 ? "82%" : i === 3 ? "8%" : "42%",
                  transform: "translate(-50%, -50%)",
                }}
              >
                {numeral}
              </div>
            ))}

            {/* Clock Hands */}
            <motion.div
              className="absolute top-1/2 left-1/2 w-1 h-16 bg-amber-400 origin-bottom shadow-lg"
              style={{ transformOrigin: "50% 100%" }}
              animate={{ rotate: isActivating ? 360 : 0 }}
              transition={{ duration: 4, repeat: isActivating ? Number.POSITIVE_INFINITY : 0, ease: "linear" }}
            />
            <motion.div
              className="absolute top-1/2 left-1/2 w-0.5 h-12 bg-orange-400 origin-bottom shadow-lg"
              style={{ transformOrigin: "50% 100%" }}
              animate={{ rotate: isActivating ? 360 : 0 }}
              transition={{ duration: 2, repeat: isActivating ? Number.POSITIVE_INFINITY : 0, ease: "linear" }}
            />

            {/* Center dot */}
            <div className="absolute top-1/2 left-1/2 w-3 h-3 bg-amber-400 rounded-full transform -translate-x-1/2 -translate-y-1/2 shadow-lg" />
          </div>
        </div>
      </div>
    </motion.div>
  )
}
