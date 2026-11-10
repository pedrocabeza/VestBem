import { useEffect, useState } from 'react'
import { HeroJourney, HomeFeatures, GithubFooter } from './HomeFeatures'
import { DonationExperience as Donate, BadgeCollection as Rewards, MemberProfile as Profile, LoginCollectionPreview } from './MemberPages'
import { PointDirectory, DeliveryChecklist, CauseDetails, AboutJourney, ReviewDistribution } from './InteriorExtras'
import {
  ArrowLeft, ArrowRight, Award, Bell, BookOpen, Check, ChevronRight,
  Clock3, Footprints, Gem, Gift, GraduationCap, Heart, House, Leaf, LogIn, Mail, MapPin, Menu, PackageCheck, Plus, Puzzle,
  Recycle, Search, Shirt, Sparkles, Star, Ticket, UserRound, UsersRound, X
} from 'lucide-react'

const initialReviews = [
  { name: 'Larissa Almeida', role: 'Doadora', rate: 5, text: 'Doar pelo VestBem me fez perceber que uma roupa parada pode significar muito para outra pessoa.', color: '#f2b27c' },
  { name: 'Caio Mendes', role: 'Doador', rate: 5, text: 'O ponto de coleta era perto de casa e acompanhar o impacto deixou tudo ainda mais especial.', color: '#7da4dd' },
  { name: 'Juliana Lima', role: 'Voluntária', rate: 5, text: 'A plataforma deixa a conexão entre quem quer ajudar e as instituições muito mais simples.', color: '#a984c9' },
]

const points = [
  { id: 1, name: 'Instituto Recomeçar', area: 'Centro', address: 'Rua da Esperança, 124', schedule: 'Seg. a sex. · 9h–17h', distance: '1,2 km', types: ['Roupas', 'Calçados', 'Livros'] },
  { id: 2, name: 'Casa Solidária', area: 'Jardim América', address: 'Av. Jardim América, 882', schedule: 'Ter. a sáb. · 10h–18h', distance: '2,8 km', types: ['Roupas', 'Acessórios', 'Brinquedos', 'Higiene'] },
  { id: 3, name: 'Estação do Bem', area: 'Vila Nova', address: 'Rua das Flores, 45', schedule: 'Seg. a sáb. · 8h–16h', distance: '4,1 km', types: ['Roupas', 'Material escolar'] },
]

const donationOptions = [
  { type: 'Roupas', icon: Shirt },
  { type: 'Calçados', icon: Footprints },
  { type: 'Acessórios', icon: Gem },
  { type: 'Livros', icon: BookOpen },
  { type: 'Brinquedos', icon: Puzzle },
  { type: 'Material escolar', icon: GraduationCap },
]

const causes = [
  { title: 'Abrigo Sementes', subtitle: 'Apoio a famílias recomeçando', progress: 72, goal: '240 famílias', icon: Heart, tone: 'pink' },
  { title: 'Projeto Virada', subtitle: 'Roupas para inserção no trabalho', progress: 51, goal: '180 pessoas', icon: Shirt, tone: 'purple' },
  { title: 'Casa do Amanhã', subtitle: 'Dignidade para pessoas idosas', progress: 86, goal: '95 pessoas', icon: UsersRound, tone: 'yellow' },
]

