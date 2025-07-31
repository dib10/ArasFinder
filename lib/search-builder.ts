import { linkedinExclusions, indeedExclusions } from "@/config/filters"

/**
 * Constrói keywords otimizadas para LinkedIn baseado no modo de busca
 */
export function buildLinkedInOptimizedKeywords(
  baseKeywords: string,
  selectedSeniority: string,
  searchMode: string
): string {
  if (!baseKeywords.trim()) return ""

  let optimizedKeywords = baseKeywords.trim()

  // Se modo "Preciso", retorna apenas as keywords limpas
  if (searchMode === "preciso") {
    return optimizedKeywords
  }

  // Se modo "Poderoso", adiciona operadores NOT para dupla filtragem
  if (searchMode === "poderoso" && selectedSeniority !== "any") {
    const exclusions = linkedinExclusions[selectedSeniority as keyof typeof linkedinExclusions]
    
    if (exclusions) {
      const excludeTerms = exclusions.map((term) => `NOT ${term}`).join(" ")
      optimizedKeywords = `${optimizedKeywords} ${excludeTerms}`
    }
  }

  return optimizedKeywords
}

/**
 * Constrói keywords otimizadas para Indeed usando operador de exclusão
 */
export function buildIndeedOptimizedKeywords(
  baseKeywords: string,
  selectedSeniority: string,
  workModel: string
): string {
  if (!baseKeywords.trim()) return ""

  let optimizedKeywords = baseKeywords.trim()

  // Lógica de exclusão para Indeed usando operador -
  if (selectedSeniority !== "any") {
    const exclusions = indeedExclusions[selectedSeniority as keyof typeof indeedExclusions]
    
    if (exclusions) {
      const excludeTerms = exclusions.map((term) => `-${term}`).join(" ")
      optimizedKeywords = `${optimizedKeywords} ${excludeTerms}`
    }
  }

  // Adicionar palavra-chave remoto se selecionado
  if (workModel === "remoto") {
    optimizedKeywords = `${optimizedKeywords} remoto`
  }

  return optimizedKeywords
}

/**
 * Sanitiza entrada do usuário para uso seguro em URLs
 * Para localizações, apenas remove espaços extras e normaliza
 */
export function sanitizeUserInput(input: string): string {
  return input.trim()
}

/**
 * Sanitiza e codifica entrada do usuário para uso seguro em URLs
 * Usado apenas quando necessário codificar para URL
 */
export function sanitizeAndEncodeUserInput(input: string): string {
  return encodeURIComponent(input.trim())
} 