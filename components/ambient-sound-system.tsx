"use client"

import { useEffect, useRef } from "react"

interface AmbientSoundSystemProps {
  enabled: boolean
  currentState: string
}

export default function AmbientSoundSystem({ enabled, currentState }: AmbientSoundSystemProps) {
  const ambientRef = useRef<HTMLAudioElement>(null)
  const transitionRef = useRef<HTMLAudioElement>(null)
  const museumRef = useRef<HTMLAudioElement>(null)

  useEffect(() => {
    if (!enabled) return

    const ambient = ambientRef.current
    const transition = transitionRef.current
    const museum = museumRef.current

    // Stop all sounds first
    if (ambient) ambient.pause()
    if (transition) transition.pause()
    if (museum) museum.pause()

    if (currentState === "home" && ambient) {
      ambient.volume = 0.2
      ambient.play().catch(() => {})
    } else if (currentState === "transition" && transition) {
      transition.volume = 0.4
      transition.play().catch(() => {})
    } else if (currentState === "capsule" && museum) {
      museum.volume = 0.15
      museum.play().catch(() => {})
    }

    return () => {
      if (ambient) ambient.pause()
      if (transition) transition.pause()
      if (museum) museum.pause()
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
      <audio ref={museumRef} loop preload="auto">
        <source src="/sounds/museum-ambient.mp3" type="audio/mpeg" />
      </audio>
    </>
  )
}
