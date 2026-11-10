import assert from 'node:assert/strict'
import { createServer } from 'vite'
import { createElement } from 'react'
import { renderToString } from 'react-dom/server'

const vite = await createServer({ server: { middlewareMode: true, hmr: false }, appType: 'custom' })
try {
  const { default: App } = await vite.ssrLoadModule('/src/ProductApp.jsx')
  globalThis.location = { hash: '#/doar' }
  globalThis.sessionStorage = { getItem: () => null }
  globalThis.localStorage = { getItem: () => JSON.stringify({ signedIn: false }) }
  const anonymous = renderToString(createElement(App))
  assert.ok(anonymous.includes('Acessar minha demonstração'))
  assert.ok(!anonymous.includes('O que você quer doar?'))
  globalThis.localStorage = { getItem: () => JSON.stringify({ signedIn: true, name: 'Teste', email: 'teste@example.com' }) }
  const authenticated = renderToString(createElement(App))
  assert.ok(authenticated.includes('O que você quer doar?'))
  assert.ok(!authenticated.includes('Acessar minha demonstração'))
  const { badges } = await vite.ssrLoadModule('/src/badges.js')
  assert.equal(badges.length,20)
  assert.equal(new Set(badges.map(b=>b.id)).size,20)
  assert.deepEqual([0,1,2,3,4].map(t=>badges.filter(b=>b.tier===t).length),[10,4,3,2,1])
  assert.equal(new Set(badges.filter(b=>b.tier===0).map(b=>b.cost)).size,1)
  for (const route of ['/pontos','/impacto','/avaliacoes','/sobre-nos','/perfil','/recompensas','/login']) {
    globalThis.location.hash = `#${route}`
    assert.ok(renderToString(createElement(App)).includes('app-shell'),`A tela ${route} deve renderizar`)
  }
  console.log('OK: acesso direto à doação bloqueado para visitante e permitido para usuário conectado.')
  console.log('OK: 20 insígnias na distribuição 10/4/3/2/1 e todas as telas internas renderizam.')
} finally { await vite.close() }