// LINKS DA EQUIPE: cole a URL completa entre as aspas do campo linkedin.
// Exemplo: linkedin: 'https://www.linkedin.com/in/nome-do-perfil/'
// Deixe '' enquanto não tiver o link. O botão aparece automaticamente ao preencher.
const team = [
  {
    name: 'Luiz Bueno',
    linkedin: '',
    role: 'CEO · Idealizador', image: '/assets/team/luiz-bueno.jpeg', position: '50% 38%',
    text: 'Deu origem à ideia do VestBem e ajudou a estruturar a solução para transformar boas intenções em impacto real.',
  },
  {
    name: 'Renan Couto',
    linkedin: '',
    role: 'Analista de UX', image: '/assets/team/renan-couto.jpeg', position: '50% 35%',
    text: 'Pesquisa necessidades, comportamentos e desafios do público para tornar cada etapa mais humana e simples.',
  },
  {
    name: 'Pedro Cabeza',
    linkedin: 'https://www.linkedin.com/in/pedro-cabeza-18abba313/',
    role: 'Full Stack · UX/UI', image: '/assets/team/pedro-cabeza.jpeg', position: '50% 47%',
    text: 'Planeja e desenvolve a experiência do VestBem, conectando interface, tecnologia e clareza em cada tela.',
  },
  {
    name: 'João Delgado',
    linkedin: '',
    role: 'Analista de UX', image: '/assets/team/joao-delgado.jpeg', position: '50% 37%',
    text: 'Ajuda a entender as dores e objetivos das pessoas para que o projeto seja cada vez mais acessível.',
  },
  {
    name: 'Pedro Vieira',
    linkedin: '',
    role: 'Produtor Visual', image: '/assets/team/pedro-vieira.jpeg', position: '50% 28%',
    text: 'Cria e organiza materiais visuais que dão identidade e consistência à comunicação do VestBem.',
  },
  {
    name: 'Gustavo Lima',
    linkedin: '',
    role: 'Analista de Processos', image: '/assets/team/gustavo-lima.jpeg', position: '50% 48%',
    text: 'Organiza processos e documentos para que as ideias do time virem uma solução bem estruturada.',
  },
]

const storageKey = 'vestbem-demo-state'
const selectedPointKey = 'vestbem-selected-point'
const readState = () => { try { return JSON.parse(localStorage.getItem(storageKey)) || {} } catch { return {} } }

function Brand({ small = false }) { return <button className={`brand ${small ? 'brand-small' : ''}`} onClick={() => location.hash = '#/'} aria-label="Ir para o início"><img src="/assets/vestbem-logo.png" alt="VestBem"/><span>VestBem</span></button> }
function route() { return location.hash.replace('#', '') || '/' }

function App() {
  const [page, setPage] = useState(route())
  const [mobileOpen, setMobileOpen] = useState(false)
  const [toast, setToast] = useState('')
  const [notificationsOpen, setNotificationsOpen] = useState(false)
  const [data, setData] = useState(readState)
  const [returnAfterLogin, setReturnAfterLogin] = useState('')
  const donationNeedsLogin = (page === '/doar' || page === '/perfil') && !data.signedIn
  useEffect(() => {
    if (!donationNeedsLogin) return
    setReturnAfterLogin(page)
    setToast(page === '/doar' ? 'Entre na sua conta para fazer uma doação.' : 'Entre para acessar seu perfil.')
    setMobileOpen(false)
    history.replaceState(null, '', '#/login')
    setPage('/login')
  }, [donationNeedsLogin])
  useEffect(() => { const listener = () => setPage(route()); addEventListener('hashchange', listener); return () => removeEventListener('hashchange', listener) }, [])
  useEffect(() => { localStorage.setItem(storageKey, JSON.stringify(data)) }, [data])
  useEffect(() => { if (!toast) return; const timer = setTimeout(() => setToast(''), 3400); return () => clearTimeout(timer) }, [toast])
  const nav = target => { location.hash = `#${target}`; setPage(target); setMobileOpen(false); setNotificationsOpen(false); scrollTo({ top: 0, behavior: 'smooth' }) }
  const profile = { name: data.name || 'Visitante', email: data.email || '', signedIn: Boolean(data.signedIn), points: data.points ?? 0, donations: data.donations || [], redeemed: data.redeemed || [], badges: Array.isArray(data.badges) ? data.badges : [], equippedBadge: data.equippedBadge || '' }
  const save = patch => setData(old => ({ ...old, ...patch }))
  const shellProps = { page: donationNeedsLogin ? '/login' : page, nav, mobileOpen, setMobileOpen, profile, notificationsOpen, setNotificationsOpen }
  const afterLogin = () => { const target = returnAfterLogin || '/perfil'; setReturnAfterLogin(''); nav(target) }
  const pageProps = { nav, profile, save, toast: message => setToast(message) }
  const views = {
    '/': <Home {...pageProps}/>, '/doar': <Donate {...pageProps} points={points} options={donationOptions}/>, '/pontos': <Points {...pageProps}/>,
    '/impacto': <Impact {...pageProps}/>, '/recompensas': <Rewards {...pageProps}/>, '/avaliacoes': <Reviews {...pageProps}/>, '/sobre-nos': <About {...pageProps}/>, '/login': <Login {...pageProps} afterLogin={afterLogin}/>, '/perfil': <Profile {...pageProps}/>,
  }
  return <><Shell {...shellProps}>{views[donationNeedsLogin ? '/login' : page] || views['/']}</Shell>{toast && <div className="toast" role="status" aria-live="polite"><Check size={18}/>{toast}</div>}</>
}

