import type { Metadata } from "next";
import { Mitr } from "next/font/google";
import { BasicLanding } from "@/templates/basic/BasicLanding";
import { DemoBar } from "@/templates/basic/DemoBar";
import { shop } from "@/templates/basic/configs/shop";

/** Landing Basic template demo: a made-up shop. Thai only, like the other demo shops. */

// rounded, friendly Thai display face for headings; a client can swap this for a font that fits their brand
const mitr = Mitr({ variable: "--font-tpl-display", subsets: ["thai", "latin"], weight: ["500"], display: "swap" });

export const metadata: Metadata = {
  title: "เทมเพลตร้านค้า (Landing Basic)",
  description: "ตัวอย่างเทมเพลต Landing Basic สำหรับร้านค้าและแบรนด์เล็ก: สินค้าแนะนำ รีวิวลูกค้า วิธีสั่งซื้อ ช่องทางจ่ายเงิน และปุ่ม LINE",
  alternates: { canonical: "/templates/shop/" },
  // a fictional shop: keep it out of search results
  robots: { index: false, follow: true },
};

export default function ShopTemplate() {
  return (
    <>
      <DemoBar themes={shop.themes} backHref="/templates/" chooseHref="/#contact" />
      <BasicLanding c={shop} displayFont={mitr.variable} />
    </>
  );
}
