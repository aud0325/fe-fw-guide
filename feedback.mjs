export function feedbackLink(lang='ko'){
 const en=lang==='en',id=en?'1FAIpQLSfdP47LcPChfTHRnLNptPTCZJIs4r5DENfUuu8BMXgubPKV8A':'1FAIpQLSdWZMoEP41kMrm00YTUUTtqm1ZTmV7UL1phn9tJVKYgzzV74g';
 return `<a class="feedback-link" href="https://docs.google.com/forms/d/e/${id}/viewform?hl=${en?'en':'ko'}" target="_blank" rel="noopener noreferrer" aria-label="${en?'Feedback / Suggestions (opens in a new tab)':'피드백/개선요청 (새 탭에서 열기)'}">${en?'Feedback / Suggestions':'피드백/개선요청'}</a>`;
}
