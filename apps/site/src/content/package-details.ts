/**
 * The long version of each package, shown in its "details" modal: the headline selling point,
 * who it suits, everything included, what costs extra, how revisions work, and what the
 * Care Plan does and does not cover for that kind of site. Prices still come from site.ts.
 */
import type { Locale } from "./index";

export type PackageDetails = {
  /** one-line selling point, also shown on the card */
  highlight: string;
  bestFor: string;
  includes: string[];
  extras: { name: string; price: string }[];
  revisions: string;
  care: { covered: string[]; notCovered: string[] };
};

export type CareDetails = {
  lead: string;
  covered: string[];
  notCovered: string[];
  terms: string[];
};

const th: Record<string, PackageDetails> = {
  "landing-basic": {
    highlight: "ออนไลน์ใน 2 สัปดาห์ ในงบที่เบาที่สุด",
    bestFor: "ร้านที่อยากมีเว็บไว้ให้ลูกค้าค้นเจอใน Google และกดติดต่อได้ทันที",
    includes: [
      "เลือกเทมเพลต 1 แบบ แล้วปรับสี ฟอนต์ และโลโก้ให้เข้าแบรนด์",
      "1 หน้า: แนะนำร้าน บริการ รูป 6–10 รูป แผนที่ และเวลาเปิด",
      "ฟอร์มติดต่อส่งเข้าอีเมลร้าน",
      "ปุ่มแอด LINE และปุ่มโทรออก",
      "ขึ้นเว็บบน Cloudflare พร้อม HTTPS",
    ],
    extras: [
      { name: "เพิ่มหน้า เช่น เมนูหรือราคา", price: "1,500 / หน้า" },
      { name: "ตั้งค่า LINE OA: ข้อความต้อนรับ ตอบกลับอัตโนมัติ Rich menu", price: "2,500" },
      { name: "ติด GA4 หรือ Facebook Pixel", price: "1,000–1,500" },
      { name: "อัปเกรดเป็น Landing Custom ภายหลัง", price: "จ่ายเพิ่มเฉพาะส่วนต่าง" },
    ],
    revisions: "แก้ได้ 1 รอบ (รวบรวมรายการแก้ส่งมาครั้งเดียว) เกินจากนั้นคิด ฿350 ต่อชั่วโมง",
    care: {
      covered: ["เว็บล่มหรือแสดงผลผิด แก้ให้", "เปลี่ยนรูป ข้อความ เวลาเปิด และราคา", "ต่ออายุโฮสติ้งและโดเมนให้ก่อนหมด"],
      notCovered: ["เปลี่ยนเทมเพลตหรือออกแบบใหม่", "เพิ่มหน้าใหม่ (คิดตามราคางานเพิ่ม)"],
    },
  },
  "landing-custom": {
    highlight: "ออกแบบเฉพาะแบรนด์คุณ ไม่ซ้ำใคร และติด Google",
    bestFor: "แบรนด์ที่อยากให้เว็บดูเป็นตัวเอง โหลดไว และมีคนค้นเจอ",
    includes: [
      "คุยโจทย์และทำ moodboard ให้เลือกก่อนออกแบบ",
      "ออกแบบใหม่ 1 หน้ายาว ประมาณ 6–8 ส่วน",
      "สร้างด้วย Next.js เป้าหมาย PageSpeed บนมือถือ 90+",
      "SEO พื้นฐาน: title, description, sitemap และ Open Graph สำหรับแชร์",
      "ฟอร์มติดต่อ ปุ่ม LINE และแผนที่",
      "ส่งมอบโค้ดใน GitHub ของคุณ พร้อม README",
    ],
    extras: [
      { name: "3D หรืออนิเมชันตอนเลื่อน 1 จุด", price: "6,000–9,000" },
      { name: "เพิ่มหน้า", price: "2,500 / หน้า" },
      { name: "ทำสองภาษา ไทย / อังกฤษ", price: "3,000–5,000" },
      { name: "เชื่อม Payment / PromptPay", price: "3,500–4,500" },
      { name: "ส่งฟอร์มหรือออเดอร์เข้า LINE ร้านทันที", price: "3,500–5,000" },
    ],
    revisions: "แก้ได้ 2 รอบ รอบละหนึ่งชุดรายการ เกินจากนั้นคิด ฿350 ต่อชั่วโมง ส่วนฟีเจอร์ใหม่ออกใบเสนอราคาแยก",
    care: {
      covered: ["แก้บั๊กที่เกิดจากโค้ดของสตูดิโอ", "อัปเดตเนื้อหาได้ 3 ชม. ต่อเดือน", "อัปเดตไลบรารีให้ปลอดภัยอยู่เสมอ"],
      notCovered: ["เพิ่มส่วนใหม่หรือฟีเจอร์ใหม่", "ออกแบบใหม่ทั้งหน้า"],
    },
  },
  "landing-signature": {
    highlight: "ฉาก 3D และเรื่องเล่าที่ลูกค้าจำร้านได้",
    bestFor: "ร้านหรือแบรนด์ที่อยากให้เว็บเป็นประสบการณ์ แบบเว็บตัวอย่าง Baan Kafae",
    includes: [
      "ทุกอย่างใน Landing Custom",
      "ฉาก 3D 1 ฉาก ออกแบบเฉพาะแบรนด์ (Three.js)",
      "อนิเมชันเล่าเรื่องตอนเลื่อน (GSAP)",
      "เมนูหรือแคตตาล็อกกดสั่งต่อเข้า LINE",
      "ภาพวาดประกอบเฉพาะร้าน",
      "โหมดเบาอัตโนมัติสำหรับมือถือรุ่นเก่า",
    ],
    extras: [
      { name: "ฉาก 3D เพิ่ม", price: "6,000–9,000 / ฉาก" },
      { name: "ทำสองภาษา ไทย / อังกฤษ", price: "5,000–8,000" },
      { name: "ตั้งค่า LINE OA ครบชุด", price: "2,500" },
      { name: "ต่อยอดเป็น LINE Order ให้สั่งได้จริง", price: "คุยราคาตามเมนู" },
    ],
    revisions: "แก้ได้ 3 รอบ รวมการปรับฉาก 3D และจังหวะอนิเมชัน เกินจากนั้นคิด ฿350 ต่อชั่วโมง",
    care: {
      covered: ["แก้บั๊ก และปรับ 3D ให้ทำงานกับเบราว์เซอร์รุ่นใหม่", "อัปเดตเมนู รูป และข้อความ 3 ชม. ต่อเดือน", "ต่ออายุโฮสติ้งและโดเมน"],
      notCovered: ["ฉาก 3D ใหม่หรือเปลี่ยนเรื่องเล่า", "ภาพวาดชุดใหม่"],
    },
  },
  "line-order": {
    highlight: "หน้าสั่งอาหารที่เป็นแบรนด์ร้านคุณ ไม่ใช่เทมเพลตเดียวกับทุกร้าน",
    bestFor: "ร้านอาหาร คาเฟ่ หรือเบเกอรี่ ที่รับออเดอร์ทาง LINE อยู่แล้วและเริ่มจดไม่ทัน",
    includes: [
      "ออกแบบหน้าสั่งอาหารให้เข้ากับร้าน ทั้งสี โลโก้ รูปอาหาร และน้ำเสียง",
      "หน้าเมนูที่เปิดในแอป LINE (LIFF) มีรูป ราคา และตัวเลือก เช่น หวานน้อย",
      "ตะกร้า หมายเหตุถึงร้าน และเลือกรับเองหรือให้ส่ง",
      "ออเดอร์เด้งเข้า LINE กลุ่มของร้านทันที",
      "QR PromptPay ตามยอด พร้อมให้ลูกค้าแนบสลิป",
      "หลังบ้าน: เพิ่มเมนู เปลี่ยนราคา และปิดเมนูที่ของหมด",
      "รองรับเมนูสูงสุด 40 รายการ",
    ],
    extras: [
      { name: "เมนูเกิน 40 รายการ", price: "500 / 20 รายการ" },
      { name: "ตรวจสลิปอัตโนมัติ", price: "3,000 + ค่าบริการผู้ให้บริการตรวจสลิป" },
      { name: "Rich menu และข้อความตอบกลับอัตโนมัติ", price: "2,500" },
      { name: "เพิ่มสาขา", price: "5,000 / สาขา" },
    ],
    revisions: "แก้ได้ 2 รอบ ทั้งหน้าตาเมนูและขั้นตอนสั่ง เกินจากนั้นคิด ฿350 ต่อชั่วโมง",
    care: {
      covered: ["ออเดอร์ไม่เข้าหรือระบบค้าง แก้ให้ก่อนงานอื่น", "อัปเดตเมนูให้ ถ้าร้านไม่สะดวกทำเอง", "ปรับตามการเปลี่ยนแปลงของ LINE"],
      notCovered: ["ค่า LINE OA แบบเสียเงิน", "ฟีเจอร์ใหม่ เช่น ระบบสะสมแต้ม", "ปัญหาการโอนเงินระหว่างร้านกับลูกค้า"],
    },
  },
  pos: {
    highlight: "ขายบนแท็บเล็ตที่มีอยู่ รู้ยอดทุกคืนผ่าน LINE",
    bestFor: "ร้านอาหารและคาเฟ่ 1 สาขา ที่อยากเลิกจดบิลด้วยมือและรู้ยอดขายทุกวัน",
    includes: [
      "หน้าขายสำหรับแท็บเล็ตหรือมือถือ ใช้หลายเครื่องพร้อมกันได้",
      "เปิดบิล แยกโต๊ะ รวมบิล และแยกจ่าย",
      "QR PromptPay ตามยอดบิล และรับเงินสด",
      "สรุปยอดขายรายวันส่งเข้า LINE",
      "รายงานเมนูขายดีรายสัปดาห์และรายเดือน",
      "ข้อมูลอยู่บนคลาวด์ เปลี่ยนเครื่องได้ไม่หาย",
      "สอนพนักงานใช้งาน 1 ครั้ง",
    ],
    extras: [
      { name: "ต่อเครื่องพิมพ์ใบเสร็จหรือใบสั่งครัว", price: "3,000–5,000" },
      { name: "ระบบสต็อกวัตถุดิบ", price: "8,000–12,000" },
      { name: "ต่อกับ LINE Order", price: "คุยราคาเมื่อทำคู่กัน" },
      { name: "เพิ่มสาขา", price: "คุยราคาตามจำนวนสาขา" },
    ],
    revisions: "แก้ได้ 2 รอบ ระหว่างทดลองใช้จริงในร้าน เกินจากนั้นคิด ฿350 ต่อชั่วโมง",
    care: {
      covered: ["ระบบขายใช้ไม่ได้ แก้ให้ก่อนงานอื่นทั้งหมด", "สำรองข้อมูลอัตโนมัติ", "ดูแลเซิร์ฟเวอร์และฐานข้อมูล"],
      notCovered: ["อุปกรณ์ เช่น แท็บเล็ตหรือเครื่องพิมพ์ และการซ่อม", "ระบบบัญชีและภาษี", "อินเทอร์เน็ตของร้านล่ม"],
    },
  },
};

