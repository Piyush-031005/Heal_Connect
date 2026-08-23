'use client';

import { useState } from 'react';

const MODALITIES = [
  // isFeatured adds the square dashed callout card
  // r and angle define the irregular constellation position relative to center
  // size varies to give organic feel
  { id: 'astrology',      name: 'Astrology',        image: '/final_ensights/astrology.png',        angle: -75,  r: 350, size: 75, isFeatured: false },
  { id: 'tarot',          name: 'Tarot',            image: '/final_ensights/tarot.png',            angle: -35,  r: 410, size: 90, isFeatured: true },
  { id: 'face-reading',   name: 'Face Reading',     image: '/final_ensights/face reading.png',     angle: 5,    r: 330, size: 65, isFeatured: false },
  { id: 'palm-reading',   name: 'Palm Reading',     image: '/final_ensights/palm reading.png',     angle: 40,   r: 390, size: 80, isFeatured: false },
  { id: 'sound-healing',  name: 'Sound Healing',    image: '/final_ensights/sound healing.png',    angle: 80,   r: 340, size: 70, isFeatured: false },
  { id: 'meditation',     name: 'Meditation',       image: '/final_ensights/medidation.png',       angle: 115,  r: 300, size: 60, isFeatured: false },
  { id: 'spiritual',      name: 'Spiritual',        image: '/final_ensights/spiritual  guidance.png', angle: 155,  r: 370, size: 75, isFeatured: false },
  { id: 'chakra-healing', name: 'Chakra Healing',   image: '/final_ensights/chakra healing.png',   angle: 195,  r: 400, size: 85, isFeatured: false },
  { id: 'breathwork',     name: 'Breathwork',       image: '/final_ensights/breathwork.png',       angle: 235,  r: 320, size: 65, isFeatured: false },
  { id: 'dreams',         name: 'Dream Predict',    image: '/final_ensights/dream interpretetion.png', angle: 265,  r: 430, size: 95, isFeatured: false },
  { id: 'space-harmony',  name: 'Space Harmony',    image: '/final_ensights/space harmony.png',    angle: -50,  r: 240, size: 55, isFeatured: false },
  { id: 'numerology',     name: 'Numerology',       image: '/final_ensights/numerology.png',       angle: -15,  r: 220, size: 65, isFeatured: false },
];

const GOLD = '#F5C84C'; 

