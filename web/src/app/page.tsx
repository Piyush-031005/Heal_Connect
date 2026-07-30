'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/navbar';
import ZodiacWheel from '@/components/zodiac-wheel';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useLang } from '@/lib/lang-context';
import {
  MessageCircle, Phone, Star, Users,
  Globe, Languages, Shield, Gift, ChevronDown, ChevronUp,
  Zap, Heart, Briefcase, DollarSign,
  Activity, UserCheck, ArrowRight, Download, Play, Check,
  Gem,
} from 'lucide-react';

// ─── Astrologer Data ────────────────────────────────────────────
const TOP_ASTROLOGERS = [
  { name: 'Shivani', exp: '10 yrs exp', langs: 'English, Hindi', tags: ['Top Choice', 'Tarot', 'Vedic', 'Numerology'], rating: 5.0, orders: '10k+', price: 130, online: true, img: '/avatars/astrologer_1.jpg' },
  { name: 'Aman', exp: '6 yrs exp', langs: 'English, Hindi', tags: ['Celebrity', 'Tarot'], rating: 5.0, orders: '10k+', price: 41, online: true, img: '/avatars/astrologer_2.jpg' },
{ name: 'Tanuj', exp: '24 yrs exp', langs: 'Hindi, Sanskrit, English', tags: ['Celebrity', 'Vedic', 'Numerology', 'Vastu'], rating: 5.0, orders: '10k+', price: 84, online: true, img: '/avatars/astrologer_4.jpg' },
];

const CATEGORIES = [
  { name: 'Love', count: '4,280+', icon: Heart, color: 'text-rose-500', bg: 'bg-rose-500/10' },
  { name: 'Marriage & Kundli', count: '6,120+', icon: Gem, color: 'text-purple-500', bg: 'bg-purple-500/10' },
  { name: 'Career', count: '5,840+', icon: Briefcase, color: 'text-blue-500', bg: 'bg-blue-500/10' },
  { name: 'Women astrologers', count: '9,210+', icon: UserCheck, color: 'text-pink-500', bg: 'bg-pink-500/10' },
  { name: 'Business & Money', count: '3,760+', icon: DollarSign, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
  { name: 'Health & Family', count: '2,480+', icon: Activity, color: 'text-teal-500', bg: 'bg-teal-500/10' },
];

const ZODIAC_SIGNS = [
  { name: 'Aries', alt: 'Mesh', emoji: '♈' },
  { name: 'Taurus', alt: 'Vrishabh', emoji: '♉' },
  { name: 'Gemini', alt: 'Mithun', emoji: '♊' },
  { name: 'Cancer', alt: 'Kark', emoji: '♋' },
  { name: 'Leo', alt: 'Singh', emoji: '♌' },
  { name: 'Virgo', alt: 'Kanya', emoji: '♍' },
  { name: 'Libra', alt: 'Tula', emoji: '♎' },
  { name: 'Scorpio', alt: 'Vrishchik', emoji: '♏' },
  { name: 'Sagittarius', alt: 'Dhanu', emoji: '♐' },
  { name: 'Capricorn', alt: 'Makar', emoji: '♑' },
  { name: 'Aquarius', alt: 'Kumbh', emoji: '♒' },
  { name: 'Pisces', alt: 'Meen', emoji: '♓' },
];

const TESTIMONIALS = [
  { name: 'Amar Thakur', loc: 'Pune · India', text: 'This app helped me to get a job in my dream company. I was stressed about not getting a career opportunity after my graduation. One prediction from an astrologer gave me a ray of hope and within a few months, I had a job offer in hand. Thank you so much HealConnect for helping me out.' },
  { name: 'Sneha Patel', loc: 'Mumbai · India', text: 'I was going through a tough phase in my marriage. The tarot reading session gave me clarity and helped me understand my partner better. Highly recommend!' },
  { name: 'Rahul Verma', loc: 'Delhi · India', text: 'The Kundli matching feature helped me find the perfect match for my son. The astrologers were very detailed and professional in their analysis.' },
  { name: 'Priya Sharma', loc: 'Bangalore · India', text: 'My career horoscope reading was spot on. I got the guidance I needed to make a major career transition. The astrologer understood my situation perfectly and gave me actionable advice.' },
];

// ─── Dynamic Horoscope Data ─────────────────────────────────────
const HOROSCOPE_DATA: Record<number, { text: string; mood: string; luckyNum: number; color: string; colorClass: string; love: number; career: number; health: number; money: number; dateRange: string }> = {
  0: { text: "Aries, today the stars align to boost your confidence. Take the lead on projects that matter to you. Your natural charisma will attract positive attention from those around you.", mood: "Energetic", luckyNum: 7, color: "Red", colorClass: "bg-red-400", love: 75, career: 85, health: 70, money: 80, dateRange: "Mar 21 – Apr 19" },
  1: { text: "Taurus, patience will be your greatest ally today. Financial matters require careful attention. A stable approach to relationships will bring lasting rewards.", mood: "Calm", luckyNum: 3, color: "Green", colorClass: "bg-green-400", love: 80, career: 70, health: 85, money: 75, dateRange: "Apr 20 – May 20" },
  2: { text: "Gemini, your communication skills are at their peak. Share your ideas freely and network with new people. A short trip could bring unexpected opportunities.", mood: "Curious", luckyNum: 5, color: "Yellow", colorClass: "bg-yellow-400", love: 70, career: 80, health: 75, money: 85, dateRange: "May 21 – Jun 20" },
  3: { text: "Cancer, focus on home and family today. Your emotional intuition is sharp — trust it. A creative project will bring you joy and a sense of accomplishment.", mood: "Nurturing", luckyNum: 2, color: "Silver", colorClass: "bg-gray-300", love: 85, career: 65, health: 80, money: 70, dateRange: "Jun 21 – Jul 22" },
  4: { text: "Leo, the spotlight is on you! Your natural leadership will inspire others. Take calculated risks in your career. Romance blossoms when you're confident.", mood: "Bold", luckyNum: 1, color: "Gold", colorClass: "bg-amber-400", love: 90, career: 85, health: 75, money: 80, dateRange: "Jul 23 – Aug 22" },
  5: { text: "Virgo, organization is key today. Your attention to detail will solve a complex problem. Health routines started now will have long-term benefits.", mood: "Focused", luckyNum: 6, color: "Navy", colorClass: "bg-blue-800", love: 65, career: 90, health: 85, money: 75, dateRange: "Aug 23 – Sep 22" },
  6: { text: "Libra, don't take on more than you can manage. Attempting to make everyone happy could exhaust you emotionally. You may need a healthy break due to work-related stress, and a little sleep could be really beneficial. A setback could make you doubt your luck, but don't give up. Recognize other people's emotions to prevent needless confrontation.", mood: "Nervous", luckyNum: 2, color: "Pink", colorClass: "bg-pink-400", love: 80, career: 65, health: 70, money: 75, dateRange: "Sep 23 – Oct 22" },
  7: { text: "Scorpio, intense emotions surface today. Channel them into productive work or deep conversations. A financial opportunity from an unexpected source appears.", mood: "Intense", luckyNum: 9, color: "Burgundy", colorClass: "bg-red-700", love: 85, career: 75, health: 70, money: 85, dateRange: "Oct 23 – Nov 21" },
  8: { text: "Sagittarius, adventure calls! Explore new ideas and places. Your optimism is contagious and will attract helpful people. Higher education or travel is favored.", mood: "Adventurous", luckyNum: 4, color: "Purple", colorClass: "bg-purple-400", love: 75, career: 80, health: 85, money: 70, dateRange: "Nov 22 – Dec 21" },
  9: { text: "Capricorn, discipline brings rewards today. Focus on long-term goals rather than instant gratification. A mentor figure could offer valuable guidance.", mood: "Determined", luckyNum: 8, color: "Brown", colorClass: "bg-amber-700", love: 70, career: 90, health: 75, money: 85, dateRange: "Dec 22 – Jan 19" },
  10: { text: "Aquarius, your innovative ideas are ahead of their time. Share them anyway. Social causes and group activities bring fulfillment. A friendship deepens unexpectedly.", mood: "Visionary", luckyNum: 11, color: "Cyan", colorClass: "bg-cyan-400", love: 75, career: 80, health: 70, money: 80, dateRange: "Jan 20 – Feb 18" },
  11: { text: "Pisces, your creativity flows freely today. Artistic pursuits and spiritual practices bring peace. Be careful with boundaries as your empathy may overwhelm you.", mood: "Dreamy", luckyNum: 12, color: "Lavender", colorClass: "bg-purple-300", love: 85, career: 70, health: 80, money: 65, dateRange: "Feb 19 – Mar 20" },
};

// Highly professional animated StarField for background
const StarField = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 opacity-40">
    {[...Array(30)].map((_, i) => (
      <div 
        key={i} 
        className="absolute rounded-full bg-primary animate-pulse" 
        style={{
          top: `${Math.random() * 100}%`,
          left: `${Math.random() * 100}%`,
          width: `${Math.random() * 3 + 1}px`,
          height: `${Math.random() * 3 + 1}px`,
          animationDelay: `${Math.random() * 5}s`,
          animationDuration: `${Math.random() * 3 + 2}s`,
          boxShadow: '0 0 10px rgba(214,180,107,0.8)'
        }}
      />
    ))}
  </div>
);

