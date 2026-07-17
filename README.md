# Aras Finder

O **Aras Finder** é uma ferramenta web que monta URLs de busca de vagas para o **LinkedIn** e o **Indeed**. Ela combina palavras-chave, exclusões e filtros de cada plataforma para que a pessoa usuária possa abrir uma busca mais direcionada ou copiar o link gerado.

[**Acessar a aplicação em produção: aras-finder.vercel.app**](https://aras-finder.vercel.app/)

> A aplicação não coleta vagas, não faz scraping, não envia candidaturas e não consulta uma API de empregos. Ela constrói a URL no navegador; a pesquisa e os resultados são exibidos pela plataforma escolhida.

## O que a ferramenta oferece

- Busca para LinkedIn e Indeed em abas independentes.
- Palavras-chave com operador `AND` ou `OR` a partir de valores separados por vírgula.
- Exclusões manuais de termos indesejados.
- Filtros de senioridade, data de publicação, localidade e modalidade de trabalho.
- Modo **Preciso** e modo **Poderoso (experimental)** para LinkedIn.
- Filtro de **Candidatura Simplificada** (Easy Apply) no LinkedIn.
- Interface em português do Brasil e inglês, além de tema claro/escuro.
- Ação para abrir a URL gerada em outra aba ou copiá-la para a área de transferência.

## Tecnologias

| Área | Tecnologias usadas |
| --- | --- |
| Aplicação | Next.js 15, React 19 e TypeScript |
| Estilos | Tailwind CSS e `tailwindcss-animate` |
| Componentes | shadcn/ui construído sobre Radix UI |
| Formulários e estado | Hooks React locais; React Hook Form e Zod constam nas dependências, mas não participam do fluxo de busca atual |
| Internacionalização | `next-intl` (`pt-BR` e `en`) |
| Tema | `next-themes` |
| Ícones | Lucide React |
| Métricas | Google Analytics, carregado no layout da aplicação |

## Como executar localmente

### Pré-requisitos

- Node.js em uma versão LTS atual.
- npm. O repositório também contém um `pnpm-lock.yaml`, mas os comandos abaixo usam o `package-lock.json`.

### Instalação

```bash
npm install
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000). A localidade padrão é `pt-BR`; a interface também está disponível em inglês.

Para gerar a versão de produção:

```bash
npm run build
npm run start
```

Não há variáveis de ambiente exigidas pelo código atual nem uma suíte de testes automatizados configurada.

## Como a busca é construída

1. A página inicial mantém as palavras-chave e os termos a excluir compartilhados entre as abas.
2. Cada formulário mantém os filtros próprios de sua plataforma em um hook React.
3. `lib/search-builder.ts` prepara as palavras-chave e acrescenta exclusões automáticas ou manuais.
4. `useLinkedInSearch.ts` ou `useIndeedSearch.ts` converte os filtros em parâmetros de URL com `URLSearchParams`.
5. `GeneratedUrlCard` apresenta o endereço final para abrir ou copiar.

As entradas de busca permanecem no estado do navegador. Não há rotas de API, banco de dados ou servidor que receba termos, localidade ou filtros da pessoa usuária. O layout, porém, carrega o Google Analytics para métricas de tráfego.

## Regras de palavras-chave

Quando não há operadores booleanos escritos manualmente, os termos separados por vírgula são colocados entre aspas:

| Entrada | Operador padrão | Com a opção `Vírgula = OR` ativada |
| --- | --- | --- |
| `React, TypeScript` | `"React" AND "TypeScript"` | `"React" OR "TypeScript"` |

Se o texto já contém `AND`, `OR` ou `NOT`, o construtor preserva a expressão informada, sem reformatá-la. Os termos do campo de exclusão devem ser separados por vírgula.

## Filtros do LinkedIn

O LinkedIn recebe uma URL com `keywords`, `location` e, quando selecionados, os parâmetros nativos `f_TPR`, `f_WT`, `f_E` e `f_AL`.

| Filtro | Regra aplicada à URL |
| --- | --- |
| Palavras-chave | Mantém a expressão booleanamente preparada pelo construtor. |
| Exclusões manuais | Adiciona `NOT "termo"` para cada termo informado. |
| Senioridade | Adiciona o filtro nativo `f_E`. Estágio = `1`, Assistente = `2`, Júnior = `3`, Pleno = `4`, Sênior = `4`, Diretor = `5` e Executivo = `6`. O LinkedIn agrupa Pleno e Sênior no valor `4`. |
| Data de publicação | Adiciona `f_TPR`: 15 min (`r900`), 30 min (`r1800`), 1 h (`r3600`), 5 h (`r18000`), 10 h (`r36000`), 24 h (`r86400`), 1 semana (`r604800`) ou 1 mês (`r2592000`). |
| Modalidade | Adiciona `f_WT`: presencial = `1`, remoto = `2` e híbrido = `3`. |
| Localidade | Usa o campo preenchido. Sem valor, usa `Brazil` na interface em português e `United States` na interface em inglês. |
| Candidatura Simplificada | Quando ativada, adiciona `f_AL=true`. |

### Modos de busca do LinkedIn

- **Preciso (recomendado):** usa as palavras-chave, exclusões manuais e filtros nativos da plataforma. A escolha de senioridade continua sendo enviada em `f_E`.
- **Poderoso (experimental):** mantém tudo do modo Preciso e acrescenta exclusões automáticas de senioridade nas palavras-chave, como `NOT "Júnior"` e `NOT "Estágio"`. As listas variam conforme a senioridade e o idioma, em `config/filters.ts`.

O modo Poderoso é mais restritivo e pode ter resultados diferentes do esperado porque a interpretação final dos operadores é responsabilidade do LinkedIn.

## Filtros do Indeed

O Indeed recebe `q` (consulta), `l` (localidade) e, quando aplicável, `fromage` e `sc`.

| Filtro | Regra aplicada à URL |
| --- | --- |
| Palavras-chave | Termos são preparados pelo construtor e enviados em `q`. |
| Exclusões manuais | Adiciona `-"termo"` para cada termo informado. |
| Senioridade | Não há parâmetro nativo de senioridade na URL. Para Estágio, Júnior, Pleno e Sênior, a ferramenta acrescenta termos negativos automáticos, localizados em `config/filters.ts`. |
| Data de publicação | Adiciona `fromage`: últimas 5 h (`last`), 1 dia (`1`), 3 dias (`3`), 7 dias (`7`) ou 14 dias (`14`). |
| Remoto | Adiciona a palavra `"remoto"` ou `"remote"` à consulta e o parâmetro `sc` usado pela implementação atual. |
| Localidade | Usa o campo preenchido. Sem valor, a interface em português usa `Brasil`; na interface em inglês, a busca remota usa `remote`. |

### Observações importantes sobre o Indeed

- As opções **Assistente**, **Diretor** e **Executivo** aparecem no formulário, mas não têm uma lista de exclusões automáticas configurada para o Indeed. Portanto, hoje elas não acrescentam um filtro de senioridade à URL.
- Apenas a opção **Remoto** altera a consulta do Indeed. As opções **Presencial** e **Híbrido** ainda não geram parâmetros específicos.
- Depois de preparar a consulta, a implementação remove os operadores explícitos `AND` e `OR` do texto enviado ao Indeed. Assim, embora o seletor `Vírgula = OR` exista na interface, ele não permanece como um operador explícito na URL final dessa plataforma.

Esses pontos são limitações atuais da implementação, registradas aqui para que o comportamento público do projeto corresponda ao código.

## Estrutura de pastas

```text
app/
  [locale]/                 # Rotas e páginas traduzidas
    page.tsx                # Página inicial e abas de busca
    como-funciona/          # Explicação da ferramenta
    faq/                    # Perguntas frequentes
    sobre/, privacy/, contact/
  globals.css               # Estilos globais efetivamente importados

components/
  domain/                   # Componentes de negócio: formulários, URL, rodapé e apoio
  ui/                       # Primitivos shadcn/ui e controles de idioma/tema
  theme-provider.tsx        # Integração com next-themes

config/
  filters.ts                # Opções, mapeamentos e listas de exclusões por idioma

hooks/
  useLinkedInSearch.ts      # Estado e geração da URL do LinkedIn
  useIndeedSearch.ts        # Estado e geração da URL do Indeed
  use-toast.ts              # Notificações da interface

lib/
  search-builder.ts         # Regras de operadores, exclusões e sanitização
  utils.ts                  # Utilitário de classes Tailwind

i18n/                       # Configuração de rotas e requisições traduzidas
messages/                   # Textos pt-BR e en
public/                     # Ícones, imagens e arquivos públicos
```

`styles/globals.css` também existe no repositório, mas o layout atual importa `app/globals.css`.

## Onde alterar cada comportamento

| Necessidade | Arquivo principal |
| --- | --- |
| Adicionar ou traduzir textos | `messages/pt-BR.json` e `messages/en.json` |
| Alterar filtros, valores de URL ou exclusões automáticas | `config/filters.ts` |
| Alterar a formação das palavras-chave | `lib/search-builder.ts` |
| Alterar a URL-base, padrões de localidade ou parâmetros do LinkedIn | `hooks/useLinkedInSearch.ts` |
| Alterar a URL-base, padrões de localidade ou parâmetros do Indeed | `hooks/useIndeedSearch.ts` |
| Alterar campos e apresentação dos formulários | `components/domain/LinkedInSearchForm.tsx` e `components/domain/IndeedSearchForm.tsx` |
| Alterar rotas, SEO e Analytics | `app/[locale]/layout.tsx` e `middleware.ts` |

## Privacidade e plataformas externas

O Aras Finder monta a URL no cliente e só direciona a pessoa usuária para o LinkedIn ou Indeed quando ela escolhe abrir o link. A partir desse momento, a busca é submetida às políticas e à interpretação de filtros da plataforma externa.

Os parâmetros de URL usados pelas plataformas podem mudar sem aviso. Ao modificar os filtros, valide sempre uma URL gerada diretamente no LinkedIn ou no Indeed.

## Licença

Este repositório ainda não inclui um arquivo de licença. Antes de reutilizar ou redistribuir o código, a pessoa mantenedora deve definir uma licença apropriada.
