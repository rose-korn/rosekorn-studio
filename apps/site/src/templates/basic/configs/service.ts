import type { BasicConfig } from "../types";

/**
 * Demo config: a made-up hair salon and spa. Every name, number, review and address here is fictional.
 * Photos: Unsplash (free under the Unsplash License, commercial use allowed), saved in public/templates/service/.
 * Source ids: hero 1633681926022, cut 1700760934268, color 1554519934, blowdry 1580618672591, hairspa 1634449571010,
 * massage 1544161515, facial 1761718210089, team-1 1562322140, team-2 1761839256840, team-3 1774660810725
 * (images.unsplash.com/photo-<id>).
 *
 * Kept to what Landing Basic promises: one page, 10 photos (hero + 6 services + 3 team).
 * Booking happens in LINE or by phone; no online calendar or deposit. A shop that needs live booking slots is a bigger package.
 */
const img = (f: string) => `/templates/service/${f}.webp`;
export const service: BasicConfig = {
  look: "calm",
  name: "ใบเตย แฮร์ แอนด์ สปา",
  kicker: "ร้านทำผมและสปาเล็ก ๆ ในซอยอารีย์",
  tagline: "ตัดผม ทำสี ทรีตเมนต์ และนวดผ่อนคลาย ในร้านเงียบ ๆ ที่ช่างดูแลคุณคนเดียวตั้งแต่ต้นจนจบ จองคิวทาง LINE ได้ทุกวัน",
  hero: { src: img("hero"), alt: "ในร้านใบเตย แฮร์ แอนด์ สปา" },
  cta: "จองคิวผ่าน LINE",
  about: {
    title: "ร้านเล็ก ที่ใส่ใจทุกคิว",
    body: "เราเปิดร้านมาตั้งแต่ปี 2561 รับลูกค้าทีละไม่กี่คน ไม่ต้องรอนาน ช่างจะคุยก่อนเริ่มทุกครั้งว่าอยากได้ทรงแบบไหน ใช้ผลิตภัณฑ์ที่อ่อนโยนกับหนังศีรษะ และมีห้องสปาแยกเป็นสัดส่วนสำหรับนวดและทำหน้า",
    facts: [
      { label: "เปิดมาแล้ว", value: "8 ปี" },
      { label: "ช่างประจำร้าน", value: "3 คน" },
      { label: "ลูกค้ากลับมาซ้ำ", value: "80%" },
    ],
  },
  highlights: {
    title: "บริการและราคา",
    layout: "menu",
    ask: { before: "อยากจองบริการไหน", after: "บอกวันและเวลาที่สะดวกได้เลย" },
    items: [
      { name: "ตัดผม สระ ไดร์", note: "รวมปรึกษาทรงผม ประมาณ 1 ชม.", price: "฿450", badge: "ยอดนิยม", pic: { src: img("cut"), alt: "ช่างกำลังตัดผม" } },
      { name: "ทำสีผม", note: "ผมยาวประบ่า เริ่มต้น", price: "฿1,500", pic: { src: img("color"), alt: "ผมทำสีไฮไลต์" } },
      { name: "สระไดร์ ทำลอน", note: "ก่อนออกงาน หรือวันสำคัญ", price: "฿350", pic: { src: img("blowdry"), alt: "ไดร์ผมด้วยแปรงกลม" } },
      { name: "ทรีตเมนต์สปาผม", note: "บำรุงหนังศีรษะ ผมนุ่มลื่น", price: "฿690", pic: { src: img("hairspa"), alt: "สระผมและทำทรีตเมนต์" } },
      { name: "นวดน้ำมันอโรมา", note: "60 นาที เลือกกลิ่นได้", price: "฿800", badge: "ใหม่", pic: { src: img("massage"), alt: "นวดน้ำมันอโรมา" } },
      { name: "ทำหน้า มาสก์ผิว", note: "45 นาที เหมาะกับผิวแพ้ง่าย", price: "฿900", pic: { src: img("facial"), alt: "ทำหน้าและมาสก์" } },
    ],
  },
  team: {
    title: "ทีมช่างของเรา",
    items: [
      { name: "พี่เตย", role: "เจ้าของร้าน ช่างตัดผม", note: "ถนัดทรงสั้นและผมบ็อบ", pic: { src: img("team-1"), alt: "พี่เตย ช่างตัดผม" } },
      { name: "พี่ฝน", role: "ช่างทำสีผม", note: "ทำสีมา 10 ปี ชอบโทนน้ำตาลอุ่น", pic: { src: img("team-2"), alt: "พี่ฝน ช่างทำสีผม" } },
      { name: "น้องมิว", role: "ช่างเกล้าผมและสปา", note: "รับเกล้าผมงานแต่งนอกสถานที่", pic: { src: img("team-3"), alt: "น้องมิว ช่างเกล้าผม" } },
    ],
  },
  reviews: {
    title: "รีวิวจากลูกค้า",
    score: "4.9 จาก 5",
    items: [
      { quote: "พี่เตยตัดบ็อบให้ทรงสวยมาก ไม่ต้องจัดเองเลยตอนเช้า มาตัดที่นี่ประจำแล้วค่ะ", name: "คุณนุ่น", where: "จองทาง LINE" },
      { quote: "ทำสีครั้งแรกกลัวผมเสีย แต่ช่างอธิบายละเอียด สีออกมาตรงที่อยากได้ ผมยังนุ่มอยู่", name: "คุณบีม", where: "Google Maps" },
      { quote: "นวดอโรมาหลังเลิกงาน ห้องเงียบ หลับไปเลย จองง่าย ทักแชทแป๊บเดียวได้คิว", name: "คุณเจ", where: "จองทาง LINE", stars: 5 },
    ],
  },
  howToOrder: {
    title: "จองคิวง่าย ๆ 3 ขั้นตอน",
    navLabel: "จองคิว",
    steps: [
      { title: "เลือกบริการ", body: "ดูบริการและราคาในหน้านี้ จะเลือกช่างคนไหนก็บอกได้" },
      { title: "ทัก LINE หรือโทร", body: "บอกวันและเวลาที่สะดวก ร้านเช็กคิวแล้วยืนยันให้ในแชท" },
      { title: "มาตามนัด", body: "ร้านส่งข้อความเตือนก่อน 1 วัน ถ้าติดธุระเลื่อนคิวได้ฟรี" },
    ],
    notes: ["เลื่อนคิวได้ก่อน 3 ชม.", "Walk-in ได้ถ้าคิวว่าง", "จอดรถหน้าร้านได้ 2 คัน", "จ่ายเงินสดหรือสแกนจ่ายที่ร้าน"],
  },
  hours: [
    { day: "อังคาร – ศุกร์", time: "10:00 – 20:00" },
    { day: "เสาร์ – อาทิตย์", time: "09:00 – 19:00" },
    { day: "จันทร์", time: "", closed: true },
  ],
  address: "12 ซอยอารีย์ 4 ถนนพหลโยธิน แขวงพญาไท เขตพญาไท กรุงเทพฯ",
  mapUrl: "https://maps.google.com/?q=Ari+Soi+4+Bangkok",
  contact: {
    lineId: "@baitoeyhair",
    lineUrl: "#contact",
    phone: "08x-xxx-xxxx",
    email: "hello@example.com",
    facebook: "#",
    instagram: "#",
  },
  form: {
    title: "จองคิว หรือถามก่อนก็ได้",
    lead: "ส่งรูปทรงผมที่อยากได้มาให้ดูก่อนได้ ช่างจะประเมินเวลาและราคาให้ ร้านตอบภายในวันเดียวกันในเวลาเปิด",
    placeholder: "อยากจองตัดผมวันเสาร์ช่วงบ่าย หรือสอบถามราคาทำสี",
  },
  themes: [
    { label: "ใบเตย", bg: "#eef3ec", surface: "#fbfdf9", ink: "#1b2a22", muted: "#53665a", accent: "#2f7a55", onAccent: "#fbfdf9", soft: "#d3e5d8" },
    { label: "ชมพูนู้ด", bg: "#f8eeec", surface: "#fffaf9", ink: "#2e1e1f", muted: "#735c5d", accent: "#b45764", onAccent: "#fffaf9", soft: "#f0d5d6" },
    { label: "ครีม", bg: "#f6f1e7", surface: "#fffdf8", ink: "#29231a", muted: "#6c6252", accent: "#8a6a35", onAccent: "#fffdf8", soft: "#e9dcc2" },
    { label: "กลางคืน", bg: "#1a1c1f", surface: "#25282c", ink: "#eef0f2", muted: "#adb3ba", accent: "#e3a6b0", onAccent: "#1a1c1f", soft: "#33373c" },
  ],
};
