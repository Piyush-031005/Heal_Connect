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

const GOLD = '#C9A84C';
const DISC_BG = '#080414'; // Near-black disc — matches HealConnect reference exactly

export default function OpticalWheel() {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [playState, setPlayState] = useState<'running' | 'paused'>('running');

  const cx = 500;
  const cy = 500;
  const outerR = 345;
  const discR  = 80;   // solid black circle radius
  const imgH   = 88;   // image half-size (slightly smaller than disc so disc edge shows as ring)

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
              <stop offset="0%"   stopColor={GOLD} stopOpacity="0.14" />
              <stop offset="100%" stopColor={GOLD} stopOpacity="0"   />
            </radialGradient>
            <radialGradient id="centerDiscGrad" cx="40%" cy="35%" r="70%">
              <stop offset="0%"   stopColor="#2a1060" />
              <stop offset="60%"  stopColor="#130828" />
              <stop offset="100%" stopColor="#060112" />
            </radialGradient>
          </defs>

          {/* Ambient glow */}
          <circle cx={cx} cy={cy} r="480" fill="url(#outerGlowWhl)" />

          {/* ── ORBIT & GEOMETRIC LINES (matching HealConnect reference) ── */}
          {/* 12-spoke diagonal lines connecting opposite nodes */}
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
          <circle cx={cx} cy={cy} r={outerR}      fill="none" stroke={GOLD} opacity="0.5"  strokeWidth="1"    />
          <circle cx={cx} cy={cy} r={outerR + 85} fill="none" stroke={GOLD} opacity="0.08" strokeWidth="0.75" />
          {/* Inner decorative rings */}
          <circle cx={cx} cy={cy} r={outerR - 80}  fill="none" stroke={GOLD} opacity="0.15" strokeWidth="0.75" strokeDasharray="3 12" />
          <circle cx={cx} cy={cy} r={outerR - 160} fill="none" stroke={GOLD} opacity="0.2"  strokeWidth="0.75" />

          {/* ── CENTER DISC (matches HealConnect reference exactly) ── */}
          <circle cx={cx} cy={cy} r="178" fill="none" stroke={GOLD} opacity="0.5" strokeWidth="1.5" />
          <circle cx={cx} cy={cy} r="164" fill="none" stroke={GOLD} opacity="0.2" strokeWidth="0.75" />
          <circle cx={cx} cy={cy} r="157" fill="url(#centerDiscGrad)" />
          <circle
            cx={cx} cy={cy} r="147"
            fill="none" stroke={GOLD} opacity="0.3" strokeWidth="0.75" strokeDasharray="2 6"
            style={{ animation: 'spin 80s linear infinite', transformOrigin: '500px 500px' }}
          />
          <circle cx={cx} cy={cy} r="128" fill="none" stroke={GOLD} opacity="0.18" strokeWidth="0.5" />

          {/* ── THE 12 MODALITY NODES ── */}
          {/* Outer group spins the whole ring */}
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
                  {/* Counter-spin: transformOrigin 0px 0px = node center (after parent translate) */}
                  <g style={{
                    animation: 'spin 55s linear infinite reverse',
                    animationPlayState: playState,
                    transformOrigin: '0px 0px',
                  }}>
                    {/* Hit area */}
                    <circle cx="0" cy="0" r={imgH + 22} fill="transparent" pointerEvents="all" />

                    {/* ── SOLID BLACK CIRCULAR DISC ── */}
                    <circle
                      cx="0" cy="0" r={discR}
                      fill={DISC_BG}
                      style={{ filter: isHovered ? `drop-shadow(0 0 10px ${GOLD})` : 'none' }}
                    />

                    {/* RAW image on disc — mix-blend-mode multiply hides white backgrounds */}
                    <foreignObject x={-imgH} y={-imgH} width={imgH * 2} height={imgH * 2}
                      style={{ overflow: 'visible', pointerEvents: 'none' }}>
                      <img
                        src={`${mod.image}?v=10`}
                        style={{
                          width: `${imgH * 2}px`,
                          height: `${imgH * 2}px`,
                          objectFit: 'contain',
                          mixBlendMode: 'screen', // makes white transparent on dark disc
                          filter: isHovered ? `drop-shadow(0 0 8px ${GOLD}) brightness(1.15)` : 'none',
                          display: 'block',
                        }}
                        alt={mod.name}
                      />
                    </foreignObject>

                    {/* Gold name label — stays upright due to counter-rotation */}
                    <text
                      x="0" y={discR + 22}
                      textAnchor="middle"
                      fill={isHovered ? '#FFE082' : GOLD}
                      fontSize="15"
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
              background: `radial-gradient(circle, rgba(201,168,76,0.18) 0%, transparent 70%)`,
            }} />
            <img
              src="/new_center_logo_dark.png"
              alt="ZenAuraa"
              style={{
                width: '208px', height: '208px', objectFit: 'contain',
                filter: `drop-shadow(0 0 20px rgba(201,168,76,0.4))`,
                position: 'relative', zIndex: 10,
              }}
            />
          </div>
        </div>

      </div>
    </div>
  );
}
