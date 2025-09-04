"use client"
import { useTranslations } from 'next-intl'

export function SupportBanner() {
  const t = useTranslations('SupportBanner')

  return (
    <div className="mx-auto max-w-4xl px-4">
      <div className="mt-10 mb-6 rounded-lg border border-yellow-200 bg-yellow-50 p-4 text-center dark:border-yellow-900 dark:bg-yellow-900/20">
        <p className="text-sm text-yellow-900 dark:text-yellow-200">
          {t('text')}
          {' '}
          <a
            href="https://buymeacoffee.com/dib10"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium underline hover:no-underline"
          >
            {t('cta')}
          </a>
        </p>
      </div>
    </div>
  )
}


