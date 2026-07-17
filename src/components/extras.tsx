"use client";

import { Gift, Heart, Star } from "lucide-react";
import { motion } from "framer-motion";

const CARDS = [
  {
    id: "gifts",
    icon: Gift,
    title: "Подарочные сертификаты",
    text: "На любую сумму или набор «кофе + десерт». Электронный или бумажный.",
    cta: "Купить сертификат",
    href: "#order",
  },
  {
    id: "loyalty",
    icon: Heart,
    title: "Программа лояльности",
    text: "Каждая 7-я чашка — в подарок. Баллы копятся в приложении и по номеру телефона.",
    cta: "Подробнее",
    href: "#loyalty",
  },
  {
    id: "quality",
    icon: Star,
    title: "Своя обжарка",
    text: "Малые партии, прозрачное зерно и профиль, который не прячем за сиропами.",
    cta: "Меню",
    href: "#menu",
  },
];

export function Extras() {
  return (
    <section className="section pt-0">
      <div className="container-site grid gap-5 md:grid-cols-3">
        {CARDS.map((card, i) => (
          <motion.article
            key={card.id}
            id={card.id === "loyalty" ? "loyalty" : undefined}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            className="card p-6"
          >
            <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-coffee/15 text-bean dark:text-coffee">
              <card.icon size={20} aria-hidden="true" />
            </span>
            <h3 className="mt-4 font-display text-xl font-semibold">{card.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-[var(--fg-muted)]">{card.text}</p>
            <a
              href={card.href}
              className="mt-5 inline-flex text-sm font-semibold text-bean underline-offset-4 transition hover:text-coffee hover:underline dark:text-coffee"
            >
              {card.cta}
            </a>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
