import {names,relations} from './locales/curated-names.mjs';
import {content,formatContent} from './locales/content.mjs';
export {routes} from './locales/labels.mjs';
import {routes} from './locales/labels.mjs';
import {applyParalogues} from './paralogues.mjs';
import {applyVideoEvidence} from './video-evidence.mjs';
import {applyNamu} from './namu-evidence.mjs';
import {applyGame8} from './game8-evidence.mjs';
import {catalogEntries,catalogSources,coverage} from './catalog.generated.mjs';
import {koreanNames,koreanNameSource} from './korean-names.mjs';
export {coverage};
export const updated='2026-09-26';
export const sources={
 official:{title:'Nintendo · Fortune’s Weave Direct',url:'https://www.nintendo.com/au/news-and-articles/fire-emblem-fortunes-weave-direct-threads-together-strategic-combat-with-a-story-of-gods-and-heroes-only-on-nintendo-switch-2/',kind:'official',note:content['data.official-overview-of-heroes-world-and-facilities']},
 recruitment:{title:'RPG Site · Recruitment Guide — Adam Vitale',url:'https://www.rpgsite.net/guide/21391-fire-emblem-fortunes-weave-recruitment-guide-all-characters-in-game-how-to-recruit-them',kind:'guide',note:content['data.published-september-17-four-recruitment-entries-summarized-not-independently']},
 fish:{title:'Raider King · Paradise Fish — Skeith Ruch',url:'https://raiderking.com/fire-emblem-fortunes-weave-where-to-find-paradise-fish/',kind:'guide',note:content['data.september-19-guide-locations-and-author-observations-are-distinguished']},
 unicorn:{title:'Siliconera · Monoceros — Jenni Lada',url:'https://www.siliconera.com/how-to-get-a-monoceros-unicorn-in-fire-emblem-fortunes-weave/',kind:'guide',note:content['data.september-23-firsthand-guide-broader-bait-preference-is-the']},
 dc:{title:'디시인사이드 · 만자천홍 캐릭터 스카우트에 필요한 것들',url:'https://gall.dcinside.com/mgallery/board/view/?id=game_nintendo&no=3580294',kind:'community',note:content['data.september-22-community-post-by-7-7-korean-aliases']},
 reddit:{title:'Reddit · Fortune’s Weave Question Thread',url:'https://www.reddit.com/r/fireemblem/comments/1wgku86/fortunes_weave_question_thread/',kind:'community',note:content['data.summarizes-a-comment-about-separate-route-progression-a-mount']},
 wiki:{title:'Fan Wiki · Character Roster',url:'https://fireemblemfortunesweave.wiki/characters/roster/',kind:'reference',note:content['data.still-contains-pre-release-caveats-not-used-as-evidence']},
 namu:{title:'나무위키 · 파이어 엠블렘 만자천홍 (2026-09-25 23:04 판)',url:'https://namu.wiki/w/파이어%20엠블렘%20만자천홍',kind:'community',note:content['namu.main-note'],snapshot:'research/namu/main.html'},
 fandom:{title:'Fire Emblem Wiki · Fandom',url:'https://fireemblem.fandom.com/wiki/Fire_Emblem%3A_Fortune%27s_Weave',kind:'unavailable',note:content['data.body-unavailable-search-snippets-were-not-imported-as-facts']}
};

