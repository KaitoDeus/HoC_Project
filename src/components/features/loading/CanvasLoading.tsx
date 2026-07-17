"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import logoImg from "@/assets/images/logo.svg";

export default function CanvasLoading() {
  const [isVisible, setIsVisible] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Khóa cuộn trang và ẩn scrollbar
    const originalOverflow = document.body.style.overflow;
    const originalHtmlOverflow = document.documentElement.style.overflow;

    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    // Tạm dừng Lenis để tránh cuộn trang khi đang tải
    const lenis = (window as unknown as { lenis?: { stop: () => void; start: () => void } }).lenis;
    if (lenis) lenis.stop();

    // Ẩn màn hình loading sau 3.5 giây
    const timer = setTimeout(() => {
      setIsVisible(false);
      document.body.style.overflow = originalOverflow;
      document.documentElement.style.overflow = originalHtmlOverflow;
      // Kích hoạt lại Lenis nếu có
      const lenis = (window as unknown as { lenis?: { stop: () => void; start: () => void } }).lenis;
      if (lenis) lenis.start();
    }, 3500);

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = originalOverflow;
      document.documentElement.style.overflow = originalHtmlOverflow;
      // Khởi động lại Lenis khi unmount (đảm bảo mở khóa khi chuyển trang trước 3.5 giây)
      const lenis = (window as unknown as { lenis?: { stop: () => void; start: () => void } }).lenis;
      if (lenis) lenis.start();
    };
  }, []);

  useEffect(() => {
    // Chạy phần trăm loading realtime từ 0 đến 100
    const start = Date.now();
    const duration = 2800; // Đạt 100% trước khi hiệu ứng fade-out bắt đầu ở giây thứ 3

    const updateProgress = () => {
      const now = Date.now();
      const elapsed = now - start;
      const pct = Math.min(Math.floor((elapsed / duration) * 100), 100);
      setProgress(pct);

      if (elapsed < duration) {
        requestAnimationFrame(updateProgress);
      }
    };

    const frameId = requestAnimationFrame(updateProgress);
    return () => cancelAnimationFrame(frameId);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#020202] select-none overflow-hidden"
          data-loading
        >
          {/* Thanh ngang chạy từ 2 bên rìa màn hình hội tụ vào giữa logo theo % tiến trình */}
          <div className="absolute inset-x-0 flex items-center justify-between pointer-events-none px-0">
            {/* Line bên trái - chạy từ trái qua phải */}
            <div className="flex-1 h-[1px] bg-neutral-900/60 relative">
              <motion.div 
                className="absolute inset-y-0 left-0 right-0 bg-gradient-to-r from-white/10 to-white origin-left shadow-[0_0_8px_rgba(255,255,255,0.4)]"
                style={{ scaleX: progress / 100 }}
              />
            </div>

            {/* Khoảng cách cho logo ở giữa */}
            <div className="w-56 sm:w-64 md:w-80 flex-shrink-0" />

            {/* Line bên phải - chạy từ phải qua trái */}
            <div className="flex-1 h-[1px] bg-neutral-900/60 relative">
              <motion.div 
                className="absolute inset-y-0 left-0 right-0 bg-gradient-to-l from-white/10 to-white origin-right shadow-[0_0_8px_rgba(255,255,255,0.4)]"
                style={{ scaleX: progress / 100 }}
              />
            </div>
          </div>

          <div className="relative w-full max-w-7xl h-full flex items-center justify-center">
            {/* Logo trung tâm */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ 
                opacity: [0, 1, 1],
                scale: [0.95, 1.02, 1],
              }}
              transition={{ 
                duration: 1.8, 
                ease: "easeOut",
                times: [0, 0.6, 1]
              }}
              className="relative w-48 h-48 sm:w-56 sm:h-56 md:w-72 md:h-72 flex items-center justify-center z-10"
            >
              <Image
                src={logoImg}
                alt="Heart of Classy Logo"
                fill
                sizes="(max-width: 768px) 192px, 288px"
                priority
                className="object-contain"
              />
            </motion.div>
          </div>

          {/* Số loading status bên phải chạy realtime */}
          <div className="absolute right-8 sm:right-12 md:right-16 bottom-8 sm:bottom-12 z-20 flex items-baseline gap-1 font-sans pointer-events-none select-none">
            <span className="text-neutral-600 text-[10px] tracking-[0.25em] font-semibold">Loading</span>
            <span className="text-white text-3xl sm:text-4xl md:text-5xl font-light tracking-tighter tabular-nums leading-none min-w-[3ch] text-right">
              {String(progress).padStart(2, "0")}
            </span>
            <span className="text-neutral-500 text-xs sm:text-sm font-light">%</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
