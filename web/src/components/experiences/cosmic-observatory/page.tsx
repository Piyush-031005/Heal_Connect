'use client';
import { ObservatoryHero } from './hero';
import { useEffect } from 'react';

export function CosmicObservatoryExperience() {
  return (
    <div className="bg-[#050505] min-h-screen text-[#E0E0E0] font-mono selection:bg-[#4A90E2] selection:text-white">
      <main>
        <ObservatoryHero />
      </main>
    </div>
  );
}
