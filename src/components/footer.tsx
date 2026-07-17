import Link from "next/link";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative z-10 border-t border-white/10 py-6">
      <div className="container-site flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-display text-xl font-semibold text-milk">
            Coffee <span className="text-coffee">Time</span>
          </p>
          <p className="mt-1 text-sm site-text-muted">
            © {year} Кофейня Coffee Time.
          </p>
        </div>
        <nav
          className="flex flex-wrap gap-x-5 gap-y-2 text-sm font-medium site-text-muted"
          aria-label="Подвал"
        >
          <Link href="/" className="hover:text-milk">
            Главная
          </Link>
          <Link href="/menu" className="hover:text-milk">
            Меню
          </Link>
          <Link href="/contacts" className="hover:text-milk">
            Контакты
          </Link>
        </nav>
      </div>
    </footer>
  );
}
