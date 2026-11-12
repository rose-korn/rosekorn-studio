/**
 * Hero visual slot.
 *
 * Today: a lightweight CSS/SVG "rose" composition (no JS, zero cost on mobile).
 * Later (Three.js): create `HeroScene.tsx` as a client component using
 * @react-three/fiber, then render it here with
 *   const HeroScene = dynamic(() => import("./HeroScene"), { ssr: false, loading: () => <HeroFallback /> })
 * and keep <HeroFallback /> for reduced-motion users and slow devices.
 * The wrapper below already reserves the exact box, so swapping causes no layout shift.
 */
export function HeroVisual() {
  return (
    <div className="relative aspect-square w-full" data-three-slot="hero">
      <HeroFallback />
    </div>
  );
}

export function HeroFallback() {
  return (
    <div className="absolute inset-0" aria-hidden="true">
      {/* soft glow */}
      <div className="absolute inset-[8%] rounded-full bg-rose/25 blur-3xl" />
      {/* rotating ring with label, a common studio-site motif */}
      <svg viewBox="0 0 400 400" className="absolute inset-0 h-full w-full animate-spin-slow">
        <defs>
          <path id="ring" d="M200,200 m-170,0 a170,170 0 1,1 340,0 a170,170 0 1,1 -340,0" />
        </defs>
        <text className="fill-ink/70" style={{ fontFamily: "var(--font-mono)", fontSize: 13, letterSpacing: 6 }}>
          <textPath href="#ring">
            ROSEKORN STUDIO · WEB DESIGN &amp; DEVELOPMENT · BANGKOK · EST. 2026 ·
          </textPath>
        </text>
      </svg>
      {/* petals */}
      <svg viewBox="0 0 400 400" className="absolute inset-0 h-full w-full animate-float">
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
    </div>
  );
}
