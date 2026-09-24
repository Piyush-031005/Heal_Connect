import { prisma } from './prisma';

export interface ScanResult {
  flagged: boolean;
  reasons: string[];
  hasContactInfo: boolean;
  hasAbusiveLanguage: boolean;
  categories: {
    phone: boolean;
    email: boolean;
    gmail: boolean;
    instagram: boolean;
    facebook: boolean;
    socialMedia: boolean;
    abuse: boolean;
  };
  matchedTerms: string[];
}

const DEFAULT_BAN_HOURS = 24;

// ── 1. Spoken / Devanagari Digits Mapping ─────────────────────────────────────
const NUMBER_WORDS: Record<string, string> = {
  zero: '0', oh: '0', o: '0',
  one: '1', two: '2', three: '3', four: '4', five: '5',
  six: '6', seven: '7', eight: '8', nine: '9',
  shunya: '0', sunya: '0', sifar: '0',
  ek: '1', ik: '1',
  do: '2', dou: '2',
  teen: '3', tin: '3',
  chaar: '4', char: '4',
  paanch: '5', panch: '5',
  chhah: '6', chhe: '6', che: '6',
  saat: '7', sat: '7',
  aath: '8', ath: '8',
  nau: '9', no: '9',
};

const DEVANAGARI_DIGITS_MAP: Record<string, string> = {
  '०': '0', '१': '1', '२': '2', '३': '3', '४': '4',
  '५': '5', '६': '6', '७': '7', '८': '8', '९': '9',
  'शून्य': '0', 'एक': '1', 'दो': '2', 'तीन': '3', 'चार': '4',
  'पांच': '5', 'पाँच': '5', 'छह': '6', 'सात': '7', 'आठ': '8', 'नौ': '9',
};

function extractSpokenOrDevanagariDigits(text: string): string {
  let normalized = text.toLowerCase();

  // Replace Devanagari numerals
  for (const [dev, num] of Object.entries(DEVANAGARI_DIGITS_MAP)) {
    normalized = normalized.split(dev).join(num);
  }

  // Replace double/triple number phrases (e.g., "double nine" -> "9 9")
  normalized = normalized.replace(/\bdouble\s+([a-z]+)\b/gi, (_, word) => {
    const d = NUMBER_WORDS[word.toLowerCase()];
    return d ? `${d} ${d}` : word;
  });
  normalized = normalized.replace(/\btriple\s+([a-z]+)\b/gi, (_, word) => {
    const d = NUMBER_WORDS[word.toLowerCase()];
    return d ? `${d} ${d} ${d}` : word;
  });

  // Tokenize and extract consecutive digits
  const tokens = normalized.split(/[^a-z0-9]+/i);
  let digitStr = '';
  for (const token of tokens) {
    if (NUMBER_WORDS[token]) {
      digitStr += NUMBER_WORDS[token];
    } else if (/^\d+$/.test(token)) {
      digitStr += token;
    } else if (digitStr.length >= 10) {
      return digitStr;
    } else {
      digitStr = ''; // reset sequence if non-digit word interrupted
    }
  }
  return digitStr;
}

// ── 2. Phone Detection ────────────────────────────────────────────────────────
export function detectPhone(text: string): boolean {
  if (!text || !text.trim()) return false;

  // Redaction placeholders inserted by transcription engines
  const placeholders = /\[(phone(_number)?|number|tel|mobile|pii_phone)\]|PHONE_NUMBER/i;
  if (placeholders.test(text)) return true;

  // Devanagari sequence
  if (/[०-९\s]{10,}/.test(text)) {
    const devDigits = text.replace(/[^०-९]/g, '');
    if (devDigits.length >= 10) return true;
  }

  // Spoken number words sequence (English or Hindi spoken numbers in calls)
  const spokenSeq = extractSpokenOrDevanagariDigits(text);
  if (spokenSeq.length >= 10) return true;

  // Compact digits check (remove spaces/dashes/dots/parentheses between digits)
  const compact = text.replace(/(?<=\d)[\s\-()._]+(?=\d)/g, '');

  // 10-digit Indian mobile starting with 6-9 (optional +91)
  if (/(?:\+?91[\s\-]?)?[6-9]\d{9}\b/.test(compact)) return true;

  // Standalone 10 digits starting with 6-9
  const digitsOnly = text.replace(/\D/g, '');
  if (/^[6-9]\d{9}$/.test(digitsOnly) || (digitsOnly.length === 10 && /^[6-9]/.test(digitsOnly))) return true;
  if (digitsOnly.length >= 10 && (digitsOnly.startsWith('91') || digitsOnly.startsWith('0')) && digitsOnly.length <= 12) return true;

  // US & International numbers
  if (/(?:\+?1[\s\-]?\(?\d{3}\)?[\s\-]?\d{3}[\s\-]?\d{4})\b/.test(compact)) return true;
  if (/(?:\+|00)\d{1,3}[\s\-]?\d{3,4}[\s\-]?\d{3,5}\b/.test(compact)) return true;

  // Phone intent + 7-15 digits
  if (/(?:call(?:\s+me)?|dial|whatsapp|contact|phone|mobile|cell|num(?:ber)?|ph|mob)(?:\s+(?:at|on|me|is|:|-))?\s*(\+?[\d\s\-().]{7,15}\d)/i.test(text)) {
    return true;
  }

  return false;
}

