import type React from "react"
import { Inter } from "next/font/google"
import Script from "next/script"
import "../globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import { Footer } from "@/components/domain/Footer"
import { SupportBanner } from "@/components/domain/SupportBanner"
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import type { Metadata } from "next"

const inter = Inter({ subsets: ["latin"] })
const locales = ['pt-BR', 'en'];

// Função para gerar metadados dinâmicos
export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params; // Aguarda os params (next 15)
  const t = await getTranslations({ locale, namespace: 'Metadata' });

  return {
    title: t('title'),
    description: t('description'),
    icons: {
      icon: "/gizmo-3d.png",
      shortcut: "/gizmo-3d.png",
      apple: "/gizmo-3d.png",
    },
  };
}

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>; // Mudança: agora é uma Promise
}) {
  const { locale } = await params; // Mudança: aguarda os params

  if (!locales.includes(locale as any)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning translate="no">
      <head>
        <meta name="google" content="notranslate" />
        <meta name="google-translate" content="notranslate" />
        <meta httpEquiv="Content-Language" content={locale} />
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-5J9T27K1SZ"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-5J9T27K1SZ');
          `}
        </Script>
      </head>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <div className="fixed inset-0 -z-10 overflow-hidden">
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob dark:bg-blue-900/30"></div>
            <div className="absolute top-0 right-1/4 w-96 h-96 bg-cyan-300 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000 dark:bg-cyan-900/30"></div>
            <div className="absolute -bottom-8 left-1/3 w-96 h-96 bg-indigo-300 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000 dark:bg-indigo-900/30"></div>
          </div>
          <NextIntlClientProvider messages={messages}>
            <main className="relative z-10">{children}</main>
            <SupportBanner />
            <Footer />
            <Toaster />
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}