"use client";

import dynamic from "next/dynamic";
import { createContext, useContext, useEffect, useRef, useState } from "react";
import { C, ROASTS, type Roast } from "./palette";
import { HeroCup } from "./HeroCup";

/**
 * Cafe hero: a framed 3D "model" of a kettle pouring coffee. The stream leaves through the bottom
 * of the frame and CoffeeRiver carries it down the page. The roast picker recolours both,
 * via React context (3D) and the --coffee / --coffee-hi CSS variables (the river).
 * Without WebGL or with reduced motion the frame shows the flat SVG cup instead.
 */
const CoffeeScene = dynamic(() => import("./CoffeeScene"), { ssr: false, loading: () => <Fallback /> });

const RoastCtx = createContext<{ roast: Roast; setRoast: (r: Roast) => void }>({ roast: "medium", setRoast: () => {} });

export function RoastProvider({ children }: { children: React.ReactNode }) {
  const [roast, setRoast] = useState<Roast>("medium");
  useEffect(() => {
    const s = document.documentElement.style;
    s.setProperty("--coffee", ROASTS[roast].coffee);
    s.setProperty("--coffee-hi", ROASTS[roast].highlight);
  }, [roast]);
  return <RoastCtx.Provider value={{ roast, setRoast }}>{children}</RoastCtx.Provider>;
}

function canUse3D() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return false;
  try {
    const c = document.createElement("canvas");
    return !!(c.getContext("webgl2") || c.getContext("webgl"));
  } catch {
    return false;
  }
}

function Fallback() {
  return (
    <div className="absolute inset-x-[8%] bottom-[6%] top-[14%]">
      <HeroCup />
    </div>
  );
}

export function CafeHeroVisual() {
  const box = useRef<HTMLDivElement>(null);
  const { roast } = useContext(RoastCtx);
  const [use3D, setUse3D] = useState(false);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    setUse3D(canUse3D());
    const el = box.current;
    if (!el || !("IntersectionObserver" in window)) return;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div className="relative mx-auto w-full max-w-[440px]" style={{ rotate: "1.5deg" }}>
      <span className="tape absolute -top-3 left-1/2 z-10 h-6 w-28 -translate-x-1/2 -rotate-2" aria-hidden="true" />
      <div
        ref={box}
        className="relative aspect-[4/5] w-full overflow-hidden rounded-[1.5rem] border-[3px]"
        style={{ background: C.caramel, borderColor: C.ink, boxShadow: `8px 8px 0 ${C.ink}` }}
        data-cursor={use3D ? "คลิก = เติมช็อต ☕︎" : undefined}
      >
        {/* poster-style frame details */}
        <div className="pointer-events-none absolute inset-3 rounded-[1rem] border-2 border-dashed opacity-40" style={{ borderColor: C.ink }} aria-hidden="true" />
        <p className="pointer-events-none absolute left-5 top-5 font-mono text-[10px] font-bold tracking-[0.25em]" style={{ color: C.ink }}>
          POUR OVER · NO.07
        </p>
        <span
          className="stamp pointer-events-none absolute bottom-6 left-4 -rotate-12 font-mono text-[11px]"
          style={{ background: C.cream, color: C.ink, borderColor: C.ink }}
        >
          คั่วสดทุกสัปดาห์
        </span>
        {use3D ? <CoffeeScene roast={roast} active={visible} /> : <Fallback />}
      </div>
      {/* where the stream leaves the frame and the page river begins */}
      {use3D ? (
        <span
          data-river-start
          className="absolute -bottom-[3px] left-1/2 h-[6px] w-[16px] -translate-x-1/2"
          style={{ background: "var(--coffee, #6b4325)", borderInline: `3px solid ${C.ink}`, boxSizing: "content-box" }}
          aria-hidden="true"
        />
      ) : (
        <span data-river-start className="absolute bottom-0 left-1/2" aria-hidden="true" />
      )}
    </div>
  );
}

export function RoastPicker() {
  const { roast, setRoast } = useContext(RoastCtx);
  return (
    <div className="mt-8 max-w-md rounded-2xl border-2 p-4" style={{ borderColor: `${C.cream}55` }}>
      <p className="text-xs font-semibold" style={{ color: C.caramel }}>
        ลองเลือกระดับคั่ว แล้วดูสีกาแฟเปลี่ยนทั้งสาย
      </p>
      <div className="mt-3 flex flex-wrap gap-2" role="radiogroup" aria-label="ระดับคั่ว">
        {(Object.keys(ROASTS) as Roast[]).map((k) => {
          const on = k === roast;
          return (
            <button
              key={k}
              type="button"
              role="radio"
              aria-checked={on}
              onClick={() => setRoast(k)}
              data-cursor={ROASTS[k].label}
              className="press inline-flex h-10 items-center gap-2 rounded-full border-2 px-4 text-sm font-semibold"
              style={{
                borderColor: on ? C.ink : `${C.cream}88`,
                background: on ? C.cream : "transparent",
                color: on ? C.ink : C.cream,
                boxShadow: on ? `3px 3px 0 ${C.ink}` : "none",
              }}
            >
              <span className="h-3.5 w-3.5 rounded-full border-2" style={{ background: ROASTS[k].coffee, borderColor: C.ink }} />
              {ROASTS[k].label}
            </button>
          );
        })}
      </div>
      <p className="mt-3 text-sm opacity-80" aria-live="polite">
        {ROASTS[roast].note}
      </p>
    </div>
  );
}
