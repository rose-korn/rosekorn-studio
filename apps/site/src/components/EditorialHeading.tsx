import type { Locale } from "@/content";

type Props = {
  locale: Locale;
  index: number;
  en: string;
  title: React.ReactNode;
  lead?: React.ReactNode;
  tone?: "light" | "dark";
};

/**
 * Fashion-magazine section header for the sales sections (work, packages): a serif "Nº 01",
 * a hairline, letter-spaced mono eyebrow, then a big headline. Calmer than the sticker
 * SectionHeading so prices and projects read like a lookbook.
 */
export function EditorialHeading({ locale, index, en, title, lead, tone = "light" }: Props) {
  const muted = tone === "dark" ? "text-paper/60" : "text-muted";
  const rule = tone === "dark" ? "bg-paper/25" : "bg-ink/20";
  return (
    <div data-reveal>
      <div className={`flex items-center gap-4 font-mono text-[11px] uppercase tracking-[0.35em] ${muted}`}>
        <span className="font-serif text-2xl normal-case italic tracking-normal text-rose">Nº {String(index).padStart(2, "0")}</span>
        <span className={`h-px flex-1 ${rule}`} />
        <span>{en}</span>
      </div>
      <h2
        data-split
        className={`mt-10 max-w-5xl ${locale === "th" ? "font-thai" : ""} text-[clamp(2.4rem,6vw,5.6rem)] font-medium leading-[1.05] tracking-[-0.02em]`}
      >
        {title}
      </h2>
      {lead ? <p className={`mt-6 max-w-2xl text-lg ${muted}`}>{lead}</p> : null}
    </div>
  );
}
