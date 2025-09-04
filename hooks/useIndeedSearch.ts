import { useState } from "react"
import { useToast } from "@/hooks/use-toast"
import { buildIndeedOptimizedKeywords, sanitizeUserInput } from "@/lib/search-builder"
import { useLocale, useTranslations } from "next-intl"

export function useIndeedSearch() {
  const [indeedSeniority, setIndeedSeniority] = useState("any")
  const [indeedTimePosted, setIndeedTimePosted] = useState("any")
  const [indeedLocation, setIndeedLocation] = useState("")
  const [indeedWorkModel, setIndeedWorkModel] = useState("any")
  const [indeedGeneratedUrl, setIndeedGeneratedUrl] = useState("")

  const { toast } = useToast()
  const t = useTranslations('ToastMessages');
  const locale = useLocale();

  const generateIndeedUrl = (keywords: string, exclusionKeywords: string) => {
    if (!keywords.trim()) {
      toast({
        title: t('requiredField.title'),
        description: t('requiredField.description'),
        variant: "destructive",
      })
      return
    }

    const baseUrl = locale === 'en' ? "https://www.indeed.com/jobs" : "https://br.indeed.com/jobs";
    
    const params = new URLSearchParams()

    const optimizedKeywords = buildIndeedOptimizedKeywords(
      keywords,
      indeedSeniority,
      indeedWorkModel,
      exclusionKeywords,
      locale
    )
    params.append("q", optimizedKeywords)

    // LÓGICA MODIFICADA: Força a localização para "Brasil" se o locale for pt-BR e o campo estiver vazio
    let finalLocation = indeedLocation.trim();
    if (locale === 'pt-BR' && !finalLocation) {
      finalLocation = "Brasil";
    }

    if (indeedWorkModel === "remoto" && !finalLocation) {
      const remoteKeyword = locale === 'en' ? 'remote' : 'remoto';
      finalLocation = remoteKeyword;
    }
    
    if (finalLocation) {
      params.append("l", sanitizeUserInput(finalLocation))
    }

    if (indeedTimePosted !== "any") {
      params.append("fromage", indeedTimePosted)
    }

    if (indeedWorkModel === "remoto") {
      params.append("sc", "0kf%3Aattr(DSGMC)%3B")
    }

    const finalUrl = `${baseUrl}?${params.toString()}`
    setIndeedGeneratedUrl(finalUrl)

    toast({
      title: t('indeedLinkGenerated.title'),
      description: t('indeedLinkGenerated.description'),
    })
  }

  return {
    indeedSeniority,
    indeedTimePosted,
    indeedLocation,
    indeedWorkModel,
    indeedGeneratedUrl,
    setIndeedSeniority,
    setIndeedTimePosted,
    setIndeedLocation,
    setIndeedWorkModel,
    generateIndeedUrl,
  }
}