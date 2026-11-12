const THAI_DIGITS = ["๐", "๑", "๒", "๓", "๔", "๕", "๖", "๗", "๘", "๙"];

/** 3 -> "๐๓". Thai numerals as a quiet local touch in section indexes. */
export function thaiIndex(n: number, pad = 2): string {
  return String(n)
    .padStart(pad, "0")
    .replace(/\d/g, (d) => THAI_DIGITS[Number(d)]);
}

/** Buddhist Era year, e.g. 2026 -> 2569 */
export function buddhistYear(date = new Date()): number {
  return date.getFullYear() + 543;
}
