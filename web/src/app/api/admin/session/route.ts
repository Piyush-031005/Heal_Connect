/**
 * POST   /api/admin/session      — step 1 login (proxies to backend /api/admin-auth/login)
 * GET    /api/admin/session      — check session, return {authenticated, email, role}
 * DELETE /api/admin/session      — logout (clears cookie)
 *
 * SEC-04/05: The POST handler no longer checks env-var credentials directly.
 * It proxies to the backend adminAuth router, which validates against the
 * AdminUser table. If mfaRequired is true the cookie is NOT set yet —
 * the client must complete the MFA step via POST /api/admin/session/mfa.
 */
import { NextRequest, NextResponse } from 'next/server';
import { decodeSessionToken, SESSION_COOKIE, SESSION_TTL_MS } from '@/lib/adminSession';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const BACKEND = process.env['BACKEND_URL'] ?? process.env['NEXT_PUBLIC_API_URL'] ?? 'http://backend:8082';

export async function GET(req: NextRequest) {
  const token = req.cookies.get(SESSION_COOKIE)?.value;
  if (!token) {
    return NextResponse.json({ authenticated: false });
  }

  // Proxy to backend to verify the token, avoiding any secret mismatch issues between frontend/backend
  try {
    const backendRes = await fetch(`${BACKEND}/api/admin-auth/me`, {
      headers: {
        'Cookie': `${SESSION_COOKIE}=${token}`
      }
    });
    
    if (!backendRes.ok) {
      return NextResponse.json({ authenticated: false });
    }
    
    const data = await backendRes.json();
    if (data.success && data.data) {
      return NextResponse.json({
        authenticated: true,
        email: data.data.email,
        role: data.data.role,
        id: data.data.id,
      });
    }
  } catch (err) {
    console.error('Failed to verify session with backend:', err);
  }

  return NextResponse.json({ authenticated: false });
}

export async function POST(req: NextRequest) {
  let body: { email?: unknown; password?: unknown };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ success: false, message: 'Invalid request' }, { status: 400 });
  }

  const email = typeof body.email === 'string' ? body.email : '';
  const password = typeof body.password === 'string' ? body.password : '';

  if (!email || !password) {
    return NextResponse.json({ success: false, message: 'Email and password are required' }, { status: 400 });
  }

  // Proxy to backend
  let backendRes: Response;
  try {
    backendRes = await fetch(`${BACKEND}/api/admin-auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
  } catch {
    return NextResponse.json({ success: false, message: 'Could not reach authentication server' }, { status: 502 });
  }

  const data = await backendRes.json() as {
    success: boolean;
    mfaRequired?: boolean;
    mfaSetupRequired?: boolean;
    loginToken?: string;
    message?: string;
  };

  if (!backendRes.ok || !data.success) {
    return NextResponse.json(
      { success: false, message: data.message ?? 'Invalid admin credentials' },
      { status: backendRes.status },
    );
  }

  // MODERATOR without MFA → the backend already issued its own hc_admin_session
  // Set-Cookie header on backendRes. Relay it verbatim onto our response so the
  // browser stores it against the Next.js (browser-facing) origin — the same
  // technique the /mfa route uses. Without this the browser gets no cookie at
  // all and every subsequent request looks unauthenticated.
  if (!data.mfaRequired) {
    const setCookies = backendRes.headers.getSetCookie();
    let sessionToken = '';
    for (const c of setCookies) {
      const match = c.match(/(?:^|;\s*)hc_admin_session=([^;]+)/);
      if (match) {
        sessionToken = match[1];
        break;
      }
    }
    
    if (sessionToken) {
      const { cookies } = await import('next/headers');
      (await cookies()).set(SESSION_COOKIE, sessionToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        path: '/',
        maxAge: SESSION_TTL_MS / 1000,
      });
    } else {
      console.error('Admin login: backend did not return a Set-Cookie header for the no-MFA path');
    }
    return NextResponse.json({ success: true, mfaRequired: false, mfaSetupRequired: false });
  }

  // MFA step required — return loginToken to the client (no cookie yet)
  return NextResponse.json({
    success: true,
    mfaRequired: true,
    mfaSetupRequired: data.mfaSetupRequired ?? false,
    loginToken: data.loginToken,
  });
}

export async function DELETE() {
  const res = NextResponse.json({ success: true });
  res.cookies.set(SESSION_COOKIE, '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',
    maxAge: 0,
  });

  // Also proxy logout to backend so its cookie is cleared
  try {
    await fetch(`${BACKEND}/api/admin-auth/logout`, { method: 'POST' });
  } catch { /* best-effort */ }

  return res;
}
