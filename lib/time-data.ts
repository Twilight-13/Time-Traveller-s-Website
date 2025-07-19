interface TimeData {
  eraName: string
  music: string[]
  fashion: string[]
  events: string[]
  inventions: string[]
  headlines: string[]
  art: string[]
  bgGradient: string
  titleGradient: string
  pattern: string
}

const timeDatabase: Record<string, TimeData> = {
  "1920s": {
    eraName: "The Golden Twenties",
    music: [
      "Jazz orchestras filled smoky speakeasies with syncopated rhythms that made hearts race and feet move to forbidden beats",
      "The Charleston became more than a dance—it was rebellion in motion, a declaration of freedom from Victorian constraints",
      "Louis Armstrong's trumpet sang stories of hope and heartbreak, revolutionizing music with every golden note",
      "Radio waves carried melodies across the nation, uniting souls in shared musical experiences for the first time",
    ],
    fashion: [
      "Flapper dresses with dropped waistlines liberated women from corsets, symbolizing a new era of feminine independence",
      "Bobbed hair became a crown of courage, each snip of the scissors cutting away centuries of tradition",
      "Men embraced Oxford bags and suspenders, creating a dapper silhouette that spoke of prosperity and confidence",
      "Art Deco jewelry sparkled with geometric precision, each piece a miniature architectural marvel",
    ],
    events: [
      "The 19th Amendment granted women the vote, forever changing the political landscape of democracy",
      "Prohibition created an underground world of speakeasies where society's rules bent like jazz melodies",
      "The Harlem Renaissance bloomed like a cultural flower, celebrating African American arts and intellect",
      "Charles Lindbergh soared across the Atlantic, proving that the sky was no longer the limit",
    ],
    inventions: [
      "Television flickered to life in laboratories, promising to bring the world into every living room",
      "Penicillin was discovered in a moment of serendipity, destined to save millions of lives",
      "Assembly lines revolutionized manufacturing, making luxury accessible to the common person",
      "Radio broadcasting created the first global village, connecting distant hearts with invisible threads",
    ],
    headlines: [
      "STOCK MARKET SOARS TO UNPRECEDENTED HEIGHTS AS PROSPERITY PAINTS THE NATION GOLD",
      "PROHIBITION SPARKS UNDERGROUND RENAISSANCE OF MUSIC, DANCE, AND REBELLION",
      "WOMEN'S SUFFRAGE VICTORY RESHAPES THE VERY FOUNDATION OF DEMOCRATIC PARTICIPATION",
      "LINDBERGH'S SOLO FLIGHT PROVES HUMANITY CAN CONQUER THE IMPOSSIBLE",
    ],
    art: [
      "Art Deco emerged like a geometric symphony, transforming buildings into crystalline dreams reaching toward the sky",
      "Surrealist painters dove deep into the unconscious mind, bringing dreams to canvas with vivid imagination",
      "Photography stepped into the spotlight as fine art, capturing moments with the precision of poetry",
      "The Bauhaus movement married form and function, creating beauty through purposeful design",
    ],
    bgGradient: "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)",
    titleGradient: "from-amber-400 to-orange-500",
    pattern:
      "repeating-linear-gradient(45deg, rgba(255,215,0,0.1) 0px, transparent 2px, transparent 10px, rgba(255,215,0,0.1) 12px)",
  },

  "1960s": {
    eraName: "The Age of Aquarius",
    music: [
      "The Beatles didn't just make music—they rewrote the language of love, hope, and human connection",
      "Bob Dylan's voice carried the weight of a generation's dreams, each lyric a protest song for the soul",
      "Motown's rhythm became the heartbeat of integration, proving that music could break down any barrier",
      "Psychedelic rock painted soundscapes in colors that had never existed, expanding consciousness through melody",
    ],
    fashion: [
      "Mini skirts and go-go boots declared that youth would no longer be bound by their elders' expectations",
      "Hippie fashion embraced the earth itself—natural fabrics, flowing forms, and symbols of peace",
      "Men grew their hair long like lions' manes, each strand a statement of artistic rebellion",
      "Op Art patterns created clothing that seemed to move and breathe, turning fashion into optical illusion",
    ],
    events: [
      "Apollo 11 carried humanity's dreams to the moon, proving that even the stars were within reach",
      "The Civil Rights Act became law, transforming the promise of equality from dream to legal reality",
      "Woodstock gathered half a million souls in muddy fields, creating a temporary nation built on music and love",
      "Vietnam War protests filled streets with voices demanding peace, showing that the young would not be silent",
    ],
    inventions: [
      "The computer mouse was born, destined to put the power of digital worlds into every human hand",
      "Integrated circuits shrank the future into silicon chips smaller than fingernails",
      "Laser technology focused light into beams of pure possibility, opening doors to medical and industrial miracles",
      "Communication satellites became humanity's nervous system, connecting every corner of the globe",
    ],
    headlines: [
      "MANKIND TAKES FIRST STEPS ON LUNAR SURFACE AS WORLD WATCHES IN WONDER",
      "CIVIL RIGHTS MOVEMENT ACHIEVES HISTORIC VICTORY WITH LANDMARK LEGISLATION",
      "WOODSTOCK FESTIVAL CREATES TEMPORARY UTOPIA OF PEACE, LOVE, AND MUSIC",
      "YOUTH MOVEMENTS CHALLENGE ESTABLISHMENT VALUES ACROSS THE GLOBE",
    ],
    art: [
      "Pop Art transformed soup cans into icons, proving that beauty existed in the most ordinary moments",
      "Psychedelic posters swirled with colors that seemed to pulse with the rhythm of the counterculture",
      "Conceptual art asked not 'what is art?' but 'why is art?', challenging every assumption",
      "Performance art turned the human body into canvas, brush, and masterpiece all at once",
    ],
    bgGradient: "linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)",
    titleGradient: "from-purple-400 to-pink-500",
    pattern: "radial-gradient(circle at 50% 50%, rgba(255,0,255,0.1) 0%, transparent 50%)",
  },

  "1980s": {
    eraName: "The Electric Decade",
    music: [
      "MTV transformed music into a visual feast, where songs became stories told through moving pictures",
      "Synthesizers created sounds that had never existed in nature, building electronic cathedrals of pure emotion",
      "Hip-hop emerged from urban streets like a phoenix, giving voice to communities that had been silenced",
      "New Wave bands painted the airwaves with neon colors, creating anthems for a generation drunk on possibility",
    ],
    fashion: [
      "Power suits with shoulder pads became armor for women conquering corporate boardrooms",
      "Neon colors blazed like electric fire, turning everyday clothing into statements of bold individuality",
      "Big hair defied gravity and convention, each strand reaching toward a sky full of dreams",
      "Punk aesthetics crashed into mainstream fashion like a beautiful collision of chaos and creativity",
    ],
    events: [
      "Personal computers invaded homes like friendly aliens, promising to make every person a digital pioneer",
      "The Berlin Wall began to crumble, not from hammers but from the unstoppable force of human yearning for freedom",
      "MTV created a generation that thought in music videos, where every moment had a soundtrack",
      "Video games transformed living rooms into portals to infinite digital worlds",
    ],
    inventions: [
      "Personal computers became affordable enough for families, democratizing the power of digital creation",
      "Compact discs promised perfect sound forever, crystallizing music into rainbow-surfaced perfection",
      "Cell phones took their first steps toward connecting every human voice on the planet",
      "Video game consoles brought arcade magic home, turning every child into a digital adventurer",
    ],
    headlines: [
      "PERSONAL COMPUTER REVOLUTION TRANSFORMS HOMES INTO DIGITAL FRONTIERS",
      "BERLIN WALL FALLS AS FREEDOM PROVES STRONGER THAN CONCRETE AND IDEOLOGY",
      "MTV GENERATION REDEFINES CULTURE THROUGH MUSIC VIDEOS AND VISUAL STORYTELLING",
      "VIDEO GAME INDUSTRY CREATES NEW FORM OF INTERACTIVE ENTERTAINMENT",
    ],
    art: [
      "Graffiti art leaped from subway walls to gallery spaces, proving that art belonged to everyone",
      "Digital art was born in pixels and code, creating beauty through mathematics and imagination",
      "Neo-expressionism brought raw emotion back to canvas, painting feelings in bold, uncompromising strokes",
      "Installation art created environments where viewers became part of the artistic experience",
    ],
    bgGradient: "linear-gradient(135deg, #ff0080 0%, #ff8c00 50%, #40e0d0 100%)",
    titleGradient: "from-cyan-400 to-pink-500",
    pattern:
      "repeating-linear-gradient(90deg, rgba(255,0,128,0.1) 0px, transparent 4px, transparent 8px, rgba(64,224,208,0.1) 12px)",
  },

  default: {
    eraName: "The Mysterious Era",
    music: [
      "Ethereal melodies drift through the temporal void like whispers from forgotten civilizations",
      "Ancient instruments resonate with frequencies that existed before time itself was born",
      "Quantum harmonies create symphonies that exist in multiple dimensions simultaneously",
      "The music of the spheres plays eternal songs that only time travelers can truly hear",
    ],
    fashion: [
      "Garments woven from starlight and temporal energy shift with the observer's timeline",
      "Accessories exist in quantum superposition, appearing different to each viewer",
      "Clothing that adapts to the wearer's temporal displacement, changing with each era visited",
      "Fabrics that shimmer with the colors of distant galaxies and unborn stars",
    ],
    events: [
      "Reality fluctuations cause historical events to merge and separate like cosmic tides",
      "Temporal paradoxes create alternate timeline branches that exist in parallel dimensions",
      "Time travelers from various eras converge in moments of temporal significance",
      "The fabric of spacetime reveals hidden patterns that connect all moments across eternity",
    ],
    inventions: [
      "Devices that manipulate the flow of time itself, bending causality to human will",
      "Quantum computers that process infinite possibilities across multiple timelines",
      "Neural interfaces that connect minds across centuries, sharing memories through time",
      "Technologies that exist beyond current understanding, waiting to be discovered",
    ],
    headlines: [
      "TEMPORAL ANOMALY DETECTED IN SPACETIME CONTINUUM CAUSES REALITY FLUCTUATIONS",
      "TIME TRAVELERS REPORT STRANGE PHENOMENA ACROSS MULTIPLE HISTORICAL PERIODS",
      "QUANTUM MECHANICS REVEAL HIDDEN TRUTHS ABOUT THE NATURE OF EXISTENCE",
      "DIMENSIONAL BARRIERS WEAKEN AS PARALLEL TIMELINES BEGIN TO CONVERGE",
    ],
    art: [
      "Sculptures that exist in multiple temporal dimensions, changing based on when they're observed",
      "Paintings that evolve with the viewer's timeline, showing different scenes to different observers",
      "Performance art that spans across multiple centuries, connecting artists through time",
      "Digital installations that respond to temporal energy fields and quantum fluctuations",
    ],
    bgGradient: "linear-gradient(135deg, #2d1b69 0%, #11998e 50%, #38ef7d 100%)",
    titleGradient: "from-emerald-400 to-cyan-500",
    pattern:
      "repeating-radial-gradient(circle at 50% 50%, rgba(56,239,125,0.1) 0px, transparent 20px, transparent 40px, rgba(17,153,142,0.1) 60px)",
  },
}

export function getTimeData(dateString: string): TimeData {
  console.log("Getting time data for:", dateString) // Debug log

  if (!dateString) {
    console.warn("No date string provided, using default")
    return timeDatabase["default"]
  }

  const date = new Date(dateString)
  const year = date.getFullYear()

  let era: string

  if (year >= 1920 && year < 1930) {
    era = "1920s"
  } else if (year >= 1960 && year < 1970) {
    era = "1960s"
  } else if (year >= 1980 && year < 1990) {
    era = "1980s"
  } else {
    era = "default"
  }

  const result = timeDatabase[era] || timeDatabase["default"]
  console.log("Returning data for era:", era, result) // Debug log
  return result
}
