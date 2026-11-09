import express from 'express'
import cors from 'cors'

const app = express()
const port = process.env.PORT || 3333
const interests = []
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
app.use(express.json())

app.get('/api/health', (_, res) => res.json({ status: 'ok', service: 'VestBem API' }))

app.post('/api/interesses', (req, res) => {
  const email = String(req.body?.email || '').trim().toLowerCase()
  if (!/^\S+@\S+\.\S+$/.test(email)) return res.status(400).json({ error: 'Informe um e-mail válido.' })
  if (!interests.some(item => item.email === email)) interests.push({ email, createdAt: new Date().toISOString() })
  res.status(201).json({ message: 'Interesse registrado com sucesso.' })
})

app.get('/api/pontos-coleta', (_, res) => res.json(collectionPoints))

app.post('/api/doacoes', (req, res) => {
  const { name, item, quantity, point } = req.body || {}
  if (![name, item, quantity, point].every(value => String(value || '').trim())) return res.status(400).json({ error: 'Preencha todos os dados da doação.' })
  const donation = { id: donations.length + 1, name: String(name).trim(), item, quantity: String(quantity).trim(), point, points: 50, createdAt: new Date().toISOString() }
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
