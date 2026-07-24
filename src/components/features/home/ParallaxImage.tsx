"use client";

import Image from "next/image";
import { motion, useTransform, MotionValue } from "framer-motion";
import { Product } from "@/types/product";
import { productService } from "@/services/product.service";

interface ParallaxImageProps {
  product: Product;
  index: number;
  total: number;
  scrollYProgress: MotionValue<number>;
  onClick: () => void;
  tProduct: (key: string) => string;
}

export default function ParallaxImage({
  product,
  index,
  total,
  scrollYProgress,
  onClick,
  tProduct,
}: ParallaxImageProps) {
  const centerPoint = total > 1 ? index / (total - 1) : 0;
  const step = total > 1 ? 1 / (total - 1) : 1;
  const isFirst = index === 0;
  const isLast = index === total - 1;

  const range = isFirst
    ? [0, step]
    : isLast
    ? [centerPoint - step, 1]
    : [centerPoint - step, centerPoint, centerPoint + step];

  const scale = useTransform(
    scrollYProgress,
    range,
    isFirst ? [1, 0.95] : isLast ? [0.95, 1] : [0.95, 1, 0.95]
  );
  const opacity = useTransform(
    scrollYProgress,
    range,
    isFirst ? [1, 0.5] : isLast ? [0.5, 1] : [0.5, 1, 0.5]
  );
  const filter = useTransform(
    scrollYProgress,
    range,
    isFirst
      ? ["grayscale(0%)", "grayscale(100%)"]
      : isLast
      ? ["grayscale(100%)", "grayscale(0%)"]
      : ["grayscale(100%)", "grayscale(0%)", "grayscale(100%)"]
  );

  const layout = productService.getProductLayout(product.id, false);
  const isInteractive = productService.isInteractive(product.id);

  return (
    <div className="w-full h-full flex items-center justify-center bg-neutral-950">
      <motion.div
        onClick={isInteractive ? onClick : undefined}
        style={{
          height: layout.height,
          scale,
          opacity,
          filter
        }}
        className={`relative ${layout.aspect} ${
          isInteractive ? "cursor-pointer" : "cursor-default"
        } transition-transform duration-500 hover:scale-[1.01]`}
        data-cursor-text={isInteractive ? "VIEW" : undefined}
      >
        <div className="relative w-full h-full">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 1200px) 50vw, 35vw"
            className="object-contain object-center transition-transform duration-700 group-hover:scale-103"
            priority={index === 0}
          />
          <div className="absolute inset-0 bg-neutral-950/10 group-hover:bg-transparent transition-colors duration-500 pointer-events-none" />
        </div>

        {product.isOutOfStock && (
          <div className="absolute top-6 right-6 bg-neutral-950/80 backdrop-blur-sm border border-neutral-900 px-3 py-1 text-[9px] tracking-widest text-neutral-400 font-semibold rounded-[2px] z-10">
            {tProduct("status.out_stock")}
          </div>
        )}
      </motion.div>
    </div>
  );
}
