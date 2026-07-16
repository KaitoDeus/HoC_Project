"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import { useTranslations, useLocale } from "next-intl";
import { useSearchParams } from "next/navigation";
import { useRouter } from "@/i18n/routing";

import { Product } from "@/types/product";
import { products } from "@/data/products";
import ParallaxImage from "./ParallaxImage";
import ProductDetailModal from "./ProductDetailModal";

export default function Gallery() {
  const tProduct = useTranslations("product");
  const locale = useLocale();

  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const searchParams = useSearchParams();
  const router = useRouter();

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

  const openProduct = (product: Product) => {
    if (product.name === "LOREM IMSUM") return;
    router.push(`?product=${product.id}`, { scroll: false });
  };

  const closeProduct = () => {
    router.push("/shop", { scroll: false });
  };

  // Monitor scroll progress of the entire gallery section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Translate the vertical strip of images
  const frameHeightVh = 65;
  const offset = (100 - frameHeightVh) / 2; // Offset to center 65vh item in 100vh viewport
  const totalTranslation = -(products.length - 1) * frameHeightVh;
  const y = useTransform(scrollYProgress, [0, 1], [`${offset}vh`, `${totalTranslation + offset}vh`]);

  // Update active index on scroll
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const idx = Math.round(latest * (products.length - 1));
    if (idx !== activeIndex) {
      setActiveIndex(idx);
    }
  });

  // Smooth scroll to a product
  const scrollToProduct = useCallback((index: number) => {
    const container = document.getElementById("catalog");
    if (!container) return;
    const containerTop = container.offsetTop;
    const targetScrollY = containerTop + index * window.innerHeight;

    const lenis = (window as unknown as { lenis?: { scrollTo: (target: number, options?: { duration?: number }) => void } }).lenis;
    if (lenis) {
      lenis.scrollTo(targetScrollY, { duration: 1.4 });
    } else {
      window.scrollTo({
        top: targetScrollY,
        behavior: "smooth"
      });
    }
  }, []);

  return (
    <section id="catalog" className="w-full bg-neutral-950">
      {/* DESKTOP: HIGH-END VERTICAL PRODUCT REEL (Inspired by Figma Frame 2 & 4) */}
      <div ref={containerRef} className="relative w-full hidden md:block h-[500vh]">
        <div className="sticky top-0 left-0 w-full h-screen overflow-hidden bg-neutral-950 flex flex-row items-center">
          
          {/* LEFT SIDEBAR (Product Menu & Brand Title) */}
          <div className="w-[30%] h-full flex flex-col justify-center relative py-20 pl-12 lg:pl-24">

            {/* Vertical Menu List */}
            <div className="flex flex-col gap-6 items-start">
              {(() => {
                const menuSequence = [0, 1, 2, 3, 4];
                const activePos = menuSequence.indexOf(activeIndex);
                const displayIndices = Array.from({ length: 5 }, (_, i) => {
                  const seqIdx = (activePos - 2 + i + 5) % 5;
                  return menuSequence[seqIdx];
                });

                return displayIndices.map((targetIdx) => {
                  const product = products[targetIdx];
                  return (
                    <button
                      key={product.id}
                      onClick={() => scrollToProduct(targetIdx)}
                      className={`text-left text-[24px] font-sans tracking-[-0.02em] font-normal uppercase transition-all duration-300 outline-none ${
                        activeIndex === targetIdx
                          ? "text-white"
                          : "text-white/20 hover:text-white/50"
                      }`}
                      data-cursor-text="SCROLL"
                    >
                      {product.name}
                    </button>
                  );
                });
              })()}
            </div>
          </div>

          {/* CENTER PANEL (Scroll-Driven Vertical Sliding Strip) */}
          <div className="w-[40%] h-full flex items-center justify-center">
            <div 
              style={{ width: "55vh" }}
              className="relative h-full overflow-hidden bg-neutral-950 border-x border-neutral-900/60 group"
            >
              <motion.div
                style={{ y, height: `${products.length * frameHeightVh}vh` }}
                className="absolute top-0 left-0 w-full"
              >
                {products.map((product, idx) => (
                  <div 
                    key={product.id} 
                    style={{ height: `${frameHeightVh}vh` }} 
                    className="w-full relative"
                  >
                    <ParallaxImage
                      product={product}
                      index={idx}
                      total={products.length}
                      scrollYProgress={scrollYProgress}
                      onClick={() => openProduct(product)}
                      tProduct={tProduct}
                    />
                  </div>
                ))}
              </motion.div>
            </div>
          </div>

          {/* RIGHT PANEL (Active Product Slogan only, vertically centered) */}
          <div className="w-[30%] h-full flex flex-col justify-center py-20 pr-12 lg:pr-24">
            <div className="text-right overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.span
                  key={activeIndex}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  className="font-sans font-light text-sm md:text-base text-white tracking-widest block"
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
          {products.map((product, idx) => (
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6 }}
              key={product.id}
              onClick={() => openProduct(product)}
              className="flex flex-col space-y-4 cursor-pointer group"
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

              <div className="flex items-end justify-between px-1">
                <div className="space-y-1">
                  <span className="text-[9px] tracking-[0.2em] text-accent font-sans font-semibold">
                    {product.category}
                  </span>
                  <h3 className="font-serif text-lg font-medium text-white group-hover:text-accent transition-colors">
                    {product.name}
                  </h3>
                </div>
                <div className="font-sans text-sm font-semibold text-white">
                  {product.priceVi} đ
                </div>
              </div>
            </motion.div>
          ))}
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
