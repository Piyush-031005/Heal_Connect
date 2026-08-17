'use client';

import { motion } from 'framer-motion';
import { ModalityData } from '@/data/modalities-content';

interface Props {
  data: ModalityData;
}

export default function ModalityScrollGallery({ data }: Props) {
  if (!data.scrollGallery || data.scrollGallery.length === 0) return null;

  return (
    <section className="py-24 bg-background border-t border-primary/10 overflow-hidden relative">
      <div className="container mx-auto px-6 lg:px-16 mb-16 text-center">
        <h2 className="text-3xl md:text-5xl font-serif text-foreground mb-4">
          Visual Journey
        </h2>
        <div className="w-16 h-1 bg-primary/40 rounded-full mx-auto" />
      </div>

      {/* 
        Horizontal Auto-Scrolling Gallery
        We duplicate the array to create a seamless infinite loop.
      */}
      <div className="relative w-full flex overflow-hidden py-10">
        
        {/* Left and Right Fade masks for a clean integration into the background */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10" />

        <motion.div
          animate={{ x: ['0%', '-50%'] }}
          transition={{
            repeat: Infinity,
            ease: 'linear',
            duration: 30, // Adjust speed here
          }}
          className="flex gap-8 px-4"
        >
          {/* Double map to allow seamless infinite scroll */}
          {[...data.scrollGallery, ...data.scrollGallery].map((img, i) => (
            <div 
              key={i} 
              className="flex-shrink-0 w-[280px] h-[380px] md:w-[350px] md:h-[480px] rounded-2xl overflow-hidden shadow-2xl border border-primary/20 relative group"
            >
              <img 
                src={img} 
                alt={`${data.name} gallery image ${i}`} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 mix-blend-overlay" />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
