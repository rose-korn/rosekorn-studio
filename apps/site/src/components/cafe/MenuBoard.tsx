"use client";

import { useState } from "react";
import { C } from "./palette";

type Item = { name: string; note: string; price: number; star?: boolean };
type Group = { group: string; en: string; items: Item[] };

/**
 * Menu with a featured signature drink, three category cards and an order tray.
 * Tap a row to add it; a − / + stepper appears in a fixed-width slot so rows never change height.
 * On a real site the tray's button would open LINE with the order already typed out.
 */
export function MenuBoard({ menu }: { menu: Group[] }) {
  const [cart, setCart] = useState<Record<string, number>>({});
  const [bump, setBump] = useState<string | null>(null);
  const [sent, setSent] = useState(false);

  const all = menu.flatMap((g) => g.items);
  const count = Object.values(cart).reduce((a, b) => a + b, 0);
  const total = all.reduce((sum, it) => sum + (cart[it.name] ?? 0) * it.price, 0);
  const signature = menu[0].items.find((it) => it.star) ?? menu[0].items[0];

  const change = (name: string, by: number) => {
    setCart((c) => {
      const n = Math.max(0, (c[name] ?? 0) + by);
      const next = { ...c, [name]: n };
      if (!n) delete next[name];
      return next;
    });
    setSent(false);
    if (by > 0) {
      setBump(name);
      window.setTimeout(() => setBump((b) => (b === name ? null : b)), 300);
    }
  };

  return (
    <>
      <p className="mt-4 text-sm opacity-60">แตะเมนูเพื่อใส่ในออเดอร์ แล้วส่งทาง LINE ได้ทันที</p>

      {/* signature drink */}
      <div
        data-pop
        className="relative mt-12 grid items-center gap-8 overflow-hidden rounded-[1.5rem] border-[2.5px] p-6 sm:grid-cols-[auto_1fr] md:p-10"
        style={{ borderColor: C.ink, background: C.bg, color: C.cream, boxShadow: `6px 6px 0 ${C.ink}`, rotate: "-0.6deg" }}
      >
        <span className="tape absolute -top-2 right-16 h-6 w-24 rotate-3" aria-hidden="true" />
        <div className="relative mx-auto h-44 w-44 md:h-56 md:w-56">
          <RoseLatte />
          <svg viewBox="0 0 200 200" className="absolute -right-6 -top-6 h-24 w-24 animate-spin-slow" aria-hidden="true">
            <defs>
              <path id="sig-ring" d="M100,100 m-72,0 a72,72 0 1,1 144,0 a72,72 0 1,1 -144,0" />
            </defs>
            <circle cx="100" cy="100" r="92" fill={C.caramel} stroke={C.ink} strokeWidth="5" />
            <text style={{ fontFamily: "var(--font-mono)", fontSize: 20, letterSpacing: 4, fontWeight: 700 }} fill={C.ink}>
              <textPath href="#sig-ring">SIGNATURE · ประจำร้าน ·</textPath>
            </text>
            <text x="100" y="112" textAnchor="middle" fontSize="40" fill={C.ink}>
              ✿
            </text>
          </svg>
        </div>
        <div>
          <p className="font-mono text-[11px] tracking-[0.25em]" style={{ color: C.caramel }}>
            HOUSE SIGNATURE
          </p>
          <h3 className="mt-2 font-[family-name:var(--font-chonburi)] text-[clamp(2rem,4.5vw,3.4rem)] leading-[1.1]">{signature.name}</h3>
          <p className="mt-3 max-w-md opacity-85">
            ลาเต้นมสดกับไซรัปกุหลาบที่เคี่ยวเองจากกลีบกุหลาบมอญ หอมอ่อน ๆ ไม่หวานแหลม ปาดลายกุหลาบให้ทุกแก้ว
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-4">
            <span className="font-[family-name:var(--font-chonburi)] text-4xl" style={{ color: C.caramel }}>
              ฿{signature.price}
            </span>
            <button
              type="button"
              onClick={() => change(signature.name, 1)}
              data-cursor="+ ใส่ออเดอร์"
              className="press inline-flex h-12 items-center gap-2 rounded-full border-[2.5px] px-6 font-semibold"
              style={{ background: C.caramel, color: C.ink, borderColor: C.ink, boxShadow: `3px 3px 0 ${C.ink}` }}
            >
              + ใส่ออเดอร์
              {cart[signature.name] ? (
                <span className="rounded-full px-2 font-mono text-xs" style={{ background: C.cream }}>
                  {cart[signature.name]}
                </span>
              ) : null}
            </button>
          </div>
        </div>
      </div>

      {/* category cards */}
      <div className="mt-12 grid gap-8 md:grid-cols-3">
        {menu.map((g, i) => (
          <div
            key={g.group}
            data-pop
            className="group/card rounded-[1.25rem] border-[2.5px] p-6 md:p-7"
            style={{
              borderColor: C.ink,
              background: i === 1 ? C.cream2 : "#fbf6ec",
              boxShadow: `6px 6px 0 ${C.ink}`,
              rotate: i === 1 ? "1deg" : "-0.8deg",
            }}
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="font-mono text-[11px] tracking-[0.25em] opacity-60">{g.en.toUpperCase()}</p>
                <h3 className="mt-1 font-[family-name:var(--font-chonburi)] text-3xl">{g.group}</h3>
              </div>
              <span className="transition-transform duration-500 group-hover/card:-rotate-12 group-hover/card:scale-110">
                <CategoryIcon i={i} />
              </span>
            </div>
            <ul className="mt-5 space-y-1">
              {g.items.map((it) => {
                const n = cart[it.name] ?? 0;
                return (
                  <li key={it.name} className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => change(it.name, 1)}
                      data-cursor="+ ใส่ออเดอร์"
                      className="group flex min-w-0 flex-1 items-baseline gap-3 rounded-xl px-2 py-2 text-left transition-colors hover:bg-black/5"
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
                      <span className="font-mono font-bold">{it.price}</span>
                    </button>
                    {/* fixed-size slot: shows + until the item is in the order, then − n + */}
                    <span className="flex h-9 w-[5.5rem] shrink-0 items-center justify-end">
                      {n ? (
                        <span
                          className="inline-flex h-9 items-center rounded-full border-2"
                          style={{ borderColor: C.ink, background: C.caramel }}
                        >
                          <button
                            type="button"
                            onClick={() => change(it.name, -1)}
                            aria-label={`ลด ${it.name}`}
                            className="h-full w-7 rounded-l-full font-bold hover:bg-black/10"
                          >
                            −
                          </button>
                          <span
                            className="w-6 text-center font-mono text-sm font-bold tabular-nums transition-transform duration-200"
                            style={{ transform: bump === it.name ? "scale(1.3)" : "none" }}
                          >
                            {n}
                          </span>
                          <button
                            type="button"
                            onClick={() => change(it.name, 1)}
                            aria-label={`เพิ่ม ${it.name}`}
                            className="h-full w-7 rounded-r-full font-bold hover:bg-black/10"
                          >
                            +
                          </button>
                        </span>
                      ) : (
                        <button
                          type="button"
                          onClick={() => change(it.name, 1)}
                          aria-label={`ใส่ ${it.name} ในออเดอร์`}
                          className="inline-flex h-9 w-9 items-center justify-center rounded-full border-2 font-bold transition-colors hover:bg-black/5"
                          style={{ borderColor: C.ink }}
                        >
                          +
                        </button>
                      )}
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>

      {/* order tray: fades in place (no bounce), clear and send are big tap targets */}
      <div
        className={`fixed inset-x-3 z-40 mx-auto max-w-xl transition-opacity duration-300 ${count ? "opacity-100" : "pointer-events-none opacity-0"}`}
        style={{ bottom: "max(1rem, env(safe-area-inset-bottom))" }}
        aria-live="polite"
        aria-hidden={!count}
      >
        <div
          className="flex items-center justify-between gap-3 rounded-[1.25rem] border-[2.5px] p-2 pl-4"
          style={{ background: C.cream, color: C.ink, borderColor: C.ink, boxShadow: `5px 5px 0 ${C.ink}` }}
        >
          <p className="min-w-0 text-sm leading-snug">
            {sent ? (
              <span>ในเว็บจริงจะเปิด LINE พร้อมข้อความออเดอร์ให้เลยค่ะ ✿</span>
            ) : (
              <>
                <strong className="tabular-nums">{count} รายการ</strong>
                <br />
                <span className="font-mono font-bold tabular-nums">{total.toLocaleString("th-TH")} บาท</span>
              </>
            )}
          </p>
          <span className="flex shrink-0 items-center gap-2">
            <button
              type="button"
              onClick={() => {
                setCart({});
                setSent(false);
              }}
              className="h-11 rounded-full border-2 px-4 text-sm font-semibold hover:bg-black/5"
              style={{ borderColor: C.ink }}
            >
              ล้าง
            </button>
            <button
              type="button"
              onClick={() => setSent(true)}
              data-cursor="เดโม"
              className="inline-flex h-11 items-center gap-2 rounded-full border-2 px-4 text-sm font-semibold text-white"
              style={{ background: "#06c755", borderColor: C.ink }}
            >
              ส่งทาง LINE
            </button>
          </span>
        </div>
      </div>
    </>
  );
}

/** Top-down latte with rose latte art */
function RoseLatte() {
  return (
    <svg viewBox="0 0 200 200" className="h-full w-full animate-[spin_40s_linear_infinite]" role="img" aria-label="ลาเต้ปาดลายกุหลาบ">
      <ellipse cx="100" cy="100" rx="96" ry="96" fill={C.cream2} stroke={C.ink} strokeWidth="4" />
      <circle cx="100" cy="100" r="70" fill={C.cream} stroke={C.ink} strokeWidth="4" />
      <circle cx="100" cy="100" r="60" style={{ fill: "var(--coffee, #6b4325)", transition: "fill .6s" }} />
      {/* rose art: a spiral of cream petals */}
      <g fill="none" stroke="#f6ead6" strokeWidth="5" strokeLinecap="round">
        <path d="M100 100 m-4 0 a4 4 0 1 1 8 0 a9 9 0 1 1 -17 2 a15 15 0 1 1 28 -6 a22 22 0 1 1 -40 12 a29 29 0 1 1 52 -14" />
      </g>
      <path d="M100 140 q-2 12 6 22" fill="none" stroke="#f6ead6" strokeWidth="4" strokeLinecap="round" />
      <path d="M104 152 q10 -6 16 0 q-8 6 -16 0z" fill="#f6ead6" />
    </svg>
  );
}

function CategoryIcon({ i }: { i: number }) {
  const common = { fill: "none", stroke: C.ink, strokeWidth: 3, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  return (
    <svg viewBox="0 0 48 48" className="h-12 w-12" aria-hidden="true">
      {i === 0 ? (
        <>
          <path d="M10 18h24v10a10 10 0 0 1-10 10h-4a10 10 0 0 1-10-10z" fill={C.caramel} {...{ stroke: C.ink, strokeWidth: 3, strokeLinejoin: "round" }} />
          <path d="M34 21h3a4 4 0 0 1 0 8h-3" {...common} />
          <path d="M17 8c-2 3 2 4 0 7M24 6c-2 3 2 4 0 7" {...common} />
        </>
      ) : i === 1 ? (
        <>
          <path d="M13 12h22l-3 28H16z" fill="#b9d18f" stroke={C.ink} strokeWidth={3} strokeLinejoin="round" />
          <path d="M14 22h20" {...common} />
          <path d="M28 12l4-8" {...common} />
          <circle cx="20" cy="30" r="2.2" fill={C.ink} />
          <circle cx="27" cy="34" r="2.2" fill={C.ink} />
        </>
      ) : (
        <>
          <path d="M6 32c4-14 32-14 36 0-6 6-30 6-36 0z" fill={C.caramel} stroke={C.ink} strokeWidth={3} strokeLinejoin="round" />
          <path d="M16 22l3 12M24 20v14M32 22l-3 12" {...common} />
        </>
      )}
    </svg>
  );
}
