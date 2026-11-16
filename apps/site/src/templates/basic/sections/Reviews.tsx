import { H2, StarShape, Stars, Tape, card, tilt, wrap } from "../ui";
import type { BasicConfig, Look, Review } from "../types";

/** customer words copied from Facebook, LINE or Google Maps (with their OK) */
export function Reviews({ c }: { c: BasicConfig }) {
  if (!c.reviews) return null;
  const calm = c.look === "calm";
  return (
    <section
      aria-labelledby="reviews"
      className={calm ? "bg-[var(--t-soft)] py-20 md:py-28" : "border-y-2 border-[var(--t-ink)] bg-[var(--t-soft)] py-16 md:py-24"}
    >
      <div className={wrap}>
        <div className={calm ? "flex flex-col items-center gap-6" : "flex flex-wrap items-end justify-between gap-4"}>
          <H2 look={c.look} id="reviews">
            {c.reviews.title}
          </H2>
          {c.reviews.score ? (
            <p
              className={`tpl-display flex items-center gap-2 rounded-full bg-[var(--t-surface)] px-5 py-2 text-lg ${calm ? "border border-[var(--t-ink)]/25" : "border-2 border-[var(--t-ink)] shadow-[4px_4px_0_var(--t-ink)]"}`}
              style={c.look === "cozy" ? { rotate: "2deg" } : undefined}
            >
              <StarShape filled />
              {c.reviews.score}
            </p>
          ) : null}
        </div>
        <ul className="mt-12 grid gap-8 md:grid-cols-3">
          {c.reviews.items.map((r, i) => (
            <ReviewCard key={r.name} r={r} i={i} look={c.look} />
          ))}
        </ul>
      </div>
    </section>
  );
}

/** first letter of the person's own name: skips the polite "คุณ" and Thai leading vowels (เ แ โ ใ ไ) */
const initial = (name: string) => name.replace(/^คุณ\s*/, "").replace(/^[เแโใไ]/, "").slice(0, 1);

function ReviewCard({ r, i, look }: { r: Review; i: number; look: Look }) {
  return (
    <li className={`${card(look)} relative p-6 ${look === "cozy" ? "pt-8" : ""}`} style={tilt(look, i + 2)}>
      {look === "cozy" ? <Tape className="-top-3 left-1/2 -translate-x-1/2" rotate={i % 2 ? "3deg" : "-3deg"} /> : null}
      <Stars n={r.stars ?? 5} />
      <blockquote className="mt-4 text-lg leading-relaxed">“{r.quote}”</blockquote>
      <p className="mt-5 flex items-center gap-3">
        <span className="tpl-display flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 border-[var(--t-ink)] bg-[var(--t-soft)]">
          {initial(r.name)}
        </span>
        <span className="leading-tight">
          <span className="block font-semibold">{r.name}</span>
          {r.where ? <span className="text-sm text-[var(--t-muted)]">{r.where}</span> : null}
        </span>
      </p>
    </li>
  );
}
