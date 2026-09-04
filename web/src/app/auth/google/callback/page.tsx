'use client';

import { useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import { authApi, tokenStore } from '@/lib/api';

function GoogleCallbackInner() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    async function handleCallback() {
      try {
        const hash = window.location.hash.substring(1);
        const params = new URLSearchParams(hash);
        const idToken = params.get('id_token');
        const state = params.get('state') || searchParams.get('state');
        const error = params.get('error');

        if (error) {
          router.push(`/login?error=oauth_error&details=${encodeURIComponent(error)}`);
          return;
        }
        if (!idToken) {
          router.push('/login?error=no_token');
          return;
        }

        const res = await authApi.googleSignIn(idToken, state || undefined);

        if (!res.success || !res.data) {
          // Backend blocked login-only flow for unregistered expert
          if ((res as any).code === 'NOT_REGISTERED' || res.message?.includes('sign up')) {
            router.push('/login?role=expert&error=not_registered');
          } else {
            router.push(`/login?error=auth_failed&details=${encodeURIComponent(res.message || 'Unknown error')}`);
          }
          return;
        }

        const isExpertFlow = state === 'expert_login' || state === 'expert_signup' || state === 'expert';
        const isSignupFlow = state === 'expert_signup';

        if (isExpertFlow) {
          if (isSignupFlow) {
            // ── SIGNUP FLOW ──────────────────────────────────────────
            if (res.data.user?.isNew) {
              // New expert — store tokens, go to onboarding form
              tokenStore.setTokens(res.data.accessToken, res.data.refreshToken);
              localStorage.setItem('hc_role', 'practitioner');
              localStorage.setItem('hc_practitioner_id', res.data.user.id);
              localStorage.setItem('hc_pid', res.data.user.id);
              localStorage.setItem('hc_practitioner_name', res.data.user.name ?? '');
              localStorage.setItem('hc_google_auth', 'true');
              localStorage.setItem('hc_google_name', res.data.user.name ?? '');
              localStorage.setItem('hc_google_email', res.data.user.email ?? '');
              router.push('/expert/signup');
            } else {
              // Already registered — show message, no tokens stored
              router.push('/expert/signup?already_registered=true');
            }
          } else {
            // ── LOGIN FLOW (expert_login or legacy expert) ───────────
            if (res.data.user?.isNew) {
              // Never registered before — tell them to sign up first
              router.push('/expert/login?error=not_registered');
            } else {
              // Existing expert — direct dashboard
              tokenStore.setTokens(res.data.accessToken, res.data.refreshToken);
              localStorage.setItem('hc_role', 'practitioner');
              localStorage.setItem('hc_practitioner_id', res.data.user.id);
              localStorage.setItem('hc_pid', res.data.user.id);
              localStorage.setItem('hc_practitioner_name', res.data.user.name ?? '');
              router.push('/expert/dashboard');
            }
          }
        } else {
          // ── USER FLOW ────────────────────────────────────────────
          tokenStore.setTokens(res.data.accessToken, res.data.refreshToken);
          localStorage.removeItem('hc_role');
          localStorage.removeItem('hc_practitioner_id');
          localStorage.removeItem('hc_pid');
          localStorage.removeItem('hc_practitioner_name');
          router.push('/dashboard');
        }
      } catch (err) {
        router.push(`/login?error=callback_failed&details=${encodeURIComponent((err as Error).message || 'Unknown error')}`);
      }
    }

    handleCallback();
  }, [router, searchParams]);

  return (
    <div className="min-h-screen bg-[#faf9f6] flex items-center justify-center">
      <div className="text-center">
        <Loader2 className="w-12 h-12 text-[#4f46e5] animate-spin mx-auto mb-4" />
        <p className="text-gray-600 text-lg">Signing you in with Google...</p>
      </div>
    </div>
  );
}

export default function GoogleCallbackPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#faf9f6] flex items-center justify-center">
        <Loader2 className="w-12 h-12 text-[#4f46e5] animate-spin" />
      </div>
    }>
      <GoogleCallbackInner />
    </Suspense>
  );
}
