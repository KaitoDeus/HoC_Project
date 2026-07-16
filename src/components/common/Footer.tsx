"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { Mail, ArrowUpRight } from "lucide-react";

export default function Footer() {
  const t = useTranslations("contact");


  // Hàm track click liên hệ
  const trackContact = (platform: string) => {
    if (typeof window !== "undefined") {
      // Google Analytics 4 Event
      if (window.gtag) {
        window.gtag("event", "contact_click", {
          contact_platform: platform,
        });
      }
      // Meta Pixel Event
      if (window.fbq) {
        window.fbq("trackCustom", "ContactClick", {
          platform: platform,
        });
      }
    }
  };

  return (
    <footer id="contact" className="w-full bg-neutral-950 border-t border-neutral-900 overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-2">
        
        {/* LEFT COLUMN: BRAND INFO & SOCIALS */}
        <div className="flex flex-col justify-between p-8 md:p-20 lg:p-24 space-y-12">
          
          <div className="space-y-4">
            <h2 className="text-neutral-500 font-sans text-xs tracking-[0.2em]">
              {t("title")}
            </h2>
            <p className="text-white font-serif text-lg max-w-sm leading-relaxed">
              {t("subtitle")}
            </p>
          </div>

          {/* CONTACT INFO (EMAIL) */}
          <div className="space-y-3">
            <span className="text-neutral-500 text-xs tracking-wider block">
              {t("email")}
            </span>
            <a
              href="mailto:heartofclassy@gmail.com"
              onClick={() => trackContact("email")}
              className="group flex items-center gap-3 text-white hover:text-accent font-sans text-base transition-colors w-fit"
            >
              <Mail className="w-4 h-4 text-neutral-400 group-hover:text-accent transition-colors" />
              heartofclassy@gmail.com
              <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-all transform translate-y-0.5 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
          </div>

          {/* SOCIAL LINKS */}
          <div className="space-y-3">
            <span className="text-neutral-500 text-xs tracking-wider block">
              Follow Us
            </span>
            <div className="flex flex-wrap gap-x-8 gap-y-3">
              {[
                { name: "Instagram", url: "https://www.instagram.com/heartofclassy.official" },
                { name: "Facebook", url: "https://www.facebook.com/Heartofclassy" },
                { name: "TikTok", url: "https://www.tiktok.com/@heartofclassy" },
              ].map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackContact(social.name.toLowerCase())}
                  className="group flex items-center gap-1.5 text-sm font-medium tracking-wide text-white hover:text-accent transition-colors"
                >
                  {social.name}
                  <ArrowUpRight className="w-3.5 h-3.5 text-neutral-500 group-hover:text-accent transition-colors" />
                </a>
              ))}
            </div>
          </div>

          {/* LARGE DECORATIVE TEXT & COPYRIGHT */}
          <div className="pt-8 border-t border-neutral-900/60 space-y-4">
            <h1 className="font-hyogo text-3xl md:text-5xl font-normal tracking-[0.15em] text-neutral-900 select-none">
              HEART of CLASSY
            </h1>
            <p className="text-neutral-600 text-xs tracking-wider font-sans">
              &copy; {new Date().getFullYear()} Heart of Classy. All rights reserved.
            </p>
          </div>

        </div>

        {/* RIGHT COLUMN: LIFESTYLE IMAGE */}
        <div className="relative min-h-[400px] md:min-h-full w-full bg-neutral-900 overflow-hidden group">
          <Image
            src="/images/footer.png"
            alt="Heart of Classy premium designer bag placement"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover object-center transition-transform duration-1000 group-hover:scale-105"
            priority={false}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/40 via-transparent to-transparent pointer-events-none" />
        </div>

      </div>
    </footer>
  );
}
