import { useState } from "react"
import { useToast } from "@/hooks/use-toast"
import { buildLinkedInOptimizedKeywords, sanitizeUserInput } from "@/lib/search-builder"
import { linkedinSeniorityMap, linkedinWorkModelMap } from "@/config/filters"
import { useLocale, useTranslations } from "next-intl"

export function useLinkedInSearch() {
  const [linkedinSeniority, setLinkedinSeniority] = useState("any")
  const [linkedinTimePosted, setLinkedinTimePosted] = useState("any")
  const [linkedinLocation, setLinkedinLocation] = useState("")
  const [linkedinWorkModel, setLinkedinWorkModel] = useState("any")
  const [linkedinGeneratedUrl, setLinkedinGeneratedUrl] = useState("")
  const [linkedinSearchMode, setLinkedinSearchMode] = useState("preciso")
  const [linkedinEasyApply, setLinkedinEasyApply] = useState(false)
  const [linkedinKeywordOperator, setLinkedinKeywordOperator] = useState<"AND" | "OR">("AND")

  const { toast } = useToast()
  const locale = useLocale()
  const t = useTranslations('ToastMessages');

  const generateLinkedInUrl = (keywords: string, exclusionKeywords: string) => {
    if (!keywords.trim()) {
      toast({
        title: t('requiredField.title'),
        description: t('requiredField.description'),
        variant: "destructive",
      })
      return
    }

    const baseUrl = "https://www.linkedin.com/jobs/search/"
    const params = new URLSearchParams()

    const optimizedKeywords = buildLinkedInOptimizedKeywords(
      keywords,
      linkedinSeniority,
      linkedinSearchMode,
      exclusionKeywords,
      locale,
      linkedinKeywordOperator
    )
    params.append("keywords", optimizedKeywords)

    // Adiciona padrão para EN e PT-BR
    let finalLocation = linkedinLocation.trim();
    if (locale === 'pt-BR' && !finalLocation) {
      finalLocation = "Brazil";
    } else if (locale === 'en' && !finalLocation) {
      finalLocation = "United States"; // Padrão para a interface em inglês
    }

    if (finalLocation) {
      params.append("location", sanitizeUserInput(finalLocation))
    }

    if (linkedinTimePosted !== "any") {
      params.append("f_TPR", linkedinTimePosted)
    }

    if (linkedinWorkModel !== "any") {
      const workModelValue = linkedinWorkModelMap[linkedinWorkModel as keyof typeof linkedinWorkModelMap]
      if (workModelValue) {
        params.append("f_WT", workModelValue)
      }
    }

    if (linkedinSeniority !== "any") {
      const seniorityValue = linkedinSeniorityMap[linkedinSeniority as keyof typeof linkedinSeniorityMap]
      if (seniorityValue) {
        params.append("f_E", seniorityValue)
      }
    }

    if (linkedinEasyApply) {
      params.append("f_AL", "true")
    }

    const finalUrl = `${baseUrl}?${params.toString()}`
    setLinkedinGeneratedUrl(finalUrl)

    toast({
      title: t('linkedInLinkGenerated.title'),
      description: t('linkedInLinkGenerated.description'),
    })
  }

  return {
    linkedinSeniority,
    linkedinTimePosted,
    linkedinLocation,
    linkedinWorkModel,
    linkedinGeneratedUrl,
    linkedinSearchMode,
    linkedinEasyApply,
    linkedinKeywordOperator,
    setLinkedinSeniority,
    setLinkedinTimePosted,
    setLinkedinLocation,
    setLinkedinWorkModel,
    setLinkedinSearchMode,
    setLinkedinEasyApply,
    setLinkedinKeywordOperator,
    generateLinkedInUrl,
  }
}