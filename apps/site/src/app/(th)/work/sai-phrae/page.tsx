/* eslint-disable @next/next/no-html-link-for-pages -- full page loads back to the studio so its GSAP intro runs again */
import type { Metadata } from "next";
import { Noto_Serif_Thai } from "next/font/google";
import { launchPromo, packages } from "@/content/site";
import { Figure, Pattern } from "@/components/fashion/Figure";
import { Lookbook } from "@/components/fashion/Lookbook";
import { looks } from "@/components/fashion/looks";

/**
 * Sai Phrae Atelier: a made-up Bangkok fashion house, built as a high-fashion sample of the
 * "Landing Signature" package. Editorial black / bone palette, huge serif type, a pinned runway
 * lookbook and a private-fitting booking via LINE. No cart on purpose: fashion brands mostly
 * sell by appointment and DM, and the studio's e-commerce packages are paused.
 */

const serifThai = Noto_Serif_Thai({ variable: "--font-serif-thai", subsets: ["thai", "latin"], weight: ["300", "500"], display: "swap" });

export const metadata: Metadata = {
  title: "Sai Phrae Atelier (เว็บตัวอย่าง)",
  description: "เว็บตัวอย่างแบรนด์แฟชั่นสมมติจาก Rosekorn Studio: lookbook คอลเลกชัน เรื่องผ้าทอมือ และนัดลองชุดผ่าน LINE",
  alternates: { canonical: "/work/sai-phrae/" },
  // a fictional brand: keep it out of search results so nobody goes looking for it
  robots: { index: false, follow: true },
};

const BONE = "#efebe4";
const INK = "#0d0d0d";
const GOLD = "#c9a46a";
const LAC = "#6e1423";

const thai = "font-[family-name:var(--font-serif-thai)]";

