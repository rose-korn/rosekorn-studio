/* eslint-disable @next/next/no-img-element -- client photos are plain static files (or Sheet links) on a static export */
import { Illo } from "./Illo";
import type { Picture } from "./types";

/** A photo slot: the real photo when there is one, otherwise a drawn placeholder */
export function Pic({ pic, className = "" }: { pic: Picture; className?: string }) {
  if (pic.src) return <img src={pic.src} alt={pic.alt} className={`h-full w-full object-cover ${className}`} loading="lazy" />;
  return (
    <div role="img" aria-label={pic.alt} className={`flex h-full w-full items-center justify-center bg-[var(--t-soft)] ${className}`}>
      <Illo kind={pic.illo ?? "storefront"} className="h-3/4 w-3/4" />
    </div>
  );
}
