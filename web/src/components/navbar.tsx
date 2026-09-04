'use client';

import { useEffect, useState, useRef, type ElementType } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useTheme } from 'next-themes';
import { useLang } from '@/lib/lang-context';
import { useLayout } from '@/lib/layout-context';
import {
  Sparkles,
  Star,
  Wand2,
  Calculator,
  CalendarDays,
  ShoppingBag,
  BookOpen,
  RefreshCw,
  Sun,
  Moon,
  Zap,
  Gem,
  Users,
  Palette,
  Layout,
} from 'lucide-react';
import { tokenStore, authApi, practitionersApi } from '@/lib/api';
import { getAvatarUrl, getPractitionerAvatar } from '@/lib/utils';

import type { ComponentType } from 'react';
type MenuItem = { label: string; href: string; Icon: ComponentType<{ className?: string }> };

const MENU_SECTIONS: { title: string; items: MenuItem[] }[] = [
  {
    title: 'Consult',
    items: [
      { label: 'Consultations', href: '/login', Icon: Sparkles },
      { label: 'Horoscope', href: '/signup', Icon: Star },
    ],
  },
  {
    title: 'Free Tools',
    items: [
      { label: 'Free Services', href: '/signup', Icon: Wand2 },
      { label: 'Calculators', href: '/signup', Icon: Calculator },
      { label: 'Panchang', href: '/signup', Icon: CalendarDays },
    ],
  },
  {
    title: 'More',
    items: [
      { label: 'Shop', href: '/signup', Icon: ShoppingBag },
      { label: 'Blog', href: '/signup', Icon: BookOpen },
    ],
  },
];

