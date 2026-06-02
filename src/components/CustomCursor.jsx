import { useState, useEffect, useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  AnimatePresence,
} from "motion/react";

export default function CustomCursor() {
  const [mounted, setMounted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [clicks, setClicks] = useState([]); // Ring expand animations on click

  // Use framer-motion motion values for hardware accelerated performance
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Smooth trail spring configuration
  const springConfig = { damping: 35, stiffness: 280, mass: 0.6 };
  const smoothX = useSpring(cursorX, springConfig);
  const smoothY = useSpring(cursorY, springConfig);

  useEffect(() => {
    // Only enable custom cursor on desktop pointer devices
    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    if (isMobile) return;

    setMounted(true);

    const moveCursor = (e) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleMouseDown = (e) => {
      const newClick = {
        id: Date.now(),
        x: e.clientX,
        y: e.clientY,
      };
      setClicks((prev) => [...prev, newClick]);
    };

    // Detect clickable elements to trigger expanded hover effects
    const handleMouseOver = (e) => {
      const target = e.target;
      const isClickable =
        target.tagName === "BUTTON" ||
        target.tagName === "A" ||
        target.closest("button") ||
        target.closest("a") ||
        target.closest('[role="button"]') ||
        target.closest("input") ||
        target.closest("textarea");

      if (isClickable) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    window.addEventListener("mousemove", moveCursor, { passive: true });
    window.addEventListener("mousedown", handleMouseDown, { passive: true });
    window.addEventListener("mouseover", handleMouseOver, { passive: true });

    // Inject global stylesheet to remove default cursor on body
    const style = document.createElement("style");
    style.id = "remove-cursor-styles";
    style.innerHTML = `
      @media (min-width: 769px) {
        body, a, button, select, input, textarea, [role="button"] {
          cursor: none !important;
        }
      }
    `;
    document.head.appendChild(style);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseover", handleMouseOver);
      const styleNode = document.getElementById("remove-cursor-styles");
      if (styleNode) styleNode.remove();
    };
  }, [cursorX, cursorY]);

  // Handle garbage collection for click ripples
  const removeClickRipple = (id) => {
    setClicks((prev) => prev.filter((c) => c.id !== id));
  };

  if (!mounted) return null;

  return (
    <>
      {/* 1. Hardware-accelerated Immediate Inner Dot Cursor */}
      <motion.div
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        className="fixed top-0 left-0 w-2 h-2 bg-linear-to-r from-cyan-400 to-sky-400 rounded-full z-100 pointer-events-none mix-blend-screen"
        animate={{
          scale: isHovered ? 1.5 : 1,
        }}
        transition={{ duration: 0.15 }}
      />

      {/* 2. Soft trail spring outer tracking ring */}
      <motion.div
        style={{
          x: smoothX,
          y: smoothY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        className="fixed top-0 left-0 rounded-full border border-cyan-400/30 z-100 pointer-events-none mix-blend-screen"
        animate={{
          width: isHovered ? 48 : 32,
          height: isHovered ? 48 : 32,
          backgroundColor: isHovered
            ? "rgba(6, 182, 212, 0.08)"
            : "rgba(6, 182, 212, 0)",
          borderColor: isHovered
            ? "rgba(6, 182, 212, 0.7)"
            : "rgba(6, 182, 212, 0.3)",
          boxShadow: isHovered
            ? "0 0 15px rgba(6, 182, 212, 0.35)"
            : "0 0 0px rgba(6, 182, 212, 0)",
        }}
        transition={{ duration: 0.2, ease: "easeOut" }}
      />

      {/* 3. Click Ripple Ring Generator */}
      <AnimatePresence>
        {clicks.map((click) => (
          <motion.div
            key={click.id}
            initial={{
              opacity: 0.8,
              scale: 0.1,
              x: click.x,
              y: click.y,
              translateX: "-50%",
              translateY: "-50%",
            }}
            animate={{
              opacity: 0,
              scale: 1,
            }}
            exit={{ opacity: 0 }}
            onAnimationComplete={() => removeClickRipple(click.id)}
            transition={{ duration: 0.45, ease: "easeOut" }}
            className="fixed top-0 left-0 w-24 h-24 rounded-full border-2 border-cyan-400 z-100 pointer-events-none mix-blend-screen shadow-[0_0_20px_rgba(6,182,212,0.6)]"
          />
        ))}
      </AnimatePresence>
    </>
  );
}
