'use client';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useLayout } from '@/lib/layout-context';
import dynamic from 'next/dynamic';

const MagicalDust = dynamic(() => import('./magical-dust'), { ssr: false });

export function UniverseHero() {
  const { setLayout } = useLayout();
  const { scrollYProgress } = useScroll();
  
  const y1 = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 1.2]);

  return (
    <section className="relative h-screen w-full overflow-hidden bg-black flex flex-col items-center justify-center">
      <button 
        onClick={() => setLayout('mystic-wheel')} 
        className="absolute top-8 left-8 z-50 text-white/50 hover:text-white uppercase text-[10px] tracking-[0.3em] font-light border border-white/10 px-6 py-2 rounded-full transition-all hover:bg-white/5 backdrop-blur-md"
      >
        Return to Original
      </button>

      <div className="absolute inset-0 z-0 pointer-events-none">
        <MagicalDust />
      </div>

      <motion.div 
        style={{ y: y1, opacity, scale }}
        className="relative z-10 flex flex-col items-center justify-center pointer-events-none"
      >
        <div className="relative w-[300px] h-[300px] md:w-[500px] md:h-[500px] mb-8">
          <div className="absolute inset-0 bg-gradient-to-tr from-[#D4AF37]/20 to-transparent blur-[100px] rounded-full mix-blend-screen" />
          <Image
            src="/images/crystal_ball.png"
            alt="Crystal Ball"
            fill
            className="object-contain drop-shadow-[0_0_50px_rgba(212,175,55,0.4)] animate-[pulse_4s_ease-in-out_infinite]"
            priority
          />
        </div>
        
        <h1 className="text-5xl md:text-8xl lg:text-[10rem] font-serif text-transparent bg-clip-text bg-gradient-to-b from-white to-white/40 tracking-tighter mix-blend-overlay">
          HealConnect
        </h1>
        <p className="mt-6 text-[#D4AF37] font-sans text-xs md:text-sm uppercase tracking-[0.4em] font-light max-w-xl text-center leading-loose opacity-80">
          Unlock the secrets of the universe through ancient astrology, redefined for the modern soul.
        </p>
      </motion.div>
      
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-4 animate-bounce">
        <div className="text-white/40 text-[10px] uppercase tracking-[0.3em]">Discover Your Destiny</div>
        <div className="w-[1px] h-12 bg-gradient-to-b from-white/40 to-transparent" />
      </div>
    </section>
  );
}
