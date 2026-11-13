/**
 * All copy and pricing for work.rosekorn.com lives here.
 * When the backend arrives, these can be swapped for API/CMS data with the same shapes.
 * Prices follow the studio plan: hours × 350 THB + 25% buffer, rounded.
 */

export const site = {
  name: "Rosekorn Studio",
  shortName: "Rosekorn",
  url: "https://work.rosekorn.com",
  description:
    "สตูดิโอรับทำเว็บไซต์ด้วย Next.js สำหรับร้านค้า คาเฟ่ และธุรกิจไทย ออกแบบเอง เร็ว ติด SEO รองรับ PromptPay และ LINE OA พร้อมส่งมอบโค้ดให้ดูแลต่อได้",
  // TODO: replace with the real LINE OA id once it is registered
  lineOaId: "@rosekorn",
  lineUrl: "https://line.me/R/ti/p/@rosekorn",
  // TODO: replace with the real Cal.com link (embedded booking comes in phase 4)
  bookingUrl: "https://cal.com/rosekorn/intro",
  email: "hello@rosekorn.com",
  cvUrl: "https://cv.rosekorn.com",
  openingNote: "เปิดรับงาน ม.ค. 2027",
  location: "Bangkok, TH",
} as const;

export const nav = [
  { href: "#work", label: "ผลงาน", en: "Work" },
  { href: "#packages", label: "แพ็กเกจ", en: "Packages" },
  { href: "#process", label: "ขั้นตอน", en: "Process" },
  { href: "#faq", label: "คำถาม", en: "FAQ" },
] as const;

export const marquee = [
  "Next.js",
  "ออกแบบเอง",
  "Responsive",
  "SEO พื้นฐาน",
  "PromptPay",
  "LINE OA",
  "Rust API",
  "PageSpeed 90+",
  "Shopify",
  "ส่งมอบโค้ดครบ",
] as const;

export type Project = {
  slug: string;
  title: string;
  kind: string;
  summary: string;
  url: string;
  tags: string[];
  year: string;
  palette: { bg: string; fg: string; accent: string };
  /** real screenshot in /public/work; without one the card draws a mock browser */
  image?: string;
  /** "contain" for wide images that must not be cropped (e.g. an OG banner) */
  fit?: "cover" | "contain";
  /** "live" links out; "soon" shows the card without a link */
  status: "live" | "soon";
  stamp: string;
};

export const projects: Project[] = [
  {
    slug: "valorant-list",
    title: "Valorant List",
    kind: "Web app · แฟนเมด ไทย/อังกฤษ",
    summary:
      "สมุดจด Valorant ภาษาไทย: เอเจนต์ สกิล แผนที่ callout ปืน สกิน แรงค์ พร้อมตัวดูโมเดล 3D และมินิเกมฝึกเอม ทั้งเว็บเป็น static ดึงข้อมูลจาก API ตอน build",
    url: "https://valo-thai.rosekorn.com/th",
    tags: ["Next.js 16", "Three.js", "TH / EN"],
    year: "2026",
    palette: { bg: "#f1e9dc", fg: "#1f1d22", accent: "#ff4655" },
    image: "/work/valorant-list.webp",
    fit: "contain",
    status: "live",
    stamp: "Live",
  },
  {
    slug: "workspace3d",
    title: "WorkSpace3D",
    kind: "3D web · ห้องทำงานออนไลน์",
    summary:
      "ห้องนั่งทำงานกับเพื่อนแบบ 3D หน้าตาเป็นตึกแถวรีโนเวทเป็นคาเฟ่ เดินด้วย WASD ขึ้นชั้น 2 ห้องเงียบ และแต่งตัวละครได้ 12 แบบ",
    url: "https://webspace3d.rosekorn.com",
    tags: ["Three.js", "React", "Cloudflare"],
    year: "2026",
    palette: { bg: "#e6d8c6", fg: "#2a2622", accent: "#d4566c" },
    image: "/work/workspace3d.webp",
    status: "live",
    stamp: "In progress",
  },
  {
    slug: "demo-cafe",
    title: "Baan Kafae",
    kind: "Landing page · คาเฟ่ (เว็บตัวอย่าง)",
    summary:
      "ร้านสมมติที่ทำขึ้นให้ดูเป็นตัวอย่าง: กาแฟ 3D เทจากกาแล้วไหลลงตามหน้าเว็บจนเต็มแก้วล่างสุด ป้ายเมนูกระดานชอล์กกดสั่งได้ เรื่องราวร้านแบบเลื่อนข้าง และแผนที่ หน้าตาแบบที่แพ็กเกจ Landing Signature จะได้",
    url: "/work/baan-kafae/",
    tags: ["Next.js", "Three.js", "GSAP", "LINE OA"],
    year: "2026",
    palette: { bg: "#2f3a2c", fg: "#f1e7d3", accent: "#d9a35b" },
    image: "/work/baan-kafae.webp",
    status: "live",
    stamp: "Demo",
  },
  {
    slug: "demo-fashion",
    title: "Sai Phrae Atelier",
    kind: "Landing page · แบรนด์แฟชั่น (เว็บตัวอย่าง)",
    summary:
      "แบรนด์แฟชั่นสมมติสไตล์ high fashion: ตัวอักษรใหญ่แบบนิตยสาร lookbook ที่เลื่อนข้างทีละลุค เรื่องผ้าทอมือ และนัดลองชุดผ่าน LINE อีกหน้าตาหนึ่งของแพ็กเกจ Landing Signature",
    url: "/work/sai-phrae/",
    tags: ["Next.js", "GSAP", "Lookbook", "LINE OA"],
    year: "2026",
    palette: { bg: "#efebe4", fg: "#0d0d0d", accent: "#6e1423" },
    image: "/work/sai-phrae.webp",
    status: "live",
    stamp: "Demo",
  },
  {
    slug: "demo-shop",
    title: "Pha Thai Goods",
    kind: "Online shop · ร้านผ้าทอ",
    summary:
      "ร้านออนไลน์ครบระบบ: ตะกร้า ค่าส่งคำนวณอัตโนมัติ ตัดสต็อก และจ่ายผ่าน PromptPay หลังบ้านเป็น Rust API",
    url: "https://shop.rosekorn.com",
    tags: ["Next.js", "Rust API", "PromptPay"],
    year: "2026",
    palette: { bg: "#7a2534", fg: "#f6e9e3", accent: "#e8b86b" },
    status: "soon",
    stamp: "เร็ว ๆ นี้",
  },
];

