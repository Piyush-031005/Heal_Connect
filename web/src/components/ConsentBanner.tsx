'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Cookie, X, ChevronDown, ChevronUp, ShieldCheck } from 'lucide-react';

// Bump this whenever the Privacy Notice or Cookie policy wording changes
// materially — the banner will re-appear for any visitor whose stored version
// doesn't match this value.
const CURRENT_POLICY_VERSION = '2026-09-18'; // Bumped version to force display
const VISITOR_ID_KEY = 'hc_visitor_id';
const CONSENT_KEY    = 'hc_consent_state';
const VERSION_KEY    = 'hc_consent_version';

function getOrCreateVisitorId(): string {
  if (typeof window === 'undefined') return '';
  let id = localStorage.getItem(VISITOR_ID_KEY);
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem(VISITOR_ID_KEY, id);
  }
  return id;
}

async function recordConsent(
  category: string,
  granted: boolean,
  visitorId: string,
  bearerToken?: string,
) {
  const headers: Record<string, string> = { 'Content-Type': 'application/json' };
  if (bearerToken) headers['Authorization'] = `Bearer ${bearerToken}`;
  try {
    // /api/consent is forwarded by next.config.mjs to the Express backend
    await fetch(`${process.env.NEXT_PUBLIC_API_URL ?? ''}/api/consent`, {
      method: 'POST',
      headers,
      body: JSON.stringify({ category, granted, visitorId, policyVersion: CURRENT_POLICY_VERSION }),
    });
  } catch {
    // Non-blocking — consent record failure must never degrade UX
  }
}

