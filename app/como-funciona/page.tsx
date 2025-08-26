// ArasFinder/app/como-funciona/page.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from 'next/link';

export default function ComoFunciona() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <Link href="/" className="text-blue-600 hover:text-blue-800 transition-colors">&larr; Voltar para a Home</Link>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 my-4">Como o Aras Finder Funciona</h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Aprenda a potenciar a sua busca de vagas e a encontrar exatamente o que procura com a nossa ferramenta de otimização.
          </p>
        </div>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-2xl">Como Construímos a Sua Busca</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-gray-700 dark:text-gray-300">
            <p>O Aras Finder transforma as suas palavras-chave numa busca de alta precisão. Se você inserir <strong>Engenheiro de Software, React</strong>, a ferramenta converte isso em <strong>"Engenheiro de Software" AND "React"</strong> para o LinkedIn, garantindo que ambos os termos estejam presentes nos resultados.</p>
            <p>O verdadeiro poder da ferramenta está na capacidade de <strong>excluir</strong> termos indesejados, limpando os resultados e poupando o seu tempo.</p>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-2xl">Exclusão Manual e Automática</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-gray-700 dark:text-gray-300">
            <div>
              <h3 className="font-semibold text-lg mb-2">Exclusão Manual de Palavras-chave</h3>
              <p>Com o campo "Excluir Palavras-chave", você tem controlo total. Se quiser vagas de "React" mas não de "Angular" ou "Vue", basta adicioná-las no campo de exclusão. A ferramenta irá adicionar <strong>NOT "Angular" NOT "Vue"</strong> (para o LinkedIn) ou <strong>-"Angular" -"Vue"</strong> (para o Indeed) à sua busca.</p>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-2">Exclusão Automática de Senioridade</h3>
              <p>Para aumentar a precisão, a ferramenta também realiza exclusões automáticas com base na senioridade que você seleciona. Se você escolher "Pleno" no LinkedIn (em Modo Poderoso) ou no Indeed, a ferramenta adicionará exclusões como <strong>NOT "Júnior"</strong> e <strong>NOT "Estágio"</strong> para refinar ainda mais os resultados.</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Modos de Busca e Otimizações</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-gray-700 dark:text-gray-300">
              <div>
                <h4 className="font-semibold">LinkedIn: Modo Preciso vs. Modo Poderoso</h4>
                <p>O <strong>Modo Preciso</strong> usa apenas os filtros nativos da plataforma (como nível de experiência), enquanto o <strong>Modo Poderoso (Experimental)</strong> adiciona a exclusão automática de senioridade para uma filtragem dupla e mais rigorosa.</p>
              </div>
              <div>
                <h4 className="font-semibold">Indeed: Otimização Direta</h4>
                <p>No Indeed, a ferramenta aplica sempre a exclusão de senioridade automática juntamente com as suas exclusões manuais, usando o operador <strong>"-"</strong> para garantir resultados limpos e diretos.</p>
              </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}


