'use client';
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const ZODIAC_SIGNS = [
  'Aries', 'Taurus', 'Gemini', 'Cancer', 
  'Leo', 'Virgo', 'Libra', 'Scorpio', 
  'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'
];

export function UniverseZodiac() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  });

  const rotate = useTransform(scrollYProgress, [0, 1], [0, 360]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <section ref={containerRef} className="relative h-[200vh] bg-black">
      <div className="sticky top-0 h-screen flex flex-col items-center justify-center overflow-hidden">
        
        {/* Glowing background behind wheel */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#D4AF37]/5 blur-[120px] rounded-full pointer-events-none" />

        <div className="relative z-10 text-center mb-12">
          <h2 className="text-[10px] uppercase tracking-[0.5em] text-[#D4AF37] mb-4">The Celestial Cycle</h2>
          <div className="text-3xl md:text-5xl font-serif text-white">Find Your Constellation</div>
        </div>

        <motion.div 
          style={{ rotate, scale, opacity }} 
          className="relative w-[600px] h-[600px] md:w-[800px] md:h-[800px] border border-white/10 rounded-full flex items-center justify-center"
        >
          {/* Inner ring */}
          <div className="absolute w-[400px] h-[400px] md:w-[600px] md:h-[600px] border border-[#D4AF37]/20 rounded-full border-dashed animate-[spin_60s_linear_infinite_reverse]" />
          
          {/* Center piece */}
          <div className="absolute w-32 h-32 rounded-full bg-gradient-to-tr from-[#D4AF37] to-yellow-200 blur-xl opacity-20 animate-pulse" />
          <div className="absolute w-2 h-2 bg-white rounded-full shadow-[0_0_20px_#fff]" />

          {ZODIAC_SIGNS.map((sign, index) => {
            const angle = (index / ZODIAC_SIGNS.length) * 360;
            return (
              <div 
                key={sign}
                className="absolute w-24 h-24 flex items-center justify-center -ml-12 -mt-12"
                style={{
                  top: '50%',
                  left: '50%',
                  transform: `rotate(${angle}deg) translateY(-300px) rotate(-${angle}deg)`,
                }}
              >
                <div className="text-white/60 hover:text-[#D4AF37] transition-colors cursor-pointer group flex flex-col items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-white/20 group-hover:bg-[#D4AF37] group-hover:shadow-[0_0_15px_#D4AF37] transition-all" />
                  <span className="font-serif text-sm md:text-base tracking-wider">{sign}</span>
                </div>
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
