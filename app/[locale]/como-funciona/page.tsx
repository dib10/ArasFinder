"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from '@/i18n/routing';
import { useTranslations } from 'next-intl';

export default function ComoFunciona() {
  const t = useTranslations('HowItWorksPage');

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <Link href="/" className="text-blue-600 hover:text-blue-800 transition-colors">&larr; {t('backLink')}</Link>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 my-4">{t('title')}</h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            {t('subtitle')}
          </p>
        </div>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-2xl">{t('buildSearchTitle')}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-gray-700 dark:text-gray-300">
            <p>{t('buildSearchText1_part1')} <strong>{t('buildSearchText1_part2')}</strong>, {t('buildSearchText1_part3')} <strong>{t('buildSearchText1_part4')}</strong> {t('buildSearchText1_part5')}</p>
            <p>{t('buildSearchText2')}</p>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-2xl">{t('andOrTitle')}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-gray-700 dark:text-gray-300">
            <p>{t('andOrText1')}</p>
            <p className="font-mono bg-gray-100 dark:bg-gray-700 p-2 rounded text-sm">{t('andOrExample1')}</p>
            <p>{t('andOrText2')}</p>
            <p className="font-mono bg-gray-100 dark:bg-gray-700 p-2 rounded text-sm">{t('andOrExample2')}</p>
            <p>{t('andOrText3')}</p>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-2xl">{t('exclusionTitle')}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-gray-700 dark:text-gray-300">
            <div>
              <h3 className="font-semibold text-lg mb-2">{t('manualExclusionTitle')}</h3>
              <p>{t('manualExclusionText_part1')} <strong>{t('manualExclusionText_part2')}</strong> (para o LinkedIn) ou <strong>{t('manualExclusionText_part3')}</strong> {t('manualExclusionText_part4')}</p>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-2">{t('autoExclusionTitle')}</h3>
              <p>{t('autoExclusionText_part1')} <strong>{t('autoExclusionText_part2')}</strong> e <strong>{t('autoExclusionText_part3')}</strong> {t('autoExclusionText_part4')}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">{t('modesTitle')}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-gray-700 dark:text-gray-300">
            <div>
              <h4 className="font-semibold">{t('linkedinModesTitle')}</h4>
              <p>{t('linkedinModesText_part1')} <strong>{t('linkedinModesText_part2')}</strong> {t('linkedinModesText_part3')} <strong>{t('linkedinModesText_part4')}</strong> {t('linkedinModesText_part5')}</p>
            </div>
            <div>
              <h4 className="font-semibold">{t('indeedOptimizationTitle')}</h4>
              <p>{t('indeedOptimizationText_part1')} <strong>"-"</strong> {t('indeedOptimizationText_part2')}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}