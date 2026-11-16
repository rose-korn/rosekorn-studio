import { wrap } from "../ui";
import type { BasicConfig } from "../types";

export function Footer({ c }: { c: BasicConfig }) {
  return (
    <footer className={`${wrap} flex flex-wrap items-center justify-between gap-4 py-8 text-sm text-[var(--t-muted)]`}>
      <p>
        © {new Date().getFullYear()} {c.name}
      </p>
      <div className="flex gap-5">
        {c.contact.facebook ? <a href={c.contact.facebook}>Facebook</a> : null}
        {c.contact.instagram ? <a href={c.contact.instagram}>Instagram</a> : null}
        <a href={c.contact.lineUrl}>LINE</a>
      </div>
    </footer>
  );
}
