"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";

export default function MobileHero() {
  const t = useTranslations("home.hero");
  const tCommon = useTranslations("common.cta");

  return (
    <section className="relative w-full h-[100vh] bg-neutral-950 overflow-hidden flex flex-col justify-end items-center pb-12 sm:pb-16 select-none">
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero_bg_mobile.jpg"
          alt="Heart of Classy Lunaline Bag Mobile Banner"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-transparent to-neutral-950/40 pointer-events-none" />
      </div>

      <div className="relative z-10 w-full px-6 flex flex-col items-center text-center space-y-2">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="space-y-1"
        >
          <h1 className="text-white font-sans text-lg sm:text-xl font-normal tracking-[0.08em] uppercase">
            LUNALINE BAG
          </h1>
          <p className="text-white/90 font-sans text-sm sm:text-base font-light tracking-wide">
            {t("subtitle")}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="pt-2"
        >
          <Link
            href="/shop"
            className="inline-block text-white hover:text-accent font-sans text-sm tracking-wide underline underline-offset-4 decoration-white/70 hover:decoration-white transition-colors"
          >
            {tCommon("shop_now")}
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
