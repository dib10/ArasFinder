"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Search, Briefcase, Heart, Coffee } from "lucide-react"
import { LinkedInSearchForm } from "@/components/domain/LinkedInSearchForm"
import { IndeedSearchForm } from "@/components/domain/IndeedSearchForm"
import { ThemeToggle } from "@/components/ui/ThemeToggle"
import { useState } from "react"

export default function JobSearchOptimizer() {
  const [keywords, setKeywords] = useState("")
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8 relative">

          <div className="absolute top-0 right-0">
            <ThemeToggle />
          </div>
          
          <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-2">Aras Finder</h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-6">
            O buscador inteligente de vagas que constrói URLs precisas no LinkedIn e Indeed usando operadores booleanos
            e filtros avançados.
          </p>
          <div className="flex justify-center mb-6">
            <img
              src="/gizmo-3d.png"
              alt="Aras Finder - Gizmo Pixelado"
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

          <TabsContent value="linkedin">
            <LinkedInSearchForm keywords={keywords} setKeywords={setKeywords} />
          </TabsContent>

          <TabsContent value="indeed">
            <IndeedSearchForm keywords={keywords} setKeywords={setKeywords} />
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
              <p className="text-sm">• Modo Poderoso: Combina filtros nativos + operadores NOT - Em testes, pode apresentar inconsistências</p>
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

        {/* Footer com créditos e link Buy me a coffee */}
        <div className="mt-8 text-center space-y-4">
          <div className="flex items-center justify-center gap-2 text-gray-600">
            <span>Feito com</span>
            <Heart className="h-4 w-4 text-red-500 fill-current" />
            <span>por</span>
            <a
              href="https://github.com/dib10"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-blue-600 hover:text-blue-800 transition-colors"
            >
              dib10
            </a>
          </div>
          
          <div>
            <a
              href="https://coff.ee/dib10"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg font-medium transition-colors"
            >
              <Coffee className="h-4 w-4" />
              Buy me a coffee
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
