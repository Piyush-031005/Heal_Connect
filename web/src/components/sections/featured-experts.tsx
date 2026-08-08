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
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=400&h=400'
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
    image: 'https://images.unsplash.com/photo-1581056771107-24ca5f033842?auto=format&fit=crop&q=80&w=400&h=400'
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
    image: 'https://images.unsplash.com/photo-1603525166014-9b51e0ff0537?auto=format&fit=crop&q=80&w=400&h=400'
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {EXPERTS.map((expert) => (
            <div key={expert.id} className="bg-background rounded-3xl overflow-hidden border border-border shadow-sm hover:shadow-lg hover:border-primary/30 transition-all duration-300 flex flex-col group">
              <div className="relative h-64 w-full overflow-hidden">
                <Image 
                  src={expert.image} 
                  alt={expert.name}
                  fill
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-4 right-4 bg-background/90 backdrop-blur-md px-3 py-1 rounded-full flex items-center gap-1 shadow-sm">
                  <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                  <span className="text-xs font-bold text-foreground">{expert.rating}</span>
                </div>
              </div>
              
              <div className="p-6 flex-1 flex flex-col">
                <h3 className="text-xl font-bold text-foreground mb-1">{expert.name}</h3>
                <p className="text-primary text-sm font-medium mb-4">{expert.specialization}</p>
                
                <div className="grid grid-cols-2 gap-y-3 gap-x-2 text-xs text-muted-foreground mb-6">
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{expert.experience} Exp.</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5" />
                    <span className="truncate">{expert.location}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Languages className="w-3.5 h-3.5" />
                    <span className="truncate">{expert.languages}</span>
                  </div>
                  <div className="flex items-center gap-1.5 font-medium text-foreground">
                    <span>{expert.price}</span>
                  </div>
                </div>

                <div className="mt-auto pt-4 border-t border-border flex items-center justify-between">
                  <span className="text-xs font-medium text-success flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
                    {expert.availability}
                  </span>
                  <Button size="sm" className="rounded-full bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground border border-primary/20 transition-all">
                    Book Now
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
