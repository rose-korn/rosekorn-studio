"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MenuArt, type Art } from "./MenuArt";
import { C } from "./palette";

export type MenuItem = { name: string; note: string; price: number; star?: boolean; art?: Art };
export type MenuGroup = { group: string; en: string; items: MenuItem[] };

/**
 * The menu as a sidewalk A-frame chalkboard under a hanging shop sign: chalk drawings for every item,
 * today's special, and an order tray. Tap a row to add it; a − / + stepper appears in a fixed-width
 * slot so rows never change height.
 * On a real site the tray's button would open LINE with the order already typed out.
 */
export function MenuBoard({ menu }: { menu: MenuGroup[] }) {
  const [cart, setCart] = useState<Record<string, number>>({});
  const [bump, setBump] = useState<string | null>(null);
  const [sent, setSent] = useState(false);
  const stand = useRef<HTMLDivElement>(null);

  // the sign swings in on its strings, the board drops onto its legs, then the chalk "writes" itself in
  useEffect(() => {
    const el = stand.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ scrollTrigger: { trigger: el, start: "top 75%", once: true } });
      tl.from("[data-board]", { y: -90, rotate: -3, opacity: 0, duration: 1, ease: "bounce.out" })
        .from("[data-sign]", { rotate: 14, transformOrigin: "50% 0%", duration: 1.6, ease: "elastic.out(1.2, 0.3)" }, 0.2)
        .from(
          "[data-chalk]",
          { clipPath: "inset(0 100% 0 0)", opacity: 0.2, duration: 0.6, ease: "power2.out", stagger: 0.05 },
          0.5,
        );
      // the hanging sign keeps swaying gently, and kicks when you scroll fast
      gsap.to("[data-sign]", { rotate: 2, transformOrigin: "50% 0%", duration: 2.4, ease: "sine.inOut", yoyo: true, repeat: -1 });
      ScrollTrigger.create({
        trigger: el,
        onUpdate: (self) => {
          const v = gsap.utils.clamp(-8, 8, self.getVelocity() / 300);
          if (Math.abs(v) > 1) gsap.to("[data-sign] p", { rotate: -v, duration: 0.3, overwrite: true, onComplete: () => void gsap.to("[data-sign] p", { rotate: 0, duration: 1.2, ease: "elastic.out(1, 0.3)" }) });
        },
      });
    }, el);
    return () => ctx.revert();
  }, []);

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
      {/* roughens every chalk drawing a little so it reads hand-drawn */}
      <svg width="0" height="0" className="absolute" aria-hidden="true">
        <filter id="chalk">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="3" />
          <feDisplacementMap in="SourceGraphic" scale="1.8" />
        </filter>
      </svg>

      <div ref={stand} className="relative mx-auto max-w-6xl pb-28 md:pb-36">
        {/* hanging shop sign above the board */}
        <div className="relative z-10 mx-auto -mb-3 flex w-fit flex-col items-center" data-sign>
          <div className="flex gap-24 md:gap-40" aria-hidden="true">
            <span className="h-8 w-[3px]" style={{ background: C.ink }} />
            <span className="h-8 w-[3px]" style={{ background: C.ink }} />
          </div>
          <p
            className="rounded-xl border-[3px] px-6 py-2 font-[family-name:var(--font-chonburi)] text-lg md:text-xl"
            style={{ background: C.caramel, color: C.ink, borderColor: C.ink, boxShadow: `4px 4px 0 ${C.ink}` }}
          >
            ☕︎ บ้านกาแฟ · เปิดแล้ว
          </p>
        </div>

        {/* the A-frame chalkboard */}
        <div
          data-board
          className="relative rounded-[22px] border-[3px] p-3 md:p-4"
          style={{
            borderColor: C.ink,
            background: "repeating-linear-gradient(90deg, #9a6a3f 0 18px, #8c5f37 18px 20px, #a5744a 20px 44px)",
            boxShadow: `8px 8px 0 ${C.ink}`,
          }}
        >
          <div
            className="relative overflow-hidden rounded-[14px] border-[3px] px-3 py-8 sm:px-5 md:px-10 md:py-12"
            style={{
              borderColor: C.ink,
              color: "#f3ecdc",
              background:
                "radial-gradient(ellipse at 20% 15%, rgba(255,255,255,.07), transparent 45%), radial-gradient(ellipse at 80% 70%, rgba(255,255,255,.05), transparent 50%), #26322b",
              boxShadow: "inset 0 0 40px rgba(0,0,0,.45)",
            }}
          >
            {/* header */}
            <div className="text-center">
              <p className="font-mono text-[11px] tracking-[0.4em] opacity-70">BREW · BAKE · REPEAT</p>
              <h2 data-chalk className="mt-2 font-[family-name:var(--font-chonburi)] text-[clamp(2.6rem,7vw,5rem)] leading-none">
                เมนูวันนี้
              </h2>
              <svg viewBox="0 0 300 16" className="mx-auto mt-2 h-4 w-56" style={{ filter: "url(#chalk)" }} aria-hidden="true">
                <path d="M4 10 C60 2 120 14 160 8 S260 4 296 9" fill="none" stroke="#d9a35b" strokeWidth="3" strokeLinecap="round" />
              </svg>
              <p className="mt-3 font-[family-name:var(--font-chalk)] text-base opacity-80">แตะรูปหรือชื่อเมนูเพื่อใส่ออเดอร์ แล้วส่งทาง LINE ได้ทันที</p>
            </div>

            {/* today's special */}
            <div data-chalk className="relative mx-auto mt-10 grid max-w-3xl items-center gap-6 rounded-2xl border-2 border-dashed p-5 sm:grid-cols-[auto_1fr_auto] md:p-6" style={{ borderColor: "#f3ecdc66" }}>
              <div className="relative mx-auto h-28 w-28 md:h-32 md:w-32">
                <RoseLatte />
              </div>
              <div className="text-center sm:text-left">
                <p className="font-[family-name:var(--font-chalk)] text-lg" style={{ color: "#f7a8c4" }}>
                  ✿ แนะนำวันนี้ ต้องลอง!
                </p>
                <p className="font-[family-name:var(--font-chonburi)] text-3xl md:text-4xl">{signature.name}</p>
                <p className="mt-1 font-[family-name:var(--font-chalk)] opacity-80">ไซรัปกุหลาบมอญเคี่ยวเอง หอมอ่อน ๆ ปาดลายกุหลาบทุกแก้ว</p>
              </div>
              <div className="flex flex-col items-center gap-2">
                <span className="font-[family-name:var(--font-chonburi)] text-4xl" style={{ color: C.caramel }}>
                  ฿{signature.price}
                </span>
                <button
                  type="button"
                  onClick={() => change(signature.name, 1)}
                  data-cursor="+ ใส่ออเดอร์"
                  className="press inline-flex h-11 items-center gap-2 rounded-full border-2 px-5 font-[family-name:var(--font-chalk)] text-lg"
                  style={{ borderColor: "#f3ecdc", color: "#f3ecdc" }}
                >
                  + ใส่ออเดอร์
                  {cart[signature.name] ? (
                    <span className="rounded-full px-2 font-mono text-xs" style={{ background: C.caramel, color: C.ink }}>
                      {cart[signature.name]}
                    </span>
                  ) : null}
                </button>
              </div>
              {/* chalk arrow doodle */}
              <svg viewBox="0 0 80 60" className="pointer-events-none absolute -left-4 -top-10 hidden h-14 w-20 md:block" style={{ filter: "url(#chalk)" }} aria-hidden="true">
                <path d="M6 8 C30 4 52 18 60 46 M50 38 L60 47 L66 34" fill="none" stroke="#f3ecdc" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>

            {/* categories */}
            <div className="mt-12 grid gap-10 md:grid-cols-3 md:gap-8">
              {menu.map((g) => (
                <div key={g.group}>
                  <div data-chalk className="flex items-baseline justify-between border-b-2 border-dashed pb-2" style={{ borderColor: "#f3ecdc55" }}>
                    <h3 className="font-[family-name:var(--font-chonburi)] text-2xl md:text-3xl">{g.group}</h3>
                    <span className="font-mono text-[10px] tracking-[0.3em] opacity-60">{g.en.toUpperCase()}</span>
                  </div>
                  <ul className="mt-3 space-y-1">
                    {g.items.map((it) => {
                      const n = cart[it.name] ?? 0;
                      return (
                        <li key={it.name} data-chalk className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => change(it.name, 1)}
                            data-cursor="+ ใส่ออเดอร์"
                            className="group flex min-w-0 flex-1 items-center gap-2 rounded-xl md:gap-3 px-1.5 py-1.5 text-left transition-colors hover:bg-white/5"
                          >
                            <span className="h-12 w-12 shrink-0 transition-transform md:h-14 md:w-14 duration-300 group-hover:-rotate-6 group-hover:scale-110">
                              {it.art ? <MenuArt art={it.art} /> : null}
                            </span>
                            <span className="min-w-0 flex-1">
                              <span className="flex items-baseline gap-2">
                                <span className="font-[family-name:var(--font-chalk)] text-base leading-tight md:text-lg">{it.name}</span>
                                <span className="mb-1 flex-1 border-b-2 border-dotted opacity-30" style={{ borderColor: "#f3ecdc" }} />
                                <span className="font-[family-name:var(--font-chalk)] text-lg" style={{ color: C.caramel }}>
                                  {it.price}
                                </span>
                              </span>
                              <span className="block text-xs opacity-60">
                                {it.star ? "★ " : ""}
                                {it.note}
                              </span>
                            </span>
                          </button>
                          {/* fixed-size slot so rows never change height */}
                          <span className="flex h-9 w-[4.5rem] shrink-0 items-center justify-end">
                            {n ? (
                              <span className="inline-flex h-9 items-center rounded-full border-2" style={{ borderColor: "#f3ecdc", background: C.caramel, color: C.ink }}>
                                <button type="button" onClick={() => change(it.name, -1)} aria-label={`ลด ${it.name}`} className="h-full w-6 rounded-l-full font-bold hover:bg-black/10">
                                  −
                                </button>
                                <span
                                  className="w-5 text-center font-mono text-sm font-bold tabular-nums transition-transform duration-200"
                                  style={{ transform: bump === it.name ? "scale(1.3)" : "none" }}
                                >
                                  {n}
                                </span>
                                <button type="button" onClick={() => change(it.name, 1)} aria-label={`เพิ่ม ${it.name}`} className="h-full w-6 rounded-r-full font-bold hover:bg-black/10">
                                  +
                                </button>
                              </span>
                            ) : (
                              <button
                                type="button"
                                onClick={() => change(it.name, 1)}
                                aria-label={`ใส่ ${it.name} ในออเดอร์`}
                                className="inline-flex h-9 w-9 items-center justify-center rounded-full border-2 font-bold transition-colors hover:bg-white/10"
                                style={{ borderColor: "#f3ecdc99" }}
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

            <p data-chalk className="mt-10 text-center font-[family-name:var(--font-chalk)] text-base opacity-75">
              ราคารวม VAT แล้ว · นมโอ๊ต / อัลมอนด์ +15 · พกแก้วมาเองลด 5 บาท ✿
            </p>
            {/* chalk tray with a stub of chalk */}
            <div className="absolute inset-x-6 bottom-2 h-2 rounded-full bg-black/30" aria-hidden="true" />
            <span className="absolute bottom-3 right-12 h-2 w-8 rounded-sm bg-[#f3ecdc]" aria-hidden="true" />
          </div>
        </div>

        {/* A-frame legs + pavement */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 md:h-36" aria-hidden="true">
          <span className="absolute left-[9%] top-0 h-full w-4 origin-top rotate-[9deg] rounded-b-md border-[3px] md:w-5" style={{ background: "#8c5f37", borderColor: C.ink }} />
          <span className="absolute right-[9%] top-0 h-full w-4 origin-top -rotate-[9deg] rounded-b-md border-[3px] md:w-5" style={{ background: "#8c5f37", borderColor: C.ink }} />
          <span className="absolute inset-x-[12%] top-[45%] h-3 rounded-full border-[3px]" style={{ background: "#9a6a3f", borderColor: C.ink }} />
          <span className="absolute -inset-x-4 bottom-0 h-[3px] rounded-full" style={{ background: C.ink }} />
        </div>
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