function Shell({ children, page, nav, mobileOpen, setMobileOpen, profile, notificationsOpen, setNotificationsOpen }) {
  const links = [['/', 'Início', House], ['/doar', 'Doar', Shirt], ['/pontos', 'Pontos', MapPin], ['/impacto', 'Impacto', Heart], ['/recompensas', 'Insígnias', Award], ['/sobre-nos', 'Sobre nós', UsersRound]]
  return <div className="app-shell"><header className="app-header"><div className="app-wrap header-inner"><Brand/><nav className={mobileOpen ? 'main-nav is-open' : 'main-nav'}>{links.map(([path,label,Icon]) => <button key={path} className={page === path ? 'active' : ''} onClick={() => nav(path)}><Icon size={16}/>{label}</button>)}</nav><div className="header-actions"><div className="notification-wrap"><button className="notification" onClick={() => setNotificationsOpen(!notificationsOpen)} aria-label="Notificações" aria-expanded={notificationsOpen}><Bell size={19}/>{profile.donations.length > 0 && <i/>}</button>{notificationsOpen && <div className="notification-panel"><b>Novidades da sua jornada</b>{profile.donations.length ? <p><PackageCheck size={17}/> Sua última doação está aguardando entrega em {profile.donations[0].point}.</p> : <p><Heart size={17}/> Comece uma doação para acompanhar suas novidades aqui.</p>}<button onClick={() => nav(profile.donations.length ? "/perfil" : "/doar")}>{profile.donations.length ? "Ver minhas doações" : "Começar agora"} <ArrowRight size={14}/></button></div>}</div><button className="profile-chip" onClick={() => nav(profile.signedIn ? '/perfil' : '/login')}><span>{profile.signedIn ? profile.name.slice(0,1) : <UserRound size={14}/>}</span>{profile.signedIn ? <><b>{profile.points}</b><small>pts</small></> : <b>Entrar</b>}</button><button className="mobile-toggle" aria-label={mobileOpen ? "Fechar menu" : "Abrir menu"} aria-expanded={mobileOpen} onClick={() => setMobileOpen(!mobileOpen)}>{mobileOpen ? <X/> : <Menu/>}</button></div></div></header>{children}<footer className="app-footer"><div className="app-wrap footer-grid"><div><Brand small/><p>Transformando boas intenções<br/>em novos começos.</p></div><div><strong>VestBem</strong><button onClick={() => nav('/doar')}>Fazer uma doação</button><button onClick={() => nav('/pontos')}>Pontos de coleta</button></div><div><strong>Comunidade</strong><button onClick={() => nav('/impacto')}>Nosso impacto</button><button onClick={() => nav('/sobre-nos')}>Sobre nós</button><button onClick={() => nav(profile.signedIn ? '/perfil' : '/login')}>{profile.signedIn ? 'Meu perfil' : 'Entrar'}</button></div><div className="footer-badge"><Leaf size={19}/><span><b>Jornada em construção</b><br/>Cada gesto inspira.</span></div></div><div className="app-wrap"><GithubFooter/></div><div className="app-wrap footer-bottom">© 2026 VestBem · Protótipo acadêmico com dados ilustrativos.</div></footer></div>
}

