'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Mail, Lock, User, ArrowRight, ShieldCheck, Star, Eye, EyeOff, Loader2, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { authApi, tokenStore } from '@/lib/api';

type Role = 'user' | 'expert';

export default function SignupPage() {
  const router = useRouter();
  const [role, setRole] = useState<Role>('user');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);
    const pwdOk = /^(?=.*[A-Z])(?=.*\d).{8,}$/.test(password);
    if (!pwdOk) { setError('Password must be min. 8 chars, 1 uppercase, 1 number.'); setLoading(false); return; }
    try {
      if (role === 'expert') {
        const res = await authApi.practitionerRegister(name, email, password);
        if (!res.success || !res.data) {
          setError(res.message || 'Registration failed');
          return;
        }
        tokenStore.setTokens(res.data.accessToken, res.data.refreshToken);
        localStorage.setItem('hc_role', 'practitioner');
        localStorage.setItem('hc_practitioner_id', res.data.practitioner.id);
        localStorage.setItem('hc_practitioner_name', res.data.practitioner.name ?? '');
        setSuccess('Expert account created!');
        setTimeout(() => router.push('/expert/dashboard'), 1500);
      } else {
        const res = await authApi.register({ name, email, password });
        if (!res.success || !res.data) {
          setError(res.errors?.length ? res.errors.map((e) => e.message).join(' · ') : res.message || 'Registration failed');
          return;
        }
        tokenStore.setTokens(res.data.accessToken, res.data.refreshToken);
        localStorage.removeItem('hc_role');
        setSuccess('Account created!');
        setTimeout(() => router.push('/dashboard'), 1500);
      }
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
    <div className="min-h-screen bg-background text-foreground flex flex-col md:flex-row font-sans relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(214,180,107,0.15)_0%,rgba(0,0,0,0)_70%)] blur-[120px]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(46,196,182,0.1)_0%,rgba(0,0,0,0)_70%)] blur-[120px]" />
      </div>

      {/* Left — Branding */}
      <div className="hidden md:flex flex-col justify-between w-1/2 p-12 bg-black/5 dark:bg-black/20 backdrop-blur-md relative z-10 border-r border-border">
        <div className="relative z-10">
          <Link href="/" className="flex items-center gap-2 mb-16">
            <Image src="/logo.png" alt="Zenauraa" width={36} height={36} className="rounded-full shadow-[0_0_15px_rgba(214,180,107,0.5)]" />
            <span className="text-2xl font-extrabold text-foreground tracking-wide uppercase">Zenauraa</span>
          </Link>
          <h1 className="text-4xl lg:text-5xl font-extrabold text-foreground mb-6 leading-tight">
            Create your space <br /> <span className="text-primary">for healing.</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-md leading-relaxed mb-12">
            Join 50,000+ members receiving guidance from world-class verified practitioners.
          </p>
          <div className="space-y-8">
            <div className="flex items-center gap-5">
              <div className="w-12 h-12 rounded-full bg-white/5 border border-border flex items-center justify-center shadow-[0_0_15px_rgba(46,196,182,0.2)]">
                <ShieldCheck className="w-6 h-6 text-accent" />
              </div>
              <div>
                <p className="text-foreground font-semibold text-lg tracking-wide">100% Private & Secure</p>
                <p className="text-sm text-muted-foreground mt-1">Your data and conversations are encrypted.</p>
              </div>
            </div>
            <div className="flex items-center gap-5">
              <div className="w-12 h-12 rounded-full bg-white/5 border border-border flex items-center justify-center shadow-[0_0_15px_rgba(214,180,107,0.2)]">
                <Star className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-foreground font-semibold text-lg tracking-wide">Verified Experts</p>
                <p className="text-sm text-muted-foreground mt-1">Rigorous 5-step background checks.</p>
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
            <Image src="/logo.png" alt="Zenauraa" width={28} height={28} className="rounded-full shadow-[0_0_10px_rgba(214,180,107,0.5)]" />
            <span className="text-xl font-extrabold text-primary uppercase tracking-wide">Zenauraa</span>
          </Link>
        </div>

        <Card className="w-full max-w-md bg-card/80 dark:bg-card/80 backdrop-blur-xl border border-border shadow-2xl rounded-2xl overflow-hidden">
          <CardHeader className="space-y-2 pb-6 border-b border-border bg-black/5 dark:bg-white/5">
            <CardTitle className="text-2xl font-bold text-foreground tracking-wide">Create your account</CardTitle>
            <CardDescription className="text-muted-foreground text-base">Enter your details to get started.</CardDescription>
          </CardHeader>

          <CardContent className="space-y-6 pt-6">
            {/* Role Toggle */}
            <div className="flex rounded-xl border border-border overflow-hidden bg-black/5 dark:bg-black/50 p-1 gap-1">
              <button type="button" onClick={() => { setRole('user'); setError(''); }}
                className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg text-sm font-semibold transition-all duration-300 ${
                  role === 'user' ? 'bg-primary text-primary-foreground shadow-[0_0_15px_rgba(214,180,107,0.4)]' : 'text-muted-foreground hover:text-foreground hover:bg-black/5 dark:hover:bg-white/5'}`}>
                <User className="w-4 h-4" /> User
              </button>
              <button type="button" onClick={() => { setRole('expert'); setError(''); }}
                className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg text-sm font-semibold transition-all duration-300 ${
                  role === 'expert' ? 'bg-primary text-primary-foreground shadow-[0_0_15px_rgba(214,180,107,0.4)]' : 'text-muted-foreground hover:text-foreground hover:bg-black/5 dark:hover:bg-white/5'}`}>
                <Sparkles className="w-4 h-4" /> Expert
              </button>
            </div>

            {error && <div className="rounded-lg bg-red-900/20 border border-red-500/50 px-4 py-3 text-sm text-red-400 flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"/>{error}</div>}
            {success && (
              <div className="rounded-lg bg-green-900/20 border border-green-500/50 px-4 py-3 text-sm text-green-400">
                <p className="font-semibold flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"/> {success}</p>
                <p className="text-green-500/80 mt-1 pl-4">Please verify your email. Redirecting...</p>
              </div>
            )}

            <form onSubmit={handleRegister} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-foreground font-medium">Full Name</Label>
                <div className="relative group">
                  <User className="absolute left-3 top-3.5 h-5 w-5 text-muted-foreground group-focus-within:text-accent transition-colors" />
                  <Input id="name" type="text" placeholder="John Doe" value={name} onChange={(e) => setName(e.target.value)} required autoComplete="name" 
                    className="pl-10 h-12 border-border focus-visible:ring-accent focus-visible:border-accent bg-background text-foreground placeholder:text-muted-foreground transition-all" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-foreground font-medium">Email</Label>
                <div className="relative group">
                  <Mail className="absolute left-3 top-3.5 h-5 w-5 text-muted-foreground group-focus-within:text-accent transition-colors" />
                  <Input id="email" type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required autoComplete="email" 
                    className="pl-10 h-12 border-border focus-visible:ring-accent focus-visible:border-accent bg-background text-foreground placeholder:text-muted-foreground transition-all" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="text-foreground font-medium">Password</Label>
                <div className="relative group">
                  <Lock className="absolute left-3 top-3.5 h-5 w-5 text-muted-foreground group-focus-within:text-accent transition-colors" />
                  <Input id="password" type={showPassword ? 'text' : 'password'} placeholder="Min. 8 chars, 1 uppercase, 1 number" value={password} onChange={(e) => setPassword(e.target.value)} required autoComplete="new-password" 
                    className="pl-10 pr-10 h-12 border-border focus-visible:ring-accent focus-visible:border-accent bg-background text-foreground placeholder:text-muted-foreground transition-all" />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-3.5 text-muted-foreground hover:text-foreground transition-colors" tabIndex={-1}>
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
                {password.length > 0 && password.length < 8 && (
                  <p className="text-xs text-destructive mt-1">Password must be at least 8 characters</p>
                )}
              </div>
              <Button type="submit" disabled={loading || !!success} className="w-full h-12 text-base font-bold rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg transition-all duration-300">
                {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : <>{role === 'expert' ? 'Join as Expert' : 'Create Account'} <ArrowRight className="ml-2 h-5 w-5" /></>}
              </Button>
            </form>

            <div className="relative flex items-center py-2">
              <div className="flex-grow border-t border-border" />
              <span className="flex-shrink-0 mx-4 text-muted-foreground text-xs uppercase tracking-widest font-semibold">Or continue with</span>
              <div className="flex-grow border-t border-border" />
            </div>

            <div className="space-y-3">
              <Button type="button" variant="outline" onClick={handleGoogleSignIn} className="w-full h-12 bg-background border-border hover:bg-accent/10 text-foreground shadow-sm transition-all rounded-xl">
                <svg className="mr-3 h-5 w-5" viewBox="0 0 24 24">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                </svg>
                Continue with Google
              </Button>
              <Button type="button" variant="outline" onClick={handleAppleSignIn} className="w-full h-12 bg-background border-border hover:bg-accent/10 text-foreground shadow-sm transition-all rounded-xl">
                <svg className="mr-3 h-5 w-5 fill-current" viewBox="0 0 24 24">
                  <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.04 2.26-.79 3.59-.76 1.65.04 2.9.72 3.68 1.9-3.28 1.95-2.73 5.75.52 7.02-.75 1.86-1.74 3.2-2.87 3.99zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.32 2.38-2.07 4.29-3.74 4.25z" />
                </svg>
                Continue with Apple
              </Button>
            </div>

            <p className="text-center text-sm text-muted-foreground pt-4">
              Already have an account?{' '}
              <Link href="/login" className="text-primary font-semibold hover:text-primary/90 transition-colors hover:underline">Log in</Link>
            </p>
            <p className="text-center text-xs text-muted-foreground">
              By continuing, you agree to our{' '}
              <Link href="#" className="hover:text-foreground hover:underline">Terms of Service</Link>{' '}and{' '}
              <Link href="#" className="hover:text-foreground hover:underline">Privacy Policy</Link>.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
