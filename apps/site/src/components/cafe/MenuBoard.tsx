"use client";

import { useState } from "react";
import { C } from "./palette";

type Item = { name: string; note: string; price: number; star?: boolean };
type Group = { group: string; en: string; items: Item[] };

/**
 * Menu cards you can tap to build an order. The tray at the bottom shows the total,
 * and on a real site its button would open LINE with the order already typed out.
 */
export function MenuBoard({ menu }: { menu: Group[] }) {
  const [cart, setCart] = useState<Record<string, number>>({});
  const [bump, setBump] = useState<string | null>(null);
  const [sent, setSent] = useState(false);

  const all = menu.flatMap((g) => g.items);
  const count = Object.values(cart).reduce((a, b) => a + b, 0);
  const total = all.reduce((sum, it) => sum + (cart[it.name] ?? 0) * it.price, 0);

  const add = (name: string) => {
    setCart((c) => ({ ...c, [name]: (c[name] ?? 0) + 1 }));
    setBump(name);
    setSent(false);
    window.setTimeout(() => setBump((b) => (b === name ? null : b)), 350);
  };

  return (
    <>
      <p className="mt-4 text-sm opacity-60">แตะเมนูเพื่อใส่ในออเดอร์ แล้วส่งทาง LINE ได้ทันที</p>
      <div className="mt-10 grid gap-8 md:grid-cols-3">
        {menu.map((g, i) => (
          <div
            key={g.group}
            data-pop
            className="rounded-[1.25rem] border-[2.5px] p-7"
            style={{
              borderColor: C.ink,
              background: i === 1 ? C.cream2 : "#fbf6ec",
              boxShadow: `6px 6px 0 ${C.ink}`,
              rotate: i === 1 ? "1deg" : "-0.8deg",
            }}
          >
            <p className="font-mono text-[11px] tracking-[0.25em] opacity-60">{g.en.toUpperCase()}</p>
            <h3 className="mt-1 font-[family-name:var(--font-chonburi)] text-3xl">{g.group}</h3>
            <ul className="mt-6 space-y-2">
              {g.items.map((it) => {
                const n = cart[it.name] ?? 0;
                return (
                  <li key={it.name}>
                    <button
                      type="button"
                      onClick={() => add(it.name)}
                      data-cursor="+ ใส่ออเดอร์"
                      className="group -mx-3 flex w-[calc(100%+1.5rem)] items-baseline gap-3 rounded-xl px-3 py-2 text-left transition-colors hover:bg-black/5"
                    >
                      <span className="min-w-0">
                        <span className="font-semibold">
                          {it.name}
                          {it.star ? (
                            <span className="ml-2 rounded-full px-2 py-0.5 align-middle font-mono text-[10px]" style={{ background: C.caramel }}>
                              แนะนำ
                            </span>
                          ) : null}
                        </span>
                        <span className="block text-sm opacity-60">{it.note}</span>
                      </span>
                      <span className="mb-1.5 flex-1 border-b-2 border-dotted opacity-30" style={{ borderColor: C.ink }} />
                      <span className="flex items-center gap-2">
                        {n ? (
                          <span
                            className="inline-flex h-6 min-w-6 items-center justify-center rounded-full border-2 px-1 font-mono text-xs font-bold transition-transform duration-300"
                            style={{
                              borderColor: C.ink,
                              background: C.caramel,
                              transform: bump === it.name ? "scale(1.35) rotate(-8deg)" : "none",
                            }}
                          >
                            {n}
                          </span>
                        ) : (
                          <span className="font-mono text-lg font-bold opacity-0 transition-opacity group-hover:opacity-60" aria-hidden="true">
                            +
                          </span>
                        )}
                        <span className="font-mono font-bold">{it.price}</span>
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>

      {/* order tray */}
      <div
        className={`fixed inset-x-3 bottom-4 z-40 mx-auto max-w-xl transition-all duration-500 ${
          count ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-24 opacity-0"
        }`}
        style={{ transitionTimingFunction: "cubic-bezier(.34,1.56,.64,1)" }}
        aria-live="polite"
      >
        <div
          className="flex items-center justify-between gap-3 rounded-full border-[2.5px] py-2 pl-5 pr-2"
          style={{ background: C.cream, color: C.ink, borderColor: C.ink, boxShadow: `5px 5px 0 ${C.ink}` }}
        >
          <p className="min-w-0 truncate text-sm">
            {sent ? (
              <span>ในเว็บจริงจะเปิด LINE พร้อมข้อความออเดอร์ให้เลยค่ะ ✿</span>
            ) : (
              <>
                <strong>{count} รายการ</strong> · <span className="font-mono font-bold">{total.toLocaleString("th-TH")} บาท</span>
              </>
            )}
          </p>
          <span className="flex shrink-0 items-center gap-1.5">
            <button
              type="button"
              onClick={() => {
                setCart({});
                setSent(false);
              }}
              className="h-9 rounded-full px-3 text-xs font-semibold opacity-60 hover:opacity-100"
            >
              ล้าง
            </button>
            <button
              type="button"
              onClick={() => setSent(true)}
              data-cursor="เดโม"
              className="press inline-flex h-10 items-center gap-2 rounded-full border-2 px-4 text-sm font-semibold text-white"
              style={{ background: "#06c755", borderColor: C.ink }}
            >
              ส่งออเดอร์ทาง LINE
            </button>
          </span>
        </div>
      </div>
    </>
  );
}
