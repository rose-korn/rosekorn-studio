/* eslint-disable @next/next/no-html-link-for-pages -- full page loads back to the studio so its GSAP intro runs again */
import type { Metadata } from "next";
import { Chonburi } from "next/font/google";
import { C } from "@/components/cafe/palette";
import { CafeHeroVisual, RoastPicker, RoastProvider } from "@/components/cafe/CafeHeroVisual";
import { CoffeeRiver } from "@/components/cafe/CoffeeRiver";
import { FinaleCup } from "@/components/cafe/FinaleCup";
import { OpenNow } from "@/components/cafe/OpenNow";
import { MenuBoard } from "@/components/cafe/MenuBoard";

/**
 * Baan Kafae: a made-up cafe, built as a sample of the "Landing Custom" package.
 * It lives inside the studio site on purpose (no separate deploy) and says clearly that it is a demo.
 * It keeps the studio's handmade outlines, but swaps to a cafe palette and a Thai display serif.
 */

const chonburi = Chonburi({ variable: "--font-chonburi", subsets: ["thai", "latin"], weight: "400", display: "swap" });

export const metadata: Metadata = {
  title: "Baan Kafae (เว็บตัวอย่าง)",
  description: "เว็บตัวอย่างร้านคาเฟ่สมมติจาก Rosekorn Studio: เมนู เวลาเปิด แผนที่ และปุ่มสั่งผ่าน LINE",
  alternates: { canonical: "/work/baan-kafae/" },
  // a fictional shop: keep it out of search results so nobody goes looking for it
  robots: { index: false, follow: true },
};


const menu = [
  {
    group: "กาแฟ",
    en: "Coffee",
    items: [
      { name: "เอสเปรสโซ่", note: "เมล็ดคั่วกลาง ดอยช้าง", price: 55 },
      { name: "อเมริกาโน่เย็น", note: "หอม เปรี้ยวนิด ๆ", price: 65 },
      { name: "ลาเต้", note: "ร้อน / เย็น", price: 70 },
      { name: "ส้มอเมริกาโน่", note: "น้ำส้มสายน้ำผึ้งคั้นสด", price: 80 },
      { name: "ลาเต้กุหลาบ", note: "เมนูประจำร้าน", price: 85, star: true },
    ],
  },
  {
    group: "ไม่ใช่กาแฟ",
    en: "Not coffee",
    items: [
      { name: "ชาไทย", note: "หวานน้อยได้", price: 60 },
      { name: "มัทฉะลาเต้", note: "มัทฉะอูจิ", price: 80 },
      { name: "โกโก้เข้ม", note: "โกโก้ชุมพร", price: 65 },
    ],
  },
  {
    group: "ขนมอบ",
    en: "Bakery",
    items: [
      { name: "ครัวซองต์เนยสด", note: "อบทุกเช้า", price: 75 },
      { name: "บานาน่าเค้ก", note: "กล้วยหอมทอง", price: 65 },
      { name: "ขนมปังสังขยาใบเตย", note: "หมดไว มาก่อนบ่าย", price: 89, star: true },
    ],
  },
];

const hours = [
  { d: "จันทร์ – ศุกร์", t: "07:30 – 17:00" },
  { d: "เสาร์ – อาทิตย์", t: "08:00 – 18:00" },
  { d: "พุธที่ 2 ของเดือน", t: "ปิดพักร้าน" },
];

