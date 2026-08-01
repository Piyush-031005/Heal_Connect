'use client';
import { motion } from 'framer-motion';

export function LuxuryHero() {
  return (
    <section className="relative min-h-[120vh] flex flex-col items-center justify-center pt-32 pb-20">
      <div className="absolute inset-0 bg-[url('/luxury-noise.png')] opacity-20 pointer-events-none" />
      <div className="w-full max-w-7xl px-8 flex flex-col md:flex-row justify-between items-end mb-16 relative z-10">
        <motion.h1 
          initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          className="text-7xl md:text-[10rem] leading-[0.8] tracking-tighter"
        >
          Destiny.<br/><span className="italic text-[#D4AF37]">Curated.</span>
        </motion.h1>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }} className="max-w-xs text-sm font-sans tracking-widest uppercase leading-loose text-right">
          A bespoke approach to the stars, crafted for the modern visionary.
        </motion.div>
      </div>
      <div className="w-full max-w-7xl px-8 relative h-[600px] overflow-hidden">
        <motion.img 
          initial={{ scale: 1.1 }} animate={{ scale: 1 }} transition={{ duration: 2, ease: "easeOut" }}
          src="/avatars/astrologer_4.jpg" 
          className="w-full h-full object-cover object-top grayscale hover:grayscale-0 transition-all duration-1000" 
        />
        <div className="absolute bottom-8 left-8 text-white font-sans text-xs tracking-[0.2em] uppercase mix-blend-difference">Vol. 01 — The Awakening</div>
      </div>
    </section>
  );
}
