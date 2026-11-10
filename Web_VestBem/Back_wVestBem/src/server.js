import express from 'express'
import cors from 'cors'
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { join, resolve } from 'node:path'
import { donationPoints } from '../../shared/points.mjs'

const app = express()
const port = process.env.PORT || 3333
const dataDirectory = process.env.VESTBEM_DATA_DIR ? resolve(process.env.VESTBEM_DATA_DIR) : fileURLToPath(new URL('../data/', import.meta.url))
const interestFile = join(dataDirectory, 'interesses.json')
let interests = []
try {
  const stored = JSON.parse(readFileSync(interestFile, 'utf8'))
  if (!Array.isArray(stored)) throw new Error('Formato inválido no arquivo de interesses.')
  interests = stored
} catch (error) {
  if (error.code !== 'ENOENT') throw error
}
const campaigns = [
  { id: 'agasalho', title: 'Carinho que aquece', description: 'Casacos, mantas e roupas de frio para acolher novos começos.', category: 'Roupas', current: 360, goal: 500, label: 'peças', tone: 'mint' },
  { id: 'leitura', title: 'Uma página, um futuro', description: 'Livros conservados para abrir caminhos pela leitura.', category: 'Livros', current: 128, goal: 200, label: 'livros', tone: 'lavender' },
  { id: 'passos', title: 'Novos passos', description: 'Calçados em bom estado para acompanhar novas jornadas.', category: 'Calçados', current: 84, goal: 150, label: 'pares', tone: 'peach' },
]
const donations = []
const collectionPoints = [
  { id: 1, name: 'Instituto Recomeçar', address: 'Rua da Esperança, 124 — Centro', hours: 'Seg. a sex., 9h às 17h' },
  { id: 2, name: 'Casa Solidária', address: 'Av. Jardim América, 882 — Jardim América', hours: 'Ter. a sáb., 10h às 18h' },
  { id: 3, name: 'Estação do Bem', address: 'Rua das Flores, 45 — Vila Nova', hours: 'Seg. a sáb., 8h às 16h' },
]
const testimonials = [
  { name: 'Larissa Almeida', role: 'Doadora na comunidade VestBem', rating: 5, text: 'Doar pelo VestBem me fez perceber que algo simples pode significar muito para outra pessoa.' },
  { name: 'Caio Mendes', role: 'Doador na comunidade VestBem', rating: 5, text: 'O ponto de coleta era pertinho de casa e acompanhar o impacto deixou tudo ainda mais especial.' },
  { name: 'Juliana Lima', role: 'Voluntária parceira', rating: 5, text: 'A plataforma facilita muito a conexão entre quem quer ajudar e as instituições.' },
  { name: 'Renata Souza', role: 'Doadora na comunidade VestBem', rating: 4, text: 'Gostei de saber para onde as peças foram encaminhadas. É uma experiência muito humana.' },
]

app.use(cors())
app.use(express.json({ limit: '16kb' }))

app.get('/api/health', (_, res) => res.json({ status: 'ok', service: 'VestBem API' }))
app.get('/api/campanhas', (_, res) => res.json(campaigns))

app.post('/api/interesses', (req, res) => {
  const email = typeof req.body?.email === 'string' ? req.body.email.trim().toLowerCase() : ''
  if (email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return res.status(400).json({ error: 'Informe um e-mail válido.' })
  if (!interests.some(item => item.email === email)) {
    const next = [...interests, { email, createdAt: new Date().toISOString() }]
    try {
      mkdirSync(dataDirectory, { recursive: true })
      writeFileSync(interestFile, JSON.stringify(next, null, 2), 'utf8')
      interests = next
    } catch {
      return res.status(500).json({ error: 'Não foi possível registrar seu interesse. Tente novamente.' })
    }
  }
  res.status(201).json({ message: 'Interesse registrado com sucesso.' })
})

app.get('/api/pontos-coleta', (_, res) => res.json(collectionPoints))

app.post('/api/doacoes', (req, res) => {
  const { name, item, quantity, point } = req.body || {}
  if (![name, item, quantity, point].every(value => String(value || '').trim())) return res.status(400).json({ error: 'Preencha todos os dados da doação.' })
  const points = donationPoints(quantity)
  if (!points) return res.status(400).json({ error: 'A quantidade deve ser um número inteiro de 1 a 10.000 itens.' })
  const donation = { id: donations.length + 1, name: String(name).trim(), item, quantity: Number(quantity), point, points, createdAt: new Date().toISOString() }
  donations.push(donation)
  res.status(201).json({ message: 'Doação registrada com sucesso.', donation })
})

app.get('/api/depoimentos', (_, res) => res.json(testimonials))

app.post('/api/depoimentos', (req, res) => {
  const name = String(req.body?.name || '').trim()
  const text = String(req.body?.text || '').trim()
  const rating = Number(req.body?.rating)
  if (!name || !text || !Number.isInteger(rating) || rating < 1 || rating > 5) return res.status(400).json({ error: 'Informe nome, texto e uma nota entre 1 e 5.' })
  const testimonial = { name, text, rating, role: 'Membro da comunidade VestBem' }
  testimonials.unshift(testimonial)
  res.status(201).json({ message: 'Avaliação publicada.', testimonial })
})

app.listen(port, () => console.log(`VestBem API pronta em http://localhost:${port}`))
