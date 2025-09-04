"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import Link from 'next/link'
import { useTranslations } from 'next-intl';

export default function FAQ() {
  const t = useTranslations('FaqPage');

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <Link href="/" className="text-blue-600 hover:text-blue-800 transition-colors">&larr; {t('backLink')}</Link>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 my-4">{t('title')}</h1>
        </div>

        <Accordion type="single" collapsible className="w-full bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
          <AccordionItem value="item-1">
            <AccordionTrigger>{t('q1')}</AccordionTrigger>
            <AccordionContent>
              {t('a1')}
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>{t('q2')}</AccordionTrigger>
            <AccordionContent>
              {t('a2')}
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>{t('q3')}</AccordionTrigger>
            <AccordionContent>
             {t('a3')}
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-4">
            <AccordionTrigger>{t('q4')}</AccordionTrigger>
            <AccordionContent>
              {t('a4')}
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-5">
            <AccordionTrigger>{t('q5')}</AccordionTrigger>
            <AccordionContent>
              {t('a5')}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  )
}