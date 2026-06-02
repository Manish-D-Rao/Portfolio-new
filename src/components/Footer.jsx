import {
  Terminal,
  ArrowUp,
  Github,
  Linkedin,
  Twitter,
  Mail,
} from "lucide-react";

export default function Footer({ scrollToSection }) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-black border-t border-white/5 py-12 px-6">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
        {/* Logo and Brand */}
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded bg-zinc-900 border border-white/10 flex items-center justify-center">
            <Terminal className="w-3.5 h-3.5 text-cyan-400" />
          </div>
          <span className="font-display font-semibold text-sm tracking-tight text-white uppercase">
            Manish Rao <span className="text-cyan-400 font-mono">.dev_</span>
          </span>
        </div>

        {/* Technical signature */}
        <div className="flex flex-col items-center justify-center gap-1 font-mono text-[9px] text-zinc-500 uppercase font-semibold">
          <span>Copyright © {currentYear} All rights reserved.</span>
          <a
            href="/Manish_D_Rao_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
          >
            <button className="group hover:border-cyan-400/30 p-2.5 bg-zinc-950 border border-white/5 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2">
              View Resume
            </button>
          </a>
        </div>

        {/* Back To Top Scroll trigger */}
        <button
          onClick={() => scrollToSection("home")}
          className="group hover:border-cyan-400/30 p-2.5 bg-zinc-950 border border-white/5 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2"
          aria-label="Back to top"
        >
          <span className="font-mono text-[9px] uppercase tracking-wider text-slate-400 group-hover:text-cyan-400">
            top_jump
          </span>
          <ArrowUp className="w-3.5 h-3.5 text-slate-400 group-hover:text-cyan-400 group-hover:-translate-y-0.5 transition-transform" />
        </button>
      </div>
    </footer>
  );
}
