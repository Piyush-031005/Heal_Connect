'use client';
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export function UniverseBirthChart() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  });

  const rotate = useTransform(scrollYProgress, [0, 1], [-45, 45]);
  const scale = useTransform(scrollYProgress, [0.3, 0.5, 0.7], [0.8, 1, 0.8]);

  return (
    <section ref={containerRef} className="relative min-h-[150vh] bg-black py-32 flex flex-col items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-amber-900/20 via-black to-black" />
      
      <div className="text-center z-20 mb-12">
        <h2 className="text-[10px] uppercase tracking-[0.5em] text-[#D4AF37] mb-4">Your Cosmic Blueprint</h2>
        <h3 className="text-4xl md:text-6xl font-serif text-white">Natal Chart Analysis</h3>
      </div>

      <motion.div style={{ rotate, scale }} className="relative w-[400px] h-[400px] md:w-[600px] md:h-[600px]">
        {/* Intricate SVG sacred geometry representing a birth chart */}
        <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_0_20px_rgba(212,175,55,0.3)]">
          <circle cx="50" cy="50" r="48" fill="none" stroke="#D4AF37" strokeWidth="0.2" opacity="0.5" />
          <circle cx="50" cy="50" r="40" fill="none" stroke="#D4AF37" strokeWidth="0.5" />
          <circle cx="50" cy="50" r="32" fill="none" stroke="#D4AF37" strokeWidth="0.2" opacity="0.5" />
          
          {/* Connecting lines */}
          <path d="M50,10 L90,50 L50,90 L10,50 Z" fill="none" stroke="#D4AF37" strokeWidth="0.2" />
          <path d="M22,22 L78,78 M22,78 L78,22" fill="none" stroke="#D4AF37" strokeWidth="0.2" />
          
          <polygon points="50,18 78,50 50,82 22,50" fill="none" stroke="#D4AF37" strokeWidth="0.3" opacity="0.8" className="animate-[pulse_3s_ease-in-out_infinite]" />
        </svg>
        
        {/* Core glowing center */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-[#D4AF37] rounded-full blur-2xl opacity-40 animate-pulse" />
      </motion.div>
    </section>
  );
}
