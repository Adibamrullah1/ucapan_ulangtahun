"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";
import { Heart, Sparkles } from "lucide-react";

interface FinaleSectionProps {
  showConfetti: boolean;
}

// Fixed positions for floating hearts
const FLOATING_HEARTS = [
  { x: 12, delay: 0.5, duration: 4.5, size: 28 },
  { x: 84, delay: 1.2, duration: 5.2, size: 32 },
  { x: 79, delay: 0.8, duration: 3.8, size: 22 },
  { x: 32, delay: 1.5, duration: 4.8, size: 18 },
  { x: 91, delay: 0.3, duration: 5.5, size: 24 },
  { x: 30, delay: 1.8, duration: 4.2, size: 26 },
  { x: 86, delay: 2.1, duration: 5.8, size: 30 },
  { x: 35, delay: 0.6, duration: 4.0, size: 20 },
  { x: 14, delay: 1.0, duration: 5.0, size: 34 },
  { x: 87, delay: 1.4, duration: 4.6, size: 22 },
  { x: 84, delay: 0.2, duration: 5.3, size: 28 },
  { x: 33, delay: 1.7, duration: 4.4, size: 26 },
  { x: 7, delay: 0.9, duration: 5.1, size: 24 },
  { x: 61, delay: 1.3, duration: 4.7, size: 30 },
  { x: 35, delay: 0.4, duration: 5.6, size: 20 },
  { x: 93, delay: 1.6, duration: 4.3, size: 36 },
  { x: 42, delay: 2.0, duration: 5.4, size: 32 },
  { x: 5, delay: 0.7, duration: 4.9, size: 22 },
  { x: 79, delay: 1.1, duration: 5.2, size: 38 },
  { x: 68, delay: 1.9, duration: 4.1, size: 38 },
];

export default function FinaleSection({ showConfetti }: FinaleSectionProps) {
  const { width, height } = useWindowSize();
  const [confettiPieces, setConfettiPieces] = useState(200);
  const [isVisible, setIsVisible] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (showConfetti) {
      setIsVisible(true);
      // Reduce confetti over time
      const timer = setTimeout(() => {
        setConfettiPieces(50);
      }, 5000);

      const endTimer = setTimeout(() => {
        setConfettiPieces(0);
      }, 10000);

      return () => {
        clearTimeout(timer);
        clearTimeout(endTimer);
      };
    }
  }, [showConfetti]);

  return (
    <section className="section-container relative min-h-screen overflow-hidden">
      {/* Confetti */}
      <AnimatePresence>
        {showConfetti && confettiPieces > 0 && mounted && (
          <Confetti
            width={width}
            height={height}
            numberOfPieces={confettiPieces}
            recycle={confettiPieces > 50}
            colors={[
              "#7C3AED", // Purple
              "#EC4899", // Pink
              "#F59E0B", // Amber
              "#A78BFA", // Light Purple
              "#F472B6", // Light Pink
              "#FBBF24", // Light Amber
              "#FFFFFF", // White
            ]}
            gravity={0.1}
            tweenDuration={10000}
          />
        )}
      </AnimatePresence>

      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-radial from-pink-900/20 via-purple-900/10 to-transparent" />

      {/* Floating Hearts Background - Only render on client */}
      {mounted && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {FLOATING_HEARTS.map((heart, i) => (
            <motion.div
              key={i}
              initial={{ y: "110vh", opacity: 0 }}
              animate={{
                y: "-10vh",
                opacity: [0, 0.7, 0.7, 0],
              }}
              transition={{
                duration: heart.duration,
                repeat: Infinity,
                delay: heart.delay,
                ease: "linear",
              }}
              className="absolute text-pink-500/50"
              style={{ 
                left: `${heart.x}%`,
                fontSize: `${heart.size}px` 
              }}
            >
              ❤
            </motion.div>
          ))}
        </div>
      )}

      {/* Main Content */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={isVisible || showConfetti ? { opacity: 1, scale: 1 } : {}}
        whileInView={!showConfetti ? { opacity: 1, scale: 1 } : {}}
        viewport={{ once: true }}
        transition={{ duration: 1, type: "spring" }}
        className="relative z-10 text-center px-4"
      >
        {/* Decorative Sparkles */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.5, type: "spring" }}
          className="flex justify-center gap-4 mb-8"
        >
          {["✨", "💫", "⭐", "💫", "✨"].map((emoji, i) => (
            <motion.span
              key={i}
              animate={{
                y: [0, -10, 0],
                rotate: [-5, 5, -5],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.2,
              }}
              className="text-2xl md:text-4xl"
            >
              {emoji}
            </motion.span>
          ))}
        </motion.div>

        {/* Big Heart */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
          className="relative inline-block mb-8"
        >
          {/* Glow Effect */}
          <motion.div
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute inset-0 bg-gradient-to-r from-pink-500/50 to-purple-500/50 rounded-full blur-3xl"
          />

          <motion.div
            animate={{
              scale: [1, 1.1, 1],
            }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="relative"
          >
            <Heart
              className="w-32 h-32 md:w-48 md:h-48 text-pink-500 drop-shadow-[0_0_30px_rgba(236,72,153,0.5)]"
              fill="currentColor"
              strokeWidth={0}
            />
          </motion.div>
        </motion.div>

        {/* Main Text */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="space-y-6"
        >
          <h2
            className="text-5xl md:text-7xl lg:text-8xl font-bold"
            style={{ fontFamily: "var(--font-dancing)" }}
          >
            <span className="gradient-text-romantic">I Love You</span>
          </h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="text-xl md:text-2xl text-zinc-300 max-w-2xl mx-auto"
            style={{ fontFamily: "var(--font-dancing)" }}
          >
            Sekarang, besok, dan selamanya... 💕
          </motion.p>

          {/* Signature */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="pt-8"
          >
            <p className="text-zinc-500 text-lg flex items-center justify-center gap-2">
              With all my love
              <Heart className="w-4 h-4 text-pink-500" fill="currentColor" />
            </p>
            <p
              className="text-2xl text-pink-400 mt-2"
              style={{ fontFamily: "var(--font-dancing)" }}
            >
              ~ From someone who loves you ~
            </p>
          </motion.div>
        </motion.div>

        {/* Bottom Sparkles */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="mt-12 flex justify-center"
        >
          {[0, 1, 2, 3, 4].map((i) => (
            <motion.div
              key={i}
              animate={{
                opacity: [0.5, 1, 0.5],
                scale: [0.8, 1, 0.8],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: i * 0.2,
              }}
            >
              <Sparkles className="w-6 h-6 text-amber-400 mx-2" />
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3 }}
        className="absolute bottom-4 left-0 right-0 text-center"
      >
        <p className="text-zinc-600 text-sm">
          Made with 💖 just for you
        </p>
      </motion.footer>
    </section>
  );
}