export default function SaiPhrae() {
  const sig = packages.find((p) => p.id === "landing-signature");
  return (
    <div className={`${serifThai.variable} min-h-screen`} style={{ background: BONE, color: INK }}>
      <style>{css}</style>
      <DemoBar sig={launchPromo.active && sig?.promoPrice ? `Signature โปรเปิดตัว ฿${sig.promoPrice}` : `แพ็กเกจ Signature ฿${sig?.price}`} />

      {/* nav */}
      <header className="container-x flex items-center justify-between py-6 font-mono text-[11px] tracking-[0.3em]">
        <a href="#top" className="font-serif text-xl tracking-[0.2em]">
          SAI PHRAE
        </a>
        <nav className="flex gap-6">
          <a href="#lookbook" className="link-underline">LOOKBOOK</a>
          <a href="#atelier" className="link-underline hidden sm:inline">ATELIER</a>
          <a href="#fitting" className="link-underline">FITTING</a>
        </nav>
      </header>

      {/* hero */}
      <section id="top" className="relative overflow-hidden">
        <h1 className="sp-word pointer-events-none select-none text-center font-serif leading-[0.8] tracking-[-0.04em]" aria-label="Sai Phrae Atelier">
          {"SAI PHRAE".split("").map((ch, i) => (
            <span key={i} aria-hidden="true" style={{ animationDelay: `${0.08 * i}s` }}>
              {ch === " " ? " " : ch}
            </span>
          ))}
        </h1>
        <div className="container-x relative -mt-[9vw] grid items-end gap-8 pb-16 md:grid-cols-[1fr_auto_1fr]">
          <div className="sp-fade order-2 md:order-1" style={{ animationDelay: "0.9s" }}>
            <p className="font-mono text-[11px] tracking-[0.3em]">COLLECTION 07 · SS 2027</p>
            <p className={`${thai} mt-3 text-3xl font-light`}>น้ำขึ้น</p>
            <p className="font-serif text-2xl italic">High Water</p>
          </div>
          <div className="sp-rise order-1 mx-auto w-[min(34vw,170px)] md:order-2">
            <Figure look={looks[0]} className="h-auto w-full" title={`Look 01: ${looks[0].en}`} />
          </div>
          <div className="sp-fade order-3 max-w-xs md:justify-self-end md:text-right" style={{ animationDelay: "1.1s" }}>
            <p className={`${thai} text-lg font-light leading-relaxed`}>
              ผ้าไหมทอมือจากสุรินทร์และมัดหมี่จากชัยภูมิ ตัดเย็บทีละชุดในห้องแถวย่านเจริญกรุง
            </p>
            <a href="#lookbook" data-cursor="ดูคอลเลกชัน" className="mt-5 inline-block border-b border-current pb-1 font-mono text-[11px] tracking-[0.3em]">
              VIEW THE COLLECTION ↓
            </a>
          </div>
        </div>
      </section>

      {/* thin ticker */}
      <div className="overflow-hidden border-y py-3" style={{ borderColor: INK }} aria-hidden="true">
        <ul className="flex w-max animate-marquee gap-10 whitespace-nowrap font-mono text-[11px] tracking-[0.4em]">
          {Array.from({ length: 2 }).flatMap((_, k) =>
            ["HANDWOVEN SILK", "SURIN", "MUDMEE IKAT", "CHAROEN KRUNG", "MADE TO MEASURE", "BY APPOINTMENT"].map((t) => (
              <li key={`${k}-${t}`} className="flex gap-10">
                {t} <span style={{ color: LAC }}>◆</span>
              </li>
            )),
          )}
        </ul>
      </div>

      {/* lookbook */}
      <Lookbook count={looks.length}>
        {looks.map((l, i) => (
          <figure key={l.no} className="group w-[72vw] shrink-0 snap-center sm:w-[44vw] md:w-[24vw]" data-cursor={l.en}>
            <div
              className="relative flex aspect-[3/5] items-end justify-center overflow-hidden"
              style={{ background: i % 2 ? "#1a1a1a" : "#151515" }}
            >
              <span className="absolute left-4 top-3 font-serif text-6xl italic text-white/10">{l.no}</span>
              <Figure look={l} className="relative h-[92%] w-auto transition duration-700 group-hover:scale-[1.04]" title={`Look ${l.no}: ${l.en}`} />
            </div>
            <figcaption className="mt-4 flex items-baseline justify-between gap-4 border-t border-white/20 pt-3">
              <span>
                <span className={`${thai} block text-lg`}>{l.name}</span>
                <span className="font-serif text-base italic text-white/60">{l.en}</span>
              </span>
              <span className="shrink-0 font-mono text-[10px] tracking-[0.25em] text-white/50">LOOK {l.no}</span>
            </figcaption>
          </figure>
        ))}
      </Lookbook>

      {/* atelier story */}
      <section id="atelier" className="container-x grid gap-12 py-24 md:grid-cols-12 md:py-36">
        <p className="font-mono text-[11px] tracking-[0.3em] md:col-span-3">THE ATELIER</p>
        <div className="md:col-span-9">
          <p className={`${thai} text-[clamp(2rem,5vw,4.2rem)] font-light leading-[1.2]`}>
            ผ้าหนึ่งผืน <span className="font-serif italic" style={{ color: LAC }}>ทอสี่สิบชั่วโมง</span>
            <br />
            เราจึงไม่ตัดชุดซ้ำเกินห้าตัว
          </p>
          <div className="mt-12 grid gap-10 sm:grid-cols-3">
            {[
              ["40", "ชั่วโมงทอต่อหนึ่งผืน", "hours on the loom"],
              ["12", "ช่างทอในสุรินทร์และชัยภูมิ", "weavers we work with"],
              ["5", "ชุดสูงสุดต่อหนึ่งดีไซน์", "pieces per design, never more"],
            ].map(([n, th, en]) => (
              <div key={en} className="border-t pt-4" style={{ borderColor: INK }}>
                <p className="font-serif text-6xl">{n}</p>
                <p className={`${thai} mt-2`}>{th}</p>
                <p className="font-serif text-sm italic opacity-60">{en}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* fabric swatches */}
      <section className="container-x pb-24 md:pb-36" aria-label="ผ้าในคอลเลกชัน">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {looks.filter((l) => l.weave !== "plain").slice(0, 4).map((l) => (
            <div key={l.no} className="group" data-cursor={l.fabric}>
              <svg viewBox="0 0 100 100" className="aspect-square w-full transition duration-700 group-hover:scale-[0.97]" aria-hidden="true">
                <defs>
                  <Pattern id={`sw-${l.no}`} weave={l.weave} cloth={l.colors[0]} thread={l.colors[1]} />
                </defs>
                <rect width="100" height="100" fill={`url(#sw-${l.no})`} />
              </svg>
              <p className={`${thai} mt-3 text-sm`}>{l.fabric}</p>
              <p className="font-mono text-[10px] tracking-[0.25em] opacity-50">LOOK {l.no}</p>
            </div>
          ))}
        </div>
      </section>

      {/* fitting */}
      <section id="fitting" className="relative overflow-hidden py-24 text-center md:py-36" style={{ background: LAC, color: BONE }}>
        <p className="font-mono text-[11px] tracking-[0.3em]">PRIVATE FITTING</p>
        <h2 className={`${thai} mx-auto mt-6 max-w-3xl px-4 text-[clamp(2.2rem,6vw,5rem)] font-light leading-[1.15]`}>
          ลองชุดที่ atelier
          <br />
          <span className="font-serif italic">by appointment only</span>
        </h2>
        <p className={`${thai} mx-auto mt-6 max-w-md px-4 text-lg font-light opacity-80`}>
          วันพุธถึงอาทิตย์ 11:00–19:00 วัดตัว เลือกผ้า และดื่มชาไปด้วย ใช้เวลาประมาณหนึ่งชั่วโมง
        </p>
        <a
          href="#fitting"
          data-cursor="ในเว็บจริงเปิด LINE"
          className="mt-10 inline-flex h-14 items-center gap-3 border px-8 font-mono text-xs tracking-[0.3em] transition hover:bg-[#efebe4] hover:text-[#6e1423]"
          style={{ borderColor: BONE }}
        >
          <span className="inline-block h-2 w-2 rounded-full bg-line-green" /> BOOK VIA LINE
        </a>
        <p className="mt-10 font-mono text-[10px] tracking-[0.3em] opacity-60">CHAROEN KRUNG 32 · BANGKOK</p>
        <p className={`${thai} mt-1 text-xs opacity-60`}>(ที่อยู่สมมติ)</p>
      </section>

      <footer className="container-x flex flex-col items-start justify-between gap-4 py-10 font-mono text-[10px] tracking-[0.3em] sm:flex-row sm:items-center">
        <span className="font-serif text-lg tracking-[0.2em]">SAI PHRAE</span>
        <span>© 2027 SAI PHRAE ATELIER · A ROSEKORN STUDIO DEMO</span>
      </footer>
    </div>
  );
}

function DemoBar({ sig }: { sig: string }) {
  return (
    <div className="sticky top-0 z-40 text-white" style={{ background: INK, borderBottom: `1px solid ${GOLD}` }}>
      <div className="container-x flex flex-wrap items-center justify-between gap-x-6 gap-y-1 py-2 text-xs sm:text-sm">
        <p className="flex items-center gap-2">
          <span className="border px-1.5 font-mono text-[10px] font-bold tracking-widest" style={{ borderColor: GOLD, color: GOLD }}>
            DEMO
          </span>
          <span>
            นี่คือ<strong>เว็บตัวอย่าง</strong>จาก Rosekorn Studio แบรนด์นี้ไม่มีอยู่จริง
          </span>
        </p>
        <span className="flex gap-5">
          <a href="/#work" className="link-underline font-semibold">
            ← กลับไปดูผลงาน
          </a>
          <a href="/#packages" className="link-underline hidden font-semibold sm:inline">
            อยากได้แบบนี้ {sig}
          </a>
        </span>
      </div>
    </div>
  );
}

const css = `
.sp-word { font-size: clamp(4rem, 19vw, 22rem); }
.sp-word span { display: inline-block; animation: sp-up 1.1s cubic-bezier(.2,.8,.2,1) both; }
.sp-rise { animation: sp-rise 1.4s .4s cubic-bezier(.2,.8,.2,1) both; }
.sp-fade { animation: sp-fade 1s both; }
@keyframes sp-up { from { transform: translateY(60%); opacity: 0; } }
@keyframes sp-rise { from { transform: translateY(14%); opacity: 0; } }
@keyframes sp-fade { from { opacity: 0; transform: translateY(12px); } }
@media (prefers-reduced-motion: reduce) { .sp-word span, .sp-rise, .sp-fade { animation: none; } }
`;
