import {matchesItemFilters} from './item-types.mjs';
import {koreanGameplayValue} from './locales/gameplay-terms.mjs';
import {flavors} from './food.mjs';
export function normalize(value){return String(value).normalize('NFKC').toLocaleLowerCase().replace(/[\s’'“”"·:.,!?()\-_/]/g,'');}
export function searchEntries(entries,{query='',type='all',route='all',includeTips=true,group='',itemMajor='',itemMinor='',itemKind='',itemFlavor=''}={}){
 const tokens=query.trim().split(/\s+/).map(normalize).filter(Boolean);
 return entries.filter(e=>(type!=='item'||matchesItemFilters(e,{itemMajor,itemMinor,itemKind,itemFlavor}))&&(type==='all'||e.type===type)&&(!group||e.category===group||e.roles?.includes(group))&&(includeTips||e.type!=='tip')&&(route==='all'||!e.routeIds||e.routeIds.includes(route))).map(e=>{
  const names=[e.name.ko,e.name.en,...e.aliases].map(normalize);
  if(e.ingredientFlavor){const f=flavors[e.ingredientFlavor.flavor];names.push(normalize(f.ko),normalize(f.en));}
  const all=normalize([...names,e.summary.ko,e.summary.en,e.type,e.category||'',...(e.facts||[]).filter(f=>!['joins','first-appearance'].includes(f.key)).flatMap(f=>[f.value,f.valueKo||'',koreanGameplayValue(f.value,f.literal?'':f.key)]),...(e.gifts||[]).flatMap(g=>[g.name,g.nameKo||'']),...(e.giftCategoryReports||[]).map(r=>r.text),...(e.gathering||[]).flatMap(r=>[r.region,r.where])].join(' '));
  const score=tokens.reduce((s,t)=>s+(names.includes(t)?100:names.some(n=>n.startsWith(t))?50:all.includes(t)?10:-10000),0);
  return {e,score,match:tokens.every(t=>all.includes(t))};
 }).filter(x=>x.match).sort((a,b)=>b.score-a.score).map(x=>x.e);
}
export function relatedTo(entries,id){return entries.filter(e=>e.id!==id&&(e.links||[]).some(l=>l.to===id));}
export function escapeHtml(value){return String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}
