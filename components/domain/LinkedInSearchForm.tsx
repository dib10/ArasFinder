import React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Search, HelpCircle } from "lucide-react"
import { useLinkedInSearch } from "@/hooks/useLinkedInSearch"
import { GeneratedUrlCard } from "./GeneratedUrlCard"
import { Switch } from "@/components/ui/switch"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { useTranslations } from 'next-intl'
import {
  getSeniorityOptions,
  getLinkedinTimePostedOptions,
  getWorkModelOptions,
  getSearchModeOptions
} from "@/config/filters"

interface LinkedInSearchFormProps {
  keywords: string
  setKeywords: (value: string) => void
  exclusionKeywords: string
  setExclusionKeywords: (value: string) => void
}

export function LinkedInSearchForm({ keywords, setKeywords, exclusionKeywords, setExclusionKeywords }: LinkedInSearchFormProps) {
  const t = useTranslations('LinkedInForm')
  const tFilters = useTranslations('Filters')
  const tGeneratedUrl = useTranslations('GeneratedUrl')

  const {
    linkedinSeniority,
    linkedinTimePosted,
    linkedinLocation,
    linkedinWorkModel,
    linkedinGeneratedUrl,
    linkedinSearchMode,
    setLinkedinSeniority,
    setLinkedinTimePosted,
    setLinkedinLocation,
    setLinkedinWorkModel,
    setLinkedinSearchMode,
    generateLinkedInUrl,
    linkedinEasyApply,
    setLinkedinEasyApply,
    linkedinKeywordOperator,
    setLinkedinKeywordOperator,
  } = useLinkedInSearch()

  const seniorityOptions = React.useMemo(() => getSeniorityOptions(tFilters), [tFilters])
  const linkedinTimePostedOptions = React.useMemo(() => getLinkedinTimePostedOptions(tFilters), [tFilters])
  const workModelOptions = React.useMemo(() => getWorkModelOptions(tFilters), [tFilters])
  const searchModeOptions = React.useMemo(() => getSearchModeOptions(tFilters), [tFilters])

  const generatedUrlTitle = React.useMemo(() =>
    tGeneratedUrl('title', { platform: 'LinkedIn' }),
    [tGeneratedUrl]
  )

  return (
    <>
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="h-5 w-5" />
            {t('title')}
          </CardTitle>
          <CardDescription>
            {t('description')}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="linkedin-keywords" className="text-sm font-medium">
              {t('keywords.label')}
            </Label>
            <Input
              id="linkedin-keywords"
              type="text"
              placeholder={t('keywords.placeholder')}
              value={keywords}
              onChange={(e) => setKeywords(e.target.value)}
            />
            <div className="flex items-center space-x-2 pt-2">
              <Switch
                id="linkedin-keyword-operator"
                checked={linkedinKeywordOperator === "OR"}
                onCheckedChange={(checked) => setLinkedinKeywordOperator(checked ? "OR" : "AND")}
              />
              <Label htmlFor="linkedin-keyword-operator" className="text-sm cursor-pointer text-muted-foreground">
                {tFilters('keywordOperator.label')}
              </Label>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <HelpCircle className="h-4 w-4 text-muted-foreground cursor-help hidden md:block" />
                  </TooltipTrigger>
                  <TooltipContent className="max-w-xs">
                    <p>{tFilters('keywordOperator.tooltip')}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <p className="text-xs text-muted-foreground md:hidden">
              {tFilters('keywordOperator.tooltip')}
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="linkedin-exclusion-keywords" className="text-sm font-medium">
              {t('exclusionKeywords.label')}
            </Label>
            <Input
              id="linkedin-exclusion-keywords"
              type="text"
              placeholder={t('exclusionKeywords.placeholder')}
              value={exclusionKeywords}
              onChange={(e) => setExclusionKeywords(e.target.value)}
            />
          </div>

          <div className="space-y-3">
            <Label className="text-sm font-medium">{t('seniority.label')}</Label>
            <RadioGroup
              value={linkedinSeniority}
              onValueChange={setLinkedinSeniority}
              className="grid grid-cols-2 md:grid-cols-3 gap-4"
            >
              {seniorityOptions.map((option) => (
                <div key={option.value} className="flex items-center space-x-2">
                  <RadioGroupItem value={option.value} id={`linkedin-${option.value}`} />
                  <Label htmlFor={`linkedin-${option.value}`} className="text-sm cursor-pointer">
                    {option.label}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label className="text-sm font-medium">{t('timePosted.label')}</Label>
              <Select value={linkedinTimePosted} onValueChange={setLinkedinTimePosted}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {linkedinTimePostedOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="linkedin-location" className="text-sm font-medium">
                {t('location.label')}
              </Label>
              <Input
                id="linkedin-location"
                type="text"
                placeholder={t('location.placeholder')}
                value={linkedinLocation}
                onChange={(e) => setLinkedinLocation(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium">{t('searchMode.label')}</Label>
              <RadioGroup
                value={linkedinSearchMode}
                onValueChange={setLinkedinSearchMode}
                className="flex flex-col gap-3"
              >
                {searchModeOptions.map((option) => (
                  <div key={option.value} className="flex items-center space-x-2">
                    <RadioGroupItem value={option.value} id={`search-mode-${option.value}`} />
                    <Label htmlFor={`search-mode-${option.value}`} className="text-sm cursor-pointer">
                      {option.label}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>

            {linkedinSearchMode === "powerful" && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <div className="flex items-start gap-2">
                  <span className="text-yellow-600 text-lg">⚠️</span>
                  <div className="text-sm text-yellow-800">
                    <p className="font-medium mb-1">{t('warning.title')}</p>
                    <p>
                      {t('warning.message')}
                    </p>
                  </div>
                </div>
              </div>
            )}

            <div className="space-y-2">
              <Label className="text-sm font-medium">{t('workModel.label')}</Label>
              <Select value={linkedinWorkModel} onValueChange={setLinkedinWorkModel}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {workModelOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2 flex flex-col justify-end">
            <div className="flex items-center space-x-2">
              <Switch
                id="linkedin-easy-apply"
                checked={linkedinEasyApply}
                onCheckedChange={setLinkedinEasyApply}
              />
              <Label htmlFor="linkedin-easy-apply" className="cursor-pointer">
                {t('easyApply.label')}
              </Label>
            </div>
          </div>

          <Button
            onClick={() => generateLinkedInUrl(keywords, exclusionKeywords)}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 text-lg"
            size="lg"
          >
            <Search className="mr-2 h-5 w-5" />
            {t('generateButton')}
          </Button>
        </CardContent>
      </Card>

      {linkedinGeneratedUrl && (
        <GeneratedUrlCard
          url={linkedinGeneratedUrl}
          platform="LinkedIn"
          title={generatedUrlTitle}
        />
      )}
    </>
  )
} 