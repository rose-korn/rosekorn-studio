/**
 * Read a menu from a Google Sheet the shop edits themselves.
 * The sheet is published as CSV (File > Share > Publish to web > CSV), with a header row:
 *   name | note | price | image | badge   (badge is optional, e.g. "ขายดี")
 * One row per item. Empty rows are skipped. `price` may be "85" or "฿85"; `image` is any public image link.
 */
import type { BasicConfig } from "./types";

type Item = BasicConfig["highlights"]["items"][number];

/** small CSV parser: commas, quoted fields, doubled quotes, CRLF */
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

export function rowsToItems(rows: string[][]): Item[] {
  const [head, ...body] = rows;
  if (!head) return [];
  const col = (name: string) => head.findIndex((h) => h.trim().toLowerCase() === name);
  const [n, no, p, im, bd] = [col("name"), col("note"), col("price"), col("image"), col("badge")];
  if (n < 0) return [];
  return body
    .map((r) => {
      const name = (r[n] ?? "").trim();
      const price = p >= 0 ? (r[p] ?? "").trim() : "";
      const src = im >= 0 ? (r[im] ?? "").trim() : "";
      return {
        name,
        note: no >= 0 ? (r[no] ?? "").trim() || undefined : undefined,
        badge: bd >= 0 ? (r[bd] ?? "").trim() || undefined : undefined,
        price: price ? (/^[0-9.,]+$/.test(price) ? `฿${price}` : price) : undefined,
        pic: { src: /^https?:\/\//.test(src) ? src : undefined, illo: "latte" as const, alt: name },
      };
    })
    .filter((it) => it.name);
}

export async function loadSheetItems(url: string): Promise<Item[]> {
  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) throw new Error(`sheet ${res.status}`);
  return rowsToItems(parseCsv(await res.text()));
}
