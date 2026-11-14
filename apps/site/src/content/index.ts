/**
 * Two languages: Thai at the root (Thai with English accents, the studio's main voice)
 * and plain business English under /en/. Pages pass their locale down; components read
 * copy from getContent(locale) and short interface strings from ui[locale].
 */
import * as th from "./site";
import * as en from "./en";
import type { Package, Project } from "./site";
import { thaiIndex } from "@/lib/thai";

export type Locale = "th" | "en";

export type Content = {
  site: {
    name: string;
    shortName: string;
    url: string;
    description: string;
    lineOaId: string;
    lineUrl: string;
    bookingUrl: string;
    email: string;
    cvUrl: string;
    openingNote: string;
    location: string;
  };
  nav: readonly { href: string; label: string; en: string }[];
  marquee: readonly string[];
  projects: Project[];
  packages: Package[];
  launchPromo: { active: boolean; total: number; taken: number; until: string; headline: string; offer: string; condition: string };
  addons: readonly { name: string; price: string }[];
  carePlan: { name: string; th: string; price: string; features: readonly string[] };
  careLite: { name: string; th: string; price: string; features: readonly string[]; note: string };
  process: readonly { title: string; en: string; body: string }[];
  principles: readonly { title: string; body: string }[];
  faqs: readonly { q: string; a: string }[];
};

const content: Record<Locale, Content> = { th, en };

export const getContent = (locale: Locale): Content => content[locale];

/** Path of the same page in a locale: "/privacy/" -> "/en/privacy/" */
export const localePath = (locale: Locale, path: string) => (locale === "en" ? `/en${path}` : path);

