"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";
import {
  Heart,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Sparkles,
  Camera,
  Gift,
  PenLine,
} from "lucide-react";

// Import separate components
import CakeSectionComponent from "@/components/CakeSection";
import GiftSectionComponent from "@/components/GiftSection";
import CountdownSection from "@/components/CountdownSection";

// ============================================================
// 📝 CONFIGURATION - Edit these values!
// ============================================================
const CONFIG = {
  recipientName: "Sayang",
  musicPath: "/audio/all-music_tulus-teman-hidup-mp3-3-46-mb.mp3",
  imageExtension: ".jpeg", // Change to .jpg if your files are .jpg
  totalPhotos: 23,
  specialPhotos: [7, 8, 9, 10], // Photos hidden in gift box
  birthdayDate: new Date(2025, 11, 28), // 28 Desember 2025
};

// ============================================================
// 💌 MEMO CONTENT - Your heartfelt letter goes here!
// ============================================================
const MEMO_CONTENT = [
  "Untuk kamu yang paling spesial di hatiku,",
  
  "Selamat ulang tahun, sayangku! Di hari yang indah ini, aku ingin kamu tahu betapa bersyukurnya aku bisa mengenalmu dan menjadi bagian dari hidupmu.",
  
  "Setiap hari bersamamu adalah hadiah terindah yang pernah aku terima. Senyummu yang hangat, tawamu yang riang, dan kehadiranmu yang selalu menenangkan hatiku.",
  
  "Kamu adalah alasan di balik senyumku setiap pagi, dan bintang yang paling terang di langit malamku. Terima kasih sudah menjadi teman, sahabat, dan cintaku.",
  
  "Di hari ulang tahunmu ini, aku mendoakan yang terbaik untukmu. Semoga semua impianmu terwujud, semoga kebahagiaan selalu menyertaimu, dan semoga kita bisa terus bersama selamanya.",
  
  "Aku berjanji akan selalu ada untukmu, di saat senang maupun susah. Akan selalu menjagamu, mencintaimu, dan membuatmu tersenyum setiap hari.",
  
  "Happy Birthday, my love. Semoga tahun ini membawa lebih banyak kebahagiaan, lebih banyak petualangan bersama, dan lebih banyak kenangan indah untuk kita.",
  
  "Dengan segenap cinta,",
  "— Dari seseorang yang sangat mencintaimu 💕"
];

