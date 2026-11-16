/**
 * Google Sheet add-on: the shop edits its own page content in a Google Sheet, the template stays the same.
 *
 * One Google Sheet, one tab per part of the page. Each tab is published as CSV
 * (File > Share > Publish to web > pick the tab > CSV) and its link goes in `config.sheet`.
 * The page reads the tabs in the visitor's browser (see LiveLanding), so changes show within minutes, with no rebuild.
 * Whatever the sheet leaves out, or if Google can't be reached, the page keeps the text and photos from the config.
 *
 * Tabs (all optional):
 *   info     key | value      shop name, tagline, about text, contact, ... (one row per key, see INFO)
 *   items    menu, products or services
 *   hours    opening hours
 *   reviews  customer reviews
 *   team     staff (service template)
 *   gallery  photos with captions
 *   banks    bank accounts (shop template)
 *
 * Headers can be "ชื่อ (name)": only the key in brackets counts, so the Thai label is just for the shop.
 * The starter sheet for each template comes from `node --no-warnings --experimental-strip-types scripts/sheet-kit.mjs`.
 */
import type { BasicConfig, Picture } from "./types";

export const SHEET_TABS = ["info", "items", "hours", "reviews", "team", "gallery", "banks"] as const;
export type SheetTab = (typeof SHEET_TABS)[number];
/** published CSV link for each tab the shop edits */
export type SheetLinks = Partial<Record<SheetTab, string>>;

/**
 * What the shop paid for. "menu" (฿2,000): items and hours only. "full" (฿3,000): every tab.
 * Tabs outside the plan are never read, even if a link is set, so the page can't drift past what was sold.
 */
export type SheetPlan = "menu" | "full";
export const PLAN_TABS: Record<SheetPlan, readonly SheetTab[]> = {
  menu: ["items", "hours"],
  full: SHEET_TABS,
};

/**
 * Most rows a tab may show; extra rows in the sheet are ignored (the Thai guide tells the shop the same numbers).
 * Keeps a one-page site from growing into a long list, and gives the add-on a clear scope.
 */
export const MAX_ROWS: Record<Exclude<SheetTab, "info">, number> = {
  items: 12,
  hours: 7,
  reviews: 6,
  team: 6,
  gallery: 9,
  banks: 3,
};
type Row = Record<string, string>;
export type SheetData = Partial<Record<SheetTab, Row[]>>;

/** columns of each tab: [key, Thai label shown in the sheet header] */
export const COLUMNS: Record<SheetTab, [string, string][]> = {
  info: [["key", "หัวข้อ"], ["value", "ข้อความ"], ["help", "คำอธิบาย"]],
  items: [["name", "ชื่อ"], ["note", "รายละเอียด"], ["price", "ราคา"], ["image", "ลิงก์รูป"], ["badge", "ป้าย เช่น ขายดี"]],
  hours: [["day", "วัน"], ["time", "เวลา เว้นว่างถ้าปิด"]],
  reviews: [["quote", "รีวิว"], ["name", "ชื่อลูกค้า"], ["where", "มาจาก"], ["stars", "ดาว 1–5"]],
  team: [["name", "ชื่อ"], ["role", "ตำแหน่ง"], ["note", "รายละเอียด"], ["image", "ลิงก์รูป"]],
  gallery: [["image", "ลิงก์รูป"], ["caption", "คำบรรยาย"]],
  banks: [["bank", "ธนาคาร"], ["number", "เลขบัญชี"], ["name", "ชื่อบัญชี"]],
};

/** "a | b | c" in one cell, for short lists such as perks */
const LIST_SEP = "|";
const splitList = (v: string) => v.split(LIST_SEP).map((s) => s.trim()).filter(Boolean);

/**
 * Rows of the info tab. `get` reads the config (to build the starter sheet), `set` writes a sheet value into a copy of the config.
 * A key only shows in the starter sheet when this template uses it.
 */
