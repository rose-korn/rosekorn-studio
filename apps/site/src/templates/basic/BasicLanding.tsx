import { Highlights } from "./Highlights";
import { Pic } from "./Pic";
import type { BasicConfig, Theme } from "./types";

/**
 * Landing Basic: one page for a small shop (intro, highlights, photos, hours, map link, contact form).
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

export function BasicLanding({ c, displayFont = "" }: { c: BasicConfig; displayFont?: string }) {
  const nav = [
    { href: "#highlights", label: c.highlights.title },
    { href: "#gallery", label: c.gallery.title },
    { href: "#visit", label: "เวลาเปิด" },
    { href: "#contact", label: "ติดต่อ" },
  ];
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
                สั่ง / จองผ่าน LINE
              </a>
              <a href={`tel:${c.contact.phone.replace(/[^0-9+]/g, "")}`} className={`${btn} bg-[var(--t-surface)]`}>
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
          <Highlights items={c.highlights.items} sheetUrl={c.highlights.sheetUrl} />
        </section>

        {/* gallery: photos pinned like prints */}
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

        {/* hours + map */}
        <section aria-labelledby="visit" className="mx-auto grid max-w-6xl gap-8 px-5 py-16 md:grid-cols-2 md:px-8 md:py-24">
          <div>
            <H2 id="visit">เวลาเปิด และการเดินทาง</H2>
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
                  โทร: <a href={`tel:${c.contact.phone.replace(/[^0-9+]/g, "")}`} className="underline decoration-[var(--t-accent)] decoration-2 underline-offset-4">{c.contact.phone}</a>
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
                <textarea name="message" rows={4} placeholder="อยากจองโต๊ะ สั่งเค้ก หรือสอบถามอะไรก็ได้" className="rounded-xl border-2 border-transparent bg-[var(--t-bg)]/10 px-4 py-3 text-base text-[var(--t-bg)] outline-none placeholder:text-[var(--t-bg)]/40 focus:border-[var(--t-accent)]" />
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
