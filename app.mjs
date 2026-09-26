import {trackPage} from './analytics.mjs';
import {renderPage} from './page-renderer.mjs';
import {defaultState,pagePath,stateQuery,readRoute,rewriteLinks} from './routing.mjs';
import {createTranslator} from './locales/index.mjs';
import {types} from './locales/labels.mjs';
import {icon} from './icons.mjs';
import {setupNavigationDrawer} from './drawer.mjs';
import {normalizeItemFilters} from './item-types.mjs';
import {normalizeItemFlavor,foodKinds} from './food.mjs';
import {navigationGroups,navigationContext,filterContext} from './navigation.mjs';
import {localized} from './presentation.mjs';
import {bindCommunityControls} from './community-ui.mjs';
import {entries,sources,routes} from './data.mjs';
import {escapeHtml as esc} from './core.mjs';
const $=id=>document.getElementById(id);
const saved=(()=>{try{return localStorage.getItem('fw-language')}catch{return null}})();
const basePath=new URL(document.baseURI).pathname;
const initialRoute=readRoute(new URL(location.href),basePath,saved==='en'?'en':'ko');
let lang=initialRoute?.lang||'ko';
let visibleLimit=36;
let state=initialRoute?.state||defaultState();
let t=createTranslator(lang);
const tx=x=>localized(x,lang);
const label=type=>types[type][lang==='ko'?0:1];
function nav(){
 const current=navigationContext(state,entries);
 const expanded=new Map([...$('navigation').querySelectorAll('[data-nav-group]')].map(el=>[el.dataset.navGroup,el.open]));
 const link=key=>`<a href="${key==='all'?'#':'#category/'+key}" class="${current.type===key?'active':''}" ${current.type===key?`aria-current="${state.id?'location':'page'}"`:''}>${icon(key)}<span>${label(key)}</span><span class="count">${key==='sources'?Object.keys(sources).length:key==='all'?entries.length:entries.filter(e=>e.type===key).length}</span></a>`;
 $('navigation').innerHTML=link('all')+navigationGroups.map(group=>`<details class="nav-group ${current.group===group.id?'current-group':''}" data-nav-group="${group.id}" ${current.group===group.id||(expanded.get(group.id)??true)?'open':''}><summary>${esc(tx(group.label))}${icon('expand')}</summary><div class="nav-children">${group.types.map(link).join('')}</div></details>`).join('')+link('sources');
}
function renderFilters(){
 const controls=filterContext(state,entries);
 // The schedule overview already has route tabs; avoid a duplicate selector.
 const routeVisible=controls.route&&(state.id||state.type!=='paralogue');
 $('route-filter').hidden=!routeVisible;
 $('tips-filter').hidden=!controls.tips;
 document.querySelector('.page-filters').hidden=!routeVisible&&!controls.tips;
 document.querySelector('.page-filters').setAttribute('aria-label',t('app.filters'));
 $('filter-toggle').textContent=t('app.filters')+(routeVisible&&state.route!=='all'?' · '+routes.find(r=>r[0]===state.route)[lang==='ko'?1:2]:'')+(controls.tips&&!state.includeTips?t('app.no-tips'):'');
}
function render(){
 t=createTranslator(lang);nav();document.documentElement.lang=lang;$('language-value').textContent=t('app.language-switch-label');
 document.querySelector('meta[name="description"]').content=t('app.description');
 const brandName=t('app.fire-emblem-fortune-s-weave-encyclopedia');
 const logo=document.querySelector('.brand-logo');
 logo.src=lang==='ko'?'./assets/encyclopedia-logo.png':'./assets/encyclopedia-logo-en.png';
 logo.alt=brandName;
 document.querySelector('.brand').setAttribute('aria-label',brandName+t('app.home'));
 $('menu-toggle').setAttribute('aria-label',t('app.open-menu'));
 $('menu-close').setAttribute('aria-label',t('app.close-menu'));
 $('language-label').textContent=t('app.language');
 document.querySelector('.intro').hidden=Boolean(state.id||state.type!=='all'||state.query);
 $('clear-search').hidden=!state.query;
 $('clear-search').setAttribute('aria-label',t('app.clear-search'));
 $('home-categories').innerHTML=['character','item','class','paralogue'].map(key=>`<a href="#category/${key}">${icon(key)}<span>${label(key)}</span>${icon('arrow')}</a>`).join('');
 $('language').setAttribute('aria-label',t('app.switch-to-korean'));
 document.querySelector('.skip').textContent=t('app.skip-to-content');
 document.querySelector('.brand-name').textContent=brandName;
 document.querySelector('.brand small').textContent=t('app.unofficial-fan-encyclopedia');
 document.querySelector('.intro .eyebrow').textContent='FAN ENCYCLOPEDIA';
 for(const [id,ko,en]of routes)$('route').querySelector(`[value="${id}"]`).textContent=t(ko,en);
 document.querySelector('.edition').textContent=t('app.unofficial-fan-encyclopedia');
 document.querySelector('.aside-title').textContent=t('app.fortune-s-weave-encyclopedia');
 $('navigation').setAttribute('aria-label',t('app.categories'));
 document.querySelector('.search-area').setAttribute('aria-label',t('app.search'));
 $('headline').textContent=brandName;$('intro-text').textContent=t('app.from-recruiting-allies-to-preparing-for-battle-find-your');
 $('search-label').textContent=t('app.search-the-archive');$('search').placeholder=t('app.search-names-items-places');$('route-label').textContent=t('app.your-route');$('route').options[0].textContent=t('app.all-routes');$('tips-label').textContent=t('app.include-community-tips');$('reset').textContent=t('app.reset');$('filter-toggle').textContent=t('app.filters')+(state.route!=='all'?' · '+routes.find(r=>r[0]===state.route)[lang==='ko'?1:2]:'')+(!state.includeTips?t('app.no-tips'):'');
 $('footer').innerHTML=`<a href="${basePath}${lang}/directory/">${t('app.all-documents')}</a> · <a href="${esc(pagePath(state,lang==='ko'?'en':'ko',basePath)+stateQuery(state))}">${lang==='ko'?'English':'한국어'}</a><br>`+t('app.unofficial-fan-project-not-affiliated-with-nintendo-or-intelligent');
 const page=renderPage(state,lang,visibleLimit,basePath);
 $('content').innerHTML=page.html;
 updateMetadata(page);
 trackPage();
 document.querySelectorAll('a[href^="#"]').forEach(a=>{if(a.classList.contains('skip')){a.href=location.pathname+location.search+'#main';return;}const next=rewriteLinks(a.outerHTML,lang,basePath);if(next!==a.outerHTML){const holder=document.createElement('template');holder.innerHTML=next;a.href=holder.content.firstElementChild.getAttribute('href');}});
 document.querySelector('.brand').href=pagePath(defaultState(),lang,basePath);
 document.querySelector('.skip').href=location.pathname+location.search+'#main';
 renderFilters();
 bindCommunityControls($('content'));
 $('content').querySelectorAll('[data-scout-route]').forEach(b=>b.addEventListener('click',()=>{state.scout=b.dataset.scoutRoute;state.route='all';state.group='';visibleLimit=36;$('route').value='all';saveHash();render();$('content').querySelector(`[data-scout-route="${state.scout}"]`)?.focus({preventScroll:true});}));
 const updateItems=(next,focusSelector)=>{Object.assign(state,normalizeItemFilters(next));state.itemFlavor=normalizeItemFlavor(next.itemFlavor??state.itemFlavor);if(state.itemMajor==='equipment'||(state.itemMinor&&state.itemMinor!=='ingredients')||(state.itemKind&&!foodKinds[state.itemKind]))state.itemFlavor='';state.group='';visibleLimit=36;saveHash();render();if(focusSelector)$('content').querySelector(focusSelector)?.focus({preventScroll:true});};
 $('content').querySelectorAll('[data-item-major]').forEach(b=>b.addEventListener('click',()=>updateItems({itemMajor:b.dataset.itemMajor},`[data-item-major="${b.dataset.itemMajor}"]`)));
 $('content').querySelectorAll('[data-item-minor]').forEach(b=>b.addEventListener('click',()=>updateItems({itemMajor:state.itemMajor,itemMinor:b.dataset.itemMinor},`[data-item-minor="${b.dataset.itemMinor}"]`)));
 $('item-kind')?.addEventListener('change',()=>updateItems({...state,itemKind:$('item-kind').value},'#item-kind'));
 $('item-flavor')?.addEventListener('change',()=>{state.itemFlavor=normalizeItemFlavor($('item-flavor').value);visibleLimit=36;saveHash();render();$('item-flavor')?.focus({preventScroll:true});});
 $('content').querySelector('[data-item-reset]')?.addEventListener('click',()=>updateItems({itemFlavor:''},'[data-item-major=""]'));

 $('content').querySelectorAll('[data-paralogue-route]').forEach(b=>b.addEventListener('click',()=>{state.route=b.dataset.paralogueRoute;$('route').value=state.route;saveHash();render()}));
 $('paralogue-order')?.addEventListener('change',()=>{state.order=$('paralogue-order').value;saveHash();render()});
 $('catalog-group')?.addEventListener('change',()=>{state.group=$('catalog-group').value;visibleLimit=36;saveHash();render()});
 $('show-more')?.addEventListener('click',()=>{visibleLimit+=36;render()});
 $('content').querySelectorAll('img').forEach(img=>img.addEventListener('error',()=>{img.hidden=true;const note=document.createElement('p');note.className='result-label';note.textContent=t('app.image-unavailable-please-visit-the-source-link');img.after(note);},{once:true}));
}
document.addEventListener('click',event=>{const button=event.target.closest('[data-map-zoom]');if(!button)return;const img=$('world-map-image');if(!img)return;const current=Number(img.dataset.zoom||1);const action=button.dataset.mapZoom;const zoom=action==='reset'?1:Math.max(1,Math.min(4,current+(action==='in'?.5:-.5)));img.dataset.zoom=zoom;img.style.width=(zoom*100)+'%';$('map-scale').textContent=Math.round(zoom*100)+'%';if(action==='reset'){const viewport=img.parentElement;viewport.scrollTop=0;viewport.scrollLeft=0;}});
function updateMetadata(page){
 document.title=page.title;
 for(const [selector,value]of [['meta[name="description"]',page.description],['meta[property="og:title"]',page.title],['meta[property="og:description"]',page.description]])document.querySelector(selector)?.setAttribute('content',value);
 const origin=document.querySelector('meta[name="site-url"]')?.content;
 const canonical=origin?new URL(pagePath(state,lang,basePath),origin).href:'';
 document.querySelector('link[rel="canonical"]')?.setAttribute('href',canonical);
 document.querySelector('meta[property="og:url"]')?.setAttribute('content',canonical);
 document.querySelector('meta[property="og:locale"]')?.setAttribute('content',lang==='ko'?'ko_KR':'en_US');
 document.querySelector('meta[property="og:image"]')?.setAttribute('content',new URL('assets/encyclopedia-logo'+(lang==='en'?'-en':'')+'.png',origin||document.baseURI).href);
 document.querySelectorAll('link[rel="alternate"][hreflang]').forEach(link=>link.href=new URL(pagePath(state,link.hreflang==='en'?'en':'ko',basePath),origin||location.origin).href);
 document.querySelector('meta[name="robots"]')?.setAttribute('content',!origin||stateQuery(state)||page.missing?'noindex,follow':'index,follow');
}
function remember(){history.replaceState({...history.state,scroll:scrollY,limit:visibleLimit},'',location.href);}
function parseLocation(){
 const route=readRoute(new URL(location.href),basePath,lang);
 if(!route){location.reload();return;}
 state=route.state;lang=route.lang;visibleLimit=history.state?.limit||36;
 if(route.legacy||location.pathname===basePath)history.replaceState(history.state,'',pagePath(state,lang,basePath)+stateQuery(state));
 $('search').value=state.query;$('route').value=state.route;$('tips').checked=state.includeTips;render();
}
function saveHash(){history.replaceState({...history.state,limit:visibleLimit},'',pagePath(state,lang,basePath)+stateQuery(state));}
document.addEventListener('click',event=>{
 const a=event.target.closest('a[href]');
 if(!a||a.target||a.hasAttribute('download')||a.classList.contains('skip')||event.defaultPrevented||event.button!==0||event.ctrlKey||event.metaKey||event.shiftKey||event.altKey)return;
 const url=new URL(a.href);if(url.origin!==location.origin||url.hash)return;
 const route=readRoute(url,basePath,lang);if(!route)return;
 if(route.state.id&&!entries.some(e=>e.id===route.state.id))return;
 event.preventDefault();remember();
 if(state.route!=='all'&&!url.searchParams.has('route'))route.state.route=state.route;
 if(!state.includeTips&&!url.searchParams.has('tips'))route.state.includeTips=false;
 history.pushState({scroll:0,limit:36},'',pagePath(route.state,route.lang,basePath)+stateQuery(route.state));
 parseLocation();window.scrollTo(0,0);$('entry-title')?.focus({preventScroll:true});
});
history.scrollRestoration='manual';
window.addEventListener('popstate',()=>{parseLocation();requestAnimationFrame(()=>window.scrollTo(0,history.state?.scroll||0));});
window.addEventListener('hashchange',()=>{if(/^#(?:(?:entry|category)\/|\?)/.test(location.hash))parseLocation();});
let composing=false;$('search').addEventListener('compositionstart',()=>composing=true);$('search').addEventListener('compositionend',()=>{composing=false;search()});function search(){if(composing)return;visibleLimit=36;state.query=$('search').value;state.id=null;if(state.type==='sources')state.type='all';saveHash();render();window.scrollTo(0,0);}$('search').addEventListener('input',search);
 $('route').addEventListener('change',()=>{state.route=$('route').value;saveHash();render()});$('tips').addEventListener('change',()=>{state.includeTips=$('tips').checked;saveHash();render()});
 $('reset').addEventListener('click',()=>{state.route='all';state.includeTips=true;state.group='';Object.assign(state,normalizeItemFilters());state.itemFlavor='';state.order='start';visibleLimit=36;$('route').value='all';$('tips').checked=true;saveHash();render()});
 $('language').addEventListener('click',()=>{remember();lang=lang==='ko'?'en':'ko';try{localStorage.setItem('fw-language',lang)}catch{}history.pushState({scroll:scrollY,limit:visibleLimit},'',pagePath(state,lang,basePath)+stateQuery(state));render()});
document.addEventListener('keydown',event=>{if(event.key==='/'&&!['INPUT','TEXTAREA','SELECT'].includes(document.activeElement.tagName)){event.preventDefault();$('search').focus()}if(event.key==='Escape'&&document.activeElement===$('search')){$('search').value='';search()}});
setupNavigationDrawer();
$('clear-search').addEventListener('click',()=>{$('search').value='';search();$('search').focus()});
parseLocation();




