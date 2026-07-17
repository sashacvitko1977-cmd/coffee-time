"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { CoffeeBeans } from "./coffee-beans";
import { useVideoStory, MARKS } from "./video-story-context";

export function Hero() {
  const { seekTo, setPhase } = useVideoStory();

  useEffect(() => {
    seekTo(MARKS.start);
    setPhase(0);
  }, [seekTo, setPhase]);

  return (
    <section
      id="top"
      className="relative z-10 flex min-h-[100svh] flex-col justify-center pt-20 pb-12"
      aria-label="Главный экран"
    >
      <CoffeeBeans />
      <div className="container-site relative w-full max-w-2xl text-milk">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          <h1 className="font-display text-4xl font-semibold leading-[1.08] tracking-tight sm:text-6xl lg:text-7xl">
            Coffee Time
          </h1>
          <p className="mt-4 max-w-lg text-base text-milk/90 sm:text-xl sm:leading-relaxed">
            Время замедлиться. Свежая обжарка, тихий свет и чашка, которая
            остаётся с вами на весь день.
          </p>
          <a
            href="#menu"
            className="btn-primary mt-7 bg-amber text-ink hover:bg-gold"
          >
            Смотреть меню
          </a>
        </motion.div>
      </div>
    </section>
  );
}
