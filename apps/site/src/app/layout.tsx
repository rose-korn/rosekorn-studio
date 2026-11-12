import type { Metadata, Viewport } from "next";
import { Anuphan, Inter_Tight, Instrument_Serif, JetBrains_Mono } from "next/font/google";
import { site } from "@/content/site";
import { RevealScript } from "@/components/RevealScript";
import "./globals.css";

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

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — รับทำเว็บไซต์ Next.js สำหรับร้านและธุรกิจ`,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  openGraph: {
    type: "website",
    locale: "th_TH",
    url: site.url,
    siteName: site.name,
    title: `${site.name} — เว็บที่ขายของได้จริง`,
    description: site.description,
  },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = {
  themeColor: "#f3eee6",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="th"
      className={`${interTight.variable} ${anuphan.variable} ${instrumentSerif.variable} ${jetbrains.variable}`}
    >
      <body className="antialiased">
        <RevealScript />
        {children}
      </body>
    </html>
  );
}
