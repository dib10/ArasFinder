// ArasFinder/app/sobre/page.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from 'next/link'

export default function Sobre() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
            <Link href="/" className="text-blue-600 hover:text-blue-800 transition-colors">&larr; Voltar para a Home</Link>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 my-4">Sobre o Aras Finder</h1>
            <img
              src="/gizmo-3d.png"
              alt="Aras Finder - Gizmo Pixelado"
              className="w-24 h-24 pixelated mx-auto my-4"
              style={{ imageRendering: "pixelated" }}
            />
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">A Nossa Missão</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-gray-700 dark:text-gray-300">
            <p>A busca por uma nova oportunidade de carreira pode ser um processo desgastante e repetitivo. Muitas vezes, as plataformas de emprego mostram vagas que não correspondem exatamente ao que procuramos, fazendo-nos perder tempo a filtrar manualmente os resultados.</p>
            <p>O <strong>Aras Finder</strong> nasceu da necessidade de simplificar e otimizar este processo. A nossa missão é dar aos profissionais as ferramentas para que encontrem as vagas certas de forma mais rápida e inteligente, utilizando o poder da tecnologia para criar buscas que as interfaces padrão nem sempre permitem.</p>
          </CardContent>
        </Card>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="text-2xl">O Criador</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-gray-700 dark:text-gray-300">
            <p>Este projeto foi desenvolvido por <a href="https://github.com/dib10" target="_blank" rel="noopener noreferrer" className="font-semibold text-blue-600 hover:text-blue-800 transition-colors">dib10</a>, um entusiasta de tecnologia apaixonado por criar soluções que resolvem problemas reais.</p>
          </CardContent>
        </Card>

      </div>
    </div>
  )
}


