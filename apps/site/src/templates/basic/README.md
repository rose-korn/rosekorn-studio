# Landing Basic template

One page for a small shop, built from one config file. Three demos live on the studio site under `/templates/`.

| Demo | Config | Look | Feels like |
|---|---|---|---|
| คาเฟ่ มะลิ สโลว์บาร์ | `configs/cafe.ts` | `cozy` | tilted prints, clear tape, hand-drawn underlines |
| ร้านค้า ฮอมฮอม | `configs/shop.ts` | `poster` | big centred name, products on the hero, heavy offset shadows |
| งานบริการ ใบเตย | `configs/service.ts` | `calm` | arch photos, thin lines, price list with dotted leaders |

## How the code is laid out

```
types.ts          BasicConfig: everything a page needs (text, photos, hours, contact, themes, look)
BasicLanding.tsx  renders the sections in the order each look uses
LiveLanding.tsx   same page, plus the shop's Google Sheet loaded in the browser (add-on)
ui.tsx            shared bits: card / heading / tilt per look, Tape, Stars, theme CSS variables
sections/         one file per section: Header, Hero, Perks, About, Highlights, Team, Reviews, HowTo, Payment, Gallery, Visit, Contact, Footer
sheet.ts          Google Sheet add-on: read CSV tabs, apply them to a config, build the starter sheet
sheet-kit/        starter sheets (CSV per tab) for each demo + the Thai guide for the shop
Illo.tsx, Pic.tsx drawn placeholders, photo slot
DemoBar.tsx       the demo-only bar with the colour switcher (not on a client's site)
```

A section takes `{ c }` and returns nothing when its part of the config is missing, so optional parts (team, reviews, payment, gallery, perks) are just left out of the config.
To change how a look draws something, change it in `ui.tsx` (cards, headings, tilt) or in that one section file.

## New client

1. Copy the closest config to `configs/<shop>.ts`, keep its `look` (or pick another), and change the text, hours, contact, photos and `themes` (shop's colours first).
2. Put photos in `public/templates/<shop>/` (webp, about 400 px for items, 480×600 for team, 700 px for gallery, 720×900 for the hero).
3. Add a page that renders `<BasicLanding c={shop} displayFont={...} />` (see `app/(th)/templates/cafe/page.tsx`, without the `DemoBar`).
4. For the client's own site, copy this folder into their project and deploy to Cloudflare on their domain.

### Before launch
- The contact form in the demo does not send. Connect it to the shop's form service or remove it.
- Real LINE link (`contact.lineUrl`), phone, map link, and a real PromptPay QR image for shops that take payment.

## Add-on: the shop edits its own content in Google Sheets

The template stays fixed; the shop edits what is inside it. Two tiers, set with `sheetPlan` in the config:

| Tier | Price | Tabs the page reads |
|---|---|---|
| `menu` | ฿2,000 | items, hours |
| `full` (default) | ฿3,000 | info, items, hours, reviews, team, gallery, banks |

Row caps (`MAX_ROWS` in `sheet.ts`): items 12, hours 7, reviews 6, team 6, gallery 9, banks 3. Extra rows are ignored.
Never editable from the sheet: layout, sections, order, colours, fonts, new pages.

1. Make the starter sheet: `node --no-warnings --experimental-strip-types scripts/sheet-kit.mjs` (from `apps/site`) writes `sheet-kit/<template>/` with one CSV per tab.
   Run it again after changing a config so the kit matches.
2. In the shop's Google account: new Google Sheet, then File > Import each CSV as a new tab (name the tab like the file: info, items, hours...).
3. For each tab: File > Share > Publish to web > pick the tab > Comma-separated values (.csv) > Publish. Copy the link.
4. Put the links and the tier in the config:
   ```ts
   sheet: { items: "https://docs.google.com/...output=csv", hours: "..." },
   sheetPlan: "menu",
   ```
   For the `menu` tier, only the items and hours tabs are needed in their sheet.
5. Render `<LiveLanding c={shop} ... />` instead of `<BasicLanding>` on their page.
6. Give the shop `sheet-kit/คู่มือแก้เว็บผ่าน-Google-Sheet.md` (Thai, step by step).

How it behaves:
- The page shows the config first (what search engines see), then swaps in the sheet a moment later.
- A tab that is empty, unpublished or unreachable leaves that part of the page as in the config. Nothing breaks.
- An item with an empty photo cell keeps its current photo if the name is unchanged; a brand-new item with no photo gets a drawn placeholder.
- Google caches published sheets, so edits show within about 5 minutes.
- Headers like `ราคา (price)` are fine: only the key in brackets is read.
