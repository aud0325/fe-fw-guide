import {feedbackLink} from './feedback.mjs';
import {createTranslator} from './locales/index.mjs';
import {types} from './locales/labels.mjs';
import {icon} from './icons.mjs';
import {itemIcon,itemTypeLabel,itemFilters} from './item-ui.mjs';
import {classifyItem,normalizeItemFilters} from './item-types.mjs';
import {itemMedia} from './item-media.mjs';
import {navigationGroups,navigationContext,filterContext,listingState} from './navigation.mjs';
import {localized,referenceSection,displayText,characterFaction} from './presentation.mjs';
import {paralogueOverview} from './paralogue-ui.mjs';
import {catalogDetails,coveragePanel,groupOptions} from './catalog-ui.mjs';
import {entries,sources,routes,updated} from './data.mjs';
import {media} from './media.mjs';
import {searchEntries,relatedTo,escapeHtml as esc} from './core.mjs';
import {rewriteLinks} from './routing.mjs';
import {searchShortcuts} from './search-shortcuts.mjs';
import {foodKinds} from './food.mjs';
import {ingredientFlavorLabel} from './food-ui.mjs';
import {scoutRoute,sortScouts,scoutConditions,scoutToolbar} from './character-list.mjs';
export function renderPage(state,lang='ko',visibleLimit=36,base='/'){
 const t=createTranslator(lang),tx=x=>displayText(localized(x,lang),t,entries),name=e=>displayText(tx(e.name),t,entries),text=x=>displayText(x,t,entries);
 const href=id=>'#entry/'+encodeURIComponent(id),label=type=>types[type][lang==='ko'?0:1];
 const brandName=t('app.fire-emblem-fortune-s-weave-encyclopedia');
function portrait(e,full=false){const m=media[e.id]||e.portrait;return e.type==='character'&&m?`<img class="portrait" src="${esc(full?m.src:(m.thumbnailSrc||m.src))}" alt="${esc(name(e))}" loading="lazy" decoding="async" width="${m.width||240}" height="${m.height||240}">`:'';}
function mapFigure(){const m=media.dagda;return `<figure class="map-figure"><div class="map-controls"><strong>${t('app.map-of-dagda')}</strong><button type="button" data-map-zoom="out" aria-label="${t('app.zoom-out')}">${icon('remove')}</button><output id="map-scale" aria-live="polite">100%</output><button type="button" data-map-zoom="in" aria-label="${t('app.zoom-in')}">${icon('add')}</button><button type="button" data-map-zoom="reset">${t('app.fit')}</button><a href="${esc(m.originalUrl||m.src)}" target="_blank" rel="noopener noreferrer">${t('app.open-image')} ${icon('external')}</a></div><div class="map-viewport" tabindex="0" role="region" aria-label="${t('app.continent-map-scroll-to-pan-after-zooming')}"><img id="world-map-image" src="${esc(m.src)}" alt="${t('app.map-showing-dagda-s-kingdoms-regions-seas-and-place')}" width="${m.width||500}" height="${m.height||353}" decoding="async"></div><p class="result-label">${t('app.zoom-then-scroll-or-swipe-to-pan-this-map')}</p></figure>`;}
function sourceList(ids){return `<div class="sources">${ids.map(id=>{const s=sources[id];return `<div class="source"><a href="${esc(s.url)}" target="_blank" rel="noopener noreferrer">${esc(tx(s.title))} ${icon('external')}</a><small>${t('common.checked')} ${updated} · ${esc(({official:t('app.official-2'),guide:t('app.guide-2'),community:t('app.community'),reference:t('app.reference'),unavailable:t('app.unavailable'),unverified:t('app.unverified')})[s.kind]||s.kind)}</small><p>${esc(tx(s.note))}</p></div>`}).join('')}</div>`;}
function card(e){
 const facts=e.facts||[];const value=key=>facts.find(f=>f.key===key)?.value;
 const r=state.type==='character'&&scoutRoute(state)!=='all'?e.recruitment?.[scoutRoute(state)]:null;
 const meta=r?r.mode==='automatic'?t('common.automatic'):r.mode==='unavailable'?t('app.unavailable-2'):r.mode==='unknown'?t('app.unknown'):t('app.s')+(r.support??'—')+' · '+t('app.r')+(r.renown??'—'):e.type==='item'?[itemTypeLabel(e,{t}).split(' · ').at(-1),value('might')?t('app.mt')+value('might'):'',value('rank')?value('rank')+' '+t('app.rank'):'',foodKinds[classifyItem(e).kind]?ingredientFlavorLabel(e,t):''].filter(Boolean).join(' · '):e.type==='character'?characterFaction(e,t,entries):e.category||label(e.type);
 const cardHref=href(e.id)+(r?'?route='+scoutRoute(state):'');
 return `<a class="card compact-card" href="${cardHref}">${portrait(e)}${e.type==='item'?itemIcon(e,{t}):''}<div class="card-copy"><h3>${esc(name(e))}</h3><p class="card-meta">${esc(r?scoutConditions(e,scoutRoute(state),t):text(meta))}</p></div></a>`;
}
function atlas(){const places=entries.filter(e=>e.type==='location');const groups=[['Capital',t('app.capital-dagsion')],['Saveilon',t('app.saveilon')],['Southern Dagda',t('app.southern-dagda')],['Northwestern desert',t('app.northwestern-desert')],['Dagsion outskirts',t('app.dagsion-outskirts')],['Pasithea',t('app.pasithea')],['Nation',t('app.nations')],['Unverified',t('app.region-unverified')]];return `<p class="notice">${t('app.related-location-index-below-the-continent-map-does-not')}</p><div class="region-grid">${groups.map(([region,title])=>`<section class="region"><h3>${title}</h3>${places.filter(e=>e.region===region).map(e=>`<a href="${href(e.id)}">${esc(name(e))}</a>`).join('')}</section>`).join('')}</div>`;}
function detail(e){
 const outgoing=(e.links||[]).filter(l=>state.includeTips||entries.find(x=>x.id===l.to)?.type!=='tip');
 const incoming=relatedTo(entries,e.id).filter(x=>state.includeTips||x.type!=='tip');
 const relation=l=>{const target=entries.find(x=>x.id===l.to);return `<a class="relation" href="${href(l.to)}"><small>${esc(tx(l.label))}</small><strong>${esc(name(target))}</strong>${icon('arrow')}</a>`};
 let body=`<article class="detail detail-top"><div class="breadcrumbs"><a href="#">${t('app.archive')}</a> / <a href="#category/${e.type}">${label(e.type)}</a></div><div class="detail-title"><div><span class="eyebrow">${label(e.type)} / ${t('app.encyclopedia')}</span><h1 tabindex="-1" id="entry-title">${e.type==='item'?itemIcon(e,{t},'item-detail-icon'):''}${esc(name(e))}</h1>${e.type==='item'?`<p class="item-classification">${esc(itemTypeLabel(e,{t}))}</p>`:''}</div>${feedbackLink(lang)}</div><p class="body">${esc(tx(e.summary))}</p>`;
 let portraitHtml='';
 if(e.type==='character'&&(media[e.id]||e.portrait)){const m=media[e.id]||e.portrait;portraitHtml=`<figure class="character-figure">${portrait(e,true)}<figcaption><a href="${esc(m.src)}" target="_blank" rel="noopener">${t('app.view-full-size-image')} ${icon('external')}</a>${m.width?` · ${m.width} × ${m.height}`:''}</figcaption></figure>`;}
 if(lang==='ko'&&e.translation==='provisional')body+=`<p class="result-label">${t('app.korean-provisional')}</p>`;
 if(e.body)body+=`<p class="body">${esc(tx(e.body))}</p>`;
 if(e.note)body+=`<p class="notice">${esc(tx(e.note))}</p>`;
 body+=catalogDetails(e,{t,tx,name,href,route:state.route,portraitHtml});
 if(e.type==='mount'&&state.route!=='all'&&e.routeIds&&!e.routeIds.includes(state.route))body+=`<p class="notice">${t('app.this-capture-method-is-documented-for-cai-s-route')}</p>`;
 if(e.type==='map')body+=mapFigure()+atlas();
 if(outgoing.length)body+=`<h2>${t('app.follow-the-trail')}</h2><div class="relations">${outgoing.map(relation).join('')}</div>`;
 if(incoming.length)body+=`<h2>${t('app.linked-from')}</h2><div class="relations">${incoming.map(x=>relation({to:x.id,label:{ko:label(x.type),en:label(x.type)}})).join('')}</div>`;
 body+=references([e],e.type==='map'?[media.dagda]:e.type==='item'?[itemMedia[classifyItem(e).icon]]:[media[e.id]||e.portrait])+'</article>';
 return body;
}
const references=(list,images=[])=>referenceSection(list,{sources,t,tx,updated,images});
 let html='';const e=entries.find(x=>x.id===state.id);
 if(state.id){html=e?detail(e):`<div class="empty"><h2>${t('app.entry-not-found')}</h2><a class="back" href="#">${t('app.back-to-archive')}</a></div>`;}
 else if(state.type==='sources'){html=`<div class="section-head"><h2>${t('app.source-register')}</h2><small>${updated}</small></div><p class="notice">${t('app.unavailable-or-stale-pages-are-not-treated-as-verified')}</p>${coveragePanel(t)}${sourceList(Object.keys(sources))}`;}
 else if(state.type==='paralogue'){html=paralogueOverview(searchEntries(entries,listingState(state,entries)),state,{t,tx,name,href});}
 else{
  const matches=searchEntries(entries,listingState(state,entries));const list=state.type==='character'?sortScouts(matches,scoutRoute(state)):matches;const home=state.type==='all'&&!state.query;
  const shortcuts=state.type==='all'?searchShortcuts(state.query):[];
  if(shortcuts.length)html+=`<div class="search-shortcuts">${shortcuts.map(s=>`<a class="card compact-card search-shortcut" href="#category/${s.category}">${icon(s.category)}<div class="card-copy"><h3>${t(s.titleKey)}</h3><p class="card-meta">${t(s.descriptionKey)}</p></div>${icon('arrow')}</a>`).join('')}</div>`;
  if(home){html+=`<p class="community-shortcuts"><a class="linkchip" href="#entry/weekly-routine">${t('app.daily-weekly-checklist')}</a> <a class="linkchip" href="#category/paralogue">${t('app.paralogue-schedules')}</a> <a class="linkchip" href="#entry/community-guide-index">${t('app.korean-guide-index')}</a></p><details class="quick-disclosure"><summary>${t('app.quick-trails')}</summary><div class="section-head"><h2>${t('app.quick-trails-2')}</h2><small>${t('app.connected-step-by-step')}</small></div><div class="journeys"><section class="journey"><span class="eyebrow">01 / ${t('app.recruitment')}</span><h3>${t('app.from-recruitment-to-gathering')}</h3><p>${t('app.follow-the-item-all-the-way-to-its-source')}</p><div class="path"><a href="#entry/ninae">${t('app.ninae')}</a>${icon('arrow')}<a href="#entry/paradise-fish">${t('app.paradise-fish')}</a>${icon('arrow')}<a href="#entry/lake-brontes">${t('app.lake-brontes')}</a></div></section><section class="journey"><span class="eyebrow">02 / ${t('app.mounts')}</span><h3>${t('app.in-search-of-a-rare-mount')}</h3><p>${t('app.find-cai-s-capture-location-and-preferred-bait')}</p><div class="path"><a href="#entry/monoceros">${t('app.monoceros')}</a>${icon('arrow')}<a href="#entry/oleance-plains">${t('app.oleance-plains')}</a>${icon('add')}<a href="#entry/hakseng">${t('app.hakseng')}</a></div></section></div></details>`;}
  html+=`<div class="section-head"><h2>${state.query?t('app.search-results'):label(state.type)}</h2><small role="status" aria-live="polite">${list.length}${t('common.entries')}</small></div>`;
  if(state.type==='character')html+=scoutToolbar(state,t);
  if(state.type==='item'&&state.itemFlavor&&!list.length)html+="<p class=\"notice\">"+t('item.flavor-empty')+'</p>';
  if(state.type==='map'&&!state.query)html+=mapFigure()+atlas();
  if(state.type==='item')html+=itemFilters(searchEntries(entries,{...listingState(state,entries),group:'',itemMajor:'',itemMinor:'',itemKind:'',itemFlavor:''}),state,{t});
  const options=groupOptions(state.type);if(state.type!=='item'&&options.length>1)html+=`<label class="catalog-filter">${t('app.filter-category')} <select id="catalog-group"><option value="">${t('common.all')}</option>${options.map(([id,n])=>`<option value="${esc(id)}" ${state.group===id?'selected':''}>${esc(t(...n))}</option>`).join('')}</select></label>`;
  html+=list.length?`<div class="cards">${list.slice(0,visibleLimit).map(card).join('')}</div>`:shortcuts.length?'':`<div class="empty"><h3>${t('app.no-matching-entries')}</h3><p>${t('app.try-another-name-english-or-korean-or-reset-the')}</p></div>`;
  if(list.length>visibleLimit)html+=`<button id="show-more" class="load-more">${t('app.show-36-more')} (${visibleLimit} / ${list.length})</button>`;
 }
 const pageTitle=state.id?(e?name(e):t('app.not-found')):state.query?t('app.search-results'):state.type!=='all'?label(state.type):'';
 const title=pageTitle?`${pageTitle} · ${t('app.fortune-s-weave-encyclopedia')}`:brandName;
 const description=(e?[name(e),tx(e.summary),tx(e.note)].filter(Boolean).join(' · '):pageTitle?pageTitle+' · '+t('app.description'):t('app.description')).replace(/<[^>]*>/g,'').replace(/\s+/g,' ').slice(0,180);
 if(!state.id&&state.type!=='all')html=html.replace('<h2>','<h1>').replace('</h2>','</h1>');
 if(!state.id)html=html.replace(/(<div class="section-head"><h[12]>[\s\S]*?<\/h[12]>)(<small[\s\S]*?<\/small>)(<\/div>)/g,(_,heading,count,end)=>heading+'<div class="heading-actions">'+count+feedbackLink(lang)+'</div>'+end);
 return {html:rewriteLinks(html,lang,base),title,description,missing:Boolean(state.id&&!e)};
}


