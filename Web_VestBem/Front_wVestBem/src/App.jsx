import { useEffect, useState } from 'react'
import {
  ArrowRight, Check, ChevronRight, CircleHelp, Download, Gift, Heart,
  MapPin, Menu, PackageCheck, Recycle, Shirt, Sparkles, Star, ThumbsUp, X
} from 'lucide-react'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3333'

const steps = [
  ['01', 'Separe o que não usa mais', 'Roupas, calçados e acessórios em bom estado podem ganhar uma nova história.', Shirt],
  ['02', 'Encontre um ponto de coleta', 'Veja no mapa onde deixar sua doação de um jeito simples e seguro.', PackageCheck],
  ['03', 'Acompanhe seu impacto', 'Cada entrega vira pontos e ajuda você a acompanhar o bem que fez.', Sparkles],
]

const audiences = [
  { title: 'Para quem doa', text: 'Transforme peças paradas em oportunidades reais.', icon: Heart, tone: 'green', action: 'Doar agora' },
  { title: 'Para instituições', text: 'Receba doações organizadas e encontre novos parceiros.', icon: Recycle, tone: 'blue', action: 'Conhecer a rede' },
  { title: 'Para empresas', text: 'Engaje seu time com impacto social mensurável.', icon: Gift, tone: 'purple', action: 'Falar com a gente' },
]

const fallbackReviews = [
  { name: 'Larissa Almeida', role: 'Doadora na comunidade VestBem', rating: 5, text: 'Doar pelo VestBem me fez perceber que algo simples pode significar muito para outra pessoa.' },
  { name: 'Caio Mendes', role: 'Doador na comunidade VestBem', rating: 5, text: 'O ponto de coleta era pertinho de casa e acompanhar o impacto deixou tudo ainda mais especial.' },
  { name: 'Juliana Lima', role: 'Voluntária parceira', rating: 5, text: 'A plataforma facilita muito a conexão entre quem quer ajudar e as instituições.' },
  { name: 'Renata Souza', role: 'Doadora na comunidade VestBem', rating: 4, text: 'Gostei de saber para onde as peças foram encaminhadas. É uma experiência muito humana.' },
]

function Logo() {
  return <a className="logo" href="#inicio" aria-label="VestBem">
    <img src="/assets/vestbem-logo.png" alt="VestBem" />
  </a>
}

