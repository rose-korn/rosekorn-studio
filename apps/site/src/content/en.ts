/**
 * English copy for work.rosekorn.com/en/. Prices, ids, links and images come from the Thai
 * source in site.ts so the two languages can never disagree on numbers; only the words live here.
 */
import * as th from "./site";
import type { Package, Project } from "./site";

export const site = {
  ...th.site,
  description:
    "Independent web studio in Bangkok building fast Next.js websites for shops, cafés and Thai brands: custom design, SEO-ready, PromptPay and LINE OA built in, and full source code handed over.",
  openingNote: "Booking projects from Jan 2027",
} as const;

export const nav = [
  { href: "#work", label: "Work", en: "Selected work" },
  { href: "#packages", label: "Pricing", en: "Packages" },
  { href: "#process", label: "Process", en: "How we work" },
  { href: "#faq", label: "FAQ", en: "Questions" },
] as const;

export const marquee = [
  "Next.js",
  "Custom design",
  "Responsive",
  "SEO-ready",
  "PromptPay",
  "LINE OA",
  "Rust API",
  "PageSpeed 90+",
  "Shopify",
  "Full code handover",
] as const;

const projectText: Record<string, Pick<Project, "kind" | "summary"> & { stamp?: string }> = {
  "valorant-list": {
    kind: "Web app · Fan-made, TH / EN",
    summary:
      "A Thai-language Valorant companion: agents, abilities, map callouts, weapons, skins and ranks, with a 3D model viewer and an aim-training mini game. Fully static, with data pulled from an API at build time.",
  },
  workspace3d: {
    kind: "3D web · Online co-working room",
    summary:
      "A 3D room for working alongside friends, styled as a shophouse turned café. Walk around with WASD, head upstairs to the quiet room, and pick from 12 character outfits.",
  },
  "demo-cafe": {
    kind: "Landing page · Café (demo site)",
    summary:
      "A fictional café built as a showcase: 3D coffee pours from a kettle and flows down the page into a cup at the bottom, with an orderable chalkboard menu, a sideways story and a map. This is what the Landing Signature package delivers.",
  },
  "demo-fashion": {
    kind: "Landing page · Fashion label (demo site)",
    summary:
      "A fictional high-fashion label: editorial type, a runway lookbook that slides look by look, the story behind the handwoven fabric, and private fittings booked via LINE. Another face of the Landing Signature package.",
  },
  "demo-shop": {
    kind: "Online shop · Handwoven textiles",
    summary:
      "A complete online store: cart, automatic shipping rates, stock tracking and PromptPay checkout, backed by a Rust API.",
    stamp: "Coming soon",
  },
};

export const projects: Project[] = th.projects.map((p) => ({ ...p, ...projectText[p.slug] }));

const packageText: Record<string, Pick<Package, "th" | "delivery" | "features" | "cta"> & { priceNote?: string }> = {
  "landing-basic": {
    th: "Get online, fast",
    delivery: "~2 weeks",
    features: ["Template tailored to your colours and copy", "One page with a contact form", "Responsive on every screen"],
    cta: "Start with this package",
  },
  "landing-custom": {
    th: "A fully custom page",
    delivery: "~3 weeks",
    features: ["Designed from scratch, no templates", "Built with Next.js for speed", "Technical SEO + Open Graph", "2 rounds of revisions"],
    cta: "Choose the most popular",
  },
  "landing-signature": {
    th: "3D and scroll storytelling",
    delivery: "~6 weeks",
    features: [
      "A 3D scene (Three.js) designed for your brand",
      "Scroll-driven storytelling (GSAP)",
      "Menu or catalogue that orders via LINE",
      "Custom illustrations, 3 rounds of revisions",
    ],
    cta: "Discuss a page like this",
  },
  "shop-starter": {
    th: "Launch on a platform",
    delivery: "~7 weeks",
    features: ["Shopify or WooCommerce setup", "Theme tailored to your brand", "20 products uploaded for you"],
    cta: "Start with this package",
  },
  "shop-custom": {
    th: "A fully custom store",
    priceNote: "from",
    delivery: "Scoped on a call",
    features: ["Next.js + Rust API", "Cart and PromptPay checkout", "Admin for products and orders"],
    cta: "Book a scoping call",
  },
};

export const packages: Package[] = th.packages.map((p) => ({ ...p, ...packageText[p.id] }));

export const launchPromo = {
  ...th.launchPromo,
  until: "31 March 2027",
  headline: "Launch offer for our first 10 clients",
  offer: "15% off every open package (except Landing Basic) + 3 months of Care Plan free, worth ฿4,500",
  condition: "In return, we feature your project in our portfolio and you write us one review",
} as const;

export const addons = [
  { name: "One 3D or scroll-animation piece (with Landing Custom)", price: th.addons[0].price },
  { name: "Payment / PromptPay integration", price: th.addons[1].price },
  { name: "LINE OA setup: welcome message, auto-replies and rich menu", price: th.addons[2].price },
  { name: "Website forms or orders sent straight to your LINE", price: th.addons[3].price },
  { name: "Facebook Pixel or GA4 setup", price: "1,000–1,500 / item" },
  { name: "Out-of-scope changes", price: "350 / hour" },
] as const;

export const carePlan = {
  ...th.carePlan,
  th: "Monthly care",
  features: ["Hosting and domain renewals handled", "Bug fixes when something breaks", "Up to 3 hours of content updates a month"],
} as const;

export const process = [
  { title: "Discovery call", en: "Discover", body: "A free 30-minute call about your business, your customers and what the site needs to do." },
  {
    title: "Written proposal",
    en: "Proposal",
    body: "Everything in writing, with what is and isn’t included spelled out. No hidden costs.",
  },
  { title: "50% deposit, then we build", en: "Design & Build", body: "Design and development with live preview links along the way. Two rounds of revisions." },
  {
    title: "Launch and handover",
    en: "Launch & Handover",
    body: "Settle the remaining 50% and receive the domain, source code, README and docker-compose, so anyone can run it with one command.",
  },
] as const;

export const principles = [
  { title: "Fast on mobile", body: "Almost all Thai customers browse on their phones. We target PageSpeed 90+ on every project." },
  {
    title: "Built for how Thailand buys",
    body: "LINE OA, PromptPay and Thai shipping rules are part of the build from day one, not bolted on later.",
  },
  { title: "You own the code", body: "Full source code and documentation on handover. Change developers whenever you like, with no lock-in." },
] as const;

export const faqs = [
  {
    q: "Are the domain and hosting included?",
    a: "The domain, product photos and copywriting are not included, and every quote says so clearly. On the Care Plan, we host the site and handle renewals for you.",
  },
  {
    q: "How do payments work?",
    a: "A 50% deposit before we start and the remaining 50% before we hand over the domain and code. Pay by PromptPay or bank transfer.",
  },
  {
    q: "How many revisions do I get?",
    a: "Two rounds within the agreed scope. Anything beyond that gets a new written quote at ฿350 per hour.",
  },
  {
    q: "What if I want someone else to maintain the site later?",
    a: "No problem. Every project ships with a README and docker-compose, and the API is a separate service you can swap out without rebuilding the site.",
  },
  {
    q: "What kind of businesses do you work with?",
    a: "Shops, cafés, restaurants, product brands and service businesses that want a website of their own rather than relying only on marketplaces and social platforms.",
  },
] as const;
