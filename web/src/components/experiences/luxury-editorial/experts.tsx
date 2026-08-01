'use client';
import { useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';

export function LuxuryExperts() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  });

  const experts = [
    { name: 'Dr. Orion', specialty: 'Vedic Master', img: '/avatars/astrologer_4.jpg' },
    { name: 'Lyra Moon', specialty: 'Tarot Oracle', img: '/avatars/astrologer_6.jpg' },
    { name: 'Sirius Black', specialty: 'Numerologist', img: '/avatars/astrologer_4.jpg' },
  ];

  return (
    <section ref={containerRef} className="bg-[#FFF9F2] py-32 px-8 border-t border-[#E8A359]/20">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 border-b border-[#2A2A2A]/20 pb-8">
          <div>
            <h2 className="text-[#E8A359] font-sans text-[10px] uppercase tracking-[0.4em] mb-4 font-bold">
              The Masters
            </h2>
            <h3 className="text-4xl md:text-6xl font-serif text-[#2A2A2A]">
              Curated Astrologers
            </h3>
          </div>
          <button className="hidden md:block font-sans text-xs uppercase tracking-widest text-[#2A2A2A] hover:text-[#E8A359] transition-colors">
            View the Full Roster
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {experts.map((expert, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2, duration: 0.8 }}
              className="group cursor-pointer flex flex-col items-center text-center"
            >
              <div className="w-full aspect-[3/4] relative overflow-hidden mb-6 bg-[#F3EFE9]">
                <Image 
                  src={expert.img} 
                  alt={expert.name} 
                  fill 
                  className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105 mix-blend-multiply" 
                />
              </div>
              <h4 className="text-2xl font-serif text-[#2A2A2A]">{expert.name}</h4>
              <p className="text-[#E8A359] text-[10px] font-sans uppercase tracking-[0.2em] mt-2">{expert.specialty}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
