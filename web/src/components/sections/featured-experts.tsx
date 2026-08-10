'use client';

import { Star, MapPin, Languages, Clock, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const EXPERTS = [
  {
    id: 1,
    name: 'Dr. Elena Rossi',
    specialization: 'Holistic Energy Healer',
    rating: '4.9',
    reviews: 128,
    experience: '15+ Years',
    languages: 'English, Italian',
    location: 'Milan, Italy (Global)',
    price: '$120 / session',
    availability: 'Available Today',
    image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Elena&backgroundColor=E8E0F8'
  },
  {
    id: 2,
    name: 'Master Chen Wei',
    specialization: 'Vastu & Feng Shui',
    rating: '5.0',
    reviews: 342,
    experience: '20+ Years',
    languages: 'English, Mandarin',
    location: 'Singapore (Global)',
    price: '$150 / session',
    availability: 'Next Avail: Tomorrow',
    image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Chen&backgroundColor=E8E0F8'
  },
  {
    id: 3,
    name: 'Sarah Jenkins',
    specialization: 'Vedic Astrologer',
    rating: '4.8',
    reviews: 89,
    experience: '8+ Years',
    languages: 'English',
    location: 'London, UK (Global)',
    price: '$90 / session',
    availability: 'Available Today',
    image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah&backgroundColor=E8E0F8'
  },
  {
    id: 4,
    name: 'Yogi Ram',
    specialization: 'Spiritual Guide',
    rating: '5.0',
    reviews: 412,
    experience: '30+ Years',
    languages: 'Hindi, English',
    location: 'Rishikesh (Global)',
    price: '$80 / session',
    availability: 'Available Today',
    image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ram&backgroundColor=E8E0F8&top=turban'
  },
  {
    id: 5,
    name: 'Emma Stone',
    specialization: 'Tarot Reader',
    rating: '4.7',
    reviews: 210,
    experience: '5+ Years',
    languages: 'English',
    location: 'New York (Global)',
    price: '$60 / session',
    availability: 'Next Avail: Tomorrow',
    image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emma&backgroundColor=E8E0F8'
  }
];

export function FeaturedExperts() {
  const scrollRef = React.useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 320; // card width + gap
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="py-24 bg-card border-t border-border">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <h2 className="text-4xl md:text-5xl font-heading font-medium text-foreground mb-4">Featured Experts</h2>
            <div className="w-12 h-0.5 bg-primary/40" />
            <p className="text-muted-foreground mt-4 max-w-xl">
              Connect with our highest-rated, verified practitioners worldwide.
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Button variant="outline" size="icon" onClick={() => scroll('left')} className="rounded-full w-10 h-10 border-border/50 hover:bg-primary/5">
                <ArrowRight className="w-4 h-4 rotate-180 text-foreground" />
              </Button>
              <Button variant="outline" size="icon" onClick={() => scroll('right')} className="rounded-full w-10 h-10 border-border/50 hover:bg-primary/5">
                <ArrowRight className="w-4 h-4 text-foreground" />
              </Button>
            </div>
            <Link href="/practitioners" className="inline-flex items-center text-sm font-medium text-primary hover:text-primary/80 transition-colors bg-primary/10 px-4 py-2 rounded-full">
              View All
            </Link>
          </div>
        </div>

        <div 
          ref={scrollRef}
          className="flex overflow-x-auto gap-6 pb-8 snap-x snap-mandatory scroll-smooth"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {EXPERTS.map((expert) => (
            <div key={expert.id} className="w-[300px] shrink-0 snap-start bg-card rounded-2xl border border-border shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col group p-5 relative overflow-hidden">
              
              {/* Top Choice / Tag (Simulating Astrotalk Tags) */}
              <div className="absolute top-4 right-4 z-10">
                <span className={`text-[10px] font-bold px-3 py-1 rounded-full text-white ${expert.id % 2 === 0 ? 'bg-pink-500' : 'bg-purple-500'}`}>
                  {expert.id % 2 === 0 ? 'Top Choice' : 'Celebrity'}
                </span>
              </div>

              {/* Profile Image & Name Row */}
              <div className="flex items-center gap-4 mb-4 mt-2">
                <div className="relative w-16 h-16 shrink-0">
                  <div className="w-full h-full rounded-full border-2 border-primary/20 overflow-hidden bg-muted">
                    <img 
                      src={expert.image} 
                      alt={expert.name}
                      className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  {/* Online Dot */}
                  <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 border-2 border-white rounded-full z-10" />
                </div>
                
                <div>
                  <h3 className="text-lg font-bold text-foreground leading-none mb-1.5">{expert.name.split(' ')[0]}</h3>
                  <div className="flex items-center gap-1.5 text-xs font-medium">
                    <span className="text-pink-500 flex items-center">
                      <Star className="w-3 h-3 fill-pink-500 mr-0.5" />
                      {expert.rating}
                    </span>
                    <span className="text-muted-foreground">({expert.reviews}k+ orders)</span>
                  </div>
                </div>
              </div>
              
              {/* Specialties / Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {expert.specialization.split(', ').map((spec, i) => (
                  <span key={i} className="text-[10px] font-medium px-2 py-0.5 rounded bg-pink-50 text-pink-700 border border-pink-100">
                    {spec}
                  </span>
                ))}
              </div>

              {/* Details (Languages & Experience) */}
              <div className="flex flex-col gap-1 text-xs text-muted-foreground mb-4 font-medium">
                <p className="truncate">{expert.languages}</p>
                <p>{expert.experience}</p>
              </div>

              {/* Price Row */}
              <div className="mt-auto flex items-center justify-between mb-4 border-t border-border/50 pt-4">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-green-500" />
                  <span className="text-xs font-medium text-green-600">Online</span>
                </div>
                <div className="text-right">
                  <span className="text-sm font-bold text-foreground">{expert.price.replace('$', '₹')}</span>
                  <span className="text-xs text-muted-foreground">/min</span>
                </div>
              </div>
              
              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-3">
                <Button className="w-full h-9 rounded-lg bg-pink-500 hover:bg-pink-600 text-white shadow-sm font-semibold text-xs border border-pink-600">
                  Chat
                </Button>
                <Button variant="outline" className="w-full h-9 rounded-lg border-border hover:bg-muted font-semibold text-xs">
                  Call
                </Button>
              </div>

            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
