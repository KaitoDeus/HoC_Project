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
  const startRange = Math.max(0, (index - 1) / (total - 1));
  const endRange = Math.min(1, (index + 1) / (total - 1));
  // Translate the image inside its overflow-hidden container to create parallax depth
  const yImg = useTransform(scrollYProgress, [startRange, endRange], ["-8%", "8%"]);
  const getProductLayout = (id: string) => {
    switch (id) {
      case "ownly-cardholder":
        return { height: "56vh", aspect: "aspect-[4/5]" };
      case "ownly-bag":
        return { height: "54vh", aspect: "aspect-[4/5]" };
      case "mooniver-bag":
        return { height: "60vh", aspect: "aspect-[3/4]" };
      case "lunaline-bag":
        return { height: "58vh", aspect: "aspect-[4/5]" };
      case "layer-bow-charm":
        return { height: "54vh", aspect: "aspect-[4/5]" };
      default:
        return { height: "58vh", aspect: "aspect-[4/5]" };
    }
  };

  const layout = getProductLayout(product.id);

  return (
    <div className="w-full h-full flex items-center justify-center bg-neutral-950">
      <div
        onClick={onClick}
        style={{ height: layout.height }}
        className={`relative ${layout.aspect} overflow-hidden cursor-pointer transition-transform duration-500 hover:scale-[1.01]`}
        data-cursor-text="VIEW"
      >
        <motion.div style={{ y: yImg }} className="absolute -top-[10%] left-0 w-full h-[120%]">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 1200px) 50vw, 35vw"
            className="object-cover object-center transition-transform duration-700 group-hover:scale-103"
            priority={index === 0}
          />
          {/* Subtle hover overlay */}
          <div className="absolute inset-0 bg-neutral-950/15 group-hover:bg-transparent transition-colors duration-500" />
        </motion.div>

        {/* Out of Stock Badge */}
        {product.isOutOfStock && (
          <div className="absolute top-6 right-6 bg-neutral-950/80 backdrop-blur-sm border border-neutral-900 px-3 py-1 text-[9px] tracking-widest text-neutral-400 font-semibold rounded-[2px] z-10">
            {tProduct("status.out_stock")}
          </div>
        )}
      </div>
    </div>
  );
}
