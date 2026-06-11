# Roster Integration Plan — index.vue

## Goal

Add player roster integration to the main RotE mission page (`index.vue`) so that:
- Players enter their ally code and their roster data is fetched
- Mission team leads the player doesn't own are grayed out and/or pushed to the bottom
- Relic level requirements per phase are checked against the player's roster

---

## Overview of Changes

| # | Area | Description | Effort |
|---|---|---|---|
| 1 | `data/leads.ts` | Add `gameId` field to every lead entry | Medium |
| 2 | `pages/index.vue` | Add ally code input + fetch button (port from budget.vue) | Small |
| 3 | `composables/usePlayerRoster.ts` | New composable: fetch, store, and query player roster | Medium |
| 4 | `components/MissionTableFragment.vue` | Sort leads by ownership; gray out unowned leads | Medium |
| 5 | `models/data.ts` | Optionally add `gameId` to the `data` type | Small |
| 6 | Tests | Add unit tests for roster lookups and sort logic | Small |

---

## Step 1: Add `gameId` to `data/leads.ts`

**Problem:** The `id` field in `leads.ts` doesn't match the `definitionId` prefix from the `/player` API.

**API `definitionId` format:** `GREATMOTHERS:SEVEN_STAR` — the prefix before `:SEVEN_STAR` is the unit's game identifier.

**Mapping examples:**

| leads.ts `id` | `fullName` | API `definitionId` prefix |
|---|---|---|
| `greatmothers` | Great Mothers | `greatmothers` ✓ |
| `thirdsister` | Reva | `thirdsister` ✓ |
| `admiraltrench` | Admiral Trench | `trench` ✗ |
| `kyloren_tros` | Supreme Leader Kylo Ren | `supremeleaderkyloren` ✗ |
| `generalgrievous` | General Grievous | `grievous` ✗ |
| `deathtroopermoffgideon` | Dark Trooper Moff Gideon | `moffgideons1` ✗ |
| `espalpatine_pre` | Sith Eternal Emperor | `sithpalpatine` ✗ |
| `chimera` | Chimera | `capitalchimaera` ✗ |
| `executor` | Executor | `capitalexecutor` ✗ |

**Action:** Add a `gameId: string` field to each entry in `leads.ts` that exactly matches the API `definitionId` prefix (lowercased). This is the lookup key for matching the player's roster.

```typescript
type lead = {
    id: string,        // existing internal identifier
    fullName: string,  // display name
    aliases: string[], // search aliases
    gameId: string,    // NEW: matches API definitionId prefix, e.g. "greatmothers"
}
```

**Scope:** ~80 lead entries need `gameId`. Ship capital entries start with `capital` (e.g. `capitalexecutor`).

---

## Step 2: Add Ally Code Input to `pages/index.vue`

Port the ally code input UI from `pages/budget.vue` (lines 926–953) into `index.vue`.

**Changes:**
- Add the ally code text input + "Fetch My Data" button at the top of the page
- Wire it to the new `usePlayerRoster` composable
- Show loading/error states
- Persist ally code via `useLocalStorage`

---

## Step 3: Create `composables/usePlayerRoster.ts`

A shared composable to fetch and query player data.

```typescript
// Key API surface:
const { 
  allyCode,           // ref<string> — persisted
  isFetching,         // ref<boolean>
  error,              // ref<string | null>
  roster,             // ref<RosterUnit[]>
  fetchRoster,        // () => Promise<void>
  hasUnit,            // (gameId: string) => boolean
  getRelicTier,       // (gameId: string) => number | null  (API value, shifted +2)
  unitMeetsRelicReq,  // (gameId: string, requiredApiRelic: number) => boolean
} = usePlayerRoster()
```

**Important:** The `/player` API returns `relic.currentTier` with a **+2 offset** vs in-game relic level. The composable should expose the raw API value. Callers handle the offset via known thresholds.

**Data source:** Calls `/api/mhann/player?allyCode=...` (same as budget.vue line 181).

**Roster format:** Array of `{ definitionId: "GREATMOTHERS:SEVEN_STAR", relic: { currentTier: 9 } }`.

---

## Step 4: Modify `components/MissionTableFragment.vue`

### 4a. Sort by Ownership

In the `verifiedAccordionItems` and `communityAccordionItems` computed properties, add a sort tier that pushes unowned leads to the bottom:

```
Sort priority:
1. Saved/hearted teams (existing)
2. Vote-based sort (existing)
3. NEW: Ownership — owned leads before unowned leads
4. Success rate (existing)
5. Interaction complexity (existing)
6. Difficulty (existing)
```

### 4b. Gray Out Unowned Leads

Before rendering each accordion item, check if the lead's `gameId` is in the player's roster. If not:
- Apply a CSS class (`opacity-50`, `grayscale`, or similar)
- Add a visual indicator (e.g., "Not owned" badge or muted icon)

### 4c. Resolve `gameId` from Lead Name

The team data uses human-readable lead names (e.g. `'Great Mothers'`, `'SLKR'`, `'Trench'`). We need to resolve the `gameId`:

```
lead name → leads.ts lookup (match by fullName or aliases) → .gameId → check roster
```

This lookup should be done once per team entry and cached/memoized.

---

## Step 5: Phase Relic Requirements

Each phase has minimum relic requirements (in-game values; API value = in-game + 2):

| Phase | In-game Relic | API `currentTier` |
|---|---|---|
| Phase 1 | R5 | 7 |
| Phase 2 | R6 | 8 |
| Phase 3 | R7 | 9 |
| Phase 4 | R8 | 10 |
| Phase 5 | R9 | 11 |
| Phase 6 | R9 | 11 |
| Zeffo | R7 | 9 |
| Mandalore | R8 | 10 |

When checking if a player can use a lead in a phase, verify the lead unit meets the relic threshold for that phase.

**Option A (simpler):** Only check the lead unit's relic level against the phase requirement.

**Option B (thorough):** Also check the `others` field units — but this requires mapping all `others` unit names to gameIds too (significant additional scope).

**Recommendation:** Start with Option A. Add Option B later.

---

## Step 6: Tests

Add tests in `test/pages/budget.spec.ts` or a new `test/composables/usePlayerRoster.spec.ts`:

1. `gameId` lookup resolves correctly for all lead aliases
2. Roster filtering: owned leads sort above unowned
3. Relic threshold check: API relic 9 >= phase 3 threshold (API 9) → pass
4. Relic threshold check: API relic 7 < phase 3 threshold (API 9) → fail
5. Empty roster (no player data fetched) — all leads shown normally

---

## Implementation Order

1. **Step 1** — Add `gameId` to leads.ts (prerequisite for everything else)
2. **Step 3** — Create `usePlayerRoster` composable
3. **Step 2** — Add ally code input to index.vue (wires to composable)
4. **Step 4** — Modify MissionTableFragment sorting and graying
5. **Step 6** — Add tests

---

## Risks / Open Questions

1. **~80 leads need `gameId` mapping** — manual work, prone to typos. Should cross-reference against `sample_response.json`.
2. **Ships have `capital` prefix** — e.g. `capitalexecutor` vs just `executor`. Needs verification.
3. **`others` field mapping** — If we want to check the full team, we need to map all units in the `others` string to gameIds. This is a large scope increase. Defer to Phase 2.
4. **Variant leads** — Data has lead names like `"Aphra (SLKR)"`, `"Profundity (no R1)"` — these should resolve to the base lead's `gameId`.
5. **Performance** — 179 unique leads across all phases. The lookup should be fast enough as a computed/memoized operation.
