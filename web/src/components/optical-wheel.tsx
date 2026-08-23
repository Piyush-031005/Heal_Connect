'use client';

import { useState, useEffect, useRef } from 'react';

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
  { id: 'dreams',         name: 'Dream Prediction', image: '/final_ensights/dream interpretetion.png' },
  { id: 'space-harmony',  name: 'Space Harmony',    image: '/final_ensights/space harmony.png' },
  { id: 'numerology',     name: 'Numerology',       image: '/final_ensights/numerology.png' },
];

// Gold matching reference image
const GOLD = '#C9A84C';
const DISC_COLOR = '#080414'; // Near-black disc behind each logo

// Build 12-pointed star polygon points for the geometric lines
function buildStarPolygon(cx: number, cy: number, r: number, points: number): string {
  const coords: string[] = [];
  for (let i = 0; i < points; i++) {
    const angle = (i * (360 / points) - 90) * (Math.PI / 180);
    const x = cx + r * Math.cos(angle);
    const y = cy + r * Math.sin(angle);
    coords.push(`${x},${y}`);
  }
  // Connect every other point to create star
  return coords.join(' ');
}

export default function OpticalWheel() {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [playState, setPlayState] = useState<'running' | 'paused'>('running');
  const [rotation, setRotation] = useState(0);
  const rafRef = useRef<number>(0);
  const lastRef = useRef<number>(0);

  const cx = 500;
  const cy = 500;
  const outerRadius = 345;
  // Disc radius behind each logo (solid black circle)
  const discR = 78;
  // Logo image half-size (placed on top of disc, no clipping)
  const imgHalf = 90;

  // Smooth rotation using requestAnimationFrame
  useEffect(() => {
    const SPEED = 0.008; // degrees per ms
    const animate = (now: number) => {
      if (lastRef.current) {
        const delta = now - lastRef.current;
        if (playState === 'running') {
          setRotation(prev => (prev + SPEED * delta) % 360);
        }
      }
      lastRef.current = now;
      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, [playState]);

  const handleScrollTo = (id: string) => {
    const element = document.getElementById(`modality-${id}`);
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  // Compute node positions
  const nodes = MODALITIES.map((mod, idx) => {
    const angleDeg = (idx * 30 - 90 + rotation) % 360;
    const angleRad = angleDeg * (Math.PI / 180);
    const x = cx + outerRadius * Math.cos(angleRad);
    const y = cy + outerRadius * Math.sin(angleRad);
    // Counter-rotation so labels stay upright
    const counterRot = -rotation;
    return { ...mod, x, y, counterRot };
  });

  return (
    <div
      className="relative w-full h-full select-none"
      onMouseEnter={() => setPlayState('paused')}
      onMouseLeave={() => setPlayState('running')}
    >
      <div className="absolute inset-0 z-10 pointer-events-auto">
        <svg viewBox="0 0 1000 1000" className="w-full h-full">
          <defs>
            {/* Gold ambient glow */}
            <radialGradient id="outerGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor={GOLD} stopOpacity="0.18" />
              <stop offset="70%" stopColor={GOLD} stopOpacity="0.05" />
              <stop offset="100%" stopColor={GOLD} stopOpacity="0" />
            </radialGradient>
            {/* Center disc gradient — matches reference */}
            <radialGradient id="centerDisc" cx="40%" cy="35%" r="70%">
              <stop offset="0%" stopColor="#2a1060" />
              <stop offset="60%" stopColor="#150830" />
              <stop offset="100%" stopColor="#080210" />
            </radialGradient>
            {/* Center ring bevel */}
            <radialGradient id="ringBevel" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor={GOLD} stopOpacity="0.5" />
              <stop offset="100%" stopColor={GOLD} stopOpacity="0.1" />
            </radialGradient>
          </defs>

          {/* ── BACKGROUND AMBIENT GLOW ── */}
          <circle cx={cx} cy={cy} r="480" fill="url(#outerGlow)" />

          {/* ── OUTER ORBIT RING (gold, single solid line — matches reference) ── */}
          <circle cx={cx} cy={cy} r={outerRadius} fill="none" stroke={GOLD} opacity="0.55" strokeWidth="1" />
          {/* Faint outer guide ring */}
          <circle cx={cx} cy={cy} r={outerRadius + 80} fill="none" stroke={GOLD} opacity="0.1" strokeWidth="0.75" />

          {/* ── GEOMETRIC STAR POLYGON LINES (12-spoke, like reference) ── */}
          {/* These are the faint diagonal lines connecting across the wheel */}
          {MODALITIES.map((_, i) => {
            const a1 = ((i * 30 - 90) * Math.PI) / 180;
            const a2 = (((i + 6) * 30 - 90) * Math.PI) / 180;
            return (
              <line
                key={`spoke-${i}`}
                x1={cx + outerRadius * Math.cos(a1)}
                y1={cy + outerRadius * Math.sin(a1)}
                x2={cx + outerRadius * Math.cos(a2)}
                y2={cy + outerRadius * Math.sin(a2)}
                stroke={GOLD}
                strokeWidth="0.5"
                opacity="0.12"
              />
            );
          })}

          {/* ── INNER DECORATIVE RINGS ── */}
          <circle cx={cx} cy={cy} r={outerRadius - 80} fill="none" stroke={GOLD} opacity="0.18" strokeWidth="0.75" strokeDasharray="3 12" />
          <circle cx={cx} cy={cy} r={outerRadius - 155} fill="none" stroke={GOLD} opacity="0.22" strokeWidth="0.75" />

          {/* ── CENTER ELEMENT ── */}
          {/* Outer decorative ring of center */}
          <circle cx={cx} cy={cy} r="178" fill="none" stroke={GOLD} opacity="0.45" strokeWidth="2" />
          {/* Middle ring */}
          <circle cx={cx} cy={cy} r="165" fill="none" stroke={GOLD} opacity="0.2" strokeWidth="1" />
          {/* Dark disc for center */}
          <circle cx={cx} cy={cy} r="158" fill="url(#centerDisc)" />
          {/* Inner decorative rings on center disc */}
          <circle cx={cx} cy={cy} r="148" fill="none" stroke={GOLD} opacity="0.3" strokeWidth="0.75" strokeDasharray="2 6" />
          <circle cx={cx} cy={cy} r="130" fill="none" stroke={GOLD} opacity="0.2" strokeWidth="0.5" />

          {/* ── THE 12 MODALITY NODES ── */}
          {nodes.map((node, idx) => {
            const isHovered = hoveredIdx === idx;

            return (
              <g
                key={idx}
                transform={`translate(${node.x}, ${node.y})`}
                onMouseEnter={() => { setHoveredIdx(idx); }}
                onMouseLeave={() => setHoveredIdx(null)}
                onClick={() => handleScrollTo(node.id)}
                className="cursor-pointer"
              >
                {/* Counter-rotate so labels stay upright */}
                <g transform={`rotate(${node.counterRot})`}>

                  {/* Hit area */}
                  <circle cx="0" cy="0" r={imgHalf + 20} fill="transparent" pointerEvents="all" />

                  {/* ── SOLID BLACK CIRCULAR DISC (the "small black spot" from reference) ── */}
                  <circle
                    cx="0"
                    cy="0"
                    r={discR}
                    fill={DISC_COLOR}
                    opacity={isHovered ? '1' : '0.92'}
                    style={{
                      filter: isHovered ? `drop-shadow(0 0 10px ${GOLD})` : 'none',
                    }}
                  />

                  {/* RAW image — NO circular clip, just placed on top of the disc */}
                  {/* Transparent areas of the PNG will show the black disc below */}
                  <image
                    href={`${node.image}?v=9`}
                    x={-imgHalf}
                    y={-imgHalf}
                    width={imgHalf * 2}
                    height={imgHalf * 2}
                    preserveAspectRatio="xMidYMid meet"
                    style={{
                      filter: isHovered
                        ? `drop-shadow(0 0 10px ${GOLD})`
                        : 'drop-shadow(0 2px 8px rgba(0,0,0,0.7))',
                      transition: 'filter 0.3s ease',
                    }}
                  />

                  {/* Gold name label below — small caps like reference */}
                  <text
                    x="0"
                    y={discR + 22}
                    textAnchor="middle"
                    fill={isHovered ? '#FFE082' : GOLD}
                    fontSize="16"
                    fontFamily="'Georgia', 'Times New Roman', serif"
                    fontWeight="400"
                    letterSpacing="2"
                    opacity={isHovered ? '1' : '0.85'}
                    style={{ textTransform: 'uppercase' }}
                  >
                    {node.name}
                  </text>

                </g>
              </g>
            );
          })}

        </svg>

        {/* ── CENTER LOGO (HTML overlay) ── */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {/* Gold glow behind logo */}
            <div style={{
              position: 'absolute',
              width: '280px',
              height: '280px',
              borderRadius: '50%',
              background: `radial-gradient(circle, rgba(201,168,76,0.2) 0%, rgba(201,168,76,0.06) 50%, transparent 75%)`,
            }} />
            <img
              src="/new_center_logo_dark.png"
              alt="ZenAuraa"
              style={{
                width: '210px',
                height: '210px',
                objectFit: 'contain',
                filter: `drop-shadow(0 0 24px rgba(201,168,76,0.45))`,
                position: 'relative',
                zIndex: 10,
              }}
            />
          </div>
        </div>

      </div>
    </div>
  );
}
