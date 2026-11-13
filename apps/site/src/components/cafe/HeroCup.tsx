import { C } from "./palette";

/** Big flat cup with latte art, ink outlines like the rest of the studio's work */
export function HeroCup() {
  return (
    <svg viewBox="0 0 400 400" className="w-full" role="img" aria-label="ภาพวาดแก้วลาเต้ลายใบไม้">
      <circle cx="200" cy="200" r="185" fill={C.caramel} stroke={C.ink} strokeWidth="5" />
      <g fill="none" stroke={C.cream} strokeWidth="6" strokeLinecap="round" opacity=".9">
        <path d="M165 95c-12-18 12-28 0-48" />
        <path d="M200 88c-12-18 12-28 0-48" />
        <path d="M235 95c-12-18 12-28 0-48" />
      </g>
      <ellipse cx="200" cy="300" rx="150" ry="34" fill={C.cream2} stroke={C.ink} strokeWidth="5" />
      <path d="M90 175h220l-18 105a40 40 0 0 1-40 34H148a40 40 0 0 1-40-34z" fill={C.cream} stroke={C.ink} strokeWidth="5" strokeLinejoin="round" />
      <path d="M306 195h22a32 32 0 0 1 0 64h-34" fill="none" stroke={C.ink} strokeWidth="5" />
      <ellipse cx="200" cy="175" rx="110" ry="26" fill={C.bean} stroke={C.ink} strokeWidth="5" />
      {/* latte art leaf */}
      <path d="M150 176c25-22 75-22 100 0c-25 18-75 18-100 0z" fill={C.cream} />
      <path d="M158 176h86" stroke={C.bean} strokeWidth="3" />
      {[170, 188, 206, 224].map((x) => (
        <path key={x} d={`M${x} 166l8 10l-8 10`} fill="none" stroke={C.bean} strokeWidth="3" strokeLinejoin="round" />
      ))}
      <text x="200" y="262" textAnchor="middle" fontFamily="var(--font-chonburi)" fontSize="26" fill={C.ink}>
        บ้านกาแฟ
      </text>
    </svg>
  );
}
