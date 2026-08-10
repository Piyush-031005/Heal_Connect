'use client';

import { useState } from 'react';

const MODALITIES = [
  { id: 'astrology', name: 'Astrology', image: '/12-modalities-v2/astrology.png' },
  { id: 'tarot', name: 'Tarot', image: '/12-modalities-v2/tarot.png' },
  { id: 'palm-reading', name: 'Palm Reading', image: '/12-modalities-v2/palm.png' },
  { id: 'face-reading', name: 'Face Reading', image: '/12-modalities-v2/face.png' },
  { id: 'numerology', name: 'Numerology', image: '/12-modalities-v2/numerology.png' },
  { id: 'energy-healing', name: 'Energy Healing', image: '/12-modalities-v2/energy.png' },
  { id: 'meditation', name: 'Meditation', image: '/12-modalities-v2/meditation.png' },
  { id: 'yoga', name: 'Yoga', image: '/12-modalities-v2/yoga.png' },
  { id: 'vastu', name: 'Vastu', image: '/12-modalities-v2/vastu.png' },
  { id: 'eft', name: 'EFT Tapping', image: '/12-modalities-v2/eft.png' },
  { id: 'spiritual', name: 'Spiritual Guide', image: '/12-modalities-v2/spiritual.png' },
  { id: 'sound-healing', name: 'Sound Healing', image: '/12-modalities-v2/sound.png' },
];

