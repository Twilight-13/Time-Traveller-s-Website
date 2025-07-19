"use client"

import { useRef, useEffect } from "react"
import { motion } from "framer-motion"

interface TimePortal3DProps {
  isActivating: boolean
}

export default function TimePortal3D({ isActivating }: TimePortal3DProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = 800
    canvas.height = 800

    let animationId: number
    let time = 0

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const centerX = canvas.width / 2
      const centerY = canvas.height / 2

      // Draw multiple rotating rings
      for (let ring = 0; ring < 8; ring++) {
        const radius = 50 + ring * 40
        const speed = 0.02 + ring * 0.005
        const rotation = time * speed

        ctx.save()
        ctx.translate(centerX, centerY)
        ctx.rotate(rotation)

        // Ring gradient
        const gradient = ctx.createRadialGradient(0, 0, radius - 20, 0, 0, radius + 20)
        gradient.addColorStop(0, `rgba(255, 193, 7, ${0.8 - ring * 0.1})`)
        gradient.addColorStop(0.5, `rgba(255, 152, 0, ${0.6 - ring * 0.08})`)
        gradient.addColorStop(1, `rgba(255, 87, 34, ${0.3 - ring * 0.05})`)

        ctx.strokeStyle = gradient
        ctx.lineWidth = 3
        ctx.shadowBlur = 20
        ctx.shadowColor = "#FFC107"

        // Draw ring segments
        for (let segment = 0; segment < 12; segment++) {
          const angle = (segment / 12) * Math.PI * 2
          const startAngle = angle - 0.2
          const endAngle = angle + 0.2

          ctx.beginPath()
          ctx.arc(0, 0, radius, startAngle, endAngle)
          ctx.stroke()
        }

        ctx.restore()
      }

      // Central glow
      const glowGradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, 100)
      glowGradient.addColorStop(0, "rgba(255, 193, 7, 0.8)")
      glowGradient.addColorStop(0.5, "rgba(255, 152, 0, 0.4)")
      glowGradient.addColorStop(1, "rgba(255, 87, 34, 0)")

      ctx.fillStyle = glowGradient
      ctx.fillRect(centerX - 100, centerY - 100, 200, 200)

      time += isActivating ? 0.1 : 0.02
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
        scale: isActivating ? [1, 1.2, 1] : 1,
        rotate: isActivating ? 360 : 0,
      }}
      transition={{
        scale: { duration: 2, repeat: isActivating ? Number.POSITIVE_INFINITY : 0 },
        rotate: { duration: 4, ease: "linear", repeat: isActivating ? Number.POSITIVE_INFINITY : 0 },
      }}
      className="relative"
    >
      <canvas
        ref={canvasRef}
        className="w-96 h-96 md:w-[500px] md:h-[500px]"
        style={{
          filter: isActivating ? "brightness(1.5) saturate(1.5)" : "brightness(1)",
          transition: "filter 0.5s ease",
        }}
      />

      {/* Clock Face Overlay */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-32 h-32 border-4 border-amber-400/50 rounded-full backdrop-blur-sm bg-black/20">
          <div className="relative w-full h-full">
            {/* Clock Numbers */}
            {[12, 3, 6, 9].map((num, i) => (
              <div
                key={num}
                className="absolute text-amber-300 font-bold text-xl"
                style={{
                  top: i === 0 ? "5%" : i === 2 ? "85%" : "45%",
                  left: i === 1 ? "85%" : i === 3 ? "5%" : "45%",
                  transform: "translate(-50%, -50%)",
                }}
              >
                {num}
              </div>
            ))}

            {/* Clock Hands */}
            <motion.div
              className="absolute top-1/2 left-1/2 w-1 h-12 bg-amber-400 origin-bottom"
              style={{ transformOrigin: "50% 100%" }}
              animate={{ rotate: isActivating ? 360 : 0 }}
              transition={{ duration: 2, repeat: isActivating ? Number.POSITIVE_INFINITY : 0, ease: "linear" }}
            />
            <motion.div
              className="absolute top-1/2 left-1/2 w-0.5 h-8 bg-orange-400 origin-bottom"
              style={{ transformOrigin: "50% 100%" }}
              animate={{ rotate: isActivating ? 360 : 0 }}
              transition={{ duration: 1, repeat: isActivating ? Number.POSITIVE_INFINITY : 0, ease: "linear" }}
            />
          </div>
        </div>
      </div>
    </motion.div>
  )
}
