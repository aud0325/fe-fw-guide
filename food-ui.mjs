import {flavors,foodKinds,ingredientFlavorId,preferredMountFood} from './food.mjs';
import {classifyItem} from './item-types.mjs';
import {escapeHtml as esc} from './core.mjs';
export function ingredientFlavorLabel(e,t){const f=flavors[ingredientFlavorId(e)];return t(f.ko,f.en);}
export function foodDetails(e,{t}){
 if(e.type==='item'&&foodKinds[classifyItem(e).kind]){
  const observed=e.ingredientFlavor?.basis==='game-ui';
  const conflicts=(e.ingredientFlavorReports||[]).filter(r=>r.flavor!==e.ingredientFlavor?.flavor);
  return `<section class="food-details"><h2>${t('item.flavor')}</h2><p><strong>${esc(ingredientFlavorLabel(e,t))}</strong></p><p class="result-label">${observed?t('item.flavor-video',{time:e.ingredientFlavor.time}):t(e.ingredientFlavor?'item.flavor-basis':'item.flavor-unknown')}</p>${conflicts.map(r=>`<p class="notice">${t('item.flavor-description-differs',{flavor:t(flavors[r.flavor].ko,flavors[r.flavor].en)})}</p>`).join('')}</section>`;
 }
 return '';
}
export function mountFoodRow(e,{t}){
 if(e.type!=='mount')return '';
 const preferred=preferredMountFood(e);
 let value=t('item.food-unknown');
 if(preferred){
  const {kind,flavor}=preferred;
  const label=[kind?t(foodKinds[kind].ko,foodKinds[kind].en):t('item.food-kind-unknown'),t(flavors[flavor].ko,flavors[flavor].en)].join(' · ');
  value=kind&&flavor!=='unknown'?`<a class="linkchip food-match" href="#category/item?main=materials&sub=ingredients&kind=${kind}&flavor=${flavor}">${esc(label)}</a>`:esc(label);
 }
 return `<tr><th>${t('item.preferred-food')}</th><td>${value}</td></tr>`;
}
