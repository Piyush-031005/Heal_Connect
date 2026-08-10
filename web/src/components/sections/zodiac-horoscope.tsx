'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';

const ZODIACS = [
  { id: 'aries', name: 'Aries', hindi: 'Mesh', date: 'Mar 21 - Apr 19' },
  { id: 'taurus', name: 'Taurus', hindi: 'Vrishabha', date: 'Apr 20 - May 20' },
  { id: 'gemini', name: 'Gemini', hindi: 'Mithun', date: 'May 21 - Jun 20' },
  { id: 'cancer', name: 'Cancer', hindi: 'Kark', date: 'Jun 21 - Jul 22' },
  { id: 'leo', name: 'Leo', hindi: 'Singh', date: 'Jul 23 - Aug 22' },
  { id: 'virgo', name: 'Virgo', hindi: 'Kanya', date: 'Aug 23 - Sep 22' },
  { id: 'libra', name: 'Libra', hindi: 'Tula', date: 'Sep 23 - Oct 22' },
  { id: 'scorpio', name: 'Scorpio', hindi: 'Vrishchik', date: 'Oct 23 - Nov 21' },
  { id: 'sagittarius', name: 'Sagittarius', hindi: 'Dhanu', date: 'Nov 22 - Dec 21' },
  { id: 'capricorn', name: 'Capricorn', hindi: 'Makar', date: 'Dec 22 - Jan 19' },
  { id: 'aquarius', name: 'Aquarius', hindi: 'Kumbh', date: 'Jan 20 - Feb 18' },
  { id: 'pisces', name: 'Pisces', hindi: 'Meen', date: 'Feb 19 - Mar 20' },
];