export function ConsentBanner() {
  const [visible,   setVisible]   = useState(false);
  const [expanded,  setExpanded]  = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);
  const [saving,    setSaving]    = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const stored        = localStorage.getItem(CONSENT_KEY);
    const storedVersion = localStorage.getItem(VERSION_KEY);
    // Show banner if no prior decision or policy wording has changed
    if (!stored || storedVersion !== CURRENT_POLICY_VERSION) {
      setVisible(true);
    }
  }, []);

  if (!visible) return null;

  async function saveChoices(acceptAll: boolean) {
    setSaving(true);
    const visitorId         = getOrCreateVisitorId();
    const token             = typeof window !== 'undefined'
      ? (localStorage.getItem('hc_access_token') ?? undefined)
      : undefined;
    const analyticsGranted  = acceptAll ? true : analytics;
    const marketingGranted  = acceptAll ? true : marketing;

    await Promise.allSettled([
      recordConsent('ANALYTICS',       analyticsGranted, visitorId, token),
      recordConsent('EMAIL_MARKETING', marketingGranted, visitorId, token),
      recordConsent('PUSH_MARKETING',  marketingGranted, visitorId, token),
    ]);

    localStorage.setItem(CONSENT_KEY, JSON.stringify({ analytics: analyticsGranted, marketing: marketingGranted }));
    localStorage.setItem(VERSION_KEY, CURRENT_POLICY_VERSION);
    setSaving(false);
    setVisible(false);
  }

  return (
    <>
      {/* Simple Bottom Banner */}
      {!expanded && (
        <div
          role="dialog"
          aria-modal="false"
          aria-label="Cookie preferences"
          className="fixed bottom-0 left-0 right-0 z-[9999] bg-[#3b3b3b] shadow-2xl"
        >
          <div className="max-w-7xl mx-auto px-4 py-3 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-[13px] text-white/90 text-center md:text-left flex-1">
              We use cookies to give you the best experience on our website. If you continue, we will assume you are OK with this.{' '}
              <Link href="/privacy" target="_blank" className="text-[#d97757] hover:underline ml-1">
                More details
              </Link>
            </div>
            <div className="flex items-center gap-3 flex-shrink-0">
              <button
                id="consent-accept-all"
                type="button"
                disabled={saving}
                onClick={() => saveChoices(true)}
                className="px-6 py-2 bg-[#00b894] hover:bg-[#00a383] text-white text-sm font-semibold transition-colors disabled:opacity-60"
              >
                {saving ? 'Saving…' : 'Accept'}
              </button>
              <button
                type="button"
                onClick={() => setExpanded(true)}
                className="px-4 py-2 bg-white hover:bg-gray-100 text-[#3b3b3b] text-sm font-semibold transition-colors border border-transparent"
              >
                Cookie settings
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Expanded Settings Modal */}
      {expanded && (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm pointer-events-auto">
          <div className="w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between px-5 pt-5 pb-3 border-b border-gray-100">
              <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                <Cookie className="w-5 h-5 text-indigo-500" />
                Cookie Settings
              </h2>
              <button
                type="button"
                onClick={() => setExpanded(false)}
                className="p-1.5 text-gray-400 hover:text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="px-5 py-4 space-y-4">
              <p className="text-sm text-gray-600 leading-relaxed mb-4">
                We use cookies to keep the site working and — with your consent — to understand how
                you use it and send relevant offers.
              </p>

              <div className="space-y-4 bg-gray-50 rounded-xl p-4">
                {/* Necessary */}
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">Necessary</p>
                    <p className="text-gray-500 text-xs mt-0.5">Login sessions, payments, security. Cannot be disabled.</p>
                  </div>
                  <div className="flex-shrink-0 flex items-center gap-1 text-green-600 font-semibold text-xs mt-1">
                    <ShieldCheck className="w-4 h-4" /> Always on
                  </div>
                </div>

                {/* Analytics toggle */}
                <div className="flex items-start justify-between gap-3 pt-3 border-t border-gray-200">
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">Analytics</p>
                    <p className="text-gray-500 text-xs mt-0.5">Helps us learn which features to improve.</p>
                  </div>
                  <button
                    id="consent-toggle-analytics"
                    type="button"
                    role="switch"
                    aria-checked={analytics}
                    onClick={() => setAnalytics((v) => !v)}
                    className={`flex-shrink-0 relative rounded-full transition-colors mt-1 focus:outline-none focus:ring-2 focus:ring-indigo-400 ${analytics ? 'bg-[#00b894]' : 'bg-gray-300'}`}
                    style={{ height: '22px', width: '40px' }}
                  >
                    <span
                      className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform ${analytics ? 'translate-x-[18px]' : 'translate-x-0'}`}
                    />
                  </button>
                </div>

                {/* Marketing toggle */}
                <div className="flex items-start justify-between gap-3 pt-3 border-t border-gray-200">
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">Marketing</p>
                    <p className="text-gray-500 text-xs mt-0.5">Relevant offers and updates by email or push notification.</p>
                  </div>
                  <button
                    id="consent-toggle-marketing"
                    type="button"
                    role="switch"
                    aria-checked={marketing}
                    onClick={() => setMarketing((v) => !v)}
                    className={`flex-shrink-0 relative rounded-full transition-colors mt-1 focus:outline-none focus:ring-2 focus:ring-indigo-400 ${marketing ? 'bg-[#00b894]' : 'bg-gray-300'}`}
                    style={{ height: '22px', width: '40px' }}
                  >
                    <span
                      className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform ${marketing ? 'translate-x-[18px]' : 'translate-x-0'}`}
                    />
                  </button>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 px-5 pb-5 pt-2">
              <button
                type="button"
                disabled={saving}
                onClick={() => saveChoices(true)}
                className="flex-1 py-2.5 px-4 rounded-lg bg-[#00b894] hover:bg-[#00a383] text-white text-sm font-semibold transition-colors disabled:opacity-60"
              >
                {saving ? 'Saving…' : 'Accept all'}
              </button>
              <button
                type="button"
                disabled={saving}
                onClick={() => saveChoices(false)}
                className="flex-1 py-2.5 px-4 rounded-lg border border-gray-300 hover:bg-gray-50 text-gray-700 text-sm font-semibold transition-colors disabled:opacity-60"
              >
                Save my choices
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
