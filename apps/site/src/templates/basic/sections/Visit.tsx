import { H2, card, wrap } from "../ui";
import type { BasicConfig } from "../types";

/** opening hours and a link to the map */
export function Visit({ c }: { c: BasicConfig }) {
  const shadow = c.look === "calm" ? "" : "shadow-[6px_6px_0_var(--t-ink)]";
  return (
    <section aria-labelledby="visit" className={`${wrap} grid gap-8 py-16 md:grid-cols-2 md:py-24`}>
      <div>
        <H2 look={c.look} id="visit" center={false}>
          {c.visitTitle ?? "เวลาเปิด และการเดินทาง"}
        </H2>
        <ul className={`${card(c.look)} mt-8 divide-y-2 divide-dashed divide-[var(--t-ink)]/20 px-5`}>
          {c.hours.map((h) => (
            <li key={h.day} className="flex items-center justify-between gap-4 py-3">
              <span className="font-medium">{h.day}</span>
              <span className={h.closed ? "text-[var(--t-muted)]" : ""}>{h.closed ? "ปิด" : h.time}</span>
            </li>
          ))}
        </ul>
      </div>
      <a href={c.mapUrl} className={`${card(c.look)} group relative flex min-h-64 flex-col justify-end overflow-hidden p-5 ${shadow}`}>
        <MapDrawing />
        <div className="relative rounded-2xl border-2 border-[var(--t-ink)] bg-[var(--t-surface)] p-4">
          <p className="leading-relaxed">{c.address}</p>
          <p className="mt-2 font-semibold text-[var(--t-accent)] group-hover:underline">เปิดใน Google Maps →</p>
        </div>
      </a>
    </section>
  );
}

/** a drawn street map, not a live embed, so the page stays fast and cookie-free */
function MapDrawing() {
  return (
    <svg viewBox="0 0 400 260" aria-hidden="true" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice">
      <rect width="400" height="260" fill="var(--t-soft)" />
      <g fill="none" stroke="var(--t-surface)" strokeWidth="18" strokeLinecap="round">
        <path d="M-10 70 C120 60 260 90 410 76" />
        <path d="M150 -10 C140 90 160 180 146 270" />
        <path d="M-10 190 C100 200 300 170 410 196" />
      </g>
      <path d="M290 -10 C300 80 280 180 300 270" fill="none" stroke="var(--t-surface)" strokeWidth="10" strokeDasharray="2 14" strokeLinecap="round" />
      <g transform="translate(222 118)">
        <path d="M0 -36 C-20 -36 -26 -16 -18 -4 L0 22 L18 -4 C26 -16 20 -36 0 -36 Z" fill="var(--t-accent)" stroke="var(--t-ink)" strokeWidth="3" />
        <circle cy="-18" r="7" fill="var(--t-surface)" stroke="var(--t-ink)" strokeWidth="2.5" />
      </g>
    </svg>
  );
}