const entry=(id,type,name,summary,refs,extra={})=>({id,type,name:{...name},summary,sourceIds:refs,status:'guide',aliases:[],translation:'provisional',...extra});
const link=(to,label,sourceId)=>({to,label,sourceId});
const recruit=(renown,item,quantity)=>Object.fromEntries(routes.map(([id],i)=>[id,{support:3,renown:renown[i],item,quantity}]));
const curatedEntries=[
 entry('ninae','character',names['ninae'],content['data.recruitment-requires-one-paradise-fish-check-renown-for-your'],['recruitment','dc'],{aliases:['니나에','니네'],recruitment:recruit([6,8,6,6],'paradise-fish',1),links:[link('paradise-fish',relations['required-item'],'recruitment')]}),
 entry('goliath','character',names['goliath'],content['data.prepare-three-pieces-of-giant-s-meat'],['recruitment','dc'],{aliases:['골리앗'],recruitment:recruit([7,6,9,10],'giants-meat',3),links:[link('giants-meat',relations['required-item'],'recruitment')]}),
 entry('loretta','character',names['loretta'],content['data.requires-three-iron-swords-for-recruitment'],['recruitment','dc'],{recruitment:recruit([7,9,5,5],'iron-sword',3),links:[link('iron-sword',relations['required-item'],'recruitment')],note:content['data.the-introduction-says-dietrich-needs-8-renown-the-list']}),
 entry('noctula','character',names['noctula'],content['data.check-support-and-renown-requirements'],['recruitment','dc'],{recruitment:Object.fromEntries(routes.map(([id],i)=>[id,{support:[1,1,1,3][i],renown:[4,6,3,8][i]}]))}),
 entry('cai','character',names['cai'],content['data.a-hero-from-ribeira-whose-route-allows-mount-capture'],['official','unicorn'],{status:'official',links:[link('ornius',relations['capture-target'],'unicorn'),link('monoceros',relations['rare-mount'],'unicorn')]}),
 entry('dietrich','character',names['dietrich'],content['data.enters-the-heroic-games-in-search-of-battle'],['official'],{status:'official'}),
 entry('theodora','character',names['theodora'],content['data.a-hero-from-saramis'],['official'],{status:'official',links:[link('lake-brontes',relations['gathering-reference'],'fish')]}),
 entry('leda','character',names['leda'],content['data.a-musically-gifted-participant-in-the-heroic-games'],['official'],{status:'official'}),
 entry('zarcone','character',names['zarcone'],content['data.a-community-tip-reports-that-his-recruitment-fee-can'],['dc'],{status:'community',links:[link('bargain-tip',relations['recruitment-tip'],'dc')]}),
 entry('paradise-fish','item',names['paradise-fish'],content['data.a-rare-fish-needed-for-ninae-found-at-lake'],['recruitment','fish','dc'],{aliases:['극락어','낙원 물고기','파라다이스 피시'],links:[link('lake-brontes',relations['found-at'],'fish'),link('ornius',relations['bait-use'],'fish'),link('fish-tip',relations['fishing-tip'],'fish')]}),
 entry('giants-meat','item',names['giants-meat'],content['data.a-recruitment-item-for-goliath'],['recruitment','dc'],{aliases:['거인의 고기'],links:[link('sand-shadow-fort',relations['found-at'],'recruitment')],note:content['data.the-guide-lists-one-at-the-fort-or-giant']}),
 entry('iron-sword','item',names['iron-sword'],content['data.three-are-needed-for-loretta-exact-stock-location-awaits'],['recruitment','dc']),
 entry('hakseng','item',names['hakseng'],content['data.a-delicacy-used-to-lure-monoceros-its-gathering-location'],['unicorn'],{links:[link('monoceros',relations['lures'],'unicorn')]}),
 entry('monoceros','mount',names['monoceros'],content['data.a-rare-unicorn-like-mount-captured-with-cai'],['unicorn'],{aliases:['유니콘','unicorn'],routeIds:['cai'],links:[link('oleance-plains',relations['capture-location'],'unicorn'),link('hakseng',relations['preferred-bait'],'unicorn'),link('cai',relations['captured-by'],'unicorn')],body:content['data.check-the-wild-horse-capture-spot-in-oleance-plains']}),
 entry('ornius','mount',names['ornius'],content['data.a-mount-cai-can-capture-rare-fish-can-serve'],['official','unicorn','fish'],{aliases:['오니우스','오르니우스 탈것'],routeIds:['cai'],links:[link('paradise-fish',relations['bait-example'],'fish'),link('cai',relations['captured-by'],'unicorn')],note:content['data.exact-capture-sites-and-a-complete-food-preference-table']}),
 entry('dagda','map',names['dagda'],content['data.a-regional-index-linking-the-capital-gathering-and-capture'],['official','fish','unicorn'],{aliases:['지도','map','world map','월드맵'],status:'guide',links:[link('dagsion',relations['capital'],'official'),link('saveilon',relations['gathering-region'],'recruitment'),link('oleance-plains',relations['mount-area'],'unicorn')],note:content['data.a-continent-map-and-regional-index-in-game-travel']}),
 entry('dagsion','location',names['dagsion'],content['data.the-imperial-capital-hosting-the-heroic-games'],['official'],{status:'official',region:'Capital',links:[link('shopping-arcade',relations['facility'],'official'),link('arena',relations['facility'],'official')]}),
 entry('shopping-arcade','location',names['shopping-arcade'],content['data.buy-weapons-and-tools-and-enhance-weapons-individual-stock'],['official'],{status:'official',region:'Capital'}),
 entry('arena','location',names['arena'],content['data.train-skills-and-observe-other-participants-on-match-days'],['official'],{status:'official',region:'Capital'}),
 entry('saveilon','location',names['saveilon'],content['data.the-region-containing-lake-brontes'],['recruitment'],{region:'Saveilon',links:[link('lake-brontes',relations['contains'],'recruitment')]}),
 entry('lake-brontes','location',names['lake-brontes'],content['data.a-fishing-location-for-paradise-fish'],['fish','recruitment'],{aliases:['브론테스호','브론테스'],region:'Saveilon',links:[link('paradise-fish',relations['gather-here'],'fish'),link('valhalla-mine',relations['access-reference'],'recruitment')],body:content['data.the-recruitment-guide-places-the-lake-beyond-valhalla-mine']}),
 entry('valhalla-mine','location',names['valhalla-mine'],content['data.a-landmark-referenced-when-approaching-lake-brontes'],['recruitment'],{region:'Saveilon'}),
 entry('sand-shadow-fort','location',names['sand-shadow-fort'],content['data.a-fort-listed-as-a-source-of-giant-s'],['recruitment'],{region:'Unverified',links:[link('giants-meat',relations['found-here'],'recruitment')]}),
 entry('oleance-plains','location',names['oleance-plains'],content['data.a-monoceros-capture-location-in-southern-dagda'],['unicorn'],{region:'Southern Dagda',links:[link('monoceros',relations['capture-here'],'unicorn'),link('raivo-port',relations['nearby-landmark'],'unicorn'),link('auroras-temple',relations['nearby-landmark'],'unicorn')]}),
 entry('raivo-port','location',names['raivo-port'],content['data.a-landmark-near-the-oleance-plains-capture-spot'],['unicorn'],{region:'Southern Dagda'}),
 entry('auroras-temple','location',names['auroras-temple'],content['data.a-landmark-near-oleance-plains'],['unicorn'],{region:'Southern Dagda'}),
 entry('bargain-tip','tip',names['bargain-tip'],content['data.a-community-report-says-repeated-refusals-can-reduce-the'],['dc'],{status:'community',links:[link('zarcone',relations['related-character'],'dc')],note:content['data.not-reproduced-across-routes-or-versions-save-before-trying']}),
 entry('route-tip','tip',names['route-tip'],content['data.a-reddit-commenter-reports-separate-character-progression-across-routes'],['reddit'],{status:'community',links:routes.map(([id,ko,en])=>link(id,formatContent('route-label',{ko:{name:ko},en:{name:en}}),'reddit')),note:content['data.the-commenter-is-uncertain-do-not-conflate-shared-support']}),
 entry('fish-tip','tip',names['fish-tip'],content['data.the-guide-author-reports-that-immediate-reloads-did-not'],['fish'],{status:'community',links:[link('paradise-fish',relations['related-item'],'fish'),link('lake-brontes',relations['related-location'],'fish')],note:content['data.an-individual-observation-not-a-verified-rng-rule']})
];

