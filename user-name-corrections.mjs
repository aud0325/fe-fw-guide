// User-reported Korean game labels; the English names and stable IDs are preserved.
export const userNameCorrections={velheit:'사부 벨하이트','azagas-bow':'아가제의 활',halberd:'핼버드',bolganone:'볼케논','cleansing-blade':'재계의 검',veroquine:'사검 벨로키네',ridersbane:'나이트 킬러','short-spear':'쇼트 스피어','short-axe':'쇼트 액스',longbow:'롱 보우'};
export const userWeaponMatches={'cleansing-blade':'清めの剣',veroquine:'邪剣ヴェロキネ',ridersbane:'ナイトキラー','short-spear':'ショートスピア','short-axe':'ショートアクス',longbow:'ロングボウ'};
export function applyUserNameCorrections(db,sources){
 const sourceId='user-item-names-20260926';
 sources[sourceId]={title:{ko:'사용자 게임 내 명칭 확인 · 2026-09-26',en:'User-reported in-game Korean names · 2026-09-26'},url:'./evidence/item-names-20260926.html',kind:'reference',note:{ko:'사용자가 게임에서 확인해 전달한 한국어 표기 10건입니다. 이번 전달에는 별도 화면이 첨부되지 않았습니다.',en:'Ten Korean labels reported by the user after checking the game. No additional screenshot accompanied this report.'}};
 for(const [id,ko] of Object.entries(userNameCorrections)){
  const e=db.get(id);if(!e)throw new Error(`Unknown corrected item: ${id}`);
  e.aliases=[...new Set([...e.aliases,e.name.ko,ko])];
  e.name={...e.name,ko};e.translation='user-reported';
  e.koreanNameEvidence={sourceId,method:'user-reported-game-label',checked:'2026-09-26'};
  e.sourceIds=[...new Set([...e.sourceIds,sourceId])];
 }
 const jpSource='game8-jp-817514';
 sources[jpSource]={title:{ko:'Game8 일본어판 · 무기 목록',en:'Game8 Japanese weapon list'},url:'https://game8.jp/fe-banshisenko/817514',kind:'guide',note:{ko:'2026-09-26 무기 이름·요구 기능·사거리를 대조했습니다. 한국어 이름은 사용자 제보에 근거합니다.',en:'Weapon names, required skills and ranges compared on 2026-09-26. Korean names are user-reported.'}};
 for(const [id,jp] of Object.entries(userWeaponMatches)){
  const e=db.get(id);e.aliases=[...new Set([...e.aliases,jp])];
  e.japaneseNameEvidence={name:jp,sourceId:jpSource,checked:'2026-09-26',method:'name-and-weapon-properties-match'};
  e.sourceIds=[...new Set([...e.sourceIds,jpSource])];
 }
 const sword=db.get('veroquine'),prior=sword.facts.find(f=>f.key==='rank');
 if(prior){prior.key='prior-index-rank';prior.label={ko:'기존 영어 색인 요구 랭크 · 불완전한 참고값',en:'Prior English index rank · incomplete reference'};}
 sword.facts.push({key:'rank',label:{ko:'요구 기능 · 사용자 제보 / Game8',en:'Required skills · user report / Game8'},value:'Sword B / Axe C',valueKo:'검 B / 도끼 C',literal:true,sourceId:jpSource});
}
