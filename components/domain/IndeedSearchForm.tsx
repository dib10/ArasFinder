import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Briefcase } from "lucide-react"
import { useIndeedSearch } from "@/hooks/useIndeedSearch"
import { GeneratedUrlCard } from "./GeneratedUrlCard"
import { 
  seniorityOptions, 
  indeedTimePostedOptions, 
  workModelOptions 
} from "@/config/filters"

export function IndeedSearchForm() {
  const {
    indeedKeywords,
    indeedSeniority,
    indeedTimePosted,
    indeedLocation,
    indeedWorkModel,
    indeedGeneratedUrl,
    setIndeedKeywords,
    setIndeedSeniority,
    setIndeedTimePosted,
    setIndeedLocation,
    setIndeedWorkModel,
    generateIndeedUrl,
  } = useIndeedSearch()

  return (
    <>
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Briefcase className="h-5 w-5" />
            Aras Finder - Indeed
          </CardTitle>
          <CardDescription>
            Configure sua busca no Indeed com operadores de exclusão específicos.
          </CardDescription>
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
        <GeneratedUrlCard
          url={indeedGeneratedUrl}
          platform="Indeed"
          title="URL Indeed Gerada!"
        />
      )}
    </>
  )
} 