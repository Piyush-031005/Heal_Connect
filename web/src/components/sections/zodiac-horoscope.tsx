'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { useLayout } from '@/lib/layout-context';

const ZODIACS = [
  { id: 'aries', name: 'Aries', hindi: 'Mesh', date: 'Mar 21 - Apr 19', image: '/new-zodiacs/aries_new.png' },
  { id: 'taurus', name: 'Taurus', hindi: 'Vrishabha', date: 'Apr 20 - May 20', image: '/new-zodiacs/taurus.png' },
  { id: 'gemini', name: 'Gemini', hindi: 'Mithun', date: 'May 21 - Jun 20', image: '/new-zodiacs/gemini_new.png' },
  { id: 'cancer', name: 'Cancer', hindi: 'Karka', date: 'Jun 21 - Jul 22', image: '/new-zodiacs/cancer.png' },
  { id: 'leo', name: 'Leo', hindi: 'Simha', date: 'Jul 23 - Aug 22', image: '/new-zodiacs/leo_new.png' },
  { id: 'virgo', name: 'Virgo', hindi: 'Kanya', date: 'Aug 23 - Sep 22', image: '/new-zodiacs/virgo_new.png' },
  { id: 'libra', name: 'Libra', hindi: 'Tula', date: 'Sep 23 - Oct 22', image: '/new-zodiacs/libra_new.png' },
  { id: 'scorpio', name: 'Scorpio', hindi: 'Vrishchika', date: 'Oct 23 - Nov 21', image: '/new-zodiacs/scorpio_new.png' },
  { id: 'sagittarius', name: 'Sagittarius', hindi: 'Dhanu', date: 'Nov 22 - Dec 21', image: '/new-zodiacs/saggitarius.png' },
  { id: 'capricorn', name: 'Capricorn', hindi: 'Makara', date: 'Dec 22 - Jan 19', image: '/new-zodiacs/capricon_new.png' },
  { id: 'aquarius', name: 'Aquarius', hindi: 'Kumbha', date: 'Jan 20 - Feb 18', image: '/new-zodiacs/aqarius.png' },
  { id: 'pisces', name: 'Pisces', hindi: 'Meena', date: 'Feb 19 - Mar 20', image: '/new-zodiacs/pices.png' },
];