Object.assign(sources,catalogSources);
sources.recruitment.note=content['data.all-62-guide-entries-checked-automatic-unavailable-and-unknown'];
const merged=new Map(catalogEntries.map(e=>[e.id,e]));
for(const base of curatedEntries){const imported=merged.get(base.id);if(!imported){merged.set(base.id,base);continue;}
 const links=[...(base.links||[]),...(imported.links||[])].filter((l,i,a)=>a.findIndex(x=>x.to===l.to&&x.label.en===l.label.en)===i);
 merged.set(base.id,{...imported,...base,aliases:[...new Set([...imported.aliases,...base.aliases])],facts:imported.facts,recruitment:imported.recruitment||base.recruitment,roles:imported.roles,routeIds:imported.routeIds||base.routeIds,sourceIds:[...new Set([...base.sourceIds,...imported.sourceIds])],links,missing:(imported.missing||[]).filter(x=>!(x==='Acquisition location'&&links.some(l=>merged.get(l.to)?.type==='location'))&&!(base.id==='monoceros'))});
}
sources['namu-characters-snapshot']=koreanNameSource;
for(const {id,ko,section} of koreanNames){
 const e=merged.get(id);if(!e)throw new Error(`Korean name has no matching entry: ${id}`);
 e.aliases=[...new Set([...e.aliases,e.name.ko].filter(n=>n!==ko&&n!==e.name.en))];
 e.name={...e.name,ko};e.translation='community-sourced';
 e.koreanNameEvidence={sourceId:'namu-characters-snapshot',section,method:'faction-and-role-match'};
 e.sourceIds=[...new Set([...e.sourceIds,'namu-characters-snapshot'])];
}
for(const e of merged.values())if(e.communityName){const {ko,aliases,sourceId}=e.communityName;e.aliases=[...new Set([...e.aliases,e.name.ko,...aliases])];e.name={...e.name,ko};e.translation='community-translated';e.translationSourceId=sourceId;}
applyParalogues(merged,sources);
applyVideoEvidence(merged,sources);
applyNamu(merged,sources);
applyGame8(merged,sources);
for(const [id,ko] of Object.entries(editorialNames)){
 const e=merged.get(id);if(!e)throw new Error(`Unknown provisional name: ${id}`);
 e.aliases=[...new Set([...e.aliases,e.name.ko,ko])];
 e.name={...e.name,ko:`${ko}(${e.name.en})`};e.translation='provisional';
}
applyFlavorVideo(merged,sources);
applyGame8Items(merged);
applyUserNameCorrections(merged,sources);
export const entries=[...merged.values()];
import {applyUserNameCorrections} from './user-name-corrections.mjs';
import {applyFlavorVideo} from './flavor-video-evidence.mjs';
import {applyGame8Items} from './game8-evidence.mjs';
import {editorialNames} from './locales/editorial-names.mjs';
