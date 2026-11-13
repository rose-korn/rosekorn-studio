/**
 * Chalk-style drawings for every item on the Baan Kafae menu board.
 * Cream "chalk" outlines over soft pastel fills; the board applies an SVG roughen filter (#chalk).
 */
export type Art =
  | "espresso"
  | "americano"
  | "latte"
  | "orange"
  | "rose"
  | "thaitea"
  | "matcha"
  | "cocoa"
  | "croissant"
  | "banana"
  | "pandan";

const CHALK = "#f3ecdc";
const line = { stroke: CHALK, strokeWidth: 2.4, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };

/* tall iced glass: x of the walls at height y, so liquid layers can follow the taper */
const GL = { top: 12, bottom: 56, l0: 17, r0: 47, taper: 4 };
const gx = (y: number, side: -1 | 1) => {
  const t = (y - GL.top) / (GL.bottom - GL.top);
  return side < 0 ? GL.l0 + GL.taper * t : GL.r0 - GL.taper * t;
};
function layer(y0: number, y1: number) {
  return `M${gx(y0, -1)} ${y0} H${gx(y0, 1)} L${gx(y1, 1)} ${y1} H${gx(y1, -1)} Z`;
}

function IcedGlass({ layers, straw, garnish }: { layers: [string, number, number][]; straw?: string; garnish?: React.ReactNode }) {
  return (
    <>
      {layers.map(([c, a, b], i) => (
        <path key={i} d={layer(a, b)} fill={c} opacity=".92" />
      ))}
      {/* ice */}
      <rect x="23" y="24" width="8" height="8" rx="1.5" fill="#fff" opacity=".45" transform="rotate(-12 27 28)" />
      <rect x="33" y="28" width="7" height="7" rx="1.5" fill="#fff" opacity=".4" transform="rotate(14 36 31)" />
      <path d={`M${GL.l0} ${GL.top} H${GL.r0} L${GL.r0 - GL.taper} ${GL.bottom} H${GL.l0 + GL.taper} Z`} fill="none" {...line} />
      {straw ? <path d="M36 4 L31 40" stroke={straw} strokeWidth="3.4" strokeLinecap="round" /> : null}
      {garnish}
    </>
  );
}

function HotCup({ top, art, small }: { top: string; art?: React.ReactNode; small?: boolean }) {
  const s = small ? 0.78 : 1;
  return (
    <g transform={`translate(${32 - 32 * s} ${small ? 12 : 0}) scale(${s})`}>
      <ellipse cx="32" cy="55" rx="24" ry="4.5" fill="#cbb89a" opacity=".55" {...line} />
      <path d="M12 26 H52 L48 47 Q46 54 39 54 H25 Q18 54 16 47 Z" fill="#efe3cc" opacity=".95" {...line} />
      <path d="M51 31 h3 a6 6 0 0 1 0 12 h-5" fill="none" {...line} />
      <ellipse cx="32" cy="26" rx="20" ry="4.6" fill={top} {...line} />
      {art}
      <path d="M26 18 c-3 -3 3 -5 0 -9 M34 18 c-3 -3 3 -5 0 -9" fill="none" {...line} strokeWidth="2" opacity=".8" />
    </g>
  );
}

export function MenuArt({ art }: { art: Art }) {
  let body: React.ReactNode;
  switch (art) {
    case "espresso":
      body = <HotCup small top="#5a3420" art={<ellipse cx="32" cy="26" rx="12" ry="2.4" fill="#c9915c" opacity=".8" />} />;
      break;
    case "latte":
      body = (
        <HotCup
          top="#b98a5e"
          art={<path d="M32 29 c-6 -4 -5 -8 0 -6 c5 -2 6 2 0 6z" fill="#f6ead6" />}
        />
      );
      break;
    case "rose":
      body = (
        <HotCup
          top="#c98a86"
          art={
            <path d="M32 26 m-1.5 0 a1.5 1.5 0 1 1 3 0 a3.5 3.5 0 1 1 -6.5 .6 a6 6 0 1 1 11 -2" fill="none" stroke="#fbe3e6" strokeWidth="1.6" />
          }
        />
      );
      break;
    case "cocoa":
      body = (
        <>
          <path d="M18 22 H44 V51 Q44 56 39 56 H23 Q18 56 18 51 Z" fill="#8a5a3c" opacity=".9" {...line} />
          <path d="M44 28 h3 a6 6 0 0 1 0 12 h-3" fill="none" {...line} />
          <ellipse cx="31" cy="22" rx="13" ry="3.4" fill="#5b3523" {...line} />
          <circle cx="27" cy="21" r="2.6" fill="#fff" opacity=".8" />
          <circle cx="33" cy="20" r="2.2" fill="#f7c9d3" opacity=".9" />
          <path d="M26 14 c-3 -3 3 -5 0 -9 M34 14 c-3 -3 3 -5 0 -9" fill="none" {...line} strokeWidth="2" opacity=".8" />
        </>
      );
      break;
    case "americano":
      body = <IcedGlass layers={[["#4a2b1a", 20, 56]]} straw="#e0475e" />;
      break;
    case "orange":
      body = (
        <IcedGlass
          layers={[
            ["#f0a33c", 34, 56],
            ["#4a2b1a", 20, 34],
          ]}
          straw="#f3ecdc"
          garnish={<circle cx="46" cy="14" r="6" fill="#f0a33c" {...line} strokeWidth="2" />}
        />
      );
      break;
    case "thaitea":
      body = (
        <IcedGlass
          layers={[
            ["#e8873a", 30, 56],
            ["#f6e1c6", 20, 30],
          ]}
          straw="#5bcefa"
        />
      );
      break;
    case "matcha":
      body = (
        <IcedGlass
          layers={[
            ["#f3ecdc", 36, 56],
            ["#8fb45a", 20, 36],
          ]}
          straw="#f3ecdc"
        />
      );
      break;
    case "croissant":
      body = (
        <>
          <path d="M6 40 C10 22 54 22 58 40 C50 48 14 48 6 40 Z" fill="#d9a35b" opacity=".95" {...line} />
          <path d="M20 30 L24 44 M32 27 V45 M44 30 L40 44" fill="none" {...line} />
        </>
      );
      break;
    case "banana":
      body = (
        <>
          <path d="M10 46 L32 20 L54 46 Z" fill="#e8c27a" opacity=".95" {...line} />
          <path d="M10 46 H54 V52 H10 Z" fill="#a8743f" {...line} />
          <circle cx="30" cy="36" r="2" fill="#5a3420" />
          <circle cx="38" cy="40" r="2" fill="#5a3420" />
          <circle cx="24" cy="42" r="1.8" fill="#5a3420" />
        </>
      );
      break;
    case "pandan":
      body = (
        <>
          <path d="M10 30 Q10 16 32 16 Q54 16 54 30 V50 H10 Z" fill="#e7c48a" opacity=".95" {...line} />
          <path d="M16 30 H48 V44 H16 Z" fill="#8fc46a" opacity=".95" {...line} />
          <path d="M22 37 h20" fill="none" {...line} strokeWidth="1.6" opacity=".7" />
        </>
      );
      break;
  }
  return (
    <svg viewBox="0 0 64 64" className="h-full w-full overflow-visible" style={{ filter: "url(#chalk)" }} aria-hidden="true">
      {body}
    </svg>
  );
}
