'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

export type LayoutMode = string;

interface LayoutContextType {
  layout: LayoutMode;
  setLayout: (mode: LayoutMode) => void;
}

const LayoutContext = createContext<LayoutContextType | undefined>(undefined);

export function LayoutProvider({ children }: { children: React.ReactNode }) {
  const [layout, setLayoutState] = useState<LayoutMode>('primary');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem('hc_layout') as LayoutMode;
    if (stored) {
      setLayoutState(stored);
    }
  }, []);

  const setLayout = (mode: LayoutMode) => {
    setLayoutState(mode);
    localStorage.setItem('hc_layout', mode);
  };

  return (
    <LayoutContext.Provider value={{ layout: mounted ? layout : 'primary', setLayout }}>
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
