import { projects, type Project } from "@/content/site";
import { SectionHeading } from "@/components/SectionHeading";
import { Arrow } from "@/components/Arrow";

export function Work() {
  return (
    <section id="work" className="scroll-mt-20 py-24 md:py-36">
      <div className="container-x">
        <SectionHeading
          index={1}
          en="Selected work"
          title={
            <>
              ผลงานตัวอย่าง <span className="font-serif font-normal italic">ที่ลองกดเล่นได้จริง</span>
            </>
          }
          lead="สองเว็บนี้สร้างขึ้นเพื่อโชว์สิ่งที่ลูกค้าจะได้ ทั้งหน้าร้านแบบหน้าเดียว และร้านค้าออนไลน์ที่มีระบบตะกร้าและชำระเงิน"
        />
        <div className="mt-16 grid gap-10 md:grid-cols-2 md:gap-8">
          {projects.map((p, i) => (
            <ProjectCard key={p.slug} p={p} offset={i % 2 === 1} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ p, offset }: { p: Project; offset: boolean }) {
  return (
    <a
      href={p.url}
      target="_blank"
      rel="noreferrer"
      className={`group block ${offset ? "md:mt-24" : ""}`}
      data-reveal
    >
      <div
        className="relative aspect-[4/3] overflow-hidden rounded-[1.25rem]"
        style={{ background: p.palette.bg, color: p.palette.fg }}
      >
        <MockSite p={p} />
        <span className="absolute right-4 top-4 flex h-12 w-12 items-center justify-center rounded-full bg-paper text-ink opacity-0 transition duration-300 group-hover:opacity-100 group-hover:rotate-45">
          <Arrow className="h-5 w-5" />
        </span>
      </div>
      <div className="mt-6 flex items-start justify-between gap-6">
        <div>
          <p className="eyebrow text-muted">{p.kind}</p>
          <h3 className="mt-2 text-3xl font-semibold tracking-tight">{p.title}</h3>
          <p className="mt-3 max-w-md text-muted">{p.summary}</p>
        </div>
        <span className="eyebrow shrink-0 text-muted">{p.year}</span>
      </div>
      <ul className="mt-4 flex flex-wrap gap-2">
        {p.tags.map((t) => (
          <li key={t} className="rounded-full border border-ink/15 px-3 py-1 text-xs">
            {t}
          </li>
        ))}
      </ul>
    </a>
  );
}

/** Illustrated browser mock so the card looks finished before real screenshots exist */
function MockSite({ p }: { p: Project }) {
  const isShop = p.slug.includes("shop");
  return (
    <div className="absolute inset-x-[7%] top-[10%] bottom-0 overflow-hidden rounded-t-xl bg-black/15 shadow-2xl transition duration-700 group-hover:-translate-y-2 group-hover:scale-[1.02]">
      <div className="flex items-center gap-1.5 bg-black/25 px-3 py-2">
        <span className="h-2 w-2 rounded-full bg-white/40" />
        <span className="h-2 w-2 rounded-full bg-white/40" />
        <span className="h-2 w-2 rounded-full bg-white/40" />
        <span className="ml-3 truncate rounded-full bg-white/10 px-3 py-0.5 font-mono text-[10px] opacity-80">
          {p.url.replace("https://", "")}
        </span>
      </div>
      <div className="p-[6%]">
        <div className="flex items-center justify-between text-[10px] opacity-80">
          <span className="font-semibold tracking-wide">{p.title.toUpperCase()}</span>
          <span className="hidden gap-3 sm:flex">
            <span>เมนู</span>
            <span>{isShop ? "สินค้า" : "ที่ตั้ง"}</span>
            <span>ติดต่อ</span>
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