function Home({ nav, profile }) {
  return <main><section className="home-hero"><div className="hero-shape hero-shape-a"/><div className="hero-shape hero-shape-b"/><div className="app-wrap hero-content"><div className="hero-copy-new"><p className="kicker"><span/> SUA REDE DE IMPACTO</p><h1>O que você não usa<br/>pode ser o <em>recomeço</em><br/>de alguém.</h1><p>Doe itens em bom estado, acompanhe o caminho da sua contribuição e transforme vidas perto de você.</p><div className="hero-buttons"><button className="primary-btn" onClick={() => nav('/doar')}>Quero fazer uma doação <ArrowRight size={18}/></button><button className="play-link" onClick={() => document.querySelector('#como-ajuda')?.scrollIntoView({behavior:'smooth'})}><i>▶</i> Como funciona?</button></div><div className="hero-proof"><div className="face-stack"><b>J</b><b>A</b><b>M</b></div><span><strong>Uma comunidade</strong><br/>pronta para crescer com você</span></div></div><HeroJourney nav={nav}/></div></section><section className="quick-actions"><div className="app-wrap quick-grid"><Quick icon={Shirt} title="Tenho algo para doar" text="Encontre um destino para suas peças." action="Começar agora" onClick={() => nav('/doar')}/><Quick icon={MapPin} title="Buscar pontos de coleta" text="Locais perto de você para entregar." action="Ver no mapa" onClick={() => nav('/pontos')}/><Quick icon={Gift} title="Colecionar insígnias" text={`${profile.points} pontos para sua coleção de insígnias.`} action="Ver insígnias" onClick={() => nav('/recompensas')}/></div></section><section className="app-section" id="como-ajuda"><div className="app-wrap"><p className="kicker"><span/> É SIMPLES FAZER PARTE</p><div className="section-title"><h2>Um gesto seu, <em>muitas histórias.</em></h2><p>O VestBem deixa cada etapa clara para que doar seja leve, seguro e cheio de propósito.</p></div><div className="path-grid"><Path n="01" icon={Shirt} title="Separe com carinho" text="Escolha itens limpos e em bom estado."/><Path n="02" icon={MapPin} title="Leve até um ponto" text="Encontre o local mais perto de você."/><Path n="03" icon={Sparkles} title="Acompanhe o impacto" text="Veja sua doação virar novos começos."/></div></div></section><section className="home-cause"><div className="app-wrap cause-highlight"><div><p className="kicker"><span/> IMPACTO QUE VOCÊ VÊ</p><h2>Mais que doar.<br/><em>É fazer circular.</em></h2><p>Suas peças podem chegar a famílias, instituições e projetos que precisam de apoio agora.</p><button className="text-btn" onClick={() => nav('/impacto')}>Conhecer causas apoiadas <ArrowRight size={17}/></button></div><div className="impact-orbit"><div className="orbit-center"><Heart fill="currentColor"/><b>12,8 mil</b><small>itens no cenário<br/>ilustrativo</small></div><i className="orbit-dot dot-one"/><i className="orbit-dot dot-two"/><i className="orbit-dot dot-three"/></div></div></section><section className="app-section stories-preview"><div className="app-wrap"><div className="section-row"><div><p className="kicker"><span/> QUEM FAZ, CONTA</p><h2>Histórias que <em>inspiram.</em></h2></div><button className="outline-btn" onClick={() => nav('/avaliacoes')}>Ver todas <ArrowRight size={16}/></button></div><div className="story-grid">{initialReviews.map(r => <ReviewCard key={r.name} review={r}/>)}</div></div></section><HomeFeatures nav={nav}/><Faq /></main>
}

function Faq() {
  const questions = [
    ['O que posso doar?', 'Roupas, calçados, livros, brinquedos e materiais escolares em bom estado. Confira as categorias aceitas por cada ponto.'],
    ['Preciso criar uma conta?', 'Não para explorar o protótipo. Para acompanhar seus registros neste navegador, informe nome e e-mail na área de demonstração.'],
    ['Como acompanho minha doação?', 'Depois de confirmar o registro, ela aparece em Meu perfil com o status Aguardando entrega. A confirmação física ainda não faz parte deste protótipo.'],
    ['Os pontos e recompensas são reais?', 'Ainda não. Os locais e metas são ilustrativos. Cada item registrado rende 10 pontos de demonstração, que você pode trocar por insígnias digitais.'],
  ]
  return <section className="faq-section app-section"><div className="app-wrap faq-layout"><div><p className="kicker"><span/> DÚVIDAS FREQUENTES</p><h2>Mais clareza para<br/><em>começar bem.</em></h2><p>Saiba como explorar a experiência e preparar uma doação com cuidado.</p></div><div className="faq-list">{questions.map(([question, answer]) => <details key={question}><summary>{question}<Plus size={18}/></summary><p>{answer}</p></details>)}</div></div></section>
}

