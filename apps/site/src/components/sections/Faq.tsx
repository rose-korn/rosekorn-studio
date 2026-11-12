import { faqs } from "@/content/site";
import { SectionHeading } from "@/components/SectionHeading";

export function Faq() {
  return (
    <section id="faq" className="scroll-mt-20 py-24 md:py-36">
      <div className="container-x">
        <SectionHeading index={4} en="FAQ" title="คำถามที่พบบ่อย" />
        <div className="mt-14 grid md:grid-cols-12 md:gap-10">
          <div className="md:col-span-9 md:col-start-4">
          {faqs.map((f) => (
            <details key={f.q} className="group border-b-2 border-dashed border-ink/25" data-reveal>
              <summary className="flex cursor-pointer items-center justify-between gap-6 py-6 font-thai text-xl font-medium md:text-2xl">
                {f.q}
                <span className="sticker-sm relative flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-paper transition group-open:rotate-45 group-open:bg-rose group-open:text-white">
                  <span className="absolute h-px w-3.5 bg-current" />
                  <span className="absolute h-3.5 w-px bg-current" />
                </span>
              </summary>
              <p className="max-w-2xl pb-7 text-lg text-muted">{f.a}</p>
            </details>
          ))}
          </div>
        </div>
      </div>
    </section>
  );
}
