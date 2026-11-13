"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * Pinned horizontal lookbook: on desktop the runway slides sideways as you scroll, each look
 * straightening up as it reaches the middle, with a look counter ticking over. Phones and reduced
 * motion get a native swipe row instead (scroll-snap), so nothing is hidden behind the animation.
 */
export function Lookbook({ count, children }: { count: number; children: React.ReactNode }) {
  const section = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const counter = useRef<HTMLSpanElement>(null);
  const bar = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = section.current;
    const tr = track.current;
    if (!el || !tr) return;
    gsap.registerPlugin(ScrollTrigger);
    const mm = gsap.matchMedia();
    mm.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
      const distance = () => tr.scrollWidth - window.innerWidth;
      gsap.to(tr, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start: "top top",
          end: () => `+=${distance()}`,
          pin: true,
          scrub: 0.6,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            if (bar.current) bar.current.style.transform = `scaleX(${self.progress})`;
            if (counter.current) {
              const n = Math.min(count, Math.floor(self.progress * count) + 1);
              counter.current.textContent = String(n).padStart(2, "0");
            }
          },
        },
      });
      return () => gsap.set(tr, { clearProps: "transform" });
    });
    return () => mm.revert();
  }, [count]);

  return (
    <section ref={section} id="lookbook" className="relative overflow-hidden bg-[#0d0d0d] text-[#efebe4]">
      <div className="flex min-h-[100svh] flex-col justify-center py-16 md:pb-0 md:pt-12">
        <div className="container-x flex items-end justify-between gap-6">
          <h2 className="font-serif text-[clamp(2.4rem,6vw,5.5rem)] italic leading-none">Lookbook</h2>
          <p className="font-mono text-xs tracking-[0.3em]">
            LOOK <span ref={counter}>01</span> / {String(count).padStart(2, "0")}
          </p>
        </div>
        <div className="mt-10 overflow-x-auto md:overflow-visible [scrollbar-width:none] snap-x snap-mandatory">
          <div ref={track} className="flex w-max gap-6 px-4 md:gap-10 md:px-[8vw]">
            {children}
          </div>
        </div>
        <div className="container-x mt-10 hidden md:block">
          <div className="h-px w-full bg-white/20">
            <div ref={bar} className="h-px origin-left scale-x-0 bg-[#c9a46a]" />
          </div>
        </div>
      </div>
    </section>
  );
}
