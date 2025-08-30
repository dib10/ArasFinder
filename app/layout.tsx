import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import Script from "next/script"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import { Footer } from "@/components/domain/Footer"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Aras Finder - Buscador Inteligente de Vagas",
  description:
    "O buscador inteligente de vagas que constrói URLs precisas no LinkedIn e Indeed usando operadores booleanos e filtros avançados.",
  icons: {
    icon: "/gizmo-3d.png",
    shortcut: "/gizmo-3d.png",
    apple: "/gizmo-3d.png",
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
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
          <main>{children}</main>
          <Footer />
          <Toaster />
        </ThemeProvider>
        <Script id="monetag-new-zone-script" strategy="afterInteractive">
          {`
            (function(d,z,s,c){s.src='//'+d+'/400/'+z;s.onerror=s.onload=E;function E(){c&&c();c=null}try{(document.body||document.documentElement).appendChild(s)}catch(e){E()}})('stoampaliy.net',9799324,document.createElement('script'),window._thcsctcg)
          `}
        </Script>

        {/* Script Couphaithuph */}
        <Script
          src="https://couphaithuph.net/act/files/tag.min.js?z=9799413"
          data-cfasync="false"
          async
          strategy="afterInteractive"
        />
      </body>
    </html>
  )
}