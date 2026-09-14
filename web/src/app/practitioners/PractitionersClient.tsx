'use client';

import { useEffect, useState, useCallback, useRef } from 'react';
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
  isBusy?: boolean;
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

const SELECT_CLS = 'w-full text-sm rounded-lg bg-yellow-50 border border-yellow-200 px-3 py-2 text-[#2d1b69] focus:outline-none focus:ring-2 focus:ring-[#4f46e5]/40';

export default function PractitionersPage() {
  const router = useRouter();
  const [practitioners, setPractitioners] = useState<Practitioner[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<Filters>({ search: '', specialty: '', language: '', minRating: '', maxRate: '', onlineOnly: false });
  const [suggestions, setSuggestions] = useState<Practitioner[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchBoxRef = useRef<HTMLDivElement>(null);

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchBoxRef.current && !searchBoxRef.current.contains(e.target as Node)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Debounced search autocomplete
  useEffect(() => {
    const query = filters.search.trim();
    if (query.length < 1) {
      setSuggestions([]);
      return;
    }
    const timer = setTimeout(() => {
      fetch(`${API_URL}/api/practitioners?search=${encodeURIComponent(query)}&limit=6`)
        .then((r) => r.json())
        .then((data) => {
          if (data.success && data.data?.practitioners) {
            setSuggestions(data.data.practitioners);
            setShowSuggestions(true);
          }
        })
        .catch(console.error);
    }, 300);
    return () => clearTimeout(timer);
  }, [filters.search]);

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
    <div className="min-h-screen flex flex-col font-sans" style={{background:"linear-gradient(145deg, #F5F0FF 0%, #EDE9FE 20%, #DDD6FE 45%, #C4B5FD 70%, #A5B4FC 100%)"}}>
      <div style={{position:"absolute",top:"-10%",left:"-5%",width:"40%",height:"40%",borderRadius:"50%",background:"radial-gradient(circle, rgba(167,139,250,0.35) 0%, transparent 70%)",filter:"blur(80px)",pointerEvents:"none"}} />
      <div style={{position:"absolute",bottom:"-10%",right:"-5%",width:"50%",height:"50%",borderRadius:"50%",background:"radial-gradient(circle, rgba(129,140,248,0.3) 0%, transparent 70%)",filter:"blur(100px)",pointerEvents:"none"}} />
      <Navbar />

      <main className="flex-1 container mx-auto px-4 pt-24 pb-8">
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold text-[#2d1b69] mb-1">Find Your Healer</h1>
          <p className="text-[#6d28d9]/70">{total} verified practitioners available</p>
        </div>

        {/* Search + Filter Bar */}
        <div className="flex gap-3 mb-6">
          <div className="relative flex-1" ref={searchBoxRef}>
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-purple-400" />
            <input
              type="text"
              placeholder="Search by name or specialty..."
              value={filters.search}
              onChange={(e) => setFilters((f) => ({ ...f, search: e.target.value }))}
              onFocus={() => { if (suggestions.length > 0) setShowSuggestions(true); }}
              onKeyDown={(e) => { if (e.key === 'Escape') setShowSuggestions(false); }}
              className="w-full pl-9 pr-4 py-2 text-sm rounded-full bg-yellow-50 border border-yellow-200 focus:outline-none focus:ring-2 focus:ring-[#4f46e5]/40 text-[#2d1b69] placeholder:text-purple-400"
            />

            {/* Autocomplete dropdown */}
            {showSuggestions && filters.search.trim().length >= 1 && suggestions.length > 0 && (
              <div className="absolute left-0 right-0 mt-2 bg-white/80 backdrop-blur-sm border border-yellow-100 rounded-2xl shadow-xl overflow-hidden z-50">
                {suggestions.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => { setShowSuggestions(false); router.push(`/practitioners/${p.id}`); }}
                    className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-indigo-50 transition-colors text-left border-b border-purple-50 last:border-b-0"
                  >
                    <img src={getPractitionerAvatar(p.photoUrl, p.name)} alt={p.name} className="w-8 h-8 rounded-full object-cover shrink-0" />
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-semibold text-[#2d1b69] truncate">{p.name}</p>
                      <p className="text-xs text-[#6d28d9]/70 truncate">{p.specialties.slice(0, 2).join(' · ') || '—'}</p>
                    </div>
                    {p.isOnline && <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />}
                  </button>
                ))}
              </div>
            )}
          </div>
          <Button variant="outline" onClick={() => setShowFilters((v) => !v)} className="rounded-full gap-2 border-yellow-200 hover:bg-yellow-50 text-[#2d1b69]">
            <SlidersHorizontal className="h-4 w-4" />
            Filters
            {activeFilterCount > 0 && <span className="w-5 h-5 rounded-full bg-[#4f46e5] text-white text-xs flex items-center justify-center">{activeFilterCount}</span>}
          </Button>
        </div>

        {/* Filter Panel */}
        {showFilters && (
          <div className="mb-6 p-5 rounded-2xl bg-white/80 backdrop-blur-sm border border-yellow-100 shadow-sm grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            <div>
              <label className="text-xs text-[#6d28d9]/70 mb-1 block">Specialty</label>
              <select value={filters.specialty} onChange={(e) => setFilters((f) => ({ ...f, specialty: e.target.value }))} className={SELECT_CLS}>
                <option value="">All</option>
                {SPECIALTIES.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <label className="text-xs text-[#6d28d9]/70 mb-1 block">Language</label>
              <select value={filters.language} onChange={(e) => setFilters((f) => ({ ...f, language: e.target.value }))} className={SELECT_CLS}>
                <option value="">All</option>
                {LANGUAGES.map((l) => <option key={l} value={l}>{l}</option>)}
              </select>
            </div>
            <div>
              <label className="text-xs text-[#6d28d9]/70 mb-1 block">Min Rating</label>
              <select value={filters.minRating} onChange={(e) => setFilters((f) => ({ ...f, minRating: e.target.value }))} className={SELECT_CLS}>
                <option value="">Any</option>
                {['3', '3.5', '4', '4.5'].map((r) => <option key={r} value={r}>⭐ {r}+</option>)}
              </select>
            </div>
            <div>
              <label className="text-xs text-[#6d28d9]/70 mb-1 block">Max <span style={{fontFamily:"Roboto,Arial,sans-serif"}}>&#x20B9;</span>/min</label>
              <input type="number" min={0} placeholder="e.g. 50" value={filters.maxRate} onChange={(e) => setFilters((f) => ({ ...f, maxRate: e.target.value }))} className={SELECT_CLS} />
            </div>
            <div className="flex flex-col justify-end gap-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={filters.onlineOnly} onChange={(e) => setFilters((f) => ({ ...f, onlineOnly: e.target.checked }))} className="w-4 h-4 accent-[#4f46e5]" />
                <span className="text-sm text-[#2d1b69]">Online Now</span>
              </label>
              {activeFilterCount > 0 && (
                <button onClick={() => setFilters({ search: filters.search, specialty: '', language: '', minRating: '', maxRate: '', onlineOnly: false })} className="flex items-center gap-1 text-xs text-purple-400 hover:text-red-500 transition-colors">
                  <X className="h-3 w-3" /> Clear filters
                </button>
              )}
            </div>
          </div>
        )}

        {/* Active filter chips */}
        {activeFilterCount > 0 && (
          <div className="flex flex-wrap gap-2 mb-5">
            {filters.specialty && <Badge variant="outline" className="border-yellow-300 text-[#4338ca] bg-yellow-50 gap-1">{filters.specialty}<button onClick={() => setFilters((f) => ({ ...f, specialty: '' }))}><X className="h-3 w-3" /></button></Badge>}
            {filters.language && <Badge variant="outline" className="border-yellow-300 text-[#4338ca] bg-yellow-50 gap-1">{filters.language}<button onClick={() => setFilters((f) => ({ ...f, language: '' }))}><X className="h-3 w-3" /></button></Badge>}
            {filters.minRating && <Badge variant="outline" className="border-yellow-300 text-[#4338ca] bg-yellow-50 gap-1">⭐ {filters.minRating}+<button onClick={() => setFilters((f) => ({ ...f, minRating: '' }))}><X className="h-3 w-3" /></button></Badge>}
            {filters.maxRate && <Badge variant="outline" className="border-yellow-300 text-[#4338ca] bg-yellow-50 gap-1"><span style={{fontFamily:"Roboto,Arial,sans-serif"}}>&#x2264; &#x20B9;</span>{filters.maxRate}/min<button onClick={() => setFilters((f) => ({ ...f, maxRate: '' }))}><X className="h-3 w-3" /></button></Badge>}
            {filters.onlineOnly && <Badge variant="outline" className="border-emerald-300 text-emerald-600 bg-emerald-50 gap-1">Online Now<button onClick={() => setFilters((f) => ({ ...f, onlineOnly: false }))}><X className="h-3 w-3" /></button></Badge>}
          </div>
        )}

        {/* Grid */}
        {loading && practitioners.length === 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Array.from({ length: 6 }).map((_, i) => <div key={i} className="h-52 rounded-2xl bg-yellow-50 animate-pulse" />)}
          </div>
        ) : practitioners.length === 0 ? (
          <div className="text-center py-20 text-purple-400">
            <Image src="/logo.png" alt="" width={40} height={40} className="mx-auto mb-3 opacity-30 rounded-full" />
            <p className="text-lg font-medium">No practitioners found</p>
            <p className="text-sm mt-1">Try adjusting your filters</p>
          </div>
        ) : (
          <>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 items-stretch">
              {practitioners.map((p) => <PractitionerCard key={p.id} practitioner={p} />)}
            </div>
            {practitioners.length < total && (
              <div className="text-center mt-8">
                <Button variant="outline" onClick={() => { const next = page + 1; setPage(next); fetchPractitioners(filters, next); }} disabled={loading} className="rounded-full px-8 border-yellow-300 text-[#4338ca] hover:bg-yellow-50">
                  {loading ? 'Loading...' : 'Load more'}
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
  const avatarSrc = getPractitionerAvatar(p.photoUrl, p.name);

  return (
    <Card onClick={() => router.push(`/practitioners/${p.id}`)} className="bg-white/80 backdrop-blur-sm border border-purple-100 hover:border-indigo-200 hover:shadow-lg transition-all cursor-pointer rounded-2xl overflow-hidden group h-full">
      <CardContent className="p-0 flex flex-col h-full">
        {/* Top strip with avatar */}
        <div className="relative h-16 bg-gradient-to-r from-indigo-50 to-purple-50 shrink-0">
          <div className="absolute -bottom-7 left-5">
            <img src={avatarSrc} alt={p.name} className="w-14 h-14 rounded-xl object-cover shadow-md border-2 border-white" />
          </div>
          <div className="absolute top-3 right-4">
            <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full ${
              p.isBusy ? 'bg-purple-100 text-purple-700' : 
              p.isOnline ? 'bg-emerald-100 text-emerald-700' : 'bg-purple-50 text-[#6d28d9]/70'
            }`}>
              <span className={`w-1.5 h-1.5 rounded-full ${
                p.isBusy ? 'bg-purple-500' : 
                p.isOnline ? 'bg-emerald-500' : 'bg-violet-300'
              }`} />
              {p.isBusy ? 'Busy' : p.isOnline ? 'Online' : 'Offline'}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="pt-10 px-5 pb-5 flex flex-col flex-1">
          <div className="flex items-start justify-between mb-1">
            <div>
              <p className="font-bold text-[#2d1b69] text-base">{p.name}</p>
              <p className="text-sm text-indigo-600 font-medium">{p.specialties.slice(0, 2).join(' · ') || '—'}</p>
            </div>
            <div className={`flex items-center gap-1 rounded-lg px-2 py-1 shrink-0 border ${
              p.isVerified
                ? 'bg-indigo-50 border-indigo-200'
                : 'bg-yellow-50 border-yellow-200'
            }`}>
              <Shield className={`w-3 h-3 ${p.isVerified ? 'text-indigo-600' : 'text-yellow-500'}`} />
              <span className={`text-[10px] font-semibold ${p.isVerified ? 'text-indigo-700' : 'text-yellow-600'}`}>
                {p.isVerified ? 'Verified' : 'Unverified'}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3 mt-2 mb-3">
            <div className="flex items-center gap-1">
              <Star className="w-3.5 h-3.5 text-indigo-400 fill-current" />
              <span className="text-sm font-semibold text-[#2d1b69]">{p.avgRating || '—'}</span>
              <span className="text-xs text-purple-400">({p.reviewCount})</span>
            </div>
            <span className="text-purple-200">|</span>
            <span className="text-xs text-[#6d28d9]/70">{p.experienceYrs} yrs exp</span>
            <span className="text-purple-200">|</span>
            <div className="flex items-center gap-1">
              <Globe className="w-3 h-3 text-purple-400" />
              <span className="text-xs text-[#6d28d9]/70 truncate max-w-[80px]">{p.languages.slice(0, 2).join(', ') || '—'}</span>
            </div>
          </div>

          {/* Bio — always takes up space even if empty */}
          <p className="text-xs text-[#6d28d9]/70 line-clamp-2 leading-relaxed flex-1">
            {p.bio || ''}
          </p>

          <div className="flex items-center justify-between pt-3 mt-3 border-t border-purple-100">
            <div>
              <span className="text-lg font-bold text-[#2d1b69]"><span style={{fontFamily:"Roboto,Arial,sans-serif"}}>&#x20B9;</span>{p.perMinuteRate}</span>
              <span className="text-xs text-purple-400">/min</span>
            </div>
            <div className="flex gap-2">
              <Button size="sm" variant="outline" className="h-8 px-3 border-purple-200 hover:border-indigo-300 hover:text-indigo-700 text-xs gap-1" disabled={!p.isOnline || p.isBusy} onClick={(e) => { e.stopPropagation(); router.push('/login'); }}>
                <MessageCircle className="h-3.5 w-3.5" /> Chat
              </Button>
              <Button size="sm" disabled={!p.isOnline || p.isBusy} className="h-8 px-3 bg-indigo-500 hover:bg-indigo-600 text-white border-0 text-xs gap-1 disabled:opacity-40" onClick={(e) => { e.stopPropagation(); router.push('/login'); }}>
                <Phone className="h-3.5 w-3.5" /> Call
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
