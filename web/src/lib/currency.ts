// Detect currency from browser locale/timezone — no API call needed
const LOCALE_CURRENCY: Record<string, { code: string; symbol: string; rate: number }> = {
  IN: { code: 'INR', symbol: '₹', rate: 1 },
  US: { code: 'USD', symbol: '$', rate: 0.012 },
  GB: { code: 'GBP', symbol: '£', rate: 0.0095 },
  EU: { code: 'EUR', symbol: '€', rate: 0.011 },
  AE: { code: 'AED', symbol: 'AED', rate: 0.044 },
  SA: { code: 'SAR', symbol: 'SAR', rate: 0.045 },
  AU: { code: 'AUD', symbol: 'A$', rate: 0.018 },
  CA: { code: 'CAD', symbol: 'C$', rate: 0.016 },
  SG: { code: 'SGD', symbol: 'S$', rate: 0.016 },
  MY: { code: 'MYR', symbol: 'RM', rate: 0.056 },
  PK: { code: 'PKR', symbol: '₨', rate: 3.33 },
  BD: { code: 'BDT', symbol: '৳', rate: 1.32 },
  NP: { code: 'NPR', symbol: 'Rs', rate: 1.6 },
  DE: { code: 'EUR', symbol: '€', rate: 0.011 },
  FR: { code: 'EUR', symbol: '€', rate: 0.011 },
  IT: { code: 'EUR', symbol: '€', rate: 0.011 },
  ES: { code: 'EUR', symbol: '€', rate: 0.011 },
  RU: { code: 'RUB', symbol: '₽', rate: 1.1 },
  JP: { code: 'JPY', symbol: '¥', rate: 1.8 },
  CN: { code: 'CNY', symbol: '¥', rate: 0.086 },
};

const TIMEZONE_COUNTRY: Record<string, string> = {
  'Asia/Kolkata': 'IN',
  'Asia/Calcutta': 'IN',
  'America/New_York': 'US',
  'America/Chicago': 'US',
  'America/Los_Angeles': 'US',
  'Europe/London': 'GB',
  'Europe/Berlin': 'DE',
  'Europe/Paris': 'FR',
  'Europe/Rome': 'IT',
  'Europe/Madrid': 'ES',
  'Asia/Dubai': 'AE',
  'Asia/Riyadh': 'SA',
  'Australia/Sydney': 'AU',
  'America/Toronto': 'CA',
  'Asia/Singapore': 'SG',
  'Asia/Kuala_Lumpur': 'MY',
  'Asia/Karachi': 'PK',
  'Asia/Dhaka': 'BD',
  'Asia/Kathmandu': 'NP',
  'Europe/Moscow': 'RU',
  'Asia/Tokyo': 'JP',
  'Asia/Shanghai': 'CN',
};

function detectCountry(): string {
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    if (TIMEZONE_COUNTRY[tz]) return TIMEZONE_COUNTRY[tz];
    // fallback: check locale
    const locale = navigator.language || 'en-IN';
    const region = locale.split('-')[1]?.toUpperCase();
    if (region && LOCALE_CURRENCY[region]) return region;
  } catch {}
  return 'IN';
}

export function getUserCurrency() {
  const country = detectCountry();
  return LOCALE_CURRENCY[country] ?? LOCALE_CURRENCY['IN'];
}

export function convertFromINR(inrAmount: number) {
  const currency = getUserCurrency();
  const converted = inrAmount * currency.rate;
  // Round nicely
  return {
    ...currency,
    amount: currency.code === 'INR' ? inrAmount : parseFloat(converted.toFixed(2)),
    display: `${currency.symbol}${currency.code === 'INR' ? inrAmount : converted.toFixed(2)}`,
  };
}