function Quick({ icon: Icon, title, text, action, onClick }) { return <button className="quick-card" onClick={onClick}><span><Icon size={23}/></span><div><b>{title}</b><p>{text}</p><small>{action}<ArrowRight size={14}/></small></div></button> }
function Path({n, icon:Icon,title,text}) { return <article className="path-card"><span className="path-number">{n}</span><div className="path-icon"><Icon size={24}/></div><h3>{title}</h3><p>{text}</p></article> }
function ReviewCard({review}) { return <article className="story-card"><div className="story-head"><span style={{background:review.color}}>{review.name[0]}</span><div><b>{review.name}</b><small>{review.role}</small></div><div className="stars">{Array.from({length:review.rate},(_,i)=><Star key={i} size={13} fill="currentColor"/>)}</div></div><p>“{review.text}”</p></article> }

function Points({nav, toast}) {
  const [search,setSearch]=useState(''); const [chosen,setChosen]=useState(1); const [type,setType]=useState('Todos')
  const types=['Todos',...new Set(points.flatMap(point=>point.types))]
  const list=points.filter(point=>`${point.name} ${point.area}`.toLowerCase().includes(search.toLowerCase()) && (type==='Todos'||point.types.includes(type)))
  const selected=list.find(point=>point.id===chosen) || list[0]
  const choose=id=>setChosen(id)
  const ringPosition={1:{left:'31%',top:'32%'},2:{left:'auto',right:'18%',top:'20%'},3:{left:'22%',top:'auto',bottom:'17%'}}[selected?.id] || {}
  const updateType=value=>{setType(value); const next=points.find(point=>(value==='Todos'||point.types.includes(value)) && `${point.name} ${point.area}`.toLowerCase().includes(search.toLowerCase())); setChosen(next?.id || null)}
  return <main className="inner-new"><div className="app-wrap"><div className="page-head"><p className="kicker"><span/> PONTOS DE COLETA</p><h1>O bem está mais perto<br/>do que você imagina.</h1><p>Escolha um parceiro, confira o que ele recebe e trace o próximo passo da sua doação.</p></div><PointDirectory points={points} choose={id=>{setSearch('');setType('Todos');setChosen(id);document.getElementById('collection-finder')?.scrollIntoView({behavior:'smooth',block:'start'})}}/><div id="collection-finder" className="finder finder-enhanced"><div className="map-art"><div className="map-label"><MapPin size={18}/><b>Exemplo de região</b><span>São Paulo, SP</span></div><div className="map-tools"><button onClick={()=>{setSearch('');setType('Todos');setChosen(1)}} title="Mostrar todos os pontos"><Search size={16}/></button><span>Mapa ilustrativo</span></div><div className="map-caption">Clique nos marcadores<br/>para ver cada ponto</div><i className="map-road road-one"/><i className="map-road road-two"/><i className="map-road road-three"/><small className="map-area area-one">Centro</small><small className="map-area area-two">Jardim América</small><small className="map-area area-three">Vila Nova</small>{list.map(p=>{const i=points.findIndex(point=>point.id===p.id);return <button aria-label={`Selecionar ${p.name}`} className={`map-pin pin-${i} ${selected?.id===p.id?'chosen':''}`} onClick={()=>choose(p.id)} key={p.id}><MapPin fill="currentColor" size={selected?.id===p.id?34:26}/><span>{i+1}</span></button>})}<div className="map-rings" style={ringPosition}/></div><div className="point-panel"><div className="map-panel-heading"><span><MapPin size={17}/></span><div><b>Encontre seu ponto</b><small>Selecione um local para ver os detalhes.</small></div></div><div className="search-box"><Search size={18}/><input value={search} onChange={e=>{setSearch(e.target.value);setChosen(null)}} placeholder="Busque por bairro ou ponto"/></div><div className="point-filters">{types.map(option=><button className={type===option?'active':''} onClick={()=>updateType(option)} key={option}>{option}</button>)}</div><b className="result-label">{list.length} ponto{list.length===1?'':'s'} encontrado{list.length===1?'':'s'}</b><div className="point-scroll">{list.map(point=><button className={`point-row ${selected?.id===point.id?'selected':''}`} onClick={()=>choose(point.id)} key={point.id}><span><MapPin size={20}/></span><div><b>{point.name}</b><small>{point.area} · {point.distance}</small><em>{point.schedule}</em></div><ChevronRight size={17}/></button>)}</div>{selected&&<div className="selected-point selected-point-enhanced"><div><span><MapPin size={17}/></span><b>{selected.name}</b><small>{selected.address}</small></div><p>{selected.types.map(item=><i key={item}>{item}</i>)}</p><footer><span><Clock3 size={14}/>{selected.schedule}</span><button onClick={()=>{navigator.clipboard?.writeText(`${selected.address}, ${selected.area}, São Paulo - SP`); toast('Endereço copiado para você consultar a rota.')}}>Copiar endereço <ArrowRight size={14}/></button></footer></div>}{!selected&&<p className="no-points">Nenhum ponto encontrado. Tente outra busca ou categoria.</p>}<button className="primary-btn full-btn" disabled={!selected} onClick={()=>{ sessionStorage.setItem(selectedPointKey, selected.name); toast(`Ponto selecionado: ${selected.name}`); nav('/doar') }}>Iniciar doação neste ponto <ArrowRight size={17}/></button></div></div><div className="point-info"><Clock3 size={21}/><p><b>Protótipo acadêmico:</b> os locais e endereços são ilustrativos. Antes de ir, leve itens limpos e em bom estado. Cada ponto aceita categorias diferentes — confira as etiquetas do local escolhido.</p></div><DeliveryChecklist/></div></main>
}

