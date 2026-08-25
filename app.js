const communities = [
  { name: "Coachella Valley", county: "Riverside County", region: "Southern California", initials: "CV", score: 78, level: "Elevated", trend: "+8%", signal: "Care access strain", x: 67, y: 75, factors: [["Recent respiratory signals", "High", 82], ["Care access strain", "High", 76], ["Household exposure", "Medium", 58]] },
  { name: "Fresno County", county: "Fresno County", region: "Central Valley", initials: "FR", score: 73, level: "Elevated", trend: "+5%", signal: "Household exposure", x: 46, y: 49, factors: [["Recent respiratory signals", "High", 76], ["Care access strain", "Medium", 62], ["Household exposure", "High", 79]] },
  { name: "Imperial Valley", county: "Imperial County", region: "Southern California", initials: "IV", score: 71, level: "Elevated", trend: "+3%", signal: "Care access strain", x: 73, y: 90, factors: [["Recent respiratory signals", "Medium", 61], ["Care access strain", "High", 84], ["Household exposure", "High", 74]] },
  { name: "San Joaquin County", county: "San Joaquin County", region: "Central Valley", initials: "SJ", score: 64, level: "Watch", trend: "+1%", signal: "Recent respiratory signals", x: 47, y: 35, factors: [["Recent respiratory signals", "Medium", 63], ["Care access strain", "Medium", 56], ["Household exposure", "Medium", 57]] },
  { name: "Los Angeles County", county: "Los Angeles County", region: "Southern California", initials: "LA", score: 59, level: "Watch", trend: "−2%", signal: "Household exposure", x: 48, y: 72, factors: [["Recent respiratory signals", "Medium", 57], ["Care access strain", "Medium", 55], ["Household exposure", "Medium", 64]] },
  { name: "Yolo County", county: "Yolo County", region: "Northern California", initials: "YO", score: 39, level: "Lower need", trend: "−4%", signal: "Recent respiratory signals", x: 44, y: 22, factors: [["Recent respiratory signals", "Low", 36], ["Care access strain", "Low", 28], ["Household exposure", "Medium", 46]] }
];

const mapPoints = document.querySelector('#mapPoints');
const rankingBody = document.querySelector('#rankingBody');
const factorList = document.querySelector('#factorList');
const toast = document.querySelector('#toast');
let activeCommunity = communities[0];

function pointClass(score) { return score >= 70 ? 'point-high' : score >= 50 ? 'point-medium' : 'point-low'; }
function renderMap() {
  mapPoints.innerHTML = communities.map((community, index) => `<g class="map-point ${community === activeCommunity ? 'selected' : ''}" data-index="${index}" tabindex="0" role="button" aria-label="${community.name}, readiness score ${community.score}"><circle class="${pointClass(community.score)}" cx="${community.x * 3.4 + 45}" cy="${community.y * 5.8 + 35}" r="8"></circle><circle cx="${community.x * 3.4 + 45}" cy="${community.y * 5.8 + 35}" r="13" fill="none" stroke="transparent"></circle><text class="${community.x > 55 ? 'label-left' : 'label-right'}" x="${community.x * 3.4 + 45}" y="${community.y * 5.8 + 35}">${community.initials}</text></g>`).join('');
  document.querySelectorAll('.map-point').forEach(point => { point.addEventListener('click', () => selectCommunity(Number(point.dataset.index))); point.addEventListener('keydown', event => { if (event.key === 'Enter' || event.key === ' ') selectCommunity(Number(point.dataset.index)); }); });
}
function renderRanking(list = communities.slice().sort((a, b) => b.score - a.score)) {
  rankingBody.innerHTML = list.slice(0, 5).map((community, index) => `<tr data-index="${communities.indexOf(community)}"><td><span class="rank-community">${index + 1}. ${community.name}</span><span class="rank-county">${community.county}</span></td><td class="rank-score">${community.score} / 100</td><td class="rank-signal">${community.signal}</td><td class="${community.trend.includes('−') ? 'trend-flat' : 'trend-up'}">${community.trend}</td></tr>`).join('');
  document.querySelectorAll('#rankingBody tr').forEach(row => row.addEventListener('click', () => selectCommunity(Number(row.dataset.index))));
}
function renderFactors() {
  document.querySelector('#selectedInitials').textContent = activeCommunity.initials;
  document.querySelector('#selectedName').textContent = activeCommunity.name;
  document.querySelector('#selectedRegion').textContent = `${activeCommunity.county} · ${activeCommunity.region}`;
  document.querySelector('#selectedScore').textContent = activeCommunity.score;
  document.querySelector('#selectedLevel').textContent = activeCommunity.level;
  document.querySelector('#selectedDetail').textContent = `${activeCommunity.level === 'Elevated' ? 'Higher support need' : 'Lower support need'} than ${Math.min(96, activeCommunity.score + 12)}% of monitored communities.`;
  document.querySelector('#scoreRing').style.background = `conic-gradient(var(--coral) 0 ${activeCommunity.score}%, #e7e9e1 ${activeCommunity.score}% 100%)`;
  factorList.innerHTML = activeCommunity.factors.map(([name, value, width]) => `<div class="factor"><span class="factor-name">${name}</span><span class="factor-value">${value}</span><div class="factor-track"><span style="width:${width}%"></span></div></div>`).join('');
}
function selectCommunity(index) { activeCommunity = communities[index]; renderMap(); renderFactors(); }
function showToast(message) { toast.textContent = message; toast.classList.add('show'); clearTimeout(window.toastTimer); window.toastTimer = setTimeout(() => toast.classList.remove('show'), 3000); }

document.querySelectorAll('[data-metric]').forEach(button => button.addEventListener('click', () => { document.querySelectorAll('[data-metric]').forEach(item => item.classList.remove('selected')); button.classList.add('selected'); showToast(`${button.textContent} layer selected`); }));
document.querySelector('#searchInput').addEventListener('input', event => { const query = event.target.value.toLowerCase(); renderRanking(communities.filter(community => `${community.name} ${community.county}`.toLowerCase().includes(query))); });
document.querySelector('#scenarioButton').addEventListener('click', () => { const projected = Math.max(0, activeCommunity.score - 9); document.querySelector('#selectedScore').textContent = projected; document.querySelector('#selectedDetail').textContent = 'Illustrative score after a 20% improvement in care access signals.'; showToast('Scenario applied: improve care access by 20%'); });
document.querySelector('#briefButton').addEventListener('click', () => showToast('Briefing prepared for review'));
document.querySelector('#viewAllButton').addEventListener('click', () => showToast('Showing the five highest-need communities in this preview'));
document.querySelector('#windowButton').addEventListener('click', () => showToast('The preview is using the last 30 days'));
renderMap(); renderRanking(); renderFactors();
