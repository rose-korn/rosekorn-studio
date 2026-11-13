"use client";

import { useEffect } from "react";
import { gsap } from "gsap";

/** Buttons marked [data-magnetic] lean toward the mouse and spring back when it leaves. */
export function Magnetic() {
  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const els = Array.from(document.querySelectorAll<HTMLElement>("[data-magnetic]"));
    const offs = els.map((el) => {
      const move = (e: PointerEvent) => {
        const r = el.getBoundingClientRect();
        gsap.to(el, { x: (e.clientX - (r.left + r.width / 2)) * 0.35, y: (e.clientY - (r.top + r.height / 2)) * 0.45, duration: 0.35, ease: "power3.out" });
      };
      const leave = () => gsap.to(el, { x: 0, y: 0, duration: 0.9, ease: "elastic.out(1, 0.35)" });
      el.addEventListener("pointermove", move);
      el.addEventListener("pointerleave", leave);
      return () => {
        el.removeEventListener("pointermove", move);
        el.removeEventListener("pointerleave", leave);
      };
    });
    return () => offs.forEach((f) => f());
  }, []);
  return null;
}
