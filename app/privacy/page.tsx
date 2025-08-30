// ArasFinder/app/privacy/page.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from 'next/link'

export default function Privacy() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <Link href="/" className="text-blue-600 hover:text-blue-800 transition-colors">&larr; Voltar para a Home</Link>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 my-4">Política de Privacidade</h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">Última atualização: {new Date().toLocaleDateString('pt-BR')}</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">1. Introdução</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-gray-700 dark:text-gray-300">
            <p>O <strong>Aras Finder</strong> é uma ferramenta de busca inteligente de vagas que respeita profundamente a sua privacidade. Esta política explica como recolhemos, utilizamos e protegemos as suas informações quando utiliza o nosso serviço.</p>
            <p>O nosso compromisso é fornecer uma experiência transparente e segura, garantindo que compreenda exatamente como os seus dados são tratados.</p>
          </CardContent>
        </Card>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="text-2xl">2. Recolha de Informações</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-gray-700 dark:text-gray-300">
            <p><strong>Importante:</strong> O Aras Finder <strong>NÃO recolhe nem armazena</strong> diretamente os dados de pesquisa (cargos, palavras-chave, localizações, etc.) que insere na nossa ferramenta.</p>
            <p>Toda a lógica de construção das URLs de busca acontece exclusivamente no seu navegador. Os seus termos de pesquisa nunca são enviados para os nossos servidores, garantindo total confidencialidade das suas buscas de emprego.</p>
            <p>O que <strong>não recolhemos</strong>:</p>
            <ul className="list-disc list-inside ml-4 space-y-2">
              <li>Termos de pesquisa específicos</li>
              <li>Localizações geográficas inseridas</li>
              <li>Filtros de experiência ou tipo de contrato</li>
              <li>Histórico de buscas realizadas</li>
            </ul>
          </CardContent>
        </Card>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="text-2xl">3. Cookies e Tecnologias de Rastreamento</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-gray-700 dark:text-gray-300">
            <p><strong>O que são cookies?</strong> Cookies são pequenos ficheiros de texto que são armazenados no seu dispositivo quando visita um website. Eles ajudam a melhorar a sua experiência online e fornecem informações úteis aos proprietários dos sites.</p>
            
            <p><strong>Cookies que utilizamos:</strong></p>
            
            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
              <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">Google Analytics (G-5J9T27K1SZ)</h4>
              <p className="text-sm">Utilizamos o Google Analytics para analisar o tráfego do nosso site e compreender como os utilizadores interagem com a nossa ferramenta. Esta informação ajuda-nos a melhorar continuamente o serviço.</p>
            </div>


          </CardContent>
        </Card>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="text-2xl">4. Como Gerir os Cookies</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-gray-700 dark:text-gray-300">
            <p>Pode controlar e gerir os cookies através das configurações do seu navegador. Aqui estão as instruções para os navegadores mais populares:</p>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">Chrome</h4>
                <p className="text-sm">Configurações → Privacidade e Segurança → Cookies e outros dados do site</p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">Firefox</h4>
                <p className="text-sm">Opções → Privacidade e Segurança → Cookies e dados do site</p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">Safari</h4>
                <p className="text-sm">Preferências → Privacidade → Cookies e dados do website</p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">Edge</h4>
                <p className="text-sm">Configurações → Cookies e permissões do site</p>
              </div>
            </div>

            <p className="mt-4"><strong>Nota:</strong> Desativar cookies pode afetar a funcionalidade de alguns serviços, incluindo a personalização de anúncios.</p>
          </CardContent>
        </Card>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="text-2xl">5. Links para Terceiros</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-gray-700 dark:text-gray-300">
            <p>O Aras Finder gera links para plataformas de terceiros, nomeadamente:</p>
            <ul className="list-disc list-inside ml-4 space-y-2">
              <li><strong>LinkedIn:</strong> <a href="https://www.linkedin.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 transition-colors">Política de Privacidade do LinkedIn</a></li>
              <li><strong>Indeed:</strong> <a href="https://www.indeed.com/legal/privacy" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 transition-colors">Política de Privacidade do Indeed</a></li>
            </ul>
            <p>Quando clica nestes links, está a sair do nosso site e a entrar em plataformas com as suas próprias políticas de privacidade. Recomendamos que leia as políticas destes serviços antes de os utilizar.</p>
          </CardContent>
        </Card>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="text-2xl">6. Alterações à Política</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-gray-700 dark:text-gray-300">
            <p>Esta política de privacidade pode ser atualizada periodicamente para refletir mudanças na nossa prática de privacidade ou para cumprir novos requisitos legais.</p>
            <p>Quando fizermos alterações significativas, atualizaremos a data de "Última atualização" no topo desta página e, se necessário, notificaremos os utilizadores através do nosso site.</p>
            <p>Recomendamos que reveja esta política regularmente para se manter informado sobre como protegemos a sua privacidade.</p>
          </CardContent>
        </Card>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="text-2xl">7. Contacto</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-gray-700 dark:text-gray-300">
            <p>Se tiver dúvidas sobre esta política de privacidade ou sobre como tratamos os seus dados, não hesite em contactar-nos:</p>
            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
              <p className="font-semibold">Email:</p>
              <a href="mailto:contato.arasfinder@gmail.com" className="text-blue-600 hover:text-blue-800 transition-colors">contato.arasfinder@gmail.com</a>
            </div>
            <p>Responderemos às suas questões no prazo de 48 horas úteis.</p>
          </CardContent>
        </Card>

        <div className="text-center mt-8">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Obrigado por confiar no Aras Finder. A sua privacidade é importante para nós.
          </p>
        </div>
      </div>
    </div>
  )
}
