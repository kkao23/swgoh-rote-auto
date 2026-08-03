# AGENTS.md — SWGOH RoTE Auto Guide

## Project overview

A Nuxt 3 web app providing auto-battle team guidance for SWGOH Rise of the Empire Territory Battles. Features include mission browsing by phase, an interactive planet map, team search, a squad planner with a backtracking solver, crystal budget calculator, and community team voting via AWS Amplify.

- **Stack:** Nuxt 3 (SSG), Vue 3 `<script setup>`, Nuxt UI v2, Tailwind, TypeScript
- **Dev server:** `npm run dev`
- **Tests:** `npm test` (vitest, happy-dom)
- **SSG output:** `npm run generate` → `.output/public/`
- **Amplify sandbox:** `npm run sandbox`

## Directory structure

```
components/        Vue components — one-file-per-component, `<script setup>` style
  p1/..p6/         Per-phase wrapper components (P1DS, P2LS, etc.)
  zeffo/           Zeffo missions
  mandalore/       Mandalore missions
  special/         Special missions
composables/       Vue composables (usePlanner, usePlayerRoster, useSavedTeams, useVoteTracker)
data/              Game data — teams organized by phase/alignment/position
  p1/..p6/         Phase team arrays (DS.ts, LS.ts, Mixed.ts)
  zeffo/           Zeffo team data
  mandalore/       Mandalore team data
  data.ts          Aggregation — imports all phase modules into the `data` export
  displayNames.ts  Game ID ↔ display name mappings, ship/GL/Journey sets, character icons
  leads.ts         Canonical lead definitions (id, fullName, aliases, icon)
  missionMultipliers.ts  Mission copy multipliers (some positions spawn multiple copies)
models/            TypeScript type definitions
  data.ts          Core data types: data (team), DataType, enums (difficulty, successRate, interactionType)
pages/             Nuxt file-based routes
  index.vue        Home — PhasesAccordion + roster import
  planner.vue      Squad Planner — mission selection + solver
  map-view/        Interactive planet map with image map areas
  map-view/[planet]/platoons.vue  Single planet platoon view
  budget.vue       Crystal income calculator
  usage.vue        Team search
  tier-list.vue    Team tier list
  faq.vue          FAQ page
  health.vue       Health check
server/            Nitro server routes (proxy APIs)
  api/mhann/       Mhanndalorian Bot API proxy (player roster, guild data)
  utils/           HMAC signing + fetch helpers for mhann API
stores/            Pinia stores (modal.js)
util/              Pure utility functions — no Vue imports, testable in isolation
  plannerHelpers.ts  Mission flattening, solver, eligibility, score/cost functions
  missionHelpers.ts  Badge colors, icons, interaction-type helpers
  rosterUtils.ts     Relic map builder from raw roster data
  solver.ts          Hungarian algorithm (Kuhn-Munkres) for assignment
  plannerExport.ts   Reddit markdown table builder + clipboard copy
  searchLeads.ts     Lead name search/autocomplete
  analytics.ts       Google Analytics event helpers
  accordionHelpers.ts Accordion UI state helpers
test/              Vitest specs mirroring util/ structure
  util/            Tests for plannerHelpers, missionHelpers, solver, rosterUtils
  composables/     Tests for useSavedTeams, useVoteTracker
  pages/           Tests for budget page
amplify/           AWS Amplify Gen 2 backend
  data/resource.ts   AppSync GraphQL schema: TeamVote + VoteLog tables (DynamoDB)
  backend.ts         Backend definition
  functions/vote-handler/  Lambda for vote submission
```

## Key patterns

### Game data: three-layer hierarchy
```
Phase (phase1..phase6, special)
  → Side (ds, ls, mixed, zeffo, mandalore)
    → Position (left, top, ships, generic, etc.) → TeamData[]
```
Teams are arrays of `data` objects (lead, gameId, others, notes, videos, successRate, interactionType, difficulty, icon, etc.).

