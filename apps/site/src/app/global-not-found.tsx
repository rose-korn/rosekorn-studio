/* eslint-disable @next/next/no-html-link-for-pages -- full page loads so the home intro runs again */
import type { Metadata } from "next";
import { RootShell } from "@/components/RootShell";
import { Logo } from "@/components/Logo";

export const metadata: Metadata = { title: "404 · Rosekorn Studio", robots: { index: false } };

/** One 404 for both languages (with route-group root layouts there is no shared layout to wrap it) */
export default function GlobalNotFound() {
  return (
    <RootShell locale="th">
      <main className="container-x flex min-h-dvh flex-col items-start justify-center gap-6 py-24">
        <Logo />
        <p className="font-mono text-sm text-rose">404</p>
        <h1 className="font-thai text-[clamp(2.2rem,6vw,4.5rem)] font-semibold leading-tight">
          ไม่เจอหน้านี้
          <br />
          <span lang="en" className="font-serif font-normal italic">
            This page doesn’t exist.
          </span>
        </h1>
        <div className="flex flex-wrap gap-3">
          <a href="/" className="press sticker-sm inline-flex h-12 items-center rounded-full bg-rose px-6 font-semibold text-white">
            กลับหน้าแรก
          </a>
          <a href="/en/" lang="en" className="press sticker-sm inline-flex h-12 items-center rounded-full bg-paper px-6 font-semibold">
            Back to home
          </a>
        </div>
      </main>
    </RootShell>
  );
}
