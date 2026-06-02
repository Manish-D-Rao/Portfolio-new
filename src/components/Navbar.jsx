import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, Terminal, Cpu } from "lucide-react";

const NAVIGATION_ITEMS = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "contact", label: "Contact" },
];

export default function Navbar({ activeSection, scrollToSection }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleMobileNavClick = (id) => {
    setIsMobileMenuOpen(false);
    // Tiny delay to allow drawer closing animation before scroll jump
    setTimeout(() => {
      scrollToSection(id);
    }, 280);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          isScrolled
            ? "py-3 bg-black/60 backdrop-blur-md border-b border-white/5 shadow-lg shadow-black/20"
            : "py-6 bg-transparent border-b border-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Brand Logo */}
          <button
            onClick={() => scrollToSection("home")}
            className="group flex items-center gap-2.5 text-white/95 font-display text-xl font-bold tracking-tight cursor-pointer"
          >
            <div className="w-8 h-8 rounded-lg bg-zinc-900 border border-white/10 flex items-center justify-center group-hover:border-cyan-400/50 transition-colors duration-300">
              <Terminal className="w-4 h-4 text-cyan-400 group-hover:text-cyan-300 transition-colors" />
            </div>
            <span className="bg-linear-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
              Manish
            </span>
            <span className="text-cyan-400 font-mono text-sm leading-none opacity-80 group-hover:opacity-100 transition-all">
              .dev_
            </span>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1.5 p-1 bg-zinc-950/60 border border-white/5 rounded-full backdrop-blur-sm">
            {NAVIGATION_ITEMS.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`relative px-4 py-1.5 font-sans text-xs font-medium tracking-wide uppercase rounded-full transition-colors cursor-pointer ${
                    isActive
                      ? "text-cyan-400"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-bg-pill"
                      className="absolute inset-0 bg-white/5 border border-white/10 rounded-full"
                      transition={{
                        type: "spring",
                        stiffness: 380,
                        damping: 30,
                      }}
                    />
                  )}
                  <span className="relative z-10">{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Action Call / Secondary Info */}
          <div className="hidden md:block">
            <button
              onClick={() => scrollToSection("contact")}
              className="inline-flex items-center gap-2 px-4 py-1.5 bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 hover:text-cyan-300 border border-cyan-500/20 hover:border-cyan-500/30 font-sans text-xs font-semibold uppercase tracking-wider rounded-lg transition-all duration-300 cursor-pointer"
            >
              <Cpu className="w-3.5 h-3.5" />
              <span>Send Message</span>
            </button>
          </div>

          {/* Mobile Menu Trigger */}
          <div className="flex md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-slate-300 hover:text-white bg-zinc-900/50 border border-white/5 rounded-lg focus:outline-none cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5 text-white animate-scale-in" />
              ) : (
                <Menu className="w-5 h-5 animate-scale-in" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Backdrop & Full-Screen Navigation Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 min-h-screen bg-black/95 backdrop-blur-lg z-45 flex flex-col justify-center items-center md:hidden"
          >
            {/* Custom glowing design element inside menu */}
            <div className="absolute w-75 h-75 rounded-full bg-cyan-500/10 blur-[100px] top-1/4 left-1/2 -translate-x-1/2 -z-10 pointer-events-none" />

            <nav className="flex flex-col items-center gap-6">
              {NAVIGATION_ITEMS.map((item, index) => {
                const isActive = activeSection === item.id;
                return (
                  <motion.button
                    key={item.id}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05, ease: "easeOut" }}
                    onClick={() => handleMobileNavClick(item.id)}
                    className="relative text-2xl font-display font-medium tracking-wide uppercase py-1 group cursor-pointer"
                  >
                    <span
                      className={`transition-colors ${
                        isActive
                          ? "text-cyan-400"
                          : "text-slate-400 group-hover:text-white"
                      }`}
                    >
                      {item.label}
                    </span>
                    {isActive && (
                      <motion.div
                        layoutId="nav-mobile-underline"
                        className="absolute bottom-0 left-0 w-full h-0.5 bg-linear-to-r from-cyan-400 to-purple-500"
                      />
                    )}
                  </motion.button>
                );
              })}
            </nav>

            {/* Quick Mobile Social Footer info */}
            <div className="absolute bottom-12 flex flex-col items-center gap-2 ">
              <span className="text-zinc-600 font-mono text-xs tracking-widest lowercase">
                sys_status: ONLINE
              </span>
              <button
                onClick={() => handleMobileNavClick("contact")}
                className="px-6 py-2 bg-linear-to-r from-cyan-500/25 to-purple-500/25 border border-cyan-500/30 text-cyan-300 font-sans text-xs tracking-widest uppercase rounded-lg cursor-pointer"
              >
                Send Message
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
