import type { Metadata } from "next";
import { languageAlternates } from "@/components/RootShell";
import { TemplatesIndex } from "@/components/TemplatesIndex";
import { templatesCopy } from "@/content/templates";

export const metadata: Metadata = {
  title: templatesCopy.en.metaTitle,
  description: templatesCopy.en.metaDescription,
  alternates: languageAlternates("en", "/templates/"),
};

export default function Templates() {
  return <TemplatesIndex locale="en" />;
}
