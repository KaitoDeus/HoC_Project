"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useScroll, useTransform, useMotionValueEvent, MotionValue } from "framer-motion";
import { Product } from "@/types/product";
import { productService } from "@/services/product.service";
import { scrollService } from "@/services/scroll.service";

const products = productService.getAllProducts();
const N = products.length;
const SETS = 3;
const TOTAL = N * SETS;
const VH_PER_ITEM = 65;

function mod(n: number, m: number) {
  return ((n % m) + m) % m;
}

function ReelItem({
  product,
  idx,
  layout,
  isInteractive,
  frameHeightVh,
  scrollYProgress,
  totalItems,
  onClickProduct,
  tProduct,
}: {
  product: Product;
  idx: number;
  layout: { height: string; aspect: string };
  isInteractive: boolean;
  frameHeightVh: number;
  scrollYProgress: MotionValue<number>;
  totalItems: number;
  onClickProduct: () => void;
  tProduct: (key: string) => string;
}) {
  const centerPoint = totalItems > 1 ? idx / (totalItems - 1) : 0;
  const step = totalItems > 1 ? 1 / (totalItems - 1) : 1;

  const rangeStart = Math.max(0, centerPoint - step);
  const rangeEnd = Math.min(1, centerPoint + step);

  const opacity = useTransform(
    scrollYProgress,
    [rangeStart, centerPoint, rangeEnd],
    [0.5, 1, 0.5]
  );
  const scale = useTransform(
    scrollYProgress,
    [rangeStart, centerPoint, rangeEnd],
    [0.95, 1, 0.95]
  );
  const filter = useTransform(
    scrollYProgress,
    [rangeStart, centerPoint, rangeEnd],
    ["grayscale(100%)", "grayscale(0%)", "grayscale(100%)"]
  );

  return (
    <div
      style={{ height: `${frameHeightVh}vh` }}
      className="w-full flex items-center justify-center"
    >
      <motion.div
        style={{ height: layout.height, opacity, scale, filter }}
        onClick={isInteractive ? onClickProduct : undefined}
        className={`relative ${layout.aspect} ${
          isInteractive ? "cursor-pointer" : "cursor-default"
        }`}
        data-cursor-text={isInteractive ? "VIEW" : undefined}
      >
        <div className="relative w-full h-full">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 1200px) 50vw, 35vw"
            className="object-contain object-center"
            priority={idx < N}
          />
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

interface DesktopGalleryProps {
  openProduct: (product: Product) => void;
  tProduct: (key: string) => string;
  locale: string;
}

export default function DesktopGallery({ openProduct, tProduct, locale }: DesktopGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const isTeleporting = useRef(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        window.history.scrollRestoration = "manual";
      } catch {
        // Fallback ignore
      }
    }

    const scrollToMiddle = () => {
      const container = containerRef.current;
      if (!container) return;

      const containerTop = container.offsetTop;
      const scrollableHeight = container.offsetHeight - window.innerHeight;
      if (scrollableHeight <= 0) return;

      const stepPx = scrollableHeight / (TOTAL - 1);
      const middleSetStart = containerTop + N * stepPx;

      scrollService.scrollTo(middleSetStart, { immediate: true });
    };

    scrollToMiddle();
    const t1 = setTimeout(scrollToMiddle, 50);
    const t2 = setTimeout(scrollToMiddle, 150);
    const t3 = setTimeout(scrollToMiddle, 300);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const frameHeightVh = 38;
  const reelOffset = (100 - frameHeightVh) / 2;
  const totalTranslation = -(TOTAL - 1) * frameHeightVh;
  const yReelVh = useTransform(scrollYProgress, [0, 1], [`${reelOffset}vh`, `${totalTranslation + reelOffset}vh`]);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (isTeleporting.current) return;

    const rawIdx = Math.min(TOTAL - 1, Math.max(0, Math.round(latest * (TOTAL - 1))));
    const wrapped = mod(rawIdx, N);
    if (wrapped !== activeIndex) {
      setActiveIndex(wrapped);
    }

    const container = containerRef.current;
    if (!container) return;

    const containerTop = container.offsetTop;
    const scrollableHeight = container.offsetHeight - window.innerHeight;
    const stepPx = scrollableHeight / (TOTAL - 1);
    const oneSetScrollPx = N * stepPx;

    const currentScroll = window.scrollY - containerTop;

    if (currentScroll < 3.5 * stepPx || currentScroll > 9.5 * stepPx) {
      isTeleporting.current = true;

      const shift = currentScroll < 3.5 * stepPx ? oneSetScrollPx : -oneSetScrollPx;
      const targetWindowScroll = window.scrollY + shift;

      scrollService.scrollTo(targetWindowScroll, { immediate: true });

      requestAnimationFrame(() => {
        isTeleporting.current = false;
      });
    }
  });

  const scrollToProduct = (targetIdx: number) => {
    const container = containerRef.current;
    if (!container) return;

    const containerTop = container.offsetTop;
    const scrollableHeight = container.offsetHeight - window.innerHeight;
    const stepPx = scrollableHeight / (TOTAL - 1);

    const targetGlobalIdx = N + targetIdx;
    const targetScroll = containerTop + targetGlobalIdx * stepPx;

    scrollService.scrollTo(targetScroll, { duration: 0.6 });
  };

  const reelProducts = [...products, ...products, ...products];

  return (
    <div
      ref={containerRef}
      className="relative w-full"
      style={{ height: `${TOTAL * VH_PER_ITEM}vh` }}
    >
      <div className="sticky top-0 left-0 w-full h-screen overflow-hidden bg-neutral-950 flex flex-row items-center justify-between">
        <div className="flex-1 h-full flex flex-col justify-center relative px-6 md:pl-[65px] md:pr-4">
          <motion.div
            animate={{ y: (2 - activeIndex) * 31 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="flex flex-col gap-[7px] items-start"
          >
            {products.map((product, idx) => (
              <button
                key={product.id}
                onClick={() => scrollToProduct(idx)}
                className={`text-left text-[24px] font-sans font-normal tracking-normal uppercase transition-colors duration-300 outline-none leading-tight ${
                  activeIndex === idx
                    ? "text-[#FFFFFF]"
                    : "text-[#777777] hover:text-[#AAAAAA]"
                }`}
                data-cursor-text="SCROLL"
              >
                {product.name}
              </button>
            ))}
          </motion.div>
        </div>

        <div className="w-[70vh] lg:w-[76vh] max-w-[55vw] h-full flex items-center justify-center flex-shrink-0">
          <div
            style={{ width: "100%" }}
            className="relative h-full overflow-hidden bg-neutral-950 border-x border-neutral-900/60"
          >
            <motion.div
              style={{ y: yReelVh, height: `${TOTAL * frameHeightVh}vh` }}
              className="absolute top-0 left-0 w-full will-change-transform"
            >
              {reelProducts.map((product, idx) => {
                const layout = productService.getProductLayout(product.id, true);
                const isInteractive = productService.isInteractive(product.id);

                return (
                  <ReelItem
                    key={`${product.id}-${idx}`}
                    product={product}
                    idx={idx}
                    layout={layout}
                    isInteractive={isInteractive}
                    frameHeightVh={frameHeightVh}
                    scrollYProgress={scrollYProgress}
                    totalItems={TOTAL}
                    onClickProduct={() => openProduct(product)}
                    tProduct={tProduct}
                  />
                );
              })}
            </motion.div>
          </div>
        </div>

        <div className="flex-1 h-full flex flex-col justify-center relative px-6 md:pr-[65px] md:pl-4">
          <div className="text-right overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.span
                key={products[activeIndex].id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="font-sans font-normal text-[18px] md:text-[22px] leading-[28px] text-white tracking-normal block text-right"
              >
                {locale === "vi" ? products[activeIndex].sloganVi : products[activeIndex].sloganEn}
              </motion.span>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
