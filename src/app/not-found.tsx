import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-graphite-950 px-6 text-center">
      <p className="text-xs tracking-[0.18em] text-aura-200">404</p>
      <h1 className="mt-4 text-3xl font-semibold sm:text-4xl">Страница не найдена</h1>
      <p className="mt-3 max-w-md text-sm text-muted sm:text-base">
        Возможно, ссылка устарела или результат был удалён.
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex h-11 items-center rounded-full bg-aura-500 px-6 text-sm font-medium text-white transition hover:bg-aura-400"
      >
        На главную
      </Link>
    </main>
  );
}
