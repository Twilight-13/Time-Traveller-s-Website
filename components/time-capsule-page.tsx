"use client"

import { useRef, useEffect } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { ArrowLeft, Music, Palette, Zap, Globe, Scroll, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import FloatingScrolls from "@/components/floating-scrolls"
import RotatingVinyl from "@/components/rotating-vinyl"
import InteractiveMannequin from "@/components/interactive-mannequin"
import WorldGlobeWithPins from "@/components/world-globe-with-pins"
import InventionShowcase from "@/components/invention-showcase"

interface TimeCapsulePageProps {
  data: any
  date: string
  onBack: () => void
}

export default function TimeCapsulePage({ data, date, onBack }: TimeCapsulePageProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ container: containerRef })

  const year = new Date(date).getFullYear()

  useEffect(() => {
    console.log("TimeCapsulePage mounted with data:", data, "date:", date)
  }, [data, date])

  // Add safety checks
  if (!date) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="text-amber-200 text-2xl">Loading temporal data...</div>
      </div>
    )
  }

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="text-amber-200 text-2xl">Reconstructing historical timeline...</div>
      </div>
    )
  }

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"])
  const titleScale = useTransform(scrollYProgress, [0, 0.2], [1, 0.7])
  const titleOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0])

  const sections = [
    {
      id: "music",
      title: "Melodies of Time",
      subtitle: "In this year, the world danced to...",
      icon: Music,
      component: <RotatingVinyl data={data?.music} />,
      content: data?.music || [],
      color: "from-purple-500 to-pink-500",
      bgColor: "from-purple-900/20 to-pink-900/20",
    },
    {
      id: "fashion",
      title: "Threads of History",
      subtitle: "Fashion whispered tales of...",
      icon: Palette,
      component: <InteractiveMannequin data={data?.fashion} />,
      content: data?.fashion || [],
      color: "from-cyan-500 to-blue-500",
      bgColor: "from-cyan-900/20 to-blue-900/20",
    },
    {
      id: "events",
      title: "Chronicles of the World",
      subtitle: "Across the globe, history unfolded as...",
      icon: Globe,
      component: <WorldGlobeWithPins data={data?.events} />,
      content: data?.events || [],
      color: "from-green-500 to-emerald-500",
      bgColor: "from-green-900/20 to-emerald-900/20",
    },
    {
      id: "inventions",
      title: "Sparks of Innovation",
      subtitle: "The future was born through...",
      icon: Zap,
      component: <InventionShowcase data={data?.inventions} />,
      content: data?.inventions || [],
      color: "from-orange-500 to-red-500",
      bgColor: "from-orange-900/20 to-red-900/20",
    },
    {
      id: "headlines",
      title: "Echoes of the Era",
      subtitle: "The world spoke of...",
      icon: Scroll,
      component: <FloatingScrolls data={data?.headlines} />,
      content: data?.headlines || [],
      color: "from-indigo-500 to-purple-500",
      bgColor: "from-indigo-900/20 to-purple-900/20",
    },
  ]

  return (
    <div
      ref={containerRef}
      className="h-screen overflow-y-auto scroll-smooth"
      style={{ scrollSnapType: "y mandatory" }}
    >
      {/* Parallax Background */}
      <motion.div
        className="fixed inset-0 -z-10"
        style={{
          y: backgroundY,
          background: data?.bgGradient || "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)",
        }}
      >
        <div className="absolute inset-0 opacity-20">
          <div
            className="w-full h-full"
            style={{
              backgroundImage:
                data?.pattern ||
                "repeating-linear-gradient(45deg, rgba(255,215,0,0.1) 0px, transparent 2px, transparent 10px, rgba(255,215,0,0.1) 12px)",
            }}
          />
        </div>

        {/* Floating Ambient Elements */}
        <div className="absolute inset-0">
          {[...Array(30)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-amber-400/30 rounded-full"
              animate={{
                x: [0, Math.random() * 200 - 100],
                y: [0, Math.random() * 200 - 100],
                opacity: [0, 1, 0],
                scale: [0, 1, 0],
              }}
              transition={{
                duration: Math.random() * 8 + 5,
                repeat: Number.POSITIVE_INFINITY,
                delay: Math.random() * 5,
              }}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
            />
          ))}
        </div>
      </motion.div>

      {/* Header Section */}
      <section
        className="min-h-screen flex flex-col justify-center items-center relative"
        style={{ scrollSnapAlign: "start" }}
      >
        <motion.div style={{ scale: titleScale, opacity: titleOpacity }} className="text-center z-10">
          <motion.div
            initial={{ opacity: 0, y: -100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 2 }}
            className="mb-8"
          >
            <Button
              onClick={onBack}
              variant="ghost"
              className="absolute top-8 left-8 text-amber-200 hover:text-amber-100 hover:bg-amber-400/20 backdrop-blur-sm border-2 border-amber-400/40 z-20 px-6 py-3 rounded-xl"
            >
              <ArrowLeft className="w-6 h-6 mr-3" />
              Return to Portal
            </Button>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, scale: 0.3 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 2.5, delay: 0.5 }}
            className={`text-9xl md:text-[12rem] lg:text-[15rem] font-bold mb-8 bg-gradient-to-r ${data?.titleGradient || "from-amber-400 to-orange-500"} bg-clip-text text-transparent tracking-wider`}
            style={{
              textShadow: "0 0 50px rgba(245, 158, 11, 0.3)",
            }}
          >
            {year}
          </motion.h1>

          <motion.h2
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 2, delay: 1 }}
            className="text-5xl md:text-6xl lg:text-7xl font-light text-amber-200/90 mb-12 tracking-wide"
          >
            {data?.eraName || "The Unknown Era"}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2, delay: 1.5 }}
            className="text-2xl md:text-3xl text-amber-200/70 max-w-4xl mx-auto leading-relaxed italic"
          >
            "Welcome to the floating museum of time, where memories crystallize into living experiences"
          </motion.p>

          {/* Floating Time Capsule Preview */}
          <motion.div
            initial={{ opacity: 0, y: 150 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 2, delay: 2 }}
            className="mt-16"
          >
            <div className="relative">
              <motion.div
                animate={{
                  y: [0, -30, 0],
                  rotateY: [0, 360],
                }}
                transition={{
                  y: { duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" },
                  rotateY: { duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" },
                }}
                className="w-32 h-32 md:w-40 md:h-40 backdrop-blur-xl bg-gradient-to-br from-amber-400/30 to-orange-400/30 border-2 border-amber-400/50 rounded-full shadow-2xl flex items-center justify-center"
              >
                <Calendar className="w-16 h-16 md:w-20 md:h-20 text-amber-300" />
              </motion.div>
              <div className="absolute inset-0 bg-gradient-to-r from-amber-600/20 to-orange-600/20 rounded-full blur-2xl -z-10" />
            </div>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3, duration: 1 }}
          className="absolute bottom-12 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            className="text-amber-300/60 text-center"
          >
            <p className="text-lg mb-2">Scroll to explore</p>
            <div className="w-6 h-10 border-2 border-amber-400/40 rounded-full mx-auto">
              <motion.div
                animate={{ y: [0, 16, 0] }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                className="w-1 h-3 bg-amber-400/60 rounded-full mx-auto mt-2"
              />
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Museum Sections */}
      {sections.map((section, index) => (
        <section
          key={section.id}
          className="min-h-screen flex items-center justify-center relative p-8"
          style={{ scrollSnapAlign: "start" }}
        >
          {/* Section Background */}
          <div className={`absolute inset-0 bg-gradient-to-br ${section.bgColor} opacity-30`} />

          <motion.div
            initial={{ opacity: 0, y: 200 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, delay: index * 0.1 }}
            viewport={{ once: true, margin: "-100px" }}
            className="w-full max-w-7xl mx-auto relative z-10"
          >
            {/* Section Header */}
            <motion.div
              initial={{ opacity: 0, x: -100 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <div className="flex items-center justify-center gap-6 mb-8">
                <div className={`p-4 rounded-2xl bg-gradient-to-r ${section.color} shadow-2xl`}>
                  <section.icon className="w-12 h-12 text-white" />
                </div>
                <h3 className="text-5xl md:text-6xl font-bold text-amber-200">{section.title}</h3>
              </div>
              <p className="text-2xl md:text-3xl text-amber-300/80 italic font-light">{section.subtitle}</p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              {/* 3D Interactive Component */}
              <motion.div
                whileHover={{ scale: 1.05, rotateY: 5, z: 50 }}
                transition={{ duration: 0.5 }}
                className="relative perspective-1000"
              >
                {section.component}
              </motion.div>

              {/* Content Panel */}
              <motion.div
                initial={{ opacity: 0, x: 200 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, delay: 0.5 }}
                viewport={{ once: true }}
                className={`backdrop-blur-2xl bg-gradient-to-br ${section.color}/20 border-2 border-white/20 rounded-3xl p-10 shadow-2xl relative overflow-hidden`}
              >
                {/* Floating Particles in Panel */}
                <div className="absolute inset-0 pointer-events-none">
                  {[...Array(8)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-2 h-2 bg-white/30 rounded-full"
                      animate={{
                        x: [0, Math.random() * 100],
                        y: [0, Math.random() * 100],
                        opacity: [0, 1, 0],
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

                <div className="space-y-8 relative z-10">
                  {section.content.map((item: string, itemIndex: number) => (
                    <motion.div
                      key={itemIndex}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: itemIndex * 0.15 }}
                      viewport={{ once: true }}
                      className="p-8 rounded-2xl bg-black/30 backdrop-blur-sm border border-white/20 hover:border-white/40 transition-all duration-500 group hover:bg-black/40"
                    >
                      <p className="text-amber-100/90 text-lg leading-relaxed group-hover:text-white transition-colors">
                        {item}
                      </p>
                    </motion.div>
                  ))}
                </div>

                {/* Panel Glow Effect */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${section.color}/10 opacity-0 group-hover:opacity-100 rounded-3xl transition-opacity duration-500`}
                />
              </motion.div>
            </div>
          </motion.div>
        </section>
      ))}

      {/* Epilogue Section */}
      <section className="min-h-screen flex items-center justify-center relative" style={{ scrollSnapAlign: "start" }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 2.5 }}
          viewport={{ once: true }}
          className="text-center max-w-4xl mx-auto"
        >
          <motion.h2
            animate={{
              textShadow: [
                "0 0 20px rgba(245, 158, 11, 0.5)",
                "0 0 40px rgba(245, 158, 11, 0.8)",
                "0 0 20px rgba(245, 158, 11, 0.5)",
              ],
            }}
            transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
            className="text-7xl md:text-8xl font-bold text-amber-200 mb-12"
          >
            Journey Complete
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 2, delay: 0.5 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl text-amber-200/70 mb-16 italic font-light leading-relaxed"
          >
            "Time is but a river, and we are all travelers upon its eternal current. Each moment a droplet, each memory
            a wave, each era a bend in the stream of existence."
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 2, delay: 1 }}
            viewport={{ once: true }}
          >
            <Button
              onClick={onBack}
              className="px-16 py-8 text-2xl bg-gradient-to-r from-amber-600 via-orange-600 to-red-600 hover:from-amber-500 hover:via-orange-500 hover:to-red-500 border-0 rounded-2xl shadow-2xl transform hover:scale-105 transition-all duration-500"
              style={{
                boxShadow: "0 0 50px rgba(245, 158, 11, 0.4), inset 0 0 50px rgba(255, 255, 255, 0.1)",
              }}
            >
              Return to the Portal of Time
            </Button>
          </motion.div>
        </motion.div>
      </section>
    </div>
  )
}
