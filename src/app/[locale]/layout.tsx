import { NextIntlClientProvider, hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { Fira_Code } from "next/font/google";
import "../globals.css";
import Header from "@/components/layout/Header";
import { ThemeProvider } from "@/providers/ThemeProvider";
import Footer from "@/components/layout/Footer";
import MobileHeader from "@/components/layout/MobileHeader";

const fira = Fira_Code({ subsets: ["latin"], weight: ["300"] });

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  // Ensure that the incoming `locale` is valid
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  return (
    <html
      lang={locale}
      dir={locale === "fa" || locale === "ar" ? "rtl" : "ltr"}
    >
      <body>
        <NextIntlClientProvider>
          <ThemeProvider>
            <main className="w-screen h-screen flex items-center justify-center bg-muted p-4 lg:p-0 overflow-hidden">
              <section
                className="w-full max-w-7xl h-full md:h-[95%] mx-auto 
               bg-gradient-to-r from-background to-background/80 text-foreground
               border-border rounded-sm  flex items-center justify-center "
              >
                <div
                  className={`flex justify-between w-full h-full flex-col bg-transparent relative ${fira.className}`}
                >
                  <Header />
                  <MobileHeader />
                  {children}
                  <Footer />
                </div>
              </section>
            </main>
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
