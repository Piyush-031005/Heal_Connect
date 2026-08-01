'use client';
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export function UniverseNumerology() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  });

  const numberY = useTransform(scrollYProgress, [0, 1], [200, -200]);

  return (
    <section ref={containerRef} className="relative min-h-[120vh] bg-black flex items-center overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-10">
        <motion.div style={{ y: numberY }} className="text-[40vw] font-serif font-bold text-white leading-none mix-blend-overlay">
          11:11
        </motion.div>
      </div>

      <div className="w-full max-w-7xl mx-auto px-8 relative z-10 flex flex-col md:flex-row items-center justify-between">
        <div className="w-full md:w-1/2">
          <h2 className="text-[10px] uppercase tracking-[0.5em] text-[#D4AF37] mb-4">The Universal Language</h2>
          <h3 className="text-4xl md:text-6xl font-serif text-white mb-8">Numerology</h3>
          <p className="text-white/60 font-light text-lg max-w-md leading-relaxed mb-8">
            Decode the mathematical framework of your destiny. Numbers are not just symbols; they are frequencies that dictate the rhythm of your life.
          </p>
          <div className="flex gap-4">
            <button className="bg-white/10 text-white px-8 py-3 rounded-full hover:bg-white hover:text-black transition-colors uppercase text-xs tracking-widest border border-white/20">
              Calculate Life Path
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
