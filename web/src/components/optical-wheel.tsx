'use client';

import { useState } from 'react';

const MODALITIES = [
  { id: 'astrology', name: 'Astrology', image: '/final_ensights/astrology.png' },
  { id: 'tarot', name: 'Tarot', image: '/final_ensights/tarot.png' },
  { id: 'face-reading', name: 'Face Reading', image: '/final_ensights/face reading.png' },
  { id: 'palm-reading', name: 'Palm Reading', image: '/final_ensights/palm reading.png' },
  { id: 'sound-healing', name: 'Sound Healing', image: '/final_ensights/sound healing.png' },
  { id: 'meditation', name: 'Meditation', image: '/final_ensights/medidation.png' },
  { id: 'spiritual', name: 'Spiritual Guidance', image: '/final_ensights/spiritual  guidance.png' },
  { id: 'chakra-healing', name: 'Chakra Healing', image: '/final_ensights/chakra healing.png' },
  { id: 'breathwork', name: 'Breathwork', image: '/final_ensights/breathwork.png' },
  { id: 'dreams', name: 'Dream Prediction', image: '/final_ensights/dream interpretetion.png' },
  { id: 'space-harmony', name: 'Space Harmony', image: '/final_ensights/space harmony.png' },
  { id: 'numerology', name: 'Numerology', image: '/final_ensights/numerology.png' },
];

// Gold color matching the reference image
const GOLD = '#C9A84C';
const GOLD_DIM = '#8B6914';
const DOT_BG = '#0D0820'; // Very dark near-black background for dots, like ref image

