"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import heroBgSvg from "@/assets/images/hero_bg.svg";

export default function DesktopHero() {
  const t = useTranslations("home.hero");
  const tCommon = useTranslations("common.cta");

  return (
    <section className="relative w-full h-[100vh] min-h-[600px] bg-neutral-950 overflow-hidden flex items-center justify-center">
      <div className="absolute inset-0 z-0">
        <Image
          src={heroBgSvg}
          alt="Heart of Classy premium designer bag banner"
          fill
          priority
          sizes="(min-width: 768px) 100vw, 1px"
          className="object-cover object-center select-none"
        />
        <div className="absolute inset-0 bg-neutral-950/15 pointer-events-none" />
      </div>

      <div className="absolute inset-0 z-10 w-full h-full px-6 md:px-[65px] relative">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="absolute left-[44%] md:left-[47%] lg:left-[50%] xl:left-[52%] -translate-x-1/2 top-[42%] -translate-y-1/2 mt-[5px] font-sans text-[16px] md:text-[20px] lg:text-[24px] xl:text-[30px] leading-tight tracking-[-0.02em] text-white font-normal uppercase whitespace-nowrap"
        >
          LUNALINE BAG
        </motion.div>

        <div className="absolute right-6 md:right-[65px] top-[42%] -translate-y-1/2 mt-[5px] pt-[3px] md:pt-[4px] flex flex-col items-end text-right z-20">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="font-sans text-[13px] md:text-[16px] lg:text-[18px] xl:text-[22px] leading-tight tracking-[-0.02em] text-white font-normal whitespace-nowrap text-right"
          >
            {t("subtitle")}
          </motion.div>

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
    </section>
  );
}
