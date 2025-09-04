"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from 'next/link'
import { useTranslations } from 'next-intl';

export default function Contact() {
  const t = useTranslations('ContactPage');

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <Link href="/" className="text-blue-600 hover:text-blue-800 transition-colors">&larr; {t('backLink')}</Link>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 my-4">{t('title')}</h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">{t('subtitle')}</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-2xl text-center">{t('cardTitle')}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 text-gray-700 dark:text-gray-300">
            <p className="text-center">
              {t('introText')}
            </p>
            
            <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg text-center">
              <h3 className="text-xl font-semibold text-blue-800 dark:text-blue-200 mb-3">
                📧 {t('emailTitle')}
              </h3>
              <p className="mb-4">
                {t('emailDescription')}
              </p>
                             <a 
                 href="mailto:contato.arasfinder@gmail.com" 
                 className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
               >
                 contato.arasfinder@gmail.com
               </a>
            </div>

            <div className="grid md:grid-cols-2 gap-4 mt-6">
              <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg text-center">
                <h4 className="font-semibold text-green-800 dark:text-green-200 mb-2">💡 {t('suggestionsTitle')}</h4>
                <p className="text-sm">{t('suggestionsText')}</p>
              </div>
              <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg text-center">
                <h4 className="font-semibold text-purple-800 dark:text-purple-200 mb-2">🐛 {t('bugsTitle')}</h4>
                <p className="text-sm">{t('bugsText')}</p>
              </div>
              <div className="bg-orange-50 dark:bg-orange-900/20 p-4 rounded-lg text-center">
                <h4 className="font-semibold text-orange-800 dark:text-orange-200 mb-2">❓ {t('questionsTitle')}</h4>
                <p className="text-sm">{t('questionsText')}</p>
              </div>
              <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg text-center">
                <h4 className="font-semibold text-red-800 dark:text-red-200 mb-2">🔒 {t('privacyTitle')}</h4>
                <p className="text-sm">{t('privacyText')}</p>
              </div>
            </div>

            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
              <h4 className="font-semibold mb-2">⏱️ {t('responseTimeTitle')}</h4>
              <p className="text-sm">
                {t('responseText')}
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="text-center mt-8">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {t('footerText')}
          </p>
        </div>
      </div>
    </div>
  )
}