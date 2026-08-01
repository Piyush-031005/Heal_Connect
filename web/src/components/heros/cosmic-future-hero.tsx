'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function CosmicFutureHero() {
  const [mounted, setMounted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section ref={containerRef} className="relative min-h-[100vh] bg-white overflow-hidden flex items-center font-sans selection:bg-sky-200">
      
      {/* 
        Awwwards Apple-style Space Ambient Background:
        Pure white, with extremely subtle soft gradients (Sky Blue, Coral, Purple, Soft Gold)
      */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-20%] right-[-10%] w-[60vw] h-[60vw] bg-sky-100/50 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-20%] left-[-10%] w-[50vw] h-[50vw] bg-purple-100/40 rounded-full blur-[150px]" />
        <div className="absolute top-[20%] left-[20%] w-[40vw] h-[40vw] bg-amber-50/60 rounded-full blur-[100px]" />
      </div>

      <div className="container mx-auto px-6 lg:px-12 relative z-10 flex flex-col items-center justify-center h-full pt-32 pb-20 text-center">
        
        {/* Floating 3D Solar System (Background/Sides) */}
        {mounted && (
          <div className="absolute inset-0 pointer-events-none overflow-visible">
            
            {/* Center Main Planet (Soft Gold/Glass) */}
            <motion.div 
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] opacity-[0.03]"
              style={{ y: y1 }}
              animate={{ rotate: 360 }}
              transition={{ duration: 150, repeat: Infinity, ease: "linear" }}
            >
              <svg viewBox="0 0 100 100" className="w-full h-full">
                <circle cx="50" cy="50" r="49" fill="none" stroke="currentColor" strokeWidth="0.2" />
                <circle cx="50" cy="50" r="35" fill="none" stroke="currentColor" strokeWidth="0.1" strokeDasharray="1 2" />
              </svg>
            </motion.div>

            {/* Orbiting Glass Planet 1 (Coral/Purple) */}
            <motion.div 
              className="absolute top-[15%] right-[15%] w-32 h-32 md:w-48 md:h-48"
              style={{ y: y2 }}
              animate={{ y: [0, -20, 0], rotate: [0, 10, 0] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            >
              <div className="w-full h-full rounded-full bg-gradient-to-br from-white/80 to-white/10 backdrop-blur-2xl border border-white/60 shadow-[0_20px_50px_rgba(147,51,234,0.1)] flex items-center justify-center overflow-hidden">
                 <div className="absolute inset-0 bg-gradient-to-tr from-purple-200/40 to-coral-200/40 mix-blend-overlay" />
                 <img src="/premium/cosmic_future_planet.png" alt="Planet" className="w-[120%] h-[120%] object-cover opacity-80 mix-blend-multiply" />
              </div>
            </motion.div>

            {/* Orbiting Glass Planet 2 (Sky Blue/Silver) */}
            <motion.div 
              className="absolute bottom-[20%] left-[10%] w-24 h-24 md:w-36 md:h-36"
              style={{ y: y1 }}
              animate={{ y: [0, 20, 0], x: [0, 10, 0] }}
              transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            >
              <div className="w-full h-full rounded-full bg-gradient-to-br from-white/90 to-white/20 backdrop-blur-3xl border border-white/80 shadow-[0_20px_40px_rgba(56,189,248,0.15)] overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-bl from-sky-200/50 to-transparent mix-blend-overlay" />
              </div>
            </motion.div>
            
          </div>
        )}

        {/* Central Typography (Apple Style) */}
        <motion.div 
          className="relative z-20 flex flex-col items-center max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          style={{ opacity }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gray-200 bg-white/50 backdrop-blur-md mb-8 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-gray-500" />
            <span className="text-gray-600 text-[11px] font-bold tracking-[0.2em] uppercase">The Future of Wellness</span>
          </div>
          
          <h1 className="text-6xl sm:text-7xl md:text-[6rem] lg:text-[7.5rem] font-sans font-medium text-[#111111] tracking-tight leading-[1] mb-8">
            Explore <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-900 via-gray-600 to-gray-400">Yourself.</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-500 mb-12 font-light leading-relaxed max-w-2xl mx-auto">
            The universe knows your story. Discover your path, understand your energy, and connect with global experts in a premium digital sanctuary.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-center w-full">
            <Link href="/practitioners" className="w-full sm:w-auto">
              <button className="group relative w-full sm:w-auto h-14 px-10 rounded-full bg-[#111111] text-white font-medium text-base overflow-hidden transition-transform hover:scale-105 shadow-xl shadow-black/10">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                <span className="relative flex items-center justify-center gap-2">
                  Start Your Journey <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </button>
            </Link>
            <Link href="/about" className="w-full sm:w-auto">
              <button className="group w-full sm:w-auto h-14 px-10 rounded-full bg-white border border-gray-200 text-gray-900 font-medium text-base hover:bg-gray-50 transition-colors shadow-sm">
                How it works
              </button>
            </Link>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
