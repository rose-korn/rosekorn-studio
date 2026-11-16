import type { BasicConfig } from "../types";

/**
 * Demo config: a made-up shop of handmade soap and home scents. Every name, number, review and account here is fictional.
 *
 * Photos: Unsplash (free under the Unsplash License, commercial use allowed), saved in public/templates/shop/.
 * Source ids: hero 1601647998384, soap 1781080922537, candle 1603905179139, oil 1671493234254,
 * mug 1495100497150, tote 1544816155, gift 1607920592831 (images.unsplash.com/photo-<id>).
 *
 * Kept to what Landing Basic promises: one page, 7 photos (hero + 6 products), no cart or checkout.
 * Customers order in LINE or by phone and pay by PromptPay or bank transfer shown on the page.
 * A shop that needs a cart, stock or online payment is a bigger package, not this template.
 */
const img = (f: string) => `/templates/shop/${f}.webp`;

export const shop: BasicConfig = {
  name: "ฮอมฮอม",
  kicker: "สบู่และกลิ่นหอมทำมือ จากเชียงใหม่",
  tagline: "สบู่ก้อน เทียนหอม และของใช้ในบ้าน ทำมือทีละล็อตเล็ก ๆ ส่งทั่วประเทศ หรือแวะมาดมกลิ่นที่หน้าร้านก็ได้",
  hero: { src: img("hero"), illo: "shelf", alt: "ชั้นวางสินค้าในร้านฮอมฮอม" },
  cta: "สั่งซื้อผ่าน LINE",
  about: {
    title: "ของหอม ๆ ที่ทำเองทุกชิ้น",
    body: "เราเริ่มจากทำสบู่ใช้เองในครัวหลังบ้าน ตอนนี้มีหน้าร้านเล็ก ๆ ในย่านวัดเกต ใช้น้ำมันพืชและสมุนไพรจากฟาร์มใกล้เชียงใหม่ ไม่ใส่สีสังเคราะห์ ห่อด้วยกระดาษสาที่ใช้ซ้ำได้",
    facts: [
      { label: "ส่งทั่วประเทศ", value: "1–2 วัน" },
      { label: "ลูกค้าประจำ", value: "2,000+" },
      { label: "ทำมือทุกชิ้น", value: "100%" },
    ],
  },
  highlights: {
    title: "สินค้าแนะนำ",
    layout: "cards",
    items: [
      { name: "สบู่ตะไคร้ใบมะกรูด", note: "ก้อน 100 ก. หอมสดชื่น", price: "฿120", badge: "ขายดี", pic: { src: img("soap"), illo: "soap", alt: "สบู่ตะไคร้ใบมะกรูด" } },
      { name: "เทียนหอมดอกมะลิ", note: "ไขถั่วเหลือง จุดได้ 30 ชม.", price: "฿290", pic: { src: img("candle"), illo: "candle", alt: "เทียนหอมดอกมะลิ" } },
      { name: "น้ำมันนวดไพล", note: "ขวด 50 มล.", price: "฿220", pic: { src: img("oil"), illo: "bottle", alt: "น้ำมันนวดไพล" } },
      { name: "แก้วเซรามิกปั้นมือ", note: "ลายไม่ซ้ำกันสักใบ", price: "฿350", badge: "ใหม่", pic: { src: img("mug"), illo: "mug", alt: "แก้วเซรามิกปั้นมือ" } },
      { name: "ถุงผ้าฮอมฮอม", note: "ผ้าฝ้ายทอมือ ใส่ของได้เยอะ", price: "฿190", pic: { src: img("tote"), illo: "tote", alt: "ถุงผ้า" } },
      { name: "ชุดของขวัญ 3 ชิ้น", note: "สบู่ + เทียน + การ์ดเขียนมือ", price: "฿590", badge: "ของขวัญ", pic: { src: img("gift"), illo: "giftbox", alt: "ชุดของขวัญ" } },
    ],
  },
  reviews: {
    title: "รีวิวจากลูกค้า",
    score: "4.9 จาก 5",
    items: [
      { quote: "สบู่ตะไคร้หอมมาก ใช้แล้วผิวไม่แห้ง สั่งซ้ำรอบที่สามแล้วค่ะ", name: "คุณแพร", where: "สั่งทาง LINE" },
      { quote: "ซื้อชุดของขวัญไปให้แม่ ห่อมาน่ารัก มีการ์ดเขียนมือด้วย แม่ชอบมาก", name: "คุณต้น", where: "ลูกค้าหน้าร้าน" },
      { quote: "ตอบแชทไว ส่งไวจริง สั่งเย็นวันจันทร์ ได้ของวันพุธที่กรุงเทพฯ", name: "คุณมายด์", where: "สั่งทาง LINE", stars: 5 },
    ],
  },
  howToOrder: {
    title: "สั่งซื้อง่าย ๆ 4 ขั้นตอน",
    steps: [
      { title: "เลือกสินค้า", body: "ดูสินค้าในหน้านี้ จดชื่อและจำนวนที่อยากได้" },
      { title: "ทัก LINE หรือโทร", body: "บอกชื่อสินค้า ชื่อผู้รับ และที่อยู่จัดส่ง ร้านสรุปยอดให้" },
      { title: "โอนเงิน ส่งสลิป", body: "จ่ายผ่านพร้อมเพย์หรือโอนเข้าบัญชี แล้วส่งสลิปในแชท" },
      { title: "รอรับของ", body: "ส่งภายใน 1–2 วันทำการ พร้อมเลขพัสดุทาง LINE" },
    ],
    notes: ["ค่าส่ง ฿50 ทั่วประเทศ", "ซื้อครบ ฿800 ส่งฟรี", "มารับเองที่หน้าร้านได้", "รับห่อของขวัญฟรี"],
  },
  payment: {
    title: "ช่องทางชำระเงิน",
    lead: "โอนแล้วส่งสลิปทาง LINE ร้านจะยืนยันยอดและแจ้งเลขพัสดุให้",
    promptPay: { id: "08x-xxx-xxxx", name: "ร้านฮอมฮอม (ตัวอย่าง)" },
    banks: [
      { bank: "ธนาคารกสิกรไทย", number: "xxx-x-xxxxx-x", name: "บัญชี ร้านฮอมฮอม (ตัวอย่าง)" },
      { bank: "ธนาคารไทยพาณิชย์", number: "xxx-x-xxxxx-x", name: "บัญชี ร้านฮอมฮอม (ตัวอย่าง)" },
    ],
    others: ["เก็บเงินปลายทาง เพิ่ม ฿30", "ที่หน้าร้าน จ่ายเงินสดหรือสแกนจ่ายได้"],
  },
  visitTitle: "หน้าร้าน แวะมาดมกลิ่นได้",
  hours: [
    { day: "อังคาร – ศุกร์", time: "10:00 – 19:00" },
    { day: "เสาร์ – อาทิตย์", time: "09:00 – 20:00" },
    { day: "จันทร์", time: "", closed: true },
  ],
  address: "45 ถนนเจริญราษฎร์ ต.วัดเกต อ.เมือง จ.เชียงใหม่",
  mapUrl: "https://maps.google.com/?q=Charoenrat+Road+Chiang+Mai",
  contact: {
    lineId: "@homhomshop",
    lineUrl: "#contact",
    phone: "08x-xxx-xxxx",
    email: "hello@example.com",
    facebook: "#",
    instagram: "#",
  },
  form: {
    title: "สั่งซื้อ สั่งทำของขวัญ หรือถามอะไรก็ได้",
    lead: "ทักมาได้ทุกช่องทาง ร้านตอบภายในวันเดียวกันในเวลาเปิด สั่งจำนวนมากสำหรับงานแต่งหรือของชำร่วย ก็คุยกันได้",
    placeholder: "อยากสั่งสินค้า สอบถามกลิ่น หรือสั่งชุดของขวัญ",
  },
  themes: [
    { label: "ตะไคร้", bg: "#f1f2e6", surface: "#fcfdf6", ink: "#1f2619", muted: "#5a6450", accent: "#6f8f2e", onAccent: "#fcfdf6", soft: "#dde6c4" },
    { label: "ดินเผา", bg: "#f7ece4", surface: "#fffaf6", ink: "#2d1d16", muted: "#715a4d", accent: "#b9542f", onAccent: "#fffaf6", soft: "#efd4c3" },
    { label: "ลาเวนเดอร์", bg: "#f2eff8", surface: "#fcfbff", ink: "#221d30", muted: "#5f5873", accent: "#7458b0", onAccent: "#fcfbff", soft: "#ddd5ef" },
    { label: "กลางคืน", bg: "#1b1d1a", surface: "#262924", ink: "#eef0e6", muted: "#b2b8a6", accent: "#c9d36a", onAccent: "#1b1d1a", soft: "#353a31" },
  ],
};
