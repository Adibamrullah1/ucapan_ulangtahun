"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Camera, Heart, Sparkles, ImageIcon } from "lucide-react";

// Gallery photos - Uses actual photos from /public/assets/
const generatePhotos = () => {
  return Array.from({ length: 6 }, (_, i) => ({
    id: i + 1,
    src: `/assets/${i + 1}.jpeg`,
  }));
};

export default function GallerySection() {
  const [mounted, setMounted] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState<number | null>(null);
  const [loadedPhotos, setLoadedPhotos] = useState<Set<number>>(new Set());
  const [errorPhotos, setErrorPhotos] = useState<Set<number>>(new Set());
  const photos = generatePhotos();

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleImageLoad = (id: number) => {
    setLoadedPhotos(prev => new Set(prev).add(id));
  };

  const handleImageError = (id: number) => {
    setErrorPhotos(prev => new Set(prev).add(id));
  };

  return (
    <section className="relative py-24 px-4 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-900/10 via-transparent to-pink-900/10" />
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

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          {/* Decorative line */}
          <motion.div 
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            className="flex items-center justify-center gap-4 mb-6"
          >
            <div className="h-[2px] w-16 md:w-24 bg-gradient-to-r from-transparent via-pink-500/50 to-pink-500" />
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            >
              <Camera className="w-8 h-8 text-pink-400" />
            </motion.div>
            <div className="h-[2px] w-16 md:w-24 bg-gradient-to-l from-transparent via-pink-500/50 to-pink-500" />
          </motion.div>

          <h2 className="text-4xl md:text-6xl font-bold mb-4">
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-rose-400 bg-clip-text text-transparent">
              Memory Lane
            </span>
          </h2>
          <p
            className="text-zinc-400 text-xl max-w-md mx-auto"
            style={{ fontFamily: "var(--font-dancing)" }}
          >
            📸 Momen-momen indah yang kita ukir bersama 💕
          </p>
        </motion.div>

        {/* Photo Grid - Premium Masonry Style */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {photos.map((photo, index) => (
            <motion.div
              key={photo.id}
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ 
                delay: index * 0.1, 
                duration: 0.6,
                type: "spring",
                stiffness: 100
              }}
              className={`relative group cursor-pointer ${
                index === 0 || index === 5 ? 'md:row-span-2' : ''
              }`}
              onClick={() => setSelectedPhoto(photo.id)}
            >
              {/* Card Container */}
              <motion.div
                whileHover={{ scale: 1.03, y: -8 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                className="relative overflow-hidden rounded-2xl h-full"
                style={{
                  background: "linear-gradient(145deg, rgba(124,58,237,0.2), rgba(236,72,153,0.2))",
                  boxShadow: "0 10px 40px -10px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.1)",
                }}
              >
                {/* Image */}
                {errorPhotos.has(photo.id) ? (
                  <div 
                    className="w-full h-48 md:h-64 flex flex-col items-center justify-center bg-gradient-to-br from-purple-900/40 to-pink-900/40"
                    style={{ height: index === 0 || index === 5 ? '100%' : undefined, minHeight: index === 0 || index === 5 ? '400px' : '200px' }}
                  >
                    <ImageIcon className="w-12 h-12 text-zinc-500 mb-3" />
                    <p className="text-zinc-500 text-sm">Foto #{photo.id}</p>
                  </div>
                ) : (
                  <div className="relative overflow-hidden">
                    <motion.img
                      src={photo.src}
                      alt={`Memory ${photo.id}`}
                      className={`w-full object-cover transition-all duration-500 ${
                        loadedPhotos.has(photo.id) ? 'opacity-100' : 'opacity-0'
                      }`}
                      style={{ 
                        height: index === 0 || index === 5 ? '400px' : '250px',
                        objectFit: 'cover'
                      }}
                      onLoad={() => handleImageLoad(photo.id)}
                      onError={() => handleImageError(photo.id)}
                    />
                    {/* Loading skeleton */}
                    {!loadedPhotos.has(photo.id) && !errorPhotos.has(photo.id) && (
                      <div 
                        className="absolute inset-0 bg-gradient-to-br from-purple-900/50 to-pink-900/50 animate-pulse"
                        style={{ height: index === 0 || index === 5 ? '400px' : '250px' }}
                      />
                    )}
                  </div>
                )}

                {/* Hover Overlay */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex items-end"
                >
                  <div className="p-4 md:p-6 w-full">
                    <motion.div
                      initial={{ y: 20, opacity: 0 }}
                      whileHover={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.1 }}
                      className="flex items-center gap-2"
                    >
                      <Heart className="w-5 h-5 text-pink-400" fill="currentColor" />
                      <span className="text-white font-medium">Kenangan #{photo.id}</span>
                    </motion.div>
                  </div>
                </motion.div>

                {/* Glowing border on hover */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  className="absolute inset-0 rounded-2xl pointer-events-none"
                  style={{
                    border: "2px solid transparent",
                    background: "linear-gradient(135deg, rgba(168,85,247,0.5), rgba(236,72,153,0.5)) border-box",
                    WebkitMask: "linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)",
                    WebkitMaskComposite: "xor",
                    maskComposite: "exclude",
                  }}
                />

                {/* Corner sparkle */}
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  whileHover={{ scale: 1, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 400 }}
                  className="absolute -top-2 -right-2 w-10 h-10 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 flex items-center justify-center shadow-lg"
                  style={{ boxShadow: "0 0 20px rgba(236,72,153,0.5)" }}
                >
                  <Heart className="w-5 h-5 text-white" fill="currentColor" />
                </motion.div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Decorations */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            {["💕", "📸", "✨", "📸", "💕"].map((emoji, i) => (
              <motion.span
                key={i}
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
                className="text-2xl"
              >
                {emoji}
              </motion.span>
            ))}
          </div>
          <p className="text-zinc-500 text-sm">
            Masih banyak kenangan indah yang akan kita buat bersama
          </p>
        </motion.div>
      </div>

      {/* Photo Modal */}
      {selectedPhoto && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setSelectedPhoto(null)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="relative max-w-4xl max-h-[90vh] overflow-hidden rounded-2xl"
          >
            <img
              src={`/assets/${selectedPhoto}.jpeg`}
              alt={`Memory ${selectedPhoto}`}
              className="w-full h-auto max-h-[85vh] object-contain"
            />
            <button
              onClick={() => setSelectedPhoto(null)}
              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/50 flex items-center justify-center text-white hover:bg-black/70 transition-colors"
            >
              ✕
            </button>
          </motion.div>
        </motion.div>
      )}
    </section>
  );
}
