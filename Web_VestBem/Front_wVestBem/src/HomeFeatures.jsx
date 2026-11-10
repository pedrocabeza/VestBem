import { useEffect, useState } from 'react'
import { ArrowRight, Check, ChevronRight, Heart, Leaf, MapPin, PackageCheck, Shirt, Sparkles, BookOpen, Footprints, Mail, CodeXml as Github, ArrowUpRight } from 'lucide-react'

const API = import.meta.env.VITE_API_URL || ''
const campaigns = [
  { id: 'agasalho', title: 'Carinho que aquece', description: 'Casacos, mantas e roupas de frio para acolher novos começos.', category: 'Roupas', current: 360, goal: 500, label: 'peças', tone: 'mint' },
  { id: 'leitura', title: 'Uma página, um futuro', description: 'Livros conservados para abrir caminhos pela leitura.', category: 'Livros', current: 128, goal: 200, label: 'livros', tone: 'lavender' },
  { id: 'passos', title: 'Novos passos', description: 'Calçados em bom estado para acompanhar novas jornadas.', category: 'Calçados', current: 84, goal: 150, label: 'pares', tone: 'peach' },
]

export function HeroJourney({ nav }) {
  const [active, setActive] = useState(0)
  const stages = [
    { title: 'Uma peça parada.', text: 'O que está no seu armário pode continuar uma história.', icon: Shirt, label: 'Separe com carinho' },
    { title: 'Um encontro possível.', text: 'Encontre um ponto que recebe o que você quer doar.', icon: MapPin, label: 'Encontre um destino' },
    { title: 'Um novo começo.', text: 'Registre seu gesto e acompanhe sua jornada de doação.', icon: Heart, label: 'Coloque o bem em movimento' },
  ]
  const stage = stages[active]; const Icon = stage.icon
  return <div className="journey-scene"><div className="scene-orbit"/><div className="scene-note note-leaf"><Leaf size={17}/><span>Menos descarte.<b>Mais possibilidades.</b></span></div><div className="journey-window"><div className="window-heading"><span><i/><i/><i/></span><small>O CAMINHO DO BEM</small><Sparkles size={16}/></div><div className="journey-illustration" key={active}><div className="illustration-halo"/><Icon size={88} strokeWidth={1.25}/><span className="little-heart"><Heart size={20} fill="currentColor"/></span></div><h2>{stage.title}</h2><p>{stage.text}</p><div className="journey-controls" aria-label="Etapas da doação">{stages.map((item, index)=><button key={item.title} aria-label={item.label} aria-pressed={active===index} className={active===index?'active':''} onClick={()=>setActive(index)}><span>0{index+1}</span>{index<2&&<ChevronRight size={12}/>}</button>)}</div><button className="journey-action" onClick={()=>nav(active===1?'/pontos':'/doar')}>{stage.label}<ArrowRight size={17}/></button></div><div className="scene-note note-heart"><span className="note-check"><Check size={15}/></span><span>Seu próximo gesto<b>começa aqui.</b></span></div></div>
}

