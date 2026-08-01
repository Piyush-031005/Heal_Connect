'use client';
import { useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';

export function UniverseExperts() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
  });

  const x = useTransform(scrollYProgress, [0, 1], ['0%', '-50%']);

  const experts = [
    { name: 'Dr. Orion', specialty: 'Vedic Master', img: '/avatars/astrologer_4.jpg' },
    { name: 'Lyra Moon', specialty: 'Tarot Oracle', img: '/avatars/astrologer_6.jpg' },
    { name: 'Sirius Black', specialty: 'Numerologist', img: '/avatars/astrologer_4.jpg' },
    { name: 'Nova Star', specialty: 'Aura Reader', img: '/avatars/astrologer_6.jpg' },
    { name: 'Atlas Sky', specialty: 'Horary Expert', img: '/avatars/astrologer_4.jpg' },
  ];

  return (
    <section ref={containerRef} className="relative h-[300vh] bg-black">
      <div className="sticky top-0 h-screen overflow-hidden flex flex-col justify-center">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10 pointer-events-none" />
        
        <div className="w-full px-8 md:px-24 mb-12">
          <h2 className="text-[10px] uppercase tracking-[0.5em] text-[#D4AF37] mb-4">Guiding Lights</h2>
          <h3 className="text-4xl md:text-6xl font-serif text-white">Our Constellation of Masters</h3>
        </div>

        <motion.div style={{ x }} className="flex gap-16 px-8 md:px-24">
          {experts.map((expert, i) => (
            <div key={i} className="relative w-[300px] md:w-[400px] shrink-0 group cursor-pointer">
              <div className="relative h-[400px] md:h-[500px] rounded-full overflow-hidden border border-[#D4AF37]/20 filter grayscale hover:grayscale-0 transition-all duration-700">
                <Image src={expert.img} alt={expert.name} fill className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
                
                {/* Connecting lines effect inside circle */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
                  <svg className="w-full h-full" viewBox="0 0 100 100">
                    <path d="M20,80 L50,20 L80,70" fill="none" stroke="#D4AF37" strokeWidth="0.5" className="animate-pulse" />
                    <circle cx="20" cy="80" r="1" fill="#fff" />
                    <circle cx="50" cy="20" r="1" fill="#fff" />
                    <circle cx="80" cy="70" r="1" fill="#fff" />
                  </svg>
                </div>
              </div>
              <div className="mt-8 text-center">
                <h4 className="text-2xl font-serif text-white">{expert.name}</h4>
                <p className="text-[#D4AF37] text-xs uppercase tracking-widest mt-2">{expert.specialty}</p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
