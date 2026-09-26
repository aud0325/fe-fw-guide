import {statLabels} from './locales/labels.mjs';
import {displayText} from './presentation.mjs';
import {escapeHtml as esc} from './core.mjs';
export function characterDetails(e,{t,tx,name,href,entries}){
 if(e.type!=='character')return '';
 const text=x=>displayText(x,t,entries);
 const grid=(rows,percent=false)=>{
  const headings=()=>statLabels.map(([,ko,en])=>`<th scope="col">${t(ko,en)}</th>`).join('');
  const values=r=>statLabels.map(([k])=>`<td>${r.values[k]==null?'—':esc(r.values[k])+(percent?'%':'')}</td>`).join('');
  return `<div class="character-stats"><div class="table-wrap stats-wide"><table><thead><tr><th scope="col">${t('character.context')}</th>${headings()}</tr></thead><tbody>${rows.map(r=>`<tr><th scope="row">${esc(r.label)}</th>${values(r)}</tr>`).join('')}</tbody></table></div><div class="stats-narrow">${rows.map(r=>`<table><caption>${esc(r.label)}</caption><thead><tr>${headings()}</tr></thead><tbody><tr>${values(r)}</tr></tbody></table>`).join('')}</div></div>`;
 };
 let out='';
 out+=`<h2>${t('character.starting-stats')}</h2>`;
 if(e.baseStats?.length){out+=`<p class="result-label">${t('character.recorded-at-the-source-s-recruitment-point-level-and')}</p>`;
  out+=grid(e.baseStats.map(r=>({...r,label:`${t('character.lv')} ${r.level??'—'} · ${text(r.className)}`})));
  out+=e.baseStats.map(r=>`<p class="result-label">${esc(text(r.context))} · ${t('character.move')} ${esc(r.movement??'—')} · ${t('character.build')} ${esc(r.build??'—')}</p>`).join('');
 }else out+=`<p class="result-label">${t('character.starting-stats-are-not-documented-in-the-available-sources')}</p>`;
 out+=`<h2>${t('character.personal-growth-rates')}</h2>`;
 if(e.growthRates){out+=`<p class="result-label">${t('character.personal-rates-before-class-mount-and-other-modifiers')}</p>`;const rows=[{...e.growthRates,label:t('character.personal-base')}];if(e.modifiedGrowthRates)rows.push({...e.modifiedGrowthRates,label:tx(e.modifiedGrowthRates.condition)});out+=grid(rows,true);
  if(e.growthAlternative){out+=`<p class="notice">${t('character.sources-disagree-the-table-above-follows-serenes-forest-the')}</p>${grid([{...e.growthAlternative,label:t('character.conflicting-report')}],true)}`;}
 }else out+=`<p class="result-label">${t('character.personal-growth-rates-not-documented')}</p>`;
 out+=`<h2>${t('character.preferred-gifts')}</h2>`;
 if(e.gifts?.length){out+=`<p class="notice">${t('character.unverified-public-game8-export-only-reported-preferences-are-shown')}</p><div class="table-wrap"><table><thead><tr><th>${t('character.preference')}</th><th>${t('character.gift')}</th></tr></thead><tbody>`;
  out+=e.gifts.map(g=>{const item=entries.find(x=>x.id===g.itemId);return `<tr><td>${g.preference==='loved'?t('character.loved'):t('character.really-liked')}</td><td>${item?`<a href="${href(item.id)}">${esc(name(item))}</a>`:esc(text(t(g.nameKo||g.name,g.name)))}</td></tr>`}).join('')+'</tbody></table></div>';
 }else out+=`<p class="result-label">${t('character.gift-preferences-are-undocumented-this-does-not-imply-gifts')}</p>`;
 out+=`<details class="coverage"><summary>${t('character.support-partners-and-ranks-spoilers')} · ${e.supports?.length||0}</summary>`;
 if(e.supports?.length){out+=`<p class="notice">${t('character.ranks-from-the-game8-export-separate-from-recruitment-support')}</p><div class="table-wrap"><table><thead><tr><th>${t('character.partner')}</th><th>${t('character.reported-rank')}</th></tr></thead><tbody>`;
  out+=e.supports.map(s=>{const partner=entries.find(x=>x.id===s.partnerId);return `<tr><th><a href="${href(partner.id)}">${esc(name(partner))}</a></th><td>${esc([...new Set(s.reports.map(r=>r.rank))].join(' / '))}${s.conflict?' ⚠':''}</td></tr>`}).join('')+'</tbody></table></div>';
 }else out+=`<p>${t('character.support-data-is-undocumented-this-does-not-mean-supports')}</p>`;
 return out+'</details>';
}

