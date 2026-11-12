import { addons, carePlan, packages } from "@/content/site";
import { SectionHeading } from "@/components/SectionHeading";
import { Arrow } from "@/components/Arrow";

export function Packages() {
  return (
    <section id="packages" className="scroll-mt-20 bg-paper-2 py-24 md:py-36">
      <div className="container-x">
        <SectionHeading
          index={2}
          en="Packages & pricing"
          title={
            <>
              ราคาชัดเจน <span className="font-serif font-normal italic">ไม่มีบวกเพิ่มทีหลัง</span>
            </>
          }
          lead="ทุกแพ็กเกจมีใบเสนอราคาที่ระบุชัดว่ารวมและไม่รวมอะไร มัดจำ 50% ก่อนเริ่ม อีก 50% ตอนส่งมอบ"
        />

        <div className="mt-16 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {packages.map((p) => (
            <article
              key={p.id}
              data-reveal
              className={`relative flex flex-col rounded-[1.25rem] p-7 transition duration-300 hover:-translate-y-1 ${
                p.featured ? "bg-ink text-paper shadow-[0_30px_60px_-30px_rgba(21,19,17,.6)]" : "border border-ink/10 bg-paper"
              }`}
            >
              {p.featured ? (
                <span className="absolute -top-3 left-7 rounded-full bg-rose px-3 py-1 text-xs font-medium text-white">
                  ยอดนิยม
                </span>
              ) : null}
              <p className={`eyebrow ${p.featured ? "text-paper/60" : "text-muted"}`}>{p.name}</p>
              <h3 className="mt-3 font-thai text-2xl font-semibold leading-snug">{p.th}</h3>
              <div className="mt-8 flex items-baseline gap-2">
                {p.priceNote ? <span className={p.featured ? "text-paper/60" : "text-muted"}>{p.priceNote}</span> : null}
                <span className="text-5xl font-semibold tracking-tight">฿{p.price}</span>
              </div>
              <p className={`mt-2 text-sm ${p.featured ? "text-paper/60" : "text-muted"}`}>ส่งงาน {p.delivery}</p>
              <ul className={`mt-8 flex-1 space-y-3 border-t pt-6 ${p.featured ? "border-paper/15" : "border-ink/10"}`}>
                {p.features.map((f) => (
                  <li key={f} className="flex gap-3 text-[0.95rem]">
                    <span className="mt-[0.6em] h-1.5 w-1.5 shrink-0 rounded-full bg-rose" />
                    {f}
                  </li>
                ))}
              </ul>
              <a
                href="#contact"
                data-package={p.id}
                className={`group mt-8 inline-flex h-12 items-center justify-between rounded-full pl-5 pr-1.5 text-sm transition ${
                  p.featured ? "bg-rose text-white hover:bg-paper hover:text-ink" : "border border-ink/15 hover:border-ink hover:bg-ink hover:text-paper"
                }`}
              >
                {p.cta}
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-current/10">
                  <Arrow className="h-3.5 w-3.5 transition group-hover:rotate-45" />
                </span>
              </a>
            </article>
          ))}
        </div>

        <div className="mt-6 grid gap-4 lg:grid-cols-12">
          <div className="rounded-[1.25rem] border border-ink/10 bg-paper p-7 lg:col-span-7" data-reveal>
            <p className="eyebrow text-muted">Add-ons · งานเสริม</p>
            <ul className="mt-4 divide-y divide-ink/10">
              {addons.map((a) => (
                <li key={a.name} className="flex flex-col justify-between gap-1 py-4 sm:flex-row sm:items-baseline">
                  <span>{a.name}</span>
                  <span className="font-medium tabular-nums">฿{a.price}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="relative overflow-hidden rounded-[1.25rem] bg-rose p-7 text-white lg:col-span-5" data-reveal>
            <div className="absolute -right-16 -top-16 h-56 w-56 rounded-full border border-white/25" aria-hidden="true" />
            <div className="absolute -right-6 -top-6 h-36 w-36 rounded-full border border-white/25" aria-hidden="true" />
            <p className="eyebrow text-white/75">{carePlan.name}</p>
            <h3 className="mt-3 font-thai text-2xl font-semibold">{carePlan.th}</h3>
            <p className="mt-6 text-5xl font-semibold tracking-tight">
              ฿{carePlan.price}
              <span className="text-lg font-normal text-white/75"> / เดือน</span>
            </p>
            <ul className="mt-6 space-y-2">
              {carePlan.features.map((f) => (
                <li key={f} className="flex gap-3">
                  <span aria-hidden="true">✓</span>
                  {f}
                </li>
              ))}
            </ul>
            <p className="mt-6 text-sm text-white/80">เพิ่มได้กับทุกแพ็กเกจ ไม่ต้องกังวลเรื่องเว็บล่มหรือหาคนแก้</p>
          </div>
        </div>
      </div>
    </section>
  );
}
