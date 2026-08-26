import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    /**
     * Next.js 16 requires an explicit allowlist. The supplied photographs are
     * large (10.2 MB and 5.2 MB masters), so they are always served through the
     * optimizer at one of these qualities — never at source weight.
     */
    qualities: [70, 85, 90],
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
