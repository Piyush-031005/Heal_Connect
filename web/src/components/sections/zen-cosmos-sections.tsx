'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { Star, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';

// ─────────────────────────────────────────────────────────────────────────
// 01. EXPERT CONSTELLATION — Dark space, draggable star universe
// ─────────────────────────────────────────────────────────────────────────
const EXPERTS = [
  { id: 1, name: 'Maya Sharma', specialty: 'Vedic Astrology', rating: 4.9, sessions: 1240, x: 22, y: 28, cluster: 'astrology', style: 'Intuitive' },
  { id: 2, name: 'Arun Nair', specialty: 'Tarot Reading', rating: 4.8, sessions: 890, x: 62, y: 18, cluster: 'tarot', style: 'Spiritual' },
  { id: 3, name: 'Dr. Elena Rossi', specialty: 'Energy Healing', rating: 4.9, sessions: 1100, x: 82, y: 42, cluster: 'healing', style: 'Analytical' },
  { id: 4, name: 'Chen Wei', specialty: 'Numerology', rating: 5.0, sessions: 342, x: 44, y: 62, cluster: 'numerology', style: 'Practical' },
  { id: 5, name: 'Sarah Jenkins', specialty: 'Western Astrology', rating: 4.8, sessions: 678, x: 14, y: 58, cluster: 'astrology', style: 'Warm' },
  { id: 6, name: 'Yogi Ram', specialty: 'Spiritual Guide', rating: 5.0, sessions: 412, x: 72, y: 72, cluster: 'healing', style: 'Gentle' },
  { id: 7, name: 'Luna Vega', specialty: 'Tarot & Crystals', rating: 4.7, sessions: 523, x: 54, y: 38, cluster: 'tarot', style: 'Creative' },
  { id: 8, name: 'Omar Hassan', specialty: 'Numerology', rating: 4.9, sessions: 311, x: 32, y: 80, cluster: 'numerology', style: 'Logical' },
  { id: 9, name: 'Priya Patel', specialty: 'Vedic Astrology', rating: 4.8, sessions: 925, x: 88, y: 22, cluster: 'astrology', style: 'Deep' },
  { id: 10, name: 'James Wright', specialty: 'Life Coaching', rating: 4.7, sessions: 201, x: 18, y: 74, cluster: 'coaching', style: 'Direct' },
  { id: 11, name: 'Mei Lin', specialty: 'Energy Healing', rating: 4.9, sessions: 445, x: 74, y: 56, cluster: 'healing', style: 'Soft' },
  { id: 12, name: 'Aria Stone', specialty: 'Tarot', rating: 4.8, sessions: 789, x: 38, y: 48, cluster: 'tarot', style: 'Visionary' },
];

const CLUSTER_COLORS: Record<string, string> = {
  astrology: '#63BFE4',
  tarot: '#C9A0DC',
  healing: '#7EDEA0',
  numerology: '#F4D58D',
  coaching: '#F4A261',
};

