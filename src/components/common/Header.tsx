"use client";

import { Link, usePathname, useRouter } from "@/i18n/routing";
import { useTranslations, useLocale } from "next-intl";
import { useSearchParams } from "next/navigation";
import LanguageSwitcher from "./LanguageSwitcher";
import { useState, useEffect, useTransition } from "react";
import { Menu, X } from "lucide-react";
import { scrollService } from "@/services/scroll.service";

export default function Header() {
  const t = useTranslations("common.menu");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isRegionModalOpen, setIsRegionModalOpen] = useState(false);

  useEffect(() => {
    if (isMobileMenuOpen || isRegionModalOpen) {
      scrollService.stop();
    } else {
      scrollService.start();
    }
  }, [isMobileMenuOpen, isRegionModalOpen]);

  const selectLocale = (targetLocale: "vi" | "en") => {
    if (targetLocale !== locale) {
      const query = searchParams ? searchParams.toString() : "";
      const target = query ? `${pathname}?${query}` : pathname;
      startTransition(() => {
        router.replace(target, { locale: targetLocale });
      });
    }
    setIsRegionModalOpen(false);
    setIsMobileMenuOpen(false);
  };

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

      {/* Mobile Navigation Header (Closed state) */}
      {!isMobileMenuOpen && (
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
              onClick={() => setIsMobileMenuOpen(true)}
              className="text-white p-1 focus:outline-none cursor-pointer"
              aria-label="Open menu"
            >
              <Menu className="w-6 h-6 text-white" />
            </button>
          </div>
        </div>
      )}

      {/* Mobile Fullscreen Menu Drawer (Matching Image 1 Screen A) */}
      {isMobileMenuOpen && (
        <div
          onClick={() => {
            setIsMobileMenuOpen(false);
            setIsRegionModalOpen(false);
          }}
          className="md:hidden fixed inset-0 z-50 bg-neutral-950 text-white flex flex-col p-8 pt-10 pointer-events-auto select-none animate-fade-in cursor-pointer"
        >
          {/* Top Left Close Button */}
          <div className="w-full flex items-center justify-start">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsMobileMenuOpen(false);
                setIsRegionModalOpen(false);
              }}
              className="text-white/80 hover:text-white focus:outline-none cursor-pointer p-1"
              aria-label="Close menu"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Menu Links Stack */}
          <nav
            onClick={(e) => e.stopPropagation()}
            className="flex flex-col gap-6 pt-16 text-left font-sans cursor-default"
          >
            <Link
              href="/shop"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-lg font-normal text-white hover:text-accent transition-colors w-fit"
            >
              Shop
            </Link>
            <Link
              href="/services"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-lg font-normal text-white hover:text-accent transition-colors w-fit"
            >
              Care & Services
            </Link>
            <Link
              href="/contact"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-lg font-normal text-white hover:text-accent transition-colors w-fit"
            >
              Contact
            </Link>

            <button
              onClick={() => setIsRegionModalOpen(true)}
              className="text-left text-lg font-normal text-white/90 hover:text-white transition-colors cursor-pointer w-fit"
            >
              Region: {locale === "vi" ? "Vietnam ( Tiếng Việt)" : "USA ( English)"}
            </button>
          </nav>
        </div>
      )}

      {/* Region Selection Modal Sheet (Matching Mockup Image 2) */}
      {isRegionModalOpen && (
        <div
          onClick={() => setIsRegionModalOpen(false)}
          className="md:hidden fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-end justify-center pointer-events-auto animate-fade-in cursor-pointer"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full h-[52vh] bg-neutral-900 border-t border-neutral-800 p-8 pt-8 pb-16 relative flex flex-col justify-start select-none shadow-2xl cursor-default"
          >
            {/* Modal Close Button Top Right */}
            <div className="w-full flex justify-end">
              <button
                onClick={() => setIsRegionModalOpen(false)}
                className="text-white/70 hover:text-white p-1 cursor-pointer focus:outline-none"
                aria-label="Close region selector"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Region Options */}
            <div className="flex flex-col gap-6 font-sans pt-12">
              <button
                onClick={() => selectLocale("vi")}
                disabled={isPending}
                className={`text-left text-base sm:text-lg font-normal transition-colors cursor-pointer ${
                  locale === "vi" ? "text-white font-medium" : "text-white/75 hover:text-white"
                }`}
              >
                Vietnam (Tiếng Việt_VND)
              </button>

              <button
                onClick={() => selectLocale("en")}
                disabled={isPending}
                className={`text-left text-base sm:text-lg font-normal transition-colors cursor-pointer ${
                  locale === "en" ? "text-white font-medium" : "text-white/75 hover:text-white"
                }`}
              >
                International (English_USD)
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
