'use client';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export function AppleCosmicFeatures() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

  const features = [
    { title: "ProGrade Astrology", desc: "NASA JPL ephemeris data powers every chart.", color: "from-blue-500/10 to-transparent" },
    { title: "Neural Tarot", desc: "Machine learning meets ancient archetypes.", color: "from-purple-500/10 to-transparent" },
    { title: "Quantum Sync", desc: "Your destiny updates in real-time.", color: "from-emerald-500/10 to-transparent" }
  ];

  return (
    <section ref={containerRef} className="py-32 px-6 max-w-7xl mx-auto">
      <div className="text-center mb-24">
        <h2 className="text-4xl md:text-6xl font-bold tracking-tighter text-gray-900">Brilliant to the core.</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {features.map((f, i) => (
          <motion.div 
            key={i}
            style={{ y: useTransform(scrollYProgress, [0, 1], [100 * (i+1), -100 * (i+1)]) }}
            className={`rounded-3xl p-10 h-96 flex flex-col justify-end bg-gradient-to-b ${f.color} border border-gray-100 shadow-sm relative overflow-hidden group`}
          >
            <div className="absolute inset-0 bg-white/40 backdrop-blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            <h3 className="text-2xl font-semibold tracking-tight relative z-10">{f.title}</h3>
            <p className="text-gray-500 mt-2 relative z-10">{f.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
