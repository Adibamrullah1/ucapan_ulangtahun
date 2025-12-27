"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles } from "lucide-react";
import AnimatedSection from "./ui/AnimatedSection";

interface CakeSectionProps {
  onCandlesBlown?: () => void;
}

interface Candle {
  id: number;
  isLit: boolean;
  showSmoke: boolean;
}

export default function CakeSection({ onCandlesBlown }: CakeSectionProps) {
  const [candles, setCandles] = useState<Candle[]>([
    { id: 1, isLit: true, showSmoke: false },
    { id: 2, isLit: true, showSmoke: false },
    { id: 3, isLit: true, showSmoke: false },
  ]);
  const [allBlown, setAllBlown] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleBlowCandle = (id: number) => {
    setCandles((prev) =>
      prev.map((candle) =>
        candle.id === id && candle.isLit
          ? { ...candle, isLit: false, showSmoke: true }
          : candle
      )
    );

    setTimeout(() => {
      setCandles((prev) =>
        prev.map((candle) =>
          candle.id === id ? { ...candle, showSmoke: false } : candle
        )
      );
    }, 1500);
  };

  useEffect(() => {
    const allOut = candles.every((c) => !c.isLit);
    if (allOut && !allBlown) {
      setAllBlown(true);
      setShowConfetti(true);
      setTimeout(() => {
        onCandlesBlown?.();
      }, 800);
    }
  }, [candles, allBlown, onCandlesBlown]);

  return (
    <section className="section-container relative overflow-hidden py-20">
      {/* Background Glow */}
      <div className="absolute inset-0">
        <motion.div
          animate={{
            opacity: candles.some((c) => c.isLit) ? [0.3, 0.5, 0.3] : 0.15,
          }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute inset-0"
          style={{
            background: "radial-gradient(ellipse at center, rgba(251,191,36,0.3) 0%, rgba(251,146,60,0.15) 40%, transparent 70%)",
          }}
        />
      </div>

      <AnimatedSection className="relative z-10 max-w-4xl mx-auto px-4 text-center">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h2 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-300 bg-clip-text text-transparent mb-4">
            🎂 Make a Wish! 🎂
          </h2>
          <p
            className="text-zinc-400 text-lg"
            style={{ fontFamily: "var(--font-dancing)" }}
          >
            Klik setiap lilin untuk meniupnya~
          </p>
        </motion.div>

        {/* Cake Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 150 }}
          className="relative inline-flex flex-col items-center"
        >
          {/* Candles Row */}
          <div className="flex items-end justify-center gap-6 mb-0 relative z-10">
            {candles.map((candle, index) => (
              <div key={candle.id} className="flex flex-col items-center">
                {/* Flame Container - Clickable */}
                <motion.div
                  onClick={() => handleBlowCandle(candle.id)}
                  whileHover={candle.isLit ? { scale: 1.3 } : {}}
                  whileTap={candle.isLit ? { scale: 0.8 } : {}}
                  className={`relative cursor-pointer mb-1 ${
                    candle.isLit ? "" : "pointer-events-none"
                  }`}
                  style={{ height: "40px", width: "24px" }}
                >
                  {/* Smoke Effect */}
                  <AnimatePresence>
                    {candle.showSmoke && (
                      <motion.div
                        initial={{ opacity: 0.9, y: 0 }}
                        animate={{ opacity: 0, y: -30 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1.2, ease: "easeOut" }}
                        className="absolute -top-6 left-1/2 -translate-x-1/2"
                      >
                        <div className="w-4 h-4 rounded-full bg-zinc-400/60 blur-sm" />
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Flame */}
                  <AnimatePresence>
                    {candle.isLit && (
                      <motion.div
                        initial={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                        className="absolute bottom-0 left-1/2 -translate-x-1/2"
                      >
                        {/* Outer Flame */}
                        <motion.div
                          animate={{
                            scaleY: [1, 1.15, 1, 1.1, 1],
                            scaleX: [1, 0.95, 1, 0.97, 1],
                          }}
                          transition={{
                            duration: 0.4 + index * 0.05,
                            repeat: Infinity,
                            ease: "easeInOut",
                          }}
                          style={{
                            width: "16px",
                            height: "28px",
                            background: "linear-gradient(to top, #ff4500, #ff6b35, #ffbe0b, #fff9c4)",
                            borderRadius: "50% 50% 50% 50% / 60% 60% 40% 40%",
                            boxShadow: "0 0 20px 5px rgba(255,190,11,0.6), 0 0 40px 10px rgba(255,107,53,0.4)",
                          }}
                        />
                        {/* Inner Flame */}
                        <motion.div
                          animate={{
                            scaleY: [1, 1.2, 1],
                          }}
                          transition={{
                            duration: 0.3 + index * 0.03,
                            repeat: Infinity,
                          }}
                          className="absolute bottom-1 left-1/2 -translate-x-1/2"
                          style={{
                            width: "6px",
                            height: "14px",
                            background: "linear-gradient(to top, #00bfff, #87ceeb, #ffffff)",
                            borderRadius: "50% 50% 50% 50% / 60% 60% 40% 40%",
                          }}
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>

                {/* Candle Stick */}
                <div
                  style={{
                    width: "12px",
                    height: "45px",
                    background: index % 2 === 0
                      ? "linear-gradient(90deg, #f8bbd9 0%, #fce4ec 50%, #f8bbd9 100%)"
                      : "linear-gradient(90deg, #81d4fa 0%, #b3e5fc 50%, #81d4fa 100%)",
                    borderRadius: "2px 2px 0 0",
                    boxShadow: "inset -2px 0 4px rgba(0,0,0,0.1)",
                  }}
                >
                  {/* Wick */}
                  <div
                    className="absolute -top-1 left-1/2 -translate-x-1/2"
                    style={{
                      width: "2px",
                      height: "6px",
                      background: "#333",
                      borderRadius: "1px",
                    }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Cake Layers */}
          <div className="flex flex-col items-center">
            {/* Top Tier - Pink */}
            <div className="relative">
              {/* Frosting drips */}
              <div className="absolute -bottom-2 left-0 right-0 flex justify-around px-2">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div
                    key={i}
                    style={{
                      width: "12px",
                      height: `${10 + (i % 3) * 5}px`,
                      background: "linear-gradient(180deg, #f8bbd9 0%, #f48fb1 100%)",
                      borderRadius: "0 0 6px 6px",
                    }}
                  />
                ))}
              </div>
              {/* Tier body */}
              <div
                className="relative rounded-t-lg"
                style={{
                  width: "150px",
                  height: "55px",
                  background: "linear-gradient(180deg, #fff9c4 0%, #ffcc80 50%, #ffb74d 100%)",
                  boxShadow: "inset 0 5px 15px rgba(255,255,255,0.4), inset 0 -5px 15px rgba(0,0,0,0.1)",
                }}
              >
                {/* Decorative dots */}
                <div className="absolute top-4 left-0 right-0 flex justify-center gap-4">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div
                      key={i}
                      className="w-2 h-2 rounded-full bg-pink-400"
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Tier - Bigger */}
            <div className="relative -mt-1">
              {/* Frosting drips */}
              <div className="absolute -bottom-2 left-0 right-0 flex justify-around px-3">
                {[1, 2, 3, 4, 5, 6, 7].map((i) => (
                  <div
                    key={i}
                    style={{
                      width: "12px",
                      height: `${8 + (i % 4) * 4}px`,
                      background: "linear-gradient(180deg, #ce93d8 0%, #ab47bc 100%)",
                      borderRadius: "0 0 6px 6px",
                    }}
                  />
                ))}
              </div>
              {/* Tier body */}
              <div
                className="relative rounded-b-lg"
                style={{
                  width: "220px",
                  height: "70px",
                  background: "linear-gradient(180deg, #ffcc80 0%, #ffb74d 50%, #ff9800 100%)",
                  boxShadow: "inset 0 5px 15px rgba(255,255,255,0.3), inset 0 -8px 20px rgba(0,0,0,0.15), 0 8px 25px rgba(0,0,0,0.25)",
                }}
              >
                {/* Decorative circles */}
                <div className="absolute top-5 left-0 right-0 flex justify-center gap-5">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div
                      key={i}
                      className="w-3 h-3 rounded-full border-2 border-pink-300/70"
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Cake Plate */}
            <div
              className="-mt-1"
              style={{
                width: "260px",
                height: "18px",
                background: "linear-gradient(180deg, #e0e0e0 0%, #bdbdbd 50%, #9e9e9e 100%)",
                borderRadius: "0 0 50% 50% / 0 0 100% 100%",
                boxShadow: "0 5px 15px rgba(0,0,0,0.3)",
              }}
            />
          </div>

          {/* Confetti Effect */}
          <AnimatePresence>
            {showConfetti && (
              <>
                {[...Array(15)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ 
                      opacity: 1, 
                      y: -50, 
                      x: 0,
                    }}
                    animate={{ 
                      opacity: [1, 1, 0],
                      y: [-50, -150, 50],
                      x: (i % 2 === 0 ? 1 : -1) * (30 + i * 8),
                      rotate: [0, 180, 360],
                    }}
                    transition={{ 
                      duration: 2,
                      delay: i * 0.05,
                      ease: "easeOut",
                    }}
                    className="absolute top-0 left-1/2"
                    style={{
                      width: "10px",
                      height: "10px",
                      background: ["#ff6b6b", "#feca57", "#48dbfb", "#ff9ff3", "#54a0ff", "#5f27cd"][i % 6],
                      borderRadius: i % 3 === 0 ? "50%" : "2px",
                    }}
                  />
                ))}
              </>
            )}
          </AnimatePresence>

          {/* Success Message */}
          <AnimatePresence>
            {allBlown && (
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ type: "spring", stiffness: 150, delay: 0.3 }}
                className="mt-8"
              >
                <motion.div 
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="inline-flex items-center gap-3 px-6 py-3 rounded-full"
                  style={{
                    background: "linear-gradient(135deg, rgba(251,191,36,0.25), rgba(236,72,153,0.25))",
                    border: "1px solid rgba(251,191,36,0.4)",
                    boxShadow: "0 0 25px rgba(251,191,36,0.35)",
                  }}
                >
                  <Sparkles className="w-6 h-6 text-amber-400" />
                  <span 
                    className="text-xl md:text-2xl text-amber-300"
                    style={{ fontFamily: "var(--font-dancing)" }}
                  >
                    🎉 Semoga Harapanmu Terkabul! 🎉
                  </span>
                  <Sparkles className="w-6 h-6 text-amber-400" />
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Instructions */}
          {!allBlown && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-8"
            >
              <motion.p
                animate={{ opacity: [0.6, 1, 0.6] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-zinc-400 text-sm flex items-center justify-center gap-2"
              >
                <span className="text-lg">💨</span>
                <span>Klik api lilin untuk meniupnya</span>
                <span className="px-2 py-1 bg-pink-500/20 rounded-full text-pink-400 text-xs ml-2">
                  {candles.filter(c => c.isLit).length} tersisa
                </span>
              </motion.p>
            </motion.div>
          )}
        </motion.div>

        {/* Floating Decorations */}
        {mounted && (
          <>
            <motion.div
              animate={{ y: [0, -20, 0], rotate: [0, 10, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute left-8 top-1/4 text-4xl opacity-50"
            >
              🎈
            </motion.div>
            <motion.div
              animate={{ y: [0, -15, 0], rotate: [0, -10, 0] }}
              transition={{ duration: 3.5, repeat: Infinity, delay: 0.5 }}
              className="absolute right-8 top-1/3 text-4xl opacity-50"
            >
              🎈
            </motion.div>
            <motion.div
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 3, repeat: Infinity, delay: 1 }}
              className="absolute left-1/4 bottom-1/4 text-3xl opacity-40"
            >
              🎀
            </motion.div>
            <motion.div
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 3.8, repeat: Infinity, delay: 0.8 }}
              className="absolute right-1/4 bottom-1/3 text-3xl opacity-40"
            >
              🎊
            </motion.div>
          </>
        )}
      </AnimatedSection>
    </section>
  );
}
