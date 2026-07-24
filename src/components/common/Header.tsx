"use client";

import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import LanguageSwitcher from "./LanguageSwitcher";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { scrollService } from "@/services/scroll.service";

export default function Header() {
  const t = useTranslations("common.menu");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (isMobileMenuOpen) {
      scrollService.stop();
    } else {
      scrollService.start();
    }
  }, [isMobileMenuOpen]);

  return (
    <header className="fixed top-0 left-0 right-0 z-40 py-6 md:py-6 bg-transparent pointer-events-none">
      {/* Desktop Navigation */}
      <div className="hidden md:flex w-full px-[65px] items-center justify-between pointer-events-auto">
        <Link
          href="/"
          className="font-hyogo text-2xl font-normal tracking-[0.03em] leading-none text-white hover:text-accent transition-colors flex items-center pt-0.5"
        >
          HEART of CLASSY
        </Link>

        <nav className="flex items-center gap-[20px]">
          <Link
            href="/shop"
            className="text-[18px] font-sans font-normal text-white hover-underline transition-colors tracking-wide leading-none"
          >
            {t("shop")}
          </Link>
          <Link
            href="/services"
            className="text-[18px] font-sans font-normal text-white hover-underline transition-colors tracking-wide leading-none"
          >
            {t("services")}
          </Link>
          <Link
            href="/contact"
            className="text-[18px] font-sans font-normal text-white hover-underline transition-colors tracking-wide leading-none"
          >
            {t("contact")}
          </Link>
          <LanguageSwitcher />
        </nav>
      </div>

      {/* Mobile Navigation Header matching mockup */}
      <div className="md:hidden flex flex-col w-full px-6 pt-2 pointer-events-auto relative">
        <div className="w-full flex justify-center items-center">
          <Link
            href="/"
            className="font-hyogo text-[22px] font-normal tracking-[0.05em] text-white text-center block pt-1"
          >
            HEART of CLASSY
          </Link>
        </div>

        <div className="w-full flex items-center justify-start pt-1">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-white p-1 focus:outline-none cursor-pointer"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Fullscreen Menu Dropdown with Language Switcher */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 top-[110px] z-30 bg-neutral-950/95 backdrop-blur-lg flex flex-col p-8 gap-8 animate-fade-in border-t border-neutral-900 pointer-events-auto">
          <nav className="flex flex-col gap-6">
            <Link
              href="/shop"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-lg font-sans font-medium text-white transition-colors"
            >
              {t("shop")}
            </Link>
            <Link
              href="/services"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-lg font-sans font-medium text-white transition-colors"
            >
              {t("services")}
            </Link>
            <Link
              href="/contact"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-lg font-sans font-medium text-white transition-colors"
            >
              {t("contact")}
            </Link>

            <div className="pt-4 border-t border-neutral-800/60 w-fit">
              <LanguageSwitcher />
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
