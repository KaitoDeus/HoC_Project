"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  useEffect(() => {
    // Chỉ kích hoạt Lenis trên môi trường Client
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Smooth easing giống Obys Agency
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.5,
    });

    // Nếu màn hình loading đang hiển thị, tạm dừng cuộn ngay từ đầu
    if (document.querySelector("[data-loading]")) {
      lenis.stop();
    }

    let rafId: number;

    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };

    rafId = requestAnimationFrame(raf);

    // Lưu instance vào global window để có thể gọi ở các component khác nếu cần (ví dụ: tắt/mở scroll khi mở drawer)
    (window as unknown as { lenis?: Lenis }).lenis = lenis;

    return () => {
      lenis.destroy();
      cancelAnimationFrame(rafId);
      delete (window as unknown as { lenis?: Lenis }).lenis;
    };
  }, []);

  // Tái tính toán chiều cao trang và cuộn về đầu trang khi chuyển tuyến đường (route transition)
  useEffect(() => {
    // Đảm bảo Lenis luôn được mở khóa khi chuyển trang
    const lenis = (window as unknown as { lenis?: Lenis }).lenis;
    if (lenis) {
      // Mở khóa cuộn ngay lập tức
      lenis.start();
      
      const timer = setTimeout(() => {
        const currentLenis = (window as unknown as { lenis?: Lenis }).lenis;
        if (currentLenis) {
          currentLenis.start(); // Mở khóa lần nữa để đảm bảo
          currentLenis.resize();
          currentLenis.scrollTo(0, { immediate: true });
        }
      }, 200); // Đợi 200ms để DOM ổn định kích thước mới (bao gồm cả animation template)
      return () => clearTimeout(timer);
    }
  }, [pathname]);

  return <>{children}</>;
}
