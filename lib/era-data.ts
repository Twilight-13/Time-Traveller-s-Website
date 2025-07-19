interface EraData {
  eraName: string
  music: string[]
  fashion: string[]
  tech: string[]
  headlines: string[]
  art: string[]
  events: string[]
  bgGradient: string
  titleGradient: string
  accentColor: string
  pattern: string
  ambientElements?: any[]
}

const eraDatabase: Record<string, EraData> = {
  "1920s": {
    eraName: "The Jazz Age",
    music: [
      "Jazz explodes with Louis Armstrong's revolutionary trumpet",
      "The Charleston dance craze sweeps speakeasies nationwide",
      "Duke Ellington's Cotton Club performances define sophistication",
      "Blues legends like Bessie Smith captivate audiences",
    ],
    fashion: [
      "Flapper dresses with dropped waistlines liberate women",
      "Bobbed hair becomes a symbol of female independence",
      "Men sport suspenders, bow ties, and Oxford spectators",
      "Art Deco jewelry features geometric patterns and pearls",
    ],
    tech: [
      "Radio broadcasts bring entertainment into every home",
      "Assembly line production revolutionizes manufacturing",
      "Early television experiments hint at future possibilities",
      "Aviation advances with transatlantic flight achievements",
    ],
    headlines: [
      "PROHIBITION SPARKS UNDERGROUND SPEAKEASY CULTURE",
      "WOMEN WIN RIGHT TO VOTE IN HISTORIC VICTORY",
      "STOCK MARKET SOARS TO UNPRECEDENTED HEIGHTS",
      "LINDBERGH COMPLETES SOLO ATLANTIC CROSSING",
    ],
    art: [
      "Art Deco movement defines architectural elegance",
      "Surrealism emerges with dreamlike visual narratives",
      "Photography becomes recognized as fine art medium",
      "Bauhaus school revolutionizes design principles",
    ],
    events: [
      "The Harlem Renaissance celebrates African American culture",
      "Prohibition era creates organized crime syndicates",
      "Economic prosperity fuels consumer culture boom",
      "Radio entertainment unites the nation's consciousness",
    ],
    bgGradient: "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)",
    titleGradient: "from-amber-400 to-orange-500",
    accentColor: "bg-amber-400",
    pattern:
      "repeating-linear-gradient(45deg, rgba(255,215,0,0.1) 0px, transparent 2px, transparent 10px, rgba(255,215,0,0.1) 12px)",
  },

  "1960s": {
    eraName: "The Psychedelic Revolution",
    music: [
      "The Beatles revolutionize popular music worldwide",
      "Bob Dylan's folk protest songs inspire social change",
      "Motown sound emerges from Detroit's musical renaissance",
      "Psychedelic rock reflects counterculture consciousness expansion",
    ],
    fashion: [
      "Mini skirts and go-go boots define mod fashion",
      "Hippie style embraces natural fabrics and peace symbols",
      "Men grow hair long and wear colorful paisley shirts",
      "Op Art patterns create optical illusion clothing designs",
    ],
    tech: [
      "Computer mouse invented by Douglas Engelbart",
      "Integrated circuits miniaturize electronic components",
      "Laser technology perfected for industrial applications",
      "Communication satellites enable global broadcasting",
    ],
    headlines: [
      "APOLLO 11 LANDS FIRST HUMANS ON LUNAR SURFACE",
      "CIVIL RIGHTS ACT PASSES HISTORIC LEGISLATION",
      "WOODSTOCK FESTIVAL DEFINES GENERATION'S VALUES",
      "VIETNAM WAR PROTESTS SWEEP COLLEGE CAMPUSES",
    ],
    art: [
      "Pop Art movement with Warhol and Lichtenstein",
      "Psychedelic posters feature swirling kaleidoscope designs",
      "Conceptual art challenges traditional artistic boundaries",
      "Performance art emerges as new expressive medium",
    ],
    events: [
      "Civil Rights Movement achieves landmark victories",
      "Space Race culminates in moon landing triumph",
      "Counterculture movement challenges social conventions",
      "Environmental awareness begins with Earth Day",
    ],
    bgGradient: "linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)",
    titleGradient: "from-purple-400 to-pink-500",
    accentColor: "bg-purple-400",
    pattern: "radial-gradient(circle at 50% 50%, rgba(255,0,255,0.1) 0%, transparent 50%)",
  },

  "1980s": {
    eraName: "The Neon Decade",
    music: [
      "MTV launches and transforms music into visual art",
      "Synthesizers create new electronic soundscapes",
      "Hip-hop culture emerges from urban communities",
      "New Wave bands dominate radio with catchy hooks",
    ],
    fashion: [
      "Power suits with shoulder pads define corporate style",
      "Neon colors and athletic wear become street fashion",
      "Big hair and bold makeup create dramatic looks",
      "Punk aesthetics influence mainstream fashion trends",
    ],
    tech: [
      "Personal computers enter homes and offices",
      "Compact discs replace vinyl records completely",
      "Video game consoles revolutionize home entertainment",
      "Cell phones debut for wealthy early adopters",
    ],
    headlines: [
      "PERSONAL COMPUTER REVOLUTION TRANSFORMS SOCIETY",
      "BERLIN WALL BEGINS TO CRUMBLE UNDER PRESSURE",
      "MTV GENERATION REDEFINES YOUTH CULTURE",
      "VIDEO GAMES BECOME BILLION DOLLAR INDUSTRY",
    ],
    art: [
      "Graffiti art transitions from streets to galleries",
      "Digital art emerges with computer graphics",
      "Neo-expressionism revives figurative painting",
      "Installation art creates immersive experiences",
    ],
    events: [
      "Personal computing democratizes information access",
      "Cold War tensions begin to ease globally",
      "Consumer culture reaches unprecedented heights",
      "Environmental disasters raise ecological awareness",
    ],
    bgGradient: "linear-gradient(135deg, #ff0080 0%, #ff8c00 50%, #40e0d0 100%)",
    titleGradient: "from-cyan-400 to-pink-500",
    accentColor: "bg-cyan-400",
    pattern:
      "repeating-linear-gradient(90deg, rgba(255,0,128,0.1) 0px, transparent 4px, transparent 8px, rgba(64,224,208,0.1) 12px)",
  },

  "2000s": {
    eraName: "The Digital Dawn",
    music: [
      "Digital music platforms revolutionize distribution",
      "Auto-Tune creates new vocal possibilities",
      "Indie rock gains mainstream recognition",
      "Electronic dance music explodes globally",
    ],
    fashion: [
      "Low-rise jeans and crop tops dominate youth fashion",
      "Emo and scene styles influence alternative fashion",
      "Designer collaborations with mass retailers emerge",
      "Athleisure begins blending comfort with style",
    ],
    tech: [
      "Social media platforms connect global communities",
      "Smartphones begin replacing traditional phones",
      "High-speed internet enables streaming media",
      "Digital cameras make photography accessible",
    ],
    headlines: [
      "SOCIAL MEDIA PLATFORMS CONNECT BILLIONS WORLDWIDE",
      "SMARTPHONE REVOLUTION BEGINS WITH EARLY DEVICES",
      "DOT-COM BUBBLE BURSTS AFFECTING GLOBAL MARKETS",
      "DIGITAL PIRACY CHALLENGES ENTERTAINMENT INDUSTRY",
    ],
    art: [
      "Digital art gains recognition in traditional galleries",
      "Street art becomes globally celebrated movement",
      "Interactive installations use new technologies",
      "Photography transitions from film to digital",
    ],
    events: [
      "Internet becomes essential for daily communication",
      "Global connectivity reshapes social interactions",
      "Digital divide creates new social inequalities",
      "Environmental concerns drive green technology",
    ],
    bgGradient: "linear-gradient(135deg, #0f0f23 0%, #1a1a2e 50%, #16213e 100%)",
    titleGradient: "from-blue-400 to-purple-500",
    accentColor: "bg-blue-400",
    pattern:
      "repeating-conic-gradient(from 0deg at 50% 50%, rgba(0,100,255,0.1) 0deg, transparent 60deg, transparent 120deg, rgba(100,0,255,0.1) 180deg)",
  },

  default: {
    eraName: "The Unknown Era",
    music: [
      "Mysterious melodies echo through time",
      "Ancient rhythms resonate across dimensions",
      "Temporal harmonies create otherworldly sounds",
      "Quantum frequencies vibrate through reality",
    ],
    fashion: [
      "Timeless garments that transcend eras",
      "Ethereal fabrics that shimmer with possibility",
      "Accessories that bend light and shadow",
      "Styles that exist outside conventional time",
    ],
    tech: [
      "Technologies beyond current understanding",
      "Devices that manipulate spacetime itself",
      "Quantum computers process infinite possibilities",
      "Neural interfaces connect minds across time",
    ],
    headlines: [
      "TEMPORAL ANOMALY DETECTED IN TIMELINE",
      "REALITY FLUCTUATIONS CAUSE DIMENSIONAL SHIFTS",
      "TIME TRAVELERS REPORT STRANGE PHENOMENA",
      "QUANTUM MECHANICS REVEAL HIDDEN TRUTHS",
    ],
    art: [
      "Multidimensional sculptures that exist in multiple realities",
      "Paintings that change based on the observer's timeline",
      "Performance art that spans across centuries",
      "Digital installations that respond to temporal energy",
    ],
    events: [
      "Mysterious events that defy historical records",
      "Temporal paradoxes create alternate timelines",
      "Reality shifts cause widespread confusion",
      "Time itself becomes malleable and uncertain",
    ],
    bgGradient: "linear-gradient(135deg, #2d1b69 0%, #11998e 50%, #38ef7d 100%)",
    titleGradient: "from-emerald-400 to-cyan-500",
    accentColor: "bg-emerald-400",
    pattern:
      "repeating-radial-gradient(circle at 50% 50%, rgba(56,239,125,0.1) 0px, transparent 20px, transparent 40px, rgba(17,153,142,0.1) 60px)",
  },
}

export function getEraData(dateString: string): EraData {
  const date = new Date(dateString)
  const year = date.getFullYear()

  // Determine which era the date falls into
  let era: string

  if (year >= 1920 && year < 1930) {
    era = "1920s"
  } else if (year >= 1960 && year < 1970) {
    era = "1960s"
  } else if (year >= 1980 && year < 1990) {
    era = "1980s"
  } else if (year >= 2000 && year < 2010) {
    era = "2000s"
  } else {
    // Default fallback for other years
    era = "default"
  }

  return eraDatabase[era] || eraDatabase["default"]
}
