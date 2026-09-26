import {createTranslator} from './locales/index.mjs';
export {roleNames} from './locales/labels.mjs';
import {roleNames} from './locales/labels.mjs';
import {icon} from './icons.mjs';
import {displayText,localizedFacts} from './presentation.mjs';
import {paralogueDetails} from './paralogue-ui.mjs';
import {communityDetails} from './community-ui.mjs';
import {entries,routes,coverage,sources} from './data.mjs';
import {escapeHtml as esc} from './core.mjs';
import {characterDetails} from './character-ui.mjs';
import {foodDetails,mountFoodRow} from './food-ui.mjs';
import {foodFactKeys} from './food.mjs';
export function groupOptions(type){return type==='character'?Object.entries(roleNames):[...new Set(entries.filter(e=>e.type===type).map(e=>e.category).filter(Boolean))].sort().map(x=>[x,[displayText(x,createTranslator('ko'),entries),x]]);}
export function coveragePanel(t){const counts=['character','item','mount','class','location','quest'].map(type=>entries.filter(e=>e.type===type).length);return `<details class="coverage"><summary>${t('catalog.coverage-and-remaining-gaps')} · ${entries.length}</summary><p>${t('catalog.characters-items-mounts-classes-locations-quests',{characters:counts[0],items:counts[1],mounts:counts[2],classes:counts[3],locations:counts[4],quests:counts[5]})}</p><p>${t('catalog.audited-wiki-character-names-item-index-entries-weapon-rows',{characters:coverage.wikiCharacters.length,items:coverage.itemIndex.length,weapons:coverage.weaponTable.length,classes:coverage.classTable.length,recruitment:coverage.recruitmentGuide.length})}</p><p>${t('catalog.this-measures-source-list-coverage-not-completeness-of-the')}</p><p>${t('catalog.complete-mount-varieties-and-capture-sites-some-item-effects')}</p></details>`;}
export function catalogDetails(e,{t,tx,name,href,route='all',portraitHtml=''}){
 const text=(x,literal,key)=>displayText(x,t,entries,literal,key);
 const table=(facts,extraRows='')=>`<div class="table-wrap facts-table"><table><thead><tr><th>${t('catalog.field')}</th><th>${t('catalog.value')}</th></tr></thead><tbody>${extraRows}${facts.map(f=>`<tr><th>${esc(tx(f.label))}</th><td>${esc(text(t(f.valueKo||f.value,f.value),f.literal,f.key))}${sources[f.sourceId]?.kind==='unverified'?`<small class="field-reference">${t('catalog.field-reference-only')}</small>`:''}</td></tr>`).join('')}</tbody></table></div>`;
 let out=paralogueDetails(e,{t,tx,name,href,route});
 if(e.roles?.length)out+=`<p class="role-tags">${e.roles.map(r=>esc(t(...roleNames[r]))).join(' · ')}</p>`;
 out+=foodDetails(e,{t});
 const facts=localizedFacts((e.facts||[]).filter(f=>e.type!=='mount'||!foodFactKeys.includes(f.key)),t);
 const basic=facts.filter(f=>!['joins','first-appearance'].includes(f.key)),story=facts.filter(f=>['joins','first-appearance'].includes(f.key));
 const foodRow=mountFoodRow(e,{t});
 const basicHtml=(basic.length||foodRow)?`<h2>${t('catalog.reference-facts')}</h2>${table(basic,foodRow)}`:'';
 if(e.type==='character'&&portraitHtml)out+=basicHtml?`<div class="character-overview"><section class="character-basic">${basicHtml}</section>${portraitHtml}</div>`:portraitHtml;
 else out+=basicHtml;
 out+=characterDetails(e,{t,tx,name,href,entries});
 if(story.length||e.lateJoin)out+=`<details class="coverage"><summary>${t('catalog.appearances-later-recruitment-spoilers')}</summary>${story.length?table(story):''}${e.lateJoin?`<p>${esc(tx(e.lateJoin))}</p>`:''}</details>`;
 if(e.recruitment){out+=`<h2>${t('catalog.recruitment-by-route-part-i')}</h2><p class="result-label">${t('catalog.part-i-undocumented-n-a-unavailable-later-joins-listed')}</p><div class="table-wrap"><table><thead><tr><th>${t('common.route')}</th><th>${t('catalog.support')}</th><th>${t('catalog.renown')}</th><th>${t('catalog.requirement')}</th></tr></thead><tbody>${routes.map(([id,ko,en])=>{const r=e.recruitment[id],item=entries.find(x=>x.id===r.item);const mode=r.mode==='automatic'?t('common.automatic'):r.mode==='unavailable'?t('catalog.unavailable-n-a'):r.mode==='unknown'?t('catalog.not-documented'):'';return `<tr class="${route===id?'selected':''}"><th>${t(ko,en)}</th><td>${r.support??'—'}</td><td>${r.renown??'—'}</td><td>${mode}${item?`<a class="linkchip" href="${href(item.id)}">${esc(name(item))} × ${r.quantity} ${icon('arrow')}</a>`:r.requirement&&r.requirement!=='N/A'&&r.requirement!=='Automatic'?`<span>${esc(text(r.requirement))}</span>`:r.mode==='scout'?t('catalog.no-extra-item-listed'):''}</td></tr>`}).join('')}</tbody></table></div>`;}
 if(e.acquisition?.length)out+=`<h2>${t('catalog.reported-acquisition')}</h2><p class="notice">${t('catalog.these-are-unverified-secondary-reports-an-absent-route-or')}</p><div class="table-wrap"><table><thead><tr><th>${t('catalog.method')}</th><th>${t('catalog.location-quest')}</th><th>${t('catalog.route-chapter')}</th></tr></thead><tbody>${e.acquisition.map(a=>`<tr><td>${esc(text(a.method))}</td><td>${a.locationId?`<a href="${href(a.locationId)}">${esc(a.locationId?name(entries.find(e=>e.id===a.locationId)):text(a.where))}</a>`:esc(a.locationId?name(entries.find(e=>e.id===a.locationId)):text(a.where))}</td><td>${esc(text(a.route||'—'))} · ${a.chapter??'—'}</td></tr>`).join('')}</tbody></table></div>`;
 if(e.missing?.length)out+=`<p class="notice">${t('catalog.still-to-verify')}: ${esc(e.missing.map(text).join(' · '))}</p>`;

 out+=communityDetails(e,{t,tx,routes,route});
 return out;
}



