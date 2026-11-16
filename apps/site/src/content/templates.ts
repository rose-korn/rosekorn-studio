import type { Locale } from "./index";
import type { IlloKind } from "@/templates/basic/Illo";

/** Landing Basic templates shown on /templates. `ready: false` ones are listed as coming soon. */
export type TemplateCard = { slug: string; illo: IlloKind; ready: boolean; name: string; forWho: string; sections: string };

const th: TemplateCard[] = [
  {
    slug: "cafe",
    illo: "latte",
    ready: true,
    name: "คาเฟ่ / ร้านอาหาร",
    forWho: "คาเฟ่ ร้านขนม ร้านอาหารเล็ก ๆ",
    sections: "เมนูแนะนำพร้อมราคา รูปบรรยากาศ เวลาเปิด แผนที่ ปุ่มสั่งหรือจองผ่าน LINE",
  },
  {
    slug: "shop",
    illo: "beans",
    ready: false,
    name: "ร้านค้า",
    forWho: "ร้านขายของ แบรนด์เล็ก ร้านออนไลน์ที่มีหน้าร้าน",
    sections: "สินค้าแนะนำ รีวิวลูกค้า วิธีสั่งซื้อ ช่องทางจ่ายเงิน",
  },
  {
    slug: "service",
    illo: "plant",
    ready: false,
    name: "งานบริการ",
    forWho: "คลินิก ร้านทำผม สปา สตูดิโอ",
    sections: "บริการและราคา ทีมงาน รีวิว ปุ่มจองคิว",
  },
];

const en: TemplateCard[] = [
  {
    slug: "cafe",
    illo: "latte",
    ready: true,
    name: "Cafe / restaurant",
    forWho: "Cafes, bakeries and small restaurants",
    sections: "Featured menu with prices, photos, opening hours, map, and order or booking through LINE",
  },
  {
    slug: "shop",
    illo: "beans",
    ready: false,
    name: "Shop",
    forWho: "Retail shops and small brands with a storefront",
    sections: "Featured products, customer reviews, how to order, payment options",
  },
  {
    slug: "service",
    illo: "plant",
    ready: false,
    name: "Services",
    forWho: "Clinics, hair salons, spas and studios",
    sections: "Services and prices, team, reviews, booking button",
  },
];

export const templateCards: Record<Locale, TemplateCard[]> = { th, en };

export const templatesCopy = {
  th: {
    metaTitle: "เทมเพลต Landing Basic",
    metaDescription: "เลือกเทมเพลตเว็บหน้าเดียวสำหรับร้าน แล้วเราปรับสี ฟอนต์ โลโก้ รูป และข้อความให้เป็นของร้านคุณ",
    eyebrow: "Landing Basic · templates",
    title: "เลือกแบบที่ชอบ",
    titleAccent: "แล้วเราแต่งให้เป็นร้านคุณ",
    lead: "Landing Basic เริ่มจากเทมเพลตที่ทำเสร็จแล้ว เราปรับสี ฟอนต์ โลโก้ ใส่รูปและข้อความของร้านคุณ ขึ้นเว็บพร้อมโดเมนได้ในราว 2 สัปดาห์",
    points: ["เลือกได้ 1 แบบ", "ปรับสีและฟอนต์ให้เข้าแบรนด์", "ใส่รูปร้าน 6–10 รูป", "แก้ได้ 1 รอบ"],
    open: "ดูตัวอย่าง →",
    soon: "กำลังทำ",
    forWho: "เหมาะกับ",
    has: "มีอะไรบ้าง",
    customTitle: "อยากได้หน้าตาที่ไม่เหมือนใคร?",
    customBody: "ถ้าอยากออกแบบใหม่ทั้งหน้า ไม่เริ่มจากเทมเพลต ดูแพ็กเกจ Landing Custom ได้เลย",
    customCta: "ดูแพ็กเกจทั้งหมด",
  },
  en: {
    metaTitle: "Landing Basic templates",
    metaDescription: "Pick a one-page template for your shop, and we adapt the colours, fonts, logo, photos and text to your brand.",
    eyebrow: "Landing Basic · templates",
    title: "Pick a layout you like,",
    titleAccent: "we make it yours",
    lead: "Landing Basic starts from a finished template. We change the colours, fonts and logo, add your photos and text, and put it live on your domain in about 2 weeks.",
    points: ["Choose 1 template", "Colours and fonts to match your brand", "6–10 photos of your shop", "1 round of changes"],
    open: "View sample →",
    soon: "In progress",
    forWho: "Best for",
    has: "What it includes",
    customTitle: "Want something no one else has?",
    customBody: "For a fully custom design that doesn’t start from a template, see the Landing Custom package.",
    customCta: "See all packages",
  },
} as const;
