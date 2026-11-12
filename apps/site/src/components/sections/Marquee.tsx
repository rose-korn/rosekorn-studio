import { marquee } from "@/content/site";

export function Marquee() {
  const items = [...marquee, ...marquee];
  return (
    <div className="overflow-hidden border-y border-ink bg-ink py-5 text-paper" aria-label="บริการของเรา">
      <ul className="flex w-max animate-marquee items-center gap-10 whitespace-nowrap hover:[animation-play-state:paused]">
        {items.map((t, i) => (
          <li key={i} className="flex items-center gap-10 font-thai text-2xl md:text-3xl" aria-hidden={i >= marquee.length}>
            <span>{t}</span>
            <span className="text-rose">✦</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