const INFO: { key: string; help: string; get: (c: BasicConfig) => string | undefined; set: (c: BasicConfig, v: string) => void }[] = [
  { key: "name", help: "ชื่อร้าน", get: (c) => c.name, set: (c, v) => (c.name = v) },
  { key: "kicker", help: "ข้อความสั้นเหนือชื่อร้าน", get: (c) => c.kicker, set: (c, v) => (c.kicker = v) },
  { key: "tagline", help: "คำโปรยใต้ชื่อร้าน", get: (c) => c.tagline, set: (c, v) => (c.tagline = v) },
  { key: "cta", help: "ข้อความบนปุ่มหลัก", get: (c) => c.cta ?? "", set: (c, v) => (c.cta = v) },
  { key: "hero_image", help: "ลิงก์รูปใหญ่หน้าแรก", get: (c) => c.hero.src ?? "", set: (c, v) => (c.hero = { ...c.hero, src: v }) },
  { key: "perks", help: "จุดเด่นสั้น ๆ คั่นด้วย |", get: (c) => c.perks?.join(` ${LIST_SEP} `), set: (c, v) => (c.perks = splitList(v)) },
  { key: "about_title", help: "หัวข้อเกี่ยวกับร้าน", get: (c) => c.about.title, set: (c, v) => (c.about.title = v) },
  { key: "about_body", help: "เรื่องราวของร้าน", get: (c) => c.about.body, set: (c, v) => (c.about.body = v) },
  ...[0, 1, 2].flatMap((i) => [
    { key: `fact${i + 1}`, help: `ตัวเลขเด่นช่องที่ ${i + 1}`, get: (c: BasicConfig) => c.about.facts[i]?.value, set: (c: BasicConfig, v: string) => setFact(c, i, { value: v }) },
    { key: `fact${i + 1}_label`, help: `คำอธิบายช่องที่ ${i + 1}`, get: (c: BasicConfig) => c.about.facts[i]?.label, set: (c: BasicConfig, v: string) => setFact(c, i, { label: v }) },
  ]),
  { key: "items_title", help: "หัวข้อเมนู / สินค้า / บริการ", get: (c) => c.highlights.title, set: (c, v) => (c.highlights.title = v) },
  { key: "reviews_score", help: "คะแนนรีวิว เช่น 4.9 จาก 5", get: (c) => c.reviews?.score, set: (c, v) => c.reviews && (c.reviews.score = v) },
  { key: "order_notes", help: "หมายเหตุการสั่ง / จอง คั่นด้วย |", get: (c) => c.howToOrder?.notes?.join(` ${LIST_SEP} `), set: (c, v) => c.howToOrder && (c.howToOrder.notes = splitList(v)) },
  { key: "promptpay_id", help: "เบอร์ / เลขพร้อมเพย์", get: (c) => c.payment?.promptPay?.id, set: (c, v) => c.payment?.promptPay && (c.payment.promptPay.id = v) },
  { key: "promptpay_name", help: "ชื่อบัญชีพร้อมเพย์", get: (c) => c.payment?.promptPay?.name, set: (c, v) => c.payment?.promptPay && (c.payment.promptPay.name = v) },
  { key: "address", help: "ที่อยู่ร้าน", get: (c) => c.address, set: (c, v) => (c.address = v) },
  { key: "map_url", help: "ลิงก์ Google Maps", get: (c) => c.mapUrl, set: (c, v) => (c.mapUrl = v) },
  { key: "line_id", help: "LINE ID เช่น @myshop", get: (c) => c.contact.lineId, set: (c, v) => (c.contact.lineId = v) },
  { key: "line_url", help: "ลิงก์แอด LINE", get: (c) => c.contact.lineUrl, set: (c, v) => (c.contact.lineUrl = v) },
  { key: "phone", help: "เบอร์โทร", get: (c) => c.contact.phone, set: (c, v) => (c.contact.phone = v) },
  { key: "email", help: "อีเมล", get: (c) => c.contact.email, set: (c, v) => (c.contact.email = v) },
  { key: "facebook", help: "ลิงก์ Facebook", get: (c) => c.contact.facebook, set: (c, v) => (c.contact.facebook = v) },
  { key: "instagram", help: "ลิงก์ Instagram", get: (c) => c.contact.instagram, set: (c, v) => (c.contact.instagram = v) },
  { key: "form_title", help: "หัวข้อส่วนติดต่อ", get: (c) => c.form.title, set: (c, v) => (c.form.title = v) },
  { key: "form_lead", help: "ข้อความส่วนติดต่อ", get: (c) => c.form.lead, set: (c, v) => (c.form.lead = v) },
];

