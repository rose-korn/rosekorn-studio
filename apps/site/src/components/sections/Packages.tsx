import { getContent, ui, type Content, type Locale, type Ui } from "@/content";
import { SectionHeading } from "@/components/SectionHeading";
import { Arrow } from "@/components/Arrow";
import { careDetails, packageDetails } from "@/content/package-details";
import { DetailsDialog } from "./DetailsDialog";
import { Doodle, MarkSticker } from "@/components/Doodle";

export function Packages({ locale }: { locale: Locale }) {
  const c = getContent(locale);
  const { addons, careLite, carePlan, launchPromo, packages } = c;
  const t = ui[locale].packages;
  const th = locale === "th" ? "font-thai " : "";
  return (
    <section id="packages" className="scroll-mt-20 bg-paper-2 py-24 md:py-36">
      <div className="container-x">
        <SectionHeading
          locale={locale}
          index={2}
          en="Packages & pricing"
          title={
            <>
              {t.title} <span className="font-serif font-normal italic">{t.titleAccent}</span>
            </>
          }
          lead={t.lead}
        />

        <ul className="mt-8 flex flex-wrap gap-3">
          {t.facts.map((f, i) => (
            <li
              key={f}
              className={`inline-flex items-center gap-2 rounded-full border-2 border-ink bg-paper px-4 py-1.5 text-sm font-semibold shadow-[2px_2px_0_var(--color-ink)] ${th}`}
              style={{ rotate: `${[-1.2, 0.8, -0.4][i % 3]}deg` }}
            >
              <Doodle kind="check" n={i} className="h-4 w-4 text-rose" strokeWidth={3} />
              {f}
            </li>
          ))}
        </ul>

        {launchPromo.active ? <PromoBanner promo={launchPromo} t={t} /> : null}

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {packages.filter((p) => !p.soon).map((p, i) => (
            <article
              key={p.id}
              data-pop
              style={{ rotate: `${[-1, 0.8, -0.6, 1, -0.8][i % 5]}deg` }}
              aria-label={p.soon ? `${p.name} (${t.soonLabel})` : undefined}
              className={`sticker wobbly relative flex flex-col p-7 transition duration-300 ${p.soon ? "" : "hover:-translate-y-2 hover:rotate-0"} ${
                p.featured ? "sticker-rose bg-ink text-paper" : "bg-paper"
              }`}
            >
              {p.featured ? (
                <span className={`stamp absolute -right-3 -top-4 rotate-6 bg-paper ${th}text-sm text-rose-deep`}>
                  {t.popular} <Doodle kind="star" className="h-4 w-4 text-gold" />
                </span>
              ) : null}
              <p className={`eyebrow ${p.featured ? "text-paper/60" : "text-muted"}`}>{p.name}</p>
              <h3 className={`mt-3 ${th}text-2xl font-semibold leading-snug`}>{p.th}</h3>
              {!p.soon && packageDetails(locale, p.id) ? (
                <p
                  className={`mt-3 inline-flex w-fit -rotate-1 items-center gap-1.5 rounded-md px-2 py-0.5 text-sm font-semibold ${
                    p.featured ? "bg-rose text-white" : "bg-rose-soft text-rose-deep"
                  }`}
                >
                  <Doodle kind="spark" n={i} className="h-4 w-4 text-gold" /> {packageDetails(locale, p.id)!.highlight}
                </p>
              ) : null}
              <div className="mt-8 flex flex-wrap items-baseline gap-x-2">
                {p.priceNote ? <span className={`whitespace-nowrap ${p.featured ? "text-paper/60" : "text-muted"}`}>{p.priceNote}</span> : null}
                {launchPromo.active && p.promoPrice ? (
                  <>
                    <span className="text-5xl font-semibold tracking-tight">฿{p.promoPrice}</span>
                    <s className={`text-lg ${p.featured ? "text-paper/50" : "text-muted"}`} aria-label={`${t.normalPrice} ${p.price} ${t.baht}`}>
                      ฿{p.price}
                    </s>
                  </>
                ) : (
                  <span className="text-5xl font-semibold tracking-tight">฿{p.price}</span>
                )}
              </div>
              {launchPromo.active && p.promoPrice ? (
                <p className="mt-2 inline-flex w-fit rounded-full border-2 border-current px-2.5 py-0.5 text-xs font-semibold text-rose">
                  {t.promoTag} {launchPromo.until}
                </p>
              ) : null}
              <p className={`mt-2 text-sm ${p.featured ? "text-paper/60" : "text-muted"}`}>{t.delivery} {p.delivery}</p>
              <ul className={`mt-8 flex-1 space-y-3 border-t pt-6 ${p.featured ? "border-paper/15" : "border-ink/10"}`}>
                {p.features.map((f, j) => (
                  <li key={f} className="flex gap-3 text-[0.95rem]">
                    <Doodle kind="dash" n={j} className="mt-[0.2em] h-4 w-4 text-rose" strokeWidth={3} />
                    {f}
                  </li>
                ))}
              </ul>
              {!p.soon && packageDetails(locale, p.id) ? (
                <DetailsDialog
                  label={`${t.details} →`}
                  cursor={t.detailsCursor}
                  closeLabel={t.close}
                  buttonClass={`link-underline mt-6 w-fit text-sm font-semibold ${p.featured ? "text-paper" : "text-ink"}`}
                  title={<DetailsTitle p={p} locale={locale} />}
                >
                  <DetailsBody id={p.id} pkgId={p.id} cta={p.cta} locale={locale} />
                </DetailsDialog>
              ) : null}
              {p.soon ? (
                <span className="mt-4 inline-flex h-12 items-center rounded-full border-2 border-dashed border-ink/40 pl-5 text-sm font-semibold text-muted">
                  {t.notOpen}
                </span>
              ) : (
              <a
                href="#contact"
                data-package={p.id}
                data-cursor={t.choose}
                className={`press group mt-4 inline-flex h-12 items-center justify-between rounded-full border-2 pl-5 pr-1.5 text-sm font-semibold ${
                  p.featured ? "border-paper bg-rose text-white" : "border-ink bg-paper hover:bg-ink hover:text-paper"
                }`}
              >
                {p.cta}
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-current/10">
                  <Arrow className="h-3.5 w-3.5 transition group-hover:rotate-45" />
                </span>
              </a>
              )}
              {p.soon ? <SoonTape label={t.soonTape} /> : null}
            </article>
          ))}
        </div>

        <SoonStrip items={packages.filter((p) => p.soon)} t={t} locale={locale} />

        <div className="mt-10 grid gap-6 lg:grid-cols-12">
          <div className="sticker wobbly bg-paper p-7 lg:col-span-7 lg:self-start" data-pop>
            <p className="eyebrow text-muted">{t.addons}</p>
            <ul className="mt-4 divide-y divide-ink/10">
              {addons.map((a) => (
                <li key={a.name} className="flex flex-col justify-between gap-1 py-4 sm:flex-row sm:items-baseline">
                  <span>{a.name}</span>
                  <span className="font-medium tabular-nums">฿{a.price}</span>
                </li>
              ))}
            </ul>
            <p className={`mt-4 flex gap-2.5 rounded-xl bg-paper-2 p-4 text-sm text-muted ${th}`}>
              <Doodle kind="spark" n={2} className="mt-0.5 h-4 w-4 text-gold" />
              <span>{t.addonsNote}</span>
            </p>
          </div>
          <div className="flex flex-col gap-6 lg:col-span-5">
          <div className={`relative px-1 ${th}`}>
            <p className="font-semibold">{t.careGuideTitle}</p>
            <ul className="mt-2 space-y-1.5 text-sm">
              {t.careGuide.map(([who, pick], i) => (
                <li key={pick} className="flex flex-wrap items-baseline gap-x-2">
                  <span className="text-muted">{who}</span>
                  <Doodle kind="dash" n={i} className="h-3.5 w-5 text-rose" strokeWidth={3} />
                  <span className="font-semibold">{pick}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="sticker wobbly relative bg-paper p-7" data-pop style={{ rotate: "-0.8deg" }}>
            <p className="eyebrow text-muted">{careLite.name}</p>
            <div className="mt-3 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
              <h3 className={`${th}text-2xl font-semibold`}>{careLite.th}</h3>
              <p className="text-3xl font-semibold tracking-tight">
                ฿{careLite.price}
                <span className="text-base font-normal text-muted"> / {t.perYear}</span>
              </p>
            </div>
            <ul className="mt-5 space-y-2">
              {careLite.features.map((f, j) => (
                <li key={f} className="flex gap-3">
                  <MarkSticker kind="check" n={j} tone="pink" />
                  {f}
                </li>
              ))}
            </ul>
            <p className="mt-5 text-sm text-muted">{careLite.note}</p>
          </div>
          <div className="sticker wobbly relative bg-rose p-7 text-white" data-pop style={{ rotate: "1deg" }}>
            <span className="tape absolute -top-3 right-12 z-10 h-6 w-20 rotate-3" aria-hidden="true" />
            <div className="wobbly pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
              {/* a big loose rose sketch instead of the old concentric circles */}
              <svg viewBox="-20 -20 40 40" className="absolute -right-10 -top-8 h-56 w-56 rotate-12 text-white/25" fill="none" stroke="currentColor" strokeWidth="0.9" strokeLinecap="round" strokeLinejoin="round">
                <path d="M-2 -6 C-1 -9 3 -9 3 -6 C3 -4 0 -4 -0.5 -5.5" />
                <path d="M-6 -4 C-7 -10 1 -12 3 -8 C6 -10 8 -6 6 -3" />
                <path d="M-10 -2 C-13 -10 -7 -15 -1 -12 C4 -16 12 -12 10 -3" />
                <path d="M-11 -4 C-12 6 -5 10 1 10 C7 10 12 5 11 -4 C8 0 4 1 0 1 C-4 1 -8 0 -11 -4" />
                <path d="M2 10 C3 14 4 17 7 20" />
                <path d="M4.5 14.5 C9 11.5 13 12.5 14 14.5 C11 17.5 7 17 4.5 14.5" />
              </svg>
            </div>
            <p className="eyebrow text-white/75">{carePlan.name}</p>
            <h3 className={`mt-3 ${th}text-2xl font-semibold`}>{carePlan.th}</h3>
            <p className="mt-6 text-5xl font-semibold tracking-tight">
              ฿{carePlan.price}
              <span className="text-lg font-normal text-white/75"> / {t.perMonth}</span>
            </p>
            <ul className="mt-6 space-y-2">
              {carePlan.features.map((f, j) => (
                <li key={f} className="flex gap-3">
                  <MarkSticker kind="check" n={j} tone="paper" />
                  {f}
                </li>
              ))}
            </ul>
            <p className="mt-6 text-sm text-white/80">{t.careNote}</p>
            <DetailsDialog
              label={t.careOpen}
              cursor={t.detailsCursor}
              closeLabel={t.close}
              buttonClass="press sticker-sm mt-6 inline-flex h-11 items-center rounded-full bg-paper px-5 text-sm font-semibold text-ink"
              title={
                <>
                  <p className="eyebrow text-muted">{carePlan.name}</p>
                  <p className={`mt-1 ${th}text-2xl font-semibold`}>
                    {carePlan.th} · ฿{carePlan.price} / {t.perMonth}
                  </p>
                </>
              }
            >
              <CareBody locale={locale} />
            </DetailsDialog>
          </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function DetailsTitle({ p, locale }: { p: Content["packages"][number]; locale: Locale }) {
  const t = ui[locale].packages;
  const { launchPromo } = getContent(locale);
  const promo = launchPromo.active && p.promoPrice;
  return (
    <>
      <p className="eyebrow text-muted">{p.name}</p>
      <p className={`mt-1 ${locale === "th" ? "font-thai " : ""}text-2xl font-semibold leading-snug`}>{p.th}</p>
      <p className="mt-2 text-sm text-muted">
        {t.startsAt}{" "}
        <strong className="text-lg text-ink">฿{promo ? p.promoPrice : p.price}</strong>
        {promo ? <s className="ml-2">฿{p.price}</s> : null} · {t.delivery} {p.delivery}
      </p>
    </>
  );
}

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="border-t-2 border-dashed border-ink/15 py-5 first:border-0 first:pt-0">
      <h4 className="text-sm font-semibold text-rose-deep">{title}</h4>
      <div className="mt-3">{children}</div>
    </section>
  );
}

function Ticks({ items, mark }: { items: readonly string[]; mark: "yes" | "no" | "dot" }) {
  const kind = ({ yes: "check", no: "cross", dot: "dash" } as const)[mark];
  const tone = ({ yes: "pink", no: "paper", dot: "sky" } as const)[mark];
  return (
    <ul className="space-y-2">
      {items.map((x, i) => (
        <li key={x} className="flex gap-3 break-words">
          <MarkSticker kind={kind} n={i} tone={tone} />
          <span className="min-w-0">{x}</span>
        </li>
      ))}
    </ul>
  );
}

function DetailsBody({ id, pkgId, cta, locale }: { id: string; pkgId: string; cta: string; locale: Locale }) {
  const d = packageDetails(locale, id)!;
  const t = ui[locale].packages;
  return (
    <div className="text-[0.95rem]">
      <Block title={t.bestFor}>
        <p className="text-lg">{d.bestFor}</p>
      </Block>
      <Block title={t.includes}>
        <Ticks items={d.includes} mark="yes" />
      </Block>
      <Block title={t.extras}>
        <ul className="divide-y divide-ink/10">
          {d.extras.map((x) => (
            <li key={x.name} className="flex flex-col gap-0.5 py-2.5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
              <span className="min-w-0">{x.name}</span>
              <span className="shrink-0 font-semibold tabular-nums">{/^[\d,–]/.test(x.price) ? `฿${x.price}` : x.price}</span>
            </li>
          ))}
        </ul>
      </Block>
      <Block title={t.revisions}>
        <p>{d.revisions}</p>
      </Block>
      <Block title={t.careFor}>
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <p className="mb-2 text-sm font-semibold">{t.covered}</p>
            <Ticks items={d.care.covered} mark="yes" />
          </div>
          <div>
            <p className="mb-2 text-sm font-semibold">{t.notCovered}</p>
            <Ticks items={d.care.notCovered} mark="no" />
          </div>
        </div>
      </Block>
      <a
        href="#contact"
        data-close
        data-package={pkgId}
        className="press sticker-sm mt-2 flex h-12 items-center justify-center rounded-full bg-rose px-6 font-semibold text-white"
      >
        {cta}
      </a>
    </div>
  );
}

function CareBody({ locale }: { locale: Locale }) {
  const c = careDetails(locale);
  const t = ui[locale].packages;
  return (
    <div className="text-[0.95rem]">
      <p className="pb-5 text-lg">{c.lead}</p>
      <Block title={t.covered}>
        <Ticks items={c.covered} mark="yes" />
      </Block>
      <Block title={t.notCovered}>
        <Ticks items={c.notCovered} mark="no" />
      </Block>
      <Block title={t.terms}>
        <Ticks items={c.terms} mark="dot" />
      </Block>
    </div>
  );
}

/** "First 10 clients" launch strip with a seat counter (seats are updated by hand in content/site.ts) */
function PromoBanner({ promo: launchPromo, t }: { promo: Content["launchPromo"]; t: Ui["packages"] }) {
  const left = launchPromo.total - launchPromo.taken;
  return (
    <div className="sticker wobbly relative mt-14 grid gap-6 bg-ink p-7 text-paper md:grid-cols-[1fr_auto] md:items-center md:p-9" data-pop style={{ rotate: "-0.6deg" }}>
      <span className="stamp absolute -top-4 left-6 -rotate-3 bg-rose text-sm text-white" style={{ borderColor: "var(--color-ink)" }}>
        LAUNCH <Doodle kind="flower" className="ml-1 h-4 w-4 text-pink" />
      </span>
      <div>
        <p className="font-thai text-2xl font-semibold md:text-3xl">{launchPromo.headline}</p>
        <p className="mt-2 text-paper/85">{launchPromo.offer}</p>
        <p className="mt-1 text-sm text-paper/60">
          {launchPromo.condition} · {t.endsWhen(launchPromo.total, launchPromo.until)}
        </p>
      </div>
      <div className="md:text-right">
        <p className="text-sm text-paper/60">{t.left}</p>
        <p className="text-5xl font-semibold tabular-nums">
          {left}
          <span className="text-2xl text-paper/50">
            {" "}
            / {launchPromo.total}
            {t.seats ? ` ${t.seats}` : ""}
          </span>
        </p>
        <ul className="mt-3 flex gap-1.5 md:justify-end" aria-hidden="true">
          {Array.from({ length: launchPromo.total }, (_, i) => (
            <li key={i} className={`h-3 w-3 rounded-full border-2 border-paper ${i < launchPromo.taken ? "bg-transparent" : "bg-rose"}`} />
          ))}
        </ul>
      </div>
    </div>
  );
}

/**
 * Packages that are not open yet: small taped cards in a sideways-scrolling row (about 3.5 visible
 * on desktop, so it is obvious there is more to swipe), each with the old "not open yet" pill below.
 */
function SoonStrip({ items, t, locale }: { items: Content["packages"]; t: Ui["packages"]; locale: Locale }) {
  if (!items.length) return null;
  const th = locale === "th" ? "font-thai " : "";
  return (
    <section className="mt-12" aria-label={t.soonLabel}>
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
        <span className="stamp w-fit -rotate-3 bg-rose text-sm text-white" style={{ borderColor: "var(--color-ink)" }}>
          {t.soonStrip}
        </span>
        <p className={`${th}text-sm text-muted`}>{t.soonStripNote}</p>
      </div>
      <ul className="-mx-5 mt-4 flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-4 pt-3 [scrollbar-width:thin] md:-mx-2 md:px-2">
        {items.map((p, i) => (
          <li
            key={p.id}
            className="group flex w-[64%] shrink-0 snap-start flex-col items-start sm:w-[42%] lg:w-[34.5%]"
          >
            <article
              className="sticker wobbly relative w-full flex-1 overflow-hidden bg-paper p-5 transition duration-300 group-hover:-translate-y-2 group-hover:rotate-0 group-hover:shadow-[8px_8px_0_var(--color-ink)]"
              style={{ rotate: `${[-1, 0.8, -0.6, 1][i % 4]}deg` }}
            >
              <p className="eyebrow text-muted">{p.name}</p>
              <h3 className={`mt-2 ${th}text-lg font-semibold leading-snug`}>{p.th}</h3>
              <p className="mt-4 flex flex-wrap items-baseline gap-x-2">
                {p.priceNote ? <span className="text-sm text-muted">{p.priceNote}</span> : null}
                <span className="text-3xl font-semibold tracking-tight">฿{p.price}</span>
              </p>
              <ul className="mt-4 space-y-1.5 text-sm">
                {p.features.map((f, j) => (
                  <li key={f} className="flex gap-2">
                    <Doodle kind="dash" n={j} className="mt-[0.15em] h-3.5 w-3.5 text-rose" strokeWidth={3} />
                    {f}
                  </li>
                ))}
              </ul>
              <SoonTape label={t.soonTape} />
            </article>
            <span className={`mt-4 inline-flex h-9 items-center rounded-full border-2 border-dashed border-ink/40 px-4 text-sm font-semibold text-muted ${th}`}>
              {t.notOpen}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}

/** Red warning tape across a package that is shown but not open yet */
function SoonTape({ label }: { label: string }) {
  const strip = (rot: string, top: string) => (
    <div
      className="absolute -inset-x-6 flex h-11 items-center overflow-hidden border-y-[2.5px] border-ink bg-[#e0475e] shadow-[0_3px_0_rgba(0,0,0,.18)]"
      style={{ rotate: rot, top }}
    >
      <p className="flex w-max gap-5 whitespace-nowrap font-mono text-sm font-bold text-white">
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
