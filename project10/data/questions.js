// Four types
// ARC = The Archive (emptiness & absorption)
// LOG = The Logic Gate (analysis & structure)
// CAT = The Catalyst (emotion & release)
// RUN = The Runtime (execution & building)

const QUESTIONS = [
  {
    q: "Which kind of 'world' do you prefer?",
    options: [
      { text: "A world governed by meticulously designed logic and rules.", type: "LOG" },
      { text: "A dreamlike world where feeling and atmosphere outweigh narrative.", type: "CAT" },
      { text: "A mutable world that shifts with every user interaction.", type: "RUN" },
      { text: "A minimal world stripped down to its essence.", type: "ARC" }
    ]
  },
  {
    q: "What do you mostly feel when you see someone else's work?",
    options: [
      { text: "\"How did they pull off that technique?\" — analytical curiosity.", type: "LOG" },
      { text: "\"I want to go make something right now.\" — creative ignition.", type: "RUN" },
      { text: "\"There's just so much greatness out there.\" — awe and helplessness.", type: "ARC" },
      { text: "\"If it were me, I'd twist this world like so…\" — a private remix impulse.", type: "CAT" }
    ]
  },
  {
    q: "When a new idea hits you, what's the very first thought?",
    options: [
      { text: "\"Has something like this been made before? Let me dig.\"", type: "ARC" },
      { text: "\"I want to boot up Unity (or my tool) and prototype it NOW.\"", type: "RUN" },
      { text: "\"What real meaning or point does this idea actually carry?\"", type: "LOG" },
      { text: "\"Let me jot it down and come back to it later.\"", type: "CAT" }
    ]
  },
  {
    q: "Which kind of 'lack' is driving you the hardest right now?",
    options: [
      { text: "Lack of information — a sense that there's too much of the world I still don't know.", type: "ARC" },
      { text: "Lack of logic — frustration at not grasping why a system works the way it does.", type: "LOG" },
      { text: "Lack of experience — boredom with days that don't break the routine.", type: "CAT" },
      { text: "Lack of presence — thirst to pull something inside me out into the world.", type: "RUN" }
    ]
  },
  {
    q: "Assume infinite time. When you hit an unsolvable wall, what's your way through?",
    options: [
      { text: "Go back to the source material — books, references — and rebuild my foundation.", type: "ARC" },
      { text: "Break the problem down logically and analyze the cause all the way down.", type: "LOG" },
      { text: "Step away, play a game, do anything else — let the brain cool.", type: "CAT" },
      { text: "Just keep editing code or redrawing until something finally clicks.", type: "RUN" }
    ]
  },
  {
    q: "Someone says: \"Today is yours. Spend it however you want.\"",
    options: [
      { text: "Binge an entire series I've been meaning to watch.", type: "ARC" },
      { text: "Finally start studying a topic I've been curious about.", type: "LOG" },
      { text: "Go out with friends, play games, visit somewhere new.", type: "CAT" },
      { text: "Find a quiet corner and grind on my personal project all night.", type: "RUN" }
    ]
  },
  {
    q: "If your 'brain capacity' right now were a metaphor, it'd be closest to:",
    options: [
      { text: "An empty hard drive. I need fresh data before I can run anything.", type: "ARC" },
      { text: "A messy archive. Too much information, all tangled — it needs sorting.", type: "LOG" },
      { text: "A pressure cooker. Too much heat inside; it has to vent somewhere.", type: "CAT" },
      { text: "An overworked CPU. The hard math is done — now just output the result.", type: "RUN" }
    ]
  },
  {
    q: "If someone forcibly steals your 'time,' what angers you most?",
    options: [
      { text: "Being interrupted during deep, quiet absorption of information.", type: "ARC" },
      { text: "Having a logical train of thought broken by context-less chatter.", type: "LOG" },
      { text: "Losing the exact moment when emotion peaks and ideas start to erupt.", type: "CAT" },
      { text: "Watching your planned work routine and deadlines get tangled by someone else.", type: "RUN" }
    ]
  },
  {
    q: "In a huge bookstore, which section pulls you in first?",
    options: [
      { text: "New fiction, humanities, or art books.", type: "CAT" },
      { text: "Social science, philosophy, or critical theory.", type: "ARC" },
      { text: "Photo books, comics, or stationery.", type: "LOG" },
      { text: "Programming manuals or game-design guides.", type: "RUN" }
    ]
  }
];

const TYPE_INFO = {
  ARC: {
    name: "The Archive",
    subtitle: "Emptiness & Absorption",
    short: "An energy-drained state; you need to refill with external data before you can output again.",
    tagline: "Empty. Time to fill.",
    activities: ["Reading", "Watching classic films", "Rest", "Reference hunting"]
  },
  LOG: {
    name: "The Logic Gate",
    subtitle: "Analysis & Structure",
    short: "Plenty of data in your head, but it needs sorting — a system-building state.",
    tagline: "Time to connect the scattered pieces.",
    activities: ["Game theory study", "Worldbuilding notes", "Criticism", "Mind-mapping"]
  },
  CAT: {
    name: "The Catalyst",
    subtitle: "Emotion & Release",
    short: "Internal pressure has spiked — you need an immediate outlet.",
    tagline: "Burn it now or lose the fuel.",
    activities: ["Drawing", "Essays", "Comic thumbnails", "Sketching", "Short videos"]
  },
  RUN: {
    name: "The Runtime",
    subtitle: "Execution & Building",
    short: "Everything is prepped. You're ready to ship the final output.",
    tagline: "Build time. Hands on keyboard.",
    activities: ["Unity / code builds", "Final passes", "Publishing", "Hitting deadlines"]
  }
};
