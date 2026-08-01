'use client';
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export function UniverseHealing() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  });

  const y = useTransform(scrollYProgress, [0, 1], [150, -150]);

  return (
    <section ref={containerRef} className="relative min-h-screen bg-black py-32 flex flex-col items-center justify-center overflow-hidden">
      
      {/* Soft glowing background */}
      <div className="absolute inset-0 bg-[url('/luxury-noise.png')] opacity-20 pointer-events-none mix-blend-overlay" />
      <div className="absolute w-[1000px] h-[1000px] bg-gradient-to-tr from-green-900/20 via-emerald-800/10 to-transparent blur-[120px] rounded-full pointer-events-none" />

      <motion.div style={{ y }} className="relative z-10 w-full max-w-5xl px-8 mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        
        <div className="order-2 md:order-1">
          <div className="relative w-full h-[400px] md:h-[600px] rounded-3xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-2xl p-8 flex items-center justify-center group">
            {/* Interactive abstract lotus/crystal geometry */}
            <svg viewBox="0 0 100 100" className="w-48 h-48 drop-shadow-[0_0_30px_rgba(52,211,153,0.4)] group-hover:scale-110 transition-transform duration-1000">
              <path d="M50,10 C60,40 90,50 90,50 C90,50 60,60 50,90 C40,60 10,50 10,50 C10,50 40,40 50,10 Z" fill="none" stroke="#34D399" strokeWidth="1" className="animate-[pulse_4s_ease-in-out_infinite]" />
              <path d="M50,25 C55,45 75,50 75,50 C75,50 55,55 50,75 C45,55 25,50 25,50 C25,50 45,45 50,25 Z" fill="none" stroke="#34D399" strokeWidth="0.5" opacity="0.6" />
            </svg>
          </div>
        </div>

        <div className="order-1 md:order-2">
          <h2 className="text-[10px] uppercase tracking-[0.5em] text-emerald-400 mb-4">Restore Your Energy</h2>
          <h3 className="text-4xl md:text-6xl font-serif text-white mb-8">The Healing Sanctuary</h3>
          <p className="text-white/60 font-light text-lg leading-relaxed mb-8">
            Step away from the noise. Immerse yourself in guided spiritual cleansing, aligned with current planetary retrogrades.
          </p>
          <ul className="space-y-4 mb-12 text-sm text-white/50 tracking-wider">
            <li className="flex items-center gap-4"><div className="w-1.5 h-1.5 rounded-full bg-emerald-400" /> Crystal Resonance Therapy</li>
            <li className="flex items-center gap-4"><div className="w-1.5 h-1.5 rounded-full bg-emerald-400" /> Chakra Alignment</li>
            <li className="flex items-center gap-4"><div className="w-1.5 h-1.5 rounded-full bg-emerald-400" /> Sound Bath Meditation</li>
          </ul>
          <button className="border border-emerald-400/30 text-emerald-300 px-8 py-3 rounded-full hover:bg-emerald-900/20 transition-all uppercase text-xs tracking-widest">
            Enter Sanctuary
          </button>
        </div>

      </motion.div>
    </section>
  );
}
