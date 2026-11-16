import type { BasicConfig } from "../types";

/**
 * Demo config: a made-up cafe. Every name, number and address here is fictional.
 * Photos: Unsplash (free under the Unsplash License, commercial use allowed), saved in public/templates/cafe/.
 * Source ids: hero 1667910662650, latte 1541167760496, pourover 1582768772255, croissant 1691480162735,
 * cake 1571115177098, toast 1631359544940, beans 1562051036, window 1782050419194, bar 1442512595331,
 * table 1561668131, pastry 1623334044303, sack 1524350876685, latte art 1529892485617 (images.unsplash.com/photo-<id>).
 */
const img = (f: string) => `/templates/cafe/${f}.webp`;
export const cafe: BasicConfig = {
  name: "มะลิ สโลว์บาร์",
  kicker: "คาเฟ่เล็ก ๆ ในซอยนิมมาน 7",
  tagline: "กาแฟดริปจากดอยใกล้บ้าน ขนมอบเช้าทุกวัน และโต๊ะริมหน้าต่างที่นั่งได้ทั้งบ่าย",
  hero: { src: img("hero"), illo: "storefront", alt: "ในร้านมะลิ สโลว์บาร์" },
  about: {
    title: "ร้านเล็ก ที่ตั้งใจทุกแก้ว",
    body: "เราคั่วเมล็ดเองสัปดาห์ละสองครั้ง ใช้นมจากฟาร์มในแม่ริม และอบขนมทุกเช้าก่อนเปิดร้าน มานั่งทำงาน นั่งอ่านหนังสือ หรือแวะซื้อกลับบ้านก็ได้",
    facts: [
      { label: "ที่นั่ง", value: "18" },
      { label: "ปลั๊กไฟ", value: "มี" },
      { label: "ที่จอดรถ", value: "4 คัน" },
    ],
  },
  highlights: {
    title: "เมนูแนะนำ",
    items: [
      { name: "ลาเต้มะลิ", note: "เมนูประจำร้าน หอมดอกมะลิอ่อน ๆ", price: "฿85", pic: { src: img("latte"), illo: "latte", alt: "ลาเต้มะลิ" } },
      { name: "ดริปดอยช้าง", note: "คั่วกลาง เปรี้ยวผลไม้", price: "฿90", pic: { src: img("pourover"), illo: "pourover", alt: "กาแฟดริป" } },
      { name: "ครัวซองต์เนยสด", note: "อบเช้าทุกวัน", price: "฿65", pic: { src: img("croissant"), illo: "croissant", alt: "ครัวซองต์" } },
      { name: "เค้กกาแฟชั้น", note: "ใช้เอสเปรสโซของร้าน", price: "฿95", pic: { src: img("cake"), illo: "cake", alt: "เค้กกาแฟชั้น" } },
      { name: "เฟรนช์โทสต์สตรอว์เบอร์รี", note: "สตรอว์เบอร์รีสะเมิง", price: "฿120", pic: { src: img("toast"), illo: "toast", alt: "เฟรนช์โทสต์สตรอว์เบอร์รี" } },
      { name: "เมล็ดคั่วบ้าน 200 ก.", note: "ซื้อกลับไปชงเองที่บ้าน", price: "฿320", pic: { src: img("beans"), illo: "beans", alt: "ถุงเมล็ดกาแฟ" } },
    ],
  },
  gallery: {
    title: "บรรยากาศในร้าน",
    items: [
      { src: img("g-window"), illo: "window", alt: "โต๊ะริมหน้าต่าง", caption: "โต๊ะริมหน้าต่าง แดดบ่ายกำลังดี" },
      { src: img("g-bar"), illo: "pourover", alt: "บาร์ดริป", caption: "บาร์ดริป นั่งดูชงได้" },
      { src: img("g-table"), illo: "plant", alt: "โต๊ะมุมต้นไม้", caption: "โต๊ะมุมต้นไม้ นั่งชิลทั้งบ่าย" },
      { src: img("g-pastry"), illo: "croissant", alt: "ขนมอบเช้า", caption: "ขนมออกจากเตา 8 โมง" },
      { src: img("g-sack"), illo: "beans", alt: "เมล็ดคั่วเอง", caption: "คั่วเองทุกจันทร์กับพฤหัส" },
      { src: img("g-latte"), illo: "latte", alt: "ลาเต้อาร์ต", caption: "ลาเต้อาร์ตทุกแก้ว" },
    ],
  },
  hours: [
    { day: "จันทร์ – อังคาร", time: "08:00 – 17:00" },
    { day: "พุธ", time: "", closed: true },
    { day: "พฤหัส – ศุกร์", time: "08:00 – 17:00" },
    { day: "เสาร์ – อาทิตย์", time: "07:30 – 18:00" },
  ],
  address: "12/3 ซอยนิมมานเหมินท์ 7 ต.สุเทพ อ.เมือง จ.เชียงใหม่",
  mapUrl: "https://maps.google.com/?q=Nimmanhaemin+Soi+7+Chiang+Mai",
  contact: {
    lineId: "@malislowbar",
    lineUrl: "#contact",
    phone: "08x-xxx-xxxx",
    email: "hello@example.com",
    facebook: "#",
    instagram: "#",
  },
  form: { title: "จองโต๊ะ สั่งเค้ก หรือถามอะไรก็ได้", lead: "ทักมาได้ทุกช่องทาง ร้านตอบภายในวันเดียวกันในเวลาเปิด" },
  themes: [
    { label: "นมอุ่น", bg: "#f6efe4", surface: "#fffaf2", ink: "#2b2118", muted: "#6e5d4e", accent: "#c4643a", onAccent: "#fffaf2", soft: "#ecd9c0" },
    { label: "มัทฉะ", bg: "#eef0e4", surface: "#fbfcf5", ink: "#1f2a1c", muted: "#55634c", accent: "#4f7a34", onAccent: "#fbfcf5", soft: "#d6e2c2" },
    { label: "ชมพู", bg: "#fbefee", surface: "#fffafa", ink: "#2c1a1e", muted: "#74575d", accent: "#d2566f", onAccent: "#fffafa", soft: "#f4d3d7" },
    { label: "กลางคืน", bg: "#1e1a17", surface: "#2a2420", ink: "#f4ece1", muted: "#bfb0a0", accent: "#e8a54b", onAccent: "#1e1a17", soft: "#3a322b" },
  ],
};
