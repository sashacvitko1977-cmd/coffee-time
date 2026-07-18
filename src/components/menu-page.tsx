"use client";

import { useCallback, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { MENU_ITEMS, type MenuItem } from "@/data/menu";
import { ProductModal } from "@/components/product-modal";

export function MenuPage() {
  const [active, setActive] = useState<MenuItem | null>(null);
  /** JS-driven glow — stays while hovered; sticky on touch until another card */
  const [litId, setLitId] = useState<string | null>(null);

  const openItem = useCallback((item: MenuItem) => {
    setActive(item);
  }, []);

  const closeItem = useCallback(() => {
    setActive(null);
  }, []);

  const lightOn = useCallback((id: string) => {
    setLitId(id);
  }, []);

  const lightOffIfMouse = useCallback(
    (id: string, pointerType: string) => {
      // Touch: keep glowing until another card is touched (no flash-off on lift)
      if (pointerType === "touch" || pointerType === "pen") return;
      setLitId((cur) => (cur === id ? null : cur));
    },
    []
  );

  return (
    <section className="pb-16 pt-6 sm:pb-20 sm:pt-8">
      <div className="container-site">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="mb-10 max-w-2xl sm:mb-12"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber">
            Coffee Time
          </p>
          <h1 className="mt-2 font-display text-4xl font-semibold tracking-tight text-milk sm:text-5xl">
            Меню
          </h1>
          <p className="mt-3 max-w-lg text-base site-text-muted sm:text-lg">
            Нажмите на карточку, чтобы узнать больше. Короткий список — только
            то, что готовим каждый день.
          </p>
          <div className="mt-5 h-px w-16 bg-amber/70" />
        </motion.div>

        <div className="grid gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
          {MENU_ITEMS.map((item, i) => {
            const lit = litId === item.id;
            return (
              <motion.button
                key={item.id}
                type="button"
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: Math.min(i * 0.04, 0.28), duration: 0.35 }}
                onClick={() => openItem(item)}
                onPointerEnter={() => lightOn(item.id)}
                onPointerDown={() => lightOn(item.id)}
                onPointerLeave={(e) => lightOffIfMouse(item.id, e.pointerType)}
                className={`site-panel menu-card group flex w-full flex-col overflow-hidden text-left ${
                  lit ? "menu-card-lit" : ""
                }`}
              >
                <div className="relative h-44 w-full overflow-hidden bg-[#2a241c] sm:h-52">
                  <Image
                    src={item.img}
                    alt={item.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className={`object-cover object-center transition-transform duration-500 ease-out ${
                      litId === item.id ? "scale-105" : "scale-100"
                    }`}
                    style={{ objectFit: "cover", objectPosition: "center" }}
                  />
                  {item.featured && (
                    <span className="absolute left-3 top-3 rounded-full bg-amber px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-ink">
                      Хит
                    </span>
                  )}
                </div>
                <div className="flex min-h-[7.5rem] flex-1 flex-col p-4 sm:min-h-[8rem] sm:p-5">
                  <div className="flex items-start justify-between gap-3">
                    <h2 className="font-display text-xl font-semibold text-milk">
                      {item.name}
                    </h2>
                    <span className="shrink-0 rounded-full bg-amber/20 px-3 py-1 text-sm font-semibold text-amber">
                      {item.price}
                    </span>
                  </div>
                  <p className="mt-1 line-clamp-2 flex-1 text-sm site-text-muted">
                    {item.desc}
                  </p>
                  <p className="mt-auto pt-3 text-left text-xs font-medium text-amber/80">
                    Подробнее →
                  </p>
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>

      <ProductModal item={active} onClose={closeItem} />
    </section>
  );
}
