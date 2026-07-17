"use client";

import { motion } from "framer-motion";
import { Clock, MapPin, Phone } from "lucide-react";
import Link from "next/link";

const MESSENGERS = [
  {
    id: "vk",
    name: "ВКонтакте",
    handle: "vk.com/coffeetime",
    href: "https://vk.com/coffeetime",
    label: "Написать в VK",
    color: "hover:bg-[#0077FF]/20 hover:text-[#4C9AFF]",
    icon: (
      <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
        <path d="M12.78 16.5h1.3s.39-.04.59-.26c.18-.2.18-.58.18-.58s-.03-1.77.8-2.03c.81-.25 1.85 1.71 2.95 2.47.83.57 1.46.45 1.46.45l2.94-.04s1.54-.1.81-1.3c-.06-.1-.42-.88-2.16-2.49-1.82-1.68-1.58-1.41.62-4.32.1-.17 1.76-3.27 1.76-3.27.12-.23 0-.4-.3-.4h-3.05s-.23.01-.4.1c-.17.09-.27.29-.27.29s-.49 1.3-1.14 2.41c-1.37 2.36-1.92 2.48-2.14 2.34-.52-.33-.39-1.32-.39-2.02 0-2.2.33-3.11-.65-3.35-.32-.08-.56-.13-1.39-.14-1.06-.01-1.96 0-2.47.25-.34.17-.6.54-.44.56.2.03.65.12.89.45.31.42.3 1.36.3 1.36s.18 2.55-.42 2.87c-.41.22-.98-.23-2.19-2.28-.62-1.05-1.09-2.21-1.09-2.21s-.09-.22-.25-.34c-.19-.14-.46-.19-.46-.19H3.9s-.45.01-.61.21c-.15.18-.01.55-.01.55s2.3 5.38 4.91 8.09c2.39 2.48 5.11 2.32 5.11 2.32z" />
      </svg>
    ),
  },
  {
    id: "tg",
    name: "Telegram",
    handle: "@coffeetime",
    href: "https://t.me/coffeetime",
    label: "Написать в Telegram",
    color: "hover:bg-[#2AABEE]/20 hover:text-[#6BC9F5]",
    icon: (
      <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
        <path d="M21.5 3.5 2.8 10.7c-1.3.5-1.3 1.2-.2 1.5l4.8 1.5 1.8 5.6c.2.7.4.9 1 .9.7 0 .9-.3 1.3-.7l3-2.9 4.9 3.6c.9.5 1.5.2 1.7-.8l3.1-14.6c.3-1.3-.5-1.9-1.5-1.5zM9.5 14.8l-.3 3.5c.4 0 .6-.2.8-.4l1.9-1.8-2.4-1.3zm8.9 2.2-5.5-3.6 6.9-6.7c.3-.3 0-.5-.3-.2l-8.4 7.4-3.4-1.1 13.1-5.1c.6-.2 1.1.2.8.8l-3.2 8.5z" />
      </svg>
    ),
  },
  {
    id: "wa",
    name: "WhatsApp",
    handle: "+7 (495) 123-45-67",
    href: "https://wa.me/74951234567",
    label: "Написать в WhatsApp",
    color: "hover:bg-[#25D366]/20 hover:text-[#5EE08A]",
    icon: (
      <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
        <path d="M12 2C6.5 2 2 6.3 2 11.6c0 1.9.5 3.6 1.5 5.2L2 22l5.4-1.4c1.5.8 3.2 1.2 4.9 1.2 5.5 0 10-4.3 10-9.6S17.5 2 12 2zm0 17.5c-1.5 0-3-.4-4.3-1.1l-.3-.2-3.2.8.9-3.1-.2-.3c-.8-1.3-1.2-2.8-1.2-4.3 0-4.5 3.7-8.1 8.3-8.1s8.3 3.6 8.3 8.1-3.7 8.2-8.3 8.2zm4.5-6c-.2-.1-1.4-.7-1.6-.8-.2-.1-.4-.1-.5.1-.2.2-.6.8-.7.9-.1.2-.3.2-.5.1-.2-.1-.9-.3-1.7-1.1-.6-.6-1.1-1.3-1.2-1.5-.1-.2 0-.4.1-.5.1-.1.2-.3.3-.4.1-.1.1-.2.2-.4 0-.1 0-.3-.1-.4-.1-.1-.5-1.3-.7-1.7-.2-.5-.4-.4-.5-.4h-.4c-.2 0-.4.1-.6.3-.2.2-.8.8-.8 1.9s.8 2.2.9 2.3c.1.2 1.6 2.5 3.9 3.4 2.3 1 2.3.6 2.7.6.4 0 1.3-.5 1.5-1 .2-.5.2-.9.1-1-.1-.1-.2-.2-.4-.3z" />
      </svg>
    ),
  },
] as const;

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
            Приходите — тихое место, свежий кофе и окна во двор. Или напишите
            нам в мессенджер.
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

            {/* Messengers */}
            <div className="mt-8 border-t border-white/10 pt-6">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] site-text-muted">
                Способы связи
              </p>
              <div className="mt-4 grid gap-3">
                {MESSENGERS.map((m) => (
                  <a
                    key={m.id}
                    href={m.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center gap-3 rounded-2xl border border-white/12 bg-white/5 px-4 py-3 text-milk transition ${m.color}`}
                  >
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/10">
                      {m.icon}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block font-display text-base font-semibold">
                        {m.name}
                      </span>
                      <span className="block truncate text-sm site-text-muted">
                        {m.handle}
                      </span>
                    </span>
                    <span className="hidden text-xs font-semibold sm:inline">
                      {m.label} →
                    </span>
                  </a>
                ))}
              </div>
            </div>

            <div className="mt-8 border-t border-white/10 pt-6">
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
