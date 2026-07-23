"use client";

import { useTransition } from "react";
import { usePathname, useRouter } from "@/i18n/routing";
import { useLocale } from "next-intl";

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const toggleLanguage = () => {
    const nextLocale = locale === "vi" ? "en" : "vi";
    startTransition(() => {
      router.replace(pathname, { locale: nextLocale });
    });
  };

  return (
    <button
      onClick={toggleLanguage}
      disabled={isPending}
      className="text-base md:text-[18px] font-sans font-normal text-white disabled:opacity-50 transition-colors cursor-pointer flex items-center gap-1.5 leading-none tracking-wide"
      aria-label="Toggle language"
    >
      <span>{locale === "vi" ? "EN" : "VN"}</span>
      <span className="inline-flex items-center select-none">
        {locale === "vi" ? (
          <svg className="w-4.5 h-3 rounded-[1px] shadow-sm overflow-hidden" viewBox="0 0 50 30" xmlns="http://www.w3.org/2000/svg">
            <rect width="50" height="30" fill="#012169" />
            <path d="M0 0 L50 30 M0 30 L50 0" stroke="#fff" strokeWidth="6" />
            <path d="M0 0 L50 30 M0 30 L50 0" stroke="#c8102e" strokeWidth="2" />
            <path d="M25 0 V30 M0 15 H50" stroke="#fff" strokeWidth="10" />
            <path d="M25 0 V30 M0 15 H50" stroke="#c8102e" strokeWidth="6" />
          </svg>
        ) : (
          <svg className="w-4.5 h-3 rounded-[1px] shadow-sm overflow-hidden" viewBox="0 0 30 20" xmlns="http://www.w3.org/2000/svg">
            <rect width="30" height="20" fill="#da251d"/>
            <polygon points="15,4 16.18,7.62 19.98,7.62 16.9,9.88 18.08,13.5 15,11.24 11.92,13.5 13.1,9.88 10.02,7.62 13.82,7.62" fill="#ffff00"/>
          </svg>
        )}
      </span>
    </button>
  );
}