export default function BaanKafae() {
  return (
    <div className={`${chonburi.variable} min-h-screen`} style={{ background: C.bg, color: C.cream }}>
      <DemoBar />

      {/* cafe header */}
      <header className="container-x flex items-center justify-between py-6">
        <a href="#top" className="flex items-center gap-3" aria-label="Baan Kafae หน้าแรก">
          <CupMark className="h-10 w-10" />
          <span className="leading-tight">
            <span className="block font-[family-name:var(--font-chonburi)] text-xl">บ้านกาแฟ</span>
            <span className="block font-mono text-[10px] tracking-[0.3em]" style={{ color: C.caramel }}>
              BAAN KAFAE
            </span>
          </span>
        </a>
        <nav className="hidden items-center gap-8 text-sm md:flex" aria-label="เมนูร้าน">
          <a href="#menu" className="link-underline">เมนู</a>
          <a href="#story" className="link-underline">เรื่องของร้าน</a>
          <a href="#visit" className="link-underline">เวลาเปิดและแผนที่</a>
        </nav>
        <OrderButton small />
      </header>

      <main id="top" className="relative">
        <RoastProvider>
        <CoffeeRiver />
        {/* hero */}
        <section className="container-x relative z-[2] grid items-center gap-12 pb-24 pt-10 md:grid-cols-[1.1fr_1fr] md:pb-32 md:pt-16">
          <div>
            <p className="font-mono text-xs tracking-[0.25em]" style={{ color: C.caramel }}>
              SLOW BAR · SINCE 2019
            </p>
            <h1
              data-split
              className="mt-6 font-[family-name:var(--font-chonburi)] text-[clamp(3.2rem,9vw,7.5rem)] leading-[1.02]"
            >
              กาแฟดี <span className="whitespace-nowrap">ใกล้บ้าน</span>
            </h1>
            <p className="mt-6 max-w-md text-lg opacity-85">
              ร้านกาแฟเล็ก ๆ ในซอย คั่วเมล็ดเองทุกสัปดาห์ ขนมอบเช้าทุกวัน นั่งทำงานได้ ปลั๊กมีทุกโต๊ะ
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <OrderButton />
              <a
                href="#menu"
                className="press inline-flex h-12 items-center rounded-full border-[2.5px] px-6 font-semibold"
                style={{ borderColor: C.cream }}
              >
                ดูเมนู
              </a>
            </div>
            <OpenNow />
            <RoastPicker />
          </div>
          <CafeHeroVisual />
        </section>

        <CafeMarquee />

        {/* menu */}
        <section id="menu" className="scroll-mt-16 py-20 md:py-28" style={{ background: C.cream, color: C.ink }}>
          <div data-river-via="0.94" className="h-0" aria-hidden="true" />
          <div className="container-x relative z-[2]">
            <div className="flex flex-wrap items-end justify-between gap-6">
              <h2 data-split className="font-[family-name:var(--font-chonburi)] text-[clamp(2.4rem,6vw,4.5rem)] leading-none">
                เมนูวันนี้
              </h2>
              <p className="max-w-sm opacity-70">ราคารวม VAT แล้ว นมโอ๊ต / อัลมอนด์ +15 บาท แก้วตัวเองลด 5 บาท</p>
            </div>
            <MenuBoard menu={menu} />
          </div>
          <div data-river-via="0.05" className="h-0 translate-y-12" aria-hidden="true" />
        </section>

        {/* story */}
        <section id="story" className="container-x relative z-[2] grid scroll-mt-16 gap-12 py-20 md:grid-cols-2 md:py-28">
          <div>
            <p className="font-mono text-xs tracking-[0.25em]" style={{ color: C.caramel }}>
              OUR STORY
            </p>
            <h2 data-split className="mt-4 font-[family-name:var(--font-chonburi)] text-[clamp(2.2rem,5vw,3.8rem)] leading-[1.1]">
              เริ่มจากห้องแถวของยาย
            </h2>
          </div>
          <div className="space-y-5 text-lg opacity-85">
            <p>
              บ้านกาแฟเปิดในห้องแถวไม้ที่ยายเคยขายของชำ เราเก็บประตูบานเฟี้ยมกับตู้กระจกเดิมไว้ แล้วเติมบาร์กาแฟเข้าไปแทนเคาน์เตอร์
            </p>
            <p>เมล็ดมาจากไร่เล็ก ๆ บนดอย คั่วเองหลังร้านทุกวันจันทร์ ใครผ่านมาช่วงเช้าจะได้กลิ่นก่อนเห็นป้าย</p>
            <dl className="grid grid-cols-3 gap-4 pt-4">
              {[
                ["4", "ไร่ที่ซื้อเมล็ดตรง"],
                ["20", "ที่นั่ง มีปลั๊กทุกโต๊ะ"],
                ["0", "หลอดพลาสติก"],
              ].map(([n, l]) => (
                <div key={l} className="rounded-2xl border-2 p-4" style={{ borderColor: C.cream }}>
                  <dt className="font-[family-name:var(--font-chonburi)] text-4xl" style={{ color: C.caramel }}>
                    {n}
                  </dt>
                  <dd className="mt-1 text-sm opacity-80">{l}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <div data-river-via="0.5" className="h-0" aria-hidden="true" />

        {/* visit */}
        <section id="visit" className="scroll-mt-16 py-20 md:py-28" style={{ background: C.bg2 }}>
          <div className="container-x relative z-[2] grid gap-10 md:grid-cols-[1fr_1.2fr]">
            <div>
              <h2 data-split className="font-[family-name:var(--font-chonburi)] text-[clamp(2.2rem,5vw,3.8rem)] leading-none">
                แวะมานั่ง
              </h2>
              <ul className="mt-10 divide-y-2 border-y-2" style={{ borderColor: `${C.cream}33` }}>
                {hours.map((h) => (
                  <li key={h.d} className="flex justify-between py-4" style={{ borderColor: `${C.cream}33` }}>
                    <span>{h.d}</span>
                    <span className="font-mono">{h.t}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-8 opacity-85">
                123 ซอยตัวอย่าง 7 ถนนสมมติ กรุงเทพฯ
                <br />
                <span className="text-sm opacity-70">เดินจาก BTS 5 นาที · จอดรถหน้าร้านได้ 2 คัน</span>
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <OrderButton />
                <a
                  href="#visit"
                  data-cursor="เดโม"
                  className="press inline-flex h-12 items-center rounded-full border-[2.5px] px-6 font-semibold"
                  style={{ borderColor: C.cream }}
                >
                  นำทางด้วย Google Maps
                </a>
              </div>
            </div>
            <div data-pop style={{ rotate: "-1.2deg" }}>
              <MapDoodle />
              <p className="mt-4 text-sm opacity-60">ในเว็บจริงตรงนี้จะเป็นแผนที่ Google Maps ของร้าน</p>
            </div>
          </div>
          <div data-river-via="0.9" className="h-0 translate-y-10" aria-hidden="true" />
        </section>

        {/* finale: the coffee poured in the hero ends up here */}
        <section className="container-x relative z-[2] flex flex-col items-center pb-24 pt-28 text-center md:pb-32 md:pt-36">
          <FinaleCup />
          <h2 data-split className="mt-10 font-[family-name:var(--font-chonburi)] text-[clamp(2.2rem,5vw,3.8rem)] leading-[1.1]">
            เทมาถึงแก้วคุณแล้ว
          </h2>
          <p className="mt-4 max-w-md text-lg opacity-85">แก้วจริงรออยู่ที่ร้าน แวะมานั่ง หรือสั่งผ่าน LINE ให้ไปรับได้เลย</p>
          <div className="mt-8">
            <OrderButton />
          </div>
        </section>
        </RoastProvider>
      </main>

      <footer className="container-x flex flex-col items-start justify-between gap-6 py-12 text-sm md:flex-row md:items-center">
        <p className="opacity-70">© Baan Kafae · ร้านสมมติ ใช้เป็นตัวอย่างผลงานเท่านั้น</p>
        <a href="/#work" className="link-underline font-semibold" style={{ color: C.caramel }}>
          เว็บนี้ทำโดย Rosekorn Studio ✿
        </a>
      </footer>
    </div>
  );
}

/** The "this is only a sample" strip, always visible at the top */
function DemoBar() {
  return (
    <div className="sticky top-0 z-40 border-b-[2.5px] border-ink bg-rose text-white">
      <div className="container-x flex flex-wrap items-center justify-between gap-x-6 gap-y-1 py-2 text-xs sm:text-sm">
        <p className="flex items-center gap-2">
          <span className="rounded-md border-2 border-white px-1.5 font-mono text-[10px] font-bold tracking-widest">DEMO</span>
          <span>
            นี่คือ<strong>เว็บตัวอย่าง</strong>จาก Rosekorn Studio ร้านนี้ไม่มีอยู่จริง
          </span>
        </p>
        <span className="flex gap-5">
          <a href="/#work" className="link-underline font-semibold">
            ← กลับไปดูผลงาน
          </a>
          <a href="/#packages" className="link-underline hidden font-semibold sm:inline">
            อยากได้แบบนี้ เริ่ม 8,900 บาท
          </a>
        </span>
      </div>
    </div>
  );
}

function OrderButton({ small = false }: { small?: boolean }) {
  return (
    <a
      href="#visit"
      data-cursor="ในเว็บจริงเปิด LINE"
      className={`press inline-flex items-center gap-2 rounded-full border-[2.5px] font-semibold ${
        small ? "h-10 px-4 text-sm" : "h-12 px-6"
      }`}
      style={{ background: C.caramel, color: C.ink, borderColor: C.ink, boxShadow: `3px 3px 0 ${C.ink}` }}
    >
      <span className="inline-block h-2 w-2 rounded-full bg-line-green" /> สั่งผ่าน LINE
    </a>
  );
}

function CupMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden="true">
      <circle cx="20" cy="20" r="18" fill={C.caramel} stroke={C.ink} strokeWidth="2.5" />
      <path d="M11 17h15v6a7 7 0 0 1-7 7h-1a7 7 0 0 1-7-7z" fill={C.cream} stroke={C.ink} strokeWidth="2.2" strokeLinejoin="round" />
      <path d="M26 19h2a3 3 0 0 1 0 6h-2.5" fill="none" stroke={C.ink} strokeWidth="2.2" />
      <path d="M15 13c0-2 2-2 2-4M20 13c0-2 2-2 2-4" fill="none" stroke={C.ink} strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

/** Hand-drawn street map with a pin (stands in for the real Google Maps embed) */
function MapDoodle() {
  return (
    <svg
      viewBox="0 0 480 340"
      className="w-full rounded-[1.25rem]"
      style={{ background: C.cream, border: `2.5px solid ${C.ink}`, boxShadow: `6px 6px 0 ${C.ink}` }}
      role="img"
      aria-label="แผนที่วาดมือ ร้านอยู่ในซอยตัวอย่าง 7 ใกล้สถานี BTS"
    >
      <g stroke={C.ink} strokeWidth="2" fill="#dfe7cf">
        <rect x="30" y="30" width="120" height="90" rx="10" />
        <rect x="190" y="30" width="110" height="90" rx="10" />
        <rect x="340" y="30" width="110" height="90" rx="10" />
        <rect x="30" y="170" width="120" height="140" rx="10" />
        <rect x="340" y="170" width="110" height="140" rx="10" />
      </g>
      <rect x="190" y="170" width="110" height="140" rx="10" fill="#bcd3a6" stroke={C.ink} strokeWidth="2" />
      <text x="245" y="295" textAnchor="middle" fontSize="13" fill={C.ink} opacity=".6">สวนหย่อม</text>
      <g fontFamily="var(--font-jetbrains), monospace" fontSize="12" fill={C.ink} opacity=".7">
        <text x="170" y="279" textAnchor="middle" transform="rotate(-90 170 275)">ซอยตัวอย่าง 7</text>
        <text x="245" y="152" textAnchor="middle">ถนนสมมติ</text>
      </g>
      <g>
        <rect x="380" y="132" width="70" height="28" rx="6" fill={C.bg} stroke={C.ink} strokeWidth="2" />
        <text x="415" y="151" textAnchor="middle" fontSize="12" fontWeight="700" fill={C.cream}>BTS</text>
      </g>
      <path d="M415 160 C 380 210, 220 150, 170 200" fill="none" stroke={C.bean} strokeWidth="3" strokeDasharray="2 8" strokeLinecap="round" />
      <g transform="translate(170 200)">
        <path d="M0 0c-14-16-22-26-22-38a22 22 0 0 1 44 0c0 12-8 22-22 38z" fill="#e0475e" stroke={C.ink} strokeWidth="3" />
        <circle cy="-38" r="8" fill={C.cream} stroke={C.ink} strokeWidth="2.5" />
      </g>
      <g transform="translate(46 186)">
        <rect width="78" height="30" rx="15" fill={C.caramel} stroke={C.ink} strokeWidth="2" />
        <text x="39" y="20" textAnchor="middle" fontSize="13" fontWeight="700" fill={C.ink}>บ้านกาแฟ</text>
      </g>
    </svg>
  );
}

/** Cafe-flavoured version of the studio marquee band */
function CafeMarquee() {
  const words = ["ESPRESSO", "ลาเต้กุหลาบ", "SLOW BAR", "คั่วสดทุกจันทร์", "ครัวซองต์อบเช้า", "WIFI ฟรี", "ปลั๊กทุกโต๊ะ", "แก้วตัวเองลด 5 บาท"];
  const row = [...words, ...words];
  return (
    <div className="overflow-hidden border-y-[2.5px] py-3" style={{ background: C.caramel, color: C.ink, borderColor: C.ink }} aria-hidden="true">
      <div className="flex w-max animate-marquee gap-8 whitespace-nowrap font-[family-name:var(--font-chonburi)] text-xl">
        {row.map((w, i) => (
          <span key={i} className="flex items-center gap-8">
            {w} <span className="text-base">☕︎</span>
          </span>
        ))}
      </div>
    </div>
  );
}
