'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

const ZODIACS = [
  { id: 'aries', name: 'Aries', hindi: 'Mesh', date: 'Mar 21 - Apr 19', image: '/new-zodiacs/aries.png' },
  { id: 'taurus', name: 'Taurus', hindi: 'Vrishabha', date: 'Apr 20 - May 20', image: '/new-zodiacs/taurus.png' },
  { id: 'gemini', name: 'Gemini', hindi: 'Mithun', date: 'May 21 - Jun 20', image: '/new-zodiacs/gemini.png' },
  { id: 'cancer', name: 'Cancer', hindi: 'Karka', date: 'Jun 21 - Jul 22', image: '/new-zodiacs/cancer.png' },
  { id: 'leo', name: 'Leo', hindi: 'Simha', date: 'Jul 23 - Aug 22', image: '/new-zodiacs/leoo.png' },
  { id: 'virgo', name: 'Virgo', hindi: 'Kanya', date: 'Aug 23 - Sep 22', image: '/new-zodiacs/vigro.png' },
  { id: 'libra', name: 'Libra', hindi: 'Tula', date: 'Sep 23 - Oct 22', image: '/new-zodiacs/libra.png' },
  { id: 'scorpio', name: 'Scorpio', hindi: 'Vrishchika', date: 'Oct 23 - Nov 21', image: '/new-zodiacs/scorpio.png' },
  { id: 'sagittarius', name: 'Sagittarius', hindi: 'Dhanu', date: 'Nov 22 - Dec 21', image: '/new-zodiacs/saggitarius.png' },
  { id: 'capricorn', name: 'Capricorn', hindi: 'Makara', date: 'Dec 22 - Jan 19', image: '/new-zodiacs/capricon.png' },
  { id: 'aquarius', name: 'Aquarius', hindi: 'Kumbha', date: 'Jan 20 - Feb 18', image: '/new-zodiacs/aqarius.png' },
  { id: 'pisces', name: 'Pisces', hindi: 'Meena', date: 'Feb 19 - Mar 20', image: '/new-zodiacs/pices.png' },
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
    <section className="py-24 relative overflow-hidden text-white min-h-screen flex flex-col bg-[#0B0914]" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=2094&auto=format&fit=crop')", backgroundSize: 'cover', backgroundPosition: 'center', backgroundAttachment: 'fixed' }}>
      {/* Dark Space Background Overlay */}
      <div className="absolute inset-0 bg-indigo-950/60 pointer-events-none mix-blend-multiply" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[1200px] h-[600px] bg-indigo-500/20 rounded-[100%] blur-[120px] pointer-events-none" />
      
      {/* Stars Background */}
      <div className="absolute inset-0 opacity-30 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

      <div className="container mx-auto px-6 max-w-6xl relative z-10">
        
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4 drop-shadow-lg">Cosmic Alignment</h2>
          <p className="text-indigo-200/60 text-lg">Select your sign from the celestial orbit</p>
        </div>

        {/* Elliptical Orbital Carousel */}
        <div className="relative w-full h-[400px] mb-20 perspective-1000">
          {/* Orbital rings */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] md:w-[800px] h-[200px] border border-indigo-500/20 rounded-[100%] shadow-[0_0_50px_rgba(99,102,241,0.1)] pointer-events-none" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[85%] md:w-[750px] h-[180px] border border-indigo-500/10 rounded-[100%] pointer-events-none" />
          
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
              const opacity = 0.2 + (depth * 0.8);

              return (
                <motion.div
                  key={zodiac.id}
                  onClick={() => setActiveZodiac(zodiac)}
                  className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 cursor-pointer group`}
                  animate={{
                    x: x,
                    y: y,
                    scale: isActive ? scale * 1.3 : scale,
                    zIndex: isActive ? 200 : zIndex,
                    opacity: isActive ? 1 : opacity,
                    filter: isActive ? 'blur(0px)' : `blur(${Math.max(0, (1-depth) * 4)}px)`
                  }}
                  transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                >
                  <div className={`relative flex flex-col items-center gap-2 ${isActive ? 'drop-shadow-[0_0_20px_rgba(244,114,182,0.6)]' : ''}`}>
                    <div className={`w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center overflow-hidden border-2 transition-colors duration-500 ${isActive ? 'border-pink-400 shadow-[0_0_30px_rgba(244,114,182,0.6)]' : 'border-indigo-500/20 group-hover:border-indigo-400'}`}>
                      <img src={zodiac.image} alt={zodiac.name} className="w-full h-full object-cover mix-blend-screen" />
                    </div>
                    {/* Only show names for front-facing items to avoid clutter */}
                    <div className={`absolute top-full mt-2 text-center transition-opacity duration-300 ${depth > 0.8 || isActive ? 'opacity-100' : 'opacity-0'}`}>
                      <span className={`block text-sm font-bold font-sans tracking-wide ${isActive ? 'text-pink-400' : 'text-indigo-200/80'}`}>
                        {zodiac.name}
                      </span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Detailed Dashboard Card - Dark Theme */}
        <div className="bg-[#131022]/80 backdrop-blur-xl rounded-3xl border border-indigo-500/20 shadow-2xl p-8 md:p-12 relative overflow-hidden">
          
          <div className="absolute top-0 right-0 w-64 h-64 bg-pink-500/10 rounded-full blur-[80px]" />
          
          <div className="flex flex-col md:flex-row gap-12 relative z-10">
            {/* Left Content */}
            <div className="flex-1">
              <div className="flex items-center gap-6 mb-8">
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center overflow-hidden border border-border/50 shrink-0">
                  <img src={activeZodiac.image} alt={activeZodiac.name} className="w-full h-full object-cover mix-blend-screen" />
                </div>
                <div>
                  <h3 className="text-4xl font-serif font-bold text-white mb-1">{activeZodiac.name}</h3>
                  <p className="text-indigo-300/80 text-sm">{activeZodiac.hindi} • {activeZodiac.date}</p>
                </div>
              </div>

              <p className="text-indigo-100/70 leading-relaxed mb-8 text-lg font-light">
                {activeZodiac.name}, don't take on more than you can manage. Attempting to make everyone happy could exhaust you emotionally. You may need a healthy break due to work-related stress, and a little sleep could be really beneficial. A setback could make you doubt your luck, but don't give up. Recognize other people's emotions to prevent needless confrontation.
              </p>

              <div className="flex flex-wrap gap-4">
                <Button className="bg-pink-500 hover:bg-pink-600 text-white px-8 py-6 rounded-xl font-bold shadow-[0_0_20px_rgba(236,72,153,0.3)] border-none">
                  Get my detailed horoscope
                </Button>
                <Button variant="outline" className="text-indigo-300 border-indigo-500/30 bg-indigo-500/10 hover:bg-indigo-500/20 hover:text-white px-8 py-6 rounded-xl font-bold">
                  Talk to a specialist
                </Button>
              </div>
            </div>

            {/* Right Progress Bars */}
            <div className="w-full md:w-80 flex flex-col justify-center gap-6">
              <div className="flex bg-[#1A162C] rounded-full p-1 border border-indigo-500/20 mb-4 mx-auto w-full max-w-[300px]">
                {['Today', 'Week', 'Month'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`flex-1 py-2 rounded-full text-xs font-bold transition-all ${
                      activeTab === tab 
                        ? 'bg-pink-500 text-white shadow-md' 
                        : 'text-indigo-300 hover:text-white'
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
                { label: 'Money', val: 60, color: 'bg-indigo-400', text: 'Good', textColor: 'text-indigo-400' },
              ].map((stat) => (
                <div key={stat.label} className="bg-[#1A162C]/80 backdrop-blur-sm p-4 rounded-2xl flex items-center justify-between border border-indigo-500/10">
                  <span className="font-medium text-indigo-200 w-16 text-sm">{stat.label}</span>
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
