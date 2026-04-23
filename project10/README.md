# Creator Daily Quiz — Today's Creative State

A daily self-diagnostic tool for creators. Nine questions sort your current mental state into one of four existential types and recommend the kind of creative activity that fits your state right now.

🔗 **Live**: _(add link after deployment)_
📁 **Project 4** · Interactive Tool

---

## Design Intent

I designed this tool to address a problem creators constantly face: the **imbalance between Input and Output**. It turns the user's psychological and existential state into data and visualizes it back to them.

The tool reframes a creator's quiet hours not as *rest* but as **existential recharge**, and proposes the optimal activity for the user's current level of mental entropy.

### Why creators

Talented creators rarely know what they actually want to do — because too many things are interesting. But wanting to *watch* a comic is not the same as wanting to *draw* one. Stretching yourself is valuable, yet segmenting creative work by your current energy level is equally important.

### The Four States

| Code | Type | Description | Recommended |
|---|---|---|---|
| **ARC** | The Archive | Drained; needs external input | Reading, watching, researching |
| **LOG** | The Logic Gate | Data overload; needs structuring | Worldbuilding, criticism, tagging |
| **CAT** | The Catalyst | Internal pressure peaking | Drawing, essays, thumbnails |
| **RUN** | The Runtime | Fully prepped; build phase | Deadlines, coding, publishing |

---

## Features

- **9-question diagnostic** — each option adds a point to one of four types
- **Live progress bar** — implemented with `<input type="range">` as required, with a visible fill layer on top
- **localStorage persistence** — results survive refreshes and power the result / analysis pages
- **Dynamic result page** — colors, score bars, and recommended activities all change based on the saved result
- **Type deep dive** — Diagnosis / Mechanism / Do / Don't sections per type
- **URL hash routing** — e.g. `analysis.html#CAT` deep-links to a specific type

---

## Stack

- HTML5, CSS3, Vanilla JavaScript
- **No external libraries** (project requirement)
- `localStorage` API
- Google Fonts: Fraunces (display), Inter (body), JetBrains Mono (labels)
- GitHub Pages for deployment

---

## File Structure

```
creator-daily-quiz/
├── index.html          Landing page
├── quiz.html           Quiz (9 questions)
├── result.html         Result (reads localStorage)
├── analysis.html       Per-type deep dive
├── css/
│   └── style.css
├── js/
│   ├── quiz.js         Quiz logic + localStorage save
│   ├── result.js       Reads result + renders score bars
│   └── analysis.js     Tab switching + type content
├── data/
│   └── questions.js    Questions, options, type mapping
└── README.md
```

---

## Logic Flow

```
[User answers Q]  →  Tag as type  →  Append to localStorage
                                            ↓
                       On Q9 complete, tally scores per type
                                            ↓
                              Find topType (ties → first in order)
                                            ↓
     Save { scores, topType, completedAt } to localStorage
                                            ↓
       result.html and analysis.html read this and render accordingly
```

All question/option → type mapping lives centrally in `data/questions.js` so edits are one-file. Option order and type order were intentionally **shuffled per question** so users can't game the quiz by always picking the same letter.

---

## Inspiration & References

- **MBTI / Enneagram** — the satisfaction of typed self-discovery, but reframed as a *daily* state rather than a fixed personality
- **Brain.fm / Pzizz** — the "prescription for your current state" model
- **Julia Cameron, *The Artist's Way*** — the creative cycle of input and output
- **Cal Newport, *Deep Work*** — the segmentation of focus states
- **Are.na** — treating archival and collection as a legitimate phase of creation
- **Typographic reference** — serif display + monospace labels + cream paper → the feel of a research notebook

---

## Challenges Faced

1. **Non-trivial option-to-type mapping** — a naive "option A = type 1" scheme was too easy to game. Shuffling the option-type correspondence per question required careful balancing so no one type was ever inaccessible.
2. **Progress bar as `<input type="range">`** — the requirement forced me to use range rather than `<progress>`. Range element styling across browsers is fragile, so I layered a visible `.progress-fill` div on top of a visually-hidden range input that still carries the real `value`.
3. **localStorage schema design** — I debated a single key vs. split keys. Split won: `creator_quiz_answers` (in-progress) and `creator_quiz_result` (final), so mid-quit can be recovered without corrupting the result payload.
4. **Empty-state handling** — landing on `result.html` with no data had to fail gracefully with a clear recovery path.
5. **Per-type color without breaking tone** — I wanted type-specific accent colors but the muted paper palette had to stay dominant. Limited each accent to low-saturation earth tones.

---

## User Testing Log

> _(fill this in after testing — template below)_

### Tester 1 — (name, role)
- Date:
- Key feedback:
- Action taken:

### Tester 2 — ...

---

## Next Steps (v2 ideas)

- **Diagnostic history** — plot state over a week/month to reveal your personal creative rhythm
- **Time-of-day variants** — different question sets for morning / afternoon / evening
- **Anonymous community layer** (optional) — show how many creators are in the same state as you right now
- **Share-as-image export** — generate a shareable card of today's result (with the caveat that the tool's core promise is private self-reflection)
- **Question pool expansion** — draw 9 questions from a pool of 30 to reduce repetition fatigue
- **Sound design** — environmental audio per type (ARC = rain, CAT = heartbeat, etc.)
- **Accessibility** — keyboard navigation, full ARIA support, high-contrast mode

---

## Local Development

```bash
# Clone
cd creator-daily-quiz

# Serve locally (Live Server in VS Code also works)
python3 -m http.server 8000
# → http://localhost:8000
```

`localStorage` technically works from `file://` but behaves inconsistently across browsers. A local server is the safer path.

---

## License

Built for school (Project 4). Feel free to learn from it.
