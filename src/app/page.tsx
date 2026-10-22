import { DesktopHomepage } from "@/components/home/desktop-homepage";
import { MobileHomepage } from "@/components/home/mobile-homepage";

export default function Home() {
  return (
    <>
      <a className="skip-link hidden md:block" href="#desktop-main">
        Skip to content
      </a>
      <a className="skip-link md:hidden" href="#mobile-main">
        Skip to content
      </a>
      <DesktopHomepage />
      <MobileHomepage />
    </>
  );
}
