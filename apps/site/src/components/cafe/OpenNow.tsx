"use client";

import { useEffect, useState } from "react";

/**
 * Live "open now" badge from the shop hours, in Bangkok time.
 * Mon–Fri 07:30–17:00, Sat–Sun 08:00–18:00, closed on the 2nd Wednesday of the month.
 */
const DAYS = ["อาทิตย์", "จันทร์", "อังคาร", "พุธ", "พฤหัสฯ", "ศุกร์", "เสาร์"];

function bangkokNow() {
  // shift to UTC+7 and read the fields as if it were UTC
  const d = new Date(Date.now() + 7 * 3600_000);
  return { day: d.getUTCDay(), date: d.getUTCDate(), min: d.getUTCHours() * 60 + d.getUTCMinutes() };
}

function hoursFor(day: number, date: number): [number, number] | null {
  if (day === 3 && date >= 8 && date <= 14) return null; // 2nd Wednesday
  return day === 0 || day === 6 ? [8 * 60, 18 * 60] : [7 * 60 + 30, 17 * 60];
}

const hhmm = (m: number) => `${String(Math.floor(m / 60)).padStart(2, "0")}:${String(m % 60).padStart(2, "0")}`;

function status() {
  const { day, date, min } = bangkokNow();
  const today = hoursFor(day, date);
  if (today && min >= today[0] && min < today[1]) {
    const left = today[1] - min;
    return { open: true, text: left <= 60 ? `เปิดอยู่ · ใกล้ปิดแล้ว (${hhmm(today[1])})` : `เปิดอยู่ตอนนี้ · ปิด ${hhmm(today[1])}` };
  }
  if (today && min < today[0]) return { open: false, text: `ยังไม่เปิด · เปิดวันนี้ ${hhmm(today[0])}` };
  for (let i = 1; i <= 7; i++) {
    const d = (day + i) % 7;
    const h = hoursFor(d, date + i);
    if (h) return { open: false, text: `ปิดแล้ว · เปิด${i === 1 ? "พรุ่งนี้" : `วัน${DAYS[d]}`} ${hhmm(h[0])}` };
  }
  return { open: false, text: "ปิดแล้ว" };
}

export function OpenNow() {
  const [s, setS] = useState<{ open: boolean; text: string } | null>(null);
  useEffect(() => {
    setS(status());
    const id = setInterval(() => setS(status()), 60_000);
    return () => clearInterval(id);
  }, []);
  return (
    <p className="mt-8 flex items-center gap-2.5 text-sm">
      <span className="relative inline-flex h-2.5 w-2.5">
        {s?.open ? <span className="absolute inset-0 animate-ping rounded-full bg-[#7bd389] opacity-70" /> : null}
        <span className={`relative inline-block h-2.5 w-2.5 rounded-full ${s ? (s.open ? "bg-[#7bd389]" : "bg-[#e0475e]") : "bg-white/40"}`} />
      </span>
      <span className="opacity-85">{s ? s.text : "ดูเวลาเปิดด้านล่าง"}</span>
    </p>
  );
}
