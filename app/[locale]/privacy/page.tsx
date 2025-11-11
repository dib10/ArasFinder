"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Link } from '@/i18n/routing'
import { useTranslations } from 'next-intl';

export default function Privacy() {
  const t = useTranslations('PrivacyPage');
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <Link href="/" className="text-blue-600 hover:text-blue-800 transition-colors">&larr; {t('backLink')}</Link>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 my-4">{t('title')}</h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">{t('lastUpdated')}</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">{t('section1Title')}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-gray-700 dark:text-gray-300">
            <p>
              <strong>Aras Finder</strong> {t('section1Text1')}
            </p>
            <p>{t('section1Text2')}</p>
          </CardContent>
        </Card>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="text-2xl">{t('section2Title')}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-gray-700 dark:text-gray-300">
            <p>
              <strong>{t('section2Important')}</strong> {t('section2Text1')}
            </p>
            <p>{t('section2Text2')}</p>
            <p>{t('section2ListTitle')}</p>
            <ul className="list-disc list-inside ml-4 space-y-2">
              <li>{t('section2ListItem1')}</li>
              <li>{t('section2ListItem2')}</li>
              <li>{t('section2ListItem3')}</li>
              <li>{t('section2ListItem4')}</li>
            </ul>
          </CardContent>
        </Card>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="text-2xl">{t('section3Title')}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-gray-700 dark:text-gray-300">
            <p>
              <strong>{t('section3Subtitle1')}</strong> {t('section3Text1')}
            </p>
            <p>
              <strong>{t('section3Subtitle2')}</strong>
            </p>
            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
              <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">{t('section3AnalyticsTitle')}</h4>
              <p className="text-sm">{t('section3AnalyticsText')}</p>
            </div>
          </CardContent>
        </Card>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="text-2xl">{t('section4Title')}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-gray-700 dark:text-gray-300">
            <p>{t('section4Text1')}</p>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">Chrome</h4>
                <p className="text-sm">{t('section4Chrome')}</p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">Firefox</h4>
                <p className="text-sm">{t('section4Firefox')}</p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">Safari</h4>
                <p className="text-sm">{t('section4Safari')}</p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">Edge</h4>
                <p className="text-sm">{t('section4Edge')}</p>
              </div>
            </div>
            <p className="mt-4">
              <strong>{t('section4NoteTitle')}</strong> {t('section4NoteText')}
            </p>
          </CardContent>
        </Card>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="text-2xl">{t('section5Title')}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-gray-700 dark:text-gray-300">
            <p>{t('section5Text1')}</p>
            <ul className="list-disc list-inside ml-4 space-y-2">
              <li><strong>LinkedIn:</strong> <a href="https://www.linkedin.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 transition-colors">{t('linkedinPolicy')}</a></li>
              <li><strong>Indeed:</strong> <a href="https://www.indeed.com/legal/privacy" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 transition-colors">{t('indeedPolicy')}</a></li>
            </ul>
            <p>{t('section5Text2')}</p>
          </CardContent>
        </Card>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="text-2xl">{t('section6Title')}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-gray-700 dark:text-gray-300">
            <p>{t('section6Text1')}</p>
            <p>{t('section6Text2')}</p>
            <p>{t('section6Text3')}</p>
          </CardContent>
        </Card>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="text-2xl">{t('section7Title')}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-gray-700 dark:text-gray-300">
            <p>{t('section7Text1')}</p>
            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
              <p className="font-semibold">Email:</p>
              <a href="mailto:contato.arasfinder@gmail.com" className="text-blue-600 hover:text-blue-800 transition-colors">contato.arasfinder@gmail.com</a>
            </div>
            <p>{t('section7Text2')}</p>
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