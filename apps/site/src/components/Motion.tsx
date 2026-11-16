"use client";

import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * Page-wide motion, borrowed from Korn's kit and kept light:
 * - [data-split]  headings rise word by word (Intl.Segmenter keeps Thai words whole)
 * - [data-pop]    stickers settle in softly
 * Kept deliberately calm (Nov 2026, korn): no overshoot/bounce, short distances, so nothing
 * looks like it is still loading or jumping around.
 * - [data-count]  numbers count up
 * Everything is skipped for prefers-reduced-motion; content is visible without JS.
 */
export function Motion() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      document.querySelectorAll<HTMLElement>("[data-split]").forEach((el) => {
        const words = splitWords(el);
        gsap.from(words, {
          yPercent: 60,
          opacity: 0,
          duration: 0.9,
          ease: "power3.out",
          stagger: 0.035,
          scrollTrigger: { trigger: el, start: "top 88%", once: true },
        });
      });

      ScrollTrigger.batch("[data-pop]", {
        start: "top 90%",
        once: true,
        onEnter: (els) =>
          gsap.fromTo(
            els,
            { opacity: 0, y: 18, rotate: (i) => (i % 2 ? 1 : -1) },
            {
              opacity: 1,
              y: 0,
              rotate: 0, // resting tilt lives in the CSS `rotate` property
              duration: 0.8,
              ease: "power3.out",
              stagger: 0.06,
              clearProps: "transform",
            },
          ),
      });

      document.querySelectorAll<HTMLElement>("[data-count]").forEach((el) => {
        const target = Number(el.dataset.count);
        const suffix = el.dataset.suffix ?? "";
        const obj = { v: 0 };
        gsap.to(obj, {
          v: target,
          duration: 1.6,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 92%", once: true },
          onUpdate: () => {
            el.textContent = `${Math.round(obj.v)}${suffix}`;
          },
        });
      });
    });

    return () => ctx.revert();
  }, []);
  return null;
}

/** Wrap every word of the element's text nodes in a masked span; keeps nested markup intact */
function splitWords(root: HTMLElement): HTMLElement[] {
  if (!root.getAttribute("aria-label")) root.setAttribute("aria-label", root.textContent?.trim() ?? "");
  const seg = typeof Intl !== "undefined" && "Segmenter" in Intl ? new Intl.Segmenter("th", { granularity: "word" }) : null;
  const out: HTMLElement[] = [];
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  const nodes: Text[] = [];
  while (walker.nextNode()) nodes.push(walker.currentNode as Text);

  for (const node of nodes) {
    const text = node.textContent ?? "";
    if (!text.trim() || node.parentElement?.closest("svg")) continue;
    const parts = seg ? Array.from(seg.segment(text), (s) => s.segment) : text.split(/(\s+)/);
    const frag = document.createDocumentFragment();
    for (const part of parts) {
      if (!part.trim()) {
        frag.append(part);
        continue;
      }
      const mask = document.createElement("span");
      mask.className = "split-w";
      mask.setAttribute("aria-hidden", "true");
      const inner = document.createElement("span");
      inner.textContent = part;
      mask.append(inner);
      frag.append(mask);
      out.push(inner);
    }
    node.replaceWith(frag);
  }
  return out;
}
