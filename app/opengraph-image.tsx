import { ImageResponse } from "next/og";

import { siteConfig } from "@/lib/site";

export const alt = `${siteConfig.name} — ${siteConfig.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Typographic card rendered by Satori. The supplied Brandon Grotesque kit is
 * woff2-only, which Satori cannot parse, so this falls back to the bundled
 * sans. Swap in a .ttf/.otf cut of Brandon Grotesque if the client licence
 * covers one.
 */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#ffffff",
          padding: "72px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div style={{ width: "48px", height: "4px", backgroundColor: "#b72d25" }} />
          <div
            style={{
              fontSize: 22,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "#71767d",
            }}
          >
            Made in Mora, Sweden since 1891
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 92,
              fontWeight: 700,
              letterSpacing: "-0.03em",
              lineHeight: 1.02,
              color: "#17181a",
            }}
          >
            Professional Food
          </div>
          <div
            style={{
              fontSize: 92,
              fontWeight: 700,
              letterSpacing: "-0.03em",
              lineHeight: 1.02,
              color: "#17181a",
            }}
          >
            Industry Knives
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: "1px solid #e4e4e2",
            paddingTop: "28px",
          }}
        >
          <div style={{ fontSize: 30, fontWeight: 700, color: "#b72d25" }}>
            MORAKNIV
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end",
            }}
          >
            <div style={{ fontSize: 24, color: "#71767d" }}>
              Food Industry Malaysia
            </div>
            <div style={{ fontSize: 18, color: "#9aa0a6", marginTop: 4 }}>
              Distributed &amp; imported by Akmal Station
            </div>
          </div>
        </div>
      </div>
    ),
    size,
  );
}
