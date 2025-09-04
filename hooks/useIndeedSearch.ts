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

    // CORREÇÃO: A baseUrl agora é dinâmica baseada no locale
    const baseUrl = locale === 'en' ? "https://www.indeed.com/jobs" : "https://br.indeed.com/jobs";
    
    const params = new URLSearchParams()

    // Construir query otimizada, incluindo exclusões manuais e passando o locale
    const optimizedKeywords = buildIndeedOptimizedKeywords(
      keywords,
      indeedSeniority,
      indeedWorkModel,
      exclusionKeywords,
      locale
    )
    params.append("q", optimizedKeywords)

    // Localização
    let locationValue = indeedLocation.trim()
    if (indeedWorkModel === "remoto" && !locationValue) {
      const remoteKeyword = locale === 'en' ? 'remote' : 'remoto';
      locationValue = remoteKeyword;
    }
    if (locationValue) {
      params.append("l", sanitizeUserInput(locationValue))
    }

    // Filtro de data
    if (indeedTimePosted !== "any") {
      params.append("fromage", indeedTimePosted)
    }

    // Parâmetro especial para vagas remotas
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
    // Estados
    indeedSeniority,
    indeedTimePosted,
    indeedLocation,
    indeedWorkModel,
    indeedGeneratedUrl,
    
    // Setters
    setIndeedSeniority,
    setIndeedTimePosted,
    setIndeedLocation,
    setIndeedWorkModel,
    
    // Funções
    generateIndeedUrl,
  }
}