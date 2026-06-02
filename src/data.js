// Cinematic Developer Portfolio Data

export const PERSONAL_INFO = {
  name: "Manish Rao",
  title: "MERN Stack Engineer & Interactive UI Developer",
  shortDesc: "Building high-performance, cinematic web architectures that bridge structural logic and beautiful interactive graphics.",
  longDesc: "I am a full-stack engineer specializing in building smooth Node.js microservices and highly responsive web platforms. My work centers on creating rich, Apple-like interactive interfaces powered by rock-solid backend endpoints, with a heavy emphasis on design system precision and buttery fluid animations.",
  resumeUrl: "#", // Placeholders for recruiter convenience
  socials: {
    github: "https://github.com",
    linkedin: "https://linkedin.com",
    twitter: "https://twitter.com",
    email: "manish.rao@dev.io",
  },
  stats: [
    { value: "4+", label: "Years Experience" },
    { value: "18+", label: "Completed Projects" },
    { value: "99.9%", label: "System Uptime" },
    { value: "240k+", label: "Lines of JS Written" },
  ],
};

export const SKILL_CATEGORIES = [
  {
    category: "Frontend",
    glowColor: "rgba(6, 182, 212, 0.15)", // Cyan
    items: [
      { name: "ReactJS", level: 95 },
      { name: "Tailwind CSS", level: 98 },
      { name: "Framer Motion", level: 92 },
      { name: "GSAP", level: 85 },
      { name: "Redux / Zustand", level: 90 },
      { name: "NextJS", level: 88 },
    ],
  },
  {
    category: "Backend",
    glowColor: "rgba(168, 85, 247, 0.15)", // Purple
    items: [
      { name: "Node.js", level: 94 },
      { name: "Express.js", level: 96 },
      { name: "REST APIs", level: 98 },
      { name: "GraphQL", level: 87 },
      { name: "WebSockets", level: 91 },
      { name: "JWT Auth & OAuth", level: 95 },
    ],
  },
  {
    category: "Database",
    glowColor: "rgba(34, 197, 94, 0.15)", // Green
    items: [
      { name: "MongoDB", level: 92 },
      { name: "PostgreSQL", level: 89 },
      { name: "Redis Cache", level: 85 },
      { name: "Firebase Firestore", level: 90 },
    ],
  },
  {
    category: "Tools & DevOps",
    glowColor: "rgba(249, 115, 22, 0.15)", // Orange
    items: [
      { name: "Git / GitHub", level: 95 },
      { name: "Vite / Webpack", level: 92 },
      { name: "Docker", level: 84 },
      { name: "AWS (S3/EC2)", level: 80 },
      { name: "CI/CD Pipelines", level: 85 },
    ],
  },
];

export const TIMELINE = [
  {
    period: "2024 - Present",
    role: "Senior Full Stack Engineer",
    company: "Aether Labs",
    desc: "Architected high-throughput web portals and custom live-monitoring dashboards for Web3 and IoT networks. Guided team of 4 frontend engineers, established standard modern canvas animations, and shaved 34% off initial site bundle metrics.",
  },
  {
    period: "2022 - 2024",
    role: "MERN Stack Developer",
    company: "Quantum Ventures",
    desc: "Built scalable CRM widgets and responsive consumer checkouts using Node, Express, and MongoDB. Constructed real-time collaboration canvas integrations using WebSockets and localized indexing algorithms.",
  },
  {
    period: "2021 - 2022",
    role: "Frontend Engineer Intern",
    company: "PixelCraft Agency",
    desc: "Iterated interactive customer portfolios, implemented intricate CSS/SVG vector morphs, and configured dynamic headless Shopify themes.",
  },
  {
    period: "2018 - 2021",
    role: "B.S. Computer Science",
    company: "Syracuse University",
    desc: "Specialized in Human-Computer Interaction, distributed systems, and real-time network programming. Graduated with honors.",
  },
];

export const PROJECTS = [
  {
    id: "nebula-sync",
    title: "Nebula Workspace Sync",
    badge: "Featured Space",
    short: "Real-time collaborative workspace with visual whiteboard, multiplayer cursors, and local sync engines.",
    desc: "A stunning cinematic multi-user workspace featuring infinite nesting boards, vector editing canvases, conflict-free replicated data systems (LWW-Element-Register), and atomic server updates via Node/Redis channels.",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80",
    tech: ["React", "Express.js", "Redis", "MongoDB", "WebSockets", "Framer Motion"],
    github: "https://github.com",
    demo: "https://demo.io",
    highlights: [
      "Smooth collaborative canvas using optimized mouse state multiplexers",
      "Robust state sync recovery backing indexedDB offline-first stores",
      "Dynamic multi-user presence indicators with custom cursor trackers"
    ]
  },
  {
    id: "quant-iq",
    title: "QuantIQ High-Freq Terminal",
    badge: "Data Stream",
    short: "Cinematic real-time crypto asset tracker with immersive WebGL rendering and high-density financial analytics.",
    desc: "A futuristic data deck visualizing high-frequency trading indices. Powered by real-time WebSocket feeds, it converts raw tick data into rich charts with adaptive zoom, volumetric candle meters, and dynamic sound triggers.",
    image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&w=800&q=80",
    tech: ["Node.js", "Express.js", "D3.js", "Tailwind CSS", "Recharts"],
    github: "https://github.com",
    demo: "https://demo.io",
    highlights: [
      "Millisecond precision candle charting with hardware-accelerated vectors",
      "Live order-book cascade rendering 120 depth lists smoothly",
      "Intelligent indicator overlays including MACD, RSI, and custom RSI triggers"
    ]
  },
  {
    id: "aether-wave",
    title: "Aether Wavetable Synthesizer",
    badge: "Creative Space",
    short: "Immersive web synthesizer and audio sequencer with customized frequency sweep visuals.",
    desc: "A clean, beautiful 3-oscillator synth running direct on the Web Audio API. Provides custom ADSR envelopes, visual frequency sweep overlays, and a loop sequencer mimicking digital workstation workflows.",
    image: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=800&q=80",
    tech: ["React.js", "Framer Motion", "Web Audio API", "Tailwind CSS"],
    github: "https://github.com",
    demo: "https://demo.io",
    highlights: [
      "Zero-latency low-pass, high-pass filter controls mapped to mouse gestures",
      "Step-sequencer with micro-duration offsets for realistic rhythmic swing",
      "Dynamic Canvas-based Oscilloscope mapping realtime waveform bytes"
    ]
  },
  {
    id: "chronos-core",
    title: "Chronos Developer Engine",
    badge: "Workflow",
    short: "Terminal-inspired task planner with productivity charts, local sandboxes, and keyboard shortcuts.",
    desc: "An elite productivity interface crafted for engineers. Combines clean keyboard-first task tracking with comprehensive time-series analytics, auto-gifting streak achievements, and fully secure server backups.",
    image: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&w=800&q=80",
    tech: ["MongoDB", "Express.js", "React.js", "Node.js", "JWT Sessioning"],
    github: "https://github.com",
    demo: "https://demo.io",
    highlights: [
      "100% keyboard-navigable interface with Vim-like shortcuts",
      "Time-tracking ledger with customizable Pomodoro loop integrations",
      "Beautiful dark graphical projections graphing productivity parameters"
    ]
  }
];
