import type { Handler } from "aws-lambda";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  DynamoDBDocumentClient,
  ScanCommand,
  PutCommand,
} from "@aws-sdk/lib-dynamodb";

/**
 * Vote Aggregator Lambda
 *
 * 1. Scans the full TeamVote table (small — ~1400 rows).
 * 2. Aggregates votes by teamKey prefix: "P1|DS|Top|Rey" → "P1|DS|Top".
 * 3. Upserts one VoteSummary row per prefix (id = summaryKey, so the
 *    write is idempotent and reruns are safe).
 *
 * Table names are injected by backend.ts via environment variables.
 */

const ddb = DynamoDBDocumentClient.from(new DynamoDBClient({}));

export const handler: Handler = async () => {
  const teamVoteTable = process.env.TEAMVOTE_TABLE;
  const voteSummaryTable = process.env.VOTESUMMARY_TABLE;

  if (!teamVoteTable || !voteSummaryTable) {
    throw new Error(
      "TEAMVOTE_TABLE and VOTESUMMARY_TABLE environment variables are required"
    );
  }

  // Aggregate TeamVote rows by teamKey prefix (first 3 pipe segments)
  const totals: Record<string, Record<string, number>> = {};
  let exclusiveStartKey: Record<string, any> | undefined;

  do {
    const result = await ddb.send(
      new ScanCommand({
        TableName: teamVoteTable,
        ExclusiveStartKey: exclusiveStartKey,
      })
    );

    for (const item of result.Items ?? []) {
      const segments = (item.teamKey as string | undefined)?.split("|");
      if (!segments || segments.length < 4) continue;

      const summaryKey = segments.slice(0, 3).join("|");
      const lead = segments.slice(3).join("|");

      totals[summaryKey] ??= {};
      totals[summaryKey][lead] = (totals[summaryKey][lead] ?? 0) + (item.votes ?? 0);
    }

    exclusiveStartKey = result.LastEvaluatedKey;
  } while (exclusiveStartKey);

  // Upsert one summary row per prefix
  const summaryKeys = Object.keys(totals);
  for (const summaryKey of summaryKeys) {
    await ddb.send(
      new PutCommand({
        TableName: voteSummaryTable,
        Item: {
          id: summaryKey,
          summaryKey,
          // a.json() is stored as a serialized JSON string
          counts: JSON.stringify(totals[summaryKey]),
        },
      })
    );
  }

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: `Aggregated ${summaryKeys.length} vote summaries`,
    }),
  };
};
