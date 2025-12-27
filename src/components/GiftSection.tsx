"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Sparkles, Gift } from "lucide-react";
import AnimatedSection from "./ui/AnimatedSection";

interface GiftSectionProps {
  specialPhotos?: number[];
  onGiftOpened?: () => void;
}

export default function GiftSection({ specialPhotos = [7, 8, 9, 10], onGiftOpened }: GiftSectionProps) {
  const [isOpened, setIsOpened] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [showParticles, setShowParticles] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleOpenGift = () => {
    if (isOpened) return;
    setIsOpened(true);
    setShowParticles(true);
    setTimeout(() => {
      onGiftOpened?.();
    }, 1000);
  };

  return (
    <section className="section-container relative overflow-hidden py-24">
      {/* Background Glow */}
      <div className="absolute inset-0">
        <div 
          className="absolute inset-0"
          style={{
            background: "radial-gradient(ellipse at center, rgba(168,85,247,0.15) 0%, rgba(236,72,153,0.1) 40%, transparent 70%)",
          }}
        />
        {/* Floating orbs */}
        {mounted && (
          <>
            <motion.div
              animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
              transition={{ duration: 15, repeat: Infinity }}
              className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl"
            />
            <motion.div
              animate={{ x: [0, -20, 0], y: [0, 30, 0] }}
              transition={{ duration: 18, repeat: Infinity }}
              className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-pink-500/10 rounded-full blur-3xl"
            />
          </>
        )}
      </div>

      <AnimatedSection className="relative z-10 max-w-4xl mx-auto px-4 text-center">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <div className="inline-flex items-center gap-3 mb-4">
            <motion.div animate={{ rotate: [0, -10, 0, 10, 0] }} transition={{ duration: 2, repeat: Infinity }}>
              <Gift className="w-10 h-10 text-purple-400" />
            </motion.div>
            <h2 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-rose-400 bg-clip-text text-transparent">
              Kado Spesial
            </h2>
            <motion.div animate={{ rotate: [0, 10, 0, -10, 0] }} transition={{ duration: 2, repeat: Infinity }}>
              <Gift className="w-10 h-10 text-purple-400" />
            </motion.div>
          </div>
          <p
            className="text-zinc-400 text-xl"
            style={{ fontFamily: "var(--font-dancing)" }}
          >
            {isOpened ? "🎉 Tadaaa! Foto-foto spesial untukmu! 🎉" : "✨ Klik kotak kado untuk membukanya~ ✨"}
          </p>
        </motion.div>

        {/* Gift Box Container */}
        <div className="relative inline-block" style={{ minHeight: isOpened ? "500px" : "300px" }}>
          {/* Glow Effect */}
          <motion.div
            animate={{
              opacity: isOpened ? 0.1 : [0.3, 0.6, 0.3],
              scale: isOpened ? 0.5 : [1, 1.1, 1],
            }}
            transition={{ duration: 2, repeat: isOpened ? 0 : Infinity }}
            className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-72 h-20 rounded-full blur-2xl"
            style={{
              background: "radial-gradient(ellipse, rgba(168,85,247,0.6), rgba(236,72,153,0.4), transparent)",
            }}
          />

          {/* Gift Box Wrapper */}
          <motion.div
            className="relative cursor-pointer"
            animate={
              isHovered && !isOpened
                ? {
                    rotate: [-3, 3, -3],
                    scale: 1.05,
                  }
                : isOpened 
                ? { scale: 0.8, y: 50, opacity: 0.5 }
                : { rotate: 0, scale: 1 }
            }
            transition={{
              duration: 0.4,
              repeat: isHovered && !isOpened ? Infinity : 0,
            }}
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
            onClick={handleOpenGift}
          >
            {/* Ribbon Bow - On top */}
            <div className="relative z-20 flex justify-center mb-0">
              <motion.div
                animate={isOpened ? { y: -80, opacity: 0, scale: 0.3, rotate: 180 } : {}}
                transition={{ type: "spring", stiffness: 150 }}
                className="relative"
                style={{ marginBottom: "-15px" }}
              >
                {/* Left Bow Loop */}
                <div
                  className="absolute"
                  style={{
                    width: "55px",
                    height: "40px",
                    background: "linear-gradient(135deg, #f472b6 0%, #ec4899 100%)",
                    borderRadius: "50% 50% 50% 50% / 60% 60% 40% 40%",
                    transform: "rotate(-35deg) translateX(-25px)",
                    boxShadow: "inset -4px -4px 12px rgba(0,0,0,0.2), 0 4px 10px rgba(0,0,0,0.2)",
                  }}
                />
                {/* Right Bow Loop */}
                <div
                  className="absolute"
                  style={{
                    width: "55px",
                    height: "40px",
                    background: "linear-gradient(135deg, #ec4899 0%, #f472b6 100%)",
                    borderRadius: "50% 50% 50% 50% / 60% 60% 40% 40%",
                    transform: "rotate(35deg) translateX(25px)",
                    boxShadow: "inset 4px -4px 12px rgba(0,0,0,0.2), 0 4px 10px rgba(0,0,0,0.2)",
                  }}
                />
                {/* Center Knot */}
                <div
                  className="absolute left-1/2 -translate-x-1/2 top-4"
                  style={{
                    width: "30px",
                    height: "30px",
                    background: "linear-gradient(135deg, #db2777 0%, #ec4899 100%)",
                    borderRadius: "50%",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.3), inset 0 2px 4px rgba(255,255,255,0.2)",
                  }}
                />
                {/* Ribbon Tails */}
                <div
                  className="absolute top-6 left-1/2"
                  style={{
                    width: "16px",
                    height: "45px",
                    background: "linear-gradient(180deg, #ec4899 0%, #be185d 100%)",
                    borderRadius: "0 0 8px 8px",
                    transform: "translateX(-22px) rotate(-15deg)",
                  }}
                />
                <div
                  className="absolute top-6 left-1/2"
                  style={{
                    width: "16px",
                    height: "50px",
                    background: "linear-gradient(180deg, #f472b6 0%, #be185d 100%)",
                    borderRadius: "0 0 8px 8px",
                    transform: "translateX(6px) rotate(15deg)",
                  }}
                />
              </motion.div>
            </div>

            {/* Box Lid */}
            <motion.div
              animate={isOpened ? { rotateX: -130, y: -50, originY: 1 } : {}}
              transition={{ type: "spring", stiffness: 80, damping: 12 }}
              className="relative z-10"
              style={{
                width: "220px",
                height: "50px",
                background: "linear-gradient(180deg, #a855f7 0%, #9333ea 50%, #7c3aed 100%)",
                borderRadius: "12px 12px 0 0",
                boxShadow: "0 -4px 20px rgba(168,85,247,0.4), inset 0 2px 4px rgba(255,255,255,0.1)",
                transformOrigin: "bottom center",
              }}
            >
              {/* Lid Ribbon */}
              <div
                className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0"
                style={{
                  width: "45px",
                  background: "linear-gradient(90deg, #ec4899 0%, #f472b6 50%, #ec4899 100%)",
                  boxShadow: "inset 0 0 8px rgba(0,0,0,0.15)",
                }}
              />
              {/* Shimmer on lid */}
              <motion.div
                animate={{ x: ["-100%", "200%"] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                className="absolute inset-0 overflow-hidden rounded-t-xl"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform skew-x-12" />
              </motion.div>
            </motion.div>

            {/* Box Body */}
            <div
              className="relative z-0"
              style={{
                width: "220px",
                height: "160px",
                background: "linear-gradient(180deg, #9333ea 0%, #7c3aed 50%, #6d28d9 100%)",
                borderRadius: "0 0 12px 12px",
                boxShadow: "0 15px 40px rgba(124,58,237,0.5), inset 0 0 25px rgba(0,0,0,0.2)",
              }}
            >
              {/* Shimmer effect */}
              <motion.div
                animate={{ x: ["-100%", "200%"] }}
                transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
                className="absolute inset-0 overflow-hidden rounded-b-xl"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent transform skew-x-12" />
              </motion.div>

              {/* Vertical Ribbon */}
              <div
                className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0"
                style={{
                  width: "45px",
                  background: "linear-gradient(90deg, #ec4899 0%, #f472b6 50%, #ec4899 100%)",
                  boxShadow: "inset 0 0 12px rgba(0,0,0,0.15)",
                }}
              />
              {/* Horizontal Ribbon */}
              <div
                className="absolute top-1/2 -translate-y-1/2 left-0 right-0"
                style={{
                  height: "45px",
                  background: "linear-gradient(180deg, #ec4899 0%, #f472b6 50%, #ec4899 100%)",
                  boxShadow: "inset 0 0 12px rgba(0,0,0,0.15)",
                }}
              />
              {/* Center Diamond */}
              <motion.div 
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14"
                style={{
                  background: "linear-gradient(135deg, #fbbf24, #f59e0b, #fbbf24)",
                  borderRadius: "4px",
                  transform: "translate(-50%, -50%) rotate(45deg)",
                  boxShadow: "0 0 25px rgba(251,191,36,0.6), inset 0 0 10px rgba(255,255,255,0.3)",
                }}
              />
            </div>
          </motion.div>

          {/* Particle Explosion */}
          <AnimatePresence>
            {showParticles && (
              <>
                {[...Array(25)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 1, x: 0, y: 0 }}
                    animate={{ 
                      opacity: [1, 1, 0],
                      x: (Math.random() - 0.5) * 300,
                      y: [-30, -120 - Math.random() * 100, 50],
                      rotate: [0, Math.random() * 720],
                    }}
                    transition={{ 
                      duration: 2,
                      delay: i * 0.03,
                      ease: "easeOut",
                    }}
                    className="absolute top-1/3 left-1/2"
                    style={{
                      width: i % 3 === 0 ? "14px" : "10px",
                      height: i % 3 === 0 ? "14px" : "10px",
                      background: ["#f472b6", "#a855f7", "#fbbf24", "#22d3ee", "#34d399", "#fb7185", "#c084fc"][i % 7],
                      borderRadius: i % 3 === 0 ? "50%" : "3px",
                    }}
                  />
                ))}
                {/* Star burst */}
                {[...Array(8)].map((_, i) => (
                  <motion.div
                    key={`star-${i}`}
                    initial={{ opacity: 1, scale: 0 }}
                    animate={{ 
                      opacity: [1, 0],
                      scale: [0, 1.5],
                      rotate: [0, 180],
                    }}
                    transition={{ duration: 0.8, delay: 0.2 + i * 0.05 }}
                    className="absolute top-1/3 left-1/2 -translate-x-1/2"
                    style={{
                      transformOrigin: "center",
                    }}
                  >
                    <Sparkles className="w-6 h-6 text-amber-400" />
                  </motion.div>
                ))}
              </>
            )}
          </AnimatePresence>

          {/* Revealed Photos - Special Gallery */}
          <AnimatePresence>
            {isOpened && (
              <motion.div
                initial={{ opacity: 0, y: 80, scale: 0.5 }}
                animate={{ opacity: 1, y: -20, scale: 1 }}
                transition={{
                  delay: 0.6,
                  type: "spring",
                  stiffness: 100,
                  damping: 12,
                }}
                className="absolute top-0 left-1/2 -translate-x-1/2"
                style={{ width: "340px", zIndex: 50 }}
              >
                <motion.div
                  animate={{
                    boxShadow: [
                      "0 0 30px rgba(236,72,153,0.4), 0 0 60px rgba(168,85,247,0.3)",
                      "0 0 50px rgba(236,72,153,0.6), 0 0 80px rgba(168,85,247,0.4)",
                      "0 0 30px rgba(236,72,153,0.4), 0 0 60px rgba(168,85,247,0.3)",
                    ],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="relative rounded-3xl p-5 border border-pink-400/40"
                  style={{
                    background: "linear-gradient(145deg, rgba(20,15,30,0.95), rgba(30,20,40,0.95))",
                    backdropFilter: "blur(20px)",
                  }}
                >
                  {/* Header */}
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                    className="text-center mb-4"
                  >
                    <motion.div
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      <Heart
                        className="w-10 h-10 mx-auto text-pink-500 mb-2"
                        fill="currentColor"
                        style={{ filter: "drop-shadow(0 0 12px rgba(236,72,153,0.6))" }}
                      />
                    </motion.div>
                    <p 
                      className="text-xl text-pink-400"
                      style={{ fontFamily: "var(--font-dancing)" }}
                    >
                      Foto-foto Paling Spesial 💕
                    </p>
                  </motion.div>

                  {/* Photo Grid */}
                  <div className="grid grid-cols-2 gap-3">
                    {specialPhotos.map((num, i) => (
                      <motion.div
                        key={num}
                        initial={{ opacity: 0, scale: 0, rotate: -10 }}
                        animate={{ opacity: 1, scale: 1, rotate: 0 }}
                        transition={{ 
                          delay: 1 + i * 0.15,
                          type: "spring",
                          stiffness: 200
                        }}
                        whileHover={{ scale: 1.08, rotate: 2, zIndex: 10 }}
                        className="relative overflow-hidden rounded-xl cursor-pointer group"
                        style={{
                          boxShadow: "0 8px 20px rgba(0,0,0,0.3)",
                        }}
                      >
                        <img
                          src={`/assets/${num}.jpeg`}
                          alt={`Special ${num}`}
                          className="w-full h-36 object-cover transition-transform duration-300 group-hover:scale-110"
                        />
                        {/* Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                        {/* Heart badge */}
                        <motion.div
                          initial={{ scale: 0 }}
                          whileHover={{ scale: 1 }}
                          className="absolute bottom-2 right-2 w-8 h-8 rounded-full bg-pink-500/80 flex items-center justify-center"
                        >
                          <Heart className="w-4 h-4 text-white" fill="currentColor" />
                        </motion.div>
                        {/* Glowing border */}
                        <div 
                          className="absolute inset-0 rounded-xl pointer-events-none"
                          style={{
                            border: "2px solid rgba(236,72,153,0.4)",
                            boxShadow: "inset 0 0 15px rgba(236,72,153,0.1)",
                          }}
                        />
                      </motion.div>
                    ))}
                  </div>

                  {/* Bottom Message */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.8 }}
                    className="mt-4 text-center"
                  >
                    <div
                      className="inline-flex items-center gap-2 px-5 py-2 rounded-full"
                      style={{
                        background: "linear-gradient(135deg, rgba(236,72,153,0.25), rgba(168,85,247,0.25))",
                        border: "1px solid rgba(236,72,153,0.3)",
                      }}
                    >
                      <Sparkles className="w-4 h-4 text-amber-400" />
                      <span 
                        className="text-lg text-pink-300"
                        style={{ fontFamily: "var(--font-dancing)" }}
                      >
                        Kenangan Terindah Kita
                      </span>
                      <Sparkles className="w-4 h-4 text-amber-400" />
                    </div>
                  </motion.div>

                  {/* Corner Sparkles */}
                  {[
                    { top: "-8px", left: "-8px" },
                    { top: "-8px", right: "-8px" },
                    { bottom: "-8px", left: "-8px" },
                    { bottom: "-8px", right: "-8px" },
                  ].map((pos, i) => (
                    <motion.div
                      key={i}
                      animate={{
                        opacity: [0.4, 1, 0.4],
                        scale: [0.8, 1.3, 0.8],
                        rotate: [0, 180, 360],
                      }}
                      transition={{
                        duration: 2.5,
                        repeat: Infinity,
                        delay: i * 0.3,
                      }}
                      className="absolute"
                      style={pos}
                    >
                      <Sparkles className="w-5 h-5 text-amber-400" />
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Click Hint */}
          {!isOpened && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mt-8"
            >
              <motion.p
                animate={{ 
                  opacity: [0.5, 1, 0.5],
                  y: [0, -5, 0],
                }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-zinc-400 text-base flex items-center justify-center gap-2"
              >
                <span className="text-xl">👆</span>
                <span>Klik untuk membuka hadiah</span>
                <span className="text-xl">✨</span>
              </motion.p>
            </motion.div>
          )}
        </div>

        {/* Floating Decorations */}
        {mounted && (
          <>
            <motion.div
              animate={{ y: [0, -25, 0], rotate: [0, 15, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute left-8 top-1/4 text-5xl opacity-50"
            >
              🎁
            </motion.div>
            <motion.div
              animate={{ y: [0, -20, 0], rotate: [0, -15, 0] }}
              transition={{ duration: 3.5, repeat: Infinity, delay: 0.5 }}
              className="absolute right-8 top-1/3 text-5xl opacity-50"
            >
              💝
            </motion.div>
            <motion.div
              animate={{ y: [0, -15, 0], scale: [1, 1.2, 1] }}
              transition={{ duration: 3, repeat: Infinity, delay: 1 }}
              className="absolute left-1/4 bottom-20 text-4xl opacity-40"
            >
              🎀
            </motion.div>
            <motion.div
              animate={{ y: [0, -18, 0], rotate: [0, 360] }}
              transition={{ duration: 6, repeat: Infinity, delay: 0.8 }}
              className="absolute right-1/4 bottom-16 text-4xl opacity-40"
            >
              ✨
            </motion.div>
          </>
        )}
      </AnimatedSection>
    </section>
  );
}
