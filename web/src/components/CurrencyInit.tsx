'use client';
import { useEffect } from 'react';
import { useCurrencyStore } from '@/store/useCurrencyStore';

export function CurrencyInit() {
  const initCurrency = useCurrencyStore((state) => state.initCurrency);

  useEffect(() => {
    initCurrency();
  }, [initCurrency]);

  return null;
}
