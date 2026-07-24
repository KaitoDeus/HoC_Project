"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import logoImg from "@/assets/images/logo.svg";
import { scrollService } from "@/services/scroll.service";

export default function CanvasLoading() {
  const [isVisible, setIsVisible] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    const originalHtmlOverflow = document.documentElement.style.overflow;

    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    scrollService.stop();

    const timer = setTimeout(() => {
      setIsVisible(false);
      document.body.style.overflow = originalOverflow;
      document.documentElement.style.overflow = originalHtmlOverflow;
      scrollService.start();
    }, 2500);

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = originalOverflow;
      document.documentElement.style.overflow = originalHtmlOverflow;
      scrollService.start();
    };
  }, []);

  useEffect(() => {
    const start = Date.now();
    const duration = 2000;

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
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-neutral-950 select-none overflow-hidden px-6 md:px-16"
          data-loading
        >
          <div className="w-full max-w-4xl flex items-center justify-center relative">
            {/* Left track & progress line */}
            <div className="flex-1 h-[1px] bg-white/20 relative overflow-hidden">
              <motion.div
                className="absolute inset-y-0 left-0 bg-white shadow-[0_0_8px_rgba(255,255,255,0.7)]"
                style={{ width: `${progress}%` }}
              />
            </div>

            {/* Centered metallic chrome heart logo */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="relative w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 mx-4 sm:mx-6 flex-shrink-0 flex items-center justify-center z-10"
            >
              <Image
                src={logoImg}
                alt="Heart of Classy Logo"
                fill
                sizes="(max-width: 768px) 80px, 96px"
                priority
                className="object-contain drop-shadow-[0_0_12px_rgba(255,255,255,0.3)]"
              />
            </motion.div>

            {/* Right track & progress line */}
            <div className="flex-1 h-[1px] bg-white/20 relative overflow-hidden">
              <motion.div
                className="absolute inset-y-0 right-0 bg-white shadow-[0_0_8px_rgba(255,255,255,0.7)]"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
