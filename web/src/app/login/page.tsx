'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Mail, Lock, ArrowRight, ShieldCheck, Star, Eye, EyeOff, Loader2, User, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { authApi, tokenStore } from '@/lib/api';

type Role = 'user' | 'expert';
type Mode = 'login' | 'forgot';

function LoginInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [role, setRole] = useState<Role>('user');

  useEffect(() => {
    if (searchParams.get('role') === 'expert') setRole('expert');
  }, [searchParams]);
  const [mode, setMode] = useState<Mode>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      if (role === 'expert') {
        const res = await authApi.practitionerLogin(email, password);
        if (!res.success || !res.data) { setError(res.message || 'Login failed'); return; }
        tokenStore.setTokens(res.data.accessToken, res.data.refreshToken);
        localStorage.setItem('hc_role', 'practitioner');
        localStorage.setItem('hc_practitioner_id', res.data.practitioner.id);
        localStorage.setItem('hc_practitioner_name', res.data.practitioner.name ?? '');
        router.push('/expert/dashboard');
      } else {
        const res = await authApi.login({ email, password });
        if (!res.success || !res.data) { setError(res.message || 'Login failed'); return; }
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
    setError('');
    setLoading(true);
    try {
      const res = await authApi.forgotPassword(email);
      setSuccess(res.message || 'Check your email for a reset link.');
    } catch { setError('Something went wrong. Please try again.'); }
    finally { setLoading(false); }
  }

  function handleGoogleSignIn() {
    const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || '';
    if (!clientId) { setError('Google Sign-In is not configured yet.'); return; }
    const redirectUri = encodeURIComponent(`${window.location.origin}/auth/google/callback`);
    const scope = encodeURIComponent('openid email profile');
    window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=id_token&scope=${scope}&nonce=${Math.random().toString(36)}`;
  }

  function handleAppleSignIn() {
    setError('Apple Sign-In requires native SDK configuration.');
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#301368] via-[#5F3BA9] to-[#D5B6DC] text-white flex flex-col md:flex-row font-sans relative overflow-hidden">


      {/* Left — Branding */}
      <div className="hidden md:flex flex-col justify-between w-1/2 p-12 bg-black/5 dark:bg-black/20 backdrop-blur-md relative z-10 border-r border-border">
        <div className="relative z-10">
          <Link href="/" className="flex items-center gap-2 mb-16">
            <Image src="/center_logo_final.png" alt="ZenAuraa" width={36} height={36} className="rounded-full shadow-[0_0_15px_rgba(214,180,107,0.5)]" />
            <span className="text-2xl font-extrabold text-white tracking-wide uppercase">ZenAuraa</span>
          </Link>
          <h1 className="text-4xl lg:text-5xl font-extrabold text-white mb-6 leading-tight">
            Begin your journey <br /> <span className="text-[#FAD058]">to inner peace.</span>
          </h1>
          <p className="text-lg text-white/90 max-w-md leading-relaxed mb-12">
            Join 50,000+ members receiving guidance from world-class verified practitioners.
          </p>
          <div className="space-y-8">
            <div className="flex items-center gap-5">
              <div className="w-12 h-12 rounded-full bg-white/5 border border-border flex items-center justify-center shadow-[0_0_15px_rgba(46,196,182,0.2)]">
                <ShieldCheck className="w-6 h-6 text-accent" />
              </div>
              <div>
                <p className="text-white font-semibold text-lg tracking-wide">100% Private & Secure</p>
                <p className="text-sm text-white/80 mt-1">Your data and conversations are encrypted.</p>
              </div>
            </div>
            <div className="flex items-center gap-5">
              <div className="w-12 h-12 rounded-full bg-white/5 border border-border flex items-center justify-center shadow-[0_0_15px_rgba(214,180,107,0.2)]">
                <Star className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-white font-semibold text-lg tracking-wide">Verified Experts</p>
                <p className="text-sm text-white/80 mt-1">Rigorous 5-step background checks.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="relative z-10 mt-auto pt-12 border-t border-border">
          <p className="text-muted-foreground text-sm tracking-wider uppercase">© 2026 Tara Infotech. All rights reserved.</p>
        </div>
      </div>

      {/* Right — Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-6 md:p-12 relative z-10">
        <div className="absolute top-6 left-6 md:hidden">
          <Link href="/" className="flex items-center gap-2">
            <Image src="/center_logo_final.png" alt="ZenAuraa" width={28} height={28} className="rounded-full shadow-[0_0_10px_rgba(214,180,107,0.5)]" />
            <span className="text-xl font-extrabold text-primary uppercase tracking-wide">ZenAuraa</span>
          </Link>
        </div>

        <Card className="w-full max-w-md bg-card/80 dark:bg-card/80 backdrop-blur-xl border border-border shadow-2xl rounded-2xl overflow-hidden">
          <CardHeader className="space-y-2 pb-6 border-b border-border bg-black/5 dark:bg-white/5">
            <CardTitle className="text-2xl font-bold text-foreground tracking-wide">
              {mode === 'login' ? 'Log in to your account' : 'Reset your password'}
            </CardTitle>
            <CardDescription className="text-muted-foreground text-base">
              {mode === 'login' ? 'Welcome back! Enter your credentials to continue.' : 'Enter your email to receive a password reset link.'}
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6 pt-6">
            {/* Role Toggle */}
            {mode === 'login' && (
              <div className="flex rounded-xl border border-border overflow-hidden bg-black/5 dark:bg-black/50 p-1 gap-1">
                <button type="button" onClick={() => { setRole('user'); setError(''); }}
                  className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg text-sm font-semibold transition-all duration-300 ${
                    role === 'user' ? 'bg-[#5F3BA9] text-white shadow-lg' : 'text-muted-foreground hover:text-foreground hover:bg-black/5 dark:hover:bg-white/5'}`}>
                  <User className="w-4 h-4" /> User
                </button>
                <button type="button" onClick={() => { setRole('expert'); setError(''); }}
                  className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg text-sm font-semibold transition-all duration-300 ${
                    role === 'expert' ? 'bg-[#5F3BA9] text-white shadow-lg' : 'text-muted-foreground hover:text-foreground hover:bg-black/5 dark:hover:bg-white/5'}`}>
                  <Sparkles className="w-4 h-4" /> Expert
                </button>
              </div>
            )}

            {error && <div className="rounded-lg bg-red-900/20 border border-red-500/50 px-4 py-3 text-sm text-red-400 flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"/>{error}</div>}
            {success && <div className="rounded-lg bg-green-900/20 border border-green-500/50 px-4 py-3 text-sm text-green-400 flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"/>{success}</div>}

            {mode === 'login' && (
              <form onSubmit={handleLogin} className="space-y-5">
                <div className="space-y-2">
                  <Label className="text-foreground">Email address</Label>
                  <div className="relative group">
                    <Mail className="absolute left-3 top-3 h-5 w-5 text-muted-foreground group-focus-within:text-accent transition-colors" />
                    <Input type="email" required placeholder="you@example.com" value={email} onChange={e => setEmail(e.target.value)}
                      className="pl-10 py-6 bg-input/50 border-input text-foreground placeholder:text-muted-foreground focus-visible:ring-accent focus-visible:border-accent rounded-xl" />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label className="text-foreground">Password</Label>
                    <button type="button" onClick={() => { setMode('forgot'); setError(''); setSuccess(''); }} className="text-sm font-semibold text-accent hover:text-accent/80 transition-colors">
                      Forgot password?
                    </button>
                  </div>
                  <div className="relative group">
                    <Lock className="absolute left-3 top-3 h-5 w-5 text-muted-foreground group-focus-within:text-accent transition-colors" />
                    <Input type={showPassword ? 'text' : 'password'} required placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)}
                      className="pl-10 pr-10 py-6 bg-input/50 border-input text-foreground placeholder:text-muted-foreground focus-visible:ring-accent focus-visible:border-accent rounded-xl" />
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-3 text-muted-foreground hover:text-foreground transition-colors">
                      {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                </div>
                <Button type="submit" disabled={loading} className="w-full py-6 text-base font-bold rounded-md border-0 shadow-lg transition-all duration-300 bg-[#FAD058] hover:bg-[#F0C240] text-[#2A1658]">
                  {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : <>{role === 'expert' ? 'Log in as Expert' : 'Log in'} <ArrowRight className="ml-2 h-5 w-5" /></>}
                </Button>
              </form>
            )}

            {mode === 'forgot' && (
              <form onSubmit={handleForgotPassword} className="space-y-5">
                <div className="space-y-2">
                  <Label className="text-foreground">Email address</Label>
                  <div className="relative group">
                    <Mail className="absolute left-3 top-3 h-5 w-5 text-muted-foreground group-focus-within:text-accent transition-colors" />
                    <Input type="email" required placeholder="you@example.com" value={email} onChange={e => setEmail(e.target.value)}
                      className="pl-10 py-6 bg-input/50 border-input text-foreground placeholder:text-muted-foreground focus-visible:ring-accent focus-visible:border-accent rounded-xl" />
                  </div>
                </div>
                <Button type="submit" disabled={loading} className="w-full py-6 rounded-xl bg-[#FAD058] hover:bg-[#F0C240] text-[#2A1658] font-bold text-lg shadow-lg transition-all group">
                  {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : 'Send Reset Link'}
                </Button>
                <button type="button" onClick={() => { setMode('login'); setError(''); setSuccess(''); }} className="w-full text-center text-sm text-muted-foreground hover:text-foreground transition-colors">
                  ← Back to login
                </button>
              </form>
            )}

            {mode === 'login' && (
              <>
                <div className="relative flex items-center py-2">
                  <div className="flex-grow border-t border-border" />
                  <span className="flex-shrink-0 mx-4 text-muted-foreground text-xs uppercase tracking-widest font-semibold">Or continue with</span>
                  <div className="flex-grow border-t border-border" />
                </div>
                <div className="space-y-3">
                  <Button type="button" variant="outline" onClick={handleGoogleSignIn} className="w-full py-6 bg-input/50 border-input hover:bg-white/10 text-foreground shadow-sm transition-all rounded-xl">
                    <svg className="mr-3 h-5 w-5" viewBox="0 0 24 24">
                      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                    </svg>
                    Continue with Google
                  </Button>
                  <Button type="button" variant="outline" onClick={handleAppleSignIn} className="w-full py-6 bg-input/50 border-input hover:bg-white/10 text-foreground shadow-sm transition-all rounded-xl">
                    <svg className="mr-3 h-5 w-5 fill-current" viewBox="0 0 24 24">
                      <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.04 2.26-.79 3.59-.76 1.65.04 2.9.72 3.68 1.9-3.28 1.95-2.73 5.75.52 7.02-.75 1.86-1.74 3.2-2.87 3.99zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.32 2.38-2.07 4.29-3.74 4.25z" />
                    </svg>
                    Continue with Apple
                  </Button>
                </div>
                <p className="text-center text-sm text-muted-foreground pt-4">
                  Don&apos;t have an account?{' '}
                  <Link href="/signup" className="text-primary font-semibold hover:text-foreground transition-colors hover:underline">Sign up</Link>
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