function setFact(c: BasicConfig, i: number, part: Partial<BasicConfig["about"]["facts"][number]>) {
  const facts = [...c.about.facts];
  facts[i] = { ...(facts[i] ?? { value: "", label: "" }), ...part };
  c.about.facts = facts;
}

// ---------- reading the sheet ----------

/** small CSV parser: commas, quoted fields, doubled quotes, line breaks inside quotes, CRLF */
export function parseCsv(text: string): string[][] {
  const rows: string[][] = [];
  let row: string[] = [];
  let cell = "";
  let quoted = false;
  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    if (quoted) {
      if (ch === '"' && text[i + 1] === '"') {
        cell += '"';
        i++;
      } else if (ch === '"') quoted = false;
      else cell += ch;
    } else if (ch === '"') quoted = true;
    else if (ch === ",") {
      row.push(cell);
      cell = "";
    } else if (ch === "\n" || ch === "\r") {
      if (ch === "\r" && text[i + 1] === "\n") i++;
      row.push(cell);
      rows.push(row);
      row = [];
      cell = "";
    } else cell += ch;
  }
  if (cell || row.length) {
    row.push(cell);
    rows.push(row);
  }
  return rows;
}

/** "ชื่อ (name)" -> "name"; "Name" -> "name" */
const headerKey = (h: string) => (h.match(/\(([^()]+)\)\s*$/)?.[1] ?? h).trim().toLowerCase();

/** CSV rows -> one object per row, keyed by header; empty rows dropped */
export function toRecords(rows: string[][]): Row[] {
  const [head, ...body] = rows;
  if (!head) return [];
  const keys = head.map(headerKey);
  return body
    .map((r) => Object.fromEntries(keys.map((k, i) => [k, (r[i] ?? "").trim()])))
    .filter((r) => Object.values(r).some(Boolean));
}

/** fetch every linked tab in the plan at once; a tab that fails is left out, so the page falls back to the config for it */
export async function loadSheet(links: SheetLinks, plan: SheetPlan = "full"): Promise<SheetData> {
  const tabs = PLAN_TABS[plan].filter((t) => links[t]);
  const results = await Promise.allSettled(
    tabs.map(async (t) => {
      const res = await fetch(links[t]!, { cache: "no-store" });
      if (!res.ok) throw new Error(`${t}: ${res.status}`);
      return toRecords(parseCsv(await res.text()));
    }),
  );
  const data: SheetData = {};
  results.forEach((r, i) => {
    if (r.status === "fulfilled") data[tabs[i]] = r.value;
  });
  return data;
}

// ---------- sheet -> config ----------

/** a photo link the page can show: a full web link, or a file on the site itself */
const isImage = (v: string) => /^(https?:\/\/|\/)/.test(v);
/** "85" -> "฿85"; "ถามร้าน" stays as written */
const price = (v: string) => (/^[0-9.,]+$/.test(v) ? `฿${v}` : v);
const opt = (v: string | undefined) => v || undefined;

/**
 * The photo for a sheet row. If the row is an item the config already has (same name) and its image cell is empty or unchanged,
 * the config's photo stays as it is. A new link replaces it. A new item with no photo gets a drawn placeholder.
 */
function picFor(image: string, name: string, old: { name: string; pic: Picture }[]): Picture {
  const same = old.find((o) => o.name === name)?.pic;
  if (same && (!image || image === same.src)) return same;
  if (isImage(image)) return { src: image, alt: name };
  return { illo: old[0]?.pic.illo ?? "storefront", alt: name };
}