/** Short interface strings that live in components rather than in the content files */
export const ui = {
  th: {
    home: "หน้าแรก",
    mainNav: "เมนูหลัก",
    mobileNav: "เมนูมือถือ",
    openMenu: "เปิดเมนู",
    closeMenu: "ปิดเมนู",
    book: "จองคิวคุยงาน",
    talk: "คุยกัน!",
    addLine: "แอด LINE",
    switchTo: "English",
    switchLabel: "Read this page in English",
    hero: {
      limited: "รับจำนวนจำกัด",
      h1a: "เว็บที่",
      h1b: "ขายของ",
      h1c: "ได้จริง",
      tagline: "Websites that actually sell — designed in Bangkok, built to last.",
      lead: "Rosekorn Studio ออกแบบและพัฒนาเว็บไซต์ด้วย Next.js ให้ร้านค้า คาเฟ่ และแบรนด์ไทย โหลดไว ติด Google รองรับ PromptPay และ LINE OA ตั้งแต่วันแรก",
      cta: "เริ่มคุยโปรเจกต์",
      pricing: "ดูแพ็กเกจและราคา",
      pricingCursor: "ดูราคา",
      free: "คุยฟรี 30 นาที",
      stats: ["PageSpeed บนมือถือ", "สัปดาห์ เว็บหน้าเดียวพร้อมใช้", "โค้ดเป็นของคุณ"],
    },
    services: "บริการของเรา",
    work: {
      title: "ผลงานตัวอย่าง",
      titleAccent: "ที่ลองกดเล่นได้จริง",
      lead: "งานที่ทำขึ้นเองและเปิดให้ใช้จริง ตั้งแต่เว็บข้อมูลเกมหลายร้อยหน้าไปจนถึงห้อง 3D ที่เดินได้ และเว็บตัวอย่างร้านคาเฟ่ที่กดเข้าไปดูได้ทั้งหน้า ส่วนร้านค้าออนไลน์กำลังตามมา",
      screenshot: "ภาพหน้าจอ",
      openDemo: "ดูเว็บตัวอย่าง →",
      openLive: "ลองเล่น ↗",
    },
    packages: {
      title: "ราคาชัดเจน",
      titleAccent: "ไม่มีบวกเพิ่มทีหลัง",
      lead: "ทุกแพ็กเกจมีใบเสนอราคาที่ระบุชัดว่ารวมและไม่รวมอะไร มัดจำ 50% ก่อนเริ่ม อีก 50% ตอนส่งมอบ",
      popular: "ยอดนิยม ★",
      delivery: "ส่งงาน",
      promoTag: "ราคาโปรเปิดตัว · ถึง",
      normalPrice: "ราคาปกติ",
      baht: "บาท",
      choose: "เลือก!",
      soonLabel: "เร็ว ๆ นี้ ยังไม่เปิดรับ",
      notOpen: "ยังไม่เปิดรับ",
      soonTape: "SOON · เร็ว ๆ นี้ ·",
      addons: "Add-ons · งานเสริม",
      perMonth: "เดือน",
      perYear: "ปี",
      careNote: "แนะนำสำหรับ LINE Order และ Landing Signature ที่ต้องมีคนดูแลประจำ ไม่ต้องกังวลเรื่องเว็บล่มหรือหาคนแก้",
      left: "เหลืออีก",
      seats: "ที่",
      endsWhen: (total: number, until: string) => `หมดเขตเมื่อครบ ${total} ท่าน หรือ ${until}`,
      details: "ดูรายละเอียด",
      detailsCursor: "เปิดดู",
      close: "ปิด",
      startsAt: "ราคาเริ่มต้น",
      bestFor: "เหมาะกับ",
      includes: "สิ่งที่ได้",
      extras: "งานเพิ่มและราคา",
      revisions: "การแก้ไข",
      careFor: "ถ้าใช้ Care Plan ต่อ",
      covered: "ครอบคลุม",
      notCovered: "ไม่ครอบคลุม",
      terms: "เงื่อนไข",
      careOpen: "ครอบคลุมอะไรบ้าง?",
    },
    process: {
      title: "ขั้นตอนตรงไปตรงมา",
      titleAccent: "from hello to handover",
      lead: "ทุกข้อตกลงเป็นลายลักษณ์อักษร คุณรู้ตลอดว่างานอยู่ตรงไหน และจ่ายเท่าไร",
    },
    faq: "คำถามที่พบบ่อย",
    contact: {
      title: "มาคุยกัน",
      titleAccent: "ก่อนตัดสินใจ",
      lead: "คุยฟรี 30 นาที ไม่มีข้อผูกมัด เล่าโจทย์มาได้เลย เราจะแนะนำแพ็กเกจที่คุ้มที่สุดสำหรับธุรกิจคุณ",
      addCursor: "แอดเลย",
      video: "จองเวลาคุยผ่านวิดีโอคอล",
      videoCursor: "จองคิว",
    },
    form: {
      sentTitle: "เย้! ได้รับแล้ว",
      sentBody: "เดี๋ยวทักกลับภายใน 1–2 วันทำการนะ ถ้ารีบ ทัก LINE มาได้เลย เร็วกว่า",
      again: "ส่งข้อความอีกครั้ง",
      name: "ชื่อของคุณ",
      namePh: "สมชาย ใจดี",
      contact: "LINE ID / เบอร์โทร / อีเมล",
      contactPh: "@line หรือ 08x-xxx-xxxx",
      business: "ธุรกิจของคุณ",
      businessPh: "เช่น คาเฟ่ ร้านเสื้อผ้า คลินิก",
      package: "แพ็กเกจที่สนใจ",
      unsure: "ยังไม่แน่ใจ ขอคำแนะนำ",
      message: "เล่าโปรเจกต์คร่าว ๆ",
      messagePh: "อยากได้เว็บแบบไหน มีตัวอย่างที่ชอบไหม ต้องการใช้เมื่อไร",
      send: "ส่งรายละเอียด",
      sending: "กำลังส่ง…",
      sendCursor: "ส่งเลย",
      error: "อุ๊ย ส่งไม่ผ่าน ลองอีกทีนะ หรือทัก LINE แทนก็ได้",
      notice: "ข้อมูลนี้ใช้เพื่อติดต่อกลับและทำใบเสนอราคาเท่านั้น อ่าน",
      and: "และ",
    },
    footer: {
      easter: "psst… พิมพ์คำว่า",
      easter2: "ดูสิ",
      sitemap: "เมนูท้ายเว็บ",
      cv: "เกี่ยวกับผู้พัฒนา (CV)",
      built: "Designed & built in Bangkok",
    },
    privacy: "นโยบายความเป็นส่วนตัว",
    terms: "ข้อกำหนดการให้บริการ",
    legal: { back: "← กลับหน้าแรก", toc: "สารบัญ", updated: "ปรับปรุงล่าสุด" },
  },
  en: {
    home: "home",
    mainNav: "Main menu",
    mobileNav: "Mobile menu",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    book: "Book a call",
    talk: "Let’s talk!",
    addLine: "Add LINE",
    switchTo: "ภาษาไทย",
    switchLabel: "อ่านหน้านี้เป็นภาษาไทย",
    hero: {
      limited: "limited spots",
      h1a: "Websites that ",
      h1b: "actually sell",
      h1c: "",
      tagline: "Designed in Bangkok, built to last.",
      lead: "Rosekorn Studio designs and builds Next.js websites for shops, cafés and Thai brands. Fast to load, easy to find on Google, with PromptPay and LINE OA ready from day one.",
      cta: "Start a project",
      pricing: "See packages & pricing",
      pricingCursor: "Pricing",
      free: "Free 30-minute call",
      stats: ["mobile PageSpeed", "weeks to a live one-page site", "of the code is yours"],
    },
    services: "Our services",
    work: {
      title: "Selected work",
      titleAccent: "you can actually try",
      lead: "Projects we built and run ourselves: a game reference site with hundreds of pages, a walkable 3D room, and a full café demo you can click through. An online store is on its way.",
      screenshot: "Screenshot of",
      openDemo: "View the demo →",
      openLive: "Try it ↗",
    },
    packages: {
      title: "Clear pricing,",
      titleAccent: "no surprises later",
      lead: "Every package comes with a written quote that states exactly what is and isn’t included. 50% deposit to start, 50% on handover.",
      popular: "Most popular ★",
      delivery: "Delivery",
      promoTag: "Launch price · until",
      normalPrice: "Regular price",
      baht: "baht",
      choose: "Pick!",
      soonLabel: "coming soon, not yet available",
      notOpen: "Not open yet",
      soonTape: "SOON · COMING SOON ·",
      addons: "Add-ons",
      perMonth: "month",
      perYear: "year",
      careNote: "Recommended for LINE Order and Landing Signature, which need regular looking after. No more worrying about downtime or finding someone to fix things.",
      left: "Spots left",
      seats: "",
      endsWhen: (total: number, until: string) => `Ends after ${total} clients or on ${until}, whichever comes first`,
      details: "See details",
      detailsCursor: "Open",
      close: "Close",
      startsAt: "Starting price",
      bestFor: "Best for",
      includes: "What you get",
      extras: "Extras and pricing",
      revisions: "Revisions",
      careFor: "With the Care Plan",
      covered: "Covered",
      notCovered: "Not covered",
      terms: "Terms",
      careOpen: "What’s covered?",
    },
    process: {
      title: "A straightforward process,",
      titleAccent: "from hello to handover",
      lead: "Every agreement is in writing, so you always know where the project stands and what you’re paying.",
    },
    faq: "Frequently asked questions",
    contact: {
      title: "Let’s talk",
      titleAccent: "before you decide",
      lead: "A free 30-minute call with no obligation. Tell us what you need and we’ll recommend the package that gives your business the best value.",
      addCursor: "Add us",
      video: "Book a video call",
      videoCursor: "Book",
    },
    form: {
      sentTitle: "Got it, thank you!",
      sentBody: "We’ll get back to you within 1–2 business days. In a hurry? Message us on LINE for a faster reply.",
      again: "Send another message",
      name: "Your name",
      namePh: "Jane Smith",
      contact: "LINE ID / phone / email",
      contactPh: "@line or name@company.com",
      business: "Your business",
      businessPh: "e.g. café, fashion brand, clinic",
      package: "Package you’re interested in",
      unsure: "Not sure yet, I’d like advice",
      message: "Tell us about the project",
      messagePh: "What kind of site, any examples you like, and when you need it",
      send: "Send details",
      sending: "Sending…",
      sendCursor: "Send",
      error: "Something went wrong. Please try again, or message us on LINE.",
      notice: "We only use this to reply and prepare your quote. See our",
      and: "and",
    },
    footer: {
      easter: "psst… try typing",
      easter2: "",
      sitemap: "Footer menu",
      cv: "About the developer (CV)",
      built: "Designed & built in Bangkok",
    },
    privacy: "Privacy policy",
    terms: "Terms of service",
    legal: { back: "← Back to home", toc: "Contents", updated: "Last updated" },
  },
} as const;

export type Ui = (typeof ui)[Locale];

/** Section index badge: Thai numerals on the Thai site ("๐๓"), plain digits in English ("03") */
export const sectionIndex = (locale: Locale, n: number) =>
  locale === "th" ? thaiIndex(n) : String(n).padStart(2, "0");

/** The other language, for the switch link */
export const otherLocale = (locale: Locale): Locale => (locale === "th" ? "en" : "th");
