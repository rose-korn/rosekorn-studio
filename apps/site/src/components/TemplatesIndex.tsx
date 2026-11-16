import { Logo } from "@/components/Logo";
import { Footer } from "@/components/sections/Footer";
import { Doodle } from "@/components/Doodle";
import { localePath, otherLocale, ui, type Locale } from "@/content";
import { templateCards, templatesCopy } from "@/content/templates";
import { Illo } from "@/templates/basic/Illo";

/** the drawn placeholders take the studio's own colours here */
const studioVars = {
  "--t-ink": "var(--color-ink)",
  "--t-accent": "var(--color-rose)",
  "--t-soft": "var(--color-rose-soft)",
  "--t-surface": "var(--color-paper)",
} as React.CSSProperties;

/** /templates: the Landing Basic templates a client can pick from */
export function TemplatesIndex({ locale }: { locale: Locale }) {
  const t = templatesCopy[locale];
  const u = ui[locale];
  const home = localePath(locale, "/");
  const other = otherLocale(locale);
  const th = locale === "th" ? "font-thai " : "";
  return (
    <>
      <header className="container-x flex items-center justify-between py-6">
        <a href={home} aria-label={`Rosekorn Studio ${u.home}`}>
          <Logo />
        </a>
        <div className="flex items-center gap-4">
          <a
            href={localePath(other, "/templates/")}
            hrefLang={other}
            lang={other}
            aria-label={u.switchLabel}
            className="inline-flex h-9 items-center rounded-full border-2 border-ink px-2.5 font-mono text-[11px] font-bold tracking-wider hover:bg-ink hover:text-paper"
          >
            {locale === "th" ? "EN" : "TH"}
          </a>
          <a href={home} className="link-underline text-sm font-semibold">
            {u.legal.back}
          </a>
        </div>
      </header>

      <main id="top" className="container-x pb-24 pt-8 md:pb-32 md:pt-12">
        <p className="eyebrow text-muted">{t.eyebrow}</p>
        <h1 className={`mt-4 max-w-4xl ${th}text-[clamp(2.2rem,5.5vw,4rem)] font-semibold leading-[1.1]`}>
          {t.title} <span className="font-serif italic text-rose">{t.titleAccent}</span>
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-ink/75">{t.lead}</p>
        <ul className="mt-6 flex flex-wrap gap-2.5">
          {t.points.map((p, i) => (
            <li key={p} className={`inline-flex items-center gap-2 rounded-full border-2 border-ink bg-paper px-3.5 py-1.5 text-sm font-medium ${th}`}>
              <Doodle kind="check" n={i} className="h-4 w-4 text-rose" strokeWidth={3} />
              {p}
            </li>
          ))}
        </ul>

        <ul className="mt-14 grid gap-8 md:grid-cols-3" style={studioVars}>
          {templateCards[locale].map((c, i) => {
            const body = (
              <>
                <div className={`flex aspect-[4/3] items-center justify-center border-b-2 border-ink ${c.ready ? "bg-rose-soft" : "bg-paper-2"}`}>
                  <Illo kind={c.illo} className={`h-2/3 w-2/3 ${c.ready ? "" : "opacity-40"}`} />
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <div className="flex items-start justify-between gap-3">
                    <h2 className={`${th}text-xl font-semibold`}>{c.name}</h2>
                    {c.ready ? null : (
                      <span className={`shrink-0 rounded-full border-2 border-dashed border-ink/40 px-2.5 py-0.5 text-xs font-semibold text-muted ${th}`}>{t.soon}</span>
                    )}
                  </div>
                  <p className="mt-3 text-sm text-muted">
                    <span className="font-semibold text-ink">{t.forWho}:</span> {c.forWho}
                  </p>
                  <p className="mt-2 text-sm text-muted">
                    <span className="font-semibold text-ink">{t.has}:</span> {c.sections}
                  </p>
                  {c.ready ? <p className="mt-auto pt-5 text-sm font-semibold text-rose group-hover:underline">{t.open}</p> : null}
                </div>
              </>
            );
            const rotate = `${[-1, 0.8, -0.5][i % 3]}deg`;
            return (
              <li key={c.slug} style={{ rotate }}>
                {c.ready ? (
                  <a
                    href={`/templates/${c.slug}/`}
                    data-cursor={t.open.replace(" →", "")}
                    className="sticker wobbly group flex h-full flex-col overflow-hidden bg-paper transition duration-300 hover:-translate-y-1.5 hover:shadow-[8px_8px_0_var(--color-ink)]"
                  >
                    {body}
                  </a>
                ) : (
                  <div className="wobbly flex h-full flex-col overflow-hidden border-2 border-dashed border-ink/40 bg-paper/60">{body}</div>
                )}
              </li>
            );
          })}
        </ul>

        <div className="sticker wobbly mt-16 flex flex-col gap-4 bg-ink p-7 text-paper md:flex-row md:items-center md:justify-between md:p-9" style={{ rotate: "-0.5deg" }}>
          <div>
            <p className={`${th}text-xl font-semibold`}>{t.customTitle}</p>
            <p className="mt-2 max-w-xl text-paper/70">{t.customBody}</p>
          </div>
          <a href={`${home}#packages`} className="press inline-flex h-12 shrink-0 items-center rounded-full border-2 border-paper bg-rose px-6 text-sm font-semibold text-white">
            {t.customCta}
          </a>
        </div>
      </main>
      <Footer locale={locale} />
    </>
  );
}
