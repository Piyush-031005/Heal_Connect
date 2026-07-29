'use client';

import { Suspense, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Lock, Eye, EyeOff, Loader2, CheckCircle2, XCircle, ShieldCheck, Mail, KeyRound, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const API_URL = process.env.NEXT_PUBLIC_API_URL || '';

function ResetPasswordContent() {
  const searchParams = useSearchParams();
  const router       = useRouter();
  const token        = searchParams.get('token') ?? '';

  const [email,           setEmail]           = useState('');
  const [password,        setPassword]        = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword,    setShowPassword]    = useState(false);
  const [showConfirm,     setShowConfirm]     = useState(false);
  const [loading,         setLoading]         = useState(false);
  const [status,          setStatus]          = useState<'idle' | 'success' | 'error'>('idle');
  const [message,         setMessage]         = useState('');
  const [error,           setError]           = useState('');
  const [success,         setSuccess]         = useState(false);

  // Live password strength checks
  const checks = {
    length:    password.length >= 8,
    uppercase: /[A-Z]/.test(password),
    number:    /[0-9]/.test(password),
  };
  const allValid = checks.length && checks.uppercase && checks.number;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    
    if (token) {
      if (!allValid) {
        setError('Please meet all password requirements.');
        return;
      }
      if (password !== confirmPassword) {
        setError('Passwords do not match.');
        return;
      }
    }

    setLoading(true);
    try {
      const endpoint = token ? '/api/auth/reset-password' : '/api/auth/forgot-password';
      const body = token ? { token, password } : { email };
      
      const res = await fetch(`${API_URL}${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      const data = await res.json();

      if (data.success) {
        setSuccess(true);
        if (token) {
          setMessage(data.message || 'Password reset successfully.');
          setTimeout(() => router.push('/login'), 3000);
        } else {
          setMessage(data.message || 'Reset link sent to your email.');
        }
      } else {
        setError(data.message || 'Action failed. Please try again.');
      }
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-full max-w-md relative z-10 space-y-8">
      <div className="text-center">
        <Link href="/" className="inline-flex items-center gap-2 mb-8 group">
          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-primary to-accent rounded-full blur opacity-20 group-hover:opacity-40 transition duration-500"></div>
            <Image src="/logo.png" alt="HealConnect" width={48} height={48} className="relative rounded-full shadow-[0_0_15px_rgba(214,180,107,0.5)]" />
          </div>
          <span className="text-2xl font-extrabold text-foreground tracking-wide uppercase">HealConnect</span>
        </Link>
      </div>

      <Card className="w-full bg-white/40 dark:bg-black/40 backdrop-blur-xl border border-border shadow-2xl rounded-2xl overflow-hidden">
        <CardHeader className="space-y-3 pb-6 border-b border-border bg-black/5 dark:bg-white/5 text-center">
          <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-2">
            <KeyRound className="w-6 h-6 text-primary" />
          </div>
          <CardTitle className="text-2xl font-bold text-foreground tracking-wide">
            {token ? 'Set New Password' : 'Reset Password'}
          </CardTitle>
          <CardDescription className="text-muted-foreground text-base px-4">
            {token 
              ? 'Create a strong new password for your account.' 
              : 'Enter your email address and we will send you a link to reset your password.'}
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-8 px-8 pb-8">
          {error && (
            <div className="rounded-lg bg-destructive/10 border border-destructive/20 px-4 py-3 text-sm text-destructive flex items-start gap-2 mb-6">
              <XCircle className="h-4 w-4 mt-0.5 shrink-0" />
              {error}
            </div>
          )}
          
          {success ? (
            <div className="text-center space-y-6 py-4">
              <div className="w-16 h-16 bg-success/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-8 h-8 text-success" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-semibold text-foreground tracking-wide">Check your inbox</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  We have sent a password reset link to <br/>
                  <span className="text-foreground font-medium">{email}</span>
                </p>
              </div>
              <Button onClick={() => router.push('/login')} className="w-full py-6 text-base font-bold rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg transition-all duration-300">
                Return to Login
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {!token ? (
                <div className="space-y-2">
                  <Label className="text-foreground font-medium ml-1">Email Address</Label>
                  <div className="relative group">
                    <Mail className="absolute left-3 top-3 h-5 w-5 text-muted-foreground group-focus-within:text-accent transition-colors" />
                    <Input 
                      type="email" 
                      placeholder="you@example.com" 
                      value={email} 
                      onChange={(e) => setEmail(e.target.value)} 
                      required 
                      disabled={loading}
                      className="pl-10 py-6 border-border focus-visible:ring-accent focus-visible:border-accent bg-background text-foreground placeholder:text-muted-foreground transition-all rounded-xl" 
                    />
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label className="text-foreground font-medium ml-1">New Password</Label>
                    <div className="relative group">
                      <Lock className="absolute left-3 top-3 h-5 w-5 text-muted-foreground group-focus-within:text-accent transition-colors" />
                      <Input 
                        type={showPassword ? 'text' : 'password'} 
                        placeholder="••••••••" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        required 
                        disabled={loading}
                        className="pl-10 pr-10 py-6 border-border focus-visible:ring-accent focus-visible:border-accent bg-background text-foreground placeholder:text-muted-foreground transition-all rounded-xl" 
                      />
                      <button 
                        type="button" 
                        onClick={() => setShowPassword(!showPassword)} 
                        className="absolute right-3 top-3 text-muted-foreground hover:text-foreground transition-colors"
                        tabIndex={-1}
                      >
                        {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                      </button>
                    </div>
                    {password.length > 0 && (
                      <ul className="space-y-1.5 mt-3">
                        {[
                          { ok: checks.length,    label: 'At least 8 characters' },
                          { ok: checks.uppercase, label: 'One uppercase letter'  },
                          { ok: checks.number,    label: 'One number'            },
                        ].map(({ ok, label }) => (
                          <li key={label} className={`flex items-center gap-2 text-xs ${ok ? 'text-accent' : 'text-muted-foreground'}`}>
                            <span>{ok ? '✓' : '○'}</span> {label}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label className="text-foreground font-medium ml-1">Confirm Password</Label>
                    <div className="relative group">
                      <Lock className="absolute left-3 top-3 h-5 w-5 text-muted-foreground group-focus-within:text-accent transition-colors" />
                      <Input 
                        type={showConfirm ? 'text' : 'password'} 
                        placeholder="Re-enter your password" 
                        value={confirmPassword} 
                        onChange={(e) => setConfirmPassword(e.target.value)} 
                        required 
                        disabled={loading}
                        className="pl-10 pr-10 py-6 border-border focus-visible:ring-accent focus-visible:border-accent bg-background text-foreground placeholder:text-muted-foreground transition-all rounded-xl" 
                      />
                      <button 
                        type="button" 
                        onClick={() => setShowConfirm(!showConfirm)} 
                        className="absolute right-3 top-3 text-muted-foreground hover:text-foreground transition-colors"
                        tabIndex={-1}
                      >
                        {showConfirm ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                      </button>
                    </div>
                    {confirmPassword.length > 0 && password !== confirmPassword && (
                      <p className="text-xs text-destructive mt-2 ml-1">Passwords do not match</p>
                    )}
                  </div>
                </div>
              )}

              <Button 
                type="submit" 
                disabled={loading || (!!token && !allValid) || (!!token && password !== confirmPassword)} 
                className="w-full py-6 text-base font-bold rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground shadow-[0_0_20px_rgba(214,180,107,0.3)] transition-all duration-300 group mt-4"
              >
                {loading ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  <>
                    {token ? 'Reset Password' : 'Send Reset Link'} 
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </Button>
            </form>
          )}
        </CardContent>
        <div className="border-t border-border bg-black/5 dark:bg-white/5 p-6 text-center">
          <p className="text-muted-foreground text-sm">
            Remembered your password?{' '}
            <button 
              onClick={() => router.push('/login')} 
              className="font-bold text-accent hover:text-accent/80 transition-colors"
            >
              Log in
            </button>
          </p>
        </div>
      </Card>
      
      <div className="text-center mt-8">
        <p className="text-muted-foreground text-sm tracking-wider uppercase">© 2026 Tara Infotech. All rights reserved.</p>
      </div>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-[radial-gradient(ellipse_at_center,var(--primary)_0%,transparent_70%)] opacity-10 blur-[120px]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] rounded-full bg-[radial-gradient(ellipse_at_center,var(--accent)_0%,transparent_70%)] opacity-10 blur-[120px]" />
      </div>

      <Suspense fallback={
        <div className="flex flex-col items-center gap-4 relative z-10">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-muted-foreground">Loading...</p>
        </div>
      }>
        <ResetPasswordContent />
      </Suspense>
    </div>
  );
}
