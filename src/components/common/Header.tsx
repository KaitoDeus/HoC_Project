"use client";

import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import LanguageSwitcher from "./LanguageSwitcher";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

export default function Header() {
  const t = useTranslations("common.menu");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const lenis = (window as unknown as { lenis?: { stop: () => void; start: () => void } }).lenis;
    if (lenis) {
      if (isMobileMenuOpen) {
        lenis.stop();
      } else {
        lenis.start();
      }
    }
  }, [isMobileMenuOpen]);

  return (
    <header className="fixed top-0 left-0 right-0 z-40 py-6 bg-transparent border-b border-transparent pointer-events-none">
      <div className="w-full px-6 md:px-[65px] flex items-center justify-between pointer-events-auto">
        {/* LOGO */}
        <Link
          href="/"
          className="font-hyogo text-xl md:text-2xl font-normal tracking-[0.03em] leading-none text-white hover:text-accent transition-colors flex items-center pt-0.5"
        >
          HEART of CLASSY
        </Link>

        {/* DESKTOP MENU */}
        <nav className="hidden md:flex items-center gap-[20px]">
          <Link
            href="/shop"
            className="text-base md:text-[18px] font-sans font-normal text-white hover-underline transition-colors tracking-wide leading-none"
          >
            {t("shop")}
          </Link>
          <Link
            href="/services"
            className="text-base md:text-[18px] font-sans font-normal text-white hover-underline transition-colors tracking-wide leading-none"
          >
            {t("services")}
          </Link>
          <Link
            href="/contact"
            className="text-base md:text-[18px] font-sans font-normal text-white hover-underline transition-colors tracking-wide leading-none"
          >
            {t("contact")}
          </Link>
          <LanguageSwitcher />
        </nav>

        {/* MOBILE MENU TOGGLE */}
        <div className="flex items-center gap-4 md:hidden">
          <LanguageSwitcher />
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-white transition-colors"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* MOBILE DRAWER */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 top-[60px] z-30 bg-neutral-950/95 backdrop-blur-lg flex flex-col p-8 gap-8 animate-fade-in border-t border-neutral-900">
          <nav className="flex flex-col gap-6">
            <Link
              href="/shop"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-base font-sans font-medium text-white transition-colors"
            >
              {t("shop")}
            </Link>
            <Link
              href="/services"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-base font-sans font-medium text-white transition-colors"
            >
              {t("services")}
            </Link>
            <Link
              href="/contact"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-base font-sans font-medium text-white transition-colors"
            >
              {t("contact")}
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
