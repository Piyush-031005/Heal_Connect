'use client';

import { useState, useRef, useEffect } from 'react';
import { ChevronDown, Search } from 'lucide-react';
import { countryCodes } from '@/lib/country-codes';

interface CountryCodeSelectProps {
  value: string;
  onChange: (code: string) => void;
  className?: string;
}

export function CountryCodeSelect({ value, onChange, className = '' }: CountryCodeSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Find currently selected country
  const selected = countryCodes.find((c) => c.code === value) || {
    name: 'India',
    code: value || '+91',
    flag: '🇮🇳',
  };

  // Filter countries by search query
  const filtered = countryCodes.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.code.includes(search)
  );

  // Close when clicking outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      setTimeout(() => searchInputRef.current?.focus(), 50);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  function handleSelect(code: string) {
    onChange(code);
    setIsOpen(false);
    setSearch('');
  }

  return (
    <div ref={containerRef} className={elative }>
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full h-12 px-3.5 flex items-center justify-between gap-1.5 rounded-lg border border-yellow-200 bg-[#faf9f6] text-[#1a1a1a] hover:border-[#4f46e5] focus:outline-none focus:ring-2 focus:ring-[#4f46e5]/30 transition-all shadow-sm"
      >
        <span className="flex items-center gap-1.5 text-sm font-semibold truncate">
          <span className="text-base">{selected.flag}</span>
          <span className="text-[#4f46e5] font-bold">{selected.code}</span>
        </span>
        <ChevronDown
          className={w-4 h-4 text-gray-400 transition-transform duration-200 }
        />
      </button>

      {/* Popover Dropdown */}
      {isOpen && (
        <div className="absolute left-0 top-full mt-2 w-[280px] sm:w-[320px] z-50 bg-white/95 backdrop-blur-md rounded-2xl border border-purple-100 shadow-2xl shadow-indigo-900/15 overflow-hidden animate-in fade-in-0 zoom-in-95 duration-150">
          {/* Search Header */}
          <div className="p-2.5 border-b border-purple-50 bg-gradient-to-r from-purple-50/60 to-indigo-50/40">
            <div className="relative">
              <Search className="absolute left-3 top-2.5 w-3.5 h-3.5 text-[#4f46e5]" />
              <input
                ref={searchInputRef}
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search country or code..."
                className="w-full pl-8 pr-3 py-1.5 text-xs font-medium rounded-xl border border-purple-200 bg-white text-[#1a1a1a] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#4f46e5]/40"
              />
            </div>
          </div>

          {/* List of Countries */}
          <div className="max-h-60 overflow-y-auto p-1.5 space-y-0.5 divide-y-0">
            {filtered.length === 0 ? (
              <div className="py-6 text-center text-xs text-gray-400">
                No matching country found
              </div>
            ) : (
              filtered.map((c, i) => {
                const isSelected = c.code === value;
                return (
                  <button
                    key={${c.code}-}
                    type="button"
                    onClick={() => handleSelect(c.code)}
                    className={w-full flex items-center justify-between gap-2.5 px-3 py-2 rounded-xl text-left transition-all }
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <span className="text-lg flex-shrink-0">{c.flag}</span>
                      <span className="text-xs font-medium truncate">{c.name}</span>
                    </div>
                    <span
                      className={	ext-xs font-bold px-2 py-0.5 rounded-full flex-shrink-0 }
                    >
                      {c.code}
                    </span>
                  </button>
                );
              })
            )}
          </div>
        </div>
      )}
    </div>
  );
}
