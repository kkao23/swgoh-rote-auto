# Implementation Plan: Comlink Integration for Budget Page Auto-Population

## Goal

Allow users on the `/budget` page to enter their SWGOH ally code and have the crystal income wizard auto-populate fields (Fleet Arena rank, GAC division, Territory Battle stars, Assault Battle tiers) by fetching their player and guild data from a self-hosted [swgoh-comlink](https://github.com/swgoh-utils/swgoh-comlink) service.

---

## What is Comlink?

[swgoh-comlink](https://github.com/swgoh-utils/swgoh-comlink) is a self-hosted proxy service (Docker container or binary) that makes read-only calls to SWGOH game APIs. It exposes a REST API on port `3000` by default.

**[@swgoh-utils/comlink](https://www.npmjs.com/package/@swgoh-utils/comlink)** is the official JS/TS client library to interact with a comlink service instance.

### Key Facts

| Property | Detail |
|----------|--------|
| **Hosting** | You must host your own instance (Docker on VPS, cloud VM, etc.) |
| **Auth** | Read-only, mostly unauthenticated. Uses anonymous guest accounts for guild endpoints. |
| **Port** | Default `3000` |
| **Required Env** | `APP_NAME` (identifies your tool to the game API) |

### Relevant Comlink API Endpoints

| Endpoint | What it returns | Budget page relevance |
|----------|----------------|----------------------|
| `/player` | Player profile including ally code, name, level, **fleet arena rank**, **squad arena rank**, **skill rating** (for GAC division mapping), guild membership info | Fleet rank, GAC division |
| `/guild` | Guild details including guild ID, member list, **territory battle results** (stars per TB type) | TB type + average stars |
| `/roster` | Player's character & ship collection with gear/relic levels, stats | Determine Assault Battle tier eligibility (Peridea Patrol, Duel of the Fates) |
| `/data` | Static game data (localization, ability definitions, etc.) | Optional: enrich UI labels |

### What Comlink CANNOT Provide (not in the API)

- ❌ Current GAC win/loss record for the active season
- ❌ How many energy/shard refreshes a player does per day
- ❌ Whether a player purchases the Episode Pass
- ❌ Crystal purchase history
- ❌ Marquee pack purchasing behavior

**These remaining fields will stay manual.**

---

## Architecture Overview

```
┌──────────────────────┐
│   budget.vue (SSR)   │  Nuxt frontend
│   User enters ally   │
│   code → click Fetch │
└─────────┬────────────┘
          │ HTTP POST
          ▼
┌──────────────────────┐
│  Nuxt Server Route   │  /api/comlink/player?allyCode=XXX
│  (server/api/)       │  /api/comlink/guild?guildId=XXX
│                      │  /api/comlink/roster?allyCode=XXX
└─────────┬────────────┘
          │ proxied request
          ▼
┌──────────────────────┐
│  Comlink Service     │  Docker container on VPS
│  (self-hosted)       │  APP_NAME=swgoh-rote-auto
│  port 3000           │
└──────────────────────┘
```

**Why a Nuxt server proxy?** Keeps the comlink instance URL secret on the server side, preventing abuse from direct browser access.

---

## Task List

### Phase 1: Comlink Backend Setup

- [ ] **1.1 Deploy Comlink Docker container**
  - Choose hosting (AWS EC2 t4g.nano, or lightsail)
  - Run: `docker run -d -p 3000:3000 -e APP_NAME=swgoh-rote-auto ghcr.io/swgoh-utils/swgoh-comlink:latest`
  - Verify health: `curl http://<host>:3000/health`
  - Restrict firewall to only accept requests from the Nuxt server's IP

- [ ] **1.2 Add comlink URL as environment variable**
  - Add `COMLINK_BASE_URL` to project `.env` (not committed to git)
  - Add to Nuxt config as `runtimeConfig.comlinkBaseUrl` (server-side only)

- [ ] **1.3 Install @swgoh-utils/comlink npm package**
  - `npm install @swgoh-utils/comlink`
  - Verify TypeScript types are available

### Phase 2: Nuxt Server API Routes (Proxy Layer)

- [ ] **2.1 Create `/server/api/comlink/player.get.ts`**
  - Accepts `allyCode` query parameter
  - Calls comlink `/player` endpoint via the JS client
  - Returns a sanitized/typed subset of player data (ally code, name, fleet arena rank, GAC skill rating)

- [ ] **2.2 Create `/server/api/comlink/guild.get.ts`**
  - Accepts `guildId` query parameter (obtained from player data)
  - Calls comlink `/guild` endpoint
  - Returns TB results (last several TBs with star counts per TB type)

- [ ] **2.3 Create `/server/api/comlink/roster.get.ts`**
  - Accepts `allyCode` query parameter
  - Calls comlink `/roster` endpoint
  - Returns character relic levels to determine Assault Battle tier eligibility

- [ ] **2.4 Add rate limiting and error handling middleware**
  - Rate limit: 10 requests per minute per IP
  - Graceful error responses (comlink down, invalid ally code, etc.)

### Phase 3: Frontend — Ally Code Input & Data Fetching

- [ ] **3.1 Add "Quick Import from Ally Code" section to budget.vue**
  - Place at the top of the page (above the wizard steps)
  - Single text input for ally code + "Fetch My Data" button
  - Loading spinner during fetch
  - Success/error toast notifications

- [ ] **3.2 Create composable `useComlinkData.ts`**
  - `fetchPlayerData(allyCode)` → calls server API routes
  - `fetchGuildData(guildId)`
  - `fetchRosterData(allyCode)`
  - Returns typed, sanitized data ready for consumption by budget.vue

- [ ] **3.3 Wire up data mapping logic**
  - Map fleet arena rank → `selectedFleetRank` dropdown value
  - Map GAC skill rating → `selectedGacDivision` dropdown value
  - Map guild TB results → `selectedTbType` and `selectedTbStars`
  - Map roster relic levels → Peridea Patrol / Duel of the Fates tier selection

### Phase 4: Data Mapping Details

- [ ] **4.1 Fleet Arena Rank Mapping**
  - Comlink returns exact numerical rank (1–10,000+)
  - Map to existing `fleetRankOptions` buckets (1, 2, 3, 4, 5, 6–10, 11–20, 21–50, 51+)
  - Display "Auto-detected: Rank X–Y" with a visual indicator on the dropdown
  - Allow manual override

- [ ] **4.2 GAC Division Mapping**
  - Comlink player data includes `skillRating` (e.g., 3600 = Kyber 1)
  - Map skill rating ranges to GAC divisions:
    ```
    ≥3613 → Kyber 1, 3349-3612 → Kyber 2, 3100-3348 → Kyber 3,
    2865-3099 → Kyber 4, 2650-2864 → Kyber 5,
    2447-2649 → Aurodium 1, 2251-2446 → Aurodium 2, ...
    ```
  - (Need to verify exact thresholds — community wiki or data mining may be required)
  - Display "Auto-detected: Kyber 2 (skill rating: 3450)"
  - Allow manual override

- [ ] **4.3 Territory Battle Stars Mapping**
  - Guild data includes TB event history with star counts
  - Filter to the last ~3 months of results per TB type (RotE, Geonosis, Hoth)
  - Compute average stars for each TB type the guild runs
  - Pre-select the TB type with the most recent activity and its average stars
  - Display "Auto-detected: RotE ~42 stars (avg of last 6 runs)"
  - Allow manual override

- [ ] **4.4 Assault Battle Tier Mapping (Peridea Patrol / Duel of the Fates)**
  - Check roster for character relic levels required for each tier:
    - Peridea Patrol: requires specific factions at R5/R7/R9
    - Duel of the Fates: requires specific factions at R5/R7/R9
  - Determine the highest tier the player is likely to complete
  - Display "Auto-detected: Tier 5 [Relic 7] based on your roster"
  - Allow manual override (this is the most heuristic-based detection)

### Phase 5: UI/UX Polish

- [ ] **5.1 Visual indicators for auto-populated fields**
  - Green border/badge on auto-populated dropdowns
  - Small "🤖 Auto" chip next to the label
  - Tooltip showing the raw data source (e.g., "Based on fleet rank #3 as of May 29, 2026")

- [ ] **5.2 "Clear imported data" button**
  - Resets all auto-populated fields to their defaults
  - Preserves manually changed fields after import

- [ ] **5.3 Persist ally code in localStorage**
  - Save the last used ally code so returning users see their data again
  - Add a "Refresh data" link to re-fetch

- [ ] **5.4 Handle edge cases**
  - Invalid ally code → show specific error message
  - Comlink service down → show "Data service temporarily unavailable, please fill in manually"
  - Player not in a guild → TB fields remain manual
  - New player with low skill rating → handle Carbonite/no-GAC gracefully

### Phase 6: Testing & Validation

- [ ] **6.1 Manual testing with real ally codes**
  - Test with known ally codes across different GAC divisions
  - Verify fleet rank mapping accuracy
  - Verify TB star averaging logic
  - Verify AB tier heuristics against actual player rosters

- [ ] **6.2 Unit tests**
  - Test data mapping functions (rank bucketing, skill rating → division)
  - Test TB star averaging
  - Test roster relic level checking

- [ ] **6.3 Performance check**
  - Ensure ally code lookup feels fast (<2 seconds for all three API calls)
  - Consider parallelizing player + roster calls (they're independent)

---

## Data Flow Summary

```
User enters ally code: 123-456-789
        │
        ▼
┌─────────────────────────────┐
│ GET /api/comlink/player     │ → { name, fleetRank: 3, skillRating: 3450, guildId: "abc" }
│ GET /api/comlink/roster     │ → { units: [...relic levels...] }
└─────────┬───────────────────┘
          │ (guildId from player)
          ▼
┌─────────────────────────────┐
│ GET /api/comlink/guild      │ → { tbResults: [{ type: "rote", stars: 42 }, ...] }
└──────────────┬──────────────┘
               │
               ▼
┌──────────────────────────────────────────────┐
│ Data Mapping (composable)                     │
│                                                │
│ fleetRank: 3        → select "Rank 3"         │
│ skillRating: 3450   → select "Kyber 2"         │
│ tbAverage: 42       → select "RotE" + 42★     │
│ relicLevels ≥ R7    → AB Tier 5              │
│ relicLevels ≥ R9    → AB Tier 6              │
└──────────────────┬───────────────────────────┘
                   │
                   ▼
        budget.vue fields updated
        (user can still manually override any field)
```

---

## Fields That Will Be Auto-Populated

| Budget Step | Field | Source | Confidence |
|-------------|-------|--------|------------|
| Step 1 | Fleet Arena Rank | `/player` → `pvp[].rank` filtered to fleet | **High** |
| Step 2 | GAC Division | `/player` → `skillRating` mapped to division | **High** |
| Step 3 | Territory Battle Type & Stars | `/guild` → TB event history, average stars | **Medium-High** |
| Step 4 | Peridea Patrol AB Tier | `/roster` → character relic levels heuristic | **Medium** |
| Step 5 | Duel of the Fates AB Tier | `/roster` → character relic levels heuristic | **Medium** |

## Fields That Remain Manual

| Step | Why |
|------|-----|
| Step 6 (Crystal Purchases) | Purchase history is private, not in API |
| Step 7 (Energy Refreshes) | Player behavior, not in API |
| Step 8 (Shard Refreshes) | Player behavior, not in API |
| Step 9 (Marquee Goals) | Player behavior, not in API |
| Step 10 (Era/Materials Whaling) | Player behavior, not in API |

---

## Risks & Mitigations

| Risk | Mitigation |
|------|-----------|
| Comlink service goes down or is rate-limited by the game API | All fields remain manually editable; show graceful error message |
| GAC skill rating thresholds change with game updates | Store thresholds in a config file; document update process |
| Guild TB data may be sparse for new guilds | Fall back to manual selection with a note |
| AB tier heuristic may be wrong (player has relics but can't clear the tier) | Always allow manual override; show confidence indicator |
| Comlink server IP gets blocked by EA/CG | Follow swgoh-utils community best practices for request throttling |

---

## Dependencies to Add

```json
{
  "dependencies": {
    "@swgoh-utils/comlink": "^1.x"
  }
}
```

---

## Environment Variables

```bash
# .env (not committed)
COMLINK_BASE_URL=http://your-comlink-host:3000
```

```typescript
// nuxt.config.ts addition
runtimeConfig: {
  comlinkBaseUrl: '',
  // public: {} // DO NOT expose to client
}
```

---

## Verification Checklist

- [ ] Comlink Docker container running and reachable from the Nuxt server
- [ ] Server API routes return valid data for known ally codes
- [ ] Ally code input field appears on budget.vue
- [ ] Clicking "Fetch My Data" populates Step 1–5 fields
- [ ] Auto-populated fields are distinguishable from manually filled fields
- [ ] User can override any auto-populated field
- [ ] Error states are handled gracefully (invalid code, comlink down, no guild)
- [ ] Ally code is persisted in localStorage for returning users
- [ ] All unit tests pass