export type Package = {
  id: string;
  name: string;
  th: string;
  price: string;
  priceNote?: string;
  /** launch-promo price, shown next to the struck-through normal price while launchPromo.active */
  promoPrice?: string;
  /** shown but taped shut ("SOON"): not taking this kind of work yet */
  soon?: boolean;
  delivery: string;
  features: string[];
  featured?: boolean;
  cta: string;
};

export const packages: Package[] = [
  {
    id: "landing-basic",
    name: "Landing Basic",
    th: "เริ่มต้นออนไลน์ให้ไว",
    price: "4,500",
    delivery: "~2 สัปดาห์",
    features: ["เทมเพลตปรับสีและเนื้อหาให้เข้าแบรนด์", "1 หน้า พร้อมฟอร์มติดต่อ", "Responsive ทุกหน้าจอ"],
    cta: "เริ่มแพ็กเกจนี้",
  },
  {
    id: "landing-custom",
    name: "Landing Custom",
    th: "ออกแบบใหม่ทั้งหน้า",
    price: "8,900",
    promoPrice: "7,565",
    delivery: "~3 สัปดาห์",
    features: [
      "ออกแบบเองทั้งหมด ไม่ใช้เทมเพลต",
      "สร้างด้วย Next.js โหลดไว",
      "SEO พื้นฐาน + Open Graph",
      "แก้ได้ 2 รอบ",
    ],
    featured: true,
    cta: "เลือกแพ็กเกจยอดนิยม",
  },
  {
    id: "landing-signature",
    name: "Landing Signature",
    th: "จัดเต็ม 3D และลูกเล่น",
    price: "35,000",
    promoPrice: "29,750",
    delivery: "~6 สัปดาห์",
    features: [
      "ฉาก 3D (Three.js) ออกแบบเฉพาะแบรนด์",
      "เล่าเรื่องด้วยอนิเมชันตอนเลื่อน (GSAP)",
      "เมนูหรือแคตตาล็อกกดสั่งต่อเข้า LINE",
      "ภาพวาดประกอบเฉพาะร้าน แก้ได้ 3 รอบ",
    ],
    cta: "นัดคุยหน้าแบบนี้",
  },
  {
    id: "shop-starter",
    name: "Shop Starter",
    th: "เปิดร้านบนแพลตฟอร์ม",
    price: "22,000",
    delivery: "~7 สัปดาห์",
    // e-commerce is paused: too heavy alongside korn's day job (Nov 2026)
    soon: true,
    features: [
      "ตั้งค่า Shopify หรือ WooCommerce",
      "ปรับธีมให้เข้ากับแบรนด์",
      "ลงสินค้าให้ 20 ชิ้น",
    ],
    cta: "เริ่มแพ็กเกจนี้",
  },
  {
    id: "shop-custom",
    name: "Shop Custom",
    th: "ร้านค้าเขียนเองทั้งระบบ",
    price: "80,000",
    priceNote: "เริ่มต้น",
    soon: true,
    delivery: "คุยก่อนตั้งราคา",
    features: [
      "Next.js + Rust API",
      "ตะกร้า ชำระเงิน PromptPay",
      "หลังบ้านจัดการสินค้าและออเดอร์",
    ],
    cta: "นัดคุยขอบเขตงาน",
  },
];

/**
 * Launch promo for the first 10 clients. Update `taken` by hand as deals close
 * (moves to the backend later); set `active: false` to hide it everywhere.
 */
