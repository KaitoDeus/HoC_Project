import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import Header from "@/components/common/Header";
import Gallery from "@/components/features/home/Gallery";
import Tracking from "@/components/common/Tracking";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "common" });
  return {
    title: t("title_shop"),
  };
}

export default function ShopPage() {
  return (
    <>
      <Tracking />
      <Header />
      <main className="flex-grow">
        <Gallery />
      </main>
    </>
  );
}
