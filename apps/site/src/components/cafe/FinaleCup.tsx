import { C } from "./palette";

/**
 * The cup at the end of the page. CoffeeRiver pours into its mouth ([data-river-end])
 * and fills it through the --fill variable (0..1) on [data-river-cup].
 */
export function FinaleCup() {
  return (
    <div data-river-cup className="relative mx-auto w-[min(300px,80vw)]" style={{ ["--fill" as string]: 0 }}>
      <span data-river-end className="absolute left-1/2 top-[22%] h-2 w-2 -translate-x-1/2" aria-hidden="true" />
      <svg viewBox="0 0 300 250" className="w-full overflow-visible" role="img" aria-label="แก้วกาแฟที่ค่อย ๆ เต็มเมื่อเลื่อนลงมา">
        <defs>
          <clipPath id="finale-cup-inside">
            <path d="M52 58 H248 L222 196 Q218 214 198 214 H102 Q82 214 78 196 Z" />
          </clipPath>
        </defs>
        <ellipse cx="150" cy="226" rx="138" ry="20" fill={C.cream2} stroke={C.ink} strokeWidth="4" />
        <path d="M246 92 h18 a30 30 0 0 1 0 60 h-28" fill="none" stroke={C.ink} strokeWidth="5" />
        <path d="M44 52 H256 L228 198 Q223 222 198 222 H102 Q77 222 72 198 Z" fill={C.cream} stroke={C.ink} strokeWidth="5" strokeLinejoin="round" />
        <g clipPath="url(#finale-cup-inside)">
          <rect
            x="40"
            y="58"
            width="220"
            height="160"
            style={{
              fill: "var(--coffee, #6b4325)",
              transformBox: "fill-box",
              transformOrigin: "bottom",
              transform: "scaleY(var(--fill))",
              transition: "fill .6s",
            }}
          />
        </g>
        <rect x="70" y="150" width="160" height="18" fill={C.caramel} opacity=".9" />
        <text x="150" y="190" textAnchor="middle" fontFamily="var(--font-chonburi)" fontSize="20" fill={C.ink}>
          บ้านกาแฟ
        </text>
      </svg>
      {/* steam once the cup is full */}
      <svg viewBox="0 0 120 70" className="finale-steam pointer-events-none absolute left-1/2 top-[-18%] w-[40%] -translate-x-1/2" aria-hidden="true">
        {[20, 60, 100].map((x, i) => (
          <g key={x} className="coffee-steam" style={{ animationDelay: `${i * 0.5}s` }}>
            <path d={`M${x} 66 c-10 -10 10 -18 0 -28 c-10 -10 10 -18 0 -28`} fill="none" stroke={C.ink} strokeWidth="7" strokeLinecap="round" />
            <path d={`M${x} 66 c-10 -10 10 -18 0 -28 c-10 -10 10 -18 0 -28`} fill="none" stroke={C.cream} strokeWidth="3.5" strokeLinecap="round" />
          </g>
        ))}
      </svg>
      <span
        data-stamp
        className="stamp finale-stamp absolute -right-6 top-0 rotate-12 font-mono text-xs"
        style={{ background: C.caramel, color: C.ink, borderColor: C.ink }}
      >
        เต็มแก้ว!
      </span>
    </div>
  );
}
