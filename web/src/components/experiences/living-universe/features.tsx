'use client';
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export function UniverseFeatures() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  });

  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  const features = [
    { title: 'Vedic Mastery', desc: 'Ancient Indian astrology techniques perfected over thousands of years.' },
    { title: 'Aura Sync', desc: 'Real-time energetic field alignment based on your birth coordinates.' },
    { title: 'Cosmic Timing', desc: 'Predictive modeling for life\'s most critical turning points.' },
  ];

  return (
    <section ref={containerRef} className="relative min-h-screen bg-black py-32 flex items-center overflow-hidden">
      
      {/* Volumetric Lighting Background */}
      <div className="absolute inset-0 bg-[url('/luxury-noise.png')] opacity-30 mix-blend-overlay pointer-events-none" />
      <motion.div 
        style={{ scale, opacity }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-tr from-[#D4AF37]/20 to-purple-900/20 blur-[150px] rounded-full pointer-events-none" 
      />

      <div className="w-full max-w-7xl mx-auto px-8 relative z-10">
        <div className="text-center mb-24">
          <h2 className="text-[10px] uppercase tracking-[0.5em] text-[#D4AF37] mb-4">Core Principles</h2>
          <h3 className="text-4xl md:text-6xl font-serif text-white">The Architecture of Destiny</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2, duration: 1 }}
              className="p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl hover:bg-white/10 transition-colors group cursor-pointer relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="text-[#D4AF37] font-serif text-2xl mb-4">{feature.title}</div>
              <p className="text-white/60 font-light text-sm leading-relaxed">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
