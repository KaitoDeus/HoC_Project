"use client";

import DesktopHero from "./DesktopHero";
import MobileHero from "./MobileHero";

export default function Hero() {
  return (
    <>
      <div className="hidden md:block w-full">
        <DesktopHero />
      </div>
      <div className="block md:hidden w-full">
        <MobileHero />
      </div>
    </>
  );
}
