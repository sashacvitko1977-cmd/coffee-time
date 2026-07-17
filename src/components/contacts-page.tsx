"use client";

import { motion } from "framer-motion";
import { Clock, MapPin, Phone } from "lucide-react";
import Link from "next/link";

export function ContactsPage() {
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
            Контакты
          </h1>
          <p className="mt-3 max-w-lg text-base site-text-muted sm:text-lg">
            Приходите — тихое место, свежий кофе и окна во двор.
          </p>
          <div className="mt-5 h-px w-16 bg-amber/70" />
        </motion.div>

        <div className="grid gap-5 lg:grid-cols-2 lg:gap-8">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08, duration: 0.4 }}
            className="site-panel flex flex-col justify-between p-6 sm:p-8"
          >
            <ul className="space-y-6">
              <li className="flex gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-amber/15 text-amber">
                  <MapPin size={20} aria-hidden="true" />
                </span>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] site-text-muted">
                    Адрес
                  </p>
                  <p className="mt-1 font-display text-xl font-semibold text-milk">
                    Москва, ул. Садовая, 14
                  </p>
                </div>
              </li>
              <li className="flex gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-amber/15 text-amber">
                  <Clock size={20} aria-hidden="true" />
                </span>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] site-text-muted">
                    Часы
                  </p>
                  <p className="mt-1 font-medium text-milk">Пн–Пт 08:00–21:00</p>
                  <p className="font-medium text-milk">Сб–Вс 09:00–22:00</p>
                </div>
              </li>
              <li className="flex gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-amber/15 text-amber">
                  <Phone size={20} aria-hidden="true" />
                </span>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] site-text-muted">
                    Телефон
                  </p>
                  <a
                    href="tel:+74951234567"
                    className="mt-1 inline-block font-display text-xl font-semibold text-milk transition hover:text-amber"
                  >
                    +7 (495) 123-45-67
                  </a>
                </div>
              </li>
            </ul>

            <div className="mt-10 border-t border-white/10 pt-6">
              <p className="font-display text-2xl text-milk">Ждём вас!</p>
              <Link
                href="/menu"
                className="mt-3 inline-block text-sm font-semibold text-amber transition hover:text-gold"
              >
                Смотреть меню →
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.14, duration: 0.4 }}
            className="site-panel overflow-hidden"
          >
            <div className="relative aspect-[4/3] w-full sm:min-h-[380px] sm:aspect-auto">
              <iframe
                title="Карта: Coffee Time"
                className="map-frame absolute inset-0 h-full w-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                src="https://www.openstreetmap.org/export/embed.html?bbox=37.615%2C55.752%2C37.635%2C55.762&layer=mapnik&marker=55.757%2C37.625"
              />
            </div>
            <div className="border-t border-white/10 px-5 py-3 text-center">
              <a
                href="https://www.openstreetmap.org/?mlat=55.757&mlon=37.625#map=16/55.757/37.625"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-semibold text-coffee transition hover:text-amber"
              >
                Открыть карту
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
