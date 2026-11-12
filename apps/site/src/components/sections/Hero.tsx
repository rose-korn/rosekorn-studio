import { site } from "@/content/site";
import { HeroVisual } from "@/components/hero/HeroVisual";
import { Arrow } from "@/components/Arrow";

const stats = [
  { k: "90+", v: "PageSpeed บนมือถือ" },
  { k: "2–3", v: "สัปดาห์ เว็บหน้าเดียวพร้อมใช้" },
  { k: "100%", v: "โค้ดเป็นของคุณ" },
];

export function Hero() {
  return (
    <section id="top" className="grain relative overflow-hidden pt-28 md:pt-36">
      <div className="container-x">
        <div className="flex flex-wrap items-center justify-between gap-4" data-reveal>
          <span className="inline-flex items-center gap-2 rounded-full border border-ink/15 bg-paper/60 px-3 py-1.5 text-sm">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-rose opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-rose" />
            </span>
            {site.openingNote} · รับจำนวนจำกัด
          </span>
          <span className="eyebrow text-muted">Independent web studio — {site.location}</span>
        </div>

        <div className="mt-10 grid items-center gap-10 lg:grid-cols-12 lg:gap-6">
          <div className="lg:col-span-7">
            <h1 className="font-thai text-[clamp(2.9rem,8.4vw,7.4rem)] font-semibold leading-[1.02] tracking-[-0.03em]" data-reveal>
              เว็บที่
              <span className="relative whitespace-nowrap">
                <span className="relative z-10">ขายของ</span>
                <svg viewBox="0 0 300 24" preserveAspectRatio="none" className="absolute -bottom-1 left-0 z-0 h-[0.28em] w-full text-rose" aria-hidden="true">
                  <path d="M2 18 C 70 4, 160 4, 298 14" fill="none" stroke="currentColor" strokeWidth="8" strokeLinecap="round" />
                </svg>
              </span>
              <br />
              ได้จริง<span className="text-rose">.</span>
            </h1>
            <p className="mt-6 font-serif text-[clamp(1.6rem,3vw,2.5rem)] italic leading-tight text-ink-2" data-reveal>
              Websites that actually sell — designed in Bangkok, built to last.
            </p>
            <p className="mt-6 max-w-xl text-lg text-muted" data-reveal>
              Rosekorn Studio ออกแบบและพัฒนาเว็บไซต์ด้วย Next.js ให้ร้านค้า คาเฟ่ และแบรนด์ไทย
              โหลดไว ติด Google รองรับ PromptPay และ LINE OA ตั้งแต่วันแรก
            </p>
            <div className="mt-9 flex flex-wrap gap-3" data-reveal>
              <a
                href="#contact"
                className="group inline-flex h-14 items-center gap-3 rounded-full bg-ink pl-7 pr-2 text-paper transition hover:bg-rose"
              >
                เริ่มคุยโปรเจกต์
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-paper text-ink transition group-hover:rotate-45">
                  <Arrow />
                </span>
              </a>
              <a
                href="#packages"
                className="inline-flex h-14 items-center rounded-full border border-ink/20 px-7 transition hover:border-ink"
              >
                ดูแพ็กเกจและราคา
              </a>
            </div>
          </div>

          <div className="mx-auto w-full max-w-[520px] lg:col-span-5" data-reveal>
            <HeroVisual />
          </div>
        </div>

        <dl className="mt-14 grid grid-cols-1 border-t border-ink/15 sm:grid-cols-3 md:mt-20">
          {stats.map((s, i) => (
            <div
              key={s.k}
              className={`flex items-baseline gap-4 py-6 sm:block ${i > 0 ? "border-t border-ink/15 sm:border-l sm:border-t-0 sm:pl-8" : ""}`}
              data-reveal
            >
              <dt className="text-4xl font-semibold tracking-tight md:text-5xl">{s.k}</dt>
              <dd className="text-muted sm:mt-2">{s.v}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
