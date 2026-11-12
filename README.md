# Rosekorn Studio

Monorepo (pnpm workspaces) สำหรับเว็บขายงานและ demo ของ Rosekorn Studio

| path | เว็บ | สถานะ |
|---|---|---|
| `apps/site` | work.rosekorn.com (Cloudflare Pages) — เว็บขายงาน (ผลงาน, แพ็กเกจ, ขั้นตอน, FAQ, ติดต่อ) | ✅ frontend |
| `apps/demo-cafe` | cafe.rosekorn.com | ⏳ phase 2 |
| `apps/demo-shop` | shop.rosekorn.com | ⏳ phase 3 |
| `services/api` | Rust API (Axum + SQLx) | ⏸ on hold |

## เริ่มใช้งาน

```bash
pnpm install
pnpm dev        # http://localhost:3000
pnpm build
```

## Deploy บน Cloudflare Pages

`apps/site` ถูกตั้งเป็น static export (`output: "export"`) ได้ไฟล์ใน `apps/site/out`

Cloudflare dashboard → Workers & Pages → Create → Pages → Connect to Git → เลือก `rosekorn-studio` แล้วตั้งค่า:

| ช่อง | ค่า |
|---|---|
| Framework preset | None |
| Build command | `pnpm build` |
| Build output directory | `apps/site/out` |
| Root directory | (เว้นว่าง) |
| Environment variable | `NODE_VERSION` = `22` |

จากนั้น Custom domains → เพิ่ม `work.rosekorn.com`
cache และ security header อยู่ใน `apps/site/public/_headers`

## โครงของ apps/site

- `src/content/site.ts` — ข้อความ ราคา แพ็กเกจ FAQ ทั้งหมด (แก้ที่เดียว)
- `src/lib/api.ts` — จุดต่อ backend; ตั้ง `NEXT_PUBLIC_API_URL` เมื่อ API พร้อม ตอนนี้เป็น stub
- `src/components/hero/HeroScene.tsx` — ฉาก Three.js ดอกกุหลาบ 3D (@react-three/fiber + drei) โหลดแยกฝั่ง client หมุนเองและเอียงตามเมาส์ หยุด render เมื่อเลื่อนพ้นจอ
- `src/components/hero/HeroVisual.tsx` — เลือกระหว่าง 3D กับภาพ SVG สำรอง (ใช้ SVG เมื่อเครื่องไม่รองรับ WebGL หรือผู้ใช้ปิด animation)
- `src/app/globals.css` — design tokens (สี/ฟอนต์) ของ Tailwind v4

## ดีไซน์

แนว editorial studio แบบเว็บเอเจนซีต่างประเทศ (ตัวอักษรใหญ่, grid, marquee, serif italic, paper grain)
ผสมความเป็นไทย: ฟอนต์ Anuphan, เลขไทยกำกับ section, ปี พ.ศ., ปุ่ม LINE OA, PromptPay, ราคาเป็นบาท

## TODO ก่อนเปิดจริง

- ใส่ LINE OA id และลิงก์ Cal.com จริงใน `src/content/site.ts`
- เปลี่ยนภาพ mock ของผลงานเป็น screenshot จริงเมื่อ demo เสร็จ
- ฝัง Cal.com และต่อฟอร์มเข้ากับ API
