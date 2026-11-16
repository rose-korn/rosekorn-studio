import { About } from "./sections/About";
import { Contact } from "./sections/Contact";
import { Footer } from "./sections/Footer";
import { Gallery } from "./sections/Gallery";
import { Header } from "./sections/Header";
import { Hero } from "./sections/Hero";
import { Highlights } from "./sections/Highlights";
import { HowTo } from "./sections/HowTo";
import { Payment } from "./sections/Payment";
import { Perks } from "./sections/Perks";
import { Reviews } from "./sections/Reviews";
import { Team } from "./sections/Team";
import { Visit } from "./sections/Visit";
import { themeVars } from "./ui";
import type { BasicConfig, Look } from "./types";

/**
 * Landing Basic: one page for a small shop, built from one BasicConfig.
 *
 * - Every section lives in sections/ and draws itself in the config's `look` (cozy, poster or calm).
 * - Optional sections (perks, gallery, team, reviews, how to order, payment) render nothing when the config leaves them out.
 * - The order below is part of each look: the shop leads with products, the cafe and the salon with their story.
 * - Colours are CSS variables (--t-*) on the root, so the demo's colour switcher can swap them live.
 *
 * With a Google Sheet (config.sheet), render <LiveLanding> instead: it reads the sheet and passes the result here.
 */
const ORDER: Record<Look, ((p: { c: BasicConfig }) => React.ReactNode)[]> = {
  cozy: [Hero, About, Highlights, Team, Reviews, HowTo, Payment, Gallery, Visit, Contact],
  poster: [Hero, Perks, Highlights, About, Reviews, HowTo, Payment, Gallery, Visit, Contact],
  calm: [Hero, About, Highlights, Team, Reviews, HowTo, Gallery, Payment, Visit, Contact],
};

export function BasicLanding({ c, displayFont = "" }: { c: BasicConfig; displayFont?: string }) {
  return (
    <div id="tpl-root" className={`${displayFont} min-h-screen bg-[var(--t-bg)] font-thai text-[var(--t-ink)]`} style={themeVars(c.themes[0])}>
      <Header c={c} />
      <main id="top">
        {ORDER[c.look].map((Section, i) => (
          <Section key={i} c={c} />
        ))}
      </main>
      <Footer c={c} />
    </div>
  );
}
