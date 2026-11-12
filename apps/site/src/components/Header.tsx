"use client";

import { useEffect, useState } from "react";
import { nav, site } from "@/content/site";
import { Logo } from "./Logo";
import { LineIcon } from "./LineIcon";

export function Header() {
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
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled || open ? "border-b border-line/70 bg-paper/85 backdrop-blur-md" : "border-b border-transparent"
      }`}
    >
      <div className="container-x flex h-16 items-center justify-between md:h-20">
        <a href="#top" aria-label={`${site.name} หน้าแรก`} onClick={() => setOpen(false)}>
          <Logo />
        </a>

        <nav className="hidden items-center gap-8 md:flex" aria-label="เมนูหลัก">
          {nav.map((item) => (
            <a key={item.href} href={item.href} className="group relative text-[0.95rem]">
              <span className="link-underline">{item.label}</span>
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <a
            href={site.lineUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-10 items-center gap-2 rounded-full border border-ink/15 px-4 text-sm transition hover:border-line-green hover:text-line-green"
          >
            <LineIcon className="h-4 w-4" /> LINE
          </a>
          <a
            href="#contact"
            className="inline-flex h-10 items-center rounded-full bg-ink px-5 text-sm font-medium text-paper transition hover:bg-rose"
          >
            จองคิวคุยงาน
          </a>
        </div>

        <button
          type="button"
          className="relative flex h-10 w-10 items-center justify-center md:hidden"
          aria-label={open ? "ปิดเมนู" : "เปิดเมนู"}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
        >
          <span className={`absolute h-px w-6 bg-ink transition ${open ? "rotate-45" : "-translate-y-1.5"}`} />
          <span className={`absolute h-px w-6 bg-ink transition ${open ? "-rotate-45" : "translate-y-1.5"}`} />
        </button>
      </div>

      <div
        id="mobile-menu"
        className={`md:hidden ${open ? "block" : "hidden"} h-[calc(100dvh-4rem)] overflow-y-auto bg-paper`}
      >
        <nav className="container-x flex flex-col pt-6" aria-label="เมนูมือถือ">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="flex items-baseline justify-between border-b border-line py-5"
            >
              <span className="font-thai text-3xl font-semibold">{item.label}</span>
              <span className="eyebrow text-muted">{item.en}</span>
            </a>
          ))}
          <div className="mt-8 grid gap-3">
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="flex h-14 items-center justify-center rounded-full bg-ink text-paper"
            >
              จองคิวคุยงาน
            </a>
            <a
              href={site.lineUrl}
              target="_blank"
              rel="noreferrer"
              className="flex h-14 items-center justify-center gap-2 rounded-full bg-line-green text-white"
            >
              <LineIcon /> แอด LINE {site.lineOaId}
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}
