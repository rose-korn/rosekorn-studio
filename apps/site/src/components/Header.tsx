"use client";

import { useEffect, useState } from "react";
import { getContent, localePath, otherLocale, ui, type Locale } from "@/content";
import { Logo } from "./Logo";
import { LineIcon } from "./LineIcon";

/** `path` is this page's locale-free path ("/"), used for the language switch */
export function Header({ locale, path = "/" }: { locale: Locale; path?: string }) {
  const { nav, site } = getContent(locale);
  const t = ui[locale];
  const other = otherLocale(locale);
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 md:px-6 md:pt-4">
      <div
        className={`mx-auto flex h-14 max-w-[1320px] items-center justify-between rounded-full px-4 transition-all duration-300 md:h-16 md:px-6 ${
          scrolled || open ? "sticker-sm bg-paper" : "border-2 border-transparent"
        }`}
      >
        <a href="#top" aria-label={`${site.name} ${t.home}`} onClick={() => setOpen(false)}>
          <Logo />
        </a>

        <nav className="hidden items-center gap-8 md:flex" aria-label={t.mainNav}>
          {nav.map((item) => (
            <a key={item.href} href={item.href} className="group relative text-[0.95rem]">
              <span className="link-underline">{item.label}</span>
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <a
            href={localePath(other, path)}
            hrefLang={other}
            lang={other}
            aria-label={t.switchLabel}
            className="press inline-flex h-10 items-center rounded-full border-2 border-ink px-3 font-mono text-xs font-bold tracking-wider hover:bg-ink hover:text-paper"
          >
            {locale === "th" ? "EN" : "TH"}
          </a>
          <a
            href={site.lineUrl}
            target="_blank"
            rel="noreferrer"
            data-cursor="LINE"
            className="press sticker-sm inline-flex h-10 items-center gap-2 rounded-full bg-paper px-4 text-sm font-medium hover:bg-line-green hover:text-white"
          >
            <LineIcon className="h-4 w-4" /> LINE
          </a>
          <a
            href="#contact"
            data-cursor={t.talk}
            className="press sticker-sm inline-flex h-10 items-center rounded-full bg-rose px-5 text-sm font-semibold text-white"
          >
            {t.book}
          </a>
        </div>

        <div className="flex items-center gap-1 md:hidden">
        <a
          href={localePath(other, path)}
          hrefLang={other}
          lang={other}
          aria-label={t.switchLabel}
          className="inline-flex h-9 items-center rounded-full border-2 border-ink px-2.5 font-mono text-[11px] font-bold tracking-wider"
        >
          {locale === "th" ? "EN" : "TH"}
        </a>
        <button
          type="button"
          className="relative flex h-10 w-10 items-center justify-center"
          aria-label={open ? t.closeMenu : t.openMenu}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
        >
          <span className={`absolute h-px w-6 bg-ink transition ${open ? "rotate-45" : "-translate-y-1.5"}`} />
          <span className={`absolute h-px w-6 bg-ink transition ${open ? "-rotate-45" : "translate-y-1.5"}`} />
        </button>
        </div>
      </div>

      <div
        id="mobile-menu"
        className={`md:hidden ${open ? "block" : "hidden"} sticker mx-auto mt-2 max-h-[calc(100dvh-6rem)] overflow-y-auto rounded-3xl bg-paper pb-6`}
      >
        <nav className="container-x flex flex-col pt-6" aria-label={t.mobileNav}>
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="flex items-baseline justify-between border-b border-line py-5"
            >
              <span className={`${locale === "th" ? "font-thai" : ""} text-3xl font-semibold`}>{item.label}</span>
              <span className="eyebrow text-muted">{item.en}</span>
            </a>
          ))}
          <div className="mt-8 grid gap-3">
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="sticker-sm flex h-14 items-center justify-center rounded-full bg-rose font-semibold text-white"
            >
              {t.book}
            </a>
            <a
              href={site.lineUrl}
              target="_blank"
              rel="noreferrer"
              className="sticker-sm flex h-14 items-center justify-center gap-2 rounded-full bg-line-green font-semibold text-white"
            >
              <LineIcon /> {t.addLine} {site.lineOaId}
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}
