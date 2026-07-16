import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import SmoothScroll from "@/components/common/SmoothScroll";
import "../../styles/globals.css"; // Di chuyển globals.css sang thư mục styles cho sạch sẽ

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "common" });

  return {
    title: t("title"),
    description: t("description"),
    metadataBase: new URL("https://heartofclassy.vn"), // Đặt mặc định domain
    openGraph: {
      title: t("title"),
      description: t("description"),
      locale: locale === "vi" ? "vi_VN" : "en_US",
      type: "website",
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const messages = await getMessages();

  return (
    <html
      lang={locale}
      className="h-full antialiased"
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <body
        className="min-h-full bg-neutral-950 text-white font-sans flex flex-col selection:bg-neutral-800 selection:text-white overflow-x-hidden"
        suppressHydrationWarning
      >
        <NextIntlClientProvider messages={messages}>
          <SmoothScroll>
            {children}
          </SmoothScroll>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

