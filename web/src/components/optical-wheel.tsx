'use client';

import { useState } from 'react';

const MODALITIES = [
  { id: 'astrology', name: 'Astrology', image: '/12-modalities/astrology.png' },
  { id: 'tarot', name: 'Tarot', image: '/12-modalities/tarocard.png' },
  { id: 'palm-reading', name: 'Palm Reading', image: '/12-modalities/ai-match.png' },
  { id: 'face-reading', name: 'Face Reading', image: '/12-modalities/face reading.png' },
  { id: 'numerology', name: 'Numerology', image: '/12-modalities/numeriology.png' },
  { id: 'energy-healing', name: 'Energy Healing', image: '/12-modalities/energy healing.png' },
  { id: 'meditation', name: 'Meditation', image: '/12-modalities/medidation and breathing.png' },
  { id: 'yoga', name: 'Yoga', image: '/12-modalities/yoga.png' },
  { id: 'vastu', name: 'Vastu', image: '/12-modalities/vastu.png' },
  { id: 'eft', name: 'EFT Tapping', image: '/12-modalities/eft.png' },
  { id: 'spiritual', name: 'Spiritual Guide', image: '/12-modalities/spitutality.png' },
  { id: 'sound-healing', name: 'Sound Healing', image: '/12-modalities/sound.png' },
];

