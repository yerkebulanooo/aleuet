import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/providers/theme-provider";
import { LanguageProvider } from "@/providers/language-provider";
import { Header } from "@/components/layout/Header";
import { MvpBanner } from "@/components/layout/MvpBanner";
import { Footer } from "@/components/layout/Footer";
import { MobileNav } from "@/components/layout/MobileNav";
import { AuthProvider } from "@/providers/auth-provider";

export const metadata: Metadata = {
  title: "Aleuet — қазақ тіліндегі білім беру медиаплатформасы",
  description:
    "Aleuet сарапшылардың білімін авторлық бейнематериалдарға, практикалық тапсырмаларға және интерактивті оқу маршруттарына айналдырады.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="kk" suppressHydrationWarning>
      <body className="min-h-screen bg-[#f7f7f2] dark:bg-[#11130f] text-[#171914] dark:text-[#f2f4ec] antialiased flex flex-col justify-between transition-colors">
        <ThemeProvider>
          <LanguageProvider>
            <AuthProvider>
              <div>
                <MvpBanner />
                <Header />
                <main className="pb-16 md:pb-0">{children}</main>
              </div>
              <Footer />
              <MobileNav />
            </AuthProvider>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

