"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Clock, MapPin, Phone } from "lucide-react";
import { useVideoStory, MARKS } from "./video-story-context";

export function Visit() {
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
      await playTo(MARKS.girl);
      setPhase(2);
      setRevealed(true);
    };

    if (reduce) {
      setRevealed(true);
      setPhase(2);
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
    if (phase >= 2) setRevealed(true);
  }, [phase]);

  return (
    <section
      ref={sectionRef}
      id="visit"
      className={`relative z-10 ${revealed ? "py-12 sm:py-16" : "h-[35svh]"}`}
    >
      {revealed ? (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="container-site grid gap-6 lg:grid-cols-2 lg:gap-10"
        >
          <div className="site-panel p-5 sm:p-7">
            <h2 className="section-title text-milk">Контакты</h2>
            <p className="section-lead site-text-muted">
              Москва, ул. Садовая, 14 — рядом с парком.
            </p>

            <ul className="mt-6 space-y-4">
              <li className="flex gap-3">
                <span className="mt-0.5 text-coffee">
                  <MapPin size={20} aria-hidden="true" />
                </span>
                <div>
                  <p className="font-medium text-milk">Москва, ул. Садовая, 14</p>
                </div>
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
            <div className="relative aspect-[4/3] w-full sm:min-h-[320px] sm:aspect-auto">
              <iframe
                title="Карта: Coffee Time"
                className="map-frame absolute inset-0 h-full w-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                src="https://www.openstreetmap.org/export/embed.html?bbox=37.615%2C55.752%2C37.635%2C55.762&layer=mapnik&marker=55.757%2C37.625"
              />
            </div>
          </div>
        </motion.div>
      ) : null}
    </section>
  );
}
