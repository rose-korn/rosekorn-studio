/**
 * A torn-paper edge between two sections (collage look): a jagged strip in the colour of the
 * neighbouring section, with a pale paper-fibre rim peeking out along the tear.
 * Put it inside a `relative` section; side="top" hangs down from the top, "bottom" rises from the bottom.
 * It has no z-index so the page's coffee river (z-1) still flows over it.
 */
function tear(seed: number, base: number, amp: number) {
  let s = seed;
  const rnd = () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
  const pts: string[] = [];
  for (let x = 0; x <= 1200; x += 18 + rnd() * 26) pts.push(`${x.toFixed(0)},${(base + (rnd() - 0.5) * amp).toFixed(1)}`);
  pts.push(`1200,${base}`);
  return pts.join(" L");
}

export function TornEdge({ fill, side, seed = 7, rim = "#fbf6ea" }: { fill: string; side: "top" | "bottom"; seed?: number; rim?: string }) {
  const top = side === "top";
  // the fill's jagged line, and the paper rim just past it
  const f = top ? `M0,0 L1200,0 L${tear(seed, 22, 18).split(" L").reverse().join(" L")} Z` : `M0,40 L${tear(seed, 18, 18)} L1200,40 Z`;
  const r = top ? `M0,0 L1200,0 L${tear(seed + 3, 28, 16).split(" L").reverse().join(" L")} Z` : `M0,40 L${tear(seed + 3, 12, 16)} L1200,40 Z`;
  return (
    <svg
      viewBox="0 0 1200 40"
      preserveAspectRatio="none"
      className={`pointer-events-none absolute inset-x-0 h-6 w-full md:h-9 ${top ? "top-0" : "bottom-0"}`}
      aria-hidden="true"
    >
      <path d={r} fill={rim} opacity=".9" />
      <path d={f} fill={fill} />
    </svg>
  );
}
