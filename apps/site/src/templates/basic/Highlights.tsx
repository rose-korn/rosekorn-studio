"use client";

import { useEffect, useState } from "react";
import { Pic } from "./Pic";
import { loadSheetItems } from "./sheet";
import type { BasicConfig } from "./types";

const card = "rounded-[22px] border-2 border-[var(--t-ink)] bg-[var(--t-surface)]";

/**
 * Featured menu / products. With `sheetUrl`, items come live from the shop's Google Sheet,
 * so they can add or change items without asking us. The items in the config are shown first
 * and stay as the fallback if the sheet can't be reached.
 */
export function Highlights({ items, sheetUrl }: { items: BasicConfig["highlights"]["items"]; sheetUrl?: string }) {
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
