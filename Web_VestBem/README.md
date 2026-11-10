# VestBem

Landing page e API inicial do projeto acadêmico VestBem, uma plataforma de doação de itens em bom estado.

## Como executar

Em dois terminais:

```powershell
cd Front_wVestBem
npm install
npm run dev
```

```powershell
cd Back_wVestBem
npm install
npm run dev
```

O front abre na URL exibida pelo Vite (normalmente `http://localhost:5173`). Durante o desenvolvimento, o Vite encaminha `/api` para `http://localhost:3333`. As campanhas e o formulário de interesse da página inicial usam essa API. Para hospedar em servidores distintos, configure `VITE_API_URL` com o endereço da API antes do build.

## Estrutura

- `Front_wVestBem`: interface React criada com Vite.
- `Back_wVestBem`: API Express com endpoints de saúde, interesse, pontos de coleta, doações e depoimentos.

Veja [MAPEAMENTO.md](MAPEAMENTO.md) para as telas, fluxos e limites atuais do protótipo.

## LinkedIn da equipe

Abra `Front_wVestBem/src/ProductApp.jsx` e procure `LINKS DA EQUIPE`.
Cada integrante tem um campo `linkedin` logo abaixo do nome. Cole o endereço completo entre as aspas, por exemplo:

```js
linkedin: 'https://www.linkedin.com/in/nome-do-perfil/',
```

O endereço de Pedro Cabeza já está preenchido. Nos demais, substitua `''` pelo link correto. O botão aparece automaticamente no cartão da pessoa em “Sobre nós”; um campo vazio mantém o botão oculto.

A coleção possui 20 insígnias em cinco níveis. Cada item doado rende 10 pontos: 3 itens = 30 pontos, 5 itens = 50 pontos. O resgate desconta o saldo, e a insígnia favorita pode aparecer no perfil. O login de demonstração é obrigatório para registrar doações, acessar o perfil e resgatar insígnias.

Para verificar os fluxos, execute `node auth-smoke.mjs` na pasta do front e `node smoke-test.mjs` na pasta do back. Os testes cobrem o bloqueio para visitantes, a distribuição das insígnias, a renderização das telas e a regra de pontuação da API.

> Doações e recompensas ainda são demonstrações locais. Os e-mails de interesse são salvos pela API em `Back_wVestBem/data/interesses.json` (fora do Git) e sobrevivem ao reinício. Essa pasta precisa ser gravável e persistente na hospedagem. As campanhas são ilustrativas; o formulário registra o interesse, sem enviar e-mails.
