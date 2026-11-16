import type { Metadata } from "next";
import { languageAlternates } from "@/components/RootShell";
import { TemplatesIndex } from "@/components/TemplatesIndex";
import { templatesCopy } from "@/content/templates";

export const metadata: Metadata = {
  title: templatesCopy.th.metaTitle,
  description: templatesCopy.th.metaDescription,
  alternates: languageAlternates("th", "/templates/"),
};

export default function Templates() {
  return <TemplatesIndex locale="th" />;
}
