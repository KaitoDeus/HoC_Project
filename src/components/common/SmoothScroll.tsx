"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { scrollService } from "@/services/scroll.service";

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  useEffect(() => {
    const lenis = scrollService.init();

    if (document.querySelector("[data-loading]")) {
      scrollService.stop();
    }

    let rafId: number;
    const raf = (time: number) => {
      lenis?.raf(time);
      rafId = requestAnimationFrame(raf);
    };

    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      scrollService.destroy();
    };
  }, []);

  useEffect(() => {
    scrollService.start();

    const timer = setTimeout(() => {
      scrollService.start();
      scrollService.resize();
      scrollService.scrollTo(0, { immediate: true });
    }, 200);

    return () => clearTimeout(timer);
  }, [pathname]);

  return <>{children}</>;
}