export default function OpticalWheel() {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  const cx = 500;
  const cy = 500;
  const outerRadius = 380;

  const isAnyHovered = hoveredIdx !== null;
  const playState = isAnyHovered ? 'paused' : 'running';

  const handleScrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative w-full h-full max-w-[900px] max-h-[900px] aspect-square flex items-center justify-center pointer-events-none mx-auto">
      
      {/* Central Glow / Magical Aura */}
      <div className="absolute inset-0 bg-primary/10 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="absolute inset-0 z-10 pointer-events-auto">
        <svg viewBox="0 0 1000 1000" className="w-full h-full overflow-visible">
          
          {/* LAYER 1: Deep Mathematical Rings */}
          <g style={{ animation: 'spin 180s linear infinite', transformOrigin: '500px 500px' }}>
            {/* Outer decorative tracks */}
            <circle cx={cx} cy={cy} r={outerRadius + 80} fill="none" className="stroke-primary/20" strokeWidth="1" />
            <circle cx={cx} cy={cy} r={outerRadius + 95} fill="none" className="stroke-primary/10" strokeWidth="0.5" strokeDasharray="4 8" />
            
            {/* Intricate edge markings */}
            {[...Array(120)].map((_, i) => (
              <line 
                key={`mark-${i}`}
                x1={cx + (outerRadius + 80) * Math.cos(i * 3 * Math.PI / 180)}
                y1={cy + (outerRadius + 80) * Math.sin(i * 3 * Math.PI / 180)}
                x2={cx + (outerRadius + (i % 5 === 0 ? 95 : 85)) * Math.cos(i * 3 * Math.PI / 180)}
                y2={cy + (outerRadius + (i % 5 === 0 ? 95 : 85)) * Math.sin(i * 3 * Math.PI / 180)}
                className={i % 5 === 0 ? "stroke-primary/40" : "stroke-primary/20"}
                strokeWidth={i % 5 === 0 ? "2" : "1"}
              />
            ))}
            <circle cx={cx} cy={cy} r={outerRadius + 110} fill="none" className="stroke-primary/20" strokeWidth="1" />
          </g>
          
          {/* LAYER 2: Sacred Geometry (Metatron's Cube / Hexagrams) */}
          <g style={{ animation: 'spin 240s linear infinite reverse', transformOrigin: '500px 500px' }}>
            <circle cx={cx} cy={cy} r={outerRadius - 60} fill="none" className="stroke-primary/20" strokeWidth="1" />
            <circle cx={cx} cy={cy} r={outerRadius - 100} fill="none" className="stroke-primary/30" strokeWidth="1.5" strokeDasharray="15 5" />
            
            {[0, 15, 30, 45, 60, 75].map((rot, i) => (
              <rect 
                key={`sq-${i}`}
                x={cx - (outerRadius - 60)} 
                y={cy - (outerRadius - 60)} 
                width={(outerRadius - 60) * 2} 
                height={(outerRadius - 60) * 2} 
                fill="none" 
                className="stroke-primary/10 transition-colors duration-1000" 
                strokeWidth="1"
                transform={`rotate(${rot}, ${cx}, ${cy})`}
              />
            ))}
          </g>

          {/* LAYER 3: Intricate 12-pointed star pattern */}
          <g style={{ animation: 'spin 300s linear infinite', transformOrigin: '500px 500px' }}>
             {[0, 30].map((rot, i) => (
              <polygon 
                key={`hex-${i}`}
                points={`
                  ${cx},${cy - (outerRadius - 140)} 
                  ${cx + (outerRadius - 140) * Math.sin(Math.PI/3)},${cy + (outerRadius - 140) * Math.cos(Math.PI/3)} 
                  ${cx - (outerRadius - 140) * Math.sin(Math.PI/3)},${cy + (outerRadius - 140) * Math.cos(Math.PI/3)}
                `}
                fill="none"
                className="stroke-primary/20"
                strokeWidth="1.5"
                transform={`rotate(${rot}, ${cx}, ${cy})`}
              />
             ))}
             {[0, 30].map((rot, i) => (
              <polygon 
                key={`hex-inv-${i}`}
                points={`
                  ${cx},${cy + (outerRadius - 140)} 
                  ${cx + (outerRadius - 140) * Math.sin(Math.PI/3)},${cy - (outerRadius - 140) * Math.cos(Math.PI/3)} 
                  ${cx - (outerRadius - 140) * Math.sin(Math.PI/3)},${cy - (outerRadius - 140) * Math.cos(Math.PI/3)}
                `}
                fill="none"
                className="stroke-primary/20"
                strokeWidth="1.5"
                transform={`rotate(${rot}, ${cx}, ${cy})`}
              />
             ))}
             <circle cx={cx} cy={cy} r={outerRadius - 140} fill="none" className="stroke-primary/20" strokeWidth="2" />
          </g>

          {/* LAYER 4: The 12 Modalities orbiting */}
          <circle cx={cx} cy={cy} r={outerRadius} fill="none" className="stroke-primary/30" strokeWidth="2" />
          
          <g style={{ animation: 'spin 120s linear infinite', animationPlayState: playState, transformOrigin: '500px 500px' }}>
            {MODALITIES.map((modality, idx) => {
              const angle = (idx * 30 - 90) * (Math.PI / 180);
              const x = cx + outerRadius * Math.cos(angle);
              const y = cy + outerRadius * Math.sin(angle);
              const isHovered = hoveredIdx === idx;
              
              return (
                <g 
                  key={idx} 
                  transform={`translate(${x}, ${y}) scale(${isHovered ? 1.25 : 1})`}
                  onMouseEnter={() => setHoveredIdx(idx)}
                  onMouseLeave={() => setHoveredIdx(null)}
                  onClick={() => handleScrollTo(modality.id)}
                  className="transition-all duration-500 ease-out cursor-pointer group"
                >
                  {/* Notice transformOrigin '0px 0px' here because we translated to the node's center! */}
                  <g style={{ animation: 'spin 120s linear infinite reverse', animationPlayState: playState, transformOrigin: '0px 0px' }}>
                    
                    {/* Hit Area */}
                    <circle cx="0" cy="0" r="55" fill="transparent" pointerEvents="all" />
                    
                    {/* Button Background */}
                    <circle cx="0" cy="0" r="40" className="fill-[#090514] stroke-primary/50 transition-all duration-300 shadow-2xl" strokeWidth={isHovered ? "3" : "1.5"} style={{ filter: 'drop-shadow(0px 8px 16px rgba(0,0,0,0.15))' }} />
                    
                    {/* Glowing Aura on Hover */}
                    <circle cx="0" cy="0" r="48" className="fill-transparent stroke-primary/0 group-hover:stroke-primary/50 transition-all duration-300 blur-[2px]" strokeWidth="3" />
                    
                    {/* Outer animated dots on hover */}
                    <g className="opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ animation: 'spin 10s linear infinite', transformOrigin: '0px 0px' }}>
                      {[0, 1, 2, 3].map((d) => (
                        <circle key={d} cx={44 * Math.cos(d * Math.PI/2)} cy={44 * Math.sin(d * Math.PI/2)} r="3" className="fill-primary" />
                      ))}
                    </g>

                    {/* Image */}
                    <image 
                      href={modality.image} 
                      x="-25" 
                      y="-25" 
                      width="50" 
                      height="50" 
                      className={`transition-all duration-300 ${isHovered ? 'scale-110 drop-shadow-lg' : 'opacity-90'}`}
                      style={{ mixBlendMode: 'screen' }} 
                    />

                    {/* Node Text Label (Floating Button Style) */}
                    <foreignObject x="-60" y="55" width="120" height="40" className={`pointer-events-none overflow-visible transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
                      <div className="w-full flex justify-center">
                        <span className="bg-primary text-primary-foreground text-xs font-bold px-3 py-1.5 rounded-full shadow-lg whitespace-nowrap">
                          {modality.name}
                        </span>
                      </div>
                    </foreignObject>

                  </g>
                </g>
              );
            })}
          </g>

          {/* LAYER 5: Central Focus Core (Logo) */}
          <g transform={`translate(${cx}, ${cy})`}>
            {/* Intricate Inner Core */}
            <circle cx="0" cy="0" r="160" fill="none" className="stroke-primary/20" strokeWidth="1" />
            <circle cx="0" cy="0" r="145" fill="none" className="stroke-primary/40" strokeWidth="2" strokeDasharray="4 12" style={{ animation: 'spin 60s linear infinite', transformOrigin: '0px 0px' }} />
            
            {/* Spinning runes/dash array core */}
            <circle cx="0" cy="0" r="115" fill="none" className="stroke-primary/50" strokeWidth="4" strokeDasharray="1 15" style={{ animation: 'spin 90s linear infinite reverse', transformOrigin: '0px 0px' }} />
            <circle cx="0" cy="0" r="95" fill="none" className="stroke-primary/30" strokeWidth="1" strokeDasharray="30 10" style={{ animation: 'spin 40s linear infinite', transformOrigin: '0px 0px' }} />
            
            {/* Solid Center Backdrop */}
            <circle cx="0" cy="0" r="85" className="fill-[#090514]/90 backdrop-blur-md stroke-primary/30" strokeWidth="1" />
          </g>

        </svg>

        {/* HTML Center Overlay for Logo */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-36 h-36 flex items-center justify-center bg-transparent rounded-full drop-shadow-2xl">
            {/* The primary logo */}
            <img src="/new_logo.png" alt="Main Logo" className="w-32 h-32 object-contain scale-[1.3]" style={{ filter: 'drop-shadow(0 0 10px rgba(78,89,194,0.3)) mix-blend-mode(screen)' }} />
          </div>
        </div>

      </div>
    </div>
  );
}