### Composables vs util
- **`util/`** — pure functions, no Vue reactivity, no `ref()`/`computed()`. Importable anywhere.
- **`composables/`** — Vue composables with `ref`/`computed`/`useLocalStorage`. Export factory functions (`useXxx()`).
- State is persisted via `useLocalStorage` from VueUse (localStorage keys: `swgoh-rote-*`).

### Component style
- All components use `<script setup lang="ts">`
- Tailwind classes directly in templates (no scoped CSS unless absolutely needed)
- Nuxt UI components: `UCard`, `UAccordion`, `UButton`, `UModal`, `UAlert`, `UIcon`, `UHorizontalNavigation`, etc.
- Icons via `i-heroicons-*` prefix (Heroicons via Nuxt UI)
- `useMediaQuery('(max-width: 768px)')` for mobile detection

### Testing
- Framework: vitest + happy-dom (@vue/test-utils for component tests)
- Test files mirror source structure under `test/`
- Pure util tests: import from `~/util/xxx`, use standard describe/it/expect
- Use `as any` casts for minimal test data objects

### Route conventions
- Nuxt file-based routing — `pages/xxx.vue` → `/xxx`
- `pages/map-view/[planet]/platoons.vue` → dynamic route `/map-view/:planet/platoons`
- `<NuxtLink>` for internal links; plain `<a>` for external

### API proxy pattern
- Server routes in `server/api/` proxy to the Mhanndalorian Bot API
- HMAC signing via `server/utils/mhann-sign.ts`
- Client calls via `$fetch('/api/mhann/player', { query: { allyCode } })`

### Amplify backend
- Gen 2 backend managed via `npx amplify sandbox`
- Voting uses AppSync GraphQL (public API key auth) backed by DynamoDB
- Schema: TeamVote (teamKey, votes), VoteLog (ipHash_teamKey, timestamp)

## Squad Planner architecture

The planner (`usePlanner` composable + `planner.vue`) lets users select missions per day (Day 1–6) and run a solver:

1. User selects planets → missions from `getFlatPlanets()`/`getFlatMissions()`
2. User can exclude specific leads/characters via `ExcludedTeamsPanel`
3. User can fetch their SWGOH roster by ally code (proxied through mhann API)
4. "Solve Day X" runs `solveDay()` which uses a **backtracking constraint solver** (the Hungarian algorithm in `solver.ts` is dead code — imported but never called, kept around with its tests)
5. Results rendered in `PlannerResults.vue` with team dropdowns (manual overrides), conflict detection, expandable notes/videos
6. State persisted in localStorage key `swgoh-rote-planner-days-v4`

## Common tasks

### Adding teams for a new phase/mission
1. Add the team array in `data/<phase>/<Side>.ts` (match existing format)
2. Import + wire it into `data/data.ts` under the correct phase/side/position

### Adding a new utility function
1. Create in `util/` as a pure function (no Vue reactivity)
2. Write tests in `test/util/<name>.spec.ts`
3. Import where needed with `~/util/xxx`

### Working with the solver
- `solveDay()` in `plannerHelpers.ts` — entry point for the **backtracking constraint solver**
- The backtracking function recursively assigns teams to missions, pruning on score upper bound and character conflicts
- It respects `EXCLUDE_COMMUNITY_TEAMS` flag (currently `true`), excluded leads, roster ownership, and relic requirements
- **`solver.ts` (Hungarian algorithm) is dead code** — imported on line 8 but never called. The backtracking solver replaced it but the old module and its tests were kept

### Clipboard / export
- `util/plannerExport.ts` — `buildRedditTable()` for markdown generation, `copyToClipboard()` with fallback

## Dependencies to be aware of
- **@nuxt/ui** v2.21 — component library, don't upgrade to v3 without migration
- **@vueuse/core** v12 — provides `useLocalStorage`, `useMediaQuery`, `useWindowScroll`
- **aws-amplify** v6 — Gen 2 client for vote tracking
- **nuxt-gtag** v3 — Google Analytics via `useGtag().gtag()`
- **@pinia/nuxt** — only used for `useModalStore()` (one store)
