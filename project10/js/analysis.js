/* =====================================================
   analysis.js — Deep dive content per type + tab switching
   - Default active tab is based on localStorage result
   - URL hash (e.g. #ARC) also selects a type
   ===================================================== */

(function () {
  const RESULT_KEY = 'creator_quiz_result';

  const DEEP = {
    ARC: {
      name: 'The Archive',
      subtitle: 'Emptiness & Absorption',
      diagnosis: "Your internal database is running empty. The need to absorb new material is outpacing your capacity to output. Forcing creation in this state tends to trap you in reruns of your own past work.",
      mechanism: "All creation is, at root, the reassembly of compressed input. Without fresh input, the well dries up. ARC is not laziness — it's a mandatory phase that refills the fuel for the next cycle of making.",
      do: ["Read outside your genre (whatever you usually avoid)", "Visit exhibitions or museums", "Watch classic films start to finish", "Take long walks, observe", "Transcribe and annotate references"],
      dont: ["Start a project with a hard deadline", "Experiment with a brand-new style", "Pressure yourself to post publicly"],
      quote: "Emptiness is not idleness. It is the preparation for what comes next."
    },
    LOG: {
      name: 'The Logic Gate',
      subtitle: 'Analysis & Structure',
      diagnosis: "You have the raw material — plenty of it — but no scaffolding. What you need isn't more input; it's the meta work of sorting and connecting what's already in your head.",
      mechanism: "Creative work has two modes: divergent (generating) and convergent (structuring). LOG is your signal that convergent mode is required. This is the phase where ideas become systems, and inspirations become blueprints.",
      do: ["Write out worldbuilding notes", "Draft criticism or reviews", "Tag and categorize your idea dump", "Build reference boards or moodboards", "Wireframe upcoming projects"],
      dont: ["Jump impulsively into a new project", "Drain yourself on emotional social media", "Self-criticize the quality of existing work"],
      quote: "The moment you draw lines between scattered stars, constellations appear."
    },
    CAT: {
      name: 'The Catalyst',
      subtitle: 'Emotion & Release',
      diagnosis: "Internal emotional pressure has hit its threshold. If you don't release it now, this material will evaporate by next week. Stopping to measure quality is already a luxury you can't afford.",
      mechanism: "CAT is the rarest state a creator gets. Most so-called 'great work' doesn't come from ideal conditions — it comes from this hot, expressive phase. Self-censorship is its enemy.",
      do: ["Rough drawings and doodles", "First-draft emotional essays", "Comic thumbnails and storyboards", "Voice memos", "Work under the assumption no one will ever see it"],
      dont: ["Stop to hunt references", "Audit your finish quality", "Ask yourself whether it 'matters'"],
      quote: "If you don't burn this wood now, tomorrow it will be wet."
    },
    RUN: {
      name: 'The Runtime',
      subtitle: 'Execution & Building',
      diagnosis: "Planning, structure, and emotion are all ready. The only thing left is to move your hands. Wasting this state on more research or analysis is a direct loss.",
      mechanism: "RUN is the final phase of the creative cycle — the only phase where a 'work' actually gets finished. It's the rare window that arrives after long stretches of ARC, LOG, and CAT. The key is blocking external stimulus.",
      do: ["Build in Unity, push code", "Run a deadline sprint", "Prep for publishing", "Final renders, exports, QA", "Engage Do-Not-Disturb mode"],
      dont: ["Dig for new references", "Revisit the core concept", "Window-shop other projects"],
      quote: "Code that isn't built is not code. A work that isn't shipped is not a work."
    }
  };

  const contentEl = document.getElementById('analysisContent');
  const tabButtons = document.querySelectorAll('#typeSelector button');

  function render(type) {
    const d = DEEP[type];
    if (!d) return;

    contentEl.innerHTML = `
      <section class="analysis-section">
        <p class="mono-label">TYPE · ${type}</p>
        <h2>${d.name} — ${d.subtitle}</h2>
        <div class="quote">${d.quote}</div>
      </section>

      <section class="analysis-section">
        <h3>Diagnosis</h3>
        <p>${d.diagnosis}</p>
      </section>

      <section class="analysis-section">
        <h3>Mechanism</h3>
        <p>${d.mechanism}</p>
      </section>

      <section class="analysis-section">
        <h3>Do — What to lean into</h3>
        <ul>
          ${d.do.map(x => `<li>→ ${x}</li>`).join('')}
        </ul>
      </section>

      <section class="analysis-section">
        <h3>Don't — What to avoid</h3>
        <ul>
          ${d.dont.map(x => `<li style="color: var(--ink-soft);">× ${x}</li>`).join('')}
        </ul>
      </section>
    `;

    tabButtons.forEach(b => {
      b.classList.toggle('active', b.dataset.type === type);
    });

    if (location.hash !== '#' + type) {
      history.replaceState(null, '', '#' + type);
    }
  }

  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => render(btn.dataset.type));
  });

  function getInitialType() {
    const hash = location.hash.replace('#', '').toUpperCase();
    if (DEEP[hash]) return hash;

    const raw = localStorage.getItem(RESULT_KEY);
    if (raw) {
      try {
        const r = JSON.parse(raw);
        if (DEEP[r.topType]) return r.topType;
      } catch (e) { /* ignore */ }
    }
    return 'ARC';
  }

  render(getInitialType());
})();
