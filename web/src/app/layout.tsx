import type { Metadata } from "next";
import { Inter, Playfair_Display, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { LangProvider } from "@/lib/lang-context";
import { LayoutProvider } from "@/lib/layout-context";

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair' });
const cormorant = Cormorant_Garamond({ subsets: ['latin'], weight: ['300', '400', '500', '600', '700'], variable: '--font-cormorant' });

export const metadata: Metadata = {
  title: "ZenAuraa - Professional Wellness",
  description: "Connect with verified energy healers, Vastu experts, numerologists, and tarot readers instantly.",
};

import SmoothScroll from "@/components/smooth-scroll";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: `
          function googleTranslateElementInit() {
            new google.translate.TranslateElement({
              pageLanguage: 'en',
              includedLanguages: 'en,hi,ta,te,bn,mr,gu,kn,pa,ur,es,fr,de,ar,zh-CN,ja,ko',
              autoDisplay: false
            }, 'google_translate_element');
          }
          window.__translateTo = function(langCode) {
            if (!langCode || langCode === 'en') {
              document.cookie = 'googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/';
              document.cookie = 'googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=' + location.hostname;
              var select = document.querySelector('.goog-te-combo');
              if (select) { select.value = ''; select.dispatchEvent(new Event('change')); }
              return;
            }
            var tries = 0;
            var interval = setInterval(function() {
              var select = document.querySelector('.goog-te-combo');
              if (select) {
                clearInterval(interval);
                select.value = langCode;
                select.dispatchEvent(new Event('change'));
              } else if (++tries > 20) {
                clearInterval(interval);
              }
            }, 300);
          };
        `}} />
        <script src="//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit" async />
      </head>
      <body className={`${inter.variable} ${playfair.variable} ${cormorant.variable} font-sans antialiased theme`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="theme-new-color"
          themes={['theme-new-color']}
          enableSystem={false}
          disableTransitionOnChange
        >
          <LangProvider>
            <LayoutProvider>
              <SmoothScroll>
                <div id="google_translate_element" style={{ display: 'none' }} />
                {children}
              </SmoothScroll>
            </LayoutProvider>
          </LangProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
