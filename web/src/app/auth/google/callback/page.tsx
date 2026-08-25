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
        console.log('Google callback started');
        
        // Get ID token from hash fragment (Google OAuth returns it there)
        const hash = window.location.hash.substring(1);
        const params = new URLSearchParams(hash);
        const idToken = params.get('id_token');
        const state = params.get('state') || searchParams.get('state');
        const error = params.get('error');

        console.log('Callback params:', { hasIdToken: !!idToken, state, error });

        if (error) {
          console.error('Google OAuth error:', error);
          router.push(`/login?error=oauth_error&details=${encodeURIComponent(error)}`);
          return;
        }

        if (!idToken) {
          console.error('No ID token in callback');
          router.push('/login?error=no_token');
          return;
        }

        console.log('Calling backend with ID token');
        
        // Send to backend with both state and role for compatibility
        const res = await authApi.googleSignIn(idToken, state || undefined);

        console.log('Backend response:', res);

        if (!res.success || !res.data) {
          console.error('Google sign-in failed:', res.message);
          router.push(`/login?error=auth_failed&details=${encodeURIComponent(res.message || 'Unknown error')}`);
          return;
        }

        // Store tokens
        tokenStore.setTokens(res.data.accessToken, res.data.refreshToken);

        // Check role and redirect
        const isExpert = state === 'expert' || (res.data.user as any)?.role === 'practitioner';
        
        console.log('Authentication successful, redirecting...', { isExpert, state });
        
        if (isExpert) {
          localStorage.setItem('hc_role', 'practitioner');
          localStorage.setItem('hc_practitioner_id', res.data.user.id);
          localStorage.setItem('hc_pid', res.data.user.id);
          localStorage.setItem('hc_practitioner_name', res.data.user.name || '');
          router.push('/expert/dashboard');
        } else {
          localStorage.removeItem('hc_role');
          localStorage.removeItem('hc_practitioner_id');
          localStorage.removeItem('hc_pid');
          localStorage.removeItem('hc_practitioner_name');
          router.push('/dashboard');
        }
      } catch (err) {
        console.error('Google callback error:', err);
        router.push(`/login?error=callback_failed&details=${encodeURIComponent((err as Error).message || 'Unknown error')}`);
      }
    }

    handleCallback();
  }, [router, searchParams]);

  return (
    <div className="min-h-screen bg-[#fffbf0] flex items-center justify-center">
      <div className="text-center">
        <Loader2 className="w-12 h-12 text-[#f59e0b] animate-spin mx-auto mb-4" />
        <p className="text-gray-600 text-lg">Signing you in with Google...</p>
      </div>
    </div>
  );
}

export default function GoogleCallbackPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#fffbf0] flex items-center justify-center">
        <Loader2 className="w-12 h-12 text-[#f59e0b] animate-spin" />
      </div>
    }>
      <GoogleCallbackInner />
    </Suspense>
  );
}
