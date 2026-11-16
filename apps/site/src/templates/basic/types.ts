/**
 * Landing Basic template: everything a client's one-page site needs, in one object.
 * For a new client, copy a config (e.g. configs/cafe.ts), swap the text, photos and theme, and the page follows.
 */
import type { IlloKind } from "./Illo";
import type { SheetLinks } from "./sheet";

/**
 * The template's personality. Same sections, different drawing:
 * cozy = tilted stickers and tape (cafe), poster = straight blocks with heavy shadows (shop),
 * calm = thin lines, arches and air (salon, spa, clinic). See ui.tsx.
 */
export type Look = "cozy" | "poster" | "calm";

export type Theme = {
  /** shown on the colour switcher in the demo bar */
  label: string;
  bg: string;
  /** cards and panels */
  surface: string;
  ink: string;
  muted: string;
  accent: string;
  /** text on the accent colour */
  onAccent: string;
  soft: string;
};

/** a photo slot: a real image path for a client, or a drawn placeholder in the demo */
export type Picture = { src?: string; illo?: IlloKind; alt: string };

export type Review = { quote: string; name: string; /** where the review came from, e.g. "สั่งทาง LINE" */ where?: string; stars?: number };

export type BasicConfig = {
  look: Look;
  name: string;
  /** short line under the name, e.g. the street or the kind of shop */
  kicker: string;
  tagline: string;
  hero: Picture;
  about: { title: string; body: string; facts: { label: string; value: string }[] };
  /** main button in the hero, e.g. "สั่ง / จองผ่าน LINE" */
  cta?: string;
  highlights: {
    title: string;
    /** "list": small photo rows (a cafe menu). "cards": big photo cards (products). "menu": a price list with dotted leaders (services). Default "list". */
    layout?: "list" | "cards" | "menu";
    items: { name: string; note?: string; price?: string; /** small sticker, e.g. "ขายดี" */ badge?: string; pic: Picture }[];
    /** line under the list: "{before} ทัก LINE @id {after}"; default "ถูกใจชิ้นไหน" / "บอกชื่อสินค้าได้เลย" */
    ask?: { before: string; after: string };
  };
  /** short selling points shown as a strip under the hero, e.g. "ซื้อครบ ฿800 ส่งฟรี" */
  perks?: string[];
  gallery?: { title: string; items: (Picture & { caption?: string })[] };
  /** text reviews copied from the shop's Facebook, LINE chats or Google Maps (with the customer's OK) */
  reviews?: { title: string; score?: string; items: Review[] };
  /** the people customers will meet, e.g. stylists or therapists (service template) */
  team?: { title: string; items: { name: string; role: string; note?: string; pic: Picture }[] };
  /** plain steps: no cart or checkout, the order happens in LINE or by phone */
  howToOrder?: {
    title: string;
    /** label in the top menu; default "วิธีสั่งซื้อ" (a salon might use "จองคิว") */
    navLabel?: string;
    steps: { title: string; body: string }[];
    notes?: string[];
  };
  /** static payment details shown on the page; nothing is charged online */
  payment?: {
    title: string;
    lead?: string;
    promptPay?: { id: string; name: string };
    banks?: { bank: string; number: string; name: string }[];
    others?: string[];
  };
  /** heading of the hours + map block; default "เวลาเปิด และการเดินทาง" */
  visitTitle?: string;
  hours: { day: string; time: string; closed?: boolean }[];
  address: string;
  mapUrl: string;
  contact: { lineId: string; lineUrl: string; phone: string; email: string; facebook?: string; instagram?: string };
  form: { title: string; lead: string; placeholder?: string };
  themes: Theme[];
  /** Google Sheet add-on: the shop edits its own text, items, hours, reviews... (see sheet.ts and README) */
  sheet?: SheetLinks;
};
