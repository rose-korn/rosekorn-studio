import { Pic } from "../Pic";
import { H2, card, textLink, wrap } from "../ui";
import type { BasicConfig } from "../types";

/**
 * Featured menu, products or services, in one of three layouts:
 * "list" = small photo rows (cafe menu), "cards" = big photo cards (products), "menu" = price list with dotted leaders (services).
 */
export function Highlights({ c }: { c: BasicConfig }) {
  const { title, layout = "list", ask } = c.highlights;
  const center = c.look === "calm";
  return (
    <section aria-labelledby="highlights" className={`${wrap} py-16 md:py-24`}>
      <H2 look={c.look} id="highlights">
        {title}
      </H2>
      {layout === "cards" ? <Cards c={c} /> : layout === "menu" ? <Menu c={c} /> : <List c={c} />}
      {c.howToOrder || c.payment ? (
        <p className={`mt-10 text-[var(--t-muted)] ${center ? "text-center" : ""}`}>
          {ask?.before ?? "ถูกใจชิ้นไหน"}{" "}
          <a href={c.contact.lineUrl} className={`${textLink} text-[var(--t-ink)]`}>
            ทัก LINE {c.contact.lineId}
          </a>{" "}
          {ask?.after ?? "บอกชื่อสินค้าได้เลย"}
        </p>
      ) : null}
    </section>
  );
}

function List({ c }: { c: BasicConfig }) {
  return (
    <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {c.highlights.items.map((it) => (
        <li key={it.name} className={`${card(c.look)} flex items-center gap-4 p-4`}>
          <div className="h-20 w-20 shrink-0 overflow-hidden rounded-2xl border-2 border-[var(--t-ink)]">
            <Pic pic={it.pic} />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-lg font-semibold leading-snug">{it.name}</p>
            {it.note ? <p className="text-sm text-[var(--t-muted)]">{it.note}</p> : null}
          </div>
          {it.price ? <p className="tpl-display shrink-0 text-xl text-[var(--t-accent)]">{it.price}</p> : null}
        </li>
      ))}
    </ul>
  );
}

function Cards({ c }: { c: BasicConfig }) {
  return (
    <ul className="mt-10 grid grid-cols-2 gap-4 md:gap-6 lg:grid-cols-3">
      {c.highlights.items.map((it) => (
        <li key={it.name} className={`${card(c.look)} relative flex flex-col overflow-hidden transition hover:-translate-y-1`}>
          <div className="aspect-square overflow-hidden border-b-2 border-[var(--t-ink)]">
            <Pic pic={it.pic} />
          </div>
          {it.badge ? (
            <span className="absolute left-3 top-3 rounded-md border-2 border-[var(--t-ink)] bg-[var(--t-accent)] px-2.5 py-0.5 text-xs font-semibold text-[var(--t-on-accent)]">
              {it.badge}
            </span>
          ) : null}
          <div className="flex flex-1 flex-col gap-1 p-3 md:p-4">
            <p className="font-semibold leading-snug md:text-lg">{it.name}</p>
            {it.note ? <p className="text-sm text-[var(--t-muted)]">{it.note}</p> : null}
            {it.price ? <p className="tpl-display mt-auto pt-2 text-xl text-[var(--t-accent)]">{it.price}</p> : null}
          </div>
        </li>
      ))}
    </ul>
  );
}

function Menu({ c }: { c: BasicConfig }) {
  return (
    <ul className="mx-auto mt-12 grid max-w-5xl gap-x-14 gap-y-8 md:grid-cols-2">
      {c.highlights.items.map((it) => (
        <li key={it.name} className="flex items-center gap-4">
          <div className="h-16 w-16 shrink-0 overflow-hidden rounded-full border border-[var(--t-ink)]/30">
            <Pic pic={it.pic} />
          </div>
          <div className="min-w-0 flex-1">
            <p className="flex items-baseline gap-2">
              <span className="text-lg font-semibold leading-snug">{it.name}</span>
              {it.badge ? <span className="shrink-0 rounded-full bg-[var(--t-soft)] px-2 text-xs font-medium">{it.badge}</span> : null}
              <span aria-hidden="true" className="min-w-6 flex-1 translate-y-[-0.25rem] border-b-2 border-dotted border-[var(--t-ink)]/30" />
              {it.price ? <span className="tpl-display shrink-0 text-xl text-[var(--t-accent)]">{it.price}</span> : null}
            </p>
            {it.note ? <p className="text-sm text-[var(--t-muted)]">{it.note}</p> : null}
          </div>
        </li>
      ))}
    </ul>
  );
}
