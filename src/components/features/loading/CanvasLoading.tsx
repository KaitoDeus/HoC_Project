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
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#161616] select-none overflow-hidden"
          data-loading
        >
          <div className="absolute inset-x-0 flex items-center justify-between pointer-events-none px-0">
            <div className="flex-1 h-[1px] bg-neutral-900/60 relative">
              <motion.div 
                className="absolute inset-y-0 left-0 right-0 bg-gradient-to-r from-white/10 to-white origin-left shadow-[0_0_8px_rgba(255,255,255,0.4)]"
                style={{ scaleX: progress / 100 }}
              />
            </div>

            <div className="w-56 sm:w-64 md:w-80 flex-shrink-0" />

            <div className="flex-1 h-[1px] bg-neutral-900/60 relative">
              <motion.div 
                className="absolute inset-y-0 left-0 right-0 bg-gradient-to-l from-white/10 to-white origin-right shadow-[0_0_8px_rgba(255,255,255,0.4)]"
                style={{ scaleX: progress / 100 }}
              />
            </div>
          </div>

          <div className="relative w-full max-w-7xl h-full flex items-center justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ 
                opacity: [0, 1, 1],
                scale: [0.95, 1.02, 1],
              }}
              transition={{ 
                duration: 1.3, 
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
        </motion.div>
      )}
    </AnimatePresence>
  );
}
