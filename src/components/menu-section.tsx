"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useVideoStory, MARKS } from "./video-story-context";

const ITEMS = [
  {
    name: "Эспрессо",
    desc: "Плотный, с карамельной сладостью",
    price: "180 ₽",
    img: "/media/menu-1.jpg",
  },
  {
    name: "Капучино",
    desc: "Бархатная пенка, баланс молока",
    price: "280 ₽",
    img: "/media/menu-2.jpg",
  },
  {
    name: "Фильтр дня",
    desc: "Сезонный лот, светлая обжарка",
    price: "320 ₽",
    img: "/media/menu-3.jpg",
  },
  {
    name: "Флэт уайт",
    desc: "Двойной шот, тонкий слой молока",
    price: "300 ₽",
    img: "/media/menu-4.jpg",
  },
  {
    name: "Латте",
    desc: "Мягкий, сливочный, на каждый день",
    price: "290 ₽",
    img: "/media/menu-5.jpg",
  },
  {
    name: "Матча латте",
    desc: "Церемониальная матча, чистый вкус",
    price: "360 ₽",
    img: "/media/menu-6.jpg",
  },
  {
    name: "Какао",
    desc: "Горячий шоколад без лишней сладости",
    price: "260 ₽",
    img: "/media/menu-7.jpg",
  },
  {
    name: "Круассан",
    desc: "Свежая выпечка каждое утро",
    price: "220 ₽",
    img: "/media/menu-8.jpg",
  },
  {
    name: "Чизкейк",
    desc: "Нежный, к фильтру или капучино",
    price: "340 ₽",
    img: "/media/menu-9.jpg",
  },
];

export function MenuSection() {
  const { playTo, setPhase, phase, reduce } = useVideoStory();
  const sectionRef = useRef<HTMLElement>(null);
  const started = useRef(false);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const run = async () => {
      if (started.current) return;
      started.current = true;
      await playTo(MARKS.milk);
      setPhase(1);
      setRevealed(true);
    };

    if (reduce) {
      setRevealed(true);
      setPhase(1);
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        const e = entries[0];
        if (e?.isIntersecting && e.intersectionRatio >= 0.15) {
          void run();
        }
      },
      { threshold: [0.15, 0.3], rootMargin: "0px 0px -10% 0px" }
    );

    io.observe(el);
    return () => io.disconnect();
  }, [playTo, setPhase, reduce]);

  useEffect(() => {
    if (phase >= 1) setRevealed(true);
  }, [phase]);

  return (
    <section
      ref={sectionRef}
      id="menu"
      className={`relative z-10 ${revealed ? "py-12 sm:py-16" : "h-[35svh]"}`}
    >
      {revealed ? (
        <div className="container-site">
          <div className="mb-8 max-w-xl">
            <h2 className="section-title text-milk">Меню</h2>
            <p className="section-lead site-text-muted">
              Только то, что готовим каждый день.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
            {ITEMS.map((item, i) => (
              <motion.article
                key={item.name}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.03, duration: 0.35 }}
                className="site-panel menu-card group overflow-hidden cursor-default"
              >
                <div className="relative aspect-[5/4] overflow-hidden sm:aspect-[4/3]">
                  <Image
                    src={item.img}
                    alt={item.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="flex items-start justify-between gap-3 p-4 sm:p-5">
                  <div>
                    <h3 className="font-display text-xl font-semibold text-milk">
                      {item.name}
                    </h3>
                    <p className="mt-1 text-sm site-text-muted">{item.desc}</p>
                  </div>
                  <span className="shrink-0 rounded-full bg-amber/20 px-3 py-1 text-sm font-semibold text-amber">
                    {item.price}
                  </span>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      ) : null}
    </section>
  );
}
