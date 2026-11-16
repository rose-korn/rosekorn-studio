import { H2, Tape, card, wrap } from "../ui";
import type { BasicConfig } from "../types";

/** static payment details only; nothing is charged on the site */
export function Payment({ c }: { c: BasicConfig }) {
  if (!c.payment) return null;
  const { title, lead, promptPay, banks, others } = c.payment;
  return (
    <section aria-labelledby="payment" className="border-y-2 border-[var(--t-ink)] bg-[var(--t-surface)]">
      <div className={`${wrap} py-16 md:py-24`}>
        <H2 look={c.look} id="payment">
          {title}
        </H2>
        {lead ? <p className="mt-5 max-w-xl text-lg leading-relaxed text-[var(--t-muted)]">{lead}</p> : null}
        <div className="mt-10 grid gap-6 md:grid-cols-[auto_1fr]">
          {promptPay ? (
            <div className={`${card(c.look)} relative flex flex-col items-center bg-[var(--t-bg)] p-5 md:w-64`} style={c.look === "cozy" ? { rotate: "-1.5deg" } : undefined}>
              {c.look === "cozy" ? <Tape className="-top-3 left-1/2 -translate-x-1/2" /> : null}
              <p className="font-semibold">พร้อมเพย์</p>
              <div className="mt-3 aspect-square w-40 overflow-hidden rounded-xl border-2 border-[var(--t-ink)] bg-white p-2">
                <QrPlaceholder />
              </div>
              <p className="tpl-display mt-3 text-lg">{promptPay.id}</p>
              <p className="text-sm text-[var(--t-muted)]">{promptPay.name}</p>
            </div>
          ) : null}
          <div className="grid content-start gap-4">
            {banks?.map((b) => (
              <div key={b.bank + b.number} className={`${card(c.look)} flex flex-wrap items-center justify-between gap-x-6 gap-y-1 px-5 py-4`}>
                <div>
                  <p className="font-semibold">{b.bank}</p>
                  <p className="text-sm text-[var(--t-muted)]">{b.name}</p>
                </div>
                <p className="tpl-display text-xl">{b.number}</p>
              </div>
            ))}
            {others ? (
              <ul className="grid gap-2 pt-2">
                {others.map((o) => (
                  <li key={o} className="flex items-start gap-3">
                    <span aria-hidden="true" className="mt-2 h-2.5 w-2.5 shrink-0 rounded-full border-2 border-[var(--t-ink)] bg-[var(--t-accent)]" />
                    {o}
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * A drawn stand-in for the shop's PromptPay QR. It is a pattern, not a working code:
 * for a client, this becomes the QR image their bank app gives them.
 */
function QrPlaceholder() {
  // a real QR is always dark on white, whatever the theme
  const dark = "#1b1b1b";
  const cells: [number, number][] = [];
  for (let y = 0; y < 21; y++)
    for (let x = 0; x < 21; x++) {
      const inFinder = (x < 8 && y < 8) || (x > 12 && y < 8) || (x < 8 && y > 12);
      if (!inFinder && (x * 7 + y * 13 + x * y) % 5 < 2) cells.push([x, y]);
    }
  const finder = (x: number, y: number) => (
    <g key={`${x}-${y}`}>
      <rect x={x} y={y} width="7" height="7" fill="none" stroke={dark} strokeWidth="1" transform="translate(.5 .5) scale(.93)" />
      <rect x={x + 2} y={y + 2} width="3" height="3" fill={dark} />
    </g>
  );
  return (
    <svg viewBox="-1 -1 23 23" role="img" aria-label="ตัวอย่าง QR พร้อมเพย์ (ใช้จ่ายจริงไม่ได้)" className="h-full w-full">
      <rect x="-1" y="-1" width="23" height="23" fill="#fff" />
      {cells.map(([x, y]) => (
        <rect key={`${x}-${y}`} x={x} y={y} width="1" height="1" fill={dark} />
      ))}
      {finder(0, 0)}
      {finder(14, 0)}
      {finder(0, 14)}
    </svg>
  );
}
