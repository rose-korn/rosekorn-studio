/**
 * Small building blocks shared by every section of the Landing Basic template.
 * A "look" is the template's personality; sections ask these helpers how to draw a card, a heading or a tilt
 * instead of hard-coding one style, so the cafe, the shop and the salon can share all the section code.
 */
import type { Look, Theme } from "./types";

/** theme colours as CSS variables on the page root, so the demo's colour switcher can swap them live */
export function themeVars(t: Theme): React.CSSProperties {
  return {
    "--t-bg": t.bg,
    "--t-surface": t.surface,
    "--t-ink": t.ink,
    "--t-muted": t.muted,
    "--t-accent": t.accent,
    "--t-on-accent": t.onAccent,
    "--t-soft": t.soft,
  } as React.CSSProperties;
}

/** max-width wrapper used by every section */
export const wrap = "mx-auto max-w-6xl px-5 md:px-8";

/** pill button base; add colours where it is used */
export const btn =
  "inline-flex h-12 items-center justify-center whitespace-nowrap rounded-full border-2 border-[var(--t-ink)] px-6 font-semibold transition hover:-translate-y-0.5";

/** link inside running text */
export const textLink = "font-semibold underline decoration-[var(--t-accent)] decoration-2 underline-offset-4";

/**
 * cozy: stickers and prints, slightly tilted, stuck on with tape (cafe)
 * poster: straight blocks with heavy offset shadows, like a market poster (shop)
 * calm: thin lines, soft round corners, lots of air (salon, spa, clinic)
 */
const cards: Record<Look, string> = {
  cozy: "rounded-[22px] border-2 border-[var(--t-ink)] bg-[var(--t-surface)]",
  poster: "rounded-[14px] border-2 border-[var(--t-ink)] bg-[var(--t-surface)] shadow-[5px_5px_0_var(--t-ink)]",
  calm: "rounded-[28px] border border-[var(--t-ink)]/25 bg-[var(--t-surface)]",
};
export const card = (look: Look) => cards[look];

const tilts = ["-1.5deg", "1.2deg", "-0.6deg", "1.8deg", "-1deg", "0.8deg"];
/** only the cozy look tilts its cards */
export const tilt = (look: Look, i: number): React.CSSProperties | undefined => (look === "cozy" ? { rotate: tilts[i % tilts.length] } : undefined);

/** a loose hand-drawn underline */
function Swash() {
  return (
    <svg viewBox="0 0 120 12" aria-hidden="true" className="mt-1 h-3 w-28 text-[var(--t-accent)]" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
      <path d="M3 8 C24 3 46 10 70 6 C88 3 104 5 117 7" />
    </svg>
  );
}

/**
 * Section heading in the look's style.
 * cozy: hand-drawn underline. poster: a marker block behind the words. calm: centred, with a short line above.
 */
export function H2({ look, id, children, center }: { look: Look; id?: string; children: React.ReactNode; center?: boolean }) {
  const size = "tpl-display text-[clamp(1.8rem,4vw,2.6rem)] leading-tight";
  if (look === "poster")
    return (
      <h2 id={id} className={size}>
        <span className="box-decoration-clone bg-[var(--t-soft)] px-2 [-webkit-box-decoration-break:clone]">{children}</span>
      </h2>
    );
  if (look === "calm")
    return (
      <div className={center === false ? "" : "text-center"}>
        <span aria-hidden="true" className={`block h-0.5 w-10 bg-[var(--t-accent)] ${center === false ? "" : "mx-auto"}`} />
        <h2 id={id} className={`${size} mt-4`}>
          {children}
        </h2>
      </div>
    );
  return (
    <div>
      <h2 id={id} className={size}>
        {children}
      </h2>
      <Swash />
    </div>
  );
}

/** a strip of plain clear tape, as if the card were stuck to the page (cozy look only) */
export function Tape({ className = "", rotate = "-4deg" }: { className?: string; rotate?: string }) {
  return (
    <span
      aria-hidden="true"
      className={`absolute h-6 w-20 border border-[var(--t-ink)]/15 bg-white/55 ${className}`}
      style={{ rotate, clipPath: "polygon(0 8%, 4% 0, 96% 6%, 100% 0, 100% 92%, 96% 100%, 4% 94%, 0 100%)" }}
    />
  );
}

/** one drawn star with an ink outline (no font glyphs) */
export function StarShape({ filled }: { filled: boolean }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5 shrink-0" stroke="var(--t-ink)" strokeWidth="2" strokeLinejoin="round">
      <path d="M12 2.8 L14.8 8.7 L21.2 9.4 L16.4 13.8 L17.8 20.2 L12 17 L6.2 20.2 L7.6 13.8 L2.8 9.4 L9.2 8.7 Z" fill={filled ? "var(--t-accent)" : "var(--t-surface)"} />
    </svg>
  );
}

export function Stars({ n = 5 }: { n?: number }) {
  return (
    <span className="flex gap-0.5" role="img" aria-label={`${n} ดาว จาก 5`}>
      {Array.from({ length: 5 }, (_, i) => (
        <StarShape key={i} filled={i < n} />
      ))}
    </span>
  );
}

/** "tel:" link from a phone number written any way */
export const telHref = (phone: string) => `tel:${phone.replace(/[^0-9+]/g, "")}`;
