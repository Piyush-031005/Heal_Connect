'use client';
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export function UniverseFooter() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end end']
  });

  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.8, 1]);

  return (
    <footer ref={containerRef} className="relative h-[80vh] bg-black flex flex-col items-center justify-end pb-12 overflow-hidden">
      
      {/* Deep space void dissolving */}
      <motion.div style={{ opacity, scale }} className="absolute bottom-[-200px] left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-gradient-to-t from-[#D4AF37]/10 via-[#D4AF37]/5 to-transparent blur-3xl rounded-full pointer-events-none" />

      <div className="text-center z-10 w-full max-w-4xl px-8 mb-20">
        <h2 className="text-5xl md:text-8xl font-serif text-white/20 mb-8 tracking-tighter mix-blend-overlay">HealConnect</h2>
        <div className="flex flex-wrap justify-center gap-8 text-white/40 text-xs tracking-[0.3em] uppercase">
          <a href="#" className="hover:text-[#D4AF37] transition-colors">Instagram</a>
          <a href="#" className="hover:text-[#D4AF37] transition-colors">Twitter</a>
          <a href="#" className="hover:text-[#D4AF37] transition-colors">YouTube</a>
          <a href="#" className="hover:text-[#D4AF37] transition-colors">Contact</a>
        </div>
      </div>

      <div className="z-10 text-white/20 text-[10px] tracking-widest uppercase">
        © 2026 HealConnect. All rights reserved across the universe.
      </div>
    </footer>
  );
}
