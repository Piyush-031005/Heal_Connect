'use client';

import { Star, MessageCircle, Shield, Globe, CheckCircle2, Lock } from 'lucide-react';

export function TrustLayer({ variant }: { variant: string }) {
  if (variant === 'divine-lotus') {
    return (
      <section className="relative z-20 py-20 border-y border-pink-500/10 bg-[#0a050f] overflow-hidden">
        {/* Soft background accents */}
        <div className="absolute inset-0 z-0 flex justify-center items-center pointer-events-none opacity-30">
          <div className="w-[800px] h-full bg-gradient-to-r from-transparent via-pink-900/10 to-transparent" />
        </div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
             <h2 className="text-3xl md:text-5xl font-serif text-white mb-4">
               The Path to <span className="text-pink-400 italic">Enlightenment</span>
             </h2>
             <div className="w-24 h-[1px] bg-pink-500/50 mx-auto" />
          </div>
          <div className="flex flex-wrap justify-center lg:justify-between items-center gap-12 max-w-6xl mx-auto">
            {[
              { label: 'Divine Rating', value: '4.9 ★', icon: Star },
              { label: 'Spiritual Readings', value: '100k+', icon: MessageCircle },
              { label: 'Ascended Masters', value: '500+', icon: Shield },
              { label: 'Cosmic Connection', value: '24x7', icon: Globe },
            ].map((stat, idx) => (
              <div key={idx} className="flex flex-col items-center group">
                <div className="w-16 h-16 rounded-full border border-pink-500/20 bg-pink-500/5 flex items-center justify-center mb-4 group-hover:bg-pink-500/20 transition-all duration-500 group-hover:scale-110 shadow-[0_0_15px_rgba(236,72,153,0.1)]">
                  <stat.icon className="w-6 h-6 text-pink-400" />
                </div>
                <span className="text-3xl font-serif font-black text-white">{stat.value}</span>
                <span className="text-[10px] uppercase tracking-[0.3em] text-pink-200/50 mt-2">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (variant === 'cinematic-nature') {
    return (
      <section className="py-24 relative z-10 bg-white overflow-hidden border-t border-gray-50">
        <div className="container mx-auto px-6 relative z-10 max-w-6xl">
          <div className="text-center mb-16">
            <span className="text-[#32CD32] text-sm uppercase tracking-[0.4em] font-bold mb-4 block">Our Commitment</span>
            <h2 className="text-4xl md:text-5xl font-serif text-[#1A1A1A] tracking-tight">Guaranteed Serenity</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            <div className="flex flex-col items-center group">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#FFC300]/10 to-[#32CD32]/10 flex items-center justify-center mb-8 shadow-sm group-hover:scale-110 transition-transform duration-700">
                <Shield className="w-8 h-8 text-[#FFC300]" />
              </div>
              <h3 className="text-xl font-bold text-[#1A1A1A] mb-4">100% Secure</h3>
              <p className="text-[#4A4A4A] font-light leading-relaxed">Your privacy is our utmost priority. All sessions are completely confidential and encrypted.</p>
            </div>
            <div className="flex flex-col items-center group">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#FFC300]/10 to-[#32CD32]/10 flex items-center justify-center mb-8 shadow-sm group-hover:scale-110 transition-transform duration-700">
                <CheckCircle2 className="w-8 h-8 text-[#32CD32]" />
              </div>
              <h3 className="text-xl font-bold text-[#1A1A1A] mb-4">Verified Experts</h3>
              <p className="text-[#4A4A4A] font-light leading-relaxed">Every master undergoes a rigorous 5-step screening process to ensure absolute authenticity.</p>
            </div>
            <div className="flex flex-col items-center group">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#FFC300]/10 to-[#32CD32]/10 flex items-center justify-center mb-8 shadow-sm group-hover:scale-110 transition-transform duration-700">
                <Lock className="w-8 h-8 text-[#FFC300]" />
              </div>
              <h3 className="text-xl font-bold text-[#1A1A1A] mb-4">Money Back</h3>
              <p className="text-[#4A4A4A] font-light leading-relaxed">Not satisfied with your reading? We offer a full refund guarantee on your first session.</p>
            </div>
          </div>
        </div>
      </section>
    );
  }
  if (variant === 'cosmic') {
    return (
      <section className="relative z-20 py-12 border-y border-red-900/10 bg-white">
        <div className="container mx-auto px-6">
          <div className="flex flex-wrap justify-center lg:justify-between items-center gap-8">
            {[
              { label: 'Rating', value: '4.9 ★', icon: Star },
              { label: 'Readings', value: '100k+', icon: MessageCircle },
              { label: 'Masters', value: '500+', icon: Shield },
              { label: 'Available', value: '24x7', icon: Globe },
            ].map((stat, idx) => (
              <div key={idx} className="flex flex-col items-center group">
                <stat.icon className="w-8 h-8 text-red-600 mb-3 group-hover:scale-125 transition-transform duration-500 group-hover:drop-shadow-[0_0_15px_rgba(220,38,38,0.4)]" />
                <span className="text-3xl font-black text-[#1A0B0F]">{stat.value}</span>
                <span className="text-xs uppercase tracking-[0.2em] text-[#4A3B3F] mt-1">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (variant === 'split') {
    return (
      <section className="relative z-20 py-12 border-y border-[#D4A843]/20 bg-[#12121E]">
        <div className="container mx-auto px-6">
          <div className="flex flex-wrap justify-center md:justify-between items-center gap-12 divide-x divide-[#D4A843]/20">
            {[
              { label: 'Global Rating', value: '4.9 ★', icon: Star },
              { label: 'Consultations', value: '100k+', icon: MessageCircle },
              { label: 'Verified Seers', value: '500+', icon: Shield },
              { label: 'Access', value: '24x7', icon: Globe },
            ].map((stat, idx) => (
              <div key={idx} className="flex flex-col items-center text-center px-4 md:px-12 flex-1 group">
                <span className="text-4xl font-serif text-[#D4A843] group-hover:scale-110 transition-transform">{stat.value}</span>
                <span className="text-xs uppercase tracking-widest text-[#8A8A9E] mt-2 font-serif">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Default mystic/golden
  return (
    <section className="relative z-20 py-8 border-y border-border bg-card/50 backdrop-blur-md">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-center lg:justify-between items-center gap-6">
          {[
            { label: 'Rating', value: '4.9 ★', icon: Star },
            { label: 'Consultations', value: '100k+', icon: MessageCircle },
            { label: 'Verified Experts', value: '500+', icon: Shield },
            { label: 'Availability', value: '24x7', icon: Globe },
          ].map((stat, idx) => (
            <div key={idx} className="flex flex-col items-center lg:items-start group">
              <div className="flex items-center gap-2 mb-1">
                <stat.icon className="w-5 h-5 text-primary group-hover:text-amber-500 transition-colors" />
                <span className="text-2xl font-bold text-foreground">{stat.value}</span>
              </div>
              <span className="text-xs uppercase tracking-widest text-muted-foreground ml-7">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
