// Builds the starter Google Sheet for each Landing Basic template: one CSV per tab, filled with the demo content.
// Run from apps/site:  node --no-warnings --experimental-strip-types scripts/sheet-kit.mjs
// Output: src/templates/basic/sheet-kit/<template>/<n>-<tab>.csv  (import each file as a tab in Google Sheets)
import { mkdirSync, rmSync, writeFileSync } from "node:fs";
import { cafe } from "../src/templates/basic/configs/cafe.ts";
import { service } from "../src/templates/basic/configs/service.ts";
import { shop } from "../src/templates/basic/configs/shop.ts";
import { SHEET_TABS, configToSheet, toCsv } from "../src/templates/basic/sheet.ts";

const out = new URL("../src/templates/basic/sheet-kit/", import.meta.url);
for (const [slug, config] of Object.entries({ cafe, shop, service })) {
  const dir = new URL(`${slug}/`, out);
  rmSync(dir, { recursive: true, force: true });
  mkdirSync(dir, { recursive: true });
  const tabs = configToSheet(config);
  SHEET_TABS.filter((t) => tabs[t]).forEach((t, i) => writeFileSync(new URL(`${i + 1}-${t}.csv`, dir), toCsv(tabs[t])));
  console.log(slug, Object.keys(tabs).join(", "));
}
