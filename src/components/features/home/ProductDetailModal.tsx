"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence, PanInfo } from "framer-motion";
import { useTranslations, useLocale } from "next-intl";
import { X } from "lucide-react";
import Accordion from "@/components/ui/Accordion";
import { Product } from "@/types/product";
import { analyticsService } from "@/services/analytics.service";

interface ProductDetailModalProps {
  selectedProduct: Product;
  closeProduct: () => void;
}

export default function ProductDetailModal({
  selectedProduct,
  closeProduct,
}: ProductDetailModalProps) {
  const tProduct = useTranslations("product");
  const locale = useLocale();

  const [showOrderLinks, setShowOrderLinks] = useState(false);
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);
  const rightColumnRef = useRef<HTMLDivElement>(null);

  const [prevVariantKey, setPrevVariantKey] = useState(`${selectedProduct.id}-${selectedColorIndex}`);
  const currentVariantKey = `${selectedProduct.id}-${selectedColorIndex}`;

  if (prevVariantKey !== currentVariantKey) {
    setPrevVariantKey(currentVariantKey);
    setCurrentSlide(0);
  }

  useEffect(() => {
    if (rightColumnRef.current) {
      rightColumnRef.current.scrollTop = 0;
    }
  }, [selectedColorIndex, selectedProduct.id]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (showOrderLinks) {
          setShowOrderLinks(false);
        } else {
          closeProduct();
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [closeProduct, showOrderLinks]);

  const activeImages = (() => {
    if (selectedProduct.colorVariants && selectedProduct.colorVariants[selectedColorIndex]) {
      const variant = selectedProduct.colorVariants[selectedColorIndex];
      if (variant.additionalImages && variant.additionalImages.length > 0) {
        return variant.additionalImages;
      }
    }
    return selectedProduct.additionalImages || [selectedProduct.image];
  })();

  const slideCount = activeImages.length > 0 ? activeImages.length : 1;

  const handleDragEnd = (_: unknown, info: PanInfo) => {
    const swipeThreshold = 40;
    if (info.offset.x < -swipeThreshold && currentSlide < slideCount - 1) {
      setCurrentSlide((prev) => prev + 1);
    } else if (info.offset.x > swipeThreshold && currentSlide > 0) {
      setCurrentSlide((prev) => prev - 1);
    }
  };

  const handleTrackClick = (platform: "facebook" | "instagram", product: Product) => {
    analyticsService.trackProductClick(platform, product.id, product.name);
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.35, ease: "easeInOut" }}
        className={`fixed inset-0 bg-neutral-950 w-screen h-screen flex flex-col md:flex-row overflow-hidden ${
          showOrderLinks ? "z-50" : "z-30"
        }`}
        data-lenis-prevent
      >
        {/* ================= MOBILE VIEW (md:hidden) ================= */}
        <div className="md:hidden w-full h-full overflow-y-auto flex flex-col bg-neutral-950 text-white select-none">
          {/* Order Modal Bottom Sheet (Matching Mockup Image 1) */}
          {showOrderLinks && (
            <div
              onClick={() => setShowOrderLinks(false)}
              className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-end justify-center pointer-events-auto animate-fade-in cursor-pointer"
            >
              <div
                onClick={(e) => e.stopPropagation()}
                className="w-full h-[48vh] bg-neutral-900 border-t border-neutral-800 p-8 pt-16 relative flex flex-col items-center justify-start select-none shadow-2xl cursor-default"
              >
                {/* Modal Close Button Top Right */}
                <button
                  onClick={() => setShowOrderLinks(false)}
                  className="absolute top-6 right-6 text-white/70 hover:text-white p-1 cursor-pointer focus:outline-none"
                  aria-label="Close order options"
                >
                  <X className="w-6 h-6" />
                </button>

                {/* Social Links Stack */}
                <div className="flex flex-col items-center space-y-6 text-center">
                  <a
                    href="https://www.instagram.com/heartofclassy.official"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => handleTrackClick("instagram", selectedProduct)}
                    className="font-sans text-lg sm:text-xl text-white hover:text-accent transition-colors underline underline-offset-8 decoration-white/70 hover:decoration-white cursor-pointer"
                  >
                    Instagram
                  </a>
                  <a
                    href="https://www.facebook.com/Heartofclassy"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => handleTrackClick("facebook", selectedProduct)}
                    className="font-sans text-lg sm:text-xl text-white hover:text-accent transition-colors underline underline-offset-8 decoration-white/70 hover:decoration-white cursor-pointer"
                  >
                    Facebook
                  </a>
                </div>
              </div>
            </div>
          )}
          {/* Mobile Image Touch Slider / Hero Section */}
              <div className="relative w-full h-[60vh] bg-neutral-900 overflow-hidden flex-shrink-0">
                <motion.div
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.2}
                  onDragEnd={handleDragEnd}
                  className="w-full h-full relative cursor-grab active:cursor-grabbing"
                >
                  <AnimatePresence initial={false} mode="wait">
                    <motion.div
                      key={currentSlide}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                      className="relative w-full h-full"
                    >
                      <Image
                        src={activeImages[currentSlide] || selectedProduct.image}
                        alt={`${selectedProduct.name} - ${currentSlide + 1}`}
                        fill
                        priority
                        sizes="100vw"
                        className="object-cover object-center pointer-events-none"
                      />
                    </motion.div>
                  </AnimatePresence>
                </motion.div>

                {/* Dot Pagination Indicators */}
                {slideCount > 1 && (
                  <div className="absolute bottom-4 left-0 right-0 z-20 flex items-center justify-center gap-2.5 pointer-events-auto">
                    {Array.from({ length: slideCount }).map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setCurrentSlide(idx)}
                        className={`w-2.5 h-2.5 rounded-full transition-all duration-300 p-0 focus:outline-none cursor-pointer ${
                          currentSlide === idx
                            ? "bg-white/90 border border-white/90 shadow-sm"
                            : "bg-transparent border border-white/80 hover:border-white"
                        }`}
                        aria-label={`Go to slide ${idx + 1}`}
                      />
                    ))}
                  </div>
                )}
              </div>

              {/* Mobile Info & Accordion Container */}
              <div className="w-full bg-neutral-950 text-white p-6 pb-16 flex flex-col gap-5 select-none">
                {/* Header Row: Name left, Price right */}
                <div className="flex items-baseline justify-between pt-1">
                  <h1 className="font-sans text-[22px] font-normal tracking-[-0.02em] uppercase text-white">
                    {selectedProduct.name}
                  </h1>
                  <span className="font-sans text-[16px] font-normal tracking-[-0.02em] text-white">
                    {locale === "vi" ? `${selectedProduct.priceVi} VNĐ` : `$ ${selectedProduct.priceEn}`}
                  </span>
                </div>

                {/* Color Selector */}
                {selectedProduct.colorVariants && selectedProduct.colorVariants.length > 0 && (
                  <div className="space-y-1.5 pt-0.5">
                    <span className="text-[16px] font-sans text-white block font-normal tracking-[-0.02em]">
                      {locale === "vi" ? "Màu sắc" : "Color"}
                    </span>
                    <div className="flex items-center gap-2.5">
                      {selectedProduct.colorVariants.map((variant, idx) => (
                        <button
                          key={variant.name}
                          onClick={() => setSelectedColorIndex(idx)}
                          className={`w-7 h-7 rounded-full border-2 transition-all duration-200 p-0 flex items-center justify-center cursor-pointer ${
                            selectedColorIndex === idx
                              ? "border-white scale-105"
                              : "border-white/30 hover:border-white/60"
                          }`}
                          aria-label={variant.name}
                          title={variant.name}
                        >
                          <span
                            className="w-full h-full rounded-full block"
                            style={{ backgroundColor: variant.hex }}
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Accordions */}
                <div className="pt-1">
                  <Accordion
                    defaultOpenId="details"
                    variant="minimal"
                    items={[
                      {
                        id: "details",
                        title: tProduct("tabs.details"),
                        content: locale === "vi" ? selectedProduct.descriptionVi : selectedProduct.descriptionEn,
                      },
                      {
                        id: "dimensions",
                        title: tProduct("tabs.dimensions"),
                        content: (
                          <ul className="text-white font-sans font-normal text-[16px] leading-[22px] tracking-[-0.02em] list-disc list-inside space-y-1 pt-0.5">
                            <li>{selectedProduct.dimensions} (Length x Height x Width)</li>
                            <li>
                              {locale === "vi"
                                ? "Dây đeo vai điều chỉnh: 12 – 35 cm"
                                : "Adjustable shoulder strap: 12 – 35 cm"}
                            </li>
                            <li>{locale === "vi" ? "Chế tác thủ công tại Việt Nam" : "Handcrafted in Vietnam"}</li>
                          </ul>
                        ),
                      },
                      {
                        id: "material",
                        title: tProduct("tabs.material"),
                        content: locale === "vi" ? selectedProduct.materialVi : selectedProduct.materialEn,
                      },
                      {
                        id: "care",
                        title: tProduct("tabs.care"),
                        content: tProduct("care_instruction"),
                      },
                    ]}
                  />
                </div>

                {/* Order & Enquire Button Link */}
                <div className="pt-3">
                  <button
                    onClick={() => setShowOrderLinks(true)}
                    className="text-white hover:text-accent font-sans text-[16px] font-normal tracking-[-0.02em] underline underline-offset-4 decoration-white hover:decoration-white transition-colors text-left cursor-pointer"
                  >
                    {locale === "vi" ? "Đặt Hàng & Tư Vấn" : "Order & Enquire"}
                  </button>
                </div>
              </div>
        </div>

        {/* ================= DESKTOP VIEW (hidden md:flex) ================= */}
        <div
          onClick={showOrderLinks ? () => setShowOrderLinks(false) : undefined}
          className={`hidden md:flex w-[60%] h-full bg-neutral-950 text-white flex-col justify-start px-[65px] pr-16 overflow-y-auto relative ${
            showOrderLinks ? "cursor-pointer" : ""
          }`}
        >
          {showOrderLinks ? (
            <>
              <div className="absolute top-8 right-16 z-20">
                <button
                  onClick={() => setShowOrderLinks(false)}
                  className="text-neutral-500 hover:text-white transition-colors p-2"
                  aria-label="Close order options"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex-grow flex flex-col justify-center items-end my-auto pr-12">
                <div className="flex flex-col items-end space-y-6">
                  <a
                    href="https://www.instagram.com/heartofclassy.official"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleTrackClick("instagram", selectedProduct);
                    }}
                    className="font-serif text-3xl text-white hover:text-accent transition-colors underline underline-offset-8 decoration-neutral-800 hover:decoration-white cursor-pointer"
                  >
                    Instagram
                  </a>
                  <a
                    href="https://www.facebook.com/Heartofclassy"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleTrackClick("facebook", selectedProduct);
                    }}
                    className="font-serif text-3xl text-white hover:text-accent transition-colors underline underline-offset-8 decoration-neutral-800 hover:decoration-white cursor-pointer"
                  >
                    Facebook
                  </a>
                </div>
              </div>
            </>
          ) : (
            <div className="w-full pt-[calc(35vh+20px)] pb-16">
              <div className="grid grid-cols-12 gap-14 items-start">
                <div className="col-span-4 space-y-8">
                  <div className="space-y-1.5">
                    <h1 className="font-sans text-[30px] tracking-tight text-white uppercase leading-tight font-normal">
                      {selectedProduct.name}
                    </h1>
                    <div className="font-sans text-[24px] leading-[28px] tracking-[-0.02em] text-white font-normal">
                      {locale === "vi" ? `${selectedProduct.priceVi} VNĐ` : `$ ${selectedProduct.priceEn}`}
                    </div>
                  </div>

                  {selectedProduct.colorVariants && selectedProduct.colorVariants.length > 0 && (
                    <div className="space-y-3 pt-1">
                      <span className="text-[16px] tracking-[-0.02em] font-sans text-white/70">
                        {locale === "vi" ? "Màu sắc" : "Color"}
                      </span>
                      <div className="flex items-center gap-3">
                        {selectedProduct.colorVariants.map((variant, idx) => (
                          <button
                            key={variant.name}
                            onClick={() => setSelectedColorIndex(idx)}
                            className={`w-9 h-9 rounded-full border-2 transition-all duration-200 p-0 flex items-center justify-center ${
                              selectedColorIndex === idx
                                ? "border-white scale-110"
                                : "border-white/30 hover:border-white/60"
                            }`}
                            aria-label={variant.name}
                            title={variant.name}
                          >
                            <span
                              className="w-full h-full rounded-full block"
                              style={{ backgroundColor: variant.hex }}
                            />
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="col-span-8 space-y-6">
                  <Accordion
                    defaultOpenId="details"
                    variant="minimal"
                    items={[
                      {
                        id: "details",
                        title: tProduct("tabs.details"),
                        content: locale === "vi" ? selectedProduct.descriptionVi : selectedProduct.descriptionEn,
                      },
                      {
                        id: "dimensions",
                        title: tProduct("tabs.dimensions"),
                        content: (
                          <ul className="text-white font-sans font-normal text-[24px] leading-[32px] list-disc list-inside space-y-1.5 pt-1">
                            <li>{selectedProduct.dimensions} (Length x Height x Width)</li>
                            <li>
                              {locale === "vi"
                                ? "Dây đeo vai điều chỉnh: 12 – 35 cm"
                                : "Adjustable shoulder strap: 12 – 35 cm"}
                            </li>
                            <li>{locale === "vi" ? "Chế tác thủ công tại Việt Nam" : "Handcrafted in Vietnam"}</li>
                          </ul>
                        ),
                      },
                      {
                        id: "material",
                        title: tProduct("tabs.material"),
                        content: locale === "vi" ? selectedProduct.materialVi : selectedProduct.materialEn,
                      },
                      {
                        id: "care",
                        title: tProduct("tabs.care"),
                        content: tProduct("care_instruction"),
                      },
                    ]}
                  />

                  <div className="pt-6">
                    <button
                      onClick={() => setShowOrderLinks(true)}
                      className="text-white hover:text-accent font-sans text-[24px] leading-[28px] tracking-[-0.02em] font-normal underline underline-offset-8 decoration-1 transition-colors text-left"
                    >
                      {locale === "vi" ? "Đặt Hàng & Tư Vấn" : "Order & Enquire"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Desktop Image Column */}
        <div
          ref={rightColumnRef}
          onClick={showOrderLinks ? () => setShowOrderLinks(false) : undefined}
          className={`hidden md:block w-[40%] h-full relative bg-neutral-900 ${
            showOrderLinks ? "cursor-pointer" : ""
          } ${
            activeImages && activeImages.length > 0
              ? "overflow-y-auto no-scrollbar"
              : "overflow-hidden"
          }`}
          data-cursor-text={showOrderLinks ? "BACK" : undefined}
        >
          <div
            className={`transition-all duration-700 ${
              showOrderLinks ? "blur-[8px] scale-[1.02] opacity-95" : "blur-0 scale-100 opacity-100"
            } ${activeImages && activeImages.length > 0 ? "flex flex-col min-h-fit" : "absolute inset-0"}`}
          >
            {activeImages && activeImages.length > 0 ? (
              activeImages.map((imgSrc, idx) => (
                <div key={idx} className="relative w-full flex-shrink-0">
                  <Image
                    src={imgSrc}
                    alt={`${selectedProduct.name} - ${idx + 1}`}
                    width={0}
                    height={0}
                    sizes="50vw"
                    priority={idx === 0}
                    className="w-full h-auto object-contain block"
                  />
                  <div className="absolute inset-0 bg-neutral-950/10 pointer-events-none" />
                </div>
              ))
            ) : (
              <div className="relative w-full flex-shrink-0">
                <Image
                  src={
                    selectedProduct.colorVariants && selectedProduct.colorVariants[selectedColorIndex]
                      ? selectedProduct.colorVariants[selectedColorIndex].image
                      : selectedProduct.image
                  }
                  alt={selectedProduct.name}
                  width={0}
                  height={0}
                  sizes="50vw"
                  priority
                  className="w-full h-auto object-contain block transition-opacity duration-500"
                  key={selectedColorIndex}
                />
                <div className="absolute inset-0 bg-neutral-950/10 pointer-events-none" />
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
