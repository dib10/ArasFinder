import { exclusionsByLocale } from "@/config/filters"

function processAndQuoteKeywords(keywords: string, operator: "AND" | "OR" = "AND"): string {
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
    .join(` ${operator} `)
}

/**
 * Constrói keywords otimizadas para LinkedIn baseado no modo de busca
 */
export function buildLinkedInOptimizedKeywords(
  baseKeywords: string,
  selectedSeniority: string,
  searchMode: string,
  exclusionKeywords?: string,
  locale: string = "pt-BR",
  keywordOperator: "AND" | "OR" = "AND"
): string {
  if (!baseKeywords.trim()) return ""

  let optimizedKeywords = processAndQuoteKeywords(baseKeywords, keywordOperator)

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
    const localeKey = locale === "en" ? "en" : "pt-BR"
    const exclusions = exclusionsByLocale[localeKey]?.linkedin?.[selectedSeniority as keyof typeof exclusionsByLocale[typeof localeKey]["linkedin"]]

    if (exclusions) {
      const excludeTerms = exclusions.map((term: string) => `NOT "${term}"`).join(" ")
      optimizedKeywords = `${optimizedKeywords} ${excludeTerms}`
    }
  }

  return optimizedKeywords
}

/**
 * Constrói keywords otimizadas para Indeed usando operador de exclusão "-"
 */
export function buildIndeedOptimizedKeywords(
  baseKeywords: string,
  selectedSeniority: string,
  workModel: string,
  exclusionKeywords?: string,
  locale: string = "pt-BR",
  keywordOperator: "AND" | "OR" = "AND"
): string {
  if (!baseKeywords.trim()) return "";

  // Processa com aspas e troca operador por espaço, que é o padrão do Indeed
  let optimizedKeywords = processAndQuoteKeywords(baseKeywords, keywordOperator).replace(/\s+(AND|OR)\s+/g, ' ');

  // Exclusões manuais via -"termo"
  if (exclusionKeywords && exclusionKeywords.trim()) {
    const manualExclusions = exclusionKeywords
      .split(',')
      .map((term) => term.trim())
      .filter((term) => term.length > 0)
      .map((term) => `-"${term}"`)
      .join(' ');
    optimizedKeywords = `${optimizedKeywords} ${manualExclusions}`;
  }

  // Lógica de exclusão automática para Indeed usando operador "-"
  if (selectedSeniority !== "any") {
    const localeKey = locale === "en" ? "en" : "pt-BR";
    const exclusions = exclusionsByLocale[localeKey]?.indeed?.[selectedSeniority as keyof typeof exclusionsByLocale[typeof localeKey]["indeed"]];

    if (exclusions) {
      const excludeTerms = exclusions.map((term: string) => `-"${term}"`).join(" "); // <-- CORRIGIDO para usar hífen
      optimizedKeywords = `${optimizedKeywords} ${excludeTerms}`;
    }
  }

  // Adicionar palavra-chave "remoto" se selecionado
  if (workModel === "remoto") {
    const remoteKeyword = locale === "en" ? "remote" : "remoto";
    optimizedKeywords = `${optimizedKeywords} "${remoteKeyword}"`;
  }

  return optimizedKeywords;
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