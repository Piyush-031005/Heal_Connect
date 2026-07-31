'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

export type LayoutMode = 'mystic-wheel' | 'celestial-map' | 'sacred-geometry' | 'modern-minimal' | 'ruby-velvet' | 'zen-minimalist';

interface LayoutContextType {
  layout: LayoutMode;
  setLayout: (mode: LayoutMode) => void;
}

const LayoutContext = createContext<LayoutContextType | undefined>(undefined);

export function LayoutProvider({ children }: { children: React.ReactNode }) {
  const [layout, setLayoutState] = useState<LayoutMode>('mystic-wheel');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem('hc_layout') as LayoutMode;
    if (stored && ['mystic-wheel', 'celestial-map', 'sacred-geometry', 'modern-minimal'].includes(stored)) {
      setLayoutState(stored);
    }
  }, []);

  const setLayout = (mode: LayoutMode) => {
    setLayoutState(mode);
    localStorage.setItem('hc_layout', mode);
  };

  // Skip rendering children until mounted to prevent hydration errors? 
  // No, we want to render children immediately for SEO.
  // We just won't apply client-side layout classes on the first pass if needed, 
  // but context values can just be the default on server.
  
  return (
    <LayoutContext.Provider value={{ layout: mounted ? layout : 'mystic-wheel', setLayout }}>
      {children}
    </LayoutContext.Provider>
  );
}

export function useLayout() {
  const context = useContext(LayoutContext);
  if (context === undefined) {
    throw new Error('useLayout must be used within a LayoutProvider');
  }
  return context;
}
