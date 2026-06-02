import { motion } from "motion/react";
import { Briefcase, Award, GraduationCap, Globe } from "lucide-react";
import { TIMELINE } from "../data.js";

export default function Experience() {
  return (
    <section
      id="experience"
      className="relative py-28 px-6 bg-black overflow-hidden"
    >
      {/* Background grids and glowing details */}
      <div className="absolute inset-0 bg-radial-at-b from-purple-950/10 via-transparent to-transparent pointer-events-none -z-10" />

      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="mb-24 text-center">
          <h2 className="font-display text-3xl sm:text-5xl font-bold tracking-tight text-white uppercase">
            Professional Chronology
          </h2>
          <div className="h-0.5 w-20 bg-linear-to-r from-cyan-400 to-purple-500 mt-4 mx-auto" />
        </div>

        {/* Vertical timeline stack */}
        <div className="relative border-l border-white/10 ml-4 sm:ml-8 flex flex-col gap-12">
          {TIMELINE.map((item, idx) => {
            // Pick icon dynamically
            let IconComponent = Briefcase;
            if (
              item.role.toLowerCase().includes("b.s") ||
              item.company.toLowerCase().includes("university")
            ) {
              IconComponent = GraduationCap;
            } else if (item.role.toLowerCase().includes("intern")) {
              IconComponent = Award;
            }

            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="relative pl-8 sm:pl-12 group"
              >
                {/* Timeline Pulsing Node */}
                <div className="absolute -left-4 top-1.5 w-8 h-8 rounded-full bg-zinc-950 border border-white/15 flex items-center justify-center group-hover:border-cyan-400/50 group-hover:shadow-[0_0_15px_rgba(6,182,212,0.35)] transition-all duration-300">
                  <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 group-hover:scale-125 transition-transform" />
                </div>

                {/* Left Floating Micro Timestamp for wide views */}
                <span className="absolute -left-40 top-2 hidden xl:block w-32 text-right font-mono text-[10px] uppercase font-bold tracking-widest text-slate-500 group-hover:text-cyan-400 transition-colors">
                  {item.period}
                </span>

                {/* Experience Box Panel */}
                <div className="p-6 sm:p-8 bg-zinc-950/40 border border-white/5 rounded-2xl group-hover:border-white/10 group-hover:bg-zinc-950/80 transition-all duration-200">
                  {/* Title and date row */}
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 mb-4">
                    <div>
                      <span className="xl:hidden font-mono text-[10px] uppercase font-semibold text-cyan-400 tracking-wider mb-1 block">
                        {item.period}
                      </span>
                      <h3 className="font-display text-lg font-bold text-white uppercase group-hover:text-cyan-400 transition-colors tracking-wide">
                        {item.role}
                      </h3>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="font-sans text-sm font-medium text-slate-300">
                          {item.company}
                        </span>
                      </div>
                    </div>

                    <div className="w-9 h-9 rounded-lg bg-zinc-900 border border-white/5 flex items-center justify-center text-slate-400 group-hover:text-cyan-400 group-hover:border-cyan-400/20 transition-colors">
                      <IconComponent className="w-4 h-4" />
                    </div>
                  </div>

                  <p className="font-sans text-xs sm:text-sm text-slate-400 leading-relaxed font-normal">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
