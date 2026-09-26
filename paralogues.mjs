import {content,formatContent} from './locales/content.mjs';
export const paralogueSource={title:'RPG Site · Paralogue windows — Adam Vitale',url:'https://www.rpgsite.net/guide/21387-fire-emblem-fortunes-weave-paralogues-how-to-access-all-paralogue-battles-where-to-find-them',kind:'guide',note:content['paralogues.checked-september-25-2026-acceptance-windows-and-effective-deadlines']};
const period=(start,end,deadline)=>({windows:[[start,end]],deadline});
const shared=(ids,value)=>Object.fromEntries(ids.map(id=>[id,structuredClone(value)]));
const trio=['cai','dietrich','theodora'];
export const paralogueSchedule={
 leda:{title:'Diversionary Tactics',giver:'leda',place:'Temple Row',routes:shared(['dietrich','theodora'],period('09/02','09/08','09/08')),note:content['paralogues.battle-on-9-8-a-community-schedule-instead-lists']},
 theodora:{title:'Missing Brave-Warrior Statue',giver:'bonaventure',place:'Temple Row',routes:{dietrich:period('09/03','09/12','09/15')}},
 bertrand:{title:"Friendly Match with Brigid's King",giver:'gabriel',place:'Arena Square',routes:{...shared(['cai','theodora'],period('09/17','09/25','09/25')),dietrich:period('09/17','09/17','09/17')},note:content['paralogues.dietrich-must-accept-and-complete-this-on-9-17']},
 talimun:{title:'Secret of the Vanished Carriage',giver:'talimun',place:'Port',routes:shared(trio,{windows:[['09/17','09/22'],['10/01','10/10']],deadline:'10/12'}),note:content['paralogues.dietrich-first-window-end-differs-rpg-site-9-22']},
 anna:{title:'Golden Secret',giver:'anna',place:'Dagsion Summit',routes:{...shared(['cai','theodora'],period('09/24','10/05','10/05')),dietrich:period('09/29','10/05','10/05')}},
 anatolia:{title:'Queen of the Erased',giver:'anatolia',place:'City Streets',routes:shared(['dietrich','leda'],period('10/05','10/14','10/17'))},
 cai:{title:'Great Escape',giver:'cai',place:'City Streets',routes:shared(['dietrich','theodora','leda'],period('10/16','10/22','10/22')),note:content['paralogues.battle-on-10-22']},
 dietrich:{title:'Sealed-Off Past',giver:'fabio',place:'Arena',routes:{theodora:period('10/16','10/24','10/24'),leda:period('10/16','10/22','11/01')},note:content['paralogues.theodora-s-actual-cutoff-is-chapter-12-ending-10']},
 orchel:{title:"Orchel's Regret",giver:'orchel',place:'Lower Temple Row',routes:{cai:period('10/18','10/20','10/21'),dietrich:period('10/18','10/25','10/27'),theodora:period('10/18','10/24','10/24'),leda:period('10/18','10/25','10/27')},note:content['paralogues.cai-and-theodora-end-earlier-than-the-generic-10']}
};
export function applyParalogues(merged,sources){
 sources['paralogue-schedule']=paralogueSource;
 for(const [owner,schedule]of Object.entries(paralogueSchedule)){
  const e=merged.get('paralogue-'+owner);if(!e)throw Error('Missing paralogue '+owner);
  const character=merged.get(owner),giver=merged.get(schedule.giver);
  e.type='paralogue';e.status='guide';e.schedule={...schedule,owner,sourceId:'paralogue-schedule'};
  e.name.en=schedule.title;e.routeIds=Object.keys(schedule.routes);
  e.summary=formatContent('paralogue-summary',{ko:{owner:character.name.ko,giver:giver.name.ko},en:{owner:character.name.en,giver:giver.name.en}});
  e.aliases=[...new Set([...e.aliases,'외전','Paralogue',character.name.ko,character.name.en,...character.aliases,giver.name.ko,giver.name.en,character.group||'',character.koreanNameEvidence?.section||'',...Object.values(schedule.routes).flatMap(r=>[...r.windows.flat(),r.deadline])])];
  e.sourceIds=[...new Set([...e.sourceIds,'paralogue-schedule'])];
  if(!e.links.some(l=>l.to===giver.id))e.links.push({to:giver.id,label:content['paralogues.quest-giver'],sourceId:'paralogue-schedule'});
 }
}
export function dateValue(value){const [m,d]=value.split('/').map(Number);return m*100+d;}
export function scheduleRows(list,route='all',order='start'){
 return list.filter(e=>e.schedule).map(e=>({e,windows:Object.entries(e.schedule.routes).filter(([id])=>route==='all'||route===id)})).filter(r=>r.windows.length).sort((a,b)=>{
  if(order==='owner')return a.e.schedule.owner.localeCompare(b.e.schedule.owner);
  const key=row=>Math.min(...row.windows.flatMap(([,v])=>order==='deadline'?[dateValue(v.deadline)]:v.windows.map(w=>dateValue(w[0]))));
  return key(a)-key(b)||a.e.id.localeCompare(b.e.id);
 });
}
