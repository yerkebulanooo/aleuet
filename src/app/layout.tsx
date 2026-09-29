import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MobileNav } from "@/components/layout/MobileNav";

export const metadata: Metadata = {
  title: "Aleuet — учись применять знания",
  description:
    "Образовательная медиаплатформа для старшеклассников и молодых людей: исследования, карьера, личные финансы и критическое мышление.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <body className="min-h-screen bg-[#f7f7f2] text-[#171914] antialiased flex flex-col justify-between">
        <div>
          <Header />
          <main className="pb-16 md:pb-0">{children}</main>
        </div>
        <Footer />
        <MobileNav />
      </body>
    </html>
  );
}

