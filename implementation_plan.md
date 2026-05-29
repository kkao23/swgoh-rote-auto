# Implementation Plan: Tests, Amplify Gen 2, and Lite Upvote System

This plan outlines the steps to add unit tests, migrate to AWS Amplify Gen 2, and implement a lightweight, serverless upvote/downvote system using a hybrid static/dynamic architecture.

---

## Goal Description
Build a lightweight, highly performant vote tracking system for SWGOH team suggestions. By using a hybrid architecture, the team guide details remain static (committed in Git), while the vote counts are fetched dynamically from AWS. The system will restrict voting to one vote per IP address without requiring Cognito/user logins.

---

## User Review Required

> [!WARNING]
> **Privacy & GDPR Compliance**: Storing raw IP addresses can be classified as storing Personally Identifiable Information (PII). To comply with privacy standards, we propose storing a salted hash of the IP address (e.g., SHA-256) instead of the raw IP.

> [!IMPORTANT]
> **AWS Cost Cap & Throttling**: Since you are willing to pay up to $10–$20/month, we will configure explicit AppSync API rate limits (e.g., max 100 requests per minute per IP) to prevent any billing spikes from malicious crawlers or bots.

---

## Proposed Changes

### Component 1: Unit Testing Suite
Establish Vitest and verify the core business logic (saving teams) and budget calculations.

#### [NEW] [vitest.config.ts](file:///C:/Users/choco/repos/swgoh-rote-auto/vitest.config.ts)
Configuration file for Vitest with Nuxt support.

#### [NEW] [test/composables/useSavedTeams.spec.ts](file:///C:/Users/choco/repos/swgoh-rote-auto/test/composables/useSavedTeams.spec.ts)
Unit tests for team favoriting logic.

#### [NEW] [test/pages/budget.spec.ts](file:///C:/Users/choco/repos/swgoh-rote-auto/test/pages/budget.spec.ts)
Unit tests for daily and monthly crystal calculations.

---

### Component 2: AWS Amplify Gen 2 Backend
Setup Amplify Gen 2 TypeScript definitions for DynamoDB, AppSync, and custom Lambda functions.

#### [NEW] [amplify/data/resource.ts](amplify/data/resource.ts)
Defines the database schema:
* `TeamVote`: Stores `teamKey` (string) and `votes` (integer).
* `VoteLog`: Stores `ipHash_teamKey` (string) and `timestamp` (string).

#### [NEW] [amplify/functions/vote-handler/resource.ts](amplify/functions/vote-handler/resource.ts)
Defines the Lambda function trigger for handling votes.

#### [NEW] [amplify/functions/vote-handler/handler.ts](amplify/functions/vote-handler/handler.ts)
The Lambda code that:
1. Obtains the user's IP from headers.
2. Hashes the IP + `teamKey` using Node's crypto library.
3. Checks if the hash exists in `VoteLog`.
4. Increments the vote counter in `TeamVote` and writes the log.

#### [MODIFY] [package.json](package.json)
Add `@aws-amplify/backend` and `aws-amplify` dependencies.

---

### Component 3: Frontend Integration
Modify components to display and submit votes.

#### [MODIFY] [components/MissionTableFragment.vue](components/MissionTableFragment.vue)
* Add UI buttons for upvoting/downvoting.
* Fetch current vote counts for teams when the accordion expands.
* Disable voting buttons if the team is already voted on locally (stored in browser `localStorage`).

#### [NEW] [composables/useVoteTracker.ts](composables/useVoteTracker.ts)
Handles local state (disable buttons upon click, retrieve initial status) and triggers the AppSync API request.

---

## Verification Plan

### Automated Tests
* Run `npm run test` (Vitest) to verify that local composables and budget logic are completely sound.
* Run Amplify Sandbox test scripts to verify the Lambda transaction works correctly.

### Manual Verification
1. Open the dev server (`npm run dev`).
2. Expand a mission and check that the vote counts load (defaulting to 0 if new).
3. Click "Upvote" and verify:
   * The button changes visual state (e.g. colored icon).
   * Reloading the page keeps the button disabled (saving status in `localStorage`).
   * A second click is blocked.
4. Try to invoke the voting endpoint twice via postman/curl to verify the backend denies the second attempt due to the IP log.

---

## Technical Notes

### IP Hashing (Anti-Spam)
To prevent storing PII (Personally Identifiable Information) in DynamoDB, the custom resolver Lambda will hash the incoming IP address using Node.js's built-in `crypto` library:
1. Extract the IP from the request headers: `x-forwarded-for`.
2. Generate a SHA-256 hash using a salt environment variable:
   ```typescript
   import { createHash } from 'crypto';
   const hash = createHash('sha256')
     .update(`${ipAddress}-${teamKey}-${process.env.IP_HASH_SALT}`)
     .digest('hex');
   ```
3. Use this 64-character hash as the partition key in `VoteLog` (e.g. keying on `hash`).

### Amplify Gen 2 Environments
Amplify Gen 2 handles environments using **git-branch-based deployments** powered by AWS CDK:
* **Local Development (Sandbox)**: Running `npx amplify sandbox` spins up a personal cloud sandbox (prefixed with your system username) that is completely isolated from production. Changes are hot-deployed to your sandbox as you write code.
* **Production/Staging Branches**: In the AWS Amplify Console, you connect your Git branches (`main` and `dev`). Amplify Gen 2 will automatically deploy completely separate CloudFormation stacks (different AppSync endpoints, separate DynamoDB tables, and separate Lambdas) for each branch.
* **Env Configs**: Environment variables (like `IP_HASH_SALT`) are configured securely in the Amplify Console per-branch and injected at deploy time.
