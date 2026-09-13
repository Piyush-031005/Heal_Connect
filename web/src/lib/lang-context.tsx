'use client';

import { createContext, useContext, useState, ReactNode } from 'react';
import { translations, Lang, T } from './i18n';

// Maps our lang codes to Google Translate language codes
const GOOGLE_LANG_MAP: Record<string, string> = {
  en: 'en', hi: 'hi', es: 'es', fr: 'fr',
  de: 'de', ru: 'ru', it: 'it', ur: 'ur',
  pa: 'pa', gu: 'gu',
};

function triggerGoogleTranslate(langCode: string) {
  if (typeof window === 'undefined') return;

  const googleCode = GOOGLE_LANG_MAP[langCode] ?? langCode;

  // If English, restore original
  if (googleCode === 'en') {
    const iframe = document.querySelector<HTMLIFrameElement>('.goog-te-banner-frame');
    if (iframe) {
      const restoreBtn = iframe.contentDocument?.querySelector<HTMLElement>('.goog-te-banner-frame');
      restoreBtn?.click();
    }
    // Use the restore link Google injects
    const restore = document.querySelector<HTMLAnchorElement>('#\\:1\\.restore');
    restore?.click();

    // Fallback: reload with no translate cookie
    const cookie = document.cookie.match(/googtrans=([^;]+)/);
    if (cookie) {
      document.cookie = 'googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
      document.cookie = 'googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=' + location.hostname;
      window.location.reload();
    }
    return;
  }

  // Set the googtrans cookie that Google Translate reads
  const value = `/en/${googleCode}`;
  document.cookie = `googtrans=${value}; path=/`;
  document.cookie = `googtrans=${value}; path=/; domain=${location.hostname}`;

  // Try to use the existing widget's select element
  const select = document.querySelector<HTMLSelectElement>('.goog-te-combo');
  if (select) {
    select.value = googleCode;
    select.dispatchEvent(new Event('change'));
    return;
  }

  // Fallback: reload — Google Translate will pick up the cookie
  window.location.reload();
}

const LangContext = createContext<{
  lang: string;
  setLang: (l: string) => void;
  t: T;
}>({ lang: 'en', setLang: () => {}, t: translations.en });

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<string>('en');

  const setLang = (l: string) => {
    setLangState(l);
    triggerGoogleTranslate(l);
  };

  const t = (translations as Record<string, T>)[lang] ?? translations.en;

  return (
    <LangContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LangContext.Provider>
  );
}

export const useLang = () => useContext(LangContext);
