"use client"
import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { usePathname } from 'next/navigation'

export function Footer() {
  const t = useTranslations('Footer')
  const pathname = usePathname()
  const locale = pathname.split('/')[1] || 'pt-BR'

  return (
    <footer className="mt-8 text-center py-6 border-t border-gray-200 dark:border-gray-700">
      <nav className="flex justify-center gap-4 sm:gap-6 mb-4 flex-wrap">
        <Link href={`/${locale}`} className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200">{t('home')}</Link>
        <Link href={`/${locale}/como-funciona`} className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200">{t('howItWorks')}</Link>
        <Link href={`/${locale}/faq`} className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200">{t('faq')}</Link>
        <Link href={`/${locale}/sobre`} className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200">{t('about')}</Link>
        <Link href={`/${locale}/privacy`} className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200">{t('privacy')}</Link>
        <Link href={`/${locale}/contact`} className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200">{t('contact')}</Link>
        <a
          href="https://buymeacoffee.com/dib10"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200"
        >
          {t('buyCoffee')}
        </a>
      </nav>
    </footer>
  )
}


