'use client';
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const ZODIAC_SIGNS = [
  '♈', '♉', '♊', '♋', '♌', '♍', '♎', '♏', '♐', '♑', '♒', '♓'
];

export function LotusHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start']
  });

  // Rotate the entire lotus wheel based on scroll
  const rotation = useTransform(scrollYProgress, [0, 1], [0, 180]);
  const yParallax = useTransform(scrollYProgress, [0, 1], [0, 200]);

  return (
    <section ref={containerRef} className="relative min-h-[150vh] w-full overflow-hidden bg-[#FDFBF7]">
      
      {/* Background soft earth glow */}
      <div className="absolute top-0 right-0 w-[80vw] h-[80vw] bg-gradient-to-bl from-[#B88B5E]/15 to-transparent rounded-full blur-[120px] pointer-events-none translate-x-1/4 -translate-y-1/4" />

      <div className="sticky top-0 h-screen w-full flex items-center">
        
        {/* Left Side Content */}
        <motion.div 
          style={{ y: yParallax }}
          className="w-full md:w-1/2 pl-8 md:pl-24 z-20"
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <h2 className="text-[#B88B5E] font-sans text-[10px] md:text-xs uppercase tracking-[0.4em] mb-6 font-semibold">
              The Path to Harmony
            </h2>
            <h1 className="text-6xl md:text-7xl lg:text-[7.5rem] font-serif tracking-tight text-[#4A3B32] leading-[0.95] mb-8 drop-shadow-sm">
              Divine <br/>
              <span className="italic font-light text-[#8C7A6B]">Lotus</span>
            </h1>
            <p className="text-[#8C7A6B] font-sans text-sm md:text-base max-w-sm leading-relaxed mb-12">
              Unfold the petals of your destiny. As the cosmic flower blooms, discover the ancient wisdom written in the stars, tailored exclusively for your soul.
            </p>
            <button className="flex items-center gap-4 text-[#4A3B32] hover:text-[#B88B5E] transition-colors group">
              <span className="font-sans text-[11px] font-bold uppercase tracking-widest border-b border-current pb-1">Begin the Journey</span>
              <svg className="w-4 h-4 transform group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
          </motion.div>
        </motion.div>

        {/* Right Side - Realistic Rotating Lotus Wheel */}
        <div className="absolute top-1/2 right-0 md:-right-[15vw] -translate-y-1/2 w-[120vw] h-[120vw] md:w-[80vw] md:h-[80vw] max-w-[1200px] max-h-[1200px] flex items-center justify-center z-10">
          
          <motion.div 
            style={{ rotate: rotation }}
            className="relative w-full h-full flex items-center justify-center"
          >
            {/* The Petals */}
            {[...Array(12)].map((_, i) => {
              const angle = (i * 360) / 12;
              return (
                <div 
                  key={i}
                  className="absolute top-1/2 left-1/2 origin-top"
                  style={{ 
                    width: '12%',
                    height: '42%',
                    transform: `translate(-50%, 0) rotate(${angle + 180}deg)`,
                  }}
                >
                  <div className="relative w-full h-full group">
                    {/* SVG Realistic Petal */}
                    <svg viewBox="0 0 100 250" className="w-full h-full overflow-visible drop-shadow-2xl" preserveAspectRatio="none">
                      <defs>
                        {/* 3D Inner Shadow / Edge Highlight */}
                        <linearGradient id="petalHighlight" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.8" />
                          <stop offset="20%" stopColor="#FDFBF7" stopOpacity="1" />
                          <stop offset="50%" stopColor="#F5EFE6" stopOpacity="1" />
                          <stop offset="80%" stopColor="#EADECB" stopOpacity="1" />
                          <stop offset="100%" stopColor="#C9B49A" stopOpacity="1" />
                        </linearGradient>
                        <filter id="petalShadow" x="-20%" y="-20%" width="140%" height="140%">
                          <feDropShadow dx="0" dy="8" stdDeviation="6" floodColor="#4A3B32" floodOpacity="0.15" />
                        </filter>
                      </defs>
                      <path 
                        d="M50 0 C 85 40, 110 120, 50 250 C -10 120, 15 40, 50 0 Z" 
                        fill="url(#petalHighlight)" 
                        stroke="#B88B5E" 
                        strokeWidth="1.5"
                        filter="url(#petalShadow)"
                        className="transition-all duration-700 ease-out origin-top group-hover:scale-[1.03] group-hover:brightness-110 cursor-pointer"
                      />
                      {/* Inner petal vein line */}
                      <path d="M50 20 L50 200" stroke="#B88B5E" strokeWidth="0.5" strokeDasharray="4 4" opacity="0.4" />
                    </svg>
                    
                    {/* Zodiac Sign inside Petal */}
                    <div className="absolute top-[60%] left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                      <div className="text-3xl md:text-4xl text-[#8C7A6B] font-serif group-hover:text-[#B88B5E] transition-colors drop-shadow-sm">
                        {ZODIAC_SIGNS[i]}
                      </div>
                      <div className="w-1.5 h-1.5 rounded-full bg-[#B88B5E] mt-3 opacity-50 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </div>
                </div>
              );
            })}
            
            {/* Center Core (Perfectly Centered) */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[12%] h-[12%] z-20">
              <div className="w-full h-full bg-gradient-to-tr from-[#EADECB] to-[#FFFFFF] rounded-full shadow-[0_0_40px_rgba(74,59,50,0.2)] border-[6px] border-[#FDFBF7] flex items-center justify-center relative overflow-hidden">
                {/* Inner golden ring */}
                <div className="absolute inset-2 rounded-full border border-[#B88B5E]/40" />
                <div className="w-1/3 h-1/3 bg-[#B88B5E]/30 rounded-full animate-pulse blur-sm" />
              </div>
            </div>

          </motion.div>
        </div>

      </div>
    </section>
  );
}
