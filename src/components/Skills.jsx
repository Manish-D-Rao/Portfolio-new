import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Code2, Server, Database, Settings, ShieldAlert, Cpu } from "lucide-react";
import { SKILL_CATEGORIES } from "../data.js";

// Map lucide icons to categories
const CATEGORY_ICONS = {
  Frontend: Code2,
  Backend: Server,
  Database: Database,
  "Tools & DevOps": Settings,
};

export default function Skills() {
  const [selectedCategory, setSelectedCategory] = useState(SKILL_CATEGORIES[0].category);

  const activeCategoryData = SKILL_CATEGORIES.find(
    (cat) => cat.category === selectedCategory
  );

  return (
    <section id="skills" className="relative py-28 px-6 bg-black">
      {/* Background neon orbs */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-cyan-500/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <div className="mb-20 text-center md:text-left flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-cyan-400 font-semibold mb-3 block">
              // TECH TAXONOMY
            </span>
            <h2 className="font-display text-3xl sm:text-5xl font-bold tracking-tight text-white uppercase">
              Core Stack & Capabilities
            </h2>
            <div className="h-[2px] w-20 bg-gradient-to-r from-cyan-400 to-purple-500 mt-4 mx-auto md:mx-0" />
          </div>

          <p className="max-w-md font-sans text-xs sm:text-sm text-slate-500 leading-relaxed font-normal text-center md:text-left md:mb-1">
            Carefully curated skill sets matching the constraints of modern production environments, with zero dependency on bulk UI libraries.
          </p>
        </div>

        {/* Categories selector track */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-12">
          {SKILL_CATEGORIES.map((cat) => {
            const IconComponent = CATEGORY_ICONS[cat.category] || Code2;
            const isSelected = selectedCategory === cat.category;

            return (
              <button
                key={cat.category}
                onClick={() => setSelectedCategory(cat.category)}
                className={`flex items-center gap-3 p-4 rounded-xl border text-left transition-all cursor-pointer ${
                  isSelected
                    ? "bg-zinc-900 border-cyan-400/50 shadow-md shadow-cyan-500/5"
                    : "bg-zinc-950/40 border-white/5 hover:border-white/10 hover:bg-zinc-950/80"
                }`}
              >
                <div
                  className={`w-9 h-9 rounded-lg flex items-center justify-center border transition-all ${
                    isSelected
                      ? "bg-cyan-500/10 border-cyan-400/40 text-cyan-400"
                      : "bg-zinc-900 border-white/5 text-slate-500"
                  }`}
                >
                  <IconComponent className="w-4 h-4" />
                </div>
                <div>
                  <h3
                    className={`font-display text-xs md:text-sm font-bold uppercase tracking-wide transition-colors ${
                      isSelected ? "text-white" : "text-slate-400"
                    }`}
                  >
                    {cat.category}
                  </h3>
                  <span className="font-mono text-[9px] text-slate-500 uppercase font-semibold">
                    {cat.items.length} Modules
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Skill visual display grid wrapper */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left panel: Selected category overview card */}
          <div className="lg:col-span-4 flex flex-col justify-between p-8 bg-zinc-950/40 border border-white/5 rounded-2xl relative overflow-hidden">
            {/* Soft Ambient Inner Glow mapped backplate */}
            <div
              className="absolute inset-0 pointer-events-none transition-all duration-700 opacity-60"
              style={{
                background: `radial-gradient(280px circle at center, ${
                  activeCategoryData?.glowColor || "rgba(6, 182, 212, 0.15)"
                } 0%, rgba(0,0,0,0) 100%)`,
              }}
            />

            <div className="relative z-10 flex flex-col gap-6">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-zinc-900/60 border border-white/5 rounded-full w-fit">
                <Cpu className="w-3.5 h-3.5 text-cyan-400" />
                <span className="font-mono text-[9px] uppercase text-slate-400 font-semibold tracking-wider">
                  active_engine
                </span>
              </div>

              <div>
                <h3 className="font-display text-2xl font-bold text-white mb-3 uppercase tracking-wide">
                  {selectedCategory}
                </h3>
                <p className="font-sans text-sm text-slate-400 leading-relaxed font-normal">
                  {selectedCategory === "Frontend" &&
                    "Crafting fluid client-side interfaces. I leverage Framer Motion and custom CSS variables to create cohesive, Apple-like web layouts that are responsive on any window viewport."}
                  {selectedCategory === "Backend" &&
                    "Structuring high-velocity, modular services utilizing Express.js routing. Standardizing secure JWT bearer sessions, automated schema filtering, and custom response sanitizers."}
                  {selectedCategory === "Database" &&
                    "Organizing relational frameworks and flexible Document-Store collections. Optimized for indexing performance, high-speed Redis caching layers, and safe transactions."}
                  {selectedCategory === "Tools & DevOps" &&
                    "Structuring workflow processes. Rebuilding robust bundlers via Vite/esbuild, standardizing Git branches, managing safe Docker clusters, and automating live deployments."}
                </p>
              </div>
            </div>

            <div className="relative z-10 pt-8 border-t border-white/5 mt-8 lg:mt-0 flex items-center justify-between">
              <span className="font-mono text-[10px] text-zinc-500 lowercase">
                class_group: {selectedCategory.replace(/\s+/g, "_").toLowerCase()}
              </span>
              <span className="font-mono text-[9px] uppercase text-cyan-400 font-semibold tracking-widest animate-pulse">
                SYS_READY
              </span>
            </div>
          </div>

          {/* Right panel: Active list of progressive skills with sliders */}
          <div className="lg:col-span-8 p-8 bg-zinc-950/20 border border-white/5 rounded-2xl flex flex-col gap-6">
            <h4 className="font-mono text-[10px] uppercase tracking-wider text-slate-500 font-bold mb-2">
              // MODULE METRIC BAR GRADES
            </h4>
            
            <div className="flex flex-col gap-6">
              <AnimatePresence mode="popLayout">
                {activeCategoryData?.items.map((skill, index) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3, delay: index * 0.04 }}
                    className="flex flex-col gap-2"
                  >
                    <div className="flex justify-between items-baseline">
                      <span className="font-display text-sm font-semibold text-slate-200">
                        {skill.name}
                      </span>
                      <span className="font-mono text-xs text-cyan-400 font-medium">
                        {skill.level}%
                      </span>
                    </div>

                    {/* Progress Track */}
                    <div className="h-2 w-full bg-zinc-900 border border-white/5 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${skill.level}%` }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="h-full bg-gradient-to-r from-cyan-400 via-sky-400 to-purple-500 rounded-full"
                      />
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
