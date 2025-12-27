"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart } from "lucide-react";

interface GatekeeperOverlayProps {
  isVisible: boolean;
  onOpen: () => void;
  recipientName?: string;
}

// Fixed positions for floating hearts to avoid hydration mismatch
const HEART_POSITIONS = [
  { x: 10, delay: 0.2, duration: 8.5, size: 18 },
  { x: 25, delay: 1.5, duration: 9.2, size: 22 },
  { x: 40, delay: 0.8, duration: 10.1, size: 15 },
  { x: 55, delay: 2.1, duration: 8.8, size: 28 },
  { x: 70, delay: 0.5, duration: 9.5, size: 16 },
  { x: 85, delay: 1.8, duration: 11.0, size: 20 },
  { x: 15, delay: 3.0, duration: 8.2, size: 24 },
  { x: 35, delay: 2.5, duration: 9.8, size: 14 },
  { x: 60, delay: 1.2, duration: 10.5, size: 26 },
  { x: 80, delay: 0.9, duration: 8.9, size: 17 },
  { x: 5, delay: 2.8, duration: 9.3, size: 21 },
  { x: 45, delay: 1.6, duration: 10.8, size: 19 },
  { x: 75, delay: 3.5, duration: 8.6, size: 23 },
  { x: 90, delay: 2.2, duration: 9.1, size: 15 },
  { x: 30, delay: 4.0, duration: 10.2, size: 25 },
];

export default function GatekeeperOverlay({
  isVisible,
  onOpen,
  recipientName = "Sayang",
}: GatekeeperOverlayProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black"
        >
          {/* Background Stars */}
          <div className="absolute inset-0 bg-stars opacity-30" />
          
          {/* Floating Hearts Background - Only render on client */}
          {mounted && (
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              {HEART_POSITIONS.map((heart, i) => (
                <motion.div
                  key={i}
                  initial={{ 
                    opacity: 0, 
                    y: "100vh",
                  }}
                  animate={{ 
                    opacity: [0, 0.6, 0],
                    y: "-100vh",
                  }}
                  transition={{
                    duration: heart.duration,
                    repeat: Infinity,
                    delay: heart.delay,
                    ease: "linear",
                  }}
                  className="absolute text-pink-500/30"
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

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="relative z-10 text-center px-6"
          >
            {/* Greeting Text */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="text-lg md:text-xl text-zinc-400 mb-4"
            >
              Hai {recipientName},
            </motion.p>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.8 }}
              className="text-2xl md:text-4xl font-light text-white mb-2"
              style={{ fontFamily: "var(--font-dancing)" }}
            >
              Ada sesuatu untukmu...
            </motion.h1>

            {/* Heart Icon */}
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.8, duration: 0.5, type: "spring" }}
              className="mt-8 mb-12"
            >
              <Heart 
                className="w-12 h-12 mx-auto text-pink-500 animate-heart-beat" 
                fill="currentColor"
              />
            </motion.div>

            {/* Open Button */}
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 2.2, duration: 0.5 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onOpen}
              className="relative px-10 py-4 text-lg font-semibold text-white rounded-full overflow-hidden animate-pulse-glow"
              style={{
                background: "linear-gradient(135deg, #7C3AED, #EC4899)",
              }}
            >
              <span className="relative z-10 flex items-center gap-2">
                <Heart className="w-5 h-5" />
                Buka Pesan
                <Heart className="w-5 h-5" />
              </span>
              
              {/* Shimmer Effect */}
              <motion.div
                className="absolute inset-0 opacity-30"
                style={{
                  background: "linear-gradient(90deg, transparent, white, transparent)",
                  backgroundSize: "200% 100%",
                }}
                animate={{
                  backgroundPosition: ["200% center", "-200% center"],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />
            </motion.button>

            {/* Hint Text */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 3, duration: 1 }}
              className="mt-6 text-sm text-zinc-500"
            >
              🎵 Pastikan volume-mu aktif ya~
            </motion.p>
          </motion.div>

          {/* Bottom Gradient */}
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-purple-900/20 to-transparent" />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
