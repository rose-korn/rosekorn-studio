import type { NextConfig } from "next";

/**
 * Static export: `next build` writes plain HTML/CSS/JS to `apps/site/out`,
 * which Cloudflare Pages serves from its CDN with no server needed.
 * When the site later needs server features (API routes, ISR), switch to
 * @opennextjs/cloudflare instead; the Rust API stays a separate service either way.
 */
const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  // one shared 404 page, since the Thai and English route groups each have their own root layout
  experimental: { globalNotFound: true },
};

export default nextConfig;
