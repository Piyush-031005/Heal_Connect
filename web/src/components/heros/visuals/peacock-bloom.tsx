"use client";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

const MODALITIES = [
  {id:'astrology',name:'Astrology'},{id:'tarot',name:'Tarot'},
  {id:'face-reading',name:'Face Reading'},{id:'palm-reading',name:'Palm Reading'},
  {id:'sound-healing',name:'Sound Healing'},{id:'meditation',name:'Meditation'},
  {id:'spiritual',name:'Spiritual'},{id:'chakra-healing',name:'Chakra Healing'},
  {id:'breathwork',name:'Breathwork'},{id:'dreams',name:'Dream Predict'},
  {id:'space-harmony',name:'Space Harmony'},{id:'numerology',name:'Numerology'},
];

const LotusSVG = ({ className, isBlurred = false }: { className?: string, isBlurred?: boolean }) => {
  return (
    <svg viewBox="0 0 400 400" className={className} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="petal-grad" x1="50%" y1="0%" x2="50%" y2="100%">
          <stop offset="0%" stopColor="#C79CFF" />
          <stop offset="50%" stopColor="#9F6DFF" />
          <stop offset="100%" stopColor="#6F42E5" />
          <stop offset="100%" stopColor="transparent" />
        </linearGradient>
      </defs>
      <g transform="translate(200, 200)">
        {Array.from({ length: 16 }).map((_, i) => {
          const rotation = (i * 360) / 16;
          const isInner = i % 2 === 0;
          const scale = isInner ? 0.75 : 1;
          const opacity = isBlurred ? 1 : (isInner ? 0.48 : 0.35);
          
          return (
            <motion.path
              key={i}
              d="M0,0 C30,-80 80,-150 0,-180 C-80,-150 -30,-80 0,0 Z"
              fill="url(#petal-grad)"
              style={{
                opacity,
                transformOrigin: "0 0",
              }}
              animate={!isBlurred ? {
                scale: isInner ? [scale, scale * 1.03, scale] : scale,
                rotate: isInner ? rotation : [rotation, rotation + 2, rotation - 2, rotation],
              } : undefined}
              transition={!isBlurred ? {
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
              } : undefined}
              transform={isBlurred ? otate() scale() : undefined}
            />
          );
        })}
      </g>
    </svg>
  );
};

