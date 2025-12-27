"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Sparkles, Heart } from "lucide-react";
import TypewriterText from "./ui/TypewriterText";

interface HeroSectionProps {
  recipientName?: string;
}

// Fixed positions for floating hearts
const FLOATING_HEARTS = [
  { left: "5%", delay: 0, duration: 5.5, size: 18 },
  { left: "13%", delay: 0.3, duration: 6.2, size: 22 },
  { left: "21%", delay: 0.6, duration: 4.8, size: 16 },
  { left: "29%", delay: 0.9, duration: 5.9, size: 24 },
  { left: "37%", delay: 1.2, duration: 6.5, size: 14 },
  { left: "45%", delay: 1.5, duration: 5.2, size: 20 },
  { left: "53%", delay: 1.8, duration: 6.8, size: 26 },
  { left: "61%", delay: 2.1, duration: 5.5, size: 15 },
  { left: "69%", delay: 2.4, duration: 6.1, size: 21 },
  { left: "77%", delay: 2.7, duration: 5.7, size: 17 },
  { left: "85%", delay: 3.0, duration: 6.4, size: 23 },
  { left: "93%", delay: 3.3, duration: 5.3, size: 19 },
];

// Fixed positions for sparkles
const SPARKLE_POSITIONS = [
  { left: "10%", top: "15%", delay: 0 },
  { left: "25%", top: "30%", delay: 0.3 },
  { left: "40%", top: "20%", delay: 0.6 },
  { left: "55%", top: "45%", delay: 0.9 },
  { left: "70%", top: "25%", delay: 1.2 },
  { left: "85%", top: "35%", delay: 1.5 },
  { left: "15%", top: "60%", delay: 1.8 },
  { left: "30%", top: "75%", delay: 2.1 },
  { left: "50%", top: "65%", delay: 2.4 },
  { left: "65%", top: "80%", delay: 2.7 },
  { left: "80%", top: "55%", delay: 0.2 },
  { left: "90%", top: "70%", delay: 0.5 },
  { left: "5%", top: "85%", delay: 0.8 },
  { left: "35%", top: "90%", delay: 1.1 },
  { left: "60%", top: "10%", delay: 1.4 },
  { left: "75%", top: "50%", delay: 1.7 },
  { left: "20%", top: "40%", delay: 2.0 },
  { left: "45%", top: "55%", delay: 2.3 },
  { left: "95%", top: "85%", delay: 2.6 },
  { left: "8%", top: "70%", delay: 2.9 },
];

export default function HeroSection({ recipientName = "Sayang" }: HeroSectionProps) {
  const ref = useRef(null);
  const [mounted, setMounted] = useState(false);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section
      ref={ref}
      className="section-container relative bg-gradient-radial min-h-screen"
    >
      {/* Floating Hearts Background - Only render on client */}
      {mounted && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {FLOATING_HEARTS.map((heart, i) => (
            <motion.div
              key={i}
              initial={{ y: "100vh", opacity: 0 }}
              animate={{ y: "-100vh", opacity: [0, 0.6, 0.6, 0] }}
              transition={{
                duration: heart.duration,
                repeat: Infinity,
                delay: heart.delay,
                ease: "linear",
              }}
              className="absolute text-pink-500/40"
              style={{
                left: heart.left,
                fontSize: `${heart.size}px`,
              }}
            >
              ❤
            </motion.div>
          ))}
        </div>
      )}

      {/* Sparkles Effect - Only render on client */}
      {mounted && (
        <div className="absolute inset-0 pointer-events-none">
          {SPARKLE_POSITIONS.map((sparkle, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0 }}
              animate={{
                opacity: [0, 1, 0],
                scale: [0, 1, 0],
                rotate: [0, 180, 360],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: sparkle.delay,
                ease: "easeInOut",
              }}
              className="absolute"
              style={{
                left: sparkle.left,
                top: sparkle.top,
              }}
            >
              <Sparkles className="w-4 h-4 text-amber-400/60" />
            </motion.div>
          ))}
        </div>
      )}

      {/* Main Content */}
      <motion.div
        style={{ y, opacity }}
        className="relative z-10 text-center max-w-4xl mx-auto px-4"
      >
        {/* Decorative Top */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
          className="flex items-center justify-center gap-3 mb-6"
        >
          <div className="h-[1px] w-16 md:w-32 bg-gradient-to-r from-transparent to-pink-500" />
          <Heart className="w-6 h-6 text-pink-500 animate-heart-beat" fill="currentColor" />
          <div className="h-[1px] w-16 md:w-32 bg-gradient-to-l from-transparent to-pink-500" />
        </motion.div>

        {/* Main Title */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6"
        >
          <span className="gradient-text">Happy</span>
          <br />
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="gradient-text-romantic"
          >
            Birthday!
          </motion.span>
        </motion.h1>

        {/* Cake Emoji */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.2, type: "spring", stiffness: 200 }}
          className="text-6xl md:text-8xl mb-8 animate-float"
        >
          🎂
        </motion.div>

        {/* Typewriter Message */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="text-lg md:text-2xl text-zinc-300 max-w-2xl mx-auto leading-relaxed"
          style={{ fontFamily: "var(--font-dancing)" }}
        >
          <TypewriterText
            text={`Di hari spesialmu ini, ${recipientName}, aku ingin kamu tahu betapa berharganya kehadiranmu dalam hidupku... 💕`}
            delay={1800}
            speed={40}
          />
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 4 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="flex flex-col items-center gap-2"
          >
            <span className="text-sm text-zinc-500">Scroll ke bawah</span>
            <div className="w-6 h-10 rounded-full border-2 border-zinc-600 flex justify-center pt-2">
              <motion.div
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="w-1.5 h-1.5 rounded-full bg-pink-500"
              />
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
