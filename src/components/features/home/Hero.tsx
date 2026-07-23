"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import heroBgSvg from "@/assets/images/hero_bg.svg";

export default function Hero() {
  const t = useTranslations("home.hero");
  const tCommon = useTranslations("common.cta");

  return (
    <section className="relative w-full h-[100vh] min-h-[500px] md:min-h-[600px] bg-neutral-950 overflow-hidden flex items-center justify-center">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={heroBgSvg}
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
          {/* Text 1: "LUNALINE BAG" - Responsive positioning & font size */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="absolute left-[44%] md:left-[47%] lg:left-[50%] xl:left-[52%] -translate-x-1/2 top-[42%] -translate-y-1/2 mt-[5px] font-sans text-[16px] md:text-[20px] lg:text-[24px] xl:text-[30px] leading-tight tracking-[-0.02em] text-white font-normal uppercase whitespace-nowrap"
          >
            LUNALINE BAG
          </motion.div>

          {/* Text 2 & 3: Slogan & Shop now - Baseline aligned perfectly with LUNALINE BAG */}
          <div className="absolute right-[3%] md:right-[5%] lg:right-[7%] xl:right-[10%] top-[42%] -translate-y-1/2 mt-[5px] pt-[3px] md:pt-[4px] flex flex-col items-end text-right z-20">
            {/* Text 2: "Asymmetric, Individual, Unique" - Baseline aligned */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="font-sans text-[13px] md:text-[16px] lg:text-[18px] xl:text-[22px] leading-tight tracking-[-0.02em] text-white font-normal whitespace-nowrap text-right"
            >
              {t("subtitle")}
            </motion.div>

            {/* Text 3: "Shop now" - Directly below slogan, right-aligned flush with ...Unique */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9 }}
              className="absolute top-full right-0 mt-2 md:mt-2.5 whitespace-nowrap text-right"
            >
              <Link
                href="/shop"
                className="group relative inline-flex items-center text-[13px] md:text-[16px] lg:text-[18px] xl:text-[22px] leading-tight tracking-[-0.02em] font-normal text-white hover:text-accent transition-colors pb-[1px] border-b border-white hover:border-accent text-right"
              >
                {tCommon("shop_now")}
              </Link>
            </motion.div>
          </div>
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
