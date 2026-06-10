# Implementation Plan: Mhanndalorian API Integration for Budget Page Auto-Population

## Goal

Allow users on the `/budget` page to enter their SWGOH ally code and have the crystal income wizard auto-populate fields (Fleet Arena rank, GAC division, Territory Battle stars, Assault Battle tiers) by fetching their player and guild data from the [Mhanndalorian Bot API](https://mhanndalorianbot.work/api.html).

**Cost:** $1/month ($10/year Patreon tier) — replaces the need for a self-hosted Comlink VPS (~$7/month).

---

## What is the Mhanndalorian API?

The [Mhanndalorian Bot](https://mhanndalorianbot.work/api.html) is a Discord bot for SWGOH that also offers a read-only REST API. It provides access to authenticated game data (player profiles, rosters, guild data, PVP ranks) via Patreon subscription.

### Key Facts

| Property | Detail |
|----------|--------|
| **Hosting** | No hosting needed — it's a SaaS API |
| **Auth** | HMAC-SHA256 signing (Option 2 from docs). Requires API key + Discord ID. |
| **Method** | All requests are `POST` to `https://mhanndalorianbot.work/api/<endpoint>` |
| **Compression** | Server responds with brotli (`br`) when `Accept-Encoding: br,gzip,deflate` is set. `/player` shrinks from 3 MB → 235 KB. |

### Relevant Mhanndalorian API Endpoints

| Endpoint | What it returns | Budget page relevance | Size (compressed) |
|----------|----------------|----------------------|-------------------|
| `/playerarena` | PVP profile (fleet rank, squad rank), skill rating, GAC league/division, name, level, allyCode, playerId | Fleet rank, GAC division | **0.4 KB** |
| `/player` | Full roster (398 units with relic/gear/mods), guildId, guildName, pvpProfile, playerRating, name, level, allyCode, profile stats | Guild ID (to query /guild), roster for AB tier lookup | **235 KB** (brotli) |
| `/guild` | Guild members (49 with GP, GAC, activity), **last TB stars** (`guildEventTracker` → `completedStars`), TB type (`definitionId`), recent TW results, raid results, guild profile | TB type + stars (most recent only) | **~75 KB** (uncompressed) |

### What the API CANNOT Provide

- Current GAC win/loss record for the active season
- How many energy/shard refreshes a player does per day
- Whether a player purchases the Episode Pass
- Crystal purchase history
- Marquee pack purchasing behavior

**These remaining fields will stay manual.**

---

## Authentication: HMAC-SHA256 Signing

All requests must be signed with HMAC-SHA256. No external library needed — Node's built-in `crypto` module handles everything.

### HMAC Algorithm

```
1. Generate Unix timestamp in milliseconds (Date.now())
2. Create HMAC-SHA256 object with API key as secret
3. Update with: timestamp (as string)
4. Update with: "POST"
5. Update with: endpoint (lowercase, e.g. "/api/playerarena")
6. MD5-hash the JSON-stringified request body → hex
7. Update with: the MD5 hex digest
8. Get the hex digest → this is the Authorization header value
```

### Required Headers

```
Content-Type: application/json
Accept-Encoding: br,gzip,deflate
x-timestamp: <unix timestamp in ms>
Authorization: <HMAC-SHA256 hex digest>
x-discord-id: <your Discord user ID>
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36
```

### Sample Node.js Implementation

```typescript
import crypto from 'crypto';

function signRequest(apiKey: string, endpoint: string, payload: object) {
  const timestamp = Date.now().toString();
  const hmac = crypto.createHmac('sha256', apiKey);
  hmac.update(timestamp);
  hmac.update('POST');
  hmac.update(endpoint.toLowerCase());
  const payloadString = JSON.stringify(payload);
  const payloadHash = crypto.createHash('md5').update(payloadString).digest('hex');
  hmac.update(payloadHash);
  return {
    'x-timestamp': timestamp,
    'Authorization': hmac.digest('hex'),
  };
}
```

---

## Architecture Overview

```
┌──────────────────────┐
│   budget.vue (SSR)   │  Nuxt frontend
│   User enters ally   │
│   code → click Fetch │
└─────────┬────────────┘
          │ HTTP POST (to Nuxt server route)
          ▼
┌──────────────────────┐
│  Nuxt Server Route   │  /api/mhann/player?allyCode=XXX
│  (server/api/)       │  /api/mhann/guild?guildId=XXX
│                      │  /api/mhann/roster?allyCode=XXX
│                      │
│  Signs requests with │
│  HMAC-SHA256 using   │
│  server-side API key │
└─────────┬────────────┘
          │ HMAC-signed POST
          ▼
┌──────────────────────┐
│  Mhanndalorian API   │  https://mhanndalorianbot.work/api
│  (SaaS, no hosting)  │
└──────────────────────┘
```

**Why a Nuxt server proxy?** The API key and Discord ID stay secret on the server. The HMAC signature is computed server-side. The browser never sees credentials.

---

## Data Flow Summary

```
User enters ally code: 761-355-883
        │
        ▼
┌─────────────────────────────────────────┐
│ GET /api/mhann/player?allyCode=761355883│ → { fleetRank, skillRating, guildId, roster }
│ (calls /playerarena + /player)          │
└─────────┬───────────────────────────────┘
          │ (guildId from /player)
          ▼
┌─────────────────────────────────────────┐
│ GET /api/mhann/guild?guildId=6fw9Rsk... │ → { tbType, tbStars }
│ (calls /guild)                          │
└──────────────┬──────────────────────────┘
               │
               ▼
┌──────────────────────────────────────────────┐
│ Data Mapping (composable)                     │
│                                                │
│ fleetRank: 4          → select "Rank 4"       │
│ skillRating: 3619     → select "Kyber 2"       │
│ tbType: t05D          → select TB type         │
│ tbStars: 42           → 42 stars               │
│ roster: [398 units]   → check AB requirements  │
└──────────────────┬───────────────────────────┘
                   │
                   ▼
        budget.vue fields updated
        (user can still manually override any field)
```

---

## Task List

### Phase 1: API Credentials Setup

- [ ] **1.1 Confirm API access is active**
  - Verified: API key + Discord ID pair works with HMAC signing
  - Health check: `POST /api/playerarena` returns `code: 0` for known ally codes

- [ ] **1.2 Add API credentials as environment variables**
  ```bash
  # .env (not committed)
  MHANN_API_KEY=pCmrf8AEpCVlOLCv7kX1pSbmCuOobfQBOda8XZJq5ERDYzPGQY
  MHANN_DISCORD_ID=176845215364022272
  MHANN_BASE_URL=https://mhanndalorianbot.work/api
  ```
  - Add to Nuxt config as `runtimeConfig` (server-side only, NOT `public`)

- [ ] **1.3 Create HMAC signing utility**
  - `server/utils/mhann-sign.ts` — single function: `signRequest(endpoint, payload) → headers`
  - Zero external dependencies — uses Node `crypto`
  - Unit-test against the sample data in the docs to verify correctness

- [ ] **1.4 Create shared fetch wrapper**
  - `server/utils/mhann-fetch.ts` — wraps `fetch()` with HMAC signing + error handling + brotli decompression
  - Adds `Accept-Encoding: br,gzip,deflate` header automatically
  - Handles Cloudflare blocks (retry once with delay if 403/503)

### Phase 2: Nuxt Server API Routes (Proxy Layer)

- [ ] **2.1 Create `server/api/mhann/player.get.ts`**
  - Accepts `allyCode` query parameter
  - Calls Mhanndalorian `/player` endpoint → returns full profile
  - Calls `/playerarena` for lightweight PVP data (used for fleet rank + GAC when full roster isn't needed)
  - Returns sanitized subset:
    ```typescript
    {
      name: string,
      allyCode: string,
      playerId: string,
      fleetRank: number | null,          // from pvpProfile tab 2
      squadRank: number | null,          // from pvpProfile tab 1
      skillRating: number,               // from playerRating
      leagueId: string,                  // "KYBER", "AURODIUM", etc.
      divisionId: number,                // 1-25
      guildId: string | null,
      guildName: string | null,
      rosterUnits: Array<{              // AB-relevant subset only
        definitionId: string,
        relicTier: number,
        rarity: number,
        level: number,
      }>
    }
    ```
  - **Roster filtering:** Only include the ~5 units needed for Assault Battle tier detection (exact units TBD). Strip mod data, skill data, and all other units to keep response tiny.

- [ ] **2.2 Create `server/api/mhann/guild.get.ts`**
  - Accepts `guildId` query parameter
  - Calls Mhanndalorian `/guild` endpoint
  - Returns sanitized subset:
    ```typescript
    {
      guildName: string,
      guildId: string,
      guildGP: string,
      memberCount: number,
      lastTB: {
        definitionId: string,            // e.g. "t05D"
        completedStars: string,          // e.g. "42"
        endTime: string,                 // epoch ms
      } | null,
      members: Array<{
        playerName: string,
        playerId: string,
        galacticPower: string,
        characterGalacticPower: string,
        shipGalacticPower: string,
        leagueId: string,
        lastActivityTime: string,
      }>
    }
    ```
  - Only returns most recent TB from `guildEventTracker` — no history/averaging needed.

- [ ] **2.3 Add rate limiting and error handling**
  - Rate limit: 10 requests per minute per IP (protects API key from abuse)
  - Graceful error responses:
    - Invalid ally code → 400 with message
    - API down/Cloudflare block → 502 "Data service temporarily unavailable"
    - Player not in guild → TB fields null, handled gracefully on frontend

### Phase 3: Frontend — Ally Code Input & Data Fetching

- [ ] **3.1 Add "Quick Import from Ally Code" section to budget.vue**
  - Place at the top of the page (above the wizard steps)
  - Single text input for ally code + "Fetch My Data" button
  - Loading spinner during fetch
  - Success/error toast notifications

- [ ] **3.2 Create composable `useMhannData.ts`**
  - `fetchPlayerData(allyCode)` → calls `GET /api/mhann/player?allyCode=...`
  - `fetchGuildData(guildId)` → calls `GET /api/mhann/guild?guildId=...`
  - Returns typed, sanitized data ready for consumption by budget.vue

- [ ] **3.3 Wire up data mapping logic**
  - Map fleet arena rank → `selectedFleetRank` dropdown value
  - Map GAC skill rating → `selectedGacDivision` dropdown value
  - Map guild TB → `selectedTbType` and `selectedTbStars`
  - Map roster units → AB tier detection (~5 specific units, TBD)

### Phase 4: Data Mapping Details

- [ ] **4.1 Fleet Arena Rank Mapping**
  - Source: `/playerarena` → `pvpProfile[tab=2].rank` (or `/player` → `pvpProfile`)
  - Default to current rank, mapped to existing `fleetRankOptions` buckets (1, 2, 3, 4, 5, 6–10, 11–20, 21–50, 51+)
  - Display "Auto-detected: Rank X" with a visual indicator
  - **User can always override** — fleet rank varies a lot day-to-day

- [ ] **4.2 GAC Division Mapping**
  - Source: `/playerarena` → `playerRating.playerSkillRating.skillRating` (e.g., 3619)
  - Also available from `playerRating.playerRankStatus` → `leagueId` + `divisionId`
  - Map skill rating ranges to GAC divisions:
    ```
    ≥3613 → Kyber 1, 3349-3612 → Kyber 2, 3100-3348 → Kyber 3,
    2865-3099 → Kyber 4, 2650-2864 → Kyber 5,
    2447-2649 → Aurodium 1, 2251-2446 → Aurodium 2, ...
    ```
    (Thresholds need verification — see Phase 6)
  - Display "Auto-detected: Kyber 2 (skill rating: 3619)"
  - Allow manual override

- [ ] **4.3 Territory Battle Stars Mapping**
  - Source: `/guild` → `profile.guildEventTracker[]`
  - Take the most recent entry (already returned from server route)
  - Map `definitionId` to TB type (e.g., `t05D` → RotE, `t03D` → Geonosis DSTB, etc.)
    - TB type mapping table needed — definitions TBD
  - Pre-select the TB type + stars from that single entry
  - Display "Auto-detected: RotE 42★ (most recent TB)"
  - Allow manual override

- [ ] **4.4 Assault Battle Tier Mapping (~5 specific units TBD)**
  - Source: `/player` → `rosterUnit[]` filtered to specific `definitionId`s
  - Server route 2.1 already filters roster to only relevant units
  - Check relic levels of those units against AB tier requirements
  - Determine highest tier the player qualifies for
  - Display "Auto-detected: Tier X based on your roster"
  - Allow manual override
  - **Exact units and tier requirements to be specified later**

### Phase 5: UI/UX Polish

- [ ] **5.1 Visual indicators for auto-populated fields**
  - Green border/badge on auto-populated dropdowns
  - Small "Auto" chip next to the label
  - Tooltip showing the raw data source (e.g., "Based on fleet rank #4 as of <date>")

- [ ] **5.2 "Clear imported data" button**
  - Resets all auto-populated fields to their defaults
  - Preserves manually changed fields after import

- [ ] **5.3 Persist ally code in localStorage**
  - Save the last used ally code so returning users see their data again
  - Add a "Refresh data" link to re-fetch

- [ ] **5.4 Handle edge cases**
  - Invalid ally code → show specific error message
  - API down/Cloudflare blocked → show "Data service temporarily unavailable, please fill in manually"
  - Player not in a guild → TB fields remain manual
  - New player with low skill rating → handle Carbonite/no-GAC gracefully
  - Fleet rank missing (new player, no fleet) → leave manual

### Phase 6: Testing & Validation

- [ ] **6.1 Manual testing with real ally codes**
  - Test with known ally codes across different GAC divisions
  - Verify fleet rank mapping accuracy
  - Verify TB type mapping (definitionId → display name)
  - Verify AB tier heuristics once unit list is finalized

- [ ] **6.2 Unit tests**
  - Test HMAC signing against docs' sample data (already verified)
  - Test data mapping functions (rank bucketing, skill rating → division)
  - Test TB definitionId → type mapping
  - Test roster unit filtering logic

- [ ] **6.3 GAC threshold verification**
  - Current thresholds in 4.2 are approximate
  - Need to verify against community sources or live data
  - Store thresholds in a config file for easy updates

- [ ] **6.4 Performance check**
  - Single user lookup: `/player` (~235 KB compressed) + `/guild` (~75 KB uncompressed)
  - Both calls can be parallelized from the frontend (player data first, then guild uses guildId from player)
  - Target: <2 seconds total

---

## Fields That Will Be Auto-Populated

| Budget Step | Field | Source | Confidence |
|-------------|-------|--------|------------|
| Step 1 | Fleet Arena Rank | `/playerarena` → `pvpProfile[tab=2].rank` | **High** (snapshot, user can adjust) |
| Step 2 | GAC Division | `/playerarena` → `skillRating` mapped to division | **High** |
| Step 3 | Territory Battle Type & Stars | `/guild` → most recent `guildEventTracker` entry | **High** (single data point) |
| Step 4 | Peridea Patrol AB Tier | `/player` → specific unit relic levels (TBD) | **Medium** (heuristic) |
| Step 5 | Duel of the Fates AB Tier | `/player` → specific unit relic levels (TBD) | **Medium** (heuristic) |

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
| API key gets rate-limited or blocked by Cloudflare | Browser-like User-Agent header; handle 403 gracefully, show manual fallback |
| GAC skill rating thresholds change with game updates | Store thresholds in a config file; update periodically |
| TB definitionId mapping is incomplete/unknown | Keep a small lookup table; log unknown IDs for later addition |
| AB tier heuristic may be wrong | Always allow manual override; show confidence indicator |
| Discord ID loses registration (Patreon lapse, etc.) | Health check on startup; alert if API returns auth errors |
| Single API key serves all users — potential for abuse | Server-side rate limiting (10 req/min/IP); no client-side key exposure |

---

## Dependencies

**No new npm packages needed.** The HMAC signing uses Node's built-in `crypto` module. HTTP requests use native `fetch()` (available in Nuxt 3 server routes).

---

## Environment Variables

```bash
# .env (not committed)
MHANN_API_KEY=pCmrf8AEpCVlOLCv7kX1pSbmCuOobfQBOda8XZJq5ERDYzPGQY
MHANN_DISCORD_ID=176845215364022272
MHANN_BASE_URL=https://mhanndalorianbot.work/api
```

```typescript
// nuxt.config.ts addition
runtimeConfig: {
  mhannApiKey: '',
  mhannDiscordId: '',
  mhannBaseUrl: 'https://mhanndalorianbot.work/api',
  // public: {} // DO NOT expose these to client
}
```

---

## Amplify Gen 2 — AWS Resources & Secrets

### No new AWS resources needed

Since this is a **Nuxt 3 SSR** app deployed on **Amplify Hosting**, the Nuxt server routes (`server/api/mhann/`) run on Amplify's built-in compute layer. No additional Lambda, AppSync, or DynamoDB resources are required — the server routes proxy requests to the Mhanndalorian API and return sanitized data directly. Zero new `amplify/` resources.

**Existing Amplify resources (unchanged):**

| Resource | Purpose |
|----------|---------|
| `data/resource.ts` | AppSync + DynamoDB for voting |
| `functions/vote-handler/` | Lambda for vote deduplication |
| Nuxt SSR compute | Amplify Hosting auto-provisions this — `server/api/` routes run here |

### Secrets Management

The API key and Discord ID must never be committed to git. Amplify Gen 2 has a built-in secrets system.

**Step 1: Set secrets for local sandbox**
```bash
npx amplify sandbox secret set MHANN_API_KEY
# → paste: pCmrf8AEpCVlOLCv7kX1pSbmCuOobfQBOda8XZJq5ERDYzPGQY

npx amplify sandbox secret set MHANN_DISCORD_ID
# → paste: 176845215364022272
```
This stores them in AWS SSM Parameter Store under `/amplify/<app-name>/<sandbox-name>/`. These secrets are **only** available to `npx amplify sandbox` — they do **not** propagate to branch deployments.

**Step 2: Set secrets for each branch environment (dev, main, etc.)**

Amplify Console → **Hosting → Environment variables** → **Manage variables**:

| Variable | Value | Branch scope | Secret? |
|----------|-------|-------------|---------|
| `MHANN_API_KEY` | `pCmrf8AE...` | All branches (or scope per-branch) | ✅ |
| `MHANN_DISCORD_ID` | `176845215364022272` | All branches (or scope per-branch) | ✅ |

- Use **"All branches"** if dev and main share the same API key
- Or scope per-branch if you want a separate test key for dev
- Check the **"Secret"** box so values are hidden from build logs and the Console UI

> **Important:** `sandbox secret set` (SSM) and **Amplify Console env vars** are two separate systems. You must configure both if you use both sandbox and branch deployments.

**Step 3: Reference in Nuxt config**
```typescript
// nuxt.config.ts addition
runtimeConfig: {
  mhannApiKey: '',       // populated from process.env.MHANN_API_KEY at runtime
  mhannDiscordId: '',
  mhannBaseUrl: 'https://mhanndalorianbot.work/api',
  // public: {}           // NEVER expose these to client
}
```

Nuxt's `runtimeConfig` picks up `process.env.MHANN_API_KEY` automatically. Amplify Hosting injects Console-seeded env vars into the SSR compute environment.

### Alternative: Dedicated Lambda (optional)

If you later want API calls decoupled from the Nuxt layer (e.g., share with other apps, or offload to avoid blocking SSR):

```
amplify/
└── functions/
    └── mhann-fetcher/
        ├── resource.ts      # defineFunction + secret() refs
        └── handler.ts       # HMAC sign → call /playerarena, /player, /guild → return sanitized JSON
```

```typescript
// amplify/functions/mhann-fetcher/resource.ts
import { defineFunction, secret } from "@aws-amplify/backend";

export const mhannFetcher = defineFunction({
  name: "mhann-fetcher",
  entry: "./handler.ts",
  timeoutSeconds: 15,          // Mhanndalorian API can lag
  memoryMB: 256,
  runtime: 20,
  environment: {
    MHANN_API_KEY: secret("MHANN_API_KEY"),
    MHANN_DISCORD_ID: secret("MHANN_DISCORD_ID"),
  },
});
```

```typescript
// amplify/backend.ts — register it
import { mhannFetcher } from "./functions/mhann-fetcher/resource";
const backend = defineBackend({ data, voteHandler, mhannFetcher });
```

Then expose it via **Lambda Function URL** (REST) or **AppSync** (GraphQL, matching your existing voting pattern). This is **not needed** for the initial implementation — Nuxt server routes are simpler and already run on Amplify's managed compute.

---

## Verification Checklist

- [ ] API key + Discord ID confirmed working (tested 2026-06-09)
- [ ] HMAC signing utility passes sample data test from docs
- [ ] `/api/mhann/player` route returns valid data for known ally codes
- [ ] `/api/mhann/guild` route returns valid data for known guild IDs
- [ ] Ally code input field appears on budget.vue
- [ ] Clicking "Fetch My Data" populates Step 1–5 fields
- [ ] Auto-populated fields are visually distinguishable from manually filled fields
- [ ] User can override any auto-populated field
- [ ] Fleet rank defaults to current rank with user-adjustable override
- [ ] TB shows most recent result only (no history/averaging)
- [ ] AB tier detection only checks ~5 specific units
- [ ] Error states handled gracefully (invalid code, API down, no guild)
- [ ] Ally code persisted in localStorage for returning users
- [ ] All unit tests pass
