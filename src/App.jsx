import { useState, useEffect } from "react";
import Navbar from "./components/Navbar.jsx";
import Hero from "./components/Hero.jsx";
import About from "./components/About.jsx";
import Skills from "./components/Skills.jsx";
import Projects from "./components/Projects.jsx";
import Experience from "./components/Experience.jsx";
import Contact from "./components/Contact.jsx";
import Footer from "./components/Footer.jsx";
import CustomCursor from "./components/CustomCursor.jsx";

export default function App() {
  const [activeSection, setActiveSection] = useState("home");

  // Custom scrolling tracker
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      // Find the distance to scroll, adjusting for potential navbar offset in scrolled mode
      const offset = 70; // Height of shrunk navbar
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
      setActiveSection(id);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "about", "skills", "projects", "experience", "contact"];
      // Use middle-screen line collision to update active status
      const scrollPosition = window.scrollY + window.innerHeight * 0.4;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    // Trigger on mount inside animation frame
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="bg-black text-[#f1f5f9] min-h-screen selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Custom Cyberpunk Theme Animated Cursor */}
      <CustomCursor />

      {/* Absolute master grain background layer overlay */}
      <div className="fixed inset-0 bg-[radial-gradient(#ffffff03_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none z-40 opacity-70" />

      {/* Persistent top bar */}
      <Navbar activeSection={activeSection} scrollToSection={scrollToSection} />

      <main>
        <Hero scrollToSection={scrollToSection} />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Contact />
      </main>

      <Footer scrollToSection={scrollToSection} />
    </div>
  );
}
