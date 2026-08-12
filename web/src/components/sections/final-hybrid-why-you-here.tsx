'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const INTENTION_STARS = [
  { id: 1, name: 'Find Love', x: 16, y: 32, cluster: 'love' },
  { id: 2, name: 'Heal a Relationship', x: 24, y: 50, cluster: 'love' },
  { id: 3, name: 'Marriage Timing', x: 12, y: 66, cluster: 'love' },
  { id: 4, name: 'Career Clarity', x: 72, y: 20, cluster: 'career' },
  { id: 5, name: 'Business Growth', x: 84, y: 36, cluster: 'career' },
  { id: 6, name: 'Financial Future', x: 78, y: 52, cluster: 'career' },
  { id: 7, name: 'Heal Trauma', x: 42, y: 74, cluster: 'health' },
  { id: 8, name: 'Inner Peace', x: 56, y: 82, cluster: 'health' },
  { id: 9, name: 'Life Purpose', x: 60, y: 30, cluster: 'spiritual' },
  { id: 10, name: 'Spiritual Awakening', x: 70, y: 62, cluster: 'spiritual' },
  { id: 11, name: 'Know Myself', x: 38, y: 20, cluster: 'self' },
  { id: 12, name: 'Life Decisions', x: 30, y: 78, cluster: 'self' },
];

const INTENTION_COLORS: Record<string, string> = {
  love: '#FF6B9D', // Pinkish
  career: '#D4AF37', // Gold
  health: '#7EDEA0', // Mint
  spiritual: '#C9A0DC', // Lavender
  self: '#63BFE4', // Sky blue
};

const INTENTION_LABELS: Record<string, string> = {
  love: 'Love & Relationships',
  career: 'Career & Finance',
  health: 'Health & Wellbeing',
  spiritual: 'Spiritual Growth',
  self: 'Self Discovery',
};

