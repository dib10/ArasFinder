import { useState } from "react"
import { useToast } from "@/hooks/use-toast"
import { buildIndeedOptimizedKeywords, sanitizeUserInput } from "@/lib/search-builder"

export function useIndeedSearch() {
  const [indeedSeniority, setIndeedSeniority] = useState("any")
  const [indeedTimePosted, setIndeedTimePosted] = useState("any")
  const [indeedLocation, setIndeedLocation] = useState("")
  const [indeedWorkModel, setIndeedWorkModel] = useState("any")
  const [indeedGeneratedUrl, setIndeedGeneratedUrl] = useState("")

  const { toast } = useToast()

  const generateIndeedUrl = (keywords: string) => {
    if (!keywords.trim()) {
      toast({
        title: "Campo obrigatório",
        description: "Por favor, insira pelo menos uma palavra-chave para busca.",
        variant: "destructive",
      })
      return
    }

    const baseUrl = "https://br.indeed.com/jobs"
    const params = new URLSearchParams()

    // Construir query otimizada
    const optimizedKeywords = buildIndeedOptimizedKeywords(
      keywords,
      indeedSeniority,
      indeedWorkModel
    )
    params.append("q", optimizedKeywords)

    // Localização (sem codificação para Indeed também)
    let locationValue = indeedLocation.trim()
    if (indeedWorkModel === "remoto" && !locationValue) {
      locationValue = "remoto"
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
      title: "Link Indeed gerado!",
      description: "Sua URL de busca otimizada foi criada.",
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