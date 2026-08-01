'use client';
import { motion } from 'framer-motion';

export function UniversePricing() {
  const plans = [
    { name: 'Seeker', price: 'Free', features: ['Daily Horoscope', 'Basic Birth Chart', 'Community Access'] },
    { name: 'Initiate', price: '$29/mo', features: ['Advanced Chart Analysis', 'Monthly Tarot Reading', 'Compatibility Reports'] },
    { name: 'Master', price: '$99/mo', features: ['1-on-1 Vedic Readings', 'Aura Sync Sessions', 'Priority Astrologer Access'] },
  ];

  return (
    <section className="relative min-h-screen bg-black py-32 overflow-hidden flex flex-col items-center justify-center">
      <div className="absolute top-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37]/30 to-transparent" />
      
      <div className="text-center z-20 mb-24 px-8">
        <h2 className="text-[10px] uppercase tracking-[0.5em] text-[#D4AF37] mb-4">Ascension Tiers</h2>
        <h3 className="text-4xl md:text-6xl font-serif text-white">Unlock The Mysteries</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-7xl px-8 z-10">
        {plans.map((plan, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.2 }}
            whileHover={{ y: -10 }}
            className="p-12 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md flex flex-col relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/0 to-[#D4AF37]/0 group-hover:from-[#D4AF37]/10 group-hover:to-transparent transition-colors duration-500" />
            
            <h4 className="text-2xl font-serif text-white mb-2 relative z-10">{plan.name}</h4>
            <div className="text-4xl font-light text-[#D4AF37] mb-8 relative z-10">{plan.price}</div>
            
            <ul className="space-y-4 mb-12 flex-grow relative z-10">
              {plan.features.map((feature, j) => (
                <li key={j} className="flex items-center gap-3 text-white/60 text-sm tracking-wider">
                  <div className="w-1 h-1 rounded-full bg-[#D4AF37]" /> {feature}
                </li>
              ))}
            </ul>
            
            <button className="w-full border border-[#D4AF37]/30 text-[#D4AF37] py-4 rounded-full hover:bg-[#D4AF37] hover:text-black transition-colors uppercase text-xs tracking-widest relative z-10">
              Select Path
            </button>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
