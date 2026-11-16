/**
 * Landing Basic template: everything a client's one-page site needs, in one object.
 * For a new client, copy a config (e.g. configs/cafe.ts), swap the text, photos and theme, and the page follows.
 */
import type { IlloKind } from "./Illo";

export type Theme = {
  /** shown on the colour switcher in the demo bar */
  label: string;
  bg: string;
  /** cards and panels */
  surface: string;
  ink: string;
  muted: string;
  accent: string;
  /** text on the accent colour */
  onAccent: string;
  soft: string;
};

/** a photo slot: a real image path for a client, or a drawn placeholder in the demo */
export type Picture = { src?: string; illo?: IlloKind; alt: string };

export type BasicConfig = {
  name: string;
  /** short line under the name, e.g. the street or the kind of shop */
  kicker: string;
  tagline: string;
  hero: Picture;
  about: { title: string; body: string; facts: { label: string; value: string }[] };
  highlights: { title: string; items: { name: string; note?: string; price?: string; pic: Picture }[] };
  gallery: { title: string; items: (Picture & { caption?: string })[] };
  hours: { day: string; time: string; closed?: boolean }[];
  address: string;
  mapUrl: string;
  contact: { lineId: string; lineUrl: string; phone: string; email: string; facebook?: string; instagram?: string };
  form: { title: string; lead: string };
  themes: Theme[];
};
