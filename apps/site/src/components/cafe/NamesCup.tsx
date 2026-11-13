"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { C } from "./palette";
import { canUse3D, useRoast } from "./CafeHeroVisual";
import { HeroCup } from "./HeroCup";

/**
 * "Whatever you call it": the word in the sticker keeps flipping through names people use for
 * their cup, next to a 3D cup that turns to follow the mouse (MOVE THE MOUSE / in your hands).
 */
const CupScene = dynamic(() => import("./CupScene"), { ssr: false });

const names = ["กาแฟ", "โอเลี้ยง", "Kafae", "Coffee", "กาแฟแก้วแรก", "ของโปรดตอนเช้า"];

export function NamesCup() {
  const word = useRef<HTMLSpanElement>(null);
  const frame = useRef<HTMLDivElement>(null);
  const roast = useRoast();
  const [i, setI] = useState(0);
  const [use3D, setUse3D] = useState(false);
  const [visible, setVisible] = useState(false);
  const [coarse, setCoarse] = useState(false);

  useEffect(() => {
    setUse3D(canUse3D());
    setCoarse(window.matchMedia("(pointer: coarse)").matches);
    const el = frame.current;
    if (!el || !("IntersectionObserver" in window)) return setVisible(true);
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { rootMargin: "200px" });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // flip to the next name every ~1.7s while on screen
  useEffect(() => {
    if (!visible || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => {
      const el = word.current;
      if (!el) return;
      gsap.to(el, {
        yPercent: -110,
        rotate: -6,
        duration: 0.28,
        ease: "power2.in",
        onComplete: () => {
          setI((n) => (n + 1) % names.length);
          gsap.fromTo(el, { yPercent: 110, rotate: 6 }, { yPercent: 0, rotate: 0, duration: 0.55, ease: "back.out(2.2)" });
        },
      });
    }, 1700);
    return () => window.clearInterval(id);
  }, [visible]);

  return (
    <section className="relative py-24 md:py-32" style={{ background: C.bg }}>
      <div data-river-via="0.04" className="absolute left-0 top-1/2 h-0" aria-hidden="true" />
      <div className="container-x relative z-[2] grid items-center gap-14 md:grid-cols-[1.15fr_1fr]">
        <div>
          <p className="font-mono text-xs tracking-[0.25em]" style={{ color: C.caramel }}>
            WHATEVER YOU CALL IT
          </p>
          <h2 className="mt-5 font-[family-name:var(--font-chonburi)] text-[clamp(2.4rem,6vw,5rem)] leading-[1.2]">
            จะเรียกว่า
            <br />
            <span
              className="relative my-2 inline-flex h-[1.35em] items-center overflow-hidden rounded-2xl border-[3px] px-4 align-middle"
              style={{ background: C.caramel, color: C.ink, borderColor: C.ink, boxShadow: `5px 5px 0 ${C.ink}`, rotate: "-2deg" }}
            >
              <span ref={word} className="inline-block whitespace-nowrap" aria-live="off">
                {names[i]}
              </span>
            </span>
            <br />
            ก็ได้หมด
          </h2>
          <p className="mt-7 max-w-md text-lg opacity-85">
            ป้าข้างบ้านเรียกโอเลี้ยง พี่ออฟฟิศเรียกอเมริกาโน่ ส่วนเราเรียกมันว่าช่วงเวลาดี ๆ ของวัน ที่ร้านเราชงให้ทุกแบบ
          </p>
          <ul className="mt-6 flex flex-wrap gap-2 text-sm" aria-label="ชื่อที่ลูกค้าเรียก">
            {names.map((n) => (
              <li key={n} className="rounded-full border-2 px-3 py-1" style={{ borderColor: `${C.cream}55` }}>
                {n}
              </li>
            ))}
          </ul>
        </div>

        <div className="relative mx-auto w-full max-w-[420px]" style={{ rotate: "-1.5deg" }}>
          <span className="tape absolute -top-3 left-1/2 z-10 h-6 w-28 -translate-x-1/2 rotate-2" aria-hidden="true" />
          <div
            ref={frame}
            className="relative aspect-square w-full overflow-hidden rounded-[1.5rem] border-[3px]"
            style={{ background: "#f7a8c4", borderColor: C.ink, boxShadow: `8px 8px 0 ${C.ink}` }}
            data-cursor={use3D ? "คลิก = หมุนแก้ว" : undefined}
          >
            <div className="pointer-events-none absolute inset-3 rounded-[1rem] border-2 border-dashed opacity-40" style={{ borderColor: C.ink }} aria-hidden="true" />
            {use3D ? (
              <CupScene roast={roast} active={visible} />
            ) : (
              <div className="absolute inset-[12%]">
                <HeroCup />
              </div>
            )}
            <p className="pointer-events-none absolute left-5 top-5 font-mono text-[10px] font-bold tracking-[0.25em]" style={{ color: C.ink }}>
              {coarse ? "SCROLL TO TURN" : "MOVE THE MOUSE"}
            </p>
            <span
              className="stamp pointer-events-none absolute bottom-5 right-4 rotate-6 font-mono text-[11px]"
              style={{ background: C.cream, color: C.ink, borderColor: C.ink }}
            >
              in your hands ✿
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
