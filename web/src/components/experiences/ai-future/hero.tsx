'use client';
import dynamic from 'next/dynamic';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

const QuantumCanvas = dynamic(() => import('./webgl-canvas').then(mod => mod.QuantumCanvas), { ssr: false });

export function QuantumHero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section ref={ref} className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0 opacity-40">
        <QuantumCanvas />
      </div>

      <motion.div style={{ y, opacity }} className="relative z-10 flex flex-col items-center text-center">
        <div className="px-4 py-1.5 rounded-full border border-[#3730A3]/20 bg-white/50 backdrop-blur-xl text-[#3730A3] text-[10px] font-bold tracking-[0.2em] mb-8 uppercase">
          Ethereal Processing
        </div>
        <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-[#111111] mb-6">
          Quantum <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4F46E5] to-[#06B6D4]">Oracle</span>
        </h1>
        <p className="text-[#666666] max-w-lg mx-auto text-sm md:text-base mb-12">
          Experience astrology through the lens of crystalline data structures and light-based WebGL physics.
        </p>
      </motion.div>
    </section>
  );
}
