import { site } from "@/content/site";
import { thaiIndex } from "@/lib/thai";
import { LineIcon } from "@/components/LineIcon";
import { Arrow } from "@/components/Arrow";
import { ContactForm } from "./ContactForm";

export function Contact() {
  return (
    <section id="contact" className="grain relative scroll-mt-20 overflow-hidden bg-ink-2 py-24 text-paper md:py-36">
      <div className="container-x relative grid gap-14 lg:grid-cols-12">
        <div className="lg:col-span-6" data-reveal>
          <p className="eyebrow flex items-center gap-3 text-paper/60">
            <span className="flex h-9 w-9 -rotate-6 items-center justify-center rounded-full border-2 border-current bg-rose font-thai text-base tracking-normal text-white">
              {thaiIndex(5)}
            </span>
            <span className="h-px w-8 bg-current opacity-40" />
            Let&apos;s talk
          </p>
          <h2 data-split className="mt-8 font-thai text-[clamp(2.6rem,6.5vw,5.5rem)] font-semibold leading-[1.05] tracking-tight">
            มาคุยกัน
            <br />
            <span className="font-serif font-normal italic text-rose">ก่อนตัดสินใจ</span>
          </h2>
          <p className="mt-6 max-w-md text-lg text-paper/70">
            คุยฟรี 30 นาที ไม่มีข้อผูกมัด เล่าโจทย์มาได้เลย เราจะแนะนำแพ็กเกจที่คุ้มที่สุดสำหรับธุรกิจคุณ
          </p>

          <div className="mt-10 grid gap-3 sm:max-w-md">
            <a
              href={site.lineUrl}
              target="_blank"
              rel="noreferrer"
              data-cursor="แอดเลย"
              className="press group flex h-16 items-center justify-between rounded-2xl border-[2.5px] border-paper bg-line-green px-6 text-white shadow-[5px_5px_0_var(--color-paper)]"
            >
              <span className="flex items-center gap-3 font-medium">
                <LineIcon className="h-6 w-6" /> แอด LINE {site.lineOaId}
              </span>
              <Arrow className="h-4 w-4 transition group-hover:rotate-45" />
            </a>
            {/* Cal.com link for now; replace with the embedded widget in phase 4, then a Rust booking service */}
            <a
              href={site.bookingUrl}
              target="_blank"
              rel="noreferrer"
              data-cursor="จองคิว"
              className="press group flex h-16 items-center justify-between rounded-2xl border-[2.5px] border-paper px-6 shadow-[5px_5px_0_var(--color-rose)]"
            >
              <span className="font-medium">จองเวลาคุยผ่านวิดีโอคอล</span>
              <Arrow className="h-4 w-4 transition group-hover:rotate-45" />
            </a>
            <a href={`mailto:${site.email}`} className="link-underline mt-2 w-fit text-paper/70">
              {site.email}
            </a>
          </div>
        </div>

        <div className="relative lg:col-span-6" data-reveal>
          <span className="tape absolute -top-3 left-12 z-10 h-6 w-24 -rotate-2" aria-hidden="true" />
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
