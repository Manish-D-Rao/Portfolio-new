import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Github, ExternalLink, X, Compass, CheckCircle } from "lucide-react";
import { PROJECTS } from "../data.js";

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState(null);

  return (
    <section
      id="projects"
      className="relative py-28 px-6 bg-zinc-950/20 border-t border-white/5 overflow-hidden"
    >
      {/* Background visual spotlight elements */}
      <div className="absolute top-1/4 right-0 w-112.5 h-112.5 rounded-full bg-purple-500/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="mb-20 text-center md:text-left flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h2 className="font-display text-3xl sm:text-5xl font-bold tracking-tight text-white uppercase">
              Project Showcases
            </h2>
            <div className="h-0.5 w-20 bg-linear-to-r from-cyan-400 to-purple-500 mt-4 mx-auto md:mx-0" />
          </div>

          <p className="max-w-md font-sans text-xs sm:text-sm text-slate-500 leading-relaxed font-normal text-center md:text-left md:mb-1">
            A collection of projects focused on full-stack development, clean
            architecture, modern UI, and building digital experiences that feel
            smooth, interactive, and immersive.
          </p>
        </div>

        {/* Projects Responsive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          {PROJECTS.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="group flex flex-col justify-between bg-zinc-950/90 border border-white/10 rounded-2xl overflow-hidden hover:border-cyan-400/40 hover:shadow-[0_4px_30px_rgba(6,182,212,0.06)] transition-all duration-300"
            >
              {/* Card visual header */}
              <div className="relative h-48 sm:h-64 w-full overflow-hidden">
                {/* Visual Image */}
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700 select-none grayscale group-hover:grayscale-0"
                  referrerPolicy="no-referrer"
                />

                {/* Left Absolute Badge */}
                <div className="absolute top-4 left-4 p-1 rounded-md bg-black/60 border border-white/10 backdrop-blur-md">
                  <span className="font-mono text-[9px] uppercase tracking-wider text-cyan-400 font-bold px-2 py-0.5">
                    {project.badge}
                  </span>
                </div>

                {/* Overlaid Glow Shadow gradient */}
                <div className="absolute inset-0 bg-linear-to-t from-zinc-950 via-zinc-950/20 to-transparent pointer-events-none" />
              </div>

              {/* Card Body */}
              <div className="p-6 sm:p-8 grow flex flex-col justify-between">
                <div>
                  <h3 className="font-display text-lg sm:text-xl font-bold text-white mb-2 leading-snug group-hover:text-cyan-450 transition-colors uppercase">
                    {project.title}
                  </h3>
                  <p className="font-sans text-xs sm:text-sm text-slate-400 leading-relaxed font-normal mb-6">
                    {project.short}
                  </p>
                </div>

                {/* Tech Badges List */}
                <div>
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {project.tech.slice(0, 4).map((tech) => (
                      <span
                        key={tech}
                        className="font-mono text-[9px] uppercase text-zinc-400 bg-zinc-900 border border-white/5 rounded-md px-2 py-0.5 font-semibold"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.tech.length > 4 && (
                      <span className="font-mono text-[9px] uppercase text-cyan-400 bg-cyan-950/20 border border-cyan-500/10 rounded-md px-2 py-0.5">
                        +{project.tech.length - 4} More
                      </span>
                    )}
                  </div>

                  {/* Card Bottom: Trigger buttons */}
                  <div className="flex items-center justify-between border-t border-white/5 pt-5">
                    <button
                      onClick={() => setSelectedProject(project)}
                      className="text-xs font-mono tracking-wider uppercase text-cyan-400 hover:text-cyan-300 font-bold inline-flex items-center gap-1.5 group/btn cursor-pointer"
                    >
                      <Compass className="w-3.5 h-3.5 animate-spin-slow group-hover/btn:rotate-45 transition-transform" />
                      <span>Inspect Project</span>
                    </button>

                    <div className="flex items-center gap-4">
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-slate-400 hover:text-white transition-colors p-1"
                        aria-label="Inspection GitHub"
                      >
                        <Github className="w-4 h-4" />
                      </a>
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-slate-400 hover:text-white transition-colors p-1"
                        aria-label="Live Inspection Link"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Cinematic Modal Container */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 backdrop-blur-md z-50 flex items-center justify-center p-4 overflow-y-auto"
          >
            {/* Modal Box */}
            <motion.div
              initial={{ scale: 0.95, y: 15, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, y: 15, opacity: 0 }}
              transition={{ type: "spring", stiffness: 350, damping: 28 }}
              className="relative w-full max-w-4xl bg-zinc-950 border border-white/10 rounded-2xl overflow-hidden shadow-2xl my-8"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Background spotlight */}
              <div className="absolute top-0 left-1/4 w-75 h-75 rounded-full bg-cyan-500/10 blur-[90px] pointer-events-none -z-10" />

              {/* Modal Header */}
              <div className="h-12 px-6 bg-zinc-900/90 border-b border-white/5 flex items-center justify-between sticky top-0 z-20 backdrop-blur-sm">
                <span className="font-mono text-[10px] text-zinc-500 uppercase tracking-widest">
                  inspect_module: {selectedProject.id}
                </span>

                <button
                  onClick={() => setSelectedProject(null)}
                  className="p-1 px-1.5 text-slate-400 hover:text-white bg-zinc-800/50 border border-white/10 rounded-md transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-6 sm:p-10 flex flex-col md:flex-row gap-8 max-h-[78vh] overflow-y-auto">
                {/* Left Column: Picture + Badges */}
                <div className="flex-1 max-w-sm flex flex-col gap-6">
                  <div className="h-48 sm:h-56 rounded-xl border border-white/10 overflow-hidden relative">
                    <img
                      src={selectedProject.image}
                      alt={selectedProject.title}
                      className="w-full h-full object-cover grayscale-0"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent pointer-events-none -mx-px -my-px" />
                  </div>

                  <div>
                    <h5 className="font-mono text-[10px] uppercase tracking-wider text-slate-500 font-bold mb-3">
                      TECH STACK
                    </h5>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedProject.tech.map((t) => (
                        <span
                          key={t}
                          className="font-mono text-[10px] text-cyan-400 bg-cyan-950/20 border border-cyan-500/20 rounded-md px-2.5 py-1 font-semibold"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* CTA link triggers in Modal */}
                  <div className="flex flex-col gap-2 pt-4 border-t border-white/5">
                    <a
                      href={selectedProject.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-2.5 px-4 bg-white hover:bg-slate-200 text-black text-center font-sans text-xs font-bold uppercase rounded-lg transition-all duration-300 flex items-center justify-center gap-2"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>Live Demo Environment</span>
                    </a>
                    <a
                      href={selectedProject.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-2.5 px-4 bg-zinc-900 hover:bg-zinc-850 border border-white/10 text-white text-center font-sans text-xs font-bold uppercase rounded-lg transition-all duration-300 flex items-center justify-center gap-2"
                    >
                      <Github className="w-3.5 h-3.5" />
                      <span>Source Repository</span>
                    </a>
                  </div>
                </div>

                {/* Right Column: Descriptions & bullet metrics */}
                <div className="flex-1 flex flex-col justify-between gap-6">
                  <div>
                    <h3 className="font-display text-2xl sm:text-3xl font-bold text-white mb-3 tracking-tight uppercase leading-snug">
                      {selectedProject.title}
                    </h3>
                    <p className="font-sans text-sm text-slate-350 leading-relaxed font-normal mb-6">
                      {selectedProject.desc}
                    </p>

                    {/* Highlights Bullet List */}
                    <h4 className="font-mono text-[10px] uppercase tracking-wider text-slate-500 font-bold mb-4">
                      IMPLEMENTATION HIGHLIGHTS
                    </h4>
                    <ul className="flex flex-col gap-3.5">
                      {selectedProject.highlights.map((highlight, idx) => (
                        <li key={idx} className="flex gap-3 items-start">
                          <CheckCircle className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                          <span className="font-sans text-xs sm:text-sm text-slate-400 leading-normal font-normal">
                            {highlight}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-6 border-t border-white/5 flex justify-between items-center text-zinc-500 text-xs font-mono lowercase">
                    <span>security_level: safe</span>
                    <span>status_mode: verified</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
