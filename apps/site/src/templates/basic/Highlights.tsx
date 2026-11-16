"use client";

import { useEffect, useState } from "react";
import { Pic } from "./Pic";
import { loadSheetItems } from "./sheet";
import type { BasicConfig } from "./types";

type H = BasicConfig["highlights"];

const card = "rounded-[22px] border-2 border-[var(--t-ink)] bg-[var(--t-surface)]";
const tilts = ["-1.5deg", "1.2deg", "-0.6deg", "1.8deg", "-1deg", "0.8deg"];

/**
 * Featured menu or products. "list" = small rows (a cafe menu), "cards" = big photo cards (a shop).
 * With `sheetUrl`, items come live from the shop's Google Sheet, so they can add or change items
 * without asking us. The items in the config show first and stay as the fallback if the sheet can't be reached.
 */
export function Highlights({ items, layout = "list", sheetUrl }: { items: H["items"]; layout?: H["layout"]; sheetUrl?: string }) {
  const [list, setList] = useState(items);
  useEffect(() => {
    if (!sheetUrl) return;
    let alive = true;
    loadSheetItems(sheetUrl)
      .then((rows) => {
        if (alive && rows.length) setList(rows);
      })
      .catch(() => {});
    return () => {
      alive = false;
    };
  }, [sheetUrl]);

  if (layout === "cards")
    return (
      <ul className="mt-10 grid grid-cols-2 gap-4 md:gap-6 lg:grid-cols-3">
        {list.map((it, i) => (
          <li key={it.name} className={`${card} relative flex flex-col overflow-hidden transition hover:-translate-y-1 hover:shadow-[6px_6px_0_var(--t-ink)]`}>
            <div className="aspect-square overflow-hidden border-b-2 border-[var(--t-ink)]">
              <Pic pic={it.pic} />
            </div>
            {it.badge ? (
              <span
                className="absolute left-3 top-3 rounded-full border-2 border-[var(--t-ink)] bg-[var(--t-accent)] px-3 py-0.5 text-xs font-semibold text-[var(--t-on-accent)]"
                style={{ rotate: tilts[i % tilts.length] }}
              >
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

  return (
    <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {list.map((it) => (
        <li key={it.name} className={`${card} flex items-center gap-4 p-4`}>
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
