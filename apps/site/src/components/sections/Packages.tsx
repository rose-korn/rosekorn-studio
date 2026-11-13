import { addons, carePlan, launchPromo, packages } from "@/content/site";
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

        {launchPromo.active ? <PromoBanner /> : null}

        <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {packages.map((p, i) => (
            <article
              key={p.id}
              data-pop
              style={{ rotate: `${[-1, 0.8, -0.6, 1, -0.8][i % 5]}deg` }}
              className={`sticker wobbly relative flex flex-col p-7 transition duration-300 hover:-translate-y-2 hover:rotate-0 ${
                p.featured ? "sticker-rose bg-ink text-paper" : "bg-paper"
              }`}
            >
              {p.featured ? (
                <span className="stamp absolute -right-3 -top-4 rotate-6 bg-paper font-thai text-sm text-rose-deep">
                  ยอดนิยม ★
                </span>
              ) : null}
              <p className={`eyebrow ${p.featured ? "text-paper/60" : "text-muted"}`}>{p.name}</p>
              <h3 className="mt-3 font-thai text-2xl font-semibold leading-snug">{p.th}</h3>
              <div className="mt-8 flex flex-wrap items-baseline gap-x-2">
                {p.priceNote ? <span className={`whitespace-nowrap ${p.featured ? "text-paper/60" : "text-muted"}`}>{p.priceNote}</span> : null}
                {launchPromo.active && p.promoPrice ? (
                  <>
                    <span className="text-5xl font-semibold tracking-tight">฿{p.promoPrice}</span>
                    <s className={`text-lg ${p.featured ? "text-paper/50" : "text-muted"}`} aria-label={`ราคาปกติ ${p.price} บาท`}>
                      ฿{p.price}
                    </s>
                  </>
                ) : (
                  <span className="text-5xl font-semibold tracking-tight">฿{p.price}</span>
                )}
              </div>
              {launchPromo.active && p.promoPrice ? (
                <p className="mt-2 inline-flex w-fit rounded-full border-2 border-current px-2.5 py-0.5 text-xs font-semibold text-rose">
                  ราคาโปรเปิดตัว · ถึง {launchPromo.until}
                </p>
              ) : null}
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
                data-cursor="เลือก!"
                className={`press group mt-8 inline-flex h-12 items-center justify-between rounded-full border-2 pl-5 pr-1.5 text-sm font-semibold ${
                  p.featured ? "border-paper bg-rose text-white" : "border-ink bg-paper hover:bg-ink hover:text-paper"
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

        <div className="mt-10 grid gap-6 lg:grid-cols-12">
          <div className="sticker wobbly bg-paper p-7 lg:col-span-7" data-pop>
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
          <div className="sticker wobbly relative bg-rose p-7 text-white lg:col-span-5" data-pop style={{ rotate: "1deg" }}>
            <span className="tape absolute -top-3 right-12 z-10 h-6 w-20 rotate-3" aria-hidden="true" />
            <div className="wobbly pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
              <div className="absolute -right-16 -top-16 h-56 w-56 rounded-full border border-white/25" />
              <div className="absolute -right-6 -top-6 h-36 w-36 rounded-full border border-white/25" />
            </div>
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

/** "First 10 clients" launch strip with a seat counter (seats are updated by hand in content/site.ts) */
function PromoBanner() {
  const left = launchPromo.total - launchPromo.taken;
  return (
    <div className="sticker wobbly relative mt-14 grid gap-6 bg-ink p-7 text-paper md:grid-cols-[1fr_auto] md:items-center md:p-9" data-pop style={{ rotate: "-0.6deg" }}>
      <span className="stamp absolute -top-4 left-6 -rotate-3 bg-rose font-thai text-sm text-white" style={{ borderColor: "var(--color-ink)" }}>
        LAUNCH ✿
      </span>
      <div>
        <p className="font-thai text-2xl font-semibold md:text-3xl">{launchPromo.headline}</p>
        <p className="mt-2 text-paper/85">{launchPromo.offer}</p>
        <p className="mt-1 text-sm text-paper/60">
          {launchPromo.condition} · หมดเขตเมื่อครบ {launchPromo.total} ท่าน หรือ {launchPromo.until}
        </p>
      </div>
      <div className="md:text-right">
        <p className="font-mono text-xs tracking-[0.2em] text-paper/60">เหลืออีก</p>
        <p className="text-5xl font-semibold tabular-nums">
          {left}
          <span className="text-2xl text-paper/50"> / {launchPromo.total} ที่</span>
        </p>
        <ul className="mt-3 flex gap-1.5 md:justify-end" aria-hidden="true">
          {Array.from({ length: launchPromo.total }, (_, i) => (
            <li key={i} className={`h-3 w-3 rounded-full border-2 border-paper ${i < launchPromo.taken ? "bg-transparent" : "bg-rose"}`} />
          ))}
        </ul>
      </div>
    </div>
  );
}
