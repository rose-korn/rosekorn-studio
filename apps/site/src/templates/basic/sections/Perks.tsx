import { wrap } from "../ui";
import type { BasicConfig } from "../types";

/** a dark strip of short selling points under the hero, e.g. free shipping */
export function Perks({ c }: { c: BasicConfig }) {
  if (!c.perks?.length) return null;
  return (
    <div className="border-b-2 border-[var(--t-ink)] bg-[var(--t-ink)] text-[var(--t-bg)]">
      <ul className={`${wrap} flex flex-wrap items-center justify-center gap-x-6 gap-y-2 py-4 text-sm font-semibold md:text-base`}>
        {c.perks.map((p) => (
          <li key={p} className="flex items-center gap-3">
            <span aria-hidden="true" className="h-2.5 w-2.5 rotate-45 bg-[var(--t-accent)]" />
            {p}
          </li>
        ))}
      </ul>
    </div>
  );
}
