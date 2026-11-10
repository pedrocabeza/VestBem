# Mapeamento do VestBem

## Estrutura em execução

- `Front_wVestBem`: aplicação React/Vite. `src/main.jsx` monta `src/ProductApp.jsx` e carrega os estilos.
- `Back_wVestBem`: API Express. A página inicial consome campanhas e registra e-mails de interesse; doações e recompensas continuam como demonstrações em `localStorage`.
- `src/HomeFeatures.jsx` e `src/experience.css`: painel interativo do início, campanhas, guia por categoria, formulário conectado à API e faixa do GitHub.
- `src/MemberPages.jsx`, `src/badges.js` e `src/member.css`: doação, coleção de insígnias e perfil, com aparência de emblemas bordados e progresso pessoal.
- `src/InteriorExtras.jsx`: diretório de pontos, checklist, detalhes de causas, jornada do projeto e distribuição de avaliações.
- `shared/points.mjs`: cálculo usado pelo front e pela API. Cada item inteiro vale 10 pontos; são aceitos de 1 a 10.000 itens por registro.
- `src/App.jsx`: landing page anterior, preservada no repositório, mas não carregada por `main.jsx`.
- `public/assets`: logotipo e fotos da equipe.

## Telas e fluxos

| Rota | Conteúdo e interação |
| --- | --- |
| `#/` | Painel com três etapas selecionáveis, atalhos, campanhas com metas, guia por categoria, formulário de interesse, avaliações e dúvidas frequentes. |
| `#/doar` | Exige entrada na demonstração, inclusive por link direto. Visitantes seguem para login e retornam à doação após entrar. Fluxo de três etapas: categoria e quantidade, ponto compatível, confirmação. Salva um registro local e soma pontos de demonstração. |
| `#/pontos` | Cartões que selecionam o local no mapa, busca, filtros, detalhes e checklist de preparação. |
| `#/impacto` | Causas selecionáveis, detalhes e simulação de pontos pela quantidade de itens. Os indicadores coletivos são ilustrativos. |
| `#/recompensas` | Álbum com 20 insígnias, filtros por raridade e coleção, busca, detalhes, resgate único e destaque no perfil. |
| `#/avaliacoes` | Busca por pessoa ou relato, distribuição das notas, filtros e publicação local. |
| `#/sobre-nos` | Propósito, valores, jornada interativa, equipe e acesso ao GitHub. |
| `#/login` | Entrada de demonstração por nome e e-mail, com apresentação da coleção. Sem autenticação de servidor. |
| `#/perfil` | Exige entrada. Mostra registros, quantidade de itens, saldo, nível, álbum e insígnia favorita. O nível considera pontos ganhos, sem cair quando o saldo é gasto. |

## Dados e limites atuais

O estado da interface fica em `localStorage` (`vestbem-demo-state`). A escolha de um ponto durante a navegação fica em `sessionStorage` (`vestbem-selected-point`). Isso permite testar o fluxo sem banco de dados, mas os registros não são compartilhados entre dispositivos e não representam confirmação física de entrega.

## Insígnias e pontuação

| Nível | Quantidade | Custo por insígnia |
| --- | --- | --- |
| Básica | 10 | 50 pontos |
| Intermediária | 4 | 150 pontos |
| Avançada | 3 | 300 pontos |
| Especial | 2 | 500 pontos |
| Lendária | 1 | 1.000 pontos |

O resgate exige entrada, desconta o saldo e só pode acontecer uma vez por insígnia. Uma insígnia da coleção pode ser destacada no perfil. Novos registros calculam `quantidade × 10` e guardam os pontos recebidos em `pointsEarned`. Os registros antigos mantêm seus pontos históricos de 50 por registro; quantidades antigas descritas em texto não são inventadas nem incluídas no contador de itens novos. Os antigos cupons permanecem nos dados locais, mas o catálogo atual usa insígnias.

Os pontos, endereços, métricas coletivas, causas, parceiros, recompensas e avaliações iniciais são exemplos. A interface os identifica como dados ilustrativos. A API Express disponibiliza `/api/health`, `/api/campanhas`, `/api/interesses`, `/api/pontos-coleta`, `/api/doacoes` e `/api/depoimentos`. Interesses são persistidos em `Back_wVestBem/data/interesses.json`, fora do Git; os demais cadastros da API ficam em memória. Para uso real, faltam integração de doações, banco de dados, pontos e parceiros verificados e autenticação.

## Verificação

No front, execute `npm ci` e `npm run build`. O build de produção também valida a compilação das telas React e dos estilos.

No back, execute `node smoke-test.mjs` depois de instalar as dependências. O teste usa uma pasta temporária e outra porta para validar campanhas, e-mails inválidos, duplicados e persistência após reinício, sem modificar cadastros do servidor principal.
