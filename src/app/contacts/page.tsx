import type { Metadata } from "next";
import { PageShell } from "@/components/page-shell";
import { ContactsPage } from "@/components/contacts-page";

export const metadata: Metadata = {
  title: "Контакты",
  description: "Адрес, часы работы и карта Coffee Time.",
};

export default function Page() {
  return (
    <PageShell image="/media/plan3.jpg">
      <ContactsPage />
    </PageShell>
  );
}
