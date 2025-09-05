"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Search, Briefcase, Heart, Coffee } from "lucide-react"
import { LinkedInSearchForm } from "@/components/domain/LinkedInSearchForm"
import { IndeedSearchForm } from "@/components/domain/IndeedSearchForm"
import { ThemeToggle } from "@/components/ui/ThemeToggle"
import { useState } from "react"
import { useTranslations } from 'next-intl'
import { LanguageSwitcher } from "@/components/ui/LanguageSwitcher"

export default function JobSearchOptimizer() {
  const [keywords, setKeywords] = useState("")
  const [exclusionKeywords, setExclusionKeywords] = useState("")
  const t = useTranslations('HomePage')
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          {/* Botões de controle - responsivos para mobile */}
          <div className="flex justify-center sm:justify-start items-center mb-4 sm:mb-6">
            <div className="flex gap-2">
              <LanguageSwitcher />
              <ThemeToggle />
            </div>
          </div>
          
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-2">Aras Finder</h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-6">
            {t('description')}
          </p>
          <div className="flex justify-center mb-6">
            <img
              src="/gizmo-3d.png"
              alt="Aras Finder - Gizmo Pixelado"
              className="w-24 h-24 pixelated"
              style={{ imageRendering: "pixelated" }}
            />
          </div>
        </div>

        <Tabs defaultValue="linkedin" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="linkedin" className="flex items-center gap-2">
              <Search className="h-4 w-4" />
              LinkedIn
            </TabsTrigger>
            <TabsTrigger value="indeed" className="flex items-center gap-2">
              <Briefcase className="h-4 w-4" />
              Indeed
            </TabsTrigger>
          </TabsList>

          <TabsContent value="linkedin">
            <LinkedInSearchForm 
              keywords={keywords} 
              setKeywords={setKeywords}
              exclusionKeywords={exclusionKeywords}
              setExclusionKeywords={setExclusionKeywords}
            />
          </TabsContent>

          <TabsContent value="indeed">
            <IndeedSearchForm 
              keywords={keywords} 
              setKeywords={setKeywords}
              exclusionKeywords={exclusionKeywords}
              setExclusionKeywords={setExclusionKeywords}
            />
          </TabsContent>
        </Tabs>

        {/* Informações sobre as diferenças */}
        <Card className="mt-6 bg-blue-50 border-blue-200">
          <CardHeader>
            <CardTitle className="text-blue-800 text-lg">{t('howItWorks.title')}</CardTitle>
          </CardHeader>
          <CardContent className="text-blue-700 space-y-3">
            <div>
              <p className="text-sm font-semibold">LinkedIn:</p>
              <p className="text-sm">{t('howItWorks.linkedin.precise')}</p>
              <p className="text-sm">{t('howItWorks.linkedin.powerful')}</p>
              <p className="text-sm">{t('howItWorks.linkedin.keywords')}</p>
            </div>
            <div>
              <p className="text-sm font-semibold">Indeed:</p>
              <p className="text-sm">{t('howItWorks.indeed.exclusions')}</p>
              <p className="text-sm">{t('howItWorks.indeed.remote')}</p>
              <p className="text-sm">{t('howItWorks.indeed.dateFilter')}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