const en: Record<string, PackageDetails> = {
  "landing-basic": {
    highlight: "Online in two weeks, on the lightest budget",
    bestFor: "Shops that want to be found on Google and let customers get in touch straight away.",
    includes: [
      "One template, adapted to your colours, fonts and logo",
      "One page: about, services, 6–10 photos, map and opening hours",
      "Contact form delivered to your email",
      "Add-on-LINE and call buttons",
      "Hosted on Cloudflare with HTTPS",
    ],
    extras: [
      { name: "Extra page, such as a menu or price list", price: "1,500 / page" },
      { name: "LINE OA setup: welcome message, auto-replies, rich menu", price: "2,500" },
      { name: "GA4 or Facebook Pixel setup", price: "1,000–1,500" },
      { name: "Upgrade to Landing Custom later", price: "Pay only the difference" },
    ],
    revisions: "One round of revisions (one consolidated list of changes). After that, ฿350 per hour.",
    care: {
      covered: ["Fixes if the site goes down or displays incorrectly", "Swapping photos, text, opening hours and prices", "Hosting and domain renewals handled on time"],
      notCovered: ["Changing the template or redesigning", "New pages (priced as extras)"],
    },
  },
  "landing-custom": {
    highlight: "Designed for your brand alone, and easy to find on Google",
    bestFor: "Brands that want a site that feels like them, loads fast and gets found.",
    includes: [
      "A discovery call and a moodboard to choose from before design starts",
      "One long, fully custom page, around 6–8 sections",
      "Built with Next.js, targeting 90+ mobile PageSpeed",
      "Technical SEO: titles, descriptions, sitemap and Open Graph",
      "Contact form, LINE button and map",
      "Source code in your GitHub with a README",
    ],
    extras: [
      { name: "One 3D or scroll-animation piece", price: "6,000–9,000" },
      { name: "Extra page", price: "2,500 / page" },
      { name: "Bilingual Thai / English", price: "3,000–5,000" },
      { name: "Payment / PromptPay integration", price: "3,500–4,500" },
      { name: "Forms or orders sent straight to your LINE", price: "3,500–5,000" },
    ],
    revisions: "Two rounds of revisions, one list per round. After that, ฿350 per hour; new features get a separate quote.",
    care: {
      covered: ["Fixing bugs in the studio’s code", "Up to 3 hours of content updates a month", "Keeping libraries up to date and secure"],
      notCovered: ["New sections or features", "A full redesign"],
    },
  },
  "landing-signature": {
    highlight: "A 3D scene and a story your customers remember",
    bestFor: "Shops and brands that want the site to be an experience, like our Baan Kafae demo.",
    includes: [
      "Everything in Landing Custom",
      "One 3D scene designed for your brand (Three.js)",
      "Scroll-driven storytelling (GSAP)",
      "A menu or catalogue that orders via LINE",
      "Custom illustrations for your shop",
      "An automatic light mode for older phones",
    ],
    extras: [
      { name: "Additional 3D scene", price: "6,000–9,000 / scene" },
      { name: "Bilingual Thai / English", price: "5,000–8,000" },
      { name: "Full LINE OA setup", price: "2,500" },
      { name: "Upgrade to LINE Order for real ordering", price: "Quoted per menu" },
    ],
    revisions: "Three rounds of revisions, including the 3D scene and animation timing. After that, ฿350 per hour.",
    care: {
      covered: ["Bug fixes, and keeping the 3D working in new browsers", "Up to 3 hours a month of menu, photo and text updates", "Hosting and domain renewals"],
      notCovered: ["A new 3D scene or a new story", "A new set of illustrations"],
    },
  },
  "line-order": {
    highlight: "An ordering page in your shop’s own look, not the same template as everyone else",
    bestFor: "Restaurants, cafés and bakeries already taking orders on LINE and struggling to keep up.",
    includes: [
      "An ordering page designed around your shop: colours, logo, food photos and tone of voice",
      "A menu that opens inside LINE (LIFF) with photos, prices and options such as less sugar",
      "Cart, notes to the shop, and pickup or delivery",
      "Orders land in your shop’s LINE group instantly",
      "PromptPay QR for the exact amount, with slip upload",
      "Admin to add items, change prices and mark items sold out",
      "Up to 40 menu items",
    ],
    extras: [
      { name: "More than 40 menu items", price: "500 / 20 items" },
      { name: "Automatic slip verification", price: "3,000 + the verification provider’s fees" },
      { name: "Rich menu and auto-replies", price: "2,500" },
      { name: "Additional branch", price: "5,000 / branch" },
    ],
    revisions: "Two rounds of revisions to the menu design and ordering flow. After that, ฿350 per hour.",
    care: {
      covered: ["Orders not arriving or the system freezing, fixed first", "Menu updates done for you if you prefer", "Keeping up with changes on LINE’s side"],
      notCovered: ["Paid LINE OA plans", "New features such as loyalty points", "Payment disputes between the shop and its customers"],
    },
  },
  pos: {
    highlight: "Sell on the tablet you already have, with sales in LINE every night",
    bestFor: "Single-branch restaurants and cafés that want to stop writing bills by hand and know their numbers daily.",
    includes: [
      "A sales screen for tablet or phone, on several devices at once",
      "Open bills, tables, merge and split bills",
      "PromptPay QR for the bill amount, plus cash",
      "Daily sales summary sent to LINE",
      "Best-seller reports by week and month",
      "Data in the cloud, so changing devices loses nothing",
      "One staff training session",
    ],
    extras: [
      { name: "Receipt or kitchen printer connection", price: "3,000–5,000" },
      { name: "Ingredient stock tracking", price: "8,000–12,000" },
      { name: "Connect with LINE Order", price: "Quoted when built together" },
      { name: "Additional branches", price: "Quoted per branch" },
    ],
    revisions: "Two rounds of revisions during the in-shop trial. After that, ฿350 per hour.",
    care: {
      covered: ["If selling stops working, it is fixed before anything else", "Automatic data backups", "Server and database looked after"],
      notCovered: ["Hardware such as tablets or printers, and repairs", "Accounting and tax systems", "Your shop’s internet going down"],
    },
  },
};

