'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Cookie, X, ChevronDown, ChevronUp, ShieldCheck } from 'lucide-react';

// Bump this whenever the Privacy Notice or Cookie policy wording changes
// materially — the banner will re-appear for any visitor whose stored version
// doesn't match this value.
const CURRENT_POLICY_VERSION = '2026-08-17';
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
    <div
      role="dialog"
      aria-modal="false"
      aria-label="Cookie preferences"
      className="fixed bottom-0 left-0 right-0 z-[9999] p-3 sm:p-5 pointer-events-none"
    >
      <div className="pointer-events-auto max-w-2xl mx-auto bg-white border border-indigo-200 rounded-2xl shadow-2xl">
        {/* Header */}
        <div className="flex items-start gap-3 px-5 pt-5 pb-2">
          <div className="flex-shrink-0 w-9 h-9 rounded-full bg-indigo-100 flex items-center justify-center">
            <Cookie className="w-5 h-5 text-indigo-600" />
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="text-sm font-semibold text-indigo-950">Your Privacy, Your Choice</h2>
            <p className="text-xs text-purple-500 mt-0.5 leading-relaxed">
              We use cookies to keep the site working and — with your consent — to understand how
              you use it and send relevant offers.{' '}
              <Link href="/privacy" target="_blank" className="text-indigo-600 hover:underline font-medium">
                Privacy Notice
              </Link>
            </p>
          </div>
          <button
            type="button"
            onClick={() => setVisible(false)}
            aria-label="Dismiss cookie banner"
            className="flex-shrink-0 p-1.5 text-purple-400 hover:text-purple-700 rounded-lg hover:bg-purple-50 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Expandable detail */}
        <div className="px-5">
          <button
            type="button"
            onClick={() => setExpanded((v) => !v)}
            className="flex items-center gap-1 text-xs text-indigo-700 hover:text-indigo-900 font-medium mb-2"
          >
            {expanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            {expanded ? 'Hide options' : 'Customise'}
          </button>

          {expanded && (
            <div className="space-y-3 mb-3 rounded-xl bg-indigo-50 p-3 text-xs text-purple-800">
              {/* Necessary */}
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-semibold text-purple-900">Necessary</p>
                  <p className="text-purple-500 mt-0.5">Login sessions, payments, security. Cannot be disabled.</p>
                </div>
                <div className="flex-shrink-0 flex items-center gap-1 text-green-600 font-semibold text-xs">
                  <ShieldCheck className="w-4 h-4" /> Always on
                </div>
              </div>

              {/* Analytics toggle */}
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-semibold text-purple-900">Analytics</p>
                  <p className="text-purple-500 mt-0.5">Helps us learn which features to improve.</p>
                </div>
                <button
                  id="consent-toggle-analytics"
                  type="button"
                  role="switch"
                  aria-checked={analytics}
                  onClick={() => setAnalytics((v) => !v)}
                  className={`flex-shrink-0 relative rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-400 ${analytics ? 'bg-indigo-500' : 'bg-violet-200'}`}
                  style={{ height: '22px', width: '40px' }}
                >
                  <span
                    className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform ${analytics ? 'translate-x-[18px]' : 'translate-x-0'}`}
                  />
                </button>
              </div>

              {/* Marketing toggle */}
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-semibold text-purple-900">Marketing</p>
                  <p className="text-purple-500 mt-0.5">Relevant offers and updates by email or push notification.</p>
                </div>
                <button
                  id="consent-toggle-marketing"
                  type="button"
                  role="switch"
                  aria-checked={marketing}
                  onClick={() => setMarketing((v) => !v)}
                  className={`flex-shrink-0 relative rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-400 ${marketing ? 'bg-indigo-500' : 'bg-violet-200'}`}
                  style={{ height: '22px', width: '40px' }}
                >
                  <span
                    className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform ${marketing ? 'translate-x-[18px]' : 'translate-x-0'}`}
                  />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* CTA row */}
        <div className="flex flex-col sm:flex-row gap-2 px-5 pb-4">
          <button
            id="consent-accept-all"
            type="button"
            disabled={saving}
            onClick={() => saveChoices(true)}
            className="flex-1 py-2 px-4 rounded-xl bg-indigo-500 hover:bg-indigo-600 text-white text-sm font-semibold transition-colors disabled:opacity-60"
          >
            {saving ? 'Saving…' : 'Accept all'}
          </button>
          {expanded ? (
            <button
              id="consent-save-choices"
              type="button"
              disabled={saving}
              onClick={() => saveChoices(false)}
              className="flex-1 py-2 px-4 rounded-xl border border-indigo-300 hover:bg-indigo-50 text-indigo-800 text-sm font-semibold transition-colors disabled:opacity-60"
            >
              Save my choices
            </button>
          ) : (
            <button
              id="consent-necessary-only"
              type="button"
              disabled={saving}
              onClick={() => { setAnalytics(false); setMarketing(false); saveChoices(false); }}
              className="flex-1 py-2 px-4 rounded-xl border border-violet-200 hover:bg-purple-50 text-purple-700 text-sm font-semibold transition-colors disabled:opacity-60"
            >
              Necessary only
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
