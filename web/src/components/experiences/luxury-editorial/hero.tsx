'use client';
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export function LuxuryHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start']
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 1.1]);

  return (
    <section ref={containerRef} className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-[#FFF9F2]">
      
      {/* Huge Golden Sun */}
      <motion.div 
        style={{ y: y1, opacity }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] md:w-[40vw] md:h-[40vw] max-w-[800px] max-h-[800px] rounded-full bg-gradient-to-tr from-[#E8A359] via-[#F3C472] to-[#FFF9F2] blur-xl opacity-90 mix-blend-multiply pointer-events-none"
      />

      {/* Cloud gradients */}
      <div className="absolute top-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white/80 via-transparent to-transparent pointer-events-none" />
      <div className="absolute bottom-0 w-full h-full bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-[#FFF9F2] via-transparent to-transparent pointer-events-none" />

      {/* Indian Mandala Lines (SVG) */}
      <motion.div 
        animate={{ rotate: 360 }}
        transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] h-[90vw] md:w-[70vw] md:h-[70vw] max-w-[1200px] max-h-[1200px] opacity-10 pointer-events-none"
      >
        <svg viewBox="0 0 100 100" className="w-full h-full stroke-[#E8A359] fill-none" strokeWidth="0.1">
          <circle cx="50" cy="50" r="48" strokeDasharray="1 1" />
          <circle cx="50" cy="50" r="40" />
          <path d="M50,10 L50,90 M10,50 L90,50 M22,22 L78,78 M22,78 L78,22" />
          <polygon points="50,15 85,50 50,85 15,50" />
          <polygon points="50,25 75,50 50,75 25,50" />
          {[...Array(12)].map((_, i) => (
            <circle key={i} cx={50 + 44 * Math.cos(i * Math.PI / 6)} cy={50 + 44 * Math.sin(i * Math.PI / 6)} r="1" fill="#E8A359" />
          ))}
        </svg>
      </motion.div>

      {/* Main Content */}
      <motion.div 
        style={{ scale, opacity, y: useTransform(scrollYProgress, [0, 1], [0, 150]) }}
        className="relative z-10 flex flex-col items-center text-center mt-20"
      >
        <h2 className="text-[#8A6A4B] font-sans text-[10px] md:text-xs uppercase tracking-[0.4em] mb-8 font-semibold">
          Destiny Feels Expensive
        </h2>
        <h1 className="text-6xl md:text-8xl lg:text-[9rem] font-serif tracking-tight text-[#2A2A2A] leading-[0.9]">
          Aether <br/>
          <span className="italic text-[#C58B43]">Gold</span>
        </h1>
        <p className="mt-12 text-[#6A5A4B] font-sans text-sm md:text-base max-w-md mx-auto leading-relaxed">
          The stars are not just lights in the sky. They are the ink with which your legacy is written.
        </p>
      </motion.div>

      {/* Scroll indicator */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4">
        <div className="w-[1px] h-16 bg-gradient-to-b from-[#2A2A2A]/40 to-transparent" />
        <span className="text-[#2A2A2A]/40 text-[9px] uppercase tracking-[0.3em] font-sans">Begin</span>
      </div>

    </section>
  );
}
