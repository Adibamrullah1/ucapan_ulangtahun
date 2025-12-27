"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Calendar, Clock, Heart, PartyPopper } from "lucide-react";
import AnimatedSection from "./ui/AnimatedSection";

interface CountdownSectionProps {
  targetDate?: Date;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export default function CountdownSection({ targetDate }: CountdownSectionProps) {
  // Default to today for birthday simulation
  const birthday = targetDate || new Date();
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);
  const [isBirthday, setIsBirthday] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    const calculateTimeLeft = () => {
      const now = new Date();
      const currentYear = now.getFullYear();
      
      // Set birthday for this year
      let nextBirthday = new Date(
        currentYear,
        birthday.getMonth(),
        birthday.getDate()
      );

      // If birthday has passed this year, use next year
      if (nextBirthday < now) {
        nextBirthday = new Date(
          currentYear + 1,
          birthday.getMonth(),
          birthday.getDate()
        );
      }

      // Check if today is the birthday
      const isToday =
        now.getDate() === birthday.getDate() &&
        now.getMonth() === birthday.getMonth();

      setIsBirthday(isToday);

      if (isToday) {
        return null;
      }

      const difference = nextBirthday.getTime() - now.getTime();

      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    };

    setTimeLeft(calculateTimeLeft());

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [birthday]);

  if (!mounted) {
    return null;
  }

  const timeUnits = [
    { label: "Hari", value: timeLeft?.days || 0 },
    { label: "Jam", value: timeLeft?.hours || 0 },
    { label: "Menit", value: timeLeft?.minutes || 0 },
    { label: "Detik", value: timeLeft?.seconds || 0 },
  ];

  return (
    <section className="section-container relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-900/10 to-transparent" />
      
      <AnimatedSection className="relative z-10 text-center max-w-4xl mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-center justify-center gap-3 mb-8"
        >
          <Calendar className="w-6 h-6 text-purple-400" />
          <h2 className="text-3xl md:text-4xl font-bold gradient-text">
            Hari Spesialmu
          </h2>
          <Calendar className="w-6 h-6 text-purple-400" />
        </motion.div>

        {isBirthday ? (
          /* Birthday Message */
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 200 }}
            className="relative"
          >
            {/* Celebration Background Effect */}
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute inset-0 bg-gradient-to-r from-pink-500/20 via-purple-500/20 to-pink-500/20 rounded-3xl blur-3xl"
            />
            
            <div className="relative glass-strong rounded-3xl p-8 md:p-12">
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 2 }}
                className="text-6xl md:text-8xl mb-6"
              >
                🎉
              </motion.div>
              
              <h3 className="text-4xl md:text-6xl font-bold gradient-text-romantic mb-4">
                IT&apos;S YOUR DAY!
              </h3>
              
              <p className="text-xl md:text-2xl text-zinc-300" style={{ fontFamily: "var(--font-dancing)" }}>
                Selamat Ulang Tahun, Sayangku! 🎂💕
              </p>

              <motion.div
                className="flex justify-center gap-4 mt-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                {["🎈", "🎁", "🎊", "🥳", "💖"].map((emoji, i) => (
                  <motion.span
                    key={i}
                    animate={{ y: [0, -10, 0] }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      delay: i * 0.2,
                    }}
                    className="text-3xl"
                  >
                    {emoji}
                  </motion.span>
                ))}
              </motion.div>
            </div>
          </motion.div>
        ) : (
          /* Countdown Timer */
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {timeUnits.map((unit, index) => (
              <motion.div
                key={unit.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative group"
              >
                {/* Glow Effect */}
                <motion.div
                  animate={{
                    opacity: [0.3, 0.5, 0.3],
                  }}
                  transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
                  className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-2xl blur-xl"
                />
                
                <div className="relative glass rounded-2xl p-4 md:p-6 hover:bg-white/5 transition-colors">
                  <motion.div
                    key={unit.value}
                    initial={{ scale: 1.2, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="text-4xl md:text-6xl font-bold gradient-text mb-2"
                  >
                    {String(unit.value).padStart(2, "0")}
                  </motion.div>
                  <div className="text-sm md:text-base text-zinc-400 uppercase tracking-wider">
                    {unit.label}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Decorative Quote */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-12 text-center"
        >
          <Heart className="w-5 h-5 text-pink-500 mx-auto mb-4" fill="currentColor" />
          <p className="text-lg text-zinc-400 italic" style={{ fontFamily: "var(--font-dancing)" }}>
            &quot;Setiap detik bersamamu adalah hadiah yang paling berharga...&quot;
          </p>
        </motion.div>
      </AnimatedSection>
    </section>
  );
}
