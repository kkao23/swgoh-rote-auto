# SUCCESSION.md — Handoff Plan for swgoh-rote-auto

**Status:** Draft — in progress. Successor not yet selected (recruiting).
**Owner:** Kevin Kao (`kkao23` on GitHub, chocomog@gmail.com)
**Last updated:** 2026-11-17

This document is the single source of truth for handing off the project: what
exists, who gets what access, how the AWS backend moves off the owner's
personal account, and the recurring tasks the new maintainer inherits.

---

## Quick facts

| | |
|---|---|
| Public site | <https://swgohrote.com> (Nuxt SSG behind CloudFront) |
| Repo | <https://github.com/kkao23/swgoh-rote-auto> |
| AWS account | 277707134519 (owner's — successor will create their own) |
| Backend region | us-east-2 (AppSync, DynamoDB, API Gateway, suggest-team Lambda) |
| Architecture | See [AGENTS.md](AGENTS.md) |
| Working convention | Risky/new features are tested on a `dev` branch first, **not** main (owner direction) |

---

## Inventory — everything the successor inherits

### Site / hosting / DNS (owner's AWS account)

| Asset | Details |
|---|---|
| Amplify Hosting app `swgoh-rote-auto` | App id `d3esvufj0jgdhy`, us-east-2, connected to the GitHub repo; **auto-build on both `main` and `dev`** — each branch gets its own URL and its own fullstack backend |
| CDN | Amplify-managed CloudFront (nothing user-owned to migrate) |
| Domain | `swgohrote.com` — **registered via Route 53** and DNS hosted in the same account (zone `Z0290119154XBR1OXCLEC`; apex + www point at Amplify) |
| TLS | Amplify-managed ACM cert; recreated automatically when the domain is attached to a new Amplify app |

### Backend: Amplify Gen 2 (defined in `amplify/`, deployed by Amplify Hosting CI/CD per branch)

| Asset | Details |
|---|---|
| AppSync GraphQL API | us-east-2, **public API-key auth**, key expires every **365 days** |
| DynamoDB tables | `TeamVote` (aggregate counts), `VoteLog` (per-IP dedup, salted hashes), `VoteSummary` (nightly rollup) |
| Lambda `vote-aggregator` | Nightly EventBridge cron (05:00 UTC); grants on TeamVote/VoteSummary defined in `amplify/backend.ts` |
| Lambda `vote-handler` | **Unimplemented placeholder** — votes currently flow via AppSync with the public API key; dedup is VoteLog-based |
| Client config | `amplify_outputs.json` (gitignored) is generated at build time by CI/CD. **Production = the main-branch deployment**: AppSync `ns3tpbch5ndrjpht4bi3uokpdq` (10,564 TeamVote rows as of 2026-11-17). Caution: the local `amplify_outputs.json` in the owner's working tree is **stale** — it points to a deleted sandbox API (`k2iz6foonvexjpvv2mnlhw5ei4`) |
| Prod API key | `da2-c2dswybeg5hqjmlwsnzkhl3lji` — **expires 2027-10-31** |
| `VoteLog` table | Empty (0 rows) in every stack — the server-side dedup described in code comments is not active (vote-handler is an unimplemented placeholder); check `useVoteTracker.ts` for how the frontend limits repeat votes before deciding whether to migrate it |

### Standalone suggestion pipeline (NOT in Amplify — deployed by hand)

| Asset | Details |
|---|---|
| Lambda `swgoh-rote-suggest-team` | us-east-2, nodejs24.x. Source of truth: `scripts/lambda-sources/suggest-team.mjs`; redeploy via `aws lambda update-function-code` |
| API Gateway | HTTP API `swgoh-rote-api` (`47rezenqn0`, us-east-2) → `/prod/suggest-team` — endpoint hardcoded in `components/SuggestTeamButton.vue:23`. A second HTTP API also named `swgoh-rote-api` (`cr9zuk5nb8`) exists — likely a stale duplicate; verify then delete |
| SES | Sends submissions to **chocomog@gmail.com** (hardcoded as `YOUR_EMAIL` in the Lambda); identity verified in us-east-1 **and** us-east-2 |
| Emails | Submissions arrive as copy-pasteable TS snippets for `data/<phase>/<Side>.ts` |

### Other AWS

| Asset | Details |
|---|---|
| S3 bucket `swgoh-rote` | Holds `rote.png` (og:image), referenced in `nuxt.config.ts` |
| CDK bootstrap bucket | `cdk-hnb659fds-assets-277707134519-us-east-2` (needed while deploying Amplify/CDK) |

### Stale stacks & cleanup inventory (delete during wind-down)

The account accumulated leftovers from old deployments. **Do not delete
blindly — other projects (journaling, nte-quick-reference, slave-maker) share
this account**, and the `Character-*` tables below match no schema in this
repo — verify ownership first.

| Suspected stale | What |
|---|---|
| AppSync `33qmgtwnjveazgch6lxyaqop4m` + `TeamVote`/`VoteLog` tables | Dev-branch backend (5 test rows) |
| AppSync `plregwom4zc6baphc27kyh32fi` + `TeamVote`/`VoteLog` tables | 1 row — old main or old sandbox; identify before deleting |
| AppSync `mzs5gwb5evgjbitg3v464ngr5q`, `qqs4xuh4tnbftcdy6fu64jirs4` + `Character-*` tables | Not from this repo's schema — check other projects first |
| HTTP API `cr9zuk5nb8` (`swgoh-rote-api`) | Duplicate API gateway |
| `amplify-nuxtapp-choco-san-*` Lambdas/buckets | Personal sandbox artifacts |

### Non-AWS dependencies (personally tied to the owner)

| Dependency | Details |
|---|---|
| mhann API key | In `.env` (`NUXT_MHANN_API_KEY`), tied to the owner's Discord identity (`NUXT_MHANN_DISCORD_ID`). Successor needs **their own** key from the Mhanndalorian Bot Discord |
| Google Analytics | GA4 property `G-12Z9F2YGVE`, hardcoded in `nuxt.config.ts` |
| Personal Gmail | SES destination + suggestion intake + GitHub account |

### Data to preserve

- `TeamVote`, `VoteSummary`, `VoteLog` — small tables; full scans fit in JSON
  (precedent: `teamvote_export.json`, ~340 KB). Refresh the export before any
  migration; votes cast between the export and cutover are lost.

---

## Phase 1 — Recruit a successor (next step)

1. Update the site banner advertising that the project is looking for a
   maintainer.
2. Build an **applicant form** on the site (name / SWGOH ally code / Discord
   handle / why interested / time available), which emails applicants to the
   same address as the suggest-a-team flow (reuse the SES setup; a sibling
   Lambda + API Gateway route to `suggest-team`).
3. **Test the form on a `dev` branch first, not main**, per the working
   convention. Merge to main only after it's verified end-to-end (submit →
   email arrives).
