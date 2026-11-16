import { H2, card, tilt, wrap } from "../ui";
import type { BasicConfig } from "../types";

/** how to order or book: plain steps, the order itself happens in a chat */
export function HowTo({ c }: { c: BasicConfig }) {
  if (!c.howToOrder) return null;
  const { title, steps, notes } = c.howToOrder;
  const calm = c.look === "calm";
  const num = calm
    ? "border border-[var(--t-accent)] bg-[var(--t-bg)] text-[var(--t-accent)]"
    : "border-2 border-[var(--t-ink)] bg-[var(--t-accent)] text-[var(--t-on-accent)] shadow-[3px_3px_0_var(--t-ink)]";
  return (
    <section aria-labelledby="order" className={`${wrap} py-16 md:py-24`}>
      <H2 look={c.look} id="order">
        {title}
      </H2>
      {calm ? (
        // a quiet timeline: numbered circles on one thin line
        <ol className="relative mx-auto mt-12 grid max-w-4xl gap-10 md:grid-cols-3 md:gap-6">
          <span aria-hidden="true" className="absolute left-[5%] right-[5%] top-6 hidden h-px bg-[var(--t-ink)]/20 md:block" />
          {steps.map((s, i) => (
            <li key={s.title} className="relative text-center">
              <span className={`tpl-display mx-auto flex h-12 w-12 items-center justify-center rounded-full text-xl ${num}`}>{i + 1}</span>
              <p className="mt-4 text-lg font-semibold">{s.title}</p>
              <p className="mx-auto mt-1 max-w-xs leading-relaxed text-[var(--t-muted)]">{s.body}</p>
            </li>
          ))}
        </ol>
      ) : (
        <ol className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <li key={s.title} className={`${card(c.look)} p-5`} style={tilt(c.look, i + 1)}>
              <span className={`tpl-display flex h-11 w-11 items-center justify-center rounded-full text-xl ${num}`}>{i + 1}</span>
              <p className="mt-4 text-lg font-semibold">{s.title}</p>
              <p className="mt-1 leading-relaxed text-[var(--t-muted)]">{s.body}</p>
            </li>
          ))}
        </ol>
      )}
      {notes ? (
        <ul className={`mt-10 flex flex-wrap gap-2.5 ${calm ? "justify-center" : ""}`}>
          {notes.map((n) => (
            <li key={n} className="rounded-full border-2 border-dashed border-[var(--t-ink)]/40 px-4 py-1.5 text-sm">
              {n}
            </li>
          ))}
        </ul>
      ) : null}
    </section>
  );
}
