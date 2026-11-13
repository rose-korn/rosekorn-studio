import { RootShell, baseMetadata, viewport } from "@/components/RootShell";

export const metadata = baseMetadata("en");
export { viewport };

export default function EnglishLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <RootShell locale="en">{children}</RootShell>;
}