function HomePage({ onNavigate }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState('')

  async function handleSubmit(e) {
    e.preventDefault()
    setStatus('enviando')
    try {
      const response = await fetch(`${API_URL}/api/interesses`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      if (!response.ok) throw new Error()
      setStatus('sucesso'); setEmail(''); return true
    } catch { setStatus('erro'); return false }
  }

  return <>
    <header className="header">
      <div className="container nav">
        <Logo />
        <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-label="Abrir menu">{menuOpen ? <X /> : <Menu />}</button>
        <nav className={menuOpen ? 'nav-links open' : 'nav-links'}>
          <a href="#como-funciona" onClick={() => setMenuOpen(false)}>Como funciona</a>
          <a href="/pontos" onClick={e => { e.preventDefault(); onNavigate('/pontos'); setMenuOpen(false) }}>Pontos de coleta</a>
          <a href="/avaliacoes" onClick={e => { e.preventDefault(); onNavigate('/avaliacoes'); setMenuOpen(false) }}>Avaliações</a>
          <a href="#faq" onClick={() => setMenuOpen(false)}>Contato</a>
        </nav>
        <button className="button button-small header-cta" onClick={() => onNavigate('/doar')}>Quero doar <ArrowRight size={16}/></button>
      </div>
    </header>

    <main>
      <section className="hero" id="inicio">
        <div className="orb orb-one"/><div className="orb orb-two"/><div className="dots"/>
        <div className="container hero-grid">
          <div className="hero-copy">
            <p className="eyebrow"><span/> DOAR FICOU MAIS SIMPLES</p>
            <h1>Pequenos gestos.<br/><strong>Grandes começos.</strong></h1>
            <p className="hero-text">O VestBem conecta quem tem algo para doar a quem precisa recomeçar. Você cuida do planeta e transforma vidas ao mesmo tempo.</p>
            <div className="hero-actions">
              <button className="button" onClick={() => onNavigate('/doar')}>Começar a doar <ArrowRight size={18}/></button>
              <a className="text-link" href="#como-funciona">Entenda como funciona <ChevronRight size={17}/></a>
            </div>
            <div className="trusted"><div className="avatars"><b>J</b><b>M</b><b>A</b></div><span><strong>+2.500 pessoas</strong><br/>já fazem parte da rede</span></div>
          </div>
          <div className="phone-wrap" aria-label="Prévia do aplicativo VestBem">
            <div className="phone"><div className="phone-top"><span>9:41</span><b>● ● ●</b></div><p className="welcome">Olá, Gabriela! <span>✦</span></p><small>Seu impacto faz a diferença.</small><div className="points"><span>SEUS PONTOS</span><strong>350 <em>pts</em></strong><i>+ 50 esta semana</i></div><p className="phone-title">Próximos passos</p><div className="task"><span className="task-icon green"><Shirt size={15}/></span><div><b>Fazer uma doação</b><small>Escolha o que doar</small></div><ChevronRight size={16}/></div><div className="task"><span className="task-icon purple"><Gift size={15}/></span><div><b>Usar seus pontos</b><small>Veja suas recompensas</small></div><ChevronRight size={16}/></div><div className="impact-mini"><Heart size={16}/><span>Você já ajudou <b>12 pessoas</b></span></div><div className="phone-nav"><span>⌂</span><span className="active">◉</span><span>♧</span><span>◯</span></div></div>
            <div className="phone-shadow"/>
            <div className="floating-card"><Heart fill="currentColor" size={18}/><span><strong>1 doação</strong><br/>pode mudar tudo</span></div>
          </div>
        </div>
      </section>

      <section className="impact-strip" id="impacto"><div className="container stats">
        <div><strong>12.8k</strong><span>peças com novo destino</span></div><div><strong>2.5k</strong><span>pessoas na comunidade</span></div><div><strong>38</strong><span>instituições parceiras</span></div><div><strong>100%</strong><span>impacto rastreável</span></div>
      </div></section>

      <section className="section how" id="como-funciona"><div className="container">
        <p className="eyebrow"><span/> É RÁPIDO E TRANSPARENTE</p><div className="section-heading"><div><h2>Fazer o bem deveria<br/>ser <em>descomplicado.</em></h2><p>Com o VestBem, sua doação percorre um caminho claro — e você acompanha cada passo.</p></div><a className="text-link" href="#faq">Tirar dúvidas <CircleHelp size={18}/></a></div>
        <div className="steps">{steps.map(([number, title, text, Icon]) => <article className="step" key={number}><span className="number">{number}</span><div className="step-icon"><Icon size={25}/></div><h3>{title}</h3><p>{text}</p></article>)}</div>
      </div></section>

      <section className="donations"><div className="container donation-grid"><div><p className="eyebrow"><span/> O QUE VOCÊ PODE DOAR</p><h2>Tudo que está em bom estado merece <em>continuar em movimento.</em></h2><p>Itens limpos e conservados podem fazer uma enorme diferença para quem recebe.</p><button className="button button-outline" onClick={() => onNavigate('/pontos')}>Ver pontos de coleta <ArrowRight size={18}/></button></div><div className="donation-tags"><span>Roupas</span><span>Calçados</span><span>Acessórios</span><span>Brinquedos</span><span>Livros</span><span>Roupa de cama</span><span>Produtos de higiene</span><span>Material escolar</span></div></div></section>

      <section className="section everyone" id="para-todos"><div className="container"><p className="eyebrow"><span/> UMA REDE QUE ACOLHE</p><div className="section-heading"><div><h2>O VestBem é feito<br/><em>para todos.</em></h2></div><p>Quando a gente se conecta, o impacto vai muito além de uma doação.</p></div><div className="audiences">{audiences.map(({title, text, icon: Icon, tone, action}) => <article className={`audience ${tone}`} key={title}><div className="audience-icon"><Icon size={23}/></div><h3>{title}</h3><p>{text}</p><button onClick={() => setModalOpen(true)}>{action} <ArrowRight size={16}/></button></article>)}</div></div></section>

      <section className="testimonial"><div className="container quote"><div className="quote-mark">“</div><div><p className="eyebrow"><span/> HISTÓRIAS REAIS</p><blockquote>“Doar pelo VestBem me fez perceber que algo simples, como uma roupa que eu não usava, pode significar muito para outra pessoa.”</blockquote><div className="person"><div className="person-avatar">L</div><span><strong>Larissa Almeida</strong><br/>Doadora na comunidade VestBem</span></div></div><div className="rating"><div>{[1,2,3,4,5].map(i => <Star key={i} fill="currentColor" size={18}/>)}</div><strong>4,9 de 5</strong><span>avaliação da comunidade</span><button className="mini-link" onClick={() => onNavigate('/avaliacoes')}>Ver todas</button></div></div></section>

      <section className="faq section" id="faq"><div className="container faq-grid"><div><p className="eyebrow"><span/> AINDA COM DÚVIDAS?</p><h2>A gente te ajuda a <em>começar.</em></h2><p>Cadastre seu e-mail e seja uma das primeiras pessoas a conhecer o app.</p></div><form className="signup" onSubmit={handleSubmit}><label htmlFor="email">Seu melhor e-mail</label><div><input id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="voce@email.com" required/><button className="button" disabled={status === 'enviando'}>{status === 'enviando' ? 'Enviando...' : 'Quero participar'}</button></div>{status === 'sucesso' && <p className="form-success"><Check size={16}/> Pronto! Vamos te avisar em breve.</p>}{status === 'erro' && <p className="form-error">Não foi possível conectar. Tente novamente.</p>}<small>Sem spam. Você pode sair quando quiser.</small></form></div></section>
    </main>

    <footer><div className="container footer-main"><div><Logo/><p>Doar, conectar, transformar.</p></div><div className="footer-links"><a href="#como-funciona">Como funciona</a><a href="#para-todos">Para todos</a><a href="#faq">Contato</a></div><button className="button button-small" onClick={() => setModalOpen(true)}><Download size={16}/> Baixar o app</button></div><div className="container footer-bottom"><span>© 2026 VestBem. Todos os direitos reservados.</span><span>Feito com <Heart size={13} fill="currentColor"/> para transformar.</span></div></footer>

    {modalOpen && <div className="modal-backdrop" onClick={() => setModalOpen(false)}><div className="modal" role="dialog" aria-modal="true" onClick={e => e.stopPropagation()}><button className="modal-close" onClick={() => setModalOpen(false)} aria-label="Fechar"><X/></button><div className="modal-icon"><Heart fill="currentColor"/></div><h2>Que bom ter você<br/><em>com a gente.</em></h2><p>O app VestBem está chegando. Deixe seu e-mail para receber o convite em primeira mão.</p><form onSubmit={async e => { if (await handleSubmit(e)) setTimeout(() => setModalOpen(false), 1400) }}><input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="seu@email.com" required/><button className="button">Quero receber o convite <ArrowRight size={18}/></button></form>{status === 'sucesso' && <p className="form-success"><Check size={16}/> Cadastro realizado!</p>}</div></div>}
  </>
}

function PageFrame({ children, onNavigate }) {
  return <><header className="header"><div className="container nav"><a className="logo" href="/" onClick={e => { e.preventDefault(); onNavigate('/') }} aria-label="VestBem"><img src="/assets/vestbem-logo.png" alt="VestBem" /></a><nav className="nav-links page-nav"><a href="/" onClick={e => { e.preventDefault(); onNavigate('/') }}>Início</a><a href="/pontos" onClick={e => { e.preventDefault(); onNavigate('/pontos') }}>Pontos de coleta</a><a href="/avaliacoes" onClick={e => { e.preventDefault(); onNavigate('/avaliacoes') }}>Avaliações</a></nav><button className="button button-small" onClick={() => onNavigate('/doar')}>Fazer doação <ArrowRight size={15}/></button></div></header>{children}<footer><div className="container footer-bottom"><span>© 2026 VestBem. Todos os direitos reservados.</span><span>Feito com <Heart size={13} fill="currentColor"/> para transformar.</span></div></footer></>
}

function DonationPage({ onNavigate }) {
  const [form, setForm] = useState({ name: '', item: 'Roupas', quantity: '', point: '' })
  const [status, setStatus] = useState('')
  async function submit(e) {
    e.preventDefault(); setStatus('enviando')
    try {
      const response = await fetch(`${API_URL}/api/doacoes`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
      if (!response.ok) throw new Error(); setStatus('sucesso')
    } catch { setStatus('erro') }
  }
  const update = e => setForm({ ...form, [e.target.name]: e.target.value })
  return <PageFrame onNavigate={onNavigate}><main className="inner-page"><div className="container page-intro"><p className="eyebrow"><span/> SUA PRÓXIMA DOAÇÃO</p><h1>Vamos transformar<br/><strong>isso em impacto.</strong></h1><p>Conte o que você quer doar e encontre o melhor ponto para a entrega. É simples, rápido e gratuito.</p></div><div className="container donate-layout"><form className="donation-form" onSubmit={submit}><h2>Detalhes da doação</h2><label>Como podemos te chamar?<input name="name" value={form.name} onChange={update} placeholder="Seu nome" required/></label><label>O que você vai doar?<select name="item" value={form.item} onChange={update}><option>Roupas</option><option>Calçados</option><option>Acessórios</option><option>Livros</option><option>Brinquedos</option><option>Material escolar</option></select></label><label>Quantidade aproximada<input name="quantity" value={form.quantity} onChange={update} placeholder="Ex.: 1 sacola, 5 peças" required/></label><label>Ponto de coleta<select name="point" value={form.point} onChange={update} required><option value="" disabled>Selecione um ponto</option><option>Instituto Recomeçar — Centro</option><option>Casa Solidária — Jardim América</option><option>Estação do Bem — Vila Nova</option></select></label><button className="button" disabled={status === 'enviando'}>{status === 'enviando' ? 'Registrando...' : 'Confirmar doação'} <ArrowRight size={18}/></button>{status === 'sucesso' && <p className="form-success"><Check size={16}/> Doação registrada! Você ganhou 50 pontos.</p>}{status === 'erro' && <p className="form-error">Não foi possível registrar. Confira se a API está ativa.</p>}</form><aside className="donation-aside"><div className="aside-icon"><Sparkles size={28}/></div><h3>Seu impacto começa aqui.</h3><p>Assim que a doação for entregue, seus pontos serão confirmados e você poderá acompanhar o destino da sua contribuição.</p><div className="impact-list"><span><Check/> Itens em bom estado</span><span><Check/> Entrega gratuita</span><span><Check/> Impacto acompanhado</span></div></aside></div></main></PageFrame>
}

function PointsPage({ onNavigate }) {
  const [points, setPoints] = useState([])
  useEffect(() => { fetch(`${API_URL}/api/pontos-coleta`).then(r => r.json()).then(setPoints).catch(() => setPoints([])) }, [])
  return <PageFrame onNavigate={onNavigate}><main className="inner-page"><div className="container page-intro compact"><p className="eyebrow"><span/> ENCONTRE A GENTE</p><h1>Um ponto de coleta<br/><strong>perto de você.</strong></h1><p>Escolha o local mais conveniente e leve sua doação quando puder.</p></div><div className="container point-grid"><div className="map-placeholder"><MapPin size={36}/><strong>São Paulo, SP</strong><span>3 pontos de coleta disponíveis</span><div className="map-pins"><i/><i/><i/></div></div><div className="points-list">{points.length ? points.map(point => <article className="point-card" key={point.id}><div className="point-marker"><MapPin size={20}/></div><div><h3>{point.name}</h3><p>{point.address}</p><small>{point.hours}</small></div><button className="mini-link" onClick={() => onNavigate('/doar')}>Doar aqui <ArrowRight size={15}/></button></article>) : <p>Carregando pontos de coleta…</p>}</div></div></main></PageFrame>
}

function ReviewsPage({ onNavigate }) {
  const [reviews, setReviews] = useState(fallbackReviews)
  const [form, setForm] = useState({ name: '', text: '', rating: 5 })
  const [status, setStatus] = useState('')
  const load = () => fetch(`${API_URL}/api/depoimentos`).then(r => { if (!r.ok) throw new Error(); return r.json() }).then(data => setReviews(data.length ? data : fallbackReviews)).catch(() => setReviews(fallbackReviews))
  useEffect(load, [])
  async function submit(e) { e.preventDefault(); try { const r = await fetch(`${API_URL}/api/depoimentos`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) }); if (!r.ok) throw new Error(); setForm({ name: '', text: '', rating: 5 }); setStatus('sucesso'); load() } catch { setStatus('erro') } }
  return <PageFrame onNavigate={onNavigate}><main className="inner-page"><div className="container page-intro compact"><p className="eyebrow"><span/> HISTÓRIAS QUE INSPIRAM</p><h1>Quem doa, também<br/><strong>se transforma.</strong></h1><p>Conheça experiências da comunidade VestBem e compartilhe a sua.</p></div><div className="container reviews-layout"><section className="reviews-grid">{reviews.map((review, i) => <article className="review-card" key={`${review.name}-${i}`}><div className="review-top"><div className="person-avatar">{review.name[0]}</div><div><strong>{review.name}</strong><small>{review.role || 'Membro da comunidade'}</small></div><div className="review-stars">{Array.from({ length: review.rating || 5 }, (_, j) => <Star key={j} size={14} fill="currentColor"/>)}</div></div><p>“{review.text}”</p><span><ThumbsUp size={13}/> Doação com propósito</span></article>)}</section><form className="review-form" onSubmit={submit}><p className="eyebrow"><span/> COMPARTILHE</p><h2>Sua experiência importa.</h2><label>Seu nome<input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required placeholder="Como quer aparecer?"/></label><label>Sua avaliação<select value={form.rating} onChange={e => setForm({ ...form, rating: Number(e.target.value) })}>{[5,4,3,2,1].map(value => <option key={value} value={value}>{value} estrelas</option>)}</select></label><label>Seu depoimento<textarea value={form.text} onChange={e => setForm({ ...form, text: e.target.value })} required placeholder="Conte como foi doar com o VestBem."/></label><button className="button">Publicar avaliação <ArrowRight size={17}/></button>{status === 'sucesso' && <p className="form-success"><Check size={16}/> Obrigado por compartilhar!</p>}{status === 'erro' && <p className="form-error">Não foi possível publicar agora.</p>}</form></div></main></PageFrame>
}

function App() {
  const getPath = () => window.location.hash.replace('#', '') || '/'
  const [path, setPath] = useState(getPath)
  useEffect(() => { const sync = () => setPath(getPath()); window.addEventListener('hashchange', sync); return () => window.removeEventListener('hashchange', sync) }, [])
  const navigate = to => { window.location.hash = to === '/' ? '' : to; setPath(to); window.scrollTo({ top: 0, behavior: 'smooth' }) }
  if (path === '/doar') return <DonationPage onNavigate={navigate}/>
  if (path === '/pontos') return <PointsPage onNavigate={navigate}/>
  if (path === '/avaliacoes') return <ReviewsPage onNavigate={navigate}/>
  return <HomePage onNavigate={navigate}/>
}

export default App
