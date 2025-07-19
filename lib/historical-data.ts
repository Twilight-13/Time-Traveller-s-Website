interface HistoricalData {
  events: string[]
  music: string[]
  fashion: string[]
  inventions: string[]
  aesthetics: string[]
  headlines: string[]
}

const historicalDatabase: Record<string, HistoricalData> = {
  "1920s": {
    events: [
      "The Roaring Twenties economic boom transforms society",
      "Women gain the right to vote with the 19th Amendment",
      "Prohibition era begins, leading to speakeasies and bootlegging",
      "The Harlem Renaissance flourishes with African American culture",
    ],
    music: [
      "Jazz music explodes with Louis Armstrong and Duke Ellington",
      "The Charleston dance craze sweeps the nation",
      "Radio broadcasts bring music into every home",
      "Blues music gains mainstream popularity",
    ],
    fashion: [
      "Flapper dresses with dropped waistlines become iconic",
      "Women bob their hair in rebellious short styles",
      "Men wear suspenders, bow ties, and Oxford shoes",
      "Art Deco patterns influence clothing and accessories",
    ],
    inventions: [
      "Television technology is first demonstrated",
      "Penicillin is discovered by Alexander Fleming",
      "The first transatlantic flight is completed",
      "Mass production of automobiles revolutionizes transport",
    ],
    aesthetics: [
      "Art Deco design dominates architecture and decor",
      "Geometric patterns and metallic finishes are popular",
      "Streamlined forms reflect the machine age",
      "Bold colors and luxurious materials define the era",
    ],
    headlines: [
      "Stock Market Reaches Record Highs",
      "Lindbergh Completes Historic Solo Flight",
      "Jazz Age Transforms American Culture",
      "Prohibition Enforcement Proves Challenging",
    ],
  },
  "1960s": {
    events: [
      "The Civil Rights Movement achieves major victories",
      "Moon landing captures the world's imagination",
      "Woodstock festival defines a generation",
      "The Beatles revolutionize popular music",
    ],
    music: [
      "Rock and roll evolves with The Beatles and Rolling Stones",
      "Folk music protests social issues with Bob Dylan",
      "Motown sound emerges from Detroit",
      "Psychedelic rock reflects counterculture movement",
    ],
    fashion: [
      "Mini skirts and go-go boots become fashion statements",
      "Hippie style embraces natural fabrics and patterns",
      "Men grow their hair long and wear colorful shirts",
      "Mod fashion features bold geometric patterns",
    ],
    inventions: [
      "Computer mouse is invented by Douglas Engelbart",
      "First computer programming languages are developed",
      "Laser technology is perfected for various applications",
      "Birth control pill revolutionizes family planning",
    ],
    aesthetics: [
      "Pop Art movement with Andy Warhol and Roy Lichtenstein",
      "Bright, psychedelic colors dominate design",
      "Space Age aesthetics influence furniture and architecture",
      "Op Art creates optical illusions in visual design",
    ],
    headlines: [
      "Man Walks on Moon for First Time",
      "Civil Rights Act Passes Congress",
      "Beatles Phenomenon Sweeps Globe",
      "Counterculture Movement Grows",
    ],
  },
  "1980s": {
    events: [
      "Personal computers enter homes and offices",
      "MTV launches and transforms music industry",
      "Berlin Wall begins to crumble",
      "Video games become mainstream entertainment",
    ],
    music: [
      "New Wave and synth-pop dominate the airwaves",
      "Hip-hop culture emerges from urban communities",
      "MTV creates the first music video stars",
      "Electronic music and synthesizers reshape sound",
    ],
    fashion: [
      "Power suits with shoulder pads define professional wear",
      "Neon colors and athletic wear become street fashion",
      "Big hair and bold makeup create dramatic looks",
      "Punk and new wave styles influence mainstream fashion",
    ],
    inventions: [
      "Personal computers become affordable for consumers",
      "Compact discs replace vinyl records",
      "Cell phones are introduced for public use",
      "Video game consoles enter the home market",
    ],
    aesthetics: [
      "Neon colors and geometric shapes define the decade",
      "Memphis design movement influences furniture",
      "Digital art and computer graphics emerge",
      "Postmodern architecture challenges traditional forms",
    ],
    headlines: [
      "Personal Computer Revolution Begins",
      "MTV Changes Music Industry Forever",
      "Video Games Become Cultural Phenomenon",
      "Technology Transforms Daily Life",
    ],
  },
}

export function getHistoricalData(dateString: string): HistoricalData {
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
  } else {
    // Default fallback for other years
    era = "1960s"
  }

  return historicalDatabase[era] || historicalDatabase["1960s"]
}
