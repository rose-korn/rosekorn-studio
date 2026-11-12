import { principles, process } from "@/content/site";
import { SectionHeading } from "@/components/SectionHeading";
import { thaiIndex } from "@/lib/thai";

export function Process() {
  return (
    <section id="process" className="grain relative scroll-mt-20 overflow-hidden bg-ink py-24 text-paper md:py-36">
      <div className="container-x relative">
        <SectionHeading
          index={3}
          tone="dark"
          en="How we work"
          title={
            <>
              ขั้นตอนตรงไปตรงมา <span className="font-serif font-normal italic text-rose-soft">from hello to handover</span>
            </>
          }
          lead="ทุกข้อตกลงเป็นลายลักษณ์อักษร คุณรู้ตลอดว่างานอยู่ตรงไหน และจ่ายเท่าไร"
        />

        <ol className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {process.map((s, i) => (
            <li
              key={s.en}
              data-pop
              style={{ rotate: `${[-1.2, 0.8, -0.6, 1.1][i]}deg` }}
              className="wobbly flex flex-col border-[2.5px] border-paper bg-ink-2 p-7 shadow-[6px_6px_0_var(--color-rose)] md:p-8"
            >
              <span className="font-thai text-5xl text-rose">{thaiIndex(i + 1)}</span>
              <p className="eyebrow mt-10 text-paper/50">{s.en}</p>
              <h3 className="mt-2 font-thai text-2xl font-semibold">{s.title}</h3>
              <p className="mt-3 text-paper/70">{s.body}</p>
            </li>
          ))}
        </ol>

        <div className="mt-24 grid gap-10 md:grid-cols-3">
          {principles.map((p) => (
            <div key={p.title} className="border-t border-paper/20 pt-6" data-reveal>
              <h3 className="font-thai text-xl font-semibold">{p.title}</h3>
              <p className="mt-3 text-paper/70">{p.body}</p>
            </div>
          ))}
        </div>

        <div className="mt-20 flex flex-wrap items-center gap-x-10 gap-y-4 border-t border-paper/20 pt-8" data-reveal>
          <span className="eyebrow text-paper/50">Built with</span>
          {["Next.js", "TypeScript", "Rust · Axum", "Postgres · Supabase", "Vercel"].map((t) => (
            <span key={t} className="font-mono text-sm text-paper/80">
              {t}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
