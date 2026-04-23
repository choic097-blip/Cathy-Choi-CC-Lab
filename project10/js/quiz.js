/* =====================================================
   quiz.js — Runs the quiz, saves to localStorage
   ===================================================== */

(function () {
  const STORAGE_KEY = 'creator_quiz_answers';
  const RESULT_KEY = 'creator_quiz_result';

  let currentQ = 0;
  let answers = []; // [{qIndex, choiceIndex, type}, ...]

  const qNumEl = document.getElementById('qNum');
  const qTextEl = document.getElementById('qText');
  const qOptionsEl = document.getElementById('qOptions');
  const progressBar = document.getElementById('progressBar');
  const progressFill = document.getElementById('progressFill');
  const progressPct = document.getElementById('progressPct');
  const counterEl = document.getElementById('questionCounter');

  function padTwo(n) { return String(n).padStart(2, '0'); }

  function updateProgress() {
    const total = QUESTIONS.length;
    const pct = Math.round((currentQ / total) * 100);

    // Update the visible fill bar
    progressFill.style.width = pct + '%';

    // Also update the hidden <input type="range"> so its value reflects progress
    progressBar.max = total;
    progressBar.value = currentQ;

    progressPct.textContent = pct + '%';
    counterEl.textContent = `${padTwo(Math.min(currentQ + 1, total))} / ${padTwo(total)}`;
  }

  function renderQuestion() {
    const q = QUESTIONS[currentQ];
    qNumEl.textContent = `QUESTION ${padTwo(currentQ + 1)}`;
    qTextEl.textContent = q.q;
    qOptionsEl.innerHTML = '';

    q.options.forEach((opt, idx) => {
      const li = document.createElement('li');
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'option-btn';
      btn.innerHTML = `<span class="letter">${String.fromCharCode(65 + idx)}.</span> ${opt.text}`;
      btn.addEventListener('click', () => handleAnswer(idx));
      li.appendChild(btn);
      qOptionsEl.appendChild(li);
    });

    updateProgress();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function handleAnswer(choiceIdx) {
    const q = QUESTIONS[currentQ];
    const chosen = q.options[choiceIdx];

    answers.push({
      qIndex: currentQ,
      choiceIndex: choiceIdx,
      type: chosen.type
    });

    // Save after every answer (so mid-quit can be recovered)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(answers));

    currentQ++;

    if (currentQ >= QUESTIONS.length) {
      // Fill the bar to 100% before navigating away
      progressFill.style.width = '100%';
      progressPct.textContent = '100%';
      setTimeout(finishQuiz, 400);
    } else {
      renderQuestion();
    }
  }

  function finishQuiz() {
    // Tally scores
    const scores = { ARC: 0, LOG: 0, CAT: 0, RUN: 0 };
    answers.forEach(a => { scores[a.type]++; });

    // Find top type (ties: first one in order wins)
    let topType = 'ARC';
    let topScore = -1;
    ['ARC', 'LOG', 'CAT', 'RUN'].forEach(t => {
      if (scores[t] > topScore) {
        topScore = scores[t];
        topType = t;
      }
    });

    const result = {
      scores: scores,
      topType: topType,
      completedAt: new Date().toISOString()
    };
    localStorage.setItem(RESULT_KEY, JSON.stringify(result));

    window.location.href = 'result.html';
  }

  // Fresh start — clear previous in-progress answers
  localStorage.removeItem(STORAGE_KEY);

  renderQuestion();
})();