export const launchPromo = {
  active: true,
  total: 10,
  taken: 0,
  until: "31 มี.ค. 2570",
  headline: "โปรเปิดตัว 10 ลูกค้าแรก",
  offer: "ลด 15% ทุกแพ็กเกจที่เปิดรับ (ยกเว้น Landing Basic) + Care Plan ฟรี 3 เดือน มูลค่า ฿4,500",
  condition: "ขอแค่ให้เรานำงานไปลงหน้าผลงาน และเขียนรีวิวให้ 1 รีวิว",
} as const;

export const addons = [
  { name: "ใส่ 3D หรืออนิเมชันตอนเลื่อน 1 จุด (กับ Landing Custom)", price: "6,000–9,000" },
  { name: "เชื่อม Payment / PromptPay", price: "3,500–4,500" },
  { name: "ตั้งค่า LINE OA: ข้อความต้อนรับ ตอบกลับอัตโนมัติ Rich menu", price: "2,500" },
  { name: "ส่งฟอร์มหรือออเดอร์จากเว็บเข้า LINE ร้านทันที", price: "3,500–5,000" },
  { name: "ติด Facebook Pixel หรือ GA4", price: "1,000–1,500 / รายการ" },
  { name: "แก้งานนอกขอบเขต", price: "350 / ชม." },
] as const;

export const carePlan = {
  name: "Care Plan",
  th: "ดูแลรายเดือน",
  price: "1,500",
  features: ["Hosting และโดเมนต่ออายุให้", "แก้บั๊กเมื่อเจอปัญหา", "อัปเดตเนื้อหาได้สูงสุด 3 ชม. / เดือน"],
} as const;

export const process = [
  {
    title: "คุยโจทย์",
    en: "Discover",
    body: "จองคิวคุย 30 นาทีฟรี เล่าธุรกิจ ลูกค้า และสิ่งที่อยากให้เว็บทำ",
  },
  {
    title: "ใบเสนอราคา",
    en: "Proposal",
    body: "สรุปเป็นลายลักษณ์อักษร ระบุชัดทั้งสิ่งที่ “รวม” และ “ไม่รวม” ไม่มีค่าใช้จ่ายแอบแฝง",
  },
  {
    title: "มัดจำ 50% แล้วเริ่มงาน",
    en: "Design & Build",
    body: "ออกแบบและพัฒนา ส่งลิงก์ให้ดูความคืบหน้า แก้ได้ 2 รอบ",
  },
  {
    title: "ส่งมอบ",
    en: "Launch & Handover",
    body: "ชำระส่วนที่เหลือ 50% รับโดเมน โค้ด README และ docker-compose ใครมาดูแลต่อก็รันได้ในคำสั่งเดียว",
  },
] as const;

export const principles = [
  {
    title: "เร็วบนมือถือ",
    body: "ลูกค้าไทยเกือบทั้งหมดเข้าเว็บจากมือถือ เราตั้งเป้า PageSpeed 90+ ทุกงาน",
  },
  {
    title: "คุยภาษาเดียวกับลูกค้า",
    body: "LINE OA, PromptPay, ค่าส่งแบบไทย ใส่มาให้ตั้งแต่แรก ไม่ต้องดัดแปลงทีหลัง",
  },
  {
    title: "เป็นเจ้าของโค้ดเอง",
    body: "ส่งมอบซอร์สโค้ดครบพร้อมเอกสาร จะเปลี่ยนคนดูแลเมื่อไรก็ได้ ไม่ถูกล็อก",
  },
] as const;

export const faqs = [
  {
    q: "ราคานี้รวมโดเมนและโฮสติ้งไหม",
    a: "ไม่รวมค่าโดเมน รูปสินค้า และการเขียนคำบรรยาย ทุกอย่างจะระบุไว้ในใบเสนอราคาชัดเจน ถ้าสมัคร Care Plan เราดูแล hosting และต่ออายุให้",
  },
  {
    q: "ชำระเงินอย่างไร",
    a: "มัดจำ 50% ก่อนเริ่มงาน และอีก 50% ก่อนส่งมอบโดเมนและโค้ด โอนผ่าน PromptPay หรือบัญชีธนาคารได้",
  },
  {
    q: "แก้งานได้กี่ครั้ง",
    a: "แก้ได้ 2 รอบในขอบเขตงานที่ตกลงกัน ถ้าต้องการเพิ่มนอกขอบเขต เราจะออกใบเสนอราคาใหม่เป็นลายลักษณ์อักษร คิด 350 บาท/ชม.",
  },
  {
    q: "ถ้าวันหนึ่งอยากเปลี่ยนคนดูแลเว็บ",
    a: "ทำได้เลย ทุกงานส่งมอบพร้อม README และ docker-compose ส่วน API ก็แยกเป็น service ถอดเปลี่ยนได้โดยไม่ต้องรื้อหน้าเว็บ",
  },
  {
    q: "รับงานประเภทไหนบ้าง",
    a: "เน้นร้านค้า คาเฟ่ ร้านอาหาร แบรนด์สินค้า และธุรกิจบริการ ที่อยากมีเว็บของตัวเองแทนการพึ่งแพลตฟอร์มอย่างเดียว",
  },
] as const;
