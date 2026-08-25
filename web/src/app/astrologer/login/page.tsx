'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { astrologerTokenStore, authApi } from '@/lib/api';
import { Loader2, ShieldCheck, Star, Users, TrendingUp, Sparkles, ArrowRight, Eye, EyeOff } from 'lucide-react';

export default function AstrologerLoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: '', password: '', phone: '' });
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [loginMethod, setLoginMethod] = useState<'email' | 'phone'>('email');

  const set = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }));

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await fetch('/api/auth/astrologer/login-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: form.email, password: form.password }),
      }).then(r => r.json());

      if (!res.success) { 
        setError(res.message || 'Invalid email or password.'); 
        return; 
      }

      astrologerTokenStore.setTokens(res.data.accessToken, res.data.refreshToken);
      if (res.data.astrologer) astrologerTokenStore.setProfile(res.data.astrologer);
      router.push(res.data.redirect || '/astrologer/onboarding');
    } catch { 
      setError('Network error. Please try again.'); 
    } finally { 
      setLoading(false); 
    }
  };

  const handlePhoneLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!form.phone) {
      setError('Please enter a phone number.');
      return;
    }

    setLoading(true);
    try {
      const cleanPhone = form.phone.replace(/\s+/g, '');
      // Use astrologer OTP API
      const res = await fetch('/api/auth/astrologer/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone: cleanPhone, purpose: 'login' }),
      }).then(r => r.json());
      
      if (!res.success) {
        setError(res.message || 'Failed to send OTP.');
        return;
      }
      
      router.push(`/verify-otp?phone=${encodeURIComponent(cleanPhone)}&type=login&role=expert`);
    } catch (err: any) {
      setError(err.message || 'Something went wrong sending OTP.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = () => {
    const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || '';
    if (!clientId) { 
      setError('Google Sign-In is not configured yet.'); 
      return; 
    }
    
    const redirectUri = encodeURIComponent(`${window.location.origin}/auth/google/callback`);
    const scope = encodeURIComponent('openid email profile');
    const state = 'expert';
    window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=id_token&scope=${scope}&state=${state}&nonce=${Math.random().toString(36)}`;
  };

  const inputCls = "w-full h-12 rounded-xl border border-yellow-200 bg-[#fffbf0] px-4 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition";

  return (
    <div className="min-h-screen bg-[#fffbf0] flex flex-col md:flex-row font-sans">

      {/* Left — Branding */}
      <div className="hidden md:flex flex-col justify-between w-1/2 p-12 bg-gradient-to-br from-amber-500 via-orange-500 to-amber-700 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-orange-900/20 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10">
          <Link href="/" className="flex items-center gap-2 mb-16">
            <Image src="/logo.png" alt="ZenAuraa" width={36} height={36} className="rounded-full" />
            <span className="text-2xl font-extrabold text-white">ZenAuraa</span>
          </Link>
          <div className="inline-flex items-center gap-2 bg-white/20 text-white text-sm font-semibold px-4 py-1.5 rounded-full mb-6">
            <Star className="w-4 h-4 fill-white" /> Astrologer Portal
          </div>
          <h1 className="text-4xl lg:text-5xl font-extrabold text-white mb-6 leading-tight">
            Share your wisdom.<br />Grow your practice.
          </h1>
          <p className="text-lg text-yellow-100 max-w-md leading-relaxed mb-12">
            Join thousands of verified astrologers earning on ZenAuraa — consult clients via chat & call, on your schedule.
          </p>
          <div className="space-y-6">
            {[
              { icon: Users, title: '50,000+ Active Users', desc: 'Clients waiting for guidance right now.' },
              { icon: TrendingUp, title: 'Earn ₹500–₹5000/day', desc: 'Set your own rates, work anytime.' },
              { icon: Sparkles, title: 'Verified & Trusted', desc: 'Our badge builds client confidence.' },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-white font-semibold">{title}</p>
                  <p className="text-sm text-yellow-100">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="relative z-10 mt-auto pt-12 border-t border-white/20">
          <p className="text-yellow-100 text-sm">© 2026 Tara Infotech. All rights reserved.</p>
        </div>
      </div>

      {/* Right — Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-6 md:p-12 relative">
        <div className="absolute top-6 left-6 md:hidden">
          <Link href="/" className="flex items-center gap-2">
            <Image src="/logo.png" alt="ZenAuraa" width={28} height={28} className="rounded-full" />
            <span className="text-xl font-extrabold text-amber-500">ZenAuraa</span>
          </Link>
        </div>

        <div className="w-full max-w-md mt-12 md:mt-0">
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-700 text-sm font-semibold px-4 py-1.5 rounded-full mb-4 md:hidden">
              <Star className="w-4 h-4" /> Astrologer Portal
            </div>
            <h1 className="text-2xl font-extrabold text-gray-900">Sign in to your account</h1>
            <p className="text-gray-500 text-sm mt-1">Welcome back, practitioner</p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl border border-yellow-100 p-8">
            {error && (
              <div className="mb-5 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">{error}</div>
            )}

            {/* Email/Phone Tabs */}
            <div className="flex rounded-xl border border-yellow-200 overflow-hidden bg-[#fffbf0] p-1 gap-1 mb-5">
              <button
                type="button"
                onClick={() => { setLoginMethod('email'); setError(''); }}
                className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                  loginMethod === 'email' ? 'bg-amber-500 text-white shadow' : 'text-gray-500 hover:text-amber-500'
                }`}
              >
                Email
              </button>
              <button
                type="button"
                onClick={() => { setLoginMethod('phone'); setError(''); }}
                className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                  loginMethod === 'phone' ? 'bg-amber-500 text-white shadow' : 'text-gray-500 hover:text-amber-500'
                }`}
              >
                Phone
              </button>
            </div>

            {loginMethod === 'email' ? (
              <form onSubmit={handleEmailLogin} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Email</label>
                  <input className={inputCls} type="email" placeholder="you@example.com" value={form.email} onChange={e => set('email', e.target.value)} required />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Password</label>
                  <div className="relative">
                    <input
                      className={inputCls + ' pr-11'}
                      type={showPass ? 'text' : 'password'}
                      placeholder="Your password"
                      value={form.password}
                      onChange={e => set('password', e.target.value)}
                      required
                    />
                    <button type="button" onClick={() => setShowPass(v => !v)} className="absolute right-3 top-3.5 text-gray-400 hover:text-gray-600">
                      {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <button type="submit" disabled={loading}
                  className="w-full h-12 bg-amber-500 hover:bg-amber-600 disabled:opacity-60 text-white font-bold rounded-full text-base shadow-lg flex items-center justify-center gap-2 transition-colors mt-2">
                  {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : null}
                  Sign In <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            ) : (
              <form onSubmit={handlePhoneLogin} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Phone Number</label>
                  <input className={inputCls} type="tel" placeholder="+919876543210" value={form.phone} onChange={e => set('phone', e.target.value)} required />
                </div>

                <button type="submit" disabled={loading}
                  className="w-full h-12 bg-amber-500 hover:bg-amber-600 disabled:opacity-60 text-white font-bold rounded-full text-base shadow-lg flex items-center justify-center gap-2 transition-colors mt-2">
                  {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : null}
                  Send OTP <ArrowRight className="w-4 h-4" />
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
            New here?{' '}
            <Link href="/expert/signup" className="text-amber-600 font-semibold hover:underline">Create an account</Link>
          </p>

          <div className="mt-4 flex items-center justify-center gap-2 text-xs text-gray-400">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Secure login · Your data is encrypted</span>
          </div>
        </div>
      </div>
    </div>
  );
}
