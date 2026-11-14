import { sectionIndex, type Locale } from "@/content";

type Props = {
  locale: Locale;
  index: number;
  en: string;
  title: React.ReactNode;
  lead?: React.ReactNode;
  tone?: "light" | "dark";
};

/** Editorial section header: Thai-numeral index + English eyebrow + Thai headline */
export function SectionHeading({ locale, index, en, title, lead, tone = "light" }: Props) {
  const muted = tone === "dark" ? "text-paper/60" : "text-muted";
  return (
    <div className="grid gap-6 md:grid-cols-12 md:gap-10" data-reveal>
      <div className={`eyebrow flex items-center gap-3 md:col-span-3 ${muted}`}>
        <span className="flex h-9 w-9 -rotate-6 items-center justify-center rounded-full border-2 border-current bg-rose font-thai text-base tracking-normal text-white">
          {sectionIndex(locale, index)}
        </span>
        <span className="h-px w-8 bg-current opacity-40" />
        <span>{en}</span>
      </div>
      <div className="md:col-span-9">
        <h2 data-split className="font-thai text-[clamp(2rem,4.6vw,3.75rem)] font-semibold leading-[1.15] tracking-tight">
          {title}
        </h2>
        {lead ? <p className={`mt-5 max-w-2xl text-lg ${muted}`}>{lead}</p> : null}
      </div>
    </div>
  );
}
