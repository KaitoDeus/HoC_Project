"use client";

import { useEffect } from "react";
import { useTranslations, useLocale } from "next-intl";
import { useSearchParams } from "next/navigation";
import { useRouter } from "@/i18n/routing";

import { Product } from "@/types/product";
import { productService } from "@/services/product.service";
import { scrollService } from "@/services/scroll.service";
import ProductDetailModal from "../ProductDetailModal";
import DesktopGallery from "./DesktopGallery";
import MobileGallery from "./MobileGallery";

export default function Gallery() {
  const tProduct = useTranslations("product");
  const locale = useLocale();

  const searchParams = useSearchParams();
  const router = useRouter();

  const prodId = searchParams ? searchParams.get("product") : null;
  const selectedProduct = prodId ? productService.getProductById(prodId) : null;

  useEffect(() => {
    if (selectedProduct) {
      scrollService.stop();
    } else {
      scrollService.start();
    }
    return () => {
      scrollService.start();
    };
  }, [selectedProduct]);

  const openProduct = (product: Product) => {
    if (!productService.isInteractive(product.id)) return;
    router.push(`?product=${product.id}`, { scroll: false });
  };

  const closeProduct = () => {
    router.push("/shop", { scroll: false });
  };

  return (
    <section id="catalog" className="w-full bg-neutral-950">
      <div className="hidden md:block w-full">
        <DesktopGallery
          openProduct={openProduct}
          tProduct={tProduct}
          locale={locale}
        />
      </div>

      <div className="block md:hidden w-full">
        <MobileGallery
          openProduct={openProduct}
          tProduct={tProduct}
        />
      </div>

      {selectedProduct && (
        <ProductDetailModal
          key={selectedProduct.id}
          selectedProduct={selectedProduct}
          closeProduct={closeProduct}
        />
      )}
    </section>
  );
}
