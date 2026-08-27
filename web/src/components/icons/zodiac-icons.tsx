'use client';

import React from 'react';

// Custom designed premium SVG icons for Zodiac Signs
export const ZodiacIcon = ({ name, className = "w-6 h-6" }: { name: string, className?: string }) => {
  const normalized = name.toLowerCase();

  const getPath = () => {
    switch (normalized) {
      case 'aries':
        return <path strokeLinecap="round" strokeLinejoin="round" d="M12 21V10C12 6.5 15.5 3 19 5 M12 21V10C12 6.5 8.5 3 5 5" />;
      case 'taurus':
        return <path strokeLinecap="round" strokeLinejoin="round" d="M12 14a4 4 0 100-8 4 4 0 000 8z M4 5c2 4 14 4 16 0" />;
      case 'gemini':
        return <path strokeLinecap="round" strokeLinejoin="round" d="M8 4v16 M16 4v16 M4 4h16 M4 20h16" />;
      case 'cancer':
        return <path strokeLinecap="round" strokeLinejoin="round" d="M16 10a3 3 0 100-6 3 3 0 000 6z M8 20a3 3 0 100-6 3 3 0 000 6z M16 4c-5 0-9 4-11 10 M8 20c5 0 9-4 11-10" />;
      case 'leo':
        return <path strokeLinecap="round" strokeLinejoin="round" d="M8 8a3 3 0 100-6 3 3 0 000 6z M11 5c4 0 8 4 8 8s-4 8-8 8H5" />;
      case 'virgo':
        return <path strokeLinecap="round" strokeLinejoin="round" d="M4 12V6 M10 12V6 M16 12V6 M4 12c0 4 2 8 6 8s6-4 6-8 M16 12c0 4 4 4 4 0v-4" />;
      case 'libra':
        return <path strokeLinecap="round" strokeLinejoin="round" d="M4 19h16 M12 14c-4 0-6-3-6-6h12c0 3-2 6-6 6z M12 8V4" />;
      case 'scorpio':
        return <path strokeLinecap="round" strokeLinejoin="round" d="M4 12V6 M10 12V6 M16 12V6 M4 12c0 4 2 8 6 8s6-4 6-8 M16 12c0 4 4 4 4 8 M20 20l3-3 M20 20l-3-3" />;
      case 'sagittarius':
        return <path strokeLinecap="round" strokeLinejoin="round" d="M4 20L20 4 M14 4h6v6 M10 14l-4 4" />;
      case 'capricorn':
        return <path strokeLinecap="round" strokeLinejoin="round" d="M4 6v8c0 4 4 4 6 0V6 M10 14c0 4 4 6 8 4s2-6-2-6c-2 0-4 2-4 6" />;
      case 'aquarius':
        return <path strokeLinecap="round" strokeLinejoin="round" d="M2 10l3-3 4 4 6-6 4 4 3-3 M2 18l3-3 4 4 6-6 4 4 3-3" />;
      case 'pisces':
        return <path strokeLinecap="round" strokeLinejoin="round" d="M6 4c0 5 0 11 0 16 M18 4c0 5 0 11 0 16 M4 12h16 M6 4C3 8 3 16 6 20 M18 4c3 4 3 12 18 20" />;
      default:
        // Default star icon
        return <path strokeLinecap="round" strokeLinejoin="round" d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />;
    }
  };

  return (
    <svg 
      className={className} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth={2}
    >
      {getPath()}
    </svg>
  );
};
