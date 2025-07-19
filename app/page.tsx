"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import HomePage from "@/components/home-page"
import VortexTransition from "@/components/vortex-transition"
import TimeCapsulePage from "@/components/time-capsule-page"
import AmbientSoundSystem from "@/components/ambient-sound-system"
import { getTimeData } from "@/lib/time-data"
import { Cinzel, Orbitron } from "next/font/google"

const cinzel = Cinzel({ subsets: ["latin"], weight: ["400", "500", "600", "700"] })
const orbitron = Orbitron({ subsets: ["latin"], weight: ["400", "500", "700", "900"] })

type AppState = "home" | "transition" | "capsule"

export default function App() {
  const [currentState, setCurrentState] = useState<AppState>("home")
  const [selectedDate, setSelectedDate] = useState<string>("")
  const [timeData, setTimeData] = useState<any>(null)
  const [soundEnabled, setSoundEnabled] = useState(false)

  useEffect(() => {
    // Enable sound on first user interaction
    const enableSound = () => {
      setSoundEnabled(true)
      document.removeEventListener("click", enableSound)
    }
    document.addEventListener("click", enableSound)
    return () => document.removeEventListener("click", enableSound)
  }, [])

  const handleDateSubmit = (date: string) => {
    const data = getTimeData(date)
    setTimeData(data)
    setSelectedDate(date)
    setCurrentState("transition")

    // Transition to capsule after vortex animation - reduced timing
    setTimeout(() => {
      setCurrentState("capsule")
    }, 4500) // Changed from 5000 to 4500
  }

  const handleBackHome = () => {
    setCurrentState("transition")
    setTimeout(() => {
      setCurrentState("home")
      setSelectedDate("")
      setTimeData(null)
    }, 3000)
  }

  return (
    <div className={`${cinzel.className} min-h-screen overflow-hidden bg-black relative`}>
      <AmbientSoundSystem enabled={soundEnabled} currentState={currentState} />

      <AnimatePresence mode="wait">
        {currentState === "home" && (
          <motion.div
            key="home"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.8, rotateY: -90 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          >
            <HomePage onDateSubmit={handleDateSubmit} orbitronFont={orbitron.className} />
          </motion.div>
        )}

        {currentState === "transition" && (
          <motion.div key="transition" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <VortexTransition date={selectedDate} />
          </motion.div>
        )}

        {currentState === "capsule" && (
          <motion.div
            key="capsule"
            initial={{ opacity: 0, scale: 1.2 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 2, ease: "easeOut" }}
          >
            <TimeCapsulePage data={timeData} date={selectedDate} onBack={handleBackHome} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
