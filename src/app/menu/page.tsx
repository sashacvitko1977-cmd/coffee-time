import type { Metadata } from "next";
import { PageShell } from "@/components/page-shell";
import { MenuPage } from "@/components/menu-page";

export const metadata: Metadata = {
  title: "Меню",
  description: "Меню кофейни Coffee Time — напитки и выпечка.",
};

export default function Page() {
  return (
    <PageShell image="/media/menu-2.jpg">
      <MenuPage />
    </PageShell>
  );
}
