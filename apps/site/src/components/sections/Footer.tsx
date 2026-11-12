import { nav, site } from "@/content/site";
import { Logo } from "@/components/Logo";
import { buddhistYear } from "@/lib/thai";

export function Footer() {
  const now = new Date();
  return (
    <footer className="bg-ink text-paper">
      <div className="container-x pt-20 pb-10">
        <p
          className="select-none font-semibold leading-none tracking-[-0.05em] text-paper/95"
          style={{ fontSize: "clamp(4rem, 17vw, 16rem)" }}
          aria-hidden="true"
        >
          Rosekorn<span className="text-rose">.</span>
        </p>
        <div className="mt-12 grid gap-10 border-t border-paper/15 pt-10 md:grid-cols-4">
          <div className="md:col-span-2">
            <Logo />
            <p className="mt-4 max-w-sm text-paper/60">{site.description}</p>
          </div>
          <nav aria-label="เมนูท้ายเว็บ">
            <p className="eyebrow text-paper/40">Sitemap</p>
            <ul className="mt-4 space-y-2">
              {nav.map((n) => (
                <li key={n.href}>
                  <a href={n.href} className="link-underline text-paper/80">
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
                <a href={site.cvUrl} className="link-underline">เกี่ยวกับผู้พัฒนา (CV)</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-14 flex flex-col justify-between gap-2 text-sm text-paper/40 sm:flex-row">
          <p>
            © {now.getFullYear()} / พ.ศ. {buddhistYear(now)} {site.name}
          </p>
          <p>Designed & built in Bangkok</p>
        </div>
      </div>
    </footer>
  );
}
