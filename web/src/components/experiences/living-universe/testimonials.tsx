'use client';
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export function UniverseTestimonials() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  });

  const x1 = useTransform(scrollYProgress, [0, 1], ['0%', '-50%']);
  const x2 = useTransform(scrollYProgress, [0, 1], ['-50%', '0%']);

  const reviews = [
    { text: "A revelation. The accuracy of the Vedic reading changed my career trajectory entirely.", author: "Elena R." },
    { text: "I've never experienced anything like the Aura Sync. It felt like coming home.", author: "Marcus T." },
    { text: "The daily horoscope is my compass. HealConnect is truly next level.", author: "Sophia L." },
    { text: "Beautiful platform, profound insights. A rare gem in the digital age.", author: "James K." },
  ];

  return (
    <section ref={containerRef} className="relative min-h-screen bg-black py-32 overflow-hidden flex flex-col justify-center">
      <div className="text-center z-20 mb-24 px-8">
        <h2 className="text-[10px] uppercase tracking-[0.5em] text-[#D4AF37] mb-4">Echoes of the Cosmos</h2>
        <h3 className="text-4xl md:text-6xl font-serif text-white">Voices of the Awakened</h3>
      </div>

      <div className="relative w-full">
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-black to-transparent z-10" />
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-black to-transparent z-10" />

        <motion.div style={{ x: x1 }} className="flex gap-8 px-8 mb-8 whitespace-nowrap">
          {[...reviews, ...reviews].map((review, i) => (
            <div key={i} className="shrink-0 w-[400px] md:w-[600px] p-8 md:p-12 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-sm">
              <p className="text-white/80 font-serif text-xl md:text-2xl leading-relaxed whitespace-normal mb-8">
                "{review.text}"
              </p>
              <div className="text-[#D4AF37] text-xs uppercase tracking-widest">— {review.author}</div>
            </div>
          ))}
        </motion.div>

        <motion.div style={{ x: x2 }} className="flex gap-8 px-8 whitespace-nowrap">
          {[...reviews, ...reviews].reverse().map((review, i) => (
            <div key={i} className="shrink-0 w-[400px] md:w-[600px] p-8 md:p-12 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-sm">
              <p className="text-white/80 font-serif text-xl md:text-2xl leading-relaxed whitespace-normal mb-8">
                "{review.text}"
              </p>
              <div className="text-[#D4AF37] text-xs uppercase tracking-widest">— {review.author}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
