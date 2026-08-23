'use client';

import { useState } from 'react';

const MODALITIES = [
  { id: 'astrology',      name: 'Astrology',        image: '/final_ensights/astrology.png' },
  { id: 'tarot',          name: 'Tarot',            image: '/final_ensights/tarot.png' },
  { id: 'face-reading',   name: 'Face Reading',     image: '/final_ensights/face reading.png' },
  { id: 'palm-reading',   name: 'Palm Reading',     image: '/final_ensights/palm reading.png' },
  { id: 'sound-healing',  name: 'Sound Healing',    image: '/final_ensights/sound healing.png' },
  { id: 'meditation',     name: 'Meditation',       image: '/final_ensights/medidation.png' },
  { id: 'spiritual',      name: 'Spiritual',        image: '/final_ensights/spiritual  guidance.png' },
  { id: 'chakra-healing', name: 'Chakra Healing',   image: '/final_ensights/chakra healing.png' },
  { id: 'breathwork',     name: 'Breathwork',       image: '/final_ensights/breathwork.png' },
  { id: 'dreams',         name: 'Dream Predict',    image: '/final_ensights/dream interpretetion.png' },
  { id: 'space-harmony',  name: 'Space Harmony',    image: '/final_ensights/space harmony.png' },
  { id: 'numerology',     name: 'Numerology',       image: '/final_ensights/numerology.png' },
];

const GOLD = '#F5C84C'; // Using the exact accent color from their Dark Theme
const DOT_BG = '#06030F'; // Small black dot color

export default function OpticalWheel() {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [playState, setPlayState] = useState<'running' | 'paused'>('running');

  const cx = 500;
  const cy = 500;
  const outerR = 345;
  // A very SMALL black dot behind the logo, just to mask the orbit line, exactly like old screenshot
  const dotR = 25;   
  const imgH = 88;   

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
            <radialGradient id="outerGlowWhl" cx="50%" cy="50%" r="50%">
              <stop offset="0%"   stopColor={GOLD} stopOpacity="0.12" />
              <stop offset="100%" stopColor={GOLD} stopOpacity="0"   />
            </radialGradient>
            <radialGradient id="centerDiscGrad" cx="40%" cy="35%" r="70%">
              <stop offset="0%"   stopColor="#2A1658" />
              <stop offset="60%"  stopColor="#1E1144" />
              <stop offset="100%" stopColor="#0B061A" />
            </radialGradient>
          </defs>

          {/* Ambient glow */}
          <circle cx={cx} cy={cy} r="480" fill="url(#outerGlowWhl)" />

          {/* ── ORBIT & GEOMETRIC LINES (exact match to old deployment) ── */}
          {MODALITIES.map((_, i) => {
            const a1 = ((i * 30 - 90) * Math.PI) / 180;
            const a2 = (((i + 6) * 30 - 90) * Math.PI) / 180;
            return (
              <line
                key={`spoke-${i}`}
                x1={cx + outerR * Math.cos(a1)} y1={cy + outerR * Math.sin(a1)}
                x2={cx + outerR * Math.cos(a2)} y2={cy + outerR * Math.sin(a2)}
                stroke={GOLD} strokeWidth="0.5" opacity="0.14"
              />
            );
          })}

          {/* Main orbit ring */}
          <circle cx={cx} cy={cy} r={outerR}      fill="none" stroke={GOLD} opacity="0.4"  strokeWidth="1"    />
          <circle cx={cx} cy={cy} r={outerR + 85} fill="none" stroke={GOLD} opacity="0.08" strokeWidth="0.75" />
          {/* Inner decorative rings */}
          <circle cx={cx} cy={cy} r={outerR - 80}  fill="none" stroke={GOLD} opacity="0.15" strokeWidth="0.75" strokeDasharray="3 12" />
          <circle cx={cx} cy={cy} r={outerR - 160} fill="none" stroke={GOLD} opacity="0.2"  strokeWidth="0.75" />

          {/* ── CENTER DISC ── */}
          <circle cx={cx} cy={cy} r="178" fill="none" stroke={GOLD} opacity="0.4" strokeWidth="1.5" />
          <circle cx={cx} cy={cy} r="164" fill="none" stroke={GOLD} opacity="0.15" strokeWidth="0.75" />
          <circle cx={cx} cy={cy} r="157" fill="url(#centerDiscGrad)" />
          <circle
            cx={cx} cy={cy} r="147"
            fill="none" stroke={GOLD} opacity="0.25" strokeWidth="0.75" strokeDasharray="2 6"
            style={{ animation: 'spin 80s linear infinite', transformOrigin: '500px 500px' }}
          />
          <circle cx={cx} cy={cy} r="128" fill="none" stroke={GOLD} opacity="0.15" strokeWidth="0.5" />

          {/* ── THE 12 MODALITY NODES ── */}
          <g style={{ animation: 'spin 55s linear infinite', animationPlayState: playState, transformOrigin: '500px 500px' }}>
            {MODALITIES.map((mod, idx) => {
              const angle = (idx * 30 - 90) * (Math.PI / 180);
              const nx = cx + outerR * Math.cos(angle);
              const ny = cy + outerR * Math.sin(angle);
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
                  {/* Counter-spin so labels stay upright */}
                  <g style={{
                    animation: 'spin 55s linear infinite reverse',
                    animationPlayState: playState,
                    transformOrigin: '0px 0px',
                  }}>
                    {/* Hit area */}
                    <circle cx="0" cy="0" r={imgH + 22} fill="transparent" pointerEvents="all" />

                    {/* ── SMALL BLACK SPOT (Just masks the orbit line behind the logo) ── */}
                    <circle cx="0" cy="0" r={dotR} fill={DOT_BG} />

                    {/* RAW image — No mix-blend-mode hack, so transparent PNGs render naturally */}
                    <image
                      href={`${mod.image}?v=11`}
                      x={-imgH} y={-imgH}
                      width={imgH * 2} height={imgH * 2}
                      preserveAspectRatio="xMidYMid meet"
                      style={{
                        filter: isHovered ? `drop-shadow(0 0 10px ${GOLD})` : 'drop-shadow(0 2px 5px rgba(0,0,0,0.5))',
                        transition: 'filter 0.3s ease',
                      }}
                    />

                    {/* Gold name label */}
                    <text
                      x="0" y={imgH + 18}
                      textAnchor="middle"
                      fill={isHovered ? '#FFFFFF' : GOLD}
                      fontSize="14"
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

        {/* Center logo */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{
              position: 'absolute', width: '280px', height: '280px', borderRadius: '50%',
              background: `radial-gradient(circle, rgba(245,200,76,0.15) 0%, transparent 70%)`,
            }} />
            <img
              src="/new_center_logo_dark.png"
              alt="ZenAuraa"
              style={{
                width: '208px', height: '208px', objectFit: 'contain',
                filter: `drop-shadow(0 0 20px rgba(245,200,76,0.3))`,
                position: 'relative', zIndex: 10,
              }}
            />
          </div>
        </div>

      </div>
    </div>
  );
}
