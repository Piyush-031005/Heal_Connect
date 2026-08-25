'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Loader2, Eye, EyeOff, ArrowRight } from 'lucide-react';
import { astrologerTokenStore, authApi } from '@/lib/api';

export default function ExpertSignupPage() {
  const router = useRouter();
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '', phone: '', dob: '' });
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [signupMethod, setSignupMethod] = useState<'email' | 'phone'>('email');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const rules = [
    { label: '1 uppercase letter', test: (p: string) => /[A-Z]/.test(p) },
    { label: '1 lowercase letter', test: (p: string) => /[a-z]/.test(p) },
    { label: '1 number',           test: (p: string) => /[0-9]/.test(p) },
    { label: '1 special character',test: (p: string) => /[^A-Za-z0-9]/.test(p) },
    { label: 'Minimum 8 characters',test: (p: string) => p.length >= 8 },
  ];
  const passed = rules.filter(r => r.test(form.password)).length;
  const allPassed = passed === rules.length;

  const set = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }));

  const handleEmailSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!allPassed) { 
      setError('Password does not meet the required criteria.'); 
      return; 
    }
    if (form.password !== form.confirm) { 
      setError('Passwords do not match.'); 
      return; 
    }
    
    // Age validation
    if (!form.dob) {
      setError('Please enter your date of birth.');
      return;
    }
    const dobDate = new Date(form.dob);
    const minBirthDate = new Date();
    minBirthDate.setFullYear(minBirthDate.getFullYear() - 18);
    if (isNaN(dobDate.getTime()) || dobDate > minBirthDate) {
      setError('You must be at least 18 years old to create an account.');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/auth/astrologer/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          password: form.password,
          dob: form.dob,
        }),
      }).then(r => r.json());

      if (!res.success) {
        setError(res.message || 'Registration failed.');
        return;
      }
      
      astrologerTokenStore.setTokens(res.data.accessToken, res.data.refreshToken);
      if (res.data.astrologer) astrologerTokenStore.setProfile(res.data.astrologer);
      router.push('/astrologer/onboarding');
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handlePhoneSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!form.phone) {
      setError('Please enter a phone number.');
      return;
    }
    if (!form.name) {
      setError('Please enter your name.');
      return;
    }
    if (!form.dob) {
      setError('Please enter your date of birth.');
      return;
    }

    setLoading(true);
    try {
      const cleanPhone = form.phone.replace(/\s+/g, '');
      // Use astrologer OTP API
      const res = await fetch('/api/auth/astrologer/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone: cleanPhone, purpose: 'register' }),
      }).then(r => r.json());
      
      if (!res.success) {
        setError(res.message || 'Failed to send OTP.');
        return;
      }
      
      // Save form data to complete registration after OTP verification
      sessionStorage.setItem('expertSignupData', JSON.stringify({
        name: form.name,
        phone: cleanPhone,
        dob: form.dob,
      }));
      
      router.push(`/verify-otp?phone=${encodeURIComponent(cleanPhone)}&type=register&role=expert`);
    } catch (err: any) {
      setError(err.message || 'Something went wrong sending OTP.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = () => {
    const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || '';
    if (!clientId) { 
      setError('Google Sign-In is not configured. Please contact support.'); 
      return; 
    }
    
    try {
      // Save signup intent
      sessionStorage.setItem('googleSignupIntent', 'expert');
      
      const redirectUri = encodeURIComponent(`${window.location.origin}/auth/google/callback`);
      const scope = encodeURIComponent('openid email profile');
      const state = 'expert';
      const nonce = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
      
      console.log('Initiating Google OAuth with:', {
        clientId: clientId.substring(0, 20) + '...',
        redirectUri: decodeURIComponent(redirectUri),
        state
      });
      
      const googleUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=id_token&scope=${scope}&state=${state}&nonce=${nonce}&prompt=select_account`;
      
      window.location.href = googleUrl;
    } catch (error) {
      console.error('Failed to initiate Google OAuth:', error);
      setError('Failed to start Google authentication. Please try again.');
    }
  };

  const inputCls = "w-full h-12 rounded-xl border border-yellow-200 bg-[#fffbf0] px-4 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition";

  return (
    <div className="min-h-screen bg-[#fffbf0] flex flex-col md:flex-row font-sans">

      {/* Left panel */}
      <div className="hidden md:flex flex-col justify-between w-5/12 p-12 bg-gradient-to-br from-amber-500 via-amber-600 to-orange-700 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-orange-900/20 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10">
          <Link href="/" className="flex items-center gap-2 mb-16">
            <Image src="/logo.png" alt="ZenAuraa" width={36} height={36} className="rounded-full" />
            <span className="text-2xl font-extrabold text-white">ZenAuraa</span>
          </Link>
          <h1 className="text-4xl font-extrabold text-white mb-4 leading-tight">
            Join as an<br />Expert Practitioner
          </h1>
          <p className="text-amber-100/80 text-sm leading-relaxed mt-4 max-w-xs">
            Create your account and complete a short onboarding form. Our team will review your application and get back to you.
          </p>
          <div className="mt-8 space-y-3">
            {['Vedic Astrology', 'Numerology', 'Tarot', 'Vastu', 'Energy Healing', 'Life Coaching'].map(tag => (
              <span key={tag} className="inline-block mr-2 mb-2 px-3 py-1 bg-white/15 text-white text-xs rounded-full">{tag}</span>
            ))}
          </div>
        </div>
        <div className="relative z-10 border-t border-white/20 pt-6">
          <p className="text-amber-100/60 text-xs">© 2026 ZenAuraa. All rights reserved.</p>
        </div>
      </div>

      {/* Right panel */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-12 relative">
        <div className="flex items-center gap-2 mb-8 md:hidden">
          <Image src="/logo.png" alt="ZenAuraa" width={32} height={32} className="rounded-full" />
          <span className="text-xl font-extrabold text-amber-500">ZenAuraa</span>
        </div>

        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl shadow-xl border border-yellow-100 p-8">
            <h2 className="text-xl font-extrabold text-gray-900 mb-1">Create your expert account</h2>
            <p className="text-sm text-gray-500 mb-6">Step 1 of 2 — Account setup</p>

            {error && (
              <div className="mb-5 p-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm">{error}</div>
            )}

            {/* Email/Phone Tabs */}
            <div className="flex rounded-xl border border-yellow-200 overflow-hidden bg-[#fffbf0] p-1 gap-1 mb-5">
              <button
                type="button"
                onClick={() => { setSignupMethod('email'); setError(''); }}
                className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                  signupMethod === 'email' ? 'bg-amber-500 text-white shadow' : 'text-gray-500 hover:text-amber-500'
                }`}
              >
                Email
              </button>
              <button
                type="button"
                onClick={() => { setSignupMethod('phone'); setError(''); }}
                className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                  signupMethod === 'phone' ? 'bg-amber-500 text-white shadow' : 'text-gray-500 hover:text-amber-500'
                }`}
              >
                Phone
              </button>
            </div>

            {signupMethod === 'email' ? (
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
                className="mt-3 w-full h-12 bg-amber-500 hover:bg-amber-600 disabled:opacity-60 text-white font-bold rounded-full text-sm shadow-lg flex items-center justify-center gap-2 transition-colors">
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
                {loading ? 'Creating account...' : <>Create Account & Continue <ArrowRight className="w-4 h-4" /></>}
              </button>
            </form>
            ) : (
              <form onSubmit={handlePhoneSignup} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Full Name <span className="text-red-500">*</span></label>
                  <input className={inputCls} placeholder="Your full name" value={form.name} onChange={e => set('name', e.target.value)} required />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Phone Number <span className="text-red-500">*</span></label>
                  <input className={inputCls} type="tel" placeholder="+919876543210" value={form.phone} onChange={e => set('phone', e.target.value)} required />
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
                
                <button type="submit" disabled={loading}
                  className="mt-3 w-full h-12 bg-amber-500 hover:bg-amber-600 disabled:opacity-60 text-white font-bold rounded-full text-sm shadow-lg flex items-center justify-center gap-2 transition-colors">
                  {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
                  {loading ? 'Sending OTP...' : <>Send OTP <ArrowRight className="w-4 h-4" /></>}
                </button>
              </form>
            )}

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
          </div>

          <p className="text-center text-sm text-gray-500 mt-5">
            Already have an account?{' '}
            <Link href="/expert/login-email" className="text-amber-600 font-semibold hover:underline">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