const careTh: CareDetails = {
  lead: "จ่ายเดือนละ ฿1,500 แล้วไม่ต้องหาคนดูแลเว็บเอง เพิ่มได้กับทุกแพ็กเกจ",
  covered: [
    "โฮสติ้ง และต่ออายุโดเมนให้ก่อนหมด",
    "แก้บั๊กที่เกิดจากโค้ดของสตูดิโอ ไม่จำกัดครั้ง",
    "อัปเดตเนื้อหา เช่น รูป ข้อความ ราคา และเมนู รวม 3 ชม. ต่อเดือน",
    "อัปเดตไลบรารีให้ปลอดภัย",
    "เช็คทุกวันว่าเว็บยังออนไลน์อยู่",
  ],
  notCovered: [
    "ฟีเจอร์ใหม่ หน้าใหม่ หรือการออกแบบใหม่ (ออกใบเสนอราคาแยก)",
    "การเขียนคอนเทนต์และถ่ายรูป",
    "ค่าบริการภายนอก เช่น ค่าโดเมนรายปี LINE OA แบบเสียเงิน และปลั๊กอิน",
    "ปัญหาที่เกิดจากคนอื่นเข้าไปแก้โค้ด",
  ],
  terms: [
    "จ่ายรายเดือนล่วงหน้า ยกเลิกได้โดยแจ้งล่วงหน้า 30 วัน",
    "ชั่วโมงที่ใช้ไม่หมดไม่ทบไปเดือนถัดไป",
    "งานเกิน 3 ชม. คิด ฿350 ต่อชั่วโมง",
    "ลูกค้าโปรเปิดตัวใช้ฟรี 3 เดือนแรก",
  ],
};

const careEn: CareDetails = {
  lead: "฿1,500 a month and you never have to find someone to look after your site. Add it to any package.",
  covered: [
    "Hosting, and domain renewals before they expire",
    "Unlimited fixes for bugs in the studio’s code",
    "Content updates such as photos, text, prices and menus, up to 3 hours a month",
    "Keeping libraries up to date and secure",
    "A daily check that your site is online",
  ],
  notCovered: [
    "New features, new pages or redesigns (quoted separately)",
    "Copywriting and photography",
    "Third-party fees such as the yearly domain fee, paid LINE OA plans and plugins",
    "Problems caused by someone else editing the code",
  ],
  terms: [
    "Billed monthly in advance; cancel with 30 days’ notice",
    "Unused hours do not roll over",
    "Work beyond 3 hours is ฿350 per hour",
    "Launch-offer clients get the first 3 months free",
  ],
};

export const packageDetails = (locale: Locale, id: string): PackageDetails | undefined => (locale === "th" ? th : en)[id];
export const careDetails = (locale: Locale): CareDetails => (locale === "th" ? careTh : careEn);
