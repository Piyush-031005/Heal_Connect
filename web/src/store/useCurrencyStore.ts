import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const CURRENCY_MAP: Record<string, { code: string; symbol: string }> = {
  IN: { code: 'INR', symbol: '₹' },
  US: { code: 'USD', symbol: '$' },
  GB: { code: 'GBP', symbol: '£' },
  EU: { code: 'EUR', symbol: '€' },
  AE: { code: 'AED', symbol: 'AED' },
  SA: { code: 'SAR', symbol: 'SAR' },
  AU: { code: 'AUD', symbol: 'A$' },
  CA: { code: 'CAD', symbol: 'C$' },
  SG: { code: 'SGD', symbol: 'S$' },
  MY: { code: 'MYR', symbol: 'RM' },
  PK: { code: 'PKR', symbol: '₨' },
  BD: { code: 'BDT', symbol: '৳' },
  NP: { code: 'NPR', symbol: 'Rs' },
  DE: { code: 'EUR', symbol: '€' },
  FR: { code: 'EUR', symbol: '€' },
  IT: { code: 'EUR', symbol: '€' },
  ES: { code: 'EUR', symbol: '€' },
  RU: { code: 'RUB', symbol: '₽' },
  JP: { code: 'JPY', symbol: '¥' },
  CN: { code: 'CNY', symbol: '¥' },
};

interface CurrencyState {
  countryCode: string;
  currencyCode: string;
  currencySymbol: string;
  exchangeRate: number; // 1 GBP = X Local Currency
  lastUpdated: number;
  isLoading: boolean;
  initCurrency: () => Promise<void>;
  format: (usdAmount: number | string) => string;
}

const CACHE_DURATION_MS = 24 * 60 * 60 * 1000; // 24 hours

export const useCurrencyStore = create<CurrencyState>()(
  persist(
    (set, get) => ({
      countryCode: 'GB',
      currencyCode: 'GBP',
      currencySymbol: '£',
      exchangeRate: 1, // Base is GBP
      lastUpdated: 0,
      isLoading: false,

      initCurrency: async () => {
        const now = Date.now();
        const { lastUpdated } = get();

        // Use cache if within 24 hours
        if (now - lastUpdated < CACHE_DURATION_MS) {
          return;
        }

        set({ isLoading: true });

        try {
          // 1. Get Country Code from IP
          let country = 'US';
          try {
            const ipRes = await fetch('https://ipapi.co/json/');
            const ipData = await ipRes.json();
            if (ipData && ipData.country_code) {
              country = ipData.country_code;
            }
          } catch (e) {
            console.warn('Failed to detect IP, defaulting to US');
          }

          const currencyInfo = CURRENCY_MAP[country] || CURRENCY_MAP['US'];
          
          // 2. Get Live Exchange Rates vs GBP
          let rate = 1;
          try {
            const rateRes = await fetch('https://api.exchangerate-api.com/v4/latest/GBP');
            const rateData = await rateRes.json();
            if (rateData && rateData.rates && rateData.rates[currencyInfo.code]) {
              rate = rateData.rates[currencyInfo.code];
            }
          } catch (e) {
            console.warn('Failed to fetch exchange rates, defaulting to 1');
          }

          set({
            countryCode: country,
            currencyCode: currencyInfo.code,
            currencySymbol: currencyInfo.symbol,
            exchangeRate: rate,
            lastUpdated: now,
            isLoading: false,
          });
        } catch (error) {
          console.error('Failed to initialize currency:', error);
          set({ isLoading: false });
        }
      },

      format: (usdAmount: number | string) => {
        const amount = typeof usdAmount === 'string' ? parseFloat(usdAmount) : usdAmount;
        if (isNaN(amount)) return `${get().currencySymbol}0`;
        
        const { exchangeRate, currencySymbol } = get();
        const converted = amount * exchangeRate;
        
        // Show 2 decimals if not a whole number or if currency expects it, but for simplicity:
        return `${currencySymbol}${converted.toFixed(converted % 1 === 0 ? 0 : 2)}`;
      },
    }),
    {
      name: 'zenauraa-currency-storage',
    }
  )
);