// ============================================================
// MAIN PAGE COMPONENT
// ============================================================
export default function BirthdayPage() {
  // Photo arrays using useMemo
  const { galleryPhotos, specialPhotos } = useMemo(() => {
    const allPhotos = Array.from({ length: CONFIG.totalPhotos }, (_, i) => i + 1);
    const special = CONFIG.specialPhotos;
    const gallery = allPhotos.filter((num) => !special.includes(num));
    return { galleryPhotos: gallery, specialPhotos: special };
  }, []);

  // State
  const [showOverlay, setShowOverlay] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [candlesBlown, setCandlesBlown] = useState(false);
  const [giftOpened, setGiftOpened] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [mounted, setMounted] = useState(false);

  const audioRef = useRef<HTMLAudioElement>(null);
  const { width, height } = useWindowSize();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Handle opening
  const handleOpen = () => {
    setShowOverlay(false);
    if (audioRef.current) {
      audioRef.current.volume = 0.5;
      audioRef.current.play().catch(console.log);
      setIsPlaying(true);
    }
  };

  // Audio controls
  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  // Cake blown handler
  const handleCandlesBlown = () => {
    setCandlesBlown(true);
  };

  // Gift opened handler
  const handleGiftOpened = () => {
    setGiftOpened(true);
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 8000);
  };

  return (
    <main className="relative bg-[#050508] min-h-screen overflow-x-hidden text-white">
      {/* Noise Texture Overlay */}
      <div className="noise-overlay" />

      {/* Stars Background */}
      <div className="fixed inset-0 bg-stars opacity-40 pointer-events-none z-0" />

      {/* Audio */}
      {mounted && (
        <audio ref={audioRef} src={CONFIG.musicPath} loop preload="auto" />
      )}

      {/* Confetti */}
      {showConfetti && mounted && (
        <Confetti
          width={width}
          height={height}
          numberOfPieces={400}
          colors={["#7C3AED", "#EC4899", "#F59E0B", "#A78BFA", "#F472B6", "#FDE68A"]}
          recycle={false}
          gravity={0.15}
        />
      )}

      {/* Gatekeeper Overlay */}
      <GatekeeperOverlay
        isVisible={showOverlay}
        onOpen={handleOpen}
        recipientName={CONFIG.recipientName}
      />

      {/* Music Player */}
      {!showOverlay && (
        <MusicPlayer
          isPlaying={isPlaying}
          isMuted={isMuted}
          onTogglePlay={togglePlay}
          onToggleMute={toggleMute}
        />
      )}

      {/* Content */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: showOverlay ? 0 : 1 }}
        transition={{ duration: 1.2 }}
        className="relative z-10"
      >
        {/* Section 1: Countdown - Hitung Mundur */}
        <CountdownSection targetDate={CONFIG.birthdayDate} />

        {/* Divider */}
        <SectionDivider icon="🎂" />

        {/* Section 2: Hero - Ucapan Happy Birthday */}
        <HeroSection recipientName={CONFIG.recipientName} />

        {/* Divider */}
        <SectionDivider icon="📸" />

        {/* Section 3: Memory Lane Gallery */}
        <GallerySection photos={galleryPhotos} />

        {/* Divider */}
        <SectionDivider icon="💌" />

        {/* Section 4: Heartfelt Memo - Surat Cinta */}
        <MemoSection />

        {/* Divider */}
        <SectionDivider icon="🕯️" />

        {/* Section 5: CSS Cake - Tiup Lilin */}
        <CakeSectionComponent onCandlesBlown={handleCandlesBlown} />

        {/* Section 6: Gift Box - Kado Spesial */}
        <AnimatePresence>
          {candlesBlown && (
            <>
              {/* Divider */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <SectionDivider icon="🎁" />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 80 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, type: "spring", stiffness: 80 }}
              >
                <GiftSectionComponent specialPhotos={specialPhotos} onGiftOpened={handleGiftOpened} />
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* Finale */}
        {giftOpened && (
          <>
            <SectionDivider icon="💕" />
            <FinaleSection />
          </>
        )}
      </motion.div>

      {/* Premium Floating Gradient Orbs */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <motion.div
          animate={{ x: [0, 50, 0], y: [0, -30, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-[10%] left-[15%] w-[500px] h-[500px] bg-purple-600/8 rounded-full blur-[150px]"
        />
        <motion.div
          animate={{ x: [0, -40, 0], y: [0, 40, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-[20%] right-[10%] w-[600px] h-[600px] bg-pink-600/8 rounded-full blur-[150px]"
        />
        <motion.div
          animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
          className="absolute top-[60%] left-[50%] w-[400px] h-[400px] bg-amber-500/5 rounded-full blur-[120px]"
        />
      </div>
    </main>
  );
}

// ============================================================
// SECTION DIVIDER COMPONENT
// ============================================================
function SectionDivider({ icon }: { icon: string }) {
  return (
    <div className="section-divider">
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ type: "spring", stiffness: 200 }}
        className="section-divider-icon"
      >
        <motion.span
          animate={{ 
            y: [0, -3, 0],
            rotate: [-5, 5, -5]
          }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-xl"
        >
          {icon}
        </motion.span>
      </motion.div>
    </div>
  );
}

// ============================================================
// GATEKEEPER OVERLAY
// ============================================================
function GatekeeperOverlay({
  isVisible,
  onOpen,
  recipientName,
}: {
  isVisible: boolean;
  onOpen: () => void;
  recipientName: string;
}) {
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
          transition={{ duration: 1.5 }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black"
        >
          {/* Floating hearts */}
          {mounted && (
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              {[10, 25, 40, 55, 70, 85].map((x, i) => (
                <motion.div
                  key={i}
                  initial={{ y: "100vh", opacity: 0 }}
                  animate={{ y: "-100vh", opacity: [0, 0.6, 0] }}
                  transition={{
                    duration: 8 + i,
                    repeat: Infinity,
                    delay: i * 0.5,
                  }}
                  className="absolute text-pink-500/30"
                  style={{ left: `${x}%`, fontSize: `${16 + i * 2}px` }}
                >
                  ❤
                </motion.div>
              ))}
            </div>
          )}

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-center px-6 z-10"
          >
            <p className="text-lg text-zinc-400 mb-4">Hai {recipientName},</p>
            <h1
              className="text-3xl md:text-4xl font-light mb-8"
              style={{ fontFamily: "var(--font-dancing)" }}
            >
              Ada sesuatu untukmu...
            </h1>

            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 1, type: "spring" }}
              className="mb-12"
            >
              <Heart className="w-12 h-12 mx-auto text-pink-500 animate-pulse" fill="currentColor" />
            </motion.div>

            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onOpen}
              className="px-10 py-4 text-lg font-semibold rounded-full"
              style={{
                background: "linear-gradient(135deg, #7C3AED, #EC4899)",
                boxShadow: "0 0 30px rgba(124, 58, 237, 0.5)",
              }}
            >
              <span className="flex items-center gap-2">
                <Heart className="w-5 h-5" />
                Buka Undangan
                <Heart className="w-5 h-5" />
              </span>
            </motion.button>

            <p className="mt-6 text-sm text-zinc-500">🎵 Nyalakan volume~</p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ============================================================
// MUSIC PLAYER
// ============================================================
function MusicPlayer({
  isPlaying,
  isMuted,
  onTogglePlay,
  onToggleMute,
}: {
  isPlaying: boolean;
  isMuted: boolean;
  onTogglePlay: () => void;
  onToggleMute: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 1 }}
      className="fixed bottom-6 right-6 z-40 flex items-center gap-3 p-3 rounded-2xl backdrop-blur-xl"
      style={{ background: "rgba(20, 20, 30, 0.8)", border: "1px solid rgba(255,255,255,0.1)" }}
    >
      {/* Audio bars */}
      <div className="flex items-end gap-[3px] h-8 px-2">
        {[1, 2, 3, 4, 5].map((bar) => (
          <motion.div
            key={bar}
            animate={isPlaying ? { height: ["10px", "25px", "10px"] } : { height: "10px" }}
            transition={{ duration: 0.5 + bar * 0.1, repeat: Infinity }}
            className="w-[3px] rounded-full bg-gradient-to-t from-purple-600 to-pink-500"
          />
        ))}
      </div>

      <button
        onClick={onTogglePlay}
        className="w-10 h-10 rounded-full flex items-center justify-center"
        style={{ background: "linear-gradient(135deg, #7C3AED, #EC4899)" }}
      >
        {isPlaying ? (
          <Pause className="w-5 h-5 text-white" fill="white" />
        ) : (
          <Play className="w-5 h-5 text-white ml-0.5" fill="white" />
        )}
      </button>

      <button
        onClick={onToggleMute}
        className="w-8 h-8 rounded-full flex items-center justify-center bg-white/10 hover:bg-white/20"
      >
        {isMuted ? (
          <VolumeX className="w-4 h-4 text-zinc-400" />
        ) : (
          <Volume2 className="w-4 h-4 text-white" />
        )}
      </button>
    </motion.div>
  );
}

// ============================================================
// HERO SECTION (Premium)
// ============================================================
function HeroSection({ recipientName }: { recipientName: string }) {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-4 relative overflow-hidden">
      {/* Decorative Background Ring */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] md:w-[800px] md:h-[800px] opacity-20 pointer-events-none">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          className="w-full h-full rounded-full border border-purple-500/20"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
          className="absolute inset-12 rounded-full border border-pink-500/20"
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className="text-center relative z-10"
      >
        {/* Decorative Line with Heart */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, type: "spring", stiffness: 120 }}
          className="flex items-center justify-center gap-4 mb-8"
        >
          <div className="h-[2px] w-20 md:w-40 bg-gradient-to-r from-transparent via-pink-500/50 to-pink-500" />
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <Heart className="w-8 h-8 text-pink-500 drop-shadow-[0_0_15px_rgba(236,72,153,0.5)]" fill="currentColor" />
          </motion.div>
          <div className="h-[2px] w-20 md:w-40 bg-gradient-to-l from-transparent via-pink-500/50 to-pink-500" />
        </motion.div>

        {/* Main Title with Shimmer */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="text-5xl md:text-7xl lg:text-8xl font-extrabold mb-4 tracking-tight"
        >
          <span className="gradient-text-shimmer">
            Happy Birthday
          </span>
        </motion.h1>

        {/* Recipient Name */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="text-4xl md:text-6xl mb-10 relative inline-block"
          style={{ fontFamily: "var(--font-dancing)" }}
        >
          <span className="text-pink-400 drop-shadow-[0_0_30px_rgba(236,72,153,0.4)]">
            {recipientName}!
          </span>
          {/* Sparkle decorations */}
          <motion.span
            animate={{ opacity: [0, 1, 0], scale: [0.5, 1.2, 0.5] }}
            transition={{ duration: 2, repeat: Infinity, delay: 0.2 }}
            className="absolute -top-4 -right-6 text-amber-400"
          >
            ✦
          </motion.span>
          <motion.span
            animate={{ opacity: [0, 1, 0], scale: [0.5, 1.2, 0.5] }}
            transition={{ duration: 2, repeat: Infinity, delay: 1 }}
            className="absolute -bottom-2 -left-4 text-pink-400"
          >
            ✦
          </motion.span>
        </motion.h2>

        {/* Emoji Row */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1, type: "spring", stiffness: 150 }}
          className="flex items-center justify-center gap-4 text-5xl md:text-6xl mb-10"
        >
          <motion.span animate={{ y: [0, -10, 0] }} transition={{ duration: 2, repeat: Infinity, delay: 0 }}>🎂</motion.span>
          <motion.span animate={{ y: [0, -10, 0], rotate: [0, 10, -10, 0] }} transition={{ duration: 2.5, repeat: Infinity, delay: 0.3 }}>✨</motion.span>
          <motion.span animate={{ y: [0, -10, 0] }} transition={{ duration: 2, repeat: Infinity, delay: 0.6 }}>🎈</motion.span>
        </motion.div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="text-lg md:text-xl text-zinc-400 max-w-xl mx-auto leading-relaxed"
        >
          Welcome to your <span className="text-pink-400">special</span> universe 💫
        </motion.p>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="mt-20"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            className="flex flex-col items-center gap-2"
          >
            <p className="text-sm text-zinc-500 tracking-wider">SCROLL</p>
            <div className="w-[2px] h-8 bg-gradient-to-b from-zinc-500 to-transparent rounded-full" />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}

// ============================================================
// GALLERY SECTION (Premium)
// ============================================================
function GallerySection({ photos }: { photos: number[] }) {
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  return (
    <section className="py-24 px-4 relative">
      {/* Section Divider Top */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent to-purple-900/5" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="flex items-center justify-center gap-4 mb-6"
        >
          <div className="h-[1px] w-12 md:w-24 bg-gradient-to-r from-transparent to-pink-500/50" />
          <Camera className="w-7 h-7 text-pink-400" />
          <h2 className="text-3xl md:text-5xl font-bold gradient-text">
            Memory Lane
          </h2>
          <Camera className="w-7 h-7 text-pink-400" />
          <div className="h-[1px] w-12 md:w-24 bg-gradient-to-l from-transparent to-pink-500/50" />
        </motion.div>
        <p className="text-zinc-400 text-lg" style={{ fontFamily: "var(--font-dancing)" }}>
          Momen-momen indah yang kita ukir bersama 💕
        </p>
      </motion.div>

      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {photos.map((num, index) => (
          <motion.div
            key={num}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: index * 0.03, duration: 0.5 }}
            onMouseEnter={() => setHoveredId(num)}
            onMouseLeave={() => setHoveredId(null)}
            className="photo-card aspect-square cursor-pointer group"
          >
            <motion.img
              src={`/assets/${num}.jpeg`}
              alt={`Memory ${num}`}
              className="w-full h-full object-cover"
              whileHover={{ scale: 1.08 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            />
            {/* Hover Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: hoveredId === num ? 1 : 0 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"
            />
            {/* Heart Badge */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ 
                opacity: hoveredId === num ? 1 : 0,
                y: hoveredId === num ? 0 : 10 
              }}
              transition={{ duration: 0.3 }}
              className="absolute bottom-3 left-3 flex items-center gap-2"
            >
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/50 backdrop-blur-sm border border-white/10">
                <Heart className="w-4 h-4 text-pink-400" fill="currentColor" />
                <span className="text-sm text-white font-medium">#{num}</span>
              </div>
            </motion.div>
            {/* Glow Border on Hover */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: hoveredId === num ? 1 : 0 }}
              className="absolute inset-0 rounded-xl border-2 border-pink-500/40 pointer-events-none"
              style={{ boxShadow: "inset 0 0 30px rgba(236, 72, 153, 0.1)" }}
            />
          </motion.div>
        ))}
      </div>

      {/* Bottom Decoration */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="flex justify-center mt-12 gap-3"
      >
        {["💕", "📸", "✨", "📸", "💕"].map((emoji, i) => (
          <motion.span
            key={i}
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 2, repeat: Infinity, delay: i * 0.15 }}
            className="text-2xl opacity-60"
          >
            {emoji}
          </motion.span>
        ))}
      </motion.div>
    </section>
  );
}

