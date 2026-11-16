import { telHref, textLink, wrap } from "../ui";
import type { BasicConfig } from "../types";

/**
 * Contact details and a message form.
 * The demo form does not send. For a client, point it at their form service (see README, "Before launch").
 */
export function Contact({ c }: { c: BasicConfig }) {
  // calm sites end on a light panel; the other looks end on a dark ink block
  const light = c.look === "calm";
  const section = light ? "border-t border-[var(--t-ink)]/15 bg-[var(--t-soft)] text-[var(--t-ink)]" : "bg-[var(--t-ink)] text-[var(--t-bg)]";
  // full class names (not built from parts) so Tailwind can find them
  const field = `rounded-xl border-2 border-transparent px-4 text-base outline-none focus:border-[var(--t-accent)] ${
    light
      ? "bg-[var(--t-ink)]/5 text-[var(--t-ink)] placeholder:text-[var(--t-ink)]/40"
      : "bg-[var(--t-bg)]/10 text-[var(--t-bg)] placeholder:text-[var(--t-bg)]/40"
  }`;

  return (
    <section aria-labelledby="contact" className={section}>
      <div className={`${wrap} grid gap-10 py-16 md:grid-cols-2 md:py-24`}>
        <div>
          <h2 id="contact" className="tpl-display text-[clamp(1.8rem,4vw,2.6rem)] leading-tight">
            {c.form.title}
          </h2>
          <p className="mt-4 max-w-md text-lg leading-relaxed opacity-75">{c.form.lead}</p>
          <ul className="mt-8 space-y-3 text-lg">
            <li>
              LINE: <a href={c.contact.lineUrl} className={textLink}>{c.contact.lineId}</a>
            </li>
            <li>
              โทร: <a href={telHref(c.contact.phone)} className={textLink}>{c.contact.phone}</a>
            </li>
            <li>
              อีเมล: <a href={`mailto:${c.contact.email}`} className={textLink}>{c.contact.email}</a>
            </li>
          </ul>
        </div>
        <form className={`grid gap-4 rounded-[22px] border-2 p-5 md:p-7 ${light ? "border-[var(--t-ink)]/20 bg-[var(--t-surface)]" : "border-[var(--t-bg)]/30"}`} aria-describedby="tpl-form-note">
          {[
            { name: "name", label: "ชื่อ", ph: "ชื่อของคุณ" },
            { name: "contact", label: "เบอร์โทร หรือ LINE ID", ph: "08x-xxx-xxxx" },
          ].map((f) => (
            <label key={f.name} className="grid gap-2 text-sm opacity-90">
              {f.label}
              <input name={f.name} placeholder={f.ph} className={`h-12 ${field}`} />
            </label>
          ))}
          <label className="grid gap-2 text-sm opacity-90">
            ข้อความ
            <textarea name="message" rows={4} placeholder={c.form.placeholder ?? "อยากจองโต๊ะ สั่งเค้ก หรือสอบถามอะไรก็ได้"} className={`py-3 ${field}`} />
          </label>
          <button type="button" className={`mt-2 h-12 rounded-full border-2 bg-[var(--t-accent)] font-semibold text-[var(--t-on-accent)] ${light ? "border-[var(--t-accent)]" : "border-[var(--t-bg)]"}`}>
            ส่งข้อความ
          </button>
          <p id="tpl-form-note" className="text-sm opacity-60">
            ในเว็บตัวอย่าง ฟอร์มนี้ยังไม่ส่งจริง ในเว็บของร้าน ข้อความจะเข้าอีเมลร้านทันที
          </p>
        </form>
      </div>
    </section>
  );
}
