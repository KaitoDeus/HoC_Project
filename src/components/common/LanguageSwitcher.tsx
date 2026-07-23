"use client";

import { useTransition } from "react";
import { usePathname, useRouter } from "@/i18n/routing";
import { useLocale } from "next-intl";
import { useSearchParams } from "next/navigation";

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const toggleLanguage = () => {
    const nextLocale = locale === "vi" ? "en" : "vi";
    const query = searchParams ? searchParams.toString() : "";
    const target = query ? `${pathname}?${query}` : pathname;
    startTransition(() => {
      router.replace(target, { locale: nextLocale });
    });
  };

  return (
    <button
      onClick={toggleLanguage}
      disabled={isPending}
      className="text-base md:text-[18px] font-sans font-normal text-white disabled:opacity-50 transition-colors cursor-pointer flex items-center gap-1.5 leading-none tracking-wide"
      aria-label="Toggle language"
    >
      <span>{locale === "vi" ? "VN" : "EN"}</span>
      <span className="inline-flex items-center select-none">
        {locale === "vi" ? (
          /* VIETNAM FLAG */
          <svg className="w-4.5 h-3 rounded-[1px] shadow-sm overflow-hidden" viewBox="0 0 30 20" xmlns="http://www.w3.org/2000/svg">
            <rect width="30" height="20" fill="#da251d"/>
            <polygon points="15,4 16.18,7.62 19.98,7.62 16.9,9.88 18.08,13.5 15,11.24 11.92,13.5 13.1,9.88 10.02,7.62 13.82,7.62" fill="#ffff00"/>
          </svg>
        ) : (
          /* USA FLAG */
          <svg className="w-4.5 h-3 rounded-[1px] shadow-sm overflow-hidden" viewBox="0 0 190 100" xmlns="http://www.w3.org/2000/svg">
            <rect width="190" height="100" fill="#B22234"/>
            <path stroke="#FFF" strokeWidth="7.69" d="M0,11.5h190M0,26.9h190M0,42.3h190M0,57.7h190M0,73.1h190M0,88.5h190"/>
            <rect width="76" height="53.8" fill="#3C3B6E"/>
            <g fill="#FFF">
              <circle cx="12" cy="9" r="2.5"/>
              <circle cx="27" cy="9" r="2.5"/>
              <circle cx="42" cy="9" r="2.5"/>
              <circle cx="57" cy="9" r="2.5"/>
              <circle cx="20" cy="18" r="2.5"/>
              <circle cx="35" cy="18" r="2.5"/>
              <circle cx="50" cy="18" r="2.5"/>
              <circle cx="65" cy="18" r="2.5"/>
              <circle cx="12" cy="27" r="2.5"/>
              <circle cx="27" cy="27" r="2.5"/>
              <circle cx="42" cy="27" r="2.5"/>
              <circle cx="57" cy="27" r="2.5"/>
              <circle cx="20" cy="36" r="2.5"/>
              <circle cx="35" cy="36" r="2.5"/>
              <circle cx="50" cy="36" r="2.5"/>
              <circle cx="65" cy="36" r="2.5"/>
              <circle cx="12" cy="45" r="2.5"/>
              <circle cx="27" cy="45" r="2.5"/>
              <circle cx="42" cy="45" r="2.5"/>
              <circle cx="57" cy="45" r="2.5"/>
            </g>
          </svg>
        )}
      </span>
    </button>
  );
}

