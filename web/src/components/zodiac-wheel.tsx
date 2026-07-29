'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Sparkles } from 'lucide-react';

const ZODIAC_SIGNS = [
  { name: 'Aries', image: '/zodiac/aries.png' },
  { name: 'Taurus', image: '/zodiac/taurus.png' },
  { name: 'Gemini', image: '/zodiac/gemini.png' },
  { name: 'Cancer', image: '/zodiac/cancer.png' },
  { name: 'Leo', image: '/zodiac/leo.png' },
  { name: 'Virgo', image: '/zodiac/virgo.png' },
  { name: 'Libra', image: '/zodiac/libra.png' },
  { name: 'Scorpio', image: '/zodiac/scorpio.png' },
  { name: 'Sagittarius', image: '/zodiac/sagittarius.png' },
  { name: 'Capricorn', image: '/zodiac/capricorn.png' },
  { name: 'Aquarius', image: '/zodiac/aquarius.png' },
  { name: 'Pisces', image: '/zodiac/pisces.png' },
];

export default function ZodiacWheel() {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  
  // Center of the massive wheel
  const cx = 400;
  const cy = 400;
  const radius = 320; 
  
  const isAnyHovered = hoveredIdx !== null;
  const playState = isAnyHovered ? 'paused' : 'running';

  return (
    <div className="relative w-[600px] h-[600px] md:w-[800px] md:h-[800px] flex items-center justify-center">
      {/* Deep Space Ambient Glows */}
      <div className="absolute inset-0 bg-gradient-to-tr from-[#1a1235]/40 via-transparent to-[#2EC4B6]/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute inset-1/4 bg-primary/20 rounded-full blur-[100px] pointer-events-none" />

      {/* Rotating Wheel Container */}
      <div 
        className="absolute inset-0 z-10 cursor-crosshair group"
        style={{ animation: 'spin 120s linear infinite', animationPlayState: playState }}
      >
        <svg viewBox="0 0 800 800" className="w-full h-full overflow-visible">
          {/* INTRICATE MAGICAL RINGS */}
          
          {/* Outer glowing halo */}
          <circle cx={cx} cy={cy} r={radius + 40} stroke="#D6B46B" opacity="0.1" strokeWidth="1" fill="none" />
          <circle cx={cx} cy={cy} r={radius + 30} stroke="#D6B46B" opacity="0.3" strokeWidth="0.5" strokeDasharray="2 6" fill="none" />
          
          {/* Main Track */}
          <circle cx={cx} cy={cy} r={radius} stroke="#D6B46B" opacity="0.4" strokeWidth="1.5" fill="none" />
          <circle cx={cx} cy={cy} r={radius - 10} stroke="#D6B46B" opacity="0.15" strokeWidth="1" fill="none" />
          
          {/* Inner complex rings */}
          <circle cx={cx} cy={cy} r={radius - 60} stroke="#D6B46B" opacity="0.3" strokeWidth="1" strokeDasharray="8 12" fill="none" />
          <circle cx={cx} cy={cy} r={radius - 80} stroke="#2EC4B6" opacity="0.2" strokeWidth="2" strokeDasharray="1 10" fill="none" />
          <circle cx={cx} cy={cy} r={radius - 120} stroke="#D6B46B" opacity="0.4" strokeWidth="1" fill="none" />
          
          {/* Geometric inner star (12 points) */}
          <path 
            d={`M ${cx},${cy - (radius - 120)} 
                ${Array.from({length: 12}).map((_, i) => {
                  const a1 = (i * 30 + 15) * (Math.PI / 180);
                  const a2 = ((i + 1) * 30) * (Math.PI / 180);
                  const rInner = radius - 150;
                  const rOuter = radius - 120;
                  return `L ${(cx + rInner * Math.sin(a1)).toFixed(2)},${(cy - rInner * Math.cos(a1)).toFixed(2)} L ${(cx + rOuter * Math.sin(a2)).toFixed(2)},${(cy - rOuter * Math.cos(a2)).toFixed(2)}`;
                }).join(' ')} Z`}
            fill="none" 
            stroke="#D6B46B" 
            opacity="0.15" 
            strokeWidth="1"
          />

          {/* Zodiac Signs around the track */}
          {ZODIAC_SIGNS.map((zodiac, idx) => {
            const angle = (idx * 30 - 90) * (Math.PI / 180); // Start at top
            const x = (cx + radius * Math.cos(angle)).toFixed(2);
            const y = (cy + radius * Math.sin(angle)).toFixed(2);
            const isHovered = hoveredIdx === idx;
            const imageSrc = zodiac.image;
            
            return (
              <g 
                key={idx} 
                transform={`translate(${x}, ${y}) scale(${isHovered ? 1.4 : 1})`}
                onMouseEnter={() => setHoveredIdx(idx)}
                onMouseLeave={() => setHoveredIdx(null)}
                className="transition-all duration-500 ease-out"
                style={{
                  opacity: hoveredIdx === null ? 0.85 : (isHovered ? 1 : 0.3),
                  filter: isHovered ? 'drop-shadow(0 0 20px rgba(214, 180, 107, 0.8))' : 'none',
                }}
              >
                {/* Counter-rotate group to keep upright */}
                <g style={{ animation: 'spin 120s linear infinite reverse', animationPlayState: playState }}>
                  <circle cx="0" cy="0" r="40" fill="transparent" className="cursor-pointer" />
                  
                  <circle cx="0" cy="0" r="32" fill={isHovered ? 'rgba(214,180,107,0.15)' : 'rgba(0,0,0,0.6)'} stroke={isHovered ? '#D6B46B' : 'rgba(214,180,107,0.4)'} strokeWidth="1" className="transition-all duration-300 backdrop-blur-md" />
                  <circle cx="0" cy="0" r="28" fill="transparent" stroke={isHovered ? '#2EC4B6' : 'rgba(46,196,182,0.3)'} strokeWidth="0.5" strokeDasharray="2 4" className="transition-all duration-300" />
                  
                  {/* High-Fidelity Custom Image Asset */}
                  <g className="transition-all duration-500 pointer-events-none" style={{ transform: isHovered ? 'scale(1.15)' : 'scale(1)' }}>
                    <image 
                      href={imageSrc} 
                      x="-80" 
                      y="-80" 
                      width="160" 
                      height="160" 
                      className="transition-all duration-500" 
                      style={{ 
                        filter: isHovered ? 'drop-shadow(0 0 12px rgba(214,180,107,0.8)) brightness(1.2)' : 'none' 
                      }} 
                    />
                  </g>
                  
                  {/* Zodiac Name */}
                  <text
                    x="0"
                    y="22"
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fill="#D6B46B"
                    className="font-sans tracking-widest uppercase pointer-events-none transition-all duration-300"
                    style={{ 
                      fontSize: '10px',
                      fontWeight: 600,
                      opacity: isHovered ? 1 : 0,
                      letterSpacing: '0.15em'
                    }}
                  >
                    {zodiac.name}
                  </text>
                </g>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Center Grand Focus Point */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
        <div className="w-48 h-48 rounded-full flex items-center justify-center relative">
          {/* Magical center sunburst */}
          <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle,rgba(214,180,107,0.3)_0%,transparent_70%)] animate-pulse" style={{ animationDuration: '4s' }} />
          
          <Image src="/logo.png" alt="HealConnect" width={140} height={140} quality={100} unoptimized className="rounded-full animate-pulse drop-shadow-[0_0_20px_rgba(214,180,107,0.9)]" style={{ animationDuration: '3s' }} />
          
          {/* Intricate counter-spinning rings in the center */}
          <div className="absolute inset-0 border-[1px] border-primary/40 rounded-full animate-[spin_40s_linear_infinite_reverse]" />
          <div className="absolute inset-2 border-[1px] border-dashed border-accent/40 rounded-full animate-[spin_30s_linear_infinite]" />
          <div className="absolute inset-4 border-[0.5px] border-primary/20 rounded-full animate-[spin_50s_linear_infinite_reverse]" />
          <div className="absolute inset-8 border-[2px] border-dotted border-primary/30 rounded-full animate-[spin_60s_linear_infinite]" />
        </div>
      </div>
    </div>
  );
}
