'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Mail, Lock, ArrowRight, ShieldCheck, Star, Eye, EyeOff, Loader2, User, Sparkles } from 'lucide-react';
import GhostFibers from '@/components/GhostFibers';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { authApi, tokenStore } from '@/lib/api';
import { CountryCodeSelect } from '@/components/ui/country-code-select';

type Role = 'user' | 'expert';
type Mode = 'login' | 'forgot';

function LoginInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [role, setRole] = useState<Role>(() => {
    // Will be updated from searchParams in useEffect
    return 'user';
  });

  // Redirect already-logged-in users & read role from URL
  useEffect(() => {
    // Don't auto-redirect if there's an error param (e.g. not_registered from Google)
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

  const [mode, setMode] = useState<Mode>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [countryCode, setCountryCode] = useState('+91');
  const [phone, setPhone] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [verifyUrl, setVerifyUrl] = useState<string | null>(null);
  const [loginMethod, setLoginMethod] = useState<'password' | 'otp'>('password');

  // Check for error parameters from Google OAuth callback
  useEffect(() => {
    if (searchParams) {
      const errorType = searchParams.get('error');
      const errorDetails = searchParams.get('details');
      
      if (errorType) {
        let errorMessage = 'Authentication failed';
        switch (errorType) {
          case 'oauth_error':
            errorMessage = `Google OAuth error: ${errorDetails || 'Access denied'}`;
            break;
          case 'no_token':
            errorMessage = 'Google authentication did not return a valid token';
            break;
          case 'auth_failed':
            errorMessage = `Authentication failed: ${errorDetails || 'Invalid credentials'}`;
            break;
          case 'callback_failed':
            errorMessage = `Callback processing failed: ${errorDetails || 'Unknown error'}`;
            break;
          case 'not_registered':
            errorMessage = 'No expert account found for this Google account. Please sign up first.';
            break;
        }
        setError(errorMessage);
        
        // Clear the error from URL
        const newUrl = new URL(window.location.href);
        newUrl.searchParams.delete('error');
        newUrl.searchParams.delete('details');
        window.history.replaceState({}, '', newUrl.toString());
      }
    }
  }, [searchParams]);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setSuccess('');
    setVerifyUrl(null);
    setLoading(true);
    try {
      if (role === 'expert') {
        // Expert login
        const res = await authApi.practitionerLogin(email, password);

        if (!res.success || !res.data) {
          setError(res.message || 'Invalid email or password.');
          return;
        }

        // Store expert tokens
        tokenStore.setTokens(res.data.accessToken, res.data.refreshToken);
        localStorage.setItem('hc_role', 'practitioner');
        if (res.data.practitioner) {
          localStorage.setItem('hc_practitioner_id', res.data.practitioner.id);
          localStorage.setItem('hc_pid', res.data.practitioner.id);
          localStorage.setItem('hc_practitioner_name', res.data.practitioner.name ?? '');
        }
        
        // Redirect to dashboard
        router.push('/expert/dashboard');
      } else {
        // User login
        const res = await authApi.login({ email, password });
        if (!res.success || !res.data) {
          setError(res.message || 'Login failed');
          if (res.code === 'UNVERIFIED_ACCOUNT' && (res as any).data?.verifyUrl) {
            setVerifyUrl((res as any).data.verifyUrl);
          }
          return;
        }
        tokenStore.setTokens(res.data.accessToken, res.data.refreshToken);
        localStorage.removeItem('hc_role');
        localStorage.removeItem('hc_practitioner_id');
        localStorage.removeItem('hc_pid');
        localStorage.removeItem('hc_practitioner_name');
        router.push('/dashboard');
      }
    } catch { setError('Something went wrong. Please try again.'); }
    finally { setLoading(false); }
  }

  async function handleForgotPassword(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');
    try {
      const res = await authApi.forgotPassword(email);
      if (res.success) {
        setSuccess(res.message);
      } else {
        setError(res.message);
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleSendOtp(e: React.FormEvent) {
    e.preventDefault();
    if (!phone) return setError('Please enter a phone number.');
    if (!countryCode) return setError('Please select a country code.');
    setLoading(true);
    setError('');
    try {
      let rawNumber = phone.replace(/\s+/g, '');
      if (rawNumber.startsWith('+')) {
        rawNumber = rawNumber.replace(/^\+/, '');
        const codeDigits = countryCode.replace('+', '');
        if (rawNumber.startsWith(codeDigits)) {
          rawNumber = rawNumber.slice(codeDigits.length);
        }
      } else if (rawNumber.length > 10 && rawNumber.startsWith(countryCode.replace('+', ''))) {
        rawNumber = rawNumber.slice(countryCode.replace('+', '').length);
      }
      const cleanPhone = `${countryCode}${rawNumber}`;
      
      if (role === 'expert') {
        // Expert OTP login
        const res = await fetch('/api/auth/astrologer/request-otp', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ phone: cleanPhone }),
        }).then(r => r.json());
        
        if (!res.success) {
          setError(res.message || 'Failed to send OTP.');
          return;
        }
        router.push(`/verify-otp?phone=${encodeURIComponent(cleanPhone)}&type=login&role=expert`);
      } else {
        // User OTP login
        const res = await (authApi as any).requestLoginOtp(cleanPhone, 'user');
        if (!res.success) {
          setError(res.message || 'Failed to send OTP.');
          return;
        }
        router.push(`/verify-otp?phone=${encodeURIComponent(cleanPhone)}&type=login&role=user`);
      }
    } catch (err: any) {
      setError(err.message || 'Something went wrong sending OTP.');
    } finally {
      setLoading(false);
    }
  }

  function handleGoogleSignIn() {
    const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || '';
    if (!clientId) { setError('Google Sign-In is not configured yet.'); return; }
    const redirectUri = encodeURIComponent(`${window.location.origin}/auth/google/callback`);
    const scope = encodeURIComponent('openid email profile');
    const state = role === 'expert' ? 'expert_login' : 'user';
    window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=id_token&scope=${scope}&state=${state}&nonce=${Math.random().toString(36)}`;
  }

  function handleAppleSignIn() {
    setError('Apple Sign-In requires native SDK configuration.');
  }

    return (
    <div className="relative min-h-screen w-full font-sans overflow-hidden bg-[#0C0514] flex items-center justify-center p-4">
      <div className="absolute inset-0 z-0">
        <GhostFibers
          lineColor="#885dd1"
          glowColor="#9465c2"
          speed={0.2}
          scale={1.58}
          rotation={-32}
          rotationSpeed={0.25}
          layers={6}
          waveAmplitude={0.015}
          waveFrequency={2}
          waveSpeed={-1.15}
          layerSpeed={-0.04}
          twist={0.1}
          twistFrequency={6.8}
          twistSpeed={1.2}
          lineFrequency={5}
          lineSpacing={2.65}
          lineSharpness={16}
          glowFalloff={10}
          glowIntensity={1.6}
          brightness={2}
          blueBoost={1.25}
          lightMode={false}
        />
      </div>

      <div className="relative z-10 w-full max-w-md">
        <div className="flex justify-center mb-8">
          <Link href="/" className="flex items-center gap-2">
            <Image src="/logo.png" alt="ZenAuraa" width={42} height={42} className="rounded-full shadow-lg" />
            <span className="text-3xl font-extrabold text-white tracking-wide">ZenAuraa</span>
          </Link>
        </div>

        <Card className="w-full bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl rounded-3xl">
          <CardHeader className="space-y-2 pb-6">
            <CardTitle className="text-2xl font-extrabold text-white">
              {mode === 'login' ? 'Log in to your account' : 'Reset your password'}
            </CardTitle>
            <CardDescription className="text-gray-300 text-base">
              {mode === 'login' ? 'Welcome back! Enter your credentials to continue.' : 'Enter your email to receive a password reset link.'}
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-5">
            {error && (
              <div className="rounded-xl bg-red-50 border border-red-200 p-4 text-sm text-red-700 space-y-2">
                <p className="font-semibold">{error}</p>
                {verifyUrl && (
                  <a
                    href={verifyUrl}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#4f46e5] hover:bg-[#4338ca] text-white font-bold text-xs shadow-md transition-all"
                  >
                    ✦ Click Here to Verify Email Now →
                  </a>
                )}
              </div>
            )}
            {success && <div className="rounded-lg bg-green-50 border border-green-200 px-4 py-3 text-sm text-green-700">{success}</div>}

            {mode === 'login' && (
              <>
                {/* User/Expert Toggle - Bold & Prominent */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-medium text-gray-300 uppercase tracking-wide">Account Type</label>
                  <div className="flex rounded-2xl border-2 border-[#4f46e5]/20 overflow-hidden bg-white/5 p-1.5 gap-2 shadow-sm">
                    <button
                      type="button"
                      onClick={() => setRole('user')}
                      className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-base font-bold transition-all ${
                        role === 'user' 
                          ? 'bg-gradient-to-br from-[#4f46e5] to-[#4338ca] text-white shadow-lg scale-[1.02]' 
                          : 'text-gray-300 hover:text-[#4f46e5] hover:bg-white/50'
                      }`}
                    >
                      {role === 'user' && '✦ '}User
                    </button>
                    <button
                      type="button"
                      onClick={() => setRole('expert')}
                      className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-base font-bold transition-all ${
                        role === 'expert' 
                          ? 'bg-gradient-to-br from-[#4f46e5] to-[#4338ca] text-white shadow-lg scale-[1.02]' 
                          : 'text-gray-300 hover:text-[#4f46e5] hover:bg-white/50'
                      }`}
                    >
                      {role === 'expert' && '✦ '}Expert
                    </button>
                  </div>
                </div>

                {/* Email/Phone Toggle - Subtle & Clean */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-medium text-gray-300">Login Method</label>
                  <div className="inline-flex rounded-lg border border-gray-200 overflow-hidden bg-gray-50 p-0.5 gap-0.5">
                    <button 
                      type="button" 
                      onClick={() => { setLoginMethod('password'); setError(''); setSuccess(''); }}
                      className={`px-6 py-2 rounded-md text-sm font-medium transition-all ${
                        loginMethod === 'password' 
                          ? 'bg-white/20 text-white shadow-sm' 
                          : 'text-gray-300 hover:text-gray-700'
                      }`}
                    >
                      Email
                    </button>
                    <button 
                      type="button" 
                      onClick={() => { setLoginMethod('otp'); setError(''); setSuccess(''); }}
                      className={`px-6 py-2 rounded-md text-sm font-medium transition-all ${
                        loginMethod === 'otp' 
                          ? 'bg-white/20 text-white shadow-sm' 
                          : 'text-gray-300 hover:text-gray-700'
                      }`}
                    >
                      Phone
                    </button>
                  </div>
                </div>
              </>
            )}

            {mode === 'login' && loginMethod === 'password' && (
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-white">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                    <Input id="email" type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required autoComplete="email" className="pl-10 h-12 border-white/20 focus-visible:ring-[#4f46e5] bg-white/10 text-white" />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password" className="text-white">Password</Label>
                    <button type="button" onClick={() => { setMode('forgot'); setError(''); setSuccess(''); }} className="text-sm text-[#4f46e5] hover:underline">Forgot password?</button>
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                    <Input id="password" type={showPassword ? 'text' : 'password'} placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} required autoComplete="current-password" className="pl-10 pr-10 h-12 border-white/20 focus-visible:ring-[#4f46e5] bg-white/10 text-white" />
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-3.5 text-gray-400 hover:text-gray-300" tabIndex={-1}>
                      {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                </div>
                <Button type="submit" disabled={loading} className="w-full bg-[#4f46e5] hover:bg-[#4338ca] text-white h-12 text-base font-bold rounded-full border-0 shadow-lg">
                  {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : <>Log in <ArrowRight className="ml-2 h-4 w-4" /></>}
                </Button>
              </form>
            )}

            {mode === 'login' && loginMethod === 'otp' && (
              <form onSubmit={handleSendOtp} className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-white">Phone Number</Label>
                  <div className="flex gap-2">
                    <CountryCodeSelect
                      value={countryCode}
                      onChange={setCountryCode}
                      className="w-[125px] sm:w-[135px] flex-shrink-0"
                    />
                    <Input id="phone" type="tel" placeholder="9876543210" value={phone} onChange={(e) => setPhone(e.target.value)} required className="flex-1 h-12 border-white/20 focus-visible:ring-[#4f46e5] bg-white/10 text-white" />
                  </div>
                </div>
                <Button type="submit" disabled={loading} className="w-full bg-[#4f46e5] hover:bg-[#4338ca] text-white h-12 text-base font-bold rounded-full border-0 shadow-lg">
                  {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : <>Send OTP <ArrowRight className="ml-2 h-4 w-4" /></>}
                </Button>
              </form>
            )}

            {mode === 'forgot' && (
              <form onSubmit={handleForgotPassword} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="reset-email" className="text-white">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                    <Input id="reset-email" type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required className="pl-10 h-12 border-white/20 focus-visible:ring-[#4f46e5] bg-white/10 text-white" />
                  </div>
                </div>
                <Button type="submit" disabled={loading} className="w-full bg-[#4f46e5] hover:bg-[#4338ca] text-white h-12 text-base font-bold rounded-full border-0">
                  {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : 'Send Reset Link'}
                </Button>
                <button type="button" onClick={() => { setMode('login'); setError(''); setSuccess(''); }} className="w-full text-center text-sm text-[#4f46e5] hover:underline">
                  ← Back to login
                </button>
              </form>
            )}

            {mode === 'login' && (
              <>
                <div className="relative flex items-center py-1">
                  <div className="flex-grow border-t border-white/20" />
                  <span className="flex-shrink-0 mx-4 text-gray-400 text-sm uppercase tracking-wider">Or continue with</span>
                  <div className="flex-grow border-t border-white/20" />
                </div>
                <div className="space-y-3">
                  <Button type="button" variant="outline" onClick={handleGoogleSignIn} className="w-full h-12 bg-white/10 border border-white/20 text-white hover:bg-white/20 text-white shadow-sm">
                    <svg className="mr-2 h-5 w-5" viewBox="0 0 24 24">
                      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                    </svg>
                    Continue with Google
                  </Button>
                  <Button type="button" variant="outline" onClick={handleAppleSignIn} className="w-full h-12 bg-white/10 border border-white/20 text-white hover:bg-white/20 text-white shadow-sm">
                    <svg className="mr-2 h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.04 2.26-.79 3.59-.76 1.65.04 2.9.72 3.68 1.9-3.28 1.95-2.73 5.75.52 7.02-.75 1.86-1.74 3.2-2.87 3.99zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.32 2.38-2.07 4.29-3.74 4.25z" />
                    </svg>
                    Continue with Apple
                  </Button>
                </div>
                <p className="text-center text-sm text-gray-300 pt-1">
                  Don&apos;t have an account?{' '}
                  <Link href="/signup" className="text-[#4f46e5] font-semibold hover:underline">Sign up</Link>
                </p>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense>
      <LoginInner />
    </Suspense>
  );
}
