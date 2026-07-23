import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import Header from "@/components/common/Header";
import Tracking from "@/components/common/Tracking";
import Image from "next/image";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "common" });
  return {
    title: t("title_contact"),
  };
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return (
    <>
      <Tracking />
      <Header />

      <main className="min-h-screen bg-neutral-950 text-white flex flex-col md:flex-row md:h-screen md:overflow-hidden select-none">
        {/* LEFT COLUMN: Contact Information */}
        <div className="w-full md:w-[36%] lg:w-[32%] bg-neutral-950 flex flex-col justify-center items-start px-6 md:pl-[65px] md:pr-12 py-32 md:py-20 h-full border-r border-neutral-900/40 z-10">
          <div className="my-auto w-full flex flex-col gap-12 md:gap-16">
            {/* Top section: GENERAL REQUIRES */}
            <div className="space-y-2">
              <h2 className="font-sans text-[30px] leading-[34px] font-normal uppercase tracking-wide text-white block select-text">
                {locale === "vi" ? "LIÊN HỆ CHUNG" : "GENERAL REQUIRES"}
              </h2>
              <a
                href="mailto:heartofclassy@gmail.com"
                className="font-sans text-[24px] leading-[32px] font-normal text-white hover:text-accent transition-colors block select-text"
              >
                heartofclassy@gmail.com
              </a>
            </div>

            {/* Bottom section: FOLLOW US */}
            <div className="space-y-3">
              <h2 className="font-sans text-[30px] leading-[34px] font-normal uppercase tracking-wide text-white block select-text">
                {locale === "vi" ? "THEO DÕI CHÚNG TÔI" : "FOLLOW US"}
              </h2>
              <div className="flex flex-col space-y-2">
                <a
                  href="https://www.instagram.com/heartofclassy.official"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-sans text-[24px] leading-[32px] font-normal text-white hover:text-accent underline underline-offset-8 decoration-1 decoration-white/40 hover:decoration-white transition-all w-fit"
                >
                  Instagram
                </a>
                <a
                  href="https://www.facebook.com/Heartofclassy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-sans text-[24px] leading-[32px] font-normal text-white hover:text-accent underline underline-offset-8 decoration-1 decoration-white/40 hover:decoration-white transition-all w-fit"
                >
                  Facebook
                </a>
                <a
                  href="https://www.tiktok.com/@heartofclassy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-sans text-[24px] leading-[32px] font-normal text-white hover:text-accent underline underline-offset-8 decoration-1 decoration-white/40 hover:decoration-white transition-all w-fit"
                >
                  Tik tok
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Handbag Image */}
        <div className="w-full md:w-[68%] lg:w-[72%] h-[50vh] md:h-full relative bg-neutral-900 overflow-hidden order-first md:order-last">
          <Image
            src="/images/Contact.jpg"
            alt="Heart of Classy Signature Bag"
            fill
            priority
            sizes="(max-width: 768px) 100vw, 70vw"
            className="object-cover object-center"
          />
          {/* Subtle overlay to dim image slightly */}
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/40 via-transparent to-transparent pointer-events-none" />
        </div>
      </main>
    </>
  );
}

