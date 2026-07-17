"use client";

import { useEffect } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import type { MenuItem } from "@/data/menu";

type Props = {
  item: MenuItem | null;
  onClose: () => void;
};

/**
 * Product details overlay. Locks body scroll without jumping to top;
 * restores scrollY on close.
 */
export function ProductModal({ item, onClose }: Props) {
  useEffect(() => {
    if (!item) return;

    const scrollY = window.scrollY;
    const { body, documentElement } = document;
    const prevOverflow = body.style.overflow;
    const prevPosition = body.style.position;
    const prevTop = body.style.top;
    const prevWidth = body.style.width;

    body.style.overflow = "hidden";
    body.style.position = "fixed";
    body.style.top = `-${scrollY}px`;
    body.style.width = "100%";

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);

    return () => {
      window.removeEventListener("keydown", onKey);
      body.style.overflow = prevOverflow;
      body.style.position = prevPosition;
      body.style.top = prevTop;
      body.style.width = prevWidth;
      // Restore exact scroll — no jump to top, no reload
      window.scrollTo(0, scrollY);
      documentElement.style.scrollBehavior = "";
    };
  }, [item, onClose]);

  return (
    <AnimatePresence>
      {item && (
        <motion.div
          key={item.id}
          className="fixed inset-0 z-[80] flex items-end justify-center sm:items-center sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-labelledby={`product-title-${item.id}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {/* Backdrop */}
          <button
            type="button"
            className="absolute inset-0 bg-ink/75 backdrop-blur-sm"
            aria-label="Закрыть"
            onClick={onClose}
          />

          <motion.div
            initial={{ opacity: 0, y: 28, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 flex max-h-[92svh] w-full max-w-lg flex-col overflow-hidden rounded-t-3xl border border-white/15 bg-[#1a1814]/95 shadow-2xl backdrop-blur-xl sm:rounded-3xl"
          >
            <button
              type="button"
              onClick={onClose}
              className="absolute right-3 top-3 z-20 inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-ink/60 text-milk transition hover:bg-ink/80"
              aria-label="Закрыть товар"
            >
              <X size={20} strokeWidth={2.25} />
            </button>

            <div className="relative aspect-[4/3] w-full shrink-0 sm:aspect-[16/10]">
              <Image
                src={item.img}
                alt={item.name}
                fill
                sizes="(max-width: 640px) 100vw, 512px"
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1a1814] via-transparent to-transparent" />
            </div>

            <div className="overflow-y-auto px-5 pb-6 pt-4 sm:px-7 sm:pb-8">
              {item.featured && (
                <span className="mb-2 inline-block rounded-full bg-amber px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-ink">
                  Хит
                </span>
              )}
              <div className="flex items-start justify-between gap-3">
                <h2
                  id={`product-title-${item.id}`}
                  className="font-display text-2xl font-semibold text-milk sm:text-3xl"
                >
                  {item.name}
                </h2>
                <span className="shrink-0 rounded-full bg-amber/20 px-3 py-1 text-sm font-semibold text-amber">
                  {item.price}
                </span>
              </div>
              <p className="mt-3 text-sm leading-relaxed site-text-muted sm:text-base">
                {item.fullDesc}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {item.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-white/15 px-2.5 py-1 text-xs font-medium text-milk/75"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
