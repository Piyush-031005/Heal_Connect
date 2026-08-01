'use client';
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export function UniverseAbout() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  });

  const pathLength = useTransform(scrollYProgress, [0.2, 0.6], [0, 1]);
  const opacity = useTransform(scrollYProgress, [0.1, 0.3], [0, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

  return (
    <section ref={containerRef} className="relative min-h-[150vh] flex items-center justify-center bg-black overflow-hidden py-32">
      {/* Background Constellation Lines */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <svg className="w-full h-full" viewBox="0 0 1000 1000" preserveAspectRatio="xMidYMid slice">
          <motion.path
            d="M100,200 L300,400 L500,100 L700,500 L900,300"
            fill="none"
            stroke="#D4AF37"
            strokeWidth="2"
            style={{ pathLength }}
          />
          <motion.path
            d="M200,800 L400,600 L600,900 L800,700"
            fill="none"
            stroke="#ffffff"
            strokeWidth="1"
            style={{ pathLength }}
          />
        </svg>
      </div>

      <motion.div style={{ opacity, y }} className="max-w-4xl px-8 z-10 text-center flex flex-col items-center">
        <div className="w-px h-24 bg-gradient-to-b from-transparent via-[#D4AF37] to-transparent mb-12" />
        <h2 className="text-4xl md:text-6xl lg:text-7xl font-serif text-white/90 leading-tight">
          We are all connected by the same <span className="italic text-[#D4AF37]">cosmic thread</span>.
        </h2>
        <p className="mt-12 text-lg md:text-xl text-white/60 font-light max-w-2xl leading-relaxed">
          For millennia, humanity has looked to the stars for guidance. At HealConnect, we bring the ancient wisdom of astrology into the digital age, creating a sanctuary for self-discovery and universal connection.
        </p>
        <div className="mt-20 px-8 py-4 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-xs uppercase tracking-[0.3em] hover:bg-white/10 transition-colors cursor-pointer group">
          <span className="group-hover:text-[#D4AF37] transition-colors">Begin the Journey</span>
        </div>
      </motion.div>
    </section>
  );
}
