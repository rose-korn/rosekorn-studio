import { getContent, ui, type Content, type Locale, type Ui } from "@/content";
import { EditorialHeading } from "@/components/EditorialHeading";

export function Packages({ locale }: { locale: Locale }) {
  const c = getContent(locale);
  const { addons, carePlan, launchPromo, packages } = c;
  const t = ui[locale].packages;
  const th = locale === "th" ? "font-thai " : "";
  return (
    <section id="packages" className="scroll-mt-20 bg-paper py-24 md:py-40">
      <div className="container-x">
        <EditorialHeading
          locale={locale}
          index={2}
          en="Packages & pricing"
          title={
            <>
              {t.title} <span className="font-serif font-normal italic text-rose-deep">{t.titleAccent}</span>
            </>
          }
          lead={t.lead}
        />

        {launchPromo.active ? <PromoBanner promo={launchPromo} t={t} /> : null}

        {/* the collection: hairline columns, one featured piece in black */}
        <div className="mt-16 grid border-l border-t border-ink/15 md:grid-cols-2 xl:grid-cols-3">
          {packages.map((p, i) => (
            <article
              key={p.id}
              data-reveal
              aria-label={p.soon ? `${p.name} (${t.soonLabel})` : undefined}
              className={`group relative flex flex-col border-b border-r border-ink/15 p-8 transition-colors duration-500 md:p-10 ${
                p.featured ? "bg-ink text-paper" : p.soon ? "" : "hover:bg-paper-2"
              }`}
            >
              <div className={`flex items-baseline justify-between font-mono text-[10px] uppercase tracking-[0.3em] ${p.featured ? "text-paper/50" : "text-muted"}`}>
                <span>Nº {String(i + 1).padStart(2, "0")}</span>
                {p.featured ? <span className="caps-th text-rose">{t.popular}</span> : null}
              </div>
              <h3 className="mt-8 font-serif text-[2.6rem] leading-none">{p.name}</h3>
              <p className={`mt-3 ${th}text-lg ${p.featured ? "text-paper/70" : "text-muted"}`}>{p.th}</p>
              <div className="mt-10 flex flex-wrap items-baseline gap-x-3">
                {p.priceNote ? <span className={`whitespace-nowrap font-mono text-xs uppercase tracking-[0.2em] ${p.featured ? "text-paper/60" : "text-muted"}`}>{p.priceNote}</span> : null}
                {launchPromo.active && p.promoPrice ? (
                  <>
                    <span className="font-serif text-6xl tabular-nums">฿{p.promoPrice}</span>
                    <s className={`font-serif text-xl ${p.featured ? "text-paper/40" : "text-muted"}`} aria-label={`${t.normalPrice} ${p.price} ${t.baht}`}>
                      ฿{p.price}
                    </s>
                  </>
                ) : (
                  <span className="font-serif text-6xl tabular-nums">฿{p.price}</span>
                )}
              </div>
              {launchPromo.active && p.promoPrice ? (
                <p className="caps-th mt-3 font-mono text-[10px] uppercase tracking-[0.25em] text-rose">
                  {t.promoTag} {launchPromo.until}
                </p>
              ) : null}
              <p className={`mt-2 text-sm ${p.featured ? "text-paper/55" : "text-muted"}`}>
                {t.delivery} {p.delivery}
              </p>
              <ul className={`mt-10 flex-1 space-y-3 border-t pt-6 ${p.featured ? "border-paper/15" : "border-ink/10"}`}>
                {p.features.map((f) => (
                  <li key={f} className="flex gap-4 text-[0.95rem]">
                    <span className={`mt-[0.7em] h-px w-4 shrink-0 ${p.featured ? "bg-paper/60" : "bg-ink/50"}`} />
                    {f}
                  </li>
                ))}
              </ul>
              {p.soon ? (
                <span className="mt-10 inline-flex h-12 items-center justify-center border border-dashed border-ink/30 caps-th font-mono text-[11px] uppercase tracking-[0.3em] text-muted">
                  {t.notOpen}
                </span>
              ) : (
                <a
                  href="#contact"
                  data-package={p.id}
                  data-cursor={t.choose}
                  className={`mt-10 inline-flex h-12 items-center justify-between border px-5 font-mono text-[11px] uppercase tracking-[0.25em] transition-colors duration-300 ${
                    p.featured ? "border-rose bg-rose text-white hover:bg-transparent" : "border-ink hover:bg-ink hover:text-paper"
                  }`}
                >
                  <span className={locale === "th" ? "font-thai text-sm normal-case tracking-normal" : ""}>{p.cta}</span>
                  <span aria-hidden="true">→</span>
                </a>
              )}
              {p.soon ? <SoonTape label={t.soonTape} /> : null}
            </article>
          ))}
        </div>

        <div className="mt-16 grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-7" data-reveal>
            <p className="caps-th font-mono text-[11px] uppercase tracking-[0.35em] text-muted">{t.addons}</p>
            <ul className="mt-6 border-t border-ink/20">
              {addons.map((a) => (
                <li key={a.name} className="flex flex-col justify-between gap-1 border-b border-ink/10 py-5 sm:flex-row sm:items-baseline">
                  <span>{a.name}</span>
                  <span className="font-serif text-xl tabular-nums">฿{a.price}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="relative overflow-hidden bg-rose-deep p-8 text-white md:p-10 lg:col-span-5" data-reveal>
            <p className="font-mono text-[11px] uppercase tracking-[0.35em] text-white/70">{carePlan.name}</p>
            <h3 className={`mt-4 ${th}text-2xl`}>{carePlan.th}</h3>
            <p className="mt-6 font-serif text-6xl">
              ฿{carePlan.price}
              <span className="font-sans text-lg text-white/70"> / {t.perMonth}</span>
            </p>
            <ul className="mt-8 space-y-3 border-t border-white/25 pt-6">
              {carePlan.features.map((f) => (
                <li key={f} className="flex gap-4">
                  <span className="mt-[0.7em] h-px w-4 shrink-0 bg-white/70" />
                  {f}
                </li>
              ))}
            </ul>
            <p className="mt-6 text-sm text-white/75">{t.careNote}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

/** "First 10 clients" launch strip with a seat counter (seats are updated by hand in content/site.ts) */
function PromoBanner({ promo: launchPromo, t }: { promo: Content["launchPromo"]; t: Ui["packages"] }) {
  const left = launchPromo.total - launchPromo.taken;
  return (
    <div className="mt-16 grid gap-8 bg-ink p-8 text-paper md:grid-cols-[1fr_auto] md:items-end md:p-12" data-reveal>
      <div>
        <p className="caps-th font-mono text-[11px] uppercase tracking-[0.35em] text-rose">Launch · {launchPromo.until}</p>
        <p className="mt-5 font-thai text-3xl font-medium leading-snug md:text-4xl">{launchPromo.headline}</p>
        <p className="mt-3 text-paper/80">{launchPromo.offer}</p>
        <p className="mt-2 text-sm text-paper/50">
          {launchPromo.condition} · {t.endsWhen(launchPromo.total, launchPromo.until)}
        </p>
      </div>
      <div className="md:text-right">
        <p className="caps-th font-mono text-[10px] uppercase tracking-[0.35em] text-paper/50">{t.left}</p>
        <p className="font-serif text-7xl leading-none tabular-nums">
          {left}
          <span className="text-3xl text-paper/40">
            {" "}
            / {launchPromo.total}
            {t.seats ? ` ${t.seats}` : ""}
          </span>
        </p>
        <ul className="mt-4 flex gap-2 md:justify-end" aria-hidden="true">
          {Array.from({ length: launchPromo.total }, (_, i) => (
            <li key={i} className={`h-px w-4 ${i < launchPromo.taken ? "bg-paper/25" : "bg-rose"}`} />
          ))}
        </ul>
      </div>
    </div>
  );
}

/** Red warning tape across a package that is shown but not open yet */
function SoonTape({ label }: { label: string }) {
  const strip = (rot: string, top: string) => (
    <div
      className="absolute -inset-x-6 flex h-11 items-center overflow-hidden border-y-[2.5px] border-ink bg-[#e0475e] shadow-[0_3px_0_rgba(0,0,0,.18)]"
      style={{ rotate: rot, top }}
    >
      <p className="flex w-max gap-5 whitespace-nowrap font-mono text-sm font-bold tracking-[0.2em] text-white">
        {Array.from({ length: 8 }, (_, i) => (
          <span key={i}>{label}</span>
        ))}
      </p>
    </div>
  );
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-[inherit]" aria-hidden="true">
      <div className="absolute inset-0 bg-paper/55 backdrop-blur-[1.5px]" />
      {strip("-14deg", "38%")}
      {strip("9deg", "52%")}
    </div>
  );
}
