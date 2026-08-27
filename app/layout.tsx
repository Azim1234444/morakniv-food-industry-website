import type { Metadata, Viewport } from "next";

import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { brandonGrotesque } from "@/lib/fonts";
import { distributor, siteConfig, siteUrl } from "@/lib/site";

import "./globals.css";

export const metadata: Metadata = {
  /* `null` when NEXT_PUBLIC_SITE_URL is unset or invalid: Next.js then treats
     the base as unconfigured instead of crashing on `new URL("")`. */
  metadataBase: siteUrl ?? null,
  title: {
    default: `${siteConfig.name} — ${siteConfig.tagline}`,
    template: `%s — ${siteConfig.shortName}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  keywords: [
    "food industry knives",
    "boning knives",
    "butcher knives",
    "filleting knives",
    "trimming knives",
    "professional knives Malaysia",
    "meat processing knives",
    "Swedish stainless steel knives",
    "Morakniv",
    "Morakniv Food Industry",
    "Akmal Station",
    "knife distributor Malaysia",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    siteName: siteConfig.name,
    title: `${siteConfig.name} — ${siteConfig.tagline}`,
    description: siteConfig.description,
    locale: siteConfig.locale,
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} — ${siteConfig.tagline}`,
    description: `Professional food industry knives made in Mora, Sweden since 1891. ${distributor.attribution} in Malaysia.`,
  },
  robots: {
    index: true,
    follow: true,
  },
  formatDetection: {
    telephone: false,
  },
};

export const viewport: Viewport = {
  themeColor: "#b72d25",
  colorScheme: "light",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang={siteConfig.lang}
      className={`${brandonGrotesque.variable} h-full`}
    >
      <body className="flex min-h-full flex-col bg-surface text-ink antialiased">
        <a href="#main" className="skip-link bg-brand px-4 py-2 text-white">
          Skip to content
        </a>
        <SiteHeader />
        <main id="main" className="flex-1">
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
