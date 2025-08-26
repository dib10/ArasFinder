import { useState } from "react"
import { useToast } from "@/hooks/use-toast"
import { buildLinkedInOptimizedKeywords, sanitizeUserInput } from "@/lib/search-builder"
import { linkedinSeniorityMap, linkedinWorkModelMap } from "@/config/filters"

export function useLinkedInSearch() {
  const [linkedinSeniority, setLinkedinSeniority] = useState("any")
  const [linkedinTimePosted, setLinkedinTimePosted] = useState("any")
  const [linkedinLocation, setLinkedinLocation] = useState("")
  const [linkedinWorkModel, setLinkedinWorkModel] = useState("any")
  const [linkedinGeneratedUrl, setLinkedinGeneratedUrl] = useState("")
  const [linkedinSearchMode, setLinkedinSearchMode] = useState("preciso")

  const { toast } = useToast()

  const generateLinkedInUrl = (keywords: string, exclusionKeywords: string) => {
    if (!keywords.trim()) {
      toast({
        title: "Campo obrigatório",
        description: "Por favor, insira pelo menos uma palavra-chave para busca.",
        variant: "destructive",
      })
      return
    }

    const baseUrl = "https://www.linkedin.com/jobs/search/"
    const params = new URLSearchParams()

    // Construir keywords otimizadas, incluindo exclusões manuais
    const optimizedKeywords = buildLinkedInOptimizedKeywords(
      keywords,
      linkedinSeniority,
      linkedinSearchMode,
      exclusionKeywords
    )
    params.append("keywords", optimizedKeywords)

    // Adicionar localização se especificada (sem codificação para LinkedIn)
    if (linkedinLocation.trim()) {
      params.append("location", sanitizeUserInput(linkedinLocation))
    }

    // Adicionar filtro de tempo se especificado
    if (linkedinTimePosted !== "any") {
      params.append("f_TPR", linkedinTimePosted)
    }

    // Adicionar modelo de trabalho se especificado
    if (linkedinWorkModel !== "any") {
      const workModelValue = linkedinWorkModelMap[linkedinWorkModel as keyof typeof linkedinWorkModelMap]
      if (workModelValue) {
        params.append("f_WT", workModelValue)
      }
    }

    // Adicionar filtro de senioridade se especificado
    if (linkedinSeniority !== "any") {
      const seniorityValue = linkedinSeniorityMap[linkedinSeniority as keyof typeof linkedinSeniorityMap]
      if (seniorityValue) {
        params.append("f_E", seniorityValue)
      }
    }

    // Gerar URL final
    const finalUrl = `${baseUrl}?${params.toString()}`
    setLinkedinGeneratedUrl(finalUrl)

    toast({
      title: "Link LinkedIn gerado!",
      description: "Sua URL de busca limpa foi criada usando apenas filtros nativos.",
    })
  }

  return {
    // Estados
    linkedinSeniority,
    linkedinTimePosted,
    linkedinLocation,
    linkedinWorkModel,
    linkedinGeneratedUrl,
    linkedinSearchMode,
    
    // Setters
    setLinkedinSeniority,
    setLinkedinTimePosted,
    setLinkedinLocation,
    setLinkedinWorkModel,
    setLinkedinSearchMode,
    
    // Funções
    generateLinkedInUrl,
  }
} 