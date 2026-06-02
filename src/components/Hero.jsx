import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowDown, Github, Linkedin, Mail, Twitter, ChevronRight } from "lucide-react";
import InteractiveCanvas from "./InteractiveCanvas.jsx";
import { PERSONAL_INFO } from "../data.js";

const ROTATING_ROLES = [
  "MERN Stack Engineer",
  "React Specialist",
  "Node.js Microservices Architect",
  "Interactive UI Craftsman"
];

export default function Hero({ scrollToSection }) {
  const [roleIndex, setRoleIndex] = useState(0);
  const containerRef = useRef(null);
  const [spotlightPos, setSpotlightPos] = useState({ x: 0, y: 0 });

  // Revolving role trigger interval
  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % ROTATING_ROLES.length);
    }, 3800);
    return () => clearInterval(interval);
  }, []);

  // Spotlight mouse listener
  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setSpotlightPos({ x, y });
  };

  return (
    <section
      id="home"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-screen flex flex-col justify-center items-center px-6 pt-32 pb-40 overflow-hidden bg-black"
    >
      {/* Real-time canvas particle scene */}
      <InteractiveCanvas />

      {/* Gentle responsive spotlight gradient back layer */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-300 opacity-60"
        style={{
          background: `radial-gradient(450px circle at ${spotlightPos.x}px ${spotlightPos.y}px, rgba(6, 182, 212, 0.075) 0%, rgba(168, 85, 247, 0.05) 50%, transparent 100%)`,
        }}
      />

      {/* Giant ambient glowing blurred orbs for futuristic background depth */}
      <div className="absolute top-1/4 left-1/4 w-[35vw] h-[35vw] rounded-full bg-cyan-500/5 glow-orb-primary -z-10 pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/4 w-[28vw] h-[28vw] rounded-full bg-purple-500/5 glow-orb-secondary -z-10 pointer-events-none" />

      {/* Tech grid overlay */}
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black to-transparent pointer-events-none -z-10" />

      <div className="max-w-4xl mx-auto text-center z-10 select-none">
        {/* Upper Micro Banner */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
          className="inline-flex items-center gap-2 px-3 py-1 bg-zinc-900/60 border border-white/5 rounded-full mb-6 cursor-default"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-slate-400 font-semibold">
            AVAILABLE FOR CONTRACTS & WORKPLACE OPPORTUNITIES
          </span>
        </motion.div>

        {/* Name Reveal */}
        <motion.h1
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="font-display text-5xl sm:text-7xl md:text-8xl font-extrabold tracking-tighter leading-none mb-4 uppercase"
        >
          <span className="text-white/95">Manish </span>
          <span className="bg-gradient-to-r from-cyan-400 via-sky-400 to-purple-500 bg-clip-text text-transparent drop-shadow-sm">
            Rao
          </span>
        </motion.h1>

        {/* Cylindrical Role subtitle selector */}
        <div className="h-8 md:h-10 mb-6 flex items-center justify-center overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={roleIndex}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="text-base sm:text-lg md:text-2xl font-mono text-cyan-400 font-medium tracking-wide uppercase flex items-center gap-2"
            >
              <span>// </span>
              <span>{ROTATING_ROLES[roleIndex]}</span>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Short Statement */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
          className="max-w-2xl mx-auto font-sans text-sm sm:text-base md:text-lg text-slate-400 font-normal leading-relaxed mb-8"
        >
          {PERSONAL_INFO.shortDesc}
        </motion.p>

        {/* Primary CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
        >
          {/* Main Work Trigger */}
          <button
            onClick={() => scrollToSection("projects")}
            className="group w-full sm:w-auto px-7 py-3.5 bg-white text-black font-sans text-sm font-semibold tracking-wide uppercase rounded-xl transition-all duration-300 hover:scale-102 hover:shadow-[0_0_25px_rgba(255,255,255,0.15)] flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Explore Projects</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>

          {/* Connect Terminal Link */}
          <button
            onClick={() => scrollToSection("contact")}
            className="w-full sm:w-auto px-7 py-3.5 bg-zinc-950/80 hover:bg-zinc-900 border border-white/10 hover:border-white/20 text-white/90 font-sans text-sm font-semibold tracking-wide uppercase rounded-xl transition-all duration-300 hover:scale-102 flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Deploy Connection</span>
          </button>
        </motion.div>

        {/* Embedded Minimalist Social row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.7 }}
          className="flex items-center justify-center gap-6 text-slate-500"
        >
          <a
            href={PERSONAL_INFO.socials.github}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-cyan-400 transition-colors duration-300"
            aria-label="GitHub Account"
          >
            <Github className="w-5 h-5" />
          </a>
          <a
            href={PERSONAL_INFO.socials.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-cyan-400 transition-colors duration-300"
            aria-label="LinkedIn Account"
          >
            <Linkedin className="w-5 h-5" />
          </a>
          <a
            href={PERSONAL_INFO.socials.twitter}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-cyan-400 transition-colors duration-300"
            aria-label="Twitter Feed"
          >
            <Twitter className="w-5 h-5" />
          </a>
          <a
            href={`mailto:${PERSONAL_INFO.socials.email}`}
            className="hover:text-cyan-400 transition-colors duration-300"
            aria-label="Direct Email"
          >
            <Mail className="w-5 h-5" />
          </a>
        </motion.div>
      </div>

      {/* Visual Scrolling Indicator footer tab */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-2.5 opacity-70 hover:opacity-100 transition-all duration-300 pointer-events-auto">
        <span className="font-mono text-[10px] font-bold uppercase tracking-[0.25em] text-slate-350 drop-shadow-[0_1px_8px_rgba(0,0,0,0.8)]">
          scroll_deck
        </span>
        <button
          onClick={() => scrollToSection("about")}
          className="w-7 h-11 border-2 border-slate-500/40 hover:border-cyan-400 rounded-full flex justify-center items-start pt-2 cursor-pointer bg-black/60 shadow-[0_0_20px_rgba(6,182,212,0.05)] hover:shadow-[0_0_25px_rgba(6,182,212,0.25)] transition-all duration-300"
          aria-label="Scroll to next section"
        >
          <motion.div
            animate={{
              y: [0, 12, 0],
            }}
            transition={{
              duration: 1.6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="w-2 h-2 rounded-full bg-gradient-to-b from-cyan-400 to-cyan-300 shadow-[0_0_8px_rgba(34,211,238,0.8)]"
          />
        </button>
      </div>
    </section>
  );
}
