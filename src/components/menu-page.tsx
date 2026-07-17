"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

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
    featured: true,
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

export function MenuPage() {
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
            Короткий список — только то, что готовим каждый день. Зерно,
            молоко, честный вкус.
          </p>
          <div className="mt-5 h-px w-16 bg-amber/70" />
        </motion.div>

        <div className="grid gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
          {ITEMS.map((item, i) => (
            <motion.article
              key={item.name}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: Math.min(i * 0.04, 0.28), duration: 0.35 }}
              className={`site-panel group overflow-hidden ${
                item.featured ? "ring-1 ring-amber/40" : ""
              }`}
            >
              <div className="relative aspect-[5/4] overflow-hidden sm:aspect-[4/3]">
                <Image
                  src={item.img}
                  alt={item.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition duration-500 group-hover:scale-105"
                />
                {item.featured && (
                  <span className="absolute left-3 top-3 rounded-full bg-amber px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-ink">
                    Хит
                  </span>
                )}
              </div>
              <div className="flex items-start justify-between gap-3 p-4 sm:p-5">
                <div>
                  <h2 className="font-display text-xl font-semibold text-milk">
                    {item.name}
                  </h2>
                  <p className="mt-1 text-sm site-text-muted">{item.desc}</p>
                </div>
                <span className="shrink-0 rounded-full bg-amber/20 px-3 py-1 text-sm font-semibold text-amber">
                  {item.price}
                </span>
              </div>
            </motion.article>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-14 flex flex-col items-start justify-between gap-4 border-t border-white/10 pt-8 sm:flex-row sm:items-center"
        >
          <p className="font-display text-xl text-milk sm:text-2xl">
            Ждём вас в зале
          </p>
          <Link
            href="/contacts"
            className="text-sm font-semibold text-amber transition hover:text-gold"
          >
            Контакты →
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
