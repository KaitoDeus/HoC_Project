"use client";

import Image from "next/image";
import { motion, useTransform, MotionValue } from "framer-motion";
import { Product } from "@/types/product";

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
  const range = [
    Math.max(0, centerPoint - step),
    centerPoint,
    Math.min(1, centerPoint + step)
  ];

  // Reel effects: Full opacity & color at center selection; 50% opacity & 100% grayscale black and white when unselected
  const scale = useTransform(scrollYProgress, range, [0.95, 1, 0.95]);
  const opacity = useTransform(scrollYProgress, range, [0.5, 1, 0.5]);
  const filter = useTransform(
    scrollYProgress,
    range,
    ["grayscale(100%)", "grayscale(0%)", "grayscale(100%)"]
  );

  const getProductLayout = (id: string) => {
    switch (id) {
      case "ownly-cardholder": // Rectangle 5: 272 x 218 -> ~32vh
        return { height: "34vh", aspect: "aspect-[272/218]" };
      case "ownly-bag": // Rectangle 6: 320 x 320 -> ~44vh
        return { height: "45vh", aspect: "aspect-square" };
      case "mooniver-bag": // Rectangle 2: 372 x 372 -> ~52vh
        return { height: "53vh", aspect: "aspect-square" };
      case "lunaline-bag": // Rectangle 3: 508 x 286 -> ~40vh
        return { height: "40vh", aspect: "aspect-[508/286]" };
      case "layer-bow-charm": // Rectangle 4: 351 x 266 -> ~37vh
        return { height: "37vh", aspect: "aspect-[351/266]" };
      default:
        return { height: "50vh", aspect: "aspect-square" };
    }
  };

  const layout = getProductLayout(product.id);
  const isInteractive = product.id === "mooniver-bag" || product.id === "lunaline-bag";

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
          {/* Subtle hover overlay */}
          <div className="absolute inset-0 bg-neutral-950/10 group-hover:bg-transparent transition-colors duration-500 pointer-events-none" />
        </div>

        {/* Out of Stock Badge */}
        {product.isOutOfStock && (
          <div className="absolute top-6 right-6 bg-neutral-950/80 backdrop-blur-sm border border-neutral-900 px-3 py-1 text-[9px] tracking-widest text-neutral-400 font-semibold rounded-[2px] z-10">
            {tProduct("status.out_stock")}
          </div>
        )}
      </motion.div>
    </div>
  );
}
