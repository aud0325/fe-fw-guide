import {content} from './locales/content.mjs';
import {names,relations} from './locales/curated-names.mjs';
import {namuProfiles} from './namu-profiles.generated.mjs';
// Korean text transcribed from namu.wiki pages read on 2026-09-26 (local snapshots: research/namu/*.html).
// English IDs are editorial matches by faction, role and description, not an official bilingual chart.
const text=(ko,en)=>({ko,en});
const wiki='https://namu.wiki/w/';
export const namuSources={
 'namu-characters-2026-09-26':{title:'나무위키 · 만자천홍/등장인물 (2026-09-26 15:04 판)',url:wiki+'파이어%20엠블렘%20만자천홍/등장인물',kind:'community',note:content['namu.characters-note'],snapshot:'research/namu/characters.html'},
 'namu-animals':{title:'나무위키 · 만자천홍/동물 (2026-09-26 14:54 판)',url:wiki+'파이어%20엠블렘%20만자천홍/동물',kind:'community',note:content['namu.animals-note'],snapshot:'research/namu/animals.html'},
 'namu-dagda':{title:'나무위키 · 다그다 대륙 (2026-09-26 00:28 판)',url:wiki+'다그다%20대륙',kind:'community',note:content['namu.dagda-note'],snapshot:'research/namu/dagda.html'},
 'namu-crests':{title:'나무위키 · 만자천홍/혈인 (2026-09-25 22:47 판)',url:wiki+'파이어%20엠블렘%20만자천홍/혈인',kind:'community',note:content['namu.crests-note'],snapshot:'research/namu/crests.html'},
 'namu-classes':{title:'나무위키 · 만자천홍/클래스 (2026-09-26 13:49 판)',url:wiki+'파이어%20엠블렘%20만자천홍/클래스',kind:'community',note:content['namu.classes-note'],snapshot:'research/namu/classes.html'},
 'namu-dagsion':{title:'나무위키 · 다그시온 (2026-09-17 16:19 판)',url:wiki+'다그시온',kind:'community',note:content['namu.dagsion-note'],snapshot:'research/namu/dagsion.html'},
 'namu-character-pages':{title:'나무위키 · 캐릭터 개별 문서 '+namuProfiles.length+'건 (2026-09-26 열람)',url:wiki+'분류:파이어%20엠블렘%20만자천홍/등장인물',kind:'community',note:content['namu.character-pages-note'],snapshot:'research/namu/char/'}
};
const profileLabels={
 fullName:text('풀네임','Full name'),alias:text('이명','Epithet'),cv:text('성우 · 일본 / 북미','Voice actors · JP / EN'),
 age:text('나이','Age'),birthday:text('생일','Birthday'),height:text('키','Height'),nationality:text('국적','Nationality'),
 hobby:text('취미','Hobbies'),likes:text('좋아하는 것','Likes'),dislikes:text('싫어하는 것','Dislikes'),
 class:text('초기 클래스','Starting class'),personalSkill:text('고유 스킬','Personal skill'),blazeArts:text('블레이즈 아츠','Blaze Arts'),fieldCommand:text('필드 커맨드','Field command')
};
const profileOrder=['fullName','alias','cv','age','birthday','height','nationality','hobby','likes','dislikes','class','personalSkill','blazeArts','fieldCommand'];
const CHARACTERS='namu-characters-2026-09-26';
const row=(id,ko,section,sourceId=CHARACTERS,extra={})=>({id,ko,section,sourceId,method:'faction-and-role-match',...extra});
// Names absent from the 2026-09-25 user-supplied snapshot. Role clues quoted in docs/KOREAN_NAMES.md.
export const namuCharacterNames=[
 row('kalla','칼라','3. 다그다 제국'),row('smyrnos','스미르노스','3. 다그다 제국'),row('mars','마스','3. 다그다 제국'),row('jurah','주라','3. 다그다 제국'),
 row('credna','크레르','3. 다그다 제국',CHARACTERS,{note:content['namu.match-credna']}),
 row('lind','린드','3. 다그다 제국'),row('iliana','일리아나','3. 다그다 제국'),row('nomved','놈베데','3. 다그다 제국',CHARACTERS,{note:content['namu.match-nomved']}),row('gabriel','가브리엘','3. 다그다 제국'),
 row('raksha','락샤','3. 다그다 제국 · 미트라스 수도회'),row('shenlo','신라','3. 다그다 제국 · 미트라스 수도회',CHARACTERS,{note:content['namu.match-hanja']}),row('baozi','표자','3. 다그다 제국 · 미트라스 수도회',CHARACTERS,{note:content['namu.match-hanja']}),row('yanjin','암진','3. 다그다 제국 · 미트라스 수도회',CHARACTERS,{note:content['namu.match-hanja']}),
 row('guillermo','키예르모','3. 다그다 제국',CHARACTERS,{aliases:['키예르모 코엔디아'],note:content['namu.match-guillermo']}),
 row('sergio','세르히오','4. 살라미스 왕국'),row('dyan','다얀','4. 살라미스 왕국'),row('kleitos','클레이토스','4. 살라미스 왕국',CHARACTERS,{note:content['namu.match-family-name']}),row('tabatha','타비사','4. 살라미스 왕국',CHARACTERS,{note:content['namu.match-family-name']}),
 row('gilchris','길키르스','5. 아라고 왕국'),row('martila','마르티라','5. 아라고 왕국'),row('lechner','레히넬','5. 아라고 왕국'),row('balboa','볼보아','5. 아라고 왕국'),
 row('balor','발로르','7. 명계군'),
 row('maria','마리아','8. 기타'),row('sinza','신더','8. 기타',CHARACTERS,{note:content['namu.match-sinza']}),row('mahdel','마들','8. 기타',CHARACTERS,{note:content['namu.match-mahdel']}),row('cetus','케투스','8. 기타'),row('yu-phas','유 파스','8. 기타'),
 row('lamine','라민','각주 · 라민의 문장','namu-crests'),row('blaiddyd','블레다드','각주 · 블레다드의 문장','namu-crests'),row('seiros','세이로스','1. 개요 · 세이로스 교단','namu-dagda')
];
// Short relationship or role notes; plot outcomes are intentionally omitted.
const relationFacts=[
 ['castor','카이의 아버지. 전 아우로라 신전 발칸으로 카이에게 창·검·도끼술을 가르쳤다.',['cai','auroras-temple']],
 ['nomved','크레르 신전의 대사제. 리네의 아버지.',['credna','ninae']],
 ['sinza','에스메랄다의 아버지. 딸에게 작살을 물려주었다.',['esmeralda','sinzas-trident']],
 ['mahdel','레다의 스승. 레다가 찾는 원수 명단을 작성했다.',['leda']],
 ['dyan','살라미스 왕국의 왕자. 세오도라의 남동생.',['theodora','kingdom-of-saramis']],
 ['sergio','살라미스 왕국의 선왕. 세오도라의 이름(세오도라 세르히오 사반그렌)에 미들네임으로 들어간다.',['theodora','kingdom-of-saramis']],
 ['aswan','아라고 왕국의 여왕. 정식 이름은 아스완 하스드루발 아라곤.',['kingdom-of-arago','bertrand','tahonia']],
 ['gilchris','아라고 왕국의 왕. 하급 병사에서 장군으로 오른 인물.',['kingdom-of-arago','aswan']],
 ['martila','아라고 왕국의 재상.',['kingdom-of-arago']],
 ['lechner','아라고 국왕의 친위대장. 「광견」이라 불린다.',['kingdom-of-arago','leda']],
 ['balboa','아라고 왕국의 여장군.',['kingdom-of-arago','leda']],
 ['lind','아라고와 주라의 아들. 크레르의 이복형.',['jurah','credna']],
 ['jurah','아라고의 아내이자 다그다의 두 번째 아내. 크레르와 린드의 어머니.',['character-dagda','credna','lind']],
 ['credna','다그다와 주라의 아들. 대장장이 역할을 맡은 신.',['character-dagda','jurah','nomved']],
 ['mars','군신. 브레저란트 왕국의 조상 브레저가 그 피를 잇는다고 한다.',['kingdom-of-brezarant']],
 ['kalla','다그다 대륙의 신들 중 하나.',[]],['smyrnos','다그다 대륙의 신들 중 하나.',[]],
 ['yu-phas','살라미스 왕국에서 숭배하는 밤과 죽음의 여신. 소렐의 아내, 아우로라의 어머니.',['solel','aurora','kingdom-of-saramis']],
 ['cetus','「해왕 케투스」라 불리는 괴수. 블레다드의 문장을 지녔다.',['blaiddyd']],
 ['guillermo','레다의 아버지이자 버커니어의 전 상관. 전 다그시온 법무관으로 시도니아 영주였다.',['leda','buccar','sidonia']],
 ['iliana','미트라스 수도회와 연관된 인물.',[]],
 ['balor','명계군의 수장. 수천 년 만에 부활한 마신.',[]]
];
const clanFacts=[['benditz','뇌운기사단'],['alexandra','테루스 백은기사단'],['nuzzuo','할 하리 족'],['zarcone','가이아 여단'],['jasmine','팔마의 비'],['kiroc','흑조 해적단'],['inyoni','브라간사 동포단'],['peppe','브리기트군']];
const crestEnglish={'사도의 천관':'Diadem of the Apostle (Crest of Aubin)','대지의 천관':'Diadem of the Earth (Crest of Dominic)','혼백의 천관':'Diadem of Spirit (Crest of Gautier)','천칭의 천관':'Diadem of the Scales (Crest of Cichol)','고고의 천관':'Diadem of Solitude (Crest of Gloucester)','용기의 천관':'Diadem of Courage (Crest of Blaiddyd)','영원의 천관':'Diadem of Eternity (Crest of Lamine)','예언자의 천관':'Diadem of the Auger (Crest of Noa)','무명의 천관':'Diadem of the Nameless (Crest of Ernest)','만물의 천관':'Diadem of All Things (Crest of Flames)'};
// 혈인 table; Korean diadem name with the Three Houses crest given in the footnote.
const crests=[
 ['cai','사도의 천관 (오반의 문장)','Diadem of the Apostle (Crest of Aubin)',content['namu.cai-crest-note']],
 ['leda','대지의 천관 (도미닉의 문장)','Diadem of the Earth (Crest of Dominic)'],
 ['seteth','천칭의 천관 (키홀의 문장)','Diadem of the Scales (Crest of Cichol)'],
 ['esmeralda','용기의 천관 (블레다드의 문장)','Diadem of Courage (Crest of Blaiddyd)'],
 ['dietrich','영원의 천관 (라민의 문장)','Diadem of Eternity (Crest of Lamine)']
];
const mountCategories={'말':['wild-horse','monoceros','ferghanan-horse','black-horse','rocinan'],'비약 타조':['wild-ornius','white-ornius','meganius','red-meganius','magonius','black-magonius'],'천마':['pegasus','dark-pegasus','falicorn','bucephalus'],'드래곤':['wild-bau','red-bau','black-bau'],'코끼리':['elephant']};
const statNames=[['str','힘'],['mag','마력'],['spd','속도'],['dex','기술'],['lck','행운'],['def','수비'],['res','마방'],['cha','매력']];
const horses={
 'wild-horse':{desc:'거친 자연속에서 살아가는 야생마. 조금 사납지만, 잘 다루면 전장에서 든든한 파트너가 된다.',stats:{spd:1,dex:3,def:1},skills:[['연계 질주','[기병] 이동력 +1','[기병] 이동력 +2'],['연계 환기','[기병] 필살 회피 +5','[기병] 필살 회피 +10']],bait:'야채',flavor:'단맛'},
 monoceros:{desc:'머리에 멋진 뿔이 달린 말. 환상의 성수라 불리는 초희귀종으로 주인에게 행운을 가져다준다고 한다.',stats:{spd:1,dex:1,lck:3},skills:[['연계 기적','[기병] 행운 +3','[기병] 행운 +5'],['연계 치유','[기병] 전투 후 자신의 HP를 소량 회복한다.','[기병] 전투 후 자신의 HP를 적당량 회복한다.']],bait:'야채',flavor:'진미'},
 'ferghanan-horse':{desc:'피처럼 붉은 털을 가진 희귀한 말. 힘이 세고 몸이 탄탄해서 옛말부터 많은 장수들이 애용했다.',stats:{str:2,def:2},skills:[['연계 질주','[기병] 이동력 +1','[기병] 이동력 +2'],['재이동','[기병] 전투 후 1칸까지 이동할 수 있다.','[기병] 전투 후 2칸까지 이동할 수 있다.']],bait:'야채',flavor:'매운맛',note:'능동적인 기동성이 장점.'},
 'black-horse':{desc:'윤기나는 검은 털을 가진 말. 털은 부드럽게 공기를 가르며 강한 다리로 힘차게 들판을 누빈다.',stats:{str:1,spd:3,dex:1},skills:[['연계 (스킬명 일부 미기재)','[기병] 이동력 +1','[기병] 이동력 +2']],bait:'야채',flavor:null,note:'3부 시점부터 포획할 수 있다. 원문 표 제목이 「로시난」으로 적혀 있으나 설명문(검은 털)을 기준으로 흑마에 배정했다.'},
 rocinan:{desc:'이오가 아끼는 애마. 나이는 많지만 성격이 온순하고 주인의 의도를 파악하는 영리한 말',stats:{spd:1,dex:3,def:2},skills:[['연계 질주','[기병] 이동력 +1','[기병] 이동력 +2']],bait:'야채',flavor:'단맛',note:'이오 스카우트와 함께 주어지는 말.'}
};
const mountNotes=[['bucephalus','알렉산드라 스카우트와 함께 주어지는 천마.','alexandra'],['red-bau','3부 시점부터 포획할 수 있다.'],['black-bau','3부 시점부터 포획할 수 있다.'],['rocinan',null,'io']];
// 다그다 대륙 page: nations carry Japanese and English names in the article; towns are Korean-only.
export const namuLocations=[
 {id:'dagdan-empire',jp:'ダグザ帝国',summary:'namu.dagdan-empire',links:[['dagsion','capital']],aliases:['다그다']},
 {id:'kingdom-of-arago',jp:'アラゴ王国',summary:'namu.kingdom-of-arago',links:[['gran-aragon','capital'],['nathan','related-character'],['creek','related-character'],['aswan','related-character']],aliases:['아라고']},
 {id:'kingdom-of-brezarant',jp:'ブレザラント王国',summary:'namu.kingdom-of-brezarant',links:[['mars','related-character']],aliases:['브레저란트']},
 {id:'kingdom-of-saramis',jp:'サラミス王国',summary:'namu.kingdom-of-saramis',links:[['megaira','capital'],['theodora','related-character'],['yu-phas','related-character']],aliases:['살라미스','사라미스','Saramis']},
 {id:'ribeira',summary:'namu.ribeira',links:[['cai','hometown-of'],['dagdan-empire','part-of']],aliases:['히베리아']},
 {id:'gran-aragon',summary:'namu.gran-aragon',links:[['kingdom-of-arago','part-of']],aliases:[],untranslated:true},
 {id:'megaira',summary:'namu.megaira',links:[['kingdom-of-saramis','part-of']],aliases:['메가이라']},
 {id:'bafosgu',summary:'namu.bafosgu',links:[['buccar','hometown-of'],['kingdom-of-arago','part-of']],aliases:[],untranslated:true},
 {id:'sidonia',summary:'namu.sidonia',links:[['guillermo','related-character'],['leda','related-character'],['kingdom-of-arago','part-of']],aliases:[],untranslated:true},
 {id:'brigid',summary:'namu.brigid',links:[['peppe','related-character']],aliases:['브리기트 제도']}
];
const classNotes={
 'class-armored-knight':{aliases:['아머 나이트'],note:'전작에서는 아머 나이트였으나 이번 작에서 중갑 보병으로 번역되었다. 북미판은 여전히 Armor Knight.'},
 'class-warrior':{note:'전작(도끼+활)과 달리 검·도끼·주먹을 쓰는 밸런스형 보병으로 바뀌었다.'},
 'class-bardinger':{aliases:['팔라딘'],note:'전작의 팔라딘에 해당한다.'},
 'class-cataphract':{aliases:['카타프락토스']},'class-dragoon':{aliases:['드래군']},'class-ornius-rider':{aliases:['비약 타조병']},
 'class-elephant-rider':{note:'코끼리를 탄다.',mount:'elephant'}
};
const classTiers={'기본직':['class-commoner','class-noble'],'초급직':['class-gladiator','class-hunter','class-soldier','class-ornius-rider','class-diviner'],'중급직':['class-myrmidon','class-brigand','class-pugilist','class-archer','class-rogue','class-armored-knight','class-light-cavalry','class-charioteer','class-armored-ornius-rider','class-wing-soldier','class-shaman','class-priest'],'상급직':['class-shido','class-warrior','class-sniper','class-forest-knight','class-dreadnought','class-bardinger','class-ovate','class-bishop','class-cataphract','class-guardian','class-elephant-rider','class-dragoon']};
const labels={
 relation:text('관계·역할','Relationship / role'),clan:text('소속 클랜','Clan'),crest:text('혈인 · 천관','Crest / diadem'),
 category:text('분류 (나무위키)','Category (namu.wiki)'),desc:text('인게임 설명 (나무위키 전사)','In-game description (transcribed)'),stats:text('부여 스탯 (나무위키)','Stat bonuses (namu.wiki)'),
 skill:text('기승 스킬 ❤️3 → ❤️5','Mount skill ❤️3 → ❤️5'),bait:text('좋아하는 미끼 · 맛','Preferred bait · flavor'),note:text('비고 (나무위키)','Note (namu.wiki)'),tier:text('등급 (나무위키)','Tier (namu.wiki)')
};
export function applyNamu(merged,sources){
 Object.assign(sources,namuSources);
 const cite=(e,id)=>{e.sourceIds=[...new Set([...(e.sourceIds||[]),id])];};
 const get=id=>{const e=merged.get(id);if(!e)throw new Error('Namu evidence has no matching entry: '+id);return e;};
 // literal: wiki text is shown as-is (no skill-term substitution in the English view).
 const fact=(e,key,label,value,sourceId,valueKo)=>{e.facts??=[];e.facts.push({key,label,value,...(valueKo?{valueKo}:{}),sourceId,literal:true});cite(e,sourceId);};
 const connect=(e,to,relation,sourceId)=>{const target=get(to);e.links??=[];if(!e.links.some(l=>l.to===to))e.links.push({to,label:relations[relation],sourceId});cite(target,sourceId);};
 for(const loc of namuLocations){
  if(merged.has(loc.id))throw new Error('Duplicate location id: '+loc.id);
  const name=names[loc.id];
  merged.set(loc.id,{id:loc.id,type:'location',name:{...name},summary:content[loc.summary],aliases:[...loc.aliases,...(loc.jp?[loc.jp]:[])],translation:loc.untranslated?'untranslated':loc.jp?'community-translated':'provisional',sourceIds:['namu-dagda'],status:'community',links:[],facts:[],region:'Nation'});
 }
 for(const {id,ko,section,sourceId,method,aliases=[],note} of namuCharacterNames){
  const e=get(id);
  e.aliases=[...new Set([...e.aliases,e.name.ko,...aliases].filter(n=>n!==ko&&n!==e.name.en))];
  e.name={...e.name,ko};e.translation='community-sourced';
  e.koreanNameEvidence={sourceId,section,method};cite(e,sourceId);
  if(note&&!e.note)e.note=note;
 }
 for(const [id,ko,links] of relationFacts){const e=get(id);fact(e,'namu-relation',labels.relation,ko,CHARACTERS);for(const to of links)connect(e,to,'related-entry',CHARACTERS);}
 for(const [id,ko] of clanFacts){const e=get(id);fact(e,'namu-clan',labels.clan,ko,CHARACTERS);e.aliases=[...new Set([...e.aliases,ko])];if(id==='peppe')connect(e,'brigid','related-location',CHARACTERS);}
 for(const [id,ko,en,note] of crests){const e=get(id);fact(e,'namu-crest',labels.crest,en,'namu-crests',ko);e.aliases=[...new Set([...e.aliases,ko.split(' (')[0]])];if(note&&!e.note)e.note=note;}
 const elephant=get('elephant');elephant.aliases=[...new Set([...elephant.aliases,elephant.name.ko])];elephant.name={...elephant.name,ko:'코끼리'};elephant.translation='community-translated';elephant.translationSourceId='namu-animals';cite(elephant,'namu-animals');
 for(const [category,ids] of Object.entries(mountCategories))for(const id of ids){const e=get(id);e.category=category;fact(e,'namu-category',labels.category,category,'namu-animals');}
 for(const [id,h] of Object.entries(horses)){
  const e=get(id);fact(e,'namu-desc',labels.desc,h.desc,'namu-animals');
  fact(e,'namu-stats',labels.stats,statNames.filter(([k])=>h.stats[k]).map(([k,ko])=>ko+' +'+h.stats[k]).join(' · ')||'—','namu-animals');
  h.skills.forEach(([name,l3,l5],i)=>fact(e,'namu-skill-'+(i+1),labels.skill,`${name}: ${l3} → ${l5}`,'namu-animals'));
  fact(e,'namu-bait',labels.bait,h.bait+' · '+(h.flavor||'미기재'),'namu-animals');
  if(h.note)fact(e,'namu-note',labels.note,h.note,'namu-animals');
 }
 for(const [id,note,character] of mountNotes){const e=get(id);if(note)fact(e,'namu-note',labels.note,note,'namu-animals');if(character){connect(e,character,'given-with-scout','namu-animals');connect(get(character),id,'companion-mount','namu-animals');}}
 for(const loc of namuLocations){const e=get(loc.id);for(const [to,relation] of loc.links){connect(e,to,relation,'namu-dagda');const target=get(to);if(target.type==='character'&&!target.links.some(l=>l.to===loc.id))target.links.push({to:loc.id,label:relations[relation==='hometown-of'?'hometown':'related-location'],sourceId:'namu-dagda'});}}
 const dagsion=get('dagsion');dagsion.aliases=[...new Set([...dagsion.aliases,'다그시온','제도'])];dagsion.body=content['namu.dagsion-body'];for(const id of ['namu','namu-dagsion','namu-dagda'])cite(dagsion,id);
 const arena=get('arena');arena.aliases=[...new Set([...arena.aliases,'대투기장'])];cite(arena,'namu-dagsion');
 const arcade=get('shopping-arcade');arcade.aliases=[...new Set([...arcade.aliases,'노점 거리'])];cite(arcade,'namu-dagsion');
 for(const [id,{aliases=[],note,mount}] of Object.entries(classNotes)){const e=get(id);e.aliases=[...new Set([...e.aliases,...aliases])];cite(e,'namu-classes');if(note)fact(e,'namu-note',labels.note,note,'namu-classes');if(mount){connect(e,mount,'rides','namu-classes');connect(get(mount),id,'ridden-by','namu-classes');}}
 for(const [tier,ids] of Object.entries(classTiers))for(const id of ids){const e=get(id);fact(e,'namu-tier',labels.tier,tier,'namu-classes');e.aliases=[...new Set([...e.aliases,tier])];}
 const tips=[
  {id:'japanese-voice-tip',summary:content['namu.japanese-voice-summary'],body:content['namu.japanese-voice-body'],note:content['namu.japanese-voice-note'],sourceIds:['namu'],links:[['eshmel','related-character']],aliases:['음성 설정','일본어 음성','한국어 자막','Japanese voice','voice setting']},
  {id:'mount-capture-tip',summary:content['namu.mount-capture-summary'],body:content['namu.mount-capture-body'],note:content['namu.mount-capture-note'],sourceIds:['namu-animals'],links:[['cai','related-character'],['io','related-character'],['alexandra','related-character'],['rocinan','related-mount'],['bucephalus','related-mount'],['monoceros','related-mount']],aliases:['포획','친밀도','축사','미끼','capture','bond']}
 ];
 for(const tip of tips){
  if(merged.has(tip.id))throw new Error('Duplicate tip id: '+tip.id);
  merged.set(tip.id,{id:tip.id,type:'tip',name:{...names[tip.id]},summary:tip.summary,body:tip.body,note:tip.note,aliases:tip.aliases,translation:'provisional',sourceIds:tip.sourceIds,status:'community',links:[],facts:[]});
  const e=get(tip.id);for(const [to,relation] of tip.links)connect(e,to,relation,tip.sourceIds[0]);
 }
 // Character pages: Korean profile fields. Existing English likes/interests/age facts stay as counterparts.
 const PAGES='namu-character-pages';
 for(const p of namuProfiles){
  const e=get(p.id);const f=p.fields;
  e.externalGuides=[...(e.externalGuides||[]),{url:p.url,title:'나무위키 · '+p.title+(p.revised?' ('+p.revised+' 판)':''),status:'accessed'}];
  e.namuProfile={sourceId:PAGES,title:p.title,revised:p.revised,names:p.names};
  for(const key of profileOrder)if(f[key]&&f[key]!=='불명')fact(e,'namu-'+key.replace(/[A-Z]/g,c=>'-'+c.toLowerCase()),profileLabels[key],f[key],PAGES);
  if(f.crest&&f.crest!=='X'){const existing=e.facts.find(x=>x.key==='namu-crest');const parts=f.crest.split(/\s*\|\s*/);const ko=parts.join(' · '),en=parts.map(k=>crestEnglish[k]||k).join(' · ');if(existing){if(existing.valueKo!==ko){existing.valueKo=ko;existing.value=en;existing.sourceId=PAGES;}if(p.id==='cai')delete e.note;}else fact(e,'namu-crest',labels.crest,en,PAGES,ko);}
  const extra=[f.fullName,f.alias,p.names?.jp,p.names?.en,p.names?.ko].filter(Boolean).flatMap(v=>v.split(/,\s*/)).map(v=>v.replace(/\(마이 유니트 디폴트 네임\)/,'').trim()).filter(v=>v&&v!==e.name.ko&&v!==e.name.en);
  e.aliases=[...new Set([...e.aliases,...extra])];
  cite(e,PAGES);
 }
}
