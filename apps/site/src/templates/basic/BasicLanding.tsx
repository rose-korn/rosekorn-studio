import { Highlights } from "./Highlights";
import { Pic } from "./Pic";
import type { BasicConfig, Review, Theme } from "./types";

/**
 * Landing Basic: one page for a small shop (intro, highlights, photos, hours, map link, contact form).
 * Optional blocks (gallery, reviews, how to order, payment) show only when the config has them,
 * so the cafe and the shop templates share this one page.
 * All text, photos and colours come from a BasicConfig, so a new client is a new config, not a new page.
 * Colours are CSS variables (--t-*) on the root, which the demo's colour switcher can swap live.
 */

export function themeVars(t: Theme): React.CSSProperties {
  return {
    "--t-bg": t.bg,
    "--t-surface": t.surface,
    "--t-ink": t.ink,
    "--t-muted": t.muted,
    "--t-accent": t.accent,
    "--t-on-accent": t.onAccent,
    "--t-soft": t.soft,
  } as React.CSSProperties;
}

/** a loose hand-drawn underline for headings */
function Swash() {
  return (
    <svg viewBox="0 0 120 12" aria-hidden="true" className="mt-1 h-3 w-28 text-[var(--t-accent)]" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
      <path d="M3 8 C24 3 46 10 70 6 C88 3 104 5 117 7" />
    </svg>
  );
}

function H2({ children, id }: { children: React.ReactNode; id?: string }) {
  return (
    <div>
      <h2 id={id} className="tpl-display text-[clamp(1.8rem,4vw,2.6rem)] leading-tight">
        {children}
      </h2>
      <Swash />
    </div>
  );
}

const card = "rounded-[22px] border-2 border-[var(--t-ink)] bg-[var(--t-surface)]";
const tilts = ["-1.5deg", "1.2deg", "-0.6deg", "1.8deg", "-1deg", "0.8deg"];

/** a strip of plain clear tape, as if the card were stuck to the page */
function Tape({ className = "", rotate = "-4deg" }: { className?: string; rotate?: string }) {
  return (
    <span
      aria-hidden="true"
      className={`absolute h-6 w-20 border border-[var(--t-ink)]/15 bg-white/55 ${className}`}
      style={{ rotate, clipPath: "polygon(0 8%, 4% 0, 96% 6%, 100% 0, 100% 92%, 96% 100%, 4% 94%, 0 100%)" }}
    />
  );
}

function Stars({ n = 5 }: { n?: number }) {
  return (
    <span className="flex gap-0.5" role="img" aria-label={`${n} ดาว จาก 5`}>
      {Array.from({ length: 5 }, (_, i) => (
        <svg key={i} viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5" stroke="var(--t-ink)" strokeWidth="2" strokeLinejoin="round">
          <path d="M12 2.8 L14.8 8.7 L21.2 9.4 L16.4 13.8 L17.8 20.2 L12 17 L6.2 20.2 L7.6 13.8 L2.8 9.4 L9.2 8.7 Z" fill={i < n ? "var(--t-accent)" : "var(--t-surface)"} />
        </svg>
      ))}
    </span>
  );
}

function ReviewCard({ r, i }: { r: Review; i: number }) {
  return (
    <li className={`${card} relative p-6 pt-8`} style={{ rotate: tilts[(i + 2) % tilts.length] }}>
      <Tape className="-top-3 left-1/2 -translate-x-1/2" rotate={i % 2 ? "3deg" : "-3deg"} />
      <Stars n={r.stars ?? 5} />
      <blockquote className="mt-4 text-lg leading-relaxed">“{r.quote}”</blockquote>
      <p className="mt-5 flex items-center gap-3">
        <span className="tpl-display flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 border-[var(--t-ink)] bg-[var(--t-soft)]">
          {r.name.slice(0, 1)}
        </span>
        <span className="leading-tight">
          <span className="block font-semibold">{r.name}</span>
          {r.where ? <span className="text-sm text-[var(--t-muted)]">{r.where}</span> : null}
        </span>
      </p>
    </li>
  );
}

/**
 * A drawn stand-in for the shop's PromptPay QR. It is a pattern, not a working code:
 * for a client, this becomes the QR image their bank app gives them.
 */
