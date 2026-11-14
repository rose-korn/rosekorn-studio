import { RootShell, baseMetadata, viewport } from "@/components/RootShell";

export const metadata = baseMetadata("th");
export { viewport };

export default function ThaiLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <RootShell locale="th">{children}</RootShell>;
}
