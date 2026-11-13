"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { C, ROASTS, type Roast } from "./palette";
import { HeroCup } from "./HeroCup";

/**
 * Hero visual for the cafe demo: the 3D coffee pour plus a roast picker that recolours it.
 * Falls back to the flat SVG cup with no WebGL, with reduced motion, and while the 3D chunk loads.
 */
const CoffeeScene = dynamic(() => import("./CoffeeScene"), { ssr: false, loading: () => <Fallback /> });

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
    <div className="absolute inset-[6%]">
      <HeroCup />
    </div>
  );
}

export function CafeHeroVisual() {
  const box = useRef<HTMLDivElement>(null);
  const [use3D, setUse3D] = useState(false);
  const [visible, setVisible] = useState(true);
  const [roast, setRoast] = useState<Roast>("medium");

  useEffect(() => {
    setUse3D(canUse3D());
    const el = box.current;
    if (!el || !("IntersectionObserver" in window)) return;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div className="mx-auto w-full max-w-[520px]">
      <div
        ref={box}
        className="relative aspect-square w-full"
        data-cursor={use3D ? "คลิก = เติมช็อต ☕︎" : undefined}
      >
        {/* the caramel plate the cup sits on */}
        <div
          className="absolute inset-[9%] rounded-full border-[3px]"
          style={{ background: C.caramel, borderColor: C.ink, boxShadow: `8px 8px 0 ${C.ink}` }}
          aria-hidden="true"
        />
        {use3D ? <CoffeeScene roast={roast} active={visible} /> : <Fallback />}
        <span
          className="stamp pointer-events-none absolute left-0 top-[8%] -rotate-12 font-mono text-xs"
          style={{ background: C.cream, color: C.ink, borderColor: C.ink }}
        >
          คั่วสดทุกสัปดาห์
        </span>
      </div>

      {/* roast picker: changes the colour of the pour */}
      <div className="mt-6 rounded-2xl border-2 p-4" style={{ borderColor: `${C.cream}55` }}>
        <p className="text-xs font-semibold" style={{ color: C.caramel }}>
          ลองเลือกระดับคั่ว แล้วดูสีกาแฟเปลี่ยน
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
    </div>
  );
}
