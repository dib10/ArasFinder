import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Search } from "lucide-react"
import { useLinkedInSearch } from "@/hooks/useLinkedInSearch"
import { GeneratedUrlCard } from "./GeneratedUrlCard"
import { 
  seniorityOptions, 
  linkedinTimePostedOptions, 
  workModelOptions, 
  searchModeOptions 
} from "@/config/filters"

interface LinkedInSearchFormProps {
  keywords: string
  setKeywords: (value: string) => void
}

export function LinkedInSearchForm({ keywords, setKeywords }: LinkedInSearchFormProps) {
  const {
    linkedinSeniority,
    linkedinTimePosted,
    linkedinLocation,
    linkedinWorkModel,
    linkedinGeneratedUrl,
    linkedinSearchMode,
    setLinkedinSeniority,
    setLinkedinTimePosted,
    setLinkedinLocation,
    setLinkedinWorkModel,
    setLinkedinSearchMode,
    generateLinkedInUrl,
  } = useLinkedInSearch()

  return (
    <>
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="h-5 w-5" />
            Aras Finder - LinkedIn
          </CardTitle>
          <CardDescription>
            Configure sua busca no LinkedIn com operadores booleanos avançados.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="linkedin-keywords" className="text-sm font-medium">
              Cargo, Palavra-chave ou Tecnologia *
            </Label>
            <Input
              id="linkedin-keywords"
              type="text"
              placeholder="Ex: Engenheiro de Software, Python, AWS"
              value={keywords}
              onChange={(e) => setKeywords(e.target.value)}
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
                      O modo Poderoso está em testes. A busca será filtrada corretamente pelos operadores NOT, tornando-a mais rigorosa.
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
            onClick={() => generateLinkedInUrl(keywords)}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 text-lg"
            size="lg"
          >
            <Search className="mr-2 h-5 w-5" />
            Gerar Link LinkedIn
          </Button>
        </CardContent>
      </Card>

      {linkedinGeneratedUrl && (
        <GeneratedUrlCard
          url={linkedinGeneratedUrl}
          platform="LinkedIn"
          title="URL LinkedIn Gerada!"
        />
      )}
    </>
  )
} 