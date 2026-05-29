import { defineFunction } from "@aws-amplify/backend";

/**
 * Vote Handler Lambda
 *
 * Invoked via AppSync to submit a vote.  This function:
 * 1. Extracts the caller's IP from the request headers.
 * 2. Creates a salted SHA-256 hash of (IP + teamKey).
 * 3. Checks VoteLog for an existing hash → rejects duplicates.
 * 4. Increments the TeamVote counter and writes to VoteLog.
 */
export const voteHandler = defineFunction({
  name: "vote-handler",
  entry: "./handler.ts",
  timeoutSeconds: 10,
  memoryMB: 256,
  runtime: 20,
});
