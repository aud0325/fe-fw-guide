import {types} from './locales/labels.mjs';
import {routes} from './data.mjs';
import {normalizeItemFilters} from './item-types.mjs';
import {normalizeItemFlavor} from './food.mjs';
export const defaultState=()=>({type:'all',id:null,query:'',route:'all',scout:'all',includeTips:true,group:'',order:'start',itemMajor:'',itemMinor:'',itemKind:'',itemFlavor:''});
export function pagePath(state,lang='ko',base='/'){
 return base+lang+'/'+(state.id?'entry/'+encodeURIComponent(state.id)+'/':state.type==='all'?'':'category/'+encodeURIComponent(state.type)+'/');
}
export function stateQuery(state){
 const p=new URLSearchParams();
 if(state.type==='character'&&!state.id&&routes.some(([id])=>id===state.scout))p.set('scout',state.scout);
 if(state.type==='item'&&normalizeItemFlavor(state.itemFlavor))p.set('flavor',state.itemFlavor);
 for(const [key,value]of Object.entries({q:state.query,route:state.route==='all'?'':state.route,tips:state.includeTips?'':'0',group:state.group,sort:state.order==='start'?'':state.order,main:state.itemMajor,sub:state.itemMinor,kind:state.itemKind}))if(value)p.set(key,value);
 return p.size?'?'+p:'';
}
export function readRoute(url,base='/',fallback='ko'){
 const legacy=/^#(?:entry\/|category\/|\?)/.test(url.hash);
 const relative=url.pathname.startsWith(base)?url.pathname.slice(base.length):null;
 if(relative===null)return null;
 let parts=relative.replace(/index\.html$/,'').split('/').filter(Boolean),lang=['ko','en'].includes(parts[0])?parts.shift():fallback;
 if(legacy)parts=url.hash.slice(1).split('?')[0].split('/').filter(Boolean);
 if(parts.length&&!(parts.length===2&&['entry','category'].includes(parts[0])))return null;
 const state=defaultState(),params=new URLSearchParams(legacy?url.hash.split('?')[1]||'':url.search);
 if(parts[0]==='entry'){try{state.id=decodeURIComponent(parts[1]);}catch{return null;}}
 if(parts[0]==='category'){
  if(!Object.hasOwn(types,parts[1]))return null;
  state.type=parts[1];
 }
 state.query=params.get('q')||'';state.group=params.get('group')||'';
 state.scout=state.type==='character'&&!state.id&&routes.some(([id])=>id===params.get('scout'))?params.get('scout'):'all';
 state.route=routes.some(r=>r[0]===params.get('route'))?params.get('route'):'all';state.includeTips=params.get('tips')!=='0';
 state.order=['start','deadline','owner'].includes(params.get('sort'))?params.get('sort'):'start';
 Object.assign(state,normalizeItemFilters({itemMajor:params.get('main')||'',itemMinor:params.get('sub')||'',itemKind:params.get('kind')||''}));
 state.itemFlavor=state.type==='item'?normalizeItemFlavor(params.get('flavor')):'';
 if(state.type==='quest'&&state.group==='Paralogue'){state.type='paralogue';state.group='';}
 if(state.type==='item'&&state.group){Object.assign(state,normalizeItemFilters({...state,group:state.group}));state.group='';}
 return {state,lang,legacy};
}
export function rewriteLinks(html,lang,base){
 return html.replace(/href="#((?:entry\/|category\/)[^" ]*|)"/g,(_,hash)=>{
  const route=readRoute(new URL(base+'#'+hash,'https://local.invalid'),base,lang);
  return route?`href="${pagePath(route.state,lang,base)}${stateQuery(route.state).replaceAll('&','&amp;')}"`:_;
 });
}