function Login({save, toast, afterLogin}) {
  const [form,setForm]=useState({name:'',email:''})
  const submit=event=>{event.preventDefault(); if(!form.name.trim()||!form.email.trim())return toast('Preencha seu nome e e-mail para continuar.'); save({name:form.name.trim(),email:form.email.trim(),signedIn:true}); toast(`Bem-vindo(a), ${form.name.trim().split(' ')[0]}!`); afterLogin()}
  return <main className="login-page"><div className="login-shape shape-a"/><div className="login-shape shape-b"/><section className="login-layout"><aside className="login-story"><div className="login-brand"><img src="/assets/vestbem-logo.png" alt="VestBem"/><b>VestBem</b></div><div><p className="kicker"><span/> BEM-VINDO À REDE</p><h1>Seu gesto pode<br/>ser o <em>recomeço</em><br/>de alguém.</h1><p>Entre para acompanhar suas doações, seus pontos e o impacto que você cria.</p></div><LoginCollectionPreview/><div className="login-impact"><span><Heart fill="currentColor" size={20}/></span><p><b>Cada item</b><br/>pode encontrar um novo destino.</p></div></aside><section className="login-card"><div className="login-card-icon"><LogIn size={23}/></div><p className="kicker"><span/> ACESSE SUA CONTA</p><h2>Que bom ter você<br/><em>por aqui.</em></h2><p className="login-subtitle">Esta é uma experiência de demonstração. Informe nome e e-mail para acompanhar seus registros neste navegador.</p><form onSubmit={submit}><label>Como podemos te chamar?<span className="field-control"><UserRound size={17}/><input value={form.name} onChange={event=>setForm({...form,name:event.target.value})} placeholder="Seu nome" autoComplete="name"/></span></label><label>Seu melhor e-mail<span className="field-control"><Mail size={17}/><input type="email" value={form.email} onChange={event=>setForm({...form,email:event.target.value})} placeholder="voce@email.com" autoComplete="email"/></span></label><button className="primary-btn login-submit">Acessar minha demonstração <ArrowRight size={17}/></button></form><p className="login-footnote">Seus dados ficam salvos apenas neste navegador. Não é necessário criar senha.</p></section></section></main>
}