export default function ZodiacHoroscope() {
  const { layout } = useLayout();
  const isNewDesign1 = layout === 'new-design-1' || layout.startsWith('layout-');
  const [activeZodiac, setActiveZodiac] = useState(ZODIACS[6]);
  const [activeTab, setActiveTab] = useState('Today');
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setRotation(prev => prev + 0.002);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className={ + " "py-24 relative overflow-hidden flex flex-col " +  style={!isNewDesign1 ? { backgroundImage: "url('https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=2094&auto=format&fit=crop')", backgroundSize: 'cover', backgroundPosition: 'center', backgroundAttachment: 'fixed' } : {}}>
      {!isNewDesign1 && (
        <>
          <div className="absolute inset-0 bg-indigo-950/60 pointer-events-none mix-blend-multiply" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[1200px] h-[600px] bg-indigo-500/20 rounded-[100%] blur-[120px] pointer-events-none" />
          <div className="absolute inset-0 opacity-30 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        </>
      )}

      <div className="container mx-auto px-6 max-w-6xl relative z-10">
        
        <div className="text-center mb-16">
          <h2 className={ + " 	ext-4xl md:text-5xl font-serif font-bold mb-4 drop-shadow-lg " + }>Cosmic Alignment</h2>
          <p className={isNewDesign1 ? 'text-muted-foreground text-lg' : 'text-indigo-200/60 text-lg'}>Select your sign from the celestial orbit</p>
        </div>

        <div className="relative h-[300px] md:h-[400px] w-full max-w-[800px] mx-auto mb-16 perspective-[1000px]">
          
          <div className={ + " bsolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[800px] aspect-[2/1] border border-dashed rounded-[100%] pointer-events-none transform-style-3d " + } />
          <div className={ + " bsolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] aspect-[2/1] border border-dashed rounded-[100%] pointer-events-none transform-style-3d " + } />
          
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full transform-style-3d">
            {ZODIACS.map((zodiac, index) => {
              const isActive = activeZodiac.id === zodiac.id;
              
              const rx = typeof window !== 'undefined' && window.innerWidth < 768 ? 160 : 400;
              const ry = typeof window !== 'undefined' && window.innerWidth < 768 ? 80 : 100;
              
              const angle = (index / 12) * Math.PI * 2 + rotation;
              const x = Math.cos(angle) * rx;
              const y = Math.sin(angle) * ry;
              
              const depth = (Math.sin(angle) + 1) / 2;
              const scale = 0.6 + (depth * 0.6);
              const zIndex = Math.floor(depth * 100);
              const opacity = 0.2 + (depth * 0.8);

              return (
                <motion.div
                  key={zodiac.id}
                  onClick={() => setActiveZodiac(zodiac)}
                  className={ + " bsolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 cursor-pointer group" + }
                  animate={{
                    x: x,
                    y: y,
                    scale: isActive ? scale * 1.3 : scale,
                    zIndex: isActive ? 200 : zIndex,
                    opacity: isActive ? 1 : opacity,
                    filter: isActive ? 'blur(0px)' :  + " lur(px)" + 
                  }}
                  transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                >
                  <div className={ + " elative flex flex-col items-center gap-2 " + }>
                    <div className={ + " w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center overflow-hidden border-2 transition-colors duration-500 bg-white/90 shadow-md " + }>
                      <img src={zodiac.image} alt={zodiac.name} className="w-full h-full object-contain p-1.5" />
                    </div>
                    <div className={ + " bsolute top-full mt-2 text-center transition-opacity duration-300 " + }>
                      <span className={ + " lock text-sm font-bold font-sans tracking-wide " + }>
                        {zodiac.name}
                      </span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        <div className={ + " ${isNewDesign1 ? 'bg-card/60 border-border text-foreground' : 'bg-[#131022]/80 border-indigo-500/20 text-white'} backdrop-blur-xl rounded-3xl border shadow-2xl p-8 md:p-12 relative overflow-hidden transition-all" + }>
          
          <div className={ + " bsolute top-0 right-0 w-64 h-64  rounded-full blur-[80px]" + } />
          
          <div className="flex flex-col md:flex-row gap-12 relative z-10">
            <div className="flex-1">
              <div className="flex items-center gap-6 mb-8">
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center overflow-hidden border border-primary/20 bg-white p-1.5 shadow-sm shrink-0">
                  <img src={activeZodiac.image} alt={activeZodiac.name} className="w-full h-full object-contain" />
                </div>
                <div>
                  <h3 className={ + " 	ext-4xl font-serif font-bold  mb-1" + }>{activeZodiac.name}</h3>
                  <p className={isNewDesign1 ? 'text-muted-foreground text-sm' : 'text-indigo-300/80 text-sm'}>{activeZodiac.hindi} • {activeZodiac.date}</p>
                </div>
              </div>

              <p className={ + " ${isNewDesign1 ? 'text-muted-foreground' : 'text-indigo-100/70'} leading-relaxed mb-8 text-lg font-light" + }>
                {activeZodiac.name}, don't take on more than you can manage. Attempting to make everyone happy could exhaust you emotionally. You may need a healthy break due to work-related stress, and a little sleep could be really beneficial. A setback could make you doubt your luck, but don't give up. Recognize other people's emotions to prevent needless confrontation.
              </p>

              <div className="flex flex-wrap gap-4">
                <Button className={isNewDesign1 ? 'bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 rounded-xl font-bold shadow-md' : 'bg-pink-500 hover:bg-pink-600 text-white px-8 py-6 rounded-xl font-bold shadow-[0_0_20px_rgba(236,72,153,0.3)] border-none'}>
                  Get my detailed horoscope
                </Button>
                <Button variant="outline" className={isNewDesign1 ? 'text-foreground border-border bg-background/50 hover:bg-background px-8 py-6 rounded-xl font-bold' : 'text-indigo-300 border-indigo-500/30 bg-indigo-500/10 hover:bg-indigo-500/20 hover:text-white px-8 py-6 rounded-xl font-bold'}>
                  Talk to a specialist
                </Button>
              </div>
            </div>

            <div className="w-full md:w-80 flex flex-col justify-center gap-6">
              <div className={ + " lex rounded-full p-1 border mb-4 mx-auto w-full max-w-[300px] " + }>
                {['Today', 'Week', 'Month'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={ + " lex-1 py-2 rounded-full text-xs font-bold transition-all " + }
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {[
                { label: 'Love', val: 75, color: 'bg-pink-500', text: 'Strong', textColor: 'text-pink-500' },
                { label: 'Career', val: 60, color: 'bg-blue-400', text: 'Good', textColor: 'text-blue-500' },
                { label: 'Health', val: 65, color: 'bg-emerald-400', text: 'Good', textColor: 'text-emerald-500' },
                { label: 'Money', val: 60, color: 'bg-indigo-400', text: 'Good', textColor: 'text-indigo-500' },
              ].map((stat) => (
                <div key={stat.label} className={ + " ${isNewDesign1 ? 'bg-background/40 border-border' : 'bg-[#1A162C]/80 border-indigo-500/10'} backdrop-blur-sm p-4 rounded-2xl flex items-center justify-between border" + }>
                  <span className={ + " ont-medium w-16 text-sm " + }>{stat.label}</span>
                  <div className={ + " lex-1 mx-4 h-1.5 rounded-full overflow-hidden " + }>
                    <div className={ + " h-full rounded-full  shadow-[0_0_10px_currentColor]" + } style={{ width:  + " ${stat.val}%" +  }} />
                  </div>
                  <span className={ + " 	ext-xs font-bold w-12 text-right " + }>{stat.text}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
