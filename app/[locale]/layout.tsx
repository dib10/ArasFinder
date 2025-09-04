import type React from "react"
import { Inter } from "next/font/google"
import Script from "next/script"
import "../globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import { Footer } from "@/components/domain/Footer"
import { SupportBanner } from "@/components/domain/SupportBanner"
import {NextIntlClientProvider} from 'next-intl';
import {getMessages, getTranslations} from 'next-intl/server';
import {notFound} from 'next/navigation';
import type { Metadata } from "next"

const inter = Inter({ subsets: ["latin"] })
const locales = ['pt-BR', 'en'];

// Função para gerar metadados dinâmicos
export async function generateMetadata({params}: {params: Promise<{locale: string}>}): Promise<Metadata> {
  const {locale} = await params; // Aguarda os params (next 15)
  const t = await getTranslations({locale, namespace: 'Metadata'});
 
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
  params: Promise<{locale: string}>; // Mudança: agora é uma Promise
}) {
  const {locale} = await params; // Mudança: aguarda os params
  
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
        <meta name="monetag" content="c3b61d48dce7ac6b62e94cf9ed7cf13d" />
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
          <NextIntlClientProvider messages={messages}>
            <main>{children}</main>
            <SupportBanner />
            <Footer />
            <Toaster />
          </NextIntlClientProvider>
        </ThemeProvider>
        <Script id="monetag-new-zone-script" strategy="afterInteractive">
          {`
            (function(d,z,s,c){s.src='//'+d+'/400/'+z;s.onerror=s.onload=E;function E(){c&&c();c=null}try{(document.body||document.documentElement).appendChild(s)}catch(e){E()}})('stoampaliy.net',9799324,document.createElement('script'),window._thcsctcg)
          `}
        </Script>

        {/* Script Vemtoutcheeg */}
        <Script id="vemtoutcheeg-script" strategy="afterInteractive">
          {`
            (s=>{s.dataset.zone=9799550,s.src='https://vemtoutcheeg.com/tag.min.js'})([document.documentElement, document.body].filter(Boolean).pop().appendChild(document.createElement('script')))
          `}
        </Script>
      </body>
    </html>
  );
}