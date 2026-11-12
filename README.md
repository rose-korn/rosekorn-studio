# Rosekorn Studio

Monorepo (pnpm workspaces) สำหรับเว็บขายงานและ demo ของ Rosekorn Studio

| path | เว็บ | สถานะ |
|---|---|---|
| `apps/site` | work.rosekorn.com — เว็บขายงาน (ผลงาน, แพ็กเกจ, ขั้นตอน, FAQ, ติดต่อ) | ✅ frontend |
| `apps/demo-cafe` | cafe.rosekorn.com | ⏳ phase 2 |
| `apps/demo-shop` | shop.rosekorn.com | ⏳ phase 3 |
| `services/api` | Rust API (Axum + SQLx) | ⏸ on hold |

## เริ่มใช้งาน

```bash
pnpm install
pnpm dev        # http://localhost:3000
pnpm build
```

## โครงของ apps/site

- `src/content/site.ts` — ข้อความ ราคา แพ็กเกจ FAQ ทั้งหมด (แก้ที่เดียว)
- `src/lib/api.ts` — จุดต่อ backend; ตั้ง `NEXT_PUBLIC_API_URL` เมื่อ API พร้อม ตอนนี้เป็น stub
- `src/components/hero/HeroVisual.tsx` — ช่องสำหรับ Three.js (มีคอมเมนต์วิธีเสียบ `@react-three/fiber` ด้วย `dynamic(..., { ssr: false })`)
- `src/app/globals.css` — design tokens (สี/ฟอนต์) ของ Tailwind v4

## ดีไซน์

แนว editorial studio แบบเว็บเอเจนซีต่างประเทศ (ตัวอักษรใหญ่, grid, marquee, serif italic, paper grain)
ผสมความเป็นไทย: ฟอนต์ Anuphan, เลขไทยกำกับ section, ปี พ.ศ., ปุ่ม LINE OA, PromptPay, ราคาเป็นบาท

## TODO ก่อนเปิดจริง

- ใส่ LINE OA id และลิงก์ Cal.com จริงใน `src/content/site.ts`
- เปลี่ยนภาพ mock ของผลงานเป็น screenshot จริงเมื่อ demo เสร็จ
- ฝัง Cal.com และต่อฟอร์มเข้ากับ API