// ── 3. Gmail & Email Detection ────────────────────────────────────────────────
export function detectEmail(text: string): { detected: boolean; isGmail: boolean } {
  if (!text || !text.trim()) return { detected: false, isGmail: false };

  // Placeholders
  const placeholders = /\[(email(_address)?|pii_email)\]|EMAIL_ADDRESS/i;
  if (placeholders.test(text)) return { detected: true, isGmail: false };

  // Standard email format
  const standardEmail = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/i;
  const match = text.match(standardEmail);
  if (match) {
    const isGmail = /@gmail\./i.test(match[0]);
    return { detected: true, isGmail };
  }

  // Gmail specific patterns (e.g. user@gmail, user @ gmail . com)
  if (/[a-zA-Z0-9._%+-]+\s*@\s*gmail(?:\.com)?/i.test(text)) {
    return { detected: true, isGmail: true };
  }

  // Obfuscated email (e.g. user at gmail dot com, user [at] gmail [dot] com)
  if (/[a-zA-Z0-9._%+-]+\s*(?:@|\[at\]|\(at\)|\bat\b)\s*([a-zA-Z0-9.-]+)\s*(?:\.|\[dot\]|\(dot\)|\bdot\b)\s*(?:com|in|org|net|co|io|me|xyz)\b/i.test(text)) {
    const isGmail = /\bgmail\b/i.test(text);
    return { detected: true, isGmail };
  }

  // "my gmail is rahul123"
  if (/\b(?:my\s+)?gmail\s*(?:id|account)?\s*(?:is|:|-|=|\s)\s*([a-zA-Z0-9._%+-]{3,30})\b/i.test(text)) {
    return { detected: true, isGmail: true };
  }

  // "email me at user at domain"
  if (/\b(?:my\s+)?(?:email|e-mail|mail\s*id)\s*(?:is|:|-|=)\s*([a-zA-Z0-9._%+-]{3,30})/i.test(text)) {
    return { detected: true, isGmail: /\bgmail\b/i.test(text) };
  }

  return { detected: false, isGmail: false };
}

// ── 4. Instagram Detection ───────────────────────────────────────────────────
export function detectInstagram(text: string): boolean {
  if (!text || !text.trim()) return false;

  // URLs
  if (/(?:https?:\/\/)?(?:www\.)?(?:instagram\.com|instagr\.am)\/[a-zA-Z0-9._]{2,30}/i.test(text)) return true;

  // Handles & keywords
  if (/\b(?:insta(?:gram)?|ig)\s*(?:id|handle|username|account|profile)?\s*(?:is|:|-|=|\s|@)\s*@?([a-zA-Z0-9._]{3,30})\b/i.test(text)) return true;
  if (/\b(?:follow|dm|message|ping|find|search|connect|add)\s*(?:me\s*)?(?:on\s*)?(?:insta(?:gram)?|ig)\b/i.test(text)) return true;
  if (/\b(?:my\s+)?(?:insta(?:gram)?|ig)\b\s*[:\-]?\s*@?([a-zA-Z0-9._]{3,30})/i.test(text)) return true;
  if (/\b(?:dm|ping|message)\s+(?:me\s+)?(?:on\s+)?(?:insta(?:gram)?|ig)\b/i.test(text)) return true;

  // Evasions
  if (/\b1nsta(?:gram)?\b/i.test(text)) return true;
  if (/\bi[\s._-]*n[\s._-]*s[\s._-]*t[\s._-]*a\b/i.test(text)) return true;

  return false;
}

