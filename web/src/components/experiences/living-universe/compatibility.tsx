'use client';
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export function UniverseCompatibility() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  });

  const leftOrbX = useTransform(scrollYProgress, [0.2, 0.5], ['-100%', '0%']);
  const rightOrbX = useTransform(scrollYProgress, [0.2, 0.5], ['100%', '0%']);
  const opacity = useTransform(scrollYProgress, [0.4, 0.6], [0, 1]);

  return (
    <section ref={containerRef} className="relative min-h-screen bg-black flex flex-col items-center justify-center overflow-hidden py-32">
      <div className="text-center z-20 mb-24">
        <h2 className="text-[10px] uppercase tracking-[0.5em] text-[#D4AF37] mb-4">Synastry & Connection</h2>
        <h3 className="text-4xl md:text-6xl font-serif text-white">Cosmic Compatibility</h3>
      </div>

      <div className="relative w-full max-w-4xl h-[400px] flex items-center justify-center">
        {/* Left Orb */}
        <motion.div 
          style={{ x: leftOrbX }}
          className="absolute left-1/4 w-[300px] h-[300px] rounded-full bg-gradient-to-tr from-blue-600/40 to-cyan-400/40 blur-3xl mix-blend-screen"
        />
        
        {/* Right Orb */}
        <motion.div 
          style={{ x: rightOrbX }}
          className="absolute right-1/4 w-[300px] h-[300px] rounded-full bg-gradient-to-bl from-rose-600/40 to-orange-400/40 blur-3xl mix-blend-screen"
        />

        {/* Intersection Text */}
        <motion.div style={{ opacity }} className="z-10 flex flex-col items-center">
          <div className="text-white/80 font-serif text-3xl italic">When Stars Collide</div>
          <p className="text-white/50 text-sm mt-4 max-w-sm text-center">Analyze the energetic overlap between two birth charts to reveal relationship dynamics.</p>
          <button className="mt-8 border border-white/20 text-white px-8 py-3 rounded-full hover:bg-white hover:text-black transition-colors uppercase text-xs tracking-widest">
            Check Compatibility
          </button>
        </motion.div>
      </div>
    </section>
  );
}
