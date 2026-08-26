import { Logo } from "@/components/brand/Logo";
import { DesktopNav } from "@/components/layout/DesktopNav";
import { MobileNav } from "@/components/layout/MobileNav";
import { Button } from "@/components/ui/Button";

/** Server component — composes the two interactive nav pieces. */
export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-line bg-surface/95 backdrop-blur-sm supports-[backdrop-filter]:bg-surface/85">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between gap-6 px-6 md:px-8 lg:px-12">
        <Logo href="/" height={26} priority />

        <div className="flex items-center gap-2">
          <DesktopNav />

          <div className="hidden lg:block lg:pl-4">
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