function About({nav}) { return <main className="inner-new about-page"><section className="app-wrap about-hero"><div><p className="kicker"><span/> SOBRE O VESTBEM</p><h1>Uma ideia em comum:<br/><em>fazer o bem circular.</em></h1><p>O VestBem nasceu da vontade de transformar itens parados em novos começos. Somos um grupo que acredita em tecnologia com propósito, cuidado nas relações e impacto que pode ser acompanhado por todos.</p><button className="primary-btn" onClick={()=>nav('/doar')}>Fazer parte da mudança <ArrowRight size={17}/></button></div><aside><Heart fill="currentColor" size={31}/><b>6 pessoas</b><span>unidas para aproximar<br/>quem pode doar de quem precisa.</span></aside></section><section className="about-values"><div className="app-wrap"><p className="kicker"><span/> O QUE NOS MOVE</p><div className="values-grid"><article><Sparkles/><h2>Propósito</h2><p>Criar uma experiência leve para transformar intenções em ações concretas.</p></article><article><UsersRound/><h2>Conexão</h2><p>Aproximar pessoas, instituições e empresas em uma rede que acolhe.</p></article><article><Recycle/><h2>Movimento</h2><p>Fazer com que cada item em bom estado encontre um novo significado.</p></article></div></div></section><AboutJourney/><section className="app-wrap team-section"><div className="section-title"><div><p className="kicker"><span/> QUEM FAZ ACONTECER</p><h2>Conheça o time por trás<br/>do <em>VestBem.</em></h2></div><p>Cada pessoa contribui com um olhar diferente para tornar a doação mais simples, humana e próxima.</p></div><div className="team-grid">{team.map(member=><article className="team-card" style={{display:'grid',gridTemplateColumns:'126px 1fr',gap:'17px',alignItems:'center',padding:'20px',overflow:'visible'}} key={member.name}><img src={member.image} alt={`Foto de ${member.name}`} style={{width:'126px',height:'126px',borderRadius:'50%',objectFit:'cover',objectPosition:member.position,boxShadow:'0 7px 18px #183d2820',border:'4px solid #eef8ef'}}/><div style={{padding:0}}><span>{member.role}</span><h3>{member.name}</h3><p>{member.text}</p>{member.linkedin && <a className="team-linkedin" href={member.linkedin} target="_blank" rel="noopener noreferrer" aria-label={`LinkedIn de ${member.name} (abre em nova aba)`}><span className="linkedin-mark" aria-hidden="true">in</span>LinkedIn<ArrowRight size={13}/></a>}</div></article>)}</div></section><section className="app-wrap about-closing"><div><Sparkles size={29}/><h2>Quando a gente trabalha junto,<br/><em>o impacto vai mais longe.</em></h2></div><button className="primary-btn" onClick={()=>nav('/impacto')}>Conhecer nosso impacto <ArrowRight size={17}/></button></section></main> }

function Impact({nav}) { const [active,setActive]=useState(0); const selectedCause=causes[active]; return <main className="inner-new"><div className="app-wrap"><div className="page-head impact-head"><p className="kicker"><span/> IMPACTO COLETIVO</p><h1>Quando a gente circula<br/>o bem, <em>tudo floresce.</em></h1><p>Explore exemplos de causas e veja como a comunidade pode gerar impacto.</p></div><div className="impact-summary"><div><Heart fill="currentColor"/><b>12.846</b><span>itens ganharam<br/>um novo destino</span></div><div><UsersRound/><b>2.518</b><span>pessoas fazem<br/>parte da rede</span></div><div><Recycle/><b>8.2 t</b><span>de resíduos evitados<br/>neste ano</span></div><div><Award/><b>38</b><span>instituições<br/>parceiras</span></div></div><div className="section-row cause-title"><div><p className="kicker"><span/> CAUSAS APOIADAS</p><h2>Onde seu gesto <em>chega.</em></h2></div><button className="outline-btn" onClick={()=>nav('/doar')}>Quero ajudar <ArrowRight size={16}/></button></div><div className="causes-grid">{causes.map((cause,i)=>{const Icon=cause.icon;return <article className={`cause-card ${cause.tone} ${active===i?'focused':''}`} key={cause.title} onClick={()=>setActive(i)} role="button" tabIndex="0" onKeyDown={event=>{if(event.target===event.currentTarget&&(event.key==='Enter'||event.key===' ')){event.preventDefault();setActive(i)}}}><div className="cause-icon"><Icon size={24}/></div><span>CAUSA PARCEIRA</span><h3>{cause.title}</h3><p>{cause.subtitle}</p><div className="cause-progress"><i style={{width:`${cause.progress}%`}}/><small>{cause.progress}% da meta anual</small></div><footer><b>{cause.goal}</b><button onClick={()=>nav('/doar')}>Apoiar <ArrowRight size={15}/></button></footer></article>})}</div><CauseDetails cause={selectedCause} index={active} nav={nav}/><section className="impact-cta"><div><Sparkles/><h2>Seu próximo gesto pode<br/>abrir uma <em>nova porta.</em></h2></div><button className="primary-btn" onClick={()=>nav('/doar')}>Fazer uma doação <ArrowRight size={17}/></button></section></div></main> }

