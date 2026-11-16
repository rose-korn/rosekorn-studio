# Landing Basic template

One page for a small shop, built from one config file.

## New client

1. Copy `configs/cafe.ts` to `configs/<shop>.ts` and change the text, hours, contact, photos and `themes` (put the shop's colours first).
2. Put photos in `public/templates/<shop>/` (webp, about 400 px wide for menu items, 700 px for gallery, 720×900 for the hero).
3. Add a page that renders `<BasicLanding c={shop} displayFont={...} />` (see `app/(th)/templates/cafe/page.tsx`, without the `DemoBar`).
4. For the client's own site, copy this folder into their project and deploy to Cloudflare on their domain.

## Add-on: the shop edits its menu in Google Sheets (฿2,000–3,000)

1. Make a Google Sheet in the shop's account with this header row: `name | note | price | image` (shops can add a `badge` column, e.g. ขายดี)
   - `price`: `85` shows as ฿85; text such as `ถามร้าน` shows as written
   - `image`: a public image link, or leave empty for the drawn placeholder
2. File > Share > Publish to web > choose the sheet > Comma-separated values (.csv) > Publish. Copy the link.
3. Put the link in the config: `highlights.sheetUrl`.
4. Keep a few items in `highlights.items` too: they show first and stay as the fallback if the sheet can't be reached.

The page reads the sheet in the visitor's browser, so changes show within a few minutes (Google's publish delay), with no rebuild.