/** the config with every non-empty sheet tab applied; an empty or missing tab keeps the config's content */
export function applySheet(base: BasicConfig, data: SheetData): BasicConfig {
  const c: BasicConfig = structuredClone(base);

  for (const r of data.info ?? []) {
    const field = INFO.find((f) => f.key === r.key?.toLowerCase());
    if (field && r.value) field.set(c, r.value);
  }

  if (data.items?.length) {
    const old = c.highlights.items;
    c.highlights.items = data.items
      .filter((r) => r.name)
      .slice(0, MAX_ROWS.items)
      .map((r) => ({ name: r.name, note: opt(r.note), price: r.price ? price(r.price) : undefined, badge: opt(r.badge), pic: picFor(r.image ?? "", r.name, old) }));
  }

  if (data.hours?.length)
    c.hours = data.hours
      .filter((r) => r.day)
      .slice(0, MAX_ROWS.hours)
      .map((r) => {
        const closed = !r.time || r.time === "ปิด";
        return { day: r.day, time: closed ? "" : r.time, closed: closed || undefined };
      });

  if (data.reviews?.length && c.reviews)
    c.reviews.items = data.reviews
      .filter((r) => r.quote && r.name)
      .slice(0, MAX_ROWS.reviews)
      .map((r) => {
        const n = Number.parseInt(r.stars ?? "", 10);
        return { quote: r.quote, name: r.name, where: opt(r.where), stars: n >= 1 && n <= 5 ? n : undefined };
      });

  if (data.team?.length && c.team) {
    const old = c.team.items;
    c.team.items = data.team
      .filter((r) => r.name)
      .slice(0, MAX_ROWS.team)
      .map((r) => ({ name: r.name, role: r.role ?? "", note: opt(r.note), pic: picFor(r.image ?? "", r.name, old) }));
  }

  if (data.gallery?.length && c.gallery)
    c.gallery.items = data.gallery
      .filter((r) => isImage(r.image ?? ""))
      .slice(0, MAX_ROWS.gallery)
      .map((r) => ({ src: r.image, alt: r.caption || c.name, caption: opt(r.caption) }));

  if (data.banks?.length && c.payment)
    c.payment.banks = data.banks
      .filter((r) => r.bank && r.number)
      .slice(0, MAX_ROWS.banks)
      .map((r) => ({ bank: r.bank, number: r.number, name: r.name ?? "" }));

  return c;
}

// ---------- config -> starter sheet ----------

/** the tabs this template uses, filled with its current content, ready to import into Google Sheets */
export function configToSheet(c: BasicConfig): Partial<Record<SheetTab, string[][]>> {
  const head = (t: SheetTab) => COLUMNS[t].map(([k, label]) => `${label} (${k})`);
  const out: Partial<Record<SheetTab, string[][]>> = {
    info: [head("info"), ...INFO.flatMap((f) => (f.get(c) === undefined ? [] : [[f.key, f.get(c) ?? "", f.help]]))],
    items: [head("items"), ...c.highlights.items.map((i) => [i.name, i.note ?? "", i.price?.replace(/^฿/, "") ?? "", i.pic.src ?? "", i.badge ?? ""])],
    hours: [head("hours"), ...c.hours.map((h) => [h.day, h.closed ? "" : h.time])],
  };
  if (c.reviews) out.reviews = [head("reviews"), ...c.reviews.items.map((r) => [r.quote, r.name, r.where ?? "", String(r.stars ?? 5)])];
  if (c.team) out.team = [head("team"), ...c.team.items.map((m) => [m.name, m.role, m.note ?? "", m.pic.src ?? ""])];
  if (c.gallery) out.gallery = [head("gallery"), ...c.gallery.items.map((g) => [g.src ?? "", g.caption ?? ""])];
  if (c.payment?.banks) out.banks = [head("banks"), ...c.payment.banks.map((b) => [b.bank, b.number, b.name])];
  return out;
}

/** rows -> CSV text (quotes only where needed) */
export function toCsv(rows: string[][]): string {
  const cell = (v: string) => (/[",\n\r]/.test(v) ? `"${v.replace(/"/g, '""')}"` : v);
  return rows.map((r) => r.map(cell).join(",")).join("\n") + "\n";
}
