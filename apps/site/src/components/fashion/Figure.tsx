import { useId } from "react";

/**
 * Flat fashion-illustration figures for the Sai Phrae demo: elongated croquis (about nine heads tall),
 * thin ink outline, garments filled with woven patterns. No photos needed, and every look reads at a glance.
 */
export type Cut = "gown" | "coat" | "slip" | "cape" | "suit" | "pleat";
export type Weave = "ikat" | "pinstripe" | "check" | "silk" | "pleats" | "plain";

export type Look = {
  no: string;
  cut: Cut;
  weave: Weave;
  /** cloth, pattern ink, lining */
  colors: [string, string, string];
  name: string;
  en: string;
  fabric: string;
};

const INK = "#0d0d0d";

export function Figure({ look, className = "", title }: { look: Look; className?: string; title?: string }) {
  const id = `w-${look.no}-${useId().replace(/:/g, "")}`;
  const [cloth, thread, lining] = look.colors;
  const fill = `url(#${id})`;
  return (
    <svg viewBox="0 0 200 600" className={className} role={title ? "img" : undefined} aria-label={title} aria-hidden={title ? undefined : true}>
      <defs>
        <Pattern id={id} weave={look.weave} cloth={cloth} thread={thread} />
      </defs>
      <g fill="none" stroke={INK} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        {/* head, neck, hair knot */}
        <ellipse cx="100" cy="40" rx="13" ry="17" fill="#e9d9c8" />
        <path d="M88 32 C 90 16, 112 14, 114 32 C 110 26, 94 26, 88 32 Z" fill={INK} />
        <circle cx="112" cy="18" r="6" fill={INK} />
        <path d="M100 57 L100 74" />
        <Body cut={look.cut} fill={fill} lining={lining} />
      </g>
    </svg>
  );
}

function Legs({ from = 380, gap = 12 }: { from?: number; gap?: number }) {
  return (
    <>
      <path d={`M${100 - gap} ${from} L${96 - gap} 560 L${86 - gap} 566`} fill="none" />
      <path d={`M${100 + gap} ${from} L${104 + gap} 560 L${114 + gap} 566`} fill="none" />
    </>
  );
}

function Arms({ to = 300, spread = 10 }: { to?: number; spread?: number }) {
  return (
    <>
      <path d={`M68 82 C ${60 - spread} 150, ${58 - spread} 220, ${62 - spread} ${to}`} fill="none" />
      <path d={`M132 82 C ${140 + spread} 150, ${142 + spread} 220, ${138 + spread} ${to}`} fill="none" />
    </>
  );
}

