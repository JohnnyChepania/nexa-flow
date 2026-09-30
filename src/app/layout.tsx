import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  display: "swap"
});

const siteUrl = "https://nexa-flow.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "NEXA FLOW — AI-платформа для работы с контентом",
    template: "%s | NEXA FLOW"
  },
  description:
    "Единое пространство для работы с AI-контентом, файлами и автоматизацией задач. Загружайте материалы, настраивайте генерацию и получайте результаты.",
  applicationName: "NEXA FLOW",
  keywords: ["NEXA FLOW", "AI платформа", "генерация контента", "AI workspace"],
  authors: [{ name: "NEXA FLOW" }],
  alternates: {
    canonical: "/"
  },
  robots: {
    index: true,
    follow: true
  },
  openGraph: {
    type: "website",
    locale: "ru_RU",
    url: siteUrl,
    siteName: "NEXA FLOW",
    title: "NEXA FLOW — AI-платформа для работы с контентом",
    description:
      "Единое пространство для работы с AI-контентом, файлами и автоматизацией задач.",
    images: [
      {
        url: "/og.svg",
        width: 1200,
        height: 630,
        alt: "NEXA FLOW"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "NEXA FLOW — AI-платформа для работы с контентом",
    description:
      "Единое пространство для работы с AI-контентом, файлами и автоматизацией задач.",
    images: ["/og.svg"]
  },
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
    apple: [{ url: "/favicon.svg" }]
  }
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#08090c"
};

export default function RootLayout({
  children
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ru" className={inter.className}>
      <body className="min-h-screen overflow-x-hidden bg-graphite-950 text-white antialiased">
        {children}
      </body>
    </html>
  );
}
