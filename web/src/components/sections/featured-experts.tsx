'use client';

import { Star, MapPin, Languages, Clock, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';

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
  return (
    <section className="py-24 bg-card border-t border-border">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <h2 className="text-4xl md:text-5xl font-heading font-medium text-foreground mb-4">Featured Experts</h2>
            <div className="w-12 h-0.5 bg-primary/40" />
            <p className="text-muted-foreground mt-4 max-w-xl">
              Connect with our highest-rated, verified practitioners worldwide.
            </p>
          </div>
          <Link href="/practitioners" className="inline-flex items-center text-sm font-medium text-primary hover:text-primary/80 transition-colors">
            View All Experts <ArrowRight className="w-4 h-4 ml-1" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {EXPERTS.map((expert) => (
            <div key={expert.id} className="bg-background rounded-2xl overflow-hidden border border-border shadow-sm hover:shadow-md hover:border-primary/40 transition-all duration-300 flex flex-col group p-4">
              <div className="relative w-24 h-24 mx-auto mb-4 overflow-hidden rounded-full border-2 border-primary/20 bg-[#F0E8F8]">
                <Image 
                  src={expert.image} 
                  alt={expert.name}
                  fill
                  className="object-cover object-center group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 bg-background/90 backdrop-blur-md px-2 py-0.5 rounded-full flex items-center gap-1 shadow-sm border border-border">
                  <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                  <span className="text-[10px] font-bold text-foreground">{expert.rating}</span>
                </div>
              </div>
              
              <div className="flex-1 flex flex-col text-center">
                <h3 className="text-sm font-bold text-foreground mb-0.5 truncate">{expert.name}</h3>
                <p className="text-primary text-[11px] font-medium mb-3 truncate">{expert.specialization}</p>
                
                <div className="flex flex-col gap-1.5 text-[11px] text-muted-foreground mb-4">
                  <div className="flex items-center justify-center gap-1.5">
                    <Clock className="w-3 h-3" />
                    <span>{expert.experience} Exp.</span>
                  </div>
                  <div className="flex items-center justify-center gap-1.5">
                    <MapPin className="w-3 h-3" />
                    <span className="truncate">{expert.location}</span>
                  </div>
                </div>

                <div className="mt-auto pt-3 border-t border-border/50 flex flex-col items-center justify-center gap-2">
                  <span className="text-[10px] font-medium text-success flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
                    {expert.availability}
                  </span>
                  <Button size="sm" className="w-full h-8 text-xs rounded-full bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground transition-all">
                    Book {expert.price.split(' ')[0]}
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
