import type { Project } from "@/content/site";
import { getContent, ui, type Locale } from "@/content";
import { EditorialHeading } from "@/components/EditorialHeading";

export function Work({ locale }: { locale: Locale }) {
  const { projects } = getContent(locale);
  const t = ui[locale];
  return (
    <section id="work" className="scroll-mt-20 bg-ink py-24 text-paper md:py-40">
      <div className="container-x">
        <EditorialHeading
          locale={locale}
          index={1}
          tone="dark"
          en="Selected work"
          title={
            <>
              {t.work.title} <span className="font-serif font-normal italic text-rose-soft">{t.work.titleAccent}</span>
            </>
          }
          lead={t.work.lead}
        />
        <div className="mt-20 grid gap-x-10 gap-y-24 md:grid-cols-12">
          {projects.map((p, i) => (
            <ProjectCard key={p.slug} p={p} i={i} locale={locale} />
          ))}
        </div>
      </div>
    </section>
  );
}

/** Lookbook spread: wide and narrow plates alternate, captions set like a magazine credit */
const layout = ["md:col-span-7", "md:col-span-5 md:mt-40", "md:col-span-5", "md:col-span-7 md:mt-24", "md:col-span-8 md:col-start-3"];

function ProjectCard({ p, i, locale }: { p: Project; i: number; locale: Locale }) {
  const t = ui[locale];
  const live = p.status === "live";
  const no = String(i + 1).padStart(2, "0");
  const body = (
    <>
      <div className="relative aspect-[16/10] overflow-hidden" style={{ background: p.palette.bg, color: p.palette.fg }}>
        {p.image ? (
          // eslint-disable-next-line @next/next/no-img-element -- static export, images are pre-sized webp
          <img
            src={p.image}
            alt={`${t.work.screenshot} ${p.title}`}
            loading="lazy"
            className={`absolute inset-0 h-full w-full transition duration-[1.2s] ease-out group-hover:scale-[1.05] ${p.fit === "contain" ? "object-contain" : "object-cover"} ${live ? "" : "grayscale-[40%]"}`}
          />
        ) : (
          <MockSite p={p} en={locale === "en"} />
        )}
        {/* a thin frame that closes in on hover, like a mat around a print */}
        <span className="pointer-events-none absolute inset-0 border border-paper/0 transition-all duration-700 group-hover:inset-3 group-hover:border-paper/70" aria-hidden="true" />
      </div>
      <div className="mt-6 grid grid-cols-[auto_1fr_auto] items-baseline gap-x-5 border-t border-paper/20 pt-5">
        <span className="font-serif text-3xl italic text-rose-soft">Nº{no}</span>
        <h3 className="font-serif text-[clamp(1.8rem,3vw,2.6rem)] leading-none">{p.title}</h3>
        <span className={`caps-th font-mono text-[10px] uppercase tracking-[0.3em] ${live ? "text-rose" : "text-paper/40"}`}>— {p.stamp}</span>
      </div>
      <p className="caps-th mt-3 font-mono text-[10px] uppercase tracking-[0.3em] text-paper/45">
        {p.kind} · {p.year}
      </p>
      <p className="mt-4 max-w-lg text-paper/70">{p.summary}</p>
      <p className="mt-4 font-mono text-[11px] tracking-[0.15em] text-paper/45">{p.tags.join("  /  ")}</p>
    </>
  );
  const shared = { "data-reveal": true, className: `group relative block ${layout[i % layout.length]}` };
  // demos that live on this site (url starts with "/") open in the same tab
  const internal = p.url.startsWith("/");
  return live ? (
    <a
      href={p.url}
      {...(internal ? { "data-cursor": t.work.openDemo } : { target: "_blank", rel: "noreferrer", "data-cursor": t.work.openLive })}
      {...shared}
    >
      {body}
    </a>
  ) : (
    <div {...shared}>{body}</div>
  );
}

/** Illustrated browser mock so the card looks finished before real screenshots exist */
function MockSite({ p, en }: { p: Project; en: boolean }) {
  const isShop = p.slug.includes("shop");
  const links = en ? ["Menu", isShop ? "Shop" : "Visit", "Contact"] : ["เมนู", isShop ? "สินค้า" : "ที่ตั้ง", "ติดต่อ"];
  return (
    <div aria-hidden="true" className="absolute inset-x-[7%] top-[10%] bottom-0 overflow-hidden rounded-t-xl bg-black/15 shadow-2xl transition duration-700 group-hover:-translate-y-2 group-hover:scale-[1.02]">
      <div className="flex items-center gap-1.5 bg-black/25 px-3 py-2">
        <span className="h-2 w-2 rounded-full bg-white/40" />
        <span className="h-2 w-2 rounded-full bg-white/40" />
        <span className="h-2 w-2 rounded-full bg-white/40" />
        <span className="ml-3 truncate rounded-full bg-white/10 px-3 py-0.5 font-mono text-[10px] opacity-80">
          {p.url.replace("https://", "").replace(/^\//, "work.rosekorn.com/")}
        </span>
      </div>
      <div className="p-[6%]">
        <div className="flex items-center justify-between text-[10px] opacity-80">
          <span className="font-semibold tracking-wide">{p.title.toUpperCase()}</span>
          <span className="hidden gap-3 sm:flex">
            {links.map((l) => (
              <span key={l}>{l}</span>
            ))}
          </span>
        </div>
        {isShop ? (
          <div className="mt-[6%]">
            <p className="font-serif text-[clamp(1.1rem,2.6vw,2rem)] italic leading-none">Handwoven in Thailand</p>
            <div className="mt-[6%] grid grid-cols-3 gap-2">
              {[0, 1, 2].map((i) => (
                <div key={i}>
                  <div
                    className="aspect-[3/4] rounded-md"
                    style={{
                      background: `repeating-linear-gradient(${45 + i * 30}deg, ${p.palette.accent} 0 6px, transparent 6px 12px), ${p.palette.fg}22`,
                    }}
                  />
                  <div className="mt-1 h-1.5 w-3/4 rounded bg-white/30" />
                  <div className="mt-1 text-[9px] font-semibold" style={{ color: p.palette.accent }}>
                    ฿{[890, 1250, 640][i]}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="mt-[8%] grid grid-cols-5 items-end gap-3">
            <div className="col-span-3">
              <p className="font-thai text-[clamp(1.2rem,3vw,2.4rem)] font-semibold leading-[1.05]">
                กาแฟดี
                <br />
                ใกล้บ้าน
              </p>
              <div className="mt-3 inline-flex rounded-full px-3 py-1 text-[9px] font-semibold" style={{ background: p.palette.accent, color: p.palette.bg }}>
                สั่งผ่าน LINE
              </div>
            </div>
            <div className="col-span-2 aspect-square rounded-full" style={{ background: `radial-gradient(circle at 35% 35%, ${p.palette.fg}, ${p.palette.accent} 45%, #6b4325 75%)` }} />
          </div>
        )}
      </div>
    </div>
  );
}
