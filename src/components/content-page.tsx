"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Clock, MapPin, Phone } from "lucide-react";
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

/**
 * Одна страница: Hero → Меню → Контакты.
 * Скролл до меню → видео до plan2 → меню появляется.
 * Скролл до контактов → видео до plan3 → контакты появляются.
 */
export function ContentPage() {
  const { playTo, setPhase, reduce } = useVideoStory();
  const menuRef = useRef<HTMLElement>(null);
  const visitRef = useRef<HTMLElement>(null);
  const menuStarted = useRef(false);
  const visitStarted = useRef(false);
  const [menuOn, setMenuOn] = useState(false);
  const [visitOn, setVisitOn] = useState(false);

  useEffect(() => {
    if (reduce) {
      setMenuOn(true);
      setVisitOn(true);
      setPhase(2);
      return;
    }

    const menuEl = menuRef.current;
    const visitEl = visitRef.current;
    if (!menuEl || !visitEl) return;

    const menuIo = new IntersectionObserver(
      (entries) => {
        const e = entries[0];
        if (!e?.isIntersecting || menuStarted.current) return;
        menuStarted.current = true;
        // Раздел появляется на странице, видео доезжает до plan2
        setMenuOn(true);
        void playTo(MARKS.milk).then(() => setPhase(1));
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" }
    );

    const visitIo = new IntersectionObserver(
      (entries) => {
        const e = entries[0];
        if (!e?.isIntersecting || visitStarted.current) return;
        visitStarted.current = true;
        // Контакты ниже на той же странице; видео до plan3
        setVisitOn(true);
        void playTo(MARKS.girl).then(() => setPhase(2));
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" }
    );

    menuIo.observe(menuEl);
    visitIo.observe(visitEl);
    return () => {
      menuIo.disconnect();
      visitIo.disconnect();
    };
  }, [playTo, setPhase, reduce]);

  return (
    <div className="relative z-10">
      {/* Меню */}
      <section
        ref={menuRef}
        id="menu"
        className="scroll-mt-20 py-12 sm:py-14"
      >
        <div className="container-site">
          <motion.div
            initial={false}
            animate={{ opacity: menuOn ? 1 : 0, y: menuOn ? 0 : 20 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="mb-7 max-w-xl">
              <h2 className="section-title text-milk">Меню</h2>
              <p className="section-lead site-text-muted">
                Только то, что готовим каждый день.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
              {ITEMS.map((item, i) => (
                <motion.article
                  key={item.name}
                  initial={false}
                  animate={
                    menuOn ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }
                  }
                  transition={{
                    delay: menuOn ? Math.min(i * 0.03, 0.25) : 0,
                    duration: 0.3,
                  }}
                  className="site-panel group overflow-hidden"
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
          </motion.div>
        </div>
      </section>

      {/* Контакты — та же страница, сразу под меню */}
      <section
        ref={visitRef}
        id="visit"
        className="scroll-mt-20 py-12 sm:py-14"
      >
        <div className="container-site">
          <motion.div
            initial={false}
            animate={{ opacity: visitOn ? 1 : 0, y: visitOn ? 0 : 20 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="mb-7 max-w-xl">
              <h2 className="section-title text-milk">Контакты</h2>
              <p className="section-lead site-text-muted">
                Москва, ул. Садовая, 14 — рядом с парком.
              </p>
            </div>

            <div className="grid gap-5 lg:grid-cols-2 lg:gap-8">
              <div className="site-panel p-5 sm:p-7">
                <ul className="space-y-4">
                  <li className="flex gap-3">
                    <span className="mt-0.5 text-coffee">
                      <MapPin size={20} aria-hidden="true" />
                    </span>
                    <p className="font-medium text-milk">Москва, ул. Садовая, 14</p>
                  </li>
                  <li className="flex gap-3">
                    <span className="mt-0.5 text-coffee">
                      <Clock size={20} aria-hidden="true" />
                    </span>
                    <div>
                      <p className="font-medium text-milk">Пн–Пт 08:00–21:00</p>
                      <p className="font-medium text-milk">Сб–Вс 09:00–22:00</p>
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <span className="mt-0.5 text-coffee">
                      <Phone size={20} aria-hidden="true" />
                    </span>
                    <a
                      href="tel:+74951234567"
                      className="font-medium text-milk transition hover:text-coffee"
                    >
                      +7 (495) 123-45-67
                    </a>
                  </li>
                </ul>
              </div>

              <div className="site-panel overflow-hidden">
                <div className="relative aspect-[4/3] w-full sm:min-h-[300px] sm:aspect-auto">
                  <iframe
                    title="Карта: Coffee Time"
                    className="map-frame absolute inset-0 h-full w-full border-0"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    src="https://www.openstreetmap.org/export/embed.html?bbox=37.615%2C55.752%2C37.635%2C55.762&layer=mapnik&marker=55.757%2C37.625"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
