import { Logo } from "@/components/brand/Logo";
import { DesktopNav } from "@/components/layout/DesktopNav";
import { MobileNav } from "@/components/layout/MobileNav";
import { Button } from "@/components/ui/Button";

/** Server component — composes the two interactive nav pieces. */
export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-line bg-surface/95 backdrop-blur-sm supports-[backdrop-filter]:bg-surface/85">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between gap-6 px-6 md:px-8 lg:px-12">
        {/*
          Brand lockup: the Morakniv mark stays the primary logo. The text
          beside it names the programme and the market — it is not a second
          logo, and Akmal Station is deliberately not represented here.
          The rule and text drop away on the narrowest screens so the mark
          never has to shrink.
        */}
        <div className="flex min-w-0 items-center gap-3">
          <Logo href="/" height={26} priority />

          <span
            aria-hidden
            className="hidden h-7 w-px shrink-0 bg-line sm:block"
          />

          <span className="label-eyebrow hidden leading-[1.35] text-ink-subtle sm:block">
            Food Industry
            <br />
            Malaysia
          </span>
        </div>

        <div className="flex items-center gap-2">
          <DesktopNav />

          {/* Paired with DesktopNav — both appear at `xl`, not before. */}
          <div className="hidden xl:block xl:pl-3 2xl:pl-4">
            <Button href="/contact" size="sm">
              Request a quotation
            </Button>
          </div>

          <MobileNav />
        </div>
      </div>
    </header>
  );
}