export function FinalHybridWhyYouHere() {
  const [hovered, setHovered] = useState<(typeof INTENTION_STARS)[0] | null>(null);
  const [tipPos, setTipPos] = useState({ x: 0, y: 0 });
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const dragStart = useRef({ x: 0, y: 0, ox: 0, oy: 0 });
  const ref = useRef<HTMLDivElement>(null);

  return (
    <section className="relative min-h-[90vh] overflow-hidden flex flex-col bg-[#4D316B] border-t border-[#694091]/50">
      {/* Deep starfield */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(200)].map((_, i) => (
          <div key={i} className="absolute rounded-full bg-[#D4AF37]"
            style={{
              width: `${(i % 3) + 0.5}px`, height: `${(i % 3) + 0.5}px`,
              left: `${(i * 17.3) % 100}%`, top: `${(i * 23.7) % 100}%`,
              opacity: 0.05 + (i % 8) * 0.05,
              animation: `zen-twinkle ${2 + (i % 4)}s ease-in-out infinite`,
              animationDelay: `${(i * 0.3) % 5}s`,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-6 lg:px-16 pt-24 pb-6 relative z-10">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-[2px] bg-[#D4AF37]" />
          <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#D4AF37]">What Brings You Here</span>
        </div>
        <h2 className="text-4xl md:text-6xl font-serif font-medium text-[#F8F7FA] mb-2">What Are You Seeking?</h2>
        <p className="text-[#B79AE6] text-sm font-bold max-w-lg">Every star is a question someone asked. Hover to explore what HealConnect can answer for you. Drag to navigate.</p>
      </div>

      <div className="container mx-auto px-6 lg:px-16 z-10 flex gap-5 flex-wrap mb-4">
        {Object.entries(INTENTION_LABELS).map(([c, label]) => (
          <div key={c} className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: INTENTION_COLORS[c], boxShadow: `0 0 10px ${INTENTION_COLORS[c]}60` }} />
            <span className="text-xs font-bold text-[#F8F7FA]/70">{label}</span>
          </div>
        ))}
      </div>

      <div
        ref={ref}
        className="relative flex-1 min-h-[460px] cursor-grab active:cursor-grabbing z-10 select-none"
        onMouseDown={e => {
          setDragging(true);
          dragStart.current = { x: e.clientX, y: e.clientY, ox: offset.x, oy: offset.y };
        }}
        onMouseMove={e => {
          if (dragging) {
            setOffset({ x: dragStart.current.ox + e.clientX - dragStart.current.x, y: dragStart.current.oy + e.clientY - dragStart.current.y });
          }
        }}
        onMouseUp={() => setDragging(false)}
        onMouseLeave={() => setDragging(false)}
      >
        <svg className="absolute inset-0 w-full h-full" style={{ transform: `translate(${offset.x}px,${offset.y}px)` }}>
          {INTENTION_STARS.map(s => {
            const col = INTENTION_COLORS[s.cluster];
            const isHov = hovered?.id === s.id;
            return (
              <g key={s.id} style={{ cursor: 'pointer' }}
                onMouseEnter={e => {
                  setHovered(s);
                  const rect = ref.current?.getBoundingClientRect();
                  if (rect) setTipPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
                }}
                onMouseLeave={() => setHovered(null)}
              >
                <circle cx={`${s.x}%`} cy={`${s.y}%`} r="35" fill="transparent" />
                {/* Outer glow ring */}
                <circle cx={`${s.x}%`} cy={`${s.y}%`} r={isHov ? '24' : '18'} fill={col}
                  opacity={isHov ? 0.2 : 0.08}
                  style={{ transition: 'all 0.4s ease' }} />
                {/* Core star */}
                <circle cx={`${s.x}%`} cy={`${s.y}%`} r={isHov ? '14' : '10'} fill={col} fillOpacity={isHov ? 1 : 0.9}
                  style={{ filter: `drop-shadow(0 0 ${isHov ? 20 : 10}px ${col})`, transition: 'all 0.4s ease' }} />
                {/* Label */}
                <text x={`${s.x}%`} y={`${s.y}%`} dy="32" textAnchor="middle"
                  fill="#F8F7FA" fontSize="12" fontWeight="700" opacity={isHov ? 1 : 0.8}
                  style={{ transition: 'all 0.3s ease' }}>{s.name}</text>
              </g>
            );
          })}
        </svg>
        {hovered && (
          <div className="absolute z-50 pointer-events-none backdrop-blur-xl border rounded-2xl p-5 w-60 shadow-[0_0_40px_rgba(212,175,55,0.15)]"
            style={{ left: Math.min(tipPos.x + 18, 600), top: tipPos.y - 80, backgroundColor: 'rgba(37,23,74,0.95)', borderColor: `${INTENTION_COLORS[hovered.cluster]}50` }}>
            <div className="text-[9px] font-black uppercase tracking-widest mb-2" style={{ color: INTENTION_COLORS[hovered.cluster] }}>{INTENTION_LABELS[hovered.cluster]}</div>
            <div className="text-base font-bold text-[#F8F7FA] mb-3">{hovered.name}</div>
            <Link href="/practitioners" className="inline-flex items-center gap-1.5 text-xs font-bold transition-colors"
              style={{ color: INTENTION_COLORS[hovered.cluster] }}>
              Find Specialists <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        )}
      </div>

      {/* Bottom cluster CTAs */}
      <div className="container mx-auto px-6 lg:px-16 py-12 z-10 flex flex-wrap justify-center gap-3">
        {Object.entries(INTENTION_LABELS).map(([cluster, label]) => (
          <Link key={cluster} href="/practitioners"
            className="px-5 py-2.5 rounded-full text-xs font-bold border transition-all hover:scale-105"
            style={{ borderColor: `${INTENTION_COLORS[cluster]}40`, color: INTENTION_COLORS[cluster], backgroundColor: `${INTENTION_COLORS[cluster]}15` }}>
            {label}
          </Link>
        ))}
      </div>
    </section>
  );
}
