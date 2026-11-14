import { getContent, ui, type Locale } from "@/content";

/** Two crossing "tape" bands, slightly rotated, like stickers slapped across the page */
export function Marquee({ locale }: { locale: Locale }) {
  const { marquee } = getContent(locale);
  const items = [...marquee, ...marquee];
  return (
    <div className="relative z-10 -my-6 overflow-hidden py-12" aria-label={ui[locale].services}>
      <div className="absolute inset-x-[-5%] top-1/2 h-14 -translate-y-1/2 rotate-[2.2deg] border-y-[2.5px] border-ink bg-ink md:h-16" aria-hidden="true">
        <ul className="flex h-full w-max animate-marquee items-center gap-8 whitespace-nowrap [animation-direction:reverse]">
          {items.map((t, i) => (
            <li key={i} className="flex items-center gap-8 font-mono text-sm font-bold uppercase tracking-widest text-paper/80">
              <span>{t}</span>
              <span className="text-pink">✿</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="relative -rotate-[1.6deg] border-y-[2.5px] border-ink bg-rose py-4 text-white shadow-[0_6px_0_var(--color-ink)]">
        <ul className="flex w-max animate-marquee items-center gap-10 whitespace-nowrap hover:[animation-play-state:paused]">
          {items.map((t, i) => (
            <li key={i} className="flex items-center gap-10 font-thai text-2xl font-semibold md:text-3xl" aria-hidden={i >= marquee.length}>
              <span>{t}</span>
              <span className="text-ink">✦</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
