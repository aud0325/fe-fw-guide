import {content} from './locales/content.mjs';
// Korean text transcribed from user-supplied gameplay recordings, 2026-09-26.
// English IDs are editorial matches, not bilingual text present in the recordings.
const text=(ko,en)=>({ko,en});
export const videoFiles=['KakaoTalk_20260926_002248417.mp4','KakaoTalk_20260926_002253285.mp4'];
const rows=(time,s)=>s.split('\n').filter(Boolean).map(row=>{const [ko,id]=row.split('|');return {time,ko,id:id||null};});
export const itemObservations=[
 ...rows('00:00.00',`야크의 젖|yarc-milk
벌꿀 젖|honey-milk
자멜의 젖|jamel-milk
연한 세르비|weak-cervi
진한 세르비|strong-cervi
소박한 구운 과자|simple-pastries
달짝지근한 구운 과자
고소한 구운 과자
테프를 넣어 구운 과자
살라미스 과자|saraminian-sweets
가룸|garum`),
 ...rows('00:01.50',`농후한 가룸
쿰쿰한 가룸
햇홍소|young-ghosh
태양의 홍소|sun-ghosh
자극적인 홍소
남방 홍소|southern-ghosh
햇창소|young-shosh
알갱이가 작은 테프
알갱이가 큰 테프
남방 풍미의 테프
알뿌리 식초 절임|pickled-bulbs`),
 ...rows('00:03.00',`생선 내장 절임
남부의 희귀 종자
농후 조미료|strong-seasonings
진귀한 향신료|rare-spices
약초 요리 대백과|herbal-recipe-guide
시골 요리 모음집|village-recipes
포드라 홍차
새끼 고양이 장식|kitten-figurine
간단한 마술 도구
유연한 낚싯대|flexible-fishing-rod
예리한 낚싯바늘|sharp-fishhook`),
 ...rows('00:04.00',`다그다 수염풀|dagda-beard-grass
서민 요모조모|everyday-scenes
여기사와 구혼자
한 쌍의 회칼
바람을 가르는 깃|wing-fletching
실용적인 재봉 도구
동방의 칠흑 비단|eastern-black-silk
아무 르 염직물
작고 흰 꽃 그림
모래 돼지 고기|sand-boar-meat
쿠사리쿠 고기|kusarik-meat`),
 ...rows('00:05.50',`야크 고기|yarc-meat
쥐며느리 고기|louse-meat
샌드 바알 고기|sandbael-meat
모래 벌레 고기|sandworm-meat
곰 고기|bear-meat
해수 고기|sea-beast-meat
늑대 고기|wolf-meat
루프 고기
날도마뱀 고기|flying-lizard-meat
타르토 망둥이|talto-goby
그래디 망둥이|grady-goby`),
 ...rows('00:07.00',`바알 꼬치고기|baal-pike
라돈 꼬치고기|ladon-pike
방패 꼬치고기
라돈 잉어
금송어|golden-trout
순백의 송어|white-trout
슈거 멀린|sugar-marlin
카르네 가다랑어|carna-bonito
리르 피시|lir-fish
하드 피시
멜트 피시|meltfish`),
 ...rows('00:08.50',`문 피시|moonfish
스칼라이|skolai
바자리 상어|bazari-shark
조토곤
꿈 길잡이
테프 열매|coffee-berries
긴지|ginji
대추야자|dates
카담|cadam
파란 긴지|blue-ginji
태양 열매`),
 ...rows('00:10.00',`레드 플리커|redflicker
하나 열매
오브로마|obroma
요파|jyoppa
퓌주|fyujo
리가네트|liganet
야먼 국화|yaanthemum
마름꽃|caltrop-flower
니네이아카
글루마오사|glirmosa
리나리아|linaria`),
 ...rows('00:11.50',`잔게|zang
다카 몽주
사막 수수|desert-millet
바쿠|bakul
셈 감자|shem-yam
로카|roca
올리바|oliva
퐁고|pongo
오드 몽주
안젤리카|angelica
학셴|hakseng`),
 ...rows('00:13.00',`밀라닐라|miranilla
유키투|yukito
멜라라|melara
차 나무|tea-tree
코코미니
연성석|smithing-stone
옥 강철
독석|venomstone
해성석|sea-star-stone
풍석|windstone
뇌석|thunderstone`),
 ...rows('00:14.50',`컬렛|cullet
우츠 강철|wootz-steel
태양석|sunstone
월광석|lunar-stone
블루 스노르|blue-snoll
다크 메탈
상급 시험 증서|advanced-license
사금
거대한 금괴|extra-large-bullion
벌레 진주
커다란 벌레 진주`),
 ...rows('00:16.00',`말똥|horse-manure
오르니우스의 똥|ornius-manure
페가수스의 똥|pegasus-manure
바우의 똥|bau-manure
엘렉트라 지도|elektra-map
카스탈리아 지도|castalia-map
멜리아스 지도|melias-map
사벨론 지도|saveilon-map`)
];
export const locationNames=[
 ...rows('00:00',`제도 다그시온|dagsion
아기뇨 마을|aguino`),
 ...rows('00:03',`칼리아네이라 항구|callianeira-port
판도라 항구 도시|port-of-pandor
야먼 마을|yaaman
키라 마을|kira-village`),
 ...rows('00:04',`해양 도시 알렉토|alecto-city
레기아 도시|regia
포트나 신전 본전|fortunas-temple
아우로라 신전 본전|auroras-temple`),
 ...rows('00:06',`가렌 요새 옛터|galen-fort-ruins
발로르 신전|temple-of-balor
이교도의 동굴|heretics-cave
발할라 광산|valhalla-mine`),
 ...rows('00:07',`디오네 요새|the-piercer-dione-fort`),
 ...rows('00:14',`그랑나다 요새 옛터|granada-fort-ruins`),
 ...rows('00:18',`브론테스호|lake-brontes
발레리 협곡|valeri-gorge
네이피어 숲|napier-woods`),
 ...rows('00:19',`달맞이 고개|moonwatch-pass
별이 낳은 화원|starbirth-garden`),
 ...rows('00:20',`파우누스 숲|fauns-forest`),
 ...rows('00:22',`죽은 장병의 무덤|fallen-generals-barrows`),
 ...rows('00:25',`올레안스 평원|oleance-plains`)
];
// These locations have no secure English-ID match. Keep Korean display names
// rather than inventing an official English localization.
export const newLocations=[
 ['video-ladon-lake','라돈호','00:18','멜리아스주'],
 ['video-forbidden-forest','금단의 숲','00:07','멜리아스주'],
 ['video-boman-pass','보만 고개','00:19','아말테아주'],
 ['video-damasen-cape','다마센곶','00:21','카스탈리아주'],
 ['video-tartarus','타르타로스 대유구','00:24','멜리아스주'],
 ['video-paro-forest','파로의 숲','00:26','카스탈리아주'],
 ['video-starwatch-mount-pass','별받이 고개','00:25','아말테아주']
];
export const gatheringObservations=[
 {location:'galen-fort-ruins',time:'00:06',region:'이디이아주',names:['연성석','옥 강철','컬렛']},
 {location:'video-forbidden-forest',time:'00:07',region:'멜리아스주',names:['독석','우츠 강철','월광석']},
 {location:'video-ladon-lake',time:'00:18',region:'멜리아스주',names:['라돈 잉어','라돈 꼬치고기','다그단디']},
 {location:'video-boman-pass',time:'00:19',region:'아말테아주',names:['리나리아','마름꽃','파란 긴지']},
 {location:'fauns-forest',time:'00:20',region:'사벨론주',names:['테프 열매','리나리아','오브로마'],unknownSlots:1},
 {location:'video-damasen-cape',time:'00:21',region:'카스탈리아주',names:['밀라닐라','테네바 콩','유나메이']},
 {location:'fallen-generals-barrows',time:'00:22',region:'멜리아스주',names:['독석','뇌석']},
 {location:'video-tartarus',time:'00:24',region:'멜리아스주',names:['사금','사금 덩어리'],unknownSlots:1}
];
export const extraItems=[{ko:'다그단디',id:'dagdandi',time:'00:18'},{ko:'테네바 콩',id:'tenebato',time:'00:21'}];
export function applyVideoEvidence(merged,sources){
 const sourceId='game-video-20260926';
 sources[sourceId]={title:'사용자 제공 게임 영상 · 2026-09-26',url:'./evidence/game-video-20260926.html',kind:'reference',note:content['video-evidence.transcribed-korean-gameplay-english-id-matches-are-editorial-not']};
 function rename(row,video){const e=merged.get(row.id);if(!e)throw new Error('Missing video match: '+row.id);e.aliases=[...new Set([...(e.aliases||[]),e.name.ko])].filter(n=>n!==row.ko);e.name={...e.name,ko:row.ko};e.translation='game-capture';e.videoNameEvidence={sourceId,video,time:row.time,method:'editorial-match'};e.sourceIds=[...new Set([...e.sourceIds,sourceId])];}
 for(const row of itemObservations.filter(r=>r.id))rename(row,1);
 for(const row of [...locationNames,...extraItems])rename(row,2);
 function add(id,ko,type,time,region){merged.set(id,{id,type,name:text(ko,ko),aliases:[],summary:content['video-evidence.observed-in-korean-gameplay-english-name-mapping-is-pending'],sourceIds:[sourceId],status:'reference',translation:'game-capture-unmapped',category:type==='item'?'Material':'Location',links:[],region,videoNameEvidence:{sourceId,video:type==='location'?2:1,time,method:'unmapped'}});}
 for(const [id,ko,time,region] of newLocations)add(id,ko,'location',time,region);
 // Only create material records needed by observed gathering lists; ambiguous
 // inventory-only names remain in the transcription, avoiding duplicate IDs.
 for(const [id,ko,time] of [['video-jade-steel','옥 강철','00:13'],['video-ladon-carp','라돈 잉어','00:07'],['video-yunamei','유나메이','00:21'],['video-gold-dust','사금','00:14.50'],['video-gold-dust-lump','사금 덩어리','00:24']]){add(id,ko,'item',time);if(['video-yunamei','video-gold-dust-lump'].includes(id))merged.get(id).videoNameEvidence.video=2;}
 const byKo=new Map([...merged.values()].filter(e=>e.type==='item').map(e=>[e.name.ko,e]));
 for(const row of gatheringObservations){const place=merged.get(row.location);place.sourceIds=[...new Set([...place.sourceIds,sourceId])];place.videoGathering={...row,sourceId,video:2,observedRoute:'cai',gameDate:'09/25'};for(const ko of row.names){const item=byKo.get(ko);if(!item)throw new Error('Unresolved gathered material: '+ko);const evidence={sourceId,video:2,time:row.time,observedRoute:'cai',gameDate:'09/25'};place.links.push({to:item.id,label:content['video-evidence.observed-gathering'],...evidence});item.links??=[];item.links.push({to:place.id,label:content['video-evidence.gathering-cai-recording'],...evidence});item.gathering??=[];item.gathering.push({region:row.region,where:place.name.ko+' · 카이 화면 9/25',locationId:place.id,...evidence});item.sourceIds=[...new Set([...item.sourceIds,sourceId])];}}
 const place=merged.get('video-paro-forest'),mount=merged.get('ornius');place.links.push({to:mount.id,label:content['video-evidence.wild-appearance-observed'],sourceId});mount.links??=[];mount.links.push({to:place.id,label:content['video-evidence.observed-location-cai-recording'],sourceId});mount.sourceIds=[...new Set([...mount.sourceIds,sourceId])];
 merged.get('video-starwatch-mount-pass').body=content['video-evidence.a-wild-horse-is-shown-in-cai-gameplay-breed'];
}