function QrPlaceholder() {
  // a real QR is always dark on white, whatever the theme
  const dark = "#1b1b1b";
  const cells: [number, number][] = [];
  for (let y = 0; y < 21; y++)
    for (let x = 0; x < 21; x++) {
      const inFinder = (x < 8 && y < 8) || (x > 12 && y < 8) || (x < 8 && y > 12);
      if (!inFinder && (x * 7 + y * 13 + x * y) % 5 < 2) cells.push([x, y]);
    }
  const finder = (x: number, y: number) => (
    <g key={`${x}-${y}`}>
      <rect x={x} y={y} width="7" height="7" fill="none" stroke={dark} strokeWidth="1" transform="translate(.5 .5) scale(.93)" />
      <rect x={x + 2} y={y + 2} width="3" height="3" fill={dark} />
    </g>
  );
  return (
    <svg viewBox="-1 -1 23 23" role="img" aria-label="ตัวอย่าง QR พร้อมเพย์ (ใช้จ่ายจริงไม่ได้)" className="h-full w-full">
      <rect x="-1" y="-1" width="23" height="23" fill="#fff" />
      {cells.map(([x, y]) => (
        <rect key={`${x}-${y}`} x={x} y={y} width="1" height="1" fill={dark} />
      ))}
      {finder(0, 0)}
      {finder(14, 0)}
      {finder(0, 14)}
    </svg>
  );
}

