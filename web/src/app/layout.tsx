import type { Metadata } from "next";
import Script from "next/script";
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
        <script
          dangerouslySetInnerHTML={{
            __html: `
              function googleTranslateElementInit() {
                new google.translate.TranslateElement({ pageLanguage: 'en', autoDisplay: false }, 'google_translate_element');
              }
            `,
          }}
        />
        <Script src="//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit" strategy="afterInteractive" />
      </head>
      <body className={`${inter.variable} ${playfair.variable} ${cormorant.variable} font-sans antialiased theme`}>
        <div id="google_translate_element" style={{ display: 'none' }} />
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
                {children}
              </SmoothScroll>
            </LayoutProvider>
          </LangProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
