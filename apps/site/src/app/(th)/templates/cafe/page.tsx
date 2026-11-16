import type { Metadata } from "next";
import { Pridi } from "next/font/google";
import { BasicLanding } from "@/templates/basic/BasicLanding";
import { DemoBar } from "@/templates/basic/DemoBar";
import { cafe } from "@/templates/basic/configs/cafe";

/** Landing Basic template demo: a made-up cafe. Thai only, like the other demo shops. */

// warm Thai serif for headings; a client can swap this for a font that fits their brand
const pridi = Pridi({ variable: "--font-tpl-display", subsets: ["thai", "latin"], weight: ["500"], display: "swap" });

export const metadata: Metadata = {
  title: "เทมเพลตคาเฟ่ (Landing Basic)",
  description: "ตัวอย่างเทมเพลต Landing Basic สำหรับคาเฟ่และร้านอาหาร: เมนูแนะนำ รูปร้าน เวลาเปิด แผนที่ และปุ่ม LINE",
  alternates: { canonical: "/templates/cafe/" },
  // a fictional shop: keep it out of search results
  robots: { index: false, follow: true },
};

export default function CafeTemplate() {
  return (
    <>
      <DemoBar themes={cafe.themes} backHref="/templates/" chooseHref="/#contact" />
      <BasicLanding c={cafe} displayFont={pridi.variable} />
    </>
  );
}
