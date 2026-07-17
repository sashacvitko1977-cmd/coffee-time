"use client";

import { Star } from "lucide-react";
import { motion } from "framer-motion";

const REVIEWS = [
  {
    name: "Анна К.",
    text: "Лучший капучино в районе. Тихо, вкусно, персонал не суетится — именно то, что нужно утром.",
    rating: 5,
  },
  {
    name: "Игорь М.",
    text: "Заказываю фильтр онлайн перед работой — всегда готово вовремя. Зерно реально свежее.",
    rating: 5,
  },
  {
    name: "Мария С.",
    text: "Бронировали стол у окна на двоих. Уютно, без громкой музыки. Вернёмся с подругами.",
    rating: 5,
  },
];

export function Reviews() {
  return (
    <section id="reviews" className="section">
      <div className="container-site">
        <div className="mb-10 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-coffee">
            Отзывы
          </p>
          <h2 className="section-title mt-2">Гости о Coffee Time</h2>
        </div>
        <div className="grid gap-5 md:grid-cols-3">
          {REVIEWS.map((r, i) => (
            <motion.blockquote
              key={r.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="card flex flex-col p-6"
            >
              <div className="mb-4 flex gap-1 text-gold" aria-label={`Оценка ${r.rating} из 5`}>
                {Array.from({ length: r.rating }).map((_, j) => (
                  <Star key={j} size={16} fill="currentColor" aria-hidden="true" />
                ))}
              </div>
              <p className="flex-1 text-sm leading-relaxed text-[var(--fg-muted)]">
                «{r.text}»
              </p>
              <footer className="mt-5 text-sm font-semibold">{r.name}</footer>
            </motion.blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
