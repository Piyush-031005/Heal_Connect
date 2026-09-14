'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import { authApi, tokenStore, astrologerTokenStore } from '@/lib/api';

export default function GoogleCallbackPage() {
  const router = useRouter();
  const [error, setError] = useState('');
  const calledRef = useRef(false);

  useEffect(() => {
    if (calledRef.current) return;
    calledRef.current = true;

    const hash = window.location.hash.substring(1);
    const params = new URLSearchParams(hash);
    const idToken = params.get('id_token');
    const state = params.get('state') || undefined;

    if (!idToken) {
      setError('No token received from Google. Please try again.');
      return;
    }

    authApi.googleSignIn(idToken, state).then((res) => {
      if (!res.success || !res.data) {
        setError(res.message || 'Google sign-in failed');
        return;
      }

      // Expert signup via Google — needs to complete registration form
      if ((res.data as any).needsRegistration) {
        localStorage.setItem('hc_google_auth', (res.data as any).googleAuth);
        localStorage.setItem('hc_google_name', (res.data as any).googleName);
        localStorage.setItem('hc_google_email', (res.data as any).googleEmail);
        router.replace('/expert/signup');
        return;
      }

      const user = res.data.user;

      // Expert/Practitioner Google login — goes to astrologer login page
      // (state=expert or expert_login means they clicked Google on /astrologer/login)
      if (state === 'expert' || state === 'expert_login') {
        if (!user) {
          setError('No expert account found. Please sign up first.');
          return;
        }
        // Store tokens in astrologer token store
        astrologerTokenStore.setTokens(res.data.accessToken, res.data.refreshToken);
        localStorage.setItem('hc_role', 'practitioner');
        localStorage.setItem('hc_practitioner_id', user.id);
        localStorage.setItem('hc_practitioner_name', user.name ?? '');
        // New expert — go to onboarding; existing — go to dashboard
        router.replace(user.isNew ? '/astrologer/onboarding' : '/astrologer/dashboard');
        return;
      }

      // Regular user Google login/signup
      tokenStore.setTokens(res.data.accessToken, res.data.refreshToken);
      localStorage.removeItem('hc_role');
      localStorage.removeItem('hc_practitioner_id');
      localStorage.removeItem('hc_practitioner_name');
      router.replace('/dashboard');
    }).catch((err) => {
      setError(`Google sign-in failed. Please try again. [${err.message || String(err)}]`);
    });
  }, [router]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      {error ? (
        <div className="text-center space-y-4">
          <p className="text-red-400 text-lg">{error}</p>
          <a href="/login" className="text-indigo-400 hover:underline">Back to login</a>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-4 text-muted-foreground">
          <Loader2 className="h-8 w-8 animate-spin text-indigo-400" />
          <p>Completing sign-in...</p>
        </div>
      )}
    </div>
  );
}
