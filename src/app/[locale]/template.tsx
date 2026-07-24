"use client";

import { motion } from "framer-motion";

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative w-full">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.65, ease: [0.215, 0.61, 0.355, 1], delay: 0.15 }}
        className="w-full flex flex-col min-h-screen"
      >
        {children}
      </motion.div>

      <motion.div
        className="fixed top-0 left-0 w-full h-1/2 bg-neutral-950 z-35 pointer-events-none origin-bottom"
        initial={{ scaleY: 1 }}
        animate={{ scaleY: 0 }}
        transition={{ duration: 0.85, ease: [0.85, 0, 0.15, 1], delay: 0.05 }}
      />

      <motion.div
        className="fixed bottom-0 left-0 w-full h-1/2 bg-neutral-950 z-35 pointer-events-none origin-top"
        initial={{ scaleY: 1 }}
        animate={{ scaleY: 0 }}
        transition={{ duration: 0.85, ease: [0.85, 0, 0.15, 1], delay: 0.05 }}
      />

      <div className="fixed inset-0 z-38 flex items-center justify-center pointer-events-none">
        <motion.div
          initial={{ opacity: 1, scale: 1, letterSpacing: "0.2em" }}
          animate={{ opacity: 0, scale: 1.05, letterSpacing: "0.45em" }}
          transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
          className="text-white font-hyogo text-lg md:text-xl tracking-widest bg-neutral-950/80 px-8 py-4 backdrop-blur-sm rounded-[1px] border border-neutral-900/40"
        >
          HEART of CLASSY
        </motion.div>
      </div>
    </div>
  );
}
