"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface AccordionItem {
  id: string;
  title: string;
  content: React.ReactNode;
}

interface AccordionProps {
  items: AccordionItem[];
  variant?: "standard" | "minimal";
  defaultOpenId?: string;
}

export default function Accordion({ items, variant = "standard", defaultOpenId }: AccordionProps) {
  const [openId, setOpenId] = useState<string | null>(defaultOpenId || null);

  const toggleItem = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  const isMinimal = variant === "minimal";

  return (
    <div className={isMinimal ? "w-full font-sans space-y-5" : "w-full divide-y divide-neutral-900 border-t border-b border-neutral-900 font-sans"}>
      {items.map((item) => {
        const isOpen = openId === item.id;

        return (
          <div key={item.id} className={isMinimal ? "" : "py-2.5"}>
            <button
              onClick={() => toggleItem(item.id)}
              className={isMinimal 
                ? "flex items-center text-left group gap-2 py-0.5 outline-none" 
                : "flex w-full items-center justify-between py-2 text-left group"
              }
              aria-expanded={isOpen}
            >
              <span className={isMinimal 
                ? "text-[30px] leading-[34px] tracking-[-0.02em] font-normal text-white group-hover:text-accent transition-colors" 
                : "text-sm tracking-[0.2em] font-semibold text-white group-hover:text-accent transition-colors"
              }>
                {item.title}
              </span>
              <span className={isMinimal
                ? "text-[30px] leading-[34px] text-white group-hover:text-accent transition-colors font-normal ml-1"
                : "text-white group-hover:text-accent transition-colors font-light text-base"
              }>
                {isOpen ? "–" : "+"}
              </span>
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.35, ease: [0.25, 1, 0.5, 1] }}
                  className="overflow-hidden"
                >
                  <div className={isMinimal
                    ? "pt-3 pb-2 pr-2 text-[24px] text-white leading-[32px] font-sans font-normal max-w-xl"
                    : "pb-3 pt-1.5 pr-4 text-sm text-white leading-relaxed font-sans font-light max-w-md"
                  }>
                    {item.content}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
