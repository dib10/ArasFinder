import { linkedinExclusions, indeedExclusions } from "@/config/filters"

function processAndQuoteKeywords(keywords: string): string {
  if (!keywords.trim()) return ""

  const booleanOperators = /\b(AND|OR|NOT)\b/i
  if (booleanOperators.test(keywords)) {
    return keywords.trim()
  }

  return keywords
    .split(',')
    .map((keyword) => keyword.trim())
    .filter((keyword) => keyword.length > 0)
    .map((keyword) => `"${keyword}"`)
    .join(' AND ')
}

/**
 * Constrói keywords otimizadas para LinkedIn baseado no modo de busca
 */
export function buildLinkedInOptimizedKeywords(
  baseKeywords: string,
  selectedSeniority: string,
  searchMode: string,
  exclusionKeywords?: string
): string {
  if (!baseKeywords.trim()) return ""

  let optimizedKeywords = processAndQuoteKeywords(baseKeywords)

  // Exclusões manuais via NOT "termo"
  if (exclusionKeywords && exclusionKeywords.trim()) {
    const manualExclusions = exclusionKeywords
      .split(',')
      .map((term) => term.trim())
      .filter((term) => term.length > 0)
      .map((term) => `NOT "${term}"`)
      .join(' ')
    optimizedKeywords = `${optimizedKeywords} ${manualExclusions}`
  }

  // Se modo "Preciso", retorna apenas as keywords limpas
  if (searchMode === "preciso") {
    return optimizedKeywords
  }

  // Se modo "Poderoso", adiciona operadores NOT para dupla filtragem
  if (searchMode === "poderoso" && selectedSeniority !== "any") {
    const exclusions = linkedinExclusions[selectedSeniority as keyof typeof linkedinExclusions]
    
    if (exclusions) {
      const excludeTerms = exclusions.map((term) => `NOT "${term}"`).join(" ")
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
  workModel: string,
  exclusionKeywords?: string
): string {
  if (!baseKeywords.trim()) return ""

  // Processa com aspas e troca AND por espaço (Indeed)
  let optimizedKeywords = processAndQuoteKeywords(baseKeywords).replace(/\s+AND\s+/g, ' ')

  // Exclusões manuais via -"termo"
  if (exclusionKeywords && exclusionKeywords.trim()) {
    const manualExclusions = exclusionKeywords
      .split(',')
      .map((term) => term.trim())
      .filter((term) => term.length > 0)
      .map((term) => `-"${term}"`)
      .join(' ')
    optimizedKeywords = `${optimizedKeywords} ${manualExclusions}`
  }

  // Lógica de exclusão para Indeed usando operador -
  if (selectedSeniority !== "any") {
    const exclusions = indeedExclusions[selectedSeniority as keyof typeof indeedExclusions]
    
    if (exclusions) {
      const excludeTerms = exclusions.map((term) => `-"${term}"`).join(" ")
      optimizedKeywords = `${optimizedKeywords} ${excludeTerms}`
    }
  }

  // Adicionar palavra-chave remoto se selecionado
  if (workModel === "remoto") {
    optimizedKeywords = `${optimizedKeywords} "remoto"`
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