export default function OpticalWheel() {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [playState, setPlayState] = useState<'running' | 'paused'>('running');

  const cx = 500;
  const cy = 500;
  const outerRadius = 370;
  // Clip radius for logos - bigger so logos fill the dot properly
  const clipR = 88;
  // The black dot circle radius
  const dotR = 95;
  // The hit area radius
  const hitR = 110;

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
        <svg viewBox="0 0 1000 1000" className="w-full h-full mx-auto">
          <defs>
            {/* Glow gradient for center */}
            <radialGradient id="centerGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor={GOLD} stopOpacity="0.5" />
              <stop offset="60%" stopColor={GOLD} stopOpacity="0.15" />
              <stop offset="100%" stopColor={GOLD} stopOpacity="0" />
            </radialGradient>
            {/* Dark dot gradient - matches the reference image dark cosmic look */}
            <radialGradient id="dotGrad" cx="35%" cy="30%" r="70%">
              <stop offset="0%" stopColor="#1a0e3a" />
              <stop offset="100%" stopColor="#0D0820" />
            </radialGradient>
            {/* Clip path for each modality icon */}
            <clipPath id="node-circle-clip">
              <circle cx="0" cy="0" r={clipR} />
            </clipPath>
          </defs>

          {/* Ambient outer glow */}
          <circle cx={cx} cy={cy} r="490" fill="url(#centerGlow)" opacity="0.3" />

          {/* ── OUTER DECORATIVE RINGS (gold, matching ref image) ── */}
          {/* Outermost ring */}
          <circle cx={cx} cy={cy} r={outerRadius + 90} fill="none" stroke={GOLD} opacity="0.15" strokeWidth="1" />
          {/* Tick marks around outer ring */}
          <g style={{ animation: 'spin 200s linear infinite', transformOrigin: '500px 500px' }}>
            {[...Array(72)].map((_, i) => (
              <line
                key={`tick-${i}`}
                x1={cx + (outerRadius + 90) * Math.cos(i * 5 * Math.PI / 180)}
                y1={cy + (outerRadius + 90) * Math.sin(i * 5 * Math.PI / 180)}
                x2={cx + (outerRadius + (i % 6 === 0 ? 103 : 94)) * Math.cos(i * 5 * Math.PI / 180)}
                y2={cy + (outerRadius + (i % 6 === 0 ? 103 : 94)) * Math.sin(i * 5 * Math.PI / 180)}
                stroke={GOLD}
                opacity={i % 6 === 0 ? "0.55" : "0.2"}
                strokeWidth={i % 6 === 0 ? "1.5" : "0.75"}
              />
            ))}
            <circle cx={cx} cy={cy} r={outerRadius + 115} fill="none" stroke={GOLD} opacity="0.1" strokeWidth="0.75" />
          </g>

          {/* The main orbit ring that nodes sit on */}
          <circle cx={cx} cy={cy} r={outerRadius} fill="none" stroke={GOLD} opacity="0.4" strokeWidth="1.5" />
          {/* Inner guide ring */}
          <circle cx={cx} cy={cy} r={outerRadius - 20} fill="none" stroke={GOLD} opacity="0.12" strokeWidth="0.75" strokeDasharray="4 12" />

          {/* ── CENTER DECORATIVE GEOMETRY ── */}
          <g style={{ animation: 'spin 300s linear infinite reverse', transformOrigin: '500px 500px' }}>
            <circle cx={cx} cy={cy} r={220} fill="none" stroke={GOLD} opacity="0.25" strokeWidth="1" />
            <circle cx={cx} cy={cy} r={200} fill="none" stroke={GOLD} opacity="0.3" strokeWidth="0.75" strokeDasharray="3 9" />
            <circle cx={cx} cy={cy} r={175} fill="none" stroke={GOLD} opacity="0.2" strokeWidth="1" />
            {/* 8-point star / square pattern */}
            {[0, 45].map((rot, i) => (
              <rect
                key={`sq-${i}`}
                x={cx - 140}
                y={cy - 140}
                width={280}
                height={280}
                fill="none"
                stroke={GOLD}
                opacity="0.25"
                strokeWidth="0.75"
                transform={`rotate(${rot}, ${cx}, ${cy})`}
              />
            ))}
          </g>

          {/* Center solid circle backdrop (like the dark cosmic center in ref image) */}
          <circle cx={cx} cy={cy} r={135} fill="#0D0820" opacity="0.95" />
          <circle cx={cx} cy={cy} r={135} fill="none" stroke={GOLD} opacity="0.5" strokeWidth="1.5" />
          <circle cx={cx} cy={cy} r={120} fill="none" stroke={GOLD} opacity="0.25" strokeWidth="0.75" strokeDasharray="2 8" style={{ animation: 'spin 60s linear infinite', transformOrigin: '500px 500px' }} />
          {/* Cross lines inside center */}
          <line x1={cx} y1={cy - 120} x2={cx} y2={cy + 120} stroke={GOLD} opacity="0.2" strokeWidth="0.75" />
          <line x1={cx - 120} y1={cy} x2={cx + 120} y2={cy} stroke={GOLD} opacity="0.2" strokeWidth="0.75" />
          <line x1={cx - 85} y1={cy - 85} x2={cx + 85} y2={cy + 85} stroke={GOLD} opacity="0.15" strokeWidth="0.75" />
          <line x1={cx + 85} y1={cy - 85} x2={cx - 85} y2={cy + 85} stroke={GOLD} opacity="0.15" strokeWidth="0.75" />
          {/* Center dot */}
          <circle cx={cx} cy={cy} r="6" fill={GOLD} opacity="0.9" />
          <circle cx={cx} cy={cy} r="3" fill="#FFFFFF" opacity="1" />

          {/* ── THE 12 MODALITY NODES (spinning) ── */}
          <g style={{ animation: 'spin 50s linear infinite', animationPlayState: playState, transformOrigin: '500px 500px' }}>
            {MODALITIES.map((modality, idx) => {
              const angle = (idx * 30 - 90) * (Math.PI / 180);
              const x = cx + outerRadius * Math.cos(angle);
              const y = cy + outerRadius * Math.sin(angle);
              const isHovered = hoveredIdx === idx;

              return (
                <g
                  key={idx}
                  transform={`translate(${x}, ${y}) scale(${isHovered ? 1.2 : 1})`}
                  onMouseEnter={() => setHoveredIdx(idx)}
                  onMouseLeave={() => setHoveredIdx(null)}
                  onClick={() => handleScrollTo(modality.id)}
                  className="transition-all duration-300 ease-out cursor-pointer group"
                  style={{ transformOrigin: `${x}px ${y}px` }}
                >
                  {/* Counter-spin so icons stay upright */}
                  <g style={{ animation: 'spin 50s linear infinite reverse', animationPlayState: playState, transformOrigin: '0px 0px' }}>

                    {/* Hit area (invisible, big) */}
                    <circle cx="0" cy="0" r={hitR} fill="transparent" pointerEvents="all" />

                    {/* The BLACK dot - exactly like ref image */}
                    <circle
                      cx="0" cy="0" r={dotR}
                      fill="url(#dotGrad)"
                      stroke={isHovered ? GOLD : GOLD_DIM}
                      strokeWidth={isHovered ? "2.5" : "1.5"}
                      opacity="1"
                      style={{ filter: isHovered ? `drop-shadow(0 0 12px ${GOLD})` : 'none' }}
                    />

                    {/* Small decorative ring around each dot (like ref image) */}
                    <circle
                      cx="0" cy="0" r={dotR + 10}
                      fill="none"
                      stroke={GOLD}
                      strokeWidth="0.75"
                      opacity={isHovered ? "0.6" : "0.25"}
                      strokeDasharray="3 10"
                    />

                    {/* The modality icon - clipped to circle, bigger */}
                    <g clipPath="url(#node-circle-clip)">
                      <image
                        href={`${modality.image}?v=6`}
                        x={-clipR}
                        y={-clipR}
                        width={clipR * 2}
                        height={clipR * 2}
                        preserveAspectRatio="xMidYMid meet"
                      />
                    </g>

                    {/* Hover label */}
                    <foreignObject x="-90" y={dotR + 8} width="180" height="38" className={`pointer-events-none overflow-visible transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
                      <div className="w-full flex justify-center">
                        <span style={{ background: DOT_BG, border: `1px solid ${GOLD}`, color: GOLD, fontSize: '11px', fontWeight: '700', padding: '4px 14px', borderRadius: '20px', whiteSpace: 'nowrap', letterSpacing: '0.05em' }}>
                          {modality.name}
                        </span>
                      </div>
                    </foreignObject>

                  </g>
                </g>
              );
            })}
          </g>

        </svg>

        {/* Center logo overlay */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-44 h-44 flex items-center justify-center">
            <img
              src="/new_logo.png"
              alt="ZenAuraa Logo"
              className="w-36 h-36 object-contain"
              style={{ filter: `drop-shadow(0 0 16px ${GOLD})` }}
            />
          </div>
        </div>

      </div>
    </div>
  );
}
