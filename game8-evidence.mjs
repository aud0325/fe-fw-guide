import {game8Data} from './game8.generated.mjs';
const bi=(ko,en)=>({ko,en});
const sourceId=page=>'game8-jp-'+page;
const evidence=bi('Game8 일본어 공략의 2차 보고입니다. 게임 내 독립 검증 전이며 새 가이드 제목·설명은 편집 번역입니다.','Secondary reporting from Game8 JP, not independently verified in-game. New guide titles and summaries are editorial translations.');
export function applyGame8(db,sources){
 Object.assign(sources,game8Data.sources);
 const get=id=>{const e=db.get(id);if(!e)throw new Error('Game8 target missing: '+id);return e;};
 const cite=(e,page)=>{e.sourceIds=[...new Set([...e.sourceIds,sourceId(page)])];};
 const map=(e,jp,page)=>{
  e.aliases=[...new Set([...e.aliases,jp])];
  e.japaneseNameEvidence={name:jp,sourceId:sourceId(page),checked:'2026-09-26',method:'editorial-name-and-role-match'};
  cite(e,page);
 };
 const fact=(e,page,key,label,value)=>{
  e.facts??=[];e.facts.push({key:'game8-'+key,label,value:value.en,valueKo:value.ko,sourceId:sourceId(page),literal:true});cite(e,page);
 };
 for(const [id,jp] of game8Data.mappings)map(get(id),jp,'index');
 const routeNames={cai:bi('카이','Cai'),dietrich:bi('디트리히','Dietrich'),theodora:bi('세오도라','Theodora'),leda:bi('레다','Leda')};
 for(const report of game8Data.recruitment){
  const e=get(report.id),prior=e.recruitment?.[report.route],r=routeNames[report.route];
  e.game8Recruitment??={};e.game8Recruitment[report.route]=report;
  cite(e,816618);
  if(!prior||prior.support!==report.support||prior.renown!==report.renown||prior.mode==='unknown'){
   const context=prior?.mode==='automatic'?bi('기존 출처는 자동 합류로 분류합니다. 튜토리얼 합류와 스카우트 수치 표기는 구분해야 합니다.','The existing source classifies this as automatic recruitment; distinguish tutorial recruitment from scouting thresholds.'):bi('기존 표와 다르거나 기존 수치가 미확인입니다. 추가 영입 조건은 별도 확인이 필요합니다.','Differs from the main table or supplies previously undocumented numbers. Additional recruitment requirements need separate checking.');
   fact(e,816618,'recruitment-'+report.route,bi(r.ko+' 영입 수치 대조 (Game8)',r.en+' recruitment comparison (Game8)'),bi(`지원 ${report.support} / 명성 ${report.renown}. ${context.ko}`,`Support ${report.support} / renown ${report.renown}. ${context.en}`));
  }
 }
 for(const [id,jp,places,food,flavor] of game8Data.mounts){
  const e=get(id);map(e,jp,816904);
  e.summary=places?bi('Game8 일본어 공략의 포획 지명과 먹이 정보를 수록했습니다. 시기별 출현·정확한 좌표는 확인 대기이며 출처 간 차이는 아래에 표시합니다.','Capture place names and food are documented by Game8 JP. Availability by period and exact coordinates remain unverified; source differences are shown below.'):bi('Game8은 알렉산드라 영입으로 얻는 탈것으로 안내합니다. 먹이 종류와 선호 맛은 아래를 확인하세요.','Game8 lists this mount as acquired through Alexandra recruitment. See below for food and flavor preferences.');
  const foodKo={Vegetables:'채소',Fish:'생선',Meat:'고기'}[food],flavorKo={Sweet:'단맛',Spicy:'매운맛',Bitter:'쓴맛',Delicacy:'진미'}[flavor];
  fact(e,816904,'bait',bi('먹이 종류·맛 (Game8)','Food and flavor (Game8)'),bi(foodKo+' / '+flavorKo,food+' / '+flavor));
  if(places)fact(e,816904,'capture',bi('포획 장소 · 일본어 (Game8)','Capture locations · Japanese (Game8)'),bi(places,places));
  else fact(e,816904,'acquisition',bi('획득 (Game8)','Acquisition (Game8)'),bi('알렉산드라 영입으로 획득','Obtained by scouting Alexandra'));
  if(['meganius','dark-pegasus'].includes(id))fact(e,816904,'food-conflict',bi('먹이 출처 충돌','Conflicting food reports'),bi('Game8은 매운맛. 기존 커뮤니티는 '+(id==='meganius'?'단맛(작성자 불확실)':'쓴맛')+'으로 보고합니다. 게임 내 확인이 필요합니다.','Game8: spicy. Existing community report: '+(id==='meganius'?'sweet (author uncertain)':'bitter')+'. In-game verification needed.'));
  fact(e,816904,'scope',bi('장소 목록의 범위','Location-list scope'),bi('카이편·구세편 합산 목록. 시기별 동일 출현 및 정확한 좌표는 확인 전입니다.','Combined Cai / Salvation list; identical availability by period and exact coordinates are not established.'));
 }
 for(const [id,page,jp,ko,en,valueKo,valueEn] of game8Data.additions){
  const e=get(id);map(e,jp,page);
  if(id==='klapka')e.lateJoin=bi([e.lateJoin?.ko,'Game8 JP: '+valueKo].filter(Boolean).join(' '),[e.lateJoin?.en,'Game8 JP: '+valueEn].filter(Boolean).join(' '));
  else fact(e,page,'report-'+page,bi(ko+' (Game8)',en+' (Game8)'),bi(valueKo,valueEn));
 }
 for(const guide of game8Data.guides){
  if(db.has(guide.id))throw new Error('Duplicate Game8 guide: '+guide.id);
  db.set(guide.id,{id:guide.id,type:'tip',name:guide.name,summary:guide.summary,body:guide.body,aliases:['Game8','ゲームエイト'],translation:'provisional',status:'community',sourceIds:[sourceId(guide.page)],facts:[],note:evidence,routeIds:guide.routeIds,links:guide.related.map(to=>({to,label:bi('관련 항목','Related entry'),sourceId:sourceId(guide.page)}))});
 }
 for(const guide of game8Data.guides)for(const to of guide.related)get(to);
}
export function applyGame8Items(db){
 const labels={gathering:bi('채집 장소 · 일본판 지명 (Game8)','Gathering · Japanese place names (Game8)'),drop:bi('드롭 적 (Game8)','Enemy drops (Game8)'),part1:bi('1부 던전 획득처 (Game8)','Part I dungeon sources (Game8)'),part3:bi('3부 던전 획득처 (Game8)','Part III dungeon sources (Game8)'),effect:bi('효과·성능 (Game8)','Effects / performance (Game8)')};
 for(const r of game8Data.itemReports||[]){
  const e=db.get(r.id);if(!e)throw Error('Game8 item target missing: '+r.id);
  const source=sourceId(r.page);
  e.aliases=[...new Set([...e.aliases,r.jp])];e.sourceIds=[...new Set([...e.sourceIds,source])];
  e.japaneseNameEvidence={name:r.jp,sourceId:source,checked:'2026-09-26',method:'editorial-item-name-and-category-match'};
  e.facts??=[];e.facts.push({key:'game8-item-'+r.key,label:labels[r.key],value:r.en,valueKo:r.ko,sourceId:source,literal:true});
  if(['gathering','part1','part3'].includes(r.key))e.missing=(e.missing||[]).filter(x=>x!=='Acquisition location');
 }
}