export function ExpertConstellation() {
  const [hovered, setHovered] = useState<(typeof EXPERTS)[0] | null>(null);
  const [tipPos, setTipPos] = useState({ x: 0, y: 0 });
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const dragStart = useRef({ x: 0, y: 0, ox: 0, oy: 0 });
  const ref = useRef<HTMLDivElement>(null);

  return (
    <section className="relative min-h-[90vh] bg-[#060B1E] overflow-hidden flex flex-col border-t border-white/5">
      {/* Starfield */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(150)].map((_, i) => (
          <div key={i} className="absolute rounded-full bg-white"
            style={{
              width: `${(i % 3) + 0.5}px`, height: `${(i % 3) + 0.5}px`,
              left: `${(i * 17.3) % 100}%`, top: `${(i * 23.7) % 100}%`,
              opacity: 0.05 + (i % 7) * 0.08,
              animation: `zen-twinkle ${2 + (i % 4)}s ease-in-out infinite`,
              animationDelay: `${(i * 0.3) % 5}s`,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-6 lg:px-16 pt-20 pb-6 relative z-10">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-8 h-[2px] bg-[#63BFE4]" />
          <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#63BFE4]">01 — Expert Constellation</span>
        </div>
        <h2 className="text-4xl md:text-6xl font-serif font-medium text-white mb-1">Find Your Guide</h2>
        <p className="text-[#9FD6EE]/60 text-sm font-medium">Drag the universe. Hover a star to discover.</p>
      </div>

      <div className="container mx-auto px-6 lg:px-16 z-10 flex gap-6 flex-wrap mb-4">
        {Object.entries(CLUSTER_COLORS).map(([c, col]) => (
          <div key={c} className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: col, boxShadow: `0 0 8px ${col}` }} />
            <span className="text-xs font-bold text-white/50 capitalize">{c}</span>
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
          {EXPERTS.map((ex, i) =>
            EXPERTS.slice(i + 1).filter(e2 => e2.cluster === ex.cluster).map(e2 => (
              <line key={`${ex.id}-${e2.id}`} x1={`${ex.x}%`} y1={`${ex.y}%`} x2={`${e2.x}%`} y2={`${e2.y}%`}
                stroke={CLUSTER_COLORS[ex.cluster]} strokeOpacity="0.18" strokeWidth="1" />
            ))
          )}
          {EXPERTS.map(ex => {
            const col = CLUSTER_COLORS[ex.cluster];
            return (
              <g key={ex.id} style={{ cursor: 'pointer' }}
                onMouseEnter={e => {
                  setHovered(ex);
                  const rect = ref.current?.getBoundingClientRect();
                  if (rect) setTipPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
                }}
                onMouseLeave={() => setHovered(null)}
              >
                <circle cx={`${ex.x}%`} cy={`${ex.y}%`} r="24" fill="transparent" />
                <circle cx={`${ex.x}%`} cy={`${ex.y}%`} r="14" fill="none" stroke={col} strokeWidth="0.5" strokeOpacity="0.3" />
                <circle cx={`${ex.x}%`} cy={`${ex.y}%`} r="5" fill={col}
                  style={{ filter: `drop-shadow(0 0 10px ${col}) drop-shadow(0 0 4px ${col})` }} />
                <text x={`${ex.x}%`} y={`${ex.y}%`} dy="22" textAnchor="middle"
                  fill="white" fontSize="9" opacity="0.55" fontFamily="serif">{ex.name.split(' ')[0]}</text>
              </g>
            );
          })}
        </svg>
        {hovered && (
          <div className="absolute z-50 pointer-events-none bg-white/8 backdrop-blur-2xl border border-white/15 rounded-2xl p-4 w-52 shadow-2xl"
            style={{ left: tipPos.x + 18, top: tipPos.y - 70 }}>
            <div className="text-sm font-bold text-white mb-1">{hovered.name}</div>
            <div className="text-xs text-[#9FD6EE] mb-2">{hovered.specialty}</div>
            <div className="flex items-center gap-2 text-xs text-white/70">
              <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
              <span>{hovered.rating}</span>
              <span className="text-white/40">· {hovered.sessions} sessions</span>
            </div>
            <div className="mt-2 inline-block text-[10px] font-bold px-2.5 py-1 rounded-full bg-white/10 text-white/70">{hovered.style}</div>
          </div>
        )}
      </div>

      <div className="container mx-auto px-6 lg:px-16 py-8 z-10 flex justify-end">
        <Link href="/signup" className="inline-flex items-center gap-2 text-sm font-bold text-[#63BFE4] hover:text-white transition-colors">
          Browse all guides <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      <style>{`
        @keyframes zen-twinkle { 0%,100%{opacity:0.05} 50%{opacity:0.6} }
      `}</style>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────
// 02. ZODIAC ORBIT RING — Interactive rotating orbital
// ─────────────────────────────────────────────────────────────────────────
const ZODIACS = [
  { id: 'aries', name: 'Aries', symbol: '♈', element: 'Fire', quality: 'Cardinal', trait: 'Bold, ambitious, passionate leader.', date: 'Mar 21–Apr 19', color: '#FF6B6B' },
  { id: 'taurus', name: 'Taurus', symbol: '♉', element: 'Earth', quality: 'Fixed', trait: 'Patient, reliable, sensual, determined.', date: 'Apr 20–May 20', color: '#7EDEA0' },
  { id: 'gemini', name: 'Gemini', symbol: '♊', element: 'Air', quality: 'Mutable', trait: 'Curious, communicative, adaptable, witty.', date: 'May 21–Jun 20', color: '#F4D58D' },
  { id: 'cancer', name: 'Cancer', symbol: '♋', element: 'Water', quality: 'Cardinal', trait: 'Nurturing, intuitive, protective, empathic.', date: 'Jun 21–Jul 22', color: '#9FD6EE' },
  { id: 'leo', name: 'Leo', symbol: '♌', element: 'Fire', quality: 'Fixed', trait: 'Magnetic, generous, creative, warmhearted.', date: 'Jul 23–Aug 22', color: '#FFB347' },
  { id: 'virgo', name: 'Virgo', symbol: '♍', element: 'Earth', quality: 'Mutable', trait: 'Analytical, detail-oriented, service-driven.', date: 'Aug 23–Sep 22', color: '#98E6A2' },
  { id: 'libra', name: 'Libra', symbol: '♎', element: 'Air', quality: 'Cardinal', trait: 'Balanced, harmonious, fair, socially gifted.', date: 'Sep 23–Oct 22', color: '#C9A0DC' },
  { id: 'scorpio', name: 'Scorpio', symbol: '♏', element: 'Water', quality: 'Fixed', trait: 'Intense, perceptive, transformative, deep.', date: 'Oct 23–Nov 21', color: '#7B6CF6' },
  { id: 'sagittarius', name: 'Sagittarius', symbol: '♐', element: 'Fire', quality: 'Mutable', trait: 'Adventurous, philosophical, free-spirited.', date: 'Nov 22–Dec 21', color: '#F4A261' },
  { id: 'capricorn', name: 'Capricorn', symbol: '♑', element: 'Earth', quality: 'Cardinal', trait: 'Disciplined, responsible, ambitious, wise.', date: 'Dec 22–Jan 19', color: '#A0AEC0' },
  { id: 'aquarius', name: 'Aquarius', symbol: '♒', element: 'Air', quality: 'Fixed', trait: 'Innovative, humanitarian, eccentric, visionary.', date: 'Jan 20–Feb 18', color: '#63BFE4' },
  { id: 'pisces', name: 'Pisces', symbol: '♓', element: 'Water', quality: 'Mutable', trait: 'Dreamy, compassionate, mystical, creative.', date: 'Feb 19–Mar 20', color: '#9B8FFF' },
];

const ELEMENT_BG: Record<string, string> = {
  Fire: 'radial-gradient(ellipse at 30% 40%, #3a1212 0%, #1a0808 50%, #060B1E 100%)',
  Earth: 'radial-gradient(ellipse at 30% 40%, #122a16 0%, #081408 50%, #060B1E 100%)',
  Air: 'radial-gradient(ellipse at 30% 40%, #0e1e3a 0%, #080e1e 50%, #060B1E 100%)',
  Water: 'radial-gradient(ellipse at 30% 40%, #1a0e3a 0%, #0e081e 50%, #060B1E 100%)',
};

export function ZodiacOrbitRing() {
  const [active, setActive] = useState(ZODIACS[4]);
  const [rotation, setRotation] = useState(0);
  const CX = 50, CY = 50, R = 38;

  useEffect(() => {
    const t = setInterval(() => setRotation(r => r + 0.008), 50);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="relative min-h-screen overflow-hidden flex items-center"
      style={{ background: ELEMENT_BG[active.element], transition: 'background 1.2s ease' }}>
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(80)].map((_, i) => (
          <div key={i} className="absolute rounded-full bg-white"
            style={{ width: `${(i % 2) + 1}px`, height: `${(i % 2) + 1}px`, left: `${(i * 13.7) % 100}%`, top: `${(i * 19.3) % 100}%`, opacity: 0.04 + (i % 5) * 0.03 }} />
        ))}
      </div>

      <div className="container mx-auto px-6 lg:px-16 py-24 relative z-10">
        <div className="flex items-center gap-3 mb-12">
          <div className="w-8 h-[2px]" style={{ backgroundColor: active.color }} />
          <span className="text-[10px] font-black uppercase tracking-[0.3em]" style={{ color: active.color }}>02 — Zodiac Orbit</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Orbital SVG */}
          <div className="relative w-full max-w-[520px] mx-auto aspect-square">
            <svg viewBox="0 0 100 100" className="w-full h-full">
              <defs>
                <radialGradient id="zodiacGlow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor={active.color} stopOpacity="0.5" />
                  <stop offset="100%" stopColor={active.color} stopOpacity="0" />
                </radialGradient>
              </defs>
              <circle cx={CX} cy={CY} r={R} fill="none" stroke="white" strokeOpacity="0.08" strokeWidth="0.5" />
              <circle cx={CX} cy={CY} r={R - 2} fill="none" stroke="white" strokeOpacity="0.04" strokeWidth="0.3" strokeDasharray="2 3" />
              {ZODIACS.map((z, i) => {
                const angle = ((i / 12) * Math.PI * 2) + rotation;
                const x = CX + R * Math.cos(angle);
                const y = CY + R * Math.sin(angle);
                const isActive = z.id === active.id;
                return (
                  <g key={z.id} onClick={() => setActive(z)} style={{ cursor: 'pointer' }}>
                    <circle cx={x} cy={y} r={isActive ? 5 : 3.5}
                      fill={isActive ? z.color : 'white'}
                      fillOpacity={isActive ? 1 : 0.25}
                      style={{ filter: isActive ? `drop-shadow(0 0 6px ${z.color})` : 'none', transition: 'all 0.4s ease' }} />
                    <text x={x} y={y} dy="0.35em" textAnchor="middle"
                      fill="white" fontSize={isActive ? '3.5' : '2.5'} opacity={isActive ? 1 : 0.5}
                      style={{ transition: 'all 0.4s ease' }}>{z.symbol}</text>
                  </g>
                );
              })}
              <circle cx={CX} cy={CY} r="15" fill="url(#zodiacGlow)" opacity="0.4" />
              <text x={CX} y={CY} dy="-1" textAnchor="middle" fill={active.color} fontSize="12"
                style={{ transition: 'all 0.5s ease', filter: `drop-shadow(0 0 8px ${active.color})` }}>{active.symbol}</text>
              <text x={CX} y={CY} dy="5" textAnchor="middle" fill="white" fontSize="3.5" opacity="0.7"
                fontFamily="serif">{active.name.toUpperCase()}</text>
            </svg>
          </div>

          {/* Content */}
          <div key={active.id} style={{ animation: 'zen-fade 0.5s ease' }}>
            <div className="inline-block px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest mb-6 border"
              style={{ color: active.color, borderColor: `${active.color}40`, backgroundColor: `${active.color}12` }}>
              {active.element} · {active.quality}
            </div>
            <h2 className="text-6xl md:text-8xl font-serif font-medium text-white mb-4" style={{ transition: 'all 0.5s ease' }}>
              {active.name}
            </h2>
            <p className="text-sm text-white/50 mb-6 font-mono tracking-widest">{active.date}</p>
            <p className="text-lg text-white/80 font-light leading-relaxed mb-10 max-w-md">{active.trait}</p>
            <div className="flex flex-wrap gap-3 mb-10">
              {['Love Compatibility', 'Career Outlook', 'Monthly Reading', 'Find a Guide'].map(tag => (
                <Link key={tag} href="/signup"
                  className="px-5 py-2.5 rounded-full text-sm font-bold border transition-all hover:scale-105"
                  style={{ borderColor: `${active.color}40`, color: active.color, backgroundColor: `${active.color}10` }}>
                  {tag}
                </Link>
              ))}
            </div>
            <Link href="/signup" className="inline-flex items-center gap-3 text-white font-bold group">
              <span className="text-lg">Explore {active.name}</span>
              <div className="w-12 h-12 rounded-full flex items-center justify-center border border-white/20 group-hover:border-white/60 transition-all"
                style={{ backgroundColor: `${active.color}20` }}>
                <ArrowRight className="w-5 h-5" />
              </div>
            </Link>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes zen-fade { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
      `}</style>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────
// 03. TAROT TABLE — Luxury 3D flip card reading
// ─────────────────────────────────────────────────────────────────────────
const TAROT_CARDS = [
  { name: 'The Star', subtitle: 'Hope · Renewal · Direction', message: 'A period of clarity and cosmic alignment is upon you. Trust in the universe\'s guidance and allow yourself to shine.', color: '#63BFE4', symbol: '⭐' },
  { name: 'The Moon', subtitle: 'Intuition · Mystery · Dreams', message: 'Your subconscious holds important truths right now. Pay attention to dreams and gut feelings — they carry wisdom.', color: '#C9A0DC', symbol: '🌙' },
  { name: 'The Sun', subtitle: 'Joy · Success · Vitality', message: 'Radiant energy surrounds you. A new chapter of positivity and abundance is beginning to unfold in your life.', color: '#FFB347', symbol: '☀️' },
  { name: 'The World', subtitle: 'Completion · Integration · Travel', message: 'You are reaching the culmination of an important cycle. Embrace the wholeness you\'ve achieved and prepare for new beginnings.', color: '#7EDEA0', symbol: '🌍' },
  { name: 'The Tower', subtitle: 'Revelation · Upheaval · Change', message: 'A sudden revelation may shake the foundations, but what falls away was never truly stable. Embrace transformation.', color: '#F4A261', symbol: '⚡' },
];

const CARD_ROTATIONS = [-8, -3, 0, 4, 9];

export function TarotTable() {
  const [flipped, setFlipped] = useState<number | null>(null);

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center py-24 overflow-hidden"
      style={{ background: 'radial-gradient(ellipse at center, #1a2a1a 0%, #0d1a0d 50%, #050d05 100%)' }}>
      <div className="absolute inset-0 opacity-20 pointer-events-none"
        style={{ backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 2px, rgba(255,255,255,0.01) 2px, rgba(255,255,255,0.01) 4px)' }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full blur-[120px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(124,186,124,0.12) 0%, transparent 70%)' }} />

      <div className="container mx-auto px-6 lg:px-16 relative z-10 text-center">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="w-8 h-[2px] bg-[#7EDEA0]" />
          <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#7EDEA0]">03 — Tarot Table</span>
          <div className="w-8 h-[2px] bg-[#7EDEA0]" />
        </div>
        <h2 className="text-4xl md:text-6xl font-serif font-medium text-white mb-4">Draw Your Card</h2>
        <p className="text-[#7EDEA0]/60 text-base font-medium mb-4">Set your intention. Click a card.</p>
        <div className="inline-flex items-center gap-3 bg-white/5 border border-white/10 rounded-2xl px-6 py-3 mb-16 backdrop-blur-md">
          <span className="text-white/30 text-sm">✦</span>
          <span className="text-white/60 text-sm font-medium italic">&quot;What energy should I focus on today?&quot;</span>
        </div>

        <div className="relative flex items-center justify-center gap-3 md:gap-4 mb-20 min-h-[340px] flex-wrap">
          {TAROT_CARDS.map((card, i) => {
            const isFlipped = flipped === i;
            const rot = CARD_ROTATIONS[i] || 0;
            return (
              <div key={i} className="relative group"
                style={{ transform: `rotate(${rot}deg)`, zIndex: isFlipped ? 50 : i, transition: 'all 0.5s cubic-bezier(0.34,1.56,0.64,1)' }}>
                <div className="w-[110px] h-[185px] md:w-[130px] md:h-[215px] relative cursor-pointer"
                  style={{ perspective: '1000px' }}
                  onClick={() => setFlipped(isFlipped ? null : i)}>
                  <div className="relative w-full h-full"
                    style={{ transformStyle: 'preserve-3d', transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)', transition: 'transform 0.7s cubic-bezier(0.34,1.56,0.64,1)' }}>
                    {/* Card Back */}
                    <div className="absolute inset-0 rounded-2xl border border-white/15 overflow-hidden shadow-2xl"
                      style={{ backfaceVisibility: 'hidden', background: 'linear-gradient(135deg, #1a2a1a 0%, #0d1a0d 100%)' }}>
                      <div className="absolute inset-2 border border-[#7EDEA0]/20 rounded-xl" />
                      <div className="absolute inset-4 border border-[#7EDEA0]/10 rounded-lg" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-[#7EDEA0]/30 text-4xl">✦</div>
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent" />
                    </div>
                    {/* Card Front */}
                    <div className="absolute inset-0 rounded-2xl overflow-hidden shadow-2xl flex flex-col items-center justify-between p-4 text-center"
                      style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)', background: `linear-gradient(135deg, ${card.color}20 0%, #0d1a0d 100%)`, border: `1px solid ${card.color}40` }}>
                      <div className="text-4xl mt-2">{card.symbol}</div>
                      <div>
                        <div className="text-xs font-black uppercase tracking-widest mb-1" style={{ color: card.color }}>{card.name}</div>
                        <div className="text-[9px] text-white/50 font-medium">{card.subtitle}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {flipped !== null && (
          <div className="max-w-lg mx-auto bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 text-center"
            style={{ animation: 'zen-fade 0.5s ease' }}>
            <div className="text-3xl mb-3">{TAROT_CARDS[flipped].symbol}</div>
            <h3 className="text-2xl font-serif font-bold text-white mb-1">{TAROT_CARDS[flipped].name}</h3>
            <p className="text-xs font-black uppercase tracking-widest mb-4" style={{ color: TAROT_CARDS[flipped].color }}>{TAROT_CARDS[flipped].subtitle}</p>
            <p className="text-sm text-white/75 leading-relaxed mb-6 font-light">{TAROT_CARDS[flipped].message}</p>
            <div className="flex gap-3 justify-center flex-wrap">
              <Link href="/signup" className="px-5 py-2.5 rounded-full text-xs font-bold transition-all hover:scale-105 text-white"
                style={{ backgroundColor: TAROT_CARDS[flipped].color + '25', border: `1px solid ${TAROT_CARDS[flipped].color}50` }}>
                Find a Tarot Reader
              </Link>
              <Link href="/signup" className="px-5 py-2.5 rounded-full text-xs font-bold transition-all hover:scale-105 text-white/60 border border-white/10">
                Full Reading
              </Link>
            </div>
          </div>
        )}
        {flipped === null && (
          <p className="text-white/30 text-xs font-medium animate-pulse">Click any card to reveal your reading</p>
        )}
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────
// 04. MODALITY UNIVERSE — Floating luminous node map
// ─────────────────────────────────────────────────────────────────────────
const MODALITY_NODES = [
  { id: 'astrology', label: 'Astrology', x: 50, y: 50, size: 18, color: '#63BFE4', count: '500+', center: true },
  { id: 'tarot', label: 'Tarot', x: 25, y: 30, size: 13, color: '#C9A0DC', count: '120' },
  { id: 'numerology', label: 'Numerology', x: 75, y: 28, size: 11, color: '#F4D58D', count: '85' },
  { id: 'healing', label: 'Energy Healing', x: 20, y: 62, size: 12, color: '#7EDEA0', count: '200' },
  { id: 'meditation', label: 'Meditation', x: 78, y: 58, size: 10, color: '#98E6F4', count: '150' },
  { id: 'palmistry', label: 'Palm Reading', x: 40, y: 78, size: 9, color: '#F4A261', count: '70' },
  { id: 'vastu', label: 'Vastu', x: 62, y: 75, size: 8, color: '#A0AEC0', count: '45' },
  { id: 'yoga', label: 'Yoga', x: 30, y: 18, size: 8, color: '#7EDEA0', count: '95' },
  { id: 'eft', label: 'EFT Tapping', x: 68, y: 18, size: 7, color: '#9B8FFF', count: '35' },
  { id: 'coaching', label: 'Life Coaching', x: 82, y: 42, size: 10, color: '#F4D58D', count: '110' },
  { id: 'spiritual', label: 'Spiritual Guide', x: 18, y: 42, size: 11, color: '#C9A0DC', count: '180' },
  { id: 'face', label: 'Face Reading', x: 50, y: 20, size: 7, color: '#FF6B6B', count: '30' },
];

export function ModalityUniverse() {
  const [hovered, setHovered] = useState<(typeof MODALITY_NODES)[0] | null>(null);

  return (
    <section className="relative min-h-screen bg-[#080C18] overflow-hidden flex flex-col items-center justify-center py-24">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(60)].map((_, i) => (
          <div key={i} className="absolute rounded-full bg-white"
            style={{ width: `${(i % 2) + 1}px`, height: `${(i % 2) + 1}px`, left: `${(i * 17.3) % 100}%`, top: `${(i * 23.1) % 100}%`, opacity: 0.04 + (i % 4) * 0.03 }} />
        ))}
      </div>

      <div className="container mx-auto px-6 lg:px-16 text-center mb-10 relative z-10">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="w-8 h-[2px] bg-[#C9A0DC]" />
          <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#C9A0DC]">04 — Modality Universe</span>
          <div className="w-8 h-[2px] bg-[#C9A0DC]" />
        </div>
        <h2 className="text-4xl md:text-6xl font-serif font-medium text-white mb-3">Explore What Speaks To You</h2>
        <p className="text-white/40 text-sm font-medium">Hover any node to discover a modality.</p>
      </div>

      <div className="relative w-full max-w-4xl mx-auto px-6" style={{ height: '480px' }}>
        <svg className="absolute inset-0 w-full h-full">
          {MODALITY_NODES.filter(n => !n.center).map(node => {
            const center = MODALITY_NODES[0];
            return (
              <line key={`l-${node.id}`}
                x1={`${center.x}%`} y1={`${center.y}%`}
                x2={`${node.x}%`} y2={`${node.y}%`}
                stroke={node.color} strokeOpacity="0.15" strokeWidth="1"
                strokeDasharray="4 6" />
            );
          })}
          {MODALITY_NODES.map(node => {
            const isHov = hovered?.id === node.id;
            return (
              <g key={node.id}
                onMouseEnter={() => setHovered(node)}
                onMouseLeave={() => setHovered(null)}
                style={{ cursor: 'pointer' }}>
                <circle cx={`${node.x}%`} cy={`${node.y}%`}
                  r={`${node.size * (isHov ? 1.6 : 1)}%`}
                  fill={node.color}
                  fillOpacity={isHov ? 0.2 : 0.07}
                  stroke={node.color}
                  strokeOpacity={isHov ? 0.9 : 0.35}
                  strokeWidth={isHov ? '1.5' : '1'}
                  style={{ transition: 'all 0.4s ease', filter: isHov ? `drop-shadow(0 0 16px ${node.color})` : 'none' }} />
                <text x={`${node.x}%`} y={`${node.y}%`} dy="0.35em" textAnchor="middle"
                  fill={node.color} fontSize={node.center ? '6.5' : '4.5'}
                  fontFamily="serif" opacity={isHov ? 1 : 0.65}
                  style={{ transition: 'all 0.4s ease' }}>{node.label}</text>
                {isHov && (
                  <text x={`${node.x}%`} y={`${node.y}%`} dy="6" textAnchor="middle"
                    fill="white" fontSize="3" opacity="0.6">{node.count} guides</text>
                )}
              </g>
            );
          })}
        </svg>
      </div>

      {hovered && !hovered.center && (
        <div className="relative z-10 mt-6 text-center" style={{ animation: 'zen-fade 0.3s ease' }}>
          <Link href="/signup"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold transition-all hover:scale-105"
            style={{ backgroundColor: `${hovered.color}20`, border: `1px solid ${hovered.color}50`, color: hovered.color }}>
            Explore {hovered.label} <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      )}
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────
// 05. EXPERT STORIES DECK — Horizontal premium portrait stack
// ─────────────────────────────────────────────────────────────────────────
const STORY_EXPERTS = [
  { name: 'Maya Sharma', role: 'Vedic Astrologer', years: '12 yrs', style: ['Intuitive', 'Spiritual'], langs: ['English', 'Hindi'], available: true, color: '#63BFE4', img: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop', quote: 'I guide souls through life transitions with cosmic clarity.' },
  { name: 'Arun Nair', role: 'Tarot & Crystals', years: '8 yrs', style: ['Creative', 'Warm'], langs: ['English', 'Malayalam'], available: true, color: '#C9A0DC', img: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=400&auto=format&fit=crop', quote: 'Every card tells a story; every story holds your truth.' },
  { name: 'Dr. Elena Rossi', role: 'Energy Healer', years: '15 yrs', style: ['Analytical', 'Gentle'], langs: ['English', 'Italian'], available: false, color: '#7EDEA0', img: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=400&auto=format&fit=crop', quote: 'The body holds wisdom that the mind has not yet heard.' },
  { name: 'Chen Wei', role: 'Numerologist', years: '20 yrs', style: ['Practical', 'Deep'], langs: ['English', 'Mandarin'], available: true, color: '#F4D58D', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop', quote: 'Numbers are the universe\'s most honest language.' },
  { name: 'Luna Vega', role: 'Tarot Reader', years: '6 yrs', style: ['Visionary', 'Expressive'], langs: ['English', 'Spanish'], available: true, color: '#9B8FFF', img: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=400&auto=format&fit=crop', quote: 'Your future is written in the stars and the cards alike.' },
];

export function ExpertStoriesDeck() {
  const [current, setCurrent] = useState(0);
  const expert = STORY_EXPERTS[current];

  return (
    <section className="relative min-h-screen bg-white overflow-hidden flex items-center py-24">
      <div className="absolute left-0 top-0 bottom-0 w-1/3 pointer-events-none"
        style={{ background: `linear-gradient(to right, ${expert.color}12, transparent)`, transition: 'background 0.8s ease' }} />

      <div className="container mx-auto px-6 lg:px-16 relative z-10">
        <div className="flex flex-col lg:flex-row items-center lg:items-start gap-16">
          {/* Left: cards */}
          <div className="lg:w-1/2">
            <div className="flex items-center gap-3 mb-10">
              <div className="w-8 h-[2px]" style={{ backgroundColor: expert.color }} />
              <span className="text-[10px] font-black uppercase tracking-[0.3em]" style={{ color: expert.color }}>05 — Meet Your Guide</span>
            </div>
            <div className="relative" style={{ height: '380px', width: '280px' }}>
              {STORY_EXPERTS.map((ex, i) => {
                const offset = (i - current + STORY_EXPERTS.length) % STORY_EXPERTS.length;
                const isActive = offset === 0;
                const isNext = offset === 1;
                const isNext2 = offset === 2;
                return (
                  <div key={ex.name}
                    className="absolute rounded-3xl overflow-hidden border-4 shadow-2xl cursor-pointer transition-all duration-700"
                    style={{
                      width: '260px', height: '340px',
                      borderColor: isActive ? ex.color : '#f0f0f0',
                      transform: isActive ? 'scale(1) rotate(0deg) translate(0,0)'
                        : isNext ? 'scale(0.9) rotate(5deg) translate(35px,-18px)'
                        : isNext2 ? 'scale(0.82) rotate(9deg) translate(60px,-30px)'
                        : 'scale(0.75) translateY(30px)',
                      zIndex: isActive ? 10 : isNext ? 7 : isNext2 ? 4 : 1,
                      opacity: isActive ? 1 : isNext ? 0.75 : isNext2 ? 0.5 : 0.2,
                    }}
                    onClick={() => setCurrent(i)}
                  >
                    <img src={ex.img} alt={ex.name} className="w-full h-full object-cover object-top" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <div className="absolute bottom-4 left-4 text-white">
                      <div className="font-bold text-sm">{ex.name}</div>
                      <div className="text-xs opacity-75">{ex.role}</div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="flex items-center gap-3 mt-6">
              <button onClick={() => setCurrent(c => (c - 1 + STORY_EXPERTS.length) % STORY_EXPERTS.length)}
                className="w-10 h-10 rounded-full border flex items-center justify-center transition-all hover:scale-110"
                style={{ borderColor: expert.color, color: expert.color }}>
                <ChevronLeft className="w-4 h-4" />
              </button>
              {STORY_EXPERTS.map((_, i) => (
                <div key={i} className="rounded-full transition-all duration-400 cursor-pointer"
                  style={{ width: i === current ? '24px' : '8px', height: '8px', backgroundColor: i === current ? expert.color : `${expert.color}30` }}
                  onClick={() => setCurrent(i)} />
              ))}
              <button onClick={() => setCurrent(c => (c + 1) % STORY_EXPERTS.length)}
                className="w-10 h-10 rounded-full border flex items-center justify-center transition-all hover:scale-110"
                style={{ borderColor: expert.color, color: expert.color }}>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right: info */}
          <div className="lg:w-1/2" key={current} style={{ animation: 'zen-fade 0.5s ease' }}>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-3 h-3 rounded-full animate-pulse"
                style={{ backgroundColor: expert.available ? '#22c55e' : '#94a3b8' }} />
              <span className="text-sm font-bold" style={{ color: expert.available ? '#22c55e' : '#94a3b8' }}>
                {expert.available ? 'Available Now' : 'Accepting Bookings'}
              </span>
            </div>
            <h2 className="text-5xl md:text-7xl font-serif font-medium mb-2" style={{ color: '#111', transition: 'color 0.5s ease' }}>
              {expert.name}
            </h2>
            <p className="text-base text-gray-500 mb-6 font-medium">{expert.role} · {expert.years}</p>
            <blockquote className="text-xl font-light text-gray-700 mb-8 leading-relaxed border-l-4 pl-6 italic"
              style={{ borderColor: expert.color }}>
              &ldquo;{expert.quote}&rdquo;
            </blockquote>
            <div className="mb-6">
              <p className="text-xs font-black uppercase tracking-widest text-gray-400 mb-3">Style</p>
              <div className="flex gap-3 flex-wrap">
                {expert.style.map(s => (
                  <span key={s} className="px-4 py-2 rounded-full text-xs font-bold"
                    style={{ backgroundColor: `${expert.color}15`, color: expert.color, border: `1px solid ${expert.color}30` }}>
                    {s}
                  </span>
                ))}
              </div>
            </div>
            <div className="mb-10">
              <p className="text-xs font-black uppercase tracking-widest text-gray-400 mb-3">Languages</p>
              <div className="flex gap-4">
                {expert.langs.map(l => (<span key={l} className="text-sm font-bold text-gray-600">{l}</span>))}
              </div>
            </div>
            <Link href="/signup"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl text-white font-bold text-base shadow-xl hover:scale-105 transition-all"
              style={{ backgroundColor: expert.color }}>
              Book a Session <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────
// 06. GLOBAL GUIDANCE MAP — Dark world map with glow cities
// ─────────────────────────────────────────────────────────────────────────
const CITIES = [
  { name: 'New Delhi', x: 65, y: 38, count: '4,200+', specialty: 'Vedic Astrology · Ayurveda · Meditation', color: '#63BFE4' },
  { name: 'London', x: 46, y: 24, count: '820+', specialty: 'Tarot · Coaching · Western Astrology', color: '#C9A0DC' },
  { name: 'New York', x: 25, y: 30, count: '1,100+', specialty: 'Life Coaching · Numerology · Tarot', color: '#F4A261' },
  { name: 'Dubai', x: 60, y: 42, count: '650+', specialty: 'Astrology · Healing · Spiritual Guidance', color: '#F4D58D' },
  { name: 'Singapore', x: 77, y: 54, count: '480+', specialty: 'Energy Healing · Numerology · Reiki', color: '#7EDEA0' },
  { name: 'Sydney', x: 83, y: 70, count: '390+', specialty: 'Meditation · Tarot · Crystal Healing', color: '#9B8FFF' },
  { name: 'São Paulo', x: 32, y: 65, count: '290+', specialty: 'Tarot · Astrology · Energy Work', color: '#FF6B6B' },
  { name: 'Tokyo', x: 83, y: 33, count: '310+', specialty: 'Numerology · Reiki · Spiritual Guidance', color: '#98E6F4' },
];

export function GlobalGuidanceMap() {
  const [hoveredCity, setHoveredCity] = useState<(typeof CITIES)[0] | null>(null);

  return (
    <section className="relative min-h-screen bg-[#060B1E] overflow-hidden flex flex-col items-center justify-center py-24">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 opacity-20"
          style={{ backgroundImage: 'radial-gradient(circle at 30% 50%, rgba(99,191,228,0.15) 0%, transparent 50%), radial-gradient(circle at 70% 50%, rgba(201,160,220,0.1) 0%, transparent 40%)' }} />
      </div>

      <div className="container mx-auto px-6 lg:px-16 text-center mb-12 relative z-10">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="w-8 h-[2px] bg-[#63BFE4]" />
          <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#63BFE4]">06 — Global Network</span>
          <div className="w-8 h-[2px] bg-[#63BFE4]" />
        </div>
        <h2 className="text-4xl md:text-6xl font-serif font-medium text-white mb-3">Wisdom Has No Borders</h2>
        <p className="text-white/40 text-sm font-medium">Over 8,000 verified practitioners across 60+ countries</p>
      </div>

      <div className="relative w-full max-w-5xl mx-auto px-6 z-10" style={{ height: '380px' }}>
        <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
          {[...Array(8)].map((_, i) => (
            <line key={`h${i}`} x1="0" y1={`${(i + 1) * 11}%`} x2="100%" y2={`${(i + 1) * 11}%`}
              stroke="white" strokeOpacity="0.03" strokeWidth="1" />
          ))}
          {[...Array(12)].map((_, i) => (
            <line key={`v${i}`} x1={`${(i + 1) * 8}%`} y1="0" x2={`${(i + 1) * 8}%`} y2="100%"
              stroke="white" strokeOpacity="0.03" strokeWidth="1" />
          ))}
          <ellipse cx="50%" cy="36%" rx="10%" ry="14%" fill="#1A2340" opacity="0.55" />
          <ellipse cx="65%" cy="42%" rx="8%" ry="12%" fill="#1A2340" opacity="0.55" />
          <ellipse cx="81%" cy="35%" rx="5%" ry="8%" fill="#1A2340" opacity="0.55" />
          <ellipse cx="29%" cy="35%" rx="7%" ry="10%" fill="#1A2340" opacity="0.55" />
          <ellipse cx="34%" cy="63%" rx="5%" ry="9%" fill="#1A2340" opacity="0.55" />
          <ellipse cx="52%" cy="56%" rx="8%" ry="8%" fill="#1A2340" opacity="0.55" />
          <ellipse cx="84%" cy="68%" rx="4%" ry="5%" fill="#1A2340" opacity="0.55" />
        </svg>
        {CITIES.map(city => (
          <div key={city.name} className="absolute"
            style={{ left: `${city.x}%`, top: `${city.y}%`, transform: 'translate(-50%,-50%)', zIndex: hoveredCity?.name === city.name ? 50 : 10 }}
            onMouseEnter={() => setHoveredCity(city)}
            onMouseLeave={() => setHoveredCity(null)}>
            <div className="absolute rounded-full animate-ping"
              style={{ width: '28px', height: '28px', top: '-8px', left: '-8px', backgroundColor: city.color, opacity: 0.12 }} />
            <div className="absolute rounded-full"
              style={{ width: '18px', height: '18px', top: '-3px', left: '-3px', backgroundColor: city.color, opacity: 0.18 }} />
            <div className="w-3 h-3 rounded-full cursor-pointer transition-all hover:scale-150"
              style={{ backgroundColor: city.color, boxShadow: `0 0 12px ${city.color}, 0 0 4px ${city.color}` }} />
            {hoveredCity?.name === city.name && (
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-50 w-52 bg-[#0D1629] border rounded-xl p-4 shadow-2xl pointer-events-none"
                style={{ borderColor: `${city.color}40`, animation: 'zen-fade 0.3s ease' }}>
                <div className="text-sm font-bold text-white mb-1">{city.name}</div>
                <div className="text-base font-black mb-2" style={{ color: city.color }}>{city.count} Guides</div>
                <div className="text-[10px] text-white/50 leading-relaxed">{city.specialty}</div>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="container mx-auto px-6 lg:px-16 mt-16 z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 border-t border-white/8 pt-10">
          {[{ label: 'Countries', value: '60+' }, { label: 'Practitioners', value: '8,000+' }, { label: 'Languages', value: '24' }, { label: 'Traditions', value: '12' }].map(s => (
            <div key={s.label} className="text-center">
              <div className="text-3xl md:text-4xl font-serif font-bold text-white mb-1">{s.value}</div>
              <div className="text-xs font-black uppercase tracking-widest text-white/30">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────
// 07. YOUR NEXT DISCOVERY — Animated 3-path journey CTA
// ─────────────────────────────────────────────────────────────────────────
const JOURNEY_PATHS = [
  {
    id: 'know', label: 'KNOW', title: 'Know Yourself',
    desc: 'Discover your cosmic blueprint through birth chart, numerology, and personality mapping.',
    items: ['Birth Chart Reading', 'Numerology Profile', 'Element & Sign Analysis'],
    color: '#63BFE4', icon: '✦',
  },
  {
    id: 'explore', label: 'EXPLORE', title: 'Explore Your World',
    desc: 'Navigate love, career, and life transitions through tarot, zodiac readings, and guided sessions.',
    items: ['Tarot Card Reading', 'Zodiac Compatibility', 'Monthly Forecasts'],
    color: '#C9A0DC', icon: '◉', featured: true,
  },
  {
    id: 'connect', label: 'CONNECT', title: 'Connect With Guides',
    desc: 'Meet verified practitioners matched to your exact needs, available 24/7 worldwide.',
    items: ['AI-Matched Experts', 'Live 1-on-1 Sessions', 'Ongoing Journey Support'],
    color: '#7EDEA0', icon: '◈',
  },
];

export function YourNextDiscovery() {
  const [hovered, setHovered] = useState<string | null>('explore');

  return (
    <section className="relative py-32 overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #EDF8FC 0%, #CDE9F4 40%, #9FD6EE 100%)' }}>
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(40)].map((_, i) => (
          <div key={i} className="absolute rounded-full bg-[#12527F]"
            style={{ width: `${(i % 3) + 1}px`, height: `${(i % 3) + 1}px`, left: `${(i * 24.3) % 100}%`, top: `${(i * 18.7) % 100}%`, opacity: 0.02 + (i % 4) * 0.015 }} />
        ))}
      </div>

      <div className="container mx-auto px-6 lg:px-16 relative z-10">
        <div className="text-center mb-20">
          <div className="text-5xl mb-4 text-[#12527F]/15">✦ YOU ✦</div>
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-8 h-[2px] bg-[#1A92C6]" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#1A92C6]">07 — Your Next Discovery</span>
            <div className="w-8 h-[2px] bg-[#1A92C6]" />
          </div>
          <h2 className="text-4xl md:text-6xl font-serif font-medium text-[#12527F]">Where Will You Go Next?</h2>
          <p className="text-[#17619A]/70 mt-4 text-base font-medium max-w-xl mx-auto">
            Three paths. One cosmic journey. Choose where to begin.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {JOURNEY_PATHS.map(path => {
            const isHov = hovered === path.id;
            return (
              <div key={path.id}
                className="relative rounded-3xl p-8 border transition-all duration-500 cursor-pointer group overflow-hidden"
                style={{
                  backgroundColor: isHov ? `${path.color}15` : 'rgba(255,255,255,0.65)',
                  borderColor: isHov ? path.color : 'rgba(255,255,255,0.8)',
                  transform: isHov ? 'translateY(-8px)' : 'translateY(0)',
                  boxShadow: isHov ? `0 24px 60px ${path.color}25` : '0 4px 20px rgba(0,0,0,0.04)',
                  backdropFilter: 'blur(16px)',
                }}
                onMouseEnter={() => setHovered(path.id)}
                onMouseLeave={() => setHovered('explore')}>
                {'featured' in path && (
                  <div className="absolute top-4 right-4 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-wider text-white"
                    style={{ backgroundColor: path.color }}>Popular</div>
                )}
                <div className="text-4xl mb-6 font-serif" style={{ color: path.color }}>{path.icon}</div>
                <div className="text-[10px] font-black uppercase tracking-widest mb-2" style={{ color: path.color }}>{path.label}</div>
                <h3 className="text-2xl font-serif font-medium text-[#12527F] mb-4">{path.title}</h3>
                <p className="text-sm text-[#17619A]/75 leading-relaxed mb-6 font-medium">{path.desc}</p>
                <div className="space-y-2 mb-8">
                  {path.items.map(item => (
                    <div key={item} className="flex items-center gap-3 text-sm text-[#17619A]/80 font-medium">
                      <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: path.color }} />
                      {item}
                    </div>
                  ))}
                </div>
                <Link href="/signup"
                  className="inline-flex items-center gap-2 font-bold text-sm transition-all group-hover:gap-4"
                  style={{ color: path.color }}>
                  Begin This Path <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            );
          })}
        </div>

        <div className="text-center">
          <Link href="/signup"
            className="inline-flex items-center gap-4 px-10 py-5 rounded-2xl text-white font-bold text-lg shadow-2xl hover:scale-105 transition-all"
            style={{ background: 'linear-gradient(135deg, #1A92C6 0%, #12527F 100%)' }}>
            <span>Begin Your Cosmic Journey</span>
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
              <ArrowRight className="w-5 h-5" />
            </div>
          </Link>
          <p className="text-[#17619A]/50 text-xs mt-4 font-medium">Free to explore · No credit card required</p>
        </div>
      </div>
    </section>
  );
}
