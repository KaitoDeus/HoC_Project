"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations, useLocale } from "next-intl";
import { X } from "lucide-react";
import Accordion from "@/components/ui/Accordion";
import { Product } from "@/types/product";

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
  const rightColumnRef = useRef<HTMLDivElement>(null);

  // Reset scroll container of the right column when switching variants
  useEffect(() => {
    if (rightColumnRef.current) {
      rightColumnRef.current.scrollTop = 0;
    }
  }, [selectedColorIndex]);

  // Derive active images based on color variant or fallback to additionalImages
  const activeImages = (() => {
    if (selectedProduct.colorVariants && selectedProduct.colorVariants[selectedColorIndex]) {
      const variant = selectedProduct.colorVariants[selectedColorIndex];
      if (variant.additionalImages && variant.additionalImages.length > 0) {
        return variant.additionalImages;
      }
    }
    return selectedProduct.additionalImages || [];
  })();

  const handleTrackClick = (platform: "facebook" | "instagram", product: Product) => {
    if (typeof window !== "undefined") {
      // GA4 Event
      if (window.gtag) {
        window.gtag("event", "contact_click", {
          contact_platform: platform,
          product_id: product.id,
          product_name: product.name,
        });
      }
      // Meta Pixel Event
      if (window.fbq) {
        window.fbq("trackCustom", "ContactClick", {
          platform: platform,
          productId: product.id,
          productName: product.name,
        });
      }
    }
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
        {/* LEFT COLUMN: Product Details & Accordion OR Social Links */}
        <div
          onClick={showOrderLinks ? () => setShowOrderLinks(false) : undefined}
          className={`w-full md:w-[60%] h-[60vh] md:h-full bg-neutral-950 text-white flex flex-col justify-between px-6 md:pl-[65px] md:pr-12 lg:pr-16 py-12 overflow-y-auto relative ${
            showOrderLinks ? "cursor-pointer" : ""
          }`}
        >
          {showOrderLinks ? (
            <>
              {/* Close button in top-right of left panel */}
              <div className="absolute top-8 right-8 md:right-16 z-20">
                <button
                  onClick={() => setShowOrderLinks(false)}
                  className="text-neutral-500 hover:text-white transition-colors p-2"
                  aria-label="Close order options"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Right-aligned social links (vertically centered) */}
              <div className="flex-grow flex flex-col justify-center items-end my-auto pr-4 md:pr-8 lg:pr-12">
                <div className="flex flex-col items-end space-y-6">
                  <a
                    href="https://www.instagram.com/heartofclassy.official"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleTrackClick("instagram", selectedProduct);
                    }}
                    className="font-serif text-2xl lg:text-3xl text-white hover:text-accent transition-colors underline underline-offset-8 decoration-neutral-800 hover:decoration-white cursor-pointer"
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
                    className="font-serif text-2xl lg:text-3xl text-white hover:text-accent transition-colors underline underline-offset-8 decoration-neutral-800 hover:decoration-white cursor-pointer"
                  >
                    Facebook
                  </a>
                </div>
              </div>
            </>
          ) : (
            <>
              {/* Main Content Area (Vertically Centered in Viewport, Top-aligned Columns) */}
              <div className="my-auto w-full">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10 lg:gap-12 items-start">
                  {/* Sub-column 1: Product Name, Price & Color */}
                  <div className="md:col-span-5 space-y-6 md:space-y-8">
                    <div className="space-y-1.5">
                      <h1 className="font-sans text-[30px] tracking-tight text-white uppercase leading-tight font-normal">
                        {selectedProduct.name}
                      </h1>
                      <div className="font-sans text-[24px] leading-[28px] tracking-[-0.02em] text-white font-normal">
                        {locale === "vi" ? `${selectedProduct.priceVi} VNĐ` : `$ ${selectedProduct.priceEn}`}
                      </div>
                    </div>

                    {/* Color picker radio buttons */}
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

                  {/* Sub-column 2: Accordion & Order & Enquire link */}
                  <div className="md:col-span-7 space-y-6">
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
            </>
          )}
        </div>

        {/* RIGHT COLUMN: Large Image & Typographic Overlay */}
        <div
          ref={rightColumnRef}
          onClick={showOrderLinks ? () => setShowOrderLinks(false) : undefined}
          className={`w-full md:w-[40%] h-[40vh] md:h-full relative bg-neutral-900 ${
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
                <div key={idx} className="relative w-full h-[40vh] md:h-screen flex-shrink-0">
                  <Image
                    src={imgSrc}
                    alt={`${selectedProduct.name} - ${idx + 1}`}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority={idx === 0}
                    className="object-cover object-top"
                  />
                  {/* Overlay shadow */}
                  <div className="absolute inset-0 bg-neutral-950/10 pointer-events-none" />
                </div>
              ))
            ) : (
              <>
                <Image
                  src={
                    selectedProduct.colorVariants && selectedProduct.colorVariants[selectedColorIndex]
                      ? selectedProduct.colorVariants[selectedColorIndex].image
                      : selectedProduct.image
                  }
                  alt={selectedProduct.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                  className="object-cover object-top transition-opacity duration-500"
                  key={selectedColorIndex}
                />
                {/* Overlay shadow */}
                <div className="absolute inset-0 bg-neutral-950/10" />
              </>
            )}
          </div>

          {/* Close button for Mobile screen only (in Header area) */}
          <button
            onClick={closeProduct}
            className="absolute top-6 right-6 z-50 p-2 rounded-full border border-white/20 text-white/70 hover:text-white hover:border-white/50 bg-neutral-950/40 backdrop-blur-sm transition-colors md:hidden"
            aria-label="Close product view"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
