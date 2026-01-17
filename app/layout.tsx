import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Aparatos Sanitarios Descatalogados - Catálogo Premium",
  description: "Encuentra aparatos sanitarios descatalogados de Roca, Gala, Bellavista y más. Calidad garantizada y envío rápido.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={`${outfit.variable}`}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
