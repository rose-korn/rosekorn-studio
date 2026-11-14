"use client";

import { useEffect, useState } from "react";
import { getContent, localePath, ui, type Locale } from "@/content";
import { submitInquiry, type Inquiry } from "@/lib/api";

type Status = "idle" | "sending" | "sent" | "error";

const field =
  "w-full rounded-xl border border-paper/15 bg-paper/5 px-4 py-3.5 text-paper placeholder:text-paper/40 outline-none transition focus:border-rose focus:bg-paper/10";

export function ContactForm({ locale }: { locale: Locale }) {
  const { packages } = getContent(locale);
  const t = ui[locale].form;
  const u = ui[locale];
  const [status, setStatus] = useState<Status>("idle");
  const [pkg, setPkg] = useState("landing-custom");

  // Package buttons elsewhere on the page carry data-package; preselect it here.
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const el = (e.target as HTMLElement).closest<HTMLElement>("[data-package]");
      if (el?.dataset.package) setPkg(el.dataset.package);
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const data = Object.fromEntries(fd) as unknown as Inquiry;
    setStatus("sending");
    const res = await submitInquiry(data);
    setStatus(res.ok ? "sent" : "error");
    if (res.ok) form.reset();
  }

  if (status === "sent") {
    return (
      <div className="wobbly flex min-h-[420px] flex-col items-start justify-center border-[2.5px] border-paper bg-ink p-8 shadow-[8px_8px_0_var(--color-rose)]" role="status">
        <span className="flex h-14 w-14 -rotate-6 items-center justify-center rounded-full border-2 border-paper bg-rose text-2xl">🌹</span>
        <h3 className="mt-6 font-thai text-3xl font-semibold">{t.sentTitle}</h3>
        <p className="mt-3 text-paper/70">{t.sentBody}</p>
        <button type="button" onClick={() => setStatus("idle")} className="link-underline mt-8 text-sm text-paper/80">
          {t.again}
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="wobbly grid gap-4 border-[2.5px] border-paper bg-ink p-6 shadow-[8px_8px_0_var(--color-rose)] md:p-8">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="grid gap-2 text-sm text-paper/70">
          {t.name}
          <input name="name" required autoComplete="name" placeholder={t.namePh} className={field} />
        </label>
        <label className="grid gap-2 text-sm text-paper/70">
          {t.contact}
          <input name="contact" required placeholder={t.contactPh} className={field} />
        </label>
      </div>
      <label className="grid gap-2 text-sm text-paper/70">
        {t.business}
        <input name="business" placeholder={t.businessPh} className={field} />
      </label>
      <label className="grid gap-2 text-sm text-paper/70">
        {t.package}
        <select name="packageId" value={pkg} onChange={(e) => setPkg(e.target.value)} className={`${field} appearance-none`}>
          {packages.filter((p) => !p.soon).map((p) => (
            <option key={p.id} value={p.id} className="text-ink">
              {p.name} — ฿{p.price}
            </option>
          ))}
          <option value="unsure" className="text-ink">
            {t.unsure}
          </option>
        </select>
      </label>
      <label className="grid gap-2 text-sm text-paper/70">
        {t.message}
        <textarea name="message" rows={4} placeholder={t.messagePh} className={`${field} resize-none`} />
      </label>
      <button
        type="submit"
        disabled={status === "sending"}
        data-cursor={t.sendCursor}
        className="press mt-2 inline-flex h-14 items-center justify-center rounded-full border-[2.5px] border-paper bg-rose font-semibold text-white shadow-[4px_4px_0_var(--color-paper)] disabled:opacity-60"
      >
        {status === "sending" ? t.sending : t.send}
      </button>
      <p className="text-xs text-paper/50">
        {t.notice}{" "}
        <a href={localePath(locale, "/privacy/")} className="underline underline-offset-2">{u.privacy}</a> {t.and}{" "}
        <a href={localePath(locale, "/terms/")} className="underline underline-offset-2">{u.terms}</a>
        {locale === "en" ? "." : null}
      </p>
      {status === "error" ? (
        <p className="text-sm text-rose-soft" role="alert">
          {t.error}
        </p>
      ) : null}
    </form>
  );
}
