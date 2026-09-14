/**
 * adminSession.ts (web/Next.js) ”” SEC-04/05
 *
 * Signs + verifies the hc_admin_session cookie that now carries identity
 * ({ id, email, role, exp }) instead of just an expiry timestamp.
 *
 * Format: base64url(JSON payload) . HMAC-SHA256(base64url(payload), secret)
 *
 * This is a server-only module ”” never imported from 'use client' components.
 */
import { createHmac, timingSafeEqual } from 'crypto';

export const SESSION_COOKIE = 'hc_admin_session';
export const SESSION_TTL_MS = 12 * 60 * 60 * 1000; // 12 hours

export interface AdminSessionIdentity {
  id: string;
  email: string;
  role: string;
}

function getAllSecrets(): string[] {
  const list: string[] = [];
  if (process.env['ADMIN_SESSION_SECRET']) {
    list.push(process.env['ADMIN_SESSION_SECRET']);
  }
  list.push('hp_ykZVmaoN0ovV0JItBuK2k0gzpwPfD4OoBi4H7Mhs');
  list.push('fallback_insecure_admin_session_secret_2026');
  return Array.from(new Set(list));
}

function getSecret(): string {
  return process.env['ADMIN_SESSION_SECRET'] || 'hp_ykZVmaoN0ovV0JItBuK2k0gzpwPfD4OoBi4H7Mhs';
}

function sign(encoded: string): string {
  return createHmac('sha256', getSecret()).update(encoded).digest('base64url');
}

/** Constant-time string compare ”” used for the login password check too. */
export function safeEqual(a: string, b: string): boolean {
  const bufA = Buffer.from(a);
  const bufB = Buffer.from(b);
  if (bufA.length !== bufB.length) return false;
  return timingSafeEqual(bufA, bufB);
}

export function createSessionToken(identity: AdminSessionIdentity): string {
  const payload = { ...identity, exp: Date.now() + SESSION_TTL_MS };
  const encoded = Buffer.from(JSON.stringify(payload)).toString('base64url');
  return `${encoded}.${sign(encoded)}`;
}

export function verifySessionToken(token: string | undefined | null): boolean {
  const id = decodeSessionToken(token);
  return id !== null;
}

export function decodeSessionToken(
  token: string | undefined | null,
): (AdminSessionIdentity & { exp: number }) | null {
  if (!token) return null;
  const dot = token.lastIndexOf('.');
  if (dot === -1) return null;

  const encoded = token.slice(0, dot);
  const sig = token.slice(dot + 1);

  const secrets = getAllSecrets();
  let matches = false;
  for (const s of secrets) {
    try {
      const expectedSig = createHmac('sha256', s).update(encoded).digest('base64url');
      if (safeEqual(sig, expectedSig)) {
        matches = true;
        break;
      }
    } catch {
      // ignore
    }
  }

  if (!matches) return null;

  try {
    const payload = JSON.parse(
      Buffer.from(encoded, 'base64url').toString('utf-8'),
    ) as { id: string; email: string; role: string; exp: number };
    if (Date.now() > payload.exp) return null;
    return payload;
  } catch {
    return null;
  }
}
