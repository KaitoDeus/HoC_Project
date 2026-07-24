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

      <main className="w-full min-h-screen bg-neutral-950 text-white flex flex-col md:flex-row md:h-screen md:overflow-hidden select-none">
        {/* ================= MOBILE VIEW (md:hidden) ================= */}
        <div className="md:hidden w-full min-h-screen flex flex-col justify-start items-center text-center px-6 pt-36 pb-16 bg-neutral-950">
          <div className="w-full max-w-sm flex flex-col items-center justify-start space-y-10">
            {/* GENERAL REQUIRES Section */}
            <div className="flex flex-col items-center space-y-2">
              <h1 className="font-sans text-[22px] leading-[26px] tracking-[-0.02em] font-normal uppercase text-white">
                {locale === "vi" ? "LIÊN HỆ CHUNG" : "GENERAL REQUIRES"}
              </h1>
              <a
                href="mailto:heartofclassy@gmail.com"
                className="font-sans text-[16px] leading-[22px] tracking-[-0.02em] font-normal text-white hover:text-accent transition-colors block select-text"
              >
                heartofclassy@gmail.com
              </a>
            </div>

            {/* FOLLOW US Section */}
            <div className="flex flex-col items-center space-y-4 pt-4">
              <h2 className="font-sans text-[22px] leading-[26px] tracking-[-0.02em] font-normal uppercase text-white">
                {locale === "vi" ? "THEO DÕI CHÚNG TÔI" : "FOLLOW US"}
              </h2>
              <div className="flex flex-col items-center space-y-3">
                <a
                  href="https://www.instagram.com/heartofclassy.official"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-sans text-[16px] leading-[22px] tracking-[-0.02em] font-normal text-white hover:text-accent underline underline-offset-8 decoration-white hover:decoration-white transition-all"
                >
                  Instagram
                </a>
                <a
                  href="https://www.facebook.com/Heartofclassy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-sans text-[16px] leading-[22px] tracking-[-0.02em] font-normal text-white hover:text-accent underline underline-offset-8 decoration-white hover:decoration-white transition-all"
                >
                  Facebook
                </a>
                <a
                  href="https://www.tiktok.com/@heartofclassy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-sans text-[16px] leading-[22px] tracking-[-0.02em] font-normal text-white hover:text-accent underline underline-offset-8 decoration-white hover:decoration-white transition-all"
                >
                  Tik tok
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* ================= DESKTOP VIEW (hidden md:flex) ================= */}
        <div className="hidden md:flex w-[36%] lg:w-[32%] bg-neutral-950 flex-col justify-center items-start px-6 md:pl-[65px] md:pr-12 py-20 h-full border-r border-neutral-900/40 z-10">
          <div className="my-auto w-full flex flex-col gap-12 lg:gap-16">
            <div className="space-y-2">
              <h2 className="font-sans text-[22px] leading-[26px] tracking-[-0.02em] font-normal uppercase text-white block select-text">
                {locale === "vi" ? "LIÊN HỆ CHUNG" : "GENERAL REQUIRES"}
              </h2>
              <a
                href="mailto:heartofclassy@gmail.com"
                className="font-sans text-[16px] leading-[22px] tracking-[-0.02em] font-normal text-white hover:text-accent transition-colors block select-text"
              >
                heartofclassy@gmail.com
              </a>
            </div>

            <div className="space-y-3">
              <h2 className="font-sans text-[22px] leading-[26px] tracking-[-0.02em] font-normal uppercase text-white block select-text">
                {locale === "vi" ? "THEO DÕI CHÚNG TÔI" : "FOLLOW US"}
              </h2>
              <div className="flex flex-col space-y-2">
                <a
                  href="https://www.instagram.com/heartofclassy.official"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-sans text-[16px] leading-[22px] tracking-[-0.02em] font-normal text-white hover:text-accent underline underline-offset-8 decoration-white hover:decoration-white transition-all w-fit"
                >
                  Instagram
                </a>
                <a
                  href="https://www.facebook.com/Heartofclassy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-sans text-[16px] leading-[22px] tracking-[-0.02em] font-normal text-white hover:text-accent underline underline-offset-8 decoration-white hover:decoration-white transition-all w-fit"
                >
                  Facebook
                </a>
                <a
                  href="https://www.tiktok.com/@heartofclassy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-sans text-[16px] leading-[22px] tracking-[-0.02em] font-normal text-white hover:text-accent underline underline-offset-8 decoration-white hover:decoration-white transition-all w-fit"
                >
                  Tik tok
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="hidden md:block w-[64%] lg:w-[68%] h-full relative bg-neutral-900 overflow-hidden">
          <Image
            src="/images/Contact.jpg"
            alt="Heart of Classy Signature Bag"
            fill
            priority
            sizes="70vw"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/40 via-transparent to-transparent pointer-events-none" />
        </div>
      </main>
    </>
  );
}
