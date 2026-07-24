"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Product } from "@/types/product";
import { productService } from "@/services/product.service";

const products = productService.getAllProducts();

interface MobileGalleryProps {
  openProduct: (product: Product) => void;
  tProduct: (key: string) => string;
}

export default function MobileGallery({ openProduct, tProduct }: MobileGalleryProps) {
  return (
    <div className="w-full px-6 py-24 space-y-16 bg-neutral-950">
      <div className="space-y-16">
        {products.map((product, idx) => {
          const isInteractive = productService.isInteractive(product.id);
          return (
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6 }}
              key={product.id}
              onClick={isInteractive ? () => openProduct(product) : undefined}
              className={`flex flex-col space-y-4 group ${
                isInteractive ? "cursor-pointer" : "cursor-default"
              }`}
            >
              <div className="relative w-full aspect-[4/5] bg-neutral-900 overflow-hidden rounded-[2px] border border-neutral-900">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  sizes="90vw"
                  className="object-cover object-center transition-transform duration-700 group-hover:scale-103"
                  priority={idx === 0}
                />

                {product.isOutOfStock && (
                  <div className="absolute top-4 right-4 bg-neutral-950/80 backdrop-blur-sm border border-neutral-900 px-3 py-1 text-[9px] tracking-widest text-neutral-400 font-semibold rounded-[2px]">
                    {tProduct("status.out_stock")}
                  </div>
                )}
              </div>

              <div className="px-1">
                <h3 className="font-serif text-lg font-medium text-white group-hover:text-accent transition-colors">
                  {product.name}
                </h3>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
