import { Pic } from "../Pic";
import { H2, Tape, card, tilt, wrap } from "../ui";
import type { BasicConfig } from "../types";

/** the people customers will meet. cozy: taped prints. calm: arch portraits. poster: straight cards. */
export function Team({ c }: { c: BasicConfig }) {
  if (!c.team) return null;
  const calm = c.look === "calm";
  return (
    <section aria-labelledby="team" className={`${wrap} pb-16 md:pb-24`}>
      <H2 look={c.look} id="team">
        {c.team.title}
      </H2>
      <ul className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {c.team.items.map((m, i) => (
          <li key={m.name} className={calm ? "text-center" : `${card(c.look)} relative p-3 pb-5`} style={tilt(c.look, i + 1)}>
            {c.look === "cozy" ? <Tape className="-top-3 left-1/2 -translate-x-1/2" rotate={i % 2 ? "4deg" : "-4deg"} /> : null}
            <div
              className={
                calm
                  ? "mx-auto aspect-[4/5] max-w-[16rem] overflow-hidden rounded-t-full border border-[var(--t-ink)]/30"
                  : "aspect-[4/5] overflow-hidden rounded-[10px] border-2 border-[var(--t-ink)]"
              }
            >
              <Pic pic={m.pic} />
            </div>
            <p className={`tpl-display mt-4 text-2xl ${calm ? "" : "px-2"}`}>{m.name}</p>
            <p className={`font-medium text-[var(--t-accent)] ${calm ? "" : "px-2"}`}>{m.role}</p>
            {m.note ? <p className={`mt-2 leading-relaxed text-[var(--t-muted)] ${calm ? "" : "px-2"}`}>{m.note}</p> : null}
          </li>
        ))}
      </ul>
    </section>
  );
}
