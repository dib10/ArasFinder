"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Copy, ExternalLink, Search, Briefcase } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function JobSearchOptimizer() {
  // Estados para LinkedIn
  const [linkedinKeywords, setLinkedinKeywords] = useState("")
  const [linkedinSeniority, setLinkedinSeniority] = useState("any")
  const [linkedinTimePosted, setLinkedinTimePosted] = useState("any")
  const [linkedinLocation, setLinkedinLocation] = useState("")
  const [linkedinWorkModel, setLinkedinWorkModel] = useState("any")
  const [linkedinGeneratedUrl, setLinkedinGeneratedUrl] = useState("")
  const [linkedinSearchMode, setLinkedinSearchMode] = useState("preciso")

  // Estados para Indeed
  const [indeedKeywords, setIndeedKeywords] = useState("")
  const [indeedSeniority, setIndeedSeniority] = useState("any")
  const [indeedTimePosted, setIndeedTimePosted] = useState("any")
  const [indeedLocation, setIndeedLocation] = useState("")
  const [indeedWorkModel, setIndeedWorkModel] = useState("any")
  const [indeedGeneratedUrl, setIndeedGeneratedUrl] = useState("")

  const { toast } = useToast()

  const seniorityOptions = [
    { value: "any", label: "Qualquer uma" },
    { value: "estagio", label: "Estágio" },
    { value: "assistente", label: "Assistente" },
    { value: "junior", label: "Júnior" },
    { value: "pleno", label: "Pleno" },
    { value: "senior", label: "Sênior" },
    { value: "diretor", label: "Diretor" },
    { value: "executivo", label: "Executivo" },
  ]

  const linkedinTimePostedOptions = [
    { value: "any", label: "A qualquer momento" },
    { value: "r3600", label: "Última hora" },
    { value: "r86400", label: "Últimas 24 horas" },
    { value: "r604800", label: "Última semana" },
    { value: "r2592000", label: "Último mês" },
  ]

  const indeedTimePostedOptions = [
    { value: "any", label: "A qualquer momento" },
    { value: "1", label: "Últimas 24 horas" },
    { value: "3", label: "Últimos 3 dias" },
    { value: "7", label: "Últimos 7 dias" },
    { value: "14", label: "Últimos 14 dias" },
  ]

  const workModelOptions = [
    { value: "any", label: "Qualquer modelo" },
    { value: "presencial", label: "Apenas Presencial" },
    { value: "remoto", label: "Apenas Remoto" },
    { value: "hibrido", label: "Híbrido" },
  ]

  const searchModeOptions = [
    { value: "preciso", label: "Preciso (Recomendado)" },
    { value: "poderoso", label: "Poderoso (Experimental)" },
  ]

  // Nova função para LinkedIn com modo duplo
  const buildLinkedInOptimizedKeywords = (baseKeywords: string, selectedSeniority: string, searchMode: string) => {
    if (!baseKeywords.trim()) return ""

    let optimizedKeywords = baseKeywords.trim()

    // Se modo "Preciso", retorna apenas as keywords limpas
    if (searchMode === "preciso") {
      return optimizedKeywords
    }

    // Se modo "Poderoso", adiciona operadores NOT para dupla filtragem
    if (searchMode === "poderoso" && selectedSeniority !== "any") {
      const exclusions = {
        estagio: [
          "Assistente",
          "Júnior",
          "Junior",
          "Pleno",
          "Sênior",
          "Senior",
          "Especialista",
          "Executivo",
          "Coordenador",
          "Gerente",
          "Diretor",
        ],
        assistente: [
          "Estágio",
          "Estagio",
          "Trainee",
          "Júnior",
          "Junior",
          "Pleno",
          "Sênior",
          "Senior",
          "Especialista",
          "Executivo",
          "Coordenador",
          "Gerente",
          "Diretor",
        ],
        junior: [
          "Estágio",
          "Estagio",
          "Trainee",
          "Assistente",
          "Pleno",
          "Sênior",
          "Senior",
          "Especialista",
          "Executivo",
          "Coordenador",
          "Gerente",
          "Diretor",
        ],
        pleno: [
          "Estágio",
          "Estagio",
          "Trainee",
          "Assistente",
          "Júnior",
          "Junior",
          "Sênior",
          "Senior",
          "Especialista",
          "Executivo",
          "Coordenador",
          "Gerente",
          "Diretor",
        ],
        senior: [
          "Estágio",
          "Estagio",
          "Trainee",
          "Assistente",
          "Júnior",
          "Junior",
          "Pleno",
          "Coordenador",
          "Gerente",
          "Diretor",
        ],
        diretor: [
          "Estágio",
          "Estagio",
          "Trainee",
          "Assistente",
          "Júnior",
          "Junior",
          "Pleno",
          "Sênior",
          "Senior",
          "Especialista",
        ],
        executivo: [
          "Estágio",
          "Estagio",
          "Trainee",
          "Assistente",
          "Júnior",
          "Junior",
          "Pleno",
          "Sênior",
          "Senior",
          "Especialista",
          "Coordenador",
          "Gerente",
        ],
      }

      if (exclusions[selectedSeniority as keyof typeof exclusions]) {
        const termsToExclude = exclusions[selectedSeniority as keyof typeof exclusions]
        const excludeTerms = termsToExclude.map((term) => `NOT ${term}`).join(" ")
        optimizedKeywords = `${optimizedKeywords} ${excludeTerms}`
      }
    }

    return optimizedKeywords
  }

  // Nova função para Indeed
  const buildIndeedOptimizedKeywords = (baseKeywords: string, selectedSeniority: string, workModel: string) => {
    if (!baseKeywords.trim()) return ""

    let optimizedKeywords = baseKeywords.trim()

    // Lógica de exclusão para Indeed usando operador -
    const exclusions = {
      estagio: [
        "Júnior",
        "Junior",
        "Pleno",
        "Sênior",
        "Senior",
        "Especialista",
        "Executivo",
        "Coordenador",
        "Gerente",
        "Diretor",
      ],
      junior: [
        "Estágio",
        "Estagio",
        "Trainee",
        "Pleno",
        "Sênior",
        "Senior",
        "Especialista",
        "Executivo",
        "Coordenador",
        "Gerente",
        "Diretor",
      ],
      pleno: [
        "Estágio",
        "Estagio",
        "Trainee",
        "Júnior",
        "Junior",
        "Sênior",
        "Senior",
        "Especialista",
        "Executivo",
        "Coordenador",
        "Gerente",
        "Diretor",
      ],
      senior: ["Estágio", "Estagio", "Trainee", "Júnior", "Junior", "Pleno", "Coordenador", "Gerente", "Diretor"],
      especialista: ["Estágio", "Estagio", "Trainee", "Júnior", "Junior", "Pleno"],
    }

    if (selectedSeniority !== "any" && exclusions[selectedSeniority as keyof typeof exclusions]) {
      const termsToExclude = exclusions[selectedSeniority as keyof typeof exclusions]
      const excludeTerms = termsToExclude.map((term) => `-${term}`).join(" ")
      optimizedKeywords = `${optimizedKeywords} ${excludeTerms}`
    }

    // Adicionar palavra-chave remoto se selecionado
    if (workModel === "remoto") {
      optimizedKeywords = `${optimizedKeywords} remoto`
    }

    return optimizedKeywords
  }

  const generateLinkedInUrl = () => {
    if (!linkedinKeywords.trim()) {
      toast({
        title: "Campo obrigatório",
        description: "Por favor, insira pelo menos uma palavra-chave para busca.",
        variant: "destructive",
      })
      return
    }

    const baseUrl = "https://www.linkedin.com/jobs/search/"
    const params = new URLSearchParams()

    // Construir keywords otimizadas
    const optimizedKeywords = buildLinkedInOptimizedKeywords(linkedinKeywords, linkedinSeniority, linkedinSearchMode)
    params.append("keywords", optimizedKeywords)

    // Adicionar localização se especificada
    if (linkedinLocation.trim()) {
      params.append("location", linkedinLocation.trim())
    }

    // Adicionar filtro de tempo se especificado
    if (linkedinTimePosted !== "any") {
      params.append("f_TPR", linkedinTimePosted)
    }

    // Adicionar modelo de trabalho se especificado
    if (linkedinWorkModel !== "any") {
      const workModelMap = { presencial: "1", remoto: "2", hibrido: "3" }
      params.append("f_WT", workModelMap[linkedinWorkModel as keyof typeof workModelMap])
    }

    // Nova lógica de mapeamento f_E - cada nível tem seu próprio código
    if (linkedinSeniority !== "any") {
      const seniorityMap = {
        estagio: "1", // Internship
        assistente: "2", // Entry level
        junior: "3", // Associate
        pleno: "4", // Mid-Senior level
        senior: "4", // Mid-Senior level (LinkedIn agrupa Pleno e Sênior sob o mesmo código)
        diretor: "5", // Director
        executivo: "6", // Executive
      }
      params.append("f_E", seniorityMap[linkedinSeniority as keyof typeof seniorityMap])
    }

    // Gerar URL final (sem currentJobId - URL sempre limpa)
    const finalUrl = `${baseUrl}?${params.toString()}`
    setLinkedinGeneratedUrl(finalUrl)

    toast({
      title: "Link LinkedIn gerado!",
      description: "Sua URL de busca limpa foi criada usando apenas filtros nativos.",
    })
  }

  const generateIndeedUrl = () => {
    if (!indeedKeywords.trim()) {
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
    const optimizedKeywords = buildIndeedOptimizedKeywords(indeedKeywords, indeedSeniority, indeedWorkModel)
    params.append("q", optimizedKeywords)

    // Localização
    let locationValue = indeedLocation.trim()
    if (indeedWorkModel === "remoto" && !locationValue) {
      locationValue = "remoto"
    }
    if (locationValue) {
      params.append("l", locationValue)
    }

    // Filtro de data - CORRIGIDO
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

  const copyToClipboard = async (url: string, platform: string) => {
    try {
      await navigator.clipboard.writeText(url)
      toast({
        title: "Copiado!",
        description: `Link do ${platform} copiado para a área de transferência.`,
      })
    } catch (err) {
      toast({
        title: "Erro ao copiar",
        description: "Não foi possível copiar o link.",
        variant: "destructive",
      })
    }
  }

  const openInBrowser = (url: string) => {
    window.open(url, "_blank")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Aras Finder</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-6">
            O buscador inteligente de vagas que constrói URLs precisas no LinkedIn e Indeed usando operadores booleanos
            e filtros avançados.
          </p>
          <div className="flex justify-center mb-6">
            <img
              src="/favicon.png"
              alt="Aras Finder - Mascote Pixelado"
              className="w-24 h-24 pixelated"
              style={{ imageRendering: "pixelated" }}
            />
          </div>
        </div>

        <Tabs defaultValue="linkedin" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="linkedin" className="flex items-center gap-2">
              <Search className="h-4 w-4" />
              LinkedIn
            </TabsTrigger>
            <TabsTrigger value="indeed" className="flex items-center gap-2">
              <Briefcase className="h-4 w-4" />
              Indeed
            </TabsTrigger>
          </TabsList>

          {/* Aba LinkedIn */}
          <TabsContent value="linkedin">
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Search className="h-5 w-5" />
                  Aras Finder - LinkedIn
                </CardTitle>
                <CardDescription>Configure sua busca no LinkedIn com operadores booleanos avançados.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="linkedin-keywords" className="text-sm font-medium">
                    Cargo, Palavra-chave ou Tecnologia *
                  </Label>
                  <Input
                    id="linkedin-keywords"
                    type="text"
                    placeholder="Ex: Engenheiro de Software, Product Manager, Python"
                    value={linkedinKeywords}
                    onChange={(e) => setLinkedinKeywords(e.target.value)}
                  />
                </div>

                <div className="space-y-3">
                  <Label className="text-sm font-medium">Senioridade Desejada</Label>
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
                    <Label className="text-sm font-medium">Publicado há</Label>
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
                      Localidade
                    </Label>
                    <Input
                      id="linkedin-location"
                      type="text"
                      placeholder="Ex: São Paulo, Brasil"
                      value={linkedinLocation}
                      onChange={(e) => setLinkedinLocation(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Modo de Busca</Label>
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

                  {linkedinSearchMode === "poderoso" && (
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                      <div className="flex items-start gap-2">
                        <span className="text-yellow-600 text-lg">⚠️</span>
                        <div className="text-sm text-yellow-800">
                          <p className="font-medium mb-1">Aviso:</p>
                          <p>
                            O modo Poderoso pode causar um bug visual na página do LinkedIn, que talvez mostre filtros
                            de senioridade incorretos selecionados (como "Júnior"). Apesar disso, a lista de vagas ainda
                            será filtrada corretamente pelo texto e pelos operadores NOT, tornando a busca mais
                            rigorosa.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Modelo de Trabalho</Label>
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

                <Button
                  onClick={generateLinkedInUrl}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 text-lg"
                  size="lg"
                >
                  <Search className="mr-2 h-5 w-5" />
                  Gerar Link LinkedIn
                </Button>
              </CardContent>
            </Card>

            {linkedinGeneratedUrl && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-green-700">URL LinkedIn Gerada!</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Textarea value={linkedinGeneratedUrl} readOnly className="min-h-[100px] text-sm bg-gray-50" />
                  <div className="flex gap-3">
                    <Button
                      onClick={() => openInBrowser(linkedinGeneratedUrl)}
                      className="flex-1 bg-blue-600 hover:bg-blue-700"
                    >
                      <ExternalLink className="mr-2 h-4 w-4" />
                      Abrir no LinkedIn
                    </Button>
                    <Button
                      onClick={() => copyToClipboard(linkedinGeneratedUrl, "LinkedIn")}
                      variant="outline"
                      className="flex-1"
                    >
                      <Copy className="mr-2 h-4 w-4" />
                      Copiar Link
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Aba Indeed */}
          <TabsContent value="indeed">
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Briefcase className="h-5 w-5" />
                  Aras Finder - Indeed
                </CardTitle>
                <CardDescription>Configure sua busca no Indeed com operadores de exclusão específicos.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="indeed-keywords" className="text-sm font-medium">
                    O quê? (Cargo, palavra-chave ou empresa) *
                  </Label>
                  <Input
                    id="indeed-keywords"
                    type="text"
                    placeholder="Ex: Engenheiro de Dados, Analista de Sistemas"
                    value={indeedKeywords}
                    onChange={(e) => setIndeedKeywords(e.target.value)}
                  />
                </div>

                <div className="space-y-3">
                  <Label className="text-sm font-medium">Senioridade Desejada</Label>
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
                    <Label className="text-sm font-medium">Publicado há</Label>
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
                      Onde? (Cidade, estado ou 'remoto')
                    </Label>
                    <Input
                      id="indeed-location"
                      type="text"
                      placeholder="Ex: São Paulo, SP ou remoto"
                      value={indeedLocation}
                      onChange={(e) => setIndeedLocation(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Modelo de Trabalho</Label>
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
                  onClick={generateIndeedUrl}
                  className="w-full bg-orange-600 hover:bg-orange-700 text-white py-3 text-lg"
                  size="lg"
                >
                  <Briefcase className="mr-2 h-5 w-5" />
                  Gerar Link Indeed
                </Button>
              </CardContent>
            </Card>

            {indeedGeneratedUrl && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-green-700">URL Indeed Gerada!</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Textarea value={indeedGeneratedUrl} readOnly className="min-h-[100px] text-sm bg-gray-50" />
                  <div className="flex gap-3">
                    <Button
                      onClick={() => openInBrowser(indeedGeneratedUrl)}
                      className="flex-1 bg-orange-600 hover:bg-orange-700"
                    >
                      <ExternalLink className="mr-2 h-4 w-4" />
                      Abrir no Indeed
                    </Button>
                    <Button
                      onClick={() => copyToClipboard(indeedGeneratedUrl, "Indeed")}
                      variant="outline"
                      className="flex-1"
                    >
                      <Copy className="mr-2 h-4 w-4" />
                      Copiar Link
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>

        {/* Informações sobre as diferenças */}
        <Card className="mt-6 bg-blue-50 border-blue-200">
          <CardHeader>
            <CardTitle className="text-blue-800 text-lg">Como o Aras Finder Otimiza Suas Buscas</CardTitle>
          </CardHeader>
          <CardContent className="text-blue-700 space-y-3">
            <div>
              <p className="text-sm font-semibold">LinkedIn:</p>
              <p className="text-sm">• Modo Preciso: Usa apenas filtros nativos (f_E, f_TPR, f_WT)</p>
              <p className="text-sm">• Modo Poderoso: Combina filtros nativos + operadores NOT</p>
              <p className="text-sm">• Keywords limpas ou com exclusões conforme o modo</p>
            </div>
            <div>
              <p className="text-sm font-semibold">Indeed:</p>
              <p className="text-sm">• Usa operador "-" para exclusões (ex: -Pleno -Senior)</p>
              <p className="text-sm">• Trabalho remoto via palavra-chave + parâmetro especial (sc)</p>
              <p className="text-sm">• Filtro de data via parâmetro "fromage" (1, 3, 7, 14 dias)</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
