'use client';
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export function UniverseHoroscope() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  });

  const moonY = useTransform(scrollYProgress, [0, 1], [300, -300]);
  const textY = useTransform(scrollYProgress, [0, 1], [100, -100]);

  return (
    <section ref={containerRef} className="relative min-h-[150vh] bg-black overflow-hidden flex flex-col items-center justify-center">
      
      {/* Massive parallax moon */}
      <motion.div 
        style={{ y: moonY }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] md:w-[1200px] md:h-[1200px] rounded-full bg-gradient-to-tr from-gray-900 via-gray-800 to-white/10 opacity-20 border border-white/5 shadow-[inset_0_0_100px_rgba(255,255,255,0.1)] pointer-events-none"
      />

      <motion.div style={{ y: textY }} className="relative z-10 w-full max-w-4xl px-8 text-center">
        <h2 className="text-[10px] uppercase tracking-[0.5em] text-[#D4AF37] mb-8">Daily Cosmic Weather</h2>
        <div className="bg-black/40 backdrop-blur-xl border border-white/10 p-12 md:p-20 rounded-3xl shadow-2xl">
          <div className="text-white/40 text-sm tracking-widest uppercase mb-6">Today's Alignment</div>
          <h3 className="text-3xl md:text-5xl font-serif text-white leading-relaxed">
            The moon enters Scorpio, urging deep emotional introspection. Trust your intuition above all logic today.
          </h3>
          <div className="mt-12 flex items-center justify-center gap-4">
            <button className="bg-white text-black px-8 py-3 rounded-full hover:bg-[#D4AF37] transition-colors uppercase text-xs tracking-widest font-bold">
              Read Full Horoscope
            </button>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
