'use client';
import { useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';

export function UniverseServices() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  });

  const cards = [
    { title: 'The Past', rotation: -15, x: -100, delay: 0 },
    { title: 'The Present', rotation: 0, x: 0, delay: 0.1 },
    { title: 'The Future', rotation: 15, x: 100, delay: 0.2 },
  ];

  return (
    <section ref={containerRef} className="relative min-h-[150vh] bg-black flex items-center py-32 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-900/10 via-black to-black" />
      
      <div className="w-full max-w-7xl mx-auto px-8 flex flex-col md:flex-row items-center justify-between z-10">
        <div className="w-full md:w-1/2 mb-20 md:mb-0">
          <h2 className="text-[10px] uppercase tracking-[0.5em] text-indigo-400 mb-4">Divine Guidance</h2>
          <h3 className="text-4xl md:text-6xl font-serif text-white mb-8">Tarot Divination</h3>
          <p className="text-white/60 font-light text-lg max-w-md leading-relaxed mb-8">
            Draw from the ethereal deck. Our master readers interpret the cosmic symbols to illuminate your path, revealing truths hidden in the stars.
          </p>
          <button className="border border-indigo-400/30 text-indigo-200 px-8 py-3 rounded-full hover:bg-indigo-900/20 transition-all text-xs uppercase tracking-widest">
            Book a Reading
          </button>
        </div>

        <div className="w-full md:w-1/2 relative h-[500px] flex items-center justify-center">
          {cards.map((card, index) => {
            // GSAP-like scroll-linked animation using Framer Motion
            const y = useTransform(scrollYProgress, [0.3, 0.7], [200, 0]);
            const rotate = useTransform(scrollYProgress, [0.4, 0.7], [0, card.rotation]);
            const x = useTransform(scrollYProgress, [0.4, 0.7], [0, card.x]);

            return (
              <motion.div
                key={index}
                style={{ y, rotate, x, originY: 1 }}
                className="absolute w-[200px] h-[320px] md:w-[260px] md:h-[420px] rounded-xl overflow-hidden border border-indigo-500/30 bg-black/50 backdrop-blur-md shadow-2xl group cursor-pointer"
              >
                <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/10 to-transparent" />
                <Image
                  src="/images/tarot_cards.png"
                  alt={card.title}
                  fill
                  className="object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                />
                <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-black to-transparent flex flex-col items-center">
                  <div className="text-[#D4AF37] font-serif text-xl">{card.title}</div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
