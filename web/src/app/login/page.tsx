'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Mail, Lock, ArrowRight, ShieldCheck, Star, Eye, EyeOff, Loader2, User, Sparkles } from 'lucide-react';
import { authApi, astrologerAuthApi, astrologerTokenStore, tokenStore } from '@/lib/api';
import { countryCodes } from '@/lib/country-codes';

type Role = 'user' | 'expert';
type Mode = 'login' | 'forgot';

function LoginInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [role, setRole] = useState<Role>('user');

  useEffect(() => {
    if (searchParams?.get('error')) {
      if (searchParams.get('role') === 'expert') setRole('expert');
      return;
    }
    const token = localStorage.getItem('hc_access');
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/')));
        if (payload.exp && payload.exp * 1000 > Date.now()) {
          const isExpert = localStorage.getItem('hc_role') === 'practitioner';
          router.replace(isExpert ? '/expert/dashboard' : '/dashboard');
          return;
        }
      } catch {}
    }
    if (searchParams?.get('role') === 'expert') setRole('expert');
  }, [router, searchParams]);

  useEffect(() => {
    if (!searchParams) return;
    const errorType = searchParams.get('error');
    if (!errorType) return;
    const errorDetails = searchParams.get('details');
    const msgs: Record<string, string> = {
      oauth_error: `Google OAuth error: ${errorDetails || 'Access denied'}`,
      no_token: 'Google authentication did not return a valid token',
      auth_failed: `Authentication failed: ${errorDetails || 'Invalid credentials'}`,
      callback_failed: `Callback processing failed: ${errorDetails || 'Unknown error'}`,
      not_registered: 'No expert account found for this Google account. Please sign up first.',
    };
    setError(msgs[errorType] || 'Authentication failed');
    const newUrl = new URL(window.location.href);
    newUrl.searchParams.delete('error');
    newUrl.searchParams.delete('details');
    window.history.replaceState({}, '', newUrl.toString());
  }, [searchParams]);

  const [mode, setMode] = useState<Mode>('login');
  const [loginMethod, setLoginMethod] = useState<'password' | 'otp'>('password');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [countryCode, setCountryCode] = useState('+91');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [verifyUrl, setVerifyUrl] = useState<string | null>(null);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError(''); setSuccess(''); setVerifyUrl(null);
    setLoading(true);
    try {
      if (role === 'expert') {
        const res = await astrologerAuthApi.loginEmail(email, password);
        if (!res.success || !res.data) { setError(res.message || 'Login failed'); return; }
        astrologerTokenStore.setTokens(res.data.accessToken, res.data.refreshToken);
        if (res.data.astrologer) astrologerTokenStore.setProfile(res.data.astrologer);
        router.push(res.data.redirect || '/astrologer/onboarding');
      } else {
        const res = await authApi.login({ email, password });
        if (!res.success || !res.data) {
          setError(res.message || 'Login failed');
          if (res.code === 'UNVERIFIED_ACCOUNT' && (res as any).data?.verifyUrl) setVerifyUrl((res as any).data.verifyUrl);
          return;
        }
        tokenStore.setTokens(res.data.accessToken, res.data.refreshToken);
        localStorage.removeItem('hc_role');
        localStorage.removeItem('hc_practitioner_id');
        localStorage.removeItem('hc_practitioner_name');
        router.push('/dashboard');
      }
    } catch { setError('Something went wrong. Please try again.'); }
    finally { setLoading(false); }
  }

  async function handleForgotPassword(e: React.FormEvent) {
    e.preventDefault();
    setError(''); setSuccess('');
    setLoading(true);
    try {
      const res = await authApi.forgotPassword(email);
      if (res.success) setSuccess(res.message);
      else setError(res.message);
    } catch (err: any) { setError(err.message); }
    finally { setLoading(false); }
  }

  async function handleSendOtp(e: React.FormEvent) {
    e.preventDefault();
    if (!phone) return setError('Please enter a phone number.');
    setLoading(true); setError('');
    try {
      const cleanPhone = countryCode + phone.replace(/\s+/g, '');
      if (role === 'expert') {
        const res = await fetch('/api/auth/astrologer/request-otp', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ phone: cleanPhone }),
        }).then(r => r.json());
        if (!res.success) { setError(res.message || 'Failed to send OTP.'); return; }
        router.push(`/verify-otp?phone=${encodeURIComponent(cleanPhone)}&type=login&role=expert`);
      } else {
        const res = await (authApi as any).requestLoginOtp(cleanPhone, 'user');
        if (!res.success) { setError(res.message || 'Failed to send OTP.'); return; }
        router.push(`/verify-otp?phone=${encodeURIComponent(cleanPhone)}&type=login&role=user`);
      }
    } catch (err: any) { setError(err.message || 'Something went wrong sending OTP.'); }
    finally { setLoading(false); }
  }

  function handleGoogleSignIn() {
    const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || '';
    if (!clientId) { setError('Google Sign-In is not configured yet.'); return; }
    const redirectUri = encodeURIComponent(`${window.location.origin}/auth/google/callback`);
    const scope = encodeURIComponent('openid email profile');
    const stateParam = role === 'expert' ? 'expert_login' : 'user_login';
    window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=id_token&scope=${scope}&state=${stateParam}&nonce=${Math.random().toString(36)}`;
  }

  const inputCls = 'w-full h-12 rounded-xl border border-purple-200 bg-[#f9f7ff] px-4 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition';

  return (
    <div className="min-h-screen bg-[#f9f7ff] flex flex-col md:flex-row font-sans">

      {/* Left — Branding */}
      <div className="hidden md:flex flex-col justify-between w-1/2 p-12 bg-gradient-to-br from-indigo-500 via-indigo-600 to-purple-700 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-900/20 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10">
          <Link href="/" className="flex items-center gap-2 mb-16">
            <Image src="/center_logo_final.png" alt="ZenAuraa" width={36} height={36} className="rounded-full shadow-[0_0_15px_rgba(214,180,107,0.5)]" />
            <span className="text-2xl font-extrabold text-white tracking-wide uppercase">ZenAuraa</span>
          </Link>
          <h1 className="text-4xl lg:text-5xl font-extrabold text-white mb-6 leading-tight">
            Welcome back to <br /> your journey.
          </h1>
          <p className="text-lg text-indigo-100 max-w-md leading-relaxed mb-12">
            Join 50,000+ members receiving guidance from world-class verified practitioners.
          </p>
          <div className="space-y-8">
            <div className="flex items-center gap-5">
              <div className="w-12 h-12 rounded-full bg-white/10 border border-white/20 flex items-center justify-center">
                <ShieldCheck className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-white font-semibold">100% Private & Secure</p>
                <p className="text-sm text-indigo-100">Your data and conversations are encrypted.</p>
              </div>
            </div>
            <div className="flex items-center gap-5">
              <div className="w-12 h-12 rounded-full bg-white/10 border border-white/20 flex items-center justify-center">
                <Star className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-white font-semibold">Verified Experts</p>
                <p className="text-sm text-indigo-100">Rigorous 5-step background checks.</p>
              </div>
            </div>
          </div>
        </div>
        <div className="relative z-10 mt-auto pt-12 border-t border-white/20">
          <p className="text-indigo-100 text-sm">© 2026 Tara Infotech. All rights reserved.</p>
        </div>
      </div>

      {/* Right — Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-6 md:p-12 relative z-10">
        <div className="absolute top-6 left-6 md:hidden">
          <Link href="/" className="flex items-center gap-2">
            <Image src="/logo.png" alt="ZenAuraa" width={28} height={28} className="rounded-full" />
            <span className="text-xl font-extrabold text-indigo-500">ZenAuraa</span>
          </Link>
        </div>

        <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-purple-100 p-8">
          <h2 className="text-2xl font-extrabold text-gray-900 mb-1">
            {mode === 'login' ? 'Log in to your account' : 'Reset your password'}
          </h2>
          <p className="text-gray-500 text-sm mb-6">
            {mode === 'login' ? 'Welcome back! Enter your credentials to continue.' : 'Enter your email to receive a password reset link.'}
          </p>

          {error && (
            <div className="mb-5 p-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm space-y-2">
              <p>{error}</p>
              {verifyUrl && (
                <a href={verifyUrl} className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-indigo-500 hover:bg-indigo-600 text-white font-bold text-xs shadow transition-all">
                  ✦ Click Here to Verify Email Now →
                </a>
              )}
            </div>
          )}
          {success && <div className="mb-5 p-3 bg-green-50 border border-green-200 rounded-xl text-green-700 text-sm">{success}</div>}

          {mode === 'login' && (
            <>
              {/* User / Expert toggle */}
              <div className="mb-4">
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1.5">Account Type</p>
                <div className="flex rounded-xl border border-purple-200 bg-[#f9f7ff] p-1 gap-1">
                  <button type="button" onClick={() => { setRole('user'); setError(''); }}
                    className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                      role === 'user' ? 'bg-indigo-500 text-white shadow' : 'text-gray-500 hover:text-indigo-500'}`}>
                    <User className="w-4 h-4" /> User
                  </button>
                  <button type="button" onClick={() => { setRole('expert'); setError(''); }}
                    className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                      role === 'expert' ? 'bg-indigo-500 text-white shadow' : 'text-gray-500 hover:text-indigo-500'}`}>
                    <Sparkles className="w-4 h-4" /> Expert
                  </button>
                </div>
              </div>

              {/* Email / Phone toggle */}
              <div className="mb-5">
                <p className="text-xs font-medium text-gray-500 mb-1.5">Login Method</p>
                <div className="inline-flex rounded-lg border border-gray-200 bg-gray-50 p-0.5 gap-0.5">
                  <button type="button" onClick={() => { setLoginMethod('password'); setError(''); setSuccess(''); }}
                    className={`px-6 py-2 rounded-md text-sm font-medium transition-all ${
                      loginMethod === 'password' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}>
                    Email
                  </button>
                  <button type="button" onClick={() => { setLoginMethod('otp'); setError(''); setSuccess(''); }}
                    className={`px-6 py-2 rounded-md text-sm font-medium transition-all ${
                      loginMethod === 'otp' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}>
                    Phone
                  </button>
                </div>
              </div>
            </>
          )}

          {/* Email + Password form */}
          {mode === 'login' && loginMethod === 'password' && (
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3.5 h-4 w-4 text-gray-400" />
                  <input className={inputCls + ' pl-10'} type="email" placeholder="you@example.com" value={email} onChange={e => setEmail(e.target.value)} required autoComplete="email" />
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-sm font-semibold text-gray-700">Password</label>
                  <button type="button" onClick={() => { setMode('forgot'); setError(''); setSuccess(''); }}
                    className="text-xs text-indigo-500 hover:underline font-semibold">Forgot password?</button>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-3.5 h-4 w-4 text-gray-400" />
                  <input className={inputCls + ' pl-10 pr-11'} type={showPassword ? 'text' : 'password'} placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)} required autoComplete="current-password" />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-3.5 text-gray-400 hover:text-gray-600" tabIndex={-1}>
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>
              <button type="submit" disabled={loading}
                className="w-full h-12 bg-indigo-500 hover:bg-indigo-600 disabled:opacity-60 text-white font-bold rounded-full text-sm shadow-lg flex items-center justify-center gap-2 transition-colors">
                {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <>{role === 'expert' ? 'Log in as Expert' : 'Log in'} <ArrowRight className="h-4 w-4" /></>}
              </button>
            </form>
          )}

          {/* Phone + OTP form */}
          {mode === 'login' && loginMethod === 'otp' && (
            <form onSubmit={handleSendOtp} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Phone Number</label>
                <div className="flex gap-2">
                  <div className="w-1/3">
                    <input
                      list="country-codes"
                      value={countryCode}
                      onChange={e => setCountryCode(e.target.value)}
                      placeholder="+91"
                      required
                      className={inputCls + ' px-3'}
                    />
                    <datalist id="country-codes">
                      {countryCodes.map((c, i) => (
                        <option key={i} value={c.code}>{c.flag} {c.name} ({c.code})</option>
                      ))}
                    </datalist>
                  </div>
                  <input className={inputCls + ' flex-1'} type="tel" placeholder="9876543210" value={phone} onChange={e => setPhone(e.target.value)} required />
                </div>
              </div>
              <button type="submit" disabled={loading}
                className="w-full h-12 bg-indigo-500 hover:bg-indigo-600 disabled:opacity-60 text-white font-bold rounded-full text-sm shadow-lg flex items-center justify-center gap-2 transition-colors">
                {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <>Send OTP <ArrowRight className="h-4 w-4" /></>}
              </button>
            </form>
          )}

          {/* Forgot password form */}
          {mode === 'forgot' && (
            <form onSubmit={handleForgotPassword} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3.5 h-4 w-4 text-gray-400" />
                  <input className={inputCls + ' pl-10'} type="email" placeholder="you@example.com" value={email} onChange={e => setEmail(e.target.value)} required />
                </div>
              </div>
              <button type="submit" disabled={loading}
                className="w-full h-12 bg-indigo-500 hover:bg-indigo-600 disabled:opacity-60 text-white font-bold rounded-full text-sm shadow-lg flex items-center justify-center gap-2 transition-colors">
                {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Send Reset Link'}
              </button>
              <button type="button" onClick={() => { setMode('login'); setError(''); setSuccess(''); }}
                className="w-full text-center text-sm text-indigo-500 hover:underline font-semibold">
                ← Back to login
              </button>
            </form>
          )}

          {mode === 'login' && (
            <>
              <div className="relative flex items-center py-4">
                <div className="flex-grow border-t border-purple-100" />
                <span className="flex-shrink-0 mx-4 text-gray-400 text-xs uppercase tracking-wider">Or continue with</span>
                <div className="flex-grow border-t border-purple-100" />
              </div>

              <div className="space-y-3">
                <button type="button" onClick={handleGoogleSignIn}
                  className="w-full h-12 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 font-semibold rounded-xl text-sm shadow-sm flex items-center justify-center gap-2 transition-colors">
                  <svg className="h-5 w-5" viewBox="0 0 24 24">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                  </svg>
                  Continue with Google
                </button>
                <button type="button" onClick={() => setError('Apple Sign-In requires native SDK configuration.')}
                  className="w-full h-12 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 font-semibold rounded-xl text-sm shadow-sm flex items-center justify-center gap-2 transition-colors">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.04 2.26-.79 3.59-.76 1.65.04 2.9.72 3.68 1.9-3.28 1.95-2.73 5.75.52 7.02-.75 1.86-1.74 3.2-2.87 3.99zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.32 2.38-2.07 4.29-3.74 4.25z" />
                  </svg>
                  Continue with Apple
                </button>
              </div>

              <p className="text-center text-sm text-gray-500 mt-5">
                Don&apos;t have an account?{' '}
                <Link href="/signup" className="text-indigo-500 font-semibold hover:underline">Sign up</Link>
              </p>
              <p className="text-center text-xs text-gray-400 mt-2">
                By continuing, you agree to our{' '}
                <Link href="/terms" className="hover:underline">Terms of Service</Link>{' '}and{' '}
                <Link href="/privacy" className="hover:underline">Privacy Policy</Link>.
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#f9f7ff] flex items-center justify-center"><Loader2 className="w-8 h-8 text-indigo-500 animate-spin" /></div>}>
      <LoginInner />
    </Suspense>
  );
}
