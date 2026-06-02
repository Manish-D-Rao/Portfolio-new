import { motion } from "motion/react";
import { Terminal, Database, Shield, Zap } from "lucide-react";
import { PERSONAL_INFO } from "../data.js";

const PHILOSOPHY_POINTS = [
{
icon: Zap,
title: "Performance First",
desc: "I love building fast, responsive applications that feel smooth on every interaction. If a page takes too long to load, it personally hurts me.",
},
{
icon: Database,
title: "Clean Architecture",
desc: "I focus on writing scalable and maintainable backend systems because debugging messy code at 2 AM is not a personality trait.",
},
{
icon: Shield,
title: "Secure By Default",
desc: "From authentication to protected APIs, I build applications with security, reliability, and real-world usability in mind.",
},
];

export default function About() {
  return (
    <section id="about" className="relative py-28 px-6 bg-zinc-950/20 border-t border-white/5 overflow-hidden">
      {/* Background visual texture */}
      <div className="absolute inset-0 bg-radial-at-t from-cyan-950/10 via-transparent to-transparent pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="mb-20 text-center sm:text-left">
          <span className="font-mono text-xs uppercase tracking-widest text-cyan-400 font-semibold mb-3 block">
            // METRIC & PROFILE INDEX
          </span>
          <h2 className="font-display text-3xl sm:text-5xl font-bold tracking-tight text-white uppercase">
            Architectural Philosophy
          </h2>
          <div className="h-[2px] w-20 bg-gradient-to-r from-cyan-400 to-purple-500 mt-4 mx-auto sm:mx-0" />
        </div>

        {/* Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Description & Philosophies */}
          <div className="lg:col-span-7 flex flex-col gap-8">
            <div>
              <h3 className="font-display text-xl sm:text-2xl font-bold text-slate-150 mb-4 tracking-tight">
                Engineering modern full-stack experiences with performance and creativity.
              </h3>
              <p className="font-sans text-sm sm:text-base text-slate-400 leading-relaxed font-normal mb-4">
                {PERSONAL_INFO.longDesc}
              </p>
              <p className="font-sans text-sm text-slate-400 leading-relaxed font-normal">
                Currently pursuing Computer Science Engineering while continuously improving my skills in full-stack development, system design, and problem solving.Outside coding, I spend time exploring new technologies, learning UI/UX concepts, and occasionally convincing myself that the bug will magically disappear after refreshing localhost.
              </p>
            </div>

            {/* Core Values / Philosophy points */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-4">
              {PHILOSOPHY_POINTS.map((pt, idx) => {
                const IconComp = pt.icon;
                return (
                  <motion.div
                    key={idx}
                    whileHover={{ y: -5 }}
                    transition={{ duration: 0.2 }}
                    className="p-5 bg-zinc-950/40 border border-white/5 rounded-xl hover:border-cyan-500/20 transition-all group"
                  >
                    <div className="w-10 h-10 rounded-lg bg-zinc-900 border border-white/10 flex items-center justify-center mb-4 group-hover:border-cyan-400/40 transition-colors">
                      <IconComp className="w-5 h-5 text-cyan-400" />
                    </div>
                    <h4 className="font-display text-sm font-bold text-white mb-2 uppercase tracking-wide">
                      {pt.title}
                    </h4>
                    <p className="font-sans text-xs text-slate-500 leading-normal">
                      {pt.desc}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Avatar Frame & Interactive Stats */}
          <div className="lg:col-span-5 flex flex-col gap-8">
            {/* Embedded Mock Code IDE Avatar Panel */}
            <div className="relative group">
              {/* Outer Glow frame mapping */}
              <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 rounded-2xl blur-lg opacity-40 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative bg-zinc-950/90 border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
                {/* IDE Window Title bar */}
                <div className="h-9 px-4 bg-zinc-900 border-b border-white/5 flex items-center justify-between">
                  <div className="flex gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
                    <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
                    <span className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
                  </div>
                  <span className="font-mono text-[10px] text-zinc-500 lowercase tracking-wider select-none">
                    manish_rao.jpg
                  </span>
                  <Terminal className="w-3.5 h-3.5 text-zinc-600" />
                </div>

                {/* Picture Area */}
                <div className="relative h-64 sm:h-80 w-full overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80"
                    alt="Manish Rao Professional Avatar"
                    className="w-full h-full object-cover object-center grayscale hover:grayscale-0 contrast-110 transition-all duration-700"
                    referrerPolicy="no-referrer"
                  />
                  
                  {/* Subtle code diagnostics watermark overlay */}
                  <div className="absolute bottom-4 left-4 p-3 bg-zinc-950/80 border border-white/10 rounded-lg backdrop-blur-sm pointer-events-none">
                    <div className="font-mono text-[10px] text-cyan-400">
                      SYS_MODULE: <span className="text-white">MANISH_CORE</span>
                    </div>
                    <div className="font-mono text-[9px] text-zinc-500">
                      COMPILATION: MOSTLY_STABLE
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Numeric Indicators grid system */}
            <div className="grid grid-cols-2 gap-4">
              {PERSONAL_INFO.stats.map((stat, idx) => (
                <div
                  key={idx}
                  className="p-5 bg-zinc-950/40 border border-white/5 rounded-xl flex flex-col hover:border-purple-500/25 transition-all group"
                >
                  <span className="font-display text-2xl sm:text-3xl font-extrabold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent group-hover:scale-105 transition-transform duration-300 origin-left">
                    {stat.value}
                  </span>
                  <span className="font-mono text-[10px] uppercase tracking-wider text-slate-500 mt-1 font-semibold group-hover:text-slate-350 transition-colors">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
