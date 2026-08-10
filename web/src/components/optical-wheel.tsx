'use client';

import { useState } from 'react';

const MODALITIES = [
  { id: 'astrology', name: 'Astrology', image: '/12-modalities-v2/astrology-v3.png' },
  { id: 'tarot', name: 'Tarot', image: '/12-modalities-v2/tarot-v3.png' },
  { id: 'palm-reading', name: 'Palm Reading', image: '/12-modalities-v2/palm.png' },
  { id: 'face-reading', name: 'Face Reading', image: '/12-modalities-v2/face-v3.png' },
  { id: 'numerology', name: 'Numerology', image: '/12-modalities-v2/numerology.png' },
  { id: 'energy-healing', name: 'Energy Healing', image: '/12-modalities-v2/energy.png' },
  { id: 'meditation', name: 'Meditation', image: '/12-modalities-v2/meditation.png' },
  { id: 'yoga', name: 'Yoga', image: '/12-modalities-v2/yoga.png' },
  { id: 'vastu', name: 'Vastu', image: '/12-modalities-v2/vastu.png' },
  { id: 'eft', name: 'EFT Tapping', image: '/12-modalities-v2/eft.png' },
  { id: 'spiritual', name: 'Spiritual Guide', image: '/12-modalities-v2/spiritual.png' },
  { id: 'sound-healing', name: 'Sound Healing', image: '/12-modalities-v2/sound-v4.png' },
];

export default function OpticalWheel() {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [playState, setPlayState] = useState<'running' | 'paused'>('running');

  const cx = 500;
  const cy = 500;
  const outerRadius = 380;

  const handleScrollTo = (id: string) => {
    const element = document.getElementById(`modality-${id}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div 
      className="relative w-full h-full select-none"
      onMouseEnter={() => setPlayState('paused')}
      onMouseLeave={() => setPlayState('running')}
    >
      
      <div className="absolute inset-0 z-10 pointer-events-auto">
        <svg viewBox="0 0 1000 1000" className="w-full h-full mx-auto filter drop-shadow-2xl">
          <defs>
            <radialGradient id="glow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.4" />
              <stop offset="100%" stopColor="var(--primary)" stopOpacity="0" />
            </radialGradient>
          </defs>
          
          <circle cx={cx} cy={cy} r="480" fill="url(#glow)" />

          {/* LAYER 1: Minimal Rings */}
          <g style={{ animation: 'spin 180s linear infinite', transformOrigin: '500px 500px' }}>
            <circle cx={cx} cy={cy} r={outerRadius + 80} fill="none" stroke="#312E81" opacity="0.3" strokeWidth="2" />
            
            {[...Array(60)].map((_, i) => (
              <line 
                key={`mark-${i}`}
                x1={cx + (outerRadius + 80) * Math.cos(i * 6 * Math.PI / 180)}
                y1={cy + (outerRadius + 80) * Math.sin(i * 6 * Math.PI / 180)}
                x2={cx + (outerRadius + (i % 5 === 0 ? 95 : 85)) * Math.cos(i * 6 * Math.PI / 180)}
                y2={cy + (outerRadius + (i % 5 === 0 ? 95 : 85)) * Math.sin(i * 6 * Math.PI / 180)}
                stroke="#312E81"
                opacity={i % 5 === 0 ? "0.6" : "0.3"}
                strokeWidth={i % 5 === 0 ? "3" : "1.5"}
              />
            ))}
            <circle cx={cx} cy={cy} r={outerRadius + 110} fill="none" stroke="#312E81" opacity="0.2" strokeWidth="2" />
          </g>

          {/* LAYER 4: The 12 Modalities orbiting */}
          <circle cx={cx} cy={cy} r={outerRadius} fill="none" stroke="#312E81" opacity="0.5" strokeWidth="4" />
          
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
                  <g style={{ animation: 'spin 120s linear infinite reverse', animationPlayState: playState, transformOrigin: '0px 0px' }}>
                    
                    {/* Hit Area */}
                    <circle cx="0" cy="0" r="90" fill="transparent" pointerEvents="all" />
                    
                    {/* Button Background - Changed to light theme */}
                    <circle cx="0" cy="0" r="85" className="fill-white transition-all duration-300 shadow-xl" stroke="#312E81" opacity={isHovered ? "1" : "0.5"} strokeWidth={isHovered ? "6" : "3"} style={{ filter: 'drop-shadow(0px 8px 24px rgba(78,89,194,0.4))' }} />
                    
                    {/* Glowing Aura on Hover */}
                    <circle cx="0" cy="0" r="95" className="fill-transparent transition-all duration-300 blur-[3px]" stroke="#312E81" opacity={isHovered ? "0.6" : "0"} strokeWidth="6" />
                    
                    {/* Outer animated dots on hover */}
                    <g className="opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ animation: 'spin 10s linear infinite', transformOrigin: '0px 0px' }}>
                      {[0, 1, 2, 3].map((d) => (
                        <circle key={d} cx={90 * Math.cos(d * Math.PI/2)} cy={90 * Math.sin(d * Math.PI/2)} r="6" fill="#312E81" />
                      ))}
                    </g>

                    {/* Image */}
                    <image 
                      href={`${modality.image}?v=4`} 
                      x="-80" 
                      y="-80" 
                      width="160" 
                      height="160" 
                      className={`transition-all duration-300 ${isHovered ? 'scale-110 drop-shadow-2xl' : 'opacity-100'}`}
                    />

                    {/* Node Text Label (Floating Button Style) */}
                    <foreignObject x="-90" y="100" width="180" height="50" className={`pointer-events-none overflow-visible transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
                      <div className="w-full flex justify-center">
                        <span className="bg-white border-2 border-indigo-200 text-[#312E81] text-sm font-bold px-6 py-2 rounded-full shadow-2xl whitespace-nowrap">
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
            <circle cx="0" cy="0" r="160" fill="none" stroke="#312E81" opacity="0.5" strokeWidth="3" />
            <circle cx="0" cy="0" r="145" fill="none" stroke="#312E81" opacity="0.7" strokeWidth="4" strokeDasharray="4 12" style={{ animation: 'spin 60s linear infinite', transformOrigin: '0px 0px' }} />
            
            {/* Spinning runes/dash array core */}
            <circle cx="0" cy="0" r="115" fill="none" stroke="#312E81" opacity="0.8" strokeWidth="5" strokeDasharray="1 15" style={{ animation: 'spin 90s linear infinite reverse', transformOrigin: '0px 0px' }} />
            <circle cx="0" cy="0" r="95" fill="none" stroke="#312E81" opacity="0.6" strokeWidth="3" strokeDasharray="30 10" style={{ animation: 'spin 40s linear infinite', transformOrigin: '0px 0px' }} />
            
            {/* Solid Center Backdrop */}
            <circle cx="0" cy="0" r="85" className="fill-white/90 backdrop-blur-md shadow-[0_0_50px_rgba(78,89,194,0.5)]" stroke="#312E81" opacity="0.5" strokeWidth="3" />
          </g>

        </svg>

        {/* HTML Center Overlay for Logo */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-48 h-48 flex items-center justify-center bg-transparent rounded-full drop-shadow-2xl">
            {/* The primary logo */}
            <img src="/new_logo.png" alt="Main Logo" className="w-40 h-40 object-contain scale-[1.3]" style={{ filter: 'drop-shadow(0 0 20px rgba(78,89,194,0.4))' }} />
          </div>
        </div>

      </div>
    </div>
  );
}
