"use client"

import type React from "react"

import { useState, useRef } from "react"
import { motion, useMotionValue, useTransform, type PanInfo } from "framer-motion"
import { Sparkles, Zap } from "lucide-react"

interface VintageClockProps {
  label: string
  values: string[]
  selectedIndex: number
  onValueChange: (index: number) => void
  type: "year" | "month" | "day"
}

function VintageClock({ label, values, selectedIndex, onValueChange, type }: VintageClockProps) {
  const y = useMotionValue(0)
  const audioRef = useRef<HTMLAudioElement>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)

  // Calculate rotation based on selected index
  const rotation = useTransform(y, [0, 100], [0, 360])

  const handleDrag = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    event.preventDefault()
    event.stopPropagation()

    const itemHeight = 60
    const newY = info.offset.y
    const steps = Math.round(newY / itemHeight)
    const newIndex = Math.max(0, Math.min(values.length - 1, selectedIndex - steps))

    if (newIndex !== selectedIndex) {
      onValueChange(newIndex)
      // Play tick sound
      if (audioRef.current) {
        audioRef.current.currentTime = 0
        audioRef.current.play().catch(() => {})
      }
    }
  }

  const handleMouseMove = (event: React.MouseEvent) => {
    if (!isHovering) return

    const rect = event.currentTarget.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2

    const x = event.clientX - centerX
    const y = event.clientY - centerY

    setMousePosition({ x, y })
  }

  const handleWheel = (event: React.WheelEvent) => {
    event.preventDefault()
    event.stopPropagation()

    const rect = event.currentTarget.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2

    // Get mouse position relative to center
    const mouseX = event.clientX - centerX
    const mouseY = event.clientY - centerY

    // Calculate angle from center to mouse position
    const angle = Math.atan2(mouseY, mouseX)

    // Determine if scrolling should go clockwise or counterclockwise
    // Based on which quadrant the mouse is in and scroll direction
    const deltaY = event.deltaY
    let direction = 0

    // Convert angle to degrees for easier calculation
    const degrees = (angle * 180) / Math.PI

    // Determine direction based on mouse position and scroll
    if (degrees >= -45 && degrees < 45) {
      // Right side
      direction = deltaY > 0 ? 1 : -1
    } else if (degrees >= 45 && degrees < 135) {
      // Bottom side
      direction = deltaY > 0 ? 1 : -1
    } else if (degrees >= 135 || degrees < -135) {
      // Left side
      direction = deltaY > 0 ? -1 : 1
    } else {
      // Top side
      direction = deltaY > 0 ? -1 : 1
    }

    const newIndex = Math.max(0, Math.min(values.length - 1, selectedIndex + direction))

    if (newIndex !== selectedIndex) {
      onValueChange(newIndex)
      if (audioRef.current) {
        audioRef.current.currentTime = 0
        audioRef.current.play().catch(() => {})
      }
    }
  }

  const handleTouchStart = (event: React.TouchEvent) => {
    event.stopPropagation()
  }

  const handleTouchMove = (event: React.TouchEvent) => {
    event.preventDefault()
    event.stopPropagation()
  }

  return (
    <div className="flex flex-col items-center">
      <audio ref={audioRef} preload="auto">
        <source src="/sounds/clock-tick.mp3" type="audio/mpeg" />
      </audio>

      {/* Clock Face */}
      <motion.div
        className="relative w-48 h-48 md:w-56 md:h-56 cursor-grab active:cursor-grabbing"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onWheel={handleWheel}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        style={{
          touchAction: "none",
          userSelect: "none",
          WebkitUserSelect: "none",
        }}
      >
        {/* Clock Background */}
        <div
          className="absolute inset-0 rounded-full shadow-2xl"
          style={{
            backgroundImage: "url('/clock-face.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />

        {/* Vintage Overlay */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-amber-400/20 via-orange-500/30 to-amber-600/40 shadow-inner" />

        {/* Ornate Border */}
        <div className="absolute inset-2 rounded-full border-4 border-amber-400/60 shadow-lg" />
        <div className="absolute inset-4 rounded-full border-2 border-amber-300/40" />

        {/* Mouse Direction Indicator */}
        {isHovering && (
          <motion.div
            className="absolute w-2 h-2 bg-cyan-400 rounded-full shadow-lg"
            animate={{
              x: mousePosition.x * 0.3,
              y: mousePosition.y * 0.3,
              scale: [1, 1.5, 1],
            }}
            transition={{
              x: { duration: 0.1 },
              y: { duration: 0.1 },
              scale: { duration: 1, repeat: Number.POSITIVE_INFINITY },
            }}
            style={{
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)",
              boxShadow: "0 0 15px rgba(6, 182, 212, 0.8)",
            }}
          />
        )}

        {/* Rotating Dial */}
        <motion.div
          className="absolute inset-8 rounded-full bg-gradient-to-br from-amber-100/20 to-amber-900/40 backdrop-blur-sm overflow-hidden"
          drag="y"
          dragConstraints={{ top: 0, bottom: 0 }}
          onDrag={handleDrag}
          style={{ y, rotate: rotation }}
          dragElastic={0.1}
          dragMomentum={false}
        >
          {/* Value Display */}
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              key={selectedIndex}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center"
            >
              <div className="text-2xl md:text-3xl font-bold text-amber-900 drop-shadow-lg">
                {values[selectedIndex]}
              </div>
            </motion.div>
          </div>

          {/* Decorative Elements */}
          <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-1 h-4 bg-amber-600 rounded-full" />
          <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-1 h-4 bg-amber-600 rounded-full" />
          <div className="absolute left-2 top-1/2 transform -translate-y-1/2 w-4 h-1 bg-amber-600 rounded-full" />
          <div className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-1 bg-amber-600 rounded-full" />
        </motion.div>

        {/* Center Crown */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-2">
          <div className="w-6 h-8 bg-gradient-to-b from-amber-400 to-amber-600 rounded-t-full shadow-lg" />
          <div className="w-2 h-3 bg-amber-300 rounded-full mx-auto -mt-1" />
        </div>

        {/* Glow Effect */}
        <motion.div
          className="absolute inset-0 rounded-full"
          animate={{
            boxShadow: [
              "0 0 20px rgba(245, 158, 11, 0.3)",
              "0 0 40px rgba(245, 158, 11, 0.6)",
              "0 0 20px rgba(245, 158, 11, 0.3)",
            ],
          }}
          transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
        />
      </motion.div>

      {/* Label */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-6 text-center"
      >
        <div className="px-6 py-3 bg-gradient-to-r from-amber-900/40 to-orange-900/40 backdrop-blur-sm border-2 border-amber-400/50 rounded-xl shadow-lg">
          <h3 className="text-xl md:text-2xl font-bold text-amber-200 tracking-wider uppercase">{label}</h3>
        </div>
      </motion.div>
    </div>
  )
}

interface VintageClockSelectorProps {
  onDateSubmit: (date: string) => void
  orbitronFont: string
}

export default function VintageClockSelector({ onDateSubmit, orbitronFont }: VintageClockSelectorProps) {
  const currentYear = new Date().getFullYear()
  const [selectedYear, setSelectedYear] = useState(50) // Default to ~1974
  const [selectedMonth, setSelectedMonth] = useState(0) // January
  const [selectedDay, setSelectedDay] = useState(0) // 1st
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Generate arrays for each clock
  const years = Array.from({ length: 100 }, (_, i) => (currentYear - 99 + i).toString())
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
  const days = Array.from({ length: 31 }, (_, i) => (i + 1).toString().padStart(2, "0"))

  const handleSubmit = async () => {
    setIsSubmitting(true)

    // Format the date
    const year = years[selectedYear]
    const month = (selectedMonth + 1).toString().padStart(2, "0")
    const day = days[selectedDay]
    const dateString = `${year}-${month}-${day}`

    await new Promise((resolve) => setTimeout(resolve, 2000))
    onDateSubmit(dateString)
  }

  return (
    <div className="w-full" style={{ touchAction: "pan-y" }}>
      {/* Title Section */}
      <motion.div
        initial={{ opacity: 0, y: -100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 2, ease: "easeOut" }}
        className="text-center mb-16"
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 2 }}
          className="space-y-4"
        >
          <p className="text-2xl md:text-3xl text-amber-200/80 font-light italic">
            "Turn the clocks to your chosen moment in time..."
          </p>
          <p className="text-lg md:text-xl text-amber-300/70 max-w-2xl mx-auto leading-relaxed">
            Move your mouse around the clock and scroll to navigate through time
          </p>
        </motion.div>
      </motion.div>

      {/* Clock Selector */}
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 2, delay: 1.5 }}
        className="flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-16 mb-16"
        style={{
          touchAction: "none",
          overscrollBehavior: "contain",
        }}
      >
        <VintageClock
          label="Year"
          values={years}
          selectedIndex={selectedYear}
          onValueChange={setSelectedYear}
          type="year"
        />

        <VintageClock
          label="Month"
          values={months}
          selectedIndex={selectedMonth}
          onValueChange={setSelectedMonth}
          type="month"
        />

        <VintageClock label="Day" values={days} selectedIndex={selectedDay} onValueChange={setSelectedDay} type="day" />
      </motion.div>

      {/* Selected Date Display */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="mb-12 text-center"
      >
        <div className="inline-block px-8 py-4 bg-gradient-to-r from-amber-900/50 to-orange-900/50 backdrop-blur-xl border-2 border-amber-400/50 rounded-2xl shadow-2xl">
          <p className="text-amber-200/80 text-lg mb-2">Selected Date:</p>
          <p className="text-3xl md:text-4xl font-bold text-amber-100">
            {months[selectedMonth]} {days[selectedDay]}, {years[selectedYear]}
          </p>
        </div>
      </motion.div>

      {/* Unlock Button */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 2.5, duration: 1 }}
        className="text-center"
      >
        <motion.button
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="group relative px-12 py-6 text-2xl md:text-3xl font-bold bg-gradient-to-r from-amber-600 via-orange-600 to-red-600 hover:from-amber-500 hover:via-orange-500 hover:to-red-500 text-white rounded-2xl shadow-2xl transform transition-all duration-500 disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden"
          whileHover={{ scale: 1.05, y: -5 }}
          whileTap={{ scale: 0.95 }}
          style={{
            boxShadow: "0 0 50px rgba(245, 158, 11, 0.4), inset 0 0 50px rgba(255, 255, 255, 0.1)",
          }}
        >
          {/* Button Glow Effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-amber-400/20 to-orange-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            animate={{
              background: isSubmitting
                ? [
                    "linear-gradient(45deg, rgba(255,255,255,0.1) 0%, rgba(245,158,11,0.3) 50%, rgba(255,255,255,0.1) 100%)",
                    "linear-gradient(135deg, rgba(245,158,11,0.3) 0%, rgba(255,255,255,0.1) 50%, rgba(245,158,11,0.3) 100%)",
                    "linear-gradient(225deg, rgba(255,255,255,0.1) 0%, rgba(245,158,11,0.3) 50%, rgba(255,255,255,0.1) 100%)",
                    "linear-gradient(315deg, rgba(245,158,11,0.3) 0%, rgba(255,255,255,0.1) 50%, rgba(245,158,11,0.3) 100%)",
                  ]
                : "transparent",
            }}
            transition={{ duration: 2, repeat: isSubmitting ? Number.POSITIVE_INFINITY : 0 }}
          />

          {/* Energy Particles */}
          {isSubmitting && (
            <div className="absolute inset-0">
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 bg-cyan-400 rounded-full"
                  animate={{
                    x: [0, Math.cos((i * 45 * Math.PI) / 180) * 60, 0],
                    y: [0, Math.sin((i * 45 * Math.PI) / 180) * 60, 0],
                    opacity: [0, 1, 0],
                    scale: [0, 1.5, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Number.POSITIVE_INFINITY,
                    delay: i * 0.2,
                  }}
                  style={{
                    left: "50%",
                    top: "50%",
                    boxShadow: "0 0 10px rgba(6, 182, 212, 0.8)",
                  }}
                />
              ))}
            </div>
          )}

          {isSubmitting ? (
            <motion.div
              animate={{
                scale: [1, 1.1, 1],
                textShadow: [
                  "0 0 20px rgba(6, 182, 212, 0.5)",
                  "0 0 40px rgba(6, 182, 212, 0.8)",
                  "0 0 20px rgba(6, 182, 212, 0.5)",
                ],
              }}
              transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
              className="flex items-center gap-4"
            >
              <motion.div
                animate={{
                  rotate: [0, 90, 180, 270, 360],
                  scale: [1, 1.3, 1, 1.3, 1],
                }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
              >
                <Zap className="w-8 h-8" />
              </motion.div>
              <span className="tracking-wider">UNLOCKING TIME CAPSULE...</span>
              <motion.div
                animate={{
                  rotate: [360, 270, 180, 90, 0],
                  scale: [1, 1.3, 1, 1.3, 1],
                }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
              >
                <Zap className="w-8 h-8" />
              </motion.div>
            </motion.div>
          ) : (
            <span className="flex items-center gap-4 tracking-wider">
              <Sparkles className="w-8 h-8" />
              UNLOCK TIME CAPSULE
              <Sparkles className="w-8 h-8" />
            </span>
          )}
        </motion.button>
      </motion.div>
    </div>
  )
}
