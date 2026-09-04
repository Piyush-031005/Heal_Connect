'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Loader2, Eye, EyeOff, ArrowRight } from 'lucide-react';
import { authApi, tokenStore } from '@/lib/api';

function ExpertSignupInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '', dob: '' });
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [alreadyRegistered, setAlreadyRegistered] = useState(false);
  const [isGoogleAuth, setIsGoogleAuth] = useState(false);

  const rules = [
    { label: '1 uppercase letter',  test: (p: string) => /[A-Z]/.test(p) },
    { label: '1 lowercase letter',  test: (p: string) => /[a-z]/.test(p) },
    { label: '1 number',            test: (p: string) => /[0-9]/.test(p) },
    { label: '1 special character', test: (p: string) => /[^A-Za-z0-9]/.test(p) },
    { label: 'Minimum 8 characters',test: (p: string) => p.length >= 8 },
  ];
  const passed = rules.filter(r => r.test(form.password)).length;
  const allPassed = passed === rules.length;
  const set = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }));

  useEffect(() => {
    if (searchParams?.get('already_registered') === 'true') {
      tokenStore.clear();
      localStorage.removeItem('hc_role');
      localStorage.removeItem('hc_practitioner_id');
      localStorage.removeItem('hc_pid');
      localStorage.removeItem('hc_practitioner_name');
      setAlreadyRegistered(true);
      return;
    }

    // Clear any stale expert session — user should not be blocked by old tokens
    localStorage.removeItem('hc_role');
    localStorage.removeItem('hc_practitioner_id');
    localStorage.removeItem('hc_pid');
    localStorage.removeItem('hc_practitioner_name');
    tokenStore.clear();

    const googleAuth  = localStorage.getItem('hc_google_auth');
    const googleName  = localStorage.getItem('hc_google_name');
    const googleEmail = localStorage.getItem('hc_google_email');
    if (googleAuth && googleName && googleEmail) {
      setIsGoogleAuth(true);
      setForm(f => ({ ...f, name: googleName, email: googleEmail }));
    }
  }, [searchParams]);

  const handleEmailSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!isGoogleAuth) {
      if (!allPassed) { setError('Password does not meet the required criteria.'); return; }
      if (form.password !== form.confirm) { setError('Passwords do not match.'); return; }
    }

    if (!form.dob) { setError('Please enter your date of birth.'); return; }
    const dobDate = new Date(form.dob);
    const minBirthDate = new Date();
    minBirthDate.setFullYear(minBirthDate.getFullYear() - 18);
    if (isNaN(dobDate.getTime()) || dobDate > minBirthDate) {
      setError('You must be at least 18 years old to create an account.');
      return;
    }

    setLoading(true);
    try {
      if (isGoogleAuth) {
        localStorage.removeItem('hc_google_auth');
        localStorage.removeItem('hc_google_name');
        localStorage.removeItem('hc_google_email');
        router.push('/expert/verification-pending');
        return;
      }

      const res = await authApi.practitionerRegister(
        form.name, form.email, form.password, form.dob,
        { acceptTerms: true, acceptPrivacy: true, emailMarketingOptIn: false }
      );

      if (!res.success || !res.data) {
        if (res.message?.toLowerCase().includes('already registered') || res.message?.toLowerCase().includes('already exists')) {
          setAlreadyRegistered(true);
        } else {
          setError(res.message || 'Registration failed.');
        }
        return;
      }

      tokenStore.setTokens(res.data.accessToken, res.data.refreshToken);
      localStorage.setItem('hc_role', 'practitioner');
      localStorage.setItem('hc_practitioner_id', res.data.practitioner.id);
      localStorage.setItem('hc_pid', res.data.practitioner.id);
      localStorage.setItem('hc_practitioner_name', res.data.practitioner.name ?? '');
      router.push('/expert/dashboard');
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = () => {
    const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || '';
    if (!clientId) { setError('Google Sign-In is not configured.'); return; }
    const redirectUri = encodeURIComponent(`${window.location.origin}/auth/google/callback`);
    const scope = encodeURIComponent('openid email profile');
    const nonce = Math.random().toString(36).substring(2, 15);
    window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=id_token&scope=${scope}&state=expert_signup&nonce=${nonce}&prompt=select_account`;
  };

  const inputCls = 'w-full h-12 rounded-xl border border-yellow-200 bg-[#faf9f6] px-4 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition';

  return (
    <div className="min-h-screen bg-[#faf9f6] flex flex-col md:flex-row font-sans">

      {/* Left panel */}
      <div className="hidden md:flex flex-col justify-between w-5/12 p-12 bg-gradient-to-br from-indigo-500 via-indigo-600 to-purple-700 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-900/20 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10">
          <Link href="/" className="flex items-center gap-2 mb-16">
            <Image src="/logo.png" alt="ZenAuraa" width={36} height={36} className="rounded-full" />
            <span className="text-2xl font-extrabold text-white">ZenAuraa</span>
          </Link>
          <h1 className="text-4xl font-extrabold text-white mb-4 leading-tight">
            Join as an<br />Expert Practitioner
          </h1>
          <p className="text-indigo-100/80 text-sm leading-relaxed mt-4 max-w-xs">
            Create your account and complete a short onboarding form. Our team will review your application and get back to you.
          </p>
          <div className="mt-8">
            {['Vedic Astrology', 'Numerology', 'Tarot', 'Vastu', 'Energy Healing', 'Life Coaching'].map(tag => (
              <span key={tag} className="inline-block mr-2 mb-2 px-3 py-1 bg-white/15 text-white text-xs rounded-full">{tag}</span>
            ))}
          </div>
        </div>
        <div className="relative z-10 border-t border-white/20 pt-6">
          <p className="text-indigo-100/60 text-xs">© 2026 ZenAuraa. All rights reserved.</p>
        </div>
      </div>

      {/* Right panel */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-12">
        <div className="flex items-center gap-2 mb-8 md:hidden">
          <Image src="/logo.png" alt="ZenAuraa" width={32} height={32} className="rounded-full" />
          <span className="text-xl font-extrabold text-indigo-500">ZenAuraa</span>
        </div>

        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl shadow-xl border border-yellow-100 p-8">
            <h2 className="text-xl font-extrabold text-gray-900 mb-1">Create your expert account</h2>
            <p className="text-sm text-gray-500 mb-6">Step 1 of 2 — Account setup</p>

            {alreadyRegistered ? (
              <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl">
                <p className="text-amber-800 font-semibold text-sm mb-1">You&apos;re already registered!</p>
                <p className="text-amber-700 text-xs mb-3">An expert account with this email already exists. Please log in instead.</p>
                <button
                  onClick={() => {
                    tokenStore.clear();
                    localStorage.removeItem('hc_role');
                    localStorage.removeItem('hc_practitioner_id');
                    localStorage.removeItem('hc_pid');
                    localStorage.removeItem('hc_practitioner_name');
                    router.push('/login?role=expert');
                  }}
                  className="inline-flex items-center gap-1.5 px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-white text-xs font-bold rounded-full transition-colors"
                >
                  Go to Login →
                </button>
              </div>
            ) : (
              <>
                {error && (
                  <div className="mb-5 p-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm">{error}</div>
                )}

                <form onSubmit={handleEmailSignup} className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Full Name <span className="text-red-500">*</span></label>
                    <input className={inputCls} placeholder="Your full name" value={form.name} onChange={e => set('name', e.target.value)} required />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Email <span className="text-red-500">*</span></label>
                    <input className={inputCls} type="email" placeholder="you@example.com" value={form.email} onChange={e => set('email', e.target.value)} required />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Date of Birth <span className="text-red-500">*</span></label>
                    <input
                      className={inputCls}
                      type="date"
                      value={form.dob}
                      onChange={e => set('dob', e.target.value)}
                      required
                      max={(() => { const d = new Date(); d.setFullYear(d.getFullYear() - 18); return d.toISOString().split('T')[0]; })()}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Password <span className="text-red-500">*</span></label>
                    <div className="relative">
                      <input
                        className={inputCls + ' pr-11'}
                        type={showPass ? 'text' : 'password'}
                        placeholder="Create a strong password"
                        value={form.password}
                        onChange={e => set('password', e.target.value)}
                        required
                      />
                      <button type="button" onClick={() => setShowPass(v => !v)} className="absolute right-3 top-3.5 text-gray-400 hover:text-gray-600">
                        {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                    {form.password.length > 0 && (
                      <div className="mt-2 space-y-2">
                        <div className="flex gap-1">
                          {rules.map((r, i) => (
                            <div key={i} className={`h-1 flex-1 rounded-full transition-all duration-300 ${r.test(form.password)
                              ? passed <= 2 ? 'bg-red-400' : passed <= 3 ? 'bg-yellow-400' : passed <= 4 ? 'bg-blue-400' : 'bg-green-500'
                              : 'bg-gray-200'}`} />
                          ))}
                        </div>
                        <ul className="grid grid-cols-2 gap-x-3 gap-y-0.5">
                          {rules.map(r => {
                            const ok = r.test(form.password);
                            return (
                              <li key={r.label} className={`flex items-center gap-1.5 text-xs transition-colors ${ok ? 'text-green-600' : 'text-gray-400'}`}>
                                <span className={`w-3.5 h-3.5 rounded-full flex items-center justify-center text-[9px] font-bold flex-shrink-0 ${ok ? 'bg-green-500 text-white' : 'border border-gray-300'}`}>
                                  {ok ? '✓' : ''}
                                </span>
                                {r.label}
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Confirm Password <span className="text-red-500">*</span></label>
                    <div className="relative">
                      <input
                        className={inputCls + ' pr-11'}
                        type={showConfirm ? 'text' : 'password'}
                        placeholder="Re-enter password"
                        value={form.confirm}
                        onChange={e => set('confirm', e.target.value)}
                        required
                      />
                      <button type="button" onClick={() => setShowConfirm(v => !v)} className="absolute right-3 top-3.5 text-gray-400 hover:text-gray-600">
                        {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                  <button type="submit" disabled={loading}
                    className="mt-3 w-full h-12 bg-indigo-500 hover:bg-indigo-600 disabled:opacity-60 text-white font-bold rounded-full text-sm shadow-lg flex items-center justify-center gap-2 transition-colors">
                    {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
                    {loading ? 'Creating account...' : <><span>Create Account & Continue</span> <ArrowRight className="w-4 h-4" /></>}
                  </button>
                </form>

                <div className="relative flex items-center py-4">
                  <div className="flex-grow border-t border-yellow-100" />
                  <span className="flex-shrink-0 mx-4 text-gray-400 text-sm uppercase tracking-wider">Or continue with</span>
                  <div className="flex-grow border-t border-yellow-100" />
                </div>

                <button
                  type="button"
                  onClick={handleGoogleSignIn}
                  className="w-full h-12 bg-white border border-gray-200 hover:bg-gray-50 text-gray-800 rounded-xl font-semibold shadow-sm flex items-center justify-center gap-2 transition-colors"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                  </svg>
                  Continue with Google
                </button>
              </>
            )}
          </div>

          <p className="text-center text-sm text-gray-500 mt-5">
            Already have an account?{' '}
            <Link href="/login?role=expert" className="text-indigo-600 font-semibold hover:underline">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default function ExpertSignupPage() {
  return (
    <Suspense>
      <ExpertSignupInner />
    </Suspense>
  );
}
