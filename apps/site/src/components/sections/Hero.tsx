import { site } from "@/content/site";
import { HeroVisual } from "@/components/hero/HeroVisual";
import { Arrow } from "@/components/Arrow";

const stats = [
  { n: 90, suffix: "+", v: "PageSpeed บนมือถือ", tilt: -2, bg: "bg-paper" },
  { n: 3, prefix: "2–", suffix: "", v: "สัปดาห์ เว็บหน้าเดียวพร้อมใช้", tilt: 1.5, bg: "bg-rose-soft" },
  { n: 100, suffix: "%", v: "โค้ดเป็นของคุณ", tilt: -1, bg: "bg-paper" },
];

export function Hero() {
  return (
    <section id="top" className="grain relative overflow-hidden pt-28 md:pt-36">
      <div className="container-x">
        <div className="flex flex-wrap items-center justify-between gap-4" data-reveal>
          <span className="sticker-sm inline-flex -rotate-1 items-center gap-2 rounded-full bg-paper px-3 py-1.5 text-sm font-medium">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-rose opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-rose" />
            </span>
            {site.openingNote} · รับจำนวนจำกัด
          </span>
          <span className="eyebrow text-muted">Independent web studio — {site.location}</span>
        </div>

        <div className="mt-10 grid items-center gap-10 lg:grid-cols-12 lg:gap-6">
          <div className="relative lg:col-span-7">
            {/* hand-drawn sparkles */}
            <Sparkle className="absolute -left-3 -top-6 hidden h-8 w-8 text-rose md:block" />
            <Sparkle className="absolute right-[12%] top-[38%] hidden h-6 w-6 rotate-12 text-sky md:block" />
            <h1
              data-split
              className="font-thai text-[clamp(2.9rem,8.4vw,7.4rem)] font-semibold leading-[1.02] tracking-[-0.03em]"
            >
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
            <div className="relative mt-9 flex flex-wrap items-center gap-4" data-reveal>
              <a
                href="#contact"
                data-cursor="คุยกัน!"
                className="press sticker group inline-flex h-14 items-center gap-3 rounded-full bg-rose pl-7 pr-2 font-semibold text-white"
              >
                เริ่มคุยโปรเจกต์
                <span className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-ink bg-paper text-ink transition group-hover:rotate-45">
                  <Arrow />
                </span>
              </a>
              <a
                href="#packages"
                data-cursor="ดูราคา"
                className="press sticker-sm inline-flex h-14 items-center rounded-full bg-paper px-7 font-medium"
              >
                ดูแพ็กเกจและราคา
              </a>
              <span className="hidden items-center gap-2 font-serif text-xl italic text-rose-deep sm:inline-flex">
                <svg viewBox="0 0 60 30" className="h-6 w-12 -scale-x-100" aria-hidden="true">
                  <path d="M2 22 C 18 4, 40 4, 56 18" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                  <path d="M48 10 L56 18 L45 21" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                คุยฟรี 30 นาที
              </span>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-[520px] lg:col-span-5" data-reveal>
            <HeroVisual />
            <span className="stamp absolute bottom-[6%] left-[2%] -rotate-6 bg-paper/80 font-mono text-xs text-rose-deep md:text-sm">
              Made in BKK ✿
            </span>
          </div>
        </div>

        <dl className="mt-14 grid gap-5 sm:grid-cols-3 md:mt-20">
          {stats.map((s) => (
            <div
              key={s.v}
              data-pop
              data-tilt={s.tilt}
              style={{ rotate: `${s.tilt}deg` }}
              className={`sticker wobbly flex items-baseline gap-4 px-6 py-5 sm:block ${s.bg}`}
            >
              <dt className="text-4xl font-semibold tabular-nums tracking-tight md:text-5xl">
                {s.prefix}
                <span data-count={s.n} data-suffix={s.suffix}>
                  {s.n}
                  {s.suffix}
                </span>
              </dt>
              <dd className="text-muted sm:mt-1">{s.v}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

function Sparkle({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path
        d="M12 1.5 C13 8, 16 11, 22.5 12 C16 13, 13 16, 12 22.5 C11 16, 8 13, 1.5 12 C8 11, 11 8, 12 1.5Z"
        fill="currentColor"
        stroke="#151311"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}