// ── 5. Facebook Detection ────────────────────────────────────────────────────
export function detectFacebook(text: string): boolean {
  if (!text || !text.trim()) return false;

  // URLs
  if (/(?:https?:\/\/)?(?:www\.)?(?:facebook\.com|fb\.com|fb\.me)\/[a-zA-Z0-9._]{2,50}/i.test(text)) return true;

  // Handles & keywords
  if (/\b(?:facebook|fb)\s*(?:id|username|profile|account|name|page)?\s*(?:is|:|-|=|\s|@)\s*@?([a-zA-Z0-9._]{3,50})\b/i.test(text)) return true;
  if (/\b(?:follow|dm|message|ping|find|search|connect|add)\s*(?:me\s*)?(?:on\s*)?(?:facebook|fb)\b/i.test(text)) return true;
  if (/\b(?:my\s+)?facebook\b\s*[:\-]?\s*@?([a-zA-Z0-9._]{3,50})/i.test(text)) return true;

  // Evasions
  if (/\bface\s*book\b/i.test(text)) return true;
  if (/\bf[\s._-]*a[\s._-]*c[\s._-]*e[\s._-]*b[\s._-]*o[\s._-]*o[\s._-]*k\b/i.test(text)) return true;

  return false;
}

// ── 6. Other Off-Platform Social / Messaging ──────────────────────────────────
export function detectOtherSocial(text: string): boolean {
  if (!text || !text.trim()) return false;
  if (/(?:wa\.me\/\d+|whatsapp\s*(?:me|num|no|number|id)?|watsapp|what's\s*app)/i.test(text)) return true;
  if (/(?:t\.me\/[a-zA-Z0-9_]+|telegram\s*(?:id|username|channel|me)?)/i.test(text)) return true;
  if (/(?:snapchat\.com\/add\/[a-zA-Z0-9._]+|snapchat|my\s+snap\s+is)/i.test(text)) return true;
  return false;
}

// ── 7. Multilingual Abusive Language & Guardrails ─────────────────────────────
const MULTILINGUAL_ABUSE_TERMS = [
  // English Profanity, Slurs & Harassment
  'fuck', 'fucking', 'fucker', 'motherfucker', 'fuk', 'fck', 'f*ck', 'f**k',
  'shit', 'bullshit', 'bitch', 'bitches', 'bitching', 'b*tch', 'b!tch',
  'asshole', 'bastard', 'cunt', 'dick', 'cock', 'pussy', 'slut', 'whore',
  'kill yourself', 'i will kill you', 'die bitch', 'murder you', 'shoot you',
  'retard', 'moron', 'idiot', 'dumbass', 'scumbag',
  'nigger', 'nigga', 'faggot', 'fag', 'dyke', 'chink', 'spic', 'kike',
  'send nudes', 'show boobs', 'sex chat', 'dirty talk', 'blowjob',

  // Hindi / Hinglish (Latin script)
  'chutiya', 'chootiya', 'chutia', 'chutya', 'chutiyapa',
  'madarchod', 'maderchod', 'madar chod', 'mc',
  'behenchod', 'bhenchod', 'behen chod', 'bc',
  'bhosdike', 'bhosadike', 'bhosdi', 'bsdk', 'bhosad', 'bhosdiwala', 'bhosdiwali',
  'gaand', 'gand', 'gandu', 'gandmasti',
  'lauda', 'loda', 'laude', 'lodu', 'lavde',
  'randi', 'r@ndi',
  'harami', 'haraami', 'kamine', 'kamina', 'kamini',
  'kutta', 'kutte', 'kutti',
  'saala', 'saale', 'saali',
  'bkl', 'bhen ke lode',
  'bhadva', 'bhadwe', 'jhaat', 'jhattu',
  'teri maa ki', 'teri behen ki', 'teri gaand',
  'jaan se maar', 'goli maar', 'kat dunga',

  // Hindi (Devanagari script)
  'चूतिया', 'चूतिये', 'मादरचोद', 'बहनचोद', 'भोसड़ीके', 'भोसड़ी', 'भोसड़ीवाला',
  'गांड', 'गांडू', 'लौड़ा', 'लौड़े', 'रंडी', 'हरामी', 'कमीने', 'कमीना', 'कमीनी',
  'कुत्ता', 'कुत्ते', 'कुतिया', 'साला', 'साले', 'झांट', 'भाड़वे',

  // Spanish
  'hijo de puta', 'puta', 'puto', 'mierda', 'coño', 'pendejo', 'pendeja', 'cabron', 'cabrona', 'verga', 'maricon', 'chinga tu madre',

  // French
  'putain de merde', 'putain', 'merde', 'connard', 'connasse', 'salope', 'encule', 'fils de pute', 'ta gueule',

  // German
  'arschloch', 'scheisse', 'scheiße', 'hurensohn', 'schlampe', 'wichser', 'fotze',

  // Italian
  'stronzo', 'cazzo', 'puttana', 'vaffanculo', 'figlio di puttana',

  // Portuguese
  'caralho', 'porra', 'filho da puta', 'foda-se', 'arrombado', 'vai se foder',

  // Russian (Latin + Cyrillic)
  'suka blyat', 'blyat', 'suka', 'pizdetz', 'nahui', 'ebat', 'блять', 'сука', 'пиздец', 'нахуй',

  // Arabic
  'sharmouta', 'kuss emmak', 'ibn el kalb', 'sharmoota', 'kuss', 'ayre fik',

  // Bengali
  'bokachoda', 'khanki', 'magi', 'বোকাচোদা', 'হারামি', 'খানকি',

  // Punjabi
  'kanjar', 'khoti deya', 'chawal', 'kutiya', 'kanjra',

  // Marathi
  'zhava', 'zhavnya', 'aai ghalya', 'bhadkhau', 'chavat',

  // Tamil
  'thevidiya', 'oththa', 'ommale', 'mayiru', 'punda', 'sunni', 'தேவிடியா',

  // Telugu
  'dengu', 'lanja', 'lanjakodaka', 'gudha', 'modda',

  // Malayalam & Kannada
  'myre', 'thendi', 'boli magane', 'tullu'
];

// Whitelist of legitimate words to avoid false positive triggers
const SAFE_WORDS = new Set([
  'classic', 'classical', 'class', 'glass', 'grass', 'compass', 'pass', 'passion', 'passionate', 'compassion',
  'assist', 'assistant', 'assistance', 'therapist', 'therapy', 'assignment', 'assume', 'assumption',
  'hello', 'button', 'sheet', 'sheets', 'ship', 'shirt', 'shut', 'shutter',
  'title', 'battle', 'document', 'massage', 'massager', 'assembly', 'attitude'
]);

function normalizeLeet(text: string): string {
  return text
    .normalize('NFKC')
    .toLowerCase()
    .replace(/[@]/g, 'a')
    .replace(/[$]/g, 's')
    .replace(/[!]/g, 'i')
    .replace(/[1]/g, 'i')
    .replace(/[0]/g, 'o')
    .replace(/[3]/g, 'e')
    .replace(/[5]/g, 's')
    .replace(/[7]/g, 't')
    .replace(/[8]/g, 'b');
}

function collapseRepeatedChars(text: string): string {
  return text.replace(/(.)\1{2,}/g, '$1');
}

export function detectAbuse(text: string): { detected: boolean; matchedTerm?: string } {
  if (!text || !text.trim()) return { detected: false };

  const normalizedRaw = text.toLowerCase();
  const normalizedLeet = normalizeLeet(text);
  const collapsed = collapseRepeatedChars(normalizedLeet);
  const strippedPunct = normalizedRaw.replace(/([a-z])[*._\-!$@](?=[a-z])/gi, '$1');
  const spacedCollapsed = normalizedRaw.replace(/\b([a-z])\s+([a-z])\s+([a-z])(?:\s+([a-z]))?\b/gi, '$1$2$3$4');

  const versionsToTest = [
    normalizedRaw,
    normalizedLeet,
    collapsed,
    strippedPunct,
    spacedCollapsed,
  ];

  for (const term of MULTILINGUAL_ABUSE_TERMS) {
    const escapedTerm = term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    if (term.includes(' ')) {
      for (const v of versionsToTest) {
        if (v.includes(term)) {
          return { detected: true, matchedTerm: term };
        }
      }
    } else {
      const regex = new RegExp(`(?:^|[^a-zA-Z0-9\\u0900-\\u097F])${escapedTerm}(?:$|[^a-zA-Z0-9\\u0900-\\u097F])`, 'iu');
      for (const v of versionsToTest) {
        if (regex.test(v)) {
          const words = v.split(/[^a-zA-Z0-9\\u0900-\\u097F]+/);
          const hasUnsafe = words.some((w) => w === term && !SAFE_WORDS.has(w));
          if (hasUnsafe || regex.test(v)) {
            return { detected: true, matchedTerm: term };
          }
        }
      }
    }
  }

  return { detected: false };
}

// ── Master Scanner Function ──────────────────────────────────────────────────
export function scanContent(text: string): ScanResult {
  const reasons: string[] = [];
  const matchedTerms: string[] = [];

  // 1. Phone scan
  const hasPhone = detectPhone(text);
  if (hasPhone) {
    reasons.push('phone_number_detected');
    matchedTerms.push('phone_number');
  }

  // 2. Email scan
  const emailResult = detectEmail(text);
  if (emailResult.detected) {
    if (emailResult.isGmail) {
      reasons.push('gmail_detected');
      matchedTerms.push('gmail');
    } else {
      reasons.push('email_detected');
      matchedTerms.push('email');
    }
  }

  // 3. Instagram scan
  const hasInstagram = detectInstagram(text);
  if (hasInstagram) {
    reasons.push('instagram_detected');
    matchedTerms.push('instagram');
  }

  // 4. Facebook scan
  const hasFacebook = detectFacebook(text);
  if (hasFacebook) {
    reasons.push('facebook_detected');
    matchedTerms.push('facebook');
  }

  // 5. Other social media scan (WhatsApp, Telegram, Snapchat)
  const hasOtherSocial = detectOtherSocial(text);
  if (hasOtherSocial) {
    reasons.push('social_media_detected');
    matchedTerms.push('social_media');
  }

  // 6. Multilingual Abusive Language Guardrails
  const abuseResult = detectAbuse(text);
  if (abuseResult.detected) {
    reasons.push('abusive_language_detected');
    if (abuseResult.matchedTerm) {
      matchedTerms.push(abuseResult.matchedTerm);
    }
  }

  const hasContactInfo = hasPhone || emailResult.detected || hasInstagram || hasFacebook || hasOtherSocial;
  const hasAbusiveLanguage = abuseResult.detected;

  return {
    flagged: reasons.length > 0,
    reasons,
    hasContactInfo,
    hasAbusiveLanguage,
    categories: {
      phone: hasPhone,
      email: emailResult.detected,
      gmail: emailResult.isGmail,
      instagram: hasInstagram,
      facebook: hasFacebook,
      socialMedia: hasOtherSocial,
      abuse: hasAbusiveLanguage,
    },
    matchedTerms,
  };
}

// ── Moderation Persistence & Policy Enforcement ──────────────────────────────
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
): Promise<{ blocked: boolean; reason?: string; flagId?: string }> {
  if (!content || !content.trim()) return { blocked: false };

  const scanResult = scanContent(content);
  if (!scanResult.flagged) return { blocked: false };

  // Avoid inserting duplicate flags for the exact same session & reasons within the last 15 seconds
  if (meta.sessionId) {
    const recentDuplicate = await prisma.flaggedContent.findFirst({
      where: {
        sessionId: meta.sessionId,
        source,
        reason: scanResult.reasons.join(', '),
        createdAt: { gte: new Date(Date.now() - 15 * 1000) },
      },
    });
    if (recentDuplicate) {
      return {
        blocked: source === 'CHAT' && (scanResult.hasContactInfo || scanResult.hasAbusiveLanguage),
        reason: getBlockReason(scanResult),
        flagId: recentDuplicate.id,
      };
    }
  }

  // Persist flag record in database for Admin review
  const flag = await prisma.flaggedContent.create({
    data: {
      source,
      contentSnippet: content.slice(0, 500),
      reason: scanResult.reasons.join(', '),
      status: 'PENDING',
      sessionId: meta.sessionId ?? null,
      userId: meta.userId ?? null,
      practitionerId: meta.practitionerId ?? null,
      transcriptId: meta.transcriptId ?? null,
      chatMessageId: meta.chatMessageId ?? null,
    },
  });

  // Apply temporary ban for contact info sharing if needed
  if (scanResult.hasContactInfo) {
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
  }

  // In chat sessions, actively block the message from reaching the recipient
  if (source === 'CHAT') {
    return {
      blocked: true,
      reason: getBlockReason(scanResult),
      flagId: flag.id,
    };
  }

  // Call transcripts or other sources cannot be blocked retroactively, but are registered for Admin
  return { blocked: false, flagId: flag.id };
}

function getBlockReason(scanResult: ScanResult): string {
  if (scanResult.hasContactInfo && scanResult.hasAbusiveLanguage) {
    return 'Sharing contact info (phone, Gmail, Instagram, Facebook) and abusive language are strictly prohibited.';
  }
  if (scanResult.categories.phone) {
    return 'Sharing phone numbers is not permitted on this platform.';
  }
  if (scanResult.categories.gmail || scanResult.categories.email) {
    return 'Sharing Gmail or email addresses is not permitted on this platform.';
  }
  if (scanResult.categories.instagram) {
    return 'Sharing Instagram handles or profiles is not permitted on this platform.';
  }
  if (scanResult.categories.facebook) {
    return 'Sharing Facebook profiles or handles is not permitted on this platform.';
  }
  if (scanResult.categories.socialMedia) {
    return 'Sharing external messaging or social profiles (WhatsApp, Telegram, etc.) is not permitted.';
  }
  if (scanResult.hasAbusiveLanguage) {
    return 'Abusive, profane, or inappropriate language is strictly prohibited by our platform guardrails.';
  }
  return 'Message blocked by platform safety guardrails.';
}