export default function OpticalWheel() {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  const cx = 500;
  const cy = 500;
  const outerRadius = 400;

  const isAnyHovered = hoveredIdx !== null;
  const playState = isAnyHovered ? 'paused' : 'running';

  const handleScrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative w-full h-full max-w-[900px] max-h-[900px] aspect-square flex items-center justify-center pointer-events-none">
      
      {/* Central Glow / Magical Aura */}
      <div className="absolute inset-0 bg-primary/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="absolute inset-0 z-10 pointer-events-auto">
        <svg viewBox="0 0 1000 1000" className="w-full h-full overflow-visible">
          
          {/* LAYER 1: Deep Mathematical Rings (Like the reference image) */}
          <g style={{ animation: 'spin 180s linear infinite', transformOrigin: 'center' }}>
            <circle cx={cx} cy={cy} r={outerRadius + 20} fill="none" className="stroke-primary/20" strokeWidth="2" />
            <circle cx={cx} cy={cy} r={outerRadius + 30} fill="none" className="stroke-primary/40" strokeWidth="1" />
            <circle cx={cx} cy={cy} r={outerRadius + 45} fill="none" className="stroke-primary/20" strokeWidth="6" strokeDasharray="1 10" />
            <circle cx={cx} cy={cy} r={outerRadius + 60} fill="none" className="stroke-primary/20" strokeWidth="1" />
            
            {/* Runic markings on outer edge */}
            {[...Array(72)].map((_, i) => (
              <line 
                key={`mark-${i}`}
                x1={cx + (outerRadius + 60) * Math.cos(i * 5 * Math.PI / 180)}
                y1={cy + (outerRadius + 60) * Math.sin(i * 5 * Math.PI / 180)}
                x2={cx + (outerRadius + (i % 6 === 0 ? 80 : 70)) * Math.cos(i * 5 * Math.PI / 180)}
                y2={cy + (outerRadius + (i % 6 === 0 ? 80 : 70)) * Math.sin(i * 5 * Math.PI / 180)}
                className={i % 6 === 0 ? "stroke-primary/40" : "stroke-primary/20"}
                strokeWidth={i % 6 === 0 ? "2" : "1"}
              />
            ))}
            <circle cx={cx} cy={cy} r={outerRadius + 85} fill="none" className="stroke-primary/20" strokeWidth="1" />
          </g>
          
          {/* LAYER 2: Overlapping geometric mandalas (Squares & Triangles) */}
          <g style={{ animation: 'spin 240s linear infinite reverse', transformOrigin: 'center' }}>
            {[0, 30, 60].map((rot, i) => (
              <rect 
                key={`sq-${i}`}
                x={cx - (outerRadius - 60)} 
                y={cy - (outerRadius - 60)} 
                width={(outerRadius - 60) * 2} 
                height={(outerRadius - 60) * 2} 
                fill="none" 
                className="stroke-primary/20" 
                strokeWidth="1.5"
                transform={`rotate(${rot}, ${cx}, ${cy})`}
              />
            ))}
            
            <circle cx={cx} cy={cy} r={outerRadius - 60} fill="none" className="stroke-primary/20" strokeWidth="1" />
            <circle cx={cx} cy={cy} r={outerRadius - 80} fill="none" className="stroke-primary/40" strokeWidth="1" strokeDasharray="10 5" />
          </g>

          {/* LAYER 3: Intricate 12-pointed star pattern */}
          <g style={{ animation: 'spin 300s linear infinite', transformOrigin: 'center' }}>
             {[0, 15, 30, 45].map((rot, i) => (
              <polygon 
                key={`hex-${i}`}
                points={`
                  ${cx},${cy - (outerRadius - 120)} 
                  ${cx + (outerRadius - 120) * Math.sin(Math.PI/3)},${cy + (outerRadius - 120) * Math.cos(Math.PI/3)} 
                  ${cx - (outerRadius - 120) * Math.sin(Math.PI/3)},${cy + (outerRadius - 120) * Math.cos(Math.PI/3)}
                `}
                fill="none"
                className="stroke-primary/30"
                strokeWidth="1"
                transform={`rotate(${rot}, ${cx}, ${cy})`}
              />
             ))}
             <circle cx={cx} cy={cy} r={outerRadius - 120} fill="none" className="stroke-primary/20" strokeWidth="2" />
          </g>

          {/* LAYER 4: The 12 Modalities orbiting on a solid magical ring */}
          <circle cx={cx} cy={cy} r={outerRadius} fill="none" className="stroke-primary/30" strokeWidth="2" />
          <g style={{ animation: 'spin 120s linear infinite', animationPlayState: playState, transformOrigin: 'center' }}>
            
            {/* The nodes */}
            {MODALITIES.map((modality, idx) => {
              const angle = (idx * 30 - 90) * (Math.PI / 180);
              const x = cx + outerRadius * Math.cos(angle);
              const y = cy + outerRadius * Math.sin(angle);
              const isHovered = hoveredIdx === idx;
              
              return (
                <g 
                  key={idx} 
                  transform={`translate(${x}, ${y}) scale(${isHovered ? 1.3 : 1})`}
                  onMouseEnter={() => setHoveredIdx(idx)}
                  onMouseLeave={() => setHoveredIdx(null)}
                  onClick={() => handleScrollTo(modality.id)}
                  className="transition-all duration-500 ease-out cursor-pointer group"
                >
                  <g style={{ animation: 'spin 120s linear infinite reverse', animationPlayState: playState, transformOrigin: 'center' }}>
                    
                    {/* Hit Area */}
                    <circle cx="0" cy="0" r="50" fill="transparent" pointerEvents="all" />
                    
                    {/* Dark backdrop circle for PNG to pop using mix-blend-screen */}
                    <circle cx="0" cy="0" r="30" className="fill-[#090514] stroke-primary/50 transition-all duration-300" strokeWidth={isHovered ? "2" : "1"} />
                    
                    {/* Glowing Aura on Hover */}
                    <circle cx="0" cy="0" r="40" className="fill-transparent stroke-primary/0 group-hover:stroke-primary/50 transition-all duration-300 blur-sm" strokeWidth="4" />
                    
                    {/* The PNG Image */}
                    <image 
                      href={modality.image} 
                      x="-20" 
                      y="-20" 
                      width="40" 
                      height="40" 
                      className="opacity-90 group-hover:opacity-100 transition-opacity drop-shadow-lg"
                      style={{ mixBlendMode: 'screen' }} 
                    />

                    {/* Node Text Label (Floating Outside) */}
                    <text
                      x="0"
                      y={isHovered ? "-45" : "-40"}
                      textAnchor="middle"
                      className="fill-foreground font-sans font-medium tracking-wide transition-all duration-300 shadow-sm pointer-events-none"
                      style={{ 
                        fontSize: '14px',
                        opacity: isHovered ? 1 : 0,
                      }}
                    >
                      {modality.name}
                    </text>
                  </g>
                </g>
              );
            })}
          </g>

          {/* LAYER 5: Central Focus Core (Logo) */}
          <g transform={`translate(${cx}, ${cy})`}>
            {/* Intricate Inner Core */}
            <circle cx="0" cy="0" r="140" fill="none" className="stroke-primary/20" strokeWidth="1" />
            <circle cx="0" cy="0" r="130" fill="none" className="stroke-primary/40" strokeWidth="2" strokeDasharray="10 20" style={{ animation: 'spin 60s linear infinite' }} />
            <circle cx="0" cy="0" r="115" fill="none" className="stroke-primary/30" strokeWidth="1" />
            
            {/* Spinning runes/dash array core */}
            <circle cx="0" cy="0" r="100" fill="none" className="stroke-primary/50" strokeWidth="3" strokeDasharray="5 20" style={{ animation: 'spin 60s linear infinite' }} />
            <circle cx="0" cy="0" r="85" fill="none" className="stroke-primary/40" strokeWidth="1" strokeDasharray="30 10" style={{ animation: 'spin 40s linear infinite reverse' }} />
            
            {/* Solid Center Backdrop */}
            <circle cx="0" cy="0" r="70" className="fill-background/80 backdrop-blur-md stroke-primary/30" strokeWidth="1" />
          </g>

        </svg>

        {/* HTML Center Overlay for Logo */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-32 h-32 flex items-center justify-center">
            {/* Using mix-blend-screen to make background of logo transparent and colors pop */}
            <img src="/logo.png" alt="Main Logo" className="w-full h-full object-contain mix-blend-screen scale-150 drop-shadow-[0_0_15px_rgba(78,89,194,0.5)]" />
          </div>
        </div>

      </div>
    </div>
  );
}
