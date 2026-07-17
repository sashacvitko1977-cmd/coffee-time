import type { Metadata, Viewport } from "next";
import { Manrope, Playfair_Display } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin", "cyrillic"],
  variable: "--font-playfair",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin", "cyrillic"],
  variable: "--font-manrope",
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Coffee Time — кофейня",
    template: "%s · Coffee Time",
  },
  description:
    "Coffee Time — уютная кофейня. Свежая обжарка, онлайн-заказ, бронь столиков, подарочные сертификаты и программа лояльности.",
  keywords: [
    "кофейня",
    "Coffee Time",
    "кофе",
    "капучино",
    "онлайн заказ кофе",
    "бронь столика",
    "Москва",
  ],
  authors: [{ name: "Coffee Time" }],
  creator: "Coffee Time",
  openGraph: {
    type: "website",
    locale: "ru_RU",
    url: siteUrl,
    siteName: "Coffee Time",
    title: "Coffee Time — кофейня",
    description:
      "Время замедлиться. Свежая обжарка, тихий зал, онлайн-заказ и бронь столиков.",
    images: [
      {
        url: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1200&q=80",
        width: 1200,
        height: 630,
        alt: "Coffee Time — чашка кофе",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Coffee Time — кофейня",
    description: "Уютный минимализм, свежий кофе, онлайн-заказ.",
    images: [
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1200&q=80",
    ],
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: siteUrl,
  },
  icons: {
    icon: "/favicon.svg",
    apple: "/favicon.svg",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F5F1EB" },
    { media: "(prefers-color-scheme: dark)", color: "#1E1E1E" },
  ],
  width: "device-width",
  initialScale: 1,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "CafeOrCoffeeShop",
  name: "Coffee Time",
  description:
    "Уютная кофейня: свежая обжарка, онлайн-заказ, бронирование столиков.",
  url: siteUrl,
  telephone: "+7-495-123-45-67",
  servesCuisine: "Coffee",
  priceRange: "₽₽",
  address: {
    "@type": "PostalAddress",
    streetAddress: "ул. Садовая, 14",
    addressLocality: "Москва",
    addressCountry: "RU",
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "08:00",
      closes: "21:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Saturday", "Sunday"],
      opens: "09:00",
      closes: "22:00",
    },
  ],
  acceptsReservations: true,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <body className={`${playfair.variable} ${manrope.variable} font-body antialiased`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