export default function ZodiacHoroscope() {
  const [activeZodiac, setActiveZodiac] = useState(ZODIACS[6]); // Default Libra
  const [activeTab, setActiveTab] = useState('Today');
  const [rotation, setRotation] = useState(0);

  // Auto-rotate the ellipse slowly
  useEffect(() => {
    const interval = setInterval(() => {
      setRotation(prev => prev + 0.002);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-24 bg-[#0B0914] relative overflow-hidden text-white min-h-screen flex flex-col">
      {/* Dark Space Background Elements */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/40 via-[#0B0914] to-[#0B0914] pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[1200px] h-[600px] bg-purple-600/10 rounded-[100%] blur-[120px] pointer-events-none" />
      
      {/* Stars Background */}
      <div className="absolute inset-0 opacity-30 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

      <div className="container mx-auto px-6 max-w-6xl relative z-10">
        
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4 drop-shadow-lg">Cosmic Alignment</h2>
          <p className="text-purple-200/60 text-lg">Select your sign from the celestial orbit</p>
        </div>

        {/* Elliptical Orbital Carousel */}
        <div className="relative w-full h-[400px] mb-20 perspective-1000">
          {/* Orbital rings */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] md:w-[800px] h-[200px] border border-purple-500/20 rounded-[100%] shadow-[0_0_50px_rgba(147,51,234,0.1)] pointer-events-none" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[85%] md:w-[750px] h-[180px] border border-purple-500/10 rounded-[100%] pointer-events-none" />
          
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full transform-style-3d">
            {ZODIACS.map((zodiac, index) => {
              const isActive = activeZodiac.id === zodiac.id;
              
              // Math for ellipse: rx and ry are radius of X and Y
              const rx = typeof window !== 'undefined' && window.innerWidth < 768 ? 160 : 400;
              const ry = typeof window !== 'undefined' && window.innerWidth < 768 ? 80 : 100;
              
              const angle = (index / 12) * Math.PI * 2 + rotation;
              const x = Math.cos(angle) * rx;
              const y = Math.sin(angle) * ry;
              
              // Scale calculation for depth perception
              const depth = (Math.sin(angle) + 1) / 2; // 0 to 1
              const scale = 0.6 + (depth * 0.6); // 0.6 to 1.2
              const zIndex = Math.floor(depth * 100);
              const opacity = 0.4 + (depth * 0.6);

              return (
                <div
                  key={zodiac.id}
                  onClick={() => setActiveZodiac(zodiac)}
                  className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-300 group`}
                  style={{
                    transform: `translate3d(${x}px, ${y}px, 0) scale(${isActive ? scale * 1.2 : scale})`,
                    zIndex: isActive ? 200 : zIndex,
                    opacity: isActive ? 1 : opacity,
                  }}
                >
                  <div className={`relative flex flex-col items-center gap-2 ${isActive ? 'drop-shadow-[0_0_20px_rgba(234,179,8,0.6)]' : ''}`}>
                    <div className={`w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center overflow-hidden border-2 transition-colors ${isActive ? 'border-amber-400 shadow-[0_0_30px_rgba(234,179,8,0.4)]' : 'border-purple-500/30 group-hover:border-purple-400'}`}>
                      <img src={`/zodiacs/zodiac_${index + 1}.jpg`} alt={zodiac.name} className="w-full h-full object-cover" />
                      {/* Glow overlay */}
                      <div className="absolute inset-0 bg-purple-900/20 mix-blend-overlay" />
                    </div>
                    {/* Only show names for front-facing items to avoid clutter */}
                    <div className={`absolute top-full mt-2 text-center transition-opacity duration-300 ${depth > 0.7 || isActive ? 'opacity-100' : 'opacity-0'}`}>
                      <span className={`block text-sm font-bold ${isActive ? 'text-amber-400' : 'text-purple-100'}`}>
                        {zodiac.name}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Detailed Dashboard Card - Dark Theme */}
        <div className="bg-[#131022]/80 backdrop-blur-xl rounded-3xl border border-purple-500/20 shadow-2xl p-8 md:p-12 relative overflow-hidden">
          
          <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-[80px]" />
          
          <div className="flex flex-col md:flex-row gap-12 relative z-10">
            {/* Left Content */}
            <div className="flex-1">
              <div className="flex items-center gap-6 mb-8">
                <div className="w-20 h-20 rounded-full border-2 border-amber-400/50 overflow-hidden shadow-[0_0_30px_rgba(234,179,8,0.2)]">
                  <img src={`/zodiacs/zodiac_${ZODIACS.findIndex(z => z.id === activeZodiac.id) + 1}.jpg`} alt={activeZodiac.name} className="w-full h-full object-cover" />
                </div>
                <div>
                  <h3 className="text-4xl font-serif font-bold text-white mb-1">{activeZodiac.name}</h3>
                  <p className="text-purple-300/80 text-sm">{activeZodiac.hindi} • {activeZodiac.date}</p>
                </div>
              </div>

              <p className="text-purple-100/70 leading-relaxed mb-8 text-lg font-light">
                {activeZodiac.name}, don't take on more than you can manage. Attempting to make everyone happy could exhaust you emotionally. You may need a healthy break due to work-related stress, and a little sleep could be really beneficial. A setback could make you doubt your luck, but don't give up. Recognize other people's emotions to prevent needless confrontation.
              </p>

              <div className="flex flex-wrap gap-4">
                <Button className="bg-amber-500 hover:bg-amber-600 text-black px-8 py-6 rounded-xl font-bold shadow-[0_0_20px_rgba(245,158,11,0.3)] border-none">
                  Get my detailed horoscope
                </Button>
                <Button variant="outline" className="text-purple-300 border-purple-500/30 bg-purple-500/10 hover:bg-purple-500/20 hover:text-white px-8 py-6 rounded-xl font-bold">
                  Talk to a specialist
                </Button>
              </div>
            </div>

            {/* Right Progress Bars */}
            <div className="w-full md:w-80 flex flex-col justify-center gap-6">
              <div className="flex bg-[#1A162C] rounded-full p-1 border border-purple-500/20 mb-4 mx-auto w-full max-w-[300px]">
                {['Today', 'Week', 'Month'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`flex-1 py-2 rounded-full text-xs font-bold transition-all ${
                      activeTab === tab 
                        ? 'bg-amber-500 text-black shadow-md' 
                        : 'text-purple-300 hover:text-white'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {[
                { label: 'Love', val: 75, color: 'bg-pink-500', text: 'Strong', textColor: 'text-pink-400' },
                { label: 'Career', val: 60, color: 'bg-blue-400', text: 'Good', textColor: 'text-blue-400' },
                { label: 'Health', val: 65, color: 'bg-emerald-400', text: 'Good', textColor: 'text-emerald-400' },
                { label: 'Money', val: 60, color: 'bg-amber-400', text: 'Good', textColor: 'text-amber-400' },
              ].map((stat) => (
                <div key={stat.label} className="bg-[#1A162C]/80 backdrop-blur-sm p-4 rounded-2xl flex items-center justify-between border border-purple-500/10">
                  <span className="font-medium text-purple-200 w-16 text-sm">{stat.label}</span>
                  <div className="flex-1 mx-4 h-1.5 bg-[#2A2440] rounded-full overflow-hidden">
                    <div className={`h-full rounded-full ${stat.color} shadow-[0_0_10px_currentColor]`} style={{ width: `${stat.val}%` }} />
                  </div>
                  <span className={`text-xs font-bold w-12 text-right ${stat.textColor}`}>{stat.text}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
