'use client';

import { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { Search, Star, MessageCircle, Phone, SlidersHorizontal, X, Shield, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Navbar from '@/components/navbar';
import { getPractitionerAvatar } from '@/lib/utils';

interface Practitioner {
  id: string;
  name: string;
  bio: string | null;
  specialties: string[];
  languages: string[];
  certifications: string[];
  experienceYrs: number;
  perMinuteRate: number;
  photoUrl: string | null;
  isVerified: boolean;
  isOnline: boolean;
  avgRating: number;
  reviewCount: number;
}

interface Filters {
  search: string;
  specialty: string;
  language: string;
  minRating: string;
  maxRate: string;
  onlineOnly: boolean;
}

const SPECIALTIES = ['Vedic Astrology', 'Tarot', 'Reiki', 'Vastu', 'Numerology', 'Palmistry', 'Energy Healing'];
const LANGUAGES = ['English', 'Hindi', 'Tamil', 'Telugu', 'Kannada', 'Bengali', 'Marathi'];
const API_URL = process.env.NEXT_PUBLIC_API_URL || '';

const SELECT_CLS = 'w-full text-sm rounded-xl bg-white/40 dark:bg-black/40 border border-border px-4 py-2.5 text-foreground focus:outline-none focus:ring-1 focus:ring-primary transition-all hover:bg-secondary';

export default function PractitionersPage() {
  const [practitioners, setPractitioners] = useState<Practitioner[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<Filters>({ search: '', specialty: '', language: '', minRating: '', maxRate: '', onlineOnly: false });

  const fetchPractitioners = useCallback(async (f: Filters, p: number) => {
    setLoading(true);
    try {
      const params = new URLSearchParams({ page: String(p), limit: '12' });
      if (f.search) params.set('search', f.search);
      if (f.specialty) params.set('specialty', f.specialty);
      if (f.language) params.set('language', f.language);
      if (f.minRating) params.set('minRating', f.minRating);
      if (f.maxRate) params.set('maxRate', f.maxRate);
      if (f.onlineOnly) params.set('onlineOnly', 'true');
      const res = await fetch(`${API_URL}/api/practitioners?${params}`);
      const data = await res.json() as { success: boolean; data: { practitioners: Practitioner[]; pagination: { total: number } } };
      if (data.success) {
        setPractitioners(p === 1 ? data.data.practitioners : (prev) => [...prev, ...data.data.practitioners]);
        setTotal(data.data.pagination.total);
      }
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  }, []);

  useEffect(() => { setPage(1); fetchPractitioners(filters, 1); }, [filters, fetchPractitioners]);

  const activeFilterCount = [filters.specialty, filters.language, filters.minRating, filters.maxRate].filter(Boolean).length + (filters.onlineOnly ? 1 : 0);

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col font-sans relative overflow-hidden">
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none fixed">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(214,180,107,0.1)_0%,rgba(0,0,0,0)_70%)] blur-[120px]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(46,196,182,0.1)_0%,rgba(0,0,0,0)_70%)] blur-[120px]" />
      </div>

      <Navbar />

      <main className="flex-1 container mx-auto px-4 pt-24 pb-12 relative z-10">
        <div className="mb-10 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-extrabold text-foreground mb-2 tracking-tight">Find Your Healer</h1>
          <p className="text-muted-foreground text-lg">{total} verified practitioners available</p>
        </div>

        {/* Search + Filter Bar */}
        <div className="flex gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-3.5 h-5 w-5 text-muted-foreground" />
            <input type="text" placeholder="Search by name or specialty..." value={filters.search} onChange={(e) => setFilters((f) => ({ ...f, search: e.target.value }))} className="w-full pl-12 pr-4 py-3 text-base rounded-2xl bg-white/40 dark:bg-black/40 border border-border focus:outline-none focus:ring-1 focus:ring-primary text-foreground placeholder:text-muted-foreground transition-all backdrop-blur-sm" />
          </div>
          <Button variant="outline" onClick={() => setShowFilters((v) => !v)} className={`rounded-2xl px-6 gap-2 border-border hover:bg-secondary hover:border-border text-foreground h-[50px] transition-all backdrop-blur-sm ${showFilters ? 'bg-secondary border-border' : 'bg-white/40 dark:bg-black/40'}`}>
            <SlidersHorizontal className="h-4 w-4" />
            <span className="hidden sm:inline">Filters</span>
            {activeFilterCount > 0 && <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center shadow-[0_0_10px_rgba(214,180,107,0.3)]">{activeFilterCount}</span>}
          </Button>
        </div>

        {/* Filter Panel */}
        {showFilters && (
          <div className="mb-8 p-6 rounded-3xl bg-[#121420]/80 backdrop-blur-xl border border-border shadow-[0_8px_30px_rgba(0,0,0,0.5)] grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-primary mb-2 block">Specialty</label>
              <select value={filters.specialty} onChange={(e) => setFilters((f) => ({ ...f, specialty: e.target.value }))} className={SELECT_CLS}>
                <option value="" className="bg-[#121420]">All</option>
                {SPECIALTIES.map((s) => <option key={s} value={s} className="bg-[#121420]">{s}</option>)}
              </select>
            </div>
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-primary mb-2 block">Language</label>
              <select value={filters.language} onChange={(e) => setFilters((f) => ({ ...f, language: e.target.value }))} className={SELECT_CLS}>
                <option value="" className="bg-[#121420]">All</option>
                {LANGUAGES.map((l) => <option key={l} value={l} className="bg-[#121420]">{l}</option>)}
              </select>
            </div>
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-primary mb-2 block">Min Rating</label>
              <select value={filters.minRating} onChange={(e) => setFilters((f) => ({ ...f, minRating: e.target.value }))} className={SELECT_CLS}>
                <option value="" className="bg-[#121420]">Any</option>
                {['3', '3.5', '4', '4.5'].map((r) => <option key={r} value={r} className="bg-[#121420]">⭐ {r}+</option>)}
              </select>
            </div>
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-primary mb-2 block">Max ₹/min</label>
              <input type="number" min={0} placeholder="e.g. 50" value={filters.maxRate} onChange={(e) => setFilters((f) => ({ ...f, maxRate: e.target.value }))} className={SELECT_CLS} />
            </div>
            <div className="flex flex-col justify-end gap-3">
              <label className="flex items-center gap-3 cursor-pointer p-2 rounded-xl hover:bg-secondary transition-colors">
                <div className="relative flex items-center justify-center">
                  <input type="checkbox" checked={filters.onlineOnly} onChange={(e) => setFilters((f) => ({ ...f, onlineOnly: e.target.checked }))} className="w-5 h-5 appearance-none border border-border rounded-md checked:bg-accent checked:border-accent transition-colors cursor-pointer" />
                  {filters.onlineOnly && <svg className="absolute w-3 h-3 text-primary-foreground pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>}
                </div>
                <span className="text-sm font-medium text-foreground">Online Now</span>
              </label>
              {activeFilterCount > 0 && (
                <button onClick={() => setFilters({ search: filters.search, specialty: '', language: '', minRating: '', maxRate: '', onlineOnly: false })} className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-red-400 transition-colors px-2">
                  <X className="h-3.5 w-3.5" /> Clear filters
                </button>
              )}
            </div>
          </div>
        )}

        {/* Active filter chips */}
        {activeFilterCount > 0 && (
          <div className="flex flex-wrap gap-3 mb-8">
            {filters.specialty && <Badge variant="outline" className="border-primary/30 text-primary bg-primary/10 gap-1.5 py-1 px-3 rounded-full">{filters.specialty}<button onClick={() => setFilters((f) => ({ ...f, specialty: '' }))} className="hover:bg-white/20 dark:bg-black/20 rounded-full p-0.5 transition-colors"><X className="h-3 w-3" /></button></Badge>}
            {filters.language && <Badge variant="outline" className="border-primary/30 text-primary bg-primary/10 gap-1.5 py-1 px-3 rounded-full">{filters.language}<button onClick={() => setFilters((f) => ({ ...f, language: '' }))} className="hover:bg-white/20 dark:bg-black/20 rounded-full p-0.5 transition-colors"><X className="h-3 w-3" /></button></Badge>}
            {filters.minRating && <Badge variant="outline" className="border-primary/30 text-primary bg-primary/10 gap-1.5 py-1 px-3 rounded-full">⭐ {filters.minRating}+<button onClick={() => setFilters((f) => ({ ...f, minRating: '' }))} className="hover:bg-white/20 dark:bg-black/20 rounded-full p-0.5 transition-colors"><X className="h-3 w-3" /></button></Badge>}
            {filters.maxRate && <Badge variant="outline" className="border-primary/30 text-primary bg-primary/10 gap-1.5 py-1 px-3 rounded-full">≤ ₹{filters.maxRate}/min<button onClick={() => setFilters((f) => ({ ...f, maxRate: '' }))} className="hover:bg-white/20 dark:bg-black/20 rounded-full p-0.5 transition-colors"><X className="h-3 w-3" /></button></Badge>}
            {filters.onlineOnly && <Badge variant="outline" className="border-accent/30 text-accent bg-accent/10 gap-1.5 py-1 px-3 rounded-full shadow-[0_0_10px_rgba(46,196,182,0.1)]">Online Now<button onClick={() => setFilters((f) => ({ ...f, onlineOnly: false }))} className="hover:bg-white/20 dark:bg-black/20 rounded-full p-0.5 transition-colors"><X className="h-3 w-3" /></button></Badge>}
          </div>
        )}

        {/* Grid */}
        {loading && practitioners.length === 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => <div key={i} className="h-[340px] rounded-3xl bg-secondary border border-border animate-pulse" />)}
          </div>
        ) : practitioners.length === 0 ? (
          <div className="text-center py-32 bg-white/40 dark:bg-black/40 rounded-3xl border border-border backdrop-blur-md">
            <Image src="/logo.png" alt="" width={64} height={64} className="mx-auto mb-6 opacity-30 rounded-full grayscale" />
            <p className="text-xl font-bold text-foreground mb-2">No practitioners found</p>
            <p className="text-muted-foreground">Try adjusting your filters or search terms</p>
          </div>
        ) : (
          <>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 items-stretch">
              {practitioners.map((p) => <PractitionerCard key={p.id} practitioner={p} />)}
            </div>
            {practitioners.length < total && (
              <div className="text-center mt-12">
                <Button variant="outline" onClick={() => { const next = page + 1; setPage(next); fetchPractitioners(filters, next); }} disabled={loading} className="rounded-xl px-10 h-12 border-border text-foreground hover:bg-white/10 hover:border-border transition-all font-bold">
                  {loading ? 'Loading...' : 'Load more experts'}
                </Button>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}

function PractitionerCard({ practitioner: p }: { practitioner: Practitioner }) {
  const router = useRouter();
  const avatarSrc = getPractitionerAvatar(p.photoUrl, p.id);

  return (
    <Card onClick={() => router.push(`/practitioners/${p.id}`)} className="bg-white/40 dark:bg-black/40 backdrop-blur-xl border border-border hover:border-primary/50 hover:shadow-[0_8px_30px_rgba(214,180,107,0.15)] transition-all duration-300 cursor-pointer rounded-2xl overflow-hidden group h-full flex flex-col hover:-translate-y-1">
      <CardContent className="p-0 flex flex-col h-full relative">
        {/* Top strip with avatar */}
        <div className="relative h-20 bg-gradient-to-r from-white/5 to-white/10 shrink-0">
          <div className="absolute -bottom-8 left-6 z-10">
            <img src={avatarSrc} alt={p.name} className="w-16 h-16 rounded-2xl object-cover shadow-[0_4px_15px_rgba(0,0,0,0.5)] border-2 border-[#121420] transition-transform duration-300 group-hover:scale-105" />
          </div>
          <div className="absolute top-4 right-4 z-10">
            <span className={`inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full ${
              p.isOnline ? 'bg-accent/20 text-accent border border-accent/30 shadow-[0_0_10px_rgba(46,196,182,0.2)]' : 'bg-gray-800 text-muted-foreground border border-gray-700'
            }`}>
              <span className={`w-1.5 h-1.5 rounded-full ${p.isOnline ? 'bg-accent animate-pulse' : 'bg-gray-500'}`} />
              {p.isOnline ? 'Online' : 'Offline'}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="pt-10 px-6 pb-6 flex flex-col flex-1 relative z-0">
          <div className="flex items-start justify-between mb-1">
            <div>
              <p className="font-bold text-foreground text-lg tracking-wide group-hover:text-primary transition-colors">{p.name}</p>
              <p className="text-sm text-primary font-medium">{p.specialties.slice(0, 2).join(' · ') || '—'}</p>
            </div>
            {p.isVerified && (
              <div className="flex items-center gap-1 bg-primary/10 border border-primary/30 rounded-lg px-2 py-1 shrink-0 mt-1 shadow-[0_0_10px_rgba(214,180,107,0.1)]">
                <Shield className="w-3 h-3 text-primary" />
                <span className="text-[10px] font-bold text-primary uppercase tracking-wider">Verified</span>
              </div>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-3 mt-3 mb-4">
            <div className="flex items-center gap-1 px-2 py-1 bg-secondary rounded-lg border border-border">
              <Star className="w-3.5 h-3.5 text-primary fill-current" />
              <span className="text-sm font-bold text-foreground">{p.avgRating || '—'}</span>
              <span className="text-xs text-muted-foreground">({p.reviewCount})</span>
            </div>
            <span className="text-gray-700">|</span>
            <span className="text-xs text-muted-foreground font-medium">{p.experienceYrs} yrs exp</span>
            <span className="text-gray-700 hidden sm:inline">|</span>
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground bg-secondary px-2 py-1 rounded-lg border border-border">
              <Globe className="w-3 h-3 text-muted-foreground" />
              <span className="truncate max-w-[80px]">{p.languages.slice(0, 2).join(', ') || '—'}</span>
            </div>
          </div>

          {/* Bio */}
          <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed flex-1 mb-5">
            {p.bio || ''}
          </p>

          <div className="flex items-center justify-between pt-4 mt-auto border-t border-border">
            <div>
              <span className="text-xl font-bold text-foreground">₹{p.perMinuteRate}</span>
              <span className="text-xs text-muted-foreground ml-1">/min</span>
            </div>
            <div className="flex gap-2">
              <Button size="sm" variant="outline" className="h-9 rounded-xl px-4 border-border hover:border-primary hover:text-primary hover:bg-primary/10 text-xs font-semibold text-muted-foreground transition-all" onClick={(e) => { e.stopPropagation(); router.push('/login'); }}>
                <MessageCircle className="h-4 w-4 mr-1.5" /> Chat
              </Button>
              <Button size="sm" disabled={!p.isOnline} className="h-9 rounded-xl px-4 bg-accent hover:bg-accent/90 text-primary-foreground border-0 text-xs font-bold transition-all disabled:opacity-30 disabled:hover:bg-accent" onClick={(e) => { e.stopPropagation(); router.push('/login'); }}>
                <Phone className="h-4 w-4 mr-1.5" /> Call
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
