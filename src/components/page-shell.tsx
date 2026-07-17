"use client";

import Image from "next/image";
import { Header } from "./header";
import { Footer } from "./footer";

type Props = {
  children: React.ReactNode;
  /** Optional decorative image path under /public */
  image?: string;
};

/**
 * Shared layout for /menu and /contacts — same atmosphere as the brand.
 */
export function PageShell({
  children,
  image = "/media/cof.jpg",
}: Props) {
  return (
    <div className="relative min-h-screen overflow-x-hidden">
      {/* Background photo + wash */}
      <div className="pointer-events-none fixed inset-0 z-0" aria-hidden="true">
        <Image
          src={image}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-ink/72" />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/50 via-ink/55 to-ink/80" />
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 20%, #C49A6C 0%, transparent 40%), radial-gradient(circle at 80% 70%, #E8954A 0%, transparent 35%)",
          }}
        />
      </div>

      <div className="relative z-10 flex min-h-screen flex-col">
        <Header />
        <main className="flex-1 pt-20 sm:pt-24">{children}</main>
        <Footer />
      </div>
    </div>
  );
}