export default function PeacockBloom() {
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <div className="relative w-full h-[700px] flex items-center justify-center overflow-hidden">
      
      {/* Layer 1: Background Gradients */}
      <div className="absolute inset-0 z-[1]" style={{
        background: 
          radial-gradient(circle at 80% 40%, rgba(149,109,255,.18), transparent 45%),
          radial-gradient(circle at 50% 60%, rgba(255,255,255,.5), transparent 55%),
          radial-gradient(circle at 90% 80%, rgba(110,80,255,.12), transparent 45%),
          linear-gradient(180deg, #F7F0FF, #F0E5FF, #E9DBFF)
        
      }} />

      {/* Layer 2: Noise Texture */}
      <div className="absolute inset-0 z-[2] opacity-[0.03] mix-blend-overlay pointer-events-none" 
           style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }} />

      {/* Layer 3: Big Gradient Blob */}
      <div className="absolute z-[3] w-[700px] h-[700px] rounded-full pointer-events-none"
           style={{
             background: 'radial-gradient(circle, rgba(171,120,255,.35), transparent 70%)',
             filter: 'blur(90px)'
           }} />

      {/* Layer 4: Lotus Glow */}
      <div className="absolute z-[4] w-[600px] h-[600px] rounded-full pointer-events-none opacity-70"
           style={{
             background: 'radial-gradient(circle, rgba(255,255,255,.45), rgba(201,167,255,.18), transparent)',
             filter: 'blur(70px)'
           }} />

      {/* Layer 14: Inner Glow (Behind Lotus) */}
      <div className="absolute z-[4] w-[100px] h-[100px] rounded-full pointer-events-none"
           style={{
             boxShadow: '0 0 90px rgba(188,150,255,.5)'
           }} />

      {/* Layer 13: Lotus Breathing Animation Wrapper */}
      <motion.div 
        className="absolute z-[5] w-[600px] h-[600px] flex items-center justify-center pointer-events-none"
        animate={{ scale: [1, 1.015, 1] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      >
        {/* Layer 5: Blurred Lotus */}
        <div className="absolute inset-0 flex items-center justify-center opacity-40" style={{ filter: 'blur(25px)', transform: 'scale(1.08)' }}>
          <LotusSVG className="w-full h-full" isBlurred={true} />
        </div>

        {/* Layer 6: Main Sharp Lotus */}
        <div className="absolute inset-0 flex items-center justify-center">
          <LotusSVG className="w-[90%] h-[90%]" />
        </div>
      </motion.div>

      {/* Layer 10 & 11: Floor Reflection & Shadow */}
      <div className="absolute z-[6] bottom-0 w-[400px] h-[100px] pointer-events-none flex flex-col items-center">
        <div className="w-[300px] h-[40px] rounded-full" 
             style={{ background: 'radial-gradient(ellipse, rgba(74,45,163,.28), transparent)', filter: 'blur(30px)' }} />
        <div className="w-[200px] h-[200px] opacity-[0.08]" 
             style={{ transform: 'scaleY(-1) translateY(50px)', filter: 'blur(18px)', backgroundImage: 'url("/main centre logo/girl.png")', backgroundSize: 'contain', backgroundRepeat: 'no-repeat', backgroundPosition: 'center' }} />
      </div>

      {/* Layer 16: Glass Blur Behind Girl */}
      <div className="absolute z-[6] w-[200px] h-[300px] opacity-[0.08] pointer-events-none rounded-full"
           style={{ backdropFilter: 'blur(25px)' }} />

      {/* Layer 9: Head Aura */}
      <div className="absolute z-[7] w-[120px] h-[120px] rounded-full pointer-events-none -mt-32"
           style={{
             background: 'radial-gradient(circle, rgba(255,255,255,.42), transparent)',
             filter: 'blur(35px)'
           }} />

      {/* Layer 7: Girl Image with CSS Filters */}
      <div className="absolute z-[8] w-[350px] h-[350px] flex items-center justify-center pointer-events-auto cursor-pointer transition-transform duration-700 hover:scale-105 mt-16">
        <img 
          src="/main centre logo/girl.png" 
          alt="ZenAuraa" 
          className="w-full h-full object-contain"
          style={{
            filter: 'brightness(.58) contrast(1.2) saturate(.8) hue-rotate(-8deg) drop-shadow(0 25px 40px rgba(0,0,0,.28))'
          }}
        />
        
        {/* Layer 8: Color Matching Overlay */}
        <div className="absolute inset-0 pointer-events-none rounded-full" 
             style={{
               background: 'linear-gradient(180deg, rgba(133,94,255,.18), rgba(255,255,255,.06))',
               mixBlendMode: 'soft-light',
               maskImage: 'url("/main centre logo/girl.png")',
               WebkitMaskImage: 'url("/main centre logo/girl.png")',
               maskSize: 'contain',
               WebkitMaskSize: 'contain',
               maskRepeat: 'no-repeat',
               WebkitMaskRepeat: 'no-repeat',
               maskPosition: 'center',
               WebkitMaskPosition: 'center'
             }} />
      </div>

      {/* Overlapping Petals for Depth (Bonus Layer to put girl inside lotus) */}
      <div className="absolute z-[9] w-[600px] h-[600px] flex items-center justify-center pointer-events-none opacity-20 mt-16">
         <svg viewBox="0 0 400 400" className="w-[90%] h-[90%]" xmlns="http://www.w3.org/2000/svg">
            <g transform="translate(200, 200)">
              <path d="M0,0 C30,-80 80,-150 0,-180 C-80,-150 -30,-80 0,0 Z" fill="url(#petal-grad)" style={{ transform: 'rotate(180deg) scale(0.8)' }} />
              <path d="M0,0 C30,-80 80,-150 0,-180 C-80,-150 -30,-80 0,0 Z" fill="url(#petal-grad)" style={{ transform: 'rotate(150deg) scale(0.8)' }} />
              <path d="M0,0 C30,-80 80,-150 0,-180 C-80,-150 -30,-80 0,0 Z" fill="url(#petal-grad)" style={{ transform: 'rotate(210deg) scale(0.8)' }} />
            </g>
         </svg>
      </div>

      {/* Layer 15: Text Around Lotus */}
      <div className="absolute inset-0 z-[10] flex items-center justify-center pointer-events-none" style={{ animation: 'spin 120s linear infinite' }}>
        {MODALITIES.map((mod, i) => {
          const total = MODALITIES.length;
          const angle = (i / total) * Math.PI * 2 - Math.PI / 2;
          const r = 280; 
          const x = Math.cos(angle) * r;
          const y = Math.sin(angle) * r;
          return (
            <div key={label-} className="absolute" style={{ transform: 	ranslate(px, px) }}>
              <div className="pointer-events-auto cursor-pointer group" style={{ animation: 'spin 120s linear infinite reverse' }} onClick={() => router.push(/modalities/)}>
                <div className="flex items-center gap-2 px-3 py-1.5 transition-all duration-300 hover:scale-110">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#3A247A]/40 group-hover:bg-[#5F3BA9] shadow-[0_0_8px_rgba(95,59,169,0.5)] transition-colors" />
                  <span className="text-[12px] tracking-[5px] font-semibold text-[#3A247A] opacity-[0.55] uppercase transition-colors drop-shadow-sm group-hover:opacity-100 group-hover:text-[#1E2059]">
                    {mod.name}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Layer 12: Particles */}
      <div className="absolute inset-0 z-[11] overflow-hidden pointer-events-none">
        {Array.from({ length: 40 }).map((_, i) => {
          const size = Math.random() > 0.6 ? 3 : (Math.random() > 0.5 ? 4 : 2);
          const left = Math.random() * 100;
          const top = Math.random() * 100;
          const duration = 8 + Math.random() * 7; // 8s to 15s
          const maxOpacity = 0.1 + Math.random() * 0.3; // 0.1 to 0.4
          
          return (
            <motion.div
              key={particle-}
              className="absolute bg-white rounded-full"
              style={{
                width: size,
                height: size,
                left: ${left}%,
                top: ${top}%,
                filter: 'blur(0.5px)'
              }}
              animate={{
                y: [0, -25],
                opacity: [0, maxOpacity, 0]
              }}
              transition={{
                duration,
                repeat: Infinity,
                ease: "linear",
                delay: Math.random() * 5
              }}
            />
          );
        })}
      </div>

      {/* Layer 17: Vignette */}
      <div className="absolute inset-0 z-[12] pointer-events-none"
           style={{
             background: 'radial-gradient(ellipse, transparent 60%, rgba(0,0,0,.06) 100%)'
           }} />
           
    </div>
  );
}