4. Review applicants; pick successor. Prefer someone active in the RoTE
   community with some TS/Vue or AWS familiarity.

---

## Phase 2 — GitHub handoff

**Model:** owner keeps the repo (and retains read/write — required by owner);
successor gets the **Maintain** role.

### Access

| Person | Role |
|---|---|
| Owner (kkao23) | Owner — keeps read/write forever |
| Successor | **Maintain** (can merge PRs, push branches, manage issues; **cannot** delete/transfer the repo, manage collaborators, or change visibility) |

Settings → Collaborators → add successor with Maintain (not Admin).

### History protection (bad-actor insurance)

Settings → Rules → Rulesets, targeting `main`:

- [ ] Block **force pushes** (no bypass — applies to everyone, incl. owner)
- [ ] Block **branch deletion**
- [ ] Restrict creations/updates on `main` (direct pushes by Maintain are fine
      here, or require PRs if preferred)
- [ ] Optional: protected-tag ruleset for any release tags
- [ ] Enable **2FA enforcement** (repo or org setting)

Honest limits: rulesets only hold while the actor can't edit them. Maintain
can't edit them. If the successor is ever promoted to Admin or the repo moves
somewhere they control, re-review this section first.

### Backups (owner, ongoing)

```bash
git clone --mirror https://github.com/kkao23/swgoh-rote-auto.git swgoh-rote-auto.git
# refresh later:
cd swgoh-rote-auto.git && git remote update --prune
```

Keep the mirror outside GitHub (external drive / another host). This is the
ultimate rollback against accidents *and* bad actors.

### Possible later step: GitHub organization

If both parties want shared ownership, transfer to an org (e.g. `swgoh-rote`)
with both as Owners + a third tiebreaker. Transfer preserves issues/stars and
old URLs redirect. Optional — do this only by mutual agreement.

---

## Phase 3 — AWS handoff

**Decision: the backend moves to a fresh AWS account owned by the successor.**
IAM users on the owner's account are rejected as an end-state — the owner must
be able to fully retire. Amplify Gen 2 is CDK-based, so the entire backend is
reproducible from the `amplify/` folder with no code changes.

### Step-by-step

1. **Successor: new AWS account** — root MFA, billing alert (~$10), AWS CLI +
   Node installed. (Or their existing account if they have one.)
2. **Successor: bootstrap backend** — create their own **Amplify Hosting app**
   connected to the GitHub repo; Amplify builds each branch and deploys the
   `amplify/` fullstack backend automatically (this is exactly how prod runs
   today, so the process is proven). For local dev they can also run
   `npx ampx sandbox`. Verify `VoteSummary` populates (newest model).
