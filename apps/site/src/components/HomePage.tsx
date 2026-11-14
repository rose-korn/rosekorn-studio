import type { Locale } from "@/content";
import { Header } from "@/components/Header";
import { Hero } from "@/components/sections/Hero";
import { Marquee } from "@/components/sections/Marquee";
import { Work } from "@/components/sections/Work";
import { Packages } from "@/components/sections/Packages";
import { Process } from "@/components/sections/Process";
import { Faq } from "@/components/sections/Faq";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/sections/Footer";

/** The studio home page, rendered at / (Thai) and /en/ (English) */
export function HomePage({ locale }: { locale: Locale }) {
  return (
    <>
      <Header locale={locale} path="/" />
      <main>
        <Hero locale={locale} />
        <Marquee locale={locale} />
        <Work locale={locale} />
        <Packages locale={locale} />
        <Process locale={locale} />
        <Faq locale={locale} />
        <Contact locale={locale} />
      </main>
      <Footer locale={locale} />
    </>
  );
}
