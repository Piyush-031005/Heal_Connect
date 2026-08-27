'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Star, Shield, Phone, MessageCircle } from 'lucide-react';

import { useTheme } from 'next-themes';
import { useLayout } from '@/lib/layout-context';
import { useRouter } from 'next/navigation';

const EXPERTS = [
  { name: 'Maya Sharma', role: 'Vedic Astrologer', rating: '4.9', reviews: '128k+', langs: 'English, Hindi', exp: '15+ Years', price: '₹120', available: true, img: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop', badge: 'Celebrity' },
  { name: 'Arun Nair', role: 'Tarot & Crystals', rating: '5.0', reviews: '342k+', langs: 'English, Malayalam', exp: '20+ Years', price: '₹150', available: true, img: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=400&auto=format&fit=crop', badge: 'Top Choice' },
  { name: 'Dr. Elena Rossi', role: 'Energy Healer', rating: '4.8', reviews: '89k+', langs: 'English, Italian', exp: '8+ Years', price: '₹90', available: false, img: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=400&auto=format&fit=crop', badge: 'Celebrity' },
  { name: 'Chen Wei', role: 'Numerologist', rating: '5.0', reviews: '412k+', langs: 'English, Mandarin', exp: '30+ Years', price: '₹80', available: true, img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop', badge: 'Top Choice' },
  { name: 'Luna Vega', role: 'Tarot Reader', rating: '4.9', reviews: '11k+', langs: 'English, Spanish', exp: '6+ Years', price: '₹100', available: true, img: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=400&auto=format&fit=crop', badge: '' },
];

export function FinalHybridExperts() {
  const { theme } = useTheme();
  const isNewColor = theme === 'theme-new-color';
  const isZenAlign = theme === 'theme-zen-align';
  const router = useRouter();
  const { layout } = useLayout();
  const isNewLayout = layout.startsWith('layout-');

  return (
    <section className="relative py-24 overflow-hidden border-b border-primary/50" style={isNewLayout ? { background: 'transparent' } : isZenAlign ? { background: 'linear-gradient(135deg, #5F3BA9 0%, #4E67CC 100%)' } : isNewColor ? { backgroundColor: '#301368' } : { background: 'linear-gradient(135deg, #B79AE6 0%, #7A48AB 50%, #694091 100%)' }}>
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-primary/8 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, rgba(158,136,199,0.4) 1px, transparent 1px)', backgroundSize: '30px 30px' }} />

      <div className="container mx-auto px-6 lg:px-16 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-[2px] bg-primary" />
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary">Featured Experts</span>
            </div>
            <h2 className={`text-4xl md:text-5xl font-serif font-medium text-foreground`}>
              Connect with top-rated guides.
            </h2>
          </div>
          <Link href="/practitioners" className="hidden md:flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary transition-colors pb-2">
            View All Experts <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Side-by-Side Experts Carousel/Grid */}
        <div className="flex overflow-x-auto gap-6 pb-8 snap-x snap-mandatory scrollbar-hide" style={{ scrollbarWidth: 'none' }}>
          {EXPERTS.map((expert, idx) => (
            <div 
              key={idx} 
              onClick={() => router.push('/practitioners')}
              className={`w-[260px] min-w-[260px] md:w-[320px] md:min-w-[320px] flex-shrink-0 snap-start rounded-[2rem] p-6 relative group transition-all hover:-translate-y-1 shadow-lg cursor-pointer border ${isZenAlign ? "bg-[#1E2059] border-[#4E67CC] hover:shadow-[0_10px_30px_rgba(78,103,204,0.3)] hover:border-[#4E67CC]" : "bg-[#2D1B54] border-[#4B2F6E] hover:shadow-[0_10px_30px_rgba(183,154,230,0.15)] hover:border-primary/50"}`}
            >
              {/* Badges */}
              {expert.badge && (
                <div className={`absolute top-4 right-4 text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full ${expert.badge === 'Celebrity' ? 'bg-primary text-primary-foreground' : 'bg-primary text-primary-foreground'}`}>
                  {expert.badge}
                </div>
              )}

              {/* Avatar + Info */}
              <div className="flex items-center gap-4 mb-6">
                <div className="relative">
                  <div className="w-20 h-20 rounded-full border-2 border-primary/40 p-1 overflow-hidden group-hover:border-[#B79AE6] transition-colors">
                    <img src={expert.img} alt={expert.name} className="w-full h-full object-cover rounded-full" />
                  </div>
                  {expert.available && (
                    <div className="absolute bottom-1 right-1 w-4 h-4 bg-green-500 border-2 border-[#4D316B] rounded-full animate-pulse" />
                  )}
                </div>
                <div>
                  <h3 className="text-xl font-serif font-bold text-foreground">{expert.name}</h3>
                  <p className="text-xs font-semibold text-primary bg-primary/20 inline-block px-2 py-0.5 rounded mt-1">{expert.role}</p>
                </div>
              </div>

              {/* Stats */}
              <div className="flex items-center gap-2 mb-6">
                <Star className="w-4 h-4 text-primary" fill="#B79AE6" />
                <span className="text-sm font-bold text-foreground">{expert.rating}</span>
                <span className="text-xs text-primary">({expert.reviews} orders)</span>
              </div>

              {/* Details */}
              <div className="space-y-2 mb-6 border-t border-primary/30 pt-4">
                <div className="flex justify-between text-xs">
                  <span className="text-primary">Languages</span>
                  <span className="text-foreground font-medium">{expert.langs}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-primary">Experience</span>
                  <span className="text-foreground font-medium">{expert.exp}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-primary">Price</span>
                  <span className="text-primary font-bold">{expert.price} / min</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3">
                <button 
                  onClick={(e) => { e.stopPropagation(); router.push('/login'); }}
                  className="flex-1 bg-transparent border border-primary text-foreground py-2.5 rounded-xl text-xs font-bold hover:bg-primary hover:text-[#2D1B54] hover:border-[#B79AE6] transition-colors flex items-center justify-center gap-1.5"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  Chat
                </button>
                <button 
                  onClick={(e) => { e.stopPropagation(); router.push('/login'); }}
                  className="flex-1 bg-transparent border border-primary text-foreground py-2.5 rounded-xl text-xs font-bold hover:bg-primary hover:text-[#2D1B54] hover:border-[#B79AE6] transition-colors flex items-center justify-center gap-1.5"
                >
                  <Phone className="w-3.5 h-3.5" />
                  Call
                </button>
              </div>
            </div>
          ))}
        </div>
        
        <Link href="/practitioners" className="md:hidden flex items-center justify-center gap-2 text-sm font-semibold text-primary mt-4">
          View All Experts <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </section>
  );
}
