'use client';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';

export function AppleCosmicHero() {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 1000], [0, -200]);
  const y2 = useTransform(scrollY, [0, 1000], [0, -400]);
  const scale = useTransform(scrollY, [0, 500], [1, 1.1]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <section className="relative h-screen flex flex-col items-center justify-center overflow-hidden pt-20">
      <motion.div style={{ opacity }} className="text-center z-10 max-w-4xl px-4">
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="text-6xl md:text-8xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-gray-900 to-gray-500 pb-4"
        >
          Destiny. <br/>Redesigned.
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-xl md:text-2xl text-gray-500 font-medium tracking-tight mt-6 max-w-2xl mx-auto"
        >
          The most advanced astrological computation engine ever built. Now in the palm of your hand.
        </motion.p>
      </motion.div>

      {/* Floating Glass Planets */}
      <motion.div style={{ y: y1, scale }} className="absolute -bottom-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full bg-gradient-to-tr from-indigo-100/40 via-purple-100/20 to-transparent blur-3xl -z-10" />
      
      <motion.div style={{ y: y2 }} className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full border border-white/40 bg-white/10 backdrop-blur-3xl shadow-[0_32px_64px_rgba(0,0,0,0.05)] flex items-center justify-center">
        <div className="w-48 h-48 rounded-full bg-gradient-to-br from-blue-100 to-transparent opacity-50 mix-blend-overlay blur-xl" />
      </motion.div>

      <motion.div style={{ y: y1 }} className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full border border-white/60 bg-white/30 backdrop-blur-2xl shadow-[0_32px_64px_rgba(0,0,0,0.05)] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-tr from-amber-100/20 to-transparent mix-blend-overlay" />
      </motion.div>
    </section>
  );
}
