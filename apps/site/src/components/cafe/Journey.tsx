"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { C } from "./palette";

/**
 * "From farm to cup": on desktop the section pins to the screen and the panels slide sideways
 * as you scroll (the classic pinned horizontal story), with a coffee progress bar filling up.
 * Phones and reduced motion get the same panels stacked vertically.
 * Sits on z-3 with a solid background so the page's coffee river flows underneath it.
 */
const steps = [
  {
    no: "01",
    title: "ไร่เล็ก ๆ บนดอย",
    en: "Farm",
    body: "ซื้อเมล็ดตรงจาก 4 ไร่ในดอยช้างกับดอยสะเก็ด เลือกเฉพาะเชอร์รี่ที่สุกแดงเต็มลูก",
    art: <Farm />,
  },
  {
    no: "02",
    title: "คั่วเองทุกวันจันทร์",
    en: "Roast",
    body: "คั่วในเครื่องเล็กหลังร้าน ทีละ 2 กิโล ใครผ่านมาช่วงเช้าจะได้กลิ่นก่อนเห็นป้าย",
    art: <Roaster />,
  },
  {
    no: "03",
    title: "ดริปช้า ๆ ทีละแก้ว",
    en: "Brew",
    body: "ชั่งน้ำ ชั่งผงทุกครั้ง เทวน ๆ ให้น้ำผ่านกาแฟเท่ากันทั้งดริปเปอร์ รสถึงไม่แกว่ง",
    art: <Dripper />,
  },
  {
    no: "04",
    title: "ห้องแถวของยาย",
    en: "Home",
    body: "เปิดในห้องแถวไม้ที่ยายเคยขายของชำ เก็บประตูบานเฟี้ยมกับตู้กระจกเดิมไว้ แล้วเติมบาร์กาแฟแทนเคาน์เตอร์",
    art: <Shophouse />,
  },
];

