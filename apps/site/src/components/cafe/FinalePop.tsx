"use client";

import { useEffect } from "react";
import { gsap } from "gsap";

/**
 * When the coffee river has filled the last cup (CoffeeRiver fires "coffee:full"), the cup pops up
 * bigger with a springy bounce, steam rises, the stamp slams on, and coffee beans burst out.
 */
export function FinalePop() {
  useEffect(() => {
    const calm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const onFull = () => {
      const cup = document.querySelector<HTMLElement>("[data-river-cup]");
      if (!cup) return;
      cup.dataset.full = "true";
      if (calm) return;
      const tl = gsap.timeline();
      tl.fromTo(cup, { scale: 1 }, { scale: 1.32, transformOrigin: "50% 100%", duration: 1.3, ease: "elastic.out(1, 0.4)" })
        .fromTo(cup.querySelector("[data-stamp]"), { scale: 3, rotate: -30, opacity: 0 }, { scale: 1, rotate: 12, opacity: 1, duration: 0.45, ease: "back.out(3)" }, 0.15)
        .from("[data-finale-title] > *", { yPercent: 60, opacity: 0, duration: 0.6, ease: "back.out(2)", stagger: 0.08 }, 0.2);
      // bean confetti from the cup
      const r = cup.getBoundingClientRect();
      for (let i = 0; i < 16; i++) {
        const b = document.createElement("span");
        b.setAttribute("aria-hidden", "true");
        Object.assign(b.style, {
          position: "fixed", left: `${r.left + r.width / 2}px`, top: `${r.top + r.height * 0.3}px`, width: "16px", height: "11px",
          borderRadius: "50%", background: "#5a3420", border: "2px solid #1b1a17", pointerEvents: "none", zIndex: "60",
        });
        document.body.append(b);
        const a = -Math.PI / 2 + (Math.random() - 0.5) * 2.4;
        const d = 160 + Math.random() * 180;
        gsap.timeline({ onComplete: () => b.remove() })
          .to(b, { x: Math.cos(a) * d, y: Math.sin(a) * d, rotate: Math.random() * 720, duration: 0.7, ease: "power2.out" })
          .to(b, { y: "+=320", opacity: 0, duration: 0.9, ease: "power2.in" });
      }
    };
    window.addEventListener("coffee:full", onFull);
    return () => window.removeEventListener("coffee:full", onFull);
  }, []);
  return null;
}