3. **Migrate data** — scan-and-import (owner's exports → `BatchWriteItem` into
   successor's tables). Decide together whether `VoteLog` migrates (preserves
   vote dedup; contains hashed IPs — successor's call).
4. **suggest-team stack** — successor recreates in their account: Lambda from
   `scripts/lambda-sources/suggest-team.mjs` (change `YOUR_EMAIL` to the
   successor's address), a verified SES identity for it, and an HTTP API route.
   Then update the hardcoded endpoint in `components/SuggestTeamButton.vue`
   (and the applicant form once built) and rebuild the site.
5. **mhann API** — successor requests their own API key (Mhanndalorian Bot
   Discord), sets `NUXT_MHANN_API_KEY` in their local `.env`. This
   de-personalizes roster lookups.
6. **Google Analytics** — successor creates a GA4 property; update `gtag.id`
   in `nuxt.config.ts` at cutover; owner removes successor's access to the old
   property (or transfers it).
7. **og:image** — copy `rote.png` out of the `swgoh-rote` S3 bucket (e.g. into
   the new site's own hosting/origin) and update the og:image URL in
   `nuxt.config.ts`. The old bucket then has no other known consumer.
8. **Site hosting + domain** — successor creates their own Amplify Hosting
   app (step 2) and takes over `swgohrote.com`:
   - Preferred: **Route 53 domain transfer** from the owner's account to the
     successor's (or to their own registrar). Cleanest ownership; DNS records
     stay the same, so nothing user-facing changes.
   - Acceptable: domain stays registered to the owner; apex + www records are
     repointed at cutover to the successor's Amplify domain — but then the
     domain is the last thread tying the site to the owner.
   - Either way: attach the domain to the successor's Amplify app and confirm
     TLS **before** switching DNS, so cutover is a record change, not a
     scramble.
9. **Cutover** — export tables one last time → import → ship the final build
   pointed at the successor's AppSync + API GW → verify: votes increment,
   dedup blocks a second vote, suggestion + applicant emails arrive, site
   fully loads over HTTPS on the domain.
10. **Wind-down (owner's account)** — after ~1 week healthy on the new stack:
    delete the sandbox stack(s), API Gateway, suggest-team Lambda, S3 bucket,
    CloudFront distribution, and DynamoDB tables. Owner keeps: final table
    exports, repo mirror, `.env` archive for reference.

---

## Phase 4 — Ops runbook (successor's recurring tasks)

| Cadence | Task |
|---|---|
| **Before 2027-10-31** | **Rotate the AppSync API key.** Current prod key `da2-c2dswybeg5hqjmlwsnzkhl3lji` expires 2027-10-31; when it lapses the site renders fine but voting silently dies. Reminder ~Sept 2027. After migration the successor's key starts its own 365-day clock. |
| On backend change | Edit `amplify/` → `npx ampx sandbox` → refresh `amplify_outputs.json` → rebuild + redeploy static site |
| On suggest-team change | Edit `scripts/lambda-sources/suggest-team.mjs` → `aws lambda update-function-code` (manual; consider scripting this — `scripts/update-suggest-team.sh` referenced in the file's header does not exist yet) |
| Quarterly | Export all three tables to JSON as backup |
| Every change | `npm test` green before merging; new features via `dev` branch first |
| Ongoing | Review suggestion emails → curate into `data/<phase>/<Side>.ts` |

---

## Discovery results (2026-11-17, via AWS CLI)

- [x] Hosting = **Amplify Hosting app `swgoh-rote-auto`** (`d3esvufj0jgdhy`,
      us-east-2), CI/CD from GitHub; auto-build on `main` + `dev`. CDN is
      Amplify-managed — no user-owned CloudFront distribution.
- [x] Production backend = the **main-branch deployment** (AppSync
      `ns3tpbch5ndrjpht4bi3uokpdq`, 10,564 TeamVote rows). NOT a sandbox.
      The `dev` branch has its own separate stack (5 test rows) — safe for
      testing the applicant form.
- [x] `swgohrote.com` is **registered via Route 53** and DNS-hosted in the
      same account (zone `Z0290119154XBR1OXCLEC`).
- [x] API Gateway = **HTTP API** (apigatewayv2). Live one: `47rezenqn0`;
      `cr9zuk5nb8` likely stale.
- [x] `suggest-team` Lambda is in **us-east-2** (nodejs24.x); SES identity
      verified in us-east-1 and us-east-2.
- [x] Prod AppSync API key `da2-c2dswybeg5hqjmlwsnzkhl3lji` expires
      **2027-10-31**.
- [ ] No `amplify.yml` in the repo — locate the build spec (likely edited in
      the Amplify console per branch) before the successor recreates the app.
- [ ] Identify the `plregwom4zc6baphc27kyh32fi` and `Character-*` stacks
      (see Stale stacks) before any cleanup.
- [ ] Security: the owner's CLI currently authenticates as the **root user**.
      Move daily work to an admin IAM user / IAM Identity Center before
      handoff; never share root credentials with anyone.

## Change log

- 2026-11-17 — initial draft (Kevin, with ZCode). Decisions recorded: successor
  gets Maintain role; owner keeps read/write; AWS moves to successor-owned
  account; applicant form goes to the suggest-team email; dev-branch testing
  for the recruitment feature.
- 2026-11-17 — AWS discovery filled in via CLI: prod = Amplify Hosting
  main-branch CI/CD deployment; domain registered + hosted in Route 53;
  HTTP API confirmed; stale-stack inventory added.
