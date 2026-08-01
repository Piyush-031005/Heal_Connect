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
    <section ref={containerRef} className="relative min-h-[150vh] w-full overflow-hidden bg-[#FAF8F5]">
      
      {/* Background soft glow */}
      <div className="absolute top-0 right-0 w-[80vw] h-[80vw] bg-gradient-to-bl from-[#E3A8B1]/20 to-transparent rounded-full blur-[100px] pointer-events-none translate-x-1/4 -translate-y-1/4" />

      <div className="sticky top-0 h-screen w-full flex items-center">
        
        {/* Left Side Content */}
        <motion.div 
          style={{ y: yParallax }}
          className="w-full md:w-1/2 pl-8 md:pl-24 z-10"
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <h2 className="text-[#E3A8B1] font-sans text-xs uppercase tracking-[0.4em] mb-6 font-semibold">
              The Path to Harmony
            </h2>
            <h1 className="text-5xl md:text-7xl lg:text-[7rem] font-serif tracking-tight text-[#2D3A3A] leading-[1.1] mb-8">
              Divine <br/>
              <span className="italic font-light">Lotus</span>
            </h1>
            <p className="text-[#6C7A7A] font-sans text-sm md:text-base max-w-sm leading-relaxed mb-12">
              Unfold the petals of your destiny. As the cosmic flower blooms, discover the ancient wisdom written in the stars, tailored exclusively for your soul.
            </p>
            <button className="flex items-center gap-4 text-[#2D3A3A] hover:text-[#E3A8B1] transition-colors group">
              <span className="font-sans text-xs uppercase tracking-widest border-b border-current pb-1">Begin the Journey</span>
              <svg className="w-4 h-4 transform group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
          </motion.div>
        </motion.div>

        {/* Right Side - Rotating Lotus Wheel */}
        <div className="absolute top-1/2 right-0 md:-right-[10vw] -translate-y-1/2 w-[90vw] md:w-[60vw] aspect-square">
          <motion.div 
            style={{ rotate: rotation }}
            className="w-full h-full relative"
          >
            {/* The Petals */}
            {[...Array(12)].map((_, i) => {
              const angle = (i * 360) / 12;
              return (
                <div 
                  key={i}
                  className="absolute top-0 left-1/2 -translate-x-1/2 origin-bottom flex flex-col items-center justify-start"
                  style={{ 
                    height: '50%',
                    transform: `rotate(${angle}deg)`
                  }}
                >
                  {/* Petal Shape */}
                  <div className="relative w-[15vw] h-[30vw] md:w-[8vw] md:h-[18vw] mt-[5%]">
                    {/* SVG Petal */}
                    <svg viewBox="0 0 100 200" className="w-full h-full drop-shadow-lg" preserveAspectRatio="none">
                      <path 
                        d="M50 0 C80 60, 100 120, 50 200 C0 120, 20 60, 50 0 Z" 
                        fill="url(#petalGradient)" 
                        stroke="#E3A8B1" 
                        strokeWidth="1"
                        className="opacity-90 hover:opacity-100 transition-opacity"
                      />
                      <defs>
                        <linearGradient id="petalGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                          <stop offset="0%" stopColor="#FFFFFF" />
                          <stop offset="100%" stopColor="#F9E8EA" />
                        </linearGradient>
                      </defs>
                    </svg>
                    
                    {/* Zodiac Sign inside Petal */}
                    <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 text-2xl md:text-3xl text-[#2D3A3A] font-serif">
                      {ZODIAC_SIGNS[i]}
                    </div>
                  </div>
                </div>
              );
            })}
            
            {/* Center Core */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[15vw] h-[15vw] md:w-[8vw] md:h-[8vw] bg-white rounded-full shadow-2xl border-4 border-[#E3A8B1]/20 flex items-center justify-center">
              <div className="w-1/2 h-1/2 bg-[#E3A8B1]/10 rounded-full animate-pulse" />
            </div>

          </motion.div>
        </div>

      </div>
    </section>
  );
}
