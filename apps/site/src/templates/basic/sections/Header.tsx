import { btn, wrap } from "../ui";
import type { BasicConfig } from "../types";

/** top bar: shop mark + name, section links (desktop), LINE button */
export function Header({ c }: { c: BasicConfig }) {
  const nav = [
    { href: "#highlights", label: c.highlights.title },
    c.gallery ? { href: "#gallery", label: c.gallery.title } : null,
    c.team ? { href: "#team", label: c.team.title } : null,
    c.reviews ? { href: "#reviews", label: "รีวิว" } : null,
    c.howToOrder ? { href: "#order", label: c.howToOrder.navLabel ?? "วิธีสั่งซื้อ" } : null,
    c.payment ? null : { href: "#visit", label: "เวลาเปิด" },
    { href: "#contact", label: "ติดต่อ" },
  ].filter((n) => n !== null);

  const mark = {
    cozy: "rounded-full border-2 border-[var(--t-ink)] bg-[var(--t-accent)] text-[var(--t-on-accent)]",
    poster: "rounded-lg border-2 border-[var(--t-ink)] bg-[var(--t-accent)] text-[var(--t-on-accent)] shadow-[3px_3px_0_var(--t-ink)]",
    calm: "rounded-t-full rounded-b-md border border-[var(--t-ink)]/40 bg-[var(--t-soft)]",
  }[c.look];
  const lineBtn =
    c.look === "calm"
      ? "border border-[var(--t-ink)] bg-transparent text-[var(--t-ink)] hover:bg-[var(--t-ink)] hover:text-[var(--t-bg)]"
      : "bg-[var(--t-ink)] text-[var(--t-bg)]";

  return (
    <header className={c.look === "poster" ? "border-b-2 border-[var(--t-ink)] bg-[var(--t-surface)]" : ""}>
      <div className={`${wrap} flex items-center justify-between gap-4 py-5`}>
        <a href="#top" className="flex min-w-0 items-center gap-3">
          <span className={`tpl-display flex h-11 w-11 shrink-0 items-center justify-center text-xl ${mark}`}>{c.name.slice(0, 1)}</span>
          <span className="tpl-display text-xl leading-none">{c.name}</span>
        </a>
        <nav aria-label="เมนูหลัก" className="hidden items-center gap-7 text-[0.95rem] md:flex">
          {nav.map((n) => (
            <a key={n.href} href={n.href} className="hover:text-[var(--t-accent)]">
              {n.label}
            </a>
          ))}
        </nav>
        <a href={c.contact.lineUrl} className={`${btn} h-10 shrink-0 px-4 text-sm ${lineBtn}`}>
          แอด LINE
        </a>
      </div>
    </header>
  );
}
