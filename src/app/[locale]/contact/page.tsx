import Header from "@/components/common/Header";
import Tracking from "@/components/common/Tracking";
import Image from "next/image";

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
        <div className="w-full md:w-[32%] lg:w-[28%] bg-neutral-950 flex flex-col justify-center items-center p-8 pt-32 pb-16 md:p-12 md:pt-20 md:pb-20 lg:p-16 h-full border-r border-neutral-900/40 z-10">
          
          <div className="w-fit flex flex-col gap-24 md:gap-32">
            {/* Middle section: GENERAL REQUIRES */}
            <div className="space-y-3">
              <span className="font-sans text-[27px] leading-none font-normal uppercase tracking-wide text-white block select-text">
                {locale === "vi" ? "LIÊN HỆ CHUNG" : "GENERAL REQUIRES"}
              </span>
              <a
                href="mailto:heartofclassy@gmail.com"
                className="font-sans text-[27px] leading-none font-normal text-white hover:text-white transition-colors block select-text"
              >
                heartofclassy@gmail.com
              </a>
            </div>

            {/* Bottom section: FOLLOW US */}
            <div className="space-y-4">
              <span className="font-sans text-[27px] leading-none font-normal uppercase tracking-wide text-white block select-text">
                {locale === "vi" ? "THEO DÕI CHÚNG TÔI" : "FOLLOW US"}
              </span>
              <div className="flex flex-col space-y-3">
                <a
                  href="https://www.instagram.com/heartofclassy.official"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-sans text-[27px] leading-none font-normal text-white hover:text-white underline underline-offset-8 decoration-1 decoration-white/40 hover:decoration-white transition-all w-fit"
                >
                  Instagram
                </a>
                <a
                  href="https://www.facebook.com/Heartofclassy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-sans text-[27px] leading-none font-normal text-white hover:text-white underline underline-offset-8 decoration-1 decoration-white/40 hover:decoration-white transition-all w-fit"
                >
                  Facebook
                </a>
                <a
                  href="https://www.tiktok.com/@heartofclassy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-sans text-[27px] leading-none font-normal text-white hover:text-white underline underline-offset-8 decoration-1 decoration-white/40 hover:decoration-white transition-all w-fit"
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

