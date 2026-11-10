import { useState } from 'react'
import { ArrowRight, Check, MapPin, PackageCheck, Heart, Leaf, UsersRound, Sparkles, ArrowUpRight, CodeXml } from 'lucide-react'

export function PointDirectory({ points, choose }) {
  return <section className="point-directory"><div className="directory-intro"><span className="directory-icon"><MapPin size={24}/></span><div><b>Escolha seu próximo destino.</b><p>3 locais ilustrativos · Confira as categorias e os horários.</p></div></div><div className="directory-grid">{points.map((point,index)=><button key={point.id} onClick={()=>choose(point.id)}><div><span>0{index+1}</span><ArrowUpRight size={19}/></div><h3>{point.name}</h3><p>{point.area}</p><small>{point.schedule}</small><div className="directory-tags">{point.types.slice(0,3).map(type=><span key={type}>{type}</span>)}</div><b>Explorar no mapa<ArrowRight size={15}/></b></button>)}</div></section>
}

export function DeliveryChecklist() {
  const [checks,setChecks]=useState([])
  const items=['Itens limpos e secos','Bom estado de conservação','Sacola ou caixa identificada']
  return <section className="delivery-checklist"><div><p className="kicker"><span/> PRONTO PARA SAIR?</p><h2>Uma entrega com<br/><em>cuidado em cada detalhe.</em></h2><p>Marque o que já preparou. Um pequeno checklist para facilitar seu próximo gesto.</p></div><div><span>{checks.length} de {items.length} cuidados preparados</span>{items.map(item=><label key={item}><input type="checkbox" checked={checks.includes(item)} onChange={()=>setChecks(old=>old.includes(item)?old.filter(c=>c!==item):[...old,item])}/><span>{item}</span><Check size={17}/></label>)}<p aria-live="polite">{checks.length===3?'Tudo preparado! Confira o horário e combine a entrega.':'Seu cuidado faz diferença para quem recebe.'}</p></div></section>
}

export function CauseDetails({ cause, index, nav }) {
  const descriptions=[
    'Roupas do dia a dia, calçados conservados e itens de cuidado ajudam a acolher famílias em momentos de mudança.',
    'Peças adequadas para entrevistas e para o trabalho podem fazer parte de uma jornada de autonomia e novas oportunidades.',
    'Conforto e acolhimento acompanham uma rotina de cuidado com pessoas idosas. Peças fáceis de vestir também importam.',
  ]
  const [quantity,setQuantity]=useState(5)
  return <section className="cause-detail-panel"><div className={`cause-detail-art tone-${index}`}><Heart size={74} strokeWidth={1}/><span>O BEM CHEGA<br/>ATRAVÉS DE VOCÊ.</span><small>CAUSA ILUSTRATIVA · 0{index+1}</small></div><div><p className="kicker"><span/> CONHEÇA A CAUSA SELECIONADA</p><h3>{cause.title}</h3><p>{descriptions[index]}</p><div className="cause-facts"><span><UsersRound size={17}/>{cause.goal}</span><span><PackageCheck size={17}/>{cause.progress}% da meta no exemplo</span></div><div className="impact-calculator"><label htmlFor="impact-items">Seu próximo gesto pode começar com <b>{quantity} itens.</b></label><input id="impact-items" type="range" min="1" max="30" value={quantity} onChange={e=>setQuantity(Number(e.target.value))}/><p><Sparkles size={16}/>{quantity} itens = {quantity*10} pontos para sua coleção.</p></div><button className="primary-btn" onClick={()=>nav('/doar')}>Quero fazer parte<ArrowRight size={16}/></button></div></section>
}

export function AboutJourney() {
  const [selected,setSelected]=useState(0)
  const stages=[
    ['Escutar','Tudo começa com pessoas.','Entender a dificuldade de doar e de encontrar um destino para itens conservados orienta as escolhas do projeto.',UsersRound],
    ['Conectar','Tecnologia que aproxima.','Uma interface clara reúne quem quer contribuir, pontos de coleta e causas que podem receber apoio.',Heart],
    ['Evoluir','Uma construção em movimento.','Cada teste e nova conversa ajudam a melhorar a experiência. O projeto evolui junto com o aprendizado da equipe.',Leaf],
  ]
  const stage=stages[selected]; const Icon=stage[3]
  return <section className="about-journey app-wrap"><div><p className="kicker"><span/> DA IDEIA AO PRIMEIRO GESTO</p><h2>Uma construção feita<br/><em>de gente e propósito.</em></h2></div><div className="journey-editorial"><div className="editorial-tabs">{stages.map(([name],i)=><button className={i===selected?'active':''} key={name} aria-pressed={i===selected} onClick={()=>setSelected(i)}><span>0{i+1}</span>{name}<ArrowRight size={17}/></button>)}</div><article key={selected}><Icon size={35}/><small>ETAPA 0{selected+1}</small><h3>{stage[1]}</h3><p>{stage[2]}</p></article></div><a className="about-source" href="https://github.com/pedrocabeza/VestBem" target="_blank" rel="noopener noreferrer"><CodeXml size={23}/><span><b>A evolução também está no código.</b><small>Conheça o repositório e acompanhe o projeto.</small></span><ArrowUpRight size={20}/></a></section>
}

export function ReviewDistribution({ reviews, selected, onSelect }) {
  return <div className="review-distribution"><div><p className="kicker">CADA EXPERIÊNCIA CONTA</p><h2>Vozes diferentes.<br/><em>Uma mesma vontade.</em></h2><p>Explore os relatos por nota e descubra novas perspectivas da comunidade.</p></div><div>{[5,4,3,2,1].map(rate=>{const count=reviews.filter(r=>r.rate===rate).length;return <button key={rate} className={selected===rate?'active':''} aria-pressed={selected===rate} onClick={()=>onSelect(selected===rate?0:rate)}><span>{rate} estrelas</span><i><b style={{width:`${reviews.length?count/reviews.length*100:0}%`}}/></i><small>{count}</small></button>})}</div></div>
}