export function Journey() {
  const section = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const bar = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = section.current;
    const tr = track.current;
    if (!el || !tr) return;
    gsap.registerPlugin(ScrollTrigger);
    const mm = gsap.matchMedia();
    mm.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
      const distance = () => tr.scrollWidth - window.innerWidth;
      const slide = gsap.to(tr, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start: "top top",
          end: () => `+=${distance()}`,
          pin: true,
          scrub: 0.8,
          invalidateOnRefresh: true,
          onUpdate: (self) => bar.current && (bar.current.style.transform = `scaleX(${self.progress})`),
        },
      });
      // each picture tilts and bobs as its panel passes through the middle
      tr.querySelectorAll<HTMLElement>("[data-art]").forEach((art) => {
        gsap.fromTo(
          art,
          { rotate: -8, y: 40, scale: 0.85 },
          {
            rotate: 6,
            y: -20,
            scale: 1,
            ease: "none",
            scrollTrigger: { trigger: art, containerAnimation: slide, start: "left right", end: "right left", scrub: true },
          },
        );
      });
    });
    return () => mm.revert();
  }, []);

  return (
    <section ref={section} id="story" className="relative z-[3] scroll-mt-16 overflow-hidden" style={{ background: C.bg2 }}>
      <div ref={track} className="flex flex-col gap-6 px-5 py-20 md:h-screen md:w-max md:flex-row md:items-center md:gap-10 md:px-[8vw] md:py-0">
        {/* intro panel */}
        <div className="shrink-0 md:w-[38vw] md:pr-10">
          <p className="font-mono text-xs tracking-[0.25em]" style={{ color: C.caramel }}>
            OUR STORY
          </p>
          <h2 className="mt-4 font-[family-name:var(--font-chonburi)] text-[clamp(3rem,7vw,6.5rem)] leading-[1.02]">
            จากไร่
            <br />
            สู่แก้ว
          </h2>
          <p className="mt-6 max-w-sm text-lg opacity-85">กว่าจะเป็นกาแฟหนึ่งแก้วในบ้านกาแฟ ผ่านมือเรามาทุกขั้น</p>
          <p className="mt-8 hidden items-center gap-3 font-mono text-xs tracking-[0.2em] opacity-70 md:flex">
            เลื่อนลงเพื่อเดินทาง <span className="inline-block animate-pulse text-lg">→</span>
          </p>
        </div>

        {steps.map((s, i) => (
          <article
            key={s.no}
            className="relative flex shrink-0 flex-col justify-between rounded-[1.5rem] border-[3px] p-6 md:h-[70vh] md:w-[min(30rem,34vw)] md:p-8"
            style={{
              borderColor: C.ink,
              background: i % 2 ? C.cream : C.caramel,
              color: C.ink,
              boxShadow: `8px 8px 0 ${C.ink}`,
              rotate: i % 2 ? "1.2deg" : "-1deg",
            }}
          >
            <div className="flex items-start justify-between">
              <span className="font-[family-name:var(--font-chonburi)] text-6xl leading-none opacity-90">{s.no}</span>
              <span className="stamp rotate-6 font-mono text-[11px]" style={{ background: C.cream }}>
                {s.en}
              </span>
            </div>
            <div data-art className="mx-auto my-4 h-40 w-40 md:h-[30vh] md:w-[30vh]">
              {s.art}
            </div>
            <div>
              <h3 className="font-[family-name:var(--font-chonburi)] text-3xl leading-tight">{s.title}</h3>
              <p className="mt-2 opacity-80">{s.body}</p>
            </div>
          </article>
        ))}

        {/* numbers panel */}
        <div className="shrink-0 md:w-[30vw] md:pl-6">
          <dl className="grid grid-cols-3 gap-3 md:grid-cols-1 md:gap-4">
            {[
              ["4", "ไร่ที่ซื้อเมล็ดตรง"],
              ["20", "ที่นั่ง มีปลั๊กทุกโต๊ะ"],
              ["0", "หลอดพลาสติก"],
            ].map(([n, l]) => (
              <div key={l} className="rounded-2xl border-2 p-4" style={{ borderColor: C.cream }}>
                <dt className="font-[family-name:var(--font-chonburi)] text-4xl md:text-6xl" style={{ color: C.caramel }}>
                  {n}
                </dt>
                <dd className="mt-1 text-sm opacity-80">{l}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      {/* progress: a thin line of coffee filling across the bottom while pinned */}
      <div className="absolute inset-x-[8vw] bottom-8 hidden h-3 overflow-hidden rounded-full border-2 md:block" style={{ borderColor: C.cream }} aria-hidden="true">
        <div ref={bar} className="h-full origin-left" style={{ background: "var(--coffee, #6b4325)", transform: "scaleX(0)" }} />
      </div>
    </section>
  );
}

const ink = { stroke: C.ink, strokeWidth: 4, strokeLinejoin: "round" as const, strokeLinecap: "round" as const };

function Farm() {
  return (
    <svg viewBox="0 0 200 200" className="h-full w-full" aria-hidden="true">
      <path d="M10 150 L70 60 L110 120 L140 80 L190 150 Z" fill="#7d9a5a" {...ink} />
      <path d="M58 78 L70 60 L82 78 Z" fill={C.cream} {...ink} />
      <rect x="10" y="150" width="180" height="30" rx="6" fill="#5c7a40" {...ink} />
      <path d="M40 170 C70 120 120 110 160 96" fill="none" {...ink} />
      {[
        [70, 132],
        [86, 124],
        [104, 116],
        [122, 110],
        [140, 104],
        [96, 136],
        [128, 122],
      ].map(([x, y]) => (
        <circle key={`${x}-${y}`} cx={x} cy={y} r="8" fill="#d23a48" {...ink} strokeWidth={3} />
      ))}
      <path d="M78 116 q10 -14 22 -8 q-8 14 -22 8z M132 92 q10 -14 22 -8 q-8 14 -22 8z" fill="#9cc46a" {...ink} strokeWidth={3} />
    </svg>
  );
}

function Roaster() {
  return (
    <svg viewBox="0 0 200 200" className="h-full w-full" aria-hidden="true">
      <rect x="40" y="70" width="110" height="80" rx="40" fill="#c8794a" {...ink} />
      <circle cx="150" cy="110" r="22" fill={C.cream} {...ink} />
      <path d="M150 110 l14 -14" {...ink} />
      <path d="M70 70 V40 h50 v30" fill="#8a8a8a" {...ink} />
      <rect x="50" y="150" width="90" height="20" rx="6" fill={C.ink} />
      {[
        [56, 186],
        [84, 182],
        [112, 188],
        [140, 182],
      ].map(([x, y]) => (
        <g key={x} transform={`translate(${x} ${y}) rotate(${x})`}>
          <ellipse rx="10" ry="7" fill="#5a3420" {...ink} strokeWidth={3} />
          <path d="M-6 0 h12" {...ink} strokeWidth={2} />
        </g>
      ))}
      <path d="M80 30 c-6 -8 6 -12 0 -20 M100 30 c-6 -8 6 -12 0 -20" fill="none" {...ink} strokeWidth={3} />
    </svg>
  );
}

function Dripper() {
  return (
    <svg viewBox="0 0 200 200" className="h-full w-full" aria-hidden="true">
      <path d="M50 40 H150 L112 100 H88 Z" fill={C.cream} {...ink} />
      <path d="M40 40 H160" {...ink} />
      <path d="M100 104 v10" stroke="var(--coffee, #6b4325)" strokeWidth="5" strokeLinecap="round" />
      <path d="M60 116 H140 L132 184 H68 Z" fill="#cfe3e8" {...ink} />
      <path d="M64 146 H136 L132 184 H68 Z" fill="var(--coffee, #6b4325)" {...ink} />
      <path d="M140 132 h10 a12 12 0 0 1 0 24 h-12" fill="none" {...ink} />
      <circle cx="100" cy="124" r="3.5" fill="var(--coffee, #6b4325)" />
      <circle cx="100" cy="134" r="2.5" fill="var(--coffee, #6b4325)" />
    </svg>
  );
}

function Shophouse() {
  return (
    <svg viewBox="0 0 200 200" className="h-full w-full" aria-hidden="true">
      <rect x="30" y="40" width="140" height="140" fill="#e7d9bf" {...ink} />
      <path d="M20 40 L100 10 L180 40 Z" fill="#b8584a" {...ink} />
      <path d="M30 90 H170 L160 110 H40 Z" fill="#e0475e" {...ink} />
      {[44, 66, 88, 110, 132].map((x) => (
        <rect key={x} x={x} y="118" width="22" height="62" fill="#9a6a3f" {...ink} strokeWidth={3} />
      ))}
      <rect x="60" y="54" width="80" height="26" rx="4" fill={C.caramel} {...ink} />
      <text x="100" y="73" textAnchor="middle" fontFamily="var(--font-chonburi)" fontSize="16" fill={C.ink}>
        บ้านกาแฟ
      </text>
    </svg>
  );
}
