"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Coffee } from "lucide-react";
import Link from "next/link";
import { CoffeeBeans } from "./coffee-beans";
import {
  useVideoStory,
  MARKS,
  segmentReveal,
} from "./video-story-context";

type Stage = 0 | 1 | 2;

/**
 * Один экран. Колесо → видео само до кадра.
 * UI плавно проявляется к концу отрезка.
 */
export function MainStory() {
  const { playTo, seekTo, playing, reduce, currentTime } = useVideoStory();
  const [stage, setStage] = useState<Stage>(0);
  const stageRef = useRef<Stage>(0);
  const locked = useRef(false);
  const wheelAcc = useRef(0);
  const touchY = useRef<number | null>(null);

  // Reveal opacity for stage overlays (driven by video time)
  const coffeeReveal = segmentReveal(
    currentTime,
    MARKS.start,
    MARKS.milk,
    0.58
  );
  const waitReveal = segmentReveal(currentTime, MARKS.milk, MARKS.girl, 0.55);

  // When frozen on end of segment, force full reveal
  const showCoffee =
    stage === 1 && (reduce ? true : coffeeReveal > 0.02 || currentTime >= MARKS.milk - 0.05);
  const coffeeOpacity = reduce
    ? stage === 1
      ? 1
      : 0
    : stage === 1
      ? currentTime >= MARKS.milk - 0.05
        ? 1
        : coffeeReveal
      : 0;

  const showWait =
    stage === 2 && (reduce ? true : waitReveal > 0.02 || currentTime >= MARKS.girl - 0.05);
  const waitOpacity = reduce
    ? stage === 2
      ? 1
      : 0
    : stage === 2
      ? currentTime >= MARKS.girl - 0.05
        ? 1
        : waitReveal
      : 0;

  const goTo = useCallback(
    async (next: Stage) => {
      if (locked.current) return;
      if (next === stageRef.current) return;
      if (next < 0 || next > 2) return;

      const prev = stageRef.current;
      locked.current = true;
      stageRef.current = next;
      setStage(next);

      try {
        if (reduce) {
          seekTo(next === 0 ? MARKS.start : next === 1 ? MARKS.milk : MARKS.girl);
        } else if (next === 0) {
          seekTo(MARKS.start);
        } else if (next === 1) {
          // Replay first segment from plan1 when coming back or from start
          if (prev === 0 || prev === 2) {
            seekTo(MARKS.start);
          }
          await playTo(MARKS.milk);
        } else {
          // Second segment: from milk stop → girl
          if (prev < 1) {
            seekTo(MARKS.milk);
          }
          await playTo(MARKS.girl);
        }
      } finally {
        locked.current = false;
        wheelAcc.current = 0;
      }
    },
    [playTo, seekTo, reduce]
  );

  useEffect(() => {
    seekTo(MARKS.start);
    stageRef.current = 0;
    setStage(0);
  }, [seekTo]);

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  useEffect(() => {
    const THRESHOLD = 28;

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (locked.current || playing) return;

      wheelAcc.current += e.deltaY;

      if (wheelAcc.current >= THRESHOLD) {
        wheelAcc.current = 0;
        const cur = stageRef.current;
        if (cur < 2) void goTo((cur + 1) as Stage);
      } else if (wheelAcc.current <= -THRESHOLD) {
        wheelAcc.current = 0;
        const cur = stageRef.current;
        if (cur > 0) void goTo((cur - 1) as Stage);
      }
    };

    const onTouchStart = (e: TouchEvent) => {
      touchY.current = e.touches[0]?.clientY ?? null;
    };

    const onTouchEnd = (e: TouchEvent) => {
      if (touchY.current == null || locked.current || playing) return;
      const y = e.changedTouches[0]?.clientY;
      if (y == null) return;
      const dy = touchY.current - y;
      touchY.current = null;
      if (Math.abs(dy) < 24) return;
      const cur = stageRef.current;
      if (dy > 0 && cur < 2) void goTo((cur + 1) as Stage);
      if (dy < 0 && cur > 0) void goTo((cur - 1) as Stage);
    };

    const onKey = (e: KeyboardEvent) => {
      if (locked.current || playing) return;
      const cur = stageRef.current;
      if (["ArrowDown", "PageDown", " ", "Enter"].includes(e.key)) {
        e.preventDefault();
        if (cur < 2) void goTo((cur + 1) as Stage);
      }
      if (["ArrowUp", "PageUp"].includes(e.key)) {
        e.preventDefault();
        if (cur > 0) void goTo((cur - 1) as Stage);
      }
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchend", onTouchEnd, { passive: true });
    window.addEventListener("keydown", onKey);

    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchend", onTouchEnd);
      window.removeEventListener("keydown", onKey);
    };
  }, [goTo, playing]);

  return (
    <div className="relative h-[100svh] w-full overflow-hidden">
      <CoffeeBeans />

      {/* Soft left vignette so text on left stays readable */}
      <div
        className="pointer-events-none absolute inset-y-0 left-0 z-[5] w-[min(52%,28rem)] bg-gradient-to-r from-ink/55 via-ink/25 to-transparent"
        aria-hidden="true"
      />

      {/* —— Stage 0: hero —— */}
      <div className="container-site relative z-10 flex h-full flex-col justify-center pt-16 pb-10">
        <AnimatePresence mode="wait">
          {stage === 0 && (
            <motion.div
              key="s0"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35 }}
              className="max-w-2xl text-milk"
            >
              <h1 className="font-display text-4xl font-semibold leading-[1.08] tracking-tight sm:text-6xl lg:text-7xl">
                Coffee Time
              </h1>
              <p className="mt-4 max-w-lg text-base text-milk/90 sm:text-xl">
                Время замедлиться. Свежая обжарка и чашка, которая остаётся с
                вами на весь день.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* —— Stage 1: coffee card LEFT + arrow to cup —— */}
      {stage === 1 && (
        <div
          className="pointer-events-none absolute inset-0 z-20"
          aria-hidden={!showCoffee}
        >
          {/* Desktop: horizontal line from card toward the cup */}
          <div
            className="absolute top-1/2 hidden h-px origin-left bg-amber shadow-[0_0_6px_rgba(232,149,74,0.5)] sm:block"
            aria-hidden="true"
            style={{
              opacity: coffeeOpacity,
              left: "min(22rem, 42%)",
              width: "min(18vw, 7rem)",
              transform: "translateY(-50%)",
            }}
          />

          {/* Info — lower on phone; PC stays mid */}
          <div
            className="pointer-events-auto absolute left-0 top-[70%] w-full max-w-[min(100%,22rem)] px-4 sm:left-6 sm:top-1/2 sm:px-0 md:left-10 lg:left-14"
            style={{
              opacity: coffeeOpacity,
              transform: `translateY(-50%) translateY(${(1 - coffeeOpacity) * 18}px)`,
              transition: "opacity 0.05s linear, transform 0.05s linear",
            }}
          >
            {/*
              Mobile: thin line UP to the cup (cup sits above the card in the video).
              No arrowhead — same idea as desktop: a line that points at the drink.
            */}
            <div
              className="absolute bottom-full left-1/2 mb-1 flex -translate-x-1/2 flex-col items-center sm:hidden"
              aria-hidden="true"
            >
              <div className="h-11 w-px bg-gradient-to-b from-amber/15 via-amber to-amber shadow-[0_0_6px_rgba(232,149,74,0.5)]" />
            </div>

            <div className="site-panel relative p-5 sm:p-7">
              <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-amber/20 px-3 py-1 text-xs font-bold uppercase tracking-wider text-amber">
                <Coffee size={14} aria-hidden="true" />
                Напиток дня
              </div>
              <h2 className="font-display text-2xl font-semibold text-milk sm:text-3xl">
                Капучино
              </h2>
              <p className="mt-2 text-sm leading-relaxed site-text-muted sm:text-[0.95rem]">
                Двойной эспрессо и бархатная молочная пенка. Мягкий баланс и
                тёплый вкус.
              </p>
              <p className="mt-4 font-display text-xl font-semibold text-amber sm:text-2xl">
                280 ₽
              </p>
            </div>
          </div>
        </div>
      )}

      {/* —— Stage 2: «Ждём вас!» — fade at end of second segment —— */}
      {stage === 2 && (
        <div
          className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center px-4"
          aria-hidden={!showWait}
        >
          <div
            className="pointer-events-auto text-center"
            style={{
              opacity: waitOpacity,
              transform: `translateY(${(1 - waitOpacity) * 22}px) scale(${0.96 + waitOpacity * 0.04})`,
              transition: "opacity 0.05s linear, transform 0.05s linear",
            }}
          >
            <p className="font-display text-5xl font-semibold leading-[1.05] tracking-tight text-milk sm:text-7xl md:text-8xl lg:text-[7.25rem]">
              Ждём вас!
            </p>
            <div
              className="mt-8 flex flex-wrap items-center justify-center gap-6"
              style={{ opacity: Math.max(0, (waitOpacity - 0.35) / 0.65) }}
            >
              <Link
                href="/menu"
                className="text-sm font-semibold tracking-wide text-amber transition hover:text-gold"
              >
                Меню
              </Link>
              <Link
                href="/contacts"
                className="text-sm font-semibold tracking-wide text-milk/80 transition hover:text-milk"
              >
                Контакты
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Dots */}
      <div
        className="pointer-events-none absolute bottom-6 left-1/2 z-30 flex -translate-x-1/2 gap-2"
        aria-hidden="true"
      >
        {([0, 1, 2] as Stage[]).map((i) => (
          <span
            key={i}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              stage === i ? "w-7 bg-amber" : "w-1.5 bg-white/35"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
