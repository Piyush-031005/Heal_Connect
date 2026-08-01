'use client';
import { useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';

export function LuxuryDailyCards() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  });

  const bookY = useTransform(scrollYProgress, [0, 1], [150, -150]);
  const textOpacity = useTransform(scrollYProgress, [0.2, 0.4], [0, 1]);

  return (
    <section ref={containerRef} className="relative min-h-[120vh] bg-[#FFF9F2] flex flex-col items-center justify-center overflow-hidden py-32 z-10 border-t border-[#E8A359]/20">
      <div className="absolute inset-0 bg-[url('/luxury-noise.png')] opacity-40 mix-blend-overlay pointer-events-none" />
      
      <div className="w-full max-w-7xl px-8 flex flex-col md:flex-row items-center justify-between gap-16 relative z-10">
        
        {/* Left Text */}
        <motion.div style={{ opacity: textOpacity }} className="w-full md:w-1/2">
          <h2 className="text-[#E8A359] font-sans text-[10px] uppercase tracking-[0.4em] mb-4 font-bold">
            The Cosmic Journal
          </h2>
          <h3 className="text-4xl md:text-5xl font-serif text-[#2A2A2A] mb-8 leading-snug">
            Open the Book of <br/>
            <span className="italic">Destiny</span>
          </h3>
          <p className="text-[#6A5A4B] font-sans text-sm md:text-base leading-relaxed max-w-md mb-8">
            Your daily horoscope is not a generic prediction. It is a deeply personalized chapter, written daily by the alignment of the planets and the ancient algorithms of Vedic wisdom.
          </p>
          <button className="border-b border-[#2A2A2A] pb-1 text-[#2A2A2A] font-sans text-xs uppercase tracking-widest hover:text-[#E8A359] hover:border-[#E8A359] transition-colors">
            Read Today's Chapter
          </button>
        </motion.div>

        {/* Right Magic Book */}
        <motion.div style={{ y: bookY }} className="w-full md:w-1/2 relative h-[500px] flex items-center justify-center">
          {/* Glowing Aura behind book */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-[#E8A359] blur-[80px] rounded-full opacity-30 mix-blend-multiply" />
          
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="relative w-[400px] h-[400px] cursor-pointer group"
          >
            <Image
              src="/images/magic_book.png"
              alt="Magic Book"
              fill
              className="object-contain drop-shadow-2xl transition-transform duration-700 group-hover:rotate-2"
            />
            {/* Pages glowing effect on hover */}
            <div className="absolute inset-0 bg-white/0 group-hover:bg-white/20 transition-colors duration-700 blur-xl mix-blend-screen rounded-full pointer-events-none" />
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
}