// ============================================================
// MEMO SECTION (Heartfelt Letter) - Premium Redesign
// ============================================================
function MemoSection() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section className="py-24 px-4 relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-radial" />
        <motion.div
          animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
          transition={{ duration: 20, repeat: Infinity }}
          className="absolute top-1/3 left-1/4 w-96 h-96 bg-pink-500/10 rounded-full blur-[100px]"
        />
        <motion.div
          animate={{ x: [0, -30, 0], y: [0, 20, 0] }}
          transition={{ duration: 25, repeat: Infinity }}
          className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-purple-500/10 rounded-full blur-[100px]"
        />
      </div>

      {/* Floating Hearts Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ y: "100vh", opacity: 0 }}
            animate={{ y: "-100vh", opacity: [0, 0.4, 0] }}
            transition={{
              duration: 12 + i * 2,
              repeat: Infinity,
              delay: i * 1.5,
            }}
            className="absolute text-pink-500/30"
            style={{ left: `${10 + i * 12}%`, fontSize: `${14 + i * 2}px` }}
          >
            ❤
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="relative z-10 max-w-3xl mx-auto w-full"
      >
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <motion.div 
            className="flex items-center justify-center gap-4 mb-6"
          >
            <motion.div
              animate={{ rotate: [-5, 5, -5] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <PenLine className="w-8 h-8 text-pink-400" />
            </motion.div>
            <h2 className="text-4xl md:text-5xl font-bold">
              <span className="bg-gradient-to-r from-pink-400 via-rose-400 to-purple-400 bg-clip-text text-transparent">
                Surat Cinta
              </span>
            </h2>
            <motion.div
              animate={{ rotate: [5, -5, 5] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Heart className="w-8 h-8 text-pink-400" fill="currentColor" />
            </motion.div>
          </motion.div>
          <p
            className="text-zinc-400 text-xl"
            style={{ fontFamily: "var(--font-dancing)" }}
          >
            💌 Sebuah pesan dari hati yang tulus 💌
          </p>
        </motion.div>

        {/* Premium Letter Card */}
        <motion.div
          initial={{ rotateX: 5 }}
          whileHover={{ rotateX: 0, scale: 1.02 }}
          transition={{ type: "spring", stiffness: 200 }}
          className="relative"
          style={{ perspective: "1000px" }}
        >
          {/* Card Glow */}
          <motion.div
            animate={{
              boxShadow: [
                "0 0 30px rgba(236,72,153,0.2), 0 0 60px rgba(168,85,247,0.1)",
                "0 0 50px rgba(236,72,153,0.3), 0 0 80px rgba(168,85,247,0.2)",
                "0 0 30px rgba(236,72,153,0.2), 0 0 60px rgba(168,85,247,0.1)",
              ]
            }}
            transition={{ duration: 3, repeat: Infinity }}
            className="absolute inset-0 rounded-3xl"
          />

          {/* Main Card */}
          <div
            className="relative p-8 md:p-12 rounded-3xl overflow-hidden"
            style={{
              background: "linear-gradient(145deg, rgba(20,20,30,0.9), rgba(30,20,40,0.9))",
              backdropFilter: "blur(20px)",
              border: "1px solid rgba(236,72,153,0.2)",
              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(255,255,255,0.05)",
            }}
          >
            {/* Decorative Top Wax Seal */}
            <motion.div
              animate={{ rotate: [0, 5, 0, -5, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute -top-6 left-1/2 -translate-x-1/2"
            >
              <div 
                className="w-16 h-16 rounded-full flex items-center justify-center"
                style={{
                  background: "linear-gradient(135deg, #ec4899, #be185d)",
                  boxShadow: "0 8px 20px rgba(236,72,153,0.4), inset 0 2px 4px rgba(255,255,255,0.2)",
                }}
              >
                <Heart className="w-8 h-8 text-white" fill="currentColor" />
              </div>
            </motion.div>

            {/* Decorative Corner Flowers */}
            <div className="absolute top-4 right-4 text-2xl opacity-40">🌸</div>
            <div className="absolute bottom-4 left-4 text-2xl opacity-40">🌸</div>
            <div className="absolute top-4 left-4 text-xl opacity-30">✨</div>
            <div className="absolute bottom-4 right-4 text-xl opacity-30">✨</div>

            {/* Paper Texture Lines */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-3xl">
              {[...Array(15)].map((_, i) => (
                <div
                  key={i}
                  className="absolute left-8 right-8 h-[1px]"
                  style={{ 
                    top: `${(i + 2) * 6}%`,
                    background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.03), transparent)"
                  }}
                />
              ))}
            </div>

            {/* Letter Content */}
            <div className="relative space-y-6 pt-6">
              {MEMO_CONTENT.map((paragraph, index) => (
                <motion.p
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.15, duration: 0.6 }}
                  className={`leading-relaxed ${
                    index === 0 
                      ? "text-2xl md:text-3xl text-pink-300 font-medium text-center" 
                      : index === MEMO_CONTENT.length - 1 || index === MEMO_CONTENT.length - 2
                      ? "text-xl text-pink-400 text-right italic"
                      : "text-lg md:text-xl text-zinc-300"
                  }`}
                  style={{ fontFamily: "var(--font-dancing)" }}
                >
                  {paragraph}
                </motion.p>
              ))}
            </div>

            {/* Animated Sparkles */}
            {[
              { top: "10%", right: "5%" },
              { bottom: "15%", left: "5%" },
              { top: "50%", right: "2%" },
              { bottom: "30%", left: "2%" },
            ].map((pos, i) => (
              <motion.div
                key={i}
                animate={{ 
                  opacity: [0.3, 1, 0.3],
                  scale: [0.8, 1.2, 0.8],
                  rotate: [0, 180, 360]
                }}
                transition={{ duration: 3, repeat: Infinity, delay: i * 0.5 }}
                className="absolute"
                style={pos}
              >
                <Sparkles className="w-5 h-5 text-amber-400" />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Bottom Floating Emojis */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex justify-center mt-10 gap-4"
        >
          {["💕", "✨", "💖", "✨", "💕"].map((emoji, i) => (
            <motion.span
              key={i}
              animate={{ 
                y: [0, -10, 0],
                rotate: i % 2 === 0 ? [0, 10, 0] : [0, -10, 0]
              }}
              transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
              className="text-3xl drop-shadow-lg"
            >
              {emoji}
            </motion.span>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}

// Note: CakeSection and GiftSection are now imported from @/components/

// ============================================================
// FINALE SECTION
// ============================================================
function FinaleSection() {
  return (
    <section className="py-20 px-4 min-h-screen flex items-center justify-center relative">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: "spring" }}
        className="text-center"
      >
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="relative inline-block mb-8"
        >
          <div
            className="absolute inset-0 rounded-full blur-3xl"
            style={{ background: "radial-gradient(circle, rgba(236, 72, 153, 0.5), transparent)" }}
          />
          <Heart className="w-32 h-32 md:w-48 md:h-48 text-pink-500 relative" fill="currentColor" />
        </motion.div>

        <h2
          className="text-5xl md:text-7xl font-bold mb-6"
          style={{ fontFamily: "var(--font-dancing)" }}
        >
          <span className="bg-gradient-to-r from-pink-400 via-rose-500 to-pink-400 bg-clip-text text-transparent">
            I Love You
          </span>
        </h2>

        <p className="text-xl text-zinc-300 mb-8" style={{ fontFamily: "var(--font-dancing)" }}>
          Sekarang, besok, dan selamanya... 💕
        </p>

        <p className="text-zinc-500">
          Made with 💖 just for you
        </p>
      </motion.div>
    </section>
  );
}
