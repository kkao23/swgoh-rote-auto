import { type ClientSchema, a, defineData } from "@aws-amplify/backend";

/**
 * Database Schema for SWGOH RoTE Team Voting
 *
 * ## Tables
 * – `TeamVote`   — Aggregated vote counts per team (teamKey → votes)
 * – `VoteLog`    — Per-vote deduplication log (ipHash_teamKey → timestamp)
 *
 * Access pattern: Guests can read TeamVote counts and submit votes.
 * Votes are submitted via a Lambda function (vote-handler) that
 * validates IP hashes before writing to these tables.
 */
const schema = a.schema({
  /**
   * Stores the current vote count for each team.
   * Keyed by a compound `teamKey` string like "P1|DS|Top|Rey".
   */
  TeamVote: a
    .model({
      teamKey: a.string().required(),
      votes: a.integer().default(0),
    })
    .authorization((allow) => [allow.publicApiKey()]),

  /**
   * Deduplication log: prevents the same IP from voting twice on
   * the same team. Keyed by a salted SHA-256 hash of (IP + teamKey).
   */
  /**
   * Nightly aggregate of TeamVote counts, keyed by a prefix of teamKey
   * ("P1|DS|Top" → { "Rey": 5, ... }).  Written by the vote-aggregator
   * scheduled Lambda so the frontend can load all counts with a single
   * small query instead of paginating the full TeamVote table.
   */
  VoteSummary: a
    .model({
      summaryKey: a.string().required(),
      counts: a.json(),
    })
    .authorization((allow) => [allow.publicApiKey()]),

  VoteLog: a
    .model({
      ipHash_teamKey: a.string().required(),
      timestamp: a.string().required(),
    })
    .authorization((allow) => [allow.publicApiKey()]),
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: "apiKey",
    apiKeyAuthorizationMode: {
      expiresInDays: 365,
    },
  },
});
