import { getContent, localePath, ui, type Locale } from "@/content";
import { Logo } from "@/components/Logo";
import { buddhistYear } from "@/lib/thai";

export function Footer({ locale }: { locale: Locale }) {
  const { nav, site } = getContent(locale);
  const t = ui[locale];
  const home = localePath(locale, "/");
  const now = new Date();
  return (
    <footer className="bg-ink text-paper">
      <div className="container-x pt-20 pb-10">
        <p
          className="group select-none font-semibold leading-none tracking-[-0.05em] text-paper"
          style={{ fontSize: "clamp(4rem, 17vw, 16rem)" }}
          aria-hidden="true"
        >
          <span className="outline-text transition-colors duration-500 group-hover:text-paper" style={{ ["--stroke" as string]: "var(--color-paper)" }}>Rosekorn</span>
          <span className="text-rose">.</span>
        </p>
        <p className="mt-4 hidden font-serif text-2xl italic text-pink md:block">
          {t.footer.easter} <span className="font-mono not-italic text-sky">rose</span> {t.footer.easter2}
        </p>
        <div className="mt-12 grid gap-10 border-t border-paper/15 pt-10 md:grid-cols-4">
          <div className="md:col-span-2">
            <Logo />
            <p className="mt-4 max-w-sm text-paper/60">{site.description}</p>
          </div>
          <nav aria-label={t.footer.sitemap}>
            <p className="eyebrow text-paper/40">Sitemap</p>
            <ul className="mt-4 space-y-2">
              {nav.map((n) => (
                <li key={n.href}>
                  <a href={`${home}${n.href}`} className="link-underline text-paper/80">
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div>
            <p className="eyebrow text-paper/40">Contact</p>
            <ul className="mt-4 space-y-2 text-paper/80">
              <li>
                <a href={site.lineUrl} className="link-underline">LINE {site.lineOaId}</a>
              </li>
              <li>
                <a href={`mailto:${site.email}`} className="link-underline">{site.email}</a>
              </li>
              <li>
                <a href={site.cvUrl} className="link-underline">{t.footer.cv}</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-14 flex flex-col justify-between gap-2 text-sm text-paper/40 sm:flex-row">
          <p>
            © {now.getFullYear()}
            {locale === "th" ? ` / พ.ศ. ${buddhistYear(now)}` : ""} {site.name}
          </p>
          <p className="flex flex-wrap gap-x-5 gap-y-1">
            <a href={localePath(locale, "/privacy/")} className="link-underline">{t.privacy}</a>
            <a href={localePath(locale, "/terms/")} className="link-underline">{t.terms}</a>
            <span>{t.footer.built}</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
