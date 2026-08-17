'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ModalityData } from '@/data/modalities-content';

interface Props {
  data: ModalityData;
}

export default function ModalityHero({ data }: Props) {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    if (data.heroImages.length <= 1) return;
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % data.heroImages.length);
    }, 3000); // Change image every 3 seconds
    
    return () => clearInterval(interval);
  }, [data.heroImages.length]);

  return (
    <section className="relative w-full h-[60vh] md:h-[75vh] flex items-center justify-center overflow-hidden bg-background">
      {/* Background Slideshow */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence initial={false}>
          <motion.img
            key={currentSlide}
            src={data.heroImages[currentSlide]}
            alt={`${data.name} visual`}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            className="absolute inset-0 w-full h-full object-cover"
          />
        </AnimatePresence>
        
        {/* Deep overlay to ensure text readability while maintaining theme color */}
        <div className="absolute inset-0 bg-background/60 backdrop-blur-[2px] transition-colors duration-500" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent transition-colors duration-500" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 text-center max-w-4xl pt-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="w-10 h-[2px] bg-primary" />
            <span className="text-sm font-black uppercase tracking-[0.3em] text-primary">
              {data.name}
            </span>
            <div className="w-10 h-[2px] bg-primary" />
          </div>
          
          <h1 className="text-5xl md:text-7xl font-serif font-medium text-foreground mb-6 drop-shadow-lg leading-tight">
            {data.heroTitle}
          </h1>
          
          <p className="text-lg md:text-xl text-foreground/90 font-medium max-w-2xl mx-auto leading-relaxed drop-shadow-md">
            {data.heroDescription}
          </p>
        </motion.div>
      </div>
      
      {/* Scroll indicator */}
      <motion.div 
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
      >
        <span className="text-xs uppercase tracking-widest text-primary font-bold">Discover</span>
        <div className="w-px h-12 bg-primary/30 relative overflow-hidden">
          <motion.div 
            className="w-full h-1/2 bg-primary absolute top-0"
            animate={{ top: ['-50%', '100%'] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: 'linear' }}
          />
        </div>
      </motion.div>
    </section>
  );
}
