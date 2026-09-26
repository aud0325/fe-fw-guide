// Direct transcription of the banquet ingredient selector, not prose-derived taste.
export const flavorVideoFile='KakaoTalk_20260926_215707545.mp4';
export const flavorVideoSourceId='game-flavors-20260926';
const text=(ko,en)=>({ko,en});
const rows=(time,kind,values)=>values.trim().split('\n').map(line=>{const [id,ko,flavor]=line.split('|');return {id,ko,flavor,time,kind};});
export const flavorObservations=[
 ...rows('00:00.0','meat',`
sand-boar-meat|모래 돼지 고기|sweet
kusarik-meat|쿠사리쿠 고기|spicy
yarc-meat|야크 고기|bitter
louse-meat|쥐며느리 고기|delicacy
sandbael-meat|샌드 바알 고기|delicacy
sandworm-meat|모래 벌레 고기|delicacy
bear-meat|곰 고기|sweet
sea-beast-meat|해수 고기|sweet
wolf-meat|늑대 고기|spicy
video-rupo-meat|루프 고기|spicy
flying-lizard-meat|날도마뱀 고기|bitter`),
 ...rows('00:02.0','fish',`
talto-goby|타르토 망둥이|sweet
grady-goby|그래디 망둥이|delicacy
baal-pike|바알 꼬치고기|sweet
ladon-pike|라돈 꼬치고기|bitter
video-shield-pike|방패 꼬치고기|bitter
video-ladon-carp|라돈 잉어|bitter
golden-trout|금송어|sweet
white-trout|순백의 송어|spicy
sugar-marlin|슈거 멀린|sweet
carna-bonito|카르네 가다랑어|sweet
lir-fish|리르 피시|spicy`),
 ...rows('00:04.0','fish',`
video-hard-fish|하드 피시|bitter
meltfish|멜트 피시|delicacy
moonfish|문 피시|delicacy
skolai|스칼라이|spicy
bazari-shark|바자리 상어|spicy
video-jotogon|조토곤|delicacy
video-dream-guide|꿈 길잡이|spicy`),
 ...rows('00:04.0','plant',`
coffee-berries|테프 열매|sweet
ginji|긴지|sweet
dates|대추야자|sweet
cadam|카담|sweet`),
 ...rows('00:05.0','plant',`
blue-ginji|파란 긴지|sweet
video-sun-fruit|태양 열매|spicy
redflicker|레드 플리커|spicy
video-hana-fruit|하나 열매|bitter
obroma|오브로마|bitter
jyoppa|요파|bitter
fyujo|퓌주|bitter
liganet|리가네트|delicacy
yaanthemum|야먼 국화|sweet
caltrop-flower|마름꽃|sweet
video-nineiaka|니네이아카|sweet`),
 ...rows('00:07.0','plant',`
glirmosa|글루마오사|spicy
linaria|리나리아|bitter
zang|잔게|bitter
video-daka-monju|다카 몽주|delicacy
desert-millet|사막 수수|sweet
bakul|바쿠|sweet
shem-yam|셈 감자|sweet
roca|로카|spicy
oliva|올리바|bitter
pongo|퐁고|delicacy
video-odd-monju|오드 몽주|delicacy`),
 ...rows('00:08.0','plant',`
angelica|안젤리카|sweet
hakseng|학셴|bitter
miranilla|밀라닐라|delicacy
yukito|유키투|delicacy
melara|멜라라|spicy
tea-tree|차 나무|bitter
video-kokomini|코코미니|delicacy`)
];
export function applyFlavorVideo(merged,sources){
 const sourceId=flavorVideoSourceId;
 sources[sourceId]={title:text('사용자 게임 영상 · 연회 식재료 맛 (2026-09-26)','User gameplay · Banquet ingredient flavors (2026-09-26)'),url:'./evidence/flavors-20260926.html',kind:'reference',note:text('연회 화면의 맛 열을 직접 판독했습니다. 촬영된 소지 식재료만 확인했으며 포획 미끼 효과를 실험한 영상은 아닙니다.','Transcribed directly from the banquet flavor column for the recorded inventory only. This recording does not test capture bait effects.')};
 for(const row of flavorObservations){
  let e=merged.get(row.id);
  if(!e){
   if(!row.id.startsWith('video-'))throw Error('Missing flavor match: '+row.id);
   e={id:row.id,type:'item',name:text(row.ko,row.ko),aliases:[],summary:text('한국어 연회 식재료 화면에서 확인한 재료. 영문 항목 대응은 확인 대기입니다.','Ingredient observed in Korean banquet gameplay. English entry mapping remains unresolved.'),category:row.kind==='fish'?'Fish (ingredient)':'Ingredient',status:'reference',translation:'game-capture-unmapped',sourceIds:[],links:[],missing:['English name mapping']};
   merged.set(row.id,e);
  }
  // Keep description reports for provenance, including disagreement with the UI.
  if(e.ingredientFlavor)e.ingredientFlavorReports=[...(e.ingredientFlavorReports||[]),e.ingredientFlavor];
  e.ingredientFlavor={flavor:row.flavor,sourceId,basis:'game-ui',time:row.time,video:flavorVideoFile,evidence:row.ko};
  e.observedFoodKind=row.kind;
  e.sourceIds=[...new Set([...e.sourceIds,sourceId])];
  e.aliases=[...new Set([...e.aliases,e.name.ko])].filter(v=>v!==row.ko);
  e.name={...e.name,ko:row.ko};
  e.translation=e.name.en===row.ko?'game-capture-unmapped':'game-capture';
  e.videoNameEvidence={sourceId,video:flavorVideoFile,time:row.time,method:e.name.en===row.ko?'unmapped':'editorial-match'};
 }
}
