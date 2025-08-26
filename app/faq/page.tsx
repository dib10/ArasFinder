// ArasFinder/app/faq/page.tsx
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import Link from 'next/link'

export default function FAQ() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <Link href="/" className="text-blue-600 hover:text-blue-800 transition-colors">&larr; Voltar para a Home</Link>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 my-4">Perguntas Frequentes (FAQ)</h1>
        </div>

        <Accordion type="single" collapsible className="w-full bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
          <AccordionItem value="item-1">
            <AccordionTrigger>O Aras Finder é gratuito?</AccordionTrigger>
            <AccordionContent>
              Sim, a ferramenta é 100% gratuita. O projeto é mantido através do apoio da comunidade. Se a ferramenta lhe for útil, pode considerar fazer uma doação através do link "Buy me a coffee" no rodapé.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>Porque devo usar o Aras Finder em vez de pesquisar diretamente no LinkedIn/Indeed?</AccordionTrigger>
            <AccordionContent>
              O Aras Finder constrói URLs de busca muito mais precisas do que as que se conseguem criar manualmente. Ele usa operadores booleanos (como NOT e "-") para excluir termos indesejados, algo que a interface padrão das plataformas não oferece de forma simples. Isto resulta em menos "ruído" e mais vagas relevantes.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>Os meus dados de pesquisa são guardados?</AccordionTrigger>
            <AccordionContent>
              Não. O Aras Finder não armazena nenhuma informação sobre as suas pesquisas. Toda a lógica de construção da URL acontece no seu navegador. A sua privacidade é totalmente respeitada.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-4">
            <AccordionTrigger>O que significa "Modo Poderoso (Experimental)"?</AccordionTrigger>
            <AccordionContent>
              O Modo Poderoso adiciona exclusões automáticas à sua busca (ex: se procura "Pleno", ele exclui "Júnior" e "Estágio"). É "experimental" porque, embora seja muito eficaz, o algoritmo do LinkedIn pode por vezes interpretar estas buscas complexas de formas inesperadas. Recomendamos o Modo Preciso para a maioria dos casos.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  )
}


