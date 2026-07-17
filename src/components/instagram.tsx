"use client";

import Image from "next/image";
import { Instagram } from "lucide-react";
import { motion } from "framer-motion";

const PHOTOS = [
  "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1498804103079-a6351b050096?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=600&q=80",
];

export function InstagramGallery() {
  return (
    <section id="gallery" className="section bg-[var(--bg-elevated)]">
      <div className="container-site">
        <div className="mb-8 flex flex-col gap-4 sm:mb-10 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-coffee">
              Instagram
            </p>
            <h2 className="section-title mt-2">@coffeetime</h2>
            <p className="section-lead">Кадры из зала, обжарки и утренних смен.</p>
          </div>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary self-start"
          >
            <Instagram size={18} aria-hidden="true" />
            Подписаться
          </a>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4">
          {PHOTOS.map((src, i) => (
            <motion.a
              key={src}
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.04 }}
              className="group relative aspect-square overflow-hidden rounded-soft"
            >
              <Image
                src={src}
                alt={`Фото Coffee Time ${i + 1}`}
                fill
                sizes="(max-width: 640px) 50vw, 33vw"
                className="object-cover transition duration-500 group-hover:scale-105"
              />
              <span className="absolute inset-0 bg-ink/0 transition group-hover:bg-ink/25" />
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
