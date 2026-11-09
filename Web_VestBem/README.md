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

O front abre na URL exibida pelo Vite (normalmente `http://localhost:5173`) e consome a API em `http://localhost:3333`.

## Estrutura

- `Front_wVestBem`: interface React criada com Vite.
- `Back_wVestBem`: API Express com endpoints de saúde, interesse e depoimentos.

> Nesta etapa os cadastros ficam em memória; o próximo passo é conectar um banco de dados (por exemplo, PostgreSQL ou Supabase) e criar autenticação.
