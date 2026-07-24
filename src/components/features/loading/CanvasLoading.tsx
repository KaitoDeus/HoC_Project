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
          className="fixed inset-0 z-50 flex items-center justify-center bg-neutral-950 select-none overflow-hidden"
          data-loading
        >
          {/* ================= DESKTOP LOADING (hidden md:flex) ================= */}
          <div className="hidden md:flex flex-row items-center justify-center relative w-full max-w-[1500px] px-12 lg:px-24">
            {/* Left Track & Progress */}
            <div className="flex-1 h-[1px] bg-white/20 relative overflow-hidden">
              <motion.div
                className="absolute inset-y-0 left-0 bg-white"
                style={{ width: `${progress}%` }}
              />
            </div>

            {/* Centered Chrome Heart Logo */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="relative w-52 h-52 lg:w-72 lg:h-72 xl:w-80 xl:h-80 mx-14 lg:mx-20 flex-shrink-0 flex items-center justify-center z-10"
            >
              <Image
                src={logoImg}
                alt="Heart of Classy Logo"
                fill
                priority
                sizes="320px"
                className="object-contain select-none"
              />
            </motion.div>

            {/* Right Track & Progress */}
            <div className="flex-1 h-[1px] bg-white/20 relative overflow-hidden">
              <motion.div
                className="absolute inset-y-0 right-0 bg-white"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* ================= MOBILE LOADING (md:hidden) ================= */}
          <div className="md:hidden flex flex-row items-center justify-center relative w-full max-w-[340px] px-4">
            {/* Left Track */}
            <div className="flex-1 h-[1px] bg-white/20 relative overflow-hidden">
              <motion.div
                className="absolute inset-y-0 left-0 bg-white"
                style={{ width: `${progress}%` }}
              />
            </div>

            {/* Centered Chrome Heart Logo */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="relative w-20 h-20 mx-5 flex-shrink-0 flex items-center justify-center z-10"
            >
              <Image
                src={logoImg}
                alt="Heart of Classy Logo"
                fill
                priority
                sizes="80px"
                className="object-contain select-none"
              />
            </motion.div>

            {/* Right Track */}
            <div className="flex-1 h-[1px] bg-white/20 relative overflow-hidden">
              <motion.div
                className="absolute inset-y-0 right-0 bg-white"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
