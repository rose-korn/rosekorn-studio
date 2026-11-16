import { Pic } from "../Pic";
import { btn, card, telHref, wrap } from "../ui";
import type { BasicConfig } from "../types";

/** the first screen. Each look has its own layout; the text and buttons are the same. */
export function Hero({ c }: { c: BasicConfig }) {
  if (c.look === "poster") return <PosterHero c={c} />;
  if (c.look === "calm") return <CalmHero c={c} />;
  return <CozyHero c={c} />;
}

function Buttons({ c, center }: { c: BasicConfig; center?: boolean }) {
  const main =
    c.look === "calm"
      ? "border-[var(--t-accent)] bg-[var(--t-accent)] text-[var(--t-on-accent)]"
      : "bg-[var(--t-accent)] text-[var(--t-on-accent)] shadow-[4px_4px_0_var(--t-ink)]";
  const second = c.look === "calm" ? "border border-[var(--t-ink)]/40 bg-transparent" : "bg-[var(--t-surface)]";
  return (
    <div className={`mt-8 flex flex-wrap gap-3 ${center ? "justify-center" : ""}`}>
      <a href={c.contact.lineUrl} className={`${btn} ${main}`}>
        {c.cta ?? "สั่ง / จองผ่าน LINE"}
      </a>
      <a href={telHref(c.contact.phone)} className={`${btn} ${second}`}>
        โทร {c.contact.phone}
      </a>
    </div>
  );
}

const firstOpen = (c: BasicConfig) => c.hours.find((h) => !h.closed)?.time ?? "";

/** cozy: text left, the shop photo as a tilted print with an hours sticker */
function CozyHero({ c }: { c: BasicConfig }) {
  return (
    <section className={`${wrap} grid items-center gap-10 pb-16 pt-6 md:grid-cols-[1.1fr_1fr] md:pb-24 md:pt-12`}>
      <div>
        <p className="inline-flex rounded-full border-2 border-[var(--t-ink)] bg-[var(--t-soft)] px-4 py-1 text-sm font-medium">{c.kicker}</p>
        <h1 className="tpl-display mt-6 text-[clamp(2.8rem,8vw,5.2rem)] leading-[1.05]">{c.name}</h1>
        <p className="mt-5 max-w-md text-lg leading-relaxed text-[var(--t-muted)]">{c.tagline}</p>
        <Buttons c={c} />
      </div>
      <div className="relative mx-auto aspect-[4/5] w-full max-w-[17rem] sm:max-w-sm">
        <div className={`${card("cozy")} absolute inset-0 overflow-hidden shadow-[8px_8px_0_var(--t-ink)]`} style={{ rotate: "2deg" }}>
          <Pic pic={c.hero} />
        </div>
        <span className="tpl-display absolute -bottom-5 -left-4 rounded-full border-2 border-[var(--t-ink)] bg-[var(--t-surface)] px-5 py-2 text-lg" style={{ rotate: "-4deg" }}>
          เปิด {firstOpen(c)}
        </span>
      </div>
    </section>
  );
}

/** poster: a big centred name on a colour block, with the first three items standing on its edge */
function PosterHero({ c }: { c: BasicConfig }) {
  const picks = c.highlights.items.slice(0, 3);
  return (
    <section className="border-b-2 border-[var(--t-ink)] bg-[var(--t-soft)]">
      <div className={`${wrap} pb-12 pt-12 text-center md:pt-16`}>
        <p className="inline-flex rounded-md border-2 border-[var(--t-ink)] bg-[var(--t-surface)] px-4 py-1 text-sm font-semibold shadow-[3px_3px_0_var(--t-ink)]">{c.kicker}</p>
        <h1 className="tpl-display mx-auto mt-6 max-w-4xl text-[clamp(3rem,11vw,7rem)] leading-[1]">{c.name}</h1>
        <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-[var(--t-muted)]">{c.tagline}</p>
        <Buttons c={c} center />
        <ul className="mx-auto mt-12 grid max-w-3xl grid-cols-3 gap-3 md:gap-6">
          {picks.map((it, i) => (
            <li key={it.name} className={`${card("poster")} relative overflow-hidden ${i === 1 ? "md:-translate-y-6" : ""}`}>
              <div className="aspect-[4/5]">
                <Pic pic={it.pic} />
              </div>
              {it.price ? (
                <span className="tpl-display absolute bottom-2 right-2 rounded-md border-2 border-[var(--t-ink)] bg-[var(--t-accent)] px-2 text-sm text-[var(--t-on-accent)] md:text-lg">
                  {it.price}
                </span>
              ) : null}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/** calm: quiet text left, the photo in a tall arch, a round "open" badge */
function CalmHero({ c }: { c: BasicConfig }) {
  return (
    <section className={`${wrap} grid items-center gap-12 pb-20 pt-8 md:grid-cols-[1fr_1fr] md:pb-28 md:pt-14`}>
      <div className="order-2 md:order-1">
        <p className="text-sm font-medium text-[var(--t-accent)]">{c.kicker}</p>
        <h1 className="tpl-display mt-4 text-[clamp(2.6rem,7vw,4.8rem)] leading-[1.1]">{c.name}</h1>
        <span aria-hidden="true" className="mt-6 block h-px w-24 bg-[var(--t-ink)]/30" />
        <p className="mt-6 max-w-md text-lg leading-relaxed text-[var(--t-muted)]">{c.tagline}</p>
        <Buttons c={c} />
      </div>
      <div className="relative order-1 mx-auto w-full max-w-[18rem] sm:max-w-sm md:order-2">
        <div className="aspect-[3/4] overflow-hidden rounded-t-full border border-[var(--t-ink)]/30 bg-[var(--t-soft)] p-2">
          <div className="h-full overflow-hidden rounded-t-full">
            <Pic pic={c.hero} />
          </div>
        </div>
        <span className="absolute -left-4 bottom-10 flex h-28 w-28 flex-col px-2 items-center justify-center rounded-full bg-[var(--t-accent)] text-center text-[var(--t-on-accent)]">
          <span className="text-xs">เวลาเปิด</span>
          <span className="tpl-display text-sm leading-tight">{firstOpen(c)}</span>
        </span>
      </div>
    </section>
  );
}
