import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const MODALITIES = [
  'Astrology', 'Tarot', 'Face Reading', 'Palm Reading', 'Sound Healing', 
  'Meditation', 'Spiritual', 'Chakra Healing', 'Breathwork', 'Dream Prediction', 'Space Harmonizing', 'Numerology'
];

export default function PeacockBloom() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <>
      {/* LAYER 1: Background Gradient & LAYER 17: Vignette & LAYER 2: Noise Texture */}
      <div className="absolute inset-0 -z-10 pointer-events-none overflow-hidden" style={{ width: '100vw', left: '50%', transform: 'translateX(-50%)' }}>
        {/* Layer 1: Background */}
        <div className="absolute inset-0" style={{
          background: `
            radial-gradient(circle at 80% 40%, rgba(149,109,255,.18), transparent 45%),
            radial-gradient(circle at 50% 60%, rgba(255,255,255,.5), transparent 55%),
            radial-gradient(circle at 90% 80%, rgba(110,80,255,.12), transparent 45%),
            linear-gradient(180deg, #F7F0FF, #F0E5FF, #E9DBFF)
          `
        }} />
        
        {/* Layer 2: Noise Texture */}
        <div className="absolute inset-0 mix-blend-overlay opacity-[0.03]" style={{
          backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")'
        }} />

        {/* Layer 17: Vignette */}
        <div className="absolute inset-0" style={{
          background: 'radial-gradient(ellipse at center, transparent 60%, rgba(0,0,0,.06) 100%)'
        }} />
      </div>

      {/* Hero Visual Container */}
      <div className="relative w-full h-[600px] lg:h-[750px] flex items-center justify-center pointer-events-none">
        
        {/* Layer 3: Big Gradient Blob */}
        <div className="absolute w-[700px] h-[700px] rounded-full blur-[90px]" style={{
          background: 'radial-gradient(circle, rgba(171,120,255,.35), transparent 70%)'
        }} />

        {/* Layer 15: Text Around Lotus */}
        <motion.div 
          className="absolute w-[600px] h-[600px] pointer-events-none"
          animate={{ rotate: 360 }}
          transition={{ duration: 180, repeat: Infinity, ease: "linear" }}
        >
          {MODALITIES.map((modality, i) => {
            const angle = (i / MODALITIES.length) * 360;
            return (
              <div 
                key={modality} 
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                style={{ transform: `translate(-50%, -50%) rotate(${angle}deg) translateY(-280px)` }}
              >
                <span className="block text-[12px] font-semibold text-[#1E2059] opacity-55 uppercase tracking-[5px] whitespace-nowrap" style={{ transform: 'rotate(90deg)' }}>
                  {modality}
                </span>
              </div>
            );
          })}
        </motion.div>

        {/* Layer 11: Floor Shadow */}
        <div className="absolute bottom-[20px] w-[400px] h-[80px] blur-[30px]" style={{
          background: 'radial-gradient(ellipse, rgba(74,45,163,.28), transparent 70%)'
        }} />

        {/* Layer 4: Lotus Glow */}
        <div className="absolute w-[500px] h-[500px] opacity-70 blur-[70px] mix-blend-screen" style={{
          background: 'radial-gradient(circle, rgba(255,255,255,.45) 0%, rgba(201,167,255,.18) 40%, transparent 70%)'
        }} />

        {/* LOTUS GROUP (Layer 13 Animation) */}
        <motion.div 
          className="absolute flex items-center justify-center bottom-[150px]"
          animate={{ scale: [1, 1.015, 1] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        >
          {/* Layer 14: Inner Glow */}
          <div className="absolute w-[10px] h-[10px] rounded-full" style={{
            boxShadow: '0 0 90px 40px rgba(188,150,255,.25)'
          }} />

          {/* Layer 5: Blurred Lotus */}
          <div className="absolute scale-[1.08] blur-[25px] opacity-40">
            <LotusSVG />
          </div>

          {/* Layer 6: Main Lotus (Sharp) */}
          <div className="absolute">
            <LotusSVG />
          </div>

        </motion.div>

        {/* Layer 10: Reflection Floor */}
        <div className="absolute -bottom-[20px] w-[300px] h-[300px] scale-y-[-1] opacity-10 blur-[18px] flex justify-center items-start overflow-hidden origin-top">
          <img src="/main centre logo/girl.png" className="w-[300px] h-[400px] object-cover object-top" style={{ filter: 'brightness(0.58) contrast(1.2) saturate(0.8) hue-rotate(-8deg)' }} />
        </div>

        {/* Layer 16: Glass Blur */}
        <div className="absolute bottom-[80px] w-[200px] h-[250px] backdrop-blur-[25px] opacity-[0.08] rounded-[100px]" />

        {/* Layer 7: Girl Image */}
        <div className="absolute bottom-[50px] w-[300px] h-[400px] flex items-end justify-center pointer-events-none">
          
          <div className="relative w-full h-full flex items-end justify-center">
            {/* Base Girl Image */}
            <img 
              src="/main centre logo/girl.png" 
              alt="Meditating Silhouette" 
              className="absolute bottom-0 w-[250px] object-contain"
              style={{
                filter: 'brightness(0.58) contrast(1.2) saturate(0.8) hue-rotate(-8deg) drop-shadow(0 25px 40px rgba(0,0,0,.28))'
              }}
            />
            
            {/* Layer 8: Color Matching Overlay */}
            <div className="absolute inset-x-[25px] bottom-0 h-[300px] mix-blend-soft-light" style={{
              background: 'linear-gradient(180deg, rgba(133,94,255,.18), rgba(255,255,255,.06))',
              WebkitMaskImage: 'url(/main centre logo/girl.png)',
              WebkitMaskSize: 'contain',
              WebkitMaskPosition: 'bottom',
              WebkitMaskRepeat: 'no-repeat'
            }} />
          </div>

          {/* Layer 9: Head Aura */}
          <div className="absolute top-[80px] w-[120px] h-[120px] blur-[35px]" style={{
            background: 'radial-gradient(circle, rgba(255,255,255,.42), transparent 70%)'
          }} />
        </div>

        {/* Magic Formula: Petals ABOVE the girl's shoulders */}
        <motion.div 
          className="absolute flex items-center justify-center bottom-[150px]"
          animate={{ scale: [1, 1.015, 1] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        >
          <svg width="300" height="200" viewBox="0 0 300 200" className="opacity-80">
            {/* A couple of petals overlapping the foreground */}
            <path d="M150,200 C120,80 180,80 150,200" fill="url(#petalGradForeground1)" opacity="0.18" />
            <path d="M150,200 C90,110 130,50 150,200" fill="url(#petalGradForeground2)" opacity="0.15" />
            <path d="M150,200 C210,110 170,50 150,200" fill="url(#petalGradForeground3)" opacity="0.2" />
            
            <defs>
              <linearGradient id="petalGradForeground1" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#C79CFF" />
                <stop offset="100%" stopColor="transparent" />
              </linearGradient>
              <linearGradient id="petalGradForeground2" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#9F6DFF" />
                <stop offset="100%" stopColor="transparent" />
              </linearGradient>
              <linearGradient id="petalGradForeground3" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#6F42E5" />
                <stop offset="100%" stopColor="transparent" />
              </linearGradient>
            </defs>
          </svg>
        </motion.div>

        {/* Layer 12: Floating Particles */}
        {Array.from({ length: 40 }).map((_, i) => {
          const size = Math.floor(Math.random() * 3) + 2;
          const top = Math.random() * 100;
          const left = Math.random() * 100;
          const opacity = [0.2, 0.4, 0.1, 0.35][Math.floor(Math.random() * 4)];
          const duration = [8, 12, 15][Math.floor(Math.random() * 3)];
          const delay = Math.random() * 10;
          
          return (
            <motion.div
              key={`particle-${i}`}
              className="absolute rounded-full bg-white blur-[0.5px]"
              style={{
                width: size,
                height: size,
                top: `${top}%`,
                left: `${left}%`,
              }}
              animate={{
                y: [0, -25],
                opacity: [0, opacity, 0]
              }}
              transition={{
                duration: duration,
                repeat: Infinity,
                delay: delay,
                ease: "linear"
              }}
            />
          );
        })}

      </div>
    </>
  );
}

// Complex Multi-layered SVG Lotus
function LotusSVG() {
  const petals = [];
  const numPetals = 24;
  
  for (let i = 0; i < numPetals; i++) {
    const angle = (i * 360) / numPetals;
    const isInner = i % 2 === 0;
    const length = isInner ? 150 : 250;
    const width = isInner ? 50 : 80;
    
    const opacities = [0.28, 0.35, 0.42, 0.25, 0.48, 0.33];
    const opacity = opacities[i % opacities.length];

    petals.push(
      <g key={i} transform={`rotate(${angle} 250 250)`}>
        <path 
          d={`M250,250 C${250-width},${250-length/2} ${250+width},${250-length/2} 250,${250-length}`} 
          fill={`url(#petalGrad${i % 3})`} 
          opacity={opacity}
          style={{ mixBlendMode: 'screen' }}
        />
      </g>
    );
  }

  return (
    <svg width="500" height="500" viewBox="0 0 500 500" className="overflow-visible">
      <defs>
        <linearGradient id="petalGrad0" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#C79CFF" />
          <stop offset="40%" stopColor="#9F6DFF" />
          <stop offset="80%" stopColor="#6F42E5" />
          <stop offset="100%" stopColor="transparent" />
        </linearGradient>
        <linearGradient id="petalGrad1" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#DFCDFF" />
          <stop offset="50%" stopColor="#8157FF" />
          <stop offset="100%" stopColor="transparent" />
        </linearGradient>
        <linearGradient id="petalGrad2" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#A46BFF" />
          <stop offset="50%" stopColor="#C9A7FF" />
          <stop offset="100%" stopColor="transparent" />
        </linearGradient>
      </defs>
      {petals}
      
      {/* Inner dense core petals */}
      <g transform="scale(0.4) translate(375, 375)">
         {petals}
      </g>
    </svg>
  );
}