export function BasicLanding({ c, displayFont = "" }: { c: BasicConfig; displayFont?: string }) {
  const nav = [
    { href: "#highlights", label: c.highlights.title },
    c.gallery ? { href: "#gallery", label: c.gallery.title } : null,
    c.reviews ? { href: "#reviews", label: "รีวิว" } : null,
    c.howToOrder ? { href: "#order", label: "วิธีสั่งซื้อ" } : null,
    c.payment ? null : { href: "#visit", label: "เวลาเปิด" },
    { href: "#contact", label: "ติดต่อ" },
  ].filter((n) => n !== null);
  const tel = `tel:${c.contact.phone.replace(/[^0-9+]/g, "")}`;
  const btn = "inline-flex h-12 items-center justify-center rounded-full border-2 border-[var(--t-ink)] px-6 font-semibold transition hover:-translate-y-0.5";

  return (
    <div id="tpl-root" className={`${displayFont} min-h-screen bg-[var(--t-bg)] font-thai text-[var(--t-ink)]`} style={themeVars(c.themes[0])}>
      {/* header */}
      <header className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-5 md:px-8">
        <a href="#top" className="flex items-center gap-3">
          <span className="tpl-display flex h-11 w-11 items-center justify-center rounded-full border-2 border-[var(--t-ink)] bg-[var(--t-accent)] text-xl text-[var(--t-on-accent)]">
            {c.name.slice(0, 1)}
          </span>
          <span className="tpl-display text-xl leading-none">{c.name}</span>
        </a>
        <nav aria-label="เมนูหลัก" className="hidden items-center gap-7 text-[0.95rem] md:flex">
          {nav.map((n) => (
            <a key={n.href} href={n.href} className="hover:text-[var(--t-accent)]">
              {n.label}
            </a>
          ))}
        </nav>
        <a href={c.contact.lineUrl} className={`${btn} h-10 bg-[var(--t-ink)] px-4 text-sm text-[var(--t-bg)]`}>
          แอด LINE
        </a>
      </header>

      <main id="top">
        {/* hero */}
        <section className="mx-auto grid max-w-6xl items-center gap-10 px-5 pb-16 pt-6 md:grid-cols-[1.1fr_1fr] md:px-8 md:pb-24 md:pt-12">
          <div>
            <p className="inline-flex rounded-full border-2 border-[var(--t-ink)] bg-[var(--t-soft)] px-4 py-1 text-sm font-medium">{c.kicker}</p>
            <h1 className="tpl-display mt-6 text-[clamp(2.8rem,8vw,5.2rem)] leading-[1.05]">{c.name}</h1>
            <p className="mt-5 max-w-md text-lg leading-relaxed text-[var(--t-muted)]">{c.tagline}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href={c.contact.lineUrl} className={`${btn} bg-[var(--t-accent)] text-[var(--t-on-accent)] shadow-[4px_4px_0_var(--t-ink)]`}>
                {c.cta ?? "สั่ง / จองผ่าน LINE"}
              </a>
              <a href={tel} className={`${btn} bg-[var(--t-surface)]`}>
                โทร {c.contact.phone}
              </a>
            </div>
          </div>
          <div className="relative mx-auto aspect-[4/5] w-full max-w-[17rem] sm:max-w-sm">
            <div className={`${card} absolute inset-0 overflow-hidden shadow-[8px_8px_0_var(--t-ink)]`} style={{ rotate: "2deg" }}>
              <Pic pic={c.hero} />
            </div>
            <span
              className="tpl-display absolute -bottom-5 -left-4 rounded-full border-2 border-[var(--t-ink)] bg-[var(--t-surface)] px-5 py-2 text-lg"
              style={{ rotate: "-4deg" }}
            >
              เปิด {c.hours.find((h) => !h.closed)?.time ?? ""}
            </span>
          </div>
        </section>

        {/* about */}
        <section className="border-y-2 border-[var(--t-ink)] bg-[var(--t-surface)]">
          <div className="mx-auto grid max-w-6xl gap-10 px-5 py-16 md:grid-cols-[1.2fr_1fr] md:px-8 md:py-20">
            <div>
              <H2>{c.about.title}</H2>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-[var(--t-muted)]">{c.about.body}</p>
            </div>
            <dl className="grid grid-cols-3 gap-3 self-center">
              {c.about.facts.map((f, i) => (
                <div key={f.label} className="rounded-2xl border-2 border-[var(--t-ink)] bg-[var(--t-bg)] px-3 py-4 text-center" style={{ rotate: tilts[i] }}>
                  <dd className="tpl-display text-2xl text-[var(--t-accent)] md:text-3xl">{f.value}</dd>
                  <dt className="mt-1 text-sm text-[var(--t-muted)]">{f.label}</dt>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* highlights */}
        <section aria-labelledby="highlights" className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-24">
          <H2 id="highlights">{c.highlights.title}</H2>
          <Highlights items={c.highlights.items} layout={c.highlights.layout} sheetUrl={c.highlights.sheetUrl} />
          {c.howToOrder || c.payment ? (
            <p className="mt-8 text-[var(--t-muted)]">
              ถูกใจชิ้นไหน{" "}
              <a href={c.contact.lineUrl} className="font-semibold text-[var(--t-ink)] underline decoration-[var(--t-accent)] decoration-2 underline-offset-4">
                ทัก LINE {c.contact.lineId}
              </a>{" "}
              บอกชื่อสินค้าได้เลย
            </p>
          ) : null}
        </section>

        {/* reviews: customer words, stuck on like notes */}
        {c.reviews ? (
          <section aria-labelledby="reviews" className="border-y-2 border-[var(--t-ink)] bg-[var(--t-soft)] py-16 md:py-24">
            <div className="mx-auto max-w-6xl px-5 md:px-8">
              <div className="flex flex-wrap items-end justify-between gap-4">
                <H2 id="reviews">{c.reviews.title}</H2>
                {c.reviews.score ? (
                  <p className="tpl-display rounded-full border-2 border-[var(--t-ink)] bg-[var(--t-surface)] px-5 py-2 text-lg shadow-[4px_4px_0_var(--t-ink)]" style={{ rotate: "2deg" }}>
                    ★ {c.reviews.score}
                  </p>
                ) : null}
              </div>
              <ul className="mt-12 grid gap-8 md:grid-cols-3">
                {c.reviews.items.map((r, i) => (
                  <ReviewCard key={r.name} r={r} i={i} />
                ))}
              </ul>
            </div>
          </section>
        ) : null}

        {/* how to order: plain steps, the order itself happens in a chat */}
        {c.howToOrder ? (
          <section aria-labelledby="order" className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-24">
            <H2 id="order">{c.howToOrder.title}</H2>
            <ol className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {c.howToOrder.steps.map((s, i) => (
                <li key={s.title} className={`${card} p-5`} style={{ rotate: tilts[(i + 1) % tilts.length] }}>
                  <span className="tpl-display flex h-11 w-11 items-center justify-center rounded-full border-2 border-[var(--t-ink)] bg-[var(--t-accent)] text-xl text-[var(--t-on-accent)] shadow-[3px_3px_0_var(--t-ink)]">
                    {i + 1}
                  </span>
                  <p className="mt-4 text-lg font-semibold">{s.title}</p>
                  <p className="mt-1 leading-relaxed text-[var(--t-muted)]">{s.body}</p>
                </li>
              ))}
            </ol>
            {c.howToOrder.notes ? (
              <ul className="mt-8 flex flex-wrap gap-2.5">
                {c.howToOrder.notes.map((n) => (
                  <li key={n} className="rounded-full border-2 border-dashed border-[var(--t-ink)]/40 px-4 py-1.5 text-sm">
                    {n}
                  </li>
                ))}
              </ul>
            ) : null}
          </section>
        ) : null}

        {/* payment: static details only, nothing is charged on the site */}
        {c.payment ? (
          <section aria-labelledby="payment" className="bg-[var(--t-surface)] border-y-2 border-[var(--t-ink)]">
            <div className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-24">
              <H2 id="payment">{c.payment.title}</H2>
              {c.payment.lead ? <p className="mt-5 max-w-xl text-lg leading-relaxed text-[var(--t-muted)]">{c.payment.lead}</p> : null}
              <div className="mt-10 grid gap-6 md:grid-cols-[auto_1fr]">
                {c.payment.promptPay ? (
                  <div className={`${card} relative flex flex-col items-center bg-[var(--t-bg)] p-5 shadow-[6px_6px_0_var(--t-ink)] md:w-64`} style={{ rotate: "-1.5deg" }}>
                    <Tape className="-top-3 left-1/2 -translate-x-1/2" />
                    <p className="font-semibold">พร้อมเพย์</p>
                    <div className="mt-3 aspect-square w-40 overflow-hidden rounded-xl border-2 border-[var(--t-ink)] bg-white p-2">
                      <QrPlaceholder />
                    </div>
                    <p className="tpl-display mt-3 text-lg">{c.payment.promptPay.id}</p>
                    <p className="text-sm text-[var(--t-muted)]">{c.payment.promptPay.name}</p>
                  </div>
                ) : null}
                <div className="grid content-start gap-4">
                  {c.payment.banks?.map((b) => (
                    <div key={b.number} className={`${card} flex flex-wrap items-center justify-between gap-x-6 gap-y-1 px-5 py-4`}>
                      <div>
                        <p className="font-semibold">{b.bank}</p>
                        <p className="text-sm text-[var(--t-muted)]">{b.name}</p>
                      </div>
                      <p className="tpl-display text-xl tracking-wide">{b.number}</p>
                    </div>
                  ))}
                  {c.payment.others ? (
                    <ul className="grid gap-2 pt-2">
                      {c.payment.others.map((o) => (
                        <li key={o} className="flex items-start gap-3">
                          <span aria-hidden="true" className="mt-2 h-2.5 w-2.5 shrink-0 rounded-full border-2 border-[var(--t-ink)] bg-[var(--t-accent)]" />
                          {o}
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </div>
              </div>
            </div>
          </section>
        ) : null}

        {/* gallery: photos pinned like prints */}
        {c.gallery ? (
        <section aria-labelledby="gallery" className="bg-[var(--t-soft)] py-16 md:py-24">
          <div className="mx-auto max-w-6xl px-5 md:px-8">
            <H2 id="gallery">{c.gallery.title}</H2>
            <ul className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6">
              {c.gallery.items.map((g, i) => (
                <li key={g.alt} className="rounded-[18px] border-2 border-[var(--t-ink)] bg-[var(--t-surface)] p-2 pb-3" style={{ rotate: tilts[i % tilts.length] }}>
                  <div className="aspect-square overflow-hidden rounded-xl">
                    <Pic pic={g} />
                  </div>
                  {g.caption ? <p className="mt-2 px-1 text-sm text-[var(--t-muted)]">{g.caption}</p> : null}
                </li>
              ))}
            </ul>
          </div>
        </section>
        ) : null}

        {/* hours + map */}
        <section aria-labelledby="visit" className="mx-auto grid max-w-6xl gap-8 px-5 py-16 md:grid-cols-2 md:px-8 md:py-24">
          <div>
            <H2 id="visit">{c.visitTitle ?? "เวลาเปิด และการเดินทาง"}</H2>
            <ul className={`${card} mt-8 divide-y-2 divide-dashed divide-[var(--t-ink)]/20 px-5`}>
              {c.hours.map((h) => (
                <li key={h.day} className="flex items-center justify-between py-3">
                  <span className="font-medium">{h.day}</span>
                  <span className={h.closed ? "text-[var(--t-muted)]" : ""}>{h.closed ? "ปิด" : h.time}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col">
            <a
              href={c.mapUrl}
              className={`${card} group relative flex min-h-64 flex-1 flex-col justify-end overflow-hidden p-5 shadow-[6px_6px_0_var(--t-ink)]`}
            >
              {/* a drawn street map, not a live embed, so the page stays fast and cookie-free */}
              <svg viewBox="0 0 400 260" aria-hidden="true" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice">
                <rect width="400" height="260" fill="var(--t-soft)" />
                <g fill="none" stroke="var(--t-surface)" strokeWidth="18" strokeLinecap="round">
                  <path d="M-10 70 C120 60 260 90 410 76" />
                  <path d="M150 -10 C140 90 160 180 146 270" />
                  <path d="M-10 190 C100 200 300 170 410 196" />
                </g>
                <path d="M290 -10 C300 80 280 180 300 270" fill="none" stroke="var(--t-surface)" strokeWidth="10" strokeDasharray="2 14" strokeLinecap="round" />
                <g transform="translate(222 118)">
                  <path d="M0 -36 C-20 -36 -26 -16 -18 -4 L0 22 L18 -4 C26 -16 20 -36 0 -36 Z" fill="var(--t-accent)" stroke="var(--t-ink)" strokeWidth="3" />
                  <circle cy="-18" r="7" fill="var(--t-surface)" stroke="var(--t-ink)" strokeWidth="2.5" />
                </g>
              </svg>
              <div className="relative rounded-2xl border-2 border-[var(--t-ink)] bg-[var(--t-surface)] p-4">
                <p className="leading-relaxed">{c.address}</p>
                <p className="mt-2 font-semibold text-[var(--t-accent)] group-hover:underline">เปิดใน Google Maps →</p>
              </div>
            </a>
          </div>
        </section>

        {/* contact */}
        <section aria-labelledby="contact" className="bg-[var(--t-ink)] text-[var(--t-bg)]">
          <div className="mx-auto grid max-w-6xl gap-10 px-5 py-16 md:grid-cols-2 md:px-8 md:py-24">
            <div>
              <h2 id="contact" className="tpl-display text-[clamp(1.8rem,4vw,2.6rem)] leading-tight">
                {c.form.title}
              </h2>
              <p className="mt-4 max-w-md text-lg leading-relaxed opacity-75">{c.form.lead}</p>
              <ul className="mt-8 space-y-3 text-lg">
                <li>
                  LINE: <a href={c.contact.lineUrl} className="underline decoration-[var(--t-accent)] decoration-2 underline-offset-4">{c.contact.lineId}</a>
                </li>
                <li>
                  โทร: <a href={tel} className="underline decoration-[var(--t-accent)] decoration-2 underline-offset-4">{c.contact.phone}</a>
                </li>
                <li>
                  อีเมล: <a href={`mailto:${c.contact.email}`} className="underline decoration-[var(--t-accent)] decoration-2 underline-offset-4">{c.contact.email}</a>
                </li>
              </ul>
            </div>
            <form className="grid gap-4 rounded-[22px] border-2 border-[var(--t-bg)]/30 p-5 md:p-7" aria-describedby="tpl-form-note">
              {[
                { name: "name", label: "ชื่อ", ph: "ชื่อของคุณ" },
                { name: "contact", label: "เบอร์โทร หรือ LINE ID", ph: "08x-xxx-xxxx" },
              ].map((f) => (
                <label key={f.name} className="grid gap-2 text-sm opacity-90">
                  {f.label}
                  <input name={f.name} placeholder={f.ph} className="h-12 rounded-xl border-2 border-transparent bg-[var(--t-bg)]/10 px-4 text-base text-[var(--t-bg)] outline-none placeholder:text-[var(--t-bg)]/40 focus:border-[var(--t-accent)]" />
                </label>
              ))}
              <label className="grid gap-2 text-sm opacity-90">
                ข้อความ
                <textarea name="message" rows={4} placeholder={c.form.placeholder ?? "อยากจองโต๊ะ สั่งเค้ก หรือสอบถามอะไรก็ได้"} className="rounded-xl border-2 border-transparent bg-[var(--t-bg)]/10 px-4 py-3 text-base text-[var(--t-bg)] outline-none placeholder:text-[var(--t-bg)]/40 focus:border-[var(--t-accent)]" />
              </label>
              <button type="button" className="mt-2 h-12 rounded-full border-2 border-[var(--t-bg)] bg-[var(--t-accent)] font-semibold text-[var(--t-on-accent)]">
                ส่งข้อความ
              </button>
              <p id="tpl-form-note" className="text-sm opacity-60">
                ในเว็บตัวอย่าง ฟอร์มนี้ยังไม่ส่งจริง ในเว็บของร้าน ข้อความจะเข้าอีเมลร้านทันที
              </p>
            </form>
          </div>
        </section>
      </main>

      <footer className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-5 py-8 text-sm text-[var(--t-muted)] md:px-8">
        <p>
          © {new Date().getFullYear()} {c.name}
        </p>
        <div className="flex gap-5">
          {c.contact.facebook ? <a href={c.contact.facebook}>Facebook</a> : null}
          {c.contact.instagram ? <a href={c.contact.instagram}>Instagram</a> : null}
          <a href={c.contact.lineUrl}>LINE</a>
        </div>
      </footer>
    </div>
  );
}