export default function LandingPage() {
  const { t } = useLang();
  const router = useRouter();
  const [activeZodiac, setActiveZodiac] = useState(6); // Libra default
  const [horoscopeTab, setHoroscopeTab] = useState<'today' | 'tomorrow' | 'week' | 'month'>('today');
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [testimonialIdx, setTestimonialIdx] = useState(0);
  // Scroll-triggered section visibility (reserved for future animations)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [inViewSections, setInViewSections] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setInViewSections((prev) => ({ ...prev, [entry.target.id]: true }));
          }
        });
      },
      { threshold: 0.2 }
    );
    const sections = document.querySelectorAll('[data-animate]');
    sections.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [setInViewSections]);

  // Auto-scroll testimonials
  useEffect(() => {
    const timer = setInterval(() => setTestimonialIdx((i) => (i + 1) % TESTIMONIALS.length), 5000);
    return () => clearInterval(timer);
  }, []);

  const selected = ZODIAC_SIGNS[activeZodiac];

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col font-sans">
      <Navbar />

      <main className="flex-1">

        {/* ═══ HERO ═══ */}
        <section className="relative overflow-hidden pt-28 pb-16 lg:pt-40 lg:pb-32 bg-background min-h-[90vh] flex items-center">
          <StarField />
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-accent/10 rounded-full blur-3xl pointer-events-none" />

          {/* Majestic overflowing background wheel */}
          <div className="absolute top-1/2 -translate-y-1/2 right-[-50%] md:right-[-30%] lg:right-[-15%] opacity-30 lg:opacity-100 pointer-events-none lg:pointer-events-auto">
            <ZodiacWheel />
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl">
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-heading font-extrabold tracking-tight leading-tight mb-8 animate-in slide-in-from-left duration-1000">
                <span className="text-foreground drop-shadow-md">Guidance.</span><br />
                <span className="text-foreground drop-shadow-md">Clarity.</span><br />
                <span className="bg-gradient-to-r from-primary via-amber-200 to-primary bg-clip-text text-transparent drop-shadow-lg">Confidence.</span>
              </h1>
              
              <p className="text-xl lg:text-2xl text-foreground/80 mb-10 max-w-xl animate-in slide-in-from-left duration-1000 delay-150 font-light">
                Find trusted guidance for every stage of life. Connect with verified experts instantly.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-10 animate-in slide-in-from-left duration-1000 delay-300">
                <Link href="/practitioners">
                  <Button size="lg" className="bg-gradient-to-r from-primary to-amber-500 hover:from-amber-500 hover:to-amber-600 text-[#0B1020] px-10 h-14 text-lg rounded-full font-bold shadow-[0_0_30px_rgba(214,180,107,0.3)] group border-none transition-all">
                    Book Consultation <ArrowRight className="w-5 h-5 ml-2 inline group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ═══ TRUST LAYER ═══ */}
        <section className="relative z-20 py-8 border-y border-border bg-card/50">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap justify-center lg:justify-between items-center gap-6">
              {[
                { label: 'Rating', value: '4.9 ★', icon: Star },
                { label: 'Consultations', value: '100k+', icon: MessageCircle },
                { label: 'Verified Experts', value: '500+', icon: Shield },
                { label: 'Availability', value: '24x7', icon: Globe },
              ].map((stat, idx) => (
                <div key={idx} className="flex flex-col items-center lg:items-start">
                  <div className="flex items-center gap-2 mb-1">
                    <stat.icon className="w-5 h-5 text-primary" />
                    <span className="text-2xl font-bold text-foreground">{stat.value}</span>
                  </div>
                  <span className="text-sm text-muted-foreground font-medium uppercase tracking-wider">{stat.label}</span>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap justify-center gap-3 lg:gap-6">
              {['Verified Experts', 'Secure Payments', 'Private Consultations', 'Encrypted Chat', 'Transparent Pricing'].map((badge, idx) => (
                <Badge key={idx} variant="outline" className="bg-background border-border text-foreground py-1.5 px-4 rounded-full text-xs font-semibold">
                  <Check className="w-3 h-3 mr-2 text-success" />
                  {badge}
                </Badge>
              ))}
            </div>
          </div>
        </section>

{/* ═══ SERVICE CARDS ═══ */}
        <section className="py-12 -mt-8 relative z-20">
          <div className="container mx-auto px-4">
            {/* Top decorative line */}
            <div className="w-full border-t border-amber-200/60 mb-3" />

            {/* ═══ LIVE ACTIVITY MARQUEE (Right to Left) ═══ */}
            <div className="relative overflow-hidden mb-6">
              <div className="flex whitespace-nowrap animate-marquee gap-4">
                {/* First set */}
                <div className="flex items-center gap-4 mx-2">
                  <div className="inline-flex items-center gap-2.5 text-sm text-muted-foreground">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 shrink-0" />
                    <span><strong>Priya from Mumbai</strong> {t.marqueeItems[0]}</span>
                    <span className="text-muted-foreground/60 text-xs">· 2 min ago</span>
                  </div>
                  <span className="text-muted-foreground">|</span>
                  <div className="inline-flex items-center gap-2.5 text-sm text-muted-foreground">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 shrink-0" />
                    <span><strong>Rahul from Mumbai</strong> {t.marqueeItems[1]}</span>
                    <span className="text-muted-foreground/60 text-xs">· just now</span>
                  </div>
                  <span className="text-muted-foreground">|</span>
                  <div className="inline-flex items-center gap-2.5 text-sm text-muted-foreground">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 shrink-0" />
                    <span><strong>Neha from Hyderabad</strong> {t.marqueeItems[2]}</span>
                    <span className="text-muted-foreground/60 text-xs">· 5 min ago</span>
                  </div>
                </div>
                {/* Duplicate */}
                <div className="flex items-center gap-4 mx-2">
                  <div className="inline-flex items-center gap-2.5 text-sm text-muted-foreground">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 shrink-0" />
                    <span><strong>Priya from Mumbai</strong> {t.marqueeItems[0]}</span>
                    <span className="text-muted-foreground/60 text-xs">· 2 min ago</span>
                  </div>
                  <span className="text-muted-foreground">|</span>
                  <div className="inline-flex items-center gap-2.5 text-sm text-muted-foreground">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 shrink-0" />
                    <span><strong>Rahul from Mumbai</strong> {t.marqueeItems[1]}</span>
                    <span className="text-muted-foreground/60 text-xs">· just now</span>
                  </div>
                  <span className="text-muted-foreground">|</span>
                  <div className="inline-flex items-center gap-2.5 text-sm text-muted-foreground">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 shrink-0" />
                    <span><strong>Neha from Hyderabad</strong> {t.marqueeItems[2]}</span>
                    <span className="text-muted-foreground/60 text-xs">· 5 min ago</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { icon: MessageCircle, title: t.serviceCards[0].title, desc: t.serviceCards[0].desc, color: 'text-amber-400', bg: 'bg-amber-400/10' },
                { icon: Phone, title: t.serviceCards[1].title, desc: t.serviceCards[1].desc, color: 'text-orange-400', bg: 'bg-orange-400/10' },
                { icon: Star, title: t.serviceCards[2].title, desc: t.serviceCards[2].desc, color: 'text-purple-400', bg: 'bg-purple-400/10' },
                { icon: Gift, title: t.serviceCards[3].title, desc: t.serviceCards[3].desc, color: 'text-green-400', bg: 'bg-green-400/10' },
              ].map((s) => (
                <Link key={s.title} href="/signup" className="group">
                  <div className={`flex flex-col p-5 bg-secondary backdrop-blur-xl border border-border hover:bg-white/10 hover:border-primary/40 hover:shadow-[0_0_20px_rgba(214,180,107,0.15)] transition-all duration-500 group-hover:-translate-y-1 rounded-2xl overflow-hidden`}>
                    <div className={`w-12 h-12 rounded-2xl ${s.bg} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                      <s.icon className={`w-6 h-6 ${s.color}`} />
                    </div>
                    <h3 className="font-bold text-foreground text-sm mb-1">{s.title}</h3>
                    <p className="text-xs text-muted-foreground">{s.desc}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>





        {/* ═══ TOP ASTROLOGERS ═══ */}
        <section className="pb-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {TOP_ASTROLOGERS.map((a) => (
                <div key={a.name} className="bg-secondary backdrop-blur-xl border border-border shadow-[0_0_15px_rgba(0,0,0,0.2)] hover:bg-white/10 hover:border-primary/40 hover:shadow-[0_0_30px_rgba(214,180,107,0.15)] hover:-translate-y-1 transition-all duration-500 rounded-3xl overflow-hidden group">
                  <div className="p-6">
                    {/* Top: image circle left + badge + name right */}
                    <div className="flex gap-4 mb-4">
                      <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-primary/20 shrink-0">
                        <img src={a.img} alt={a.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                        {a.online && (
                          <span className="absolute bottom-0 right-0 w-4 h-4 bg-success border-2 border-surface rounded-full shadow-sm" />
                        )}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-start justify-between gap-2">
                          <h3 className="font-bold text-foreground text-lg">{a.name}</h3>
                          <div className="flex items-center gap-1 shrink-0">
                            {a.tags.includes('Top Choice') && (
                              <Badge className="bg-primary text-primary-foreground border-0 text-[10px] px-2 py-0.5 rounded-full">{t.topChoice}</Badge>
                            )}
                            {a.tags.includes('Celebrity') && (
                              <Badge className="bg-purple-500 text-foreground border-0 text-[10px] px-2 py-0.5 rounded-full">{t.celebrity}</Badge>
                            )}
                          </div>
                        </div>
                        <p className="text-xs text-muted-foreground mt-0.5">Exp: {a.exp}</p>
                        <p className="text-xs text-muted-foreground mt-0.5 truncate">{a.langs}</p>
                      </div>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {a.tags.filter(tag => tag !== 'Top Choice' && tag !== 'Celebrity').map((tag) => (
                        <span key={tag} className="text-[10px] bg-primary/10 text-primary px-2.5 py-0.5 rounded-md font-medium border border-primary/20">{tag}</span>
                      ))}
                    </div>

                    {/* Rating + Details */}
                    <div className="flex items-center justify-between text-sm mb-4 px-3 py-2 bg-white/20 dark:bg-black/20 rounded-xl border border-border">
                      <div className="flex items-center gap-1.5">
                        <Star className="w-4 h-4 text-primary fill-current" />
                        <span className="font-bold text-foreground">{a.rating}</span>
                        <span className="text-xs text-muted-foreground">({a.orders})</span>
                      </div>
                      <div className="w-px h-4 bg-border" />
                      <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-medium">
                        <MessageCircle className="w-3.5 h-3.5" />
                        ~2 min
                      </div>
                    </div>

                    {/* Online + Price */}
                    <div className="flex items-center justify-between mb-4 px-2">
                      <span className="flex items-center gap-1.5 text-[11px] text-success font-medium">
                        <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" /> {t.online}
                      </span>
                      <div className="flex items-center gap-1">
                        <span className="text-sm font-extrabold text-foreground">₹{a.price}</span>
                        <span className="text-[10px] text-muted-foreground">{t.perMinAstro}</span>
                      </div>
                    </div>

                    {/* Buttons */}
                    <div className="flex gap-3">
                      <Link href="/login" className="flex-1">
                        <Button className="w-full h-10 text-sm rounded-xl bg-accent hover:bg-accent/90 text-accent-foreground font-semibold shadow-sm transition-all">
                          {t.chatBtn}
                        </Button>
                      </Link>
                      <Link href="/login" className="flex-1">
                        <Button variant="outline" className="w-full h-10 text-sm rounded-xl border-primary text-primary hover:bg-primary/10 font-semibold transition-all">
                          {t.callBtn}
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

{/* ═══ BROWSE BY CATEGORY ═══ */}
        <section className="py-12 bg-card/20">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-sm font-bold text-amber-700 uppercase tracking-wider">{t.browseTitle}</h2>
                <p className="text-foreground text-3xl font-extrabold mt-1">
                  {t.browseSubtitle} <span className="text-amber-700">{t.browseSubtitleEm}</span>, {t.browseSubtitleFor} <span className="text-amber-700">{t.browseSubtitleYou}</span>
                </p>
              </div>
              <Link href="/signup">
                <Button variant="link" className="text-amber-600 font-semibold text-sm">
                  {t.browseViewAll} <ArrowRight className="w-4 h-4 ml-1 inline" />
                </Button>
              </Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
              {CATEGORIES.map((cat, idx) => {
                const catData = t.categories[idx] || { name: cat.name, count: cat.count };
                return (
                <Link key={cat.name} href="/signup" className="group">
                  <div className="flex items-center gap-4 p-5 rounded-2xl bg-secondary backdrop-blur-lg border border-border shadow-[0_0_15px_rgba(0,0,0,0.2)] hover:bg-white/10 hover:border-primary/40 hover:shadow-[0_0_20px_rgba(214,180,107,0.15)] transition-all group-hover:-translate-y-1 duration-500">
                    <div className={`w-12 h-12 rounded-xl ${cat.bg} ${cat.color} flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform`}>
                      <cat.icon className="w-6 h-6" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-foreground text-base truncate">{catData.name}</h3>
                      <p className="text-sm text-muted-foreground/60 truncate">{catData.count} {t.browseSubtitleEm === 'astrologer' ? 'astrologers' : 'ज्योतिषी'}</p>
                    </div>
                    <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-amber-500 transition-colors shrink-0" />
                  </div>
                </Link>
                );
              })}
            </div>
          </div>
        </section>

{/* ═══ OUR SERVICES ═══ */}
        <section id="features" className="py-12 bg-background" data-animate>
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-6">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-amber-700 mb-1">{t.servicesTitle}</p>
                <h2 className="text-3xl font-extrabold">
                  <span className="text-foreground">{t.servicesHeading}</span> <span className="text-amber-700">{t.servicesHeadingEm}</span>
                </h2>
              </div>
              <Link href="/signup">
                <Button variant="link" className="text-amber-600 font-semibold text-sm">
                  {t.servicesViewAll} <ArrowRight className="w-4 h-4 ml-1 inline" />
                </Button>
              </Link>
            </div>
            <div className="grid grid-cols-5 gap-4 max-w-5xl mx-auto">
              {t.servicesList.slice(0, 10).map((svc: { name: string; desc: string }, idx: number) => (
                <Link key={idx} href="/signup" className="group">
                  <div className="flex flex-col items-center text-center p-4 rounded-2xl bg-secondary backdrop-blur-lg border border-border shadow-[0_0_10px_rgba(0,0,0,0.2)] hover:bg-white/10 hover:border-primary/40 hover:shadow-[0_0_15px_rgba(214,180,107,0.15)] transition-all group-hover:-translate-y-1 duration-500">
                    <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                      <Zap className="w-5 h-5 text-amber-600" />
                    </div>
                    <p className="font-semibold text-foreground text-sm leading-tight">{svc.name}</p>
                    <p className="text-xs text-muted-foreground mt-0.5 leading-tight">{svc.desc}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

{/* ═══ DAILY HOROSCOPE ═══ */}
        <section className="py-16 bg-black/10 border-y border-border relative">
          <div className="container mx-auto px-4">
            {/* Header: left aligned */}
            <div className="mb-6">
              <p className="text-sm font-semibold text-amber-700 mb-1">{t.horoscopeLabel}</p>
              <div className="text-left">
                <p className="text-3xl md:text-4xl font-extrabold leading-tight">
                  <span className="text-foreground">{t.horoscopeTitle}</span>{' '}
                  <span className="text-amber-700">{t.horoscopeTitleEm}</span>{' '}
                  <span className="text-foreground">{t.horoscopeTitleRest}</span>
                </p>
                <p className="text-muted-foreground text-sm mt-1">{t.horoscopePick}</p>
              </div>
            </div>

            {/* Tabs: right aligned */}
            <div className="flex justify-end mb-8">
              <div className="flex items-center gap-1 bg-white/40 dark:bg-black/40 border border-border rounded-full p-1 shadow-inner">
                {t.horoscopeTabs.map((tab: string, idx: number) => (
                  <button
                    key={idx}
                    onClick={() => {
                      const tabs = ['today', 'tomorrow', 'week', 'month'];
                      if (idx === 0) setHoroscopeTab('today');
                      else router.push('/signup');
                    }}
                    className={`px-6 py-2 rounded-full text-sm font-semibold transition-all capitalize ${
                      horoscopeTab === ['today', 'tomorrow', 'week', 'month'][idx] ? 'bg-amber-100 text-amber-800 shadow-sm' : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            {/* Zodiac Signs: single line auto-scroll right to left */}
            <div className="relative overflow-hidden mb-10">
              <div className="flex whitespace-nowrap animate-marquee gap-3">
                {/* First set */}
                <div className="flex items-center gap-3">
                  {ZODIAC_SIGNS.map((z) => (
                    <button
                      key={z.name}
                      onClick={() => setActiveZodiac(ZODIAC_SIGNS.indexOf(z))}
                      className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-center transition-all border ${
                        activeZodiac === ZODIAC_SIGNS.indexOf(z)
                          ? 'bg-amber-100 text-amber-800 border-amber-300 shadow-sm'
                          : 'bg-background text-muted-foreground border-border/50 hover:bg-amber-50 hover:border-amber-200 hover:shadow-sm'
                      }`}
                    >
                      <span className="text-base">{z.emoji}</span>
                      <span className="text-xs font-bold">{z.name}</span>
                      <span className="text-[10px] text-muted-foreground/60">{z.alt}</span>
                    </button>
                  ))}
                </div>
                {/* Duplicate */}
                <div className="flex items-center gap-3">
                  {ZODIAC_SIGNS.map((z) => (
                    <button
                      key={z.name}
                      onClick={() => setActiveZodiac(ZODIAC_SIGNS.indexOf(z))}
                      className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-center transition-all border ${
                        activeZodiac === ZODIAC_SIGNS.indexOf(z)
                          ? 'bg-amber-100 text-amber-800 border-amber-300 shadow-sm'
                          : 'bg-background text-muted-foreground border-border/50 hover:bg-amber-50 hover:border-amber-200 hover:shadow-sm'
                      }`}
                    >
                      <span className="text-base">{z.emoji}</span>
                      <span className="text-xs font-bold">{z.name}</span>
                      <span className="text-[10px] text-muted-foreground/60">{z.alt}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Selected Reading */}
            {selected && (() => {
              const hData = HOROSCOPE_DATA[activeZodiac];
              const areas = [
                { label: t.horoscopeAreaLabels[0], value: hData.love, color: 'bg-rose-400', textColor: 'text-rose-600' },
                { label: t.horoscopeAreaLabels[1], value: hData.career, color: 'bg-blue-400', textColor: 'text-blue-600' },
                { label: t.horoscopeAreaLabels[2], value: hData.health, color: 'bg-green-400', textColor: 'text-green-600' },
                { label: t.horoscopeAreaLabels[3], value: hData.money, color: 'bg-amber-400', textColor: 'text-amber-600' },
              ];
              return (
              <div className="max-w-5xl mx-auto bg-secondary backdrop-blur-2xl rounded-3xl border border-border shadow-[0_0_40px_rgba(0,0,0,0.5)] p-6 md:p-8">
                {/* Top: emoji + name + divider */}
                <div className="flex items-center gap-4 mb-4">
                  <div className="text-5xl">{selected.emoji}</div>
                  <div>
                    <h3 className="text-2xl font-extrabold text-foreground">{selected.name}</h3>
                    <p className="text-sm text-muted-foreground">{selected.alt} · {hData.dateRange}</p>
                    <p className="text-xs text-amber-600 font-medium mt-1">{t.horoscopeTodayDate} · 24 Jul 2026</p>
                  </div>
                </div>
                <div className="border-t border-border/50 mb-6" />

                {/* Content: left text + right bar chart */}
                <div className="flex flex-col lg:flex-row gap-8">
                  {/* Left: text + mood/lucky/color */}
                  <div className="flex-1">
                    <p className="text-muted-foreground leading-relaxed text-sm mb-6">{hData.text}</p>
                    <div className="space-y-2 text-sm">
                      <div><span className="text-muted-foreground/60">{t.horoscopeMoodLabel} </span><span className="font-medium">{hData.mood}</span></div>
                      <div><span className="text-muted-foreground/60">{t.horoscopeLuckyLabel} </span><span className="font-medium text-amber-600">{hData.luckyNum}</span></div>
                      <div className="flex items-center gap-2"><span className="text-muted-foreground/60">{t.horoscopeColorLabel} </span><span className={`w-5 h-5 rounded-full ${hData.colorClass} inline-block border`} /></div>
                    </div>
                  </div>
                  {/* Right: bar chart */}
                  <div className="lg:w-72 space-y-3">
                    {areas.map(({ label, value, color, textColor }) => (
                      <div key={label} className="bg-secondary rounded-xl px-4 py-3 flex items-center justify-between border border-border">
                        <span className="text-sm text-foreground/80 font-medium">{label}</span>
                        <div className="flex items-center gap-2">
                          <div className="w-20 h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div className={`h-full ${color} rounded-full`} style={{ width: `${value}%` }} />
                          </div>
                          <span className={`text-xs font-semibold ${textColor}`}>{value >= 80 ? t.horoscopeLevels.strong : value >= 60 ? t.horoscopeLevels.good : t.horoscopeLevels.fair}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Buttons */}
                <div className="flex items-center gap-3 mt-8 pt-6 border-t border-border">
                  <Link href="/signup">
                    <Button className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-foreground rounded-xl border-0 text-sm font-semibold px-6 h-11 shadow-sm shadow-amber-500/30">
                      {t.horoscopeDetailBtn}
                    </Button>
                  </Link>
                  <Link href="/practitioners">
                    <Button className="bg-emerald-50 text-emerald-700 hover:bg-emerald-100 rounded-xl border border-emerald-200 text-sm font-semibold px-6 h-11 shadow-sm">
                      {t.horoscopeSpecialistBtn}
                    </Button>
                  </Link>
                </div>
              </div>
              );
            })()}
          </div>
        </section>

        {/* ═══ TESTIMONIALS / EXPERTS ═══ */}
        <section id="experts" className="py-16 bg-background" data-animate>
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row gap-10 lg:gap-16">
              {/* Left: Testimonial heading + rating + description */}
              <div className="lg:w-80 shrink-0 text-left">
                <p className="text-xs font-bold uppercase tracking-widest text-amber-700 mb-1">{t.testimonialBadge}</p>
                <h2 className="text-3xl md:text-4xl font-extrabold text-foreground leading-tight mb-6">
                  {t.testimonialTitle}
                </h2>

                <div className="flex items-center gap-2 mb-2">
                  <Star className="w-6 h-6 fill-amber-400 text-amber-400" />
                  <span className="text-3xl font-extrabold text-foreground">4.8</span>
                </div>
                <p className="text-sm font-semibold text-muted-foreground mb-1">{t.testimonialRating}</p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {t.testimonialSubtext}
                </p>
              </div>

              {/* Right: Testimonial card with navigation */}
              <div className="flex-1 max-w-2xl">
                <div className="relative">
                  <div className="overflow-hidden rounded-3xl border border-border bg-secondary backdrop-blur-xl shadow-2xl relative">
                    <div
                      className="flex transition-transform duration-500 ease-in-out"
                      style={{ transform: `translateX(-${testimonialIdx * 100}%)` }}
                    >
                      {TESTIMONIALS.map((testimonial, i) => (
                        <div key={i} className="w-full shrink-0 px-8 py-8">
                          <p className="text-muted-foreground leading-relaxed text-sm mb-6 italic">
                            &ldquo;{testimonial.text}&rdquo;
                          </p>
                          <div className="border-t border-border/50 my-4" />
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 to-orange-400 flex items-center justify-center text-foreground font-bold text-sm shrink-0">
                              {testimonial.name.charAt(0)}
                            </div>
                            <div>
                              <p className="font-bold text-foreground text-sm">{testimonial.name}</p>
                              <p className="text-xs text-muted-foreground">{testimonial.loc}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Navigation: counter + arrows below the card */}
                  <div className="flex items-center justify-between mt-5">
                    <span className="text-sm text-muted-foreground font-medium">
                      {testimonialIdx + 1} / {TESTIMONIALS.length}
                    </span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setTestimonialIdx((i) => (i - 1 + TESTIMONIALS.length) % TESTIMONIALS.length)}
                        className="w-9 h-9 rounded-full bg-background border border-border hover:border-amber-300 hover:bg-amber-50 flex items-center justify-center transition-all shadow-sm"
                        aria-label="Previous"
                      >
                        <svg className="w-4 h-4 text-muted-foreground" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
                          <path d="M15 18l-6-6 6-6" />
                        </svg>
                      </button>
                      <button
                        onClick={() => setTestimonialIdx((i) => (i + 1) % TESTIMONIALS.length)}
                        className="w-9 h-9 rounded-full bg-background border border-border hover:border-amber-300 hover:bg-amber-50 flex items-center justify-center transition-all shadow-sm"
                        aria-label="Next"
                      >
                        <svg className="w-4 h-4 text-muted-foreground" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
                          <path d="M9 18l6-6-6-6" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

{/* ═══ PRICING ═══ */}
        <section id="pricing" className="py-16 bg-background" data-animate>
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-extrabold text-foreground mb-3">{t.pricingHeading}</h2>
            <p className="text-muted-foreground text-sm mb-10 max-w-xl mx-auto">{t.pricingSubtext}</p>
            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {(t.pricingPlans as unknown as Array<{name: string; price: string; popular: boolean; features: string[]}>).map((plan) => (
                <div key={plan.name} className={`p-6 rounded-2xl border transition-all ${plan.popular ? 'bg-amber-50 border-amber-400 shadow-lg -translate-y-2' : 'bg-background border-border/50 hover:border-amber-200 hover:shadow-md'}`}>
                  {plan.popular && <Badge className="bg-amber-500 text-foreground border-0 mb-3">{t.mostPopular}</Badge>}
                  <h3 className="font-bold text-foreground text-lg">{plan.name}</h3>
                  <p className="text-3xl font-extrabold text-amber-600 my-3">{plan.price}</p>
                  <ul className="space-y-2 mb-6 text-left">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Check className="w-4 h-4 text-amber-500" /> {f}
                      </li>
                    ))}
                  </ul>
                  <Link href="/signup">
                    <Button className={`w-full rounded-full border-0 font-semibold ${plan.popular ? 'bg-amber-500 hover:bg-amber-600 text-foreground' : 'bg-gray-100 hover:bg-gray-200 text-muted-foreground'}`}>
                      {t.pricingGetStarted}
                    </Button>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ APP DOWNLOAD ═══ */}
        <section className="py-16 bg-gradient-to-br from-amber-400 via-amber-500 to-yellow-500">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center gap-10">
<div className="flex-1">
<p className="text-xs font-bold uppercase tracking-widest text-amber-800 mb-2">{t.appBadge}</p>
                <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mb-4 leading-tight">
                  {t.appTitle} <span className="text-yellow-200">{t.appTitleEm}</span>.
                </h2>
                <p className="text-foreground/90 mb-8 max-w-lg leading-relaxed">
                  {t.appDesc}
                </p>
                <ul className="space-y-3 mb-8">
                  {t.appFeatures.map((feature: string) => (
                    <li key={feature} className="flex items-center gap-3 text-foreground text-sm">
                      <Check className="w-5 h-5 text-foreground shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <div className="flex flex-wrap gap-4">
                  <Button className="bg-background text-amber-700 hover:bg-yellow-50 rounded-xl px-6 h-12 font-semibold flex items-center gap-2">
                    <Download className="w-5 h-5" /> {t.appStore}
                  </Button>
                  <Button className="bg-background text-amber-700 hover:bg-yellow-50 rounded-xl px-6 h-12 font-semibold flex items-center gap-2">
                    <Play className="w-5 h-5" /> {t.googlePlay}
                  </Button>
                </div>
              </div>
              <div className="flex-1 flex items-center justify-center">
                <div className="w-80 min-h-[540px] bg-background rounded-3xl border border-border shadow-2xl overflow-hidden flex flex-col">
                  {/* Status bar */}
                  <div className="px-4 pt-3 pb-1 flex items-center justify-between text-[10px] text-muted-foreground shrink-0">
                    <span>9:41</span>
                    <div className="flex items-center gap-1">
                      <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
                        <path d="M1 9l4 4-4 4" /><path d="M7 5l4 8-4 8" /><path d="M13 1l4 12-4 12" /><path d="M19 5l4 8-4 8" />
                      </svg>
                      <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M1 9l2 2c4.97-4.97 13.03-4.97 18 0l2-2C16.93 2.93 7.08 2.93 1 9zm8 8l3 3 3-3c-1.65-1.66-4.34-1.66-6 0zm-4-4l2 2c2.76-2.76 7.24-2.76 10 0l2-2C15.14 9.14 8.87 9.14 5 13z" />
                      </svg>
                      <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor">
                        <rect x="2" y="2" width="20" height="20" rx="2" />
                      </svg>
                    </div>
                  </div>

                  {/* Chat header */}
                  <div className="px-3 py-2.5 flex items-center gap-2 border-b border-border/50 shrink-0">
                    <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center shrink-0 overflow-hidden">
                      <img src="/avatars/astrologer_1.jpg" alt="" className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-foreground text-xs font-bold truncate">{t.phoneMockup.name}</p>
                      <p className="text-green-500 text-[10px]">{t.phoneMockup.status}</p>
                    </div>
                    <button className="w-7 h-7 rounded-full bg-card/20 hover:bg-gray-100 flex items-center justify-center">
                      <svg className="w-3.5 h-3.5 text-muted-foreground" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                      </svg>
                    </button>
                    <button className="w-7 h-7 rounded-full bg-card/20 hover:bg-gray-100 flex items-center justify-center">
                      <svg className="w-3.5 h-3.5 text-muted-foreground" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                        <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
                        <path d="M12 18h.01" />
                      </svg>
                    </button>
                  </div>

                  {/* Chat messages - flex-1 fills remaining space, pushing input to bottom */}
                  <div className="p-3 space-y-2 flex-1 flex flex-col justify-end min-h-0">
                    {/* Received message */}
                    <div className="flex items-start gap-2 max-w-[80%]">
                      <div className="w-5 h-5 rounded-full bg-amber-100 shrink-0 overflow-hidden">
                        <img src="/avatars/astrologer_1.jpg" alt="" className="w-full h-full object-cover" />
                      </div>
                      <div className="bg-gray-100 rounded-2xl rounded-tl-sm px-3 py-2">
                        <p className="text-muted-foreground text-[11px] leading-relaxed">{t.phoneMockup.receivedMsg}</p>
                        <p className="text-muted-foreground/60 text-[9px] mt-1 text-right">9:41 AM</p>
                      </div>
                    </div>

                    {/* Sent message */}
                    <div className="flex justify-end max-w-[80%] self-end">
                      <div className="bg-gradient-to-r from-amber-400 to-orange-400 rounded-2xl rounded-tr-sm px-3 py-2">
                        <p className="text-foreground text-[11px] leading-relaxed">{t.phoneMockup.sentMsg}</p>
                        <p className="text-foreground/60 text-[9px] mt-1 text-right">9:42 AM ✓</p>
                      </div>
                    </div>

                    {/* Typing animation */}
                    <div className="flex items-start gap-2 max-w-[80%]">
                      <div className="w-5 h-5 rounded-full bg-amber-100 shrink-0 overflow-hidden">
                        <img src="/avatars/astrologer_1.jpg" alt="" className="w-full h-full object-cover" />
                      </div>
                      <div className="bg-gray-100 rounded-2xl rounded-tl-sm px-3 py-2.5">
                        <div className="flex gap-1">
                          <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                          <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                          <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Input bar - stuck to bottom */}
                  <div className="px-3 py-2 border-t border-border/50 flex items-center gap-2 shrink-0">
                    <button className="w-7 h-7 rounded-full bg-card/20 hover:bg-gray-100 flex items-center justify-center shrink-0">
                      <svg className="w-3.5 h-3.5 text-muted-foreground/60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                      </svg>
                    </button>
                    <div className="flex-1 bg-card/20 rounded-full px-3 py-1.5 text-[11px] text-muted-foreground/60">
                      {t.phoneMockup.placeholder}
                    </div>
                    <button className="w-7 h-7 rounded-full bg-gradient-to-r from-amber-400 to-orange-400 hover:from-amber-500 hover:to-orange-500 flex items-center justify-center shrink-0 shadow-lg shadow-amber-500/30">
                      <svg className="w-3.5 h-3.5 text-foreground" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══ UNDERSTAND ASTROLOGY ═══ */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4 max-w-5xl">
            <p className="text-xs font-bold uppercase tracking-widest text-amber-700 mb-2">{t.astrologyLabel}</p>
            <h2 className="text-3xl font-extrabold text-foreground mb-8 text-left">
              {t.astrologyTitle} <span className="text-amber-700">{t.astrologyTitleEm}</span> {t.astrologyTitleRest}
            </h2>
            <div className="bg-background border border-amber-100 rounded-2xl p-8 shadow-sm">
              <p className="leading-relaxed text-sm text-muted-foreground mb-4">
                {t.astrologyPara1}
              </p>
              <p className="leading-relaxed text-sm text-muted-foreground">
                {t.astrologyPara2}
              </p>
            </div>
          </div>
        </section>

        {/* ═══ FAQ ═══ */}
        <section className="py-16 bg-card/20">
          <div className="container mx-auto px-4 max-w-5xl">
            <div className="flex flex-col lg:flex-row gap-10">
              {/* Left: Titles */}
              <div className="lg:w-72 shrink-0 text-left">
                <p className="text-xs font-bold uppercase tracking-widest text-amber-700 mb-2">{t.faqLabel}</p>
                <h2 className="text-3xl md:text-4xl font-extrabold text-foreground leading-tight">
                  {t.faqTitle}<br />
                  <span className="text-amber-700">{t.faqTitleEm}</span> {t.faqTitleRest}
                </h2>
              </div>
              {/* Right: FAQ list */}
              <div className="flex-1 space-y-3">
                {t.faqs.map((faq: { q: string; a: string }, i: number) => (
                  <div key={i} className="bg-background rounded-2xl border border-border/50 overflow-hidden hover:border-amber-100 transition-all">
                    <button
                      onClick={() => setOpenFaq(openFaq === i ? null : i)}
                      className="w-full flex items-center justify-between p-5 text-left"
                    >
                      <span className="font-semibold text-foreground text-sm">{faq.q}</span>
                      {openFaq === i ? (
                        <ChevronUp className="w-4 h-4 text-amber-500 shrink-0 ml-2" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-muted-foreground/60 shrink-0 ml-2" />
                      )}
                    </button>
                    {openFaq === i && (
                      <div className="px-5 pb-5">
                        <p className="text-sm text-muted-foreground leading-relaxed">{faq.a}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ═══ FOOTER ═══ */}
        <footer className="bg-gradient-to-b from-amber-50 to-yellow-50 text-muted-foreground pt-12 pb-6 border-t border-amber-100">
          <div className="container mx-auto px-4">
            {/* Top: Brand + Links */}
            <div className="flex flex-wrap gap-8 mb-10">
              {/* Brand */}
              <div className="w-full lg:w-72">
                <div className="flex items-center gap-2 mb-4">
                  <Image src="/logo.png" alt="HealConnect" width={28} height={28} className="rounded-full" />
                  <span className="text-lg font-extrabold text-amber-600">HealConnect</span>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed mb-4">
                  {t.footerBrandDesc}
                </p>
                <div className="flex gap-2">
                  <button className="w-9 h-9 rounded-xl bg-amber-200/60 hover:bg-amber-300/60 flex items-center justify-center transition-colors">
                    <Download className="w-4 h-4 text-amber-600" />
                  </button>
                  <button className="w-9 h-9 rounded-xl bg-amber-200/60 hover:bg-amber-300/60 flex items-center justify-center transition-colors">
                    <Play className="w-4 h-4 text-amber-600" />
                  </button>
                </div>
              </div>

              {/* Links columns - all in one line */}
              <div className="flex-1 grid grid-cols-2 sm:grid-cols-4 gap-6">
                {(t.footerColumns as unknown as Array<{title: string; links: string[]}>).map((col) => (
                  <div key={col.title}>
                    <h4 className="text-amber-800 font-bold text-sm mb-3">{col.title}</h4>
                    <ul className="space-y-1.5">
                      {col.links.map((link) => (
                        <li key={link}>
                          <Link href={link.toLowerCase().includes('chat') || link.toLowerCase().includes('talk') || link.toLowerCase().includes('horoscope') || link.toLowerCase().includes('kundli') || link.toLowerCase().includes('calculator') ? '/signup' : '#'} className="text-xs text-muted-foreground hover:text-amber-600 transition-colors">{link}</Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom bar - centered */}
            <div className="border-t border-amber-200 pt-6 text-center text-xs text-muted-foreground">
              <p>{t.footerCopyright}</p>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}

