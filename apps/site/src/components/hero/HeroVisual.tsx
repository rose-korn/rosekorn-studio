"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";

/**
 * Hero visual.
 * - Desktop/modern phones: Three.js rose (HeroScene), loaded only on the client, after first paint.
 * - Reduced motion or no WebGL: the CSS/SVG rose below, which also shows while the 3D chunk loads.
 * The wrapper reserves a square box so swapping never shifts layout.
 */
const HeroScene = dynamic(() => import("./HeroScene"), {
  ssr: false,
  loading: () => <FallbackPetals />,
});

function canUse3D() {
  if (typeof window === "undefined") return false;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return false;
  try {
    const c = document.createElement("canvas");
    return !!(c.getContext("webgl2") || c.getContext("webgl"));
  } catch {
    return false;
  }
}

export function HeroVisual() {
  const box = useRef<HTMLDivElement>(null);
  const [use3D, setUse3D] = useState(false);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    setUse3D(canUse3D());
    const el = box.current;
    if (!el || !("IntersectionObserver" in window)) return;
    // stop rendering when the hero is scrolled away (saves battery on phones)
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={box} className="relative aspect-square w-full" data-three-slot="hero">
      <div className="absolute inset-[10%] rounded-full bg-rose/25 blur-3xl" aria-hidden="true" />
      <Ring />
      {use3D ? <HeroScene active={visible} /> : <FallbackPetals />}
    </div>
  );
}

/** Rotating label ring, a common studio-site motif; sits behind the 3D canvas */
function Ring() {
  return (
    <svg viewBox="0 0 400 400" className="absolute inset-0 h-full w-full animate-spin-slow" aria-hidden="true">
      <defs>
        <path id="ring" d="M200,200 m-180,0 a180,180 0 1,1 360,0 a180,180 0 1,1 -360,0" />
      </defs>
      <text className="fill-ink/70" style={{ fontFamily: "var(--font-mono)", fontSize: 13, letterSpacing: 6 }}>
        <textPath href="#ring">ROSEKORN STUDIO · WEB DESIGN &amp; DEVELOPMENT · BANGKOK · EST. 2026 ·</textPath>
      </text>
    </svg>
  );
}

/** Flat SVG rose for reduced-motion users, no-WebGL devices, and while 3D loads */
export function FallbackPetals() {
  return (
    <svg viewBox="0 0 400 400" className="absolute inset-0 h-full w-full animate-float" aria-hidden="true">
      <defs>
        <radialGradient id="petal" cx="35%" cy="30%" r="80%">
          <stop offset="0%" stopColor="#ffd6dc" />
          <stop offset="55%" stopColor="var(--color-rose)" />
          <stop offset="100%" stopColor="var(--color-rose-deep)" />
        </radialGradient>
        <radialGradient id="petal2" cx="60%" cy="20%" r="90%">
          <stop offset="0%" stopColor="#f6c2a0" />
          <stop offset="100%" stopColor="var(--color-rose)" />
        </radialGradient>
      </defs>
      <g transform="translate(200 200)">
        {Array.from({ length: 8 }).map((_, i) => (
          <path
            key={i}
            d="M0 0 C 40 -40, 40 -110, 0 -130 C -40 -110, -40 -40, 0 0Z"
            fill={i % 2 ? "url(#petal2)" : "url(#petal)"}
            opacity={0.55 + (i % 3) * 0.12}
            transform={`rotate(${i * 45}) scale(${i % 2 ? 0.82 : 1})`}
            style={{ mixBlendMode: "multiply" }}
          />
        ))}
        <circle r="26" fill="var(--color-ink)" />
        <circle r="8" fill="var(--color-gold)" />
      </g>
    </svg>
  );
}
