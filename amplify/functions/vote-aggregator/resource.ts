import { defineFunction } from "@aws-amplify/backend";

/**
 * Vote Aggregator Lambda
 *
 * Runs nightly via EventBridge.  Scans the TeamVote table and collapses
 * it into VoteSummary rows keyed by teamKey prefix (phase|alignment|position),
 * so the frontend reads one small item per prefix instead of paginating
 * the full TeamVote table on every page load.
 */
export const voteAggregator = defineFunction({
  name: "vote-aggregator",
  entry: "./handler.ts",
  timeoutSeconds: 60,
  memoryMB: 256,
  runtime: 20,
});
