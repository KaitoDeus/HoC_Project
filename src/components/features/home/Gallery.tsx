"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import { useTranslations, useLocale } from "next-intl";
import { useSearchParams } from "next/navigation";
import { useRouter } from "@/i18n/routing";

import { Product } from "@/types/product";
import { products } from "@/data/products";
import ProductDetailModal from "./ProductDetailModal";

import { MotionValue } from "framer-motion";

const N = products.length;
const SETS = 3; // 3 identical sets for infinite teleport trick
const TOTAL = N * SETS;
const VH_PER_ITEM = 65; // scroll height per product item

// Positive modulo helper
function mod(n: number, m: number) {
  return ((n % m) + m) % m;
}

// Individual reel item with continuous scroll-driven effects (no snap)
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

export default function Gallery() {
  const tProduct = useTranslations("product");
  const locale = useLocale();

  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const searchParams = useSearchParams();
  const router = useRouter();
  const isTeleporting = useRef(false);

  // Derive selectedProduct directly from URL searchParams
  const prodId = searchParams ? searchParams.get("product") : null;
  const selectedProduct = prodId ? (products.find((p) => p.id === prodId) || null) : null;

  // Pause/Resume Lenis scroll to lock background scrolling
  useEffect(() => {
    const lenis = (window as unknown as { lenis?: { stop: () => void; start: () => void } }).lenis;
    if (selectedProduct) {
      if (lenis) lenis.stop();
    } else {
      if (lenis) lenis.start();
    }
    return () => {
      if (lenis) lenis.start();
    };
  }, [selectedProduct]);

  // On mount, teleport scroll to the middle set so user can scroll both up and down
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const containerTop = container.offsetTop;
    const scrollableHeight = container.offsetHeight - window.innerHeight;
    const stepPx = scrollableHeight / (TOTAL - 1);
    const middleSetStart = containerTop + N * stepPx;

    // Use requestAnimationFrame to ensure layout is ready
    requestAnimationFrame(() => {
      const lenis = (window as unknown as { lenis?: { scrollTo: (target: number, options?: { immediate?: boolean }) => void } }).lenis;
      if (lenis) {
        lenis.scrollTo(middleSetStart, { immediate: true });
      } else {
        window.scrollTo({ top: middleSetStart, behavior: "instant" as ScrollBehavior });
      }
    });
  }, []);

  const openProduct = (product: Product) => {
    const isInteractive = product.id === "mooniver-bag" || product.id === "lunaline-bag";
    if (!isInteractive) return;
    router.push(`?product=${product.id}`, { scroll: false });
  };

  const closeProduct = () => {
    router.push("/shop", { scroll: false });
  };

  // Monitor scroll progress
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Reel strip translation driven by scroll
  const frameHeightVh = 38;
  const reelOffset = (100 - frameHeightVh) / 2;
  const totalTranslation = -(TOTAL - 1) * frameHeightVh;
  const yReelVh = useTransform(scrollYProgress, [0, 1], [`${reelOffset}vh`, `${totalTranslation + reelOffset}vh`]);

  // Update activeIndex (wrapping 0..4) based on scroll position
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (isTeleporting.current) return;

    const rawIdx = Math.min(TOTAL - 1, Math.max(0, Math.round(latest * (TOTAL - 1))));
    const wrapped = mod(rawIdx, N);
    if (wrapped !== activeIndex) {
      setActiveIndex(wrapped);
    }

    // Infinite scroll teleport: when reaching outer bounds, jump to middle set silently
    const container = containerRef.current;
    if (!container) return;

    const containerTop = container.offsetTop;
    const scrollableHeight = container.offsetHeight - window.innerHeight;
    const stepPx = scrollableHeight / (TOTAL - 1);
    const oneSetScrollPx = N * stepPx; // Exact scroll distance of 1 set (5 items)

    const currentScroll = window.scrollY - containerTop;

    // Teleport bounds: if scrolled into Set 1 (< 4.5 steps) or Set 3 (> 9.5 steps)
    if (currentScroll < 4.5 * stepPx || currentScroll > 9.5 * stepPx) {
      isTeleporting.current = true;

      // Calculate target scroll in middle set (shifting by exactly 1 set = 5 steps)
      const shift = currentScroll < 4.5 * stepPx ? oneSetScrollPx : -oneSetScrollPx;
      const targetWindowScroll = window.scrollY + shift;

      // Use Lenis scrollTo instant or window.scrollTo
      const lenis = (window as unknown as { lenis?: { scrollTo: (target: number, options?: { immediate?: boolean }) => void } }).lenis;
      if (lenis) {
        lenis.scrollTo(targetWindowScroll, { immediate: true });
      } else {
        window.scrollTo({ top: targetWindowScroll, behavior: "instant" as ScrollBehavior });
      }

      requestAnimationFrame(() => {
        isTeleporting.current = false;
      });
    }
  });

  // Click menu to scroll to that product
  const scrollToProduct = (targetIdx: number) => {
    const container = containerRef.current;
    if (!container) return;

    const containerTop = container.offsetTop;
    const scrollableHeight = container.offsetHeight - window.innerHeight;
    const stepPx = scrollableHeight / (TOTAL - 1);

    // Target position in middle set
    const targetGlobalIdx = N + targetIdx;
    const targetScroll = containerTop + targetGlobalIdx * stepPx;

    const lenis = (window as unknown as { lenis?: { scrollTo: (target: number, options?: { duration?: number }) => void } }).lenis;
    if (lenis) {
      lenis.scrollTo(targetScroll, { duration: 0.6 });
    } else {
      window.scrollTo({ top: targetScroll, behavior: "smooth" });
    }
  };

  // Build the triple-set reel
  const reelProducts = [...products, ...products, ...products];

  // Product layout configurations — normalized heights for even gaps (~20px)
  const getProductLayout = (id: string) => {
    switch (id) {
      case "ownly-cardholder":
        return { height: "30vh", aspect: "aspect-[272/218]" };
      case "ownly-bag":
        return { height: "35vh", aspect: "aspect-square" };
      case "mooniver-bag":
        return { height: "36vh", aspect: "aspect-square" };
      case "lunaline-bag":
        return { height: "33vh", aspect: "aspect-[508/286]" };
      case "layer-bow-charm":
        return { height: "30vh", aspect: "aspect-[351/266]" };
      default:
        return { height: "35vh", aspect: "aspect-square" };
    }
  };

  return (
    <section id="catalog" className="w-full bg-neutral-950">
      {/* DESKTOP: INFINITE SCROLL LOOPING REEL (Obys Agency style — natural page scroll + teleport) */}
      <div
        ref={containerRef}
        className="relative w-full hidden md:block"
        style={{ height: `${TOTAL * VH_PER_ITEM}vh` }}
      >
        <div className="sticky top-0 left-0 w-full h-screen overflow-hidden bg-neutral-950 flex flex-row items-center justify-between">

          {/* LEFT SIDEBAR (Product Menu - Fixed Original Order) */}
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

          {/* CENTER PANEL (Scroll-Driven Continuous Strip — Free Flowing, No Snap) */}
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
                  const layout = getProductLayout(product.id);
                  const isInteractive = product.id === "mooniver-bag" || product.id === "lunaline-bag";

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

          {/* RIGHT PANEL (Active Product Slogan) */}
          <div className="flex-1 h-full flex flex-col justify-center relative px-6 md:pr-[65px] md:pl-4">
            <div className="text-right overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.span
                  key={products[activeIndex].id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  className="font-sans font-normal text-base md:text-[18px] text-white tracking-normal block"
                >
                  {locale === "vi" ? products[activeIndex].sloganVi : products[activeIndex].sloganEn}
                </motion.span>
              </AnimatePresence>
            </div>
          </div>

        </div>
      </div>

      {/* MOBILE: STREAM OF CARDS VIEW */}
      <div className="block md:hidden px-6 py-24 space-y-16 bg-neutral-950">

        <div className="space-y-16">
          {products.map((product, idx) => {
            const isInteractive = product.id === "mooniver-bag" || product.id === "lunaline-bag";
            return (
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6 }}
                key={product.id}
                onClick={isInteractive ? () => openProduct(product) : undefined}
                className={`flex flex-col space-y-4 group ${isInteractive ? "cursor-pointer" : "cursor-default"}`}
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

      {/* PRODUCT DETAIL PAGE / FULL SCREEN VIEW (Figma Frame 6 & 7) */}
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
