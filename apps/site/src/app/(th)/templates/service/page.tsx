import type { Metadata } from "next";
import { Trirong } from "next/font/google";
import { BasicLanding } from "@/templates/basic/BasicLanding";
import { DemoBar } from "@/templates/basic/DemoBar";
import { service } from "@/templates/basic/configs/service";

/** Landing Basic template demo: a made-up hair salon and spa. Thai only, like the other demo shops. */

// soft, elegant looped Thai serif that suits a salon or spa for headings; a client can swap this for a font that fits their brand
const trirong = Trirong({ variable: "--font-tpl-display", subsets: ["thai", "latin"], weight: ["500"], display: "swap" });

export const metadata: Metadata = {
  title: "เทมเพลตงานบริการ (Landing Basic)",
  description: "ตัวอย่างเทมเพลต Landing Basic สำหรับร้านทำผม สปา และคลินิก: บริการพร้อมราคา ทีมงาน รีวิวลูกค้า และปุ่มจองคิวผ่าน LINE",
  alternates: { canonical: "/templates/service/" },
  // a fictional salon: keep it out of search results
  robots: { index: false, follow: true },
};

export default function ServiceTemplate() {
  return (
    <>
      <DemoBar themes={service.themes} backHref="/templates/" chooseHref="/#contact" />
      <BasicLanding c={service} displayFont={trirong.variable} />
    </>
  );
}
