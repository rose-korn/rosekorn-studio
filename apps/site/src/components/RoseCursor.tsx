"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

const PETAL_COLORS = ["#e0475e", "#f7a8c4", "#5bcefa", "#ffffff", "#f7a8c4", "#e0475e", "#5bcefa"];

/**
 * Rose cursor (from Korn's kit, swapped from a flower to the studio rose).
 * Fine pointers only, appears after the first real mouse move.
 * Hovering a link/button shows a small label (data-cursor="..." to customise).
 * Click: petal burst. Type "rose" or "pride" anywhere: petals rain.
 */
export function RoseCursor() {
  const dot = useRef<HTMLDivElement>(null);
  const label = useRef<HTMLSpanElement>(null);
  const glyph = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const calm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const el = dot.current!;
    const root = document.documentElement;
    let typed = "";

    const onKey = (e: KeyboardEvent) => {
      typed = (typed + e.key.toLowerCase()).slice(-6);
      if (typed.endsWith("rose") || typed.endsWith("pride")) rainPetals();
    };
    window.addEventListener("keydown", onKey);
    if (!fine || calm) return () => window.removeEventListener("keydown", onKey);

    const xTo = gsap.quickTo(el, "x", { duration: 0.08, ease: "power3" });
    const yTo = gsap.quickTo(el, "y", { duration: 0.08, ease: "power3" });
    let shown = false;
    let hovering: Element | null = null;

    let lastX = 0;
    let lastY = 0;
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      lastX = e.clientX;
      lastY = e.clientY;
      if (!shown) {
        shown = true;
        root.classList.add("rose-cursor");
        gsap.set(el, { x: e.clientX, y: e.clientY });
        gsap.to(el, { autoAlpha: 1, duration: 0.2 });
      }
      xTo(e.clientX);
      yTo(e.clientY);
      updateHover(e.target as Element | null);
    };
    // scrolling moves the page under a still mouse, so re-check what it is over
    const onScroll = () => shown && updateHover(document.elementFromPoint(lastX, lastY));
    const updateHover = (over: Element | null) => {
      const target = over?.closest("a, button, summary, [data-cursor]") ?? null;
      if (target !== hovering) {
        hovering = target;
        const text = target?.getAttribute("data-cursor") ?? (target ? (target.matches("a[target=_blank]") ? "เปิดดู" : "คลิก") : "");
        if (label.current) label.current.textContent = text;
        gsap.to(glyph.current, { scale: target ? 1.35 : 1, rotate: target ? -18 : 0, duration: 0.4, ease: "back.out(2.2)" });
        gsap.to(label.current, { autoAlpha: target ? 1 : 0, scale: target ? 1 : 0.6, duration: 0.3, ease: "back.out(2.2)" });
      }
    };
    const onLeave = () => gsap.to(el, { autoAlpha: 0, duration: 0.2 });
    const onEnter = () => shown && gsap.to(el, { autoAlpha: 1, duration: 0.2 });
    const onDown = (e: PointerEvent) => e.pointerType === "mouse" && burst(e.clientX, e.clientY);

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("pointerdown", onDown);
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);
    return () => {
      root.classList.remove("rose-cursor");
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("pointerdown", onDown);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
    };
  }, []);

  return (
    <div
      ref={dot}
      className="pointer-events-none fixed left-0 top-0 z-[100] opacity-0"
      style={{ visibility: "hidden" }}
      aria-hidden="true"
    >
      {/* a little rose: bud spiral, cupped front petal, stem and leaf. Hotspot sits on the bloom. */}
      <svg
        ref={glyph}
        viewBox="-20 -20 40 40"
        className="-ml-[18px] -mt-[17px] h-9 w-9"
        style={{ filter: "drop-shadow(1.5px 1.5px 0 #151311)", transformOrigin: "50% 45%" }}
      >
        <g stroke="#151311" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round">
          <path d="M2 9 C3 13 4 16 7 19" fill="none" />
          <path d="M4.5 14 C9 11 13 12 14 14 C11 17 7 16.5 4.5 14Z" fill="#5fae6e" />
          <path d="M-10 -2 C-13 -10 -7 -15 -1 -12 C4 -16 12 -12 10 -3 Z" fill="#f7a8c4" />
          <path d="M-6 -4 C-7 -10 1 -12 3 -8 C6 -10 8 -6 6 -3 Z" fill="#e0475e" />
          <path d="M-2 -6 C-1 -9 3 -9 3 -6 C3 -4 0 -4 -0.5 -5.5" fill="none" />
          <path d="M-11 -4 C-12 6 -5 10 1 10 C7 10 12 5 11 -4 C8 0 4 1 0 1 C-4 1 -8 0 -11 -4Z" fill="#e0475e" />
          <path d="M-5 1 C-4 5 -1 7 2 7" fill="none" />
        </g>
      </svg>
      <span
        ref={label}
        className="absolute left-6 top-5 whitespace-nowrap rounded-full border-2 border-ink bg-paper px-2.5 py-0.5 font-mono text-[11px] font-bold text-ink opacity-0"
      />
    </div>
  );
}

function petal(color: string) {
  const p = document.createElement("span");
  p.setAttribute("aria-hidden", "true");
  Object.assign(p.style, {
    position: "fixed",
    left: "0",
    top: "0",
    width: "12px",
    height: "16px",
    borderRadius: "60% 60% 60% 60% / 80% 80% 40% 40%",
    background: color,
    border: "2px solid #151311",
    pointerEvents: "none",
    zIndex: "99",
  });
  document.body.append(p);
  return p;
}

function burst(x: number, y: number) {
  const ring = document.createElement("span");
  Object.assign(ring.style, {
    position: "fixed", left: `${x - 14}px`, top: `${y - 14}px`, width: "28px", height: "28px",
    border: "2.5px solid #151311", borderRadius: "999px", pointerEvents: "none", zIndex: "99",
  });
  document.body.append(ring);
  gsap.fromTo(ring, { scale: 0.3, opacity: 1 }, { scale: 1.8, opacity: 0, duration: 0.5, ease: "expo.out", onComplete: () => ring.remove() });
  PETAL_COLORS.forEach((c, i) => {
    const p = petal(c);
    const a = (i / PETAL_COLORS.length) * Math.PI * 2 + Math.random() * 0.4;
    const d = 40 + Math.random() * 30;
    gsap.fromTo(
      p,
      { x: x - 6, y: y - 8, rotate: 0, scale: 0.4, opacity: 1 },
      { x: x - 6 + Math.cos(a) * d, y: y - 8 + Math.sin(a) * d, rotate: (Math.random() - 0.5) * 360, scale: 1, opacity: 0, duration: 0.8, ease: "expo.out", onComplete: () => p.remove() },
    );
  });
}

function rainPetals() {
  for (let i = 0; i < 40; i++) {
    const p = petal(PETAL_COLORS[i % PETAL_COLORS.length]);
    const x = Math.random() * window.innerWidth;
    gsap.fromTo(
      p,
      { x, y: -30, rotate: Math.random() * 360 },
      {
        y: window.innerHeight + 40,
        x: x + (Math.random() - 0.5) * 200,
        rotate: `+=${(Math.random() - 0.5) * 720}`,
        duration: 2.5 + Math.random() * 2,
        delay: Math.random() * 1.2,
        ease: "power1.in",
        onComplete: () => p.remove(),
      },
    );
  }
}
