import { H2, tilt, wrap } from "../ui";
import type { BasicConfig } from "../types";

/** the shop's short story and three quick facts */
export function About({ c }: { c: BasicConfig }) {
  const { title, body, facts } = c.about;

  if (c.look === "calm")
    return (
      <section className="border-y border-[var(--t-ink)]/15 bg-[var(--t-surface)]">
        <div className={`${wrap} py-20 text-center md:py-24`}>
          <H2 look="calm">{title}</H2>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-[var(--t-muted)]">{body}</p>
          <dl className="mx-auto mt-12 grid max-w-2xl grid-cols-3 divide-x divide-[var(--t-ink)]/15">
            {facts.map((f) => (
              <div key={f.label} className="px-2">
                <dd className="tpl-display text-3xl text-[var(--t-accent)] md:text-4xl">{f.value}</dd>
                <dt className="mt-1 text-sm text-[var(--t-muted)]">{f.label}</dt>
              </div>
            ))}
          </dl>
        </div>
      </section>
    );

  const box =
    c.look === "poster"
      ? "rounded-[14px] border-2 border-[var(--t-ink)] bg-[var(--t-accent)] text-[var(--t-on-accent)] shadow-[4px_4px_0_var(--t-ink)]"
      : "rounded-2xl border-2 border-[var(--t-ink)] bg-[var(--t-bg)]";
  return (
    <section className="border-y-2 border-[var(--t-ink)] bg-[var(--t-surface)]">
      <div className={`${wrap} grid gap-10 py-16 md:grid-cols-[1.2fr_1fr] md:py-20`}>
        <div>
          <H2 look={c.look}>{title}</H2>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-[var(--t-muted)]">{body}</p>
        </div>
        <dl className="grid grid-cols-3 gap-3 self-center">
          {facts.map((f, i) => (
            <div key={f.label} className={`${box} px-3 py-4 text-center`} style={tilt(c.look, i)}>
              <dd className={`tpl-display text-2xl md:text-3xl ${c.look === "poster" ? "" : "text-[var(--t-accent)]"}`}>{f.value}</dd>
              <dt className={`mt-1 text-sm ${c.look === "poster" ? "opacity-85" : "text-[var(--t-muted)]"}`}>{f.label}</dt>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
