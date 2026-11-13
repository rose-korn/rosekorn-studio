/* eslint-disable @next/next/no-html-link-for-pages -- full page loads back to the studio so its GSAP intro runs again */
import { Logo } from "@/components/Logo";
import { Footer } from "@/components/sections/Footer";

/**
 * Shared shell for the legal pages (privacy, terms): a plain header back to the studio,
 * a paper sheet with a table of contents, and the normal footer.
 */
export function LegalPage({
  eyebrow,
  title,
  updated,
  intro,
  toc,
  children,
}: {
  eyebrow: string;
  title: string;
  updated: string;
  intro: React.ReactNode;
  toc: { id: string; label: string }[];
  children: React.ReactNode;
}) {
  return (
    <>
      <header className="container-x flex items-center justify-between py-6">
        <a href="/" aria-label="Rosekorn Studio หน้าแรก">
          <Logo />
        </a>
        <a href="/" className="link-underline text-sm font-semibold">
          ← กลับหน้าแรก
        </a>
      </header>
      <main id="top" className="container-x pb-24 pt-8 md:pb-32 md:pt-12">
        <p className="eyebrow text-muted">{eyebrow}</p>
        <h1 className="mt-4 max-w-3xl font-thai text-[clamp(2.2rem,5vw,3.6rem)] font-semibold leading-tight">{title}</h1>
        <p className="mt-3 text-sm text-muted">ปรับปรุงล่าสุด {updated}</p>
        <div className="mt-6 max-w-2xl text-lg text-ink/80">{intro}</div>

        <div className="mt-12 grid gap-10 lg:grid-cols-[15rem_1fr] lg:gap-16">
          <nav aria-label="สารบัญ" className="lg:sticky lg:top-8 lg:self-start">
            <p className="eyebrow text-muted">สารบัญ</p>
            <ol className="mt-4 space-y-2 text-sm">
              {toc.map((t, i) => (
                <li key={t.id} className="flex gap-2">
                  <span className="font-mono text-muted">{String(i + 1).padStart(2, "0")}</span>
                  <a href={`#${t.id}`} className="link-underline">
                    {t.label}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
          <article className="legal sticker wobbly bg-paper p-6 md:p-10">{children}</article>
        </div>
      </main>
      <Footer />
    </>
  );
}

/** One numbered clause */
export function Clause({ id, n, title, children }: { id: string; n: number; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="scroll-mt-8 border-b border-ink/10 py-8 first:pt-0 last:border-0 last:pb-0">
      <h2 className="flex items-baseline gap-3 font-thai text-xl font-semibold md:text-2xl">
        <span className="font-mono text-sm text-rose">{String(n).padStart(2, "0")}</span>
        {title}
      </h2>
      <div className="mt-4 space-y-3 leading-relaxed text-ink/85">{children}</div>
    </section>
  );
}
