import { Logo } from "@/components/Logo";
import { Footer } from "@/components/sections/Footer";
import { localePath, otherLocale, ui, type Locale } from "@/content";

/**
 * Shared shell for the legal pages (privacy, terms): a plain header back to the studio,
 * a paper sheet with a table of contents, and the normal footer.
 */
export function LegalPage({
  locale,
  path,
  eyebrow,
  title,
  updated,
  intro,
  toc,
  children,
}: {
  locale: Locale;
  /** locale-free path of this page ("/privacy/"), for the language switch */
  path: string;
  eyebrow: string;
  title: string;
  updated: string;
  intro: React.ReactNode;
  toc: { id: string; label: string }[];
  children: React.ReactNode;
}) {
  const t = ui[locale];
  const home = localePath(locale, "/");
  const other = otherLocale(locale);
  return (
    <>
      <header className="container-x flex items-center justify-between py-6">
        <a href={home} aria-label={`Rosekorn Studio ${t.home}`}>
          <Logo />
        </a>
        <div className="flex items-center gap-4">
          <a
            href={localePath(other, path)}
            hrefLang={other}
            lang={other}
            aria-label={t.switchLabel}
            className="inline-flex h-9 items-center rounded-full border-2 border-ink px-2.5 font-mono text-[11px] font-bold tracking-wider hover:bg-ink hover:text-paper"
          >
            {locale === "th" ? "EN" : "TH"}
          </a>
          <a href={home} className="link-underline text-sm font-semibold">
            {t.legal.back}
          </a>
        </div>
      </header>
      <main id="top" className="container-x pb-24 pt-8 md:pb-32 md:pt-12">
        <p className="eyebrow text-muted">{eyebrow}</p>
        <h1 className="mt-4 max-w-3xl font-thai text-[clamp(2.2rem,5vw,3.6rem)] font-semibold leading-tight">{title}</h1>
        <p className="mt-3 text-sm text-muted">
          {t.legal.updated} {updated}
        </p>
        <div className="mt-6 max-w-2xl text-lg text-ink/80">{intro}</div>

        <div className="mt-12 grid gap-10 lg:grid-cols-[15rem_1fr] lg:gap-16">
          <nav aria-label={t.legal.toc} className="lg:sticky lg:top-8 lg:self-start">
            <p className="eyebrow text-muted">{t.legal.toc}</p>
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
      <Footer locale={locale} />
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
