import { Pic } from "../Pic";
import { H2, wrap } from "../ui";
import type { BasicConfig } from "../types";

const tilts = ["-1.5deg", "1.2deg", "-0.6deg", "1.8deg", "-1deg", "0.8deg"];

/** photos of the place. cozy: pinned prints with captions. Other looks: a clean photo grid. */
export function Gallery({ c }: { c: BasicConfig }) {
  if (!c.gallery) return null;
  const cozy = c.look === "cozy";
  return (
    <section aria-labelledby="gallery" className="bg-[var(--t-soft)] py-16 md:py-24">
      <div className={wrap}>
        <H2 look={c.look} id="gallery">
          {c.gallery.title}
        </H2>
        <ul className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6">
          {c.gallery.items.map((g, i) => (
            <li
              key={(g.src ?? "") + g.alt}
              className={cozy ? "rounded-[18px] border-2 border-[var(--t-ink)] bg-[var(--t-surface)] p-2 pb-3" : ""}
              style={cozy ? { rotate: tilts[i % tilts.length] } : undefined}
            >
              <div className={`aspect-square overflow-hidden ${cozy ? "rounded-xl" : "rounded-[14px] border-2 border-[var(--t-ink)]"}`}>
                <Pic pic={g} />
              </div>
              {g.caption ? <p className="mt-2 px-1 text-sm text-[var(--t-muted)]">{g.caption}</p> : null}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