const NAV_SECTIONS = [
  { id: 'find-expert', label: 'Find Expert', href: '/practitioners' },
  { id: 'free-services', label: 'Free Services', href: '#free-services' },
  { id: 'about', label: 'About', href: '#about' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('');
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [themeOpen, setThemeOpen] = useState(false);
  const [layoutOpen, setLayoutOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);
  const themeRef = useRef<HTMLDivElement>(null);
  const layoutRef = useRef<HTMLDivElement>(null);
  const { theme, setTheme } = useTheme();
  const { lang, setLang } = useLang();
  const { layout, setLayout } = useLayout();
  
  const isDark = (theme === 'dark' || theme === 'theme-lavender-night' || theme === 'theme-deep-forest' || theme === 'theme-royal-indigo' || layout === 'final-hybrid' || layout === 'new-layout-1') && theme !== 'theme-new-color';
  const isFinalHybrid = layout === 'final-hybrid' || layout.startsWith('layout-');
  
  const [userProfile, setUserProfile] = useState<{ photoUrl: string | null; role: string; id: string; name: string | null } | null>(null);

  useEffect(() => {
    const token = tokenStore.getAccess();
    if (!token) return;
    const role = localStorage.getItem('hc_role');
    if (role === 'practitioner') {
      const pid = localStorage.getItem('hc_pid');
      if (pid) {
        practitionersApi.get(pid).then((res) => {
          if (res.success && res.data) {
            setUserProfile({ photoUrl: res.data.practitioner.photoUrl, role: 'practitioner', id: pid, name: res.data.practitioner.name });
          }
        });
      }
    } else {
      authApi.me(token).then((res) => {
        if (res.success && res.data) {
          const u = (res.data as any).user;
          setUserProfile({ photoUrl: u.photoUrl, role: 'user', id: u.id, name: u.name });
        }
      });
    }
  }, []);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMounted(true);
  }, []);

  // IntersectionObserver for active section tracking
  useEffect(() => {
    const elMap = new Map<string, HTMLElement>();
    for (const { id } of NAV_SECTIONS) {
      const el = document.getElementById(id);
      if (el) elMap.set(id, el);
    }
    if (elMap.size === 0) return;

    const visibleMap = new Map<string, boolean>();
    for (const id of elMap.keys()) visibleMap.set(id, false);

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.target.id) visibleMap.set(entry.target.id, entry.isIntersecting);
        }
        // Find the bottom-most visible section
        let bottomMost = '';
        let maxBottom = -Infinity;
        for (const [id, visible] of visibleMap) {
          if (visible) {
            const rect = elMap.get(id)!.getBoundingClientRect();
            const bottom = rect.bottom;
            if (bottom > maxBottom) {
              maxBottom = bottom;
              bottomMost = id;
            }
          }
        }
        setActiveSection(bottomMost);
      },
      { threshold: 0.2 }
    );

    for (const el of elMap.values()) observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = drawerOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [drawerOpen]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node)) setLangOpen(false);
      if (themeRef.current && !themeRef.current.contains(e.target as Node)) setThemeOpen(false);
      if (layoutRef.current && !layoutRef.current.contains(e.target as Node)) setLayoutOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <>
      {/* Backdrop */}
      {drawerOpen && (
        <div className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm" onClick={() => setDrawerOpen(false)} />
      )}

      {/* Left Slide Drawer */}
      <aside className={`fixed top-0 left-0 h-full w-72 z-50 bg-white shadow-2xl flex flex-col transition-transform duration-300 ease-in-out ${drawerOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        {/* Gradient header */}
        <div className="bg-gradient-to-br from-purple-300 to-purple-400 px-5 pt-6 pb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2.5">
              <Image src={theme === 'theme-royal-indigo' ? '/center_logo_final.png' : '/center_logo_final.png'} alt="ZenAuraa" width={32} height={32} className="rounded-full border-2 border-white/40" />
              <span className="text-2xl font-serif font-black text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)] tracking-wide">Zen<span className="text-[#D5B6DC]">Auraa</span></span>
            </div>
            <button onClick={() => setDrawerOpen(false)} className="p-1.5 rounded-full bg-white/20 hover:bg-white/30 transition-colors">
              <svg className="w-4 h-4 text-[#1C0D40]" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Online count */}
          <div className="flex items-center gap-2 mb-3">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-300 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-400" />
            </span>
            <span className="text-[#1C0D40] text-xs font-semibold">1,240 astrologers online now</span>
          </div>

          {/* Avatar row */}
          <div className="flex items-center gap-1 mb-4">
            <div className="flex -space-x-2">
              {['/avatars/astrologer_1.jpg', '/avatars/astrologer_4.jpg', '/avatars/astrologer_6.jpg'].map((src, i) => (
                <div key={i} className="w-7 h-7 rounded-full border-2 border-white/60 overflow-hidden">
                  <img src={src} alt="" className="w-full h-full object-cover" />
                </div>
              ))}
              <div className="w-7 h-7 rounded-full border-2 border-white/60 bg-white/20 flex items-center justify-center">
                <span className="text-[10px] font-bold text-[#1C0D40]">+3</span>
              </div>
            </div>
            <span className="text-[#1C0D40]/70 text-[11px] ml-1">Astrologer</span>
          </div>

          {/* Sign in CTA */}
          <Link
            href="/login"
            onClick={() => setDrawerOpen(false)}
            className="block bg-white rounded-xl px-4 py-3.5 shadow-md hover:shadow-lg transition-all"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-purple-300 to-purple-400 flex items-center justify-center shrink-0">
                <svg className="w-5 h-5 text-[#1C0D40]" fill="none" stroke="currentColor" strokeWidth={1.6} viewBox="0 0 24 24">
                  <circle cx="12" cy="8" r="4" />
                  <path strokeLinecap="round" d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
                </svg>
              </div>
              <div className="flex-1">
                <p className="text-sm font-bold text-gray-900">Sign In / Sign Up</p>
                <p className="text-[11px] text-gray-700">
                  Your 1st Chat is <strong className="text-indigo-600">100% Free</strong>
                </p>
              </div>
              <svg className="w-4 h-4 text-gray-300" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </Link>
        </div>

        {/* Menu body */}
        <div className="flex-1 overflow-y-auto py-3">
          {MENU_SECTIONS.map((section, si) => (
            <div key={si} className={si > 0 ? 'mt-1' : ''}>
              <p className="px-5 pt-3 pb-1.5 text-[10px] font-bold uppercase tracking-widest text-gray-400">
                {section.title}
              </p>
              {section.items.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setDrawerOpen(false)}
                  className="flex items-center gap-3 px-4 py-2.5 mx-2 rounded-xl text-sm font-medium text-gray-700 hover:bg-purple-50 hover:text-indigo-700 transition-all group"
                >
                  <span className="w-8 h-8 rounded-lg bg-gray-50 group-hover:bg-indigo-100 flex items-center justify-center text-base transition-colors">
                    <item.Icon className="w-4 h-4 text-gray-500 group-hover:text-indigo-600" />
                  </span>
                  {item.label}
                  <svg className="w-3.5 h-3.5 text-gray-300 group-hover:text-purple-300 ml-auto transition-colors" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              ))}
              {si < MENU_SECTIONS.length - 1 && <div className="mx-5 mt-2 border-t border-gray-100" />}
            </div>
          ))}


        </div>
      </aside>

      {/* Navbar */}
      <div className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-background/95 backdrop-blur-md border-b border-border shadow-sm py-2' : 'pt-4'}`}>
        <header className={`mx-auto transition-all duration-300 flex items-center justify-between px-4 h-14 ${
          !scrolled ? 'bg-surface/80 backdrop-blur-md rounded-full border border-border shadow-sm max-w-6xl' : 'max-w-7xl px-4 sm:px-6 lg:px-8'
        }`}>
          {/* Left: hamburger + logo + links (Final Hybrid) */}
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setDrawerOpen(true)}
                className={`p-1.5 rounded-lg transition-colors ${isDark ? 'hover:bg-white/10 text-gray-300' : 'hover:bg-gray-100 text-gray-600'}`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
              <Link href="/" className="flex items-center gap-2">
                <Image src={theme === 'theme-royal-indigo' ? '/center_logo_final.png' : '/center_logo_final.png'} alt="ZenAuraa" width={30} height={30} className="rounded-full shadow-sm" unoptimized />
                <span className="text-2xl font-serif font-black text-[#1C0D40] drop-shadow-[0_2px_10px_rgba(183,154,230,0.3)] tracking-wide transition-all hover:scale-105"><span className="text-white">Zen</span><span className="text-[#D5B6DC]">Auraa</span></span>
              </Link>
            </div>

            {/* Links for Final Hybrid layout sit next to the logo */}
            {isFinalHybrid && (
              <nav className="hidden md:flex items-center gap-4 ml-4">
                <Link href="/practitioners" className="text-sm font-semibold text-[#1C0D40] hover:text-[#5F3BA9] transition-colors">
                  Find Expert
                </Link>
                <Link href="#free-services" className="text-sm font-semibold text-[#1C0D40] hover:text-[#5F3BA9] transition-colors">
                  Free Services
                </Link>
                  <div className="relative group cursor-pointer">
                  <span className="text-sm font-semibold text-[#1C0D40] group-hover:text-[#5F3BA9] transition-colors flex items-center gap-1">
                    Free Insights
                    <svg className="w-3.5 h-3.5 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                  </span>
                  <div className="absolute top-full left-0 mt-2 w-56 bg-[#7A48AB] border border-[#694091] rounded-xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50 py-2">
                    <Link href="/modalities/astrology" className="block px-4 py-2 text-sm text-[#F8F7FA] hover:bg-[#694091]/50 hover:text-[#5F3BA9]">Astrology</Link>
                    <Link href="/modalities/tarot" className="block px-4 py-2 text-sm text-[#F8F7FA] hover:bg-[#694091]/50 hover:text-[#5F3BA9]">Tarot</Link>
                    <Link href="/modalities/palm-reading" className="block px-4 py-2 text-sm text-[#F8F7FA] hover:bg-[#694091]/50 hover:text-[#5F3BA9]">Palm Reading</Link>
                    <Link href="/modalities/face-reading" className="block px-4 py-2 text-sm text-[#F8F7FA] hover:bg-[#694091]/50 hover:text-[#5F3BA9]">Face Reading</Link>
                    <Link href="/modalities/numerology" className="block px-4 py-2 text-sm text-[#F8F7FA] hover:bg-[#694091]/50 hover:text-[#5F3BA9]">Numerology</Link>
                    <Link href="/modalities/energy-healing" className="block px-4 py-2 text-sm text-[#F8F7FA] hover:bg-[#694091]/50 hover:text-[#5F3BA9]">Energy Healing</Link>
                    <Link href="/modalities/meditation" className="block px-4 py-2 text-sm text-[#F8F7FA] hover:bg-[#694091]/50 hover:text-[#5F3BA9]">Meditation</Link>
                    <Link href="/modalities/yoga" className="block px-4 py-2 text-sm text-[#F8F7FA] hover:bg-[#694091]/50 hover:text-[#5F3BA9]">Yoga &amp; Mindfulness</Link>
                    <Link href="/modalities/vastu" className="block px-4 py-2 text-sm text-[#F8F7FA] hover:bg-[#694091]/50 hover:text-[#5F3BA9]">Vastu &amp; Space Energy</Link>
                    <Link href="/modalities/eft" className="block px-4 py-2 text-sm text-[#F8F7FA] hover:bg-[#694091]/50 hover:text-[#5F3BA9]">EFT Tapping</Link>
                    <Link href="/modalities/spiritual" className="block px-4 py-2 text-sm text-[#F8F7FA] hover:bg-[#694091]/50 hover:text-[#5F3BA9]">Spiritual Guidance</Link>
                    <Link href="/modalities/sound-healing" className="block px-4 py-2 text-sm text-[#F8F7FA] hover:bg-[#694091]/50 hover:text-[#5F3BA9]">Sound Healing</Link>
                  </div>
                </div>
                <Link href="#reviews" className="text-sm font-semibold text-[#1C0D40] hover:text-[#5F3BA9] transition-colors">
                  Reviews
                </Link>
              </nav>
            )}
          </div>

          {/* Center nav (Standard) */}
          {!isFinalHybrid && (
            <nav className="hidden md:flex items-center gap-1 bg-surface backdrop-blur-md rounded-full border border-border px-1.5 py-1 shadow-sm">
              {NAV_SECTIONS.map(({ id, label, href }) => (
                <Link
                  key={id}
                  href={href}
                  className={`relative text-sm font-medium transition-all px-4 py-1.5 rounded-full flex items-center gap-1.5 ${
                    activeSection === id
                      ? 'bg-primary/10 text-primary shadow-sm'
                      : 'text-[#1C0D40]/80 hover:text-primary hover:bg-white/5'
                  }`}
                >
                  {label}
                </Link>
              ))}
            </nav>
          )}

          {/* Right: theme toggle + lang dropdown + profile */}
          <div className="flex items-center gap-2">
            {isFinalHybrid && (
              <Link href="/modalities/astrology" className="md:hidden text-[10px] sm:text-xs font-semibold text-[#1C0D40] border border-border rounded-full px-2.5 py-1 whitespace-nowrap bg-[#694091]/30">
                Free Insights
              </Link>
            )}

            {/* Layout Dropdown */}
            <div className="relative" ref={layoutRef}>
              <button
                onClick={() => setLayoutOpen((p) => !p)}
                className={`flex items-center justify-center w-8 h-8 rounded-full border text-muted-foreground transition-all ${
                  isDark ? 'border-white/20 hover:bg-white/10 hover:text-[#1C0D40]' : 'border-gray-200 hover:border-indigo-300 hover:bg-purple-50 hover:text-indigo-600'
                }`}
              >
                <Layout className="w-4 h-4" />
              </button>

              {layoutOpen && (
                <div className={`absolute right-0 mt-2 w-48 rounded-xl shadow-xl border overflow-hidden z-50 max-h-[70vh] overflow-y-auto scrollbar-hide ${isDark ? 'bg-[#1a1a1a] border-white/10' : 'bg-white border-gray-100'}`}>
                  {([
                    
                    { code: 'layout-1', label: ' Layout 1 (Pebbles)' },
                                                                                { code: 'layout-5', label: ' Layout 5 (Nebula)' },
                                                                                { code: 'layout-9', label: ' Layout 9 (Peacock)' },
                  ] as const).map((l) => (
                    <button
                      key={l.code}
                      onClick={() => { setLayout(l.code); setLayoutOpen(false); }}
                      className={`w-full flex items-center gap-2.5 px-4 py-2.5 text-[13px] transition-colors ${
                        layout === l.code
                          ? 'bg-primary/20 text-primary font-semibold'
                          : isDark ? 'text-gray-300 hover:bg-white/10' : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <Layout className="w-3.5 h-3.5 opacity-70" />
                      {l.label}
                      {layout === l.code && (
                        <svg className="w-3.5 h-3.5 ml-auto text-primary" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>

                        {/* Theme Dropdown */}
            <div className="relative" ref={themeRef}>
              <button
                onClick={() => setThemeOpen((p) => !p)}
                className={`flex items-center justify-center w-8 h-8 rounded-full border transition-all ${
                  isDark ? 'border-white/20 hover:bg-white/10 text-[#1C0D40]' : 'border-gray-200 hover:border-indigo-300 hover:bg-purple-50 text-indigo-600'
                }`}
                title="Select Theme"
              >
                <Palette className="w-4 h-4" />
              </button>

              {themeOpen && (
                <div className={`absolute right-0 mt-2 w-48 rounded-xl shadow-xl border overflow-hidden z-50 ${isDark ? 'bg-[#1a1a1a] border-white/10' : 'bg-white border-gray-100'}`}>
                  {([
                    { code: 'dark', label: ' Dark' },
                    { code: 'theme-new-color', label: ' Medium' },
                    { code: 'theme-royal-indigo', label: ' Light' },
                    { code: 'theme-zen-light', label: ' New Shade' },
                    { code: 'theme-new-shade-update', label: ' New Shade Update' },
                    { code: 'theme-zen-align', label: ' Zen Align' },
                  ] as const).map((t) => (
                    <button
                      key={t.code}
                      onClick={() => { setTheme(t.code); setThemeOpen(false); }}
                      className={`w-full flex items-center gap-2.5 px-4 py-2.5 text-[13px] transition-colors ${
                        theme === t.code
                          ? 'bg-primary/20 text-primary font-semibold'
                          : isDark ? 'text-gray-300 hover:bg-white/10' : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <Palette className="w-3.5 h-3.5 opacity-70" />
                      {t.label}
                      {theme === t.code && (
                        <svg className="w-3.5 h-3.5 ml-auto text-primary" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>
            
            {/* Language dropdown */}
            <div className="relative" ref={langRef}>
              <button
                onClick={() => setLangOpen((p) => !p)}
                className={`flex items-center gap-0.5 px-2.5 py-1.5 rounded-full border text-[13px] font-black transition-all ${
                  isDark ? 'border-white/20 hover:bg-white/10' : 'border-gray-200 hover:border-indigo-300 hover:bg-purple-50'
                }`}
              >
                <svg className="w-4 h-4 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" /></svg><span className={isDark ? "text-gray-200 ml-1" : "text-gray-700 ml-1"}>{lang.toUpperCase()}</span>
                <svg className={`w-3 h-3 ml-0.5 transition-transform ${langOpen ? 'rotate-180' : ''} ${isDark ? 'text-gray-400' : 'text-gray-500'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {langOpen && (
                <div className={`absolute right-0 mt-2 w-36 rounded-xl shadow-xl border overflow-hidden z-50 ${isDark ? 'bg-[#1a1a1a] border-white/10' : 'bg-white border-gray-100'}`}>
                  {([{ code: 'en', label: 'English', sub: 'EN' }, { code: 'hi', label: 'Hindi (हिन्दी)', sub: 'HI' }, { code: 'es', label: 'Spanish (Español)', sub: 'ES' }, { code: 'fr', label: 'French (Français)', sub: 'FR' }, { code: 'de', label: 'German (Deutsch)', sub: 'DE' }] as const).map((l) => (
                    <button
                      key={l.code}
                      onClick={() => { setLang(l.code); setLangOpen(false); }}
                      className={`w-full flex items-center gap-2.5 px-4 py-2.5 text-sm transition-colors ${
                        lang === l.code
                          ? 'bg-purple-50 text-[#d97706] font-semibold'
                          : isDark ? 'text-gray-300 hover:bg-white/10' : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <span className="font-bold text-purple-400">{l.sub}</span>
                      {l.label}
                      {lang === l.code && (
                        <svg className="w-3.5 h-3.5 ml-auto text-purple-400" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Login / Profile */}
            {userProfile ? (
              <Link href={userProfile.role === 'practitioner' ? '/expert/dashboard' : '/dashboard'}>
                <div className="w-9 h-9 rounded-full flex items-center justify-center transition-all cursor-pointer overflow-hidden border-2 border-border hover:border-primary">
                  <img
                    src={userProfile.role === 'practitioner' ? getPractitionerAvatar(userProfile.photoUrl, userProfile.id) : getAvatarUrl(userProfile.name, userProfile.photoUrl)}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </div>
              </Link>
            ) : (
              <>
                <Link href="/login" className={`hidden md:block text-sm font-bold px-4 py-1.5 rounded-full transition-colors ${isFinalHybrid ? 'text-[#2A1658] bg-[#FAD058] hover:bg-[#E5B83C]' : 'text-primary bg-[#FAD058] hover:bg-[#E5B83C]'}`}>
                  Login
                </Link>
                {isFinalHybrid && (
                  <Link href="/register" className="hidden md:block text-sm font-bold text-[#2A1658] bg-[#FAD058] hover:bg-[#E5B83C] transition-colors px-4 py-1.5 rounded-full ml-1 shadow-sm">
                    Register
                  </Link>
                )}
              </>
            )}

            {/* Primary CTA */}
            {!isFinalHybrid && (
              <Link
                href="/practitioners"
                className="bg-accent text-accent-foreground px-4 py-2 rounded-full text-sm font-medium shadow-sm hover:brightness-110 transition-all ml-2"
              >
                Book Consultation
              </Link>
            )}
          </div>
        </header>
      </div>
    </>
  );
}
