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
  title: "Zenauraa - Professional Wellness",
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
      <body className={`${inter.variable} ${playfair.variable} ${cormorant.variable} font-sans antialiased theme`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="theme-lavender-base"
          themes={['theme-lavender-base', 'theme-lavender-light', 'theme-lavender-deep', 'theme-lavender-night', 'theme-soft-blue', 'theme-pink-lavender', 'theme-deep-forest']}
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
