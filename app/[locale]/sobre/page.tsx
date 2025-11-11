"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Link } from '@/i18n/routing'
import { useTranslations } from 'next-intl';

export default function Sobre() {
  const t = useTranslations('AboutPage');

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
            <Link href="/" className="text-blue-600 hover:text-blue-800 transition-colors">&larr; {t('backLink')}</Link>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 my-4">{t('title')}</h1>
            <img
              src="/gizmo-3d.png"
              alt="Aras Finder - Gizmo Pixelado"
              className="w-24 h-24 pixelated mx-auto my-4"
              style={{ imageRendering: "pixelated" }}
            />
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">{t('missionTitle')}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-gray-700 dark:text-gray-300">
            <p>{t('missionText1')}</p>
            <p>
              <strong>Aras Finder</strong> {t('missionText2')}
            </p>
          </CardContent>
        </Card>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="text-2xl">{t('creatorTitle')}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-gray-700 dark:text-gray-300">
            <p>{t('creatorText1')} <a href="https://github.com/dib10" target="_blank" rel="noopener noreferrer" className="font-semibold text-blue-600 hover:text-blue-800 transition-colors">dib10</a>, {t('creatorText2')}</p>
          </CardContent>
        </Card>

      </div>
    </div>
  )
}