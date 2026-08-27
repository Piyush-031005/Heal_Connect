import React from 'react';

export interface ZodiacIconProps extends React.SVGProps<SVGSVGElement> {}

// Aries ♈
export const Aries = (props: ZodiacIconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M12 21v-8" />
    <path d="M4 8a8 8 0 0 1 16 0" />
    <path d="M12 13a3 3 0 0 1-3-3V6" />
    <path d="M12 13a3 3 0 0 0 3-3V6" />
    <circle cx="5" cy="8" r="1.5" fill="currentColor" stroke="none" />
    <circle cx="19" cy="8" r="1.5" fill="currentColor" stroke="none" />
  </svg>
);

// Taurus ♉
export const Taurus = (props: ZodiacIconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <circle cx="12" cy="15" r="5" />
    <path d="M5 8c0-3.5 3-6 7-6s7 2.5 7 6" />
    <circle cx="5" cy="8" r="1.5" fill="currentColor" stroke="none" />
    <circle cx="19" cy="8" r="1.5" fill="currentColor" stroke="none" />
  </svg>
);

// Gemini ♊
export const Gemini = (props: ZodiacIconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M6 4h12" />
    <path d="M6 20h12" />
    <path d="M9 4v16" />
    <path d="M15 4v16" />
    <circle cx="9" cy="4" r="1" fill="currentColor" stroke="none" />
    <circle cx="15" cy="4" r="1" fill="currentColor" stroke="none" />
    <circle cx="9" cy="20" r="1" fill="currentColor" stroke="none" />
    <circle cx="15" cy="20" r="1" fill="currentColor" stroke="none" />
  </svg>
);

// Cancer ♋
export const Cancer = (props: ZodiacIconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <circle cx="16" cy="8" r="3" />
    <path d="M16 5a5 5 0 0 0-8 6" />
    <circle cx="8" cy="16" r="3" />
    <path d="M8 19a5 5 0 0 0 8-6" />
  </svg>
);

// Leo ♌
export const Leo = (props: ZodiacIconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <circle cx="6" cy="8" r="3" />
    <path d="M8.5 6a4 4 0 0 1 7.5 2c0 2-4 3-4 6a3 3 0 0 0 6 0" />
    <circle cx="18" cy="14" r="1.5" fill="currentColor" stroke="none" />
  </svg>
);

// Virgo ♍
export const Virgo = (props: ZodiacIconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M4 5v11c0 2 1.5 3 3 3s3-1 3-3V9" />
    <path d="M10 5v11c0 2 1.5 3 3 3s3-1 3-3V9" />
    <path d="M16 5v8c0 3 3 4 5 1" />
    <path d="M20 16l-4 4" />
    <circle cx="4" cy="5" r="1" fill="currentColor" stroke="none" />
    <circle cx="10" cy="5" r="1" fill="currentColor" stroke="none" />
    <circle cx="16" cy="5" r="1" fill="currentColor" stroke="none" />
  </svg>
);

// Libra ♎
export const Libra = (props: ZodiacIconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M3 17h18" />
    <path d="M3 12h5l2-4 2-1 2 1 2 4h5" />
    <circle cx="12" cy="7" r="1.5" fill="currentColor" stroke="none" />
  </svg>
);

// Scorpio ♏
export const Scorpio = (props: ZodiacIconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M4 5v11c0 2 1.5 3 3 3s3-1 3-3V9" />
    <path d="M10 5v11c0 2 1.5 3 3 3s3-1 3-3V9" />
    <path d="M16 5v8c0 3 3 4 5 1" />
    <path d="M21 14l-3 3-3-3" />
    <circle cx="4" cy="5" r="1" fill="currentColor" stroke="none" />
    <circle cx="10" cy="5" r="1" fill="currentColor" stroke="none" />
    <circle cx="16" cy="5" r="1" fill="currentColor" stroke="none" />
  </svg>
);

// Sagittarius ♐
export const Sagittarius = (props: ZodiacIconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M20 4L4 20" />
    <path d="M12 4h8v8" />
    <path d="M6 14l4 4" />
    <circle cx="20" cy="4" r="1" fill="currentColor" stroke="none" />
  </svg>
);

// Capricorn ♑
export const Capricorn = (props: ZodiacIconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M4 6v9c0 2 1.5 3 3 3s3-1 3-3v-6" />
    <path d="M10 12c0-3 3-4 6-2 1.5 1 3.5 3 3.5 7s-1 6-4.5 5" />
    <path d="M19 21c-2-1-3-3-2-5" />
    <circle cx="4" cy="6" r="1" fill="currentColor" stroke="none" />
  </svg>
);

// Aquarius ♒
export const Aquarius = (props: ZodiacIconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M3 8l3-3 4 4 4-4 4 4 3-3" />
    <path d="M3 16l3-3 4 4 4-4 4 4 3-3" />
    <circle cx="6" cy="5" r="1" fill="currentColor" stroke="none" />
    <circle cx="14" cy="5" r="1" fill="currentColor" stroke="none" />
  </svg>
);

// Pisces ♓
export const Pisces = (props: ZodiacIconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M5 4c3 3 3 13 0 16" />
    <path d="M19 4c-3 3-3 13 0 16" />
    <path d="M5 12h14" />
    <circle cx="5" cy="4" r="1" fill="currentColor" stroke="none" />
    <circle cx="19" cy="4" r="1" fill="currentColor" stroke="none" />
    <circle cx="5" cy="20" r="1" fill="currentColor" stroke="none" />
    <circle cx="19" cy="20" r="1" fill="currentColor" stroke="none" />
  </svg>
);
