"use client";

import { useEffect, useRef, useState } from "react";
import { C } from "./palette";
import { TornEdge } from "./TornEdge";

/**
 * "Moments at the cafe": a swipeable strip of taped polaroids with a 1 / 5 counter and arrows.
 * Native scroll-snap does the swiping on phones; on desktop you can also drag it with the mouse.
 * The drawings stand in for the shop's real photos.
 */
const shots = [
  { cap: "นั่งทำงานยาว ๆ ปลั๊กมีทุกโต๊ะ", bg: C.caramel, art: <Laptop /> },
  { cap: "คาราเมล แมวส้มประจำร้าน", bg: "#f7a8c4", art: <Cat /> },
  { cap: "ลาเต้อาร์ตกุหลาบ เมนูประจำร้าน", bg: C.cream2, art: <RoseArt /> },
  { cap: "ฝนตกก็นั่งต่อได้ ไม่มีใครไล่", bg: "#5bcefa", art: <Rain /> },
  { cap: "ครัวซองต์ออกจากเตา 8 โมงเช้า", bg: C.caramel, art: <Tray /> },
];

export function Moments() {
  const track = useRef<HTMLDivElement>(null);
  const [at, setAt] = useState(0);

  // which card is centred -> counter
  useEffect(() => {
    const el = track.current;
    if (!el) return;
    const onScroll = () => {
      const cards = Array.from(el.children) as HTMLElement[];
      const mid = el.scrollLeft + el.clientWidth / 2;
      let best = 0;
      cards.forEach((c, i) => {
        if (Math.abs(c.offsetLeft + c.offsetWidth / 2 - mid) < Math.abs(cards[best].offsetLeft + cards[best].offsetWidth / 2 - mid)) best = i;
      });
      setAt(best);
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  // mouse drag (touch already swipes natively)
  useEffect(() => {
    const el = track.current;
    if (!el || !window.matchMedia("(pointer: fine)").matches) return;
    let down = false;
    let x0 = 0;
    let s0 = 0;
    const start = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      down = true;
      x0 = e.clientX;
      s0 = el.scrollLeft;
      el.style.scrollSnapType = "none";
      el.style.cursor = "grabbing";
    };
    const move = (e: PointerEvent) => {
      if (down) el.scrollLeft = s0 - (e.clientX - x0);
    };
    const end = () => {
      if (!down) return;
      down = false;
      el.style.cursor = "";
      el.style.scrollSnapType = "";
    };
    el.addEventListener("pointerdown", start);
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", end);
    return () => {
      el.removeEventListener("pointerdown", start);
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", end);
    };
  }, []);

  const go = (d: number) => {
    const el = track.current;
    const card = el?.children[Math.max(0, Math.min(shots.length - 1, at + d))] as HTMLElement | undefined;
    if (el && card) el.scrollTo({ left: card.offsetLeft - (el.clientWidth - card.offsetWidth) / 2, behavior: "smooth" });
  };

  return (
    <section className="relative pb-28 pt-6 md:pb-36" style={{ background: C.bg }} aria-label="โมเมนต์ในร้าน">
      <TornEdge side="bottom" fill={C.bg2} seed={41} />
      <div data-river-via="0.96" className="absolute left-0 top-1/3 h-0" aria-hidden="true" />
      <div className="container-x relative z-[2] flex flex-wrap items-end justify-between gap-6">
        <div>
          <p className="font-mono text-xs tracking-[0.25em]" style={{ color: C.caramel }}>
            SWEET MOMENTS
          </p>
          <h2 className="mt-4 font-[family-name:var(--font-chonburi)] text-[clamp(2.2rem,5vw,3.8rem)] leading-tight">โมเมนต์ในร้าน</h2>
        </div>
        <div className="flex items-center gap-3">
          <span className="font-mono text-sm tabular-nums" aria-live="polite">
            {at + 1} / {shots.length}
          </span>
          {[
            [-1, "‹", "รูปก่อนหน้า"],
            [1, "›", "รูปถัดไป"],
          ].map(([d, t, l]) => (
            <button
              key={t as string}
              type="button"
              onClick={() => go(d as number)}
              disabled={(d as number) < 0 ? at === 0 : at === shots.length - 1}
              aria-label={l as string}
              className="press grid h-11 w-11 place-items-center rounded-full border-[2.5px] text-2xl leading-none disabled:opacity-35"
              style={{ background: C.cream, color: C.ink, borderColor: C.ink, boxShadow: `3px 3px 0 ${C.ink}` }}
            >
              {t as string}
            </button>
          ))}
        </div>
      </div>

      <div
        ref={track}
        className="relative z-[2] mt-10 flex cursor-grab snap-x snap-mandatory gap-6 overflow-x-auto px-[max(1.25rem,calc((100vw-72rem)/2))] pb-6 pt-4 [scrollbar-width:none] md:gap-10"
        data-cursor="ลากดูได้"
      >
        {shots.map((s, i) => (
          <figure
            key={s.cap}
            className="relative w-[78vw] shrink-0 snap-center select-none rounded-[1rem] border-[3px] p-3 pb-4 sm:w-[22rem]"
            style={{ background: "#fbf6ea", borderColor: C.ink, boxShadow: `6px 6px 0 ${C.ink}`, rotate: `${[-2, 1.5, -1, 2, -1.5][i]}deg`, color: C.ink }}
          >
            <span className="tape-clear absolute -top-3 left-1/2 h-6 w-24 -translate-x-1/2" style={{ rotate: `${i % 2 ? 4 : -3}deg` }} aria-hidden="true" />
            <div className="aspect-[4/3.4] overflow-hidden rounded-[0.6rem] border-[2.5px]" style={{ background: s.bg, borderColor: C.ink }}>
              {s.art}
            </div>
            <figcaption className="mt-3 flex items-baseline justify-between gap-3 font-[family-name:var(--font-chalk)] text-lg">
              {s.cap}
              <span className="font-mono text-[11px] opacity-50">{String(i + 1).padStart(2, "0")}</span>
            </figcaption>
          </figure>
        ))}
      </div>
      <p className="relative z-[2] mt-2 text-center font-mono text-xs tracking-[0.2em] opacity-60 md:hidden">← ปัดดูรูปถัดไป →</p>
    </section>
  );
}

/* ---------- the "photos": ink drawings ---------- */

const ink = { stroke: C.ink, strokeWidth: 4, strokeLinejoin: "round" as const, strokeLinecap: "round" as const };

function Laptop() {
  return (
    <svg viewBox="0 0 240 200" className="h-full w-full" aria-hidden="true">
      <rect x="0" y="150" width="240" height="50" fill="#9a6a3f" />
      <path d="M0 150 H240" {...ink} />
      <rect x="40" y="62" width="120" height="80" rx="6" fill="#e7e2d6" {...ink} />
      <rect x="52" y="74" width="96" height="56" rx="3" fill="#5bcefa" {...ink} strokeWidth={3} />
      <path d="M62 90 h40 M62 102 h60 M62 114 h30" {...ink} strokeWidth={3} />
      <path d="M26 150 H174 L166 142 H34 Z" fill="#cfc8b8" {...ink} />
      <path d="M186 104 H216 L212 146 Q211 150 206 150 H196 Q191 150 190 146 Z" fill={C.cream} {...ink} />
      <path d="M216 114 h5 a8 8 0 0 1 0 16 h-6" fill="none" {...ink} />
      <path d="M196 94 c-4 -5 4 -8 0 -14 M206 94 c-4 -5 4 -8 0 -14" fill="none" {...ink} strokeWidth={3} />
      <rect x="10" y="166" width="22" height="14" rx="3" fill="#f1e7d3" {...ink} strokeWidth={3} />
      <path d="M16 166 v-6 M26 166 v-6" {...ink} strokeWidth={3} />
    </svg>
  );
}

function Cat() {
  return (
    <svg viewBox="0 0 240 200" className="h-full w-full" aria-hidden="true">
      <rect x="0" y="150" width="240" height="50" fill="#9a6a3f" />
      <path d="M0 150 H240" {...ink} />
      <path d="M60 150 Q56 98 100 92 Q150 86 170 120 Q180 150 160 150 Z" fill="#e8873a" {...ink} />
      <path d="M160 150 q30 0 36 -20 q4 -14 -8 -12" fill="none" {...ink} strokeWidth={9} stroke={C.ink} />
      <path d="M160 150 q30 0 36 -20 q4 -14 -8 -12" fill="none" stroke="#e8873a" strokeWidth={4} strokeLinecap="round" />
      <circle cx="96" cy="84" r="30" fill="#e8873a" {...ink} />
      <path d="M72 66 L70 42 L90 58 Z M110 56 L124 40 L122 66 Z" fill="#e8873a" {...ink} />
      <path d="M84 84 q4 -4 8 0 M104 84 q4 -4 8 0" fill="none" {...ink} strokeWidth={3} />
      <path d="M98 92 l-3 3 h6 z" fill={C.ink} {...ink} strokeWidth={2} />
      <path d="M90 100 q8 6 16 0" fill="none" {...ink} strokeWidth={3} />
      <path d="M100 120 q10 8 22 2 M118 104 q10 10 26 6" fill="none" stroke="#c96a26" strokeWidth={4} strokeLinecap="round" />
      <text x="190" y="60" fontSize="22" fill={C.ink} fontFamily="var(--font-chalk)">
        z z
      </text>
    </svg>
  );
}

function RoseArt() {
  return (
    <svg viewBox="0 0 240 200" className="h-full w-full" aria-hidden="true">
      <circle cx="120" cy="100" r="84" fill="#fbf6ea" {...ink} />
      <circle cx="120" cy="100" r="62" fill="var(--coffee, #6b4325)" {...ink} />
      <path
        d="M120 100 m-6 0 a6 6 0 1 1 12 0 a14 14 0 1 1 -26 2 a22 22 0 1 1 42 -6 a30 30 0 1 1 -54 14"
        fill="none"
        stroke="#f6ead6"
        strokeWidth="6"
        strokeLinecap="round"
      />
      <path d="M120 150 v-14 M108 142 q12 -2 12 -10 M132 142 q-12 -2 -12 -10" fill="none" stroke="#f6ead6" strokeWidth="5" strokeLinecap="round" />
      <path d="M200 120 q26 4 30 30 q-26 -2 -30 -30z" fill="#9cc46a" {...ink} strokeWidth={3} />
    </svg>
  );
}

function Rain() {
  return (
    <svg viewBox="0 0 240 200" className="h-full w-full" aria-hidden="true">
      <rect x="40" y="20" width="160" height="130" rx="6" fill="#bfe6f5" {...ink} />
      <path d="M120 20 V150 M40 85 H200" {...ink} />
      {[
        [60, 34],
        [90, 50],
        [150, 36],
        [176, 60],
        [70, 100],
        [104, 118],
        [160, 100],
        [184, 126],
      ].map(([x, y]) => (
        <path key={`${x}${y}`} d={`M${x} ${y} l-4 12`} stroke="#3a7fa0" strokeWidth="3" strokeLinecap="round" />
      ))}
      <rect x="20" y="150" width="200" height="16" rx="4" fill="#9a6a3f" {...ink} />
      <path d="M96 128 H124 L121 148 Q120 150 116 150 H104 Q100 150 99 148 Z" fill={C.cream} {...ink} strokeWidth={3} />
      <path d="M104 120 c-3 -4 3 -6 0 -10 M114 120 c-3 -4 3 -6 0 -10" fill="none" {...ink} strokeWidth={2.5} />
      <path d="M150 150 l10 -24 h30 l10 24" fill="#e0475e" {...ink} strokeWidth={3} />
    </svg>
  );
}

function Tray() {
  return (
    <svg viewBox="0 0 240 200" className="h-full w-full" aria-hidden="true">
      <path d="M20 130 H220 L206 160 H34 Z" fill="#8a8a8a" {...ink} />
      {[
        [70, 112],
        [130, 104],
        [180, 116],
      ].map(([x, y], i) => (
        <g key={x} transform={`translate(${x} ${y}) rotate(${[-8, 4, 10][i]})`}>
          <path d="M-40 10 C-34 -14 34 -14 40 10 C30 20 -30 20 -40 10 Z" fill="#d9a35b" {...ink} />
          <path d="M-20 -2 L-16 14 M0 -6 V16 M20 -2 L16 14" fill="none" {...ink} strokeWidth={3} />
        </g>
      ))}
      <path d="M70 70 c-6 -8 6 -12 0 -20 M120 62 c-6 -8 6 -12 0 -20 M170 72 c-6 -8 6 -12 0 -20" fill="none" {...ink} strokeWidth={3} />
      <text x="120" y="190" textAnchor="middle" fontSize="16" fill={C.ink} fontFamily="var(--font-chalk)">
        ร้อน ๆ จากเตา
      </text>
    </svg>
  );
}
