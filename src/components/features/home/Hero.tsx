"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";

export default function Hero() {
  const t = useTranslations("home.hero");
  const tCommon = useTranslations("common.cta");

  return (
    <section className="relative w-full h-[100vh] min-h-[500px] md:min-h-[600px] bg-neutral-950 overflow-hidden flex items-center justify-center">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero_bg.jpg"
          alt="Heart of Classy premium designer bag banner"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center select-none"
        />
        {/* Subtle dark overlay to boost contrast */}
        <div className="absolute inset-0 bg-neutral-950/15 pointer-events-none" />
      </div>

      {/* DESKTOP LAYOUT (>= md) */}
      <div className="absolute inset-0 z-10 hidden md:block">
        {/* Layout matching the Header's margin constraints */}
        <div className="w-full h-full px-6 md:px-[65px] relative">
          {/* Text 1: "LUNALINE BAG" */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="absolute left-[49.5%] top-[48.5%] -translate-y-1/2 font-sans text-base md:text-[18px] text-white font-normal tracking-[0.05em] uppercase"
          >
            LUNALINE BAG
          </motion.div>

          {/* Text 2: "Asymmetric, Individual, Unique" - Horizontally aligned on exact same top line */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="absolute left-[67%] top-[48.5%] -translate-y-1/2 font-sans text-base md:text-[18px] text-white font-normal tracking-[0.05em] whitespace-nowrap"
          >
            {t("subtitle")}
          </motion.div>

          {/* Text 3: "Shop now" (CTA Button) - Aligned with Top Right UI right edge */}
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="absolute right-6 md:right-[65px] top-[55%] z-20"
          >
            <Link
              href="/shop"
              className="group relative inline-flex items-center text-base md:text-[18px] tracking-[0.05em] font-normal text-white hover:text-accent transition-colors pb-1 border-b border-white hover:border-accent"
            >
              {tCommon("shop_now")}
            </Link>
          </motion.div>
        </div>
      </div>

      {/* MOBILE LAYOUT (< md) */}
      <div className="relative z-10 w-full px-6 flex flex-col items-center text-center space-y-8 md:hidden mt-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-3"
        >
          <h1 className="text-white font-sans text-3xl font-light tracking-[0.1em] uppercase">
            Lunaline Bag
          </h1>
          <div className="w-12 h-[1px] bg-white/30 mx-auto" />
          <p className="text-white font-sans text-sm font-light tracking-wider max-w-xs mx-auto">
            {t("subtitle")}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <Link
            href="/shop"
            className="inline-block px-8 py-3 text-xs tracking-[0.2em] text-white hover:text-accent font-medium border border-white/30 hover:border-accent bg-neutral-950/20 backdrop-blur-sm transition-all rounded-[2px]"
          >
            {tCommon("shop_now")}
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
