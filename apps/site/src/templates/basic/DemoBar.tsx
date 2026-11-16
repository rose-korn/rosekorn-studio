"use client";

import { useState } from "react";
import { themeVars } from "./ui";
import type { Theme } from "./types";

/**
 * Thin bar on top of a template demo: says it is a sample, lets the visitor try the colour sets,
 * and links back to the studio. Not part of a client's real site.
 */
export function DemoBar({ themes, backHref, chooseHref }: { themes: Theme[]; backHref: string; chooseHref: string }) {
  const [on, setOn] = useState(0);
  const pick = (i: number) => {
    setOn(i);
    const root = document.getElementById("tpl-root");
    if (!root) return;
    for (const [k, v] of Object.entries(themeVars(themes[i]))) root.style.setProperty(k, String(v));
  };
  return (
    <div className="sticky top-0 z-50 border-b-2 border-ink bg-paper font-thai text-ink">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-x-5 gap-y-2 px-5 py-2.5 text-sm md:px-8">
        <a href={backHref} className="font-semibold hover:text-rose">
          ← Rosekorn Studio
        </a>
        <span className="hidden rounded-full bg-ink px-3 sm:inline py-0.5 text-xs font-semibold text-paper">เทมเพลต Landing Basic · ร้านสมมติ</span>
        <div className="flex items-center gap-2" role="group" aria-label="ลองเปลี่ยนสี">
          <span className="text-muted">ลองเปลี่ยนสี</span>
          {themes.map((t, i) => (
            <button
              key={t.label}
              type="button"
              onClick={() => pick(i)}
              aria-pressed={on === i}
              title={t.label}
              className={`h-6 w-6 rounded-full border-2 border-ink transition ${on === i ? "scale-110 shadow-[2px_2px_0_var(--color-ink)]" : "opacity-80 hover:opacity-100"}`}
              style={{ background: `linear-gradient(135deg, ${t.bg} 0 50%, ${t.accent} 50% 100%)` }}
            >
              <span className="sr-only">{t.label}</span>
            </button>
          ))}
        </div>
        <a href={chooseHref} className="ml-auto inline-flex h-8 items-center rounded-full border-2 border-ink bg-rose px-4 text-xs font-semibold text-white">
          อยากได้แบบนี้
        </a>
      </div>
    </div>
  );
}
