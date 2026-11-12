/**
 * Frontend-only stub for the future backend (Rust API / Supabase).
 * Swap the body of each function for a real fetch when the API exists;
 * components already depend only on these signatures.
 */

export type Inquiry = {
  name: string;
  contact: string;
  business: string;
  packageId: string;
  message: string;
};

export type InquiryResult = { ok: true } | { ok: false; error: string };

const API_BASE = process.env.NEXT_PUBLIC_API_URL;

export async function submitInquiry(data: Inquiry): Promise<InquiryResult> {
  if (API_BASE) {
    try {
      const res = await fetch(`${API_BASE}/inquiries`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      return res.ok ? { ok: true } : { ok: false, error: `HTTP ${res.status}` };
    } catch {
      return { ok: false, error: "network" };
    }
  }
  // No backend yet: pretend it went through so the UI flow can be reviewed.
  await new Promise((r) => setTimeout(r, 700));
  if (process.env.NODE_ENV !== "production") console.info("[stub] inquiry", data);
  return { ok: true };
}
