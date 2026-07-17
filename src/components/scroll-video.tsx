"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { CoffeeBeans } from "./coffee-beans";

const SEGMENTS = [
  {
    id: "top",
    eyebrow: "Кофейня · с 08:00",
    title: "Coffee Time",
    text: "Время замедлиться. Свежая обжарка, тихий свет и чашка, которая остаётся с вами на весь день.",
    cta: { href: "#menu", label: "Посмотреть меню" },
  },
  {
    id: "craft",
    eyebrow: "Ремесло",
    title: "Готовим для вас",
    text: "Бариста наливает молоко, собирает напиток — каждый шаг спокойный и точный.",
    cta: { href: "#menu", label: "Смотреть меню" },
  },
  {
    id: "moment",
    eyebrow: "Момент",
    title: "Первый глоток",
    text: "Выйдите из спешки. Сад, скамейка и чашка — это и есть Coffee Time.",
    cta: { href: "#visit", label: "Как добраться" },
  },
] as const;

/**
 * Three full-viewport story panels over the global video background.
 * Video itself lives in VideoBackground (fixed for the whole site).
 */
export function ScrollVideo() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const els = SEGMENTS.map((s) => document.getElementById(s.id)).filter(
      Boolean
    ) as HTMLElement[];

    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (!visible?.target) return;
        const idx = SEGMENTS.findIndex((s) => s.id === visible.target.id);
        if (idx >= 0) setActive(idx);
      },
      { threshold: [0.35, 0.55, 0.7], rootMargin: "-10% 0px -10% 0px" }
    );

    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <div className="relative z-10" aria-label="История Coffee Time">
      <CoffeeBeans />
      {SEGMENTS.map((seg, i) => (
        <section
          key={seg.id}
          id={seg.id}
          className="relative flex min-h-[100svh] items-end pb-16 pt-24 sm:items-center sm:pb-20 sm:pt-12"
        >
          <div className="container-site w-full">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.45 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="max-w-2xl text-milk"
            >
              <p className="mb-4 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-coffee sm:text-sm">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-amber" />
                {seg.eyebrow}
              </p>
              {i === 0 ? (
                <h1 className="font-display text-4xl font-semibold leading-[1.08] tracking-tight sm:text-6xl lg:text-7xl">
                  {seg.title}
                </h1>
              ) : (
                <h2 className="font-display text-3xl font-semibold leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl">
                  {seg.title}
                </h2>
              )}
              <p className="mt-5 max-w-lg text-base text-milk/90 sm:text-xl sm:leading-relaxed">
                {seg.text}
              </p>
              <div className="mt-8">
                <a
                  href={seg.cta.href}
                  className="btn-primary bg-amber text-ink hover:bg-gold"
                >
                  {seg.cta.label}
                  <ArrowRight size={18} aria-hidden="true" />
                </a>
              </div>
            </motion.div>
          </div>
        </section>
      ))}

      {/* Floating chapter dots */}
      <div
        className="pointer-events-none fixed bottom-6 left-1/2 z-30 flex -translate-x-1/2 gap-2 sm:bottom-8"
        aria-hidden="true"
      >
        {SEGMENTS.map((seg, i) => (
          <span
            key={seg.id}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              active === i ? "w-8 bg-amber" : "w-1.5 bg-white/40"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
