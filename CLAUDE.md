# Project Instructions for AI Agents

This file provides instructions and context for AI coding agents working on this project.

<!-- BEGIN BEADS INTEGRATION v:1 profile:minimal hash:ca08a54f -->
## Beads Issue Tracker

This project uses **bd (beads)** for issue tracking. Run `bd prime` to see full workflow context and commands.

### Quick Reference

```bash
bd ready              # Find available work
bd show <id>          # View issue details
bd update <id> --claim  # Claim work
bd close <id>         # Complete work
```

### Rules

- Use `bd` for ALL task tracking — do NOT use TodoWrite, TaskCreate, or markdown TODO lists
- Run `bd prime` for detailed command reference and session close protocol
- Use `bd remember` for persistent knowledge — do NOT use MEMORY.md files

## Session Completion

**When ending a work session**, you MUST complete ALL steps below. Work is NOT complete until `git push` succeeds.

**MANDATORY WORKFLOW:**

1. **File issues for remaining work** - Create issues for anything that needs follow-up
2. **Run quality gates** (if code changed) - Tests, linters, builds
3. **Update issue status** - Close finished work, update in-progress items
4. **PUSH TO REMOTE** - This is MANDATORY:
   ```bash
   git pull --rebase
   bd dolt push
   git push
   git status  # MUST show "up to date with origin"
   ```
5. **Clean up** - Clear stashes, prune remote branches
6. **Verify** - All changes committed AND pushed
7. **Hand off** - Provide context for next session

**CRITICAL RULES:**
- Work is NOT complete until `git push` succeeds
- NEVER stop before pushing - that leaves work stranded locally
- NEVER say "ready to push when you are" - YOU must push
- If push fails, resolve and retry until it succeeds
<!-- END BEADS INTEGRATION -->


## Build & Test

```bash
npm run build
npm test
npm run test:r
npm run test:integration
npm run check
```

## Architecture Overview

- SvelteKit 5 statique, publié dans `build/` avec `adapter-static`.
- Pages du parcours sous `src/routes/`; données éditoriales sous `src/lib/data/`.
- Decks Svelte sous `src/routes/diapos/`, avec composants partagés dans `src/lib/deck/`.
- Matériel téléchargeable, scripts R et modes de secours sous `static/materiel/`.
- `static/eiom.R` fournit l'abstraction Gemini/OpenRouter commune aux exercices.

## Conventions & Patterns

- Le site et les decks doivent fonctionner sans ressource externe au moment de la projection.
- Les modèles et fournisseurs volatils sont centralisés dans `src/lib/data/config.js` et `static/eiom.R`.
- Chaque observation conserve un identifiant stable; une conversation LLM neuve est créée par document.
- Les données brutes restent en lecture seule; les scripts écrivent uniquement dans `sorties/`.
