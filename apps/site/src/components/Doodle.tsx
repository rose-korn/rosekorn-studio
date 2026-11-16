/**
 * Hand-drawn marks used instead of typed glyphs (✓ ✕ ✦ ★ ✿), which read as generic and "AI-made".
 * Each mark has a few slightly different strokes, picked by `n` (usually the list index), so a list
 * of ticks looks drawn one by one rather than stamped from a font.
 */
type Kind = "check" | "cross" | "spark" | "star" | "flower" | "dash";

const PATHS: Record<Kind, string[][]> = {
  // a loose tick: short down-stroke, long flick up, with a little overshoot
  // pen lands, dips into a small hook at the bottom, then flicks up past the line
  check: [
    ["M2.8 12.6 C4.6 12.8 6.4 15.4 7.8 18.6 C8.3 19.7 9.2 19.8 9.7 18.6 C11.6 13.2 15.4 7.6 21.6 3.4"],
    ["M3.2 11.4 C5.2 12.4 6.6 15 7.6 17.8 C8 19 8.8 19.4 9.4 18.2 C11.8 12.4 16 7.8 21 5.2"],
    ["M2.6 13.4 C4.8 13.6 6.8 16.4 8.2 19.4 C8.8 20.4 9.6 20 10 19 C11.8 14 14.8 8.6 20.8 3.6"],
  ],
  // two strokes that do not quite meet in the middle
  cross: [
    ["M5 5.4 C9 9.6 13.6 14.6 19 19.2", "M18.4 4.6 C14.8 8.4 9.4 14 5.6 19.6"],
    ["M4.6 6 C9.4 10 14 14.4 18.6 18.4", "M19.2 5.2 C15 9.2 10 13.8 5 18.8"],
    ["M5.4 4.8 C9.6 9.2 13.4 13.6 19.4 18.6", "M17.8 5 C14 9 9.6 13.6 6 19.4"],
  ],
  // four-point sparkle with uneven arms
  spark: [
    ["M12 2.6 C12.6 8 13.6 10.6 21 12.2 C14 13.4 12.8 15.6 11.6 21.6 C11 15.4 9.6 13.6 3 12 C9.4 10.8 11 8.6 12 2.6Z"],
    ["M12.4 3 C12.8 8.6 14.4 10.8 20.6 11.6 C14.4 13 12.6 15 12 21.2 C11.2 15.2 9.8 13.2 3.4 12.6 C9.6 11 11.4 9 12.4 3Z"],
  ],
  star: [["M12 2.8 L14.4 9 L21 9.4 L15.8 13.6 L17.6 20.4 L12 16.6 L6.2 20.6 L8.2 13.8 L3 9.6 L9.6 9.2 Z"]],
  // five loops around a centre, drawn as one wobbly line
  flower: [
    [
      "M12 9.6 C9.6 4.4 14.6 2.6 14.4 8.4 C18.6 4.6 21.6 9.2 15.6 11 C20.6 13.6 17 18.2 13.6 14 C13.4 19.8 8 19.2 10.2 13.8 C5 16.4 3.6 11 9.2 10.6 C4.4 7.4 8.4 3.6 12 9.6Z",
    ],
  ],
  dash: [["M4 12.6 C8 11.4 13 12.8 20 11.6"], ["M4.4 11.8 C9 12.8 14.4 11 19.6 12.2"]],
};

const FILLED: Partial<Record<Kind, boolean>> = { spark: true, star: true, flower: true };

export function Doodle({
  kind,
  n = 0,
  className = "h-[1.1em] w-[1.1em]",
  strokeWidth = 2.8,
}: {
  kind: Kind;
  n?: number;
  className?: string;
  strokeWidth?: number;
}) {
  const variants = PATHS[kind];
  const paths = variants[n % variants.length];
  const filled = FILLED[kind];
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={`inline-block shrink-0 ${className}`}
      style={{ rotate: `${[-4, 3, -1, 5][n % 4]}deg`, verticalAlign: "-0.18em" }}
      fill={filled ? "currentColor" : "none"}
      stroke={filled ? "var(--color-ink)" : "currentColor"}
      strokeWidth={filled ? 1.6 : strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {paths.map((d) => (
        <path key={d} d={d} />
      ))}
      {/* a second, thinner pass a hair off the first, like a marker going over its own line */}
      {filled
        ? null
        : paths.map((d) => (
            <path key={`${d}-2`} d={d} transform="translate(0.7 0.5)" strokeWidth={strokeWidth * 0.5} opacity={0.55} />
          ))}
      {kind === "flower" ? <circle cx="12" cy="11.8" r="1.8" fill="var(--color-ink)" stroke="none" /> : null}
    </svg>
  );
}

/** A tick or cross drawn on a tiny wobbly sticker (ink outline, hard shadow), for lists */
export function MarkSticker({ kind, n = 0, tone = "pink" }: { kind: "check" | "cross" | "dash"; n?: number; tone?: "pink" | "sky" | "paper" }) {
  const bg = { pink: "bg-pink", sky: "bg-sky", paper: "bg-paper" }[tone];
  const radius = ["48% 52% 45% 55% / 55% 45% 52% 48%", "55% 45% 50% 50% / 45% 55% 48% 52%", "50% 50% 56% 44% / 50% 46% 54% 50%"][n % 3];
  return (
    <span
      aria-hidden="true"
      className={`mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center border-2 border-ink text-ink shadow-[2px_2px_0_var(--color-ink)] ${bg}`}
      style={{ borderRadius: radius, rotate: `${[-6, 4, -2, 7][n % 4]}deg` }}
    >
      <Doodle kind={kind} n={n} className="h-4 w-4" strokeWidth={3} />
    </span>
  );
}
