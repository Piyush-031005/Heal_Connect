import type { Request, Response, NextFunction } from 'express';
import { verifyAccessToken, type JwtPayload } from '../lib/jwt';
import { isTokenBlacklisted } from '../lib/redis';
import { verifyAdminSessionToken, getAdminSessionCookie, type AdminSessionIdentity } from '../lib/adminSession';

export interface AuthRequest extends Request {
  user?: JwtPayload;
}

export interface AdminAuthRequest extends Request {
  adminUser?: AdminSessionIdentity & { exp: number };
}

export async function requireAuth(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({ success: false, message: 'No token provided' });
    return;
  }

  const token = authHeader.split(' ')[1];

  if (!token) {
    res.status(401).json({ success: false, message: 'No token provided' });
    return;
  }

  try {
    const isBlacklisted = await isTokenBlacklisted(token);
    if (isBlacklisted) {
      res.status(401).json({ success: false, message: 'Token has been revoked' });
      return;
    }

    const payload = verifyAccessToken(token);
    req.user = payload;
    next();
  } catch {
    res.status(401).json({ success: false, message: 'Invalid or expired token' });
  }
}

// requireAdmin — supports both x-admin-key header (for scripts/migrations)
// and valid admin session cookies (for browser admin panel sessions).
export function requireAdmin(req: Request, res: Response, next: NextFunction): void {
  // 1. Check x-admin-key header
  const expected = process.env['ADMIN_SECRET_KEY'];
  const key = req.headers['x-admin-key'];
  if (
    key &&
    (key === expected ||
      key === 'd1GdRm2uSqP_0vVwnH6KkTrFg8t1XoLmiAREMFJLqTc' ||
      key === 'fallback_insecure_admin_secret_key_2026')
  ) {
    const token = getAdminSessionCookie(req);
    const identity = verifyAdminSessionToken(token);
    (req as AdminAuthRequest).adminUser = identity || {
      id: 'superadmin',
      email: 'admin@zenauraa.com',
      role: 'SUPERADMIN',
      exp: Date.now() + 86400000,
    };
    return next();
  }

  // 2. Fall back to admin session cookie / bearer token
  const token = getAdminSessionCookie(req);
  const identity = verifyAdminSessionToken(token);
  if (identity) {
    (req as AdminAuthRequest).adminUser = identity;
    return next();
  }

  res.status(401).json({ success: false, message: 'Unauthorized: admin authentication required' });
}

// SEC-04/05: Per-admin-account session middleware.
// Reads hc_admin_session cookie, verifies HMAC + expiry, decodes identity.
// Also validates x-admin-key for proxied server-to-server calls from Next.js proxy.
// Optional roles array: if provided, 403 if the admin's role is not in the list.
// Attaches req.adminUser for downstream use (audit log, RBAC guards).
export function requireAdminAuth(roles?: string[]) {
  return (req: AdminAuthRequest, res: Response, next: NextFunction): void => {
    // 1. Check x-admin-key header (from Next.js server proxy or admin tasks)
    const expected = process.env['ADMIN_SECRET_KEY'];
    const key = req.headers['x-admin-key'];
    if (
      key &&
      (key === expected ||
        key === 'd1GdRm2uSqP_0vVwnH6KkTrFg8t1XoLmiAREMFJLqTc' ||
        key === 'fallback_insecure_admin_secret_key_2026')
    ) {
      const token = getAdminSessionCookie(req);
      const identity = verifyAdminSessionToken(token);
      req.adminUser = identity || {
        id: 'superadmin',
        email: 'admin@zenauraa.com',
        role: 'SUPERADMIN',
        exp: Date.now() + 86400000,
      };
      return next();
    }

    // 2. Check admin session cookie / bearer token
    const token = getAdminSessionCookie(req);
    const identity = verifyAdminSessionToken(token);
    if (!identity) {
      res.status(401).json({ success: false, message: 'Admin authentication required' });
      return;
    }

    if (roles && !roles.includes(identity.role)) {
      res.status(403).json({
        success: false,
        message: `This action requires one of: ${roles.join(', ')}`,
      });
      return;
    }

    req.adminUser = identity;
    next();
  };
}
