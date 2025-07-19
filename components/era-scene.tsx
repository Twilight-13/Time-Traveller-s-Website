"use client"

import { motion } from "framer-motion"
import { ArrowLeft, Music, Palette, Zap, Newspaper, Shirt, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"

interface EraSceneProps {
  data: any
  date: string
  onExit: () => void
}

export default function EraScene({ data, date, onExit }: EraSceneProps) {
  const year = new Date(date).getFullYear()

  // Fallback data in case of undefined
  const safeData = data || {
    eraName: "Unknown Era",
    music: ["No data available"],
    fashion: ["No data available"],
    tech: ["No data available"],
    headlines: ["No data available"],
    art: ["No data available"],
    events: ["No data available"],
    bgGradient: "linear-gradient(135deg, #2d1b69 0%, #11998e 50%, #38ef7d 100%)",
    titleGradient: "from-emerald-400 to-cyan-500",
    accentColor: "bg-emerald-400",
    pattern: "repeating-radial-gradient(circle at 50% 50%, rgba(56,239,125,0.1) 0px, transparent 20px)",
  }

  const panels = [
    { title: "Cultural Pulse", icon: Music, content: safeData.music || [], color: "from-purple-500 to-pink-500" },
    { title: "Fashion Matrix", icon: Shirt, content: safeData.fashion || [], color: "from-cyan-500 to-blue-500" },
    { title: "Tech Genesis", icon: Zap, content: safeData.tech || [], color: "from-green-500 to-emerald-500" },
    { title: "Headlines", icon: Newspaper, content: safeData.headlines || [], color: "from-orange-500 to-red-500" },
    { title: "Art Spectrum", icon: Palette, content: safeData.art || [], color: "from-indigo-500 to-purple-500" },
    { title: "Timeline", icon: Calendar, content: safeData.events || [], color: "from-amber-500 to-orange-500" },
  ]

  return (
    <div className="min-h-screen relative overflow-hidden" style={{ background: safeData.bgGradient }}>
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0" style={{ backgroundImage: safeData.pattern }} />
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute w-4 h-4 rounded-full ${safeData.accentColor}`}
            animate={{
              x: [0, Math.random() * 100 - 50],
              y: [0, Math.random() * 100 - 50],
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: Math.random() * 4 + 3,
              repeat: Number.POSITIVE_INFINITY,
              delay: Math.random() * 2,
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="relative z-10 p-8 flex items-center justify-between"
      >
        <Button
          onClick={onExit}
          variant="ghost"
          className="text-white/80 hover:text-white hover:bg-white/10 backdrop-blur-sm border border-white/20"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Exit Timeline
        </Button>

        <div className="text-center">
          <h1
            className={`text-6xl md:text-8xl font-bold bg-gradient-to-r ${safeData.titleGradient} bg-clip-text text-transparent`}
          >
            {year}
          </h1>
          <p className="text-white/80 text-xl mt-2">{safeData.eraName}</p>
        </div>

        <div className="w-32" />
      </motion.div>

      {/* Floating 3D Panels */}
      <div className="relative z-10 p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {panels.map((panel, index) => {
            const Icon = panel.icon
            return (
              <motion.div
                key={panel.title}
                initial={{ opacity: 0, y: 100, rotateX: -30 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={{ delay: index * 0.2, duration: 0.8 }}
                whileHover={{
                  scale: 1.05,
                  rotateY: 10,
                  z: 50,
                }}
                className="group perspective-1000"
              >
                <div
                  className={`relative backdrop-blur-xl bg-gradient-to-br ${panel.color}/20 border border-white/20 rounded-2xl p-6 shadow-2xl transform-gpu`}
                >
                  {/* Glow Effect */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${panel.color} opacity-0 group-hover:opacity-20 rounded-2xl transition-opacity duration-300`}
                  />

                  {/* Header */}
                  <div className="flex items-center gap-4 mb-6">
                    <div className={`p-3 rounded-xl bg-gradient-to-r ${panel.color} shadow-lg`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-white">{panel.title}</h3>
                  </div>

                  {/* Content */}
                  <div className="space-y-4">
                    {panel.content.map((item: string, itemIndex: number) => (
                      <motion.div
                        key={itemIndex}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.2 + itemIndex * 0.1 }}
                        className="p-4 rounded-lg bg-black/20 backdrop-blur-sm border border-white/10 hover:border-white/30 transition-all duration-300"
                      >
                        <p className="text-white/90 text-sm leading-relaxed">{item}</p>
                      </motion.div>
                    ))}
                  </div>

                  {/* Floating Particles */}
                  <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl">
                    {[...Array(5)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute w-1 h-1 bg-white rounded-full"
                        animate={{
                          x: [0, Math.random() * 100],
                          y: [0, Math.random() * 100],
                          opacity: [0, 1, 0],
                        }}
                        transition={{
                          duration: Math.random() * 3 + 2,
                          repeat: Number.POSITIVE_INFINITY,
                          delay: Math.random() * 2,
                        }}
                        style={{
                          left: `${Math.random() * 100}%`,
                          top: `${Math.random() * 100}%`,
                        }}
                      />
                    ))}
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>

      {/* Era-specific Ambient Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {safeData.ambientElements?.map((element: any, index: number) => (
          <motion.div
            key={index}
            className={element.className}
            animate={element.animation}
            transition={element.transition}
            style={element.style}
          />
        ))}
      </div>
    </div>
  )
}
