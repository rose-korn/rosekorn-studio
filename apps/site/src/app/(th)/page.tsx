import type { Metadata } from "next";
import { HomePage } from "@/components/HomePage";
import { languageAlternates } from "@/components/RootShell";

export const metadata: Metadata = { alternates: languageAlternates("th", "/") };

export default function Home() {
  return <HomePage locale="th" />;
}
