# Coffee Time — лендинг кофейни

Минималистичный сайт кофейни на **Next.js + Tailwind + Framer Motion**.

## Запуск

```bash
cd E:\coffee-time
npm install
npm run dev
```

Откройте [http://localhost:3000](http://localhost:3000).

## Стек

- Next.js 15 (App Router)
- React 19
- Tailwind CSS
- Framer Motion
- Lucide Icons
- React Hook Form
- Google Fonts: Playfair Display + Manrope
- Карта: OpenStreetMap embed

## Палитра

| Токен | Hex |
|-------|-----|
| Тёмный | `#1E1E1E` |
| Молочный | `#F5F1EB` |
| Кофейный | `#C49A6C` |
| Bean | `#8B5E3C` |
| Акцент | `#E8954A` / `#D4A017` |

## Секции

Hero (видео + фото), меню, онлайн-заказ, бронь, сертификаты/лояльность, Instagram, отзывы, карта, светлая/тёмная тема.

## SEO

- `metadata` + Open Graph + Twitter cards
- JSON-LD `CafeOrCoffeeShop`
- `robots.ts` / `sitemap.ts`
- favicon SVG
- images: AVIF/WebP через `next/image`

## Production

```bash
npm run build
npm start
```

Задайте `NEXT_PUBLIC_SITE_URL=https://your-domain.com` для канонических URL.