function Reviews({save,toast}) {
  const [reviews,setReviews]=useState(()=>{const stored=readState().reviews; return Array.isArray(stored)&&stored.length?stored:initialReviews})
  const [open,setOpen]=useState(false)
  const [ratingFilter,setRatingFilter]=useState(0)
  const [reviewSearch,setReviewSearch]=useState('')
  const filteredReviews=reviews.filter(r=>(!ratingFilter||r.rate===ratingFilter)&&`${r.name} ${r.text}`.toLocaleLowerCase('pt-BR').includes(reviewSearch.toLocaleLowerCase('pt-BR')))
  const [form,setForm]=useState({name:'',text:'',rate:5})
  const update = (key, value) => setForm(current => ({ ...current, [key]: value }))
  const publish=e=>{ e.preventDefault(); if(!form.name.trim()||!form.text.trim())return;  const review={...form,name:form.name.trim(),text:form.text.trim(),role:'Membro da comunidade',color:'#78b796'}; const all=[review,...reviews]; setReviews(all); save({reviews:all}); setOpen(false); setForm({name:'',text:'',rate:5}); toast('Avaliação publicada. Obrigado por inspirar mais pessoas!') }
  return <main className="inner-new"><div className="app-wrap"><div className="page-head reviews-head"><p className="kicker"><span/> COMUNIDADE VESTBEM</p><h1>Histórias que mostram<br/>o tamanho de um <em>gesto.</em></h1><p>Histórias de exemplo e relatos publicados neste navegador mostram o potencial de cada gesto.</p><button className="primary-btn" onClick={()=>setOpen(true)}><Plus size={17}/> Compartilhar minha história</button></div><div className="review-overview"><div className="big-rate"><b>{(reviews.reduce((sum, review) => sum + review.rate, 0) / reviews.length).toFixed(1).replace('.', ',')}</b><span>{Array.from({length:5},(_,i)=><Star key={i} fill="currentColor" size={16}/>)}</span><small>média das avaliações</small></div><div><b>{reviews.filter(review => review.rate >= 4).length}</b><p>histórias com quatro<br/>ou cinco estrelas.</p></div><div><b>{reviews.length}</b><p>histórias compartilhadas<br/>pela comunidade.</p></div></div><ReviewDistribution reviews={reviews} selected={ratingFilter} onSelect={setRatingFilter}/><div className="reviews-toolbar"><label><Search size={17}/><input aria-label="Buscar relatos" placeholder="Buscar uma história ou pessoa" value={reviewSearch} onChange={e=>setReviewSearch(e.target.value)}/></label><span>{filteredReviews.length} relato(s){ratingFilter?` com ${ratingFilter} estrelas`: ""}</span>{(ratingFilter||reviewSearch)&&<button onClick={()=>{setRatingFilter(0);setReviewSearch('')}}>Limpar filtros</button>}</div><div className="all-stories">{filteredReviews.map((r,i)=><ReviewCard key={`${r.name}-${i}`} review={r}/>)}</div>{!filteredReviews.length&&<div className="member-empty"><Search/><h3>Nenhum relato encontrado.</h3><p>Tente outra palavra ou uma nota diferente.</p></div>}{open&&<div className="modal-layer" onClick={()=>setOpen(false)}><form role="dialog" aria-modal="true" aria-label="Compartilhar minha história" className="review-modal" onClick={e=>e.stopPropagation()} onSubmit={publish}><button className="modal-x" aria-label="Fechar relato" type="button" onClick={()=>setOpen(false)}><X/></button><p className="kicker"><span/> COMPARTILHE</p><h2>Como foi seu<br/><em>gesto de bem?</em></h2><label>Seu nome<input required maxLength={60} value={form.name} onChange={e=>update('name',e.target.value)} placeholder="Como você quer aparecer?"/></label><label>Sua nota<div className="rate-picker">{[1,2,3,4,5].map(n=><button type="button" aria-label={`${n} estrelas`} aria-pressed={n===form.rate} className={n<=form.rate?'on':''} onClick={()=>update('rate',n)} key={n}><Star fill="currentColor"/></button>)}</div></label><label>Conte sua experiência<textarea required minLength={10} maxLength={500} value={form.text} onChange={e=>update('text',e.target.value)} placeholder="O que te marcou nessa doação?"/></label><button className="primary-btn full-btn">Publicar história <ArrowRight size={17}/></button></form></div>}</div></main>
}

export default App
