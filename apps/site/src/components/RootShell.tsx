import type { Metadata, Viewport } from "next";
import { Anuphan, Inter_Tight, Instrument_Serif, JetBrains_Mono } from "next/font/google";
import { getContent, localePath, type Locale } from "@/content";
import { RevealScript } from "@/components/RevealScript";
import { Motion } from "@/components/Motion";
import { RoseCursor } from "@/components/RoseCursor";
import "@/app/globals.css";

const interTight = Inter_Tight({
  variable: "--font-inter-tight",
  subsets: ["latin"],
  display: "swap",
});

// Thai typeface by Cadson Demak: modern, loopless, pairs well with grotesks
const anuphan = Anuphan({
  variable: "--font-anuphan",
  subsets: ["thai", "latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  display: "swap",
});

/** Metadata shared by both languages; each root layout adds its own title, description and locale */
export function baseMetadata(locale: Locale): Metadata {
  const { site } = getContent(locale);
  const th = locale === "th";
  const tagline = th ? "รับทำเว็บไซต์ Next.js สำหรับร้านและธุรกิจ" : "Next.js websites for Thai shops and brands";
  return {
    metadataBase: new URL(site.url),
    title: { default: `${site.name} — ${tagline}`, template: `%s · ${site.name}` },
    description: site.description,
    openGraph: {
      type: "website",
      locale: th ? "th_TH" : "en_US",
      alternateLocale: th ? ["en_US"] : ["th_TH"],
      url: localePath(locale, "/"),
      siteName: site.name,
      title: `${site.name} — ${th ? "เว็บที่ขายของได้จริง" : "Websites that actually sell"}`,
      description: site.description,
    },
  };
}

/** canonical + hreflang pair for a page, given its locale-free path ("/privacy/") */
export function languageAlternates(locale: Locale, path: string): Metadata["alternates"] {
  return {
    canonical: localePath(locale, path),
    languages: { th: path, en: `/en${path}`, "x-default": path },
  };
}

export const viewport: Viewport = {
  themeColor: "#f3eee6",
};

/** <html>/<body> shell for both root layouts, so each language gets the right lang attribute */
export function RootShell({ locale, children }: Readonly<{ locale: Locale; children: React.ReactNode }>) {
  return (
    <html
      lang={locale}
      className={`${interTight.variable} ${anuphan.variable} ${instrumentSerif.variable} ${jetbrains.variable}`}
    >
      <body className="antialiased" suppressHydrationWarning>
        <RevealScript />
        {children}
        <Motion />
        <RoseCursor />
      </body>
    </html>
  );
}
