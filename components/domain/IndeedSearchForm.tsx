import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Briefcase, HelpCircle } from "lucide-react"
import { useIndeedSearch } from "@/hooks/useIndeedSearch"
import { GeneratedUrlCard } from "./GeneratedUrlCard"
import { useTranslations } from 'next-intl'
import {
  getSeniorityOptions,
  getIndeedTimePostedOptions,
  getWorkModelOptions
} from "@/config/filters"

interface IndeedSearchFormProps {
  keywords: string
  setKeywords: (value: string) => void
  exclusionKeywords: string
  setExclusionKeywords: (value: string) => void
}

export function IndeedSearchForm({ keywords, setKeywords, exclusionKeywords, setExclusionKeywords }: IndeedSearchFormProps) {
  const t = useTranslations('IndeedForm')
  const tFilters = useTranslations('Filters')
  const {
    indeedSeniority,
    indeedTimePosted,
    indeedLocation,
    indeedWorkModel,
    indeedGeneratedUrl,
    indeedKeywordOperator,
    setIndeedSeniority,
    setIndeedTimePosted,
    setIndeedLocation,
    setIndeedWorkModel,
    setIndeedKeywordOperator,
    generateIndeedUrl,
  } = useIndeedSearch()

  const seniorityOptions = getSeniorityOptions(tFilters)
  const indeedTimePostedOptions = getIndeedTimePostedOptions(tFilters)
  const workModelOptions = getWorkModelOptions(tFilters)

  return (
    <>
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Briefcase className="h-5 w-5" />
            {t('title')}
          </CardTitle>
          <CardDescription>
            {t('description')}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="indeed-keywords" className="text-sm font-medium">
              {t('keywords.label')}
            </Label>
            <Input
              id="indeed-keywords"
              type="text"
              placeholder={t('keywords.placeholder')}
              value={keywords}
              onChange={(e) => setKeywords(e.target.value)}
            />
            <div className="flex items-center space-x-2 pt-2">
              <Switch
                id="indeed-keyword-operator"
                checked={indeedKeywordOperator === "OR"}
                onCheckedChange={(checked) => setIndeedKeywordOperator(checked ? "OR" : "AND")}
              />
              <Label htmlFor="indeed-keyword-operator" className="text-sm cursor-pointer text-muted-foreground">
                {tFilters('keywordOperator.label')}
              </Label>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <HelpCircle className="h-4 w-4 text-muted-foreground cursor-help" />
                  </TooltipTrigger>
                  <TooltipContent className="max-w-xs">
                    <p>{tFilters('keywordOperator.tooltip')}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="indeed-exclusion-keywords" className="text-sm font-medium">
              {t('exclusionKeywords.label')}
            </Label>
            <Input
              id="indeed-exclusion-keywords"
              type="text"
              placeholder={t('exclusionKeywords.placeholder')}
              value={exclusionKeywords}
              onChange={(e) => setExclusionKeywords(e.target.value)}
            />
          </div>

          <div className="space-y-3">
            <Label className="text-sm font-medium">{t('seniority.label')}</Label>
            <RadioGroup
              value={indeedSeniority}
              onValueChange={setIndeedSeniority}
              className="grid grid-cols-2 md:grid-cols-3 gap-4"
            >
              {seniorityOptions.map((option) => (
                <div key={option.value} className="flex items-center space-x-2">
                  <RadioGroupItem value={option.value} id={`indeed-${option.value}`} />
                  <Label htmlFor={`indeed-${option.value}`} className="text-sm cursor-pointer">
                    {option.label}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label className="text-sm font-medium">{t('timePosted.label')}</Label>
              <Select value={indeedTimePosted} onValueChange={setIndeedTimePosted}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {indeedTimePostedOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="indeed-location" className="text-sm font-medium">
                {t('location.label')}
              </Label>
              <Input
                id="indeed-location"
                type="text"
                placeholder={t('location.placeholder')}
                value={indeedLocation}
                onChange={(e) => setIndeedLocation(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium">{t('workModel.label')}</Label>
              <Select value={indeedWorkModel} onValueChange={setIndeedWorkModel}>
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

          <Button
            onClick={() => generateIndeedUrl(keywords, exclusionKeywords)}
            className="w-full bg-orange-600 hover:bg-orange-700 text-white py-3 text-lg"
            size="lg"
          >
            <Briefcase className="mr-2 h-5 w-5" />
            {t('generateButton')}
          </Button>
        </CardContent>
      </Card>

      {indeedGeneratedUrl && (
        <GeneratedUrlCard
          url={indeedGeneratedUrl}
          platform="Indeed"
          title={t('generatedUrlTitle')}
        />
      )}
    </>
  )
} 