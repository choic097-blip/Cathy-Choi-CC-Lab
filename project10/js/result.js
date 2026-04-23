/* =====================================================
   result.js — localStorage에서 결과 읽어와서 렌더
   ===================================================== */

(function () {
  const RESULT_KEY = 'creator_quiz_result';
  const ANSWER_KEY = 'creator_quiz_answers';

  const emptyState = document.getElementById('emptyState');
  const resultContent = document.getElementById('resultContent');

  const raw = localStorage.getItem(RESULT_KEY);

  if (!raw) {
    emptyState.hidden = false;
    return;
  }

  let result;
  try {
    result = JSON.parse(raw);
  } catch (e) {
    emptyState.hidden = false;
    return;
  }

  resultContent.hidden = false;

  const info = TYPE_INFO[result.topType];

  // 유형 정보 표시
  document.getElementById('typeName').textContent = info.name;
  document.getElementById('typeSub').textContent = info.subtitle;
  document.getElementById('typeTagline').textContent = `"${info.tagline}"`;
  document.getElementById('typeShort').textContent = info.short;

  // 결과 배경색을 유형에 맞게 살짝
  const colorMap = {
    ARC: 'var(--arc)',
    LOG: 'var(--log)',
    CAT: 'var(--cat)',
    RUN: 'var(--run)'
  };
  document.querySelector('.result-hero').style.borderLeft = `6px solid ${colorMap[result.topType]}`;

  // 점수 막대 그래프
  const scoreBarsEl = document.getElementById('scoreBars');
  const types = ['ARC', 'LOG', 'CAT', 'RUN'];
  const maxScore = Math.max(...Object.values(result.scores), 1);

  types.forEach(t => {
    const score = result.scores[t] || 0;
    const pct = (score / 9) * 100; // 9문항 기준
    const typeName = TYPE_INFO[t].name;

    const row = document.createElement('div');
    row.className = 'score-row';
    row.innerHTML = `
      <span>${t} · ${typeName.replace('The ', '')}</span>
      <div class="score-bar-track">
        <div class="score-bar-fill" style="width: 0%; background: ${colorMap[t]};"></div>
      </div>
      <span>${score}</span>
    `;
    scoreBarsEl.appendChild(row);

    // 애니메이션
    setTimeout(() => {
      row.querySelector('.score-bar-fill').style.width = pct + '%';
    }, 100);
  });

  // 추천 활동
  const actList = document.getElementById('activityList');
  info.activities.forEach(act => {
    const li = document.createElement('li');
    li.textContent = act;
    actList.appendChild(li);
  });

  // Date display
  const completedDate = new Date(result.completedAt);
  const pad = n => String(n).padStart(2, '0');
  const months = ['JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC'];
  document.getElementById('resultDate').textContent =
    `${months[completedDate.getMonth()]} ${pad(completedDate.getDate())} · ${completedDate.getFullYear()}`;

  // 상세 분석 링크 - URL hash로 유형 전달
  document.getElementById('analysisLink').href = `analysis.html#${result.topType}`;

  // 기록 삭제 버튼
  document.getElementById('resetBtn').addEventListener('click', () => {
    if (confirm('Clear your saved diagnostic record?')) {
      localStorage.removeItem(RESULT_KEY);
      localStorage.removeItem(ANSWER_KEY);
      window.location.href = 'index.html';
    }
  });
})();
