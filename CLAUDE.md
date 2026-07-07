# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project status

**The app is fully implemented** per `prd.md` v1.4: `index.html`, `css/style.css`, the four `js/` modules, `supabase/schema.sql` (plus `supabase/cleanup_teste.sql` for wiping test rows), and `README.md` with setup/deploy instructions. `js/config.js` already contains real Supabase credentials (the anon key — publishable by design). There is still no `package.json` and no git repository.

`prd.md` (v1.4, "Aprovado para desenvolvimento") remains the **sole source of truth** for behavior: business goals, game rules, scoring, screens, visual identity, the full 50-question content bank (30 initial + 20 expansion, at the PRD's cap), infrastructure/deploy, and acceptance criteria. When code and PRD disagree, treat it as a bug in one of them and reconcile — don't silently drift.

## Running the app

No build step is planned. Per `prd.md` §5.1:
- Open `index.html` directly, or serve the directory with a simple static server (e.g. `npx serve`) for local development.
- The quiz itself works fully offline (questions are local JSON, no network call needed to play).
- The **ranking** feature needs network connectivity to reach Supabase; when Supabase is unreachable, it must fall back to a local `localStorage` ranking with an "offline" notice rather than blocking play (§4.5, §6.4).
- Deploy target is **Vercel** (static hosting, free tier) with **Supabase** (free tier) for the global ranking backend (§6.1).

There is no test suite or linter specified in the PRD.

## Architecture (per `prd.md` §5.2)

```
/
├── index.html        # Structure of the 4 screens (tela início / pergunta / resultado / ranking)
├── css/
│   └── style.css     # All styling, incl. responsiveness
├── js/
│   ├── questions.js   # Question bank as a plain JS/JSON constant — data only, no logic
│   ├── config.js      # SUPABASE_URL and SUPABASE_ANON_KEY (publishable anon key)
│   ├── ranking.js     # Supabase access (write result, fetch top 10) + localStorage fallback
│   └── app.js         # All game logic: state, timer, scoring, DOM (IIFE `App`, keyboard V/F shortcuts)
└── supabase/
    ├── schema.sql         # `ranking` table + RLS policies — run manually in the Supabase SQL Editor
    └── cleanup_teste.sql  # Helper to delete test rows from `ranking`
```

Key architectural points to know before touching this:

- **Questions are NOT in Supabase.** They live as a static, versioned JS array in `js/questions.js` (`const QUESTIONS = [...]`), 30–50 items, min. 10 per level (`iniciante`/`intermediario`/`avancado`). This is a deliberate split from ranking data: adding/editing questions is a data-only change to this file, never touches `app.js`, and requires no network call to play.
- **Supabase is used only for the global ranking**, via a single `ranking` table (schema + RLS policies in `prd.md` §6.2). The anon key is meant to be publishable — security comes from RLS (insert/select only, no update/delete), not from hiding the key.
- **Resilience is a first-class requirement**: every Supabase call must be wrapped so that failure never blocks gameplay — results fall back to `localStorage` (`quizClaudeCode.rankingLocal`) and the ranking screen shows a local/offline variant with a warning (§4.5, §6.4, acceptance criterion 8).
- Game flow (single-page, no router, 4 `.tela` sections toggled via class): início → sorteia 15 perguntas (5 por nível, ordem crescente de dificuldade) → loop de pergunta com timer de 15s → resultado (grava no Supabase + fallback local) → ranking (top 10 global, ou local se offline).
- Scoring: `100 + segundos_restantes * 10` per correct answer; timeout or wrong answer = 0, computed client-side in `app.js` — no server-side scoring.
- On wrong answer or timeout, the correct answer must be shown prominently alongside the explanation (§3 Tela 2) — this is called out as the main learning moment of the quiz, don't treat it as equivalent to the correct-answer feedback.
- All UI copy and question content is **pt-BR**. Visual identity (colors, spacing, no external webfonts) is specified precisely in §5.3 — reuse those exact values rather than improvising a palette.
