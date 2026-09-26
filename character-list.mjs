import {routes} from './locales/labels.mjs';
import {escapeHtml as esc} from './core.mjs';
export const scoutRoute=state=>routes.some(([id])=>id===state.scout)?state.scout:'all';
export function sortScouts(list,route){
 if(route==='all')return list;
 const eligible=list.filter(e=>e.type==='character'&&e.recruitment?.[route]&&e.recruitment[route].mode!=='unavailable');
 const rank=e=>{const r=e.recruitment[route];return [r.mode==='automatic'?0:r.mode==='scout'&&r.renown!=null&&r.support!=null?1:2,r.renown??Infinity,r.support??Infinity,r.item||r.gold||r.requirement&&!['N/A','Automatic',''].includes(r.requirement)?1:0];};
 return eligible.sort((a,b)=>{const x=rank(a),y=rank(b);for(let i=0;i<x.length;i++)if(x[i]!==y[i])return x[i]<y[i]?-1:1;return a.name.en.localeCompare(b.name.en);});
}
export function scoutConditions(e,route,t){
 const r=e.recruitment?.[route];if(!r)return t('scout.unknown');
 if(r.mode==='automatic')return t('common.automatic');
 if(r.mode==='unknown')return t('scout.unknown');
 return t('scout.conditions',{renown:r.renown??'—',support:r.support??'—'})+(r.item||r.gold||r.requirement&&!['N/A','Automatic',''].includes(r.requirement)?' · '+t('scout.additional'):'');
}
export function scoutToolbar(state,t){
 const selected=scoutRoute(state),route=routes.find(([id])=>id===selected);
 return `<section class="scout-toolbar" aria-label="${t('scout.label')}"><div class="scout-routes">${[['all',t('scout.default')],...routes.map(([id,ko,en])=>[id,t(ko,en)])].map(([id,name])=>`<button type="button" data-scout-route="${id}" aria-pressed="${selected===id}">${esc(name)}</button>`).join('')}</div><p class="scout-caption" role="status">${route?t('scout.selected',{name:t(route[1],route[2])}):t('scout.factions')}</p>${route?`<p class="result-label">${t('scout.order')}</p>`:''}</section>`;
}
