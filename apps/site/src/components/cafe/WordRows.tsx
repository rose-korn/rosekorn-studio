"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { C } from "./palette";
import { TornEdge } from "./TornEdge";

/**
 * Giant taste words in rows that slide in opposite directions as you scroll,
 * and lean (skew) with how fast you scroll. Alternating solid and outlined lettering.
 */
const rows = [
  ["หอมกรุ่น", "เข้มข้น", "ละมุน"],
  ["กรอบนอก", "นุ่มใน", "หวานน้อย"],
  ["สดชื่น", "ตื่นเต็มตา", "ขออีกแก้ว"],
];

export function WordRows() {
  const box = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = box.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.registerPlugin(ScrollTrigger);
    const lines = Array.from(el.querySelectorAll<HTMLElement>("[data-row]"));
    const ctx = gsap.context(() => {
      lines.forEach((line, i) => {
        const dir = i % 2 ? 1 : -1;
        gsap.fromTo(
          line,
          { xPercent: dir > 0 ? -30 : -5 },
          { xPercent: dir > 0 ? -5 : -30, ease: "none", scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: 0.6 } },
        );
      });
      const skew = lines.map((l) => gsap.quickTo(l, "skewX", { duration: 0.5, ease: "power3.out" }));
      ScrollTrigger.create({
        trigger: el,
        start: "top bottom",
        end: "bottom top",
        onUpdate: (self) => {
          const v = gsap.utils.clamp(-14, 14, self.getVelocity() / -160);
          skew.forEach((q, i) => q(i % 2 ? -v : v));
        },
      });
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={box} className="relative overflow-hidden py-24 md:py-32" style={{ background: C.cream, color: C.ink }} aria-label="รสชาติของบ้านกาแฟ">
      <TornEdge side="top" fill={C.bg2} seed={11} />
      <TornEdge side="bottom" fill={C.bg} seed={23} />
      <div data-river-via="0.5" className="h-0" aria-hidden="true" />
      <div className="relative z-[2] flex flex-col gap-2 md:gap-4">
        {rows.map((words, i) => (
          <div key={i} data-row className="flex w-max items-center gap-6 whitespace-nowrap will-change-transform md:gap-10">
            {[...words, ...words, ...words].map((w, j) => (
              <span key={j} className="flex items-center gap-6 md:gap-10">
                <span
                  className="font-[family-name:var(--font-chonburi)] text-[clamp(3.2rem,11vw,9.5rem)] leading-[1.15]"
                  style={(i + j) % 2 ? { color: "transparent", WebkitTextStroke: `2.5px ${C.ink}` } : undefined}
                >
                  {w}
                </span>
                <Bean flip={j % 2 === 1} />
              </span>
            ))}
          </div>
        ))}
      </div>
      <p className="relative z-[2] mt-8 text-center font-mono text-xs tracking-[0.25em] opacity-60">SCROLL FASTER · ตัวอักษรเอียงตามแรงเลื่อน</p>
    </section>
  );
}

function Bean({ flip }: { flip: boolean }) {
  return (
    <svg viewBox="0 0 40 40" className="h-10 w-10 shrink-0 md:h-16 md:w-16" style={{ rotate: flip ? "35deg" : "-25deg" }} aria-hidden="true">
      <ellipse cx="20" cy="20" rx="13" ry="17" fill="var(--coffee, #6b4325)" stroke={C.ink} strokeWidth="2.5" />
      <path d="M20 5 C 13 15, 27 25, 20 35" fill="none" stroke={C.ink} strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}