export function HomeFeatures({ nav }) {
  const [items, setItems] = useState(campaigns)
  const [selected, setSelected] = useState(0)
  const [category, setCategory] = useState('Roupas')
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState('')
  useEffect(()=>{ const controller=new AbortController(); fetch(`${API}/api/campanhas`,{signal:controller.signal}).then(r=>{if(!r.ok)throw Error();return r.json()}).then(value=>{if(Array.isArray(value)&&value.length)setItems(value)}).catch(()=>{}); return ()=>controller.abort() },[])
  const campaign = items[selected] || items[0]
  const guides = {
    Roupas: { icon: Shirt, title: 'Carinho em cada dobra.', text: 'Lave, seque e confira botões e costuras. Separe por tamanho para facilitar a organização.', tip: 'Uma sacola identificada já ajuda muito.' },
    Livros: { icon: BookOpen, title: 'Histórias prontas para continuar.', text: 'Confira se todas as páginas estão presentes e retire anotações pessoais ou papéis soltos.', tip: 'Proteja os livros da umidade durante o transporte.' },
    Calçados: { icon: Footprints, title: 'Um novo caminho começa pelo cuidado.', text: 'Higienize, confira o solado e una os pares. Doe calçados que ainda ofereçam conforto e segurança.', tip: 'Prenda os pares juntos e identifique a numeração.' },
  }
  const guide = guides[category]; const Icon = guide.icon
  async function subscribe(event) {
    event.preventDefault(); setStatus('sending')
    try { const response=await fetch(`${API}/api/interesses`,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({email})}); if(!response.ok)throw Error(); setStatus('success');setEmail('') } catch { setStatus('error') }
  }
  return <>
    <section className="campaign-section app-section"><div className="app-wrap"><div className="section-row"><div><p className="kicker"><span/> PEQUENOS GESTOS, UM OBJETIVO EM COMUM</p><h2>Escolha uma causa.<br/><em>Faça parte do próximo passo.</em></h2></div><p className="campaign-context">Campanhas ilustrativas para mostrar<br/>até onde uma rede pode chegar.</p></div><div className="campaign-layout"><div className="campaign-list">{items.map((item,index)=><button key={item.id} className={index===selected?'active':''} aria-pressed={index===selected} onClick={()=>setSelected(index)}><span>0{index+1}</span><div><small>{item.category}</small><b>{item.title}</b></div><ArrowRight size={18}/></button>)}</div><article className={`campaign-detail ${campaign.tone}`}><div className="campaign-topline"><span><Heart size={13}/> JUNTOS PELA MESMA CAUSA</span><small>Cenário de exemplo</small></div><h3>{campaign.title}</h3><p>{campaign.description}</p><div className="campaign-meter"><b>{campaign.current}<small> / {campaign.goal} {campaign.label}</small></b><span>{Math.round(campaign.current/campaign.goal*100)}%</span></div><div className="campaign-track" role="progressbar" aria-label={`Meta de ${campaign.title}`} aria-valuenow={campaign.current} aria-valuemin={0} aria-valuemax={campaign.goal}><i style={{width:`${Math.min(100,campaign.current/campaign.goal*100)}%`}}/></div><button onClick={()=>{sessionStorage.setItem('vestbem-donation-category',campaign.category);nav('/doar')}}>Quero contribuir <ArrowUpRight size={17}/></button></article></div></div></section>
    <section className="care-section"><div className="app-wrap care-layout"><div><p className="kicker"><span/> ANTES DE SAIR DE CASA</p><h2>Doar bem também<br/>é <em>cuidar dos detalhes.</em></h2><p>Escolha uma categoria e veja como preparar seus itens para a próxima história.</p><div className="care-tabs">{Object.keys(guides).map(item=><button key={item} className={category===item?'active':''} aria-pressed={category===item} onClick={()=>setCategory(item)}>{item}</button>)}</div><button className="text-btn" onClick={()=>nav('/pontos')}>Encontrar quem recebe <ArrowRight size={16}/></button></div><article className="care-card" key={category}><span className="care-icon"><Icon size={39} strokeWidth={1.5}/></span><small>GUIA DE PREPARAÇÃO · {category.toUpperCase()}</small><h3>{guide.title}</h3><p>{guide.text}</p><div><Check size={17}/>{guide.tip}</div></article></div></section>
    <section className="newsletter-section"><div className="app-wrap newsletter-layout"><div><span className="newsletter-icon"><Mail size={25}/></span><p className="kicker">VAMOS MANTER ESSA CONEXÃO?</p><h2>Boas notícias.<br/>Novos começos.</h2><p>Deixe seu e-mail para registrar seu interesse no VestBem.</p></div><form onSubmit={subscribe}><label htmlFor="community-email">Seu melhor e-mail</label><div><input id="community-email" type="email" required maxLength={254} value={email} onChange={e=>setEmail(e.target.value)} placeholder="voce@email.com"/><button disabled={status==='sending'}>{status==='sending'?'Enviando…':'Quero fazer parte'}<ArrowRight size={17}/></button></div><p role="status">{status==='success'?'✓ Interesse registrado. Obrigado por fazer parte!':status==='error'?'Não foi possível enviar. Confira se a API está em execução e tente novamente.':'Seu e-mail será usado apenas para novidades do projeto.'}</p></form></div></section>
  </>
}

export function GithubFooter() { return <a className="github-footer" href="https://github.com/pedrocabeza/VestBem" target="_blank" rel="noopener noreferrer"><Github size={25}/><span><small>UM PROJETO FEITO EM EQUIPE</small><b>Conheça o VestBem no GitHub</b><em>Acompanhe o código e a evolução do projeto.</em></span><ArrowUpRight size={22}/></a> }
