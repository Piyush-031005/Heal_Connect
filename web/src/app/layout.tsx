import type { Metadata } from "next";
import { Inter, Playfair_Display, Cinzel } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { LangProvider } from "@/lib/lang-context";
import { LayoutProvider } from "@/lib/layout-context";

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair' });
const cinzel = Cinzel({ subsets: ['latin'], variable: '--font-cinzel' });

export const metadata: Metadata = {
  title: "HealConnect - Professional Wellness",
  description: "Connect with verified energy healers, Vastu experts, numerologists, and tarot readers instantly.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${playfair.variable} ${cinzel.variable} font-sans antialiased theme`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          themes={['light', 'dark', 'chestnut', 'cosmic', 'obsidian', 'black-pink', 'dark-coral']}
          enableSystem={false}
          disableTransitionOnChange
        >
          <LangProvider>
            <LayoutProvider>
              {children}
            </LayoutProvider>
          </LangProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
