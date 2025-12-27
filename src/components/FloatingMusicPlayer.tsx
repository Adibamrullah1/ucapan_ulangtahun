"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, Volume2, VolumeX, Music } from "lucide-react";

interface FloatingMusicPlayerProps {
  isPlaying: boolean;
  onPlayPause: () => void;
  audioRef: React.RefObject<HTMLAudioElement | null>;
}

export default function FloatingMusicPlayer({
  isPlaying,
  onPlayPause,
  audioRef,
}: FloatingMusicPlayerProps) {
  const [isMuted, setIsMuted] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [volume, setVolume] = useState(0.7);

  const handleMuteToggle = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 1, duration: 0.5 }}
      className="fixed bottom-6 right-6 z-40"
    >
      <motion.div
        layout
        className="glass rounded-2xl p-3 flex items-center gap-3 shadow-xl"
        style={{
          boxShadow: isPlaying 
            ? "0 0 30px rgba(124, 58, 237, 0.3), 0 10px 40px rgba(0,0,0,0.3)" 
            : "0 10px 40px rgba(0,0,0,0.3)",
        }}
        onMouseEnter={() => setIsExpanded(true)}
        onMouseLeave={() => setIsExpanded(false)}
      >
        {/* Audio Visualizer Bars */}
        <div className="flex items-end gap-[3px] h-8 px-1">
          {[1, 2, 3, 4, 5].map((bar) => (
            <motion.div
              key={bar}
              className={`w-[3px] rounded-full bg-gradient-to-t from-purple-600 to-pink-500 ${
                isPlaying ? `animate-audio-bar-${bar}` : ""
              }`}
              style={{
                height: isPlaying ? undefined : "10px",
              }}
            />
          ))}
        </div>

        {/* Play/Pause Button */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={onPlayPause}
          className="w-10 h-10 rounded-full flex items-center justify-center transition-all"
          style={{
            background: "linear-gradient(135deg, #7C3AED, #EC4899)",
          }}
        >
          {isPlaying ? (
            <Pause className="w-5 h-5 text-white" fill="white" />
          ) : (
            <Play className="w-5 h-5 text-white ml-0.5" fill="white" />
          )}
        </motion.button>

        {/* Mute Button */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleMuteToggle}
          className="w-8 h-8 rounded-full flex items-center justify-center bg-white/10 hover:bg-white/20 transition-colors"
        >
          {isMuted ? (
            <VolumeX className="w-4 h-4 text-zinc-400" />
          ) : (
            <Volume2 className="w-4 h-4 text-white" />
          )}
        </motion.button>

        {/* Volume Slider (on hover/expand) */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: "80px", opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={volume}
                onChange={handleVolumeChange}
                className="w-full h-1 rounded-lg appearance-none cursor-pointer"
                style={{
                  background: `linear-gradient(to right, #EC4899 0%, #EC4899 ${volume * 100}%, #3f3f46 ${volume * 100}%, #3f3f46 100%)`,
                }}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Now Playing Indicator */}
        {isPlaying && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="hidden md:flex items-center gap-2"
          >
            <Music className="w-4 h-4 text-pink-400" />
            <span className="text-xs text-zinc-400 whitespace-nowrap">
              Now Playing
            </span>
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
}