function Body({ cut, fill, lining }: { cut: Cut; fill: string; lining: string }) {
  switch (cut) {
    case "gown":
      return (
        <>
          <Arms />
          <path d="M70 78 L130 78 L134 196 C 150 300, 168 450, 178 572 L22 572 C 32 450, 50 300, 66 196 Z" fill={fill} />
          <path d="M66 196 C 90 206, 110 206, 134 196" />
          <path d="M100 206 C 104 330, 112 450, 122 572" opacity=".4" />
        </>
      );
    case "coat":
      return (
        <>
          <Legs from={392} />
          <path d="M62 76 L138 76 L150 396 L50 396 Z" fill={fill} />
          <path d="M100 76 L100 396 M100 76 L84 150 L100 176 M100 76 L116 150 L100 176" />
          <path d="M62 76 C 50 160, 46 250, 48 330 L60 330 L70 120" fill={lining} />
          <path d="M138 76 C 150 160, 154 250, 152 330 L140 330 L130 120" fill={lining} />
          <path d="M100 250 L106 250 M100 300 L106 300" />
        </>
      );
    case "slip":
      return (
        <>
          <Arms spread={4} />
          <Legs from={330} gap={10} />
          <path d="M78 84 C 90 78, 110 78, 122 84 L132 336 C 112 344, 88 344, 68 336 Z" fill={fill} />
          <path d="M80 84 L74 70 M120 84 L126 70" />
          <path d="M84 120 C 96 132, 104 132, 116 120" opacity=".5" />
        </>
      );
    case "cape":
      return (
        <>
          <Legs from={400} gap={9} />
          <path d="M100 66 C 140 70, 160 120, 186 412 C 130 424, 70 424, 14 412 C 40 120, 60 70, 100 66 Z" fill={fill} />
          <path d="M100 66 C 96 160, 94 300, 100 420" />
          <path d="M14 412 C 70 400, 130 400, 186 412" fill="none" />
          <path d="M80 72 C 90 90, 110 90, 120 72" fill={lining} />
        </>
      );
    case "suit":
      return (
        <>
          <Arms to={280} spread={6} />
          <path d="M70 290 L130 290 L136 566 L106 566 L100 340 L94 566 L64 566 Z" fill={fill} />
          <path d="M64 76 L136 76 L142 292 L58 292 Z" fill={fill} />
          <path d="M100 76 L100 292 M100 76 L82 160 L100 200 M100 76 L118 160 L100 200" />
          <path d="M88 76 L100 104 L112 76" fill={lining} />
        </>
      );
    case "pleat":
      return (
        <>
          <Arms spread={2} />
          <Legs from={470} gap={8} />
          <path d="M72 78 L128 78 L124 214 L76 214 Z" fill={lining} />
          <path d="M76 214 L124 214 L168 476 L32 476 Z" fill={fill} />
          {[-48, -32, -16, 0, 16, 32, 48].map((dx) => (
            <path key={dx} d={`M${100 + dx / 3} 216 L${100 + dx * 1.35} 474`} opacity=".45" />
          ))}
        </>
      );
  }
}

/** Woven fills: mudmee ikat diamonds, pinstripe, check, silk sheen, knife pleats */
export function Pattern({ id, weave, cloth, thread }: { id: string; weave: Weave; cloth: string; thread: string }) {
  switch (weave) {
    case "ikat":
      return (
        <pattern id={id} width="24" height="20" patternUnits="userSpaceOnUse">
          <rect width="24" height="20" fill={cloth} />
          <path d="M0 10 L6 4 L12 10 L6 16 Z M12 10 L18 4 L24 10 L18 16 Z" fill={thread} opacity=".85" />
          <path d="M6 7 L6 13 M18 7 L18 13" stroke={cloth} strokeWidth="1.2" />
        </pattern>
      );
    case "pinstripe":
      return (
        <pattern id={id} width="7" height="10" patternUnits="userSpaceOnUse">
          <rect width="7" height="10" fill={cloth} />
          <path d="M3.5 0 L3.5 10" stroke={thread} strokeWidth=".8" />
        </pattern>
      );
    case "check":
      return (
        <pattern id={id} width="18" height="18" patternUnits="userSpaceOnUse">
          <rect width="18" height="18" fill={cloth} />
          <path d="M0 9 L18 9 M9 0 L9 18" stroke={thread} strokeWidth="2.4" opacity=".55" />
          <path d="M0 9 L18 9 M9 0 L9 18" stroke={thread} strokeWidth=".6" />
        </pattern>
      );
    case "silk":
      return (
        <pattern id={id} width="200" height="600" patternUnits="userSpaceOnUse">
          <rect width="200" height="600" fill={cloth} />
          <path d="M40 0 C 70 200, 30 400, 60 600 L90 600 C 60 400, 100 200, 70 0 Z" fill={thread} opacity=".18" />
          <path d="M130 0 C 150 200, 120 400, 140 600 L150 600 C 130 400, 160 200, 140 0 Z" fill={thread} opacity=".14" />
        </pattern>
      );
    case "pleats":
      return (
        <pattern id={id} width="10" height="10" patternUnits="userSpaceOnUse">
          <rect width="10" height="10" fill={cloth} />
          <rect width="4" height="10" fill={thread} opacity=".22" />
        </pattern>
      );
    case "plain":
      return (
        <pattern id={id} width="10" height="10" patternUnits="userSpaceOnUse">
          <rect width="10" height="10" fill={cloth} />
        </pattern>
      );
  }
}
