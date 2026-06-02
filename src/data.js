export const PERSONAL_INFO = {
  name: "Manish Rao",

  title: "Full Stack Developer & MERN Engineer",

  shortDesc:
    "Building modern full-stack applications with cinematic UI, scalable backend systems, and immersive digital experiences.",

  longDesc: `I'm a Computer Science Engineering student and full-stack developer passionate about building modern web applications with clean design and smooth user experiences.
I mainly work with the MERN stack and enjoy creating responsive frontends, scalable backend systems, and interactive UI that feels modern and immersive.

Currently focused on improving my skills in full-stack development, DSA, and system design while building projects that push both my creativity and problem-solving abilities forward.`,

  resumeUrl: "/Manish_D_Rao_Resume.pdf",

  socials: {
    github: "https://github.com/Manish-D-Rao",
    linkedin: "https://linkedin.com/in/manishrao",
    twitter: "https://x.com/Manish92144045",
    email: "manishdrao1411@gmail.com",
  },

  stats: [
    {
      value: "15+",
      label: "PROJECTS BUILT",
    },

    {
      value: "2nd",
      label: "YEAR CSE STUDENT",
    },

    {
      value: "99%",
      label: "PASSION FOR LEARNING",
    },

    {
      value: "240K+",
      label: "LINES OF CODE & CONSOLE.LOGS",
    },
  ],
};

// ================= SKILLS =================

export const SKILL_CATEGORIES = [
  {
    category: "Frontend",

    glowColor: "rgba(6, 182, 212, 0.15)",

    items: [
      { name: "React.js", level: 90 },
      { name: "Tailwind CSS", level: 95 },
      { name: "JavaScript", level: 88 },
      { name: "HTML/CSS", level: 95 },
    ],
  },

  {
    category: "Backend",

    glowColor: "rgba(168, 85, 247, 0.15)",

    items: [
      { name: "Node.js", level: 85 },
      { name: "Express.js", level: 88 },
      { name: "MongoDB", level: 84 },
      { name: "REST APIs", level: 90 },
      { name: "JWT Authentication", level: 82 },
      { name: "Socket.io", level: 76 },
    ],
  },

  {
    category: "Tools & Platforms",

    glowColor: "rgba(249, 115, 22, 0.15)",

    items: [
      { name: "Git & GitHub", level: 90 },
      { name: "Postman", level: 84 },
      { name: "VS Code", level: 98 },
      { name: "Vercel", level: 82 },
      { name: "Render", level: 78 },
    ],
  },

  {
    category: "Currently Exploring",

    glowColor: "rgba(34, 197, 94, 0.15)",

    items: [
      { name: "Data Structures", level: 30 },
      { name: "System Design", level: 0 },
      { name: "AI/ML Basics", level: 5 },
      { name: "Three.js", level: 0 },
      { name: "GSAP", level: 0 },
      { name: "Framer Motion", level: 0 },
    ],
  },
];

// ================= TIMELINE =================

export const TIMELINE = [
  {
    period: "2024",

    role: "Computer Science Engineering Student",

    company: "NMAM Institute of Technology",

    desc: "Started my journey in Computer Science Engineering while exploring software development, programming fundamentals, and modern technologies.",
  },

  {
    period: "2024",

    role: "DSA & Problem Solving",

    company: "Self Learning",

    desc: "Began learning Data Structures & Algorithms to strengthen problem-solving skills and prepare for software engineering interviews.",
  },

  {
    period: "2024",

    role: "MERN Stack Development",

    company: "Self Learning",

    desc: "Learned full-stack web development using React.js, Node.js, Express.js, and MongoDB while building responsive and scalable applications.",
  },

  {
    period: "2025",

    role: "Project Development",

    company: "Personal Projects",

    desc: "Built my first complete full-stack project while improving frontend development, backend architecture, and real-world problem solving skills.",
  },
];

// ================= PROJECTS =================

export const PROJECTS = [
  {
    id: "Interview-X",

    title: "Interview-X",

    badge: "MOCK INTERVIEW PLATFORM",

    short:
      "Full-stack mock interview platform designed to help users practice technical interviews in a modern interactive environment.",

    desc: "A modern mock interview platform built to simulate real interview experiences with authentication, responsive UI, and structured interview workflows for better preparation and practice.",

    image: "/interview-x.png",

    tech: [
      "React.js",
      "Node.js",
      "MongoDB",
      "Express.js",
      "Clerk",
      "Inngest",
      "Tailwind CSS",
    ],

    github: "https://github.com/Manish-D-Rao/INTERVIEW-X",

    demo: "https://interview-x.onrender.com/",

    highlights: [
      "Responsive modern UI",
      "Authentication & protected routes",
      "Structured mock interview workflows",
    ],
  },
  {
    id: "The-Ultimate-Chef",

    title: "The Ultimate Chef",

    badge: "RECIPE GENERATOR",

    short:
      "React-based recipe generator that creates recipes using ingredients provided by the user.",

    desc: "A React application integrated with the Groq API that generates recipes based on user-provided ingredients. Users can enter more than four ingredients and receive dynamic recipe suggestions through a clean and interactive interface. [NOT DEPLOYED YET]",

    image: "the-ultimate-chef.png",

    tech: ["React.js", "Groq API", "CSS"],

    github: "https://github.com/Manish-D-Rao/The-Ultimate-Chef",

    demo: "#",

    highlights: [
      "Recipe generation using Groq API",
      "Dynamic ingredient-based suggestions",
      "Clean interactive user interface",
    ],
  },
];
