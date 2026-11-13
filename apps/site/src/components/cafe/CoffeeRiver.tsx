"use client";

import { useEffect, useRef, useState } from "react";
import { C } from "./palette";

/**
 * The coffee that leaves the hero frame keeps flowing down the page as you scroll.
 * The path is built from markers in the page:
 *   [data-river-start]          where the 3D stream leaves the frame
 *   [data-river-via="0..1"]     waypoints; the value is x as a fraction of the width
 *   [data-river-end]            the cup mouth at the bottom of the page
 * The leading tip follows ~72% down the viewport, eased so it moves like liquid,
 * and the end cup ([data-river-cup]) fills through the --fill CSS variable once the coffee arrives.
 * Sits on z-1: over section backgrounds, under the content (which is z-2).
 */
export function CoffeeRiver() {
  const svg = useRef<SVGSVGElement>(null);
  const line = useRef<SVGPathElement>(null);
  const reveal = useRef<SVGPathElement>(null);
  const tip = useRef<SVGGElement>(null);
  const [geo, setGeo] = useState({ d: "", w: 0, h: 0, endY: 0 });

  // build the path from the markers, and rebuild whenever the layout changes
  useEffect(() => {
    const host = svg.current?.parentElement;
    if (!host) return;
    const build = () => {
      const hr = host.getBoundingClientRect();
      const start = document.querySelector("[data-river-start]");
      const end = document.querySelector("[data-river-end]");
      if (!start || !end) return;
      const sr = start.getBoundingClientRect();
      const er = end.getBoundingClientRect();
      const pts = [{ x: sr.left + sr.width / 2 - hr.left, y: sr.bottom - hr.top - 3 }];
      document.querySelectorAll<HTMLElement>("[data-river-via]").forEach((el) => {
        const r = el.getBoundingClientRect();
        pts.push({ x: parseFloat(el.dataset.riverVia || "0.5") * hr.width, y: r.top + r.height / 2 - hr.top });
      });
      const last = { x: er.left + er.width / 2 - hr.left, y: er.top + er.height / 2 - hr.top };
      pts.push(last);
      pts.sort((a, b) => a.y - b.y);
      let d = `M${pts[0].x.toFixed(1)},${pts[0].y.toFixed(1)}`;
      for (let i = 1; i < pts.length; i++) {
        const p = pts[i - 1];
        const n = pts[i];
        const k = (n.y - p.y) * 0.55; // vertical handles keep the flow going downhill
        d += ` C${p.x.toFixed(1)},${(p.y + k).toFixed(1)} ${n.x.toFixed(1)},${(n.y - k).toFixed(1)} ${n.x.toFixed(1)},${n.y.toFixed(1)}`;
      }
      setGeo({ d, w: hr.width, h: hr.height, endY: last.y });
    };
    build();
    const ro = new ResizeObserver(build);
    ro.observe(host);
    document.fonts?.ready.then(build);
    window.addEventListener("load", build);
    return () => {
      ro.disconnect();
      window.removeEventListener("load", build);
    };
  }, []);

  // pour as you scroll
  useEffect(() => {
    const path = line.current;
    const mask = reveal.current;
    const host = svg.current?.parentElement;
    if (!geo.d || !path || !mask || !host) return;
    const total = path.getTotalLength();
    const N = 600;
    const ys: number[] = [];
    let maxY = -Infinity;
    for (let i = 0; i <= N; i++) {
      maxY = Math.max(maxY, path.getPointAtLength((total * i) / N).y);
      ys.push(maxY);
    }
    mask.style.strokeDasharray = `${total} ${total}`;
    const cup = document.querySelector<HTMLElement>("[data-river-cup]");
    const calm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const lengthAtY = (y: number) => {
      let lo = 0;
      let hi = N;
      while (lo < hi) {
        const mid = (lo + hi) >> 1;
        if (ys[mid] < y) lo = mid + 1;
        else hi = mid;
      }
      return (total * lo) / N;
    };

    let cur = 0;
    let raf = 0;
    let last = performance.now();
    const frame = (now: number) => {
      const dt = Math.min(0.1, (now - last) / 1000);
      last = now;
      const hostTop = host.getBoundingClientRect().top + window.scrollY;
      const targetY = window.scrollY + window.innerHeight * 0.72 - hostTop;
      const target = calm ? total : lengthAtY(targetY);
      cur += (target - cur) * (calm ? 1 : 1 - Math.exp(-dt * 5));
      if (Math.abs(target - cur) < 0.5) cur = target;
      mask.style.strokeDashoffset = `${total - cur}`;
      const p = path.getPointAtLength(cur);
      if (tip.current) {
        tip.current.setAttribute("transform", `translate(${p.x.toFixed(1)} ${p.y.toFixed(1)})`);
        tip.current.style.opacity = cur > 4 && cur < total - 2 ? "1" : "0";
      }
      if (cup) {
        const arrived = cur >= total - 20;
        const fill = arrived ? Math.min(1, Math.max(0, (targetY - geo.endY) / (window.innerHeight * 0.3))) : 0;
        cup.style.setProperty("--fill", calm ? "1" : fill.toFixed(3));
      }
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(raf);
  }, [geo]);

  return (
    <svg
      ref={svg}
      className="pointer-events-none absolute left-0 top-0 z-[1]"
      width={geo.w}
      height={geo.h}
      viewBox={`0 0 ${geo.w || 1} ${geo.h || 1}`}
      aria-hidden="true"
    >
      <defs>
        <mask id="coffee-river-mask" maskUnits="userSpaceOnUse" x="0" y="0" width={geo.w} height={geo.h}>
          <path ref={reveal} d={geo.d} fill="none" stroke="#fff" strokeWidth="40" />
        </mask>
      </defs>
      <g mask="url(#coffee-river-mask)" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <path ref={line} d={geo.d} stroke={C.ink} strokeWidth="22" />
        <path d={geo.d} strokeWidth="16" style={{ stroke: "var(--coffee, #6b4325)", transition: "stroke .6s" }} />
        {/* glossy dashes that keep running downstream */}
        <path
          d={geo.d}
          strokeWidth="3.5"
          strokeDasharray="12 38"
          className="coffee-flow"
          style={{ stroke: "var(--coffee-hi, #b07a4c)", transition: "stroke .6s" }}
        />
      </g>
      {/* the drop at the front of the pour */}
      <g ref={tip} style={{ opacity: 0, transition: "opacity .3s" }}>
        <path d="M0 -14 C 9 -4 11 3 11 6 A 11 11 0 0 1 -11 6 C -11 3 -9 -4 0 -14 Z" stroke={C.ink} strokeWidth="3" style={{ fill: "var(--coffee, #6b4325)" }} />
        <circle cx="-4" cy="4" r="2.5" style={{ fill: "var(--coffee-hi, #b07a4c)" }} />
      </g>
    </svg>
  );
}
