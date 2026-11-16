/** Baan Kafae demo palette, shared by the page and its 3D scene */
export const C = {
  bg: "#2f3a2c",
  bg2: "#263023",
  cream: "#f1e7d3",
  cream2: "#e7d9bf",
  caramel: "#d9a35b",
  bean: "#6b4325",
  ink: "#1b1a17",
};

export type Roast = "light" | "medium" | "dark";

/** coffee colour + one-line tasting note per roast level (drives the 3D pour) */
export const ROASTS: Record<Roast, { label: string; coffee: string; highlight: string; note: string }> = {
  light: { label: "คั่วอ่อน", coffee: "#a5673a", highlight: "#e0a873", note: "เปรี้ยวสดแบบผลไม้ หอมดอกไม้ เหมาะกับดริป" },
  medium: { label: "คั่วกลาง", coffee: "#6b4325", highlight: "#b07a4c", note: "หวานคาราเมล บาลานซ์ดี ทำลาเต้อร่อยสุด" },
  dark: { label: "คั่วเข้ม", coffee: "#3a2316", highlight: "#7a5034", note: "ขมเข้ม ช็อกโกแลต ถูกใจคอเอสเปรสโซ่" },
};

/**
 * Phones and low-end machines get a lighter cafe demo: lower canvas resolution, no MSAA,
 * fewer floating beans, so scrolling stays smooth. Client-only (3D scenes load with ssr: false).
 */
export function lowPower() {
  if (typeof window === "undefined") return false;
  const nav = navigator as Navigator & { deviceMemory?: number };
  return (
    window.matchMedia("(pointer: coarse)").matches ||
    window.innerWidth < 768 ||
    (nav.hardwareConcurrency ?? 8) <= 4 ||
    (nav.deviceMemory ?? 8) <= 4
  );
}
