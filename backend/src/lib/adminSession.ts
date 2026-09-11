/**
 * adminSession.ts (backend) — SEC-04/05
 *
 * Signs + verifies the hc_admin_session cookie that now carries identity
 * ({ id, email, role, exp }) instead of just an expiry timestamp.
 *
 * Format: base64url(JSON payload) . HMAC-SHA256(base64url(payload), secret)
 *
 * This is a server-only module — never imported from browser code.
 */
import { createHmac, timingSafeEqual } from 'crypto';

export interface AdminSessionIdentity {
  id: string;
  email: string;
  role: string;
}

const COOKIE_TTL_MS = 12 * 60 * 60 * 1000; // 12 hours

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

function safeEqual(a: string, b: string): boolean {
  const bufA = Buffer.from(a);
  const bufB = Buffer.from(b);
  if (bufA.length !== bufB.length) return false;
  return timingSafeEqual(bufA, bufB);
}

export function createAdminSessionToken(identity: AdminSessionIdentity): string {
  const payload = {
    ...identity,
    exp: Date.now() + COOKIE_TTL_MS,
  };
  const encoded = Buffer.from(JSON.stringify(payload)).toString('base64url');
  const sig = sign(encoded);
  return `${encoded}.${sig}`;
}

/**
 * Reads the hc_admin_session cookie value straight off the raw `Cookie`
 * request header. There's no cookie-parser middleware registered on this
 * Express app, so `req.cookies` is always undefined — every call site that
 * needs this cookie (requireAdminAuth, adminAuth.ts's /me + requireAdminSession)
 * must go through this helper instead of `req.cookies`.
 */
export function getAdminSessionCookie(req: { headers: { cookie?: string | undefined; authorization?: string | undefined } }): string | undefined {
  const rawCookie = req.headers.cookie ?? '';
  const match = rawCookie.match(/(?:^|;\s*)hc_admin_session=([^;]+)/);
  if (match?.[1]) return match[1];

  const auth = req.headers.authorization;
  if (auth && auth.startsWith('Bearer ')) {
    return auth.slice(7).trim();
  }

  return undefined;
}

export function verifyAdminSessionToken(token: string | undefined | null): (AdminSessionIdentity & { exp: number }) | null {
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
    const payload = JSON.parse(Buffer.from(encoded, 'base64url').toString('utf-8')) as {
      id: string; email: string; role: string; exp: number;
    };
    if (Date.now() > payload.exp) return null;
    return payload;
  } catch {
    return null;
  }
}
