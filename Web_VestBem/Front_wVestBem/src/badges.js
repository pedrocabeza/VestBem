import { Heart, Leaf, Shirt, BookOpen, Footprints, Sparkles, Sun, Sprout, HandHeart, Recycle, Compass, Mountain, Flame, ShieldCheck, Gem, Trees, Crown, Star, Award, Globe } from 'lucide-react'

export const badgeTiers = [
  { name: 'Básica', cost: 50, color: 'sage' },
  { name: 'Intermediária', cost: 150, color: 'blue' },
  { name: 'Avançada', cost: 300, color: 'purple' },
  { name: 'Especial', cost: 500, color: 'copper' },
  { name: 'Lendária', cost: 1000, color: 'gold' },
]
const definitions = [
  ['primeiro-gesto','Primeiro gesto',Heart,'Toda grande história começa com um pequeno gesto.',0],
  ['folha-viva','Folha viva',Leaf,'Um lembrete de que cuidar das pessoas também é cuidar do planeta.',0],
  ['novo-abraco','Novo abraço',Shirt,'O carinho de uma peça que ganha outra história.',0],
  ['pagina-aberta','Página aberta',BookOpen,'Histórias que circulam e abrem novos caminhos.',0],
  ['novos-passos','Novos passos',Footprints,'Cada passo pode aproximar quem quer ajudar.',0],
  ['boa-energia','Boa energia',Sun,'A luz de quem compartilha o que tem.',0],
  ['semente','Semente do bem',Sprout,'O início de uma jornada que pode florescer.',0],
  ['mao-amiga','Mão amiga',HandHeart,'Estar presente também é uma forma de acolher.',0],
  ['ciclo-bom','Ciclo do bem',Recycle,'Mais movimento, mais uso, menos desperdício.',0],
  ['centelha','Centelha',Sparkles,'Pequenos cuidados que inspiram outras pessoas.',0],
  ['explorador','Explorador do bem',Compass,'Um olhar atento para novas formas de contribuir.',1],
  ['trilha','Na mesma trilha',Mountain,'Uma jornada construída gesto por gesto.',1],
  ['chama','Chama solidária',Flame,'Uma vontade de ajudar que continua acesa.',1],
  ['guardiao','Guardião do cuidado',ShieldCheck,'Cuidado e constância em cada escolha.',1],
  ['joia','Joia da comunidade',Gem,'O valor de quem faz o bem circular.',2],
  ['floresta','Floresta de gestos',Trees,'Uma semente vira muitas possibilidades.',2],
  ['estrela','Estrela que guia',Star,'Uma jornada capaz de inspirar novos começos.',2],
  ['horizonte','Além do horizonte',Globe,'O impacto de um gesto pode ir mais longe.',3],
  ['legado','Legado do bem',Award,'Um símbolo para uma coleção de boas histórias.',3],
  ['grande-guardiao','Grande guardião',Crown,'A insígnia mais rara de uma jornada feita de cuidado.',4],
]
export const badges = definitions.map(([id,name,icon,description,tier],index)=>({id,name,icon,description,tier,index:index+1,cost:badgeTiers[tier].cost,color:badgeTiers[tier].color,tierName:badgeTiers[tier].name}))

export function ownedBadges(profile) { return badges.filter(badge=>(profile.badges || []).includes(badge.id)) }
