"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Product } from "@/types/product";
import { productService } from "@/services/product.service";

const products = productService.getAllProducts();

const getMobileLayout = (productId: string) => {
  switch (productId) {
    case "ownly-cardholder":
      return { width: "w-[68%]", aspect: "aspect-[4/5]" };
    case "mooniver-bag":
      return { width: "w-[82%]", aspect: "aspect-square" };
    case "lunaline-bag":
      return { width: "w-[88%]", aspect: "aspect-[16/9]" };
    case "ownly-bag":
      return { width: "w-[65%]", aspect: "aspect-[16/6]" };
    case "layer-bow-charm":
      return { width: "w-[68%]", aspect: "aspect-[4/3]" };
    default:
      return { width: "w-[80%]", aspect: "aspect-square" };
  }
};

interface MobileGalleryProps {
  openProduct: (product: Product) => void;
  tProduct: (key: string) => string;
}

export default function MobileGallery({ openProduct, tProduct }: MobileGalleryProps) {
  return (
    <div className="w-full pt-28 pb-20 px-4 bg-neutral-950 flex flex-col items-center space-y-10 select-none">
      {products.map((product, idx) => {
        const isInteractive = productService.isInteractive(product.id);
        const layout = getMobileLayout(product.id);

        return (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            key={product.id}
            onClick={isInteractive ? () => openProduct(product) : undefined}
            className={`relative mx-auto ${layout.width} ${
              isInteractive ? "cursor-pointer" : "cursor-default"
            }`}
          >
            <div className={`relative w-full ${layout.aspect} bg-neutral-900 overflow-hidden shadow-xl border border-neutral-900/60`}>
              <Image
                src={product.image}
                alt={product.name}
                fill
                sizes="85vw"
                className="object-cover object-center transition-transform duration-700 hover:scale-103"
                priority={idx === 0}
              />

              {product.isOutOfStock && (
                <div className="absolute top-3 right-3 bg-neutral-950/80 backdrop-blur-sm border border-neutral-900 px-2.5 py-1 text-[9px] tracking-widest text-neutral-400 font-semibold rounded-[2px] z-10">
                  {tProduct("status.out_stock")}
                </div>
              )}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
