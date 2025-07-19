"use client"

import { useEffect, useRef } from "react"

interface SoundSystemProps {
  enabled: boolean
  currentState: string
}

export default function SoundSystem({ enabled, currentState }: SoundSystemProps) {
  const ambientRef = useRef<HTMLAudioElement>(null)
  const transitionRef = useRef<HTMLAudioElement>(null)

  useEffect(() => {
    if (!enabled) return

    const ambient = ambientRef.current
    const transition = transitionRef.current

    if (currentState === "home" && ambient) {
      ambient.volume = 0.3
      ambient.play().catch(() => {})
    } else if (ambient) {
      ambient.pause()
    }

    if (currentState === "transition" && transition) {
      transition.volume = 0.5
      transition.play().catch(() => {})
    } else if (transition) {
      transition.pause()
    }

    return () => {
      if (ambient) ambient.pause()
      if (transition) transition.pause()
    }
  }, [enabled, currentState])

  return (
    <>
      <audio ref={ambientRef} loop preload="auto">
        <source src="/sounds/ambient-vintage.mp3" type="audio/mpeg" />
      </audio>
      <audio ref={transitionRef} preload="auto">
        <source src="/sounds/time-warp.mp3" type="audio/mpeg" />
      </audio>
    </>
  )
}
