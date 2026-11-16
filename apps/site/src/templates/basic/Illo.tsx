/**
 * Drawn placeholders for photo slots in the template demo. A real client swaps these for their own photos.
 * Colours come from the template's CSS variables, so they follow the colour switcher.
 */
export type IlloKind =
  | "storefront"
  | "latte"
  | "croissant"
  | "cake"
  | "plant"
  | "beans"
  | "toast"
  | "window"
  | "pourover"
  // shop template
  | "shelf"
  | "soap"
  | "candle"
  | "mug"
  | "tote"
  | "bottle"
  | "giftbox";

const ink = "var(--t-ink)";
const acc = "var(--t-accent)";
const soft = "var(--t-soft)";
const paper = "var(--t-surface)";

function Art({ kind }: { kind: IlloKind }) {
  switch (kind) {
    case "latte":
      return (
        <>
          <path d="M22 92 C30 104 90 104 98 92" fill={soft} />
          <path d="M30 46 C29 70 34 86 44 90 C54 94 66 94 76 90 C86 86 91 70 90 46 Z" fill={paper} />
          <path d="M90 54 C104 52 106 72 88 76" fill="none" />
          <ellipse cx="60" cy="46" rx="30" ry="8" fill={acc} />
          <path d="M60 41 C54 44 54 49 60 52 C66 49 66 44 60 41 Z M60 52 L60 46" fill={paper} strokeWidth="2" />
          <path d="M48 24 C44 30 52 32 48 38 M62 20 C58 27 66 29 62 36 M74 24 C70 30 78 32 74 38" fill="none" strokeWidth="2.4" />
        </>
      );
    case "croissant":
      return (
        <>
          <path d="M14 78 C20 50 46 34 60 34 C74 34 100 50 106 78 C96 84 88 80 84 74 C78 86 70 90 60 90 C50 90 42 86 36 74 C32 80 24 84 14 78 Z" fill={acc} />
          <path d="M36 74 C40 60 46 50 52 44 M84 74 C80 60 74 50 68 44 M60 90 C58 72 58 52 60 36" fill="none" strokeWidth="2.4" />
          <path d="M20 98 C44 104 76 104 100 98" fill="none" strokeWidth="2.4" />
        </>
      );
    case "cake":
      return (
        <>
          <path d="M24 60 L96 48 L96 92 L24 98 Z" fill={paper} />
          <path d="M24 60 L60 30 L96 48 Z" fill={soft} />
          <path d="M24 76 L96 68" fill="none" stroke={acc} strokeWidth="6" />
          <path d="M60 30 C58 22 64 18 66 24" fill="none" />
          <circle cx="66" cy="26" r="6" fill={acc} />
          <path d="M16 102 C46 106 78 104 104 98" fill="none" strokeWidth="2.4" />
        </>
      );
    case "plant":
      return (
        <>
          <path d="M40 72 L80 72 L74 104 L46 104 Z" fill={acc} />
          <path d="M60 72 C60 56 60 44 60 30" fill="none" />
          <path d="M60 56 C46 56 34 46 32 32 C46 32 58 42 60 56 Z" fill={soft} />
          <path d="M60 46 C72 46 84 36 86 22 C72 22 62 32 60 46 Z" fill={soft} />
          <path d="M60 64 C70 64 80 58 84 48 C72 48 64 54 60 64 Z" fill={soft} />
        </>
      );
    case "beans":
      return (
        <>
          <path d="M34 30 L86 30 L92 102 L28 102 Z" fill={paper} />
          <path d="M34 30 L40 20 L80 20 L86 30" fill={soft} />
          <rect x="42" y="52" width="36" height="26" rx="4" fill={acc} />
          {[
            [18, 104],
            [100, 100],
            [106, 86],
          ].map(([x, y]) => (
            <g key={`${x}-${y}`} transform={`translate(${x} ${y}) rotate(-20)`}>
              <ellipse rx="7" ry="5" fill={acc} />
              <path d="M-5 0 C-1 -2 1 2 5 0" fill="none" strokeWidth="1.6" />
            </g>
          ))}
        </>
      );
    case "toast":
      return (
        <>
          <path d="M28 46 C22 30 40 22 60 24 C80 22 98 30 92 46 L88 96 L32 96 Z" fill={soft} />
          <path d="M38 50 C36 40 46 36 60 36 C74 36 84 40 82 50 L80 86 L40 86 Z" fill={paper} strokeWidth="2.4" />
          <path d="M50 58 C56 54 66 62 72 58 M48 70 C56 66 64 74 74 70" fill="none" stroke={acc} strokeWidth="4" />
        </>
      );
    case "window":
      return (
        <>
          <path d="M26 104 L26 40 C26 24 42 16 60 16 C78 16 94 24 94 40 L94 104 Z" fill={soft} />
          <path d="M60 18 L60 104 M26 62 L94 62" fill="none" strokeWidth="2.4" />
          <path d="M36 98 C36 84 40 76 46 74 C52 76 54 86 52 98 Z" fill={acc} strokeWidth="2.4" />
          <path d="M18 104 L102 104" fill="none" />
        </>
      );
    case "pourover":
      return (
        <>
          <path d="M30 34 L90 34 L70 62 L50 62 Z" fill={paper} />
          <path d="M42 66 L78 66 C80 82 78 96 72 102 L48 102 C42 96 40 82 42 66 Z" fill={soft} />
          <path d="M44 90 C52 86 68 94 76 88" fill="none" stroke={acc} strokeWidth="5" />
          <path d="M60 62 L60 74" fill="none" stroke={acc} strokeWidth="3" />
          <path d="M36 34 C36 26 84 26 84 34" fill="none" />
        </>
      );
    case "shelf":
      return (
        <>
          <path d="M18 18 L102 18 L102 106 L18 106 Z" fill={paper} />
          <path d="M18 48 L102 48 M18 78 L102 78" fill="none" />
          {/* top shelf: jars */}
          <path d="M28 30 L40 30 L40 46 L28 46 Z" fill={acc} strokeWidth="2.4" />
          <path d="M46 26 L58 26 L58 46 L46 46 Z" fill={soft} strokeWidth="2.4" />
          <path d="M66 34 C66 28 80 28 80 34 L80 46 L66 46 Z" fill={acc} strokeWidth="2.4" />
          <circle cx="92" cy="40" r="6" fill={soft} strokeWidth="2.4" />
          {/* middle shelf: soap bars and a bag */}
          <rect x="26" y="66" width="18" height="10" rx="3" fill={soft} strokeWidth="2.4" />
          <rect x="30" y="58" width="14" height="8" rx="3" fill={acc} strokeWidth="2.4" />
          <path d="M56 58 L76 58 L78 76 L54 76 Z" fill={acc} strokeWidth="2.4" />
          <path d="M60 58 C60 50 72 50 72 58" fill="none" strokeWidth="2.4" />
          <path d="M86 56 L94 56 L94 76 L86 76 Z" fill={paper} strokeWidth="2.4" />
          {/* bottom shelf: a basket */}
          <path d="M30 90 L66 90 L62 104 L34 104 Z" fill={soft} strokeWidth="2.4" />
          <path d="M36 96 L60 96" fill="none" strokeWidth="2" />
          <path d="M76 88 L92 88 L92 104 L76 104 Z" fill={acc} strokeWidth="2.4" />
        </>
      );
    case "soap":
      return (
        <>
          <path d="M18 76 L60 92 L102 76 L102 90 L60 106 L18 90 Z" fill={soft} />
          <path d="M18 76 L60 60 L102 76 L60 92 Z" fill={paper} />
          <path d="M28 60 L60 48 L92 60 L92 70 L60 82 L28 70 Z" fill={acc} />
          <path d="M28 60 L60 72 L92 60" fill="none" strokeWidth="2.4" />
          <path d="M52 62 C56 58 64 58 68 62" fill="none" strokeWidth="2.4" />
          <circle cx="40" cy="30" r="7" fill={paper} strokeWidth="2.4" />
          <circle cx="56" cy="22" r="4" fill={paper} strokeWidth="2.4" />
          <circle cx="78" cy="32" r="5" fill={paper} strokeWidth="2.4" />
        </>
      );
    case "candle":
      return (
        <>
          <path d="M34 50 L86 50 L84 104 L36 104 Z" fill={paper} />
          <ellipse cx="60" cy="50" rx="26" ry="7" fill={soft} />
          <rect x="44" y="70" width="32" height="18" rx="3" fill={acc} strokeWidth="2.4" />
          <path d="M60 50 L60 38" fill="none" strokeWidth="2.4" />
          <path d="M60 18 C52 28 54 36 60 38 C66 36 68 28 60 18 Z" fill={acc} strokeWidth="2.4" />
          <path d="M24 104 L96 104" fill="none" />
        </>
      );
    case "mug":
      return (
        <>
          <path d="M28 40 L80 40 L78 96 C78 102 30 102 30 96 Z" fill={acc} />
          <path d="M80 52 C98 50 100 80 78 82" fill="none" strokeWidth="5" />
          <ellipse cx="54" cy="40" rx="26" ry="6" fill={paper} />
          <path d="M30 62 C40 58 48 66 56 62 C64 58 72 66 79 62" fill="none" stroke={paper} strokeWidth="4" />
          <path d="M16 104 L100 104" fill="none" />
          <path d="M44 24 C40 30 48 30 44 36 M60 20 C56 26 64 26 60 32" fill="none" strokeWidth="2.4" />
        </>
      );
    case "tote":
      return (
        <>
          <path d="M44 44 C44 20 76 20 76 44" fill="none" strokeWidth="4" />
          <path d="M26 44 L94 44 L90 106 L30 106 Z" fill={paper} />
          <path d="M44 66 C44 58 52 56 60 64 C68 56 76 58 76 66 C76 76 60 86 60 86 C60 86 44 76 44 66 Z" fill={acc} strokeWidth="2.4" />
          <path d="M26 54 L94 54" fill="none" strokeWidth="2" strokeDasharray="3 5" />
        </>
      );
    case "bottle":
      return (
        <>
          <path d="M52 16 L68 16 L68 30 L52 30 Z" fill={acc} />
          <path d="M54 30 L66 30 L66 38 C80 42 84 52 84 62 L84 100 C84 104 36 104 36 100 L36 62 C36 52 40 42 54 38 Z" fill={soft} />
          <rect x="44" y="60" width="32" height="26" rx="4" fill={paper} strokeWidth="2.4" />
          <path d="M60 66 C54 72 56 80 60 80 C64 80 66 72 60 66 Z" fill={acc} strokeWidth="2" />
          <path d="M20 104 L100 104" fill="none" />
        </>
      );
    case "giftbox":
      return (
        <>
          <path d="M24 54 L96 54 L96 104 L24 104 Z" fill={paper} />
          <path d="M18 40 L102 40 L102 56 L18 56 Z" fill={soft} />
          <path d="M54 40 L66 40 L66 104 L54 104 Z" fill={acc} strokeWidth="2.4" />
          <path d="M60 40 C46 22 30 28 38 38 C42 42 52 42 60 40 Z" fill={acc} strokeWidth="2.4" />
          <path d="M60 40 C74 22 90 28 82 38 C78 42 68 42 60 40 Z" fill={acc} strokeWidth="2.4" />
        </>
      );
    case "storefront":
    default:
      return (
        <>
          <path d="M14 108 L106 108" fill="none" />
          <path d="M20 46 L100 46 L100 106 L20 106 Z" fill={paper} />
          {/* striped awning */}
          <path d="M14 46 L24 24 L96 24 L106 46 Z" fill={acc} />
          {[0, 1, 2, 3, 4].map((i) => (
            <path key={i} d={`M${14 + i * 18.4} 46 C${18 + i * 18.4} 56 ${28 + i * 18.4} 56 ${32.4 + i * 18.4} 46`} fill={i % 2 ? soft : acc} />
          ))}
          <path d="M30 64 L58 64 L58 90 L30 90 Z" fill={soft} strokeWidth="2.4" />
          <path d="M44 64 L44 90" fill="none" strokeWidth="2" />
          <path d="M70 62 L90 62 L90 106 L70 106 Z" fill={soft} strokeWidth="2.4" />
          <circle cx="74" cy="86" r="1.8" fill={ink} stroke="none" />
          <path d="M24 98 C24 92 30 90 32 96 C34 90 40 92 38 98" fill={acc} strokeWidth="2" />
        </>
      );
  }
}

/** A drawn illustration on a flat tile, standing in for a photo */
export function Illo({ kind, className = "" }: { kind: IlloKind; className?: string }) {
  return (
    <svg
      viewBox="0 0 120 120"
      aria-hidden="true"
      className={className}
      stroke={ink}
      strokeWidth={3}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <Art kind={kind} />
    </svg>
  );
}