export default function OpticalWheel() {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [playState, setPlayState] = useState<'running' | 'paused'>('running');

  const cx = 500;
  const cy = 500;

  const handleScrollTo = (id: string) => {
    const el = document.getElementById(`modality-${id}`);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div
      className="relative w-full h-full select-none"
      onMouseEnter={() => setPlayState('paused')}
      onMouseLeave={() => setPlayState('running')}
    >
      <div className="absolute inset-0 z-10 pointer-events-auto">
        <svg viewBox="0 0 1000 1000" className="w-full h-full">
          <defs>
            {/* The radial vignette behind each icon - NO hard edges */}
            <radialGradient id="vignette" cx="50%" cy="50%" r="50%">
              <stop offset="0%"   stopColor="#05020A" stopOpacity="0.85" />
              <stop offset="40%"  stopColor="#05020A" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#05020A" stopOpacity="0" />
            </radialGradient>
            
            {/* Center soft dark glow */}
            <radialGradient id="centerGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%"   stopColor="#0A0415" stopOpacity="0.9" />
              <stop offset="60%"  stopColor="#120826" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#120826" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* ── WHEEL PATHS (Irregular, multiple offset rings) ── */}
          <g style={{ animation: 'spin 120s linear infinite', transformOrigin: '500px 500px', animationPlayState: playState }}>
            
            {/* Primary organic ring */}
            <circle cx={cx} cy={cy} r="350" fill="none" stroke={GOLD} opacity="0.3" strokeWidth="1" />
            
            {/* Second larger ring offset to the right, simulating off-screen crop */}
            <circle cx={cx + 180} cy={cy} r="420" fill="none" stroke={GOLD} opacity="0.2" strokeWidth="1" />
            
            {/* Faint inner connecting ring */}
            <circle cx={cx - 50} cy={cy + 80} r="280" fill="none" stroke={GOLD} opacity="0.1" strokeWidth="1" strokeDasharray="4 8" />

            {/* Constellation lines connecting some nodes lightly */}
            <polyline 
              points={
                MODALITIES.slice(0, 5).map(m => {
                  const a = m.angle * (Math.PI / 180);
                  return `${cx + m.r * Math.cos(a)},${cy + m.r * Math.sin(a)}`;
                }).join(' ')
              }
              fill="none" stroke={GOLD} opacity="0.15" strokeWidth="0.5" strokeDasharray="2 4"
            />
            <polyline 
              points={
                MODALITIES.slice(5, 10).map(m => {
                  const a = m.angle * (Math.PI / 180);
                  return `${cx + m.r * Math.cos(a)},${cy + m.r * Math.sin(a)}`;
                }).join(' ')
              }
              fill="none" stroke={GOLD} opacity="0.15" strokeWidth="0.5" strokeDasharray="2 4"
            />

            {/* ── THE 12 MODALITY NODES ── */}
            {MODALITIES.map((mod, idx) => {
              const angle = mod.angle * (Math.PI / 180);
              const nx = cx + mod.r * Math.cos(angle);
              const ny = cy + mod.r * Math.sin(angle);
              const isHovered = hoveredIdx === idx;

              return (
                <g
                  key={idx}
                  transform={`translate(${nx}, ${ny})`}
                  onMouseEnter={() => setHoveredIdx(idx)}
                  onMouseLeave={() => setHoveredIdx(null)}
                  onClick={() => handleScrollTo(mod.id)}
                  className="cursor-pointer"
                >
                  {/* Counter-spin so labels/icons stay upright */}
                  <g style={{
                    animation: 'spin 120s linear infinite reverse',
                    animationPlayState: playState,
                    transformOrigin: '0px 0px',
                  }}>
                    {/* Hit area */}
                    <circle cx="0" cy="0" r={mod.size + 30} fill="transparent" pointerEvents="all" />

                    {/* VIGNETTE: Soft radial gradient behind icon, no hard edge border */}
                    <circle cx="0" cy="0" r={mod.size * 1.5} fill="url(#vignette)" />

                    {/* CALLOUT CARD: Square dashed border for featured icon */}
                    {mod.isFeatured && (
                      <rect
                        x={-mod.size - 10} y={-mod.size - 10}
                        width={(mod.size + 10) * 2} height={(mod.size + 10) * 2}
                        fill="none" stroke={GOLD} strokeWidth="1" strokeDasharray="5 5" opacity="0.6"
                      />
                    )}

                    {/* MODALITY ICON (Large, detailed line-art sized) */}
                    <image
                      href={`${mod.image}?v=14`}
                      x={-mod.size} y={-mod.size}
                      width={mod.size * 2} height={mod.size * 2}
                      preserveAspectRatio="xMidYMid meet"
                      style={{
                        filter: isHovered ? `drop-shadow(0 0 12px ${GOLD})` : 'drop-shadow(0 2px 4px rgba(0,0,0,0.6))',
                        transition: 'filter 0.3s ease',
                      }}
                    />

                    {/* Label */}
                    <text
                      x="0" y={mod.size + 24}
                      textAnchor="middle"
                      fill={isHovered ? '#FFFFFF' : GOLD}
                      fontSize="13"
                      fontFamily="'Georgia', serif"
                      letterSpacing="1.5"
                      opacity={isHovered ? '1' : '0.8'}
                    >
                      {mod.name.toUpperCase()}
                    </text>
                  </g>
                </g>
              );
            })}
          </g>
        </svg>

        {/* ── CENTER MEDALLION ── 
            Smaller, soft dark glow, no bright outer ring. */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{
              position: 'absolute', width: '200px', height: '200px', borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(10,4,21,0.9) 0%, rgba(18,8,38,0.4) 60%, transparent 100%)',
            }} />
            <img
              src="/new_center_logo_dark.png"
              alt="ZenAuraa Center"
              style={{
                width: '120px', height: '120px', objectFit: 'contain',
                position: 'relative', zIndex: 10,
              }}
            />
          </div>
        </div>

      </div>
    </div>
  );
}
