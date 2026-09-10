import { prisma } from './prisma';

// ── Contact-info detection patterns ──────────────────────────────────────────
// Phone: 10-digit Indian, international (+91), US, spaced/dashed/dotted formats
const PHONE_PATTERNS = [
  /\b(\+?91[\s\-]?[6-9]\d{9})\b/,                          // Indian mobile +91
  /\b([6-9]\d{9})\b/,                                       // 10-digit Indian mobile
  /\b(\+?1[\s\-]?\(?\d{3}\)?[\s\-]?\d{3}[\s\-]?\d{4})\b/, // US number
  /\b\d[\d\s\-().]{8,}\d\b/,                               // generic 8+ digit number
];

// Email: standard + obfuscated ("at", "dot", "[at]", "(at)", spaced chars)
const EMAIL_PATTERNS = [
  /[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}/,
  /[a-zA-Z0-9._%+\-]+\s*[\[(]?at[\])]?\s*[a-zA-Z0-9.\-]+\s*[\[(]?dot[\])]?\s*[a-zA-Z]{2,}/i,
];

// Generic flagged keywords (abuse, fraud, etc.)
const FLAGGED_KEYWORDS = [
  'abuse', 'fraud', 'scam', 'fake', 'illegal', 'violence', 'threat', 'spam',
];

const DEFAULT_BAN_HOURS = 24;

export function scanContent(text: string): {
  flagged: boolean;
  reasons: string[];
  hasContactInfo: boolean;
} {
  const lower = text.toLowerCase();
  const reasons: string[] = [];

  // Keyword scan
  const keywordHits = FLAGGED_KEYWORDS.filter((kw) => lower.includes(kw));
  reasons.push(...keywordHits);

  // Phone detection
  if (PHONE_PATTERNS.some((re) => re.test(text))) {
    reasons.push('phone_number_detected');
  }

  // Email detection
  if (EMAIL_PATTERNS.some((re) => re.test(text))) {
    reasons.push('email_detected');
  }

  const hasContactInfo = reasons.some(
    (r) => r === 'phone_number_detected' || r === 'email_detected'
  );

  return { flagged: reasons.length > 0, reasons, hasContactInfo };
}

export async function flagContentIfNeeded(
  content: string,
  source: string,
  meta: {
    sessionId?: string;
    userId?: string;
    practitionerId?: string;
    transcriptId?: string;
    chatMessageId?: string;
  }
): Promise<{ blocked: boolean; reason?: string }> {
  const { flagged, reasons, hasContactInfo } = scanContent(content);
  if (!flagged) return { blocked: false };

  // Persist flag record for admin review
  await prisma.flaggedContent.create({
    data: {
      source,
      contentSnippet: content.slice(0, 500),
      reason: reasons.join(', '),
      status: 'PENDING',
      sessionId: meta.sessionId ?? null,
      userId: meta.userId ?? null,
      practitionerId: meta.practitionerId ?? null,
      transcriptId: meta.transcriptId ?? null,
    },
  });

  // Apply temporary ban for contact-info violations
  if (hasContactInfo) {
    const bannedUntil = new Date(Date.now() + DEFAULT_BAN_HOURS * 60 * 60 * 1000);

    if (meta.userId) {
      await prisma.user.update({
        where: { id: meta.userId },
        data: { bannedUntil },
      }).catch(console.error);
    }
    if (meta.practitionerId) {
      await prisma.practitioner.update({
        where: { id: meta.practitionerId },
        data: { bannedUntil },
      }).catch(console.error);
    }

    return {
      blocked: true,
      reason: 'Sharing contact information (phone numbers or email addresses) is not permitted. Your account has been temporarily suspended.',
    };
  }

  return { blocked: false };
}
